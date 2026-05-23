const { expect } = require('@playwright/test');

class ConversationDetailPage {
  constructor(page) {
    this.page = page;

    this.detailHeader = page.getByRole('heading', { name: /Detail|Details/i });
    this.frtLabel = page.getByText(/^FRT$/i);
    this.ttcLabel = page.getByText(/^TTC$/i);
    this.rltLabel = page.getByText(/^RLT$/i);
    this.waitTimeLabel = page.getByText(/Waktu Tunggu|Wait Time/i);
    this.closeButton = page.getByRole('button', { name: /Tutup|Close/i });
    this.reopenButton = page.getByRole('button', { name: /Buka|Reopen/i });
    this.historySection = page.getByRole('heading', { name: /Riwayat|History/i });
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
