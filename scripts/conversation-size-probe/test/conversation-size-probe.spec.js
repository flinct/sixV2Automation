'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');

const probeModule = require(path.resolve(
  __dirname, '..', 'conversation-size-probe.js',
));

describe('conversation-size-probe re-export', () => {
  it('still re-exports normalizeApiBase for backwards compatibility', () => {
    assert.equal(typeof probeModule.normalizeApiBase, 'function');
    assert.equal(
      probeModule.normalizeApiBase('https://dev-v2.satuinbox.com/api/'),
      'https://dev-v2-api.satuinbox.com/',
    );
  });
});
