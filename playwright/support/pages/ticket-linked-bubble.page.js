const { expect } = require('@playwright/test');

class TicketLinkedBubblePage {
  constructor(page) {
    this.page = page;

    this.bubbleGroup = page.locator('div.group').first();
    this.selectedBubble = page.locator('div.border-blue-600.border-2');
    this.bubbleWithTicket = page.locator('div.bg-pink-100');
    this.seeTicketLink = page.locator('a[href*="ticketing?ticketId="]');

    this.selectCheckbox = page.locator('button[role="checkbox"]');
    this.selectedBar = page.locator('div.border-slate-700');
    this.createTicketBtn = page.getByRole('button', { name: /create.?ticket|buat.?tiket/i });
    this.cancelSelectBtn = page.getByRole('button', { name: /cancel|batal/i });

    this.dialog = page.locator('[role="dialog"]');
    this.dialogTitle = this.dialog.locator('h2');
    this.searchTicketType = page.locator('input[placeholder*="ticket" i]');
    this.ticketTypeOptions = this.dialog.locator('button:has(div.wrap-break-word)');
    this.confirmCreateBtn = this.dialog.getByRole('button', { name: /create.?ticket|buat.?tiket/i });

    this.ticketDrawer = page.locator('[role="dialog"]');
    this.linkedMessagesAccordion = page.getByText(/linked messages|pesan terhubung/i);
    this.linkedConversationAccordion = page.getByText(/linked conversation|percakapan terhubung/i);
    this.linkedTicketsAccordion = page.getByText(/linked tickets|tiket terhubung/i);
    this.linkedTicketsList = page.locator('button[aria-label^="View ticket:"]');

    this.duplicateModal = page.locator('div.bg-orange-50\\, div.border-orange-50');
    this.duplicateModalClose = page.getByRole('button', { name: /close|tutup/i });

    this.slaBadge = page.locator('[aria-label="sla duration"]');
    this.closeTicketBtn = page.getByRole('button', { name: /tutup|close/i });
    this.reopenTicketBtn = page.getByRole('button', { name: /buka|reopen/i });
  }

  async enableBubbleSelection() {
    await this.bubbleGroup.first().hover();
    const actionMenu = this.page.locator('div.flex.gap-1.bg-white').last();
    const hasSelect = await actionMenu.isVisible().catch(() => false);
    if (!hasSelect) return false;
    const selectBtn = actionMenu.locator('button').last();
    await selectBtn.click();
    return true;
  }

  async selectBubbleByIndex(index = 0) {
    const checkbox = this.page.locator('button[role="checkbox"]').nth(index);
    await expect(checkbox).toBeVisible({ timeout: 5000 });
    await checkbox.click();
  }

  async clickCreateTicket() {
    await this.createTicketBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.createTicketBtn.click();
    await expect(this.dialog).toBeVisible({ timeout: 10000 });
  }

  async selectTicketType(name) {
    await this.searchTicketType.fill(name);
    await this.page.waitForTimeout(1000);
    const option = this.ticketTypeOptions.first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async confirmCreateTicket() {
    await this.confirmCreateBtn.click();
  }

  async cancelSelection() {
    await this.cancelSelectBtn.click();
  }

  async openTicketDrawer() {
    await this.seeTicketLink.first().click();
    await this.page.waitForURL(/ticketing/, { timeout: 15000 });
    await expect(this.page.locator('h2, h1').first()).toBeVisible({ timeout: 10000 });
  }

  async openLinkedMessages() {
    await this.linkedMessagesAccordion.click();
  }

  async openLinkedConversation() {
    await this.linkedConversationAccordion.click();
  }

  async openLinkedTickets() {
    await this.linkedTicketsAccordion.click();
  }

  async verifyLinkedTicketBadgeVisible() {
    await expect(this.seeTicketLink.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyBubbleHasTicketBackground() {
    await expect(this.bubbleWithTicket.first()).toBeVisible({ timeout: 5000 });
  }

  async verifySelectedBarVisible() {
    await expect(this.selectedBar).toBeVisible({ timeout: 5000 });
  }

  async verifyDuplicateModalVisible() {
    await expect(this.duplicateModal).toBeVisible({ timeout: 5000 });
  }

  async verifyLinkedMessagesInDrawer() {
    await this.openLinkedMessages();
    const hasMessages = await this.page.locator('div.w-full.p-2').first().isVisible().catch(() => false);
    return hasMessages;
  }

  async verifyLinkedTicketsInConversation() {
    await this.openLinkedTickets();
    const hasTickets = await this.linkedTicketsList.first().isVisible().catch(() => false);
    return hasTickets;
  }

  async getSelectedMessageCount() {
    const text = await this.page.locator('div.text-xs.font-medium').textContent().catch(() => '0');
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }
}

module.exports = { TicketLinkedBubblePage };
