# Multi-Company Storm Reproducer Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task if you delegate. Otherwise implement top-to-bottom in this session with TDD.

**Goal:** Reproduce the exact prod symptom (pending `/conversation` + `/conversation/count` loop) under **realistic multi-tenant conditions**: flood balanced across several companies, storm subscribers grouped per company, and hotpath probe firing from every logged-in user — not just one vantage.

**Architecture:**
- Introduce a company-scoped subscriber spec (`STORM_SUBSCRIBERS_FILE` gets `[company]` sections).
- Flood side: expose the existing `--company-ids` + `--company-balance` through `run-all.sh`.
- Probe side: replace the single-login probe with a **multi-vantage** probe — every subscriber gets its own hotpath probe loop that hits Variant 1 + `/conversation/count` from that user's own token, aggregated per company.
- Logs stay per-run, per-company, so we can see "company A behaves fine, company B stalls".

**Tech Stack:** Node 18+ (fetch/undici), socket.io-client, existing storm-reproducer libs, existing `inbound-rmq-flood` (already company-aware), bash orchestrator.

---

## Current context / assumptions

### What already works
- Storm reproducer: 1451/1453 subscriber login OK, 29 receive event, transport failures now surface as `TIMEOUT`/`ECONNRESET`/etc. (Opsi A error log patch — landed).
- Flood side (`inbound-rmq-flood.js`) already supports:
  - `--company-id`
  - `--company-ids`
  - `--company-balance`
- Subscriber file format: `loginType[:count]` per line.
- Hotpath probe: single-vantage only, single-login token.

### What is broken for multi-company RCA
1. `run-all.sh` doesn't forward company args to `inbound-rmq-flood`.
2. Storm reproducer has no notion of "which company does this subscriber belong to".
3. Log summary groups only per subscriber label, not per company — impossible to compare tenants side by side.
4. Hotpath probe uses a single user's token — one vantage. Prod symptom happens per-user in each company.

### Why the user pushed for full multi-company
- Prod runs multi-tenant simultaneously → single-company reproducer is structurally biased.
- Backend event scoping is company-wide (`notification.new.message` is company broadcast) → single-company reproducer can't observe fan-out across tenants.
- The observed `status=0` (now `TIMEOUT` after Opsi A) at ~10s is likely already an early sign of pending+refetch overlap; running that under multi-tenant pressure may expose the real feedback loop.
- Target scale: `1000–2000 parallel GET users` against active inbound + socket fanout.

---

## Proposed approach

### 1. Subscriber file gets `[company]` sections

New format (backward compatible with existing plain lists):

```text
# Company A — company id used for logging + flood scoping
[company:684a7dee68bd32a1f552e453]
admintest:1
bdbagent01:4
bdoagent01:4

# Company B
[company:6866480abdea2b03ef333165]
cx001:4
cx002:4
cxlead01:2

# Ungrouped entries still work (assigned to "unknown" company bucket)
danyatmin01:1
```

Semantics:
- `[company:<id>]` starts a section; all following spec lines belong to that company until the next `[company:...]` header.
- Lines outside any section belong to bucket `"unknown"` (backward compat).
- Comments (`#`), blanks, existing `loginType[:count]` unchanged.

### 2. Storm reproducer knows the subscriber's declared company

Every subscriber carries:
- `declaredCompanyId` — from the file section header (source of truth for planning).
- `detectedCompanyId` — best-effort read from the login profile (if we can extract it from `/api/auth/me` response) for cross-check.
- If declared ≠ detected → warn but don't fail.

### 3. Summary groups per company

```text
[storm] summary by company:
  company=684a7dee68bd32a1f552e453  requested=17  ready=17  events_received=2000  refetch_count=843
  company=6866480abdea2b03ef333165  requested=10  ready=8   events_received=0     refetch_count=0
  company=unknown                    requested=1   ready=1   events_received=2000  refetch_count=41
```

Then per-subscriber blocks stay as-is under each company header.

### 4. Multi-vantage hotpath probe

Instead of single `hotpath-probe.js` process, the storm reproducer itself becomes probe-capable:
- Every subscriber gets a **background hotpath loop** that periodically hits Variant 1 + `/conversation/count` using **that subscriber's own token**.
- Interval configurable (default 1000ms) — overlapping refetch allowed (fire-and-forget promise, capped by `maxInFlightPerSubscriber`).
- Metrics accumulate per subscriber → aggregated per company → aggregated globally.

The standalone `hotpath-probe.js` stays for single-user runs (baseline / control probe), but `run-all.sh` will no longer be dependent on it for evidence.

### 5. `run-all.sh` gains multi-company knobs

