'use strict';

const { appendQuery, timedGet } = require('./http');
const { resolveStatusKey } = require('./error-classifier');

const FE_CONVERSATION_SORT = 'isPinned:desc,pinnedAt:desc,timestamp:desc';

const ROUTE_LIST_PARAMS = {
  'your-inbox': {
    variantName: 'GET /conversation (variant-2 your-inbox)',
    params: {
      assign: true,
      status: 'open',
      sort: FE_CONVERSATION_SORT,
      hideEmpty: true,
      limit: 20,
      page: 1,
    },
  },
  all: {
    variantName: 'GET /conversation (variant-1 all)',
    params: {
      status: 'open',
      sort: FE_CONVERSATION_SORT,
      hideEmpty: true,
      limit: 20,
      page: 1,
    },
  },
  unassigned: {
    variantName: 'GET /conversation (unassigned)',
    params: {
      unassign: true,
      status: 'open',
      sort: FE_CONVERSATION_SORT,
      hideEmpty: true,
      limit: 20,
      page: 1,
    },
  },
};

function makeVariant1Spec(endpoints) {
  return {
    key: 'variant-1',
    name: 'GET /conversation (variant-1 all)',
    url: appendQuery(endpoints.conversation, {
      status: 'open',
      sort: FE_CONVERSATION_SORT,
      hideEmpty: true,
      limit: 20,
      page: 1,
    }),
  };
}

function makeCurrentRouteSpec(endpoints, route, teamId) {
  if (route === 'per-team-inbox') {
    if (!teamId) {
      throw new Error('route=per-team-inbox requires --team-id');
    }
    return {
      key: 'route-current',
      name: 'GET /conversation (per-team-inbox)',
      url: appendQuery(endpoints.conversation, {
        status: 'open',
        team: teamId,
        sort: FE_CONVERSATION_SORT,
        hideEmpty: true,
        limit: 20,
        page: 1,
      }),
    };
  }

  const config = ROUTE_LIST_PARAMS[route] || ROUTE_LIST_PARAMS['your-inbox'];
  return {
    key: 'route-current',
    name: config.variantName,
    url: appendQuery(endpoints.conversation, config.params),
  };
}

function buildLandingSpecs(runtime, state) {
  const { endpoints } = runtime;
  const specs = [];
  const variant1 = makeVariant1Spec(endpoints);
  const currentRoute = makeCurrentRouteSpec(endpoints, state.route, state.teamId);

  const push = (key, name, url) => specs.push({ key, name, url });

  if (state.route === 'your-inbox') {
    push(variant1.key, variant1.name, variant1.url);
    push('notif-primary', 'GET /notifications/unread-count?group=primary', appendQuery(endpoints.notificationsUnreadCount, { group: 'primary' }));
    push('notif-updates', 'GET /notifications/unread-count?group=updates', appendQuery(endpoints.notificationsUnreadCount, { group: 'updates' }));
    push('member-status', 'GET /member/status', endpoints.memberStatus);
    push('conversation-count', 'GET /conversation/count', endpoints.conversationCount);
    if (state.organizationId) {
      push('organization', 'GET /organization/:id', endpoints.organizationById(state.organizationId));
    }
    push('member-list', 'GET /member?limit=100&page=1', appendQuery(endpoints.member, { limit: 100, page: 1 }));
    push('filter-count', 'GET /conversation/filter-count?assign=true', appendQuery(endpoints.conversationFilterCount, { assign: true }));
    push('tag-list', 'GET /tag?limit=100&page=1', appendQuery(endpoints.tag, { limit: 100, page: 1 }));
    push('screenshot-setting', 'GET /conversation/screenshot/setting', endpoints.conversationScreenshotSetting);
    push(currentRoute.key, currentRoute.name, currentRoute.url);
    push('away-reasons', 'GET /away-reasons', endpoints.awayReasons);
    return specs;
  }

  // Non-your-inbox route fallback: warm exact current route + key shared endpoints.
  push(currentRoute.key, currentRoute.name, currentRoute.url);
  push('conversation-count', 'GET /conversation/count', endpoints.conversationCount);
  push('filter-count', 'GET /conversation/filter-count?assign=true', appendQuery(endpoints.conversationFilterCount, { assign: true }));
  push('notif-primary', 'GET /notifications/unread-count?group=primary', appendQuery(endpoints.notificationsUnreadCount, { group: 'primary' }));
  push('notif-updates', 'GET /notifications/unread-count?group=updates', appendQuery(endpoints.notificationsUnreadCount, { group: 'updates' }));
  push('member-status', 'GET /member/status', endpoints.memberStatus);
  push('member-list', 'GET /member?limit=100&page=1', appendQuery(endpoints.member, { limit: 100, page: 1 }));
  push('tag-list', 'GET /tag?limit=100&page=1', appendQuery(endpoints.tag, { limit: 100, page: 1 }));
  push('screenshot-setting', 'GET /conversation/screenshot/setting', endpoints.conversationScreenshotSetting);
  push('away-reasons', 'GET /away-reasons', endpoints.awayReasons);
  return specs;
}

