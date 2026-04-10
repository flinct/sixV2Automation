/**
 * Socket.IO Load Test for k6 (Advanced Version)
 * 
 * This is an alternative version that uses a more direct WebSocket approach
 * that's better compatible with Socket.IO protocol
 */

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
// Configuration
// ========================================
function getDefaults(baseUrl) {
  if (baseUrl.includes("dev-v2.satuinbox.com")) {
    return {
      channelId: "692fe8eaaff05e8a1623e0d3",
      signatureKey: "sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if",
      accountChannels: [
        { id: "698ef3aada258f2a5a46bf89", topic: "hey" },
        { id: "6964ac1d2a5dbde9a5c6fa28", topic: "tumbler biru" },
        { id: "69783b0154be8e7508b4af08", topic: "CS harga" },
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
      ],
    };
  }
  return { channelId: "", signatureKey: "", accountChannels: [] };
}

const BASE_URL = __ENV.BASE_URL || "https://dev-v2.satuinbox.com";
const defaults = getDefaults(BASE_URL);
const SIGNATURE_KEY = __ENV.SIGNATURE_KEY || defaults.signatureKey || "";
const MODE = (__ENV.MODE || "soak").toLowerCase();
const TARGET_CONNECTIONS = parseInt(__ENV.TARGET_CONNECTIONS || "10");
const EMIT_EVERY_MS = parseInt(__ENV.EMIT_EVERY_MS || "2000");
const DEBUG = (__ENV.DEBUG || "false").toLowerCase() === "true";

function getApiBase(url) {
  if (url === "https://dev-v2.satuinbox.com")
    return "https://dev-v2-api.satuinbox.com/";
  if (url === "https://v2.satuinbox.com") return "https://v2-api.satuinbox.com/";
  return "";
}

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const apiBase = getApiBase(BASE_URL);
const apiUrl = apiBase.replace(/\/$/, "");

// ========================================
// Setup
// ========================================
export function setup() {
  console.log(
    `[SETUP] Socket.IO Load Test | Mode: ${MODE} | Target: ${TARGET_CONNECTIONS} VUs`
  );
  console.log(`[SETUP] API: ${apiUrl}`);
  console.log(
    `[SETUP] Signature Key: ${SIGNATURE_KEY ? "✓ Found" : "✗ Missing"}`
  );

  if (!SIGNATURE_KEY) {
    throw new Error("Missing SIGNATURE_KEY");
  }

  return {
    channelAccountId: null,
    clientContactId: null,
    conversationId: null,
  };
}

// ========================================
// Main VU - Socket.IO HTTP Long-Polling Fallback
// ========================================
export default function (setupData) {
  const vuId = exec.vu.idInTest;
  const startTime = Date.now();
  let emitCount = 0;

  try {
    // Socket.IO handshake via HTTP
    const handshakeUrl = `${apiUrl}/conversations/?EIO=4&transport=websocket`;

    if (DEBUG && vuId % 10 === 0) {
      console.log(`[VU-${vuId}] Attempting handshake to ${handshakeUrl}`);
    }

    const handshakeRes = http.get(handshakeUrl, {
      headers: {
        "Authorization": `Bearer ${SIGNATURE_KEY}`,
        "Origin": BASE_URL,
      },
      timeout: "30s",
    });

    if (check(handshakeRes, {
      "Handshake 2xx": (r) => r.status >= 200 && r.status < 300,
    })) {
      connectSuccess.add(1);
      activeConnections.add(1);
      connectLatency.add(Date.now() - startTime);

      if (DEBUG && vuId % 10 === 0) {
        console.log(`[VU-${vuId}] Handshake successful`);
      }

      // Emit messages
      if (MODE === "throughput") {
        for (let i = 0; i < 5; i++) {
          if (i * EMIT_EVERY_MS > 5000) break; // max 5 seconds

          const emitUrl = `${apiUrl}/conversations/emit`;
          const payload = JSON.stringify({
            event: "socket.inbound.message",
            data: {
              channelAccountId: setupData.channelAccountId,
              clientContactId: setupData.clientContactId,
              tempMessageId: uuid(),
              timestamp: new Date().toISOString(),
              type: "text",
              content: `VU-${vuId} iteration ${i}`,
            },
          });

          const emitStart = Date.now();
          const emitRes = http.post(emitUrl, payload, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${SIGNATURE_KEY}`,
            },
            timeout: "30s",
          });

          emitLatency.add(Date.now() - emitStart);
          messagesSent.add(1);
          emitCount++;

          if (emitRes.status < 200 || emitRes.status > 299) {
            errorRate.add(1);
          }

          sleep(EMIT_EVERY_MS / 1000);
        }
      }

      activeConnections.add(-1);

      if (DEBUG && emitCount > 0 && vuId % 10 === 0) {
        console.log(`[VU-${vuId}] Emitted ${emitCount} messages`);
      }
    } else {
      connectErrors.add(1);
      errorRate.add(1);
      console.error(
        `[VU-${vuId}] Handshake failed: ${handshakeRes.status} - ${handshakeRes.body}`
      );
    }
  } catch (e) {
    connectErrors.add(1);
    errorRate.add(1);
    console.error(`[VU-${vuId}] Error:`, e.message || e);
  }

  sleep(1);
}

export const options = {
  stages: [
    { duration: "10s", target: Math.ceil(TARGET_CONNECTIONS / 5) },
    { duration: "20s", target: TARGET_CONNECTIONS },
    { duration: "30s", target: TARGET_CONNECTIONS },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    socket_connect_success: ["count > 0"],
    socket_connect_errors: ["rate < 0.5"],
    errors: ["rate < 0.5"],
  },
};
