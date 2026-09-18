'use strict';

// Runnable check for the reflex-fix: --discover-assigned must add assign=true to the
// /conversation discovery query, so flood targets conversations the storm subscriber is
// a participant of (which is what makes the your-inbox invalidation reflex fire).
const assert = require('assert');
const { buildDiscoveryQuery } = require('../inbound-rmq-flood');

// assigned OFF (default): no assign filter -> old behavior, reflex stays silent
const off = buildDiscoveryQuery({ discoverAssigned: false }, { limit: 20, page: 1 });
assert.strictEqual(off.assign, undefined, 'assign must be absent when discoverAssigned is false');
assert.strictEqual(off.unassign, undefined, 'unassign must be absent by default');
assert.strictEqual(off.status, 'open');
assert.strictEqual(off.hideEmpty, true);

// assigned ON: assign=true present -> subscriber is a participant -> your-inbox reflex fires
const on = buildDiscoveryQuery({ discoverAssigned: true }, { limit: 20, page: 2 });
assert.strictEqual(on.assign, true, 'assign must be true when discoverAssigned is set');
assert.strictEqual(on.unassign, undefined, 'unassign must not co-exist with assign');
assert.strictEqual(on.limit, 20);
assert.strictEqual(on.page, 2);
assert.strictEqual(on.sort, 'isPinned:desc,pinnedAt:desc,timestamp:desc');

// unassigned ON: unassign=true present -> participants empty -> unassigned reflex fires
const un = buildDiscoveryQuery({ discoverUnassigned: true }, { limit: 20, page: 1 });
assert.strictEqual(un.unassign, true, 'unassign must be true when discoverUnassigned is set');
assert.strictEqual(un.assign, undefined, 'assign must be absent in unassigned mode');

// assign wins if both set (explicit precedence, no ambiguous double-filter)
const both = buildDiscoveryQuery({ discoverAssigned: true, discoverUnassigned: true }, { limit: 20, page: 1 });
assert.strictEqual(both.assign, true, 'assign takes precedence when both flags set');
assert.strictEqual(both.unassign, undefined, 'unassign suppressed when assign is set');

console.log('discover-assigned check: OK');
