/**
 * AUTO-GENERATED from Conversation.tsv
 * DO NOT EDIT scenario/test structure manually — update the TSV, then re-generate.
 *
 * Conversation List — Features & Filters
 * TC range: SIX-Convo-546 – SIX-Convo-663
 * Total TCs: 118
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

  test.fixme('[SIX-Convo-546] Title changes based on navigation - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select “Your Inbox”, “Widget”, “Team A” sequentially
    // Expected:
    //   - Chat list title updates accordingly (e.g., “Your Inbox”, “Widget”, “Team A”)
    //   - Title updates each time
  });

  test.fixme('[SIX-Convo-547] Default title from active nav - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. it should display your inbox as default
    // Expected:
    //   - title set to your inbox
  });

  test.fixme('[SIX-Convo-548] display search icon (inactive) - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. it should display search icon at title section
    // Expected:
    //   - search icon visible when inactive
  });

  test.fixme('[SIX-Convo-549] Click search icon → activate input - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click search icon at title section
    // Expected:
    //   - Subtitle replaced by text input with autofocus
    //   - close icon available with or without any input
    //   - Cursor auto-focuses inside input
  });

  test.fixme('[SIX-Convo-550] try to search name/email/numbers/message - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click search icon at title section
    //   4. search email
    //   5. search number
    //   6. search message
    // Expected:
    //   - system displaying conversation related to keyword
    //   - success search by name
    //   - success search by email
    //   - success search by number
    //   - success search by message
  });

  test.fixme('[SIX-Convo-551] cancel search via keyboard shortcut - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click search icon at title section
    // Expected:
    //   - successfully close search input
  });

  test.fixme('[SIX-Convo-552] Case insensitive search - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click search icon at title section
    //   4. type name with lowercases "john"
    //   5. type name capitalize "John"
    // Expected:
    //   - system displaying conversation related to keyword
    //   - search with uppercase passed
    //   - search with lowercase passed
    //   - search capitalize passed
  });

  test.fixme('[SIX-Convo-553] search no result - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click search icon at title section
    // Expected:
    //   - Display “No conversations found”
  });

  test.fixme('[SIX-Convo-554] search with leading space - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click search icon at title section
    // Expected:
    //   - Display related conversation with the keyword
    //   - system must trim space
  });

  test.fixme('[SIX-Convo-555] search with trailing space - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click search icon at title section
    // Expected:
    //   - Display related conversation with the keyword
    //   - system must trim space
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

  test.fixme('[SIX-Convo-556] status filter Default = Open - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. validate status filter at conversation list
    // Expected:
    //   - “Open” filter is selected and activated
  });

  test.fixme('[SIX-Convo-557] switch to close status - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. validate default status filter at conversation list
    //   4. validate selected status filter
    // Expected:
    //   - “Open” filter is selected and active
    //   - after switch, close filter is selected and active
    //   - list conversation is updated
  });

  test.fixme('[SIX-Convo-558] validate counter - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. validate value counter from open status
    //   4. validate value counter from close status
    // Expected:
    //   - open status value is matched with displayed data
    //   - open status vallue is matched with selected navigation list counter
    //   - close status value is matched with displayed data
  });

  test.fixme('[SIX-Convo-559] validate every switch status, conversation list updated - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. validate conversation list is displayed
    //   4. validate conversation list is displayed
    //   5. switch to open status
    //   6. validate conversation list is displayed
    // Expected:
    //   - validate displayed data is updated every switching status
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

  test.fixme('[SIX-Convo-560] validate default is all - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. visible default read / unread status is "ALL"
    // Expected:
    //   - active filter read / unread status is "ALL"
  });

  test.fixme('[SIX-Convo-561] filtering with unread status - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. switch to unread
    // Expected:
    //   - active filter read / unread status switched to "unread"
    //   - conversation list updated with unread conversation
  });

  test.fixme('[SIX-Convo-562] filtering with read status - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. switch to read
    // Expected:
    //   - active filter read / unread status switched to "read"
    //   - conversation list updated with read conversation
  });

  test.fixme('[SIX-Convo-563] validate unread counter - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. switch to unread
    // Expected:
    //   - validate data shown is matched with counter
  });

  test.fixme('[SIX-Convo-564] validate filter updated when any data changes - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. access with read / unread status on "ALL" state active
    // Expected:
    //   - validate conversation become read
    //   - counter at unread is updated automatically
  });

  test.fixme('[SIX-Convo-565] validate behavior active conversation when read / unread status is changed [ unread to read ] - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. access with read / unread status on "ALL" state active
    //   4. open any conversation
    // Expected:
    //   - validate conversation become read
    //   - counter at unread is updated automatically
    //   - visible state ( converation list ) to user MUST BE same
    //   - conversation list updated when user close the room chat
    //   - conversation list updated when user refresh page
    //   - conversation list updated when user change filter or navigation
  });

  test.fixme('[SIX-Convo-566] validate behavior active conversation when read / unread status is changed [ read to unread ] - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. access with read / unread status on "ALL" state active
    //   4. open any conversation, keep conversation open
    //   5. validate behavior
    //   6. close converastion
    //   7. send new message to the conversation from customer
    // Expected:
    //   - validate conversation become read
    //   - counter at unread is updated automatically
    //   - visible state ( converation list ) to user MUST BE same
    //   - conversation list updated when user close the room chat
    //   - conversation list updated when user refresh page
    //   - conversation list updated when user change filter or navigation
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

  test.fixme('[SIX-Convo-567] validate default is newest first - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. sorting conversation by default newest first
    // Expected:
    //   - Chats sorted descending by timestamp
  });

  test.fixme('[SIX-Convo-568] switch to oldest first - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. sorting conversation by default newest first
    // Expected:
    //   - Chats sorted ascending by timestamp
  });

  test.fixme('[SIX-Convo-569] Sorting retained across navigation switch - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. sorting conversation by default newest first
    //   4. switch navigaiton
    // Expected:
    //   - Sort preference retained
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

  test.fixme('[SIX-Convo-570] filtering conversation by agent - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click advance filter
    // Expected:
    //   - Only chats assigned to that seleceted agent displayed
  });

  test.fixme('[SIX-Convo-571] filtering conversation by tag - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click advance filter
    // Expected:
    //   - Only chats with selected tag is shown
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

  test.fixme('[SIX-Convo-572] toggle show/hide tags - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click layout visibility
    // Expected:
    //   - tags shown/hidden accordingly
  });

  test.fixme('[SIX-Convo-573] toggle show/hide tags - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. click layout visibility
    // Expected:
    //   - number shown/hidden accordingly
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

  test.fixme('[SIX-Convo-574] Search + Status: Open - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select Open status
    //   2. Enter keyword matching open conversation name/message
    // Expected:
    //   - conversation with status open and match with keyword search is visible
  });

  test.fixme('[SIX-Convo-575] Search + Status: Close - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select Open status
    //   2. Enter keyword matching close conversation name/message
    // Expected:
    //   - conversation with status close and match with keyword search is visible
  });

  test.fixme('[SIX-Convo-576] Search + Status: Open - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select Open status
    //   2. Enter keyword that not matched with open conversation name/message
    // Expected:
    //   - no conversation is visible
  });

  test.fixme('[SIX-Convo-577] Search + Status: Close - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select Open status
    //   2. Enter keyword that not matched with close conversation name/message
    // Expected:
    //   - no conversation is visible
  });

  test.fixme('[SIX-Convo-578] refresh after applying a filter - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select Open status
    //   2. Enter keyword that matched with open conversation name/message
    // Expected:
    //   - all filter reseted to default
    //   - open filter is active
    //   - all filter is active
    //   - sort by newest is active
  });

  test.fixme('[SIX-Convo-579] Search + Read Status Filter Combination - Search + filter unread chats - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select Unread filter
    //   2. Search keyword matching unread chat
    // Expected:
    //   - Only unread chats containing keyword appear
  });

  test.fixme('[SIX-Convo-580] Search + Read Status Filter Combination - Search filter read chats - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select read filter
    //   2. Search keyword matching unread chat
    // Expected:
    //   - Only unread chats containing keyword appear
  });

  test.fixme('[SIX-Convo-581] Search + Read Status Filter Combination - Search filter all chats - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select all filter
    //   2. Search keyword matching unread chat
    // Expected:
    //   - all chats containing keyword appear
  });

  test.fixme('[SIX-Convo-582] Status Filter + Sorting Behavior - Open status + Sort Newest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select open filter
    //   2. sort by newest
    // Expected:
    //   - all displayed Chats with status open
    //   - newest chat is displayed first
  });

  test.fixme('[SIX-Convo-583] Status Filter + Sorting Behavior - Open status + Sort oldest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select open filter
    //   2. sort by oldest
    // Expected:
    //   - all displayed Chats with status open
    //   - oldest chat is displayed first
  });

  test.fixme('[SIX-Convo-584] Status Filter + Sorting Behavior - Closed status + Sort newest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select close filter
    //   2. sort by newest
    // Expected:
    //   - all displayed Chats with status closed
    //   - newest chat is displayed first
  });

  test.fixme('[SIX-Convo-585] Status Filter + Sorting Behavior - Closed status + Sort oldest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select close filter
    //   2. sort by oldest
    // Expected:
    //   - all displayed Chats with status closed
    //   - oldest chat is displayed first
  });

  test.fixme('[SIX-Convo-586] Status + Read Status + Sort Combination > Open + Unread + Newest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. filter open active
    //   2. filter unread active
    // Expected:
    //   - List displays only open unread chats sorted descending
  });

  test.fixme('[SIX-Convo-587] Status + Read Status + Sort Combination > Close + Read + Oldest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select close filter
    //   2. sort by oldest
    // Expected:
    //   - List displays only close read chats sorted ascending
  });

  test.fixme('[SIX-Convo-588] Search + Agent Filter > Search keyword + specific agent - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Filter agent = Agent A
    //   2. search with keyword related to chat with handler agent A
    // Expected:
    //   - Display chats assigned to Agent A matching keyword
  });

  test.fixme('[SIX-Convo-589] Search + Agent Filter > Search keyword that doesn\t exist + specific agent - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Filter agent = Agent B
    //   2. search with keyword not related to chat with handler agent B
    // Expected:
    //   - Empty state displayed
  });

  test.fixme('[SIX-Convo-590] Search + Agent Filter > Search keyword exist + switching agent - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Filter agent = Agent A
    //   2. search with keyword related to chat
    // Expected:
    //   - Display chats assigned to Agent A matching keyword
    //   - after switch, Display chats assigned to Agent B matching keyword
  });

  test.fixme('[SIX-Convo-591] Search + Tag Filter > Filter by tag “VIP” + search - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Apply tag filter “VIP”
    //   2. Search keyword
    // Expected:
    //   - Only chats with “VIP” tag matching keyword appear
  });

  test.fixme('[SIX-Convo-592] Search + Tag Filter > Filter by multiple tag + search - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Apply tag filter “VIP”, "issues"
    //   2. Search keyword
    // Expected:
    //   - Chats having either tag are displayed
  });

  test.fixme('[SIX-Convo-593] Combine All Filters (Stress Combination) - not yet automated', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    // Steps:
    //   1. Search “return”
    //   2. Status = Open
    //   4. Sort = Newest
    //   5. Agent = Me
    //   6. Tag = Delivery
    //   7. Hide number layout
    // Expected:
    //   - Only unread open chats matching keyword + agent + tag displayed; layout hides number column
  });

  test.fixme('[SIX-Convo-594] Reset all combined filters - not yet automated', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    // Steps:
    //   1. Search “return”
    //   2. Status = Open
    //   4. Sort = Newest
    //   5. Agent = Me
    //   6. Tag = Delivery
    //   7. Hide number layout
    //   8. refresh page
    // Expected:
    //   - Only unread open chats matching keyword + agent + tag displayed; layout hides number column
    //   - All filters cleared, conversation list resets to default open + newest view
  });

  test.fixme('[SIX-Convo-595] Reset all combined filters - not yet automated', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    // Steps:
    //   1. Search “return”
    //   2. Status = Open
    //   4. Sort = Newest
    //   5. Agent = Me
    //   6. Tag = Delivery
    //   7. Hide number layout
    //   8. refresh page
    // Expected:
    //   - Only unread open chats matching keyword + agent + tag displayed; layout hides number column
    //   - All filters cleared, conversation list resets to default open + newest view
  });

  test.fixme('[SIX-Convo-596] EDGE CASES > anomaly input in search - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Type special characters #$%@
    // Expected:
    //   - System handles gracefully; no crash; may return empty result
  });

  test.fixme('[SIX-Convo-597] EDGE CASES > Contradictory filters - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Status = Closed + Read = Unread
    // Expected:
    //   - No result returned; empty list displayed
  });

  test.fixme('[SIX-Convo-598] EDGE CASES > timeout - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Simulate network delay
    // Expected:
    //   - Display “Loading…” state; retry if failed
  });

  test.fixme('[SIX-Convo-599] EDGE CASES > Unauthorized agent filter access - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Logged-in agent lacks permission
    // Expected:
    //   - “Agent filter” hidden or disabled
  });

  test.fixme('[SIX-Convo-622] Search + Read Status Filter Combination - Search filter read chats - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select read filter
    //   2. Search keyword matching unread chat
    // Expected:
    //   - Only unread chats containing keyword appear
  });

  test.fixme('[SIX-Convo-623] Search + Read Status Filter Combination - Search filter all chats - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select all filter
    //   2. Search keyword matching unread chat
    // Expected:
    //   - all chats containing keyword appear
  });

  test.fixme('[SIX-Convo-624] Status Filter + Sorting Behavior - Open status + Sort Newest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select open filter
    //   2. sort by newest
    // Expected:
    //   - all displayed Chats with status open
    //   - newest chat is displayed first
  });

  test.fixme('[SIX-Convo-625] Status Filter + Sorting Behavior - Open status + Sort oldest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select open filter
    //   2. sort by oldest
    // Expected:
    //   - all displayed Chats with status open
    //   - oldest chat is displayed first
  });

  test.fixme('[SIX-Convo-626] Status Filter + Sorting Behavior - Closed status + Sort newest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select close filter
    //   2. sort by newest
    // Expected:
    //   - all displayed Chats with status closed
    //   - newest chat is displayed first
  });

  test.fixme('[SIX-Convo-627] Status Filter + Sorting Behavior - Closed status + Sort oldest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select close filter
    //   2. sort by oldest
    // Expected:
    //   - all displayed Chats with status closed
    //   - oldest chat is displayed first
  });

  test.fixme('[SIX-Convo-628] Status + Read Status + Sort Combination > Open + Unread + Newest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. filter open active
    //   2. filter unread active
    // Expected:
    //   - List displays only open unread chats sorted descending
  });

  test.fixme('[SIX-Convo-629] Status + Read Status + Sort Combination > Close + Read + Oldest - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Select close filter
    //   2. sort by oldest
    // Expected:
    //   - List displays only close read chats sorted ascending
  });

  test.fixme('[SIX-Convo-630] Search + Agent Filter > Search keyword + specific agent - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Filter agent = Agent A
    //   2. search with keyword related to chat with handler agent A
    // Expected:
    //   - Display chats assigned to Agent A matching keyword
  });

  test.fixme('[SIX-Convo-631] Search + Agent Filter > Search keyword that doesn\t exist + specific agent - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Filter agent = Agent B
    //   2. search with keyword not related to chat with handler agent B
    // Expected:
    //   - Empty state displayed
  });

  test.fixme('[SIX-Convo-632] Search + Agent Filter > Search keyword exist + switching agent - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Filter agent = Agent A
    //   2. search with keyword related to chat
    // Expected:
    //   - Display chats assigned to Agent A matching keyword
    //   - after switch, Display chats assigned to Agent B matching keyword
  });

  test.fixme('[SIX-Convo-633] Search + Tag Filter > Filter by tag “VIP” + search - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Apply tag filter “VIP”
    //   2. Search keyword
    // Expected:
    //   - Only chats with “VIP” tag matching keyword appear
  });

  test.fixme('[SIX-Convo-634] Search + Tag Filter > Filter by multiple tag + search - not yet automated', async ({ page }) => {
    // Precondition: User has permission; Agent A & B assigned to different chats
    // Test type: POSITIVE
    // Steps:
    //   1. Apply tag filter “VIP”, "issues"
    //   2. Search keyword
    // Expected:
    //   - Chats having either tag are displayed
  });

  test.fixme('[SIX-Convo-635] Combine All Filters (Stress Combination) - not yet automated', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    // Steps:
    //   1. Search “return”
    //   2. Status = Open
    //   4. Sort = Newest
    //   5. Agent = Me
    //   6. Tag = Delivery
    //   7. Hide number layout
    // Expected:
    //   - Only unread open chats matching keyword + agent + tag displayed; layout hides number column
  });

  test.fixme('[SIX-Convo-636] Reset all combined filters - not yet automated', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    // Steps:
    //   1. Search “return”
    //   2. Status = Open
    //   4. Sort = Newest
    //   5. Agent = Me
    //   6. Tag = Delivery
    //   7. Hide number layout
    //   8. refresh page
    // Expected:
    //   - Only unread open chats matching keyword + agent + tag displayed; layout hides number column
    //   - All filters cleared, conversation list resets to default open + newest view
  });

  test.fixme('[SIX-Convo-637] Reset all combined filters - not yet automated', async ({ page }) => {
    // Precondition: Chats with mixed states exist
    // Test type: POSITIVE
    // Steps:
    //   1. Search “return”
    //   2. Status = Open
    //   4. Sort = Newest
    //   5. Agent = Me
    //   6. Tag = Delivery
    //   7. Hide number layout
    //   8. refresh page
    // Expected:
    //   - Only unread open chats matching keyword + agent + tag displayed; layout hides number column
    //   - All filters cleared, conversation list resets to default open + newest view
  });

  test.fixme('[SIX-Convo-638] EDGE CASES > anomaly input in search - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Type special characters #$%@
    // Expected:
    //   - System handles gracefully; no crash; may return empty result
  });

  test.fixme('[SIX-Convo-639] EDGE CASES > Contradictory filters - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Status = Closed + Read = Unread
    // Expected:
    //   - No result returned; empty list displayed
  });

  test.fixme('[SIX-Convo-640] EDGE CASES > timeout - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Simulate network delay
    // Expected:
    //   - Display “Loading…” state; retry if failed
  });

  test.fixme('[SIX-Convo-641] EDGE CASES > Unauthorized agent filter access - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. Logged-in agent lacks permission
    // Expected:
    //   - “Agent filter” hidden or disabled
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

  test.fixme('[SIX-Convo-600] Display name or phone number - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    // Expected:
    //   - display number when contact not saved on device
    //   - display name when contact saved on device
  });

  test.fixme('[SIX-Convo-601] Hover on chat container provide tooltip (1s delay) - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. hover chat (container)
    // Expected:
    //   - highlight when hover ( background changed to darker -grey- color )
    //   - change icon to checkbox
    //   - change timestamp to elipsis icon
  });

  test.fixme('[SIX-Convo-602] Hover on specific section on chat container provide tooltip (1s delay) - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. hover chat customer name
    // Expected:
    //   - hover at customer name, display contact info, name and or number
    //   - hover at customer name, display last 3 ticket
    //   - hover at latest message, display whole last messages
  });

  test.fixme('[SIX-Convo-603] Display bulk action bar when chat selected - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. hover chat (container)
    // Expected:
    //   - Bulk action toolbar appears
    //   - bulk action toolbar replace the filter section
  });

  test.fixme('[SIX-Convo-604] counter updated dynamincally based on selected chat - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. hover chat (container)
    // Expected:
    //   - Bulk action toolbar appears
    //   - counter display how many chat selected
  });

  test.fixme('[SIX-Convo-605] infinite scroll behavior - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. scroll to bottom
    // Expected:
    //   - fetch nnext page of chats
    //   - when scrolling chat perform smooth load
  });

  test.fixme('[SIX-Convo-606] cache scroll behavior - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. access unassigned (any navigation that have more than 20 chat list)
    //   4. open other navigation
    //   5. back to unassigned
    // Expected:
    //   - Scroll position restored
  });

  test.fixme('[SIX-Convo-607] default visible item on chat list - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. validate all default item is exist
    // Expected:
    //   - customer name OR phone number displayed
    //   - inital icon OR profile picture displayed
    //   - source icon displayed
    //   - time stamp displayed
    //   - deliver message status displayed ( if latest message from agent )
    //   - latest message displayed
  });

  test.fixme('[SIX-Convo-608] visible item on chat list based on action - starred - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. mark conversation as starred
    // Expected:
    //   - star icon is displayed
  });

  test.fixme('[SIX-Convo-609] visible item on chat list based on action - set reminder - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. set conversation reminder
    // Expected:
    //   - countdown timer displayed
  });

  test.fixme('[SIX-Convo-610] visible item on chat list based on action - set reminder within 1 day (<24) - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. set conversation reminder
    //   4. set timer in 2 hour
    //   5. set timer in 23 hour
    // Expected:
    //   - (3) display countdown timer with minute and second unit
    //   - (4) display countdown timer with hour and minute unit
    //   - (5) display countdown timer with hour and minute unit
  });

  test.fixme('[SIX-Convo-611] visible item on chat list based on action - set reminder to next day or more - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. set conversation reminder
    //   4. set timer to next day different hour
    //   5. set timer to next 2 day or more
    // Expected:
    //   - (3) Display the countdown as a date with the set time
    //   - (4) Display the countdown as a date with the set time
    //   - (5) Display the countdown as a date with the set time
    //   - (3) Display the countdown timer with days and hour unit
    //   - (4) Display the countdown timer with days and hour unit
    //   - (5) Display the countdown timer with days and hour unit
  });

  test.fixme('[SIX-Convo-612] visible item on chat list based on action - pin conversation - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. pin a conversation
    // Expected:
    //   - pinned icon is displayed on the right side of conversation list card
    //   - pinned conversation placed at the top  of the list
  });

  test.fixme('[SIX-Convo-613] visible item on chat list based on action - pin / unpin multiple conversation - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. pin a conversation - a
    //   4. unpin conversation a
    //   5. pin again conversation a
    // Expected:
    //   - pinned icon is displayed
    //   - (2) pinned conversation placed at the top  of the list
    //   - (3) The second pinned conversation is placed at the top of the list, while the first pinned conversation will appear below it.
    //   - (4) conversation placed back to original position
    //   - (5) pinned conversation placed at the top of the list
  });

  test.fixme('[SIX-Convo-614] visible item on chat list based on action - mark spam - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. mark a conversation as spam - a
    // Expected:
    //   - conversation removed from list
    //   - conversation will listed on spam
  });

  test.fixme('[SIX-Convo-615] visible item on chat list based on action - unmark spam - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. access spam
    // Expected:
    //   - conversation removed from spam
    //   - conversation will listed on its original place
  });

  test.fixme('[SIX-Convo-616] visible item on chat list based on action - add a tag - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. select a conversation
    // Expected:
    //   - display added tag on conversation list card
  });

  test.fixme('[SIX-Convo-617] visible item on chat list based on action - add multiple tag - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. select a conversation
    // Expected:
    //   - Display added tags on the conversation list card
    //   - Show only the first three added tags by default
    //   - Display a ‘+’ icon with a counter showing how many tags are hidden on the right side of the tag line if more than three tags exist
    //   - When hovering over the “+” icon, expand to show the remaining hidden tags
  });

  test.fixme('[SIX-Convo-618] visible item on chat list based on action - remove tag - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. select a conversation
    // Expected:
    //   - When tags are removed from a conversation list card, update the display accordingly
    //   - If any of the first three displayed tags are removed, replace them with the next tags in the remaining list (in order).
    //   - Remove the “+” icon if fewer than four tags remain
  });

  test.fixme('[SIX-Convo-619] visible item on chat list based on action - inbound messages - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. send message to satuinbox
    // Expected:
    //   - display unread indicator with counter on the right side of conversation list card
    //   - If a conversation is pinned, the pinned icon should be placed to the left of the unread indicator
  });

  test.fixme('[SIX-Convo-620] visible item on chat list based on action - inbound messages - isTYPING indicator - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. try typing at satuinbox
    // Expected:
    //   - if conversation have unread state, display unread indicator with counter on the right side of conversation list card
    //   - If a conversation is pinned, the pinned icon should be placed to the left of the unread indicator
    //   - if conversation have reminder, display on the left side of pinned icon
    //   - if conversation have mention, dispay on the left side of reminder icon
    //   - when typing state, temporary hide unread, pinned, reminder, and mentiion icon, change with typing indicator
  });

  test.fixme('[SIX-Convo-621] visible item on chat list based on action - member mention - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. create mentiion from conversation detail
  });

  test.fixme('[SIX-Convo-642] Display name or phone number - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    // Expected:
    //   - display number when contact not saved on device
    //   - display name when contact saved on device
  });

  test.fixme('[SIX-Convo-643] Hover on chat container provide tooltip (1s delay) - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. hover chat (container)
    // Expected:
    //   - highlight when hover ( background changed to darker -grey- color )
    //   - change icon to checkbox
    //   - change timestamp to elipsis icon
  });

  test.fixme('[SIX-Convo-644] Hover on specific section on chat container provide tooltip (1s delay) - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. hover chat customer name
    // Expected:
    //   - hover at customer name, display contact info, name and or number
    //   - hover at customer name, display last 3 ticket
    //   - hover at latest message, display whole last messages
  });

  test.fixme('[SIX-Convo-645] Display bulk action bar when chat selected - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. hover chat (container)
    // Expected:
    //   - Bulk action toolbar appears
    //   - bulk action toolbar replace the filter section
  });

  test.fixme('[SIX-Convo-646] counter updated dynamincally based on selected chat - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. hover chat (container)
    // Expected:
    //   - Bulk action toolbar appears
    //   - counter display how many chat selected
  });

  test.fixme('[SIX-Convo-647] infinite scroll behavior - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. scroll to bottom
    // Expected:
    //   - fetch nnext page of chats
    //   - when scrolling chat perform smooth load
  });

  test.fixme('[SIX-Convo-648] cache scroll behavior - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. access unassigned (any navigation that have more than 20 chat list)
    //   4. open other navigation
    //   5. back to unassigned
    // Expected:
    //   - Scroll position restored
  });

  test.fixme('[SIX-Convo-649] default visible item on chat list - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. validate all default item is exist
    // Expected:
    //   - customer name OR phone number displayed
    //   - inital icon OR profile picture displayed
    //   - source icon displayed
    //   - time stamp displayed
    //   - deliver message status displayed ( if latest message from agent )
    //   - latest message displayed
  });

  test.fixme('[SIX-Convo-650] visible item on chat list based on action - starred - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. mark conversation as starred
    // Expected:
    //   - star icon is displayed
  });

  test.fixme('[SIX-Convo-651] visible item on chat list based on action - set reminder - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. set conversation reminder
    // Expected:
    //   - countdown timer displayed
  });

  test.fixme('[SIX-Convo-652] visible item on chat list based on action - set reminder within 1 day (<24) - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. set conversation reminder
    //   4. set timer in 2 hour
    //   5. set timer in 23 hour
    // Expected:
    //   - (3) display countdown timer with minute and second unit
    //   - (4) display countdown timer with hour and minute unit
    //   - (5) display countdown timer with hour and minute unit
  });

  test.fixme('[SIX-Convo-653] visible item on chat list based on action - set reminder to next day or more - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. set conversation reminder
    //   4. set timer to next day different hour
    //   5. set timer to next 2 day or more
    // Expected:
    //   - (3) Display the countdown as a date with the set time
    //   - (4) Display the countdown as a date with the set time
    //   - (5) Display the countdown as a date with the set time
    //   - (3) Display the countdown timer with days and hour unit
    //   - (4) Display the countdown timer with days and hour unit
    //   - (5) Display the countdown timer with days and hour unit
  });

  test.fixme('[SIX-Convo-654] visible item on chat list based on action - pin conversation - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. pin a conversation
    // Expected:
    //   - pinned icon is displayed on the right side of conversation list card
    //   - pinned conversation placed at the top  of the list
  });

  test.fixme('[SIX-Convo-655] visible item on chat list based on action - pin / unpin multiple conversation - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. pin a conversation - a
    //   4. unpin conversation a
    //   5. pin again conversation a
    // Expected:
    //   - pinned icon is displayed
    //   - (2) pinned conversation placed at the top  of the list
    //   - (3) The second pinned conversation is placed at the top of the list, while the first pinned conversation will appear below it.
    //   - (4) conversation placed back to original position
    //   - (5) pinned conversation placed at the top of the list
  });

  test.fixme('[SIX-Convo-656] visible item on chat list based on action - mark spam - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. mark a conversation as spam - a
    // Expected:
    //   - conversation removed from list
    //   - conversation will listed on spam
  });

  test.fixme('[SIX-Convo-657] visible item on chat list based on action - unmark spam - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. access spam
    // Expected:
    //   - conversation removed from spam
    //   - conversation will listed on its original place
  });

  test.fixme('[SIX-Convo-658] visible item on chat list based on action - add a tag - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. select a conversation
    // Expected:
    //   - display added tag on conversation list card
  });

  test.fixme('[SIX-Convo-659] visible item on chat list based on action - add multiple tag - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. select a conversation
    // Expected:
    //   - Display added tags on the conversation list card
    //   - Show only the first three added tags by default
    //   - Display a ‘+’ icon with a counter showing how many tags are hidden on the right side of the tag line if more than three tags exist
    //   - When hovering over the “+” icon, expand to show the remaining hidden tags
  });

  test.fixme('[SIX-Convo-660] visible item on chat list based on action - remove tag - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. select a conversation
    // Expected:
    //   - When tags are removed from a conversation list card, update the display accordingly
    //   - If any of the first three displayed tags are removed, replace them with the next tags in the remaining list (in order).
    //   - Remove the “+” icon if fewer than four tags remain
  });

  test.fixme('[SIX-Convo-661] visible item on chat list based on action - inbound messages - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. send message to satuinbox
    // Expected:
    //   - display unread indicator with counter on the right side of conversation list card
    //   - If a conversation is pinned, the pinned icon should be placed to the left of the unread indicator
  });

  test.fixme('[SIX-Convo-662] visible item on chat list based on action - inbound messages - isTYPING indicator - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. try typing at satuinbox
    // Expected:
    //   - if conversation have unread state, display unread indicator with counter on the right side of conversation list card
    //   - If a conversation is pinned, the pinned icon should be placed to the left of the unread indicator
    //   - if conversation have reminder, display on the left side of pinned icon
    //   - if conversation have mention, dispay on the left side of reminder icon
    //   - when typing state, temporary hide unread, pinned, reminder, and mentiion icon, change with typing indicator
  });

  test.fixme('[SIX-Convo-663] visible item on chat list based on action - member mention - not yet automated', async ({ page }) => {
    // Test type: POSITIVE
    // Steps:
    //   1. access conversation
    //   2. create mentiion from conversation detail
  });

});
