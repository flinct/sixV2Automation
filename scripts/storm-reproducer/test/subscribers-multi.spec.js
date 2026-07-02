'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');

const {
  parseMultiCompanySpecText,
  resolveMultiCompanySubscriberSpec,
} = require(path.resolve(
  __dirname, '..', 'lib', 'subscribers-multi.js',
));

describe('storm-reproducer multi-company subscriber parser', () => {
  describe('parseMultiCompanySpecText', () => {
    it('parses [company:<id>] sections into per-company entries', () => {
      const text = [
        '[company:A1]',
        'admintest:1',
        'bdbagent01:4',
        '[company:B2]',
        'cx001:4',
      ].join('\n');
      assert.deepEqual(parseMultiCompanySpecText(text), [
        { companyId: 'A1', loginType: 'admintest', count: 1 },
        { companyId: 'A1', loginType: 'bdbagent01', count: 4 },
        { companyId: 'B2', loginType: 'cx001', count: 4 },
      ]);
    });

    it('assigns "unknown" to entries before any section header', () => {
      const text = 'admintest:1\n[company:B2]\ncx001:4\n';
      assert.deepEqual(parseMultiCompanySpecText(text), [
        { companyId: 'unknown', loginType: 'admintest', count: 1 },
        { companyId: 'B2', loginType: 'cx001', count: 4 },
      ]);
    });

    it('flat list without any [company:] header stays flat under "unknown"', () => {
      const text = 'admintest:1\ncx001:4';
      assert.deepEqual(parseMultiCompanySpecText(text), [
        { companyId: 'unknown', loginType: 'admintest', count: 1 },
        { companyId: 'unknown', loginType: 'cx001', count: 4 },
      ]);
    });

    it('ignores comments, blanks, and inline whitespace', () => {
      const text = [
        '# top comment',
        '',
        '[company:A1]',
        '  admintest:1  ',
        '# ignored',
        '',
        'bdbagent01:4',
        '[company:B2]',
        'cx001:4',
      ].join('\n');
      assert.deepEqual(parseMultiCompanySpecText(text), [
        { companyId: 'A1', loginType: 'admintest', count: 1 },
        { companyId: 'A1', loginType: 'bdbagent01', count: 4 },
        { companyId: 'B2', loginType: 'cx001', count: 4 },
      ]);
    });

    it('defaults count to 1 when omitted', () => {
      const text = '[company:A1]\nadmintest\n';
      assert.deepEqual(parseMultiCompanySpecText(text), [
        { companyId: 'A1', loginType: 'admintest', count: 1 },
      ]);
    });

    it('coerces bogus counts to at least 1', () => {
      const text = '[company:A1]\nadmintest:0\nbdbagent01:-4\ncx001:abc\n';
      assert.deepEqual(parseMultiCompanySpecText(text), [
        { companyId: 'A1', loginType: 'admintest', count: 1 },
        { companyId: 'A1', loginType: 'bdbagent01', count: 1 },
        { companyId: 'A1', loginType: 'cx001', count: 1 },
      ]);
    });

    it('handles CRLF line endings', () => {
      const text = '[company:A1]\r\nadmintest:1\r\n[company:B2]\r\ncx001:4\r\n';
      assert.deepEqual(parseMultiCompanySpecText(text), [
        { companyId: 'A1', loginType: 'admintest', count: 1 },
        { companyId: 'B2', loginType: 'cx001', count: 4 },
      ]);
    });

    it('trims whitespace inside section headers', () => {
      const text = '[company:  A1  ]\nadmintest:1\n';
      assert.deepEqual(parseMultiCompanySpecText(text), [
        { companyId: 'A1', loginType: 'admintest', count: 1 },
      ]);
    });

    it('accepts inline CSV via a single line (backward compat)', () => {
      const text = 'admintest:1,cx001:4,cx002:4';
      assert.deepEqual(parseMultiCompanySpecText(text), [
        { companyId: 'unknown', loginType: 'admintest', count: 1 },
        { companyId: 'unknown', loginType: 'cx001', count: 4 },
        { companyId: 'unknown', loginType: 'cx002', count: 4 },
      ]);
    });

    it('returns empty array for empty text', () => {
      assert.deepEqual(parseMultiCompanySpecText(''), []);
      assert.deepEqual(parseMultiCompanySpecText(null), []);
      assert.deepEqual(parseMultiCompanySpecText(undefined), []);
    });
  });

  describe('resolveMultiCompanySubscriberSpec', () => {
    it('reads from an explicit file path', () => {
      const tmp = path.join(os.tmpdir(), `storm-multi-${Date.now()}.txt`);
      fs.writeFileSync(tmp, '[company:A1]\nadmintest:1\n[company:B2]\ncx001:4\n', 'utf8');
      const resolved = resolveMultiCompanySubscriberSpec({ subscribersFile: tmp });
      assert.equal(resolved.resolvedPath, path.resolve(tmp));
      assert.deepEqual(resolved.entries, [
        { companyId: 'A1', loginType: 'admintest', count: 1 },
        { companyId: 'B2', loginType: 'cx001', count: 4 },
      ]);
      fs.unlinkSync(tmp);
    });

    it('reads from @file shorthand in subscribers arg', () => {
      const tmp = path.join(os.tmpdir(), `storm-multi-at-${Date.now()}.txt`);
      fs.writeFileSync(tmp, '[company:A1]\nadmintest:1\n', 'utf8');
      const resolved = resolveMultiCompanySubscriberSpec({ subscribers: `@${tmp}` });
      assert.equal(resolved.resolvedPath, path.resolve(tmp));
      assert.deepEqual(resolved.entries, [
        { companyId: 'A1', loginType: 'admintest', count: 1 },
      ]);
      fs.unlinkSync(tmp);
    });

    it('parses inline CSV as unknown-company entries', () => {
      const resolved = resolveMultiCompanySubscriberSpec({ subscribers: 'admintest:1,cx001:4' });
      assert.equal(resolved.resolvedPath, null);
      assert.deepEqual(resolved.entries, [
        { companyId: 'unknown', loginType: 'admintest', count: 1 },
        { companyId: 'unknown', loginType: 'cx001', count: 4 },
      ]);
    });

    it('throws when the referenced file is empty', () => {
      const tmp = path.join(os.tmpdir(), `storm-multi-empty-${Date.now()}.txt`);
      fs.writeFileSync(tmp, '# only comments\n\n', 'utf8');
      assert.throws(
        () => resolveMultiCompanySubscriberSpec({ subscribersFile: tmp }),
        /empty/i,
      );
      fs.unlinkSync(tmp);
    });
  });
});
