'use strict';

const fs = require('node:fs');
const path = require('node:path');

const SECTION_RE = /^\[\s*company\s*:\s*([^\]]+?)\s*\]$/i;

function stripInlineComment(line) {
  const hashAt = line.indexOf('#');
  return hashAt === -1 ? line : line.slice(0, hashAt);
}

function normalizeEntry(raw) {
  const trimmed = String(raw).trim();
  if (!trimmed) return null;
  const [loginType, rawCount] = trimmed.split(':');
  const login = loginType.trim();
  if (!login) return null;
  let count = 1;
  if (rawCount !== undefined) {
    const parsed = parseInt(rawCount, 10);
    if (Number.isFinite(parsed) && parsed > 0) count = parsed;
  }
  return { loginType: login, count };
}

/**
 * Parse a subscriber spec text with optional [company:<id>] section headers.
 *
 * - Lines starting with `#` are comments.
 * - `[company:<id>]` starts a section; all following entries belong to that
 *   company until the next section header.
 * - Entries before any section header belong to bucket "unknown".
 * - CSV on a single line is also supported (backward compat with inline env).
 *
 * @param {string|null|undefined} text
 * @returns {Array<{ companyId: string, loginType: string, count: number }>}
 */
function parseMultiCompanySpecText(text) {
  if (!text) return [];
  const source = String(text);
  const lines = source.split(/\r?\n/);

  const hasSection = lines.some((line) => SECTION_RE.test(stripInlineComment(line).trim()));
  const hasNewline = /\r?\n/.test(source);

  // Pure inline CSV (single line, no section headers) → backward compat path.
  if (!hasSection && !hasNewline && source.includes(',')) {
    return source
      .split(',')
      .map((piece) => normalizeEntry(piece))
      .filter(Boolean)
      .map((entry) => ({ companyId: 'unknown', ...entry }));
  }

  const out = [];
  let currentCompany = 'unknown';
  for (const rawLine of lines) {
    const withoutComment = stripInlineComment(rawLine).trim();
    if (!withoutComment) continue;

    const sectionMatch = SECTION_RE.exec(withoutComment);
    if (sectionMatch) {
      currentCompany = sectionMatch[1].trim() || 'unknown';
      continue;
    }

    // Each line may itself contain CSV.
    for (const piece of withoutComment.split(',')) {
      const entry = normalizeEntry(piece);
      if (entry) out.push({ companyId: currentCompany, ...entry });
    }
  }
  return out;
}

function readSpecFile(filePath) {
  const resolvedPath = path.resolve(filePath);
  const raw = fs.readFileSync(resolvedPath, 'utf8');
  const entries = parseMultiCompanySpecText(raw);
  if (entries.length === 0) {
    throw new Error(`Subscriber spec file is empty (or only comments): ${resolvedPath}`);
  }
  return { resolvedPath, entries };
}

/**
 * Resolve a subscriber spec input into an entries array.
 *
 * Priority:
 *   1. `subscribersFile` (explicit path)
 *   2. `subscribers` starting with `@` (shorthand file path)
 *   3. `subscribers` inline (CSV or multiline text)
 *
 * @param {{ subscribers?: string, subscribersFile?: string }} input
 * @returns {{ resolvedPath: (string|null), entries: Array<{companyId:string, loginType:string, count:number}> }}
 */
function resolveMultiCompanySubscriberSpec(input = {}) {
  const subscribersFile = String(input.subscribersFile || '').trim();
  const subscribers = String(input.subscribers || '').trim();

  if (subscribersFile) {
    return readSpecFile(subscribersFile);
  }
  if (subscribers.startsWith('@')) {
    return readSpecFile(subscribers.slice(1));
  }
  const entries = parseMultiCompanySpecText(subscribers);
  return { resolvedPath: null, entries };
}

module.exports = {
  parseMultiCompanySpecText,
  resolveMultiCompanySubscriberSpec,
};
