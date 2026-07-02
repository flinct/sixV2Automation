const { expect } = require('@playwright/test');

class ConversationDetailPage {
  constructor(page) {
    this.page = page;

    this.detailHeader = page.getByTestId('Chat-Detail-Title');
    this.frtLabel = page.getByTestId('Chat-Detail-Sla-frt');
    this.ttcLabel = page.getByTestId('Chat-Detail-Sla-ttc');
    this.rltLabel = page.getByTestId('Chat-Detail-Sla-rlt');
    this.waitTimeLabel = page.getByTestId('Chat-Detail-Sla-wait-time');
    this.closeButton = page.getByTestId('chatRoom-closeConversationButton');
    this.reopenButton = page.getByTestId('chatRoom-reopenConversationButton');
    this.historySection = page.getByTestId('Chat-Detail-Section-history');
    this.assigneeSection = page.getByTestId('Chat-Detail-Section-assignee');
  }

  async verifyDetailPanelVisible() {
    await expect(this.detailHeader).toBeVisible({ timeout: 10000 });
  }

  async verifySlaMetricsDisplayed() {
    await expect(this.frtLabel).toBeVisible({ timeout: 10000 });
  }

  async getFrtValue() {
    return this.frtLabel.locator('..').locator('span').textContent();
  }

  async getTtcValue() {
    return this.ttcLabel.locator('..').locator('span').textContent();
  }

  async getRltValue() {
    return this.rltLabel.locator('..').locator('span').textContent();
  }

  async getWaitTimeValue() {
    return this.waitTimeLabel.locator('..').locator('span').textContent();
  }

  async closeConversation() {
    await this.closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.closeButton.click();
  }

  async reopenConversation() {
    await this.reopenButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.reopenButton.click();
  }

  async waitForSlaMetrics(timeout = 15000) {
    await expect(this.frtLabel).toBeVisible({ timeout });
  }
}

module.exports = { ConversationDetailPage };
