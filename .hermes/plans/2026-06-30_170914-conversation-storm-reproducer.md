# Conversation Storm Reproducer — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a faithful reproducer for the prod pending-storm symptom on `/conversation` and `/conversation/count`, by adding a Node.js socket-driven invalidation client that mirrors what the FE does in real browsers, plus an orchestrator that runs all three concerns (publish + socket reflex + latency probe) from a single command.

**Architecture:** Three separate Node.js scripts, each single-responsibility:
1. **`inbound-rmq-flood`** (existing, unchanged) — publishes inbound messages to RabbitMQ; triggers BE to emit socket events
2. **`storm-reproducer`** (NEW) — socket.io-client subscriber that listens to `notification.new.message` / `conversation.assigned` / `conversation.unassigned`, then issues OVERLAPPING HTTP refetches to the 5 query keys the FE invalidates
3. **`conversation-size-probe`** (existing, unchanged) — measures `/conversation` and `/conversation/count` latency continuously, used as the "what does the user see" probe

Coordinated by `scripts/storm-reproducer/run-all.sh` which boots probe + storm in background, waits for them to be ready, then runs the flood in foreground.

**Tech Stack:** Node.js, `socket.io-client@^4.8.3` (already in package.json), bash for orchestration.

---

## Current Context & Assumptions

### Confirmed from FE audit (`apps/omnichannel/hooks/conversation/socket/use-conversation-socket-event.ts`)

- FE listens on these socket events:
  - `notification.new.message` (broadcast company-wide on every inbound)
  - `message` (active room only)
  - `conversation.assigned`
  - `conversation.unassigned`
  - `conversation.pulled`
  - `message.utility`, `message.status`, `notification.message.status`, `typing.indicator`

- On `notification.new.message` (when message not for active room), FE calls `handleInvalidateConversationOnNoMatched()` which, given relevance + admin/participant role, fires `invalidateQueries` on `[CONVERSATIONS]` and `[COUNT_CONVERSATIONS]`.

- On `conversation.assigned` / `conversation.unassigned`, when current user is involved, FE calls `invalidateConversationQueries()` which fires **5 invalidates**:
  - `[CONVERSATIONS]`
  - `[COUNT_CONVERSATIONS]`
  - `[FETCH_CONVERSATION_COUNTS]`
  - `[FETCH_CONVERSATION_FILTER_COUNTS]`
  - `[CONVERSATION_LIMIT]`

### Confirmed from FE socket connect (`apps/omnichannel/helpers/socket.ts`)

```js
io(`${url}/${subPath}`, {
  auth: { token, type: 'bearer' },
  autoConnect: false,
  reconnection: true,
  transports: ['websocket', 'polling'],
})
```

- `SocketSubPath = 'conversations' | 'ticket' | 'notifications'`
- For prod symptom we care about `conversations` subpath
- Auth via `bearer` token (same JWT used for HTTP `/api/*` calls)

### Confirmed query shape from prod capture

Variant 1 (the one that pending in prod):
```
/api/conversation?status=open&sort=isPinned:desc,pinnedAt:desc,timestamp:desc&hideEmpty=true&limit=20&page=1
```

Variant 2 (your-inbox specific):
```
/api/conversation?assign=true&status=open&sort=isPinned:desc,pinnedAt:desc,timestamp:desc&hideEmpty=true&limit=20&page=1
```

### Existing infrastructure to reuse

- `playwright/support/config/endpoints.js` — already has endpoint URL builders
- `playwright/support/config/test-data.js` — login type → env var mapping
- `scripts/inbound-rmq-flood/inbound-rmq-flood.js` — has auth helpers (`buildRuntimeConfig`, `getAuthHeaders`, `httpJson`) we can extract or duplicate
- `scripts/widget-socket-load.js` — existing socket.io client pattern to reference (uses `socket.io-client` v4)
- `scripts/conversation-size-probe/conversation-size-probe.js` — already does what we need for probe leg

### Out of scope (intentionally)

- WebSocket auth refresh on token expiry — single-run scripts, token TTL typically 1h+
- Cleanup of refetch artifacts — read-only operations, nothing to clean up
- Cross-platform shell scripts — bash-only (works in WSL/git-bash/macOS/linux)

---

## Proposed Approach

### Directory layout

```
scripts/storm-reproducer/
├── README.md                     # how to run, what each piece does, troubleshooting
├── storm-reproducer.js           # main: socket subscriber + invalidation reflex
├── run-all.sh                    # orchestrator: probe + storm + flood in one command
└── lib/
    ├── socket-client.js          # socket.io-client wrapper matching FE behaviour
    ├── invalidation-reflex.js    # on event → refetch the 5 query keys (overlapping)
    ├── auth.js                   # shared login + token cache (extracted helper)
    └── http.js                   # minimal HTTP client with timing
```

