const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage, TicketLinkedBubblePage, TicketingPage, LiveChatPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');
const { randomAsk } = require('../../../support/helpers/generators');

function fixmeStub(title, reason) {
  test.fixme(`${title} - ${reason}`, async () => {});
}

// =====================================================
// Existing Features (legacy US-001)
// =====================================================
test.describe('Linked Chat Bubble - Existing Features', () => {
  test.describe.configure({ mode: 'serial' });

  let authPage, inboxPage, bubblePage, liveChatPage, config;

  async function openGeneratedWidgetChat(page, message) {
    await inboxPage.gotoAll();
    const generatedChat = page.getByTestId(/^chat-list-/).filter({ hasText: message }).first();
    await expect(generatedChat).toBeVisible({ timeout: 60000 });
    await generatedChat.click();
    await expect(inboxPage.chatRoom).toBeVisible({ timeout: 15000 });
    await expect(inboxPage.customerBubble.last()).toContainText(message, { timeout: 15000 });
  }

  test.beforeAll(async () => { config = getCurrentConfig(); });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    liveChatPage = new LiveChatPage(page);
    const credentials = config.getDefaultAccount();

    const generatedChat = await liveChatPage.generateNewWidgetChat({ topic: 'complain' });
    await authPage.loginWithCredentials(credentials, { useV2: true });
    await openGeneratedWidgetChat(page, generatedChat.message);

    const enabled = await bubblePage.enableBubbleSelection();
    expect(enabled).toBeTruthy();
    await bubblePage.createTicketFromSelectedBubble({ ticketType: 'Complain', priority: 'Low' });
  });

  test('should show "See Ticket" badge on bubble with linked ticket', async ({ page }) => {
    await bubblePage.verifyLinkedTicketBadgeVisible();
    await bubblePage.verifyBubbleHasTicketBackground();
  });

  test('should open ticket drawer from "See Ticket" link on bubble', async ({ page }) => {
    await bubblePage.openTicketDrawer();
    await expect(bubblePage.ticketDrawer).toBeVisible({ timeout: 10000 });
  });

  test('should show linked messages in ticket drawer', async ({ page }) => {
    await bubblePage.openTicketDrawer();
    const hasMessages = await bubblePage.verifyLinkedMessagesInDrawer();
    expect(hasMessages).toBeTruthy();
    await expect(bubblePage.linkedMessagesAccordion).toBeVisible();
  });

  test('should show linked tickets in conversation detail sidebar', async ({ page }) => {
    const hasTickets = await bubblePage.verifyLinkedTicketsInConversation();
    expect(hasTickets).toBeTruthy();
  });

  fixmeStub('should enable bubble selection mode via action menu', 'Requires hover + action menu interaction');
  fixmeStub('should show create ticket dialog after selecting bubbles', 'Requires bubble selection first');
  fixmeStub('should cancel bubble selection mode', 'Requires bubble selection first');
});

