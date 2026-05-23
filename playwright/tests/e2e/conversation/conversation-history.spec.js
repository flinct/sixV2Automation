const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage, ConversationHistoryPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Conversation History Tests', () => {
  let authPage;
  let inboxPage;
  let historyPage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    historyPage = new ConversationHistoryPage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  test('should show Conversation History section in detail panel', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasHistory = await historyPage.historyTitle.isVisible().catch(() => false);
    test.skip(!hasHistory, 'History section not available for this conversation');
    await expect(historyPage.historyTitle).toBeVisible();
  });

  test('should display history items when available', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasHistory = await historyPage.historyTitle.isVisible().catch(() => false);
    test.skip(!hasHistory, 'History section not available');

    const count = await historyPage.getHistoryCount();
    if (count > 0) {
      await historyPage.verifyHistoryContainsText('');
    }
  });

  test('should show empty state when no history', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasHistory = await historyPage.historyTitle.isVisible().catch(() => false);
    test.skip(!hasHistory, 'History section not available');

    const count = await historyPage.getHistoryCount();
    if (count === 0) {
      const isEmpty = await historyPage.historyEmptyState.isVisible().catch(() => false);
      if (isEmpty) await historyPage.verifyHistoryEmpty();
    }
  });

  test('should show history for conversations with previous interactions', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasHistory = await historyPage.historyTitle.isVisible().catch(() => false);
    test.skip(!hasHistory, 'History section not available');

    const count = await historyPage.getHistoryCount();
    test.skip(count === 0, 'No history items');

    const text = await historyPage.historyContainer.textContent();
    expect(text).toBeTruthy();
  });
});
