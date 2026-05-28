#!/usr/bin/env node
/**
 * Widget Socket Load Test (Node)
 *
 * Goal: stress-test conversations socket + widget open-api flow in parallel.
 *
 * Env vars (required unless default noted):
 * - BASE_URL: e.g. https://app.example.test
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

const { io } = require("socket.io-client");

function envInt(name, def) {
  const v = process.env[name];
  if (v == null || v === "") return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Invalid number for ${name}: ${v}`);
  return n;
}

function envStr(name, def) {
  const v = process.env[name];
  return v == null || v === "" ? def : String(v);
}

function makeLogger() {
  const level = (envStr("LOG_LEVEL", "info") || "info").toLowerCase();
  const levels = { silent: 0, error: 1, warn: 2, info: 3, debug: 4 };
  const cur = levels[level] ?? 3;

  const ts = () => new Date().toISOString();
  const fmt = (tag, args) => [`[${ts()}] ${tag}`, ...args];

  return {
    level,
    error: (...args) => cur >= 1 && console.error(...fmt("[ERROR]", args)),
    warn: (...args) => cur >= 2 && console.warn(...fmt("[WARN ]", args)),
    info: (...args) => cur >= 3 && console.log(...fmt("[INFO ]", args)),
    debug: (...args) => cur >= 4 && console.log(...fmt("[DEBUG]", args)),
  };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function randomAlphanumeric(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
}

function randomAlphanumericSpecial(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let result = "";
  for (let i = 0; i < length; i++)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function uuid() {
  // Node 16+ supports crypto.randomUUID
  try {
    return require("crypto").randomUUID();
  } catch {
    // fallback
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

function apiBaseFromBaseUrl(baseUrl) {
  const apiBase = process.env.API_BASE || process.env.E2E_API_BASE;
  if (apiBase) return apiBase;
  if (!baseUrl) throw new Error("Missing BASE_URL or API_BASE");
  return `${baseUrl.replace(/\/+$/g, "")}/api/v1`;
}

function joinUrl(base, path) {
  if (!base.endsWith("/") && !path.startsWith("/")) return `${base}/${path}`;
  if (base.endsWith("/") && path.startsWith("/"))
    return `${base}${path.slice(1)}`;
  return `${base}${path}`;
}

async function httpJson(url, { method = "GET", headers = {}, body } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
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
    const err = new Error(
      `HTTP ${res.status} ${res.statusText} for ${method} ${url}`,
    );
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

async function fetchActiveWidgetAccountChannels({ apiBase, xApiKey }) {
  const url = joinUrl(
    apiBase,
    "api/account-channel?limit=200&connectionStatus=active",
  );
  const data = await httpJson(url, {
    headers: {
      "x-api-key": xApiKey,
    },
  });

  const items = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data)
      ? data
      : [];
  const activeUsed = items.filter(
    (it) =>
      it?.connectionStatus === "active" &&
      (it?.accountStatus == null || it?.accountStatus === "used"),
  );

  const widgetOnly = activeUsed.filter((it) => {
    const platformName = it?.channel?.platform?.name;
    return (
      typeof platformName === "string" &&
      platformName.toLowerCase() === "widget"
    );
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
    setUserEvent,
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
    this.setUserEvent = setUserEvent;
    this.joinEvent = joinEvent;
    this.inboundEvent = inboundEvent;
    this.newMessageEvent = newMessageEvent;
    this.socketAuthMode = socketAuthMode;
    this.debugAllEvents = debugAllEvents;

    this.socket = null;
  }

  async connect() {
    const auth =
      this.socketAuthMode === "signatureKey"
        ? { token: this.signatureKey }
        : undefined;
    this.socket = io(this.socketUrl, {
      transports: ["websocket"],
      forceNew: true,
      auth,
      extraHeaders: {
        Origin: this.baseUrl,
      },
    });

    await new Promise((resolve, reject) => {
      const t = setTimeout(
        () => reject(new Error(`Agent ${this.agentId} connect timeout`)),
        10000,
      );
      this.socket.on("connect", () => {
        clearTimeout(t);
        resolve();
      });
      this.socket.on("connect_error", (err) => {
        // do not reject immediately; wait until timeout
        console.error(
          `[agent:${this.agentId}] connect_error:`,
          err?.message || err,
        );
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
    const url = joinUrl(this.apiBase, "open-api/client-contact");
    return httpJson(url, {
      method: "POST",
      headers: {
        "x-signature-key": this.signatureKey,
      },
      body: {
        channelId,
        metaData: {
          browserName: "Chrome",
          deviceType: "Desktop",
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
        },
        name: guestName,
        referenceId,
      },
    });
  }

  async submitTopic({ accountChannelId, clientContactId, topicName }) {
    const url = joinUrl(this.apiBase, "open-api/conversation/submit/topic");
    return httpJson(url, {
      method: "POST",
      headers: {
        "x-signature-key": this.signatureKey,
      },
      body: {
        accountChannelId,
        clientContactId,
        metadata: [
          {
            browserName: "Chrome",
            deviceType: "Desktop",
            topic: topicName,
            userAgent:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
          },
        ],
      },
    });
  }

  setUser({ id, name, referenceId, email = "", phone = "" }) {
    if (!this.socket) throw new Error("Socket not connected");
    if (!this.setUserEvent) throw new Error("Missing SET_USER_EVENT");
    this.socket.emit(this.setUserEvent, { email, id, name, phone, referenceId });
  }

  joinConversation(conversationId, { timeoutMs = 10000, repeat = 2 } = {}) {
    if (!this.socket) throw new Error("Socket not connected");

    // In real widget traffic, join.conversation is often sent twice (see packet ids 0 and 1)
    // and server responds with ACK + may also emit the join event back.
    return new Promise((resolve, reject) => {
      const t = setTimeout(
        () => reject(new Error(`Join timeout for ${conversationId}`)),
        timeoutMs,
      );

      let acks = 0;
      const done = (ack) => {
        acks++;
        if (acks >= 1) {
          clearTimeout(t);
          resolve(ack);
        }
      };

      // first emit with ACK callback
      this.socket.emit(this.joinEvent, { conversationId }, (ack) => done(ack));

      // repeat additional emits without waiting for ack (best-effort)
      for (let i = 1; i < repeat; i++) {
        this.socket.emit(this.joinEvent, { conversationId });
      }
    });
  }

  waitForNewMessage(timeoutMs = 10000) {
    if (!this.socket) throw new Error("Socket not connected");

    // Support comma-separated list in NEW_MESSAGE_EVENT, e.g.
    // NEW_MESSAGE_EVENT="notification.new.message,socket.inbound.message"
    const events = String(this.newMessageEvent || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (events.length === 0) throw new Error("Missing NEW_MESSAGE_EVENT");

    return new Promise((resolve, reject) => {
      const handlers = new Map();

      const cleanup = () => {
        clearTimeout(t);
        for (const [event, handler] of handlers) this.socket.off(event, handler);
      };

      for (const event of events) {
        const handler = (data) => {
          cleanup();
          resolve({ event, data });
        };
        handlers.set(event, handler);
        this.socket.on(event, handler);
      }

      const t = setTimeout(() => {
        cleanup();
        reject(new Error(`Timeout waiting ${events.join("|")}`));
      }, timeoutMs);
    });
  }

  sendInboundMessage({
    channelAccountId,
    clientContactId,
    content,
    type = "text",
  }) {
    if (!this.socket) throw new Error("Socket not connected");

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

function envDefaultsFromBaseUrl(baseUrl) {
  if (typeof baseUrl !== "string") return {};

  return {
    channelId: process.env.WIDGET_CHANNEL_ID || "",
    signatureKey: process.env.SIGNATURE_KEY || "",
    accountChannels: process.env.WIDGET_ACCOUNT_CHANNEL_IDS
      ? process.env.WIDGET_ACCOUNT_CHANNEL_IDS.split(",").map((id) => ({ id: id.trim(), topic: process.env.TOPIC_PREFIX || "loadtest" }))
      : [],
  };
}

async function main() {
  const log = makeLogger();

  // Prefer BASE_URL for standalone runs; fall back to Cypress-style env.
  // Normalize trailing slash so apiBaseFromBaseUrl() exact matches keep working.
  const baseUrlRaw =
    process.env.BASE_URL ||
    process.env.CYPRESS_baseUrl ||
    process.env.CYPRESS_BASE_URL;
  const baseUrl =
    typeof baseUrlRaw === "string"
      ? baseUrlRaw.replace(/\/+$/g, "")
      : baseUrlRaw;

  const defaults = envDefaultsFromBaseUrl(baseUrl || "");

  const signatureKey = process.env.SIGNATURE_KEY || defaults.signatureKey;

  if (!baseUrl) throw new Error("Missing BASE_URL (or CYPRESS_baseUrl)");
  if (!signatureKey) throw new Error("Missing SIGNATURE_KEY");

  log.info("Starting widget-socket-load", {
    baseUrl,
    logLevel: log.level,
  });

  const apiBase = apiBaseFromBaseUrl(baseUrl);
  const socketUrl = joinUrl(apiBase, "conversations");

  const LOG_EVERY = envInt("LOG_EVERY", 5); // log every N messages per agent (0 = disable)

  const AGENTS = envInt("AGENTS", 5);
  const CHURN_AGENTS = envInt("CHURN_AGENTS", 2);
  const MESSAGES_PER_AGENT = envInt("MESSAGES_PER_AGENT", 10);
  const CYCLES = envInt("CYCLES", 3);

  const TOPIC_PREFIX = process.env.TOPIC_PREFIX || "loadtest";
  const SET_USER_EVENT = process.env.SET_USER_EVENT || "widget.set.user";
  // Default JOIN_EVENT updated based on observed socket logs.
  const JOIN_EVENT = process.env.JOIN_EVENT || "join.conversation";
  const INBOUND_EVENT = process.env.INBOUND_EVENT || "socket.inbound.message";
  // Observed events after inbound:
  // - "message"
  // - "notification.new.message"
  const NEW_MESSAGE_EVENT =
    process.env.NEW_MESSAGE_EVENT || "notification.new.message,message";
  const SOCKET_AUTH_MODE = process.env.SOCKET_AUTH_MODE || "signatureKey";
  const DEBUG_ALL_EVENTS =
    (process.env.DEBUG_ALL_EVENTS || "").toLowerCase() === "true";

  const JOIN_DELAY_MS = envInt("JOIN_DELAY_MS", 200);
  const MESSAGE_WAIT_TIMEOUT_MS = envInt("MESSAGE_WAIT_TIMEOUT_MS", 30000);
  const SEND_TYPING = (process.env.SEND_TYPING || "").toLowerCase() === "true";
  const TYPING_START_EVENT = process.env.TYPING_START_EVENT || "typing.start";
  const TYPING_STOP_EVENT = process.env.TYPING_STOP_EVENT || "typing.stop";

  // Account-channel discovery:
  // - If X_API_KEY is provided, we can fetch active widget accountChannels from `api/account-channel`.
  // - Else, accept WIDGET_ACCOUNT_CHANNEL_IDS (comma-separated).
  // - Else, fall back to hardcoded defaults based on BASE_URL (requested).
  const xApiKey = process.env.X_API_KEY;

  /** @type {{id:string, topic?:string}[]} */
  let widgetAccountChannels;

  if (xApiKey) {
    const widgetChannels = await fetchActiveWidgetAccountChannels({
      apiBase,
      xApiKey,
    });
    if (widgetChannels.length === 0)
      throw new Error("No active Widget account channels found");
    widgetAccountChannels = widgetChannels.map((c) => ({ id: c.id }));
    log.info(
      `widgetChannels(active via api/account-channel): ${widgetAccountChannels.length}`,
    );
  } else {
    const fromEnv = (process.env.WIDGET_ACCOUNT_CHANNEL_IDS || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((id) => ({ id }));

    if (fromEnv.length > 0) {
      widgetAccountChannels = fromEnv;
      log.info(
        `widgetChannels(from WIDGET_ACCOUNT_CHANNEL_IDS): ${widgetAccountChannels.length}`,
      );
    } else if (
      Array.isArray(defaults.accountChannels) &&
      defaults.accountChannels.length > 0
    ) {
      widgetAccountChannels = defaults.accountChannels;
      log.info(
        `widgetChannels(from hardcoded defaults): ${widgetAccountChannels.length}`,
      );
    } else {
      throw new Error(
        "Missing X_API_KEY and WIDGET_ACCOUNT_CHANNEL_IDS. Provide one of them to choose widget accountChannelId values.",
      );
    }
  }

  const pickAccountChannel = () =>
    widgetAccountChannels[
      Math.floor(Math.random() * widgetAccountChannels.length)
    ];

  const longLivedCount = Math.max(0, AGENTS - CHURN_AGENTS);

  log.info("--- Widget Socket Load ---");
  log.info({ baseUrl, apiBase, socketUrl });
  log.info({
    AGENTS,
    CHURN_AGENTS,
    longLivedCount,
    MESSAGES_PER_AGENT,
    CYCLES,
    LOG_EVERY,
  });
  log.info({
    SET_USER_EVENT,
    JOIN_EVENT,
    INBOUND_EVENT,
    NEW_MESSAGE_EVENT,
    SOCKET_AUTH_MODE,
    JOIN_DELAY_MS,
    MESSAGE_WAIT_TIMEOUT_MS,
    SEND_TYPING,
    TYPING_START_EVENT,
    TYPING_STOP_EVENT,
  });
  // widget channel count is logged above depending on discovery mode

  // long-lived agents: keep connected for entire run
  const longLived = Array.from({ length: longLivedCount }).map(
    (_, idx) =>
      new WidgetAgent({
        agentId: `L${idx + 1}`,
        baseUrl,
        apiBase,
        signatureKey,
        socketUrl,
        setUserEvent: SET_USER_EVENT,
        joinEvent: JOIN_EVENT,
        inboundEvent: INBOUND_EVENT,
        newMessageEvent: NEW_MESSAGE_EVENT,
        socketAuthMode: SOCKET_AUTH_MODE,
        debugAllEvents: DEBUG_ALL_EVENTS,
      }),
  );

  // churn agents: connect-send-disconnect each cycle
  const churn = Array.from({ length: CHURN_AGENTS }).map(
    (_, idx) =>
      new WidgetAgent({
        agentId: `C${idx + 1}`,
        baseUrl,
        apiBase,
        signatureKey,
        socketUrl,
        setUserEvent: SET_USER_EVENT,
        joinEvent: JOIN_EVENT,
        inboundEvent: INBOUND_EVENT,
        newMessageEvent: NEW_MESSAGE_EVENT,
        socketAuthMode: SOCKET_AUTH_MODE,
        debugAllEvents: DEBUG_ALL_EVENTS,
      }),
  );

  // Connect long-lived first
  await Promise.all(
    longLived.map(async (a) => {
      log.info(`Connecting long-lived agent ${a.agentId}...`);
      await a.connect();
      log.info(`Connected long-lived agent ${a.agentId}`);
    }),
  );
  log.info(`Connected long-lived agents: ${longLived.length}`);

  async function runOneFlow(agent) {
    const picked = pickAccountChannel();
    const accountChannelId = picked.id;
    const topicName =
      picked.topic || `${TOPIC_PREFIX}-${randomAlphanumeric(4)}`;

    log.info(`[agent:${agent.agentId}] flow:start`, {
      accountChannelId,
      topicName,
    });

    // channelId is not available in account-channel item; for widget open-api client-contact you use channelId (widget channelId),
    // but in your existing Cypress code it is hardcoded per env. Here we assume backend accepts widget.channel.id OR you provide it.
    // To avoid guessing, you must pass WIDGET_CHANNEL_ID.
    // Widget channelId (needed for open-api/client-contact)
    // Support Cypress-style env naming too, with a hardcoded fallback per env.
    const channelId =
      process.env.WIDGET_CHANNEL_ID ||
      process.env.CYPRESS_WIDGET_CHANNEL_ID ||
      process.env.CYPRESS_widgetChannelId ||
      defaults.channelId;

    if (!channelId) {
      throw new Error(
        "Missing WIDGET_CHANNEL_ID (widget channelId for open-api/client-contact). " +
          "Set env WIDGET_CHANNEL_ID or CYPRESS_WIDGET_CHANNEL_ID.",
      );
    }

    const guestName = `guest-${randomAlphanumeric(6)}`;
    const referenceId = uuid();

    const contact = await agent.createClientContact({
      channelId,
      guestName,
      referenceId,
    });
    const clientContactId = contact?.id || contact?.data?.id;
    if (!clientContactId)
      throw new Error("createClientContact: missing id in response");
    log.debug(`[agent:${agent.agentId}] created clientContact`, {
      clientContactId,
    });

    const topicResp = await agent.submitTopic({
      accountChannelId,
      clientContactId,
      topicName,
    });
    const conversationId = topicResp?.id || topicResp?.data?.id;
    if (!conversationId)
      throw new Error("submitTopic: missing conversation id in response");
    log.debug(`[agent:${agent.agentId}] submitted topic`, { conversationId });

    // Mirror browser widget flow: set user on socket, then join conversation (with ACK).
    agent.setUser({
      id: clientContactId,
      name: guestName,
      referenceId,
      email: "",
      phone: "",
    });

    const joinAck = await agent.joinConversation(conversationId, { timeoutMs: 10000 });
    log.debug(`[agent:${agent.agentId}] joinAck`, joinAck);

    // delay after join to reduce race
    await sleep(JOIN_DELAY_MS);

    for (let i = 0; i < MESSAGES_PER_AGENT; i++) {
      const content = `${topicName}: msg-${i + 1} ${randomAlphanumericSpecial(6)}`;

      if (LOG_EVERY > 0 && (i === 0 || (i + 1) % LOG_EVERY === 0)) {
        log.info(
          `[agent:${agent.agentId}] sending msg ${i + 1}/${MESSAGES_PER_AGENT}`,
        );
      }

      const wait = agent.waitForNewMessage(MESSAGE_WAIT_TIMEOUT_MS);

      if (SEND_TYPING) {
        agent.socket.emit(TYPING_START_EVENT, { conversationId });
        agent.socket.emit(TYPING_STOP_EVENT, { conversationId });
      }

      agent.sendInboundMessage({
        channelAccountId: accountChannelId,
        clientContactId,
        content,
      });

      const received = await wait;
      if (!received) throw new Error("No message payload received");
      if (LOG_EVERY > 0 && (i === 0 || (i + 1) % LOG_EVERY === 0)) {
        log.debug(`[agent:${agent.agentId}] received`, {
          event: received.event,
          sample: received?.data,
        });
      }
    }

    log.info(`[agent:${agent.agentId}] flow:done`, {
      conversationId,
      accountChannelId,
      clientContactId,
    });

    return { conversationId, accountChannelId, clientContactId };
  }

  // Run churn cycles
  for (let cycle = 1; cycle <= CYCLES; cycle++) {
    log.info(`\n--- cycle ${cycle}/${CYCLES} ---`);

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
  log.info("\nDone.");
}

main().catch((err) => {
  // keep error readable even when running under Cypress
  console.error("FAILED:", err?.stack || err?.message || err);
  if (err?.body)
    console.error("BODY:", JSON.stringify(err.body).slice(0, 2000));
  process.exitCode = 1;
});
