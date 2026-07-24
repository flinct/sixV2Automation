// SPDX-License-Identifier: MIT
// k6 — standalone: login + loop 5 conversation endpoints (variant1, variant2, count, filter-count, screenshot)
// Usage:
//   k6 run scripts/k6/conversation-5ep.js --env VUS=5 --env DURATION_SEC=120
import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";

const BASE_URL = (__ENV.BASE_URL || "https://dev-v2-api.satuinbox.com").replace(/\/+$/, "");
const LOGIN_PATH = "/api/auth/login";
const SORT = "isPinned:desc,pinnedAt:desc,timestamp:desc";

const ALL_SPECS = [
  { name: "variant1_all",       path: "/api/conversation",            query: { status: "open", sort: SORT, hideEmpty: "true", limit: "20", page: "1" } },
  { name: "variant2_yourinbox", path: "/api/conversation",            query: { assign: "true", status: "open", sort: SORT, hideEmpty: "true", limit: "20", page: "1" } },
  { name: "count",              path: "/api/conversation/count",       query: null },
  { name: "filterCount",        path: "/api/conversation/filter-count", query: { assign: "true" } },
  { name: "screenshotSetting",  path: "/api/conversation/screenshot/setting", query: null },
];

const DURATION_SEC = Number(__ENV.DURATION_SEC || 60);
const POLL_INTERVAL_SEC = Math.max(0.2, Number(__ENV.POLL_INTERVAL_SEC || 2));

export const options = {
  scenarios: {
    conv_5ep: {
      executor: "constant-vus",
      vus: Number(__ENV.VUS || 1),
      duration: `${DURATION_SEC}s`,
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

function buildUrl(path, query) {
  let url = BASE_URL.replace(/\/+$/, '') + path;
  if (query) {
    const params = [];
    for (const [k, v] of Object.entries(query)) {
      params.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
    url += '?' + params.join('&');
  }
  return url;
}

export default function () {
  const creds = credsForVu();
  const token = login(creds);
  const hdrs = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  while (true) {
    const results = [];
    for (const spec of ALL_SPECS) {
      const url = buildUrl(spec.path, spec.query);
      const resp = http.get(url, { headers: hdrs, tags: { endpoint: spec.name } });
      check(resp, { [`${spec.name} status`]: (r) => r.status >= 200 && r.status < 300 });
      results.push({ name: spec.name, status: resp.status, duration: resp.timings.duration });
    }
    const avg = results.reduce((s, r) => s + r.duration, 0) / results.length;
    console.log(
      `[vu#${exec.vu.idInTest}] ` +
      results.map((r) => `${r.name.split("_")[0]}=${r.status}/${r.duration}ms`).join(" ") +
      ` avg=${avg.toFixed(0)}ms`
    );
    sleep(POLL_INTERVAL_SEC);
  }
}

function login(creds) {
  const resp = http.post(buildUrl(LOGIN_PATH), JSON.stringify(creds), {
    headers: { "Content-Type": "application/json" },
    tags: { endpoint: "login" },
  });
  check(resp, { "login ok": (r) => r.status >= 200 && r.status < 300 });
  if (resp.status < 200 || resp.status >= 300) {
    exec.test.abort(`login failed: HTTP ${resp.status}`);
  }
  const body = JSON.parse(resp.body);
  return body?.data?.accessToken || body?.accessToken || body?.token;
}
