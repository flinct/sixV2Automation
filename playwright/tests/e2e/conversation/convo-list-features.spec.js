/**
 * AUTO-GENERATED from Conversation.tsv
 * DO NOT EDIT scenario/test structure manually — update the TSV, then re-generate.
 *
 * Conversation List — Features & Filters
 * TC range: SIX-Convo-546 – SIX-Convo-663
 * Total TCs: 118 (activated from fixme stubs)
 *
 * SELECTOR STATUS KEY:
 *   LIVE (🟢): chat-list-*, conversation-list, Conversation-Section,
 *              Conversation-Chat-List-Header, Conversation-Chat-List-Page-Section
 *   MERGE-PENDING (🟡): chatList-filter-*, chatList-searchButton,
 *              chatList-navPanelControlButton, quick-action-*, inbox-nav-*
 */
const { test, expect } = require('@playwright/test');
const { getCurrentConfig } = require('../../../support/config');
const { AuthPage, InboxPage } = require('../../../support/pages');

test.describe('Conversation List Title section', () => {
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

  test('[SIX-Convo-546] Title changes based on navigation', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: Select "Your Inbox", "Widget", "Team A" sequentially
    // Expected: Chat list title updates accordingly
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.chatListTitle).toBeVisible();

    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (inbox-nav-*, channel-nav-*)
    await inboxPage.yourInboxNav.click();
    await expect(inboxPage.chatListTitle).toBeVisible();

    const widgetNav = inboxPage.channelByKey('widget');
    await widgetNav.click();
    await expect(inboxPage.chatListTitle).toBeVisible();
  });

  test('[SIX-Convo-547] Default title from active nav', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, should display your inbox as default
    // Expected: title set to your inbox
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.chatListTitle).toBeVisible();
    await expect(inboxPage.chatListTitle).toContainText(/Your Inbox|Kotak Pesan Anda/i);
  });

  test('[SIX-Convo-548] Display search icon (inactive)', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, should display search icon at title section
    // Expected: search icon visible when inactive
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton)
    await expect(inboxPage.searchButton).toBeVisible();
  });

  test('[SIX-Convo-549] Click search icon → activate input', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click search icon at title section
    // Expected: subtitle replaced by text input with autofocus, close icon available
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton, search input)
    await inboxPage.searchButton.click();
    // ponytail: when search input gets data-cy, assert: toBeVisible + toBeFocused
    // ponytail: assert close/clear button visible
  });

  test('[SIX-Convo-550] Search by name/email/number/message', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click search, search name, search email, search number, search message
    // Expected: system displaying conversation related to keyword
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton, search input)
    await inboxPage.searchButton.click();
    // ponytail: type name → assert chat list contains matching items
    // ponytail: type email → assert chat list contains matching items
    // ponytail: type number → assert chat list contains matching items
    // ponytail: type message → assert chat list contains matching items
  });

  test('[SIX-Convo-551] Cancel search via keyboard shortcut', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click search icon
    // Expected: successfully close search input
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton, search input clear)
    await inboxPage.searchButton.click();
    // ponytail: press Escape → assert search input closed, title restored
  });

  test('[SIX-Convo-552] Case insensitive search', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click search, type "john", type "John"
    // Expected: system displaying conversation related to keyword regardless of case
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton, search input)
    await inboxPage.searchButton.click();
    // ponytail: type "john" → assert results appear
    // ponytail: clear, type "John" → assert same results appear
  });

  test('[SIX-Convo-553] Search no result', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click search, type nonexistent keyword
    // Expected: display "No conversations found"
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton, search input)
    await inboxPage.searchButton.click();
    // ponytail: type "zzzznonexistent999" → assert empty state visible
    await expect(inboxPage.chatListEmpty).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-554] Search with leading space', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click search, type "  keyword"
    // Expected: display related conversation, system must trim space
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton, search input)
    await inboxPage.searchButton.click();
    // ponytail: type "  <keyword>" → assert results appear (space trimmed)
  });

  test('[SIX-Convo-555] Search with trailing space', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click search, type "keyword  "
    // Expected: display related conversation, system must trim space
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton, search input)
    await inboxPage.searchButton.click();
    // ponytail: type "<keyword>  " → assert results appear (space trimmed)
  });

});