New env variables:
- `FLOOD_COMPANY_IDS` → forwarded as `--company-ids`
- `FLOOD_COMPANY_BALANCE` (`true|false`) → forwarded as `--company-balance` when true
- Existing `STORM_SUBSCRIBERS_FILE` continues to work — just now with `[company:...]` sections
- Optional `STORM_HOTPATH_INTERVAL_MS` — per-subscriber hotpath probe interval
- Optional `STORM_HOTPATH_ENABLED` (`true|false`, default true) — turn multi-vantage probe on/off

Backward compat: if none of the new env vars are set, behavior matches today's single-company run.

---

## Files likely to change

### New files
1. `scripts/storm-reproducer/lib/subscribers-multi.js`
   - Extended parser: understands `[company:<id>]` sections, still handles flat lists.
   - New export: `resolveMultiCompanySubscriberSpec()` returning `[{ companyId, loginType, count }]`.
2. `scripts/storm-reproducer/lib/subscriber-hotpath.js`
   - Per-subscriber hotpath loop factory: takes subscriber + interval, returns `{ start, stop, metrics }`.
3. `scripts/storm-reproducer/subscribers/dev-multi-company.template.txt`
   - Example file showing `[company:<id>]` sections.
4. Tests:
   - `test/storm-subscribers-multi.spec.js` — parser
   - `test/storm-subscriber-hotpath.spec.js` — per-subscriber probe timing/aggregation (with fake fetch)

### Modified
1. `scripts/storm-reproducer/lib/subscribers.js`
   - Delegate to `subscribers-multi.js` when file contains `[company:...]`.
2. `scripts/storm-reproducer/storm-reproducer.js`
   - Track `companyId` per subscriber.
   - Attach `subscriber-hotpath` when `STORM_HOTPATH_ENABLED` is on.
   - New summary section: `summary by company`.
3. `scripts/storm-reproducer/run-all.sh`
   - Forward `FLOOD_COMPANY_IDS`, `FLOOD_COMPANY_BALANCE` to `inbound-rmq-flood`.
   - Optionally set `STORM_HOTPATH_ENABLED=true` by default.
4. `scripts/storm-reproducer/README.md`
   - Add "Multi-company mode" section with file format + example command.
5. `AGENTS.md`
   - New row under Scripts Reference for multi-company run.

---

## Step-by-step plan

Below each task uses TDD. Every task should end green (`npm run test`).

### Task 1: Parser for `[company:<id>]` sections

**Objective:** Parse a subscriber file that may contain `[company:<id>]` sections into a normalized array.

**Files:**
- Create: `scripts/storm-reproducer/lib/subscribers-multi.js`
- Test: `test/storm-subscribers-multi.spec.js`

**Step 1: Write failing tests (excerpt — full set covers section switching, mixed inline+file, backward compat with flat list, defaults, and malformed sections gracefully falling back).**

```js
const { parseMultiCompanySpecText } = require('...');

it('parses [company:<id>] sections into per-company entries', () => {
  const text = [
    '[company:A1]',
    'admintest:1',
    'bdbagent01:4',
    '[company:B2]',
    'cx001:4',
  ].join('\n');
  assert.deepEqual(parseMultiCompanySpecText(text), [
    { companyId: 'A1', loginType: 'admintest', count: 1 },
    { companyId: 'A1', loginType: 'bdbagent01', count: 4 },
    { companyId: 'B2', loginType: 'cx001', count: 4 },
  ]);
});

it('assigns "unknown" to entries before any section header', () => {
  const text = 'admintest:1\n[company:B2]\ncx001:4\n';
  assert.deepEqual(parseMultiCompanySpecText(text), [
    { companyId: 'unknown', loginType: 'admintest', count: 1 },
    { companyId: 'B2', loginType: 'cx001', count: 4 },
  ]);
});

it('flat list without any [company:] header stays flat under "unknown"', () => {
  const text = 'admintest:1\ncx001:4';
  assert.deepEqual(parseMultiCompanySpecText(text), [
    { companyId: 'unknown', loginType: 'admintest', count: 1 },
    { companyId: 'unknown', loginType: 'cx001', count: 4 },
  ]);
});

it('ignores comments and blanks and normalizes whitespace', () => { ... });
```

**Step 2: Run tests → RED.**

**Step 3: Implement `parseMultiCompanySpecText` in `scripts/storm-reproducer/lib/subscribers-multi.js`.**

Also export `resolveMultiCompanySubscriberSpec({ subscribers?, subscribersFile? })` that:
- If file → read file → parse.
- If `subscribers` string starts with `@` → treat as file path.
- If inline CSV → wrap each entry as `{ companyId: 'unknown', ... }` (backward compat).

**Step 4: Run tests → GREEN.**

**Step 5: Commit.**

