'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');

const sharedModule = require(path.resolve(
  __dirname, '..', 'api-base.js',
));

describe('scripts/_shared/api-base.js', () => {
  describe('normalizeApiBase', () => {
    const { normalizeApiBase } = sharedModule;

    it('maps the FE dev host (with bogus /api/ tail) to the BE gateway host', () => {
      assert.equal(
        normalizeApiBase('https://dev-v2.satuinbox.com/api/'),
        'https://dev-v2-api.satuinbox.com/',
      );
    });

    it('maps the FE dev host (no /api/ tail) to the BE gateway host', () => {
      assert.equal(
        normalizeApiBase('https://dev-v2.satuinbox.com/'),
        'https://dev-v2-api.satuinbox.com/',
      );
      assert.equal(
        normalizeApiBase('https://dev-v2.satuinbox.com'),
        'https://dev-v2-api.satuinbox.com/',
      );
    });

    it('maps the FE staging host to the staging BE gateway', () => {
      assert.equal(
        normalizeApiBase('https://staging-v2.satuinbox.com/'),
        'https://staging-v2-api.satuinbox.com/',
      );
    });

    it('maps the FE prod host to the prod BE gateway', () => {
      assert.equal(
        normalizeApiBase('https://app.satuinbox.com/'),
        'https://v2-api.satuinbox.com/',
      );
    });

    it('leaves BE hosts untouched', () => {
      assert.equal(
        normalizeApiBase('https://dev-v2-api.satuinbox.com/'),
        'https://dev-v2-api.satuinbox.com/',
      );
      assert.equal(
        normalizeApiBase('https://v2-api.satuinbox.com/'),
        'https://v2-api.satuinbox.com/',
      );
    });

    it('strips a stray /api/ tail on BE hosts without remapping them elsewhere', () => {
      assert.equal(
        normalizeApiBase('https://dev-v2-api.satuinbox.com/api/'),
        'https://dev-v2-api.satuinbox.com/',
      );
    });

    it('leaves unknown hosts untouched (just normalizes the trailing slash)', () => {
      assert.equal(normalizeApiBase('http://localhost:3000/'), 'http://localhost:3000/');
      assert.equal(normalizeApiBase('http://localhost:3000'),  'http://localhost:3000/');
    });

    it('handles empty/undefined/null input without throwing', () => {
      assert.equal(normalizeApiBase(''), '');
      assert.equal(normalizeApiBase(undefined), undefined);
      assert.equal(normalizeApiBase(null), null);
    });
  });

  describe('buildBearerAuthHeader', () => {
    const { buildBearerAuthHeader } = sharedModule;

    it('returns an Authorization header with a Bearer prefix and the supplied token', () => {
      const headers = buildBearerAuthHeader('SECRET_TOKEN_VALUE');
      assert.deepEqual(headers, { Authorization: 'Bearer SECRET_TOKEN_VALUE' });
    });
  });

  describe('loginErrorHint', () => {
    const { loginErrorHint } = sharedModule;

    it('hints at FE/BE confusion when the body mentions NextAuth.js', () => {
      const hint = loginErrorHint('Error: This action with HTTP POST is not supported by NextAuth.js');
      assert.match(hint, /FE NextAuth/);
      assert.match(hint, /dev-v2-api\.satuinbox\.com/);
    });

    it('hints at FE host when the response looks like HTML', () => {
      const hint = loginErrorHint('<!DOCTYPE html><html><head>...');
      assert.match(hint, /HTML/);
    });

    it('returns empty string when nothing matches', () => {
      assert.equal(loginErrorHint('{"message":"some json error"}'), '');
      assert.equal(loginErrorHint(''), '');
      assert.equal(loginErrorHint(undefined), '');
    });
  });
});
