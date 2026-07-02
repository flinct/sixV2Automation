#!/usr/bin/env node
/**
 * RabbitMQ inbound flood simulator.
 *
 * Purpose:
 * - Reproduce prod-like inbound message volume in dev without changing BE / FE repos.
 * - Hit the same queue path conversation-service consumes:
 *   - message.inbound        -> inbound-messages
 *   - group.message.inbound  -> inbound-group-messages
 *
 * Why this is useful:
 * - Keeps backend processing in the loop (conversation-service + socket emit).
 * - Better RCA signal than injecting FE notifications directly.
 *
 * Example:
 *   node scripts/inbound-rmq-flood/inbound-rmq-flood.js \
 *     --channel-account-id acc-dev-001 \
 *     --client-contact-ids c1,c2,c3,c4 \
 *     --total-messages 200 \
 *     --message-type mixed-2045 \
 *     --batch-size 50
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const { buildBearerAuthHeader, loginErrorHint, normalizeApiBase } = require('../_shared/api-base');

const DEFAULTS = {
  batchSize: 25,
  channelProfile: 'generic',
  contentPrefix: '[dev-inbound-flood]',
  delayMs: 0,
  groupPattern: 'group.message.inbound',
  groupQueue: 'inbound-group-messages',
  logEvery: 50,
  messageType: 'text',
  messagesPerTarget: 1,
  pattern: 'message.inbound',
  queue: 'inbound-messages',
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
  totalMessages: 0,
};

const MESSAGE_VARIANTS = {
  contact: (seq, options) => ({
    content: `${options.contentPrefix} Contact card #${seq}`,
    metaData: {
      whatsapp: {
        contacts: [
          {
            name: `Sim Contact ${seq}`,
            phone: `628111000${String(seq).padStart(4, '0')}`,
          },
        ],
        rawType: 'contactMessage',
        sequence: seq,
      },
    },
    type: 'contact',
  }),
  interactive: (seq, options) => ({
    content: `${options.contentPrefix} Interactive reply selected: Option A (#${seq})`,
    metaData: {
      whatsapp: {
        buttonReply: { id: 'opt-a', title: 'Option A' },
        rawType: 'interactiveResponseMessage',
        sequence: seq,
      },
    },
    type: 'utility',
  }),
  location: (seq, options) => ({
    content: `${options.contentPrefix} Location #${seq}: -6.200000, 106.816666`,
    metaData: {
      whatsapp: {
        label: 'Simulated Jakarta location',
        latitude: -6.2,
        longitude: 106.816666,
        rawType: 'locationMessage',
        sequence: seq,
      },
    },
    type: 'location',
  }),
  poll: (seq, options) => ({
    content: `${options.contentPrefix} Poll update: Option A (#${seq})`,
    metaData: {
      whatsapp: {
        pollName: 'Simulated Poll',
        rawType: 'pollUpdateMessage',
        selectedOptions: ['Option A'],
        sequence: seq,
      },
    },
    type: 'utility',
  }),
  reaction: (seq, options) => ({
    content: `${options.contentPrefix} Reacted 👍 to a previous message #${seq}`,
    metaData: {
      whatsapp: {
        emoji: '👍',
        rawType: 'reactionMessage',
        sequence: seq,
        targetMessageId: `sim-target-${seq}`,
      },
    },
    type: 'utility',
  }),
  text: (seq, options) => ({
    content: `${options.contentPrefix} text message #${seq}`,
    type: 'text',
  }),
};

const MIXED_2045_ORDER = ['text', 'reaction', 'location', 'contact', 'interactive', 'poll'];
const DISCOVER_API_MAX_LIMIT = 200;
const FLOODTEST_MARKER = 'floodtest';
const FLOODTEST_ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const FLOODTEST_ID_LENGTH = 8;

/**
 * Generate a random N-char alphanumeric ID for floodtest contacts.
 * Used in place of an incrementing seq so two runs can never collide on (runId, seq).
 */
function generateFloodtestId(length = FLOODTEST_ID_LENGTH) {
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += FLOODTEST_ID_ALPHABET[Math.floor(Math.random() * FLOODTEST_ID_ALPHABET.length)];
  }
  return out;
}

// Channel-specific referenceId/contact payload templates for Pool C (new contact creation).
// All referenceIds carry the FLOODTEST_MARKER prefix so they never collide with real contacts.
// `id` is a random 8-char alphanumeric — uniqueness no longer depends on incrementing seq.
const FLOODTEST_CONTACT_TEMPLATES = {
  whatsapp: (runId, id) => ({
    referenceId: `${FLOODTEST_MARKER}_${runId}_${id}@s.whatsapp.net`,
    name: `FloodTest WA ${id}`,
    phone: '', // intentionally empty to avoid collision with real phones
  }),
  messenger: (runId, id) => ({
    referenceId: `${FLOODTEST_MARKER}-fb-${runId}-${id}`,
    name: `FloodTest FB ${id}`,
  }),
  instagram: (runId, id) => ({
    referenceId: `${FLOODTEST_MARKER}-ig-${runId}-${id}`,
    name: `FloodTest IG ${id}`,
  }),
  email: (runId, id) => ({
    referenceId: `${FLOODTEST_MARKER}+${runId}-${id}@${FLOODTEST_MARKER}.invalid::FloodTest`,
    email: `${FLOODTEST_MARKER}+${runId}-${id}@${FLOODTEST_MARKER}.invalid`,
    name: `FloodTest Email ${id}`,
  }),
  widget: (runId, id) => ({
    referenceId: `${FLOODTEST_MARKER}-widget-${runId}-${id}`,
    name: `FloodTest Visitor ${id}`,
  }),
};

function buildFloodtestMetaData(runId) {
  return {
    source: 'inbound-rmq-flood',
    runId,
    isFloodTest: true,
    createdAt: new Date().toISOString(),
  };
}

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
RabbitMQ inbound flood simulator

Usage:
  node scripts/inbound-rmq-flood/inbound-rmq-flood.js [options]

Required (choose one target source):
  --targets-file <path>                 JSON array of targets
  --channel-account-id <id>             Single account channel id
  --client-contact-ids <id1,id2,...>    Contact ids paired with --channel-account-id

Optional:
  --group                               Publish every target to group.message.inbound / inbound-group-messages
  --channel-profile <generic|whatsapp|widget|messenger|instagram|email>
  --message-type <text|location|contact|reaction|interactive|poll|mixed-2045>
  --messages-per-target <n>             Default: 1
  --total-messages <n>                  Overrides target_count * messages_per_target
  --discover-targets <n>                Auto-discover N direct targets from recent conversations when no targets are provided
  --discover-profiles <p1,p2,...>       Optional profile filter for discovery (e.g. widget,messenger,email)
  --discover-limit <n>                  How many conversations to scan during discovery (default: 200)
  --existing-contact-new-conv-ratio <n> % of total-messages routed to Pool B (existing contact, NEW conversation). Default: 0
  --new-contact-new-conv-ratio <n>      % of total-messages routed to Pool C (NEW contact + NEW conversation). Default: 0
                                          Remaining % goes to Pool A (existing conversation). B+C must not exceed 100.
  --new-contact-count <n>               How many floodtest contacts to create for Pool C (default: 20). All marked
                                          with referenceId prefix 'floodtest' and metaData.isFloodTest=true.
  --new-conv-settle-ms <n>              After seeding first-message creation for Pool B/C, wait N ms before flooding
                                          the same pairs again. Reduces duplicate 'conversation already exists' races.
                                          Default: 5000
  --viewer-roles <list>                 Comma-separated loginType keys for concurrent FE-style viewers.
                                          Each entry may be 'loginType' OR 'loginType:count' to scale per role.
                                          Examples:
                                            --viewer-roles chickentester01,mataayam01,leherayam01
                                              → 1 admin + 1 supervisor + 1 agent
                                            --viewer-roles chickentester01,mataayam01:4,leherayam01:4
                                              → 1 admin + 4 supervisor + 4 agent (target 4:1 ratio)
                                          Default: empty (no viewers).
  --viewers-per-role <n>                Fallback multiplier for roles WITHOUT explicit ':count' in --viewer-roles.
                                          Default: 1.
  --viewer-poll-interval-ms <n>         Polling interval per viewer (default: 3000)
  --viewer-warmup-ms <n>                Delay before first viewer poll (default: 1000)
  --viewer-persona <name>               Force persona admin|supervisor|agent. Default: auto-detect by loginType.
                                          Persona only affects whether /available-slot is called (agent-only).
  --viewer-detail-every <n>             Every N poll cycles, viewer also calls detail endpoints (conversation/:id,
                                          participants, sla-metrics, history) on a random conversation from last list.
                                          0 disables. Default: 3
  --viewer-discover-channels            Discover available platforms via /account-channel for per-channel tab. Default: on
  --viewer-discover-team-inboxes        Discover available team inboxes via /team for per-team-inbox tab. Default: on
  --no-viewer-discover-channels         Disable per-channel tab discovery
  --no-viewer-discover-team-inboxes     Disable per-team-inbox tab discovery
  --company-id <id>                     Filter targets to one company
  --company-ids <id1,id2,...>           Filter targets to one or more companies
  --company-balance                     Round-robin messages across companies instead of target order
  --random-targets                      Randomize target pair order each send (reshuffle without replacement)
  --env <dev|staging|prod|local>        Config env for API preflight/discovery (default: ENV or dev)
  --api-base <url>                      Override API base for preflight/discovery
  --login-type <name>                   Automation loginType for API preflight/discovery (default: config default account)
  --identifier <value>                  Explicit login identifier for API preflight/discovery
  --password <value>                    Explicit login password for API preflight/discovery
  --auth-bearer-token <token>           Reuse an existing bearer token for API preflight/discovery
  --skip-preflight                      Skip live validation of account channel/contact ids before publishing
  --batch-size <n>                      Default: 25
  --delay-ms <n>                        Delay between batches, default: 0
  --log-every <n>                       Progress line every N published messages (default: 50)
  --verbose                             Log every publish line
  --content-prefix <text>               Default: [dev-inbound-flood]
  --uri <amqp://...>                    Default: RABBITMQ_URL or amqp://localhost:5672
  --queue <name>                        Override default direct queue name
  --pattern <name>                      Override default direct message pattern
  --tls-ca <path>                       Optional TLS CA pem
  --tls-cert <path>                     Optional TLS client cert pem
  --tls-key <path>                      Optional TLS client key pem
  --dry-run                             Print payload samples only, do not publish
  --help                                Show this help

Examples:
  node scripts/inbound-rmq-flood/inbound-rmq-flood.js \
    --channel-account-id acc123 \
    --client-contact-ids c1,c2,c3,c4 \
    --total-messages 200 \
    --message-type mixed-2045 \
    --batch-size 50

  node scripts/inbound-rmq-flood/inbound-rmq-flood.js \
    --targets-file scripts/inbound-rmq-flood/inbound-rmq-flood.example.targets.json \
    --group \
    --messages-per-target 10 \
    --dry-run