### Why 3 separate scripts + orchestrator

- **Single responsibility:** each script's failure mode is isolated. Socket crash doesn't kill probe; probe restart doesn't reset socket session.
- **Composable:** can run any subset. `storm-reproducer` alone validates that socket events trigger refetches; `run-all.sh` validates the full chain.
- **CI-friendly:** easier to express as 3 jobs/steps than 1 monolith.
- **Matches prod topology:** in real life, publisher (RMQ producer), browser (socket subscriber), and monitoring (probe) are separate processes.

### Storm-reproducer semantics

For each socket subscriber session:

1. Login via `/api/auth/login` to obtain bearer token.
2. Connect socket.io to `wss://<api-host>/conversations` with `auth: { token, type: 'bearer' }`.
3. Subscribe to:
   - `notification.new.message`
   - `conversation.assigned`
   - `conversation.unassigned`
4. On each event, fire the FE-equivalent invalidation **without awaiting** (parallel + non-blocking):
   - For `notification.new.message`: hit `/conversation?<variant-1-query>` + `/conversation/count`
   - For `conversation.assigned` / `conversation.unassigned`: hit all 5 invalidated endpoints
5. Track:
   - events received per type
   - HTTP requests issued per endpoint (including overlapping/in-flight count at any time)
   - HTTP latency (p50/p95/max) per endpoint
   - HTTP errors

### Why overlap matters

Browsers' React Query cancels superseded queries when invalidate is called rapidly, but in practice (especially with infinite queries + Suspense), pending requests often **don't** get cancelled and pile up on the wire. Our reproducer must NOT await previous request before issuing the next — that's the whole point.

---

## Step-by-step plan

### Task 1: Create skeleton + README

**Objective:** Set up directory and minimal README so future tasks have a home.

**Files:**
- Create: `scripts/storm-reproducer/README.md`
- Create: `scripts/storm-reproducer/lib/` (directory)

**Step 1: Write README.md**

```markdown
# Conversation Storm Reproducer

Faithful reproducer for the prod pending-storm symptom on `/api/conversation` and
`/api/conversation/count`. Mirrors what the FE browser does on socket events:
listens for `notification.new.message` / `conversation.assigned` /
`conversation.unassigned`, then fires overlapping HTTP refetches to the 5 query
keys that the FE invalidates.

## When to use

- Reproducing the prod incident where these two endpoints pile up as pending
  in the browser network tab and DB CPU spikes.
- Verifying that a backend fix (caching, query plan, batching) resolves the storm.

## Components

| Script                               | Role                                                      |
|--------------------------------------|-----------------------------------------------------------|
| `storm-reproducer.js`                | Socket subscriber + invalidation reflex                   |
| `run-all.sh`                         | Orchestrator: probe + storm + flood, all from 1 command   |
| `../inbound-rmq-flood/`              | (existing) publishes RMQ messages to trigger socket emits |
| `../conversation-size-probe/`        | (existing) measures live latency during the storm         |

## Quick start

See "Running" below. TL;DR for a single device:

```bash
export RMQ_PASS='...'
./scripts/storm-reproducer/run-all.sh
```

## Architecture

(filled in by Task 8)
```

**Step 2: Verify**

```bash
ls scripts/storm-reproducer/
ls scripts/storm-reproducer/lib/
```

Expected: `README.md` exists; `lib/` is empty directory.

**Step 3: Commit**

```bash
git add scripts/storm-reproducer/
git commit -m "feat(storm): scaffold storm-reproducer directory"
```

---

### Task 2: Extract `lib/auth.js` — shared login helper

**Objective:** Centralize login flow so socket subscriber + future storm modules use the exact same auth as inbound-rmq-flood does.

**Files:**
- Create: `scripts/storm-reproducer/lib/auth.js`
- Reference: `scripts/inbound-rmq-flood/inbound-rmq-flood.js` (look at `buildRuntimeConfig`, `ensureAccessToken`, `getAuthHeaders`)

**Step 1: Write `lib/auth.js`**

Pull out the minimal auth surface needed:

```js
// scripts/storm-reproducer/lib/auth.js
const { resolveAccountByLoginType } = require('../../../playwright/support/config/test-data');

/**
 * Resolve credentials for a loginType against an env (dev/staging/prod).
 * Returns { identifier, password } — never logs the password.
 */
function resolveCredentials(loginType, envName) {
  const account = resolveAccountByLoginType(loginType, envName);
  if (!account) {
    throw new Error(`Unknown loginType=${loginType} for env=${envName}`);
  }
  if (!account.identifier || !account.password) {
    throw new Error(
      `Credentials missing for loginType=${loginType} env=${envName} (check .env)`,
    );
  }
  return { identifier: account.identifier, password: account.password };
}

/**
 * Login against the API gateway and return { token, expiresAt? }.
 * apiBase must be normalized (e.g. https://dev-v2-api.satuinbox.com).
 */
async function login(apiBase, identifier, password) {
  const url = `${apiBase.replace(/\/+$/, '')}/api/auth/login`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} for POST ${url}`);
  }
  const data = await res.json();
  const token =
    data?.data?.accessToken ||
    data?.accessToken ||
    data?.data?.token ||
    data?.token;
  if (!token) {
    throw new Error(`Login OK but no token in response from ${url}`);
  }
  return { token };
}

