const { expect } = require("@playwright/test");

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

class TicketLinkedBubblePage {
  constructor(page) {
    this.page = page;

    // =====================================================
    // LEGACY (Existing bubble selection + see ticket)
    // =====================================================
    this.bubbleContainer = page.locator("#conversation-buble");
    this.bubbleGroup = page.locator("div.group").first();
    this.selectedBubble = page.locator("div.border-blue-600.border-2");
    this.bubbleWithTicket = page.locator("div.bg-pink-100");
    this.seeTicketLink = page.locator('a[href*="ticketing?ticketId="]');

    this.bubbleActionMenu = page.locator("div.flex.gap-1.bg-white.px-1");
    this.threeDotMenuBtn = page.locator('button[aria-haspopup="dialog"]');
    this.selectMessagesMenuItem = page.getByRole("button", {
      name: /pilih pesan|select message/i,
    });
    this.selectCheckbox = page.locator('button[role="checkbox"]');
    this.selectedBar = page.locator("div.border-slate-700");
    this.createTicketBtn = page.getByRole("button", {
      name: /create.?ticket|buat.?tiket/i,
    });
    this.cancelSelectBtn = page.getByRole("button", { name: /cancel|batal/i });

    this.dialog = page.locator('[role="dialog"]');
    this.createTicketDialog = page
      .locator('[role="dialog"]')
      .filter({ hasText: /buat tiket baru|create new ticket/i })
      .first();
    this.searchTicketType = page.locator('input[placeholder*="ticket" i]');
    this.ticketTypeOptions = this.dialog.locator(
      "button:has(div.wrap-break-word)",
    );
    this.ticketTypeDropdownOptions = page.locator(
      '[data-radix-popper-content-wrapper] button',
    );
    this.priorityDropdownOptions = page.locator(
      '[data-radix-popper-content-wrapper] [role="option"]',
    );
    this.confirmCreateBtn = this.dialog.getByRole("button", {
      name: /create.?ticket|buat.?tiket/i,
    });
    this.createdTicketReviewDialog = page
      .locator('[role="dialog"]')
      .filter({ hasText: /tinjau tiket yang dibuat|review created ticket/i })
      .first();

    this.ticketDrawer = page.locator('[role="dialog"]').first();
    this.linkedMessagesAccordion = page.getByRole("button", {
      name: /ticket link|tautan tiket|bubble chat/i,
    });
    this.linkedConversationAccordion = page.getByRole("button", {
      name: /linked conversation|percakapan terhubung/i,
    });
    this.linkedTicketsAccordion = page.getByText(
      /linked tickets|tiket terhubung/i,
    );
    this.linkedTicketsList = page.locator('button[aria-label^="View ticket:"]');

    this.duplicateModal = page
      .locator("div.bg-orange-50, div.border-orange-50")
      .first();
    this.duplicateModalClose = page.getByRole("button", {
      name: /close|tutup/i,
    });

    this.slaBadge = page.locator('[aria-label="sla duration"]');
    this.closeTicketBtn = page.getByRole("button", { name: /tutup|close/i });
    this.reopenTicketBtn = page.getByRole("button", { name: /buka|reopen/i });

    // =====================================================
    // APPEND — AddToTicketModal (US-002)
    // =====================================================
    this.appendToTicketBtn = page.getByRole("button", {
      name: /add to ticket|tambahkan ke tiket/i,
    });
    this.ticketPickerModal = page
      .locator('[role="dialog"]')
      .filter({ hasText: /add to ticket|tambahkan ke tiket/i });
    this.ticketPickerSearch = this.ticketPickerModal.locator("input").first();
    this.ticketPickerOptions = this.ticketPickerModal
      .locator("button")
      .filter({ hasText: /CV-|TK-/i });
    this.ticketPickerConfirmBtn = this.ticketPickerModal.getByRole("button", {
      name: /add to ticket|tambahkan ke tiket/i,
    });
    this.ticketPickerCancelBtn = this.ticketPickerModal.getByRole("button", {
      name: /cancel|batal/i,
    });
    this.ticketPickerEmpty = this.ticketPickerModal.getByText(
      /no tickets found|tidak ada tiket ditemukan/i,
    );
    this.alreadyLinkedWarning = this.ticketPickerModal.getByText(
      /already have a ticket linked|sudah memiliki tiket/i,
    );

    // Thread panel append (Flow from LinkedConversationPanel bottom bar)
    this.addFromPanelBtn = page
      .locator("#scrollableLinkedConversationPanel")
      .locator("..")
      .getByRole("button", { name: /add to ticket|tambahkan ke tiket/i });

    // =====================================================
    // REMOVE — LinkedMessagesSection (US-004)
    // =====================================================
    this.removeBubbleBtn = page.getByRole("button", { name: /remove bubble/i });
    this.removeConfirmDialog = page
      .locator('[role="dialog"]')
      .filter({ hasText: /remove this message|hapus pesan ini/i });
    this.removeConfirmBtn = this.removeConfirmDialog.getByRole("button", {
      name: /remove|hapus/i,
    });
    this.removeCancelBtn = this.removeConfirmDialog.getByRole("button", {
      name: /cancel|batal/i,
    });

    // =====================================================
    // NAVIGATION — LinkedConversationPanel (US-005, US-006)
    // =====================================================
    this.showDetailChatLink = page.getByRole("link", {
      name: /show detail chat|lihat semua/i,
    });
    this.linkedConversationPanel = page.locator(
      "#scrollableLinkedConversationPanel",
    );
    this.backToTicketDetailBtn = page.getByRole("button", {
      name: /back to ticket detail|kembali ke detail tiket/i,
    });
    this.panelMessageCheckbox = this.linkedConversationPanel.locator(
      'button[role="checkbox"]',
    );
    this.panelMessageRow = this.linkedConversationPanel
      .locator("div")
      .filter({ has: page.locator('button[role="checkbox"]') });

    // =====================================================
    // SYNC — Ticket Chat Room Reply (US-007, US-008)
    // =====================================================
    this.replyToCustomerTab = page.getByRole("button", {
      name: /reply to customer|balas ke pelanggan/i,
    });
    this.internalNoteTab = page.getByRole("button", {
      name: /internal note|catatan internal/i,
    });
    this.replyToCustomerBtn = page.getByRole("button", {
      name: /reply to customer|balas ke pelanggan/i,
    });
    this.crossSendConfirmBtn = page
      .locator('[role="dialog"]')
      .filter({ hasText: /send to customer|kirim ke pelanggan/i })
      .getByRole("button", { name: /confirm|konfirmasi|send|kirim/i });

    // =====================================================
    // TOAST / STATUS
    // =====================================================
    this.toastMessage = page
      .locator('.Toastify__toast, [role="alert"]')
      .filter({
        hasText:
          /success|error|berhasil|gagal|added to ticket|ditambahkan ke tiket|failed to add|gagal menambahkan/i,
      })
      .first();
    this.toastSuccess = page
      .locator('.Toastify__toast, [role="alert"]')
      .filter({ hasText: /success|berhasil|added to ticket|ditambahkan ke tiket/i })
      .first();
    this.toastError = page
      .locator('.Toastify__toast, [role="alert"]')
      .filter({ hasText: /error|gagal|failed to add|gagal menambahkan/i })
      .first();
  }