`;
}

function toInt(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback;
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseList(value) {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lowered = value.trim().toLowerCase();
    return ['1', 'true', 'yes', 'y'].includes(lowered);
  }
  return Boolean(value);
}

function mergeMetaData(...sources) {
  return sources.filter(Boolean).reduce((accumulator, source) => {
    const next = { ...(accumulator || {}), ...(source || {}) };

    if ((accumulator && accumulator.whatsapp) || source.whatsapp) {
      next.whatsapp = {
        ...((accumulator && accumulator.whatsapp) || {}),
        ...(source.whatsapp || {}),
      };
    }

    return next;
  }, undefined);
}

function detectChannelProfile(target, options) {
  return target.channelProfile || options.channelProfile || DEFAULTS.channelProfile;
}

function resolveRoute(target, options) {
  const isGroup = normalizeBoolean(target.group) || options.group;
  return {
    isGroup,
    pattern: target.pattern || (isGroup ? options.groupPattern : options.pattern),
    queue: target.queue || (isGroup ? options.groupQueue : options.queue),
  };
}

function loadJson(filePath) {
  const absolute = path.resolve(filePath);
  return JSON.parse(fs.readFileSync(absolute, 'utf8'));
}

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '');
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeProfileCode(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) return 'generic';
  if (['whatsapp', 'whatsapp_api', 'whatsapp_web', 'whatsapp-official', 'baileys'].includes(normalized)) {
    return 'whatsapp';
  }
  if (['facebook', 'facebook_messenger', 'messenger'].includes(normalized)) return 'messenger';
  if (['instagram'].includes(normalized)) return 'instagram';
  if (['email'].includes(normalized)) return 'email';
  if (['widget'].includes(normalized)) return 'widget';
  return normalized;
}

function appendQuery(url, params) {
  const next = new URL(url);
  for (const [key, value] of Object.entries(params || {})) {
    if (value === undefined || value === null || value === '') continue;
    next.searchParams.set(key, String(value));
  }
  return next.toString();
}

function redactUriCredentials(uri) {
  return String(uri || '').replace(/(amqps?:\/\/[^:\s@]+:)[^@\s]+@/i, '$1***@');
}

async function httpJson(url, { method = 'GET', headers = {}, body } = {}) {
  let response;
  try {
    response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      body: body == null ? undefined : JSON.stringify(body),
    });
  } catch (cause) {
    // undici throws "TypeError: fetch failed" with the real reason hidden on
    // .cause (DNS, TLS, ECONNRESET, ENOTFOUND, self-signed cert, etc.).
    // Surface it so the caller actually sees the failure mode.
    const reason = cause?.cause || cause;
    const detail =
      reason?.code ||
      reason?.errno ||
      reason?.message ||
      String(reason);
    const wrapped = new Error(`fetch ${method} ${url} failed: ${detail}`);
    wrapped.cause = cause;
    throw wrapped;
  }

  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status} ${response.statusText} for ${method} ${url}`);
    error.status = response.status;
    error.body = json;
    throw error;
  }

  return json;
}

function unwrapData(json) {
  return json && typeof json === 'object' && 'data' in json ? json.data : json;
}

function extractItems(json) {
  const data = unwrapData(json);
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(json?.items)) return json.items;
  if (Array.isArray(data)) return data;
  if (Array.isArray(json)) return json;
  return [];
}

function hasExplicitTargetSource(options) {
  return Boolean(options.targetsFile || (options.channelAccountId && options.clientContactIds));
}

function normalizeIdList(values) {
  return ensureArray(values).map((value) => String(value).trim()).filter(Boolean);
}

function companyMatchesFilter(companyId, options) {
  const allowed = normalizeIdList(options.companyIds);
  if (!allowed.length) return true;
  if (!companyId) return false;
  return allowed.includes(String(companyId));
}

function buildRuntimeConfig(options, override = {}) {
  const { getConfig, getAccountByLoginType, ApiEndpoints } = require('../../playwright/support/config');
  const envName = options.envName || process.env.ENV || process.env.CYPRESS_ENV || 'dev';
  const baseConfig = getConfig(envName);
  const rawApiBase = options.apiBase || process.env.API_BASE || process.env.E2E_API_BASE || baseConfig.env.apiBase;
  const apiBase = normalizeApiBase(rawApiBase);
  if (apiBase !== rawApiBase) {
    console.log(`[inbound-flood] normalized apiBase: ${rawApiBase} -> ${apiBase}`);
  }
  const endpoints = new ApiEndpoints(apiBase);
  const config = { ...baseConfig, endpoints, env: { ...baseConfig.env, apiBase } };
  const bearerToken = override.authBearerToken || options.authBearerToken || process.env.AUTH_BEARER_TOKEN || '';
  const overrideLoginType = override.loginType || '';
  const overrideIdentifier = override.identifier || '';
  const overridePassword = override.password || '';

  let credentials = null;
  if (!bearerToken) {
    if (overrideIdentifier && overridePassword) {
      credentials = {
        identifier: overrideIdentifier,
        password: overridePassword,
      };
    } else if (options.identifier && options.password) {
      credentials = {
        identifier: options.identifier,
        password: options.password,
      };
    } else if (process.env.API_TEST_USERNAME && process.env.API_TEST_PASSWORD) {
      credentials = {
        identifier: process.env.API_TEST_USERNAME,
        password: process.env.API_TEST_PASSWORD,
      };
    } else if (overrideLoginType || options.loginType) {
      credentials = getAccountByLoginType(overrideLoginType || options.loginType, envName);
    } else {
      credentials = config.getDefaultAccount();
    }
  }

  return {
    accessToken: null,
    apiBase,
    bearerToken,
    config,
    credentials,
    envName,
    loginType: overrideLoginType || options.loginType || '',
  };
}

async function ensureAccessToken(runtime) {
  if (runtime.accessToken) return runtime.accessToken;
  if (runtime.bearerToken) {
    runtime.accessToken = runtime.bearerToken;
    return runtime.accessToken;
  }
  if (!runtime.credentials?.identifier || !runtime.credentials?.password) {
    throw new Error('Missing credentials for preflight discovery/validation');
  }

  const response = await httpJson(runtime.config.endpoints.loginUrl, {
    method: 'POST',
    body: {
      identifier: runtime.credentials.identifier,
      password: runtime.credentials.password,
    },
  });

  const payload = unwrapData(response) || response;
  const accessToken = firstDefined(payload?.accessToken, response?.accessToken, payload?.data?.accessToken);
  if (!accessToken) {
    throw new Error('Login succeeded but accessToken was not found in response');
  }

  runtime.accessToken = accessToken;
  return accessToken;
}

async function getAuthHeaders(runtime) {
  const token = await ensureAccessToken(runtime);
  return buildBearerAuthHeader(token);
}

async function fetchAccountChannelById(runtime, id) {
  const headers = await getAuthHeaders(runtime);
  const response = await httpJson(runtime.config.endpoints.accountChannelById(id), { headers });
  return unwrapData(response) || response;
}

async function fetchClientContactById(runtime, id) {
  const headers = await getAuthHeaders(runtime);
  const response = await httpJson(runtime.config.endpoints.contactById(id), { headers });
  return unwrapData(response) || response;
}

function extractContactReferenceId(item) {
  return firstDefined(
    item?.contactInfo?.referenceId,
    item?.clientContact?.referenceId,
    item?.contact?.referenceId,
    item?.referenceId,
    item?.client_contact?.referenceId,
    item?.raw?.referenceId,
  );
}

// Match backend duplicate semantics: accountChannel + contactInfo.referenceId.
// Fallback to clientContactId only when referenceId is unavailable, so discovery/preflight
// stays functional even if an API shape omits referenceId.
function buildConversationUniquenessKey(channelAccountId, contactReferenceId, clientContactId) {
  const channelPart = String(channelAccountId || 'unknown-account-channel');
  if (contactReferenceId) {
    return `${channelPart}:ref:${String(contactReferenceId)}`;
  }
  return `${channelPart}:contact:${String(clientContactId || 'unknown-contact')}`;
}

function extractConversationTarget(item) {
  const channelAccountId = firstDefined(
    item?.accountChannel?.id,
    item?.accountChannel?._id,
    item?.accountChannel?.[0]?.id,
    item?.accountChannel?.[0]?._id,
    item?.accountChannelId,
    item?.channelAccountId,
    item?.channelAccount?.id,
    item?.channelAccount?._id,
    item?.account_channel?.id,
    item?.account_channel?._id,
    item?.account_channel_id,
    item?.account?.id,
    item?.account?._id,
  );
  const clientContactId = firstDefined(
    item?.clientContact?.id,
    item?.clientContact?._id,
    item?.clientContactId,
    item?.contact?.id,
    item?.contact?._id,
    item?.contactId,
    item?.client?.id,
    item?.client?._id,
    item?.client_contact?.id,
    item?.client_contact?._id,
    item?.client_contact_id,
    item?.contactInfo?.id,
    item?.contactInfo?._id,
  );
  const channelProfile = normalizeProfileCode(
    firstDefined(
      item?.channel?.platform?.code,
      item?.channel?.platform,
      item?.accountChannel?.channel?.platform?.code,
      item?.accountChannel?.platform,
      item?.channelAccount?.channel?.platform?.code,
      item?.platform?.code,
      item?.platform,
      item?.channelType,
      item?.channel_type,
    )
  );
  const targetCompanyId = firstDefined(
    item?.companyId,
    item?.company?.id,
    item?.company?._id,
    item?.accountChannel?.companyId,
    item?.channelAccount?.companyId,
    item?.account_channel?.companyId,
  );
  const contactReferenceId = extractContactReferenceId(item);

  if (!channelAccountId || !clientContactId) return null;

  return {
    channelAccountId,
    channelProfile,
    clientContactId,
    contactReferenceId,
    conversationId: firstDefined(item?.id, item?._id, item?.conversationId),
    group: Boolean(item?.isGroup ?? item?.is_group),
    targetCompanyId,
  };
}

function diagnoseDiscoveryFailure(items, options) {
  if (!items.length) {
    console.error('[discover] /api/conversation returned 0 items (check filters / data in this env)');
    return;
  }
  console.error(`[discover] /api/conversation returned ${items.length} items but none passed extraction.`);
  const sample = items[0];
  console.error('[discover] first item top-level keys:', Object.keys(sample || {}).join(', '));
  // print which extractor field paths matched / missed on the first item, to make the shape obvious
  const probeFields = {
    'accountChannel.id':          sample?.accountChannel?.id,
    'accountChannel._id':         sample?.accountChannel?._id,
    'accountChannel[0].id':       sample?.accountChannel?.[0]?.id,
    'accountChannel[0]._id':      sample?.accountChannel?.[0]?._id,
    'accountChannelId':           sample?.accountChannelId ?? sample?.channelAccountId,
    'account.id':                 sample?.account?.id ?? sample?.account?._id,
    'clientContact.id':           sample?.clientContact?.id ?? sample?.clientContact?._id,
    'clientContactId':            sample?.clientContactId,
    'contact.id':                 sample?.contact?.id ?? sample?.contact?._id,
    'contactInfo.id':             sample?.contactInfo?.id,
    'contactInfo._id':            sample?.contactInfo?._id,
    'channel.platform.code':      sample?.channel?.platform?.code ?? sample?.channel?.platform,
    'platform':                   typeof sample?.platform === 'string' ? sample.platform : sample?.platform?.code,
    'isGroup':                    sample?.isGroup,
    'companyId':                  sample?.companyId ?? sample?.company?.id,
    'contactInfo (full)':         JSON.stringify(sample?.contactInfo).slice(0, 120),
    'accountChannel (full)':      JSON.stringify(sample?.accountChannel).slice(0, 120),
  };
  console.error('[discover] extractor probes on first item:');
  for (const [field, value] of Object.entries(probeFields)) {
    const display = value === undefined ? 'MISSING' : JSON.stringify(value).slice(0, 80);
    console.error(`           ${field.padEnd(28)} ${display}`);
  }
  if (options.discoverProfiles.length) {
    console.error(`[discover] active profile filter: ${options.discoverProfiles.join(',')}`);
  }
  if (options.companyIds && options.companyIds.length) {
    console.error(`[discover] active company filter: ${options.companyIds.join(',')}`);
  }
  console.error('[discover] hint: re-run conversation-size-probe with --include-body to capture the full shape, OR adjust extractor paths.');
}

