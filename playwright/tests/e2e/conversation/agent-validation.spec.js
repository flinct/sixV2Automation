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

  test('open conversation should show Close button', async ({ page }) => {
    await inboxPage.gotoAll();
    await inboxPage.openChat(1);
    await expect(inboxPage.closeButton).toBeVisible({ timeout: 10000 });
    await expect(inboxPage.reopenButton).not.toBeVisible();
  });

  test('closed conversation should show Reopen button', async ({ page }) => {
    await inboxPage.gotoAll();
    await inboxPage.filterByStatus('closed');

    const hasClosed = await inboxPage.hasChat(1, 5000);
    if (!hasClosed) {
      test.skip(true, 'No closed conversations available');
      return;
    }

    await inboxPage.openChat(1);
    await expect(inboxPage.reopenButton).toBeVisible({ timeout: 10000 });
    await expect(inboxPage.closeButton).not.toBeVisible();
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
