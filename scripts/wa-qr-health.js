#!/usr/bin/env node
/**
 * WhatsApp Web (Baileys) QR Health Check
 *
 * PASS criteria: qrCode string exists and starts with "data:image" (or any non-empty string, configurable)
 *
 * Required env:
 * - BASE_URL: e.g. https://dev-v2.satuinbox.com or https://v2.satuinbox.com
 *
 * Auth (choose one):
 * - X_API_KEY: x-api-key (works for some API routes)
 * - or LOGIN_IDENTIFIER/LOGIN_KEYWORD + LOGIN_PASSWORD to obtain Bearer token via api/auth/login
 *
 * Optional env:
 * - NUMBERS: comma-separated whatsapp numbers (digits only or with +) used for init/getQr (default: random)
 * - ITERATIONS: number of attempts (default 20)
 * - POLL_INTERVAL_MS: default 2000
 * - POLL_TIMEOUT_MS: default 60000
 * - QR_FIELD: response field name (default "qrCode")
 * - REQUIRE_DATA_IMAGE_PREFIX: true/false (default true)
 *
 * Endpoints:
 * - Legacy (older envs):
 *   - initInstance:  GET /open/whatsapp/init?force=true&whatsappNumber=
 *   - instanceInfo:  GET /open/instance/info?key=
 *
 * - V2 (omnichannel WhatsApp Web instance):
 *   - create instance: POST /api/account-channel/instance
 *   - get QR:          GET  /api/account-channel/instance/qr/:id
 *
 * If your env uses different paths, override via env:
 * - INIT_PATH: legacy init path (default open/whatsapp/init?force=true&whatsappNumber=)
 * - GET_QR_PATH: legacy get-qr path (default open/instance/info?key=)
 * - INIT_INSTANCE_V2_PATH: default api/account-channel/instance
 * - GET_QR_INSTANCE_V2_PATH: default api/account-channel/instance/qr/
 */

