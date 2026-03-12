#!/usr/bin/env node
/**
 * Widget Socket Load Test (Node)
 *
 * Goal: stress-test conversations socket + widget open-api flow in parallel.
 *
 * Env vars (required unless default noted):
 * - BASE_URL: e.g. https://dev-v2.satuinbox.com or https://v2.satuinbox.com
 * - SIGNATURE_KEY: widget x-signature-key (open-api)
 * - X_API_KEY: x-api-key (for api/account-channel list)  [optional]
 *   If omitted, set WIDGET_ACCOUNT_CHANNEL_IDS to a comma-separated list of widget accountChannelId values.
 *
 * Optional:
 * - AGENTS: number of parallel agents (default 5)
 * - CHURN_AGENTS: number of churn agents (default 2)
 * - MESSAGES_PER_AGENT: messages per agent per cycle (default 10)
 * - CYCLES: churn cycles (default 3)
 * - TOPIC_PREFIX: topic label used in submit/topic (default "loadtest")
 * - JOIN_EVENT: socket join event name (default "socket.join.conversation")
 * - INBOUND_EVENT: inbound message event name (default "socket.inbound.message")
 * - NEW_MESSAGE_EVENT: new message event name (default "notification.new.message")
 * - SOCKET_AUTH_MODE: "signatureKey" | "none" (default "signatureKey")
 *
 * Notes:
 * - This script intentionally does not wait for join ACK because many servers don't implement socket.io ACK.
 * - It validates success by receiving NEW_MESSAGE_EVENT after sending inbound.
 */

const { io } = require('socket.io-client');

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

function randomAlphanumeric(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
}