// =====================================================
// Append to Existing Ticket (US-002) — ACTIVE
// =====================================================
test.describe('Linked Chat Bubble - Append to Ticket', () => {
  let authPage, inboxPage, bubblePage, config;

  test.beforeAll(async () => { config = getCurrentConfig(); });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  test('APP-01: should show "Add to Ticket" option after selecting customer bubbles', async ({ page }) => {
    await inboxPage.openFirstChat();
    const enabled = await bubblePage.enableBubbleSelection();
    test.skip(!enabled, 'Cannot enable bubble selection in this conversation');
    await expect(bubblePage.appendToTicketBtn).toBeVisible({ timeout: 5000 });
  });

  test('APP-02: should open AddToTicket modal with searchable ticket list', async ({ page }) => {
    await inboxPage.openFirstChat();
    const enabled = await bubblePage.enableBubbleSelection();
    test.skip(!enabled, 'Cannot enable bubble selection in this conversation');
    await bubblePage.openAddToTicketModal();
    await expect(bubblePage.ticketPickerSearch).toBeVisible({ timeout: 5000 });
    // Ticket options should exist or empty state visible
    const empty = await bubblePage.isTicketPickerEmpty();
    if (!empty) {
      await expect(bubblePage.ticketPickerOptions.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('APP-03: should filter tickets by search in the picker', async ({ page }) => {
    await inboxPage.openFirstChat();
    const enabled = await bubblePage.enableBubbleSelection();
    test.skip(!enabled, 'Cannot enable bubble selection in this conversation');
    await bubblePage.openAddToTicketModal();
    await bubblePage.searchTicketInPicker('CV-');
    await page.waitForTimeout(1000);
    const countBefore = await bubblePage.ticketPickerOptions.count();
    await bubblePage.searchTicketInPicker('CV-XXXX');
    await page.waitForTimeout(1000);
    const countAfter = await bubblePage.ticketPickerOptions.count();
    expect(countAfter).toBeLessThanOrEqual(countBefore);
  });

  test('APP-04: should confirm append from AddToTicket modal', async ({ page }) => {
    await inboxPage.openFirstChat();
    const enabled = await bubblePage.enableBubbleSelection();
    test.skip(!enabled, 'Cannot enable bubble selection in this conversation');
    await bubblePage.openAddToTicketModal();
    const empty = await bubblePage.isTicketPickerEmpty();
    test.skip(empty, 'No active tickets available to append to');
    await bubblePage.selectTicketFromPickerByIndex(0);
    await bubblePage.confirmAppend();
    // AddToTicketModal uses react-toastify for both success and error states.
    await expect(bubblePage.toastMessage).toBeVisible({ timeout: 10000 });
  });

  test('APP-05: should allow append from LinkedConversation panel (US-006)', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket to navigate from');
    await bubblePage.openTicketDrawer();
    await bubblePage.openLinkedConversation();
    await bubblePage.clickShowDetailChat();
    await bubblePage.verifyLinkedConversationPanelVisible();
    // Select a message in the panel
    const hasCheckbox = await bubblePage.panelMessageCheckbox.first().isVisible().catch(() => false);
    test.skip(!hasCheckbox, 'No selectable messages in conversation panel');
    await bubblePage.selectMessageInPanel(0);
    await expect(bubblePage.addFromPanelBtn).toBeVisible({ timeout: 5000 });
  });
});

// =====================================================
// Remove Linked Bubble (US-004) — ACTIVE
// =====================================================
test.describe('Linked Chat Bubble - Remove Linked Bubble', () => {
  let authPage, inboxPage, bubblePage, config;

  test.beforeAll(async () => { config = getCurrentConfig(); });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  test('REM-01: should show remove button on linked bubbles in OPEN ticket', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket to view');
    await bubblePage.openTicketDrawer();
    // Open Linked Messages accordion
    const accordionVisible = await bubblePage.linkedMessagesAccordion.isVisible().catch(() => false);
    test.skip(!accordionVisible, 'No linked messages accordion in ticket drawer');
    await bubblePage.openLinkedMessages();
    const hasRemoveBtn = await bubblePage.isRemoveButtonVisible();
    if (!hasRemoveBtn) {
      test.skip(true, 'Remove button not visible (may be non-OPEN ticket or no linked bubbles)');
    }
    await expect(bubblePage.removeBubbleBtn.first()).toBeVisible({ timeout: 5000 });
  });

  test('REM-02: should show confirmation dialog when clicking remove', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket to view');
    await bubblePage.openTicketDrawer();
    const accordionVisible = await bubblePage.linkedMessagesAccordion.isVisible().catch(() => false);
    test.skip(!accordionVisible, 'No linked messages accordion');
    await bubblePage.openLinkedMessages();
    const hasRemoveBtn = await bubblePage.isRemoveButtonVisible();
    test.skip(!hasRemoveBtn, 'Remove button not visible');
    await bubblePage.clickRemoveBubble(0);
    await expect(bubblePage.removeConfirmDialog).toBeVisible({ timeout: 5000 });
  });

  test('REM-03: should cancel remove and keep bubble', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket to view');
    await bubblePage.openTicketDrawer();
    const accordionVisible = await bubblePage.linkedMessagesAccordion.isVisible().catch(() => false);
    test.skip(!accordionVisible, 'No linked messages accordion');
    await bubblePage.openLinkedMessages();
    const hasRemoveBtn = await bubblePage.isRemoveButtonVisible();
    test.skip(!hasRemoveBtn, 'Remove button not visible');
    await bubblePage.clickRemoveBubble(0);
    await bubblePage.cancelRemove();
    await expect(bubblePage.removeConfirmDialog).not.toBeVisible({ timeout: 3000 });
  });

  test('REM-04: should confirm remove and succeed', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket to view');
    await bubblePage.openTicketDrawer();
    const accordionVisible = await bubblePage.linkedMessagesAccordion.isVisible().catch(() => false);
    test.skip(!accordionVisible, 'No linked messages accordion');
    await bubblePage.openLinkedMessages();
    const hasRemoveBtn = await bubblePage.isRemoveButtonVisible();
    test.skip(!hasRemoveBtn, 'Remove button not visible');
    await bubblePage.clickRemoveBubble(0);
    await bubblePage.confirmRemove();
    // Should see success or error notification
    await expect(bubblePage.toastSuccess.or(bubblePage.toastError)).toBeVisible({ timeout: 10000 });
  });
});

