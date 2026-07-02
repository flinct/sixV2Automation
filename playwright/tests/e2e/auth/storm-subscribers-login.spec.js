const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { getCurrentConfig, getAccountByLoginType } = require('../../../support/config');
const {
  parseSubscriberFile,
  resolveSubscribers,
} = require('../../../support/helpers/subscriber-file');

const DEFAULT_SUBSCRIBERS_FILE = path.resolve(
  __dirname,
  '../../../../scripts/storm-reproducer/subscribers/dev-multi-company.template.txt',
);

function getSubscribersFile() {
  return process.env.PW_SUBSCRIBERS_FILE
    ? path.resolve(process.env.PW_SUBSCRIBERS_FILE)
    : DEFAULT_SUBSCRIBERS_FILE;
}

function getBatchLimit() {
  const raw = process.env.PW_LOGIN_LIMIT;
  if (!raw) return null;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function getLoginMode() {
  return process.env.PW_LOGIN_MODE === 'ui' ? 'ui' : 'api';
}

function isFailOnUnresolved() {
  // Default: don't fail the test just because a loginType is missing from testAccounts.
  // Unresolved entries land in the report — set PW_FAIL_ON_UNRESOLVED=1 to make it a hard fail.
  return process.env.PW_FAIL_ON_UNRESOLVED === '1';
}

function isFailOnLoginFailure() {
  // Default: hard-fail the test when any resolved account cannot log in.
  // Set PW_SOFT_LOGIN=1 to keep the run green and only produce a report.
  return process.env.PW_SOFT_LOGIN !== '1';
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
    const csrfToken = csrfPayload && csrfPayload.csrfToken;

    if (!csrfToken) {
      return {
        loginType: account.loginType,
        identifier: account.identifier,
        status: 'failed',
        mode: 'api',
        reason: `missing_csrf_token:${csrfResponse.status()}`,
      };
    }

    const loginResponse = await apiContext.post(
      '/api/auth/callback/credentials?json=true',
      {
        form: {
          csrfToken,
          identifier: account.identifier,
          password: account.password,
          callbackUrl: `${config.env.baseURL}/`,
          json: 'true',
        },
      },
    );
    const loginPayload = await readJsonSafe(loginResponse);

    const sessionResponse = await apiContext.get('/api/auth/session');
    const sessionPayload = await readJsonSafe(sessionResponse);
    const isSuccess = Boolean(sessionPayload && sessionPayload.user);

    return {
      loginType: account.loginType,
      identifier: account.identifier,
      status: isSuccess ? 'passed' : 'failed',
      mode: 'api',
      postStatus: loginResponse.status(),
      sessionStatus: sessionResponse.status(),
      postUrl: loginPayload && loginPayload.url,
      reason: isSuccess
        ? undefined
        : (loginPayload && loginPayload.url) || 'session_missing_user',
    };
  } catch (error) {
    return {
      loginType: account.loginType,
      identifier: account.identifier,
      status: 'failed',
      mode: 'api',
      reason: error.message,
    };
  } finally {
    await apiContext.dispose();
  }
}

async function loginViaUi(browser, config, account) {
  const { AuthPage } = require('../../../support/pages');

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
      loginType: account.loginType,
      identifier: account.identifier,
      status: 'passed',
      mode: 'ui',
    };
  } catch (error) {
    return {
      loginType: account.loginType,
      identifier: account.identifier,
      status: 'failed',
      mode: 'ui',
      reason: error.message,
      url: page.url(),
    };
  } finally {
    await context.close();
  }
}

function summariseResults(results) {
  const passed = results.filter((r) => r.status === 'passed');
  const failed = results.filter((r) => r.status === 'failed');
  return { total: results.length, passed: passed.length, failed: failed.length, passedList: passed, failedList: failed };
}

