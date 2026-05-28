import http from "k6/http";
import { check, sleep } from "k6";

// HTML report (generated at end of run)
// Source: https://github.com/benc-uk/k6-reporter
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.4/index.js";

/**
 * Full flow load test:
 *   login (auto refresh) -> create account-channel -> init instance -> poll QR
 *
 * Credentials + x-api-key can be populated from Cypress mapping via:
 *   $env:BASE_URL="https://app.example.test"
 *   $env:CYPRESS_loginType="cekerayam01"
 *   node scripts/print-k6-env-from-cypress.js | Invoke-Expression
 *
 * Then run:
 *   k6 run .\k6\wa_qr_fullflow.js
 */

// =====================
// Run schema (edit manually)
// =====================
// Notes:
// - Multiple scenarios run in parallel unless you set startTime.
// - This schema is set up to run sequentially by default.
// - For big loads, disable verbose logs (LOG_EVERY/LOG_BODY_CHARS) to avoid console bottlenecks.
const runSchema = {
  load: {
    executor: "constant-vus",
    vus: 200,
    duration: "5m",
    startTime: "0s",
  },
  // load_small: {
  //   executor: "constant-vus",
  //   vus: 10,
  //   duration: "30s",
  //   startTime: "10s",
  // },
  // load_med: {
  //   executor: "constant-vus",
  //   vus: 50,
  //   duration: "30s",
  //   startTime: "40s",
  // },
  // load_heavy: {
  //   executor: "constant-vus",
  //   vus: 100,
  //   duration: "50s",
  //   startTime: "70s",
  // },

  stress: {
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
    startTime: "2m", // after load_heavy, set 0 if need to run immediately
  },

  // spike: {
  //   executor: "ramping-arrival-rate",
  //   startRate: 0,
  //   timeUnit: "1s",
  //   preAllocatedVUs: 50,
  //   maxVUs: 500,
  //   stages: [
  //     { duration: "5s", target: 100 },
  //     { duration: "10s", target: 100 },
  //     { duration: "5s", target: 0 },
  //   ],
  //   startTime: "250s",
  // },

  load_long: {
    executor: "constant-vus",
    vus: 50,
    duration: "10m",
    startTime: "280s",
  },
};

export const options = {
  scenarios: runSchema,
  thresholds: {
    checks: ["rate>0.95"],
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<2000"],
  },
};

function envInt(name, def) {
  const v = __ENV[name];
  if (v == null || v === "") return def;
  const n = parseInt(String(v), 10);
  return Number.isFinite(n) ? n : def;
}

// =====================
// Defaults (edit manually; env can still override)
// =====================
const DEFAULT_LOG_EVERY = 1; // set 0 to disable logs
const DEFAULT_LOG_BODY_CHARS = 200;

const DEFAULT_POLL_MAX_ATTEMPTS = 10;
const DEFAULT_POLL_INTERVAL_MS = 2000;

// Logging (0=off; otherwise log every N iterations per VU)
const LOG_EVERY = envInt("LOG_EVERY", DEFAULT_LOG_EVERY);
const LOG_BODY_CHARS = envInt("LOG_BODY_CHARS", DEFAULT_LOG_BODY_CHARS);

const BASE_URL = __ENV.BASE_URL;
const API_BASE = __ENV.API_BASE || deriveApiBase(BASE_URL);

const X_API_KEY = __ENV.X_API_KEY || "";
const LOGIN_IDENTIFIER = __ENV.LOGIN_IDENTIFIER || "";
const LOGIN_KEYWORD = __ENV.LOGIN_KEYWORD || "";
const LOGIN_PASSWORD = __ENV.LOGIN_PASSWORD || "";

const CHANNEL_ID = __ENV.CHANNEL_ID || "692e83fb9fe6921a278565ab";

const POLL_INTERVAL_MS = __ENV.POLL_INTERVAL_MS
  ? parseInt(__ENV.POLL_INTERVAL_MS, 10)
  : DEFAULT_POLL_INTERVAL_MS;
const POLL_MAX_ATTEMPTS = __ENV.POLL_MAX_ATTEMPTS
  ? parseInt(__ENV.POLL_MAX_ATTEMPTS, 10)
  : DEFAULT_POLL_MAX_ATTEMPTS;

// Token expiry: default 15m; refresh if <=60s left.
const TOKEN_TTL_SEC = __ENV.TOKEN_TTL_SEC
  ? parseInt(__ENV.TOKEN_TTL_SEC, 10)
  : 15 * 60;
const TOKEN_REFRESH_SKEW_SEC = __ENV.TOKEN_REFRESH_SKEW_SEC
  ? parseInt(__ENV.TOKEN_REFRESH_SKEW_SEC, 10)
  : 60;

if (!BASE_URL) {
  throw new Error("Missing BASE_URL (e.g. https://app.example.test)");
}
if (!API_BASE) {
  throw new Error(
    "Unable to derive API_BASE from BASE_URL. Set API_BASE explicitly (e.g. https://api.example.test/)",
  );
}
if (!LOGIN_PASSWORD || (!LOGIN_IDENTIFIER && !LOGIN_KEYWORD)) {
  throw new Error(
    "Missing login creds. Set LOGIN_IDENTIFIER/LOGIN_KEYWORD + LOGIN_PASSWORD (or pipe from scripts/print-k6-env-from-cypress.js)",
  );
}

