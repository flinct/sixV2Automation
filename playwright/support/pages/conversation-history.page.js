const { expect } = require('@playwright/test');

class ConversationHistoryPage {
  constructor(page) {
    this.page = page;
    this.historyTitle = page.getByRole('heading', { name: /Riwayat Percakapan|Conversation History/i });
    this.historyContainer = this.historyTitle.locator('..').locator('..');
  }

  async verifyHistorySectionVisible() {
    await expect(this.historyTitle).toBeVisible({ timeout: 10000 });
  }

  async getHistoryCount() {
    return this.historyContainer.locator('> div > div').count();
  }

  async verifyHistoryContainsText(expectedText) {
    await expect(this.historyContainer).toContainText(expectedText);
  }
}

module.exports = { ConversationHistoryPage };