test.describe('Auth Storm Subscribers Login Check', () => {
  test('should validate all loginTypes from the storm subscriber file', async ({
    browser,
    playwright,
  }, testInfo) => {
    // Long-running: up to 30 minutes for a full 400+ account API sweep.
    test.setTimeout(30 * 60 * 1000);

    const config = getCurrentConfig();
    const subscribersPath = getSubscribersFile();
    const parsed = parseSubscriberFile(subscribersPath);
    const { resolved, unresolved } = resolveSubscribers(parsed, {
      getAccountByLoginType,
      env: config.env.name,
    });

    const limit = getBatchLimit();
    const mode = getLoginMode();
    const targets = limit ? resolved.slice(0, limit) : resolved;

    console.log(
      `[storm-subscribers-login] file=${subscribersPath} env=${config.env.name} mode=${mode} ` +
        `unique_loginTypes=${parsed.uniqueLoginTypes.length} resolved=${resolved.length} ` +
        `unresolved=${unresolved.length} testing=${targets.length}`,
    );

    expect(parsed.uniqueLoginTypes.length, 'subscriber file yielded 0 loginTypes').toBeGreaterThan(0);
    expect(targets.length, 'no resolvable accounts to test').toBeGreaterThan(0);

    const results = [];
    for (let index = 0; index < targets.length; index += 1) {
      const account = targets[index];
      /* eslint-disable no-await-in-loop */
      const result =
        mode === 'ui'
          ? await loginViaUi(browser, config, account)
          : await loginViaApi(playwright, config, account);
      /* eslint-enable no-await-in-loop */

      result.companyIds = account.companyIds;
      result.role = account.role;
      results.push(result);

      const oneBased = index + 1;
      if (oneBased === 1 || oneBased === targets.length || oneBased % 25 === 0) {
        const so = summariseResults(results);
        console.log(
          `[storm-subscribers-login] processed ${oneBased}/${targets.length} ` +
            `(passed=${so.passed}, failed=${so.failed}, mode=${mode})`,
        );
      }
    }

    const summary = summariseResults(results);
    const report = {
      env: config.env.name,
      baseURL: config.env.baseURL,
      mode,
      limit,
      subscribersFile: subscribersPath,
      companies: parsed.companies,
      totalEntries: parsed.entries.length,
      uniqueLoginTypes: parsed.uniqueLoginTypes.length,
      resolvedLoginTypes: resolved.length,
      unresolvedLoginTypes: unresolved,
      tested: results.length,
      passed: summary.passed,
      failed: summary.failed,
      results,
    };

    const outputDir = testInfo.outputPath('storm-subscribers-login');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(
      path.join(outputDir, 'report.json'),
      JSON.stringify(report, null, 2),
    );

    // CSV of failures for quick inspection.
    const csvHeader = 'loginType,identifier,status,mode,postStatus,sessionStatus,companyIds,reason';
    const csvRows = results
      .filter((r) => r.status === 'failed')
      .map((r) =>
        [
          r.loginType,
          r.identifier,
          r.status,
          r.mode,
          r.postStatus == null ? '' : r.postStatus,
          r.sessionStatus == null ? '' : r.sessionStatus,
          (r.companyIds || []).join('|'),
          JSON.stringify(r.reason || ''),
        ].join(','),
      );
    fs.writeFileSync(
      path.join(outputDir, 'failed.csv'),
      [csvHeader, ...csvRows].join('\n'),
    );

    await testInfo.attach('storm-subscribers-login-report', {
      body: JSON.stringify(report, null, 2),
      contentType: 'application/json',
    });

    console.log(
      `[storm-subscribers-login] DONE ` +
        `unresolved=${unresolved.length} passed=${summary.passed}/${results.length} ` +
        `failed=${summary.failed} report=${path.join(outputDir, 'report.json')}`,
    );

    if (isFailOnUnresolved()) {
      const unresolvedList = unresolved.map((u) => u.loginType).join(', ');
      expect(
        unresolved.length,
        `Unresolved subscriber loginTypes (missing from testAccounts): ${unresolvedList}`,
      ).toBe(0);
    }

    if (isFailOnLoginFailure()) {
      const failedList = summary.failedList.map((r) => `${r.loginType} -> ${r.reason || 'unknown'}`).join('\n');
      expect(
        summary.failedList,
        `Login failures for storm subscriber accounts:\n${failedList}`,
      ).toEqual([]);
    }
  });
});
