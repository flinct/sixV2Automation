'use strict';

const { classifyFetchError } = require('./error-classifier');

function appendQuery(url, params) {
  const next = new URL(url);
  if (!params) return next.toString();

  if (typeof params === 'string') {
    const fromString = new URLSearchParams(params);
    for (const [key, value] of fromString.entries()) {
      next.searchParams.set(key, value);
    }
    return next.toString();
  }

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    next.searchParams.set(key, String(value));
  }
  return next.toString();
}

async function request(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body,
    timeoutMs = 30000,
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();

  try {
    const init = {
      method,
      headers: { ...headers },
      signal: controller.signal,
    };

    if (body !== undefined) {
      if (typeof body === 'string' || body instanceof URLSearchParams) {
        init.body = body;
      } else {
        init.body = JSON.stringify(body);
        if (!Object.keys(init.headers).some((k) => k.toLowerCase() === 'content-type')) {
          init.headers['content-type'] = 'application/json';
        }
      }
    }

    const response = await fetch(url, init);
    const text = await response.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      durationMs: Date.now() - startedAt,
      text,
      json,
      errorCode: null,
      causeCode: null,
    };
  } catch (error) {
    const classified = classifyFetchError(error);
    return {
      ok: false,
      status: 0,
      statusText: classified.errorCode,
      durationMs: Date.now() - startedAt,
      text: '',
      json: null,
      errorCode: classified.errorCode,
      causeCode: classified.causeCode,
      error: classified.message || error?.message || String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function timedGet(url, token, options = {}) {
  const headers = {
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };
  return request(url, { ...options, method: 'GET', headers });
}

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return sorted[idx];
}

function formatDurationStats(values) {
  if (!values.length) return 'n/a';
  const sorted = [...values].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, n) => acc + n, 0);
  const avg = Math.round(sum / sorted.length);
  return `min=${sorted[0]}ms avg=${avg}ms p50=${percentile(sorted, 50)}ms p95=${percentile(sorted, 95)}ms max=${sorted[sorted.length - 1]}ms`;
}

module.exports = {
  appendQuery,
  formatDurationStats,
  percentile,
  request,
  timedGet,
};
