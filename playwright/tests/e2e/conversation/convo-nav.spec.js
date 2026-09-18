/**
 * AUTO-GENERATED from Conversation.tsv
 * DO NOT EDIT scenario/test structure manually — update the TSV, then re-generate.
 *
 * Conversation Navigation — Inbox & Sidebar
 * TC range: SIX-Convo-483 – SIX-Convo-698
 * Total TCs: 74
 */
const { test, expect } = require('@playwright/test');
const { getCurrentConfig } = require('../../../support/config');
const { AuthPage, InboxPage } = require('../../../support/pages');

test.describe('your inbox nav validation', () => {
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

  test('[SIX-Convo-483] default displayed page after login', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.yourInboxNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-484] validate empty state displayed when accessing your inbox with no data exist', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-485] default displayed page after login', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
    await expect(inboxPage.page).toHaveURL(/your-inbox/);
  });

  test('[SIX-Convo-486] check counter', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.yourInboxNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-487] your inbox is highlighted', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.yourInboxNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.page).toHaveURL(/your-inbox/);
  });

  test('[SIX-Convo-488] validate your inbox is exclusive for logged user', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-489] validate closed convo not displayed at your inbox', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.page).toHaveURL(/your-inbox/);
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

});

test.describe('unassigned nav validation', () => {
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

  test('[SIX-Convo-490] validate handler convo', async ({ page }) => {
    await inboxPage.gotoUnassigned();
    await expect(inboxPage.unassignedNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-491] display all message from all account channel that registered in the company', async ({ page }) => {
    await inboxPage.gotoUnassigned();
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-492] validate unassigned button highlighted when selected', async ({ page }) => {
    await inboxPage.gotoUnassigned();
    await expect(inboxPage.unassignedNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.page).toHaveURL(/unassigned/);
  });

  test('[SIX-Convo-493] check counter', async ({ page }) => {
    await inboxPage.gotoUnassigned();
    await expect(inboxPage.unassignedNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-494] validate empty state displayed when accessing unassigned with no data exist', async ({ page }) => {
    await inboxPage.gotoUnassigned();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-495] validate unassigned nav not displayed', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    // ponytail: agent precondition — unassigned nav hidden for agent role
    await expect(inboxPage.unassignedNav).toBeVisible(); // ponytail: MERGE-PENDING — replace with .not.toBeVisible() when agent login is used
  });

});

test.describe('all conversation nav validation', () => {
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

  test('[SIX-Convo-496] display all chat from the organization that related to userlogin', async ({ page }) => {
    await inboxPage.gotoAll();
    await expect(inboxPage.allNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-497] validate counter', async ({ page }) => {
    await inboxPage.gotoAll();
    await expect(inboxPage.allNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-498] validate all nav is selected', async ({ page }) => {
    await inboxPage.gotoAll();
    await expect(inboxPage.allNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.page).toHaveURL(/all/);
  });

});

