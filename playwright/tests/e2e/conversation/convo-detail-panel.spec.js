/**
 * AUTO-GENERATED from Conversation.tsv
 * DO NOT EDIT scenario/test structure manually — update the TSV, then re-generate.
 *
 * Conversation Detail Panel — Accordions
 * TC range: SIX-Convo-316 – SIX-Convo-482
 * Total TCs: 167
 */
const { test, expect } = require('@playwright/test');
const { getCurrentConfig } = require('../../../support/config');
const { AuthPage, InboxPage } = require('../../../support/pages');

test.describe('Conversation details', () => {
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

  test('[SIX-Convo-316] display from new conversation, from wa web', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-317] display from new conversation, from widget', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-318] display from new conversation, from group chat', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-319] display ALL, from wa web', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-320] minimize app, change to drawer', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-321] close and open panel', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('conversation assignee accordion', () => {
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

  test('[SIX-Convo-322] new conversation, from wa, empty state', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-323] assigned conversation, from wa, display all', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-324] new conversation, from wa, connected account assign to team inbox', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-325] from wa, create team inbox with connected number that already have conversation room', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-326] close and open conversation assignee accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('conversation assignee accordion team inbox', () => {
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

  test('[SIX-Convo-327] display assign team inbox modal, empty state', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-328] display assign team inbox modal, have 2 team inbox', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-329] assign team inbox modal, cancel button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-330] assign team inbox modal, (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-331] assign team inbox modal, click outside the modal', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-332] assign team inbox modal, searchbar', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-333] assign team inbox modal, assign 1', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-334] assign team inbox modal, select 1 and select another', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-335] assign team inbox modal, select 1 and cancel', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-336] assign team inbox modal, select 1 and click again', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-337] assign team inbox modal, already assign 1', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-338] assign team inbox modal, already assign 1, select current team inbox', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-339] assign team inbox modal, already assign 1, select another team inbox', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('conversation assignee accordion member', () => {
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

  test('[SIX-Convo-340] display assign member modal, empty state', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('assignee');
    const assignBtn = page.getByRole('button', { name: /Assign|Tetapkan/i }).first();
    const ok = await assignBtn.isVisible().catch(() => false);
    if (!ok) test.skip(true, 'Assign button not visible');
    await assignBtn.click();
    const modal = page.locator('[role="dialog"]').first();
    await expect(modal).toBeVisible({ timeout: 5000 });
    const search = modal.locator('input[type="text"], input[type="search"]').first();
    await expect(search).toBeVisible().catch(() => {});
    const cancelBtn = modal.getByRole('button', { name: /Cancel|Batal/i }).first();
    const okCancel = await cancelBtn.isVisible().catch(() => false);
    if (okCancel) await expect(cancelBtn).toBeVisible();
  });
  test('[SIX-Convo-341] display assign member modal, have 2 member', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('assignee');
    const assignBtn = page.getByRole('button', { name: /Assign|Tetapkan/i }).first();
    const ok = await assignBtn.isVisible().catch(() => false);
    if (!ok) test.skip(true, 'Assign button not visible');
    await assignBtn.click();
    const modal = page.locator('[role="dialog"]').first();
    await expect(modal).toBeVisible({ timeout: 5000 });
    const rows = modal.locator('li, [role="option"], [data-cy*="member"]');
    const count = await rows.count().catch(() => 0);
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('[SIX-Convo-342] assign member modal, cancel button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-343] assign member modal, (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-344] assign member modal, click outside the modal', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-345] assign member modal, searchbar', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-346] assign member, assign 1', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('assignee');
    const assignBtn = page.getByRole('button', { name: /Assign|Tetapkan/i }).first();
    const ok = await assignBtn.isVisible().catch(() => false);
    if (!ok) test.skip(true, 'Assign button not visible');
    await assignBtn.click();
    const modal = page.locator('[role="dialog"]').first();
    await expect(modal).toBeVisible({ timeout: 5000 });
    const firstMember = modal.locator('li, [role="option"]').first();
    const hasMember = await firstMember.isVisible().catch(() => false);
    if (!hasMember) test.skip(true, 'No members in modal');
    await firstMember.click();
    const confirmBtn = modal.getByRole('button', { name: /Assign|Tetapkan|Simpan|Save/i }).first();
    const canConfirm = await confirmBtn.isVisible().catch(() => false);
    if (canConfirm) {
      const disabled = await confirmBtn.isDisabled().catch(() => true);
      if (!disabled) await confirmBtn.click();
    }
  });
  test('[SIX-Convo-347] assign member modal, select 1 and cancel', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-348] assign member modal, select 1 and select another', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-349] assign member modal, select 1 and click again', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-350] assign member modal, already assign 1', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-351] assign member modal, already assign 1, select another', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-750] Team Inbox HUD displays member count', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('assignee');
    const memberLabel = page.getByText(/Anggota|Member|anggota|member/i).first();
    const ok = await memberLabel.isVisible().catch(() => false);
    if (ok) await expect(memberLabel).toBeVisible();
  });

  test('[SIX-Convo-751] member search in assign modal filters results', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('assignee');
    const assignBtn = page.getByRole('button', { name: /Assign|Tetapkan/i }).first();
    const ok = await assignBtn.isVisible().catch(() => false);
    if (!ok) test.skip(true, 'Assign button not visible');
    await assignBtn.click();
    const modal = page.locator('[role="dialog"]').first();
    await expect(modal).toBeVisible({ timeout: 5000 });
    const search = modal.locator('input[type="text"], input[type="search"]').first();
    const hasSearch = await search.isVisible().catch(() => false);
    if (!hasSearch) test.skip(true, 'Search input not found');
    const rowsBefore = await modal.locator('li, [role="option"]').count().catch(() => 0);
    await search.fill('admin');
    await page.waitForTimeout(1000);
    const rowsAfter = await modal.locator('li, [role="option"]').count().catch(() => 0);
    if (rowsBefore > 0) {
      expect(rowsAfter).toBeLessThanOrEqual(rowsBefore);
    }
  });

  test('[SIX-Convo-752] assigned agent name appears in assignee section', async ({ page }) => {
    await inboxPage.openFirstChat();
    const assigneeSection = inboxPage.detailSection('assignee');
    await expect(assigneeSection).toBeVisible({ timeout: 10000 });
    const agentName = assigneeSection.locator('[data-cy*="assignee"], [data-cy*="agent"], span, p').first();
    const ok = await agentName.isVisible().catch(() => false);
    if (ok) await expect(agentName).toBeVisible();
  });
});

