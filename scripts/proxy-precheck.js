#!/usr/bin/env node
/**
 * Proxy Precheck Utility
 *
 * Reads a proxy list file (one proxy URL per line) and tests each proxy by doing an HTTPS request
 * through the proxy using undici ProxyAgent.
 *
 * Writes working proxies to an output file.
 *
 * Usage (PowerShell):
 *   node scripts/proxy-precheck.js
 *
 * Env:
 * - PROXY_LIST_FILE: input file path (default: scripts/ipList)
 * - PROXY_OK_FILE: output file path (default: scripts/ipList.ok)
 * - TEST_URL: URL to fetch through proxy (default: https://v2-api.satuinbox.com/)
 * - TIMEOUT_MS: per-proxy timeout (default: 8000)
 * - CONCURRENCY: number of parallel checks (default: 20)
 * - LIMIT: max proxies to test from the list (default: 0 = all)
 * - LOG_EVERY: progress log interval (default: 25)
 */

const fs = require("fs");
const { ProxyAgent } = require("undici");

function envInt(name, def) {
  const v = process.env[name];
  if (v == null || v === "") return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Invalid number for ${name}: ${v}`);
  return n;
}

function envStr(name, def = "") {
  const v = process.env[name];
  return v == null || v === "" ? def : String(v);
}

function loadList(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !s.startsWith("#"));
}

async function fetchViaProxy({ proxyUrl, testUrl, timeoutMs }) {
  const agent = new ProxyAgent(proxyUrl);
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(testUrl, {
      method: "GET",
      dispatcher: agent,
      signal: controller.signal,
      // keep it small
      headers: { "user-agent": "proxy-precheck/1.0" },
    });
    // Accept any 2xx/3xx/4xx as "reachable"; reject 5xx? We'll accept < 500.
    return { ok: res.status > 0 && res.status < 500, status: res.status };
  } finally {
    clearTimeout(t);
    try {
      agent.close();
    } catch {}
  }
}

async function main() {
  const input = envStr("PROXY_LIST_FILE", "scripts/ipList");
  const output = envStr("PROXY_OK_FILE", "scripts/ipList.ok");
  const testUrl = envStr("TEST_URL", "https://v2-api.satuinbox.com/");

  const timeoutMs = envInt("TIMEOUT_MS", 20000);
  const concurrency = Math.max(1, envInt("CONCURRENCY", 20));
  const limit = envInt("LIMIT", 0);
  const logEvery = envInt("LOG_EVERY", 25);

  if (!fs.existsSync(input)) {
    throw new Error(`Input file not found: ${input}`);
  }

  const all = loadList(input);
  const list = limit > 0 ? all.slice(0, limit) : all;

  console.log("--- Proxy precheck ---");
  console.log({
    input,
    output,
    testUrl,
    timeoutMs,
    concurrency,
    total: list.length,
    limit,
  });

  // truncate output
  fs.writeFileSync(output, "", "utf8");

  let idx = 0;
  let pass = 0;
  let fail = 0;

  const results = [];

  async function worker(wid) {
    while (true) {
      const i = idx++;
      if (i >= list.length) return;
      const proxyUrl = list[i];

      try {
        const r = await fetchViaProxy({ proxyUrl, testUrl, timeoutMs });
        if (r.ok) {
          pass++;
          fs.appendFileSync(output, proxyUrl + "\n", "utf8");
          results.push({ proxyUrl, status: r.status });
        } else {
          fail++;
        }
      } catch (e) {
        fail++;
      }

      const done = pass + fail;
      if (done % logEvery === 0) {
        console.log(
          `[progress] done=${done}/${list.length} pass=${pass} fail=${fail}`,
        );
      }
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, list.length) },
    (_, k) => worker(k + 1),
  );
  await Promise.all(workers);

  console.log("--- Done ---");
  console.log({ pass, fail, total: list.length, output });

  // Show a few samples
  console.log("Sample OK proxies:", results.slice(0, 10));
}

main().catch((err) => {
  console.error("FAILED:", err?.stack || err?.message || err);
  process.exitCode = 1;
});