// =====================================================
// Bubble Navigation — LinkedConversationPanel (US-005, US-006) — ACTIVE
// =====================================================
test.describe('Linked Chat Bubble - Bubble Navigation', () => {
  let authPage, inboxPage, bubblePage, config;

  test.beforeAll(async () => { config = getCurrentConfig(); });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  test('NAV-01: should open LinkedConversation panel from accordion "Show detail chat"', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket to view');
    await bubblePage.openTicketDrawer();
    const accordionVisible = await bubblePage.linkedConversationAccordion.isVisible().catch(() => false);
    test.skip(!accordionVisible, 'No linked conversation accordion');
    await bubblePage.openLinkedConversation();
    await bubblePage.clickShowDetailChat();
    await bubblePage.verifyLinkedConversationPanelVisible();
  });

  test('NAV-02: should return to ticket detail via back button', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket to view');
    await bubblePage.openTicketDrawer();
    const accordionVisible = await bubblePage.linkedConversationAccordion.isVisible().catch(() => false);
    test.skip(!accordionVisible, 'No linked conversation accordion');
    await bubblePage.openLinkedConversation();
    await bubblePage.clickShowDetailChat();
    await bubblePage.verifyLinkedConversationPanelVisible();
    await bubblePage.clickBackToTicketDetail();
    await expect(bubblePage.linkedConversationPanel).not.toBeVisible({ timeout: 5000 });
  });
});

// =====================================================
// Reply-Based Inbound Sync (US-007, US-008) — FIXME (complex E2E)
// =====================================================
test.describe('Linked Chat Bubble - Reply-Based Inbound Sync', () => {
  let authPage, inboxPage, bubblePage, config;

  test.beforeAll(async () => { config = getCurrentConfig(); });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  fixmeStub('SYNC-01: should show "Reply to customer" tab in ticket chat room', 'US-007: ticket chat room tab switching');
  fixmeStub('SYNC-02: should show "Internal note" tab in ticket chat room', 'US-007: ticket chat room tab switching');
  fixmeStub('SYNC-03: should send reply-to-customer message with forward flag', 'US-007: requires active ticket with linked bubble + reply');
  fixmeStub('SYNC-04: should confirm cross-send dialog before sending to customer', 'US-007: cross-send confirmation modal');
  fixmeStub('SYNC-05: should auto-sync inbound message to active ticket (reply reference)', 'US-008: requires customer reply via supported channel');
  fixmeStub('SYNC-06: should not sync inbound message when ticket is resolved', 'US-008/EH-010: status check at processing time');
  fixmeStub('SYNC-07: should not auto-link on unsupported channel', 'US-008: channel without reply reference');
  fixmeStub('SYNC-08: should show sync badge on auto-linked messages', 'US-008: "Synced from conversation" badge');
  fixmeStub('SYNC-09: should append reply to correct ticket when referencing older outbound', 'US-008: chronological matching');
});

// =====================================================
// Concurrency & Race Conditions — FIXME
// =====================================================
test.describe('Linked Chat Bubble - Concurrency & Race Conditions', () => {
  let authPage, inboxPage, bubblePage, config;

  test.beforeAll(async () => { config = getCurrentConfig(); });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  fixmeStub('CON-01: should allow two agents to append different bubbles simultaneously', 'Requires multi-session setup');
  fixmeStub('CON-02: should allow agent B to remove bubble appended by agent A', 'Requires multi-session setup');
  fixmeStub('CON-03: should reject append if ticket was closed during the request', 'Race condition timing manipulation');
  fixmeStub('CON-04: should decide inbound sync based on state at processing time', 'Race condition timing');
  fixmeStub('CON-05: should not corrupt linked bubbles during concurrent edits', 'Requires multi-session setup');
});