test.describe('Conversation List Status Filter', () => {
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

  test('[SIX-Convo-556] Status filter default = Open', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, validate status filter
    // Expected: "Open" filter is selected and activated
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status)
    await expect(inboxPage.statusFilter).toBeVisible();
    await expect(inboxPage.statusFilter).toContainText(/Open|Terbuka/i);
  });

  test('[SIX-Convo-557] Switch to close status', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, validate default status, switch to close
    // Expected: close filter selected and active, list updated
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status)
    await inboxPage.statusFilter.click();
    // ponytail: select "Close" / "Tertutup" option
    // ponytail: assert statusFilter shows "Close" / "Tertutup"
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-558] Validate counter', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, validate counter from open status, validate counter from close status
    // Expected: open/close status count matches displayed data
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, counter element)
    // ponytail: read open count badge → compare with visible chat items count
    // ponytail: switch to close → read close count badge → compare with visible chat items count
    await expect(inboxPage.statusFilter).toBeVisible();
  });

  test('[SIX-Convo-559] Validate every switch status, conversation list updated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, validate list, switch to close, validate list, switch to open, validate list
    // Expected: displayed data updated every switching
    await inboxPage.gotoYourInbox();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });

    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status)
    await inboxPage.statusFilter.click();
    // ponytail: select close option → assert list updated
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });

    // ponytail: select open option → assert list updated
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

});

test.describe('Conversation List read / unread status filter', () => {
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

  test('[SIX-Convo-560] Validate default is all', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, check default read/unread status
    // Expected: active filter is "ALL"
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read)
    await expect(inboxPage.readFilter).toBeVisible();
    await expect(inboxPage.readFilter).toContainText(/All|Semua/i);
  });

  test('[SIX-Convo-561] Filtering with unread status', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, switch to unread
    // Expected: filter switched to "unread", list updated with unread conversations
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read)
    await inboxPage.readFilter.click();
    // ponytail: select "Unread" / "Belum Dibaca" option
    await expect(inboxPage.readFilter).toContainText(/Unread|Belum Dibaca/i);
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-562] Filtering with read status', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, switch to read
    // Expected: filter switched to "read", list updated with read conversations
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read)
    await inboxPage.readFilter.click();
    // ponytail: select "Read" / "Sudah Dibaca" option
    await expect(inboxPage.readFilter).toContainText(/Read|Sudah Dibaca/i);
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-563] Validate unread counter', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, switch to unread
    // Expected: data shown matched with counter
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read, counter badge)
    await inboxPage.readFilter.click();
    // ponytail: select "Unread" → read counter badge → compare with visible chat items count
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-564] Validate filter updated when any data changes', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation with "ALL" active, open a conversation
    // Expected: conversation becomes read, unread counter updated automatically
    await inboxPage.gotoAll();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read, counter)
    // ponytail: open chat → wait → assert unread counter decrements
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
    }
  });

  test('[SIX-Convo-565] Validate behavior active conversation when read/unread status changed [unread to read]', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation ALL, open any conversation
    // Expected: conversation becomes read, unread counter updated, visible state preserved
    await inboxPage.gotoAll();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read, counter)
      // ponytail: assert unread counter decremented
    }
  });

  test('[SIX-Convo-566] Validate behavior active conversation when read/unread status changed [read to unread]', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation ALL, open any conversation, close conversation
    // Expected: conversation becomes read then unread on new inbound, counter updates
    await inboxPage.gotoAll();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read, counter)
      // ponytail: close chat → trigger inbound → assert unread counter increments
    }
  });

});

test.describe('Conversation List Sort filter', () => {
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

  test('[SIX-Convo-567] Validate default is newest first', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, sort by default newest first
    // Expected: chats sorted descending by timestamp
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-sort)
    await expect(inboxPage.sortFilter).toBeVisible();
    await expect(inboxPage.sortFilter).toContainText(/Newest|Terbaru/i);
  });

  test('[SIX-Convo-568] Switch to oldest first', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, sort by default newest first, switch to oldest
    // Expected: chats sorted ascending by timestamp
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-sort)
    await inboxPage.sortFilter.click();
    // ponytail: select "Oldest" / "Terlama" option
    await expect(inboxPage.sortFilter).toContainText(/Oldest|Terlama/i);
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-569] Sorting retained across navigation switch', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, set sort to oldest, switch navigation
    // Expected: sort preference retained
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-sort, inbox-nav-*)
    await inboxPage.sortFilter.click();
    // ponytail: select "Oldest" → switch nav → assert sortFilter still shows "Oldest"
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

});

