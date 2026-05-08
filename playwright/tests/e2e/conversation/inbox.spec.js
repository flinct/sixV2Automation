const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../../../support/pages/auth.page');
const { InboxPage } = require('../../../support/pages/inbox.page');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Inbox Page Tests', () => {
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

  test('should navigate to your inbox', async () => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.yourInboxNav).toHaveClass(/bg-white/);
  });

  test('should navigate to unassigned inbox', async () => {
    await inboxPage.gotoUnassigned();
    await expect(inboxPage.unassignedNav).toHaveClass(/bg-white/);
  });

  test('should navigate to all conversations', async () => {
    await inboxPage.gotoAll();
    await expect(inboxPage.allNav).toHaveClass(/bg-white/);
  });

  test('should open first chat and send message', async ({ page }) => {
    const inboxPage = new InboxPage(page);

    await inboxPage.gotoAll();

    const chatCount = await inboxPage.chatListItems.count();
    test.skip(chatCount === 0, 'No chats available to test');

    await inboxPage.openFirstChat();
    await expect(inboxPage.chatRoom).toBeVisible();

    const testMessage = `Test message from Playwright - ${Date.now()}`;
    await inboxPage.sendMessage(testMessage);

    await expect(inboxPage.agentBubble(0)).toBeVisible({ timeout: 5000 });
  });

  test('should test channel navigation - widget', async ({ page }) => {
    const inboxPage = new InboxPage(page);

    await test.step('Navigate to widget channel', async () => {
      await inboxPage.goto();
    });
  });
});

test.describe('Multi-Channel Message Tests', () => {
  let authPage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  const channels = [
    { type: 'widget', name: 'Widget' },
    { type: 'baileys', name: 'WhatsApp Web' },
    { type: 'whatsapp_api', name: 'WhatsApp API' },
    { type: 'instagram', name: 'Instagram' },
    { type: 'email', name: 'Email' },
  ];

  for (const channel of channels) {
    test(`should send message via ${channel.name} channel`, async ({ page }) => {
      const inboxPage = new InboxPage(page);

      await test.step(`Open first ${channel.name} chat`, async () => {
        await inboxPage.openFirstChatByChannel(channel.type);
      });

      await test.step('Send test message', async () => {
        const message = `[${channel.name}] Automated test - ${Date.now()}`;
        await inboxPage.sendMessage(message);
      });
    });
  }
});
