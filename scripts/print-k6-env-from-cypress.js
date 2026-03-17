#!/usr/bin/env node
/**
 * Print PowerShell env assignments for k6 from Cypress config.
 *
 * Usage (PowerShell):
 *   $env:BASE_URL="https://dev-v2.satuinbox.com"
 *   $env:CYPRESS_loginType="cekerayam01"
 *   node scripts/print-k6-env-from-cypress.js | Invoke-Expression
 *
 * Produces:
 *   $env:X_API_KEY="..."
 *   $env:LOGIN_IDENTIFIER="..." (or LOGIN_KEYWORD)
 *   $env:LOGIN_PASSWORD="..."
 *   $env:API_BASE="..." (derived from env_config(baseUrl))
 */

const path = require("path");
const { pathToFileURL } = require("url");

function q(v) {
  // PowerShell double-quoted string escaping: `" and `$
  return String(v)
    .replace(/`/g, "``")
    .replace(/\$/g, "`$")
    .replace(/\"/g, "`\"")
    .replace(/\r/g, "")
    .replace(/\n/g, "");
}

async function main() {
  const baseUrl = process.env.BASE_URL;
  const loginType = process.env.CYPRESS_loginType;

  if (!baseUrl) throw new Error("Missing BASE_URL");
  if (!loginType) throw new Error("Missing CYPRESS_loginType");

  const filePath = path.resolve(__dirname, "../cypress/support/01_url_page.js");
  const mod = await import(pathToFileURL(filePath).href);
  const env_config = mod?.env_config;
  if (typeof env_config !== "function") {
    throw new Error("Unable to load env_config() from cypress/support/01_url_page.js");
  }

  const cfg = env_config(baseUrl);

  const headers = cfg?.headers || {};
  const xApiKey = headers["x-api-key"] || "";

  const key = `loginBody_${loginType}`;
  const body = cfg?.[key];
  if (!body) {
    throw new Error(`login mapping not found for ${key}`);
  }

  const identifier = body.identifier || "";
  const keyword = body.keyword || "";
  const password = body.password || "";

  if (!password || (!identifier && !keyword)) {
    throw new Error(`login mapping ${key} is missing identifier/keyword or password`);
  }

  // API base: derive from loginUrl if present.
  // loginUrl in cfg is like `${base}api/auth/login`.
  const loginUrl = cfg?.loginUrl;
  let apiBase = "";
  if (typeof loginUrl === "string" && loginUrl.includes("/api/auth/login")) {
    apiBase = loginUrl.split("/api/auth/login")[0] + "/";
  }

  // Print PowerShell env assignments (one per line) so caller can pipe to Invoke-Expression.
  // NOTE: This prints secrets; do not paste output to chat.
  if (xApiKey) console.log(`$env:X_API_KEY=\"${q(xApiKey)}\"`);
  if (identifier) console.log(`$env:LOGIN_IDENTIFIER=\"${q(identifier)}\"`);
  if (keyword) console.log(`$env:LOGIN_KEYWORD=\"${q(keyword)}\"`);
  console.log(`$env:LOGIN_PASSWORD=\"${q(password)}\"`);
  if (apiBase) console.log(`$env:API_BASE=\"${q(apiBase)}\"`);
}

main().catch((e) => {
  console.error("FAILED:", e?.stack || e?.message || e);
  process.exitCode = 1;
});
