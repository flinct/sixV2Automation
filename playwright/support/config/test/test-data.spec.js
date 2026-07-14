'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');

// Load test-data fresh so we control process.env before require caches it.
function loadTestData(envOverrides) {
  delete require.cache[require.resolve(
    path.resolve(__dirname, '..', 'test-data.js'),
  )];
  const prev = {};
  for (const key of Object.keys(envOverrides || {})) {
    prev[key] = process.env[key];
    if (envOverrides[key] === undefined) delete process.env[key];
    else process.env[key] = envOverrides[key];
  }
  const mod = require(path.resolve(__dirname, '..', 'test-data.js'));
  return { mod, prev };
}

describe('playwright/support/config/test-data.js credential guard', () => {
  it('throws with env var names when identifier/password unresolved', () => {
    // Force testerdummy01 env vars to be missing.
    const { mod } = loadTestData({
      E2E_PROD_TESTER_USER: '',
      E2E_PROD_TESTER_PASSWORD: '',
    });
    assert.throws(
      () => mod.getAccountByLoginType('testerdummy01', 'dev'),
      (err) =>
        /unresolved credentials/.test(err.message) &&
        /E2E_PROD_TESTER_USER/.test(err.message) &&
        /E2E_PROD_TESTER_PASSWORD/.test(err.message),
    );
  });

  it('returns credentials when env vars are resolved', () => {
    const { mod } = loadTestData({
      E2E_PROD_TESTER_USER: 'someone@example.com',
      E2E_PROD_TESTER_PASSWORD: 'not-replace-me',
    });
    const creds = mod.getAccountByLoginType('testerdummy01', 'dev');
    assert.equal(creds.identifier, 'someone@example.com');
    assert.equal(creds.password, 'not-replace-me');
  });
});