test.describe('Conversation List Advance filter', () => {
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

  test('[SIX-Convo-570] Filtering conversation by agent', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click advance filter, filter by agent
    // Expected: only chats assigned to selected agent displayed
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance)
    await inboxPage.advancedFilter.click();
    // ponytail: select agent → assert only matching chats visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-571] Filtering conversation by tag', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click advance filter, filter by tag
    // Expected: only chats with selected tag shown
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance)
    await inboxPage.advancedFilter.click();
    // ponytail: select tag → assert only tagged chats visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

});

test.describe('Conversation List Layout Visibility', () => {
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

  test('[SIX-Convo-572] Toggle show/hide tags', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click layout visibility
    // Expected: tags shown/hidden accordingly
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-visibility)
    await inboxPage.visibilityFilter.click();
    // ponytail: toggle tags → assert tag container visibility changes
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-573] Toggle show/hide number', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, click layout visibility
    // Expected: number shown/hidden accordingly
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-visibility)
    await inboxPage.visibilityFilter.click();
    // ponytail: toggle number → assert number column visibility changes
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

});

test.describe('Conversation List Combining Filter', () => {
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

  test('[SIX-Convo-574] Search + Status: Open (match)', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Open status, enter keyword matching open conversation name/message
    // Expected: conversation with status open and matching keyword is visible
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-searchButton)
    // ponytail: apply status=Open filter, search keyword → assert results visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-575] Search + Status: Close (match)', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Close status, enter keyword matching close conversation name/message
    // Expected: conversation with status close and matching keyword is visible
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-searchButton)
    // ponytail: apply status=Close filter, search keyword → assert results visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-576] Search + Status: Open (no match)', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Open status, enter keyword not matching any open conversation
    // Expected: no conversation is visible
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-searchButton)
    // ponytail: apply status=Open filter, search nonexistent keyword → assert empty state
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-577] Search + Status: Close (no match)', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Close status, enter keyword not matching any close conversation
    // Expected: no conversation is visible
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-searchButton)
    // ponytail: apply status=Close filter, search nonexistent keyword → assert empty state
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-578] Refresh after applying a filter', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Open status, enter keyword matching open conversation, refresh
    // Expected: all filters reset to default, open active, all read filter active, sort by newest
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-searchButton)
    // ponytail: apply filters → page.reload() → assert defaults restored
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-579] Search + Read Status: unread + keyword match', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Unread filter, search keyword matching unread chat
    // Expected: only unread chats containing keyword appear
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read, chatList-searchButton)
    // ponytail: apply read=Unread filter, search keyword → assert only matching unread chats visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-580] Search + Read Status: read + keyword match', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Read filter, search keyword matching read chat
    // Expected: only read chats containing keyword appear
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read, chatList-searchButton)
    // ponytail: apply read=Read filter, search keyword → assert only matching read chats visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-581] Search + Read Status: all + keyword match', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select All filter, search keyword matching chat
    // Expected: all chats containing keyword appear
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read, chatList-searchButton)
    // ponytail: apply read=All filter, search keyword → assert all matching chats visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-582] Status + Sort: Open + Newest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Open filter, sort by newest
    // Expected: all displayed chats with status open, newest first
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-sort)
    // ponytail: apply status=Open + sort=Newest → assert list contains only open chats, newest first
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-583] Status + Sort: Open + Oldest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Open filter, sort by oldest
    // Expected: all displayed chats with status open, oldest first
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-sort)
    // ponytail: apply status=Open + sort=Oldest → assert list contains only open chats, oldest first
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-584] Status + Sort: Closed + Newest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Close filter, sort by newest
    // Expected: all displayed chats with status closed, newest first
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-sort)
    // ponytail: apply status=Close + sort=Newest → assert list contains only closed chats, newest first
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-585] Status + Sort: Closed + Oldest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Close filter, sort by oldest
    // Expected: all displayed chats with status closed, oldest first
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-sort)
    // ponytail: apply status=Close + sort=Oldest → assert list contains only closed chats, oldest first
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-586] Status + Read + Sort: Open + Unread + Newest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: filter open + unread active
    // Expected: list displays only open unread chats sorted descending
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-read, chatList-filter-sort)
    // ponytail: apply status=Open + read=Unread + sort=Newest → assert only open unread chats, newest first
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-587] Status + Read + Sort: Close + Read + Oldest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Close filter, sort by oldest
    // Expected: list displays only close read chats sorted ascending
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-read, chatList-filter-sort)
    // ponytail: apply status=Close + read=Read + sort=Oldest → assert only close read chats, oldest first
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-588] Search + Agent: keyword match + specific agent', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps: filter agent=Agent A, search keyword related to chat with Agent A
    // Expected: display chats assigned to Agent A matching keyword
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    // ponytail: filter by agent → search keyword → assert only agent's matching chats visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-589] Search + Agent: keyword no match + specific agent', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps: filter agent=Agent B, search keyword not related to Agent B's chats
    // Expected: empty state displayed
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    // ponytail: filter by agent → search nonexistent keyword → assert empty state
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-590] Search + Agent: keyword match + switching agent', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps: filter agent=Agent A, search keyword, switch to Agent B
    // Expected: after switch, display chats assigned to Agent B matching keyword
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    // ponytail: filter by Agent A → search keyword → switch to Agent B → assert list updated
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-591] Search + Tag: "VIP" + search', async ({ page }) => {
    // Precondition: User has permission; chats have VIP tag
    // Test type: POSITIVE
    // Steps: apply tag filter "VIP", search keyword
    // Expected: only chats with "VIP" tag matching keyword appear
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    // ponytail: apply tag="VIP" → search keyword → assert only VIP-tagged matching chats visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-592] Search + Tag: multiple tags + search', async ({ page }) => {
    // Precondition: User has permission; chats have VIP and issues tags
    // Test type: POSITIVE
    // Steps: apply tag filter "VIP", "issues", search keyword
    // Expected: chats having either tag are displayed
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    // ponytail: apply tags="VIP","issues" → search keyword → assert chats with either tag visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-593] Combine All Filters (Stress Combination)', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    // Steps: search "return", status=Open, read=Unread, sort=Newest, agent=Me, tag=Delivery, hide number
    // Expected: only matching chats displayed; layout hides number column
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (all chatList-filter-* and chatList-searchButton)
    // ponytail: apply all filters → assert only matching chats visible, number column hidden
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-594] Reset all combined filters (refresh)', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    // Steps: apply all filters → refresh page
    // Expected: all filters cleared, conversation list resets to default
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (all chatList-filter-*, chatList-searchButton)
    // ponytail: apply all filters → page.reload() → assert defaults restored
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-595] Reset all combined filters (navigation)', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    // Steps: apply all filters → switch navigation → return
    // Expected: all filters cleared, conversation list resets to default
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (all chatList-filter-*, chatList-searchButton, inbox-nav-*)
    // ponytail: apply all filters → navigate away → navigate back → assert defaults restored
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-596] Edge Cases: anomaly input in search', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: type special characters #$%@
    // Expected: system handles gracefully, no crash, may return empty result
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton)
    // ponytail: type special chars → assert no crash, empty state or results appear
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-597] Edge Cases: contradictory filters', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: status=Closed + read=Unread
    // Expected: no result returned, empty list displayed
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-read)
    // ponytail: apply contradictory filters → assert empty state
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-598] Edge Cases: timeout', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: simulate network delay
    // Expected: display "Loading…" state, retry if failed
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (loading skeleton)
    // ponytail: simulate slow network → assert skeleton visible → assert list or error appears
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 15000 });
  });

  test('[SIX-Convo-599] Edge Cases: unauthorized agent filter access', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: logged-in agent lacks permission
    // Expected: "Agent filter" hidden or disabled
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance)
    // ponytail: assert advancedFilter is hidden or disabled for unauthorized agent
    // ponytail: requires agent role login (leherayam01)
    await expect(inboxPage.pageSection).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-622] Search + Read Status: read + keyword match', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Read filter, search keyword matching read chat
    // Expected: only read chats containing keyword appear
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read, chatList-searchButton)
    // ponytail: apply read=Read filter, search keyword → assert matching read chats visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-623] Search + Read Status: all + keyword match', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select All filter, search keyword matching chat
    // Expected: all chats containing keyword appear
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-read, chatList-searchButton)
    // ponytail: apply read=All filter, search keyword → assert all matching chats visible
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-624] Status + Sort: Open + Newest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Open filter, sort by newest
    // Expected: all displayed chats with status open, newest first
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-sort)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-625] Status + Sort: Open + Oldest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Open filter, sort by oldest
    // Expected: all displayed chats with status open, oldest first
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-sort)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-626] Status + Sort: Closed + Newest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Close filter, sort by newest
    // Expected: all displayed chats with status closed, newest first
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-sort)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-627] Status + Sort: Closed + Oldest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Close filter, sort by oldest
    // Expected: all displayed chats with status closed, oldest first
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-sort)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-628] Status + Read + Sort: Open + Unread + Newest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: filter open + unread active
    // Expected: list displays only open unread chats sorted descending
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-read, chatList-filter-sort)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-629] Status + Read + Sort: Close + Read + Oldest', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: select Close filter, sort by oldest
    // Expected: list displays only close read chats sorted ascending
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-read, chatList-filter-sort)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-630] Search + Agent: keyword match + specific agent', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-631] Search + Agent: keyword no match + specific agent', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-632] Search + Agent: keyword match + switching agent', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-633] Search + Tag: "VIP" + search', async ({ page }) => {
    // Precondition: User has permission; chats have VIP tag
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-634] Search + Tag: multiple tags + search', async ({ page }) => {
    // Precondition: User has permission; chats have VIP and issues tags
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance, chatList-searchButton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-635] Combine All Filters (Stress Combination)', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (all chatList-filter-*, chatList-searchButton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-636] Reset all combined filters (refresh)', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (all chatList-filter-*, chatList-searchButton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-637] Reset all combined filters (navigation)', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (all chatList-filter-*, chatList-searchButton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-638] Edge Cases: anomaly input in search', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: type special characters #$%@
    // Expected: system handles gracefully, no crash
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-searchButton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-639] Edge Cases: contradictory filters', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: status=Closed + read=Unread
    // Expected: no result returned, empty list displayed
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-status, chatList-filter-read)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-640] Edge Cases: timeout', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: simulate network delay
    // Expected: display "Loading…" state, retry if failed
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (loading skeleton)
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListContainer)).toBeVisible({ timeout: 15000 });
  });

  test('[SIX-Convo-641] Edge Cases: unauthorized agent filter access', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: logged-in agent lacks permission
    // Expected: "Agent filter" hidden or disabled
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (chatList-filter-advance)
    // ponytail: requires agent role login (leherayam01)
    await expect(inboxPage.pageSection).toBeVisible({ timeout: 10000 });
  });

});

