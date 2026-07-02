const fs = require('fs');
const path = require('path');

/**
 * Parse a storm-reproducer subscriber file into structured buckets.
 * File format (lines):
 *   # comment lines start with #
 *   [company:<24-hex-mongo-id>]   -> starts a new company bucket
 *   <loginType>[:count]           -> subscriber entry inside current bucket
 *
 * Returns:
 *   {
 *     path,
 *     companies: [companyId, ...],
 *     entries:   [{ companyId, loginType, count }, ...],   // preserves file order & duplicates
 *     uniqueLoginTypes: [loginType, ...],                  // dedupe, first-seen order
 *   }
 */
function parseSubscriberFile(filePath) {
  const absolute = path.resolve(filePath);
  const text = fs.readFileSync(absolute, 'utf8');

  const companiesOrder = [];
  const entries = [];
  const seenLoginTypes = new Set();
  const uniqueLoginTypes = [];

  let currentCompany = null;

  const companyPattern = /^\[company:([0-9a-fA-F]{24})\]$/;
  const entryPattern = /^([A-Za-z0-9_.\-@]+)(?::(\d+))?$/;

  const lines = text.split(/\r?\n/);
  for (let lineNumber = 0; lineNumber < lines.length; lineNumber += 1) {
    const raw = lines[lineNumber];
    const line = raw.trim();

    if (!line || line.startsWith('#')) continue;

    const companyMatch = line.match(companyPattern);
    if (companyMatch) {
      currentCompany = companyMatch[1];
      if (!companiesOrder.includes(currentCompany)) {
        companiesOrder.push(currentCompany);
      }
      continue;
    }

    const entryMatch = line.match(entryPattern);
    if (!entryMatch) {
      throw new Error(
        `subscriber-file: unrecognised line ${lineNumber + 1} in ${absolute}: "${raw}"`,
      );
    }
    if (!currentCompany) {
      throw new Error(
        `subscriber-file: entry "${line}" at line ${lineNumber + 1} appears before any [company:<id>] header (${absolute})`,
      );
    }

    const loginType = entryMatch[1];
    const count = entryMatch[2] ? Number.parseInt(entryMatch[2], 10) : 1;

    entries.push({ companyId: currentCompany, loginType, count });
    if (!seenLoginTypes.has(loginType)) {
      seenLoginTypes.add(loginType);
      uniqueLoginTypes.push(loginType);
    }
  }

  return {
    path: absolute,
    companies: companiesOrder,
    entries,
    uniqueLoginTypes,
  };
}

/**
 * Resolve loginType -> credentials using the config's testAccounts registry.
 * Returns:
 *   {
 *     resolved:   [{ loginType, identifier, password, role, companyIds:[...] }, ...],
 *     unresolved: [{ loginType, companyIds:[...], reason }, ...],   // account not in config or wrong env
 *   }
 */
function resolveSubscribers(parsed, { getAccountByLoginType, env }) {
  const companiesByLoginType = new Map();
  for (const entry of parsed.entries) {
    if (!companiesByLoginType.has(entry.loginType)) {
      companiesByLoginType.set(entry.loginType, new Set());
    }
    companiesByLoginType.get(entry.loginType).add(entry.companyId);
  }

  const resolved = [];
  const unresolved = [];

  for (const loginType of parsed.uniqueLoginTypes) {
    const companyIds = Array.from(companiesByLoginType.get(loginType) || []);
    try {
      const account = getAccountByLoginType(loginType, env);
      resolved.push({
        loginType,
        identifier: account.identifier,
        password: account.password,
        role: account.role,
        companyIds,
      });
    } catch (error) {
      unresolved.push({
        loginType,
        companyIds,
        reason: (error && error.message) || String(error),
      });
    }
  }

  return { resolved, unresolved };
}

module.exports = {
  parseSubscriberFile,
  resolveSubscribers,
};
