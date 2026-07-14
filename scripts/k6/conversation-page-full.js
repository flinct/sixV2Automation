import http from "k6/http";
import { check, fail, sleep } from "k6";
import exec from "k6/execution";

const BASE_URL = (__ENV.BASE_URL || "https://v2-api.satuinbox.com").replace(
  /\/+$/,
  "",
);
// const BASE_URL = (__ENV.BASE_URL || 'https://dev-v2-api.satuinbox.com').replace(/\/+$/, '');
const LOGIN_PATH = "/api/auth/login";
const ME_PATH = "/api/auth/me";

const DEFAULT_CONVERSATION_QUERY = {
  status: __ENV.CONVERSATION_STATUS || "open",
  sort: __ENV.CONVERSATION_SORT || "isPinned:desc,pinnedAt:desc,timestamp:desc",
  hideEmpty: __ENV.CONVERSATION_HIDE_EMPTY || "true",
  limit: String(__ENV.CONVERSATION_LIMIT || "20"),
  page: String(__ENV.CONVERSATION_PAGE || "1"),
};

const VIEWER_DETAIL_EVERY = Math.max(1, Number(__ENV.VIEWER_DETAIL_EVERY || 3));
const IS_AGENT = String(__ENV.IS_AGENT || "false").toLowerCase() === "true";
const POLL_SLEEP_MS = Number(__ENV.POLL_SLEEP_MS || 1000);

const FLAT_ENDPOINTS = [
  ["conversation", "/api/conversation", DEFAULT_CONVERSATION_QUERY],
  ["conversationCount", "/api/conversation/count", null],
  [
    "conversationFilterCountAssign",
    "/api/conversation/filter-count",
    { assign: "true" },
  ],
  [
    "conversationActiveCount",
    "/api/conversation/active-conversation-count",
    null,
  ],
  ["conversationGroup", "/api/conversation/group", null],
  ["conversationTags", "/api/conversation/tags", null],
  [
    "notificationsUnreadPrimary",
    "/api/notifications/unread-count",
    { group: "primary" },
  ],
  [
    "notificationsUnreadUpdates",
    "/api/notifications/unread-count",
    { group: "updates" },
  ],
  ["memberStatus", "/api/member/status", null],
  ["memberList", "/api/member", { limit: "100", page: "1" }],
  ["tagList", "/api/tag", { limit: "100", page: "1" }],
  ["awayReasons", "/api/away-reasons", null],
];

if (IS_AGENT) {
  FLAT_ENDPOINTS.push([
    "conversationAvailableSlot",
    "/api/conversation/available-slot",
    null,
  ]);
}

