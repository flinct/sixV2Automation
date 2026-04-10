import http from "k6/http";
import ws from "k6/ws";
import { check, group, sleep } from "k6";
import exec from "k6/execution";
import { Rate, Trend, Counter, Gauge } from "k6/metrics";

// ========================================
// Custom Metrics
// ========================================
const connectErrors = new Counter("socket_connect_errors");
const connectSuccess = new Counter("socket_connect_success");
const messagesSent = new Counter("messages_sent");
const messagesReceived = new Counter("messages_received");
const emitLatency = new Trend("emit_latency");
const connectLatency = new Trend("connect_latency");
const activeConnections = new Gauge("active_connections");
const errorRate = new Rate("errors");

// ========================================
// Configuration from environment variables
// ========================================
const BASE_URL = __ENV.BASE_URL || "https://dev-v2.satuinbox.com";

// Hardcoded defaults per environment
function getDefaultsFromBaseUrl(baseUrl) {
  if (baseUrl.includes("dev-v2.satuinbox.com")) {
    return {
      channelId: "692fe8eaaff05e8a1623e0d3",
      signatureKey: "sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if",
      accountChannels: [
        { id: "698ef3aada258f2a5a46bf89", topic: "hey" },
        { id: "6964ac1d2a5dbde9a5c6fa28", topic: "tumbler biru" },
        { id: "69783b0154be8e7508b4af08", topic: "CS harga" },
        { id: "69782d3654be8e7508b4abfe", topic: "Complain" },
        { id: "6964ab6929de985a0fe73e48", topic: "kipas angin" },
      ],
    };
  }

  if (baseUrl.includes("v2.satuinbox.com")) {
    return {
      channelId: "694b55ffbb886b39e785d2c0",
      signatureKey: "sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM",
      accountChannels: [
        { id: "6996bcd952ef87df9e414fd3", topic: "Complain" },
        { id: "69649c6b905d65859c36f81c", topic: "remote control" },
        { id: "697845cf1782f1bd889b6bfc", topic: "CS harga" },
        { id: "6964931c905d65859c36f618", topic: "kipas angin" },
        { id: "69a9c8c86e7924748d4af383", topic: "Hayoh kumaha" },
      ],
    };
  }

  return {};
}