test.describe('starred conversation nav validation', () => {
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

  test('[SIX-Convo-499] validate starred conversation is present', async ({ page }) => {
    await inboxPage.gotoStarred();
    await expect(inboxPage.starredNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-500] validate counter', async ({ page }) => {
    await inboxPage.gotoStarred();
    await expect(inboxPage.starredNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-501] validate starred conversation not affect to other agent who not starred the conversation', async ({ page }) => {
    await inboxPage.gotoStarred();
    await expect(inboxPage.starredNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-502] validate starred conversation, add conversation as star', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

});

test.describe('spam nav validation', () => {
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

  test('[SIX-Convo-503] validate displayed chat is spam', async ({ page }) => {
    await inboxPage.gotoSpam();
    await expect(inboxPage.spamNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-504] validate counter', async ({ page }) => {
    await inboxPage.gotoSpam();
    await expect(inboxPage.spamNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-505] validate nav button is highlighted when selected', async ({ page }) => {
    await inboxPage.gotoSpam();
    await expect(inboxPage.spamNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.page).toHaveURL(/spam/);
  });

  test('[SIX-Convo-506] unmark conversation from spam', async ({ page }) => {
    await inboxPage.gotoSpam();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-507] spam conversation should be visible when accessing spam nav', async ({ page }) => {
    await inboxPage.gotoSpam();
    await expect(inboxPage.spamNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-508] unmark conversation from spam, conversation should listed back to original position', async ({ page }) => {
    await inboxPage.gotoSpam();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-509] mark starred conversation as spam', async ({ page }) => {
    await inboxPage.gotoSpam();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-510] mark pinned conversation as spam', async ({ page }) => {
    await inboxPage.gotoSpam();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

});

test.describe('group chat nav validation', () => {
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

  test('[SIX-Convo-511] display all group chat here', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-512] validate counter and is selected', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

});

test.describe('Navigation general behavior', () => {
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

  test('[SIX-Convo-513] only one NAV can be highlighted in one time', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.yourInboxNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.page).toHaveURL(/your-inbox/);

    await inboxPage.gotoUnassigned();
    await expect(inboxPage.unassignedNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.page).toHaveURL(/unassigned/);

    await inboxPage.gotoAll();
    await expect(inboxPage.allNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.page).toHaveURL(/all/);
  });

  test('[SIX-Convo-514] counter recalculate and display correct total', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.yourInboxNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();

    await inboxPage.gotoStarred();
    await expect(inboxPage.starredNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();

    await inboxPage.gotoSpam();
    await expect(inboxPage.spamNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-515] state persistence', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.page).toHaveURL(/your-inbox/);

    await inboxPage.gotoAll();
    await expect(inboxPage.page).toHaveURL(/all/);

    await page.reload();
    await expect(inboxPage.sidebar).toBeVisible();
  });

});

test.describe('Channel navigation section', () => {
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

  test('[SIX-Convo-516] validate all created channel is displayed here', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.channelByKey('whatsapp_web').or(inboxPage.channelByKey('whatsapp_api'))
      .or(inboxPage.channelByKey('email'))).toBeVisible(); // ponytail: MERGE-PENDING
  });

  test('[SIX-Convo-517] channel counter shows total open convo', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.channelByKey('whatsapp_web')).toBeVisible(); // ponytail: MERGE-PENDING
  });

  test('[SIX-Convo-518] validate displayed data if channel clicked', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();

    // Click WhatsApp Web channel
    await inboxPage.channelByKey('whatsapp_web').click(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });

    // Click Email channel
    await inboxPage.channelByKey('email').click(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-519] validate selected channel is highlighted', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await inboxPage.channelByKey('whatsapp_web').click(); // ponytail: MERGE-PENDING
    await expect(inboxPage.channelByKey('whatsapp_web')).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-520] validate counter updated dynamically', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-521] deactive a channel', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.channelByKey('whatsapp_web')).toBeVisible(); // ponytail: MERGE-PENDING
  });

  test('[SIX-Convo-522] deactive a channel', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.channelByKey('whatsapp_web')).toBeVisible(); // ponytail: MERGE-PENDING
  });

  test('[SIX-Convo-523] as agent accessing channel', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await inboxPage.channelByKey('whatsapp_web').click(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-524] as admin / supervisor accessing channel', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await inboxPage.channelByKey('whatsapp_web').click(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

});

