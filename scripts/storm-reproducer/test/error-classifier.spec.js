'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');

const {
  classifyFetchError,
  resolveStatusKey,
} = require(path.resolve(
  __dirname, '..', 'lib', 'error-classifier.js',
));

describe('storm-reproducer error classifier', () => {
  describe('classifyFetchError', () => {
    it('classifies AbortError as TIMEOUT', () => {
      const err = new Error('The operation was aborted');
      err.name = 'AbortError';
      const info = classifyFetchError(err);
      assert.equal(info.errorCode, 'TIMEOUT');
      assert.equal(info.message, 'The operation was aborted');
    });

    it('classifies undici fetch failed with ECONNRESET cause', () => {
      const inner = new Error('read ECONNRESET');
      inner.code = 'ECONNRESET';
      const err = new TypeError('fetch failed');
      err.cause = inner;
      const info = classifyFetchError(err);
      assert.equal(info.errorCode, 'ECONNRESET');
      assert.equal(info.causeCode, 'ECONNRESET');
    });

    it('classifies undici fetch failed with ECONNREFUSED cause', () => {
      const inner = new Error('connect ECONNREFUSED 127.0.0.1:443');
      inner.code = 'ECONNREFUSED';
      const err = new TypeError('fetch failed');
      err.cause = inner;
      const info = classifyFetchError(err);
      assert.equal(info.errorCode, 'ECONNREFUSED');
      assert.equal(info.causeCode, 'ECONNREFUSED');
    });

    it('classifies undici UND_ERR_SOCKET cause', () => {
      const inner = new Error('other side closed');
      inner.code = 'UND_ERR_SOCKET';
      const err = new TypeError('fetch failed');
      err.cause = inner;
      const info = classifyFetchError(err);
      assert.equal(info.errorCode, 'UND_ERR_SOCKET');
    });

    it('classifies undici UND_ERR_CONNECT_TIMEOUT cause as TIMEOUT', () => {
      const inner = new Error('Connect Timeout Error');
      inner.code = 'UND_ERR_CONNECT_TIMEOUT';
      const err = new TypeError('fetch failed');
      err.cause = inner;
      const info = classifyFetchError(err);
      assert.equal(info.errorCode, 'TIMEOUT');
      assert.equal(info.causeCode, 'UND_ERR_CONNECT_TIMEOUT');
    });

    it('falls back to FETCH_FAILED when cause has no code, keeping the cause message for RCA', () => {
      const inner = new Error('some transport problem');
      const err = new TypeError('fetch failed');
      err.cause = inner;
      const info = classifyFetchError(err);
      assert.equal(info.errorCode, 'FETCH_FAILED');
      assert.equal(info.message, 'some transport problem');
    });

    it('falls back to UNKNOWN when input is neither Error nor recognisable', () => {
      const info = classifyFetchError('boom');
      assert.equal(info.errorCode, 'UNKNOWN');
      assert.equal(info.message, 'boom');
    });

    it('handles null/undefined without throwing', () => {
      assert.equal(classifyFetchError(null).errorCode, 'UNKNOWN');
      assert.equal(classifyFetchError(undefined).errorCode, 'UNKNOWN');
    });
  });

  describe('resolveStatusKey', () => {
    it('returns HTTP status string when status > 0', () => {
      assert.equal(resolveStatusKey({ status: 200, errorCode: null }), '200');
      assert.equal(resolveStatusKey({ status: 403, errorCode: null }), '403');
      assert.equal(resolveStatusKey({ status: 500, errorCode: null }), '500');
    });

    it('returns errorCode when status is 0 (Opsi A: no "0" bucket)', () => {
      assert.equal(resolveStatusKey({ status: 0, errorCode: 'TIMEOUT' }), 'TIMEOUT');
      assert.equal(resolveStatusKey({ status: 0, errorCode: 'ECONNRESET' }), 'ECONNRESET');
      assert.equal(resolveStatusKey({ status: 0, errorCode: 'FETCH_FAILED' }), 'FETCH_FAILED');
    });

    it('falls back to UNKNOWN when status is 0 and no errorCode is set', () => {
      assert.equal(resolveStatusKey({ status: 0, errorCode: null }), 'UNKNOWN');
      assert.equal(resolveStatusKey({ status: 0 }), 'UNKNOWN');
      assert.equal(resolveStatusKey({}), 'UNKNOWN');
    });
  });
});
