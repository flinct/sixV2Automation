const { expect } = require('@playwright/test');

class InboxPage {
  constructor(page) {
    this.page = page;

    this.sidebar = page.getByTestId('Conversation-Sidebar-Navigation');
    this.navTitle = page.getByTestId('nav-filter-navName');

    this.yourInboxNav = page.getByTestId('inbox-nav-your-inbox');
    this.unassignedNav = page.getByTestId('inbox-nav-unassigned');
    this.allNav = page.getByTestId('inbox-nav-all');
    this.spamNav = page.getByTestId('inbox-nav-spam');
    this.starredNav = page.getByTestId('inbox-nav-starred');
    this.junkNav = page.getByTestId('inbox-nav-junk');

    this.channelWidget = page.getByRole('button').filter({ hasText: 'Widget' });
    this.channelWhatsappApi = page.getByRole('button').filter({ hasText: 'Whatsapp Api' });
    this.channelWhatsappWeb = this.sidebar.getByRole('button').filter({ hasText: /whatsapp web/i });
    this.channelInstagram = page.getByRole('button').filter({ hasText: 'Instagram' });
    this.channelFacebookMessenger = page.getByTestId('channel-nav-facebook_messenger');
    this.channelEmail = page.getByTestId('channel-nav-email');
    this.channelWhatsappWebGroup = page.getByTestId('channel-nav-whatsapp_web_group');

    this.groupChatNav = this.sidebar.getByRole('button').filter({ hasText: /wa web group/i });

    this.chatListHeader = page.getByTestId('Conversation-Chat-List-Header');
    this.chatListTitle = this.chatListHeader.locator('h1');
    this.chatListNavToggle = this.chatListHeader.locator('svg').first();
    this.chatListSearchButton = this.chatListHeader.getByRole('button');
    this.chatListContainer = page.getByTestId('Conversation-Chat-List-Container');
    this.chatListSearchInput = this.chatListContainer.locator('input');
    this.chatListCloseFilter = this.chatListContainer.getByRole('button').first();
    this.closeFilterPopup = page.getByTestId('dialog-close');

    this.ongoingTab = page.getByTestId('inbox-tab-ongoing');
    this.unassignedTab = page.getByTestId('inbox-tab-unassigned');
    this.resolvedTab = page.getByTestId('inbox-tab-resolved');

    this.chatListItem = (index) => page.getByTestId(`chat-list-${index}`);
    this.chatListItems = page.getByTestId(/^chat-list-/);

    this.chatRoom = page.locator('#conversation-screenshot-chatroom-capture-area');
    this.clientName = page.getByTestId('chatSection-clientName');
    this.moreButton = page.getByTestId('chatSection-moreButton');
    this.changeStatusButton = page.getByTestId('chatSection-button-changeStatus');

    this.chatRoomContainer = page.getByTestId('chatSection-chatRoom-container');
    this.customerBubble = (index) => page.locator('#conversation-buble.items-start').nth(index);
    this.agentBubble = (index) => page.locator('#conversation-buble.items-end').nth(index);

    this.messageInput = page.getByTestId('autogrowing-textarea');
    this.attachButton = page.getByTestId('chatSection-textbox-button-attch');
    this.emojiButton = page.getByTestId('chatSection-textbox-button-emoji');
    this.sendButton = page.getByTestId('chatSection-textbox-button-sendChat');

    this.sendMessageButtonOld = page.getByTestId('submit-message-inbox-button');
    this.chatInputOld = page.getByTestId('inbox-chatting-input');
    this.handoverButton = page.getByTestId('handover-chat-button');

    this.typingIndicator = page.getByTestId('chatSection-buble-chat-typingIndicator');

    this.chatDetailContainer = page.getByTestId('chatDetail-container-scetion');
    this.chatDetailTeam = page.getByTestId('chatDetail-team-value');
    this.chatDetailHandler = (index) => page.getByTestId(`chatDetail-handler-value-${index}`);
  }

  async goto() {
    await this.page.goto('/conversation');
  }

  async gotoYourInbox() {
    await this.goto();
    await this.yourInboxNav.click();
    await expect(this.yourInboxNav).toHaveClass(/bg-white/);
  }

  async gotoUnassigned() {
    await this.goto();
    await this.unassignedNav.click();
    await expect(this.unassignedNav).toHaveClass(/bg-white/);
  }

  async gotoAll() {
    await this.goto();
    await this.allNav.click();
    await expect(this.allNav).toHaveClass(/bg-white/);
  }

  async gotoStarred() {
    await this.goto();
    await this.starredNav.click();
    await expect(this.starredNav).toHaveClass(/bg-white/);
  }

  async gotoSpam() {
    await this.goto();
    await this.spamNav.click();
    await expect(this.spamNav).toHaveClass(/bg-white/);
  }

  async gotoJunk() {
    await this.goto();
    await this.junkNav.click();
    await expect(this.junkNav).toHaveClass(/bg-white/);
  }

  async openFirstChat() {
    await this.gotoAll();
    await this.chatListNavToggle.click();
    const firstChat = this.chatListItem(1);
    await expect(firstChat).toBeVisible({ timeout: 60000 });
    await firstChat.click();
    await expect(this.chatRoom).toBeVisible();
  }

  async openChatByIndex(index) {
    const chat = this.chatListItem(index);
    await expect(chat).toBeVisible();
    await chat.click();
    await expect(this.chatRoom).toBeVisible();
  }

  async sendMessage(text) {
    await this.messageInput.fill(text);
    await this.sendButton.click();
  }

  async sendMessageOld(text) {
    await this.chatInputOld.fill(text);
    await this.sendMessageButtonOld.click();
  }

  async openFirstChatByChannel(channelType) {
    await this.goto();

    const channelMap = {
      widget: this.channelWidget,
      baileys: this.channelWhatsappWeb,
      whatsapp_web: this.channelWhatsappWeb,
      'whatsapp-official': this.channelWhatsappApi,
      whatsapp_api: this.channelWhatsappApi,
      email: this.channelEmail,
      instagram: this.channelInstagram,
      facebook: this.channelFacebookMessenger,
    };

    const channelNav = channelMap[channelType];
    if (channelNav) {
      await channelNav.click();
    }

    await this.chatListNavToggle.click();
    const firstChat = this.chatListItems.first();
    await expect(firstChat).toBeVisible({ timeout: 60000 });
    await firstChat.click();
    await expect(this.chatRoom).toBeVisible();
  }

  async toggleSidebar() {
    await this.chatListNavToggle.click();
  }

  async searchChat(query) {
    await this.chatListSearchButton.click();
    await this.chatListSearchInput.fill(query);
  }

  async closeSearch() {
    await this.chatListCloseFilter.click();
  }

  async clickHandover() {
    await this.handoverButton.click();
  }

  async getCustomerBubbleText(index = 0) {
    const bubble = this.customerBubble(index);
    return bubble.locator('span.whitespace-pre-wrap').textContent();
  }

  async getAgentBubbleText(index = 0) {
    const bubble = this.agentBubble(index);
    return bubble.locator('span.whitespace-pre-wrap').textContent();
  }

  async verifyCustomerMessage(expectedText, index = 0) {
    const bubble = this.customerBubble(index);
    await expect(bubble.locator('span.whitespace-pre-wrap')).toContainText(expectedText);
  }

  async verifyAgentMessage(expectedText, index = 0) {
    const bubble = this.agentBubble(index);
    await expect(bubble.locator('span.whitespace-pre-wrap')).toContainText(expectedText);
  }
}

module.exports = { InboxPage };