async function discoverTargetsFromConversations(runtime, options) {
  const discoveryLoginTypes = parseList(options.loginType);
  const requested = Math.max(1, options.discoverTargets);
  const scanBudget = Math.max(options.discoverLimit, requested * 6);
  const pageSize = Math.min(DISCOVER_API_MAX_LIMIT, scanBudget);
  const allowedProfiles = options.discoverProfiles.length
    ? new Set(options.discoverProfiles.map((profile) => normalizeProfileCode(profile)))
    : null;
  const allTargets = [];
  const globalSeen = new Set();
  const sampledItems = [];
  let scanned = 0;
  let pagesFetched = 0;

  const runtimes = discoveryLoginTypes.length
    ? discoveryLoginTypes.map((loginType) => buildRuntimeConfig(options, { loginType }))
    : [runtime];

  for (const activeRuntime of runtimes) {
    const headers = await getAuthHeaders(activeRuntime);
    let page = 1;
    let localScanned = 0;
    let localPagesFetched = 0;
    while (localScanned < scanBudget && allTargets.length < requested) {
      const remaining = scanBudget - localScanned;
      const limit = Math.min(pageSize, remaining);
      const response = await httpJson(
        appendQuery(activeRuntime.config.endpoints.conversation, {
          status: 'open',
          sort: 'isPinned:desc,pinnedAt:desc,timestamp:desc',
          hideEmpty: true,
          limit,
          page,
        }),
        { headers }
      );

      const items = extractItems(response);
      localPagesFetched += 1;
      if (items.length > 0 && sampledItems.length === 0) {
        sampledItems.push(...items.slice(0, 3));
      }

      for (const item of items) {
        const target = extractConversationTarget(item);
        if (!target) continue;
        if (target.group) continue;
        if (allowedProfiles && !allowedProfiles.has(target.channelProfile)) continue;
        if (target.targetCompanyId && !companyMatchesFilter(target.targetCompanyId, options)) continue;
        const companyId = target.targetCompanyId || 'unknown-company';
        const dedupeKey = `${companyId}:${target.channelAccountId}:${target.clientContactId}`;
        if (globalSeen.has(dedupeKey)) continue;
        globalSeen.add(dedupeKey);
        allTargets.push(target);
      }

      localScanned += items.length;
      if (items.length < limit) break;
      page += 1;
    }
    scanned += localScanned;
    pagesFetched += localPagesFetched;
  }

  if (!allTargets.length) {
    diagnoseDiscoveryFailure(sampledItems, options);
    throw new Error('No valid conversation targets discovered from /api/conversation');
  }

  const syntheticTargets = await synthesizeMissingCompanyTargets(
    runtimes,
    allTargets,
    globalSeen,
    options
  );
  if (syntheticTargets.length) {
    allTargets.push(...syntheticTargets);
  }

  const targets = takePerCompanyQuota(allTargets, options);
  console.log(
    `[discover] selected ${targets.length} target(s) from recent conversations after scanning ${scanned} conversation row(s) across ${pagesFetched} page(s) using ${runtimes.length} discovery login(s)`
  );
  if (syntheticTargets.length) {
    console.log(`[discover] synthesized ${syntheticTargets.length} new-conversation target(s) for empty companies`);
  }
  console.log(`[discover] target quota by company: ${formatCompanySummary(summarizeRoutes(targets, options).companies)}`);

  return targets;
}

async function synthesizeMissingCompanyTargets(runtimes, existingTargets, globalSeen, options) {
  const requestedCompanies = normalizeIdList(options.companyIds);
  if (!requestedCompanies.length) return [];
  const perCompanyBudget = Math.max(
    1,
    Math.floor(Math.max(1, options.discoverTargets) / requestedCompanies.length)
  );
  const observedByCompany = existingTargets.reduce((accumulator, target) => {
    const companyId = target.targetCompanyId || 'unknown-company';
    accumulator.set(companyId, (accumulator.get(companyId) || 0) + 1);
    return accumulator;
  }, new Map());
  const missing = requestedCompanies.filter((companyId) => !(observedByCompany.get(companyId) > 0));
  if (!missing.length) return [];

  console.warn(
    `[discover] company(s) with zero open conversations from vantage(s): ${missing.join(', ')} -> synthesizing new-conversation targets`
  );

  const channelsByCompany = new Map();
  for (const activeRuntime of runtimes) {
    const headers = await getAuthHeaders(activeRuntime);
    let page = 1;
    while (true) {
      const response = await httpJson(
        appendQuery(activeRuntime.config.endpoints.accountChannel, { limit: 200, page }),
        { headers }
      );
      const items = extractItems(response);
      if (!items.length) break;
      for (const item of items) {
        if (isSoftDeletedAccountChannel(item)) continue;
        if (!hasLinkedChannel(item)) continue;
        const companyId = firstDefined(
          item?.companyId,
          item?.company?.id,
          item?.company?._id
        );
        if (!companyId || !missing.includes(String(companyId))) continue;
        const channelId = firstDefined(item?.id, item?._id);
        if (!channelId) continue;
        if (!channelsByCompany.has(companyId)) channelsByCompany.set(companyId, new Map());
        const bucket = channelsByCompany.get(companyId);
        if (bucket.has(channelId)) continue;
        bucket.set(channelId, {
          channelAccountId: channelId,
          channelProfile: normalizeProfileCode(
            firstDefined(
              item?.channel?.platform?.code,
              item?.channel?.platform,
              item?.platform?.code,
              item?.platform
            )
          ),
        });
      }
      if (items.length < 200) break;
      page += 1;
      if (page > 10) break;
    }
  }

  const synthesized = [];
  for (const companyId of missing) {
    const bucket = channelsByCompany.get(companyId);
    if (!bucket || bucket.size === 0) {
      console.warn(`[discover] no valid account-channel found for company=${companyId}; skipping synthesis`);
      continue;
    }
    const channels = [...bucket.values()];
    for (let index = 0; index < perCompanyBudget; index += 1) {
      const channel = channels[index % channels.length];
      const syntheticContactId = `syn-${companyId.slice(-6)}-${Date.now().toString(36)}-${index.toString(36)}`;
      const dedupeKey = `${companyId}:${channel.channelAccountId}:${syntheticContactId}`;
      if (globalSeen.has(dedupeKey)) continue;
      globalSeen.add(dedupeKey);
      synthesized.push({
        channelAccountId: channel.channelAccountId,
        channelProfile: channel.channelProfile || 'generic',
        clientContactId: syntheticContactId,
        contactReferenceId: syntheticContactId,
        conversationId: undefined,
        group: false,
        targetCompanyId: companyId,
        poolSource: 'new-contact-new-conv',
        synthetic: true,
      });
    }
    console.log(`[discover] synthesized ${perCompanyBudget} target(s) for company=${companyId} across ${channels.length} channel(s)`);
  }

  return synthesized;
}

function isSoftDeletedAccountChannel(accountChannel) {
  return (
    accountChannel?.isDeleted === true ||
    String(accountChannel?.isDeleted || '').toLowerCase() === 'true' ||
    Boolean(accountChannel?.deletedAt)
  );
}

function hasLinkedChannel(accountChannel) {
  return Boolean(
    accountChannel?.channel &&
      (accountChannel.channel.id ||
        accountChannel.channel._id ||
        accountChannel.channel.platform ||
        Object.keys(accountChannel.channel || {}).length > 0)
  );
}

function isAccountChannelHealthyForNewConversation(accountChannel) {
  if (!accountChannel) return false;
  if (isSoftDeletedAccountChannel(accountChannel)) return false;
  if (!hasLinkedChannel(accountChannel)) return false;
  const connectionStatus = String(accountChannel.connectionStatus || '').toLowerCase();
  return connectionStatus === 'active';
}

function extractAccountChannelProfile(accountChannel) {
  return normalizeProfileCode(
    firstDefined(
      accountChannel?.channel?.platform?.code,
      accountChannel?.channel?.platform,
      accountChannel?.platform?.code,
      accountChannel?.platform,
      accountChannel?.channelType,
    ),
  );
}

function extractContactChannelId(contact) {
  return firstDefined(
    contact?.channelId,
    contact?.channel?.id,
    contact?.channel?._id,
    contact?.channel,
  );
}

async function fetchActiveAccountChannels(runtime, options) {
  const headers = await getAuthHeaders(runtime);
  const pageSize = DISCOVER_API_MAX_LIMIT;
  const collected = [];
  let page = 1;
  const maxPages = 10; // hard cap to avoid runaway scans (max 2000 channels)

  while (page <= maxPages) {
    const response = await httpJson(
      appendQuery(runtime.config.endpoints.accountChannel, {
        connectionStatus: 'active',
        limit: pageSize,
        page,
      }),
      { headers },
    );
    const items = extractItems(response);
    for (const item of items) {
      if (!isAccountChannelHealthyForNewConversation(item)) continue;
      const companyId = firstDefined(item?.companyId, item?.company?.id, item?.company?._id);
      if (!companyMatchesFilter(companyId, options)) continue;
      collected.push({
        id: firstDefined(item?.id, item?._id),
        channelId: firstDefined(item?.channel?.id, item?.channel?._id),
        channelProfile: extractAccountChannelProfile(item),
        companyId,
        raw: item,
      });
    }
    if (items.length < pageSize) break;
    page += 1;
  }

  return collected;
}

async function fetchValidContacts(runtime, options) {
  const headers = await getAuthHeaders(runtime);
  const pageSize = DISCOVER_API_MAX_LIMIT;
  const collected = [];
  let page = 1;
  const maxPages = 10; // hard cap (max 2000 contacts)

  while (page <= maxPages) {
    const response = await httpJson(
      appendQuery(runtime.config.endpoints.contact, { limit: pageSize, page }),
      { headers },
    );
    const items = extractItems(response);
    for (const item of items) {
      const id = firstDefined(item?.id, item?._id);
      const channelId = extractContactChannelId(item);
      const referenceId = extractContactReferenceId(item);
      if (!id || !channelId) continue;
      if (item?.isDeleted === true) continue;
      collected.push({
        id,
        channelId: String(channelId),
        referenceId,
        raw: item,
      });
    }
    if (items.length < pageSize) break;
    page += 1;
  }

  return collected;
}

