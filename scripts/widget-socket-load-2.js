#!/usr/bin/env node
/**
 * Widget Socket Load Test (Node) - v2 (index -2)
 *
 * Purpose:
 * - Provide 2 minimal scenarios for HPA + Socket.IO validation at scale.
 *   1) Connection soak (memory focus): many clients connect, minimal traffic.
 *   2) Message throughput (CPU focus): clients emit an event periodically.
 *
 * This variant intentionally DOES NOT depend on open-api flows (createClientContact/submitTopic)
 * so you can isolate pure Socket.IO/WS scaling behaviour.
 *
 * Required:
 * - BASE_URL: e.g. https://v2.satuinbox.com OR https://dev-v2.satuinbox.com
 * - SIGNATURE_KEY: widget signature key (used only when SOCKET_AUTH_MODE=signatureKey)
 *
 * Optional:
 * - MODE: "soak" | "throughput" (default: soak)
 * - TARGET_CONNECTIONS: total socket clients (default: 1200)
 * - RAMP_STEP: how many clients to add per batch (default: 50)
 * - RAMP_DELAY_MS: delay between batches (default: 250)
 * - RUN_DURATION_MS: how long to keep running after ramp-up (default: 3600000 = 1h)
 * - CONNECT_TIMEOUT_MS: per-client connect timeout (default: 15000)
 * - SOCKET_AUTH_MODE: "signatureKey" | "none" (default: signatureKey)
 * - SOCKET_PATH: socket.io path (default: /socket.io)
 *
 * Throughput-only:
 * - EMIT_EVENT: event name to emit periodically (default: widget.ping)
 * - EMIT_EVERY_MS: per-client emit interval (default: 2000)
 * - EMIT_PAYLOAD_JSON: JSON string payload (default: {"t":"ping"})
 * - EXPECT_EVENTS: comma-separated list of events to count as "delivered" (default: empty)
 * - DEBUG_ALL_EVENTS: true|false (default false)
 *
 * Notes:
 * - If your server validates event names/payloads strictly, set EMIT_EVENT to one that exists
 *   (example: join.conversation) and adjust payload accordingly via EMIT_PAYLOAD_JSON.
 */

const { io } = require('socket.io-client');

function envInt(name, def) {
  const v = process.env[name];
  if (v == null || v === '') return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Invalid number for ${name}: ${v}`);
  return n;
}

function envStr(name, def) {
  const v = process.env[name];
  return v == null || v === '' ? def : String(v);
}

function envBool(name, def = false) {
  const v = (process.env[name] || '').toLowerCase();
  if (!v) return def;
  return v === '1' || v === 'true' || v === 'yes' || v === 'y';
}

function makeLogger() {
  const level = (envStr('LOG_LEVEL', 'info') || 'info').toLowerCase();
  const levels = { silent: 0, error: 1, warn: 2, info: 3, debug: 4 };
  const cur = levels[level] ?? 3;

  const ts = () => new Date().toISOString();
  const fmt = (tag, args) => [`[${ts()}] ${tag}`, ...args];

  return {
    level,
    error: (...args) => cur >= 1 && console.error(...fmt('[ERROR]', args)),
    warn: (...args) => cur >= 2 && console.warn(...fmt('[WARN ]', args)),
    info: (...args) => cur >= 3 && console.log(...fmt('[INFO ]', args)),
    debug: (...args) => cur >= 4 && console.log(...fmt('[DEBUG]', args)),
  };
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

function parseJsonEnv(name, defObj) {
  const raw = process.env[name];
  if (!raw) return defObj;
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Invalid JSON in ${name}: ${(e && e.message) || e}`);
  }
}

class LoadClient {
  constructor({ id, baseUrl, socketUrl, socketPath, signatureKey, socketAuthMode, connectTimeoutMs, debugAllEvents, expectEvents }) {
    this.id = id;
    this.baseUrl = baseUrl;
    this.socketUrl = socketUrl;
    this.socketPath = socketPath;
    this.signatureKey = signatureKey;
    this.socketAuthMode = socketAuthMode;
    this.connectTimeoutMs = connectTimeoutMs;
    this.debugAllEvents = debugAllEvents;
    this.expectEvents = expectEvents;

    this.socket = null;
    this.connectedAt = null;

    this.stats = {
      connectErrors: 0,
      disconnects: 0,
      emits: 0,
      expectHits: 0,
    };
  }

