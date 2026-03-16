#!/usr/bin/env node

const fs = require("fs");
const { ProxyAgent } = require("undici");
/**
 * WhatsApp Web (Baileys) QR Health Check
 *
 * PASS criteria: qrCode string exists and starts with "data:image" (or any non-empty string, configurable)
 *
 * Required env:
 * - BASE_URL: e.g. https://dev-v2.satuinbox.com or https://v2.satuinbox.com
 * - X_API_KEY: x-api-key (if your endpoints require it)
 *
 * Optional env:
 * - NUMBERS: comma-separated whatsapp numbers (digits only or with +) used for init/getQr (default: random)
 * - ITERATIONS: number of attempts (default 20)
 * - POLL_INTERVAL_MS: default 2000
 * - POLL_TIMEOUT_MS: default 60000
 * - QR_FIELD: response field name (default "qrCode")
 * - REQUIRE_DATA_IMAGE_PREFIX: true/false (default true)
 *
 * Endpoints must be present in your API base. By default, uses the same ones from 01_url_page.js:
 * - initInstance: /open/whatsapp/init?force=true&whatsappNumber=
 * - instanceInfo: /open/instance/info?key=
 *
 * If your new endpoints are different names (initInstance/getQrInstance), set env:
 * - INIT_PATH: e.g. "open/whatsapp/init?force=true&whatsappNumber="
 * - GET_QR_PATH: e.g. "open/instance/info?key="   (or your getQrInstance)
 */

function envInt(name, def) {
  const v = process.env[name];
  if (v == null || v === "") return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Invalid number for ${name}: ${v}`);
  return n;
}

function envStr(name, def = "") {
  const v = process.env[name];
  return v == null || v === "" ? def : String(v);
}

function envBool(name, def = false) {
  const v = (process.env[name] || "").toLowerCase();
  if (!v) return def;
  return v === "1" || v === "true" || v === "yes" || v === "y";
}

function parseJsonEnv(name, defObj) {
  const raw = process.env[name];
  if (!raw) return defObj;
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${name}: ${(e && e.message) || e}`);
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function apiBaseFromBaseUrl(baseUrl) {
  if (baseUrl === "https://dev-v2.satuinbox.com")
    return "https://dev-v2-api.satuinbox.com/";
  if (baseUrl === "https://v2.satuinbox.com")
    return "https://v2-api.satuinbox.com/";
  throw new Error(`Unknown BASE_URL mapping: ${baseUrl}`);
}

function joinUrl(base, path) {
  if (!base.endsWith("/") && !path.startsWith("/")) return `${base}/${path}`;
  if (base.endsWith("/") && path.startsWith("/"))
    return `${base}${path.slice(1)}`;
  return `${base}${path}`;
}

async function httpJson(url, { method = "GET", headers = {}, body, dispatcher } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: body == null ? undefined : JSON.stringify(body),
    dispatcher,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${res.statusText} for ${method} ${url}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

async function loginBearer({ apiBase, identifier, keyword, password, headers }) {
  const url = joinUrl(apiBase, "api/auth/login");
  const body = identifier ? { identifier, password } : { keyword, password };
  const res = await httpJson(url, { method: "POST", headers, body });
  const token = res?.accessToken || res?.token || res?.data?.accessToken || res?.data?.token;
  if (!token) throw new Error("login: missing token in response");
  return token;
}

async function createAccountChannel({ apiBase, headers, body, dispatcher }) {
  const url = joinUrl(apiBase, "api/account-channel");
  const res = await httpJson(url, { method: "POST", headers, body, dispatcher });
  const id = res?.id || res?.data?.id;
  if (!id) throw new Error("createAccountChannel: missing id in response");
  return { id, raw: res };
}

async function initInstanceV2({ apiBase, headers, body, method, dispatcher }) {
  const url = joinUrl(apiBase, "api/account-channel/instance");
  return httpJson(url, { method: method || "POST", headers, body, dispatcher });
}

function loadProxyList(filePath) {
  if (!filePath) return [];
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf8");
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !s.startsWith("#"));
}

