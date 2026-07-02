#!/usr/bin/env node
'use strict';

const { appendQuery, timedGet, formatDurationStats } = require('./lib/http');
const { authenticate } = require('./lib/auth');
const { resolveStatusKey } = require('./lib/error-classifier');
const { FE_CONVERSATION_SORT } = require('./lib/invalidation-reflex');

function parseArgs(argv) {
  const args = {
    env: process.env.ENV || 'dev',
    loginType: process.env.LOGIN_TYPE || 'danyatmin01',
    durationSec: Number(process.env.PROBE_DURATION_SEC || 120),
    intervalMs: Number(process.env.PROBE_INTERVAL_MS || 1000),
    apiBase: process.env.PROBE_API_BASE || '',
    verbose: false,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const current = argv[i];
    const next = argv[i + 1];
    if (current === '--env' && next) { args.env = next; i += 1; continue; }
    if (current === '--login-type' && next) { args.loginType = next; i += 1; continue; }
    if (current === '--duration-sec' && next) { args.durationSec = Number(next); i += 1; continue; }
    if (current === '--interval-ms' && next) { args.intervalMs = Number(next); i += 1; continue; }
    if (current === '--api-base' && next) { args.apiBase = next; i += 1; continue; }
    if (current === '--verbose') { args.verbose = true; continue; }
    if (current === '--help' || current === '-h') {
      console.log(`
Conversation hotpath probe

Usage:
  node scripts/storm-reproducer/hotpath-probe.js [options]

Options:
  --env <dev|staging|prod>      default: ENV or dev
  --login-type <name>           default: LOGIN_TYPE or danyatmin01
  --duration-sec <n>            default: 120
  --interval-ms <n>             default: 1000
  --api-base <url>              optional API base override
  --verbose                     print every cycle result
  --help                        show this help

This probe continuously measures the exact two prod-symptom endpoints:
  - /api/conversation?status=open&sort=isPinned:desc,pinnedAt:desc,timestamp:desc&hideEmpty=true&limit=20&page=1
  - /api/conversation/count
`);
      process.exit(0);
    }
  }

  return args;
}

function createBucket() {
  return { ok: 0, errors: 0, durations: [], statuses: {} };
}

function record(bucket, result) {
  if (result.ok) bucket.ok += 1;
  else bucket.errors += 1;
  bucket.durations.push(result.durationMs);
  const statusKey = resolveStatusKey(result);
  bucket.statuses[statusKey] = (bucket.statuses[statusKey] || 0) + 1;
}

async function main() {
  const opts = parseArgs(process.argv);
  const { runtime, token } = await authenticate({
    envName: opts.env,
    loginType: opts.loginType,
    apiBase: opts.apiBase,
  });

  const listUrl = appendQuery(runtime.endpoints.conversation, {
    status: 'open',
    sort: FE_CONVERSATION_SORT,
    hideEmpty: true,
    limit: 20,
    page: 1,
  });
  const countUrl = runtime.endpoints.conversationCount;

  const listBucket = createBucket();
  const countBucket = createBucket();
  let cycle = 0;
  const deadline = Date.now() + (opts.durationSec * 1000);

  console.log(`[probe] env=${opts.env} duration=${opts.durationSec}s interval=${opts.intervalMs}ms`);
  console.log(`[probe] list=${listUrl}`);
  console.log(`[probe] count=${countUrl}`);

  while (Date.now() < deadline) {
    cycle += 1;
    const [listResult, countResult] = await Promise.all([
      timedGet(listUrl, token),
      timedGet(countUrl, token),
    ]);

    record(listBucket, listResult);
    record(countBucket, countResult);

    if (opts.verbose) {
      console.log(`[probe] cycle=${cycle} list=${listResult.status}/${listResult.durationMs}ms count=${countResult.status}/${countResult.durationMs}ms`);
    }

    if (opts.intervalMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, opts.intervalMs));
    }
  }

  console.log('');
  console.log('[probe] summary:');
  console.log(`  GET /conversation (variant-1 all)   ok=${listBucket.ok} errors=${listBucket.errors} statuses=${JSON.stringify(listBucket.statuses)} ${formatDurationStats(listBucket.durations)}`);
  console.log(`  GET /conversation/count             ok=${countBucket.ok} errors=${countBucket.errors} statuses=${JSON.stringify(countBucket.statuses)} ${formatDurationStats(countBucket.durations)}`);
}

main().catch((error) => {
  console.error('[probe] fatal:', error?.stack || error?.message || error);
  process.exit(1);
});