function envInt(name, def) {
  const v = process.env[name];
  if (v == null || v === '') return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Invalid number for ${name}: ${v}`);
  return n;
}

function envStr(name, def = '') {
  const v = process.env[name];
  return v == null || v === '' ? def : String(v);
}

function envBool(name, def = false) {
  const v = (process.env[name] || '').toLowerCase();
  if (!v) return def;
  return v === '1' || v === 'true' || v === 'yes' || v === 'y';
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

async function loginBearer({ apiBase, identifier, keyword, password, xApiKey }) {
  const url = joinUrl(apiBase, 'api/auth/login');
  const body = identifier
    ? { identifier, password }
    : { keyword, password };

  const headers = xApiKey ? { 'x-api-key': xApiKey } : {};
  const res = await httpJson(url, { method: 'POST', headers, body });

  // tolerate several common shapes
  const token =
    res?.accessToken ||
    res?.token ||
    res?.data?.accessToken ||
    res?.data?.token;

  if (!token) {
    throw new Error('login: missing token in response');
  }
  return token;
}

async function createAccountChannel({ apiBase, headers, body }) {
  const url = joinUrl(apiBase, 'api/account-channel');
  const res = await httpJson(url, { method: 'POST', headers, body });
  const id = res?.id || res?.data?.id;
  if (!id) throw new Error('createAccountChannel: missing id in response');
  return { id, raw: res };
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

  // legacy endpoints
  const INIT_PATH = process.env.INIT_PATH || 'open/whatsapp/init?force=true&whatsappNumber=';
  const GET_QR_PATH = process.env.GET_QR_PATH || 'open/instance/info?key=';

  // v2 endpoints
  const INIT_INSTANCE_V2_PATH = process.env.INIT_INSTANCE_V2_PATH || 'api/account-channel/instance';
  const GET_QR_INSTANCE_V2_PATH = process.env.GET_QR_INSTANCE_V2_PATH || 'api/account-channel/instance/qr/';

  const USE_V2 = envBool('USE_V2', true);
  const CREATE_ACCOUNT_CHANNEL = envBool('CREATE_ACCOUNT_CHANNEL', true);

  const xApiKey = process.env.X_API_KEY;

  // Bearer auth (optional but recommended for api/* routes)
  const loginIdentifier = envStr('LOGIN_IDENTIFIER', '');
  const loginKeyword = envStr('LOGIN_KEYWORD', '');
  const loginPassword = envStr('LOGIN_PASSWORD', '');

  let bearerToken = '';
  if (loginPassword && (loginIdentifier || loginKeyword)) {
    bearerToken = await loginBearer({
      apiBase,
      identifier: loginIdentifier,
      keyword: loginKeyword,
      password: loginPassword,
      xApiKey,
    });
  }

  const headers = {
    ...(xApiKey ? { 'x-api-key': xApiKey } : {}),
    ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
  };

  const numbers = (process.env.NUMBERS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const defaultCreateBody = {
    accountStatus: 'used',
    connectionStatus: 'inactive',
    channel: '692e83fb9fe6921a278565ab',
    name: 'helo',
    phoneNumber: '+6285135431732',
  };

  const createAccountChannelBody = parseJsonEnv('CREATE_ACCOUNT_CHANNEL_BODY_JSON', defaultCreateBody);

  console.log('--- WA QR Health ---');
  console.log({
    baseUrl,
    apiBase,
    ITERATIONS,
    pollIntervalMs,
    pollTimeoutMs,
    USE_V2,
    CREATE_ACCOUNT_CHANNEL,
    INIT_INSTANCE_V2_PATH,
    GET_QR_INSTANCE_V2_PATH,
    INIT_PATH,
    GET_QR_PATH,
    qrField,
    requireDataImagePrefix,
    hasApiKey: Boolean(xApiKey),
    hasBearer: Boolean(bearerToken),
  });

  let pass = 0;
  let fail = 0;

  for (let i = 1; i <= ITERATIONS; i++) {
    const number = numbers.length ? numbers[(i - 1) % numbers.length] : pickRandomNumber();

    process.stdout.write(`[#${i}] ${number} init... `);

    try {
      if (USE_V2) {
        // Create account-channel (simulation) to obtain an id, unless provided.
        const accountChannelId = envStr('ACCOUNT_CHANNEL_ID', '');

        let idToUse = accountChannelId;
        if (!idToUse && CREATE_ACCOUNT_CHANNEL) {
          const body = { ...createAccountChannelBody, phoneNumber: createAccountChannelBody.phoneNumber || `+${number}` };
          const created = await createAccountChannel({ apiBase, headers, body });
          idToUse = created.id;
        }

        if (!idToUse) {
          throw new Error('Missing ACCOUNT_CHANNEL_ID and CREATE_ACCOUNT_CHANNEL=false; cannot proceed');
        }

        // init instance (method/body may vary; allow override)
        const initUrl = joinUrl(apiBase, INIT_INSTANCE_V2_PATH);
        const initBody = parseJsonEnv('INIT_INSTANCE_V2_BODY_JSON', { id: idToUse, accountChannelId: idToUse });
        await httpJson(initUrl, { method: envStr('INIT_INSTANCE_V2_METHOD', 'POST'), headers, body: initBody });

        process.stdout.write(`ok (id=${idToUse}); poll qr... `);

        const qrUrl = joinUrl(apiBase, `${GET_QR_INSTANCE_V2_PATH}${encodeURIComponent(idToUse)}`);
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
      } else {
        // Legacy flow
        const initUrl = joinUrl(apiBase, `${INIT_PATH}${encodeURIComponent(number)}`);
        const qrUrl = joinUrl(apiBase, `${GET_QR_PATH}${encodeURIComponent(number)}`);

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
      }
    } catch (err) {
      fail++;
      console.log(`FAIL (${err?.message || err})`);
      if (err?.body) console.log('BODY:', JSON.stringify(err.body).slice(0, 800));
    }
  }

  console.log('\nSummary:', { pass, fail, total: ITERATIONS });
  if (fail > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error('FAILED:', err?.message || err);
  process.exitCode = 1;
});
