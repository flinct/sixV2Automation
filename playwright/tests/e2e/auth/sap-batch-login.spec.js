const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../../../support/pages');
const { getCurrentConfig, getSapAgentAccounts } = require('../../../support/config');

function getBatchLimit() {
  const raw = process.env.PW_SAP_LOGIN_LIMIT;
  if (!raw) return null;

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function getLoginMode() {
  return process.env.PW_SAP_LOGIN_MODE === 'ui' ? 'ui' : 'api';
}

function formatFailureMessage(failures) {
  return failures
    .map((failure) => `${failure.identifier} -> ${failure.reason}`)
    .join('\n');
}

async function readJsonSafe(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function loginViaApi(playwright, config, account) {
  const apiContext = await playwright.request.newContext({
    baseURL: config.env.baseURL,
    ignoreHTTPSErrors: true,
  });

  try {
    const csrfResponse = await apiContext.get('/api/auth/csrf');
    const csrfPayload = await readJsonSafe(csrfResponse);
    const csrfToken = csrfPayload?.csrfToken;

    if (!csrfToken) {
      return {
        identifier: account.identifier,
        key: account.key,
        status: 'failed',
        mode: 'api',
        reason: `missing_csrf_token:${csrfResponse.status()}`,
      };
    }

    const loginResponse = await apiContext.post('/api/auth/callback/credentials?json=true', {
      form: {
        csrfToken,
        identifier: account.identifier,
        password: account.password,
        callbackUrl: `${config.env.baseURL}/`,
        json: 'true',
      },
    });
    const loginPayload = await readJsonSafe(loginResponse);

    const sessionResponse = await apiContext.get('/api/auth/session');
    const sessionPayload = await readJsonSafe(sessionResponse);
    const isSuccess = Boolean(sessionPayload?.user);

    return {
      identifier: account.identifier,
      key: account.key,
      status: isSuccess ? 'passed' : 'failed',
      mode: 'api',
      postStatus: loginResponse.status(),
      sessionStatus: sessionResponse.status(),
      postUrl: loginPayload?.url,
      reason: isSuccess ? undefined : loginPayload?.url || 'session_missing_user',
    };
  } catch (error) {
    return {
      identifier: account.identifier,
      key: account.key,
      status: 'failed',
      mode: 'api',
      reason: error.message,
    };
  } finally {
    await apiContext.dispose();
  }
}

async function loginViaUi(browser, config, account) {
  const context = await browser.newContext({
    baseURL: config.env.baseURL,
    viewport: { width: 1280, height: 768 },
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  const authPage = new AuthPage(page);

  try {
    await authPage.login(account.identifier, account.password, { useV2: true });
    return {
      identifier: account.identifier,
      key: account.key,
      status: 'passed',
      mode: 'ui',
    };
  } catch (error) {
    return {
      identifier: account.identifier,
      key: account.key,
      status: 'failed',
      mode: 'ui',
      reason: error.message,
      url: page.url(),
    };
  } finally {
    await context.close();
  }
}

test.describe('Auth SAP Batch Login Tests', () => {
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test('should validate all SAP login accounts', async ({ browser, playwright }, testInfo) => {
    test.setTimeout(10 * 60 * 1000);

    const accounts = getSapAgentAccounts(config.env.name);
    const limit = getBatchLimit();
    const mode = getLoginMode();
    const selectedAccounts = limit ? accounts.slice(0, limit) : accounts;

    expect(selectedAccounts.length).toBeGreaterThan(0);

    const results = [];

    for (const [index, account] of selectedAccounts.entries()) {
      const result = mode === 'ui'
        ? await loginViaUi(browser, config, account)
        : await loginViaApi(playwright, config, account);

      results.push(result);

      if ((index + 1) % 25 === 0 || index === 0 || index + 1 === selectedAccounts.length) {
        console.log(`[sap-batch-login] processed ${index + 1}/${selectedAccounts.length} accounts (${mode})`);
      }
    }

    const outputDir = testInfo.outputPath('sap-login-batch');
    fs.mkdirSync(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, 'results.json');
    fs.writeFileSync(outputPath, JSON.stringify({
      env: config.env.name,
      baseURL: config.env.baseURL,
      mode,
      limit,
      totalSelected: selectedAccounts.length,
      results,
    }, null, 2));

    await testInfo.attach('sap-login-results', {
      body: JSON.stringify(results, null, 2),
      contentType: 'application/json',
    });

    const failures = results.filter((result) => result.status === 'failed');
    expect(failures, `SAP login failures:\n${formatFailureMessage(failures)}`).toEqual([]);
  });
});
