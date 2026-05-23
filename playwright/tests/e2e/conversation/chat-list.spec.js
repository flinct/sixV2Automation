const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage, CHANNELS } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Chat List Validation Tests', () => {
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

  test('should display chat list container on inbox page', async ({ page }) => {
    await inboxPage.goto();
    await expect(inboxPage.chatListContainer).toBeVisible({ timeout: 15000 });
  });

  test('should display chat list items when chats exist', async ({ page }) => {
    await inboxPage.gotoAll();
    const chatCount = await inboxPage.chatListItems.count();
    test.skip(chatCount === 0, 'No chats available');
    await expect(inboxPage.chatListItems.first()).toBeVisible();
  });

  test('should show all inbox section navigation buttons', async ({ page }) => {
    await inboxPage.goto();
    await inboxPage.verifyAllInboxNavsVisible();
  });

  test('should show all available channel navigation buttons', async ({ page }) => {
    await inboxPage.goto();
    await inboxPage.verifyAllChannelNavsVisible();
  });

  const navSections = [
    { key: 'your-inbox', url: /\/conversation\/your-inbox/ },
    { key: 'unassigned', url: /\/conversation\/unassigned/ },
    { key: 'all', url: /\/conversation\/all/ },
    { key: 'spam', url: /\/conversation\/spam/ },
    { key: 'starred', url: /\/conversation\/starred/ },
    { key: 'junk', url: /\/conversation\/junk/ },
  ];

  for (const nav of navSections) {
    test(`should navigate to ${nav.key} and update chat list`, async ({ page }) => {
      await inboxPage.verifyNavChangesChatList(nav.key);
      await expect(page).toHaveURL(nav.url);
      await expect(inboxPage.chatListTitle).toBeVisible();
    });
  }

  for (const ch of CHANNELS) {
    test(`should filter chat list by channel: ${ch.key}`, async ({ page }) => {
      const hasChannel = await inboxPage.verifyChannelFiltersChatList(ch.key);
      test.skip(!hasChannel, `${ch.key} channel not available or has no chats`);
    });
  }

  test('should open chat on click and show chat room', async ({ page }) => {
    await inboxPage.openFirstChat();
    await expect(inboxPage.chatRoom).toBeVisible();
  });

  test('should show chat list title on page load', async ({ page }) => {
    await inboxPage.goto();
    await expect(inboxPage.chatListTitle).toBeVisible();
  });

  test('should switch between multiple nav sections', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await inboxPage.gotoAll();
    await inboxPage.gotoUnassigned();
    await inboxPage.gotoSpam();
    await inboxPage.gotoStarred();
    await inboxPage.gotoJunk();
  });

  test('should navigate via sidebar button click', async ({ page }) => {
    await inboxPage.goto();
    await inboxPage.yourInboxNav.waitFor({ state: 'visible', timeout: 15000 });
    await inboxPage.allNav.click();
    await expect(page).toHaveURL(/\/conversation\/all/);
    await inboxPage.unassignedNav.click();
    await expect(page).toHaveURL(/\/conversation\/unassigned/);
    await inboxPage.yourInboxNav.click();
    await expect(page).toHaveURL(/\/conversation\/your-inbox/);
  });
});