function buildExistingContactNewConversationPool(existingTargets, activeAccountChannels, contacts, requested) {
  if (requested <= 0) return [];

  // Build set of pairs that already have a conversation. Use the SAME uniqueness key as
  // conversation-service duplicate guard: accountChannelId + contactInfo.referenceId.
  // Fallback to clientContactId only when referenceId is unavailable.
  const existingPairs = new Set(
    existingTargets.map((target) =>
      buildConversationUniquenessKey(
        target.channelAccountId,
        target.contactReferenceId,
        target.clientContactId,
      ),
    ),
  );
  const usedCandidateKeys = new Set();

  // Index account channels by channelId so we can pair contacts to compatible account channels
  const accountChannelsByChannelId = new Map();
  for (const acc of activeAccountChannels) {
    if (!acc.channelId) continue;
    const key = String(acc.channelId);
    if (!accountChannelsByChannelId.has(key)) accountChannelsByChannelId.set(key, []);
    accountChannelsByChannelId.get(key).push(acc);
  }

  const candidates = [];
  const shuffledContacts = shuffleArray(contacts);

  for (const contact of shuffledContacts) {
    const compatibleAccountChannels = accountChannelsByChannelId.get(contact.channelId) || [];
    if (compatibleAccountChannels.length === 0) continue;
    // Pick a random compatible account channel for this contact
    const acc = compatibleAccountChannels[Math.floor(Math.random() * compatibleAccountChannels.length)];
    const pairKey = buildConversationUniquenessKey(acc.id, contact.referenceId, contact.id);
    if (existingPairs.has(pairKey)) continue;
    if (usedCandidateKeys.has(pairKey)) continue;
    usedCandidateKeys.add(pairKey);

    candidates.push({
      channelAccountId: acc.id,
      clientContactId: contact.id,
      contactReferenceId: contact.referenceId,
      channelProfile: acc.channelProfile,
      targetCompanyId: acc.companyId,
      poolSource: 'existing-contact-new-conv',
      pairKey,
    });

    if (candidates.length >= requested) break;
  }

  return candidates;
}

function pickAccountChannelForProfile(activeAccountChannels, preferredProfiles) {
  if (activeAccountChannels.length === 0) return null;
  const profileSet = preferredProfiles && preferredProfiles.length
    ? new Set(preferredProfiles.map((p) => normalizeProfileCode(p)))
    : null;
  const eligible = profileSet
    ? activeAccountChannels.filter((acc) => profileSet.has(acc.channelProfile))
    : activeAccountChannels;
  const pool = eligible.length > 0 ? eligible : activeAccountChannels;
  return pool[Math.floor(Math.random() * pool.length)];
}

async function createFloodtestContact(runtime, options, accountChannel) {
  const headers = await getAuthHeaders(runtime);
  const template = FLOODTEST_CONTACT_TEMPLATES[accountChannel.channelProfile]
    || FLOODTEST_CONTACT_TEMPLATES.widget;
  const floodtestId = generateFloodtestId();
  const tpl = template(options.runId, floodtestId);

  const body = {
    channelId: accountChannel.channelId,
    referenceId: tpl.referenceId,
    name: tpl.name,
    metaData: buildFloodtestMetaData(options.runId),
    ...(tpl.phone !== undefined ? { phone: tpl.phone } : {}),
    ...(tpl.email ? { email: tpl.email } : {}),
  };

  const response = await httpJson(runtime.config.endpoints.contact, {
    method: 'POST',
    headers,
    body,
  });

  const created = unwrapData(response) || response;
  const id = firstDefined(created?.id, created?._id);
  if (!id) {
    throw new Error(
      `Create floodtest contact succeeded but response had no id (channelProfile=${accountChannel.channelProfile})`,
    );
  }
  return { id, raw: created, accountChannel, referenceId: tpl.referenceId, floodtestId };
}

async function buildNewContactNewConversationPool(runtime, options, activeAccountChannels) {
  const wantedCount = Math.max(0, options.newContactCount);
  if (wantedCount <= 0) return { pairs: [], createdContacts: [] };

  const preferredProfiles = options.discoverProfiles && options.discoverProfiles.length
    ? options.discoverProfiles
    : null;

  const createdContacts = [];
  const pairs = [];

  for (let i = 0; i < wantedCount; i += 1) {
    const accountChannel = pickAccountChannelForProfile(activeAccountChannels, preferredProfiles);
    if (!accountChannel) {
      console.warn(`[create-contact] no eligible active account channel available; stopping at ${i}/${wantedCount}`);
      break;
    }
    try {
      const created = await createFloodtestContact(runtime, options, accountChannel);
      createdContacts.push(created);
      pairs.push({
        channelAccountId: accountChannel.id,
        clientContactId: created.id,
        contactReferenceId: created.referenceId,
        channelProfile: accountChannel.channelProfile,
        targetCompanyId: accountChannel.companyId,
        poolSource: 'new-contact-new-conv',
        pairKey: buildConversationUniquenessKey(
          accountChannel.id,
          created.referenceId,
          created.id,
        ),
      });
    } catch (error) {
      console.warn(
        `[create-contact] failed creating floodtest contact #${i + 1} on ${accountChannel.channelProfile}: ${error?.message || error}`,
      );
    }
  }

  return { pairs, createdContacts };
}

function summarizeCreatedContacts(createdContacts) {
  const byProfile = {};
  for (const c of createdContacts) {
    const key = c.accountChannel?.channelProfile || 'generic';
    byProfile[key] = (byProfile[key] || 0) + 1;
  }
  return Object.entries(byProfile)
    .map(([profile, count]) => `${count} ${profile}`)
    .join(', ');
}

function computePoolSplit(totalMessages, ratioB, ratioC) {
  const ratioBClamped = Math.max(0, Math.min(100, ratioB));
  const ratioCClamped = Math.max(0, Math.min(100, ratioC));
  if (ratioBClamped + ratioCClamped > 100) {
    throw new Error(
      `Pool ratios exceed 100%: existing-contact-new-conv=${ratioBClamped}%, new-contact-new-conv=${ratioCClamped}%`,
    );
  }
  const messagesB = Math.floor((totalMessages * ratioBClamped) / 100);
  const messagesC = Math.floor((totalMessages * ratioCClamped) / 100);
  const messagesA = totalMessages - messagesB - messagesC;
  return { messagesA, messagesB, messagesC };
}

// =============================================================================
// Concurrent viewer simulation (FE-style polling during publish)
// =============================================================================
//
// Mirrors what FE actually does when a user lands on /conversation/<tab>:
//   - Burst on landing: every flat endpoint hit once + 1 tab-list call
//   - Steady poll: tab list + counters + notifications + member list + tags,
//                  all called in parallel via Promise.all() each cycle
//   - Detail fetch: every N polls, picks a random conversation from last list
//                   and hits /:id, /participants, /sla-metrics, /history
//   - Tab rotation: weighted random (my-inbox 40%, others smaller)
//
// Endpoint coverage rules (from BE source review):
//   - All roles hit all endpoints EXCEPT /conversation/available-slot
//     which is agent-only (capacity check).

// FE-observed conversation query shape (from DevTools Network panel screenshot):
//   ?assign=true&status=open&sort=isPinned:desc,timestamp:desc&hideEmpty=true&limit=20&page=1
const FE_CONVERSATION_SORT = 'isPinned:desc,timestamp:desc';

const CONVERSATION_TABS = {
  'your-inbox': {
    label:  'your-inbox',
    weight: 40,
    params: { status: 'open', assign: true, sort: FE_CONVERSATION_SORT, hideEmpty: true, limit: 20, page: 1 },
  },
  'unassigned': {
    label:  'unassigned',
    weight: 20,
    params: { status: 'open', unassign: true, sort: FE_CONVERSATION_SORT, hideEmpty: true, limit: 20, page: 1 },
  },
  'all': {
    label:  'all',
    weight: 15,
    params: { status: 'open', sort: FE_CONVERSATION_SORT, hideEmpty: true, limit: 20, page: 1 },
  },
  'spam': {
    label:  'spam',
    weight: 5,
    params: { isSpam: true, sort: FE_CONVERSATION_SORT, limit: 20, page: 1 },
  },
  'favorite': {
    label:  'favorite',
    weight: 5,
    params: { isFavorite: true, sort: FE_CONVERSATION_SORT, limit: 20, page: 1 },
  },
  'junk': {
    label:  'junk',
    weight: 5,
    params: { isJunked: true, sort: FE_CONVERSATION_SORT, limit: 20, page: 1 },
  },
  'per-channel': {
    label:  'per-channel',
    weight: 5,
    params: { status: 'open', sort: FE_CONVERSATION_SORT, hideEmpty: true, limit: 20, page: 1 },
    needsChannel: true, // picks random platform from discovered list
  },
  'per-team-inbox': {
    label:  'per-team-inbox',
    weight: 5,
    params: { status: 'open', sort: FE_CONVERSATION_SORT, hideEmpty: true, limit: 20, page: 1 },
    needsTeamInbox: true, // picks random teamInboxId from discovered list
  },
};

// Auto-detect persona from loginType. Persona only affects which endpoints get hit
// (e.g. agent gets /available-slot). Roles still see all data per BE RBAC.
const LOGIN_TYPE_TO_PERSONA = {
  chickentester01: 'admin',
  cekerayam01:     'admin',
  mataayam01:      'supervisor',
  leherayam01:     'agent',
};

function resolvePersonaName(loginType, forced) {
  if (forced) return forced;
  return LOGIN_TYPE_TO_PERSONA[loginType] || 'admin';
}

function pickTabWeighted(tabs) {
  // tabs: array of { label, weight, params, needsChannel?, needsTeamInbox? }
  const total = tabs.reduce((sum, t) => sum + t.weight, 0);
  const r = Math.random() * total;
  let acc = 0;
  for (const t of tabs) {
    acc += t.weight;
    if (r <= acc) return t;
  }
  return tabs[tabs.length - 1];
}

// Endpoints called every poll (flat, no ID required). All roles get the
// same list except `conversationAvailableSlot` which is agent-only.
function buildFlatEndpointSpecs(personaName) {
  const specs = [
    { name: 'GET /conversation (filtered)',                    endpoint: 'conversation',              requiresFilter: true  },
    { name: 'GET /conversation/count',                         endpoint: 'conversationCount',         requiresFilter: false },
    { name: 'GET /conversation/filter-count?assign=true',      endpoint: 'conversationFilterCount',   requiresFilter: false, extraQuery: { assign: true } },
    { name: 'GET /conversation/active-conversation-count',     endpoint: 'conversationActiveCount',   requiresFilter: false },
    { name: 'GET /conversation/group',                         endpoint: 'conversationGroup',         requiresFilter: false },
    { name: 'GET /conversation/tags',                          endpoint: 'conversationTags',          requiresFilter: false },
    { name: 'GET /notifications/unread-count?group=primary',   endpoint: 'notificationsUnreadCount',  requiresFilter: false, extraQuery: { group: 'primary' } },
    { name: 'GET /notifications/unread-count?group=updates',   endpoint: 'notificationsUnreadCount',  requiresFilter: false, extraQuery: { group: 'updates' } },
    { name: 'GET /member/status',                              endpoint: 'memberStatus',              requiresFilter: false },
    { name: 'GET /member?limit=100',                           endpoint: 'member',                    requiresFilter: false, extraQuery: { limit: 100, page: 1 } },
    { name: 'GET /tag?limit=100',                              endpoint: 'tag',                       requiresFilter: false, extraQuery: { limit: 100, page: 1 } },
    { name: 'GET /away-reasons',                               endpoint: 'awayReasons',               requiresFilter: false },
  ];
  if (personaName === 'agent') {
    specs.push({ name: 'GET /conversation/available-slot', endpoint: 'conversationAvailableSlot', requiresFilter: false });
  }
  return specs;
}