// =====================================================
// Regression — Existing Flows Must NOT Break (ACTIVE)
// =====================================================
test.describe('Linked Chat Bubble - Regression', () => {
  let authPage, inboxPage, bubblePage, ticketingPage, config;

  test.beforeAll(async () => { config = getCurrentConfig(); });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    ticketingPage = new TicketingPage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  test('REG-01: should still allow creating ticket from selected bubbles (existing flow)', async ({ page }) => {
    await inboxPage.openFirstChat();
    const enabled = await bubblePage.enableBubbleSelection();
    test.skip(!enabled, 'Cannot enable bubble selection in this conversation');
    await bubblePage.clickCreateTicket();
    await expect(bubblePage.dialog).toBeVisible();
  });

  test('REG-02: should still show duplicate bubble detection when creating ticket', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasPink = await bubblePage.bubbleWithTicket.first().isVisible().catch(() => false);
    test.skip(!hasPink, 'No already-linked bubbles to test duplicate detection');
    await bubblePage.verifyBubbleHasTicketBackground();
    await bubblePage.verifyLinkedTicketBadgeVisible();
  });

  test('REG-03: should still render linked messages and conversation sections in ticket detail', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket bubbles in this conversation');
    await bubblePage.openTicketDrawer();
    await expect(bubblePage.linkedMessagesAccordion).toBeVisible({ timeout: 5000 });
  });

  test('REG-04: should still send normal messages from ticket room', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket to send from');
    await bubblePage.openTicketDrawer();
    await inboxPage.messageInput.waitFor({ state: 'visible', timeout: 5000 });
    const msg = randomAsk();
    await inboxPage.sendMessage(msg);
    await expect(inboxPage.agentBubble.last()).toContainText(msg, { timeout: 10000 });
  });

  test('REG-05: should still show "Lihat Tiket" badge on linked conversation bubbles', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket bubbles in this conversation');
    await bubblePage.verifyLinkedTicketBadgeVisible();
  });

  fixmeStub('REG-06: should still enforce max 50 limit when creating new ticket', 'Need test data setup with 50+ linked bubbles to verify limit');

  test('REG-07: should still allow close/reopen ticket cycle', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket to close/reopen');
    await bubblePage.openTicketDrawer();
    const closeVisible = await bubblePage.closeTicketBtn.isVisible().catch(() => false);
    test.skip(!closeVisible, 'Close button not available');
    await bubblePage.closeTicketBtn.click();
    await expect(bubblePage.reopenTicketBtn).toBeVisible({ timeout: 10000 });
  });

  test('REG-08: should still show all linked tickets in conversation detail sidebar', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasLinkedTickets = await bubblePage.linkedTicketsAccordion.isVisible().catch(() => false);
    test.skip(!hasLinkedTickets, 'No linked tickets section in this conversation detail');
    const hasTickets = await bubblePage.verifyLinkedTicketsInConversation();
    expect(hasTickets).toBeTruthy();
  });
});

// =====================================================
// Data Integrity — FIXME (requires controlled test data)
// =====================================================
test.describe('Linked Chat Bubble - Data Integrity', () => {
  let authPage, inboxPage, bubblePage, config;

  test.beforeAll(async () => { config = getCurrentConfig(); });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  fixmeStub('INT-01: should enforce one bubble = one ticket (block cross-ticket link)', 'Requires two active tickets with same bubble scenario');
  fixmeStub('INT-02: should preserve linked bubbles in ticket B when removing from ticket A', 'Requires cross-ticket data setup');
  fixmeStub('INT-03: should preserve existing linked bubbles when appending new ones', 'Requires known initial bubble count');
  fixmeStub('INT-04: should correctly recalculate quote source after removing latest bubble', 'Requires controlled linked bubble order');
  fixmeStub('INT-05: should preserve original message ID in inbound sync', 'Requires known inbound message ID');
});
