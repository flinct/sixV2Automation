'use strict';

/**
 * Classify a low-level fetch/network error into a stable errorCode string.
 *
 * Node 18+ `fetch` (undici) usually throws `TypeError: fetch failed` and hides
 * the real reason on `.cause` with codes like ECONNRESET / ECONNREFUSED /
 * UND_ERR_SOCKET / UND_ERR_CONNECT_TIMEOUT. AbortError is used when our own
 * AbortController times the request out.
 *
 * We surface an application-facing errorCode so the summary reads:
 *   statuses={"TIMEOUT":1}
 *   statuses={"ECONNRESET":1}
 * instead of the misleading:
 *   statuses={"0":1}
 */

const TIMEOUT_CAUSE_CODES = new Set([
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT',
  'UND_ERR_BODY_TIMEOUT',
  'ETIMEDOUT',
]);

function pickCauseCode(err) {
  const cause = err && typeof err === 'object' ? err.cause : null;
  if (!cause || typeof cause !== 'object') return null;
  return cause.code || cause.errno || null;
}

function pickCauseMessage(err) {
  const cause = err && typeof err === 'object' ? err.cause : null;
  if (!cause || typeof cause !== 'object') return null;
  return typeof cause.message === 'string' ? cause.message : null;
}

/**
 * @param {unknown} err
 * @returns {{ errorCode: string, causeCode: (string|null), message: string }}
 */
function classifyFetchError(err) {
  if (err === null || err === undefined) {
    return { errorCode: 'UNKNOWN', causeCode: null, message: '' };
  }

  if (typeof err === 'string') {
    return { errorCode: 'UNKNOWN', causeCode: null, message: err };
  }

  const name = err.name || '';
  const message = typeof err.message === 'string' ? err.message : String(err);
  const causeCode = pickCauseCode(err);
  const causeMessage = pickCauseMessage(err);

  if (name === 'AbortError') {
    return { errorCode: 'TIMEOUT', causeCode, message };
  }

  if (causeCode) {
    if (TIMEOUT_CAUSE_CODES.has(causeCode)) {
      return { errorCode: 'TIMEOUT', causeCode, message };
    }
    return { errorCode: causeCode, causeCode, message };
  }

  if (message === 'fetch failed' || message.startsWith('fetch failed')) {
    return { errorCode: 'FETCH_FAILED', causeCode: null, message: causeMessage || message };
  }

  if (message) {
    return { errorCode: 'UNKNOWN', causeCode: null, message };
  }

  return { errorCode: 'UNKNOWN', causeCode: null, message: String(err) };
}

/**
 * Resolve the bucket key used in `statuses={...}` summaries.
 *
 * Opsi A: when transport failed (status === 0), replace the misleading "0"
 * key with the classifier's errorCode (TIMEOUT / ECONNRESET / FETCH_FAILED /
 * UND_ERR_SOCKET / etc.). HTTP responses keep their numeric status string.
 *
 * @param {{ status: number, errorCode?: (string|null) }} result
 * @returns {string}
 */
function resolveStatusKey(result) {
  const status = result && typeof result.status === 'number' ? result.status : 0;
  if (status > 0) return String(status);
  const errorCode = result && result.errorCode ? String(result.errorCode) : null;
  if (errorCode) return errorCode;
  return 'UNKNOWN';
}

module.exports = {
  classifyFetchError,
  resolveStatusKey,
};
