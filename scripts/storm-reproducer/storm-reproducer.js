#!/usr/bin/env node
'use strict';

const { authenticate } = require('./lib/auth');
const { formatDurationStats } = require('./lib/http');
const { attachInvalidationReflex, createMetrics } = require('./lib/invalidation-reflex');
const { createSocket } = require('./lib/socket-client');
const {
  countRequestedSubscribers,
  parseSubscriberSpec,
  resolveSubscriberSpec,
} = require('./lib/subscribers');
const { createSubscriberHotpath } = require('./lib/subscriber-hotpath');

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '');
}

function normalizeRole(value) {
  return String(value || 'unknown').trim().toLowerCase();
}

function parseArgs(argv) {
  const args = {
    env: process.env.ENV || 'dev',
    subscribers: process.env.STORM_SUBSCRIBERS || 'danyatmin01:1',
    subscribersFile: process.env.STORM_SUBSCRIBERS_FILE || '',
    durationSec: Number(process.env.STORM_DURATION_SEC || 120),
    route: process.env.STORM_ROUTE || 'your-inbox',
    teamId: process.env.STORM_TEAM_ID || '',
    apiBase: process.env.STORM_API_BASE || '',
    connectTimeoutMs: Number(process.env.STORM_CONNECT_TIMEOUT_MS || 10000),
    shutdownGraceMs: Number(process.env.STORM_SHUTDOWN_GRACE_MS || 5000),
    failAfter60: String(process.env.STORM_FAIL_AFTER_60 || 'true').trim().toLowerCase() === 'true',
    hotpathEnabled: String(process.env.STORM_HOTPATH_ENABLED || '').trim().toLowerCase() === 'true',
    hotpathIntervalMs: Number(process.env.STORM_HOTPATH_INTERVAL_MS || 1000),
    heartbeatIntervalSec: Number(process.env.STORM_HEARTBEAT_INTERVAL_SEC || 30),
    verbose: false,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const current = argv[i];
    const next = argv[i + 1];
    if (current === '--env' && next) { args.env = next; i += 1; continue; }
    if (current === '--subscribers' && next) { args.subscribers = next; i += 1; continue; }
    if (current === '--subscribers-file' && next) { args.subscribersFile = next; i += 1; continue; }
    if (current === '--duration-sec' && next) { args.durationSec = Number(next); i += 1; continue; }
    if (current === '--route' && next) { args.route = next; i += 1; continue; }
    if (current === '--team-id' && next) { args.teamId = next; i += 1; continue; }
    if (current === '--api-base' && next) { args.apiBase = next; i += 1; continue; }
    if (current === '--connect-timeout-ms' && next) { args.connectTimeoutMs = Number(next); i += 1; continue; }
    if (current === '--shutdown-grace-ms' && next) { args.shutdownGraceMs = Number(next); i += 1; continue; }
    if (current === '--hotpath-interval-ms' && next) { args.hotpathIntervalMs = Number(next); i += 1; continue; }
    if (current === '--hotpath-enabled') { args.hotpathEnabled = true; continue; }
    if (current === '--no-hotpath') { args.hotpathEnabled = false; continue; }
    if (current === '--verbose') { args.verbose = true; continue; }
    if (current === '--help' || current === '-h') {
      console.log(`
Conversation storm reproducer

Usage:
  node scripts/storm-reproducer/storm-reproducer.js [options]

Options:
  --env <dev|staging|prod>                  default: ENV or dev
  --subscribers <loginType[:count],...>     default: danyatmin01:1
  --subscribers-file <path>                 load subscriber spec from file
  --duration-sec <n>                        default: 120
  --route <your-inbox|all|unassigned|per-team-inbox>
                                            default: your-inbox
  --team-id <id>                            required when route=per-team-inbox
  --api-base <url>                          optional override for API base
  --connect-timeout-ms <n>                  default: 10000
  --shutdown-grace-ms <n>                   default: 5000
  --hotpath-enabled                         start per-subscriber hotpath probe loop
  --no-hotpath                              disable per-subscriber hotpath probe loop
  --hotpath-interval-ms <n>                 default: 1000
  --verbose                                 log every event decision
  --help                                    show this help

Examples:
  node scripts/storm-reproducer/storm-reproducer.js \
    --env dev \
    --subscribers danyatmin01:1,danyspv01:2,danyagent01:2 \
    --duration-sec 180 \
    --route your-inbox

  node scripts/storm-reproducer/storm-reproducer.js \
    --env dev \
    --subscribers-file scripts/storm-reproducer/subscribers/dev-bulk.txt \
    --duration-sec 180 \
    --route your-inbox

  node scripts/storm-reproducer/storm-reproducer.js \
    --env dev \
    --subscribers danyspv01:2 \
    --route per-team-inbox \
    --team-id 692e677de6f74788e2e6871b
`);
      process.exit(0);
    }
  }

  if (!Number.isFinite(args.durationSec) || args.durationSec <= 0) {
    throw new Error(`Invalid --duration-sec: ${args.durationSec}`);
  }
  if (args.route === 'per-team-inbox' && !args.teamId) {
    throw new Error('route=per-team-inbox requires --team-id');
  }
  return args;
}

