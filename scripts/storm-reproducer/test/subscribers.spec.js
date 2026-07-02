'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');

const subscriberModule = require(path.resolve(
  __dirname, '..', 'lib', 'subscribers.js',
));

describe('storm-reproducer subscriber spec helpers', () => {
  const {
    countRequestedSubscribers,
    normalizeSubscriberSpecText,
    parseSubscriberSpec,
    resolveSubscriberSpec,
  } = subscriberModule;

  it('parses csv subscriber spec with counts', () => {
    assert.deepEqual(parseSubscriberSpec('admintest:1,cx001:4,cx002:4'), [
      { loginType: 'admintest', count: 1 },
      { loginType: 'cx001', count: 4 },
      { loginType: 'cx002', count: 4 },
    ]);
    assert.equal(countRequestedSubscribers('admintest:1,cx001:4,cx002:4'), 9);
  });

  it('normalizes file-style text with comments and one entry per line', () => {
    const text = 'admintest:1\n# comment\ncx001:4\n\ncx002:4\n';
    assert.equal(normalizeSubscriberSpecText(text), 'admintest:1,cx001:4,cx002:4');
  });

  it('resolves subscriber spec from @file shorthand', () => {
    const tmpPath = path.join(os.tmpdir(), `storm-subs-${Date.now()}.txt`);
    fs.writeFileSync(tmpPath, 'admintest:1\ncx001:4\ncx002:4\n', 'utf8');
    const resolved = resolveSubscriberSpec({ subscribers: `@${tmpPath}` });
    assert.equal(resolved.resolvedPath, path.resolve(tmpPath));
    assert.equal(resolved.spec, 'admintest:1,cx001:4,cx002:4');
    fs.unlinkSync(tmpPath);
  });

  it('resolves subscriber spec from explicit subscribersFile option', () => {
    const tmpPath = path.join(os.tmpdir(), `storm-subs-${Date.now()}-2.txt`);
    fs.writeFileSync(tmpPath, 'admintest:1\ncx001:4\n', 'utf8');
    const resolved = resolveSubscriberSpec({ subscribersFile: tmpPath });
    assert.equal(resolved.resolvedPath, path.resolve(tmpPath));
    assert.equal(resolved.spec, 'admintest:1,cx001:4');
    fs.unlinkSync(tmpPath);
  });
});