export const options = {
  scenarios: {
    conversation_page: {
      executor: __ENV.EXECUTOR || "constant-vus",
      vus: Number(__ENV.VUS || 1),
      duration: __ENV.DURATION || "30s",
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.2"],
    http_req_duration: ["p(95)<10000"],
  },
};

function credsForVu() {
  const user =
    __ENV[`E2E_USER_${exec.vu.idInTest}`] ||
    __ENV.E2E_USER ||
    __ENV.E2E_sap_AGENT403_USER;
  const password =
    __ENV[`E2E_PASSWORD_${exec.vu.idInTest}`] ||
    __ENV.E2E_PASSWORD ||
    __ENV.E2E_sap_AGENT403_PASSWORD;
  if (user && password) return { identifier: user, password };
  fail(
    "Set E2E_USER/E2E_PASSWORD, per-VU E2E_USER_n/E2E_PASSWORD_n, or E2E_sap_AGENT403_USER/E2E_sap_AGENT403_PASSWORD",
  );
}

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function url(path, query) {
  if (!query) return `${BASE_URL}${path}`;
  const qs = Object.entries(query)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join("&");
  return qs ? `${BASE_URL}${path}?${qs}` : `${BASE_URL}${path}`;
}

function unwrap(json) {
  return json && typeof json === "object" && json.data ? json.data : json;
}

function parseJson(resp) {
  try {
    return resp.json();
  } catch (_) {
    return null;
  }
}

function login() {
  const creds = credsForVu();
  const resp = http.post(url(LOGIN_PATH), JSON.stringify(creds), {
    headers: { "Content-Type": "application/json" },
    tags: { endpoint: "authLogin" },
  });
  check(resp, { "login ok": (r) => r.status === 200 || r.status === 201 }) ||
    fail(
      `login failed status=${resp.status} body=${String(resp.body).slice(0, 200)}`,
    );
  const body = parseJson(resp);
  const payload = unwrap(body) || body || {};
  const token =
    payload.accessToken || payload.token || payload?.data?.accessToken;
  if (!token)
    fail(`login no accessToken body=${String(resp.body).slice(0, 200)}`);
  return token;
}

function getMe(token) {
  const resp = http.get(url(ME_PATH), {
    headers: authHeaders(token),
    tags: { endpoint: "authMe" },
  });
  check(resp, { "me 200": (r) => r.status === 200 }) ||
    fail(`auth/me failed status=${resp.status}`);
  return parseJson(resp);
}

function firstItem(body) {
  const data = unwrap(body);
  if (Array.isArray(data)) return data[0] || null;
  if (Array.isArray(data?.items)) return data.items[0] || null;
  if (Array.isArray(data?.docs)) return data.docs[0] || null;
  if (Array.isArray(body?.items)) return body.items[0] || null;
  if (Array.isArray(body?.docs)) return body.docs[0] || null;
  return null;
}

function pickIds(item) {
  if (!item) return {};
  return {
    conversationId:
      item.id ||
      item._id ||
      item.conversationId ||
      item?.conversation?._id ||
      item?.conversation?.id,
    clientContactId:
      item.clientContactId ||
      item?.clientContact?._id ||
      item?.clientContact?.id ||
      item?.contact?._id ||
      item?.contact?.id,
  };
}

function flatRequests(token) {
  return FLAT_ENDPOINTS.map(([name, path, query]) => ({
    method: "GET",
    url: url(path, query),
    params: {
      headers: authHeaders(token),
      tags: { endpoint: name },
    },
  }));
}

function detailRequests(token, ids) {
  const reqs = [];
  if (ids.conversationId) {
    reqs.push({
      method: "GET",
      url: url(`/api/conversation/${ids.conversationId}`),
      params: {
        headers: authHeaders(token),
        tags: { endpoint: "conversationById" },
      },
    });
    reqs.push({
      method: "GET",
      url: url("/api/conversation/participants", {
        conversationId: ids.conversationId,
      }),
      params: {
        headers: authHeaders(token),
        tags: { endpoint: "conversationParticipants" },
      },
    });
    reqs.push({
      method: "GET",
      url: url(`/api/conversation-sla-metrics/${ids.conversationId}`),
      params: {
        headers: authHeaders(token),
        tags: { endpoint: "conversationSlaMetrics" },
      },
    });
  }
  if (ids.clientContactId) {
    reqs.push({
      method: "GET",
      url: url("/api/conversation/history", {
        clientContactId: ids.clientContactId,
      }),
      params: {
        headers: authHeaders(token),
        tags: { endpoint: "conversationHistory" },
      },
    });
  }
  return reqs;
}

function requireOk(batch, label) {
  for (const [name, resp] of Object.entries(batch)) {
    check(resp, {
      [`${label}:${name} ok`]: (r) => r.status >= 200 && r.status < 300,
    });
  }
}

const POLLS_PER_ITER = Math.max(1, Number(__ENV.POLLS_PER_ITER || 5));

export default function () {
  const token = login();
  getMe(token);

  let lastIds = {};
  for (let i = 1; i <= POLLS_PER_ITER; i += 1) {
    const flat = http.batch(
      Object.fromEntries(
        flatRequests(token).map((r) => [r.params.tags.endpoint, r]),
      ),
    );
    requireOk(flat, "flat");

    const listBody = parseJson(flat.conversation);
    lastIds = pickIds(firstItem(listBody));

    if (i % VIEWER_DETAIL_EVERY === 0) {
      const details = detailRequests(token, lastIds);
      if (details.length) {
        const detailBatch = http.batch(
          Object.fromEntries(details.map((r) => [r.params.tags.endpoint, r])),
        );
        requireOk(detailBatch, "detail");
      }
    }

    sleep(POLL_SLEEP_MS / 1000);
  }
}

export function smoke() {
  const token = login();
  getMe(token);
  const flat = http.batch(
    Object.fromEntries(
      flatRequests(token).map((r) => [r.params.tags.endpoint, r]),
    ),
  );
  const listBody = parseJson(flat.conversation);
  const ids = pickIds(firstItem(listBody));
  const details = detailRequests(token, ids);
  if (details.length) {
    http.batch(
      Object.fromEntries(details.map((r) => [r.params.tags.endpoint, r])),
    );
  }
}
