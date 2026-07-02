#!/usr/bin/env node
/**
 * Conversation list size probe.
 *
 * Purpose:
 * - Quantify how big GET /api/conversation and GET /api/conversation/count
 *   responses are, end-to-end (bytes, TTFB, content time).
 * - Census presence of v2.7.0 fields that the slowdown analysis flagged as
 *   payload-bloat candidates (mentions[], mentionAll, unreadMentionCount,
 *   lid, assignSource, memberLids, memberContactInfo[]).
 * - Save snapshots so you can diff v2.6.1 vs v2.7.0 (or env vs env) later.
 *
 * Read-only by design. Never publishes anything. No FE/BE repo writes.
 *
 * Examples:
 *   node scripts/conversation-size-probe/conversation-size-probe.js \
 *     --env dev --login-type cekerayam01 \
 *     --query "status=ongoing&limit=20&page=1" \
 *     --label v270-dev-baseline
 *
 *   node scripts/conversation-size-probe/conversation-size-probe.js \
 *     --diff snapshots/2.6.1.json snapshots/2.7.0.json
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const { getConfig, getAccountByLoginType } = require('../../playwright/support/config');
const { buildBearerAuthHeader, loginErrorHint, normalizeApiBase } = require('../_shared/api-base');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (!current.startsWith('--')) continue;
    const key = current.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    i += 1;
  }
  return args;
}

function usage() {
  return `
Conversation list size probe

Usage:
  node scripts/conversation-size-probe/conversation-size-probe.js [options]

Capture mode (default):
  --env <dev|staging|prod|local>       Target env (default: ENV or dev)
  --api-base <url>                     Override API base
  --login-type <name>                  Automation loginType (default: config default account)
  --identifier <value>                 Explicit login identifier
  --password <value>                   Explicit login password
  --auth-bearer-token <token>          Reuse an existing bearer token
  --query "<a=b&c=d>"                  Query string for /api/conversation (default: "status=open&limit=20&page=1"). Valid statuses: all|open|close|unrecognized.
  --hit-count                          Also call /api/conversation/count with the same filter
  --repeat <n>                         Run the call N times and average timing (default: 3)
  --label <name>                       Tag used in the snapshot filename
  --output <dir>                       Snapshot directory (default: scripts/conversation-size-probe/snapshots)
  --no-save                            Print summary only, don't save snapshot
  --include-body                       Store raw response body inside the snapshot (off by default)

Diff mode:
  --diff <leftSnapshot> <rightSnapshot>   Compare two saved snapshots (positional args after --diff)

Common:
  --help                               Show this help
`;
}

const BLOAT_FIELDS_TOP = ['unreadMentionCount', 'mentionAll'];
const BLOAT_FIELDS_NESTED = {
  'clientContact.lid': (item) => item?.clientContact?.lid !== undefined,
  'memberContactInfo[].lid': (item) =>
    Array.isArray(item?.memberContactInfo) && item.memberContactInfo.some((m) => m?.lid !== undefined),
  'memberContactInfo[]': (item) => Array.isArray(item?.memberContactInfo) && item.memberContactInfo.length > 0,
  'participants[].assignSource': (item) =>
    Array.isArray(item?.participants) && item.participants.some((p) => p?.assignSource !== undefined),
  'latestMessage.mentions[]': (item) =>
    Array.isArray(item?.latestMessage?.mentions) && item.latestMessage.mentions.length > 0,
  'latestMessage.mentionAll': (item) => item?.latestMessage?.mentionAll !== undefined,
  'pinnedMessage.mentions[]': (item) =>
    Array.isArray(item?.pinnedMessage?.mentions) && item.pinnedMessage.mentions.length > 0,
  'pinnedMessage.mentionAll': (item) => item?.pinnedMessage?.mentionAll !== undefined,
};

function bytesOf(text) {
  return Buffer.byteLength(text || '', 'utf8');
}

function pickItems(json) {
  if (Array.isArray(json?.items)) return json.items;
  if (Array.isArray(json?.data?.items)) return json.data.items;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json)) return json;
  return [];
}

function censusItems(items) {
  const census = {
    itemCount: items.length,
    topLevel: Object.fromEntries(BLOAT_FIELDS_TOP.map((field) => [field, 0])),
    nested: Object.fromEntries(Object.keys(BLOAT_FIELDS_NESTED).map((field) => [field, 0])),
    sizes: { perItemBytes: [], totalItemsBytes: 0 },
    groupCount: 0,
    whatsappCount: 0,
    profileCounts: {},
  };

  for (const item of items) {
    for (const field of BLOAT_FIELDS_TOP) {
      if (item && item[field] !== undefined) census.topLevel[field] += 1;
    }
    for (const [field, detector] of Object.entries(BLOAT_FIELDS_NESTED)) {
      if (detector(item)) census.nested[field] += 1;
    }
    const platformCode =
      item?.channel?.platform?.code ??
      item?.accountChannel?.channel?.platform?.code ??
      item?.platform?.code ??
      'unknown';
    census.profileCounts[platformCode] = (census.profileCounts[platformCode] || 0) + 1;
    if (item?.isGroup) census.groupCount += 1;
    if (typeof platformCode === 'string' && platformCode.includes('whatsapp')) census.whatsappCount += 1;

    const itemBytes = bytesOf(JSON.stringify(item));
    census.sizes.perItemBytes.push(itemBytes);
    census.sizes.totalItemsBytes += itemBytes;
  }

  return census;
}

function stats(arr) {
  if (!arr.length) return { count: 0, mean: 0, min: 0, max: 0, p50: 0, p95: 0 };
  const sorted = [...arr].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, n) => acc + n, 0);
  const pick = (q) => sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))];
  return {
    count: sorted.length,
    mean: Math.round(sum / sorted.length),
    min: sorted[0],
    max: sorted[sorted.length - 1],
    p50: pick(0.5),
    p95: pick(0.95),
  };
}

async function timedFetch(url, init = {}) {
  const started = Date.now();
  const response = await fetch(url, init);
  const headersDoneAt = Date.now();
  const text = await response.text();
  const bodyDoneAt = Date.now();

  return {
    bodyBytes: bytesOf(text),
    bodyMs: bodyDoneAt - headersDoneAt,
    headersMs: headersDoneAt - started,
    ok: response.ok,
    status: response.status,
    text,
    totalMs: bodyDoneAt - started,
  };
}

function unwrapData(json) {
  return json && typeof json === 'object' && 'data' in json ? json.data : json;
}

async function loginIfNeeded(options, config) {
  if (options.authBearerToken) return options.authBearerToken;

  const identifier = options.identifier || process.env.API_TEST_USERNAME || '';
  const password = options.password || process.env.API_TEST_PASSWORD || '';
  let credentials;

  if (identifier && password) {
    credentials = { identifier, password };
  } else if (options.loginType) {
    credentials = getAccountByLoginType(options.loginType, options.envName);
  } else {
    credentials = config.getDefaultAccount();
  }

  if (!credentials?.identifier || !credentials?.password) {
    throw new Error('No credentials available for login. Supply --auth-bearer-token or --identifier/--password or --login-type.');
  }

  const response = await fetch(config.endpoints.loginUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ identifier: credentials.identifier, password: credentials.password }),
  });

  const text = await response.text();
  if (!response.ok) {
    const hint = loginErrorHint(text);
    throw new Error(`Login failed: HTTP ${response.status} ${response.statusText}${hint} body=${text.slice(0, 200)}`);
  }

  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = {}; }
  const payload = unwrapData(json) || json;
  const accessToken = payload?.accessToken || json?.accessToken || payload?.data?.accessToken;
  if (!accessToken) throw new Error('Login succeeded but no accessToken found in response.');
  return accessToken;
}

function appendQuery(url, query) {
  const next = new URL(url);
  if (!query) return next.toString();
  const params = new URLSearchParams(query);
  for (const [key, value] of params.entries()) {
    next.searchParams.set(key, value);
  }
  return next.toString();
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  return `${(n / 1024 / 1024).toFixed(2)} MiB`;
}

function buildSnapshot(meta, samples, items, census, countSamples) {
  const allBytes = samples.map((sample) => sample.bodyBytes);
  const allTtfb = samples.map((sample) => sample.headersMs);
  const allTotal = samples.map((sample) => sample.totalMs);

  const snapshot = {
    capturedAt: new Date().toISOString(),
    label: meta.label,
    env: meta.envName,
    apiBase: meta.apiBase,
    query: meta.query,
    conversationUrl: meta.conversationUrl,
    conversationCountUrl: meta.conversationCountUrl,
    sampleCount: samples.length,
    response: {
      bytes: stats(allBytes),
      ttfbMs: stats(allTtfb),
      totalMs: stats(allTotal),
      itemCount: items.length,
      perItemBytes: stats(census.sizes.perItemBytes),
      totalItemsBytes: census.sizes.totalItemsBytes,
    },
    census,
    countCalls: countSamples
      ? {
          sampleCount: countSamples.length,
          ttfbMs: stats(countSamples.map((sample) => sample.headersMs)),
          totalMs: stats(countSamples.map((sample) => sample.totalMs)),
          bytes: stats(countSamples.map((sample) => sample.bodyBytes)),
        }
      : null,
  };

  if (meta.includeBody) {
    snapshot.rawBody = samples[0]?.text || '';
  }
  return snapshot;
}

function normalizeApiBaseLocalShim(value) {
  // Backwards-compat shim retained so tests that import normalizeApiBase from
  // this script keep working; delegates to the shared implementation.
  return normalizeApiBase(value);
}

async function runCaptureMode(rawArgs) {
  const envName = rawArgs.env || process.env.ENV || process.env.CYPRESS_ENV || 'dev';
  const config = getConfig(envName);
  const rawApiBase = rawArgs['api-base'] || process.env.API_BASE || process.env.E2E_API_BASE || config.env.apiBase;
  const apiBase = normalizeApiBase(rawApiBase);
  if (apiBase !== rawApiBase) {
    console.log(`[probe] normalized apiBase: ${rawApiBase} -> ${apiBase}`);
  }
  const query = rawArgs.query || 'status=open&limit=20&page=1';
  const repeat = Math.max(1, Number.parseInt(rawArgs.repeat, 10) || 3);
  const label = rawArgs.label || `${envName}-${Date.now()}`;
  const outputDir = rawArgs.output || path.join(__dirname, 'snapshots');
  const includeBody = Boolean(rawArgs['include-body']);
  const hitCount = Boolean(rawArgs['hit-count']);
  const noSave = Boolean(rawArgs['no-save']);

  const options = {
    apiBase,
    authBearerToken: rawArgs['auth-bearer-token'] || '',
    envName,
    identifier: rawArgs.identifier || '',
    loginType: rawArgs['login-type'] || process.env.LOGIN_TYPE || '',
    password: rawArgs.password || '',
  };

  // rebuild endpoints (and config view passed to loginIfNeeded) with the normalized apiBase
  const { ApiEndpoints } = require('../../playwright/support/config');
  const endpoints = new ApiEndpoints(apiBase);
  const useConfig = { ...config, endpoints, env: { ...config.env, apiBase } };
  const conversationUrl = appendQuery(endpoints.conversation, query);
  const conversationCountUrl = appendQuery(endpoints.conversationCount, query);

  console.log(`[probe] env=${envName} apiBase=${apiBase}`);
  console.log(`[probe] conversation url: ${conversationUrl}`);
  if (hitCount) console.log(`[probe] count url       : ${conversationCountUrl}`);

  const token = await loginIfNeeded(options, useConfig);
  const headers = buildBearerAuthHeader(token);

  const samples = [];
  let firstJson = null;
  for (let i = 0; i < repeat; i += 1) {
    const sample = await timedFetch(conversationUrl, { headers });
    if (!sample.ok) {
      throw new Error(`/conversation returned HTTP ${sample.status}; body=${sample.text.slice(0, 200)}`);
    }
    samples.push(sample);
    if (i === 0) {
      try { firstJson = sample.text ? JSON.parse(sample.text) : null; } catch { firstJson = null; }
    }
  }

  const items = pickItems(firstJson);
  const census = censusItems(items);

  let countSamples = null;
  if (hitCount) {
    countSamples = [];
    for (let i = 0; i < repeat; i += 1) {
      const sample = await timedFetch(conversationCountUrl, { headers });
      if (!sample.ok) {
        throw new Error(`/conversation/count returned HTTP ${sample.status}; body=${sample.text.slice(0, 200)}`);
      }
      countSamples.push(sample);
    }
  }

  const snapshot = buildSnapshot(
    { apiBase, conversationCountUrl, conversationUrl, envName, includeBody, label, query },
    samples,
    items,
    census,
    countSamples,
  );

  printSummary(snapshot);

  if (!noSave) {
    fs.mkdirSync(outputDir, { recursive: true });
    const safeLabel = label.replace(/[^a-z0-9._-]+/gi, '-');
    const filePath = path.join(outputDir, `${safeLabel}.json`);
    fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2), 'utf8');
    console.log(`\n[probe] snapshot saved -> ${filePath}`);
  } else {
    console.log('\n[probe] --no-save was set, snapshot not written.');
  }
}

function printSummary(snapshot) {
  console.log('\n=== /api/conversation summary ===');
  console.log(`label           : ${snapshot.label}`);
  console.log(`env             : ${snapshot.env}`);
  console.log(`query           : ${snapshot.query}`);
  console.log(`samples         : ${snapshot.sampleCount}`);
  console.log(`bytes (mean)    : ${formatBytes(snapshot.response.bytes.mean)} (min=${formatBytes(snapshot.response.bytes.min)} p95=${formatBytes(snapshot.response.bytes.p95)} max=${formatBytes(snapshot.response.bytes.max)})`);
  console.log(`ttfb ms (mean)  : ${snapshot.response.ttfbMs.mean} (p50=${snapshot.response.ttfbMs.p50} p95=${snapshot.response.ttfbMs.p95} max=${snapshot.response.ttfbMs.max})`);
  console.log(`total ms (mean) : ${snapshot.response.totalMs.mean} (p50=${snapshot.response.totalMs.p50} p95=${snapshot.response.totalMs.p95} max=${snapshot.response.totalMs.max})`);
  console.log(`items returned  : ${snapshot.response.itemCount}`);
  console.log(`per-item bytes  : mean=${snapshot.response.perItemBytes.mean} p50=${snapshot.response.perItemBytes.p50} p95=${snapshot.response.perItemBytes.p95} max=${snapshot.response.perItemBytes.max}`);
  console.log(`group convs     : ${snapshot.census.groupCount}`);
  console.log(`whatsapp convs  : ${snapshot.census.whatsappCount}`);
  console.log(`profiles        : ${Object.entries(snapshot.census.profileCounts).map(([k, v]) => `${k}:${v}`).join(', ') || '-'}`);
  console.log('\nv2.7.0 bloat field census:');
  for (const [field, hits] of Object.entries(snapshot.census.topLevel)) {
    console.log(`  ${field.padEnd(36)} present in ${hits}/${snapshot.census.itemCount} items`);
  }
  for (const [field, hits] of Object.entries(snapshot.census.nested)) {
    console.log(`  ${field.padEnd(36)} present in ${hits}/${snapshot.census.itemCount} items`);
  }

  if (snapshot.countCalls) {
    console.log('\n=== /api/conversation/count summary ===');
    console.log(`samples        : ${snapshot.countCalls.sampleCount}`);
    console.log(`bytes (mean)   : ${formatBytes(snapshot.countCalls.bytes.mean)}`);
    console.log(`ttfb ms (mean) : ${snapshot.countCalls.ttfbMs.mean} (p95=${snapshot.countCalls.ttfbMs.p95})`);
    console.log(`total ms (mean): ${snapshot.countCalls.totalMs.mean} (p95=${snapshot.countCalls.totalMs.p95})`);
  }
}

function deltaLine(label, left, right, formatter = (n) => n) {
  const diff = right - left;
  const pct = left === 0 ? '∞' : `${((diff / left) * 100).toFixed(1)}%`;
  const sign = diff > 0 ? '+' : '';
  return `${label.padEnd(28)} ${formatter(left).toString().padStart(12)} -> ${formatter(right).toString().padStart(12)}   (${sign}${formatter(diff)}, ${sign}${pct})`;
}

function runDiffMode(rawArgs) {
  const inputs = process.argv.slice(2).filter((arg, idx, arr) => {
    if (arg.startsWith('--')) return false;
    const prevIdx = idx - 1;
    return prevIdx >= 0 && arr[prevIdx] === '--diff' || (prevIdx >= 0 && !arr[prevIdx].startsWith('--'));
  });

  const positional = process.argv.slice(2);
  const diffFlagIdx = positional.indexOf('--diff');
  if (diffFlagIdx === -1) {
    throw new Error('Internal: --diff position not found.');
  }
  const left = positional[diffFlagIdx + 1];
  const right = positional[diffFlagIdx + 2];
  if (!left || !right || left.startsWith('--') || right.startsWith('--')) {
    throw new Error('Usage: --diff <leftSnapshot> <rightSnapshot>');
  }

  const leftSnap = JSON.parse(fs.readFileSync(path.resolve(left), 'utf8'));
  const rightSnap = JSON.parse(fs.readFileSync(path.resolve(right), 'utf8'));

  console.log(`left  : ${left}  (label=${leftSnap.label}, env=${leftSnap.env})`);
  console.log(`right : ${right}  (label=${rightSnap.label}, env=${rightSnap.env})`);
  console.log(`query : left="${leftSnap.query}"  right="${rightSnap.query}"`);
  console.log('');

  console.log(deltaLine('bytes mean',    leftSnap.response.bytes.mean, rightSnap.response.bytes.mean, formatBytes));
  console.log(deltaLine('bytes p95',     leftSnap.response.bytes.p95,  rightSnap.response.bytes.p95,  formatBytes));
  console.log(deltaLine('ttfb mean ms',  leftSnap.response.ttfbMs.mean, rightSnap.response.ttfbMs.mean));
  console.log(deltaLine('ttfb p95 ms',   leftSnap.response.ttfbMs.p95,  rightSnap.response.ttfbMs.p95));
  console.log(deltaLine('total mean ms', leftSnap.response.totalMs.mean, rightSnap.response.totalMs.mean));
  console.log(deltaLine('total p95 ms',  leftSnap.response.totalMs.p95,  rightSnap.response.totalMs.p95));
  console.log(deltaLine('items',         leftSnap.response.itemCount, rightSnap.response.itemCount));
  console.log(deltaLine('per-item mean', leftSnap.response.perItemBytes.mean, rightSnap.response.perItemBytes.mean));
  console.log(deltaLine('per-item p95',  leftSnap.response.perItemBytes.p95,  rightSnap.response.perItemBytes.p95));

  console.log('\nField census (% of items where field appears):');
  const allFields = new Set([
    ...Object.keys(leftSnap.census.topLevel),
    ...Object.keys(rightSnap.census.topLevel),
    ...Object.keys(leftSnap.census.nested),
    ...Object.keys(rightSnap.census.nested),
  ]);
  for (const field of allFields) {
    const leftCensus = leftSnap.census.topLevel[field] ?? leftSnap.census.nested[field] ?? 0;
    const rightCensus = rightSnap.census.topLevel[field] ?? rightSnap.census.nested[field] ?? 0;
    const leftPct = leftSnap.census.itemCount ? (leftCensus / leftSnap.census.itemCount) * 100 : 0;
    const rightPct = rightSnap.census.itemCount ? (rightCensus / rightSnap.census.itemCount) * 100 : 0;
    console.log(`  ${field.padEnd(36)} ${leftPct.toFixed(0).padStart(4)}%  ->  ${rightPct.toFixed(0).padStart(4)}%`);
  }

  if (leftSnap.countCalls && rightSnap.countCalls) {
    console.log('\n/api/conversation/count:');
    console.log(deltaLine('ttfb mean ms', leftSnap.countCalls.ttfbMs.mean, rightSnap.countCalls.ttfbMs.mean));
    console.log(deltaLine('ttfb p95 ms',  leftSnap.countCalls.ttfbMs.p95,  rightSnap.countCalls.ttfbMs.p95));
    console.log(deltaLine('total mean ms', leftSnap.countCalls.totalMs.mean, rightSnap.countCalls.totalMs.mean));
    console.log(deltaLine('total p95 ms',  leftSnap.countCalls.totalMs.p95,  rightSnap.countCalls.totalMs.p95));
  }
}

async function main() {
  const raw = parseArgs(process.argv.slice(2));
  if (raw.help) {
    console.log(usage());
    return;
  }

  if (process.argv.includes('--diff')) {
    runDiffMode(raw);
    return;
  }

  await runCaptureMode(raw);
}

if (require.main === module) {
  main().catch((error) => {
    console.error('[conversation-size-probe] failed:', error?.stack || error?.message || error);
    process.exitCode = 1;
  });
}

// Exported for unit tests (test/conversation-size-probe.spec.js).
module.exports = { normalizeApiBase };