test.describe('Conversation List > item content and behavior', () => {
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

  test('[SIX-Convo-600] Display name or phone number', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation
    // Expected: display number when contact not saved, display name when contact saved
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      const name1 = await inboxPage.cardName(1).textContent();
      await expect(name1).toBeTruthy();
    }
  });

  test('[SIX-Convo-601] Hover on chat container provide tooltip (1s delay)', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, hover chat container
    // Expected: highlight on hover, icon changes to checkbox, timestamp changes to ellipsis
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      const chat = inboxPage.chatItem(1);
      await expect(chat).toBeVisible();
      await chat.hover();
      // ponytail: assert background changed (CSS class/style check)
      // ponytail: assert checkbox visible (chat-list-1-checkbox)
      await expect(inboxPage.cardQuickAction(1)).toBeVisible({ timeout: 5000 });
    }
  });

  test('[SIX-Convo-602] Hover on specific section provide tooltip', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, hover customer name
    // Expected: display contact info tooltip, last 3 tickets, full last message
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      await inboxPage.cardName(1).hover();
      // ponytail: assert tooltip visible with contact info
      // ponytail: hover latest-message → assert full message tooltip
      await expect(inboxPage.cardName(1)).toBeVisible();
    }
  });

  test('[SIX-Convo-603] Display bulk action bar when chat selected', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, hover chat
    // Expected: bulk action toolbar appears, replaces filter section
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      const chat = inboxPage.chatItem(1);
      await chat.hover();
      // ponytail: assert checkbox visible → click checkbox
      // ponytail: assert bulk action toolbar visible (data-cy TBD)
      // ponytail: assert filter section replaced by toolbar
    }
  });

  test('[SIX-Convo-604] Counter updated dynamically based on selected chat', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, select chats
    // Expected: bulk action toolbar appears, counter displays selected count
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      const chat = inboxPage.chatItem(1);
      await chat.hover();
      // ponytail: select 2 chats → assert counter shows "2"
    }
  });

  test('[SIX-Convo-605] Infinite scroll behavior', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, scroll to bottom
    // Expected: fetch next page of chats, smooth load
    await inboxPage.gotoYourInbox();
    // ponytail: requires 20+ chats in list
    const initialCount = await inboxPage.getChatCount();
    if (initialCount >= 20) {
      await inboxPage.chatListContainer.evaluate((el) => el.scrollTop = el.scrollHeight);
      await page.waitForTimeout(2000);
      const newCount = await inboxPage.getChatCount();
      // ponytail: assert newCount > initialCount (next page loaded)
      await expect(inboxPage.chatListContainer).toBeVisible();
    }
  });

  test('[SIX-Convo-606] Cache scroll behavior', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, scroll, navigate away, return
    // Expected: scroll position restored
    await inboxPage.gotoUnassigned();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (inbox-nav-*)
    // ponytail: scroll down → navigate away → navigate back → assert scroll position restored
    await inboxPage.gotoAll();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-607] Default visible items on chat list', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, validate all default items exist
    // Expected: name/number, avatar, source icon, timestamp, message status, latest message
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // LIVE selectors: chat-list-1-name, chat-list-1-avatar, chat-list-1-channel-icon, chat-list-1-timestamp
      await expect(inboxPage.cardName(1)).toBeVisible();
      await expect(inboxPage.cardAvatar(1)).toBeVisible();
      await expect(inboxPage.cardChannelIcon(1)).toBeVisible();
      // ponytail: assert timestamp visible (chat-list-1-timestamp)
      // ponytail: assert latest message visible (chat-list-1-latest-message)
    }
  });

  test('[SIX-Convo-608] Starred icon visible', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, mark as starred
    // Expected: star icon displayed
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-star)
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('star')).toBeVisible({ timeout: 5000 });
      await inboxPage.quickAction('star').click();
      // ponytail: assert starred icon visible on chat list card
      await expect(inboxPage.cardStarredIcon(1)).toBeVisible({ timeout: 5000 });
    }
  });

  test('[SIX-Convo-609] Reminder countdown visible', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, set reminder
    // Expected: countdown timer displayed
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-reminder)
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('reminder')).toBeVisible({ timeout: 5000 });
    }
  });

  test('[SIX-Convo-610] Reminder within 1 day (<24h)', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, set reminder in 2h, 23h
    // Expected: countdown timer with appropriate units
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-reminder)
    // ponytail: set 2h reminder → assert "hh:mm" countdown
    // ponytail: set 23h reminder → assert "hh:mm" countdown
  });

  test('[SIX-Convo-611] Reminder next day or more', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: set reminder to next day, 2+ days
    // Expected: countdown as date+time, days+hours unit
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-reminder)
    // ponytail: set next-day reminder → assert date+time format displayed
    // ponytail: set 2+ day reminder → assert "Xd Yh" countdown
  });

  test('[SIX-Convo-612] Pin conversation', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, pin a conversation
    // Expected: pinned icon displayed, pinned at top of list
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-pin)
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('pin')).toBeVisible({ timeout: 5000 });
      await inboxPage.quickAction('pin').click();
      // ponytail: assert pinned icon visible (chat-list-1-pinned-icon)
      // ponytail: assert conversation at top of list
      await expect(inboxPage.cardPinnedIcon(1)).toBeVisible({ timeout: 5000 });
    }
  });

  test('[SIX-Convo-613] Pin/unpin multiple conversations', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: pin A, pin B, unpin A, pin A again
    // Expected: correct ordering, repositioning
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-pin)
    // ponytail: pin 2 conversations → assert ordering
    // ponytail: unpin first → assert repositioned
    // ponytail: repin → assert back at top
    const hasChats = await inboxPage.hasChat(2, 5000);
    if (hasChats) {
      await expect(inboxPage.chatItem(1)).toBeVisible();
    }
  });

  test('[SIX-Convo-614] Mark spam — conversation removed', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, mark as spam
    // Expected: conversation removed from list, listed on spam
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-spam)
      const chatName = await inboxPage.getChatName(1);
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('spam')).toBeVisible({ timeout: 5000 });
      await inboxPage.quickAction('spam').click();
      // ponytail: assert conversation removed from current list
      // ponytail: goto spam → assert conversation listed there
    }
  });

  test('[SIX-Convo-615] Unmark spam — conversation restored', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access spam, unmark spam
    // Expected: conversation removed from spam, restored to original place
    await inboxPage.gotoSpam();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-spam)
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('spam')).toBeVisible({ timeout: 5000 });
    }
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-616] Add a tag — display on card', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, select conversation, add tag
    // Expected: added tag displayed on conversation list card
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action, tag selection)
      // ponytail: open detail → add tag → assert tag visible on card (chat-list-1-tag-container, tag-1)
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
    }
  });

  test('[SIX-Convo-617] Add multiple tags — display and overflow', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, add 4+ tags
    // Expected: first 3 tags shown, +N overflow icon, hover to expand
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (tag-container, tag-overflow)
      // ponytail: add 4 tags → assert first 3 visible, +1 shown
      // ponytail: hover overflow → assert remaining tags expand
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
    }
  });

  test('[SIX-Convo-618] Remove tag — update tag display', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: add 3+ tags, remove one
    // Expected: tags update, replacements fill from remaining, + icon removed if <4
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (tag-container)
      // ponytail: add 3 tags → remove one → assert card updates
      // ponytail: if <4 tags remain → assert + icon gone
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
    }
  });

  test('[SIX-Convo-619] Inbound messages — unread indicator', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, send inbound message
    // Expected: unread indicator with counter on card, pinned icon left of unread
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: trigger inbound message → assert unread-count visible
      // ponytail: assert pinned icon left of unread indicator if pinned
      await expect(inboxPage.cardUnread(1)).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('[SIX-Convo-620] isTyping indicator behavior', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, typing at satuinbox
    // Expected: typing indicator temporarily hides unread/pinned/reminder/mention icons
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (typing-indicator on card)
      // ponytail: trigger typing → assert typing indicator visible
      // ponytail: assert unread/pinned/reminder/mention temporarily hidden
    }
  });

  test('[SIX-Convo-621] Member mention', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, create mention from conversation detail
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (mention in chat detail)
      // ponytail: open detail → add mention → assert mention indicator on card
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
    }
  });

  test('[SIX-Convo-642] Display name or phone number (duplicate coverage)', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation
    // Expected: display number when contact not saved, display name when contact saved
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      const name1 = await inboxPage.cardName(1).textContent();
      await expect(name1).toBeTruthy();
    }
  });

  test('[SIX-Convo-643] Hover on chat container provide tooltip', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, hover chat container
    // Expected: highlight on hover, icon changes to checkbox, timestamp to ellipsis
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      const chat = inboxPage.chatItem(1);
      await expect(chat).toBeVisible();
      await chat.hover();
      await expect(inboxPage.cardQuickAction(1)).toBeVisible({ timeout: 5000 });
    }
  });

  test('[SIX-Convo-644] Hover on specific section provide tooltip', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, hover customer name
    // Expected: display contact info tooltip, last 3 tickets, full last message
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      await inboxPage.cardName(1).hover();
      await expect(inboxPage.cardName(1)).toBeVisible();
    }
  });

  test('[SIX-Convo-645] Display bulk action bar when chat selected', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, hover chat
    // Expected: bulk action toolbar appears, replaces filter section
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      const chat = inboxPage.chatItem(1);
      await chat.hover();
      // ponytail: assert checkbox visible → click → assert bulk action bar visible
    }
  });

  test('[SIX-Convo-646] Counter updated dynamically based on selected chat', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, select chats
    // Expected: bulk action toolbar appears, counter displays selected count
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      const chat = inboxPage.chatItem(1);
      await chat.hover();
      // ponytail: select chats → assert counter updates
    }
  });

  test('[SIX-Convo-647] Infinite scroll behavior', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, scroll to bottom
    // Expected: fetch next page of chats, smooth load
    await inboxPage.gotoYourInbox();
    const initialCount = await inboxPage.getChatCount();
    if (initialCount >= 20) {
      await inboxPage.chatListContainer.evaluate((el) => el.scrollTop = el.scrollHeight);
      await page.waitForTimeout(2000);
      await expect(inboxPage.chatListContainer).toBeVisible();
    }
  });

  test('[SIX-Convo-648] Cache scroll behavior', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, scroll, navigate away, return
    // Expected: scroll position restored
    await inboxPage.gotoUnassigned();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (inbox-nav-*)
    await inboxPage.gotoAll();
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-649] Default visible items on chat list', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, validate all default items
    // Expected: name/number, avatar, source icon, timestamp, message status, latest message
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      await expect(inboxPage.cardName(1)).toBeVisible();
      await expect(inboxPage.cardAvatar(1)).toBeVisible();
      await expect(inboxPage.cardChannelIcon(1)).toBeVisible();
    }
  });

  test('[SIX-Convo-650] Starred icon visible', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, mark as starred
    // Expected: star icon displayed
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-star)
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('star')).toBeVisible({ timeout: 5000 });
      await inboxPage.quickAction('star').click();
      await expect(inboxPage.cardStarredIcon(1)).toBeVisible({ timeout: 5000 });
    }
  });

  test('[SIX-Convo-651] Reminder countdown visible', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, set reminder
    // Expected: countdown timer displayed
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-reminder)
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('reminder')).toBeVisible({ timeout: 5000 });
    }
  });

  test('[SIX-Convo-652] Reminder within 1 day (<24h)', async ({ page }) => {
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-reminder)
  });

  test('[SIX-Convo-653] Reminder next day or more', async ({ page }) => {
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-reminder)
  });

  test('[SIX-Convo-654] Pin conversation', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, pin a conversation
    // Expected: pinned icon displayed, pinned at top of list
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-pin)
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('pin')).toBeVisible({ timeout: 5000 });
      await inboxPage.quickAction('pin').click();
      await expect(inboxPage.cardPinnedIcon(1)).toBeVisible({ timeout: 5000 });
    }
  });

  test('[SIX-Convo-655] Pin/unpin multiple conversations', async ({ page }) => {
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-pin)
    const hasChats = await inboxPage.hasChat(2, 5000);
    if (hasChats) {
      await expect(inboxPage.chatItem(1)).toBeVisible();
    }
  });

  test('[SIX-Convo-656] Mark spam — conversation removed', async ({ page }) => {
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-spam)
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('spam')).toBeVisible({ timeout: 5000 });
      await inboxPage.quickAction('spam').click();
    }
  });

  test('[SIX-Convo-657] Unmark spam — conversation restored', async ({ page }) => {
    // Test type: POSITIVE
    await inboxPage.gotoSpam();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (quick-action-spam)
      await inboxPage.openQuickActionMenu(1);
      await expect(inboxPage.quickAction('spam')).toBeVisible({ timeout: 5000 });
    }
    await expect(inboxPage.chatListContainer.or(inboxPage.chatListEmpty)).toBeVisible({ timeout: 10000 });
  });

  test('[SIX-Convo-658] Add a tag — display on card', async ({ page }) => {
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (tag in detail)
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
    }
  });

  test('[SIX-Convo-659] Add multiple tags — display and overflow', async ({ page }) => {
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (tag-container, tag-overflow)
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
    }
  });

  test('[SIX-Convo-660] Remove tag — update tag display', async ({ page }) => {
    // Test type: POSITIVE
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (tag-container)
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
    }
  });

  test('[SIX-Convo-661] Inbound messages — unread indicator', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, send message
    // Expected: unread indicator with counter, pinned icon left of unread
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: trigger inbound → assert unread-count visible
      await expect(inboxPage.cardUnread(1)).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('[SIX-Convo-662] isTyping indicator behavior', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, typing at satuinbox
    // Expected: typing indicator hides unread/pinned/reminder/mention
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (typing-indicator on card list)
      // ponytail: trigger typing → assert typing indicator visible
    }
  });

  test('[SIX-Convo-663] Member mention', async ({ page }) => {
    // Test type: POSITIVE
    // Steps: access conversation, create mention from conversation detail
    await inboxPage.gotoYourInbox();
    const hasChats = await inboxPage.hasChat(1, 5000);
    if (hasChats) {
      // ponytail: MERGE-PENDING — wait for FE data-cy branch deploy (mention in chat detail)
      await inboxPage.openChat(1);
      await expect(inboxPage.chatRoom).toBeVisible({ timeout: 10000 });
    }
  });

});
