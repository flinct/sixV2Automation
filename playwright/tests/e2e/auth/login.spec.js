const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

function getSupervisorAccountKey(envName) {
  return envName === 'prod' ? 'danyspv01' : 'mataayam01';
}

function getAgentAccountKey(envName) {
  return envName === 'prod' ? 'danyagent01' : 'leherayam01';
}

test.describe('Auth Login Tests', () => {
  let authPage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.gotoLoginV2();
  });

  test('check exist element on login page', async () => {
    await authPage.verifyLoginPageElements();
  });

  test('check login error state', async () => {
    await authPage.login('invalid-user', 'wrong-pass', { expectSuccess: false });
    await expect(authPage.page.getByTestId('login-error-message')).toBeVisible();
  });

  test('valid login with admin credentials', async () => {
    const credentials = config.getDefaultAccount();
    await authPage.login(credentials.identifier, credentials.password, { useV2: true });
    await expect(authPage.page).toHaveURL(/\/id\/conversation\/your-inbox/);
  });

  test('invalid login with wrong password', async () => {
    const credentials = config.getDefaultAccount();
    await authPage.login(credentials.identifier, 'wrongpassword123', { expectSuccess: false });
    await expect(authPage.page.getByTestId('login-error-message')).toBeVisible();
  });

  test('login with empty fields', async () => {
    await authPage.login('', '', { expectSuccess: false });
    await expect(authPage.keywordInput).toHaveAttribute('aria-invalid', 'true');
    await expect(authPage.passwordInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('try login with ROLE SUPERVISOR', async () => {
    const supervisorCreds = config.getAccountByLoginType(getSupervisorAccountKey(config.env.name), config.env.name);
    await authPage.login(supervisorCreds.identifier, supervisorCreds.password, { useV2: true });
    await expect(authPage.page).toHaveURL(/\/id\/conversation\/your-inbox/);
  });

  test('try login with ROLE AGENT', async () => {
    const agentCreds = config.getAccountByLoginType(getAgentAccountKey(config.env.name), config.env.name);
    await authPage.login(agentCreds.identifier, agentCreds.password, { useV2: true });
    await expect(authPage.page).toHaveURL(/\/id\/conversation\/your-inbox/);
  });

  test('Confirm that the access token truly becomes invalid after 15 minutes', async () => {
    const credentials = config.getDefaultAccount();
    await authPage.login(credentials.identifier, credentials.password, { useV2: true });
    await authPage.page.waitForTimeout(900000); // 15 minutes
    await authPage.page.reload();
    await expect(authPage.page).toHaveURL(/\/login/);
  });
});
