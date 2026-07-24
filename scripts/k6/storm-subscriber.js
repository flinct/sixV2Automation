// SPDX-License-Identifier: MIT
// k6 — storm subscriber simulation: 5 conversation endpoints login → landing burst → periodic refetch
import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";

const BASE_URL = (__ENV.BASE_URL || "https://dev-v2-api.satuinbox.com").replace(/\/+$/, "");
const LOGIN_PATH = "/api/auth/login";
const ME_PATH = "/api/auth/me";

const SORT = "isPinned:desc,pinnedAt:desc,timestamp:desc";

const LANDING_SPECS = [
  { name: "variant1_all",       path: "/api/conversation",           query: { status: "open", sort: SORT, hideEmpty: "true", limit: "20", page: "1" } },
  { name: "variant2_yourinbox", path: "/api/conversation",           query: { assign: "true", status: "open", sort: SORT, hideEmpty: "true", limit: "20", page: "1" } },
  { name: "count",              path: "/api/conversation/count",      query: null },
  { name: "filterCount",        path: "/api/conversation/filter-count", query: { assign: "true" } },
  { name: "screenshotSetting",  path: "/api/conversation/screenshot/setting", query: null },
];

const HOTPATH_SPECS = [
  { name: "variant1_all",       path: "/api/conversation",           query: { status: "open", sort: SORT, hideEmpty: "true", limit: "20", page: "1" } },
  { name: "count",              path: "/api/conversation/count",      query: null },
];

const POLL_INTERVAL_SEC = Math.max(0.2, Number(__ENV.POLL_INTERVAL_SEC || 1));
const DURATION_SEC = Number(__ENV.DURATION_SEC || 60);

export const options = {
  scenarios: {
    storm_subscriber: {
      executor: "per-vu-iterations",
      vus: Number(__ENV.VUS || 1),
      iterations: 1,
      maxDuration: `${DURATION_SEC + 30}s`,
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.3"],
  },
};

function credsForVu() {
  const user = __ENV[`E2E_USER_${exec.vu.idInTest}`] || __ENV.E2E_USER || "chickentester01";
  const pass = __ENV[`E2E_PASSWORD_${exec.vu.idInTest}`] || __ENV.E2E_PASSWORD || "ChickenTester01!";
  return { identifier: user, password: pass };
}

function authHeaders(token) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

function buildUrl(path, query) {
  const url = new URL(path, BASE_URL);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

function hitEndpoint(url, headers, name, metrics) {
  const resp = http.get(url, { headers, tags: { endpoint: name } });
  const ok = resp.status >= 200 && resp.status < 300;
  metrics[name] = metrics[name] || { ok: 0, err: 0 };
  if (ok) metrics[name].ok += 1;
  else metrics[name].err += 1;
  return { ok, status: resp.status, body: resp.body };
}

export default function () {
  const creds = credsForVu();
  const metrics = {};

  // -- Login --
  const loginResp = http.post(buildUrl(LOGIN_PATH), JSON.stringify(creds), {
    headers: { "Content-Type": "application/json" },
    tags: { endpoint: "login" },
  });
  check(loginResp, { "login ok": (r) => r.status === 200 });
  if (loginResp.status !== 200) {
    exec.test.abort(`login failed: HTTP ${loginResp.status}`);
  }
  const body = JSON.parse(loginResp.body);
  const token = body?.data?.accessToken || body?.accessToken || body?.token;
  if (!token) exec.test.abort("no accessToken in login response");

  const hdrs = authHeaders(token);
  const vuTag = `vu#${exec.vu.idInTest}`;

  // -- Landing burst: hit all 5 endpoints once --
  for (const spec of LANDING_SPECS) {
    const url = buildUrl(spec.path, spec.query);
    const result = hitEndpoint(url, hdrs, spec.name, metrics);
    check(result, { [`landing ${spec.name} ok`]: (r) => r.ok });
  }
  console.log(`[${vuTag}] landing burst done`);

  // -- Periodic hotpath: variant1 + count loop --
  const deadline = Date.now() + DURATION_SEC * 1000;
  let cycle = 0;
  while (Date.now() < deadline) {
    cycle += 1;
    const results = [];
    for (const spec of HOTPATH_SPECS) {
      const url = buildUrl(spec.path, spec.query);
      const r = hitEndpoint(url, hdrs, spec.name, metrics);
      results.push(r);
    }
    if (cycle % 10 === 0) {
      console.log(
        `[${vuTag}] cycle=${cycle} variant1=${results[0].status}/${results[0].ok} count=${results[1].status}/${results[1].ok}`
      );
    }
    sleep(POLL_INTERVAL_SEC);
  }

  // -- Print final metrics --
  console.log(`[${vuTag}] final:`);
  for (const [name, bucket] of Object.entries(metrics)) {
    console.log(`  ${name.padEnd(40)} ok=${bucket.ok} err=${bucket.err}`);
  }
}
