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
 * - EMIT_EVENT: event name to emit periodically (default: socket.inbound.message)
 * - EMIT_EVERY_MS: per-client emit interval (default: 2000)
 * - EMIT_PAYLOAD_JSON: JSON string payload.
 *   Default matches scripts/widget-socket-load.js inbound payload shape.
 *
 *   Identifiers can be provided OR auto-prepared using the same open-api flow as scripts/widget-socket-load.js.
 *
 *   Provide manually via env vars:
 *   - CHANNEL_ACCOUNT_ID (same as channelAccountId)
 *   - CLIENT_CONTACT_ID (same as clientContactId)
 *
 *   Or enable auto-prepare (default: true when either id is missing):
 *   - AUTO_PREPARE=true|false (default true)
 *   - PREPARE_MODE=shared|perClient (default shared)
 *   - WIDGET_CHANNEL_ID (optional; otherwise uses hardcoded default per BASE_URL)
 *   - WIDGET_ACCOUNT_CHANNEL_IDS (optional; comma-separated; otherwise uses hardcoded default per BASE_URL)
 *   - TOPIC_PREFIX (default loadtest)
 *   - JOIN_EVENT (default join.conversation)
 *
 *   The script will auto-fill: tempMessageId, timestamp, content.
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

function uuid() {
  try {
    return require('crypto').randomUUID();
  } catch {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
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

    // Optional per-client prepared identifiers
    this.prepared = {
      channelAccountId: null,
      clientContactId: null,
      conversationId: null,
    };

    this.stats = {
      connectErrors: 0,
      disconnects: 0,
      emits: 0,
      expectHits: 0,
      prepareErrors: 0,
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

async function createClientContact({ apiBase, signatureKey, channelId, guestName, referenceId }) {
  const url = joinUrl(apiBase, 'open-api/client-contact');
  return httpJson(url, {
    method: 'POST',
    headers: {
      'x-signature-key': signatureKey,
    },
    body: {
      channelId,
      metaData: {
        browserName: 'Chrome',
        deviceType: 'Desktop',
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
      },
      name: guestName,
      referenceId,
    },
  });
}

async function submitTopic({ apiBase, signatureKey, accountChannelId, clientContactId, topicName }) {
  const url = joinUrl(apiBase, 'open-api/conversation/submit/topic');
  return httpJson(url, {
    method: 'POST',
    headers: {
      'x-signature-key': signatureKey,
    },
    body: {
      accountChannelId,
      clientContactId,
      metadata: [
        {
          browserName: 'Chrome',
          deviceType: 'Desktop',
          topic: topicName,
          userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
        },
      ],
    },
  });
}

function randomAlphanumeric(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
}

async function main() {
  const log = makeLogger();

  const baseUrlRaw = process.env.BASE_URL || process.env.CYPRESS_baseUrl || process.env.CYPRESS_BASE_URL;
  const baseUrl = typeof baseUrlRaw === 'string' ? baseUrlRaw.replace(/\/+$/g, '') : baseUrlRaw;

  if (!baseUrl) throw new Error('Missing BASE_URL');

  const apiBase = apiBaseFromBaseUrl(baseUrl);
  const socketUrl = joinUrl(apiBase, 'conversations');

  // Hardcoded defaults per environment (mirrors scripts/widget-socket-load.js)
  function envDefaultsFromBaseUrl(baseUrlStr) {
    if (typeof baseUrlStr !== 'string') return {};

    if (baseUrlStr.includes('dev-v2.satuinbox.com')) {
      return {
        channelId: '692fe8eaaff05e8a1623e0d3',
        signatureKey: 'sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if',
        accountChannels: [
          { id: '698ef3aada258f2a5a46bf89', topic: 'hey' },
          { id: '6964ac1d2a5dbde9a5c6fa28', topic: 'tumbler biru' },
          { id: '69783b0154be8e7508b4af08', topic: 'CS harga' },
          { id: '69782d3654be8e7508b4abfe', topic: 'Complain' },
          { id: '6964ab6929de985a0fe73e48', topic: 'kipas angin' },
        ],
      };
    }

    if (baseUrlStr.includes('v2.satuinbox.com')) {
      return {
        channelId: '694b55ffbb886b39e785d2c0',
        signatureKey: 'sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM',
        accountChannels: [
          { id: '6996bcd952ef87df9e414fd3', topic: 'Complain' },
          { id: '69649c6b905d65859c36f81c', topic: 'remote control' },
          { id: '697845cf1782f1bd889b6bfc', topic: 'CS harga' },
          { id: '6964931c905d65859c36f618', topic: 'kipas angin' },
          { id: '69a9c8c86e7924748d4af383', topic: 'Hayoh kumaha' },
        ],
      };
    }

    return {};
  }

  const defaults = envDefaultsFromBaseUrl(baseUrl);
  const signatureKey = process.env.SIGNATURE_KEY || defaults.signatureKey || '';

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

  // throughput options (default mirrors scripts/widget-socket-load.js)
  const EMIT_EVENT = envStr('EMIT_EVENT', 'socket.inbound.message');
  const EMIT_EVERY_MS = envInt('EMIT_EVERY_MS', 2000);

  const AUTO_PREPARE = envBool('AUTO_PREPARE', true);
  const PREPARE_MODE = (envStr('PREPARE_MODE', 'shared') || 'shared').toLowerCase(); // shared|perClient

  const TOPIC_PREFIX = envStr('TOPIC_PREFIX', 'loadtest');
  const JOIN_EVENT = envStr('JOIN_EVENT', 'join.conversation');

  // If these are not provided, we can prepare them via open-api (mirrors widget-socket-load.js)
  let CHANNEL_ACCOUNT_ID = envStr('CHANNEL_ACCOUNT_ID', '');
  let CLIENT_CONTACT_ID = envStr('CLIENT_CONTACT_ID', '');
  let CONVERSATION_ID = envStr('CONVERSATION_ID', '');

  const MAX_PREPARE_CONCURRENCY = envInt('MAX_PREPARE_CONCURRENCY', 10);

  const WIDGET_CHANNEL_ID = envStr('WIDGET_CHANNEL_ID', '') || defaults.channelId || '';

  const accountChannelFromEnv = envStr('WIDGET_ACCOUNT_CHANNEL_IDS', '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  /** @type {{id:string, topic?:string}[]} */
  const widgetAccountChannels =
    accountChannelFromEnv.length > 0
      ? accountChannelFromEnv.map((id) => ({ id }))
      : Array.isArray(defaults.accountChannels)
        ? defaults.accountChannels
        : [];

  const pickAccountChannel = () =>
    widgetAccountChannels[Math.floor(Math.random() * widgetAccountChannels.length)];

  const EMIT_PAYLOAD_JSON = parseJsonEnv('EMIT_PAYLOAD_JSON', {
    // NOTE: script will override channelAccountId/clientContactId/tempMessageId/timestamp/content.
    channelAccountId: CHANNEL_ACCOUNT_ID || undefined,
    clientContactId: CLIENT_CONTACT_ID || undefined,
    type: 'text',
  });

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
    autoPrepare: AUTO_PREPARE,
    prepareMode: PREPARE_MODE,
    emit: MODE === 'throughput'
      ? {
          event: EMIT_EVENT,
          everyMs: EMIT_EVERY_MS,
          channelAccountId: CHANNEL_ACCOUNT_ID || undefined,
          clientContactId: CLIENT_CONTACT_ID || undefined,
          conversationId: CONVERSATION_ID || undefined,
          joinEvent: JOIN_EVENT,
        }
      : undefined,
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
    let prepareErrors = 0;
    let preparedRooms = 0;
    for (const c of clients) {
      connectErrors += c.stats.connectErrors;
      disconnects += c.stats.disconnects;
      emits += c.stats.emits;
      expectHits += c.stats.expectHits;
      prepareErrors += c.stats.prepareErrors;
      if (c.prepared && c.prepared.conversationId) preparedRooms++;
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
      prepareErrors,
      preparedRooms,
    });
  }, 10000);

  try {
    // Optional: auto-prepare identifiers for inbound event (mirrors widget-socket-load.js)
    // - shared: create 1 conversation and all clients join it
    // - perClient: create 1 conversation per client and join respectively
    if (MODE === 'throughput' && EMIT_EVENT === 'socket.inbound.message' && AUTO_PREPARE) {
      if (!signatureKey) throw new Error('AUTO_PREPARE requires SIGNATURE_KEY');
      if (!WIDGET_CHANNEL_ID)
        throw new Error('AUTO_PREPARE requires WIDGET_CHANNEL_ID (or a BASE_URL with hardcoded default channelId)');
      if (!widgetAccountChannels || widgetAccountChannels.length === 0)
        throw new Error(
          'AUTO_PREPARE requires WIDGET_ACCOUNT_CHANNEL_IDS or a BASE_URL with hardcoded defaults.accountChannels',
        );

      if (PREPARE_MODE === 'shared') {
        if (!CHANNEL_ACCOUNT_ID || !CLIENT_CONTACT_ID) {
          const picked = pickAccountChannel();
          const accountChannelId = picked.id;
          const topicName = picked.topic || `${TOPIC_PREFIX}-${randomAlphanumeric(4)}`;

          const guestName = `guest-${randomAlphanumeric(6)}`;
          const referenceId = uuid();

          log.info('auto-prepare(shared):start', { accountChannelId, topicName });
          const contact = await createClientContact({
            apiBase,
            signatureKey,
            channelId: WIDGET_CHANNEL_ID,
            guestName,
            referenceId,
          });
          const clientContactId = contact?.id || contact?.data?.id;
          if (!clientContactId) throw new Error('auto-prepare(shared): createClientContact missing id');

          const topicResp = await submitTopic({
            apiBase,
            signatureKey,
            accountChannelId,
            clientContactId,
            topicName,
          });
          const conversationId = topicResp?.id || topicResp?.data?.id;
          if (!conversationId) throw new Error('auto-prepare(shared): submitTopic missing conversation id');

          CHANNEL_ACCOUNT_ID = accountChannelId;
          CLIENT_CONTACT_ID = clientContactId;
          CONVERSATION_ID = conversationId;

          log.info('auto-prepare(shared):done', {
            CHANNEL_ACCOUNT_ID,
            CLIENT_CONTACT_ID,
            CONVERSATION_ID,
          });
        }
      } else if (PREPARE_MODE === 'perclient' || PREPARE_MODE === 'perClient') {
        // per-client prepare happens after sockets are created/connected (so each client can join its own room)
        log.info('auto-prepare(perClient):enabled', { maxPrepareConcurrency: MAX_PREPARE_CONCURRENCY });
      } else {
        throw new Error(`Invalid PREPARE_MODE: ${PREPARE_MODE} (expected shared|perClient)`);
      }
    }

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

      if (EMIT_EVENT === 'socket.inbound.message') {
        // shared: global ids must exist; perClient: each client will have its own ids
        if ((PREPARE_MODE === 'shared' || !AUTO_PREPARE) && (!CHANNEL_ACCOUNT_ID || !CLIENT_CONTACT_ID)) {
          throw new Error(
            'MODE=throughput with EMIT_EVENT=socket.inbound.message requires CHANNEL_ACCOUNT_ID and CLIENT_CONTACT_ID. ' +
              'Set them via env or enable AUTO_PREPARE=true (default).',
          );
        }
      }

      // Optional: join conversation(s) so server can deliver events back to clients.
      if (PREPARE_MODE === 'shared' && CONVERSATION_ID) {
        log.info('joining conversation for all clients', {
          conversationId: CONVERSATION_ID,
          joinEvent: JOIN_EVENT,
        });
        for (const c of clients) {
          if (c.socket && c.socket.connected) c.socket.emit(JOIN_EVENT, { conversationId: CONVERSATION_ID });
        }
      }

      if ((PREPARE_MODE === 'perclient' || PREPARE_MODE === 'perClient') && AUTO_PREPARE && EMIT_EVENT === 'socket.inbound.message') {
        // Prepare one conversation per client with limited concurrency.
        log.info('auto-prepare(perClient):start', { clients: clients.length, maxPrepareConcurrency: MAX_PREPARE_CONCURRENCY });

        let idx = 0;
        const worker = async () => {
          while (idx < clients.length) {
            const cur = clients[idx++];
            if (!cur.socket || !cur.socket.connected) continue;
            try {
              const picked = pickAccountChannel();
              const accountChannelId = picked.id;
              const topicName = picked.topic || `${TOPIC_PREFIX}-${randomAlphanumeric(4)}`;
              const guestName = `guest-${randomAlphanumeric(6)}`;
              const referenceId = uuid();

              const contact = await createClientContact({
                apiBase,
                signatureKey,
                channelId: WIDGET_CHANNEL_ID,
                guestName,
                referenceId,
              });
              const clientContactId = contact?.id || contact?.data?.id;
              if (!clientContactId) throw new Error('createClientContact missing id');

              const topicResp = await submitTopic({
                apiBase,
                signatureKey,
                accountChannelId,
                clientContactId,
                topicName,
              });
              const conversationId = topicResp?.id || topicResp?.data?.id;
              if (!conversationId) throw new Error('submitTopic missing conversation id');

              cur.prepared.channelAccountId = accountChannelId;
              cur.prepared.clientContactId = clientContactId;
              cur.prepared.conversationId = conversationId;

              // join its own conversation
              cur.socket.emit(JOIN_EVENT, { conversationId });
            } catch (e) {
              cur.stats.prepareErrors++;
            }
          }
        };

        const workers = Array.from({ length: Math.max(1, Math.min(MAX_PREPARE_CONCURRENCY, clients.length)) }).map(() => worker());
        await Promise.all(workers);

        const preparedCount = clients.filter((c) => c.prepared.conversationId).length;
        log.info('auto-prepare(perClient):done', { preparedCount });
      }

      const loops = clients.map(async (c) => {
        while (!stop) {
          if (c.socket && c.socket.connected) {
            let payload;

            if (typeof payloadTemplate === 'object' && payloadTemplate) {
              const perClientIds = c.prepared && c.prepared.clientContactId ? c.prepared : null;

              const channelAccountId =
                (PREPARE_MODE === 'perclient' || PREPARE_MODE === 'perClient') && perClientIds
                  ? perClientIds.channelAccountId
                  : CHANNEL_ACCOUNT_ID || payloadTemplate.channelAccountId;

              const clientContactId =
                (PREPARE_MODE === 'perclient' || PREPARE_MODE === 'perClient') && perClientIds
                  ? perClientIds.clientContactId
                  : CLIENT_CONTACT_ID || payloadTemplate.clientContactId;

              payload = {
                ...payloadTemplate,
                channelAccountId,
                clientContactId,
                // align with widget-socket-load.js
                tempMessageId: uuid(),
                timestamp: new Date().toISOString(),
                type: payloadTemplate.type || 'text',
                content: `load-2 client:${c.id} ${new Date().toISOString()}`,
              };
            } else {
              payload = payloadTemplate;
            }

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
  let prepareErrors = 0;
  let preparedRooms = 0;
  for (const c of clients) {
    connectErrors += c.stats.connectErrors;
    disconnects += c.stats.disconnects;
    emits += c.stats.emits;
    expectHits += c.stats.expectHits;
    prepareErrors += c.stats.prepareErrors;
    if (c.prepared && c.prepared.conversationId) preparedRooms++;
  }

  log.info('done', {
    created: clients.length,
    connected,
    connectErrors,
    disconnects,
    emits,
    expectHits,
    prepareErrors,
    preparedRooms,
  });
}

main().catch((err) => {
  console.error('FAILED:', err?.stack || err?.message || err);
  process.exitCode = 1;
});
