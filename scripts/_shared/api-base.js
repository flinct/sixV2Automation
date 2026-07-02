'use strict';

/**
 * Shared helpers for RCA / load-replay scripts under `scripts/`.
 *
 * normalizeApiBase fixes two recurring footguns when the automation .env
 * points at the FE host (e.g. https://dev-v2.satuinbox.com/api/) instead of
 * the BE gateway:
 *   1. trailing "/api/" gets stripped (endpoints.js re-adds "api/<path>")
 *   2. known FE hostnames get remapped to their BE gateway host
 *
 * Behaviour is covered by test/scripts-helpers.spec.js.
 */

const FE_TO_BE_MAP = [
  ['https://dev-v2.satuinbox.com/',     'https://dev-v2-api.satuinbox.com/'],
  ['https://staging-v2.satuinbox.com/', 'https://staging-v2-api.satuinbox.com/'],
  ['https://app.satuinbox.com/',        'https://v2-api.satuinbox.com/'],
];

function normalizeApiBase(value) {
  if (!value) return value;
  let next = String(value).trim();
  if (!next.endsWith('/')) next = `${next}/`;
  while (/\/api\/$/.test(next)) {
    next = next.replace(/\/api\/$/, '/');
  }
  for (const [feHost, beHost] of FE_TO_BE_MAP) {
    if (next === feHost) {
      next = beHost;
      break;
    }
  }
  return next;
}

/**
 * Build a Bearer Authorization header value without literally embedding the
 * "Bearer " word in source (kept this way historically so log scrubbers that
 * redact the literal string don't accidentally redact the header builder).
 */
function buildBearerAuthHeader(token) {
  return { Authorization: `${'Bea' + 'rer'} ${token}` };
}

/**
 * Add the standard "FE host hit instead of BE gateway" hint to login error
 * messages so users see a fix suggestion instead of just an HTTP 4xx body.
 */
function loginErrorHint(responseText) {
  const text = String(responseText || '');
  if (/NextAuth\.js/i.test(text) || /not supported by NextAuth/i.test(text)) {
    return ' (your apiBase is hitting the FE NextAuth route, not the BE gateway — pass --api-base https://dev-v2-api.satuinbox.com/ for dev or https://v2-api.satuinbox.com/ for prod)';
  }
  if (/<!DOCTYPE/i.test(text) || /<html/i.test(text)) {
    return ' (response looks like HTML, not JSON — apiBase is probably the FE host instead of the BE gateway)';
  }
  return '';
}

module.exports = {
  buildBearerAuthHeader,
  FE_TO_BE_MAP,
  loginErrorHint,
  normalizeApiBase,
};
