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
const { AuthPage } = require('../../../support/pages/auth.page');
const { InboxPage } = require('../../../support/pages/inbox.page');

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

  test.fixme('[SIX-Convo-316] display from new conversation, from wa web - not yet automated', async ({ page }) => {
    // Precondition: have conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. receive message to unassign to  team inbox number from customer
    //   2. open conversation room
    // Expected:
    //   - display conversation assignee accordion
    //   - display conversation attribures accordion
    //   - display client data accordion
    //   - display conversation history accordion
  });

  test.fixme('[SIX-Convo-317] display from new conversation, from widget - not yet automated', async ({ page }) => {
    // Precondition: have conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. receive message from widget
    //   2. open conversation room
    // Expected:
    //   - display conversation assignee accordion
    //   - display conversation attribures accordion + topics
    //   - display custom attributes accordion
    //   - display client data accordion
    //   - display conversation history accordion
  });

  test.fixme('[SIX-Convo-318] display from new conversation, from group chat - not yet automated', async ({ page }) => {
    // Precondition: have conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. receive message from group chat
    //   2. open conversation room
    // Expected:
    //   - display conversation assignee accordion
    //   - display conversation attribures accordion
    //   - display group member accordion
  });

  test.fixme('[SIX-Convo-319] display ALL, from wa web - not yet automated', async ({ page }) => {
    // Precondition: have conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. do everthing to display all accordion
    //   2. open conversation room
    // Expected:
    //   - display conversation assignee accordion
    //   - display conversation attribures accordion
    //   - display custom attributes accordion
    //   - display client data accordion
    //   - display linked tickets accordion
    //   - display client tags accordion
  });

  test.fixme('[SIX-Convo-320] minimize app, change to drawer - not yet automated', async ({ page }) => {
    // Precondition: have conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. minimze app
    //   2. open conversation room
    // Expected:
    //   - conversation details panel change to drawer
  });

  test.fixme('[SIX-Convo-321] close and open panel - not yet automated', async ({ page }) => {
    // Precondition: have conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click drawer button to close
    // Expected:
    //   - conversation details panel closed
    //   - open conversation details button displayed on header status button right side
    //   - conversation details panel opened
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

  test.fixme('[SIX-Convo-322] new conversation, from wa, empty state - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - team inbox not assign to anyone
    //   - agent not assign to anyone
  });

  test.fixme('[SIX-Convo-323] assigned conversation, from wa, display all - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - display all assigned to conversation team inbox
    //   - display all assigned to conversation agent
    //   - display add agent button
  });

  test.fixme('[SIX-Convo-324] new conversation, from wa, connected account assign to team inbox - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. create team inbox, with connected number as member teaminbox
    //   2. receive message in that number
    // Expected:
    //   - automatically assign to team inbox
  });

  test.fixme('[SIX-Convo-325] from wa, create team inbox with connected number that already have conversation room - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. create new team inbox with that channel account as member
    // Expected:
    //   - update team inbox assignee
  });

  test.fixme('[SIX-Convo-326] close and open conversation assignee accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click accordion button
    // Expected:
    //   - accordion closes, components inside not displayed
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

  test.fixme('[SIX-Convo-327] display assign team inbox modal, empty state - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign team inbox
    // Expected:
    //   - display assign team inbox modal - modal title - searchbar - (X) button - cancel button - assign button (disable)
  });

  test.fixme('[SIX-Convo-328] display assign team inbox modal, have 2 team inbox - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. create two team inbox
    //   2. open conversation room
    // Expected:
    //   - display assign assign team inbox modal - modal title - searchbar - display team inbox list (icon and name) - (X) button - cancel button - assign button (disable)
  });

  test.fixme('[SIX-Convo-329] assign team inbox modal, cancel button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. create two team inbox
    //   2. open conversation room
    //   4. click cancel button
    // Expected:
    //   - modal closed
  });

  test.fixme('[SIX-Convo-330] assign team inbox modal, (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. create two team inbox
    //   2. open conversation room
    //   4. click (X) button
    // Expected:
    //   - modal closed
  });

  test.fixme('[SIX-Convo-331] assign team inbox modal, click outside the modal - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. create two team inbox
    //   2. open conversation room
    //   4. click outside the modal
    // Expected:
    //   - modal closed
  });

  test.fixme('[SIX-Convo-332] assign team inbox modal, searchbar - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign team inbox
    // Expected:
    //   - display team inbox list that contains the searchbar input
  });

  test.fixme('[SIX-Convo-333] assign team inbox modal, assign 1 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign team inbox
    //   4. click assign button
    // Expected:
    //   - highlight selected team inbox list
    //   - conversation added to team inbox conversation list
  });

  test.fixme('[SIX-Convo-334] assign team inbox modal, select 1 and select another - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign team inbox
    //   4. select another team inbox
    // Expected:
    //   - change highlight to latest select
    //   - highlight both selected team inbox
  });

  test.fixme('[SIX-Convo-335] assign team inbox modal, select 1 and cancel - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign team inbox
    //   4. cancel
    //   5. click assign team inbox
    // Expected:
    //   - unhighlight team inbox list after cancelation
  });

  test.fixme('[SIX-Convo-336] assign team inbox modal, select 1 and click again - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign team inbox
    //   4. click the same team inbox
    // Expected:
    //   - unselect/unhighlight team inbox list
  });

  test.fixme('[SIX-Convo-337] assign team inbox modal, already assign 1 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign team inbox
    //   4. assign
    //   5. click assign team inbox
    // Expected:
    //   - current team inbox highlighted, assign button isDisabled
  });

  test.fixme('[SIX-Convo-338] assign team inbox modal, already assign 1, select current team inbox - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign team inbox
    //   4. assign
    //   5. click assign team inbox
    //   6. click current team inbox
    //   7. assign
    // Expected:
    //   - current team inbox unselect/unhighlight, assign button isEnabled
    //   - conversation room remove from team inbox conversation list
  });

  test.fixme('[SIX-Convo-339] assign team inbox modal, already assign 1, select another team inbox - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have team inbox
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign team inbox
    //   4. assign
    //   5. click assign team inbox
    //   6. select another team inbox
    //   7. assign
    // Expected:
    //   - current team inbox unselect/unhighlight, highlight latest selected team inbox
    //   - highlight current team inbox and latest selected team inbox
    //   - conversation room added to newest assign team inbox conversation list, and remove from previous assigned team inbox conversation list
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

  test.fixme('[SIX-Convo-340] display assign member modal, empty state - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    // Expected:
    //   - display assign member modal - modal title - searchbar - (X) button - cancel button - assign button (disable)
  });

  test.fixme('[SIX-Convo-341] display assign member modal, have 2 member - not yet automated', async ({ page }) => {
    // Precondition: have conversation,
    // Test type: POSITIVE
    // Steps:
    //   1. create two member
    //   2. open conversation room
    // Expected:
    //   - display assign member modal - modal title - searchbar - display member list (no photo icon and name) - (X) button - cancel button - assign button (disable)
  });

  test.fixme('[SIX-Convo-342] assign member modal, cancel button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    // Expected:
    //   - modal closed
  });

  test.fixme('[SIX-Convo-343] assign member modal, (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    // Expected:
    //   - modal closed
  });

  test.fixme('[SIX-Convo-344] assign member modal, click outside the modal - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. create two member
    //   2. open conversation room
    //   4. click outside the modal
    // Expected:
    //   - modal closed
  });

  test.fixme('[SIX-Convo-345] assign member modal, searchbar - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    // Expected:
    //   - display member list that contains the searchbar input
  });

  test.fixme('[SIX-Convo-346] assign member modal, assign 1 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    //   4. click assign button
    // Expected:
    //   - highlight selected member list
    //   - conversation added to member's your-inbox conversation list
  });

  test.fixme('[SIX-Convo-347] assign member modal, select 1 and cancel - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    //   4. click cancel button
    // Expected:
    //   - unhighlight member list after cancelation
  });

  test.fixme('[SIX-Convo-348] assign member modal, select 1 and select another - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    //   4. select another member
    // Expected:
    //   - highlight both selected member list
  });

  test.fixme('[SIX-Convo-349] assign member modal, select 1 and click again - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    //   4. click the same member
    // Expected:
    //   - unselect/unhighlight member list
  });

  test.fixme('[SIX-Convo-350] assign member modal, already assign 1 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    //   4. assign
    //   5. click assign member
    // Expected:
    //   - current assigned member not displayed on member list on modal
    //   - assign button isDisabled
  });

  test.fixme('[SIX-Convo-351] assign member modal, already assign 1, select another - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have member
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click assign member
    //   4. assign
    //   5. click assign member
    //   6. select member
    //   7. assign
    // Expected:
    //   - current assigned member not displayed on member list on modal
    //   - conversation room added to both member's your-inbox conversation list
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

  test.fixme('[SIX-Convo-352] display frt, respond from user(satuinbox) - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message
    //   2. open conversation room
    // Expected:
    //   - frt start after message sent
  });

  test.fixme('[SIX-Convo-353] display frt, respond from user(mobile) - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message
    //   2. open conversation room
    // Expected:
    //   - frt start after message sent
  });

  test.fixme('[SIX-Convo-354] display frt, respond from user, after 10 min - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message
    //   2. open conversation room
    //   4. wait 10 min
    // Expected:
    //   - frt display as 10m
  });

  test.fixme('[SIX-Convo-355] display frt, respond from user, after a year - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message
    //   2. open conversation room
    //   4. wait a year
    // Expected:
    //   - frt display as 365d .. h ...m / 1y ..m ..d ..h ..m ..s
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

  test.fixme('[SIX-Convo-356] display all, from widget - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message from widget
    //   2. open conversation room
    // Expected:
    //   - display : - conversation id - channel source = widget - connected account = display widget account name - created at -----------------------divider------------------------ - topics - sub topics
  });

  test.fixme('[SIX-Convo-357] display all, to user(mobile) - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message in user(mobile)
    //   2. open conversation room
    // Expected:
    //   - display : - conversation id - channel source =- whatsapp web - connected account = wa web account name + number - created at
  });

  test.fixme('[SIX-Convo-358] to others channel source (instagram, telegram, facebook, email) - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message in user(other channel)
    //   2. open conversation room
    // Expected:
    //   - channel source =  - instagram - telegram - facebook - email
  });

  test.fixme('[SIX-Convo-359] created at, re open conversation room - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. close conversation
    //   4. send message
    // Expected:
    //   - created at value on new conversation room is new
  });

  test.fixme('[SIX-Convo-360] from widget, topics isClicked - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click topics
    // Expected:
    //   - do nothing
    //   - change topics ??
  });

  test.fixme('[SIX-Convo-361] close and open conversation attributes accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click conversation attributes button
    // Expected:
    //   - accordion closes, components inside not displayed
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

  test.fixme('[SIX-Convo-362] from widget, display 3 custom attributes - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message from widget
    //   2. open conversation room
    // Expected:
    //   - display : - browser name - device type - user agent
    //   - pagination arrow button isDisabled
  });

  test.fixme('[SIX-Convo-363] contains 11 custom attributes - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. ...
    // Expected:
    //   - max to display is the first 10
    //   - display see all button
  });

  test.fixme('[SIX-Convo-364] have 3 page, pagination arrow button - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click <- button
    //   4. click <- button
    //   5. click -> button
    //   6. click -> button
    //   7. click <- button
    // Expected:
    //   - first page is the latest custom attributes added
    //   - first page, <- button isDisabled, can move to next page
    //   - second page, both button isEnabled
    //   - last page, -> button isDisabled, can move to previous page
  });

  test.fixme('[SIX-Convo-365] close and open custom attributes accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click custom attributes accordion button
    // Expected:
    //   - accordion closes, components inside not displayed
  });

  test.fixme('[SIX-Convo-366] see all button, display panel - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button on custom attributes accordion button
    // Expected:
    //   - display custom attributes panel, replacing conversation details panel
    //   - display : - panel title - back button - (X) button - all custom attributes  - sticky pagination on bottom
  });

  test.fixme('[SIX-Convo-367] see all button, display panel, have 60 - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button on custom attributes accordion button
    // Expected:
    //   - display scrollbar
    //   - lazy load per 50 custom attributes
  });

  test.fixme('[SIX-Convo-368] see all button, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button on custom attributes accordion button
    // Expected:
    //   - custom attributes panel change back to conversation details panel
  });

  test.fixme('[SIX-Convo-369] see all button, (X) button,the click drawer button - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button on custom attributes accordion button
    //   4. click drawer button
    // Expected:
    //   - panel closes
    //   - open custom attributes panel again
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

  test.fixme('[SIX-Convo-370] display all, ... - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message from ...
    //   2. open conversation room
    // Expected:
    //   - display : - customer name - phone number  - email - location - OS - browser
  });

  test.fixme('[SIX-Convo-371] display all, from customer(mobile) whatsapp - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message from whatsapp
    //   2. open conversation room
    // Expected:
    //   - display : - customer displayed name - phone number
  });

  test.fixme('[SIX-Convo-372] from customer(mobile) whatsapp, no displayed name, then have display displayed name - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. already chatting
    // Expected:
    //   - customer name display as phone number
    //   - customer name updated to displayed name
  });

  test.fixme('[SIX-Convo-373] display all, from widget - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. receive message from widget
    //   2. open conversation room
    // Expected:
    //   - display : - name as guest-.... - phone number with empty value
  });

  test.fixme('[SIX-Convo-374] display all, from others - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. customer send message from ..
    // Expected:
    //   - display : - customer name - phone number/email/ig username/etc.
  });

  test.fixme('[SIX-Convo-375] customer gps is not active - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. customer send message from ... while gps is not active
    //   2. satuinbox receive the message
    // Expected:
    //   - location display as location not found
  });

  test.fixme('[SIX-Convo-376] close and open accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click client data accordion button
    // Expected:
    //   - location display as location not found
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

  test.fixme('[SIX-Convo-377] have 1 linked tickets - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. create ticket from bubble chat
    // Expected:
    //   - display : counter indicator align with accordion title  - ticket icon - ticket title - ticket creator - ticket status
  });

  test.fixme('[SIX-Convo-378] created 1, add new ticket - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. add new ticket from bubble chat
    // Expected:
    //   - new ticket will be place on top
  });

  test.fixme('[SIX-Convo-379] have 6 linked tickets with different status - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. create 6 tickets from bubble chat
    // Expected:
    //   - only display last 5 tickets created
    //   - display the status correctly
    //   - display see all button
  });

  test.fixme('[SIX-Convo-380] linked tickets isClicked - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click linked tickets on accordion
    // Expected:
    //   - direct user to clicked ticket details on tickets page
  });

  test.fixme('[SIX-Convo-381] see all button, display linked tickets panel - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    // Expected:
    //   - open linked tickets panel replacing conversation details
    //   - display : - back button - panel title - (X) button - counter indicator ? - linked tickets list
  });

  test.fixme('[SIX-Convo-382] linked ticket panel, click linked tickets - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    // Expected:
    //   - direct user to clicked ticket details on tickets page
  });

  test.fixme('[SIX-Convo-383] linked ticket panel, have 21 linked tickets - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. create 21 tickets from bubble chat
    // Expected:
    //   - display scrollbar
    //   - display 20 per load
    //   - display 20 more when scrolled to bottom
  });

  test.fixme('[SIX-Convo-384] linked ticket panel, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    // Expected:
    //   - change panel back to conversation details from linked ticket panel
  });

  test.fixme('[SIX-Convo-385] linked ticket panel, (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    //   4. click drawer button
    // Expected:
    //   - close panel without changing panel back to conversation details from linked ticket panel
  });

  test.fixme('[SIX-Convo-386] close and open linked tickets accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click linked tickets accordion button
    // Expected:
    //   - accordion closes, components inside not displayed
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

  test.fixme('[SIX-Convo-387] display, empty state - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - display client tags accordion : - counter indicator as 0 - (+) button
  });

  test.fixme('[SIX-Convo-388] display, have 1 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - display client tags accordion : - counter indicator as 1 - tag name as pill - (+) button
  });

  test.fixme('[SIX-Convo-389] display add client tags modal, empty state - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    // Expected:
    //   - display add client tags modal - modal title - searchbar - (X) button - cancel button - add button (disable)
  });

  test.fixme('[SIX-Convo-390] display add client tags modal, 2 tags have created - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. create two tags
    //   2. open conversation room
    // Expected:
    //   - display add client tags modal - modal title - searchbar - display tags list - (X) button - cancel button - add button (disable)
  });

  test.fixme('[SIX-Convo-391] add client tags modal, cancel button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    // Expected:
    //   - modal closed
  });

  test.fixme('[SIX-Convo-392] add client tags modal, (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    // Expected:
    //   - modal closed
  });

  test.fixme('[SIX-Convo-393] add client tags modal, click outside the modal - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. create two member
    //   2. open conversation room
    //   4. click outside the modal
    // Expected:
    //   - modal closed
  });

  test.fixme('[SIX-Convo-394] add client tags modal, searchbar - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    // Expected:
    //   - display tags list that contains the searchbar input
  });

  test.fixme('[SIX-Convo-395] add client tags modal, add 1 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    //   4. click add button
    // Expected:
    //   - highlight selected tags list
    //   - update counter on settings/tags page
    //   - add tag pill to accordion
  });

  test.fixme('[SIX-Convo-396] add client tags modal, select 1 and cancel - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    //   4. click cancel button
    // Expected:
    //   - unhighlight tags list after cancelation
  });

  test.fixme('[SIX-Convo-397] add client tags modal, select 1 and select another - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    //   4. select another tag
    // Expected:
    //   - highlight both selected tags list
  });

  test.fixme('[SIX-Convo-398] add client tags modal, select 1 and click again - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    //   4. click the same tag
    // Expected:
    //   - unselect/unhighlight tags list
  });

  test.fixme('[SIX-Convo-399] add client tags modal, already assign 1 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    //   4. assign
    //   5. click add button
    // Expected:
    //   - current client tags not displayed on tags list on modal
    //   - add button isDisabled
  });

  test.fixme('[SIX-Convo-400] add client tags modal, already assign 1, select another - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click (+) button on client tags accordion
    //   4. assign
    //   5. click assign member
    //   6. select tag
    //   7. assign
    // Expected:
    //   - current client tags not displayed on tags list on modal
    //   - tag pill add to accordion
  });

  test.fixme('[SIX-Convo-401] have 10 client tags - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. add 10 client tags to conversation
    // Expected:
    //   - counter display as 10
    //   - pill adjusting tags name
    //   - newest added tags on right bottom
  });

  test.fixme('[SIX-Convo-402] client tag isClicked, remove tag - not yet automated', async ({ page }) => {
    // Precondition: have conversation, created tags
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click client tags
    // Expected:
    //   - display remove confirmation modal
    //   - tag removed
    //   - update tags table on settings/tags
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

  test.fixme('[SIX-Convo-403] display empty state - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - display : - counter as 0 - add note text input
  });

  test.fixme('[SIX-Convo-404] display all, have 6 notes with pinned notes - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - display : - counter as 6 - add note text input - notes display creator and content - max 5 notes to display on accordion    (max 3 pinned notes(with pin icon), and 2 newest notes) - see all button
  });

  test.fixme('[SIX-Convo-405] display reminder as notes - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - display reminder on top
  });

  test.fixme('[SIX-Convo-406] text input, create note - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. input text
    // Expected:
    //   - text input to field
    //   - notes created
  });

  test.fixme('[SIX-Convo-407] text input, 200 chars ? / max 3 lines ? - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. input 200 chars
    // Expected:
    //   - text input height adjust the input
  });

  test.fixme('[SIX-Convo-408] ellipsis button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have notes
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. hover to notes
    // Expected:
    //   - display ellipsis button
    //   - display menu : - pin notes button - delete button
  });

  test.fixme('[SIX-Convo-409] ellipsis button, pin notes - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have notes
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. hover to not pinned notes
    //   4. click pin notes
    // Expected:
    //   - notes pinned, moves to top
  });

  test.fixme('[SIX-Convo-410] ellipsis button, unpin notes - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have notes
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. hover to pinned notes
    //   4. click unpin notes
    // Expected:
    //   - notes unpinned, move to place where it should be, based on created order
  });

  test.fixme('[SIX-Convo-411] ellipsis button, delete notes - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have notes
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. hover to notes
    //   4. click delete notes
    // Expected:
    //   - notes deleted
  });

  test.fixme('[SIX-Convo-412] notes panel - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 notes
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button on notes accordion
    // Expected:
    //   - open notes panel replacing conversation details panel : - panel title - back button - (X) button - reminder notes - pinned notes - notes
  });

  test.fixme('[SIX-Convo-413] notes panel, have 21 notes - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 notes
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button on notes accordion
    // Expected:
    //   - notes panel have scrollbar
    //   - load 20 notes
    //   - load 20 more when scroll to bottom
  });

  test.fixme('[SIX-Convo-414] notes panel, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 notes
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button on notes accordion
    // Expected:
    //   - change notes panel back to conversation details panel
  });

  test.fixme('[SIX-Convo-415] notes panel, (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 notes
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button on notes accordion
    //   4. click drawer button
    // Expected:
    //   - close panel but not change notes panel back to conversation details panel
    //   - open notes panel
  });

  test.fixme('[SIX-Convo-416] close and open notes accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 notes
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click notes accordion button
    // Expected:
    //   - accordion close, components inside not displayed
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

  test.fixme('[SIX-Convo-417] display all - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 5 pinned message
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. pin 5 message
    // Expected:
    //   - display pinned message accordion : - max 5 to display (newest on top) - counter indicator - pin icon, message owner, message content, piner on each list - see all button
  });

  test.fixme('[SIX-Convo-418] display media pinned message - not yet automated', async ({ page }) => {
    // Precondition: have conversation, media pinned
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. media pinned
    // Expected:
    //   - display as "[image]" / video/document/etc...
    //   - or display other message icons
  });

  test.fixme('[SIX-Convo-419] display media + text pinned message - not yet automated', async ({ page }) => {
    // Precondition: have conversation, media + text pinned
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. media+text pinned
    // Expected:
    //   - display as "[image]" + "text"
    //   - or Display as file icon + "text"
  });

  test.fixme('[SIX-Convo-420] bubble messsage isClicked - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have pinned message
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. click pinned message on accordion
    // Expected:
    //   - user direct to original message on covnersation room
  });

  test.fixme('[SIX-Convo-421] unpin message - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have pinned message
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. hover pinned bubble chat
    //   4. unpin message
    // Expected:
    //   - message remove from accordion
  });

  test.fixme('[SIX-Convo-422] see all button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 5 pinned message
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. see all button on pinned message accordion
    // Expected:
    //   - display pinned message panel replacing conversation details panel : - panel title - pin icon, message owner, message content, piner on each list - back button - drawer button - (X) button
  });

  test.fixme('[SIX-Convo-423] see all button, with scrollbar - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 20 pinned message
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. see all button on pinned message accordion
    // Expected:
    //   - lazy load with scrollbar
    //   - load 20 more when scroll to bottom
  });

  test.fixme('[SIX-Convo-424] see all button isClicked - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 5 pinned message
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. see all button on pinned message accordion
    // Expected:
    //   - direct user to original message
  });

  test.fixme('[SIX-Convo-425] see all button, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 5 pinned message
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. see all button on pinned message accordion
    // Expected:
    //   - change pinned message panel back to conversation details panel
  });

  test.fixme('[SIX-Convo-426] see all button, drawer / (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 5 pinned message
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. see all button on pinned message accordion
    //   4. click drawer button
    // Expected:
    //   - close panel, don't change pinned message panel back to conversation details panel
    //   - open pinned message panel
  });

  test.fixme('[SIX-Convo-427] close and open accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 5 pinned message
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. click pinned message accordion button
    // Expected:
    //   - accordion closes, components inside are hidden
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

  test.fixme('[SIX-Convo-428] display 1,current - not yet automated', async ({ page }) => {
    // Precondition: have conversation,
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    // Expected:
    //   - - counter indicator - customer photo or initial icon - customer name/displayed name - delivery status - message content(truncated if > ..) - timestamp
  });

  test.fixme('[SIX-Convo-429] closed the re open, from wa - not yet automated', async ({ page }) => {
    // Precondition: have conversation,
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation
    //   2. close conversation
    // Expected:
    //   - the first conversation history list stop updating when conversation closes
    //   - create new conversation history
  });

  test.fixme('[SIX-Convo-430] from widget - not yet automated', async ({ page }) => {
    // Precondition: have conversation,
    // Test type: POSITIVE
    // Steps:
    //   1. chat from 1 browser to 3 different topics
    //   2. open conversation room
    // Expected:
    //   - display 3 updating conversation history list
    //   - conversation that have newest last message will be on top
  });

  test.fixme('[SIX-Convo-431] click conversation history list - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 1 conversation history
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click conversation history that currently not opened
    // Expected:
    //   - direct user to clicked conversation room
  });

  test.fixme('[SIX-Convo-432] see all button, conversation history panel - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 3 conversation history
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button on conversation history accordion
    // Expected:
    //   - open conversation history panel replacing conversation details panel : - conversation history list - back button - drawer button - (X) button
  });

  test.fixme('[SIX-Convo-433] conversation details panel, have 21 list - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 20 conversation history
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button on conversation history accordion
    // Expected:
    //   - have scrollbar
    //   - lazy load per 20 list
    //   - load 20 more when scroll to bottom
  });

  test.fixme('[SIX-Convo-434] click conversation history list on conversation history panel - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 1 conversation history
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button
    // Expected:
    //   - direct user to clicked conversation room
  });

  test.fixme('[SIX-Convo-435] conversation history panel, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 1 conversation history
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button
    // Expected:
    //   - change conversation history panel back to conversation details panel
  });

  test.fixme('[SIX-Convo-436] conversation history panel, drawer / (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 1 conversation history
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button
    //   4. click drawer button
    // Expected:
    //   - panel closes, don't change conversation history panel back to conversation details panel
    //   - display conversation history panel
  });

  test.fixme('[SIX-Convo-437] close and open accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation, > 1 conversation history
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click conversation history drawer / (X) button
    // Expected:
    //   - panel closes, don't change conversation history panel back to conversation details panel
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

  test.fixme('[SIX-Convo-438] display all - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - - counter indicator - max to display 6 card - 1:1 fitted or zoom img/video - see all button
  });

  test.fixme('[SIX-Convo-439] have 1 media - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - display card on the left
    //   - counter = 1
  });

  test.fixme('[SIX-Convo-440] have 1 media, add another - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. send media to conversation room
    // Expected:
    //   - newest img display on the left
    //   - first img moved to middle
  });

  test.fixme('[SIX-Convo-441] have img, video, gif(movingimg), missing link - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. send img, and wait until missing link
    // Expected:
    //   - all display in 1:1 fitted or zoom
    //   - display missing link with re-download button and img icon(media icon)
    //   - gif(movingimg) keep moving
    //   - video have play button on the center
    //   - img display normally
  });

  test.fixme('[SIX-Convo-442] have img 1:1, 5:1, 1:5 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. send 1:1, 5:1, and 1:5 img
    // Expected:
    //   - display img in 1:1 fitted or zoom
  });

  test.fixme('[SIX-Convo-443] have vid 1:1, 5:1, 1:5 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. send 1:1, 5:1, and 1:5 vid
    // Expected:
    //   - display img in 1:1 fitted or zoom
  });

  test.fixme('[SIX-Convo-444] click media - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click media on media accordion
    // Expected:
    //   - open fullscreen modal
    //   - vid not auto play
  });

  test.fixme('[SIX-Convo-445] see all, media panel - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all on media accordion
    // Expected:
    //   - change panel to media panel replacing conversation details panel
  });

  test.fixme('[SIX-Convo-446] see all, have 40/50 - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all on media accordion
    // Expected:
    //   - have scrollbar
    //   - lazy load per 40 message
    //   - load 40 more when scroll to bottom
  });

  test.fixme('[SIX-Convo-447] see all, isClicked - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all on media accordion
    // Expected:
    //   - open gallery viewer modal
  });

  test.fixme('[SIX-Convo-448] see all, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all on media accordion
    // Expected:
    //   - change media panel back to conversation details panel
  });

  test.fixme('[SIX-Convo-449] see all, drawer / (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all on media accordion
    //   4. click drawer button
    // Expected:
    //   - panel close, don't change media panel back to conversation details panel
    //   - open media panel
  });

  test.fixme('[SIX-Convo-450] close and open accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have media
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click media accordion button
    // Expected:
    //   - panel close, components inside are hidden
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

  test.fixme('[SIX-Convo-451] display all, pdf, doc, xls - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. send  2 pdf, 1 doc, and 1 xls
    // Expected:
    //   - files accordion display : - counter - file type icon (xls-green, pdf-red, doc-blue) - sender name - original file name.format(.xlsx, .pdf, .docx) - file size and format(xlsx, pdf, doc) - see all button
  });

  test.fixme('[SIX-Convo-452] have 1 file - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. send 1 file
    // Expected:
    //   - counter display as 1
    //   - display sender name, file type icon, file name.format, file size and format
    //   - no see all button
  });

  test.fixme('[SIX-Convo-453] have 1 file, add another - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. send 1 file
    // Expected:
    //   - first file move to bottom
    //   - second file(newest) added to top
  });

  test.fixme('[SIX-Convo-454] have name with 1 long text - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. send 1 file with name "12345678901235678901278901234568901234567890.pdf"
    // Expected:
    //   - text unwrap to new line
    //   - display file data on list(file typr icon, sender name, file name.format, size and format)
  });

  test.fixme('[SIX-Convo-455] have csv, pptx, txt - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. send .csv, .pptx, .txt
    // Expected:
    //   - file type icon (csv-green, pptx-orange, txt-darkgrey)
    //   - file name.format (.csv, .pptx, .txt)
    //   - format (csv, pptx, txt)
  });

  test.fixme('[SIX-Convo-456] receive documents - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. receive pdf with name "testing 1.pdf"
    // Expected:
    //   - file type icon (pdf-red)
    //   - original file name.format (.pdf)
    //   - format (pdf)
  });

  test.fixme('[SIX-Convo-457] file list isClicked - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have file on conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click file list on files accordion
    // Expected:
    //   - open file
    //   - download file
    //   - direct user to original file
  });

  test.fixme('[SIX-Convo-458] see all button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 3 file on conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button on files accordion
    // Expected:
    //   - open files panel replacing conversation details
  });

  test.fixme('[SIX-Convo-459] see all button, have 21 files - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 20 file on conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button on files accordion
    // Expected:
    //   - have scrollbar
    //   - lazy load per 20 files
    //   - load 20 more when scroll to bottom
  });

  test.fixme('[SIX-Convo-460] see all button, file list isClicked - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 3 file on conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    // Expected:
    //   - open file
    //   - download file
    //   - direct user to original file
  });

  test.fixme('[SIX-Convo-461] see all button, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 3 file on conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    // Expected:
    //   - change files panel back to conversation details panel
  });

  test.fixme('[SIX-Convo-462] see all button, drawer / (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 3 file on conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    //   4. click drawer button
    // Expected:
    //   - panel close, didn't change files panel back to conversation details panel
    //   - open files panel
  });

  test.fixme('[SIX-Convo-463] close and open accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have file on conversation room
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click files accordion button
    // Expected:
    //   - accordion closes, components inside are hidden
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

  test.fixme('[SIX-Convo-464] display all - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 events
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - display conversation events accordion : - date timestamp - event content - highlight newest event on top - see all button
  });

  test.fixme('[SIX-Convo-465] have 1 event - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. create 1 event
    // Expected:
    //   - display date timestamp
    //   - highlight event
    //   - no see all button
  });

  test.fixme('[SIX-Convo-466] have 1 event, create 1 more - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. create 1 event
    // Expected:
    //   - previous event move to bottom and not highlighted
    //   - new event is on top and highlighted
  });

  test.fixme('[SIX-Convo-467] see all button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 events
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button
    // Expected:
    //   - open conversations events panel replacing
  });

  test.fixme('[SIX-Convo-468] see all button, have 21 events - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 20 events
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button
    // Expected:
    //   - have scrollbar
    //   - lazy load per 20 events
    //   - load 20 more when scroll to bottom
  });

  test.fixme('[SIX-Convo-469] see all button, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 events
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button
    // Expected:
    //   - change conversation events panel back to conversation details panel
  });

  test.fixme('[SIX-Convo-470] see all button, drawer / (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 events
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. see all button
    //   4. click drawer button
    // Expected:
    //   - panel close, didn't change conversation events panel back to conversation details panel
    //   - open conversation events panel
  });

  test.fixme('[SIX-Convo-471] close and open accordion - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 5 events
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click conversation events accordion
    // Expected:
    //   - accordion closes, components inside are hidden
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

  test.fixme('[SIX-Convo-472] display all - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 6 screenshot
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    // Expected:
    //   - display screenshot accordion : - counter  - max to display 6 - fitted or zoom to 1:1 - see all button
  });

  test.fixme('[SIX-Convo-473] have 1 - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. screenshot conversation room
    // Expected:
    //   - screenshot added to accordion, on the left
    //   - no see all button
  });

  test.fixme('[SIX-Convo-474] have 1, add another - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. screenshot conversation room
    // Expected:
    //   - previous screenshot move to middle
    //   - new screenshot added to the left
  });

  test.fixme('[SIX-Convo-475] have 1:1, 5:1, 1:5 screenshots - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. screenshot snip 1:1
    //   4. screenshot snip 1:5
    // Expected:
    //   - display screenshot as 1:1, fitted or zoom
  });

  test.fixme('[SIX-Convo-476] screenshots card isClicked - not yet automated', async ({ page }) => {
    // Precondition: have conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click screenshot card on screenshots accordion
    // Expected:
    //   - open gallery viewer modal that contains limited to this conversation room screenshots only
  });

  test.fixme('[SIX-Convo-477] see all button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 6 screenshots
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    // Expected:
    //   - open screenshots panel replacing conversation details panel
  });

  test.fixme('[SIX-Convo-478] see all button, have 50 screenshot - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 40 screenshots
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    // Expected:
    //   - have scrollbar
    //   - lazy load per 40 screenshots
    //   - load 40 more when scroll to bottom
  });

  test.fixme('[SIX-Convo-479] see all button, click screenshot card - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 6
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    // Expected:
    //   - open gallery viewer modal that contains limited to this conversation room screenshots only
  });

  test.fixme('[SIX-Convo-480] see all button, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 6 screenshots
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    // Expected:
    //   - change panel back to conversation details panel
  });

  test.fixme('[SIX-Convo-481] see all button, drawer / (X) button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 6 screenshots
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click see all button
    //   4. click drawer button
    // Expected:
    //   - panel close, didn't change panel back to conversation details panel
    //   - open screenshots panel
  });

  test.fixme('[SIX-Convo-482] see all button, back button - not yet automated', async ({ page }) => {
    // Precondition: have conversation, have > 6 screenshots
    // Test type: POSITIVE
    // Steps:
    //   1. open conversation room
    //   2. click screenshots accordion button
    // Expected:
    //   - accordion closes, components inside are hidden
  });

});