  async connect() {
    const auth = this.socketAuthMode === 'signatureKey' ? { token: this.signatureKey } : undefined;

    this.socket = io(this.socketUrl, {
      path: this.socketPath,
      transports: ['websocket'],
      forceNew: true,
      auth,
      extraHeaders: {
        Origin: this.baseUrl,
      },
    });

    if (this.debugAllEvents) {
      this.socket.onAny((event, ...args) => {
        // keep output small: only first arg
        console.log(`[client:${this.id}] EVENT`, event, args?.[0]);
      });
    }

    if (this.expectEvents && this.expectEvents.length) {
      for (const ev of this.expectEvents) {
        this.socket.on(ev, () => {
          this.stats.expectHits++;
        });
      }
    }

    this.socket.on('connect_error', () => {
      this.stats.connectErrors++;
    });

    this.socket.on('disconnect', () => {
      this.stats.disconnects++;
    });

    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error(`client ${this.id} connect timeout`)), this.connectTimeoutMs);
      this.socket.on('connect', () => {
        clearTimeout(t);
        this.connectedAt = Date.now();
        resolve();
      });
    });
  }

  emit(event, payload) {
    if (!this.socket) return;
    this.socket.emit(event, payload);
    this.stats.emits++;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

async function main() {
  const log = makeLogger();

  const baseUrlRaw = process.env.BASE_URL || process.env.CYPRESS_baseUrl || process.env.CYPRESS_BASE_URL;
  const baseUrl = typeof baseUrlRaw === 'string' ? baseUrlRaw.replace(/\/+$/g, '') : baseUrlRaw;

  if (!baseUrl) throw new Error('Missing BASE_URL');

  const apiBase = apiBaseFromBaseUrl(baseUrl);
  const socketUrl = joinUrl(apiBase, 'conversations');

  const signatureKey = process.env.SIGNATURE_KEY || '';
  const MODE = (envStr('MODE', 'soak') || 'soak').toLowerCase();
  const TARGET_CONNECTIONS = envInt('TARGET_CONNECTIONS', 1200);
  const RAMP_STEP = envInt('RAMP_STEP', 50);
  const RAMP_DELAY_MS = envInt('RAMP_DELAY_MS', 250);
  const RUN_DURATION_MS = envInt('RUN_DURATION_MS', 60 * 60 * 1000);
  const CONNECT_TIMEOUT_MS = envInt('CONNECT_TIMEOUT_MS', 15000);
  const SOCKET_AUTH_MODE = envStr('SOCKET_AUTH_MODE', 'signatureKey');
  const SOCKET_PATH = envStr('SOCKET_PATH', '/socket.io');

  const DEBUG_ALL_EVENTS = envBool('DEBUG_ALL_EVENTS', false);
  const EXPECT_EVENTS = envStr('EXPECT_EVENTS', '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (SOCKET_AUTH_MODE === 'signatureKey' && !signatureKey) {
    throw new Error('Missing SIGNATURE_KEY (required when SOCKET_AUTH_MODE=signatureKey)');
  }

  // throughput options
  const EMIT_EVENT = envStr('EMIT_EVENT', 'widget.ping');
  const EMIT_EVERY_MS = envInt('EMIT_EVERY_MS', 2000);
  const EMIT_PAYLOAD_JSON = parseJsonEnv('EMIT_PAYLOAD_JSON', { t: 'ping', ts: () => undefined });

  log.info('Starting widget-socket-load-2', {
    baseUrl,
    apiBase,
    socketUrl,
    mode: MODE,
    targetConnections: TARGET_CONNECTIONS,
    rampStep: RAMP_STEP,
    rampDelayMs: RAMP_DELAY_MS,
    runDurationMs: RUN_DURATION_MS,
    socketPath: SOCKET_PATH,
    socketAuthMode: SOCKET_AUTH_MODE,
    expectEvents: EXPECT_EVENTS,
    emit: MODE === 'throughput' ? { event: EMIT_EVENT, everyMs: EMIT_EVERY_MS } : undefined,
    logLevel: log.level,
  });

  /** @type {LoadClient[]} */
  const clients = [];

  let stop = false;
  const startedAt = Date.now();

  const statsInterval = setInterval(() => {
    const connected = clients.filter((c) => c.socket && c.socket.connected).length;

    let connectErrors = 0;
    let disconnects = 0;
    let emits = 0;
    let expectHits = 0;
    for (const c of clients) {
      connectErrors += c.stats.connectErrors;
      disconnects += c.stats.disconnects;
      emits += c.stats.emits;
      expectHits += c.stats.expectHits;
    }

    const uptimeSec = Math.round((Date.now() - startedAt) / 1000);
    log.info('progress', {
      uptimeSec,
      created: clients.length,
      connected,
      connectErrors,
      disconnects,
      emits,
      expectHits,
    });
  }, 10000);

  try {
    // ramp-up
    for (let i = 0; i < TARGET_CONNECTIONS; i += RAMP_STEP) {
      const batchSize = Math.min(RAMP_STEP, TARGET_CONNECTIONS - i);
      const batch = Array.from({ length: batchSize }).map((_, j) => {
        const id = i + j + 1;
        return new LoadClient({
          id,
          baseUrl,
          socketUrl,
          socketPath: SOCKET_PATH,
          signatureKey,
          socketAuthMode: SOCKET_AUTH_MODE,
          connectTimeoutMs: CONNECT_TIMEOUT_MS,
          debugAllEvents: DEBUG_ALL_EVENTS,
          expectEvents: EXPECT_EVENTS,
        });
      });

      // connect in parallel within batch
      await Promise.all(
        batch.map(async (c) => {
          try {
            await c.connect();
          } catch (e) {
            // keep going; we still keep the client instance for stats
            c.stats.connectErrors++;
          }
        }),
      );

      clients.push(...batch);
      log.info('ramp', { created: clients.length, target: TARGET_CONNECTIONS });
      await sleep(RAMP_DELAY_MS);
    }

    log.info('ramp complete', {
      created: clients.length,
      connected: clients.filter((c) => c.socket && c.socket.connected).length,
    });

    // run phase
    if (MODE === 'throughput') {
      const payloadTemplate = EMIT_PAYLOAD_JSON;

      const loops = clients.map(async (c) => {
        while (!stop) {
          if (c.socket && c.socket.connected) {
            // allow ts to be dynamic
            const payload = typeof payloadTemplate === 'object' && payloadTemplate
              ? { ...payloadTemplate, ts: new Date().toISOString(), clientId: c.id }
              : payloadTemplate;
            c.emit(EMIT_EVENT, payload);
          }
          await sleep(EMIT_EVERY_MS);
        }
      });

      await sleep(RUN_DURATION_MS);
      stop = true;
      await Promise.allSettled(loops);
    } else {
      // soak
      await sleep(RUN_DURATION_MS);
    }
  } finally {
    clearInterval(statsInterval);
    for (const c of clients) c.disconnect();
  }

  // final summary
  const connected = clients.filter((c) => c.socket && c.socket.connected).length;
  let connectErrors = 0;
  let disconnects = 0;
  let emits = 0;
  let expectHits = 0;
  for (const c of clients) {
    connectErrors += c.stats.connectErrors;
    disconnects += c.stats.disconnects;
    emits += c.stats.emits;
    expectHits += c.stats.expectHits;
  }

  log.info('done', {
    created: clients.length,
    connected,
    connectErrors,
    disconnects,
    emits,
    expectHits,
  });
}

main().catch((err) => {
  console.error('FAILED:', err?.stack || err?.message || err);
  process.exitCode = 1;
});