function pickRandomNumber() {
  // Indonesian-like random number (not necessarily valid)
  const suffix = String(Math.floor(Math.random() * 1e9)).padStart(9, "0");
  return `628${suffix}`;
}

async function pollForQr({
  url,
  headers,
  qrField,
  pollIntervalMs,
  pollTimeoutMs,
  requireDataImagePrefix,
  dispatcher,
}) {
  const start = Date.now();
  while (Date.now() - start < pollTimeoutMs) {
    const data = await httpJson(url, { headers, dispatcher });
    const qr = data?.[qrField];
    const ok =
      typeof qr === "string" &&
      qr.length > 0 &&
      (!requireDataImagePrefix || qr.startsWith("data:image"));

    if (ok) return { ok: true, qr };
    await sleep(pollIntervalMs);
  }
  return { ok: false };
}

async function getCypressEnvConfig(baseUrl) {
  const loginType = envStr("CYPRESS_loginType", "");
  if (!loginType) return null;

  // Reuse Cypress env_config() mapping to avoid duplicating credentials/config.
  // The module is ESM, so load via dynamic import.
  const path = require("path");
  const { pathToFileURL } = require("url");

  const filePath = path.resolve(__dirname, "../cypress/support/01_url_page.js");
  const mod = await import(pathToFileURL(filePath).href);
  const env_config = mod?.env_config;
  if (typeof env_config !== "function") {
    throw new Error("Unable to load env_config() from cypress/support/01_url_page.js");
  }

  const cfg = env_config(baseUrl);
  return { loginType, cfg };
}

