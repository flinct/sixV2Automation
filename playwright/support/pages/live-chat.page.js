const { expect } = require('@playwright/test');
const { getCurrentConfig } = require('../config');
const { randomAsk } = require('../helpers/generators');

const WIDGET_TEST_URL = 'https://widgettest-two.vercel.app/index2.html';
const WIDGET_LICENSE_SELECTOR_BY_ENV = {
  local: 'chicken tester dev v2',
  dev: 'chicken tester dev v2',
  prod: 'tantaffgo',
};

function randomEmail() {
  return `asdasd${Date.now()}${Math.floor(Math.random() * 1000)}@g.com`;
}

function randomPhone() {
  return `62812${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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

  async generateNewWidgetChat(options = {}) {
    const config = getCurrentConfig();
    const envName = config.env.name;
    const licenseSelector = options.licenseSelector || WIDGET_LICENSE_SELECTOR_BY_ENV[envName];

    if (!licenseSelector) {
      throw new Error(`Widget license selector is not configured for ENV='${envName}'`);
    }

    const widgetUrl = options.widgetUrl || WIDGET_TEST_URL;
    const topic = options.topic || 'complain';
    const email = options.email || randomEmail();
    const phone = options.phone || randomPhone();
    const message = options.message || randomAsk();

    const waitForLiveChatFrame = async (urlPattern, timeout = 30000) => {
      const deadline = Date.now() + timeout;

      while (Date.now() < deadline) {
        const frame = this.page
          .frames()
          .slice()
          .reverse()
          .find((candidate) => {
            const url = candidate.url();
            return url.includes('/livechat/') && (!urlPattern || urlPattern.test(url));
          });

        if (frame) return frame;
        await this.page.waitForTimeout(250);
      }

      throw new Error(`Timed out waiting for live chat frame: ${urlPattern}`);
    };

    await this.page.goto(widgetUrl, { waitUntil: 'domcontentloaded' });

    const licensePicker = this.page.locator('#loginSelectorPicker');
    await expect(licensePicker).toBeVisible({ timeout: 30000 });
    await licensePicker.selectOption(licenseSelector);
    await expect(licensePicker).toHaveValue(licenseSelector);

    const launcher = this.page.locator('#satuinbox-livechat-widget-launcher:visible').last();
    await expect(launcher).toBeVisible({ timeout: 60000 });
    await launcher.click();

    let widgetFrame = await waitForLiveChatFrame(/\/home\?/);
    await widgetFrame.getByRole('button', { name: /Chat Sekarang|Chat Now/i }).click();

    widgetFrame = await waitForLiveChatFrame(/\/conversation\?/);
    await widgetFrame.getByRole('button', { name: /Buat Pesan Baru|Create New Message/i }).click();

    widgetFrame = await waitForLiveChatFrame(/\/conversation-form\?/);
    await widgetFrame.locator('#search-topic').fill(topic);
    await widgetFrame.getByRole('button', { name: new RegExp(escapeRegex(topic), 'i') }).first().click();
    await widgetFrame.getByPlaceholder(/Email/i).fill(email);

    const phoneInput = widgetFrame.getByPlaceholder(/Phone|Telepon|Nomor/i).first();
    if (await phoneInput.isVisible().catch(() => false)) {
      await phoneInput.fill(phone);
    }

    const submitButton = widgetFrame.getByRole('button', { name: /Kirim|Send|Submit/i }).last();
    await expect(submitButton).toBeEnabled({ timeout: 30000 });
    await submitButton.click();

    widgetFrame = await waitForLiveChatFrame(/\/message\//);
    await widgetFrame.getByPlaceholder(/Ketik Pesan|Type Message|Message/i).fill(message);

    const sendButton = widgetFrame.locator('button').last();
    await expect(sendButton).toBeEnabled({ timeout: 30000 });
    await sendButton.click();
    await expect(widgetFrame.locator('body')).toContainText(message, { timeout: 30000 });

    return {
      envName,
      licenseSelector,
      topic,
      email,
      phone,
      message,
    };
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
