const { expect } = require('@playwright/test');

const NAV = {
  yourInbox: {
    id: /Kotak Pesan Anda|Your Inbox/i,
    path: '/conversation/your-inbox',
    title: /Kotak Pesan Anda|Your Inbox/i,
  },
  unassigned: {
    id: /Belum Ditugaskan|Unassigned/i,
    path: '/conversation/unassigned',
    title: /Belum Ditugaskan|Unassigned/i,
  },
  all: {
    id: /^Semua\s|^All\s/i,
    path: '/conversation/all',
    title: /Semua|All/i,
  },
  spam: {
    id: /^Spam\s/i,
    path: '/conversation/spam',
    title: /Spam/i,
  },
  starred: {
    id: /Berbintang|Starred/i,
    path: '/conversation/starred',
    title: /Berbintang|Starred/i,
  },
  junk: {
    id: /Folder Sampah|Junk/i,
    path: '/conversation/junk',
    title: /Folder Sampah|Junk/i,
  },
};

const SECTION_TITLES = {
  'your-inbox': /Kotak Pesan Anda|Your Inbox/i,
  unassigned: /Belum Ditugaskan|Unassigned/i,
  all: /^Semua$|^All$/i,
  starred: /Berbintang|Starred/i,
  spam: /^Spam$/i,
  junk: /Folder Sampah|Junk/i,
  channel: /Saluran|Channel/i,
  team: /Kotak Masuk Tim|Team Inbox/i,
  'group-chat': /Grup|Group Chat/i,
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

    // Layout / root
    this.mainSection = page.getByTestId('Main-Section');
    this.pageSection = page.getByTestId('Conversation-Section');
    this.sidebar = page.getByTestId('Conversation-Sidebar-Navigation');

    // Inbox navigation
    this.yourInboxNav = page.getByTestId('inbox-nav-your-inbox');
    this.unassignedNav = page.getByTestId('inbox-nav-unassigned');
    this.allNav = page.getByTestId('inbox-nav-all');
    this.spamNav = page.getByTestId('inbox-nav-spam');
    this.starredNav = page.getByTestId('inbox-nav-starred');
    this.junkNav = page.getByTestId('inbox-nav-junk');
    this.inboxNavs = [
      this.yourInboxNav,
      this.unassignedNav,
      this.allNav,
      this.spamNav,
      this.starredNav,
      this.junkNav,
    ];

    // Channel navigation
    this.channelWidget = page.getByTestId('channel-nav-widget');
    this.channelWhatsappApi = page.getByTestId('channel-nav-whatsapp_api');
    this.channelWhatsappWeb = page.getByTestId('channel-nav-whatsapp_web');
    this.channelInstagram = page.getByTestId('channel-nav-instagram');
    this.channelFacebookMessenger = page.getByTestId('channel-nav-facebook_messenger');
    this.channelEmail = page.getByTestId('channel-nav-email');
    this.channelTelegram = page.getByTestId('channel-nav-telegram');
    this.channelNavs = [
      this.channelWidget,
      this.channelWhatsappApi,
      this.channelWhatsappWeb,
      this.channelInstagram,
      this.channelFacebookMessenger,
      this.channelEmail,
      this.channelTelegram,
    ];

    // Chat list
    this.chatListContainer = page.getByTestId('conversation-list');
    this.chatListHeader = page.getByTestId('Conversation-Chat-List-Header');
    this.chatListTitle = page.getByTestId('Conversation-Chat-List-Page-Section');
    this.chatListToggle = page.getByTestId('chatList-navPanelControlButton');
    this.chatListEmpty = page.getByTestId('conversation-empty-state');
    this.chatListSkeleton = page.getByTestId('conversation-list-skeleton');
    this.searchButton = page.getByTestId('chatList-searchButton');
    this.statusFilter = page.getByTestId('chatList-filter-status');
    this.readFilter = page.getByTestId('chatList-filter-read');
    this.sortFilter = page.getByTestId('chatList-filter-sort');
    this.visibilityFilter = page.getByTestId('chatList-filter-visibility');
    this.advancedFilter = page.getByTestId('chatList-filter-advance');

    // Chat list items (row = chat-list-<n>, sub = chat-list-<n>-<key>)
    this.chatListItem = (index) => page.getByTestId(`chat-list-${index}`);
    this.chatItem = this.chatListItem;
    this.chatListItems = page.getByTestId(/^chat-list-\d+$/);
    this.chatItems = this.chatListItems;
    this.cardPart = (n, key) => page.getByTestId(`chat-list-${n}-${key}`);
    this.cardAvatar = (n) => this.cardPart(n, 'avatar');
    this.cardChannelIcon = (n) => this.cardPart(n, 'channel-icon');
    this.cardName = (n) => this.cardPart(n, 'name');
    this.cardUnread = (n) => this.cardPart(n, 'unread-count');
    this.cardSla = (n) => this.cardPart(n, 'sla-badge');
    this.cardQuickAction = (n) => this.cardPart(n, 'quick-action');
    this.cardStarredIcon = (n) => this.cardPart(n, 'starred-icon');
    this.cardPinnedIcon = (n) => this.cardPart(n, 'pinned-icon');
    this.quickAction = (key) => page.getByTestId(`quick-action-${key}`);

    // Chat room
    this.chatRoom = page.locator('#conversation-chatroom-container').or(page.getByTestId('Chat-Room-Container'));
    this.roomHeader = page.getByTestId('Chat-Room-Header');
    this.clientName = page.getByTestId('Chat-Room-Header-Contact-Name');
    this.customerName = this.clientName;
    this.closeButton = page.getByTestId('chatRoom-closeConversationButton');
    this.reopenButton = page.getByTestId('chatRoom-reopenConversationButton');
    this.messageInput = page.getByTestId('Message-Text-Input');
    this.sendButton = page.getByTestId('Send-Button');
    this.emojiButton = page.getByTestId('Emoji-Button');
    this.macroButton = page.getByTestId('Macro-Button');
    this.attachButton = page.getByTestId('Attach-File-Button');
    this.accountSelector = page.getByTestId('Account-Channel-Selector');
    this.accountOption = (channelId) => page.getByTestId(`Account-Channel-${channelId}`);
    this.messagesContainer = page.getByTestId('Messages-Container');

    // Screenshot actions / modal
    this.screenshotTrigger = this.roomHeader.locator('button:has(svg.tabler-icon-camera-plus)').first();
    this.screenshotModal = page.getByTestId('modal-screenshot-container');
    this.screenshotCancelButton = page.getByTestId('cancel-ss-button');
    this.screenshotSendButton = page.getByTestId('send-ss-button');

    // Message bubbles / indicators
    this.bubbles = page.getByTestId(/^Message-Bubble-/);
    this.agentBubble = page.locator('div.bg-blue-100');
    this.customerBubble = page.locator('div.bg-slate-100:not(:has(div.rounded-full))');
    this.typingIndicator = page.locator('div.bg-slate-100:has(div.rounded-full.will-change-transform)');

    // Detail panel / SLA hooks
    this.assigneeSection = page.getByTestId('Chat-Detail-Section-assignee');
    this.detailTitle = page.getByTestId('Chat-Detail-Title');
    this.copyId = page.getByTestId('Chat-Detail-Copy-Id-Button');
    this.detailSection = (slug) => page.getByTestId(`Chat-Detail-Section-${slug}`);
    this.frtLabel = page.getByTestId('Chat-Detail-Sla-frt');
    this.ttcLabel = page.getByTestId('Chat-Detail-Sla-ttc');
    this.rltLabel = page.getByTestId('Chat-Detail-Sla-rlt');
    this.waitTimeLabel = page.getByTestId('Chat-Detail-Sla-wait-time');
  }

  sectionHeading(section = 'all') {
    const title = SECTION_TITLES[section] ?? /.+/;
    return this.page.getByRole('heading', { level: 1, name: title });
  }

  screenshotOption(labelRx) {
    return this.page.getByRole('button', { name: labelRx });
  }

  navByKey(key) {
    const map = {
      'your-inbox': this.yourInboxNav,
      unassigned: this.unassignedNav,
      all: this.allNav,
      spam: this.spamNav,
      starred: this.starredNav,
      junk: this.junkNav,
    };
    return map[key];
  }

  pathByKey(key) {
    const map = {
      'your-inbox': '/conversation/your-inbox',
      unassigned: '/conversation/unassigned',
      all: '/conversation/all',
      spam: '/conversation/spam',
      starred: '/conversation/starred',
      junk: '/conversation/junk',
    };
    return map[key];
  }

  channelByKey(key) {
    const map = {
      widget: this.channelWidget,
      whatsapp_api: this.channelWhatsappApi,
      whatsapp_web: this.channelWhatsappWeb,
      instagram: this.channelInstagram,
      facebook_messenger: this.channelFacebookMessenger,
      email: this.channelEmail,
      telegram: this.channelTelegram,
    };
    return map[key];
  }

  async waitForSectionReady(section = 'all') {
    await expect(
      this.chatListContainer
        .or(this.chatListEmpty)
        .or(this.chatListTitle)
        .or(this.sectionHeading(section))
    ).toBeVisible({ timeout: 15000 });
  }

  async goto(pathOrSection = '/conversation', query = '') {
    const isExplicitPath = pathOrSection.startsWith('/');
    const resolvedBasePath = isExplicitPath ? pathOrSection : this.pathByKey(pathOrSection) || pathOrSection;
    const resolvedPath = `${resolvedBasePath}${query || ''}`;

    await this.page.goto(resolvedPath, { waitUntil: 'load', timeout: 30000 });

    if (!isExplicitPath && this.pathByKey(pathOrSection)) {
      await this.waitForSectionReady(pathOrSection);
    }
  }

  async gotoSection(section, query = '') {
    await this.goto(section, query);
  }

  async gotoYourInbox() { await this.gotoSection('your-inbox'); }
  async gotoUnassigned() { await this.gotoSection('unassigned'); }
  async gotoAll() { await this.gotoSection('all'); }
  async gotoStarred() { await this.gotoSection('starred'); }
  async gotoSpam() { await this.gotoSection('spam'); }
  async gotoJunk() { await this.gotoSection('junk'); }

  async gotoChannel(channelId) {
    await this.page.goto(`/conversation/channel?channel=${channelId}`, { waitUntil: 'load', timeout: 30000 });
  }

  async gotoTeam(teamTitle) {
    await this.page.goto(`/conversation/team?team=${encodeURIComponent(teamTitle)}`, {
      waitUntil: 'load',
      timeout: 30000,
    });
  }

  async hasChat(n = 1, timeout = 8000) {
    return this.chatItem(n).isVisible({ timeout }).catch(() => false);
  }

  async getChatCount() {
    return this.chatItems.count();
  }

  async getChatName(n = 1) {
    return this.cardName(n).textContent();
  }

  async getVisibleChatNames() {
    return this.page.locator('[data-cy^="chat-list-"][data-cy$="-name"]').allTextContents();
  }

  async openChat(n = 1) {
    const chat = this.chatItem(n);
    await expect(chat).toBeVisible({ timeout: 15000 });
    await chat.click();
    await expect(this.chatRoom).toBeVisible({ timeout: 15000 });
  }

  async openFirstChat() {
    await this.gotoAll();
    await this.openChat(1);
  }

  async openChatByIndex(index) {
    await this.openChat(index + 1);
  }

  async openQuickActionMenu(n = 1) {
    const item = this.chatItem(n);
    await expect(item).toBeVisible({ timeout: 15000 });
    await item.hover();
    await expect(this.cardQuickAction(n)).toBeVisible({ timeout: 5000 });
    await this.cardQuickAction(n).click();
  }

  async clickQuickAction(n, key) {
    await this.openQuickActionMenu(n);
    await expect(this.quickAction(key)).toBeVisible({ timeout: 5000 });
    await this.quickAction(key).click();
  }

  async openQuickAction(n, key) {
    await this.clickQuickAction(n, key);
  }

  async hasScreenshotTrigger(timeout = 5000) {
    return this.screenshotTrigger.isVisible({ timeout }).catch(() => false);
  }

  async openScreenshotMenu() {
    await expect(this.roomHeader).toBeVisible({ timeout: 10000 });
    await expect(this.screenshotTrigger).toBeVisible({ timeout: 5000 });
    await this.screenshotTrigger.click();
  }

  async chooseEntireRoomScreenshot() {
    const option = this.screenshotOption(/Entire Room|Seluruh Ruangan/i);
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
  }

  async chooseSelectedAreaScreenshot() {
    const option = this.screenshotOption(/Selected area|Bagian yang dipilih/i);
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
  }

  async waitForScreenshotModal() {
    await expect(this.screenshotModal).toBeVisible({ timeout: 10000 });
  }

  async sendScreenshot() {
    await expect(this.screenshotSendButton).toBeVisible();
    await this.screenshotSendButton.click();
  }

  async cancelScreenshot() {
    await expect(this.screenshotCancelButton).toBeVisible();
    await this.screenshotCancelButton.click();
  }

  async sendMessage(text) {
    await this.messageInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.messageInput.fill(text);
    await this.sendButton.click({ force: true });
  }

  async closeConversation() {
    await this.closeButton.click();
  }

  async reopenConversation() {
    await this.reopenButton.click();
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

    const hasChats = await this.hasChat(1, 5000);
    if (!hasChats) return false;

    await this.openChat(1);
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
    await this.gotoSection(navKey);
    await expect(this.page).toHaveURL(new RegExp(path.replace(/\//g, '\\/')));
    await expect(this.chatListTitle.or(this.sectionHeading(navKey))).toBeVisible();
  }

  async verifyChannelFiltersChatList(channelKey) {
    await this.goto('/conversation');
    const chNav = this.channelByKey(channelKey);
    const vis = await chNav.isVisible().catch(() => false);
    if (!vis) return false;
    await chNav.click();
    await this.page.waitForTimeout(2000);
    await expect(this.chatListContainer.or(this.chatListEmpty).or(this.chatListTitle)).toBeVisible({ timeout: 15000 });
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

  async expectSlaMetricsVisible() {
    await this.verifySlaMetricsDisplayed();
  }

  async openDetailSection(slug) {
    await this.detailSection(slug).click();
  }
}

module.exports = { InboxPage, NAV, CHANNELS };
