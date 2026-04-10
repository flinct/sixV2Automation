import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";
import { Counter } from "k6/metrics";

// HTML report (generated at end of run)
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.4/index.js";

/**
 * qr_flowinit2.js
 *
 * Flow only:
 * - login
 * - get account-channel max limit
 * - pick random global account-channel index
 * - hit the correct page for that random item
 * - init existing account-channel instance
 * - poll QR
 * - destroy/terminate QR session
 *
 * No create account-channel.
 *
 * Required env:
 * - BASE_URL
 * - LOGIN_IDENTIFIER or LOGIN_KEYWORD
 * - LOGIN_PASSWORD
 *
 * Optional env:
 * - ACCOUNT_CHANNEL_ID: direct target account-channel id (skip list lookup)
 * - ACCOUNT_CHANNEL_NAME: pick by exact name from list response
 * - ACCOUNT_CHANNEL_PHONE: pick by exact phoneNumber from list response
 * - ACCOUNT_CHANNEL_INDEX: fallback fixed global index when random disabled
 * - ACCOUNT_CHANNEL_RANDOM_PICK: default true
 * - ACCOUNT_CHANNEL_PAGE_SIZE: default 10
 * - ACCOUNT_CHANNEL_LIST_PATH: default api/account-channel
 * - INIT_PATH: default api/account-channel/instance
 * - QR_PATH_TEMPLATE: default api/account-channel/instance/qr/{id}
 * - TERMINATE_PATH_TEMPLATE: default api/account-channel/instance/terminate-qr/{id}
 */

const runSchema = {
  http_flow_ramp: {
    executor: "ramping-vus",
    startVUs: 0,
    stages: [
      { duration: "30s", target: 50 },
      { duration: "2m", target: 150 },
      { duration: "4m", target: 300 },
      { duration: "10m", target: 500 },
      { duration: "20s", target: 0 },
    ],
    gracefulRampDown: "10s",
    exec: "httpFlowInitOnly",
    startTime: "0s",
  },

  http_flow_soak: {
    executor: "constant-vus",
    vus: 50,
    duration: "10m",
    exec: "httpFlowInitOnly",
    startTime: "2m20s",
  },
};

export const options = {
  scenarios: runSchema,
  thresholds: {
    checks: ["rate>0.90"],
    http_req_failed: ["rate<0.10"],
    http_req_duration: ["p(95)<3000"],
  },
};

const qrPollAttempts = new Counter("qr_poll_attempts");
const accountChannelListAttempts = new Counter("account_channel_list_attempts");
const terminateAttempts = new Counter("terminate_qr_instance_attempts");

function envInt(name, def) {
  const v = __ENV[name];
  if (v == null || v === "") return def;
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) ? n : def;
}

function envStr(name, def) {
  const v = __ENV[name];
  return v == null || v === "" ? def : String(v);
}

function deriveApiBase(baseUrl) {
  if (!baseUrl) return "";
  if (baseUrl === "https://dev-v2.satuinbox.com")
    return "https://dev-v2-api.satuinbox.com/";
  if (baseUrl === "https://v2.satuinbox.com")
    return "https://v2-api.satuinbox.com/";
  return "";
}