// Endpoints that need a conversation ID from a recent list response.
// Called every N polls per --viewer-detail-every.
const DETAIL_ENDPOINT_SPECS = [
  { name: 'GET /conversation/:id',                        kind: 'conversationById',          requiresContact: false },
  { name: 'GET /conversation/participants?conversationId',kind: 'conversationParticipants',  requiresContact: false },
  { name: 'GET /conversation-sla-metrics/:id',            kind: 'conversationSlaMetrics',    requiresContact: false },
  { name: 'GET /conversation/history?clientContactId',    kind: 'conversationHistory',       requiresContact: true  },
];

async function discoverViewerContext(viewer, options) {
  // Discover channels and team inboxes available to this viewer (scoped by login role).
  // Cached in viewer object for reuse in tab rotation.
  const headers = await getAuthHeaders(viewer.runtime);
  const channels = [];
  const teamInboxes = [];

  if (options.viewerDiscoverChannels) {
    try {
      const resp = await httpJson(
        appendQuery(viewer.runtime.config.endpoints.accountChannel, { limit: 50, page: 1 }),
        { headers },
      );
      const items = extractItems(resp);
      const platformSet = new Set();
      for (const item of items) {
        const platform = firstDefined(
          item?.channel?.platform?.code,
          item?.channel?.platform,
          item?.platform?.code,
          item?.platform,
        );
        if (platform) platformSet.add(String(platform));
      }
      channels.push(...platformSet);
    } catch (e) {
      // soft-fail; per-channel tab just won't run for this viewer
    }
  }

  if (options.viewerDiscoverTeamInboxes) {
    try {
      const resp = await httpJson(viewer.runtime.config.endpoints.team, { headers });
      const items = extractItems(resp);
      for (const item of items) {
        const id = firstDefined(item?.id, item?._id);
        if (id) teamInboxes.push(String(id));
      }
    } catch (e) {
      // soft-fail
    }
  }

  return { channels, teamInboxes };
}

async function createViewer(parentOptions, loginType, viewerIndex) {
  // Each viewer gets its own runtime with its own access token (separate login).
  const viewerRuntime = buildRuntimeConfig({
    ...parentOptions,
    loginType,
    identifier: undefined,
    password: undefined,
    authBearerToken: undefined,
  });
  await ensureAccessToken(viewerRuntime);

  const personaName = resolvePersonaName(loginType, parentOptions.viewerPersona);
  const flatSpecs = buildFlatEndpointSpecs(personaName);

  return {
    label: `${loginType}#${viewerIndex}`,
    loginType,
    personaName,
    flatSpecs,
    runtime: viewerRuntime,
    pollIndex: 0,
    discoveredChannels: [],     // populated by discoverViewerContext()
    discoveredTeamInboxes: [],  // populated by discoverViewerContext()
    lastConversationIds: [],    // populated each poll from /conversation response
    lastContactIds: [],         // populated each poll from /conversation response
    metrics: {},
  };
}

function buildAvailableTabs(viewer) {
  // Filter out per-channel / per-team-inbox tabs if discovery returned nothing.
  return Object.values(CONVERSATION_TABS).filter((t) => {
    if (t.needsChannel && viewer.discoveredChannels.length === 0) return false;
    if (t.needsTeamInbox && viewer.discoveredTeamInboxes.length === 0) return false;
    return true;
  });
}

function buildTabParams(viewer, tab) {
  const params = { ...tab.params };
  if (tab.needsChannel) {
    params.platform = viewer.discoveredChannels[
      Math.floor(Math.random() * viewer.discoveredChannels.length)
    ];
  }
  if (tab.needsTeamInbox) {
    params.team = viewer.discoveredTeamInboxes[
      Math.floor(Math.random() * viewer.discoveredTeamInboxes.length)
    ];
  }
  return params;
}

function ensureMetricBucket(viewer, key) {
  if (!viewer.metrics[key]) {
    viewer.metrics[key] = { count: 0, errors: 0, durations: [] };
  }
  return viewer.metrics[key];
}

function timedHttpJson(url, opts, viewer, bucketKey) {
  const bucket = ensureMetricBucket(viewer, bucketKey);
  const t0 = Date.now();
  return httpJson(url, opts).then(
    (resp) => {
      bucket.durations.push(Date.now() - t0);
      bucket.count += 1;
      return resp;
    },
    (_err) => {
      bucket.errors += 1;
      return null;
    },
  );
}

async function pollFlatEndpointsParallel(viewer, tab) {
  const headers = await getAuthHeaders(viewer.runtime);
  const tabParams = buildTabParams(viewer, tab);

  const promises = viewer.flatSpecs.map((spec) => {
    let url;
    let bucketKey;
    if (spec.requiresFilter) {
      // /conversation with the tab's filter
      url = appendQuery(viewer.runtime.config.endpoints[spec.endpoint], tabParams);
      bucketKey = `${spec.name} [${tab.label}]`;
    } else {
      const base = viewer.runtime.config.endpoints[spec.endpoint];
      if (!base) return Promise.resolve(null); // endpoint not in config; skip
      url = spec.extraQuery ? appendQuery(base, spec.extraQuery) : base;
      bucketKey = spec.name;
    }
    return timedHttpJson(url, { headers }, viewer, bucketKey)
      .then((resp) => ({ spec, resp }));
  });

  const results = await Promise.all(promises);

  // Stash conversation list result so detail calls can pick random IDs
  for (const r of results) {
    if (!r || !r.spec) continue;
    if (r.spec.endpoint === 'conversation' && r.resp) {
      const items = extractItems(r.resp);
      const conversationIds = items
        .map((i) => firstDefined(i?.id, i?._id))
        .filter(Boolean)
        .slice(0, 20);
      const contactIds = items
        .map((i) => firstDefined(
          i?.clientContact?.id,
          i?.clientContact?._id,
          i?.clientContactId,
          i?.contactInfo?.id,
        ))
        .filter(Boolean)
        .slice(0, 20);
      viewer.lastConversationIds = conversationIds;
      viewer.lastContactIds = contactIds;
    }
  }
}

async function pollDetailEndpointsParallel(viewer) {
  if (viewer.lastConversationIds.length === 0) return;
  const headers = await getAuthHeaders(viewer.runtime);
  const conversationId = viewer.lastConversationIds[
    Math.floor(Math.random() * viewer.lastConversationIds.length)
  ];
  const contactId = viewer.lastContactIds.length > 0
    ? viewer.lastContactIds[Math.floor(Math.random() * viewer.lastContactIds.length)]
    : null;

  const promises = DETAIL_ENDPOINT_SPECS.map((spec) => {
    const eps = viewer.runtime.config.endpoints;
    let url;
    if (spec.kind === 'conversationById') {
      url = eps.conversationById(conversationId);
    } else if (spec.kind === 'conversationParticipants') {
      url = appendQuery(eps.conversationParticipants, { conversationId });
    } else if (spec.kind === 'conversationSlaMetrics') {
      url = eps.getConversationSlaMetrics(conversationId);
    } else if (spec.kind === 'conversationHistory') {
      if (!contactId) return Promise.resolve(null);
      url = appendQuery(eps.conversationHistory, { clientContactId: contactId });
    }
    if (!url) return Promise.resolve(null);
    return timedHttpJson(url, { headers }, viewer, spec.name);
  });

  await Promise.all(promises);
}

async function pollViewerOnce(viewer, options) {
  viewer.pollIndex += 1;

  const availableTabs = buildAvailableTabs(viewer);
  const tab = pickTabWeighted(availableTabs);

  await pollFlatEndpointsParallel(viewer, tab);

  const detailEvery = options.viewerDetailEvery;
  if (detailEvery > 0 && viewer.pollIndex % detailEvery === 0) {
    await pollDetailEndpointsParallel(viewer);
  }
}

async function runViewerLoop(viewer, stopSignal, options) {
  if (options.viewerWarmupMs > 0) {
    await sleep(options.viewerWarmupMs);
  }
  while (!stopSignal.stopped) {
    await pollViewerOnce(viewer, options);
    if (stopSignal.stopped) break;
    await sleep(options.viewerPollIntervalMs);
  }
}

// Parse --viewer-roles entries. Each entry may be 'loginType' OR 'loginType:count'.
// Returns array of { loginType, count } where count is from the entry suffix,
// or falls back to defaultCount when no ':N' is given.
function parseViewerRoleSpecs(rawRoles, defaultCount) {
  const fallback = Math.max(1, defaultCount || 1);
  return (rawRoles || []).map((entry) => {
    const [rawLoginType, rawCount] = String(entry).split(':');
    const loginType = (rawLoginType || '').trim();
    const parsed = rawCount ? parseInt(rawCount, 10) : NaN;
    const count = Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
    return { loginType, count };
  }).filter((r) => r.loginType);
}

async function buildViewers(parentOptions) {
  const viewers = [];
  if (!parentOptions.viewerRoles || parentOptions.viewerRoles.length === 0) {
    return viewers;
  }
  const specs = parseViewerRoleSpecs(parentOptions.viewerRoles, parentOptions.viewersPerRole);
  for (const { loginType, count } of specs) {
    for (let v = 0; v < count; v += 1) {
      try {
        const viewer = await createViewer(parentOptions, loginType, v + 1);
        const ctx = await discoverViewerContext(viewer, parentOptions);
        viewer.discoveredChannels = ctx.channels;
        viewer.discoveredTeamInboxes = ctx.teamInboxes;
        viewers.push(viewer);
      } catch (error) {
        console.warn(
          `[viewers] failed to login ${loginType}#${v + 1}: ${error?.message || error}`,
        );
      }
    }
  }
  if (viewers.length > 0) {
    const personaSummary = viewers
      .map((v) => `${v.label}=${v.personaName}(channels=${v.discoveredChannels.length},teams=${v.discoveredTeamInboxes.length})`)
      .join(', ');
    console.log(`[viewers] ${viewers.length} session(s) ready: ${personaSummary}`);
    console.log(
      `[viewers] tab rotation: weighted random (my-inbox 40%, unassigned 20%, all 15%, spam/favorite/junk 5% each, per-channel/per-team-inbox 5% if discovered)`,
    );
    console.log(
      `[viewers] detail endpoints called every ${parentOptions.viewerDetailEvery} poll(s) on random conversation from last list`,
    );
  }
  return viewers;
}

function percentile(sorted, p) {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return sorted[idx];
}

function formatDurationStats(durations) {
  if (durations.length === 0) return 'n/a';
  const sorted = [...durations].sort((a, b) => a - b);
  const p50 = percentile(sorted, 50);
  const p95 = percentile(sorted, 95);
  const max = sorted[sorted.length - 1];
  const min = sorted[0];
  const sum = sorted.reduce((a, b) => a + b, 0);
  const avg = Math.round(sum / sorted.length);
  return `min=${min}ms avg=${avg}ms p50=${p50}ms p95=${p95}ms max=${max}ms`;
}