async function main() {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) throw new Error("Missing BASE_URL");

  const apiBase = apiBaseFromBaseUrl(baseUrl);

  const ITERATIONS = envInt("ITERATIONS", 20);
  const pollIntervalMs = envInt("POLL_INTERVAL_MS", 2000);
  const pollTimeoutMs = envInt("POLL_TIMEOUT_MS", 60000);

  const qrField = process.env.QR_FIELD || "qrCode";
  const requireDataImagePrefix =
    (process.env.REQUIRE_DATA_IMAGE_PREFIX || "true").toLowerCase() === "true";

  // legacy endpoints (older envs)
  const INIT_PATH =
    process.env.INIT_PATH || "open/whatsapp/init?force=true&whatsappNumber=";
  const GET_QR_PATH = process.env.GET_QR_PATH || "open/instance/info?key=";

  // v2 endpoints (omnichannel)
  const USE_V2 = envBool("USE_V2", true);

  // Support Cypress-style selector: $env:CYPRESS_loginType="cekerayam01"
  // If X_API_KEY is not provided, try to read it from cypress/support/01_url_page.js env_config().headers
  let xApiKey = process.env.X_API_KEY;
  if (!xApiKey) {
    const cypressCfg = await getCypressEnvConfig(baseUrl);
    const maybe = cypressCfg?.cfg?.headers?.["x-api-key"];
    if (typeof maybe === "string" && maybe.length > 0) xApiKey = maybe;
  }

  // base headers (x-api-key only)
  const baseHeaders = xApiKey ? { "x-api-key": xApiKey } : {};

  // optional bearer login
  // Supports:
  // - explicit env: LOGIN_IDENTIFIER/LOGIN_KEYWORD + LOGIN_PASSWORD
  // - or Cypress mapping: CYPRESS_loginType=<type> to auto-pick loginBody_<type> (identifier/keyword/password)
  let loginIdentifier = envStr("LOGIN_IDENTIFIER", "");
  let loginKeyword = envStr("LOGIN_KEYWORD", "");
  let loginPassword = envStr("LOGIN_PASSWORD", "");

  const cypressCfg = await getCypressEnvConfig(baseUrl);

  // If CYPRESS_loginType is present and explicit creds are not provided, load them from env_config().
  if (cypressCfg?.cfg) {
    const loginType = cypressCfg.loginType;
    const key = loginType ? `loginBody_${loginType}` : null;
    const body = key ? cypressCfg.cfg?.[key] : null;

    if (body) {
      if (!loginIdentifier && body.identifier) loginIdentifier = body.identifier;
      if (!loginKeyword && body.keyword) loginKeyword = body.keyword;
      if (!loginPassword && body.password) loginPassword = body.password;

      console.log("[auth] resolved from CYPRESS_loginType", {
        CYPRESS_loginType: loginType,
        key,
        resolved: {
          identifier: Boolean(loginIdentifier),
          keyword: Boolean(loginKeyword),
          password: Boolean(loginPassword),
        },
      });
    } else if (loginType) {
      console.log("[auth] CYPRESS_loginType set but mapping not found", { CYPRESS_loginType: loginType, expectedKey: key });
    }
  }

  const AUTO_LOGIN = envBool("AUTO_LOGIN", true);
  let bearerToken = "";

  if (AUTO_LOGIN && loginPassword && (loginIdentifier || loginKeyword)) {
    console.log("[auth] logging in...", {
      url: joinUrl(apiBase, "api/auth/login"),
      identifier: loginIdentifier || undefined,
      keyword: loginKeyword || undefined,
      passwordFrom: process.env.LOGIN_PASSWORD ? "env" : cypressCfg ? "cypress" : "env",
      proxy: "(auth step uses direct connection)",
    });

    try {
      bearerToken = await loginBearer({
        apiBase,
        identifier: loginIdentifier,
        keyword: loginKeyword,
        password: loginPassword,
        headers: baseHeaders,
      });
      console.log("[auth] login ok");
    } catch (e) {
      console.log("[auth] login FAIL", e?.message || e);
      if (e?.body) console.log("[auth] login BODY:", JSON.stringify(e.body).slice(0, 800));
      throw e;
    }
  } else {
    console.log("[auth] bearer login not performed", {
      AUTO_LOGIN,
      hasIdentifier: Boolean(loginIdentifier || loginKeyword),
      hasPassword: Boolean(loginPassword),
    });
  }

  const headers = {
    ...baseHeaders,
    ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
  };

  const numbers = (process.env.NUMBERS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  console.log("--- WA QR Health ---");
  // Proxy support
  const PROXY_LIST_FILE = envStr("PROXY_LIST_FILE", "scripts/ipList");
  const PROXY_MODE = (envStr("PROXY_MODE", "roundrobin") || "roundrobin").toLowerCase(); // roundrobin|random|off
  const PROXY_PER_ITERATION = envBool("PROXY_PER_ITERATION", true);
  const proxies = PROXY_MODE === "off" ? [] : loadProxyList(PROXY_LIST_FILE);
  const proxyAgents = proxies.map((p) => ({ proxy: p, agent: new ProxyAgent(p) }));
  let proxyIdx = 0;

  const pickProxy = () => {
    if (proxyAgents.length === 0) return null;
    if (PROXY_MODE === "random") {
      return proxyAgents[Math.floor(Math.random() * proxyAgents.length)];
    }
    // roundrobin default
    const picked = proxyAgents[proxyIdx % proxyAgents.length];
    proxyIdx++;
    return picked;
  };

  console.log({
    baseUrl,
    apiBase,
    ITERATIONS,
    pollIntervalMs,
    pollTimeoutMs,
    USE_V2,
    INIT_PATH,
    GET_QR_PATH,
    qrField,
    requireDataImagePrefix,
    hasApiKey: Boolean(xApiKey),
    hasBearer: Boolean(bearerToken),
    authMode: bearerToken ? "bearer" : xApiKey ? "x-api-key" : "none",
    proxy: {
      enabled: proxyAgents.length > 0,
      listFile: PROXY_LIST_FILE,
      count: proxyAgents.length,
      mode: PROXY_MODE,
      perIteration: PROXY_PER_ITERATION,
    },
  });

  let pass = 0;
  let fail = 0;

  for (let i = 1; i <= ITERATIONS; i++) {
    const number = numbers.length
      ? numbers[(i - 1) % numbers.length]
      : pickRandomNumber();

    const pickedProxy = PROXY_PER_ITERATION ? pickProxy() : null;
    const dispatcher = pickedProxy?.agent;

    process.stdout.write(`[#${i}] ${number} init... `);

    try {
      if (USE_V2) {
        // 1) create account-channel (simulation) -> obtain id
        const createBodyDefault = {
          accountStatus: "used",
          connectionStatus: "inactive",
          channel: "692e83fb9fe6921a278565ab",
          name: "helo",
          phoneNumber: `+${number}`,
        };
        const createBody = parseJsonEnv(
          "CREATE_ACCOUNT_CHANNEL_BODY_JSON",
          createBodyDefault,
        );

        console.log(`\n  [v2] proxy: ${pickedProxy ? pickedProxy.proxy : "(none)"}`);
        console.log(`\n  [v2] create account-channel: POST ${joinUrl(apiBase, "api/account-channel")}`);
        console.log("  [v2] body:", createBody);
        const created = await createAccountChannel({
          apiBase,
          headers,
          body: createBody,
          dispatcher,
        });
        console.log("  [v2] created id:", created.id);

        // 2) init instance
        // According to API validation error, payload expects `id` (mongodb id) and rejects `accountChannelId`.
        // Default to { id: <accountChannelId> }. Override via INIT_INSTANCE_V2_BODY_JSON if your API differs.
        const initBody = parseJsonEnv("INIT_INSTANCE_V2_BODY_JSON", {
          id: created.id,
        });
        console.log(`  [v2] init instance: POST ${joinUrl(apiBase, "api/account-channel/instance")}`);
        console.log("  [v2] body:", initBody);
        await initInstanceV2({
          apiBase,
          headers,
          body: initBody,
          method: envStr("INIT_INSTANCE_V2_METHOD", "POST"),
          dispatcher,
        });
        console.log("  [v2] init ok; poll qr...");

        // 3) poll QR
        const qrUrl = joinUrl(apiBase, `api/account-channel/instance/qr/${encodeURIComponent(created.id)}`);
        console.log("  [v2] qr url:", qrUrl);

        const res = await pollForQr({
          url: qrUrl,
          headers,
          qrField,
          pollIntervalMs,
          pollTimeoutMs,
          requireDataImagePrefix,
          dispatcher,
        });

        if (res.ok) {
          pass++;
          console.log("PASS");
        } else {
          fail++;
          console.log("FAIL (qr timeout)");
        }
      } else {
        // legacy
        const initUrl = joinUrl(apiBase, `${INIT_PATH}${encodeURIComponent(number)}`);
        const qrUrl = joinUrl(apiBase, `${GET_QR_PATH}${encodeURIComponent(number)}`);
        console.log(`\n  [legacy] init url: ${initUrl}`);
        console.log(`  [legacy] qr url:   ${qrUrl}`);

        await httpJson(initUrl, { method: "GET", headers, dispatcher });
        process.stdout.write("ok; poll qr... ");

        const res = await pollForQr({
          url: qrUrl,
          headers,
          qrField,
          pollIntervalMs,
          pollTimeoutMs,
          requireDataImagePrefix,
          dispatcher,
        });

        if (res.ok) {
          pass++;
          console.log("PASS");
        } else {
          fail++;
          console.log("FAIL (qr timeout)");
        }
      }
    } catch (err) {
      fail++;
      console.log(`FAIL (${err?.message || err})`);
      if (err?.body) console.log("BODY:", JSON.stringify(err.body).slice(0, 800));
    }
  }

  console.log("\nSummary:", { pass, fail, total: ITERATIONS });
  if (fail > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error("FAILED:", err?.message || err);
  process.exitCode = 1;
});
