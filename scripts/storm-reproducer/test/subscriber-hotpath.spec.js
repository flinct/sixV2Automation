'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');

const {
  createSubscriberHotpath,
} = require(path.resolve(
  __dirname, '..', 'lib', 'subscriber-hotpath.js',
));

describe('storm-reproducer subscriber hotpath', () => {
  function makeSubscriber() {
    return {
      token: 'TOKEN',
      pendingRequests: new Set(),
      runtime: {
        endpoints: {
          conversation: 'https://example.test/api/conversation',
          conversationCount: 'https://example.test/api/conversation/count',
        },
      },
      state: {
        cachedListSpecs: [
          {
            key: 'variant-1',
            name: 'GET /conversation (variant-1 all)',
            url: 'https://example.test/api/conversation?status=open',
          },
        ],
      },
    };
  }

  it('fires immediately and then on each interval using subscriber token', async () => {
    const calls = [];
    const subscriber = makeSubscriber();
    const hotpath = createSubscriberHotpath(subscriber, {
      intervalMs: 20,
      timedGet: async (url, token) => {
        calls.push({ url, token, at: Date.now() });
        return { ok: true, status: 200, durationMs: 5, errorCode: null };
      },
    });

    hotpath.start();
    await new Promise((resolve) => setTimeout(resolve, 75));
    await hotpath.stop();

    assert.ok(calls.length >= 6, `expected >= 6 calls, got ${calls.length}`);
    assert.ok(calls.every((c) => c.token === 'TOKEN'));
    assert.equal(calls[0].url, 'https://example.test/api/conversation?status=open');
    assert.equal(calls[1].url, 'https://example.test/api/conversation/count');
  });

  it('records metrics per endpoint using status keys', async () => {
    const subscriber = makeSubscriber();
    let count = 0;
    const hotpath = createSubscriberHotpath(subscriber, {
      intervalMs: 15,
      timedGet: async (url) => {
        count += 1;
        if (url.includes('/count')) {
          return { ok: false, status: 0, errorCode: 'TIMEOUT', durationMs: 30, error: 'timeout' };
        }
        return { ok: true, status: 200, errorCode: null, durationMs: 10 };
      },
    });

    hotpath.start();
    await new Promise((resolve) => setTimeout(resolve, 40));
    await hotpath.stop();

    const metrics = hotpath.metrics;
    assert.ok(metrics.requests['GET /conversation (variant-1 all)']);
    assert.ok(metrics.requests['GET /conversation/count']);
    assert.ok(metrics.requests['GET /conversation (variant-1 all)'].ok >= 1);
    assert.ok(metrics.requests['GET /conversation/count'].errors >= 1);
    assert.ok(metrics.requests['GET /conversation/count'].statuses.TIMEOUT >= 1);
  });

  it('allows overlap and tracks max in-flight requests', async () => {
    const subscriber = makeSubscriber();
    const hotpath = createSubscriberHotpath(subscriber, {
      intervalMs: 10,
      timedGet: async () => {
        await new Promise((resolve) => setTimeout(resolve, 35));
        return { ok: true, status: 200, errorCode: null, durationMs: 35 };
      },
    });

    hotpath.start();
    await new Promise((resolve) => setTimeout(resolve, 70));
    await hotpath.stop();

    assert.ok(hotpath.metrics.maxInFlight > 2, `expected overlap, got maxInFlight=${hotpath.metrics.maxInFlight}`);
  });

  it('stop() is idempotent and leaves no running timer', async () => {
    const subscriber = makeSubscriber();
    let calls = 0;
    const hotpath = createSubscriberHotpath(subscriber, {
      intervalMs: 10,
      timedGet: async () => {
        calls += 1;
        return { ok: true, status: 200, errorCode: null, durationMs: 1 };
      },
    });

    hotpath.start();
    await new Promise((resolve) => setTimeout(resolve, 25));
    await hotpath.stop();
    const before = calls;
    await hotpath.stop();
    await new Promise((resolve) => setTimeout(resolve, 30));
    assert.equal(calls, before);
  });
});