function printViewerSummary(viewers) {
  if (viewers.length === 0) return;
  console.log('');
  console.log('[viewers] summary:');
  for (const v of viewers) {
    const header = `  ${v.label} (${v.personaName}, ${v.pollIndex} poll cycle(s))`;
    console.log(header);
    const bucketKeys = Object.keys(v.metrics).sort();
    for (const bucketKey of bucketKeys) {
      const m = v.metrics[bucketKey];
      if (m.count === 0 && m.errors === 0) continue;
      console.log(
        `    ${bucketKey.padEnd(56)} count=${String(m.count).padStart(4)} errors=${m.errors} ${formatDurationStats(m.durations)}`,
      );
    }
  }
}

async function preflightTargets(targets, runtime, options) {
  const accountChannelCache = new Map();
  const contactCache = new Map();
  const validatedTargets = [];
  let skippedByCompany = 0;
  let skippedInvalidAccountChannel = 0;
  let skippedDeletedAccountChannel = 0;
  let skippedMissingChannel = 0;
  let skippedInactive = 0;
  let skippedMissingContact = 0;
  let allowedInactiveExisting = 0;

  for (const target of targets) {
    const route = resolveRoute(target, options);

    if (!accountChannelCache.has(target.channelAccountId)) {
      try {
        const accountChannel = await fetchAccountChannelById(runtime, target.channelAccountId);
        accountChannelCache.set(target.channelAccountId, accountChannel);
      } catch (error) {
        if (options.explicitTargetSource) {
          throw error;
        }
        skippedInvalidAccountChannel += 1;
        continue;
      }
    }

    const accountChannel = accountChannelCache.get(target.channelAccountId);
    const companyId = firstDefined(accountChannel?.companyId, target.targetCompanyId);
    const isExistingConversationTarget = Boolean(target.conversationId);

    if (!companyMatchesFilter(companyId, options)) {
      if (options.explicitTargetSource) {
        throw new Error(
          `Target ${target.channelAccountId}/${target.clientContactId} belongs to company ${companyId || 'unknown'} which is outside requested company filter`
        );
      }
      skippedByCompany += 1;
      continue;
    }

    if (isSoftDeletedAccountChannel(accountChannel)) {
      if (options.explicitTargetSource && !isExistingConversationTarget) {
        throw new Error(`Account channel ${target.channelAccountId} is deleted`);
      }
      skippedDeletedAccountChannel += 1;
      continue;
    }

    if (!hasLinkedChannel(accountChannel)) {
      if (options.explicitTargetSource && !isExistingConversationTarget) {
        throw new Error(`Account channel ${target.channelAccountId} has no linked channel`);
      }
      skippedMissingChannel += 1;
      continue;
    }

    const connectionStatus = String(accountChannel?.connectionStatus || '').toLowerCase();
    if (!route.isGroup && connectionStatus && connectionStatus !== 'active' && !isExistingConversationTarget) {
      if (options.explicitTargetSource) {
        throw new Error(
          `Account channel ${target.channelAccountId} is not active (connectionStatus=${accountChannel?.connectionStatus})`
        );
      }
      skippedInactive += 1;
      continue;
    }
    if (!route.isGroup && connectionStatus && connectionStatus !== 'active' && isExistingConversationTarget) {
      allowedInactiveExisting += 1;
    }

    if (!contactCache.has(target.clientContactId)) {
      try {
        const clientContact = await fetchClientContactById(runtime, target.clientContactId);
        contactCache.set(target.clientContactId, clientContact);
      } catch (error) {
        if (options.explicitTargetSource) {
          throw error;
        }
        skippedMissingContact += 1;
        continue;
      }
    }

    const clientContact = contactCache.get(target.clientContactId);
    const contactReferenceId = firstDefined(
      target.contactReferenceId,
      extractContactReferenceId(clientContact),
    );

    if (route.isGroup) {
      let missingGroupMember = false;
      for (const memberId of ensureArray(target.memberContactIds)) {
        if (!contactCache.has(memberId)) {
          try {
            const memberContact = await fetchClientContactById(runtime, memberId);
            contactCache.set(memberId, memberContact);
          } catch (error) {
            if (options.explicitTargetSource) {
              throw error;
            }
            skippedMissingContact += 1;
            missingGroupMember = true;
            break;
          }
        }
      }
      if (missingGroupMember) {
        continue;
      }
    }

    validatedTargets.push({
      ...target,
      contactReferenceId,
      targetCompanyId: companyId,
    });
  }

  if (!validatedTargets.length) {
    throw new Error('Preflight finished but no valid targets remained after validation/company filtering');
  }

  console.log(
    `[preflight] validated ${validatedTargets.length}/${targets.length} target(s), ${accountChannelCache.size} account channel(s), ${contactCache.size} contact(s), skippedByCompany=${skippedByCompany}, skippedInvalidAccountChannel=${skippedInvalidAccountChannel}, skippedDeletedAccountChannel=${skippedDeletedAccountChannel}, skippedMissingChannel=${skippedMissingChannel}, skippedInactive=${skippedInactive}, skippedMissingContact=${skippedMissingContact}, allowedInactiveExisting=${allowedInactiveExisting}`
  );

  return validatedTargets;
}


function loadTargets(options) {
  if (options.targetsFile) {
    const loaded = loadJson(options.targetsFile);
    if (!Array.isArray(loaded) || loaded.length === 0) {
      throw new Error('targets-file must be a non-empty JSON array');
    }
    return loaded;
  }

  const channelAccountId = options.channelAccountId;
  const clientContactIds = parseList(options.clientContactIds);
  if (!channelAccountId || clientContactIds.length === 0) {
    throw new Error('Provide either --targets-file or (--channel-account-id + --client-contact-ids)');
  }

  const memberContactIds = parseList(options.memberContactIds);
  const isAdmin = parseList(options.isAdmin);
  const memberLids = options.memberLidsFile ? loadJson(options.memberLidsFile) : undefined;

  return clientContactIds.map((clientContactId) => ({
    channelProfile: options.channelProfile,
    channelAccountId,
    clientContactId,
    ...(options.group ? { group: true } : {}),
    ...(memberContactIds.length > 0 ? { memberContactIds } : {}),
    ...(isAdmin.length > 0 ? { isAdmin } : {}),
    ...(memberLids ? { memberLids } : {}),
    ...(options.senderContactId ? { senderContactId: options.senderContactId } : {}),
  }));
}

function validateTargets(targets, options) {
  for (const [index, target] of targets.entries()) {
    const route = resolveRoute(target, options);
    if (!target.channelAccountId) {
      throw new Error(`Target[${index}] missing channelAccountId`);
    }
    if (!target.clientContactId) {
      throw new Error(`Target[${index}] missing clientContactId`);
    }
    if (route.isGroup && (!Array.isArray(target.memberContactIds) || target.memberContactIds.length === 0)) {
      throw new Error(
        `Target[${index}] needs memberContactIds[] for --group mode (clientContactId=${target.clientContactId})`
      );
    }
  }
}

function pickVariant(messageType, seq, channelProfile) {
  if (messageType === 'mixed-2045' && channelProfile !== 'whatsapp') {
    return { fallbackFrom: 'mixed-2045', name: 'text', factory: MESSAGE_VARIANTS.text };
  }

  if (messageType === 'mixed-2045') {
    const variantName = MIXED_2045_ORDER[(seq - 1) % MIXED_2045_ORDER.length];
    return { name: variantName, factory: MESSAGE_VARIANTS[variantName] };
  }

  const factory = MESSAGE_VARIANTS[messageType];
  if (!factory) {
    throw new Error(`Unsupported --message-type ${messageType}`);
  }
  return { name: messageType, factory };
}

function addChannelSpecificFields(payload, target, channelProfile, seq, options) {
  const enriched = { ...payload };

  if (target.replyMessageId) enriched.replyMessageId = target.replyMessageId;
  if (target.parentExternalMessageId) enriched.parentExternalMessageId = target.parentExternalMessageId;
  if (Array.isArray(target.attachments)) enriched.attachments = target.attachments;

  if (channelProfile === 'email') {
    enriched.subject = target.subject || `${options.contentPrefix} Email subject #${seq}`;
    enriched.htmlContent =
      target.htmlContent || `<p>${String(enriched.content || '').replace(/</g, '&lt;')}</p>`;
    if (Array.isArray(target.references)) enriched.references = target.references;
  }

  if (channelProfile === 'instagram') {
    enriched.postId = target.postId || `sim-post-${seq}`;
    enriched.rootCommentId = target.rootCommentId || `sim-root-${seq}`;
    if (target.isGroupComment !== undefined) {
      enriched.isGroupComment = normalizeBoolean(target.isGroupComment);
    }
  }

  if (target.metaData) {
    enriched.metaData = mergeMetaData(enriched.metaData, target.metaData);
  }

  return enriched;
}

function buildPayload(target, seq, options) {
  const channelProfile = detectChannelProfile(target, options);
  const route = resolveRoute(target, options);
  const variant = pickVariant(options.messageType, seq, channelProfile);
  const runId = options.runId;
  const generated = variant.factory(seq, options);

  let payload = {
    channelAccountId: target.channelAccountId,
    clientContactId: target.clientContactId,
    content: generated.content,
    isFromChannelAccount: false,
    messageId: `dev-inbound-${runId}-${seq}`,
    tempMessageId: `dev-temp-${runId}-${seq}`,
    timestamp: new Date(),
    type: generated.type,
    ...(generated.metaData ? { metaData: generated.metaData } : {}),
  };

  if (route.isGroup) {
    payload.memberContactIds = target.memberContactIds;
    if (target.isAdmin) payload.isAdmin = target.isAdmin;
    if (target.senderContactId) payload.senderContactId = target.senderContactId;
    if (target.memberLids) payload.memberLids = target.memberLids;
    if (variant.name === 'text') {
      payload.content = `${options.contentPrefix} group message #${seq}`;
    }
  }

  payload = addChannelSpecificFields(payload, target, channelProfile, seq, options);

  return payload;
}

function shuffleArray(items) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function popFromRandomizedPool(pools, key, sourceItems) {
  let pool = pools.get(key) || [];
  if (pool.length === 0) {
    pool = shuffleArray(sourceItems);
  }
  const picked = pool.pop();
  pools.set(key, pool);
  return picked;
}

