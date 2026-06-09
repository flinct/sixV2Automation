const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'playwright', 'support', 'config', 'conversation-testcases.generated.json');
const MAP_JSON_PATH = path.join(ROOT, 'playwright', 'support', 'config', 'conversation-automation-map.generated.json');
const MAP_JS_PATH = path.join(ROOT, 'playwright', 'support', 'config', 'conversation-automation-map.generated.js');
const SPEC_PATH = path.join(ROOT, 'playwright', 'tests', 'e2e', 'conversation', 'conversation-sync.spec.js');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function bucketFor(test) {
  const text = `${test.feature_group || ''} ${test.scenario || ''} ${test.description || ''}`.toLowerCase();

  if (/conversation history|history section|conversations events accordion/.test(text)) return 'conversation/conversation-history.spec.js';
  if (/sla|frt|ttc|rlt|wait time/.test(text)) return 'conversation/sla-metrics.spec.js';
  if (/ticket|linked bubble|create ticket|link(ed)? ticket/.test(text)) return 'ticket/linked-bubble.spec.js';
  if (/agent validation|assignee|channel source|conversation status|member mention|conversation details|conversation attributes accordion|custom attributes accordion|client data accordion|client tags accordion|verify initial\/photo icon|verify customer name|verify lifeness indicator|verify ellipsis/.test(text)) {
    return 'conversation/agent-validation.spec.js';
  }
  if (/empty state/.test(text)) return 'conversation/empty-state.spec.js';
  if (/inbox navigation|conversation list|chat list|filter|sort|junk|trash|starred|spam|all conversation|your inbox|unassigned|channel navigation|team navigation|navigation general behavior|get new conversation|agent pull queue/.test(text)) {
    return 'conversation/chat-list.spec.js';
  }
  if (/bubble chat|message input|typing indicator|delivery status|timestamp|open media|screenshot|notes accordion|pinned message|quick action|reply message|private note|conversation room|group chat|set reminder|media accordion|files accordion|verify infinite scroll|group handling/.test(text)) {
    return 'conversation/inbound-outbound.spec.js';
  }
  if (/login|onboarding|register/.test(text)) return 'auth/login.spec.js';
  return null;
}

function ensureDir(p) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
}

function writeJson(p, data) {
  ensureDir(p);
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function writeJsModule(p, data) {
  ensureDir(p);
  fs.writeFileSync(p, 'module.exports = ' + JSON.stringify(data, null, 2) + ';\n', 'utf8');
}

function makeSpec(mapping) {
  return `const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const manifest = require('../../../support/config/conversation-testcases.generated.json');
const mappingData = require('../../../support/config/conversation-automation-map.generated.js');

const repoRoot = path.resolve(__dirname, '../../../..');
const existingSpecs = [
  'playwright/tests/e2e/conversation/chat-list.spec.js',
  'playwright/tests/e2e/conversation/inbound-outbound.spec.js',
  'playwright/tests/e2e/conversation/conversation-history.spec.js',
  'playwright/tests/e2e/conversation/sla-metrics.spec.js',
  'playwright/tests/e2e/conversation/agent-validation.spec.js',
  'playwright/tests/e2e/conversation/empty-state.spec.js',
  'playwright/tests/e2e/ticket/linked-bubble.spec.js',
];

test.describe('Conversation testcase automation sync', () => {
  test('manifest counts should match PRDanalisis summary', async () => {
    const total = manifest.length;
    const developed = manifest.filter(t => t.developed).length;
    const undeveloped = manifest.filter(t => t.undeveloped_label).length;

    expect(total).toBe(725);
    expect(developed).toBe(702);
    expect(undeveloped).toBe(23);
    expect(mappingData.summary.total).toBe(total);
    expect(mappingData.summary.developed).toBe(developed);
    expect(mappingData.summary.undeveloped).toBe(undeveloped);
  });

  test('every developed testcase should have an automation bucket', async () => {
    const unmapped = mappingData.items.filter(item => item.developed && !item.automation_bucket);
    expect(unmapped, JSON.stringify(unmapped.slice(0, 10), null, 2)).toHaveLength(0);
  });

  test('undeveloped testcases must remain marked as fixme', async () => {
    const wrong = mappingData.items.filter(item => item.undeveloped_label && item.automation_mode !== 'fixme');
    expect(wrong, JSON.stringify(wrong.slice(0, 10), null, 2)).toHaveLength(0);
  });

  test('existing bucket specs should be present in the automation repo', async () => {
    const missing = existingSpecs.filter(rel => !fs.existsSync(path.join(repoRoot, rel)));
    expect(missing, JSON.stringify(missing, null, 2)).toHaveLength(0);
  });
});
`;
}

function main() {
  const manifest = readJson(MANIFEST_PATH);
  const items = manifest.map(test => {
    const automation_bucket = bucketFor(test);
    const automation_mode = test.undeveloped_label ? 'fixme' : (automation_bucket ? 'active' : 'unmapped');
    return {
      ...test,
      automation_bucket,
      automation_mode,
    };
  });

  const summary = {
    total: items.length,
    developed: items.filter(x => x.developed).length,
    undeveloped: items.filter(x => x.undeveloped_label).length,
    mapped: items.filter(x => x.automation_bucket).length,
    unmapped: items.filter(x => !x.automation_bucket).length,
  };

  const output = { summary, items };
  writeJson(MAP_JSON_PATH, output);
  writeJsModule(MAP_JS_PATH, output);
  ensureDir(SPEC_PATH);
  fs.writeFileSync(SPEC_PATH, makeSpec(output), 'utf8');

  console.log(JSON.stringify({
    manifest: MANIFEST_PATH,
    map_json: MAP_JSON_PATH,
    map_js: MAP_JS_PATH,
    spec: SPEC_PATH,
    ...summary,
  }, null, 2));
}

main();
