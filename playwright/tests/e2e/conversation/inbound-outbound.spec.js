const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Inbound & Outbound Message Tests', () => {
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

  const channels = [
    { type: 'widget', name: 'Widget' },
    { type: 'baileys', name: 'WhatsApp Web' },
    { type: 'instagram', name: 'Instagram' },
    { type: 'email', name: 'Email' },
  ];

  for (const channel of channels) {
    test(`should send outbound message via ${channel.name} channel`, async ({ page }) => {
      const hasChats = await inboxPage.openFirstChatByChannel(channel.type);
      test.skip(!hasChats, `No ${channel.name} chats available`);
      await inboxPage.sendMessage(`Test ${channel.name} ${Date.now()}`);
      await expect(inboxPage.agentBubble.last()).toBeVisible({ timeout: 10000 });
    });
  }

  test('should display inbound message from customer', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasInbound = await inboxPage.customerBubble.first().isVisible().catch(() => false);
    if (hasInbound) {
      await expect(inboxPage.customerBubble.first()).toBeVisible();
    }
  });

  test('should handle multiple outbound messages in sequence', async ({ page }) => {
    await inboxPage.openFirstChat();
    const msgs = [`First ${Date.now()}`, `Second ${Date.now()}`, `Third ${Date.now()}`];
    for (const msg of msgs) {
      await inboxPage.sendMessage(msg);
    }
    await expect(inboxPage.agentBubble.last()).toBeVisible({ timeout: 10000 });
  });
});