function prefixedLogger(prefix) {
  return {
    info: (...args) => console.log(`[${prefix}]`, ...args),
    warn: (...args) => console.warn(`[${prefix}]`, ...args),
    error: (...args) => console.error(`[${prefix}]`, ...args),
  };
}

function waitForSocketConnect(socket, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Socket connect timeout after ${timeoutMs}ms`));
    }, timeoutMs);

    const onConnect = () => {
      cleanup();
      resolve();
    };
    const onError = (error) => {
      cleanup();
      reject(error instanceof Error ? error : new Error(String(error)));
    };
    const cleanup = () => {
      clearTimeout(timer);
      socket.off('connect', onConnect);
      socket.off('connect_error', onError);
    };

    socket.on('connect', onConnect);
    socket.on('connect_error', onError);
    socket.connect();
  });
}

async function buildSubscriber(opts, loginType, instanceIndex, meta = {}) {
  const label = `${loginType}#${instanceIndex}`;
  const declaredCompanyId = meta.declaredCompanyId || 'unknown';
  const logger = prefixedLogger(label);
  const { runtime, credentials, token, profile } = await authenticate({
    envName: opts.env,
    loginType,
    apiBase: opts.apiBase,
  });

  const currentUserId = firstDefined(
    profile?.id,
    profile?._id,
    profile?.user?.id,
    profile?.member?.id,
  );
  const currentUserRole = normalizeRole(
    firstDefined(
      profile?.role?.code,
      profile?.user?.role?.code,
      profile?.member?.role?.code,
      credentials?.role,
    ),
  );
  const organizationId = firstDefined(
    profile?.organizationId,
    profile?.organization?.id,
    profile?.organization?._id,
    profile?.company?.organizationId,
    profile?.company?.organization?.id,
  );
  const detectedCompanyId = firstDefined(
    profile?.companyId,
    profile?.company?.id,
    profile?.company?._id,
    profile?.member?.companyId,
    profile?.organization?.companyId,
  );

  const socket = createSocket(runtime.apiBase.replace(/\/+$/g, ''), token, {
    subPath: 'conversations',
    logger,
    failAfter60: opts.failAfter60,
  });

  await waitForSocketConnect(socket, opts.connectTimeoutMs);

  const subscriber = {
    label,
    loginType,
    runtime,
    token,
    profile,
    socket,
    pendingRequests: new Set(),
    metrics: createMetrics(),
    hotpathProbe: null,
    state: {
      route: opts.route,
      teamId: opts.teamId,
      organizationId,
      declaredCompanyId,
      detectedCompanyId,
      currentUserId,
      currentUserRole,
      cachedConversationIds: new Set(),
      cachedListSpecs: [],
    },
  };

  const reflex = attachInvalidationReflex(subscriber, {
    socket,
    logger,
    verbose: opts.verbose,
  });
  const warmedSpecs = await reflex.warmLandingBurst();
  logger.info(`[landing] warmed ${warmedSpecs.length} endpoint(s)`);

  return subscriber;
}

function summarizeCompanyBucket(subscribers) {
  const requested = subscribers.length;
  const eventsReceived = subscribers.reduce((acc, subscriber) => acc + (subscriber.metrics.events['notification.new.message'] || 0), 0);
  const hotpathConversation = subscribers.reduce((acc, subscriber) => {
    const bucket = subscriber.metrics.requests['GET /conversation (variant-1 all)'];
    return acc + (bucket ? bucket.ok + bucket.errors : 0);
  }, 0);
  const hotpathCount = subscribers.reduce((acc, subscriber) => {
    const bucket = subscriber.metrics.requests['GET /conversation/count'];
    return acc + (bucket ? bucket.ok + bucket.errors : 0);
  }, 0);
  const maxInFlight = subscribers.reduce((acc, subscriber) => Math.max(acc, subscriber.metrics.maxInFlight || 0), 0);
  return { requested, ready: subscribers.length, eventsReceived, hotpathConversation, hotpathCount, maxInFlight };
}