  // =====================================================
  // LEGACY METHODS
  // =====================================================

  async enableBubbleSelection() {
    const chatRoom = this.page.locator("#conversation-chatroom-container");
    const bubbleRows = chatRoom.locator("div.group");
    const count = await bubbleRows.count();
    if (count === 0) return false;

    let targetIndex = 0;
    for (let i = 0; i < count; i++) {
      const hasTicket = await bubbleRows
        .nth(i)
        .locator("div.bg-pink-100")
        .first()
        .isVisible()
        .catch(() => false);
      if (!hasTicket) {
        targetIndex = i;
        break;
      }
    }

    const targetBubble = bubbleRows.nth(targetIndex);
    await targetBubble.hover({ force: true });
    await this.page.waitForTimeout(300);

    const threeDot = targetBubble.locator(
      ".flex.gap-1.bg-white > button:nth-child(2)",
    );
    await threeDot.waitFor({ state: "visible", timeout: 5000 });
    await threeDot.click();
    await this.page.waitForTimeout(500);

    await this.selectMessagesMenuItem.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await this.selectMessagesMenuItem.click();
    await this.page.waitForTimeout(500);

    await expect(this.createTicketBtn).toBeVisible({ timeout: 5000 });
    return true;
  }

  async selectBubbleByIndex(index = 0) {
    const checkbox = this.page.locator('button[role="checkbox"]').nth(index);
    await expect(checkbox).toBeVisible({ timeout: 5000 });
    await checkbox.click();
  }