function getApiBase(baseUrl) {
  if (baseUrl === "https://dev-v2.satuinbox.com")
    return "https://dev-v2-api.satuinbox.com/";
  if (baseUrl === "https://v2.satuinbox.com")
    return "https://v2-api.satuinbox.com/";

  throw new Error(`Unknown BASE_URL mapping: ${baseUrl}`);
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function randomAlphanumeric(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
}

// ========================================
// Configuration
// ========================================
const defaults = getDefaultsFromBaseUrl(BASE_URL);
const SIGNATURE_KEY = __ENV.SIGNATURE_KEY || defaults.signatureKey || "";
const MODE = (__ENV.MODE || "soak").toLowerCase(); // soak | throughput
const TARGET_CONNECTIONS = parseInt(__ENV.TARGET_CONNECTIONS || "100");
const EMIT_EVENT = __ENV.EMIT_EVENT || "socket.inbound.message";
const EMIT_EVERY_MS = parseInt(__ENV.EMIT_EVERY_MS || "2000");
const SOCKET_AUTH_MODE = __ENV.SOCKET_AUTH_MODE || "signatureKey";
const DEBUG_ALL_EVENTS =
  (__ENV.DEBUG_ALL_EVENTS || "false").toLowerCase() === "true";
const AUTO_PREPARE = (__ENV.AUTO_PREPARE || "true").toLowerCase() === "true";
const PREPARE_MODE = (__ENV.PREPARE_MODE || "shared").toLowerCase(); // shared | perclient
const TOPIC_PREFIX = __ENV.TOPIC_PREFIX || "loadtest";
const JOIN_EVENT = __ENV.JOIN_EVENT || "join.conversation";
const WIDGET_CHANNEL_ID =
  __ENV.WIDGET_CHANNEL_ID || defaults.channelId || "692fe8eaaff05e8a1623e0d3";

const apiBase = getApiBase(BASE_URL);
const socketUrl = apiBase.replace(/\/$/, "") + "/conversations";

const accountChannels = (defaults.accountChannels || []).length > 0
  ? defaults.accountChannels
  : [];

// ========================================
// Helper: Create Client Contact via HTTP
// ========================================
function createClientContact(channelId, guestName, referenceId) {
  const url = apiBase + "open-api/client-contact";
  const payload = JSON.stringify({
    channelId,
    metaData: {
      browserName: "Chrome",
      deviceType: "Desktop",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    name: guestName,
    referenceId,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      "x-signature-key": SIGNATURE_KEY,
    },
  };

  const res = http.post(url, payload, params);

  if (!check(res, {
    "createClientContact status is 200-299": (r) => r.status >= 200 && r.status < 300,
  })) {
    errorRate.add(1);
    console.error(`createClientContact failed: ${res.status} - ${res.body}`);
    return null;
  }

  try {
    const json = JSON.parse(res.body);
    return json?.id || json?.data?.id;
  } catch (e) {
    errorRate.add(1);
    console.error(`createClientContact parse error: ${e}`);
    return null;
  }
}

// ========================================
// Helper: Submit Topic via HTTP
// ========================================
function submitTopic(accountChannelId, clientContactId, topicName) {
  const url = apiBase + "open-api/conversation/submit/topic";
  const payload = JSON.stringify({
    accountChannelId,
    clientContactId,
    metadata: [
      {
        browserName: "Chrome",
        deviceType: "Desktop",
        topic: topicName,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    ],
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      "x-signature-key": SIGNATURE_KEY,
    },
  };

  const res = http.post(url, payload, params);

  if (!check(res, {
    "submitTopic status is 200-299": (r) => r.status >= 200 && r.status < 300,
  })) {
    errorRate.add(1);
    console.error(`submitTopic failed: ${res.status} - ${res.body}`);
    return null;
  }

  try {
    const json = JSON.parse(res.body);
    return json?.id || json?.data?.id;
  } catch (e) {
    errorRate.add(1);
    console.error(`submitTopic parse error: ${e}`);
    return null;
  }
}

// ========================================
// Setup: Auto-prepare shared conversation
// ========================================
export function setup() {
  console.log(`[SETUP] Starting Socket Load Test - Mode: ${MODE}`);
  console.log(`[SETUP] Base URL: ${BASE_URL}`);
  console.log(`[SETUP] Socket URL: ${socketUrl}`);
  console.log(
    `[SETUP] Signature Key: ${SIGNATURE_KEY ? "✓ Loaded from defaults" : "✗ NOT FOUND"}`
  );

  if (!SIGNATURE_KEY) {
    console.error("[SETUP] ERROR: SIGNATURE_KEY is missing!");
    throw new Error("Missing SIGNATURE_KEY");
  }

  const setupData = {
    channelAccountId: null,
    clientContactId: null,
    conversationId: null,
  };

  if (
    MODE === "throughput" &&
    EMIT_EVENT === "socket.inbound.message" &&
    AUTO_PREPARE &&
    PREPARE_MODE === "shared"
  ) {
    console.log("[SETUP] Auto-preparing shared conversation...");

    if (accountChannels.length === 0) {
      console.error("[SETUP] ERROR: No account channels available");
      return setupData;
    }

    const picked = accountChannels[
      Math.floor(Math.random() * accountChannels.length)
    ];
    const accountChannelId = picked.id;
    const topicName = picked.topic || `${TOPIC_PREFIX}-${randomAlphanumeric(4)}`;
    const guestName = `guest-${randomAlphanumeric(6)}`;
    const referenceId = uuid();

    console.log(
      `[SETUP] Creating contact: ${guestName} in channel: ${accountChannelId}`
    );
    const clientContactId = createClientContact(
      WIDGET_CHANNEL_ID,
      guestName,
      referenceId
    );

    if (!clientContactId) {
      console.error("[SETUP] ERROR: Failed to create client contact");
      return setupData;
    }

    console.log(`[SETUP] Submitting topic: ${topicName}`);
    const conversationId = submitTopic(
      accountChannelId,
      clientContactId,
      topicName
    );

    if (!conversationId) {
      console.error("[SETUP] ERROR: Failed to create conversation");
      return setupData;
    }

    setupData.channelAccountId = accountChannelId;
    setupData.clientContactId = clientContactId;
    setupData.conversationId = conversationId;

    console.log("[SETUP] Shared conversation ready:", setupData);
  }

  return setupData;
}

// ========================================
// Main VU function - Socket.IO style
// ========================================
export default function (setupData) {
  const vuId = exec.vu.idInTest;

  const res = ws.connect(
    socketUrl,
    {
      tags: { name: `socket-${vuId}` },
    },
    function (socket) {
      const startConnect = Date.now();

      socket.on("connect", function () {
        const connectTime = Date.now() - startConnect;
        connectLatency.add(connectTime);
        connectSuccess.add(1);
        activeConnections.add(1);

        if (DEBUG_ALL_EVENTS) {
          console.log(
            `[VU-${vuId}] Connected in ${connectTime}ms to ${socketUrl}`
          );
        }

        // Join conversation if in throughput mode with shared prepare
        if (
          MODE === "throughput" &&
          setupData.conversationId &&
          PREPARE_MODE === "shared"
        ) {
          socket.emit(JOIN_EVENT, {
            conversationId: setupData.conversationId,
          });

          if (DEBUG_ALL_EVENTS) {
            console.log(`[VU-${vuId}] Joined conversation`);
          }
        }

        // Start emitting messages in throughput mode
        if (MODE === "throughput") {
          const messageLoop = setInterval(function () {
            if (socket.readyState === ws.OPEN) {
              const payload = {
                channelAccountId: setupData.channelAccountId,
                clientContactId: setupData.clientContactId,
                tempMessageId: uuid(),
                timestamp: new Date().toISOString(),
                type: "text",
                content: `load-test VU-${vuId} ${new Date().toISOString()}`,
              };

              const startEmit = Date.now();
              socket.emit(EMIT_EVENT, payload);
              const emitTime = Date.now() - startEmit;
              emitLatency.add(emitTime);
              messagesSent.add(1);

              if (DEBUG_ALL_EVENTS && Math.random() < 0.01) {
                console.log(
                  `[VU-${vuId}] Emitted message #${messagesSent} in ${emitTime}ms`
                );
              }
            }
          }, EMIT_EVERY_MS);

          socket.on("disconnect", function () {
            clearInterval(messageLoop);
            activeConnections.add(-1);
          });
        } else {
          // Soak mode
          socket.on("disconnect", function () {
            activeConnections.add(-1);
          });
        }
      });

      socket.on("connect_error", function (err) {
        connectErrors.add(1);
        errorRate.add(1);
        console.error(`[VU-${vuId}] Connection error:`, err);
      });

      socket.on("error", function (err) {
        errorRate.add(1);
        if (DEBUG_ALL_EVENTS) {
          console.error(`[VU-${vuId}] Error:`, err);
        }
      });

      socket.on("disconnect", function (reason) {
        if (DEBUG_ALL_EVENTS) {
          console.log(`[VU-${vuId}] Disconnected: ${reason}`);
        }
      });

      // Handle any incoming messages
      socket.on("message", function (data) {
        messagesReceived.add(1);
        if (DEBUG_ALL_EVENTS) {
          console.log(`[VU-${vuId}] Message received:`, data);
        }
      });

      socket.on("response", function (data) {
        messagesReceived.add(1);
        if (DEBUG_ALL_EVENTS) {
          console.log(`[VU-${vuId}] Response received:`, data);
        }
      });

      // Keep socket open for test duration
      socket.setTimeout(30000);
    }
  );

  // Check connection result
  if (!res || !res.status) {
    connectErrors.add(1);
    errorRate.add(1);
    console.error(
      `[VU-${vuId}] WebSocket connection error: ${res ? res.error : "unknown"}`
    );
  }

  sleep(1);
}

// ========================================
// Teardown
// ========================================
export function teardown(data) {
  console.log("[TEARDOWN] Socket load test completed");
}

// ========================================
// Options - k6 configuration
// ========================================
export const options = {
  // Ramp up: add VUs gradually
  stages: [
    { duration: "30s", target: Math.ceil(TARGET_CONNECTIONS / 10) }, // 10% ramp
    { duration: "1m", target: Math.ceil(TARGET_CONNECTIONS / 2) },   // 50% ramp
    { duration: "2m", target: TARGET_CONNECTIONS },                  // 100% ramp
    { duration: __ENV.RUN_DURATION_SECONDS || "5m", target: TARGET_CONNECTIONS }, // sustain
    { duration: "30s", target: 0 },                                  // ramp down
  ],

  // Thresholds for pass/fail
  thresholds: {
    socket_connect_success: ["count > 0"],
    socket_connect_errors: ["rate < 0.1"],
    messages_sent: MODE === "throughput" ? ["count > 0"] : [],
    errors: ["rate < 0.2"],
    connect_latency: ["p(95) < 30000"], // 30 sec
  },

  // Extended timeout for WebSocket
  ext: {
    loadimpact: {
      name: "Socket.IO Load Test - Multichannel",
      tags: {
        testType: "socket-load",
        mode: MODE,
      },
    },
  },
};