---

### Task 2: Wire multi-company parser into `subscribers.js`

**Objective:** `resolveSubscriberSpec` transparently gains multi-company awareness.

**Files:**
- Modify: `scripts/storm-reproducer/lib/subscribers.js`
- Test: `test/scripts-helpers.spec.js` (extend existing suite)

**Step 1: Add failing tests that assert `resolveSubscriberSpec` returns `spec` string **plus** a new `entries` array of `{ companyId, loginType, count }`.**

**Step 2: RED.**

**Step 3: Change `resolveSubscriberSpec` to also return `entries`. Keep existing return keys for backward compat.**

**Step 4: GREEN.**

**Step 5: Commit.**

---

### Task 3: Storm reproducer tracks `companyId` per subscriber

**Objective:** Every `subscriber` object carries `declaredCompanyId`.

**Files:**
- Modify: `scripts/storm-reproducer/storm-reproducer.js`
- Test: none (integration-level; unit tested in Tasks 4/6)

**Step 1:** In `main()`, iterate `resolvedSubscribers.entries` (from Task 2) instead of `subscriberSpecs`. Pass `companyId` into `buildSubscriber`.

**Step 2:** `buildSubscriber` stores `state.declaredCompanyId` and best-effort `state.detectedCompanyId` from profile.

**Step 3:** Sanity check the summary line still prints — quick smoke run with 1 subscriber.

**Step 4:** Commit.

---

### Task 4: Per-subscriber hotpath probe loop

**Objective:** Each subscriber runs its own Variant 1 + `/conversation/count` probe loop using its own token.

**Files:**
- Create: `scripts/storm-reproducer/lib/subscriber-hotpath.js`
- Test: `test/storm-subscriber-hotpath.spec.js`

**Step 1: Write failing tests (using fake `timedGet` injected via option, plus fake clock).**

Tests cover:
- Fires at the configured interval.
- Records into per-subscriber metrics bucket keyed by endpoint name.
- Allows overlap (never awaits prior request before firing next tick).
- `stop()` cancels the loop cleanly.

**Step 2:** RED.

**Step 3:** Implement `createSubscriberHotpath(subscriber, { intervalMs, timedGet })` returning `{ start, stop, metrics }`.

**Step 4:** GREEN.

**Step 5:** Commit.

---

### Task 5: Storm reproducer attaches hotpath to each subscriber

**Objective:** When `STORM_HOTPATH_ENABLED=true`, every subscriber's `runViewerLoop`-equivalent path also has its own hotpath probe running for the duration.

**Files:**
- Modify: `scripts/storm-reproducer/storm-reproducer.js`

**Step 1:** After `buildSubscriber` succeeds, if hotpath enabled, `createSubscriberHotpath(subscriber, { intervalMs })` and `.start()`.

**Step 2:** On shutdown, call every hotpath `.stop()` before disconnecting sockets.

**Step 3:** In `printSummary`, merge hotpath metrics into the subscriber's `metrics.requests` so existing per-endpoint line output stays consistent.

**Step 4:** Smoke run with 2 subscribers, 5s duration, verify per-subscriber metrics show N cycles for Variant 1 + count.

**Step 5:** Commit.

---

### Task 6: Per-company summary section

**Objective:** Print a `summary by company` block before the per-subscriber blocks.

**Files:**
- Modify: `scripts/storm-reproducer/storm-reproducer.js`

**Step 1:** Aggregate per-company: `requestedSubscribers`, `readySubscribers`, `eventsReceived`, sum of hotpath ok/errors, p95 across hotpath durations.

**Step 2:** Print block.

**Step 3:** Smoke run using a 2-company file, verify companies appear as separate rows.

**Step 4:** Commit.

---

### Task 7: `run-all.sh` forwards multi-company knobs to flood

**Objective:** `FLOOD_COMPANY_IDS` and `FLOOD_COMPANY_BALANCE` reach `inbound-rmq-flood.js`.

**Files:**
- Modify: `scripts/storm-reproducer/run-all.sh`

**Step 1:** Read env vars, build args array conditionally.

```bash
FLOOD_COMPANY_IDS="${FLOOD_COMPANY_IDS:-}"
FLOOD_COMPANY_BALANCE="${FLOOD_COMPANY_BALANCE:-false}"

FLOOD_ARGS=(
  --env "$ENV_NAME"
  --login-type "$LOGIN_TYPE"
  --discover-targets "$DISCOVER_TARGETS"
  --discover-profiles widget,messenger,email,instagram,whatsapp
  --total-messages "$TOTAL_MESSAGES"
  --batch-size 10
  --message-type text
  --log-every 20
  --random-targets
  --uri "$RMQ_URI"
)
if [[ -n "$FLOOD_COMPANY_IDS" ]]; then
  FLOOD_ARGS+=(--company-ids "$FLOOD_COMPANY_IDS")
fi
if [[ "$FLOOD_COMPANY_BALANCE" == "true" ]]; then
  FLOOD_ARGS+=(--company-balance)
fi

"$NODE_BIN" scripts/inbound-rmq-flood/inbound-rmq-flood.js "${FLOOD_ARGS[@]}" 2>&1 | tee "$FLOOD_LOG"
```

