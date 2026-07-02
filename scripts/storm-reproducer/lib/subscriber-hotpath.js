'use strict';

const { resolveStatusKey } = require('./error-classifier');

function ensureRequestBucket(metrics, name) {
  if (!metrics.requests[name]) {
    metrics.requests[name] = { ok: 0, errors: 0, durations: [], statuses: {} };
  }
  return metrics.requests[name];
}

function recordResult(metrics, name, result) {
  const bucket = ensureRequestBucket(metrics, name);
  if (result.ok) bucket.ok += 1;
  else bucket.errors += 1;
  bucket.durations.push(result.durationMs);
  const statusKey = resolveStatusKey(result);
  bucket.statuses[statusKey] = (bucket.statuses[statusKey] || 0) + 1;
}

/**
 * Per-subscriber hotpath probe loop.
 *
 * Fires the exact hotpath endpoints from the subscriber's own token on a fixed
 * interval. Overlap is allowed on purpose: the next tick does not wait for the
 * previous requests to settle. This mirrors FE pending/refetch pile-up.
 *
 * Returned metrics shape intentionally matches storm summary buckets so Task 5
 * can merge it into subscriber.metrics.requests without extra translation.
 */
function createSubscriberHotpath(subscriber, options = {}) {
  const intervalMs = Number(options.intervalMs ?? 1000);
  const timedGet = options.timedGet;
  if (typeof timedGet !== 'function') {
    throw new Error('createSubscriberHotpath requires options.timedGet');
  }

  const metrics = {
    requests: {},
    inFlight: 0,
    maxInFlight: 0,
  };

  let timer = null;
  let stopped = false;
  let stopPromise = null;

  function trackRequest(name, promise) {
    metrics.inFlight += 1;
    if (metrics.inFlight > metrics.maxInFlight) metrics.maxInFlight = metrics.inFlight;
    subscriber.pendingRequests.add(promise);
    promise.finally(() => {
      metrics.inFlight -= 1;
      subscriber.pendingRequests.delete(promise);
    });
  }

  function firePair() {
    if (stopped) return;
    const listSpec = subscriber.state.cachedListSpecs.find((spec) => spec.key === 'variant-1')
      || subscriber.state.cachedListSpecs.find((spec) => spec.key === 'route-current');
    if (listSpec) {
      const p = Promise.resolve(timedGet(listSpec.url, subscriber.token))
        .then((result) => recordResult(metrics, listSpec.name, result));
      trackRequest(listSpec.name, p);
    }

    const countUrl = subscriber.runtime?.endpoints?.conversationCount;
    if (countUrl) {
      const p = Promise.resolve(timedGet(countUrl, subscriber.token))
        .then((result) => recordResult(metrics, 'GET /conversation/count', result));
      trackRequest('GET /conversation/count', p);
    }
  }

  function schedule() {
    if (stopped) return;
    timer = setTimeout(() => {
      firePair();
      schedule();
    }, intervalMs);
  }

  return {
    metrics,
    start() {
      if (stopped || timer) return;
      firePair();
      schedule();
    },
    async stop() {
      if (stopPromise) return stopPromise;
      stopped = true;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      stopPromise = Promise.allSettled([...subscriber.pendingRequests]).then(() => undefined);
      return stopPromise;
    },
  };
}

module.exports = {
  createSubscriberHotpath,
};