function createMetrics() {
  return {
    events: {},
    requests: {},
    inFlight: 0,
    maxInFlight: 0,
    lastErrors: [],
  };
}

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
  if (!result.ok) {
    metrics.lastErrors.push({
      name,
      status: statusKey,
      httpStatus: result.status,
      errorCode: result.errorCode || null,
      causeCode: result.causeCode || null,
      durationMs: result.durationMs,
      error: result.error || result.statusText,
    });
    if (metrics.lastErrors.length > 10) metrics.lastErrors.shift();
  }
}

function extractMessage(raw) {
  if (!raw) return null;
  if (raw.message && typeof raw.message === 'object') return raw.message;
  return raw;
}

function extractParticipants(payload) {
  return payload?.participants || payload?.removedParticipants || [];
}

function conversationExistsInState(state, conversationId) {
  return state.cachedConversationIds.has(String(conversationId || ''));
}

function checkPlatformFilter(conversation, route) {
  if (route !== 'per-channel') return true;
  return true;
}

function checkTeamFilter(conversation, route, teamId) {
  if (route !== 'per-team-inbox') return true;
  return conversation?.team?.teamId === teamId;
}

function checkJunkFilter(conversation, route) {
  if (route !== 'junk') return true;
  return Boolean(conversation?.isJunked);
}

function checkSpamFilter(conversation, route) {
  if (route !== 'spam') return true;
  return Boolean(conversation?.isSpam);
}

function checkFavoriteFilter(conversation, route) {
  if (route !== 'favorite' && route !== 'starred') return true;
  return Boolean(conversation?.isFavorite);
}

function checkUnassignFilter(conversation, route) {
  if (route !== 'unassigned') return true;
  return !(conversation?.participants && conversation.participants.length > 0);
}

function checkAssignFilter(conversation, route, currentUserId) {
  if (route !== 'your-inbox') return true;
  if (!currentUserId) return false;
  return conversation?.participants?.some((participant) => participant.userId === currentUserId) ?? false;
}

function isConversationRelevant(conversation, state) {
  if (!conversation) return false;
  return (
    checkPlatformFilter(conversation, state.route) &&
    checkTeamFilter(conversation, state.route, state.teamId) &&
    checkJunkFilter(conversation, state.route) &&
    checkSpamFilter(conversation, state.route) &&
    checkFavoriteFilter(conversation, state.route) &&
    checkUnassignFilter(conversation, state.route) &&
    checkAssignFilter(conversation, state.route, state.currentUserId)
  );
}

async function fireSpec(spec, subscriber) {
  const { token } = subscriber;
  const metrics = subscriber.metrics;
  metrics.inFlight += 1;
  if (metrics.inFlight > metrics.maxInFlight) {
    metrics.maxInFlight = metrics.inFlight;
  }

  const promise = timedGet(spec.url, token)
    .then((result) => {
      recordResult(metrics, spec.name, result);
      if (result.ok && (spec.key === 'variant-1' || spec.key === 'route-current')) {
        const json = result.json || null;
        const items =
          json?.items ||
          json?.data?.items ||
          json?.data ||
          (Array.isArray(json) ? json : []);
        if (Array.isArray(items)) {
          subscriber.state.cachedConversationIds = new Set(
            items.map((item) => item?.id || item?._id).filter(Boolean).map(String),
          );
        }
      }
      return result;
    })
    .finally(() => {
      metrics.inFlight -= 1;
      subscriber.pendingRequests.delete(promise);
    });

  subscriber.pendingRequests.add(promise);
  return promise;
}

