'use strict';

const fs = require('node:fs');
const path = require('node:path');

const { resolveMultiCompanySubscriberSpec } = require('./subscribers-multi');

function normalizeSubscriberSpecText(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, '').trim())
    .filter((line) => line && !/^\[\s*company\s*:/i.test(line))
    .join(',');
}

function loadSubscriberSpecFromFile(filePath) {
  if (!filePath) {
    throw new Error('Subscriber spec file path is required');
  }
  const resolvedPath = path.resolve(filePath);
  const raw = fs.readFileSync(resolvedPath, 'utf8');
  const normalized = normalizeSubscriberSpecText(raw);
  if (!normalized) {
    throw new Error(`Subscriber spec file is empty: ${resolvedPath}`);
  }
  return { resolvedPath, spec: normalized };
}

function resolveSubscriberSpec(input = {}) {
  const subscribersFile = String(input.subscribersFile || '').trim();
  const subscribers = String(input.subscribers || '').trim();

  // Multi-company aware: entries carry companyId + backward-compat spec string.
  const multi = resolveMultiCompanySubscriberSpec({ subscribers, subscribersFile });
  const flatSpec = multi.entries
    .map((entry) => `${entry.loginType}:${entry.count}`)
    .join(',');
  return {
    resolvedPath: multi.resolvedPath,
    spec: flatSpec,
    entries: multi.entries,
  };
}

function parseSubscriberSpec(spec) {
  return String(spec)
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [loginType, rawCount] = entry.split(':');
      const count = rawCount ? Math.max(1, parseInt(rawCount, 10) || 1) : 1;
      return { loginType: loginType.trim(), count };
    });
}

function countRequestedSubscribers(spec) {
  return parseSubscriberSpec(spec).reduce((acc, item) => acc + item.count, 0);
}

module.exports = {
  countRequestedSubscribers,
  loadSubscriberSpecFromFile,
  normalizeSubscriberSpecText,
  parseSubscriberSpec,
  resolveSubscriberSpec,
};
