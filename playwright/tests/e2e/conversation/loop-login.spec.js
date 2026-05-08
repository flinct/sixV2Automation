const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Loop Login Tests', () => {
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test('loop login smoke with default account', async ({ page }) => {
    const authPage = new AuthPage(page);
    const credentials = config.getDefaultAccount();

    for (let iteration = 0; iteration < 3; iteration += 1) {
      await authPage.login(credentials.identifier, credentials.password, { useV2: true });
      await expect(page).toHaveURL(/\/conversation\/your-inbox/);
      await authPage.logout();
      await expect(page).toHaveURL(/\/login/);
    }
  });

  test.fixme('loop login test with bulk user list', 'Source Cypress flow depends on external user list data that is not yet present in Playwright support.');
});