**Step 2:** `bash -n` to verify.

**Step 3:** Commit.

---

### Task 8: Docs + template

**Objective:** Users can copy-paste the multi-company workflow.

**Files:**
- Create: `scripts/storm-reproducer/subscribers/dev-multi-company.template.txt`
- Modify: `scripts/storm-reproducer/README.md`
- Modify: `scripts/storm-reproducer/subscribers/README.md`
- Modify: `AGENTS.md`

**Content includes:**
- Example file with 2 companies.
- Example command:

```bash
ENV=dev \
LOGIN_TYPE=admintest \
TOTAL_MESSAGES=2000 \
DISCOVER_TARGETS=200 \
STORM_SUBSCRIBERS_FILE=scripts/storm-reproducer/subscribers/dev-multi-company.txt \
FLOOD_COMPANY_IDS=684a7dee68bd32a1f552e453,6866480abdea2b03ef333165 \
FLOOD_COMPANY_BALANCE=true \
STORM_HOTPATH_ENABLED=true \
STORM_HOTPATH_INTERVAL_MS=1000 \
STORM_ROUTE=your-inbox \
STORM_DURATION_SEC=600 \
STORM_READY_TIMEOUT_SEC=1800 \
bash scripts/storm-reproducer/run-all.sh
```

**Step:** Commit.

---

## Tests / validation

Cumulative test count goal after all tasks: **~40 passing** (up from 28).

Manual verification:
1. **Backward compat** — old flat subscriber file still works, no `[company:...]`.
2. **Multi-company file** — 2 companies, 3–5 subscribers each, 60s smoke run.
3. **Env vars forwarded** — grep `FLOOD_LOG` for `target companies: <id1>:N, <id2>:M`.
4. **Per-subscriber hotpath** — every subscriber block shows ok≥N for Variant 1 + `/conversation/count`.
5. **Per-company summary** — separate row per company with distinct numbers.

---

## Risks, tradeoffs, and open questions

### Risks
- **1000+ subscribers × 1Hz hotpath = 1000+ RPS just from the probe layer.** That's the point (mimic 1000–2000 users), but be aware it will also stress egress from the operator's laptop. Docs must warn about ulimits and outbound connection caps.
- **Company detection from login profile may not always be reliable.** Some accounts don't expose organizationId in the `/api/auth/me` shape we already see. Mitigation: `declaredCompanyId` from file is authoritative for aggregation; `detectedCompanyId` is warn-only.
- **Existing 401s in the subscriber list** amplify to N per-subscriber hotpath failures. Should skip hotpath for subscribers that failed to prepare (already handled: `buildSubscriber` throws, no subscriber object is created).

### Tradeoffs
- Keeping single-user `hotpath-probe.js` around (unchanged) gives us a clean **control probe** vs the noisy multi-vantage measurement. Worth it.
- Not implementing multi-region probe — out of scope.

### Open questions
1. **Do we need to allow different intervals per company?** Right now proposal is one global interval. If a user wants "company A probes at 500ms, company B at 2000ms", we'd need per-section overrides. Deferred until asked.
2. **Should `STORM_HOTPATH_ENABLED=true` be the default?** I lean yes for run-all.sh (that's the whole point), but off for direct `node storm-reproducer.js` invocations (keeps unit runs cheap). Confirming with user.
3. **Aggregation window for the per-company summary — total run or rolling window?** Proposal: total run (simpler, matches existing behavior). Rolling window is a future enhancement.
4. **Do we cap `maxInFlightPerSubscriber` for the hotpath loop?** If a subscriber's requests all stall at 10s, unbounded overlap means each subscriber could accumulate ~10 in-flight per endpoint before the loop even notices. Proposal: soft cap at 20 per subscriber per endpoint; document it.

---

## Non-goals

- Multi-region / multi-datacenter probing.
- Reproducing exact prod DB query plan.
- Changing the FE code path.
- Automatic subscriber validation (skip 401 accounts before run) — separate patch.

---

## Handoff

**Ready to execute this plan?** If yes, we'll go task-by-task, TDD, and I'll commit after each. If you want any changes (especially answers to the 4 open questions), tell me before Task 1 so I don't have to redo work.
