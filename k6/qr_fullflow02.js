import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";
import { Counter, Rate } from "k6/metrics";

// HTML report (generated at end of run)
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.4/index.js";

/**
 * qr_fullflow02.js
 *
 * Adapted from wa_qr_fullflow.js + widget-socket-load-2.js observations.
 *
 * Why this version exists:
 * - k6 raw ws.connect() did not match the real working handshake used by widget-socket-load-2.js
 * - widget-socket-load-2.js proves the real connect path works through socket.io-client to:
 *     socketUrl = https://<api-host>/conversations
 *     path = /socket.io
 *     transports = [websocket]
 *     auth = { token: SIGNATURE_KEY }
 *     extraHeaders = { Origin: BASE_URL }
 * - k6 cannot fully emulate socket.io-client/engine.io handshake as faithfully as socket.io-client
 *
 * So this file keeps the HTTP fullflow in k6, and adds a lightweight socket realism layer
 * through HTTP-level socket bootstrap probes that align with the same endpoint contract,
 * while preserving per-session actions, concurrency, ramping, and lifecycle timing.
 *
 * If you want real socket lifecycle parity, run widget-socket-load-2.js for the socket portion.
 * This file is now intended to be the closest safe k6-compatible approximation.
 */

const runSchema = {
  http_bootstrap_ramp: {
    executor: "ramping-vus",
    startVUs: 0,
    stages: [
      { duration: "30s", target: 50 },
      { duration: "1m", target: 150 },
      { duration: "3m", target: 300 },
      { duration: "10m", target: 500 },
      { duration: "20s", target: 0 },
    ],
    gracefulRampDown: "10s",
    exec: "httpBootstrapFlow",
    startTime: "0s",
  },

  http_bootstrap_soak: {
    executor: "constant-vus",
    vus: 50,
    duration: "10m",
    exec: "httpBootstrapFlow",
    startTime: "2m20s",
  },

  // socket_probe_ramp: {
  //   executor: "ramping-vus",
  //   startVUs: 0,
  //   stages: [
  //     { duration: "30s", target: 50 },
  //     { duration: "1m", target: 150 },
  //     { duration: "3m", target: 300 },
  //     { duration: "10m", target: 500 },
  //     { duration: "20s", target: 0 },
  //   ],
  //   gracefulRampDown: "10s",
  //   exec: "socketLifecycleApproxFlow",
  //   startTime: "0s",
  // },

  // socket_probe_soak: {
  //   executor: "constant-vus",
  //   vus: 50,
  //   duration: "10m",
  //   exec: "socketLifecycleApproxFlow",
  //   startTime: "2m20s",
  // },
};

export const options = {
  scenarios: runSchema,
  thresholds: {
    checks: ["rate>0.90"],
    http_req_failed: ["rate<0.10"],
    http_req_duration: ["p(95)<3000"],
    socket_probe_success_rate: ["rate>0.85"],
  },
};

const qrPollAttempts = new Counter("qr_poll_attempts");
const socketProbeAttempts = new Counter("socket_probe_attempts");
const socketProbeSuccess = new Counter("socket_probe_success");
const socketProbeSuccessRate = new Rate("socket_probe_success_rate");
const socketActions = new Counter("socket_actions");

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

