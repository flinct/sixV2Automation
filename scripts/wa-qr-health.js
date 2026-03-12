#!/usr/bin/env node
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
  if (v == null || v === '') return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Invalid number for ${name}: ${v}`);
  return n;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function apiBaseFromBaseUrl(baseUrl) {
  if (baseUrl === 'https://dev-v2.satuinbox.com') return 'https://dev-v2-api.satuinbox.com/';
  if (baseUrl === 'https://v2.satuinbox.com') return 'https://v2-api.satuinbox.com/';
  if (baseUrl === 'https://app.satuinbox.com') return 'https://app.satuinbox.com/api/v1';
  if (baseUrl === 'https://dev.satuinbox.com') return 'https://dev.satuinbox.com/api/v1';
  if (baseUrl === 'https://staging.satuinbox.com') return 'https://staging.satuinbox.com/api/v1';
  throw new Error(`Unknown BASE_URL mapping: ${baseUrl}`);
}

function joinUrl(base, path) {
  if (!base.endsWith('/') && !path.startsWith('/')) return `${base}/${path}`;
  if (base.endsWith('/') && path.startsWith('/')) return `${base}${path.slice(1)}`;
  return `${base}${path}`;
}

async function httpJson(url, { method = 'GET', headers = {}, body } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: body == null ? undefined : JSON.stringify(body),
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

function pickRandomNumber() {
  // Indonesian-like random number (not necessarily valid)
  const suffix = String(Math.floor(Math.random() * 1e9)).padStart(9, '0');
  return `628${suffix}`;
}

async function pollForQr({ url, headers, qrField, pollIntervalMs, pollTimeoutMs, requireDataImagePrefix }) {
  const start = Date.now();
  while (Date.now() - start < pollTimeoutMs) {
    const data = await httpJson(url, { headers });
    const qr = data?.[qrField];
    const ok =
      typeof qr === 'string' &&
      qr.length > 0 &&
      (!requireDataImagePrefix || qr.startsWith('data:image'));

    if (ok) return { ok: true, qr };
    await sleep(pollIntervalMs);
  }
  return { ok: false };
}

async function main() {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) throw new Error('Missing BASE_URL');

  const apiBase = apiBaseFromBaseUrl(baseUrl);

  const ITERATIONS = envInt('ITERATIONS', 20);
  const pollIntervalMs = envInt('POLL_INTERVAL_MS', 2000);
  const pollTimeoutMs = envInt('POLL_TIMEOUT_MS', 60000);

  const qrField = process.env.QR_FIELD || 'qrCode';
  const requireDataImagePrefix = (process.env.REQUIRE_DATA_IMAGE_PREFIX || 'true').toLowerCase() === 'true';

  const INIT_PATH = process.env.INIT_PATH || 'open/whatsapp/init?force=true&whatsappNumber=';
  const GET_QR_PATH = process.env.GET_QR_PATH || 'open/instance/info?key=';

  const xApiKey = process.env.X_API_KEY;
  const headers = xApiKey ? { 'x-api-key': xApiKey } : {};

  const numbers = (process.env.NUMBERS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  console.log('--- WA QR Health ---');
  console.log({ baseUrl, apiBase, ITERATIONS, pollIntervalMs, pollTimeoutMs, INIT_PATH, GET_QR_PATH, qrField, requireDataImagePrefix });

  let pass = 0;
  let fail = 0;

  for (let i = 1; i <= ITERATIONS; i++) {
    const number = numbers.length ? numbers[(i - 1) % numbers.length] : pickRandomNumber();

    const initUrl = joinUrl(apiBase, `${INIT_PATH}${encodeURIComponent(number)}`);
    const qrUrl = joinUrl(apiBase, `${GET_QR_PATH}${encodeURIComponent(number)}`);

    process.stdout.write(`[#${i}] ${number} init... `);

    try {
      await httpJson(initUrl, { method: 'GET', headers });
      process.stdout.write('ok; poll qr... ');

      const res = await pollForQr({
        url: qrUrl,
        headers,
        qrField,
        pollIntervalMs,
        pollTimeoutMs,
        requireDataImagePrefix,
      });

      if (res.ok) {
        pass++;
        console.log('PASS');
      } else {
        fail++;
        console.log('FAIL (qr timeout)');
      }
    } catch (err) {
      fail++;
      console.log(`FAIL (${err?.message || err})`);
      if (err?.body) console.log('BODY:', JSON.stringify(err.body).slice(0, 500));
    }
  }

  console.log('\nSummary:', { pass, fail, total: ITERATIONS });
  if (fail > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error('FAILED:', err?.message || err);
  process.exitCode = 1;
});