  async clickCreateTicket() {
    await this.createTicketBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.createTicketBtn.click();
    await expect(this.dialog).toBeVisible({ timeout: 10000 });
  }

  async selectTicketType(name) {
    await expect(this.createTicketDialog).toBeVisible({ timeout: 10000 });
    const trigger = this.createTicketDialog.getByRole("button", {
      name: /cari dan pilih jenis tiket|search and select ticket type/i,
    });
    await trigger.click();
    await this.page.waitForTimeout(500);

    const dropdown = this.page.locator('[data-radix-popper-content-wrapper]').last();
    const searchInput = dropdown.locator('input[placeholder*="search" i]');
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill(name);
    }

    const option = dropdown
      .locator("button")
      .filter({ hasText: new RegExp(`^${escapeRegex(name)}$`, "i") })
      .last();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
  }

  async selectPriority(name = "Low") {
    const trigger = this.createTicketDialog.getByRole("combobox", {
      name: /prioritas|priority/i,
    });

    await expect(trigger).toBeVisible({ timeout: 10000 });

    await trigger.click();
    await this.page.waitForTimeout(500);

    const dropdown = this.page.locator('[data-radix-popper-content-wrapper]').last();
    const option = dropdown.getByRole("option", {
      name: new RegExp(`^${escapeRegex(name)}$`, "i"),
    });
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
    await expect(
      this.createTicketDialog.locator("button").filter({ hasText: new RegExp(`^${escapeRegex(name)}$`, "i") }).last(),
    ).toBeVisible({ timeout: 5000 });
    await this.page.waitForTimeout(1000);
  }

  async confirmCreateTicket() {
    const createButton = this.createTicketDialog
      .getByRole("button", { name: /create.?ticket|buat.?tiket/i })
      .last();
    await expect(createButton).toBeEnabled({ timeout: 10000 });
    await createButton.click();
  }

  async finishCreatedTicketReviewDialog() {
    if (!(await this.createdTicketReviewDialog.isVisible({ timeout: 10000 }).catch(() => false))) return;

    const continueButton = this.createdTicketReviewDialog
      .getByRole("button", { name: /lanjut buat|continue/i })
      .last();
    await expect(continueButton).toBeVisible({ timeout: 10000 });
    await continueButton.click();
    await expect(this.createdTicketReviewDialog).not.toBeVisible({ timeout: 5000 });
  }

  async createTicketFromSelectedBubble({ ticketType = "Complain", priority = "Low" } = {}) {
    await this.clickCreateTicket();
    await this.selectTicketType(ticketType);
    await this.selectPriority(priority);
    await this.confirmCreateTicket();

    const priorityError = this.createTicketDialog.getByText(
      /priority wajib diisi|prioritas wajib diisi|priority.*required/i,
    );
    if (await priorityError.isVisible({ timeout: 1000 }).catch(() => false)) {
      await this.selectPriority(priority);
      await this.confirmCreateTicket();
    }

    await this.finishCreatedTicketReviewDialog();
    await expect(this.seeTicketLink.first()).toBeVisible({ timeout: 30000 });
    await expect(this.bubbleWithTicket.first()).toBeVisible({ timeout: 30000 });
  }

  async cancelSelection() {
    await this.cancelSelectBtn.click();
  }

  async openTicketDrawer() {
    await this.seeTicketLink.first().click();
    await this.page.waitForURL(/ticketing/, { timeout: 15000 });
    await expect(this.ticketDrawer).toBeVisible({ timeout: 10000 });
  }

  async openLinkedMessages() {
    await this.linkedMessagesAccordion.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await this.linkedMessagesAccordion.click();
    await this.page.waitForTimeout(500);
  }

  async openLinkedConversation() {
    await this.linkedConversationAccordion.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await this.linkedConversationAccordion.click();
    await this.page.waitForTimeout(500);
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
    const hasMessages = await this.page
      .locator("div.w-full.p-2")
      .first()
      .isVisible()
      .catch(() => false);
    return hasMessages;
  }

  async verifyLinkedTicketsInConversation() {
    await this.openLinkedTickets();
    const hasTickets = await this.linkedTicketsList
      .first()
      .isVisible()
      .catch(() => false);
    return hasTickets;
  }

  async getSelectedMessageCount() {
    const text = await this.page
      .locator("div.text-xs.font-medium")
      .textContent()
      .catch(() => "0");
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  // =====================================================
  // APPEND METHODS (US-002) — ACTIVE
  // =====================================================

  async openAddToTicketModal() {
    await this.appendToTicketBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.appendToTicketBtn.click();
    await expect(this.ticketPickerModal).toBeVisible({ timeout: 10000 });
  }

  async searchTicketInPicker(query) {
    await this.ticketPickerSearch.waitFor({ state: "visible", timeout: 5000 });
    await this.ticketPickerSearch.fill(query);
    await this.page.waitForTimeout(1000);
  }

  async selectTicketFromPickerByIndex(index = 0) {
    const option = this.ticketPickerOptions.nth(index);
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
    await expect(this.ticketPickerConfirmBtn).toBeEnabled({ timeout: 5000 });
  }

  async confirmAppend() {
    await expect(this.ticketPickerConfirmBtn).toBeEnabled({ timeout: 5000 });
    await this.ticketPickerConfirmBtn.click();
  }

  async cancelAppend() {
    await this.ticketPickerCancelBtn.click();
  }

  async isTicketPickerEmpty() {
    return await this.ticketPickerEmpty.isVisible().catch(() => false);
  }

  async clickAddFromThreadPanel() {
    await this.addFromPanelBtn.waitFor({ state: "visible", timeout: 5000 });
    await this.addFromPanelBtn.click();
  }

  // =====================================================
  // REMOVE METHODS (US-004) — ACTIVE
  // =====================================================

  async clickRemoveBubble(index = 0) {
    const btn = this.removeBubbleBtn.nth(index);
    await expect(btn).toBeVisible({ timeout: 5000 });
    await btn.click();
  }

  async confirmRemove() {
    await expect(this.removeConfirmDialog).toBeVisible({ timeout: 5000 });
    await this.removeConfirmBtn.click();
  }

  async cancelRemove() {
    await expect(this.removeConfirmDialog).toBeVisible({ timeout: 5000 });
    await this.removeCancelBtn.click();
  }

  async isRemoveButtonVisible(index = 0) {
    return await this.removeBubbleBtn
      .nth(index)
      .isVisible()
      .catch(() => false);
  }

  // =====================================================
  // NAVIGATION METHODS (US-005, US-006) — ACTIVE
  // =====================================================

  async clickShowDetailChat() {
    await this.showDetailChatLink.waitFor({ state: "visible", timeout: 5000 });
    await this.showDetailChatLink.click();
  }

  async verifyLinkedConversationPanelVisible() {
    await expect(this.linkedConversationPanel).toBeVisible({ timeout: 10000 });
  }

  async clickBackToTicketDetail() {
    await this.backToTicketDetailBtn.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await this.backToTicketDetailBtn.click();
  }

  async selectMessageInPanel(index = 0) {
    const checkbox = this.panelMessageCheckbox.nth(index);
    await expect(checkbox).toBeVisible({ timeout: 5000 });
    await checkbox.click();
  }

  async isPanelMessageSelected(index = 0) {
    const cls = await this.panelMessageRow
      .nth(index)
      .getAttribute("class")
      .catch(() => "");
    return cls.includes("border-blue") || cls.includes("bg-blue");
  }

  // =====================================================
  // SYNC METHODS (US-007, US-008) — PARTIAL
  // =====================================================

  async clickReplyToCustomerTab() {
    await this.replyToCustomerTab.waitFor({ state: "visible", timeout: 10000 });
    await this.replyToCustomerTab.click();
  }

  async clickInternalNoteTab() {
    await this.internalNoteTab.waitFor({ state: "visible", timeout: 5000 });
    await this.internalNoteTab.click();
  }

  async confirmCrossSend() {
    await this.crossSendConfirmBtn.waitFor({ state: "visible", timeout: 5000 });
    await this.crossSendConfirmBtn.click();
  }
}

module.exports = { TicketLinkedBubblePage };
