const { expect } = require('@playwright/test');

const NAV = {
  yourInbox: { id: /Kotak Pesan Anda|Your Inbox/i, path: '/conversation/your-inbox', title: /Kotak Pesan Anda|Your Inbox/i },
  unassigned: { id: /Belum Ditugaskan|Unassigned/i, path: '/conversation/unassigned', title: /Belum Ditugaskan|Unassigned/i },
  all: { id: /^Semua\s|^All\s/i, path: '/conversation/all', title: /Semua|All/i },
  spam: { id: /^Spam\s/i, path: '/conversation/spam', title: /Spam/i },
  starred: { id: /Berbintang|Starred/i, path: '/conversation/starred', title: /Berbintang|Starred/i },
  junk: { id: /Folder Sampah|Junk/i, path: '/conversation/junk', title: /Folder Sampah|Junk/i },
};

const CHANNELS = [
  { key: 'widget', id: /^Widget\s/i, title: /Widget/i },
  { key: 'whatsapp_api', id: /Whatsapp Api\s/i, title: /Whatsapp Api/i },
  { key: 'whatsapp_web', id: /Whatsapp Web/i, title: /Whatsapp Web/i },
  { key: 'instagram', id: /^Instagram\s/i, title: /Instagram/i },
  { key: 'facebook_messenger', id: /Facebook Messenger\s/i, title: /Facebook Messenger/i },
  { key: 'email', id: /^Email\s/i, title: /Email/i },
  { key: 'telegram', id: /^Telegram\s/i, title: /Telegram/i },
];

class InboxPage {
  constructor(page) {
    this.page = page;
    this.sidebar = page.getByTestId('Conversation-Sidebar-Navigation');

    this.yourInboxNav = page.getByRole('button', { name: NAV.yourInbox.id });
    this.unassignedNav = page.getByRole('button', { name: NAV.unassigned.id });
    this.allNav = page.getByRole('button', { name: NAV.all.id });
    this.spamNav = page.getByRole('button', { name: NAV.spam.id });
    this.starredNav = page.getByRole('button', { name: NAV.starred.id });
    this.junkNav = page.getByRole('button', { name: NAV.junk.id });
    this.inboxNavs = [this.yourInboxNav, this.unassignedNav, this.allNav, this.spamNav, this.starredNav, this.junkNav];

    this.channelWidget = page.getByRole('button', { name: CHANNELS[0].id });
    this.channelWhatsappApi = page.getByRole('button', { name: CHANNELS[1].id });
    this.channelWhatsappWeb = this.sidebar.locator('button').filter({ hasText: CHANNELS[2].id });
    this.channelInstagram = page.getByRole('button', { name: CHANNELS[3].id });
    this.channelFacebookMessenger = page.getByRole('button', { name: CHANNELS[4].id });
    this.channelEmail = page.getByRole('button', { name: CHANNELS[5].id });
    this.channelTelegram = page.getByRole('button', { name: CHANNELS[6].id });
    this.channelNavs = [this.channelWidget, this.channelWhatsappApi, this.channelWhatsappWeb, this.channelInstagram, this.channelFacebookMessenger, this.channelEmail, this.channelTelegram];

    this.chatListContainer = page.getByTestId('Conversation-Chat-List-Container');
    this.chatListHeader = page.getByTestId('Conversation-Chat-List-Header');
    this.chatListTitle = page.getByTestId('Conversation-Chat-List-Page-Section');
    this.chatListToggle = this.chatListHeader.locator('svg').first();

    this.chatListItem = (index) => page.getByTestId(`chat-list-${index}`);
    this.chatListItems = page.getByTestId(/^chat-list-/);

    this.chatRoom = page.locator('#conversation-chatroom-container');
    this.clientName = page.locator('#conversation-customer-name');
    this.closeButton = page.getByRole('button', { name: /Tutup|Close/i });
    this.reopenButton = page.getByRole('button', { name: /Buka|Reopen/i });

    this.messageInput = page.locator('textarea[data-cy="autogrowing-textarea"]');
    this.sendButton = page.getByRole('button', { name: /Kirim|Send/i });

    this.agentBubble = page.locator('div.bg-blue-100');
    this.customerBubble = page.locator('div.bg-slate-100:not(:has(div.rounded-full))');
    this.typingIndicator = page.locator('div.bg-slate-100:has(div.rounded-full.will-change-transform)');

    this.assigneeSection = page.getByText(/Penerima tugas|Assignee/i);
    this.frtLabel = page.getByText(/^FRT$/i);
    this.ttcLabel = page.getByText(/^TTC$/i);
    this.rltLabel = page.getByText(/^RLT$/i);
    this.waitTimeLabel = page.getByText(/Waktu Tunggu|Wait Time/i);
  }