function randomPhone() {
  const suffix = String(Math.floor(Math.random() * 1e9)).padStart(9, "0");
  return `+628${suffix}`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maybeSleepMs(minMs, maxMs) {
  sleep(randomInt(minMs, maxMs) / 1000);
}

const BASE_URL = __ENV.BASE_URL;
const API_BASE = __ENV.API_BASE || deriveApiBase(BASE_URL);
const SOCKET_IO_POLLING_PATH = envStr(
  "SOCKET_IO_POLLING_PATH",
  "conversations/socket.io/?EIO=4&transport=polling",
);

const X_API_KEY = __ENV.X_API_KEY || "";
const LOGIN_IDENTIFIER = __ENV.LOGIN_IDENTIFIER || "";
const LOGIN_KEYWORD = __ENV.LOGIN_KEYWORD || "";
const LOGIN_PASSWORD = __ENV.LOGIN_PASSWORD || "";
const CHANNEL_ID = __ENV.CHANNEL_ID || "692e83fb9fe6921a278565ab";
const SIGNATURE_KEY = __ENV.SIGNATURE_KEY || "";

const TOKEN_TTL_SEC = envInt("TOKEN_TTL_SEC", 15 * 60);
const TOKEN_REFRESH_SKEW_SEC = envInt("TOKEN_REFRESH_SKEW_SEC", 60);
const POLL_INTERVAL_MS = envInt("POLL_INTERVAL_MS", 2000);
const POLL_MAX_ATTEMPTS = envInt("POLL_MAX_ATTEMPTS", 10);
const DISABLE_RUNTIME_LOGIN_REFRESH =
  envStr("DISABLE_RUNTIME_LOGIN_REFRESH", "true") === "true";

const SOCKET_SESSION_MIN_MS = envInt("SOCKET_SESSION_MIN_MS", 30000);
const SOCKET_SESSION_MAX_MS = envInt("SOCKET_SESSION_MAX_MS", 180000);
const SOCKET_ACTION_MIN_MS = envInt("SOCKET_ACTION_MIN_MS", 2000);
const SOCKET_ACTION_MAX_MS = envInt("SOCKET_ACTION_MAX_MS", 8000);
const SOCKET_IDLE_MIN_MS = envInt("SOCKET_IDLE_MIN_MS", 8000);
const SOCKET_IDLE_MAX_MS = envInt("SOCKET_IDLE_MAX_MS", 25000);
const SOCKET_IDLE_EVERY_N_ACTIONS = envInt("SOCKET_IDLE_EVERY_N_ACTIONS", 4);
const SOCKET_PROBE_ACTIONS_PER_SESSION = envInt(
  "SOCKET_PROBE_ACTIONS_PER_SESSION",
  6,
);

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

export function setup() {
  const seed = login();
  if (!seed.token) throw new Error("setup login failed (no token)");
  return seed;
}

export function handleSummary(data) {
  return {
    "k6/report/summary-qr_fullflow02.html": htmlReport(data),
    "k6/report/summary-qr_fullflow02.txt": textSummary(data, {
      indent: " ",
      enableColors: false,
    }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export function httpBootstrapFlow(seed) {
  ensureTokenSeeded(seed);
  let token = tokenState.token;

  if (shouldRefreshToken()) {
    token = refreshTokenWithJitter();
    if (!token) return;
  }

  maybeSleepMs(200, 1200);

  const createUrl = joinUrl(API_BASE, "api/account-channel");
  const createBody = {
    accountStatus: "used",
    connectionStatus: "inactive",
    channel: CHANNEL_ID,
    name: `helo-${__VU}`,
    phoneNumber: randomPhone(),
  };

  const r1 = http.post(createUrl, JSON.stringify(createBody), {
    headers: headers(token),
    tags: { name: "account_channel_create" },
    timeout: "30s",
  });

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

  maybeSleepMs(400, 1800);

  const initUrl = joinUrl(API_BASE, "api/account-channel/instance");
  const r2 = http.post(initUrl, JSON.stringify({ id }), {
    headers: headers(token),
    tags: { name: "instance_init" },
    timeout: "30s",
  });

  const initOk = check(r2, {
    "init 2xx": (r) => r.status >= 200 && r.status < 300,
  });
  if (!initOk) return;

  const qrUrl = joinUrl(
    API_BASE,
    `api/account-channel/instance/qr/${encodeURIComponent(id)}`,
  );
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
  maybeSleepMs(500, 2500);
}

function socketPollingProbeUrl() {
  const path = SOCKET_IO_POLLING_PATH.startsWith("/")
    ? SOCKET_IO_POLLING_PATH.slice(1)
    : SOCKET_IO_POLLING_PATH;
  return joinUrl(API_BASE, path);
}

function socketProbeHeaders() {
  const h = {
    Origin: BASE_URL,
    Accept: "*/*",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  };

  if (SIGNATURE_KEY) {
    h["x-signature-key"] = SIGNATURE_KEY;
  }

  return h;
}

function doSocketPollingProbe() {
  socketProbeAttempts.add(1);
  const probeUrl = socketPollingProbeUrl();

  const res = http.get(probeUrl, {
    headers: socketProbeHeaders(),
    tags: { name: "socket_io_polling_probe", expected_response: true },
    timeout: "20s",
  });

  const ok = check(res, {
    "socket.io polling probe 2xx": (r) => r.status >= 200 && r.status < 300,
    "socket.io polling body non-empty": (r) =>
      !!r.body && String(r.body).length > 0,
  });

  if (ok) socketProbeSuccess.add(1);
  socketProbeSuccessRate.add(ok);
  return ok;
}

export function socketLifecycleApproxFlow(seed) {
  ensureTokenSeeded(seed);
  if (shouldRefreshToken()) refreshTokenWithJitter();

  const sessionBudgetMs = randomInt(
    SOCKET_SESSION_MIN_MS,
    SOCKET_SESSION_MAX_MS,
  );
  const startedAt = Date.now();
  let actionCount = 0;

  const firstProbeOk = doSocketPollingProbe();
  check(firstProbeOk, { "socket probe first request ok": () => firstProbeOk });
  if (!firstProbeOk) return;

  while (
    Date.now() - startedAt < sessionBudgetMs &&
    actionCount < SOCKET_PROBE_ACTIONS_PER_SESSION
  ) {
    maybeSleepMs(SOCKET_ACTION_MIN_MS, SOCKET_ACTION_MAX_MS);

    const probeOk = doSocketPollingProbe();
    check(probeOk, { "socket probe action ok": () => probeOk });
    socketActions.add(1);
    actionCount += 1;

    if (actionCount % SOCKET_IDLE_EVERY_N_ACTIONS === 0) {
      maybeSleepMs(SOCKET_IDLE_MIN_MS, SOCKET_IDLE_MAX_MS);
    }
  }
}

export default function (seed) {
  const scenario = exec.scenario.name;
  if (scenario === "http_bootstrap_ramp") {
    httpBootstrapFlow(seed);
    return;
  }
  if (scenario === "socket_probe_ramp" || scenario === "socket_probe_soak") {
    socketLifecycleApproxFlow(seed);
    return;
  }
  httpBootstrapFlow(seed);
}