function joinUrl(base, path) {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

function headers(token) {
  const h = { "content-type": "application/json" };
  if (X_API_KEY) h["x-api-key"] = X_API_KEY;
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maybeSleepMs(minMs, maxMs) {
  sleep(randomInt(minMs, maxMs) / 1000);
}

const BASE_URL = __ENV.BASE_URL;
const API_BASE = __ENV.API_BASE || deriveApiBase(BASE_URL);

const X_API_KEY = __ENV.X_API_KEY || "";
const LOGIN_IDENTIFIER = __ENV.LOGIN_IDENTIFIER || "";
const LOGIN_KEYWORD = __ENV.LOGIN_KEYWORD || "";
const LOGIN_PASSWORD = __ENV.LOGIN_PASSWORD || "";

const ACCOUNT_CHANNEL_ID = envStr("ACCOUNT_CHANNEL_ID", "");
const ACCOUNT_CHANNEL_NAME = envStr("ACCOUNT_CHANNEL_NAME", "");
const ACCOUNT_CHANNEL_PHONE = envStr("ACCOUNT_CHANNEL_PHONE", "");
const ACCOUNT_CHANNEL_INDEX = envInt("ACCOUNT_CHANNEL_INDEX", 0);
const ACCOUNT_CHANNEL_RANDOM_PICK =
  envStr("ACCOUNT_CHANNEL_RANDOM_PICK", "true") === "true";
const ACCOUNT_CHANNEL_PAGE_SIZE = Math.max(
  1,
  envInt("ACCOUNT_CHANNEL_PAGE_SIZE", 10),
);
const ACCOUNT_CHANNEL_LIST_PATH = envStr(
  "ACCOUNT_CHANNEL_LIST_PATH",
  "api/account-channel",
);
const INIT_PATH = envStr("INIT_PATH", "api/account-channel/instance");
const QR_PATH_TEMPLATE = envStr(
  "QR_PATH_TEMPLATE",
  "api/account-channel/instance/qr/{id}",
);
const TERMINATE_PATH_TEMPLATE = envStr(
  "TERMINATE_PATH_TEMPLATE",
  "api/account-channel/instance/terminate-qr/{id}",
);
const TERMINATE_METHOD = envStr("TERMINATE_METHOD", "post").toUpperCase();

const TOKEN_TTL_SEC = envInt("TOKEN_TTL_SEC", 15 * 60);
const TOKEN_REFRESH_SKEW_SEC = envInt("TOKEN_REFRESH_SKEW_SEC", 60);
const POLL_INTERVAL_MS = envInt("POLL_INTERVAL_MS", 2000);
const POLL_MAX_ATTEMPTS = envInt("POLL_MAX_ATTEMPTS", 10);
const DISABLE_RUNTIME_LOGIN_REFRESH =
  envStr("DISABLE_RUNTIME_LOGIN_REFRESH", "true") === "true";

if (!BASE_URL) throw new Error("Missing BASE_URL");
if (!API_BASE)
  throw new Error(
    "Unable to derive API_BASE from BASE_URL. Set API_BASE explicitly.",
  );
if (!LOGIN_PASSWORD || (!LOGIN_IDENTIFIER && !LOGIN_KEYWORD)) {
  throw new Error(
    "Missing login creds. Set LOGIN_IDENTIFIER/LOGIN_KEYWORD + LOGIN_PASSWORD.",
  );
}

let tokenState = { token: "", exp: 0 };

function login() {
  const url = joinUrl(API_BASE, "api/auth/login");
  const body = LOGIN_IDENTIFIER
    ? { identifier: LOGIN_IDENTIFIER, password: LOGIN_PASSWORD }
    : { keyword: LOGIN_KEYWORD, password: LOGIN_PASSWORD };

  const res = http.post(url, JSON.stringify(body), {
    headers: headers(""),
    tags: { name: "auth_login" },
    timeout: "30s",
  });

  const ok = check(res, {
    "login status 2xx": (r) => r.status >= 200 && r.status < 300,
  });
  if (!ok) return { token: "", exp: 0 };

  const json = res.json();
  const token =
    json?.accessToken ||
    json?.token ||
    json?.data?.accessToken ||
    json?.data?.token ||
    "";
  if (!token) return { token: "", exp: 0 };

  return { token, exp: nowSec() + TOKEN_TTL_SEC };
}

function ensureTokenSeeded(seed) {
  if (tokenState.token) return;
  if (seed?.token) tokenState = { token: seed.token, exp: seed.exp || 0 };
}

function shouldRefreshToken() {
  if (DISABLE_RUNTIME_LOGIN_REFRESH) return false;
  const t = nowSec();
  return (
    !tokenState.token ||
    !tokenState.exp ||
    tokenState.exp - t <= TOKEN_REFRESH_SKEW_SEC
  );
}

function refreshTokenWithJitter() {
  sleep(Math.random() * 3);
  tokenState = login();
  return tokenState.token;
}

function normalizeAccountChannelItems(json) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.data?.items)) return json.data.items;
  if (Array.isArray(json?.items)) return json.items;
  if (Array.isArray(json?.results)) return json.results;
  return [];
}

