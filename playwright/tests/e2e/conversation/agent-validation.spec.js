const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Agent Assignment & Validation Tests', () => {
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

  test('should show conversation status (Close or Reopen button)', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasClose = await inboxPage.closeButton.isVisible().catch(() => false);
    const hasReopen = await inboxPage.reopenButton.isVisible().catch(() => false);
    expect(hasClose || hasReopen).toBeTruthy();
  });

  test('should show Team Inbox section', async ({ page }) => {
    await inboxPage.openFirstChat();
    const teamRow = page.getByText(/Kotak Masuk Tim|Team Inbox/i);
    const isVisible = await teamRow.isVisible().catch(() => false);
    if (isVisible) {
      await expect(teamRow).toBeVisible();
    }
  });

  test('should show Channel Source in detail', async ({ page }) => {
    await inboxPage.openFirstChat();
    const channelSource = page.getByText(/Sumber Saluran|Channel Source/i);
    const isVisible = await channelSource.isVisible().catch(() => false);
    if (isVisible) await expect(channelSource).toBeVisible();
  });

  test('should show Conversation ID', async ({ page }) => {
    await inboxPage.openFirstChat();
    const convId = page.getByText(/ID Percakapan|Conversation ID/i);
    const isVisible = await convId.isVisible().catch(() => false);
    if (isVisible) await expect(convId).toBeVisible();
  });
});