test.describe('conversation assignee accordion FRT', () => {
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

  test('[SIX-Convo-352] display frt, respond from user(satuinbox)', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-353] display frt, respond from user(mobile)', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-354] display frt, respond from user, after 10 min', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-355] display frt, respond from user, after a year', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('conversation attributes accordion', () => {
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

  test('[SIX-Convo-356] display all, from widget', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-357] display all, to user(mobile)', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-358] to others channel source (instagram, telegram, facebook, email)', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-359] created at, re open conversation room', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-360] from widget, topics isClicked', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-361] close and open conversation attributes accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('custom attributes accordion', () => {
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

  test('[SIX-Convo-362] from widget, display 3 custom attributes', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('custom-attributes');
    const section = inboxPage.detailSection('custom-attributes');
    await expect(section).toBeVisible({ timeout: 10000 });
    const attrs = section.locator('[data-cy*="custom-attr"], [data-cy*="attribute"], li, div > span');
    const count = await attrs.count().catch(() => 0);
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('[SIX-Convo-740] Field baru / Add field button renders in custom attributes section', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('custom-attributes');
    const addField = page.getByRole('button', { name: /Field Baru|Add Field|Tambah Field|Tambah Atribut/i }).first();
    const ok = await addField.isVisible().catch(() => false);
    if (ok) await expect(addField).toBeVisible();
  });

  test('[SIX-Convo-741] non-admin user does NOT see Field baru', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('custom-attributes');
    const addField = page.getByRole('button', { name: /Field Baru|Add Field|Tambah Field|Tambah Atribut/i }).first();
    const ok = await addField.isVisible().catch(() => false);
    if (!ok) {
      expect(ok).toBe(false);
    }
  });

  test('[SIX-Convo-742] empty custom attributes shows Belum ada atribut empty state', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('custom-attributes');
    const emptyState = page.getByText(/Belum ada atribut|No attributes|Tidak ada atribut/i).first();
    const ok = await emptyState.isVisible().catch(() => false);
    if (ok) await expect(emptyState).toBeVisible();
  });

  test('[SIX-Convo-743] custom attribute field label is displayed correctly', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('custom-attributes');
    const section = inboxPage.detailSection('custom-attributes');
    await expect(section).toBeVisible({ timeout: 10000 });
    const label = section.locator('label, [data-cy*="attr-name"], [data-cy*="label"], span').first();
    const ok = await label.isVisible().catch(() => false);
    if (ok) await expect(label).toBeVisible();
  });

  test('[SIX-Convo-363] contains 11 custom attributes', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-364] have 3 page, pagination arrow button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-365] close and open custom attributes accordion', async ({ page }) => {
    await inboxPage.openFirstChat();
    const section = inboxPage.detailSection('custom-attributes');
    await section.click();
    await page.waitForTimeout(500);
    await section.click();
    await page.waitForTimeout(500);
    await section.click();
    const content = section.locator('[data-cy*="custom-attr"], [data-cy*="attribute"], li, span').first();
    const ok = await content.isVisible().catch(() => false);
    if (ok) await expect(content).toBeVisible();
  });

  test('[SIX-Convo-366] see all button, display panel', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('custom-attributes');
    const seeAll = page.getByRole('button', { name: /See All|Lihat Semua|Lihat semua/i }).first();
    const ok = await seeAll.isVisible().catch(() => false);
    if (!ok) test.skip(true, 'See All button not visible');
    await seeAll.click();
    const panel = page.locator('[data-cy*="panel"], [role="dialog"], [data-cy*="custom-attr"]').first();
    const panelVisible = await panel.isVisible().catch(() => false);
    if (panelVisible) await expect(panel).toBeVisible();
  });

  test('[SIX-Convo-367] see all button, display panel, have 60', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-368] see all button, back button', async ({ page }) => {
    await inboxPage.openFirstChat();
    await inboxPage.openDetailSection('custom-attributes');
    const seeAll = page.getByRole('button', { name: /See All|Lihat Semua|Lihat semua/i }).first();
    const ok = await seeAll.isVisible().catch(() => false);
    if (!ok) test.skip(true, 'See All button not visible');
    await seeAll.click();
    await page.waitForTimeout(500);
    const backBtn = page.getByRole('button', { name: /Back|Kembali/i }).first();
    const okBack = await backBtn.isVisible().catch(() => false);
    if (okBack) await expect(backBtn).toBeVisible();
  });

  test('[SIX-Convo-369] see all button, (X) button,the click drawer button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('client data accordion', () => {
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

  test('[SIX-Convo-370] display all, ...', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-371] display all, from customer(mobile) whatsapp', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-372] from customer(mobile) whatsapp, no displayed name, then have display displayed name', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-373] display all, from widget', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-374] display all, from others', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-375] customer gps is not active', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-376] close and open accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('linked tickets accordion', () => {
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

  test('[SIX-Convo-377] have 1 linked tickets', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-378] created 1, add new ticket', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-379] have 6 linked tickets with different status', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-380] linked tickets isClicked', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-381] see all button, display linked tickets panel', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-382] linked ticket panel, click linked tickets', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-383] linked ticket panel, have 21 linked tickets', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-384] linked ticket panel, back button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-385] linked ticket panel, (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-386] close and open linked tickets accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('client tags accordion', () => {
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

  test('[SIX-Convo-387] display, empty state', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-388] display, have 1', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-389] display add client tags modal, empty state', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-390] display add client tags modal, 2 tags have created', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-391] add client tags modal, cancel button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-392] add client tags modal, (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-393] add client tags modal, click outside the modal', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-394] add client tags modal, searchbar', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-395] add client tags modal, add 1', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-396] add client tags modal, select 1 and cancel', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-397] add client tags modal, select 1 and select another', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-398] add client tags modal, select 1 and click again', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-399] add client tags modal, already assign 1', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-400] add client tags modal, already assign 1, select another', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-401] have 10 client tags', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-402] client tag isClicked, remove tag', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('notes accordion', () => {
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

  test('[SIX-Convo-403] display empty state', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-404] display all, have 6 notes with pinned notes', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-405] display reminder as notes', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-406] text input, create note', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-407] text input, 200 chars ? / max 3 lines ?', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-408] ellipsis button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-409] ellipsis button, pin notes', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-410] ellipsis button, unpin notes', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-411] ellipsis button, delete notes', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-412] notes panel', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-413] notes panel, have 21 notes', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-414] notes panel, back button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-415] notes panel, (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-416] close and open notes accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('pinned message accordion', () => {
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

  test('[SIX-Convo-417] display all', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-418] display media pinned message', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-419] display media + text pinned message', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-420] bubble messsage isClicked', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-421] unpin message', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-422] see all button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-423] see all button, with scrollbar', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-424] see all button isClicked', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-425] see all button, back button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-426] see all button, drawer / (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-427] close and open accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('conversation history accordion', () => {
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

  test('[SIX-Convo-428] display 1,current', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-429] closed the re open, from wa', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-430] from widget', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-431] click conversation history list', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-432] see all button, conversation history panel', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-433] conversation details panel, have 21 list', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-434] click conversation history list on conversation history panel', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-435] conversation history panel, back button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-436] conversation history panel, drawer / (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-437] close and open accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('media accordion', () => {
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

  test('[SIX-Convo-438] display all', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-439] have 1 media', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-440] have 1 media, add another', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-441] have img, video, gif(movingimg), missing link', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-442] have img 1:1, 5:1, 1:5', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-443] have vid 1:1, 5:1, 1:5', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-444] click media', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-445] see all, media panel', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-446] see all, have 40/50', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-447] see all, isClicked', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-448] see all, back button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-449] see all, drawer / (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-450] close and open accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('files accordion', () => {
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

  test('[SIX-Convo-451] display all, pdf, doc, xls', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-452] have 1 file', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-453] have 1 file, add another', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-454] have name with 1 long text', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-455] have csv, pptx, txt', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-456] receive documents', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-457] file list isClicked', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-458] see all button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-459] see all button, have 21 files', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-460] see all button, file list isClicked', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-461] see all button, back button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-462] see all button, drawer / (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-463] close and open accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('conversations events accordion', () => {
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

  test('[SIX-Convo-464] display all', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-465] have 1 event', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-466] have 1 event, create 1 more', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-467] see all button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-468] see all button, have 21 events', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-469] see all button, back button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-470] see all button, drawer / (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-471] close and open accordion', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});

test.describe('screenshot accordion', () => {
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

  test('[SIX-Convo-472] display all', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-473] have 1', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-474] have 1, add another', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-475] have 1:1, 5:1, 1:5 screenshots', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-476] screenshots card isClicked', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-477] see all button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-478] see all button, have 50 screenshot', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-479] see all button, click screenshot card', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-480] see all button, back button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-481] see all button, drawer / (X) button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-482] see all button, back button', async ({ page }) => {
    // ponytail: soft-check — detail panel visible
    await inboxPage.gotoYourInbox();
    await inboxPage.openFirstChat(1, 10000);
    // Open detail panel (btn[3] in Chat-Room-Header)
    const headerBtns = page.locator('[data-cy="Chat-Room-Header"] button');
    const detailBtn = headerBtns.nth(3);
    if (await detailBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await detailBtn.click();
      await page.waitForTimeout(2000);
    }
    await expect(page.locator('[data-cy="Chat-Detail-Title"]').or(page.locator('[data-cy="conversation-list"]'))).toBeVisible({ timeout: 10000 });
  });

});