async function warmLandingBurst(subscriber) {
  const specs = buildLandingSpecs(subscriber.runtime, subscriber.state);
  await Promise.allSettled(specs.map((spec) => fireSpec(spec, subscriber)));
  subscriber.state.cachedListSpecs = specs.filter((spec) => spec.key === 'variant-1' || spec.key === 'route-current');
  return specs;
}

function buildFullConversationInvalidationSpecs(subscriber) {
  const { endpoints } = subscriber.runtime;
  const specs = [];

  for (const spec of subscriber.state.cachedListSpecs) {
    specs.push(spec);
  }

  specs.push({
    key: 'conversation-count',
    name: 'GET /conversation/count',
    url: endpoints.conversationCount,
  });
  specs.push({
    key: 'filter-count',
    name: 'GET /conversation/filter-count?assign=true',
    url: appendQuery(endpoints.conversationFilterCount, { assign: true }),
  });

  return specs;
}

function attachInvalidationReflex(subscriber, options = {}) {
  const { socket, logger = console, verbose = false } = options;
  const metrics = subscriber.metrics;

  const onNotificationNewMessage = (payload) => {
    metrics.events['notification.new.message'] = (metrics.events['notification.new.message'] || 0) + 1;
    const message = extractMessage(payload);
    const conversation = message?.conversation || payload?.conversation || null;
    const isRelevant = isConversationRelevant(conversation, subscriber.state);
    const conversationId = message?.conversationId || conversation?.id;
    const exists = conversationExistsInState(subscriber.state, conversationId);
    const isAssignedToCurrentUser =
      conversation?.participants?.some((participant) => participant.userId === subscriber.state.currentUserId) ?? false;
    const hasPrivilege = isAssignedToCurrentUser || subscriber.state.currentUserRole === 'admin';

    if (verbose) {
      logger.info(`[event] notification.new.message conversationId=${conversationId || 'unknown'} relevant=${isRelevant} exists=${exists} privileged=${hasPrivilege}`);
    }

    if (!(isRelevant && !exists && hasPrivilege)) {
      return;
    }

    const currentRouteSpec = subscriber.state.cachedListSpecs.find((spec) => spec.key === 'route-current');
    if (currentRouteSpec) {
      void fireSpec(currentRouteSpec, subscriber);
    }
    void fireSpec({
      key: 'conversation-count',
      name: 'GET /conversation/count',
      url: subscriber.runtime.endpoints.conversationCount,
    }, subscriber);
  };

  const onConversationAssigned = (payload) => {
    metrics.events['conversation.assigned'] = (metrics.events['conversation.assigned'] || 0) + 1;
    const participants = extractParticipants(payload);
    const isCurrentUserAssigned = participants.some((participant) => participant.id === subscriber.state.currentUserId);
    if (verbose) {
      logger.info(`[event] conversation.assigned currentUserInPayload=${isCurrentUserAssigned}`);
    }
    if (!isCurrentUserAssigned) return;
    for (const spec of buildFullConversationInvalidationSpecs(subscriber)) {
      void fireSpec(spec, subscriber);
    }
  };

  const onConversationUnassigned = (payload) => {
    metrics.events['conversation.unassigned'] = (metrics.events['conversation.unassigned'] || 0) + 1;
    const removed = extractParticipants(payload);
    const isCurrentUserRemoved = removed.some((participant) => participant.id === subscriber.state.currentUserId);
    if (verbose) {
      logger.info(`[event] conversation.unassigned currentUserInPayload=${isCurrentUserRemoved}`);
    }
    if (!isCurrentUserRemoved) return;
    for (const spec of buildFullConversationInvalidationSpecs(subscriber)) {
      void fireSpec(spec, subscriber);
    }
  };

  socket.on('notification.new.message', onNotificationNewMessage);
  socket.on('conversation.assigned', onConversationAssigned);
  socket.on('conversation.unassigned', onConversationUnassigned);

  logger.info('[reflex] listening on notification.new.message, conversation.assigned, conversation.unassigned');

  return {
    buildFullConversationInvalidationSpecs: () => buildFullConversationInvalidationSpecs(subscriber),
    fireSpec: (spec) => fireSpec(spec, subscriber),
    warmLandingBurst: () => warmLandingBurst(subscriber),
  };
}

module.exports = {
  FE_CONVERSATION_SORT,
  ROUTE_LIST_PARAMS,
  attachInvalidationReflex,
  buildLandingSpecs,
  buildFullConversationInvalidationSpecs,
  createMetrics,
  warmLandingBurst,
};
