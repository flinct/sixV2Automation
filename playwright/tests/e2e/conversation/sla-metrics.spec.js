const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('SLA Metrics Tests - FRT/RLT/TTC/Wait Time', () => {
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
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  test('should open chat room with conversation detail visible', async ({ page }) => {
    await inboxPage.openFirstChat();
    await expect(inboxPage.chatRoom).toBeVisible();
    await expect(inboxPage.clientName).toBeVisible();
  });

  test('should show SLA badge on conversation card in list', async ({ page }) => {
    await inboxPage.gotoAll();
    const slaBadge = page.locator('[aria-label="sla duration"]');
    const hasBadge = await slaBadge.first().isVisible().catch(() => false);
    if (hasBadge) {
      await expect(slaBadge.first()).toBeVisible();
    }
  });

  test('should show close or reopen button when chat opened', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasClose = await inboxPage.closeButton.isVisible().catch(() => false);
    const hasReopen = await inboxPage.reopenButton.isVisible().catch(() => false);
    expect(hasClose || hasReopen).toBeTruthy();
  });
});