function randomAlphanumericSpecial(length = 8) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let result = '';
  for (let i = 0; i < length; i++) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function uuid() {
  // Node 16+ supports crypto.randomUUID
  try {
    return require('crypto').randomUUID();
  } catch {
    // fallback
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

function apiBaseFromBaseUrl(baseUrl) {
  // mirrors cypress/support/01_url_page.js mapping
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

async function fetchActiveWidgetAccountChannels({ apiBase, xApiKey }) {
  const url = joinUrl(apiBase, 'api/account-channel?limit=200&connectionStatus=active');
  const data = await httpJson(url, {
    headers: {
      'x-api-key': xApiKey,
    },
  });

  const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
  const activeUsed = items.filter(
    (it) => it?.connectionStatus === 'active' && (it?.accountStatus == null || it?.accountStatus === 'used'),
  );

  const widgetOnly = activeUsed.filter((it) => {
    const platformName = it?.channel?.platform?.name;
    return typeof platformName === 'string' && platformName.toLowerCase() === 'widget';
  });

  return widgetOnly;
}

class WidgetAgent {
  constructor({
    agentId,
    baseUrl,
    apiBase,
    signatureKey,
    socketUrl,
    joinEvent,
    inboundEvent,
    newMessageEvent,
    socketAuthMode,
    debugAllEvents,
  }) {
    this.agentId = agentId;
    this.baseUrl = baseUrl;
    this.apiBase = apiBase;
    this.signatureKey = signatureKey;
    this.socketUrl = socketUrl;
    this.joinEvent = joinEvent;
    this.inboundEvent = inboundEvent;
    this.newMessageEvent = newMessageEvent;
    this.socketAuthMode = socketAuthMode;
    this.debugAllEvents = debugAllEvents;

    this.socket = null;
  }

  async connect() {
    const auth = this.socketAuthMode === 'signatureKey' ? { token: this.signatureKey } : undefined;
    this.socket = io(this.socketUrl, {
      transports: ['websocket'],
      forceNew: true,
      auth,
      extraHeaders: {
        Origin: this.baseUrl,
      },
    });

    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error(`Agent ${this.agentId} connect timeout`)), 10000);
      this.socket.on('connect', () => {
        clearTimeout(t);
        resolve();
      });
      this.socket.on('connect_error', (err) => {
        // do not reject immediately; wait until timeout
        console.error(`[agent:${this.agentId}] connect_error:`, err?.message || err);
      });
    });

    if (this.debugAllEvents) {
      this.socket.onAny((event, ...args) => {
        console.log(`[agent:${this.agentId}] EVENT:`, event, args?.[0]);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  async createClientContact({ channelId, guestName, referenceId }) {
    const url = joinUrl(this.apiBase, 'open-api/client-contact');
    return httpJson(url, {
      method: 'POST',
      headers: {
        'x-signature-key': this.signatureKey,
      },
      body: {
        channelId,
        metaData: {
          browserName: 'Chrome',
          deviceType: 'Desktop',
          userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        },
        name: guestName,
        referenceId,
      },
    });
  }

  async submitTopic({ accountChannelId, clientContactId, topicName }) {
    const url = joinUrl(this.apiBase, 'open-api/conversation/submit/topic');
    return httpJson(url, {
      method: 'POST',
      headers: {
        'x-signature-key': this.signatureKey,
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
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
          },
        ],
      },
    });
  }

  joinConversation(conversationId) {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit(this.joinEvent, { conversationId });
  }

  waitForNewMessage(timeoutMs = 10000) {
    if (!this.socket) throw new Error('Socket not connected');
    return new Promise((resolve, reject) => {
      const handler = (data) => {
        clearTimeout(t);
        this.socket.off(this.newMessageEvent, handler);
        resolve(data);
      };

      const t = setTimeout(() => {
        this.socket.off(this.newMessageEvent, handler);
        reject(new Error(`Timeout waiting ${this.newMessageEvent}`));
      }, timeoutMs);

      this.socket.on(this.newMessageEvent, handler);
    });
  }

  sendInboundMessage({ channelAccountId, clientContactId, content, type = 'text' }) {
    if (!this.socket) throw new Error('Socket not connected');

    const payload = {
      channelAccountId,
      clientContactId,
      content,
      tempMessageId: uuid(),
      timestamp: new Date().toISOString(),
      type,
    };

    this.socket.emit(this.inboundEvent, payload);
    return payload;
  }
}

async function main() {
  const baseUrl = process.env.BASE_URL;
  const signatureKey = process.env.SIGNATURE_KEY;
  if (!baseUrl) throw new Error('Missing BASE_URL');
  if (!signatureKey) throw new Error('Missing SIGNATURE_KEY');

  const apiBase = apiBaseFromBaseUrl(baseUrl);
  const socketUrl = joinUrl(apiBase, 'conversations');

  const AGENTS = envInt('AGENTS', 5);
  const CHURN_AGENTS = envInt('CHURN_AGENTS', 2);
  const MESSAGES_PER_AGENT = envInt('MESSAGES_PER_AGENT', 10);
  const CYCLES = envInt('CYCLES', 3);

  const TOPIC_PREFIX = process.env.TOPIC_PREFIX || 'loadtest';
  const JOIN_EVENT = process.env.JOIN_EVENT || 'socket.join.conversation';
  const INBOUND_EVENT = process.env.INBOUND_EVENT || 'socket.inbound.message';
  const NEW_MESSAGE_EVENT = process.env.NEW_MESSAGE_EVENT || 'notification.new.message';
  const SOCKET_AUTH_MODE = process.env.SOCKET_AUTH_MODE || 'signatureKey';
  const DEBUG_ALL_EVENTS = (process.env.DEBUG_ALL_EVENTS || '').toLowerCase() === 'true';

  // Account-channel discovery:
  // - If X_API_KEY is provided, we can fetch active widget accountChannels from `api/account-channel`.
  // - If not, user must provide WIDGET_ACCOUNT_CHANNEL_IDS (comma-separated).
  const xApiKey = process.env.X_API_KEY;

  let widgetAccountChannelIds;

  if (xApiKey) {
    const widgetChannels = await fetchActiveWidgetAccountChannels({ apiBase, xApiKey });
    if (widgetChannels.length === 0) throw new Error('No active Widget account channels found');
    widgetAccountChannelIds = widgetChannels.map((c) => c.id);
    console.log(`widgetChannels(active via api/account-channel): ${widgetAccountChannelIds.length}`);
  } else {
    widgetAccountChannelIds = (process.env.WIDGET_ACCOUNT_CHANNEL_IDS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (widgetAccountChannelIds.length === 0) {
      throw new Error(
        'Missing X_API_KEY and WIDGET_ACCOUNT_CHANNEL_IDS. Provide one of them to choose widget accountChannelId values.',
      );
    }
    console.log(`widgetChannels(from WIDGET_ACCOUNT_CHANNEL_IDS): ${widgetAccountChannelIds.length}`);
  }

  const pickAccountChannelId = () =>
    widgetAccountChannelIds[Math.floor(Math.random() * widgetAccountChannelIds.length)];

  const longLivedCount = Math.max(0, AGENTS - CHURN_AGENTS);

  console.log('--- Widget Socket Load ---');
  console.log({ baseUrl, apiBase, socketUrl });
  console.log({ AGENTS, CHURN_AGENTS, longLivedCount, MESSAGES_PER_AGENT, CYCLES });
  console.log({ JOIN_EVENT, INBOUND_EVENT, NEW_MESSAGE_EVENT, SOCKET_AUTH_MODE });
  // widget channel count is logged above depending on discovery mode

  // long-lived agents: keep connected for entire run
  const longLived = Array.from({ length: longLivedCount }).map((_, idx) =>
    new WidgetAgent({
      agentId: `L${idx + 1}`,
      baseUrl,
      apiBase,
      signatureKey,
      socketUrl,
      joinEvent: JOIN_EVENT,
      inboundEvent: INBOUND_EVENT,
      newMessageEvent: NEW_MESSAGE_EVENT,
      socketAuthMode: SOCKET_AUTH_MODE,
      debugAllEvents: DEBUG_ALL_EVENTS,
    }),
  );

  // churn agents: connect-send-disconnect each cycle
  const churn = Array.from({ length: CHURN_AGENTS }).map((_, idx) =>
    new WidgetAgent({
      agentId: `C${idx + 1}`,
      baseUrl,
      apiBase,
      signatureKey,
      socketUrl,
      joinEvent: JOIN_EVENT,
      inboundEvent: INBOUND_EVENT,
      newMessageEvent: NEW_MESSAGE_EVENT,
      socketAuthMode: SOCKET_AUTH_MODE,
      debugAllEvents: DEBUG_ALL_EVENTS,
    }),
  );

  // Connect long-lived first
  await Promise.all(longLived.map((a) => a.connect()));
  console.log(`Connected long-lived agents: ${longLived.length}`);

  async function runOneFlow(agent) {
    const accountChannelId = pickAccountChannelId();
    const topicName = `${TOPIC_PREFIX}-${randomAlphanumeric(4)}`;

    // channelId is not available in account-channel item; for widget open-api client-contact you use channelId (widget channelId),
    // but in your existing Cypress code it is hardcoded per env. Here we assume backend accepts widget.channel.id OR you provide it.
    // To avoid guessing, you must pass WIDGET_CHANNEL_ID.
    const channelId = process.env.WIDGET_CHANNEL_ID;
    if (!channelId) throw new Error('Missing WIDGET_CHANNEL_ID (widget channelId for open-api/client-contact)');

    const guestName = `guest-${randomAlphanumeric(6)}`;
    const referenceId = uuid();

    const contact = await agent.createClientContact({ channelId, guestName, referenceId });
    const clientContactId = contact?.id || contact?.data?.id;
    if (!clientContactId) throw new Error('createClientContact: missing id in response');

    const topicResp = await agent.submitTopic({ accountChannelId, clientContactId, topicName });
    const conversationId = topicResp?.id || topicResp?.data?.id;
    if (!conversationId) throw new Error('submitTopic: missing conversation id in response');

    agent.joinConversation(conversationId);
    // small delay to reduce race
    await sleep(50);

    for (let i = 0; i < MESSAGES_PER_AGENT; i++) {
      const content = `${topicName}: msg-${i + 1} ${randomAlphanumericSpecial(6)}`;
      const wait = agent.waitForNewMessage(15000);
      agent.sendInboundMessage({
        channelAccountId: accountChannelId,
        clientContactId,
        content,
      });
      const msg = await wait;
      if (!msg) throw new Error('No message payload received');
    }

    return { conversationId, accountChannelId, clientContactId };
  }

  // Run churn cycles
  for (let cycle = 1; cycle <= CYCLES; cycle++) {
    console.log(`\n--- cycle ${cycle}/${CYCLES} ---`);

    // churn agents: connect -> run flow -> disconnect
    await Promise.all(
      churn.map(async (agent) => {
        await agent.connect();
        try {
          await runOneFlow(agent);
        } finally {
          agent.disconnect();
        }
      }),
    );

    // long-lived agents: run flow but keep socket alive
    await Promise.all(
      longLived.map(async (agent) => {
        await runOneFlow(agent);
      }),
    );
  }

  // cleanup
  longLived.forEach((a) => a.disconnect());
  console.log('\nDone.');
}

main().catch((err) => {
  console.error('FAILED:', err?.message || err);
  if (err?.body) console.error('BODY:', JSON.stringify(err.body).slice(0, 2000));
  process.exitCode = 1;
});