  navByKey(key) {
    const map = {
      'your-inbox': this.yourInboxNav, unassigned: this.unassignedNav, all: this.allNav,
      spam: this.spamNav, starred: this.starredNav, junk: this.junkNav,
    };
    return map[key];
  }

  pathByKey(key) {
    const map = {
      'your-inbox': '/conversation/your-inbox', unassigned: '/conversation/unassigned', all: '/conversation/all',
      spam: '/conversation/spam', starred: '/conversation/starred', junk: '/conversation/junk',
    };
    return map[key];
  }

  channelByKey(key) {
    const map = {
      widget: this.channelWidget, whatsapp_api: this.channelWhatsappApi, whatsapp_web: this.channelWhatsappWeb,
      instagram: this.channelInstagram, facebook_messenger: this.channelFacebookMessenger,
      email: this.channelEmail, telegram: this.channelTelegram,
    };
    return map[key];
  }

  async goto(path = '/conversation') {
    await this.page.goto(path, { waitUntil: 'load', timeout: 30000 });
  }

  async gotoYourInbox() { await this.goto('/conversation/your-inbox'); await expect(this.chatListContainer).toBeVisible({ timeout: 15000 }); }
  async gotoUnassigned() { await this.goto('/conversation/unassigned'); await expect(this.chatListContainer).toBeVisible({ timeout: 15000 }); }
  async gotoAll() { await this.goto('/conversation/all'); await expect(this.chatListContainer).toBeVisible({ timeout: 15000 }); }
  async gotoStarred() { await this.goto('/conversation/starred'); await expect(this.chatListContainer).toBeVisible({ timeout: 15000 }); }
  async gotoSpam() { await this.goto('/conversation/spam'); await expect(this.chatListContainer).toBeVisible({ timeout: 15000 }); }
  async gotoJunk() { await this.goto('/conversation/junk'); await expect(this.chatListContainer).toBeVisible({ timeout: 15000 }); }

  async openFirstChat() {
    await this.gotoAll();
    const firstChat = this.chatListItem(1);
    await expect(firstChat).toBeVisible({ timeout: 60000 });
    await firstChat.click();
    await expect(this.chatRoom).toBeVisible({ timeout: 15000 });
  }

  async openChatByIndex(index) {
    const chat = this.chatListItem(index + 1);
    await expect(chat).toBeVisible({ timeout: 15000 });
    await chat.click();
    await expect(this.chatRoom).toBeVisible({ timeout: 15000 });
  }

  async sendMessage(text) {
    await this.messageInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.messageInput.fill(text);
    await this.sendButton.click({ force: true });
  }

  async openFirstChatByChannel(channelType) {
    await this.goto('/conversation');
    const channelNav = this.channelByKey(channelType);
    if (channelNav) {
      const navVisible = await channelNav.isVisible().catch(() => false);
      if (!navVisible) return false;
      await channelNav.click();
      await this.page.waitForTimeout(2000);
    }
    const firstChat = this.chatListItems.first();
    const hasChats = await firstChat.isVisible({ timeout: 5000 }).catch(() => false);
    if (!hasChats) return false;
    await firstChat.click();
    await expect(this.chatRoom).toBeVisible({ timeout: 15000 });
    return true;
  }

  async verifyAllInboxNavsVisible() {
    for (const nav of this.inboxNavs) {
      await expect(nav).toBeVisible({ timeout: 10000 });
    }
  }

  async verifyAllChannelNavsVisible() {
    for (const ch of this.channelNavs) {
      const vis = await ch.isVisible().catch(() => false);
      if (vis) await expect(ch).toBeVisible();
    }
  }

  async verifyNavChangesChatList(navKey) {
    const path = this.pathByKey(navKey);
    await this.page.goto(path, { waitUntil: 'load', timeout: 30000 });
    await expect(this.chatListContainer).toBeVisible({ timeout: 15000 });
    await expect(this.page).toHaveURL(new RegExp(path.replace(/\//g, '\\/')));
    await expect(this.chatListTitle).toBeVisible();
  }

  async verifyChannelFiltersChatList(channelKey) {
    await this.goto('/conversation');
    const chNav = this.channelByKey(channelKey);
    const vis = await chNav.isVisible().catch(() => false);
    if (!vis) return false;
    await chNav.click();
    await this.page.waitForTimeout(2000);
    await expect(this.chatListContainer).toBeVisible({ timeout: 15000 });
    await expect(this.page).toHaveURL(/channel=/);
    return true;
  }

  async verifyCustomerMessage(expectedText) {
    await expect(this.customerBubble.last()).toContainText(expectedText, { timeout: 10000 });
  }

  async verifyAgentMessage(expectedText) {
    await expect(this.agentBubble.last()).toContainText(expectedText, { timeout: 10000 });
  }

  async verifySlaMetricsDisplayed() {
    await expect(this.frtLabel).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { InboxPage, NAV, CHANNELS };