module.exports = { resolveCredentials, login };
```

**Step 2: Sanity check by importing**

```bash
node -e "const a = require('./scripts/storm-reproducer/lib/auth'); console.log(Object.keys(a));"
```

Expected: `[ 'resolveCredentials', 'login' ]`

**Step 3: Commit**

```bash
git add scripts/storm-reproducer/lib/auth.js
git commit -m "feat(storm): add lib/auth.js shared login helper"
```

---

### Task 3: Add `lib/http.js` — minimal HTTP client with timing

**Objective:** Fire HTTP requests with bearer token + record latency without blocking.

**Files:**
- Create: `scripts/storm-reproducer/lib/http.js`

**Step 1: Write `lib/http.js`**

```js
// scripts/storm-reproducer/lib/http.js

/**
 * Fire a GET with bearer token. Returns { status, durationMs, ok, error? }.
 * Never throws — failures are reported in the return value so concurrent
 * callers can keep going.
 */
async function timedGet(url, token, { timeoutMs = 30000 } = {}) {
  const start = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    // drain body so the connection can be recycled
    await res.text().catch(() => undefined);
    return {
      ok: res.ok,
      status: res.status,
      durationMs: Date.now() - start,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      durationMs: Date.now() - start,
      error: String(error?.message || error),
    };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = { timedGet };
```

**Step 2: Sanity check**

```bash
node -e "const h = require('./scripts/storm-reproducer/lib/http'); console.log(Object.keys(h));"
```

Expected: `[ 'timedGet' ]`

**Step 3: Commit**

```bash
git add scripts/storm-reproducer/lib/http.js
git commit -m "feat(storm): add lib/http.js minimal timed GET"
```

---

### Task 4: Add `lib/socket-client.js` — socket.io wrapper

**Objective:** Connect socket.io-client to `<api-host>/conversations` exactly like the FE does, with the same auth shape.

**Files:**
- Create: `scripts/storm-reproducer/lib/socket-client.js`
- Reference: `apps/omnichannel/helpers/socket.ts` (FE) and `scripts/widget-socket-load.js` (existing automation)

**Step 1: Write `lib/socket-client.js`**

```js
// scripts/storm-reproducer/lib/socket-client.js
const { io } = require('socket.io-client');

const DEFAULT_SUBPATH = 'conversations';

/**
 * Build a socket.io client matching the FE's connection options.
 *
 * @param {string} socketUrl - e.g. "https://dev-v2-api.satuinbox.com"
 * @param {string} token - bearer JWT from /api/auth/login
 * @param {object} options
 * @param {string} [options.subPath="conversations"]
 * @param {object} [options.logger] - { info, warn, error } interface
 */
function createSocket(socketUrl, token, options = {}) {
  const { subPath = DEFAULT_SUBPATH, logger = console } = options;
  const url = `${socketUrl.replace(/\/+$/, '')}/${subPath}`;

  const socket = io(url, {
    auth: { token, type: 'bearer' },
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    logger.info(`[socket] connected to ${url} (id=${socket.id})`);
  });
  socket.on('disconnect', (reason) => {
    logger.warn(`[socket] disconnected (${reason})`);
  });
  socket.on('connect_error', (err) => {
    logger.error(`[socket] connect_error: ${err?.message || err}`);
  });

  return socket;
}

module.exports = { createSocket };
```

**Step 2: Sanity check**

```bash
node -e "const s = require('./scripts/storm-reproducer/lib/socket-client'); console.log(Object.keys(s));"
```

Expected: `[ 'createSocket' ]`

**Step 3: Commit**

```bash
git add scripts/storm-reproducer/lib/socket-client.js
git commit -m "feat(storm): add socket.io client matching FE config"
```

---

### Task 5: Add `lib/invalidation-reflex.js` — fire refetches on event

**Objective:** Mirror FE invalidation behaviour. On socket event, fire the same set of HTTP GETs the FE would, **without awaiting** (overlapping allowed).

**Files:**
- Create: `scripts/storm-reproducer/lib/invalidation-reflex.js`

**Step 1: Write `lib/invalidation-reflex.js`**

```js
// scripts/storm-reproducer/lib/invalidation-reflex.js
const { timedGet } = require('./http');

// Exact query shape captured from prod symptom (Variant 1 / "all" view)
const SORT = 'isPinned:desc,pinnedAt:desc,timestamp:desc';
const LIST_QUERY = `status=open&sort=${encodeURIComponent(SORT)}&hideEmpty=true&limit=20&page=1`;

/**
 * Build the URL set the FE invalidates per event type.
 * Returns array of { name, url } so caller can fan-out concurrently.
 */
function buildInvalidationUrls(apiBase, eventName) {
  const base = apiBase.replace(/\/+$/, '');
  const list = `${base}/api/conversation?${LIST_QUERY}`;
  const count = `${base}/api/conversation/count`;
  const filterCount = `${base}/api/conversation/filter-count?assign=true`;
  // FE also invalidates FETCH_CONVERSATION_COUNTS + CONVERSATION_LIMIT but those
  // do not have a single canonical endpoint hit in the prod symptom; we focus on
  // the three endpoints that show up as pending in the browser.
  if (eventName === 'notification.new.message') {
    // Minimal invalidate set
    return [
      { name: 'GET /conversation (variant-1)', url: list },
      { name: 'GET /conversation/count', url: count },
    ];
  }
  if (
    eventName === 'conversation.assigned' ||
    eventName === 'conversation.unassigned'
  ) {
    // Full invalidate set
    return [
      { name: 'GET /conversation (variant-1)', url: list },
      { name: 'GET /conversation/count', url: count },
      { name: 'GET /conversation/filter-count', url: filterCount },
    ];
  }
  return [];
}

/**
 * Wire up reflex on a socket. Returns metrics object that grows as events arrive.
 *
 * @param {object} socket - socket.io client (already connected or about to)
 * @param {object} params
 * @param {string} params.apiBase - e.g. https://dev-v2-api.satuinbox.com
 * @param {string} params.token - bearer
 * @param {object} [params.logger]
 */
function attachInvalidationReflex(socket, { apiBase, token, logger = console }) {
  const metrics = {
    events: {}, // eventName -> count
    requests: {}, // requestName -> { ok, errors, durations[] }
    inFlight: 0,
    maxInFlight: 0,
  };

  const recordRequest = (name, result) => {
    if (!metrics.requests[name]) {
      metrics.requests[name] = { ok: 0, errors: 0, durations: [] };
    }
    const m = metrics.requests[name];
    if (result.ok) m.ok += 1;
    else m.errors += 1;
    m.durations.push(result.durationMs);
  };

  const onEvent = (eventName) => () => {
    metrics.events[eventName] = (metrics.events[eventName] || 0) + 1;
    const urls = buildInvalidationUrls(apiBase, eventName);
    for (const { name, url } of urls) {
      metrics.inFlight += 1;
      if (metrics.inFlight > metrics.maxInFlight) {
        metrics.maxInFlight = metrics.inFlight;
      }
      // NOTE: intentionally NOT awaiting — overlapping is the point.
      timedGet(url, token)
        .then((result) => recordRequest(name, result))
        .finally(() => {
          metrics.inFlight -= 1;
        });
    }
  };

  socket.on('notification.new.message', onEvent('notification.new.message'));
  socket.on('conversation.assigned', onEvent('conversation.assigned'));
  socket.on('conversation.unassigned', onEvent('conversation.unassigned'));

  logger.info(
    '[reflex] listening on notification.new.message, conversation.assigned, conversation.unassigned',
  );
  return metrics;
}

module.exports = { attachInvalidationReflex, buildInvalidationUrls };
```

**Step 2: Sanity check**

```bash
node -e "
const r = require('./scripts/storm-reproducer/lib/invalidation-reflex');
console.log(r.buildInvalidationUrls('https://x.test', 'notification.new.message'));
console.log(r.buildInvalidationUrls('https://x.test', 'conversation.assigned'));
"
```

Expected: 2 URLs in first array, 3 URLs in second.

**Step 3: Commit**

```bash
git add scripts/storm-reproducer/lib/invalidation-reflex.js
git commit -m "feat(storm): add invalidation-reflex with overlapping refetch"
```

---

### Task 6: Main entrypoint `storm-reproducer.js`

**Objective:** CLI entry: parse args, log in N subscribers, attach reflex, run for duration, print summary.

**Files:**
- Create: `scripts/storm-reproducer/storm-reproducer.js`

**Step 1: Write the main script**

```js
#!/usr/bin/env node
// scripts/storm-reproducer/storm-reproducer.js
const { resolveCredentials, login } = require('./lib/auth');
const { createSocket } = require('./lib/socket-client');
const { attachInvalidationReflex } = require('./lib/invalidation-reflex');

function parseArgs(argv) {
  const out = { env: 'dev', durationSec: 120, subscribers: 'danyatmin01:1', verbose: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    const next = argv[i + 1];
    if (a === '--env') { out.env = next; i += 1; }
    else if (a === '--duration-sec') { out.durationSec = Number(next); i += 1; }
    else if (a === '--subscribers') { out.subscribers = next; i += 1; }
    else if (a === '--verbose') { out.verbose = true; }
    else if (a === '--help' || a === '-h') {
      console.log(`Usage:
  storm-reproducer.js
    --env <dev|staging|prod>             default: dev
    --subscribers <loginType[:count],...> default: danyatmin01:1
    --duration-sec <n>                   default: 120
    --verbose                            log every event received

Example:
  node storm-reproducer.js --env dev --subscribers danyspv01:2,danyagent01:2 --duration-sec 180`);
      process.exit(0);
    }
  }
  return out;
}

function resolveApiBase(envName) {
  // Mirror the same env mapping used by inbound-rmq-flood + endpoints.js.
  // For dev: https://dev-v2-api.satuinbox.com
  // For staging: https://staging-v2-api.satuinbox.com
  // For prod: https://v2-api.satuinbox.com
  const map = {
    dev: 'https://dev-v2-api.satuinbox.com',
    staging: 'https://staging-v2-api.satuinbox.com',
    prod: 'https://v2-api.satuinbox.com',
  };
  const base = map[envName];
  if (!base) throw new Error(`Unknown env: ${envName}`);
  return base;
}

function parseSubscriberSpec(spec) {
  // "danyspv01:2,danyagent01:2,danyatmin01" -> [{loginType, count}]
  return spec.split(',').map((entry) => {
    const [loginType, rawCount] = entry.split(':');
    const count = rawCount ? Math.max(1, parseInt(rawCount, 10) || 1) : 1;
    return { loginType: loginType.trim(), count };
  }).filter((e) => e.loginType);
}

async function buildSubscribers(opts, apiBase) {
  const specs = parseSubscriberSpec(opts.subscribers);
  const subscribers = [];
  for (const { loginType, count } of specs) {
    const { identifier, password } = resolveCredentials(loginType, opts.env);
    for (let i = 0; i < count; i += 1) {
      const label = `${loginType}#${i + 1}`;
      try {
        const { token } = await login(apiBase, identifier, password);
        const socket = createSocket(apiBase, token, { logger: prefixedLogger(label) });
        const metrics = attachInvalidationReflex(socket, {
          apiBase,
          token,
          logger: prefixedLogger(label),
        });
        socket.connect();
        subscribers.push({ label, loginType, socket, metrics });
      } catch (err) {
        console.error(`[${label}] login or socket setup failed: ${err.message}`);
      }
    }
  }
  return subscribers;
}

function prefixedLogger(prefix) {
  return {
    info: (...args) => console.log(`[${prefix}]`, ...args),
    warn: (...args) => console.warn(`[${prefix}]`, ...args),
    error: (...args) => console.error(`[${prefix}]`, ...args),
  };
}

function percentile(sorted, p) {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return sorted[idx];
}

function formatDurations(durations) {
  if (durations.length === 0) return 'n/a';
  const sorted = [...durations].sort((a, b) => a - b);
  return `min=${sorted[0]}ms p50=${percentile(sorted, 50)}ms p95=${percentile(sorted, 95)}ms max=${sorted[sorted.length - 1]}ms n=${sorted.length}`;
}

function printSummary(subscribers) {
  console.log('');
  console.log('[storm] summary:');
  for (const s of subscribers) {
    const { events, requests, maxInFlight } = s.metrics;
    console.log(`  ${s.label} (${s.loginType})`);
    console.log(`    events received:`, events);
    console.log(`    max concurrent in-flight requests: ${maxInFlight}`);
    for (const [name, m] of Object.entries(requests)) {
      console.log(`    ${name.padEnd(40)} ok=${m.ok} errors=${m.errors} ${formatDurations(m.durations)}`);
    }
  }
}

async function main() {
  const opts = parseArgs(process.argv);
  const apiBase = resolveApiBase(opts.env);
  console.log(`[storm] env=${opts.env} apiBase=${apiBase} duration=${opts.durationSec}s`);

  const subscribers = await buildSubscribers(opts, apiBase);
  if (subscribers.length === 0) {
    console.error('[storm] no subscribers connected; exiting.');
    process.exit(1);
  }
  console.log(`[storm] ${subscribers.length} subscriber(s) ready — running for ${opts.durationSec}s`);

  // Graceful shutdown on SIGINT/SIGTERM
  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    for (const s of subscribers) s.socket.disconnect();
    printSummary(subscribers);
    process.exit(0);
  };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);

  await new Promise((resolve) => setTimeout(resolve, opts.durationSec * 1000));
  stop();
}