function getAccountChannelItemId(item) {
  return item?.id || item?._id || item?.data?.id || "";
}

function getAccountChannelItemName(item) {
  return item?.name || item?.data?.name || "";
}

function getAccountChannelItemPhone(item) {
  return item?.phoneNumber || item?.data?.phoneNumber || "";
}

function getPaginationMeta(json) {
  const candidates = [
    json,
    json?.data,
    json?.data?.meta,
    json?.meta,
    json?.pagination,
    json?.data?.pagination,
  ];

  for (const meta of candidates) {
    if (!meta || typeof meta !== "object") continue;

    const total =
      meta.total ??
      meta.totalData ??
      meta.totalItems ??
      meta.total_count ??
      meta.count;

    const limit =
      meta.limit ?? meta.pageSize ?? meta.perPage ?? meta.per_page ?? meta.size;

    const page =
      meta.page ?? meta.currentPage ?? meta.current_page ?? meta.pageNumber;

    return {
      total: Number.isFinite(Number(total)) ? Number(total) : null,
      limit: Number.isFinite(Number(limit)) ? Number(limit) : null,
      page: Number.isFinite(Number(page)) ? Number(page) : null,
    };
  }

  return { total: null, limit: null, page: null };
}

function buildAccountChannelListUrl(page, limit) {
  const base = joinUrl(API_BASE, ACCOUNT_CHANNEL_LIST_PATH);
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}page=${page}&limit=${limit}`;
}

function fetchAccountChannelList(token, page, limit) {
  accountChannelListAttempts.add(1);
  const res = http.get(buildAccountChannelListUrl(page, limit), {
    headers: headers(token),
    tags: { name: "account_channel_list" },
    timeout: "30s",
  });

  const ok = check(res, {
    "account-channel list 2xx": (r) => r.status >= 200 && r.status < 300,
  });
  if (!ok) return null;

  const json = res.json();
  return {
    json,
    items: normalizeAccountChannelItems(json),
    meta: getPaginationMeta(json),
  };
}

function findAccountChannelIdByPredicate(items, predicate) {
  const found = items.find(predicate);
  return found ? getAccountChannelItemId(found) : "";
}

function getRandomGlobalIndex(total) {
  if (!Number.isFinite(total) || total <= 0) return -1;
  return Math.floor(Math.random() * total);
}

function getAccountChannelId(token) {
  if (ACCOUNT_CHANNEL_ID) return ACCOUNT_CHANNEL_ID;

  const firstPage = fetchAccountChannelList(
    token,
    1,
    ACCOUNT_CHANNEL_PAGE_SIZE,
  );
  if (!firstPage) return "";

  if (ACCOUNT_CHANNEL_NAME) {
    const id = findAccountChannelIdByPredicate(
      firstPage.items,
      (x) => getAccountChannelItemName(x) === ACCOUNT_CHANNEL_NAME,
    );
    if (id) {
      check(id, {
        "account-channel id resolved": (v) =>
          typeof v === "string" && v.length > 0,
      });
      return id;
    }
  }

  if (ACCOUNT_CHANNEL_PHONE) {
    const id = findAccountChannelIdByPredicate(
      firstPage.items,
      (x) => getAccountChannelItemPhone(x) === ACCOUNT_CHANNEL_PHONE,
    );
    if (id) {
      check(id, {
        "account-channel id resolved": (v) =>
          typeof v === "string" && v.length > 0,
      });
      return id;
    }
  }

  const total = firstPage.meta.total ?? firstPage.items.length;
  if (!total || total <= 0) return "";

  const globalIndex = ACCOUNT_CHANNEL_RANDOM_PICK
    ? getRandomGlobalIndex(total)
    : Math.max(0, Math.min(ACCOUNT_CHANNEL_INDEX, total - 1));

  if (globalIndex < 0) return "";

  const pageSize = firstPage.meta.limit || ACCOUNT_CHANNEL_PAGE_SIZE;
  const page = Math.floor(globalIndex / pageSize) + 1;
  const indexInPage = globalIndex % pageSize;

  const targetPage =
    page === 1 ? firstPage : fetchAccountChannelList(token, page, pageSize);
  if (!targetPage || !targetPage.items.length) return "";

  const picked =
    targetPage.items[indexInPage] ||
    targetPage.items[targetPage.items.length - 1];
  const id = getAccountChannelItemId(picked);
  check(id, {
    "account-channel id resolved": (v) => typeof v === "string" && v.length > 0,
  });
  return id;
}

function makeQrPath(id) {
  return QR_PATH_TEMPLATE.replace("{id}", encodeURIComponent(id));
}

function makeTerminatePath(id) {
  return TERMINATE_PATH_TEMPLATE.replace("{id}", encodeURIComponent(id));
}

function terminateQrInstance(token, accountChannelId) {
  terminateAttempts.add(1);
  const terminateUrl = joinUrl(API_BASE, makeTerminatePath(accountChannelId));

  let res;
  if (TERMINATE_METHOD === "DELETE") {
    res = http.del(terminateUrl, null, {
      headers: headers(token),
      tags: { name: "qr_terminate" },
      timeout: "30s",
    });
  } else {
    res = http.post(terminateUrl, JSON.stringify({ id: accountChannelId }), {
      headers: headers(token),
      tags: { name: "qr_terminate" },
      timeout: "30s",
    });
  }

  check(res, {
    "terminate 2xx": (r) => r.status >= 200 && r.status < 300,
  });

  return res;
}

export function setup() {
  const seed = login();
  if (!seed.token) throw new Error("setup login failed (no token)");
  return seed;
}

export function handleSummary(data) {
  return {
    "k6/report/summary-qr_flowinit2.html": htmlReport(data),
    "k6/report/summary-qr_flowinit2.txt": textSummary(data, {
      indent: " ",
      enableColors: false,
    }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export function httpFlowInitOnly(seed) {
  ensureTokenSeeded(seed);
  let token = tokenState.token;

  if (shouldRefreshToken()) {
    token = refreshTokenWithJitter();
    if (!token) return;
  }

  maybeSleepMs(200, 1200);

  const accountChannelId = getAccountChannelId(token);
  if (!accountChannelId) return;

  maybeSleepMs(400, 1800);

  const initUrl = joinUrl(API_BASE, INIT_PATH);
  const r2 = http.post(initUrl, JSON.stringify({ id: accountChannelId }), {
    headers: headers(token),
    tags: { name: "instance_init" },
    timeout: "30s",
  });

  const initOk = check(r2, {
    "init 2xx": (r) => r.status >= 200 && r.status < 300,
  });
  if (!initOk) return;

  const qrUrl = joinUrl(API_BASE, makeQrPath(accountChannelId));
  let qrOk = false;

  for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
    qrPollAttempts.add(1);

    const r3 = http.get(qrUrl, {
      headers: headers(token),
      tags: { name: "qr_poll" },
      timeout: "30s",
    });

    if (r3.status === 401 && !DISABLE_RUNTIME_LOGIN_REFRESH) {
      token = refreshTokenWithJitter();
      sleep(POLL_INTERVAL_MS / 1000);
      continue;
    }

    if (r3.status >= 200 && r3.status < 300) {
      const j = r3.json();
      const qr = j?.qrCode || j?.data?.qrCode || j?.qr || "";
      if (typeof qr === "string" && qr.length > 0) {
        qrOk = true;
        break;
      }
    }

    sleep(POLL_INTERVAL_MS / 1000);
  }

  check(qrOk, { "qr obtained": (v) => v === true });

  maybeSleepMs(300, 1000);
  terminateQrInstance(token, accountChannelId);
  maybeSleepMs(500, 2500);
}

export default function (seed) {
  const scenario = exec.scenario.name;
  if (scenario === "http_flow_ramp" || scenario === "http_flow_soak") {
    httpFlowInitOnly(seed);
    return;
  }
  httpFlowInitOnly(seed);
}