function buildPoolAwarePlan(poolA, poolB, poolC, split, options) {
  const subSchedule = (pool, count) => {
    if (count <= 0 || pool.length === 0) return [];
    if (options.randomTargets) {
      const randomizedPools = new Map([['pool', []]]);
      return Array.from({ length: count }, () => popFromRandomizedPool(randomizedPools, 'pool', pool));
    }
    return Array.from({ length: count }, (_, index) => pool[index % pool.length]);
  };

  // Fallback: if a pool was requested but empty, redirect its share to whichever pool is available.
  const fallbackPool = poolA.length > 0 ? poolA : (poolB.length > 0 ? poolB : poolC);
  let messagesA = split.messagesA;
  let messagesB = split.messagesB;
  let messagesC = split.messagesC;

  if (poolA.length === 0 && messagesA > 0) {
    console.warn(`[mix] Pool A empty; redirecting ${messagesA} message(s) to fallback pool`);
    if (poolB.length > 0) {
      messagesB += messagesA;
    } else if (poolC.length > 0) {
      messagesC += messagesA;
    }
    messagesA = 0;
  }
  if (poolB.length === 0 && messagesB > 0) {
    console.warn(`[mix] Pool B empty; redirecting ${messagesB} message(s) to existing-conversation pool`);
    messagesA += messagesB;
    messagesB = 0;
  }
  if (poolC.length === 0 && messagesC > 0) {
    console.warn(`[mix] Pool C empty; redirecting ${messagesC} message(s) to existing-conversation pool`);
    messagesA += messagesC;
    messagesC = 0;
  }

  if (poolA.length === 0 && poolB.length === 0 && poolC.length === 0) {
    if (!fallbackPool || fallbackPool.length === 0) {
      throw new Error('All target pools are empty after building Pool A/B/C; cannot build schedule');
    }
  }

  // Phase 1 (seed): for Pool B/C, send EXACTLY one first message per unique pair, then wait.
  // This gives conversation-service time to persist the newly created conversation so later
  // repeats for the same pair do not race into duplicate-creation conflicts.
  const seedCountB = Math.min(messagesB, poolB.length);
  const seedCountC = Math.min(messagesC, poolC.length);
  const seedB = subSchedule(poolB, seedCountB);
  const seedC = subSchedule(poolC, seedCountC);
  const seedSchedule = options.randomTargets ? shuffleArray([...seedB, ...seedC]) : [...seedB, ...seedC];

  // Phase 2 (main flood): send everything else after the settle wait.
  const remainingB = Math.max(0, messagesB - seedCountB);
  const remainingC = Math.max(0, messagesC - seedCountC);
  const partA = subSchedule(poolA, messagesA);
  const partB = subSchedule(poolB, remainingB);
  const partC = subSchedule(poolC, remainingC);
  const mainSchedule = options.randomTargets
    ? shuffleArray([...partA, ...partB, ...partC])
    : [...partA, ...partB, ...partC];

  const phases = [];
  if (seedSchedule.length > 0) {
    phases.push({
      name: 'seed-new-conv',
      schedule: seedSchedule,
      settleMs: options.newConversationSettleMs,
    });
  }
  if (mainSchedule.length > 0) {
    phases.push({
      name: 'main',
      schedule: mainSchedule,
      settleMs: 0,
    });
  }

  return {
    phases,
    fullSchedule: [...seedSchedule, ...mainSchedule],
    effectiveSplit: { messagesA, messagesB, messagesC },
    seedCounts: { seedB: seedSchedule.filter((t) => t.poolSource === 'existing-contact-new-conv').length,
                  seedC: seedSchedule.filter((t) => t.poolSource === 'new-contact-new-conv').length },
    remainingCounts: { remainingB, remainingC },
  };
}

function takePerCompanyQuota(targets, options) {
  const allowedCompanyIds = normalizeIdList(options.companyIds);
  if (!allowedCompanyIds.length) return targets;

  const grouped = targets.reduce((accumulator, target) => {
    const companyId = target.targetCompanyId || 'unknown-company';
    if (!accumulator.has(companyId)) accumulator.set(companyId, []);
    accumulator.get(companyId).push(target);
    return accumulator;
  }, new Map());

  const requested = Math.max(1, options.discoverTargets);
  const companyIds = allowedCompanyIds.filter((companyId) => (grouped.get(companyId) || []).length > 0);
  if (companyIds.length <= 1) return targets.slice(0, requested);

  const baseQuota = Math.floor(requested / companyIds.length);
  let remainder = requested % companyIds.length;
  const quotas = new Map();
  for (const companyId of companyIds) {
    quotas.set(companyId, baseQuota + (remainder > 0 ? 1 : 0));
    if (remainder > 0) remainder -= 1;
  }

  const picked = [];
  const leftovers = [];
  for (const companyId of companyIds) {
    const bucket = grouped.get(companyId) || [];
    const quota = quotas.get(companyId) || 0;
    picked.push(...bucket.slice(0, quota));
    leftovers.push(...bucket.slice(quota));
  }

  if (picked.length < requested) {
    picked.push(...leftovers.slice(0, requested - picked.length));
  }

  return picked.slice(0, requested);
}

function renderProgressBar(done, total, width = 24) {
  const safeTotal = Math.max(1, total);
  const ratio = Math.max(0, Math.min(1, done / safeTotal));
  const filled = Math.round(ratio * width);
  return `[${'#'.repeat(filled)}${'-'.repeat(width - filled)}] ${String(Math.round(ratio * 100)).padStart(3)}% ${done}/${total}`;
}

