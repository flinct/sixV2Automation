const { expect } = require('@playwright/test');
const { getCurrentConfig } = require('../config');

class LiveChatPage {
  constructor(page) {
    this.page = page;

    this.liveChatNavActive = page.getByTestId('live-chat-nav-active');
    this.userLoginNameLabel = page.getByTestId('user-login-name-label');
    this.userLoginNameValue = page.getByTestId('user-login-name-value');
    this.userLoginRole = page.getByTestId('user-login-role');

    this.searchbarInbox = page.getByTestId('searchbar-inbox-2-0');
    this.listChatInbox = page.getByTestId(/^chat-list-/);
    this.inboxTanggal = page.getByTestId('inbox-tanggal');
  }

  async goto() {
    await this.page.goto('/conversation/your-inbox');
  }

  async elementCheckingLiveChatPage() {
    await expect.soft(this.liveChatNavActive).toBeVisible();
    await this.userLoginNameLabel.click();
    await expect.soft(this.userLoginNameValue).toBeVisible();
    await expect.soft(this.userLoginRole).toBeVisible();
    await expect.soft(this.searchbarInbox).toBeVisible();
    await expect.soft(this.listChatInbox).toBeVisible();
    await expect.soft(this.inboxTanggal.nth(0)).toBeVisible();

    const firstChat = this.listChatInbox.nth(0);
    await firstChat.click();
    await expect.soft(this.page.getByTestId('chat-room')).toBeVisible();
  }

  async createChildUser(role) {
    const config = getCurrentConfig();
    const adminCreds = config.getDefaultAccount();
    await this.page.goto('/settings/organization/members');
    await this.page.getByTestId('create-member-button').click();
    await this.page.getByTestId('member-role-select').selectOption(role);
    await this.page.getByTestId('save-member-button').click();
  }

  async deleteUserLogin(roleTarget) {
    await this.page.goto('/settings/organization/members');
    const userRow = this.page.getByTestId('member-row').filter({ hasText: roleTarget });
    await userRow.getByTestId('delete-member-button').click();
    await this.page.getByTestId('confirm-delete-button').click();
  }

  async accessPageAsAdmin() {
    await expect.soft(this.page.getByTestId('dashboard-nav')).toBeVisible();
    await expect.soft(this.page.getByTestId('settings-nav')).toBeVisible();
  }

  async accessPageAsAgent() {
    await expect.soft(this.page.getByTestId('inbox-nav')).toBeVisible();
    await expect.soft(this.page.getByTestId('contact-nav')).toBeVisible();
    await expect.soft(this.page.getByTestId('settings-nav')).not.toBeVisible();
  }
}

module.exports = { LiveChatPage };