main().catch((err) => {
  console.error('[storm] fatal:', err);
  process.exit(1);
});
```

**Step 2: Verify it parses + responds to --help**

```bash
node scripts/storm-reproducer/storm-reproducer.js --help
```

Expected: usage message, exit 0.

**Step 3: Smoke test (real run, short)**

```bash
node scripts/storm-reproducer/storm-reproducer.js \
  --env dev \
  --subscribers danyatmin01:1 \
  --duration-sec 30
```

Expected:
- 1 subscriber connects to `wss://dev-v2-api.satuinbox.com/conversations`
- waits 30s
- prints summary (might be 0 events if no traffic; that's OK for now)

**Step 4: Commit**

```bash
git add scripts/storm-reproducer/storm-reproducer.js
chmod +x scripts/storm-reproducer/storm-reproducer.js
git commit -m "feat(storm): storm-reproducer.js main entrypoint"
```

---

### Task 7: Add npm scripts

**Objective:** Make `npm run storm:reproducer` and helpers available.

**Files:**
- Modify: `package.json:260-280` (the `"scripts"` block)

**Step 1: Add scripts**

Patch `package.json` `"scripts"`:

```json
{
  "scripts": {
    "...existing...": "...",
    "storm:reproducer": "node scripts/storm-reproducer/storm-reproducer.js",
    "storm:run-all": "bash scripts/storm-reproducer/run-all.sh"
  }
}
```

**Step 2: Verify**

```bash
npm run storm:reproducer -- --help
```

Expected: usage from Task 6.

**Step 3: Commit**

```bash
git add package.json
git commit -m "chore(storm): add npm scripts"
```

---

### Task 8: Orchestrator `run-all.sh`

**Objective:** Single command runs probe + storm in background, waits for them to be ready, runs flood in foreground, then aggregates logs.

**Files:**
- Create: `scripts/storm-reproducer/run-all.sh`

**Step 1: Write `run-all.sh`**

```bash
#!/usr/bin/env bash
# scripts/storm-reproducer/run-all.sh
#
# Run the full storm reproduction pipeline from a single command:
#   1. start conversation-size-probe in background (latency probe)
#   2. start storm-reproducer in background (socket + invalidation reflex)
#   3. wait for both to be ready
#   4. run inbound-rmq-flood in foreground (trigger BE socket emits)
#   5. clean up: stop probe + storm, print log paths
#
# Required env:
#   RMQ_PASS                   RabbitMQ password (for the flood leg)
#
# Optional env (with defaults):
#   ENV=dev
#   LOGIN_TYPE=danyatmin01
#   TOTAL_MESSAGES=300
#   DISCOVER_TARGETS=100
#   STORM_SUBSCRIBERS=danyspv01:2,danyagent01:2
#   PROBE_INTERVAL_MS=1000
#   PROBE_DURATION_SEC=300
#   STORM_DURATION_SEC=300
#   RMQ_URI=amqp://admin:${RMQ_PASS}@127.0.0.1:5672
#   LOG_DIR=/tmp/storm-$(date +%Y%m%d-%H%M%S)

set -euo pipefail

if [[ -z "${RMQ_PASS:-}" ]]; then
  echo "ERROR: RMQ_PASS env var is required" >&2
  exit 1
fi

ENV="${ENV:-dev}"
LOGIN_TYPE="${LOGIN_TYPE:-danyatmin01}"
TOTAL_MESSAGES="${TOTAL_MESSAGES:-300}"
DISCOVER_TARGETS="${DISCOVER_TARGETS:-100}"
STORM_SUBSCRIBERS="${STORM_SUBSCRIBERS:-danyspv01:2,danyagent01:2}"
PROBE_INTERVAL_MS="${PROBE_INTERVAL_MS:-1000}"
PROBE_DURATION_SEC="${PROBE_DURATION_SEC:-300}"
STORM_DURATION_SEC="${STORM_DURATION_SEC:-300}"
RMQ_URI="${RMQ_URI:-amqp://admin:${RMQ_PASS}@127.0.0.1:5672}"
LOG_DIR="${LOG_DIR:-/tmp/storm-$(date +%Y%m%d-%H%M%S)}"

mkdir -p "${LOG_DIR}"

PROBE_LOG="${LOG_DIR}/probe.log"
STORM_LOG="${LOG_DIR}/storm.log"
FLOOD_LOG="${LOG_DIR}/flood.log"

PROBE_PID=""
STORM_PID=""

cleanup() {
  local exit_code=$?
  echo ""
  echo "[run-all] cleaning up..."
  if [[ -n "${STORM_PID}" ]] && kill -0 "${STORM_PID}" 2>/dev/null; then
    kill -TERM "${STORM_PID}" 2>/dev/null || true
    wait "${STORM_PID}" 2>/dev/null || true
  fi
  if [[ -n "${PROBE_PID}" ]] && kill -0 "${PROBE_PID}" 2>/dev/null; then
    kill -TERM "${PROBE_PID}" 2>/dev/null || true
    wait "${PROBE_PID}" 2>/dev/null || true
  fi
  echo "[run-all] logs:"
  echo "  probe: ${PROBE_LOG}"
  echo "  storm: ${STORM_LOG}"
  echo "  flood: ${FLOOD_LOG}"
  exit "${exit_code}"
}
trap cleanup EXIT INT TERM

echo "[run-all] starting probe → ${PROBE_LOG}"
node scripts/conversation-size-probe/conversation-size-probe.js \
  --env "${ENV}" \
  --login-type "${LOGIN_TYPE}" \
  > "${PROBE_LOG}" 2>&1 &
PROBE_PID=$!

echo "[run-all] starting storm-reproducer → ${STORM_LOG}"
node scripts/storm-reproducer/storm-reproducer.js \
  --env "${ENV}" \
  --subscribers "${STORM_SUBSCRIBERS}" \
  --duration-sec "${STORM_DURATION_SEC}" \
  > "${STORM_LOG}" 2>&1 &
STORM_PID=$!

# wait for storm to be "ready" — look for the "X subscriber(s) ready" line
echo "[run-all] waiting for storm subscribers to connect..."
for _ in $(seq 1 30); do
  if grep -q "subscriber(s) ready" "${STORM_LOG}" 2>/dev/null; then
    echo "[run-all] storm ready"
    break
  fi
  sleep 1
done

echo "[run-all] starting inbound-rmq-flood (foreground) → ${FLOOD_LOG}"
node scripts/inbound-rmq-flood/inbound-rmq-flood.js \
  --env "${ENV}" \
  --login-type "${LOGIN_TYPE}" \
  --discover-targets "${DISCOVER_TARGETS}" \
  --discover-profiles widget,messenger,email,instagram,whatsapp \
  --total-messages "${TOTAL_MESSAGES}" \
  --batch-size 10 \
  --message-type text \
  --log-every 20 \
  --random-targets \
  --uri "${RMQ_URI}" \
  2>&1 | tee "${FLOOD_LOG}"

echo "[run-all] flood complete; storm + probe will run until their own timer ends"
wait "${STORM_PID}" 2>/dev/null || true
wait "${PROBE_PID}" 2>/dev/null || true
```

**Step 2: Make executable**

```bash
chmod +x scripts/storm-reproducer/run-all.sh
```

**Step 3: Smoke-test dry run (no real flood)**

```bash
RMQ_PASS=test ./scripts/storm-reproducer/run-all.sh --help || true
```

Expected: env-var check passes (since RMQ_PASS is set), starts probe & storm, eventually flood — but might fail at flood (which is OK for now, this verifies the orchestration plumbing).

**Step 4: Commit**

```bash
git add scripts/storm-reproducer/run-all.sh
git commit -m "feat(storm): run-all.sh orchestrator"
```

---

### Task 9: Documentation polish

**Objective:** Update README.md with concrete run instructions, troubleshooting, and the prod incident reference.

**Files:**
- Modify: `scripts/storm-reproducer/README.md`

Add sections:
- **Running** — 3 patterns: (a) just storm, (b) just probe, (c) run-all
- **Output** — explain each log file, how to read p95/maxInFlight
- **Troubleshooting** — `EADDRINUSE` (port 5672), socket connect failure, no events received
- **Tuning** — `STORM_SUBSCRIBERS`, `TOTAL_MESSAGES`, `STORM_DURATION_SEC` tradeoffs
- **Reference: the prod symptom** — link to incident chronology, the exact 2 endpoints, role of socket event

**Step 1: Run**

```bash
# verify lint isn't yelling at markdown
head -100 scripts/storm-reproducer/README.md
```

**Step 2: Commit**

```bash
git add scripts/storm-reproducer/README.md
git commit -m "docs(storm): expand README with run / output / tuning sections"
```

---

### Task 10: End-to-end verification

**Objective:** Prove the whole pipeline works on dev environment.

**Files:** No new files.

**Step 1: Pre-flight checks**

```bash
# RMQ tunnel up?
nc -vz 127.0.0.1 5672
# expected: succeeded

# RMQ_PASS set + non-empty?
echo "${#RMQ_PASS}"
# expected: > 0
```

**Step 2: Tiny run (1 min publish, 2 min storm)**

```bash
TOTAL_MESSAGES=50 \
DISCOVER_TARGETS=50 \
STORM_SUBSCRIBERS=danyatmin01:1 \
STORM_DURATION_SEC=120 \
PROBE_DURATION_SEC=120 \
./scripts/storm-reproducer/run-all.sh
```

**Step 3: Inspect logs**

```bash
LOG_DIR=$(ls -td /tmp/storm-* | head -1)
echo "Logs: $LOG_DIR"

# Did storm receive events?
grep -E "^\[.+\] events received" "$LOG_DIR/storm.log" || tail -30 "$LOG_DIR/storm.log"

# Did probe see latency change?
tail -20 "$LOG_DIR/probe.log"

# Did flood succeed?
tail -5 "$LOG_DIR/flood.log"
```

**Expected:**
- Storm log has at least 1 event in `events received` block (`notification.new.message`)
- Storm log has at least 1 entry per request name (i.e. refetches did fire)
- Flood log ends with `publish complete.`

**Step 4: Big run (the real reproducer)**

Once the small run is clean:

```bash
TOTAL_MESSAGES=2000 \
DISCOVER_TARGETS=200 \
STORM_SUBSCRIBERS=danyspv01:4,danyagent01:4,danyatmin01:1 \
STORM_DURATION_SEC=600 \
PROBE_DURATION_SEC=600 \
./scripts/storm-reproducer/run-all.sh
```

Look in `storm.log` for:
- `maxInFlight` going significantly above the subscriber count (this is the overlapping storm signature)
- `p95` for `GET /conversation (variant-1)` spiking during the flood window vs probe baseline

**Step 5: Commit any final polish (no code changes expected)**

---

## Files likely to change

| File                                                          | Change |
|---------------------------------------------------------------|--------|
| `scripts/storm-reproducer/README.md`                          | CREATE |
| `scripts/storm-reproducer/lib/auth.js`                        | CREATE |
| `scripts/storm-reproducer/lib/http.js`                        | CREATE |
| `scripts/storm-reproducer/lib/socket-client.js`               | CREATE |
| `scripts/storm-reproducer/lib/invalidation-reflex.js`         | CREATE |
| `scripts/storm-reproducer/storm-reproducer.js`                | CREATE |
| `scripts/storm-reproducer/run-all.sh`                         | CREATE |
| `package.json`                                                | MODIFY (`scripts` block only) |
| `scripts/inbound-rmq-flood/inbound-rmq-flood.js`              | NOT modified — used as-is |
| `scripts/conversation-size-probe/conversation-size-probe.js`  | NOT modified — used as-is |

---

## Tests / validation

This is an integration tool, not a library. Validation is per-task acceptance criteria + the Task-10 end-to-end run.

Additional validation (after Task 10 passes once):
- Run with `--duration-sec 60` and verify the script exits cleanly (no orphan socket connections)
- Run with bad credentials and verify it errors fast instead of hanging
- Run with prod env disabled (set `--env staging`) and verify it points at staging host

---

## Risks, tradeoffs, open questions

### Risks

1. **`resolveAccountByLoginType` may not be the actual export name in `test-data.js`** — verify in Task 2; rename if it's `getAccountByLoginType` or similar.
2. **`/api/auth/login` response shape might vary** — Task 2's `login()` handles 4 fallback paths for token extraction, but if API uses a totally different shape, we'll see in Task 6 smoke test.
3. **Token TTL** — if TTL is short (<5 min), long storm runs could see HTTP errors after token expires. Mitigation: keep storm runs ≤ 30 min, or add token-refresh loop later (out of scope for v1).
4. **Socket reconnect storms** — if backend drops sockets under load, the socket-client's auto-reconnect could amplify the storm. Acceptable for v1 — that's actually closer to real prod behaviour.
5. **`fetch` global** — Node 18+ has `fetch` natively. If running on Node 16 (unlikely on this repo, but check), import `undici` (already a dep).

### Tradeoffs

- **No request cancellation:** we fire and forget. This is intentional (mirrors browser-with-stuck-Suspense behaviour), but means we'll record latency even for "wasted" requests.
- **Subscribers don't open a viewport:** they only do invalidation reflex, not the full landing-burst 12-endpoint set. That's deliberate — landing burst is one-shot and not the storm. The 5-endpoint refetch on event is the storm.
- **No retry logic in storm-reproducer:** if a refetch fails, we record the error and move on. We're stressing the system, not testing reliability.

### Open questions

1. **Do we also want the storm reproducer to capture the BE-emitted payload?** I.e. log the conversationId/companyId of each `notification.new.message` so we can correlate with inbound publish IDs. Worth doing if you want a "trigger → event → refetch → DB-spike" causal chain in logs.
2. **Should `run-all.sh` also poll RabbitMQ queue depth?** Useful for confirming backpressure but adds complexity. Defer to v2.
3. **K6 stress test (your original question):** still a valid separate effort, but optimal for **measuring backend ceiling** (e.g. "how many concurrent /conversation requests can the API handle before p95 > 2s?"). The storm-reproducer answers "does the prod feedback loop happen?". Both have a place; this plan covers the former. If you want both, we can add a Task 11 to scaffold a k6 script under `k6/conversation-storm.js`.

---

## Execution Handoff

Plan complete and saved.

Ready to execute task-by-task with verification at each step. Each task is bite-sized (5–15 min), with explicit verify commands and commit messages. Shall I proceed with Task 1?