function printSummaryByCompany(subscribers) {
  const buckets = new Map();
  for (const subscriber of subscribers) {
    const key = subscriber.state.declaredCompanyId || 'unknown';
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(subscriber);
  }

  console.log('[storm] summary by company:');
  for (const [companyId, items] of buckets.entries()) {
    const summary = summarizeCompanyBucket(items);
    console.log(
      `  company=${companyId} requested=${summary.requested} ready=${summary.ready} events_received=${summary.eventsReceived} hotpath_variant1=${summary.hotpathConversation} hotpath_count=${summary.hotpathCount} max_inflight=${summary.maxInFlight}`,
    );
  }
  console.log('');
}

function printSummary(subscribers) {
  console.log('');
  printSummaryByCompany(subscribers);
  console.log('[storm] summary:');
  for (const subscriber of subscribers) {
    console.log(`  ${subscriber.label} (${subscriber.state.currentUserRole}, route=${subscriber.state.route})`);
    console.log(`    currentUserId: ${subscriber.state.currentUserId || 'unknown'}`);
    console.log(`    organizationId: ${subscriber.state.organizationId || 'unknown'}`);
    console.log(`    declaredCompanyId: ${subscriber.state.declaredCompanyId || 'unknown'}`);
    console.log(`    detectedCompanyId: ${subscriber.state.detectedCompanyId || 'unknown'}`);
    console.log(`    cachedConversationIds: ${subscriber.state.cachedConversationIds.size}`);
    console.log(`    events received: ${JSON.stringify(subscriber.metrics.events)}`);
    console.log(`    max concurrent in-flight requests: ${subscriber.metrics.maxInFlight}`);
    const requestNames = Object.keys(subscriber.metrics.requests).sort();
    for (const name of requestNames) {
      const bucket = subscriber.metrics.requests[name];
      console.log(
        `    ${name.padEnd(48)} ok=${String(bucket.ok).padStart(4)} errors=${String(bucket.errors).padStart(4)} statuses=${JSON.stringify(bucket.statuses)} ${formatDurationStats(bucket.durations)}`,
      );
    }
    if (subscriber.metrics.lastErrors.length > 0) {
      console.log('    recent errors:');
      for (const err of subscriber.metrics.lastErrors) {
        const bits = [`status=${err.status}`];
        if (typeof err.httpStatus === 'number' && err.httpStatus > 0 && String(err.httpStatus) !== String(err.status)) {
          bits.push(`httpStatus=${err.httpStatus}`);
        }
        if (err.causeCode && err.causeCode !== err.errorCode) {
          bits.push(`cause=${err.causeCode}`);
        }
        if (typeof err.durationMs === 'number') {
          bits.push(`durationMs=${err.durationMs}`);
        }
        bits.push(`error=${err.error}`);
        console.log(`      - ${err.name}: ${bits.join(' ')}`);
      }
    }
  }
}

function mergeHotpathMetricsIntoSubscriber(subscriber) {
  const hotpath = subscriber.hotpathProbe;
  if (!hotpath || !hotpath.metrics || !hotpath.metrics.requests) return;
  for (const [name, bucket] of Object.entries(hotpath.metrics.requests)) {
    if (!subscriber.metrics.requests[name]) {
      subscriber.metrics.requests[name] = { ok: 0, errors: 0, durations: [], statuses: {} };
    }
    const target = subscriber.metrics.requests[name];
    target.ok += bucket.ok;
    target.errors += bucket.errors;
    target.durations.push(...bucket.durations);
    for (const [statusKey, count] of Object.entries(bucket.statuses)) {
      target.statuses[statusKey] = (target.statuses[statusKey] || 0) + count;
    }
  }
  subscriber.metrics.maxInFlight = Math.max(subscriber.metrics.maxInFlight, hotpath.metrics.maxInFlight || 0);
}

