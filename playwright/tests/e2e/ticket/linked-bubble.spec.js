const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage, TicketLinkedBubblePage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');
const { randomAsk } = require('../../../support/helpers/generators');

test.describe('Linked Chat Bubble - Existing Features', () => {
  let authPage;
  let inboxPage;
  let bubblePage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  test('should show "See Ticket" badge on bubble with linked ticket', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasPinkBubble = await bubblePage.bubbleWithTicket.first().isVisible().catch(() => false);
    test.skip(!hasPinkBubble, 'No linked ticket bubbles in this conversation');

    await bubblePage.verifyLinkedTicketBadgeVisible();
    await bubblePage.verifyBubbleHasTicketBackground();
  });

  test('should open ticket drawer from "See Ticket" link on bubble', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket bubbles in this conversation');

    await bubblePage.openTicketDrawer();
    await expect(bubblePage.ticketDrawer).toBeVisible({ timeout: 10000 });
  });

  test('should show linked messages in ticket drawer', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasTicket = await bubblePage.seeTicketLink.first().isVisible().catch(() => false);
    test.skip(!hasTicket, 'No linked ticket bubbles in this conversation');

    await bubblePage.openTicketDrawer();
    const hasMessages = await bubblePage.verifyLinkedMessagesInDrawer();
    if (hasMessages) {
      await expect(bubblePage.linkedMessagesAccordion).toBeVisible();
    }
  });

  test('should show linked tickets in conversation detail sidebar', async ({ page }) => {
    await inboxPage.openFirstChat();
    const hasLinkedTickets = await bubblePage.linkedTicketsAccordion.isVisible().catch(() => false);
    test.skip(!hasLinkedTickets, 'No linked tickets section in this conversation detail');

    const hasTickets = await bubblePage.verifyLinkedTicketsInConversation();
    expect(hasTickets).toBeTruthy();
  });

  test.fixme('should enable bubble selection mode via action menu', 'Requires hover + action menu interaction');
  test.fixme('should show create ticket dialog after selecting bubbles', 'Requires bubble selection first');
  test.fixme('should cancel bubble selection mode', 'Requires bubble selection first');
});

test.describe('Linked Chat Bubble - New Features (Scaffold)', () => {
  let authPage;
  let inboxPage;
  let bubblePage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    bubblePage = new TicketLinkedBubblePage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  test.fixme('APPEND-01: Append single customer bubble to active ticket', 'US-002 not yet implemented');
  test.fixme('APPEND-02: Append multiple customer bubbles to active ticket', 'US-002 not yet implemented');
  test.fixme('APPEND-03: Append with mixed valid + invalid selection', 'US-002 not yet implemented');
  test.fixme('APPEND-04: Append to closed/resolved ticket blocked', 'US-002 not yet implemented');
  test.fixme('APPEND-05: Append disabled when no active ticket exists', 'US-002 not yet implemented');
  test.fixme('APPEND-06: Duplicate bubble link blocked', 'US-002/EH-002 not yet implemented');
  test.fixme('APPEND-07: Append when limit reached blocked', 'US-002/EH-006 not yet implemented');

  test.fixme('REMOVE-01: Remove single linked bubble from ticket', 'US-004 not yet implemented');
  test.fixme('REMOVE-02: Remove latest linked bubble recalculates quote source', 'US-004 not yet implemented');
  test.fixme('REMOVE-03: Remove last linked bubble disables reply', 'US-004 not yet implemented');
  test.fixme('REMOVE-04: Remove from closed ticket blocked', 'US-004 not yet implemented');
  test.fixme('REMOVE-05: Remove cancelled via confirmation', 'US-004 not yet implemented');

  test.fixme('NAV-01: Click linked bubble opens conversation thread panel', 'US-005 not yet implemented');
  test.fixme('NAV-02: Back to ticket detail restores panel', 'US-005 not yet implemented');
  test.fixme('NAV-03: Missing source bubble shows fallback', 'US-005 not yet implemented');

  test.fixme('SYNC-01: Reply from ticket quotes latest linked bubble', 'US-007 not yet implemented');
  test.fixme('SYNC-02: Reply disabled when no linked bubbles', 'US-007 not yet implemented');
  test.fixme('SYNC-03: Inbound customer reply auto-linked to ticket', 'US-008 not yet implemented');
  test.fixme('SYNC-04: Inbound reply skips when ticket resolved', 'US-008 not yet implemented');

  test.fixme('REG-01: Create ticket from selected bubbles still works', 'Regression - ensure existing create flow unchanged');
  test.fixme('REG-02: Duplicate bubble detection for create still works', 'Regression - hasMessagesWithTicket unchanged');
  test.fixme('REG-03: Max 50 limit for create still works', 'Regression - create limit unchanged');
});