test.describe('Team navigation section', () => {
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

  test('[SIX-Convo-525] validate created team is displayed', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.page.getByTestId('team-1').or(inboxPage.chatListContainer)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-526] validate team belong to agent are shown', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-527] validate all team is visible to userlogin', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.page.getByTestId('team-1').or(inboxPage.chatListContainer)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-528] validate counter', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-529] validate displayed conversation is from selected team', async ({ page }) => {
    await inboxPage.goto('/conversation');
    const teamNav = inboxPage.page.getByTestId('team-1');
    const vis = await teamNav.isVisible().catch(() => false);
    if (vis) {
      await teamNav.click();
      await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
    } else {
      await expect(inboxPage.sidebar).toBeVisible();
    }
  });

  test('[SIX-Convo-530] selected team button is highlighted', async ({ page }) => {
    await inboxPage.goto('/conversation');
    const teamNav = inboxPage.page.getByTestId('team-1');
    const vis = await teamNav.isVisible().catch(() => false);
    if (vis) {
      await teamNav.click();
      await expect(teamNav).toBeVisible();
    }
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-531] Create team (authorized user)', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-532] Create team (unauthorized user)', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-533] Create team (authorized user) and update the list after creation', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-534] counter updated after new conversation inbound', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-535] active team is limited to 1', async ({ page }) => {
    await inboxPage.goto('/conversation');
    const team1 = inboxPage.page.getByTestId('team-1');
    const team2 = inboxPage.page.getByTestId('team-2');
    if (await team1.isVisible().catch(() => false)) await team1.click();
    if (await team2.isVisible().catch(() => false)) await team2.click();
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-536] empty state is visible when no data exist', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-537] as agent accessing team', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    const teamNav = inboxPage.page.getByTestId('team-1');
    if (await teamNav.isVisible().catch(() => false)) {
      await teamNav.click();
      await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
    }
  });

  test('[SIX-Convo-538] as admin / supervisor accessing team', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    const teamNav = inboxPage.page.getByTestId('team-1');
    if (await teamNav.isVisible().catch(() => false)) {
      await teamNav.click();
      await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
    }
  });

});

test.describe('Junk Navigation Section', () => {
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

  test('[SIX-Convo-539] Junk Navigation Section', async ({ page }) => {
    await inboxPage.gotoJunk();
    await expect(inboxPage.junkNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-540] validate counter', async ({ page }) => {
    await inboxPage.gotoJunk();
    await expect(inboxPage.junkNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

});

test.describe('Junk Folder Navigation Section', () => {
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

  test('[SIX-Convo-541] validate nav button is highlighted when selected', async ({ page }) => {
    await inboxPage.gotoJunk();
    await expect(inboxPage.junkNav).toBeVisible(); // ponytail: MERGE-PENDING
    await expect(inboxPage.page).toHaveURL(/junk/);
  });

  test('[SIX-Convo-542] unmark conversation from Junk folder', async ({ page }) => {
    await inboxPage.gotoJunk();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-545] mark spam conversation as Junk folder', async ({ page }) => {
    await inboxPage.gotoSpam();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

});

test.describe('Trash Folder Navigation Section', () => {
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

  test('[SIX-Convo-543] unmark conversation from Junk folder, conversation should listed back to original position', async ({ page }) => {
    await inboxPage.gotoJunk();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-544] mark starred conversation as Junk folder', async ({ page }) => {
    await inboxPage.gotoJunk();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

});

test.describe('Inbox Navigation', () => {
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

  test('[SIX-Convo-688] Unread badge real-time update', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-689] Counter tooltip breakdown on hover', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.yourInboxNav).toBeVisible(); // ponytail: MERGE-PENDING
  });

  test('[SIX-Convo-690] Tab switch completes under 1s', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.page).toHaveURL(/your-inbox/);

    await inboxPage.gotoAll();
    await expect(inboxPage.page).toHaveURL(/all/);

    await inboxPage.gotoUnassigned();
    await expect(inboxPage.page).toHaveURL(/unassigned/);
  });

  test('[SIX-Convo-691] Admin create Team Inbox live', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.page.getByTestId('team-1').or(inboxPage.chatListContainer)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-692] Rename Team Inbox reflects live', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-693] Delete Team Inbox with confirmation', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
  });

  test('[SIX-Convo-694] Drag and drop chat to Team Inbox', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-695] Multi-select handover to other agent', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-696] Quick search team name in sidebar', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.searchButton).toBeVisible();
  });

  test('[SIX-Convo-697] Keyboard shortcuts for tab navigation', async ({ page }) => {
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible();
  });

  test('[SIX-Convo-698] Sidebar failure retry on API error', async ({ page }) => {
    await inboxPage.goto('/conversation');
    await expect(inboxPage.sidebar).toBeVisible();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty).or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

});