async function shutdown(subscribers, graceMs) {
  for (const subscriber of subscribers) {
    if (subscriber.hotpathProbe) {
      await subscriber.hotpathProbe.stop();
      mergeHotpathMetricsIntoSubscriber(subscriber);
    }
    subscriber.socket.disconnect();
  }

  const pending = subscribers.flatMap((subscriber) => [...subscriber.pendingRequests]);
  if (pending.length === 0) return;

  const graceTimeout = new Promise((resolve) => setTimeout(resolve, graceMs));
  await Promise.race([Promise.allSettled(pending), graceTimeout]);
}

const ENDPOINT_NAMES = [
  'GET /conversation (variant-1 all)',
  'GET /conversation (variant-2 your-inbox)',
  'GET /conversation/count',
  'GET /conversation/filter-count?assign=true',
  'GET /conversation/screenshot/setting',
];

function formatEndpointMetrics(subscriber, names) {
  const parts = [];
  for (const name of names) {
    const bucket = subscriber.metrics.requests[name];
    if (!bucket) { parts.push(`${name.split('(')[0].trim()}=0/0`); continue; }
    parts.push(`${name.split('(')[0].trim()}=${bucket.ok}/${bucket.errors}`);
  }
  return parts.join(' ');
}

function printHeartbeat(subscribers) {
  for (const sub of subscribers) {
    const events =
      (sub.metrics.events['notification.new.message'] || 0) +
      (sub.metrics.events['conversation.assigned'] || 0) +
      (sub.metrics.events['conversation.unassigned'] || 0);
    console.log(`[heartbeat] ${sub.label} events=${events} ${formatEndpointMetrics(sub, ENDPOINT_NAMES)} inflight=${sub.metrics.inFlight || 0}`);
  }
}

async function main() {
  const opts = parseArgs(process.argv);
  const resolvedSubscribers = resolveSubscriberSpec({
    subscribers: opts.subscribers,
    subscribersFile: opts.subscribersFile,
  });
  const requestedTotal = countRequestedSubscribers(resolvedSubscribers.spec);
  console.log(`[storm] env=${opts.env} route=${opts.route} duration=${opts.durationSec}s requestedSubscribers=${requestedTotal} spec=${resolvedSubscribers.resolvedPath || resolvedSubscribers.spec}`);

  const subscribers = [];
  const subscriberEntries = resolvedSubscribers.entries || parseSubscriberSpec(resolvedSubscribers.spec).map((entry) => ({ companyId: 'unknown', ...entry }));
  const instanceCounters = new Map();

  for (const { companyId, loginType, count } of subscriberEntries) {
    for (let n = 0; n < count; n += 1) {
      const nextIndex = (instanceCounters.get(loginType) || 0) + 1;
      instanceCounters.set(loginType, nextIndex);
      try {
        const subscriber = await buildSubscriber(opts, loginType, nextIndex, { declaredCompanyId: companyId });
        if (opts.hotpathEnabled) {
          subscriber.hotpathProbe = createSubscriberHotpath(subscriber, {
            intervalMs: opts.hotpathIntervalMs,
            timedGet: require('./lib/http').timedGet,
          });
          subscriber.hotpathProbe.start();
        }
        subscribers.push(subscriber);
        if (subscribers.length % 10 === 0 || subscribers.length === requestedTotal) {
          console.log(`[storm] build progress: ${subscribers.length}/${requestedTotal} subscriber(s) ready`);
        }
      } catch (error) {
        console.warn(`[storm] failed to prepare ${loginType}#${nextIndex}: ${error?.message || error}`);
      }
    }
  }

  if (subscribers.length === 0) {
    throw new Error('No subscribers connected successfully.');
  }

  console.log(`[storm] ${subscribers.length} subscriber(s) ready`);

  let heartbeatTimer = null;
  if (opts.heartbeatIntervalSec > 0) {
    heartbeatTimer = setInterval(() => printHeartbeat(subscribers), opts.heartbeatIntervalSec * 1000);
  }

  let stopping = false;
  const stop = async () => {
    if (stopping) return;
    stopping = true;
    if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null; }
    await shutdown(subscribers, opts.shutdownGraceMs);
    printSummary(subscribers);
    process.exit(0);
  };

  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);

  await new Promise((resolve) => setTimeout(resolve, opts.durationSec * 1000));
  await stop();
}

main().catch((error) => {
  console.error('[storm] fatal:', error?.stack || error?.message || error);
  process.exit(1);
});