function deriveApiBase(baseUrl) {
  if (!baseUrl) return "";
  if (__ENV.API_BASE) return __ENV.API_BASE;
  if (!baseUrl) return "";
  return `${baseUrl.replace(/\/+$/g, "")}/api/v1`;
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

// Token state is per-VU, but we seed it from setup() to avoid login storms.
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
  if (seed?.token) {
    tokenState = { token: seed.token, exp: seed.exp || 0 };
  }
}

function shouldRefreshToken() {
  const t = nowSec();
  return (
    !tokenState.token ||
    !tokenState.exp ||
    tokenState.exp - t <= TOKEN_REFRESH_SKEW_SEC
  );
}

function refreshTokenWithJitter() {
  // Avoid all VUs re-login at the exact same second on expiry.
  // Jitter 0-3s then login.
  sleep(Math.random() * 3);
  tokenState = login();
  return tokenState.token;
}

function randomPhone() {
  const suffix = String(Math.floor(Math.random() * 1e9)).padStart(9, "0");
  return `+628${suffix}`;
}

function shouldLog() {
  if (!LOG_EVERY || LOG_EVERY <= 0) return false;
  return __ITER % LOG_EVERY === 0;
}

function briefBody(res) {
  if (!LOG_BODY_CHARS || LOG_BODY_CHARS <= 0) return "";
  try {
    const t = res && typeof res.body === "string" ? res.body : "";
    if (!t) return "";
    return t.length > LOG_BODY_CHARS ? t.slice(0, LOG_BODY_CHARS) + "…" : t;
  } catch {
    return "";
  }
}

export function setup() {
  // Single login at test start (prevents initial login storm)
  const seed = login();
  if (!seed.token) {
    throw new Error("setup login failed (no token)");
  }
  return seed;
}

export function handleSummary(data) {
  // Write reports under k6/report (directory must exist)
  return {
    "k6/report/summary.html": htmlReport(data),
    "k6/report/summary.txt": textSummary(data, {
      indent: " ",
      enableColors: false,
    }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export default function (seed) {
  ensureTokenSeeded(seed);
  let token = tokenState.token;

  // 1) create account-channel
  const createUrl = joinUrl(API_BASE, "api/account-channel");
  const createBody = {
    accountStatus: "used",
    connectionStatus: "inactive",
    channel: CHANNEL_ID,
    name: "helo",
    phoneNumber: randomPhone(),
  };

  // Refresh token proactively if it's close to expiry (optional)
  if (shouldRefreshToken()) {
    token = refreshTokenWithJitter();
    if (!token) return;
  }

  const r1 = http.post(createUrl, JSON.stringify(createBody), {
    headers: headers(token),
    tags: { name: "account_channel_create" },
    timeout: "30s",
  });

  if (shouldLog()) {
    console.log(
      `[vu=${__VU} iter=${__ITER}] create account-channel status=${r1.status} durMs=${Math.round(r1.timings.duration)} idHint=${createBody.phoneNumber}`,
    );
    const b = briefBody(r1);
    if (b) console.log(`[vu=${__VU} iter=${__ITER}] create body: ${b}`);
  }

  const createOk = check(r1, {
    "create 2xx": (r) => r.status >= 200 && r.status < 300,
  });
  if (!createOk) return;

  const created = r1.json();
  const id = created?.id || created?.data?.id;
  if (!id) {
    check(null, { "create returned id": () => false });
    return;
  }

  // 2) init instance
  const initUrl = joinUrl(API_BASE, "api/account-channel/instance");
  const initBody = { id };

  const r2 = http.post(initUrl, JSON.stringify(initBody), {
    headers: headers(token),
    tags: { name: "instance_init" },
    timeout: "30s",
  });

  if (shouldLog()) {
    console.log(
      `[vu=${__VU} iter=${__ITER}] init instance status=${r2.status} durMs=${Math.round(r2.timings.duration)} accountChannelId=${id}`,
    );
    const b = briefBody(r2);
    if (b) console.log(`[vu=${__VU} iter=${__ITER}] init body: ${b}`);
  }

  const initOk = check(r2, {
    "init 2xx": (r) => r.status >= 200 && r.status < 300,
  });
  if (!initOk) return;

  // 3) poll QR (bounded)
  const qrUrl = joinUrl(
    API_BASE,
    `api/account-channel/instance/qr/${encodeURIComponent(id)}`,
  );

  let qrOk = false;
  let lastQrStatus = 0;
  for (let attempt = 1; attempt <= POLL_MAX_ATTEMPTS; attempt++) {
    const r3 = http.get(qrUrl, {
      headers: headers(token),
      tags: { name: "qr_poll" },
      timeout: "30s",
    });
    lastQrStatus = r3.status;

    if (r3.status === 401) {
      // token expired mid-flow; jittered relogin and continue polling
      token = refreshTokenWithJitter();
      sleep(POLL_INTERVAL_MS / 1000);
      continue;
    }

    if (shouldLog() && attempt === 1) {
      console.log(
        `[vu=${__VU} iter=${__ITER}] qr poll#${attempt} status=${r3.status} durMs=${Math.round(r3.timings.duration)} url=/api/account-channel/instance/qr/${id}`,
      );
      const b = briefBody(r3);
      if (b) console.log(`[vu=${__VU} iter=${__ITER}] qr body: ${b}`);
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

  if (shouldLog()) {
    console.log(
      `[vu=${__VU} iter=${__ITER}] flow result qrOk=${qrOk} lastQrStatus=${lastQrStatus}`,
    );
  }
}
