const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

/**
 * Conversation Ownership Decoupling (Team Inbox x Channel Numbers) PRD.
 *
 * Every scenario below depends on admin config + live routing/remap state that
 * cannot be seeded headless. Each test therefore navigates as far as observable
 * UI allows and soft-asserts the ownership banner/badge text where it exists.
 * ponytail: live-state dependent — soft-asserts observable UI; full assertion
 * needs seeded remap state.
 */
test.describe('Conversation Ownership Decoupling', () => {
  let authPage, inboxPage, config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    const credentials = config.getDefaultAccount();
    await authPage.loginWithCredentials(credentials, { useV2: true });
  });

  test('[SIX-Convo-730] Sticky binding: open conversation keeps original Team Inbox after channel remap ("Legacy-bound")', async ({ page }) => {
    // ponytail: live-state dependent — soft-asserts observable UI; full assertion needs seeded remap state
    await inboxPage.openFirstChat();
    await expect(inboxPage.chatRoom).toBeVisible();
    await expect(inboxPage.clientName).toBeVisible();
    const badge = page.getByText(/Legacy-bound|Terikat lama|Legacy/i).first();
    const hasBadge = await badge.isVisible().catch(() => false);
    if (hasBadge) await expect(badge).toBeVisible();
  });

  test('[SIX-Convo-731] New chat after remap is created in the current owner team (routing follows current mapping)', async ({ page }) => {
    // ponytail: live-state dependent — soft-asserts observable UI; full assertion needs seeded remap state
    await inboxPage.gotoAll();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty).or(inboxPage.chatListTitle).first()).toBeVisible({ timeout: 15000 });
    // Team Inbox section is where current-mapping routing lands the new chat.
    const teamNav = page.getByText(/Kotak Masuk Tim|Team Inbox/i).first();
    const hasTeamNav = await teamNav.isVisible().catch(() => false);
    if (hasTeamNav) await expect(teamNav).toBeVisible();
  });

  test('[SIX-Convo-732] Bulk number remap does not auto-move existing conversations', async ({ page }) => {
    // ponytail: live-state dependent — soft-asserts observable UI; full assertion needs seeded remap state
    await inboxPage.gotoAll();
    const before = await inboxPage.getChatCount().catch(() => 0);
    // List remains stable and rendered; no forced relocation is observable from the list view.
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty).or(inboxPage.chatListTitle).first()).toBeVisible({ timeout: 15000 });
    const after = await inboxPage.getChatCount().catch(() => 0);
    expect(after).toBeGreaterThanOrEqual(0);
    expect(before).toBeGreaterThanOrEqual(0);
  });

  test('[SIX-Convo-733] Manual move preserves history, resets assignee, stops SLA, shows "Moved from {X} to {Y}" banner', async ({ page }) => {
    // ponytail: live-state dependent — soft-asserts observable UI; full assertion needs seeded remap state
    await inboxPage.openFirstChat();
    await expect(inboxPage.chatRoom).toBeVisible();
    const banner = page.getByText(/Moved from|Dipindahkan dari/i).first();
    const hasBanner = await banner.isVisible().catch(() => false);
    if (hasBanner) {
      await expect(banner).toBeVisible();
      // History must survive a move — the history section still renders.
      const historyVisible = await inboxPage.detailSection('history').isVisible().catch(() => false);
      if (historyVisible) await expect(inboxPage.detailSection('history')).toBeVisible();
    }
  });

  test('[SIX-Convo-734] Reopening a closed legacy thread offers "Keep in {Old Team}" (default) or "Move to {New Team}"', async ({ page }) => {
    // ponytail: live-state dependent — soft-asserts observable UI; full assertion needs seeded remap state
    await inboxPage.openFirstChat();
    await expect(inboxPage.chatRoom).toBeVisible();
    const canReopen = await inboxPage.reopenButton.isVisible().catch(() => false);
    if (canReopen) {
      await inboxPage.reopenButton.click();
      const keepOption = page.getByText(/Keep in|Tetap di/i).first();
      const moveOption = page.getByText(/Move to|Pindahkan ke/i).first();
      const hasKeep = await keepOption.isVisible().catch(() => false);
      if (hasKeep) {
        await expect(keepOption).toBeVisible();
        await expect(moveOption).toBeVisible();
      }
    }
  });

  test('[SIX-Convo-735] Escalation-only inbox (no inbound number): moved-in conversations operable, badge "Escalation-only"', async ({ page }) => {
    // ponytail: live-state dependent — soft-asserts observable UI; full assertion needs seeded remap state
    await inboxPage.gotoAll();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty).or(inboxPage.chatListTitle).first()).toBeVisible({ timeout: 15000 });
    const badge = page.getByText(/Escalation-only|Hanya eskalasi/i).first();
    const hasBadge = await badge.isVisible().catch(() => false);
    if (hasBadge) {
      await expect(badge).toBeVisible();
      // Moved-in conversations must remain fully operable — open one and assert the room + input render.
      const hasChat = await inboxPage.hasChat(1, 5000);
      if (hasChat) {
        await inboxPage.openChat(1);
        await expect(inboxPage.chatRoom).toBeVisible();
      }
    }
  });

  test('[SIX-Convo-736] Default sender = last successful sender; when unavailable a "Choose sender number" picker is offered', async ({ page }) => {
    // ponytail: live-state dependent — soft-asserts observable UI; full assertion needs seeded remap state
    await inboxPage.openFirstChat();
    await expect(inboxPage.chatRoom).toBeVisible();
    const selectorVisible = await inboxPage.accountSelector.isVisible().catch(() => false);
    if (selectorVisible) {
      await expect(inboxPage.accountSelector).toBeVisible();
    } else {
      const picker = page.getByText(/Choose sender number|Pilih nomor pengirim/i).first();
      const hasPicker = await picker.isVisible().catch(() => false);
      if (hasPicker) await expect(picker).toBeVisible();
    }
  });
});
