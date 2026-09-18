'use strict';

// Runnable check for empty-Pool-A auto-fallback: when /api/conversation returns zero
// existing open conversations, discovery throws NoDiscoveryTargetsError and main() must
// auto-switch to Pool C (new contact + new conversation) — UNLESS the caller already
// asked for a Pool B/C mix (then their own empty-pool redirect handles it).
const assert = require('assert');
const { resolveEmptyDiscoveryFallback, NoDiscoveryTargetsError } = require('../inbound-rmq-flood');

// Default Pool-A-only run (both ratios 0): empty discovery -> fall back to Pool C at 100%.
const d1 = resolveEmptyDiscoveryFallback({ newContactNewConvRatio: 0, existingContactNewConvRatio: 0 });
assert.strictEqual(d1.fallback, true, 'Pool-A-only run must fall back when discovery is empty');
assert.strictEqual(d1.ratioC, 100, 'fallback should flood NEW conversations at 100%');

// Caller already requested 100% Pool C: B+C=100, no room left -> let main handle (warn-only).
const d2 = resolveEmptyDiscoveryFallback({ newContactNewConvRatio: 100, existingContactNewConvRatio: 0 });
assert.strictEqual(d2.fallback, false, 'B+C=100 -> no auto-override, warn-only');

// Caller asked 50% B + 50% C: sum=100, same -> warn-only.
const d3 = resolveEmptyDiscoveryFallback({ newContactNewConvRatio: 50, existingContactNewConvRatio: 50 });
assert.strictEqual(d3.fallback, false, 'B+C=100 -> warn-only');

// Mixed but not full: 20% B + 0% C (sum=20 < 100) -> fill rest with C.
const d4 = resolveEmptyDiscoveryFallback({ newContactNewConvRatio: 0, existingContactNewConvRatio: 20 });
assert.strictEqual(d4.fallback, true, 'B+C<100 -> auto-fallback');
assert.strictEqual(d4.ratioC, 80, 'ratioC = 100 - existingContactRatio');

// The sentinel error must be catchable by type (main() uses instanceof).
assert.ok(new NoDiscoveryTargetsError('x') instanceof Error, 'sentinel extends Error');

console.log('empty-pool-a-fallback check: OK');
