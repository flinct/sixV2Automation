const { expect } = require('@playwright/test');

class CheckAllPage {
  constructor(page) {
    this.page = page;

    this.inboxNav = page.getByTestId('inbox-nav');
    this.inboxUnassignedNav = page.getByTestId('inbox-unassigned-nav');
    this.inboxAllNav = page.getByTestId('inbox-all-nav');
    this.inboxSpamNav = page.getByTestId('inbox-spam-nav');
    this.inboxStarredNav = page.getByTestId('inbox-starred-nav');
    this.groupChatNav = page.getByTestId('group-chat-nav');

    this.chatListTitle = page.getByTestId('chat-list-title');
  }

  async accessConversation() {
    await this.inboxNav.click();
    await expect(this.page).toHaveURL(/\/conversation\/your-inbox/);
    await expect(this.chatListTitle).toContainText(/your inbox|kotak pesan anda/i);
  }

  async accessConversationUnassigned() {
    await this.inboxUnassignedNav.click();
    await expect(this.page).toHaveURL(/\/conversation\/unassigned/);
    await expect(this.chatListTitle).toContainText(/unassigned|belum ditugaskan/i);
  }

  async accessConversationAll() {
    await this.inboxAllNav.click();
    await expect(this.page).toHaveURL(/\/conversation\/all/);
    await expect(this.chatListTitle).toContainText(/all|semua/i);
  }

  async accessConversationSpam() {
    await this.inboxSpamNav.click();
    await expect(this.page).toHaveURL(/\/conversation\/spam/);
    await expect(this.chatListTitle).toContainText(/spam/i);
  }

  async accessConversationStarred() {
    await this.inboxStarredNav.click();
    await expect(this.page).toHaveURL(/\/conversation\/starred/);
    await expect(this.chatListTitle).toContainText(/starred|berbintang/i);
  }

  async accessGroupConversation() {
    await this.groupChatNav.click();
    await expect(this.page).toHaveURL(/\/conversation\/channel\?channel=whatsapp_web_group/);
  }
}

module.exports = { CheckAllPage };
