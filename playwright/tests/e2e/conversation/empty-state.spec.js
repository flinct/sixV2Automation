const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage } = require('../../../support/pages');
const { getCurrentConfig, testAccounts } = require('../../../support/config');

test.describe('Conversation Empty State Tests', () => {
  let authPage;
  let inboxPage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);

    const emptyStateAccount = config.env.name === 'prod' ? testAccounts.testerdummy01 : null;
    test.skip(!emptyStateAccount, 'Dedicated empty-state account is only configured for prod in current Playwright test data.');

    await authPage.login(emptyStateAccount.identifier, emptyStateAccount.password, { useV2: true });
  });

  test('accessing conversation page', async ({ page }) => {
    await inboxPage.goto();
    await expect(page).toHaveURL(/\/conversation/);
  });

  test('accessing conversation page - your inbox', async () => {
    await inboxPage.gotoYourInbox();
  });

  test('accessing conversation page - unassigned', async () => {
    await inboxPage.gotoUnassigned();
  });

  test('accessing conversation page - all inbox', async () => {
    await inboxPage.gotoAll();
  });

  test('accessing conversation page - starred', async () => {
    await inboxPage.gotoStarred();
  });

  test('accessing conversation page - spam', async () => {
    await inboxPage.gotoSpam();
  });

  test('accessing conversation page - junk', async () => {
    await inboxPage.gotoJunk();
  });

  test('accessing conversation page - your inbox - validate empty state', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(page.getByText(/belum ada pesan|no messages/i)).toBeVisible();
  });

  test('accessing conversation page - your inbox - validate title section', async () => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.chatListTitle).toBeVisible();
    await expect(inboxPage.chatListSearchButton).toBeVisible();
  });

  test('accessing conversation page - your inbox - testing filter component placement and visibility', async () => {
    await inboxPage.gotoYourInbox();
    await inboxPage.chatListSearchButton.click();
    await expect(inboxPage.chatListSearchInput).toBeVisible();
    await inboxPage.closeSearch();
  });
});