function buildSchedule(targets, options) {
  const totalMessages = options.totalMessages > 0
    ? options.totalMessages
    : targets.length * options.messagesPerTarget;

  if (options.companyBalance) {
    const grouped = targets.reduce((accumulator, target) => {
      const companyId = target.targetCompanyId || 'unknown-company';
      if (!accumulator.has(companyId)) {
        accumulator.set(companyId, []);
      }
      accumulator.get(companyId).push(target);
      return accumulator;
    }, new Map());

    const companyIds = [...grouped.keys()];
    if (companyIds.length > 1) {
      const cursors = new Map(companyIds.map((companyId) => [companyId, 0]));
      const randomizedPools = new Map(companyIds.map((companyId) => [companyId, []]));
      const schedule = [];

      for (let index = 0; index < totalMessages; index += 1) {
        const companyId = companyIds[index % companyIds.length];
        const bucket = grouped.get(companyId) || [];
        if (options.randomTargets) {
          schedule.push(popFromRandomizedPool(randomizedPools, companyId, bucket));
          continue;
        }
        const cursor = cursors.get(companyId) || 0;
        schedule.push(bucket[cursor % bucket.length]);
        cursors.set(companyId, cursor + 1);
      }

      return schedule;
    }
  }

  if (options.randomTargets) {
    const randomizedPools = new Map([['all', []]]);
    return Array.from({ length: totalMessages }, () => popFromRandomizedPool(randomizedPools, 'all', targets));
  }

  return Array.from({ length: totalMessages }, (_, index) => targets[index % targets.length]);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createConnectionOptions(options) {
  if (!(options.tlsCa && options.tlsCert && options.tlsKey)) {
    return undefined;
  }

  return {
    ca: [fs.readFileSync(path.resolve(options.tlsCa))],
    cert: fs.readFileSync(path.resolve(options.tlsCert)),
    key: fs.readFileSync(path.resolve(options.tlsKey)),
    rejectUnauthorized: true,
  };
}

async function openRabbit(options, queueNames) {
  const amqp = require('amqplib');
  const connection = await amqp.connect(options.rabbitmqUrl, createConnectionOptions(options));
  const channel = await connection.createConfirmChannel();
  for (const queueName of queueNames) {
    await channel.checkQueue(queueName);
  }
  return { channel, connection };
}

function buildEnvelope(pattern, payload) {
  return {
    data: payload,
    pattern,
  };
}

function summarizeRoutes(targets, options) {
  return targets.reduce(
    (accumulator, target) => {
      const route = resolveRoute(target, options);
      const channelProfile = detectChannelProfile(target, options);
      const companyId = target.targetCompanyId || 'unknown-company';
      accumulator.modeCounts[route.isGroup ? 'group' : 'direct'] += 1;
      accumulator.profiles[channelProfile] = (accumulator.profiles[channelProfile] || 0) + 1;
      accumulator.companies[companyId] = (accumulator.companies[companyId] || 0) + 1;
      return accumulator;
    },
    { companies: {}, modeCounts: { direct: 0, group: 0 }, profiles: {} }
  );
}

function formatProfileSummary(summary) {
  return Object.entries(summary)
    .map(([profile, count]) => `${profile}:${count}`)
    .join(', ');
}

function formatCompanySummary(summary) {
  return Object.entries(summary)
    .map(([companyId, count]) => `${companyId}:${count}`)
    .join(', ');
}

function shouldLogPublish(seq, scheduleSize, options) {
  if (options.verbose) return true;
  if (seq <= options.sampleSize) return true;
  if (options.logEvery > 0 && seq % options.logEvery === 0) return true;
  return seq === scheduleSize;
}

function printSummary(options, targets, schedule) {
  const routeSummary = summarizeRoutes(targets, options);
  const modeLabel =
    routeSummary.modeCounts.direct > 0 && routeSummary.modeCounts.group > 0
      ? 'mixed direct+group'
      : routeSummary.modeCounts.group > 0
        ? 'group inbound'
        : 'direct inbound';
  const companySummary = options.companyIds?.length ? options.companyIds.join(', ') : 'all visible';

  console.log('=== inbound rmq flood summary ===');
  console.log(`mode            : ${modeLabel}`);
  console.log(`env             : ${options.envName}`);
  if (options.apiBase) console.log(`api base        : ${options.apiBase}`);
  console.log(`companies       : ${companySummary}`);
  console.log(`preflight       : ${options.preflight ? 'on' : 'off'}`);
  console.log(`default queue   : ${options.queue}`);
  console.log(`default pattern : ${options.pattern}`);
  console.log(`group queue     : ${options.groupQueue}`);
  console.log(`group pattern   : ${options.groupPattern}`);
  console.log(`rabbitmq url    : ${redactUriCredentials(options.rabbitmqUrl)}`);
  console.log(`message type    : ${options.messageType}`);
  console.log(`default profile : ${options.channelProfile}`);
  console.log(`profiles        : ${formatProfileSummary(routeSummary.profiles)}`);
  console.log(`target order    : ${options.randomTargets ? 'randomized' : 'round-robin'}`);
  console.log(`company balance : ${options.companyBalance ? 'on' : 'off'}`);
  console.log(`target companies: ${formatCompanySummary(routeSummary.companies)}`);
  console.log(`targets         : ${targets.length}`);
  console.log(`schedule size   : ${schedule.length}`);
  console.log(`batch size      : ${options.batchSize}`);
  console.log(`delay ms        : ${options.delayMs}`);
  console.log(`log every       : ${options.verbose ? 'all' : options.logEvery}`);
  console.log(`dry run         : ${options.dryRun ? 'yes' : 'no'}`);
  console.log('=================================');
}

async function main() {
  const raw = parseArgs(process.argv.slice(2));
  if (raw.help) {
    console.log(usage());
    return;
  }

  const isGroup = Boolean(raw.group);
  const options = {
    apiBase: raw['api-base'] || '',
    authBearerToken: raw['auth-bearer-token'] || '',
    batchSize: Math.max(1, toInt(raw['batch-size'] ?? raw.batchSize, DEFAULTS.batchSize)),
    channelAccountId: raw['channel-account-id'],
    channelProfile: raw['channel-profile'] || DEFAULTS.channelProfile,
    clientContactIds: raw['client-contact-ids'],
    companyBalance: Boolean(raw['company-balance']),
    companyIds: parseList(raw['company-ids'] || raw['company-id']),
    contentPrefix: raw['content-prefix'] || DEFAULTS.contentPrefix,
    delayMs: Math.max(0, toInt(raw['delay-ms'], DEFAULTS.delayMs)),
    discoverLimit: Math.max(20, toInt(raw['discover-limit'], 200)),
    discoverProfiles: parseList(raw['discover-profiles']),
    discoverTargets: Math.max(0, toInt(raw['discover-targets'], 0)),
    existingContactNewConvRatio: Math.max(0, toInt(raw['existing-contact-new-conv-ratio'], 0)),
    newContactNewConvRatio: Math.max(0, toInt(raw['new-contact-new-conv-ratio'], 0)),
    newContactCount: Math.max(0, toInt(raw['new-contact-count'], 20)),
    newConversationSettleMs: Math.max(0, toInt(raw['new-conv-settle-ms'], 5000)),
    viewerRoles: parseList(raw['viewer-roles']),
    viewersPerRole: Math.max(1, toInt(raw['viewers-per-role'], 1)),
    viewerPollIntervalMs: Math.max(100, toInt(raw['viewer-poll-interval-ms'], 3000)),
    viewerWarmupMs: Math.max(0, toInt(raw['viewer-warmup-ms'], 1000)),
    viewerPersona: raw['viewer-persona'] || '',
    viewerDetailEvery: Math.max(0, toInt(raw['viewer-detail-every'], 3)),
    viewerDiscoverChannels: !Boolean(raw['no-viewer-discover-channels']),
    viewerDiscoverTeamInboxes: !Boolean(raw['no-viewer-discover-team-inboxes']),
    dryRun: Boolean(raw['dry-run']),
    envName: raw.env || process.env.ENV || process.env.CYPRESS_ENV || 'dev',
    group: isGroup,
    groupPattern: DEFAULTS.groupPattern,
    groupQueue: DEFAULTS.groupQueue,
    identifier: raw.identifier || process.env.API_TEST_USERNAME || '',
    isAdmin: raw['is-admin'],
    logEvery: Math.max(0, toInt(raw['log-every'], DEFAULTS.logEvery)),
    loginType: raw['login-type'] || process.env.LOGIN_TYPE || '',
    memberContactIds: raw['member-contact-ids'],
    memberLidsFile: raw['member-lids-file'],
    messageType: raw['message-type'] || DEFAULTS.messageType,
    messagesPerTarget: Math.max(1, toInt(raw['messages-per-target'], DEFAULTS.messagesPerTarget)),
    password: raw.password || process.env.API_TEST_PASSWORD || '',
    pattern: raw.pattern || DEFAULTS.pattern,
    preflight: !Boolean(raw['skip-preflight']),
    queue: raw.queue || DEFAULTS.queue,
    rabbitmqUrl: raw.uri || DEFAULTS.rabbitmqUrl,
    randomTargets: Boolean(raw['random-targets']),
    runId: `${Date.now()}`,
    sampleSize: 3,
    senderContactId: raw['sender-contact-id'],
    targetsFile: raw['targets-file'],
    tlsCa: raw['tls-ca'],
    tlsCert: raw['tls-cert'],
    tlsKey: raw['tls-key'],
    totalMessages: Math.max(0, toInt(raw['total-messages'], DEFAULTS.totalMessages)),
    verbose: Boolean(raw.verbose),
  };

  const explicitTargetSource = hasExplicitTargetSource(options);
  options.explicitTargetSource = explicitTargetSource;

  if (!explicitTargetSource && options.discoverTargets <= 0) {
    throw new Error(
      'Provide either explicit targets (--targets-file or --channel-account-id + --client-contact-ids) or use --discover-targets <n>'
    );
  }

  const needsApiRuntime =
    options.preflight ||
    (!explicitTargetSource && options.discoverTargets > 0) ||
    options.existingContactNewConvRatio > 0 ||
    options.newContactNewConvRatio > 0;
  const runtime = needsApiRuntime
    ? buildRuntimeConfig(options, {
        loginType: parseList(options.loginType)[0] || options.loginType,
      })
    : null;
  if (options.loginType && String(options.loginType).includes(',') && (options.identifier || options.password)) {
    throw new Error('Comma-separated LOGIN_TYPE discovery cannot be combined with explicit identifier/password overrides');
  }

  const discoveredOrLoadedTargets = explicitTargetSource
    ? loadTargets(options)
    : await discoverTargetsFromConversations(runtime, options);

  validateTargets(discoveredOrLoadedTargets, options);

  const targetsA = options.preflight
    ? await preflightTargets(discoveredOrLoadedTargets, runtime, options)
    : discoveredOrLoadedTargets;

  // Pool B / Pool C are only built when their ratio is > 0.
  let targetsB = [];
  let targetsC = [];
  let createdContacts = [];

  const wantsPoolB = options.existingContactNewConvRatio > 0;
  const wantsPoolC = options.newContactNewConvRatio > 0;

  if (wantsPoolB || wantsPoolC) {
    console.log('[mix] fetching active account channels and contacts for Pool B/C ...');
    const activeAccountChannels = await fetchActiveAccountChannels(runtime, options);
    console.log(`[mix] active account channels found: ${activeAccountChannels.length}`);

    if (wantsPoolB) {
      const contacts = await fetchValidContacts(runtime, options);
      console.log(`[mix] valid contacts fetched: ${contacts.length}`);
      const wantedB = Math.max(
        1,
        Math.ceil((options.totalMessages * options.existingContactNewConvRatio) / 100),
      );
      targetsB = buildExistingContactNewConversationPool(
        targetsA,
        activeAccountChannels,
        contacts,
        wantedB,
      );
      console.log(`[mix] Pool B candidates built: ${targetsB.length} (wanted ${wantedB})`);
    }

    if (wantsPoolC) {
      const result = await buildNewContactNewConversationPool(runtime, options, activeAccountChannels);
      targetsC = result.pairs;
      createdContacts = result.createdContacts;
      if (createdContacts.length > 0) {
        console.log(
          `[create-contact] created ${createdContacts.length} floodtest contact(s): ${summarizeCreatedContacts(createdContacts)}`,
        );
      }
    }
  }

  const totalMessages = options.totalMessages > 0
    ? options.totalMessages
    : targetsA.length * options.messagesPerTarget;
  const split = computePoolSplit(
    totalMessages,
    options.existingContactNewConvRatio,
    options.newContactNewConvRatio,
  );

  const usePoolAware = wantsPoolB || wantsPoolC;
  const targets = usePoolAware ? [...targetsA, ...targetsB, ...targetsC] : targetsA;
  const poolPlan = usePoolAware
    ? buildPoolAwarePlan(targetsA, targetsB, targetsC, split, options)
    : null;
  const schedule = usePoolAware ? poolPlan.fullSchedule : buildSchedule(targetsA, options);

  if (usePoolAware) {
    console.log('[mix] schedule split:');
    console.log(`  existing-conv:              ${split.messagesA} (${100 - options.existingContactNewConvRatio - options.newContactNewConvRatio}%)`);
    console.log(`  existing-contact-new-conv:  ${split.messagesB} (${options.existingContactNewConvRatio}%)`);
    console.log(`  new-contact-new-conv:       ${split.messagesC} (${options.newContactNewConvRatio}%)`);
    console.log('[mix] pools collected:');
    console.log(`  A: ${targetsA.length} unique pair(s)  (existing conversation)`);
    console.log(`  B: ${targetsB.length} unique pair(s)  (existing contact, new conversation)`);
    console.log(`  C: ${targetsC.length} unique pair(s)  (${createdContacts.length} floodtest contact(s) created)`);
    if (poolPlan.seedCounts.seedB > 0 || poolPlan.seedCounts.seedC > 0) {
      console.log('[mix] phase-1 seeding (one first message per new-conversation pair):');
      console.log(`  seed B: ${poolPlan.seedCounts.seedB} unique pair(s)`);
      console.log(`  seed C: ${poolPlan.seedCounts.seedC} unique pair(s)`);
      console.log(`  settle: wait ${options.newConversationSettleMs}ms before flooding repeats`);
    }
  }

  printSummary(options, targets, schedule);

  const samplePayloads = schedule.slice(0, Math.min(options.sampleSize, schedule.length)).map((target, index) => {
    const route = resolveRoute(target, options);
    const payload = buildPayload(target, index + 1, options);
    return {
      channelProfile: detectChannelProfile(target, options),
      queue: route.queue,
      ...buildEnvelope(route.pattern, payload),
    };
  });
  console.log('sample envelopes:');
  console.log(JSON.stringify(samplePayloads, null, 2));

  if (options.dryRun) {
    console.log('dry-run complete; nothing was published.');
    return;
  }

  const queueNames = [...new Set(targets.map((target) => resolveRoute(target, options).queue))];
  const { connection, channel } = await openRabbit(options, queueNames);

  // Start FE-style viewers AFTER RabbitMQ connection is confirmed,
  // so we don't spin them up only to abort on broker connect failure.
  const viewers = await buildViewers(options);
  const stopSignal = { stopped: false };
  const viewerPromises = viewers.map((v) => runViewerLoop(v, stopSignal, options));
  if (viewers.length > 0) {
    console.log(
      `[viewers] starting ${viewers.length} concurrent poller(s) — interval=${options.viewerPollIntervalMs}ms warmup=${options.viewerWarmupMs}ms`,
    );
  }

  try {
    let published = 0;
    const phases = usePoolAware ? poolPlan.phases : [{ name: 'main', schedule, settleMs: 0 }];

    for (const phase of phases) {
      if (phase.schedule.length === 0) continue;
      if (phase.name !== 'main') {
        console.log(`[publish] phase=${phase.name} start (${phase.schedule.length} message(s))`);
      }

      for (let start = 0; start < phase.schedule.length; start += options.batchSize) {
        const batch = phase.schedule.slice(start, start + options.batchSize);
        for (let batchIndex = 0; batchIndex < batch.length; batchIndex += 1) {
          const seq = published + batchIndex + 1;
          const target = batch[batchIndex];
          const route = resolveRoute(target, options);
          const channelProfile = detectChannelProfile(target, options);
          const payload = buildPayload(target, seq, options);
          const envelope = buildEnvelope(route.pattern, payload);
          const sent = channel.sendToQueue(route.queue, Buffer.from(JSON.stringify(envelope)), {
            contentType: 'application/json',
            persistent: true,
          });

          if (shouldLogPublish(seq, schedule.length, options)) {
            console.log(
              `[publish] ${seq}/${schedule.length} queue=${route.queue} pattern=${route.pattern} profile=${channelProfile} channelAccountId=${payload.channelAccountId} clientContactId=${payload.clientContactId} type=${payload.type}`
            );
          }

          if (!sent) {
            await new Promise((resolve) => channel.once('drain', resolve));
          }
        }

        await channel.waitForConfirms();
        published += batch.length;
        const progressLine = `[progress] ${renderProgressBar(published, schedule.length)}`;
        console.log(progressLine);
        console.log(`published ${published}/${schedule.length}`);
        await sleep(options.delayMs);
      }

      if (phase.settleMs > 0) {
        console.log(`[publish] phase=${phase.name} complete; settling ${phase.settleMs}ms before flooding repeats`);
        await sleep(phase.settleMs);
      }
    }
  } finally {
    stopSignal.stopped = true;
    await Promise.allSettled(viewerPromises);
    await channel.close().catch(() => undefined);
    await connection.close().catch(() => undefined);
  }

  console.log('publish complete.');
  printViewerSummary(viewers);
}

main().catch((error) => {
  console.error('[inbound-rmq-flood] failed:', error?.stack || error?.message || error);
  if (error?.cause) {
    const cause = error.cause;
    console.error('  caused by:', cause?.stack || cause?.message || cause);
    if (cause?.cause) {
      const inner = cause.cause;
      console.error('  inner cause:', inner?.stack || inner?.message || inner);
    }
  }
  process.exitCode = 1;
});
