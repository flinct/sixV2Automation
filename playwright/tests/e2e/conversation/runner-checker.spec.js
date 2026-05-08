const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Conversation Runner Checker Tests', () => {
  let authPage;
  let inboxPage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    const credentials = config.getDefaultAccount();
    await authPage.login(credentials.identifier, credentials.password, { useV2: true });
  });

  test('accessing conversation page - widget', async () => {
    await inboxPage.openFirstChatByChannel('widget');
    const message = `testing message for widget ${Date.now()}`;
    await inboxPage.sendMessage(message);
    await expect(inboxPage.agentBubble(0)).toBeVisible({ timeout: 5000 });
  });
});
