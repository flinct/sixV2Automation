/**
 * AUTO-GENERATED from Conversation.tsv
 * DO NOT EDIT scenario/test structure manually — update the TSV, then re-generate.
 *
 * Conversation Room — Messages & Media
 * TC range: SIX-Convo-032 – SIX-Convo-315
 * Total TCs: 284
 */
const { test, expect } = require('@playwright/test');
const { getCurrentConfig } = require('../../../support/config');
const { AuthPage } = require('../../../support/pages/auth.page');
const { InboxPage } = require('../../../support/pages/inbox.page');

test.describe('[UNDEVELOPED] verify set reminder', () => {
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

  test.fixme('[SIX-Convo-032] [UNDEVELOPED] set reminder validation. quick reminder. in 1 hour(default) - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click set reminder button on modal. 09:35
    // Expected:
    //   - display set reminder for this conversation modal
    //   - quick reminder tab highlighted
    //   - display option 1 hour as 10:30 when modal open
    //   - display realtime timestamp +1 hour when stay on modal
    //   - reminder set when click set reminder on modal. for 10:35. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-033] [UNDEVELOPED] set reminder validation. quick reminder. in 2 hour - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click in 2 hour option
    //   5. click set reminder button on modal. 09:35
    // Expected:
    //   - display set reminder for this conversation modal
    //   - quick reminder tab highlighted
    //   - display option 2 hour as 11:30 when modal open
    //   - display realtime timestamp +2 hour when stay on modal
    //   - reminder set when click set reminder on modal. for 11:35. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-034] [UNDEVELOPED] set reminder validation. quick reminder. tomorrow, same time - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click tomorrow, same time option
    //   5. click set reminder button on modal. 15 oct, 09:35
    // Expected:
    //   - display set reminder for this conversation modal
    //   - quick reminder tab highlighted
    //   - display option tomorrow as 16 oct, 11:30 when modal open
    //   - display realtime timestamp +1 day when stay on modal
    //   - reminder set when click set reminder on modal. for 16 oct, 11:35. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-035] [UNDEVELOPED] set reminder validation. quick reminder. in 2 days, same time - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click in 2 days, same time option
    //   5. click set reminder button on modal. 15 oct, 09:35
    // Expected:
    //   - display set reminder for this conversation modal
    //   - quick reminder tab highlighted
    //   - display option tomorrow as 17 oct, 11:30 when modal open
    //   - display realtime timestamp +2 day when stay on modal
    //   - reminder set when click set reminder on modal. for 17 oct, 11:35. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-036] [UNDEVELOPED] set reminder validation. quick reminder. in a week, same time - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click in a week, same time option
    //   5. click set reminder button on modal. 15 oct, 09:35
    // Expected:
    //   - display set reminder for this conversation modal
    //   - quick reminder tab highlighted
    //   - display option tomorrow as 22 oct, 11:30 when modal open
    //   - display realtime timestamp +7 day when stay on modal
    //   - reminder set when click set reminder on modal. for 22 oct, 11:35. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-037] [UNDEVELOPED] set reminder validation. custom time. default, 0930 - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. click set reminder button on modal. 15 oct, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date as today, and date before today isDisabled
    //   - display time option as 10:30, option from 09:45 to 23:45, display option for every 15 min, scroll not loop
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 15 oct, 10:30. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-038] [UNDEVELOPED] set reminder validation. custom time. default, 0930, wait 5 min - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. click set reminder button on modal. 15 oct, 09:35
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date as today, and date before today isDisabled
    //   - display time option as 10:30, option from 09:45 to 23:45, display option for every 15 min, scroll not loop
    //   - after 5 min, time option displayed as 10:45, option from 10:00. option 09:45 removed
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 15 oct, 10:45. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-039] [UNDEVELOPED] set reminder validation. custom time. default, 0942 - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. click set reminder button on modal. 15 oct, 09:42
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date as today, and date before today isDisabled
    //   - display time option as 10:45, option from 10:00 to 23:45, display option for every 15 min, scroll not loop
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 15 oct, 10:45. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-040] [UNDEVELOPED] set reminder validation. custom time. default, 0948 - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. click set reminder button on modal. 15 oct, 09:48
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date as today, and date before today isDisabled
    //   - display time option as 11:00, option from 10:15 to 23:45, display option for every 15 min, scroll not loop
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 15 oct, 11:00. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-041] [UNDEVELOPED] set reminder validation. custom time. default, 0955 - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. click set reminder button on modal. 15 oct, 09:55
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date as today, and date before today isDisabled
    //   - display time option as 11:00, option from 10:15 to 23:45, display option for every 15 min, scroll not loop
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 15 oct, 11:00. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-042] [UNDEVELOPED] set reminder validation. custom time. default, 2330 - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. click set reminder button on modal. 15 oct, 23:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date as tomorrow, and date before today isDisabled
    //   - display time option as 16 0ct, 00:30, option for today only 23:45 and for tomorrow from 00:00 to 23:45, display option for every 15 min, scroll not loop
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 16 oct, 00:30. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-043] [UNDEVELOPED] set reminder validation. custom time. default, 2350 - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. click set reminder button on modal. 15 oct, 23:50
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date as tomorrow, today and date before today isDisabled
    //   - display time option as 16 0ct, 01:00, option for tomorrow from 00:15 to 23:45, display option for every 15 min, scroll not loop
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 16 oct, 01:00. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-044] [UNDEVELOPED] set reminder validation. custom time. 0930, pick 0945 - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. pick 09:45
    //   6. click set reminder button on modal. 15 oct, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date today and date before today isDisabled
    //   - display time option as 15 0ct, 09:45, option for today from 09:45 to 23:45, display option for every 15 min, scroll not loop
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 15 oct, 09:45. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-045] [UNDEVELOPED] set reminder validation. custom time. 0930, pick 0945, +3 days - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. pick 09:45
    //   6. select date 18 oct
    //   7. click set reminder button on modal. 15 oct, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date today and date before today isDisabled
    //   - display time option as 18 0ct, stay on 09:45, option for 18 oct from 00:00 to 23:45, display option for every 15 min, scroll not loop
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 15 oct, 09:45. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-046] [UNDEVELOPED] set reminder validation. custom time. 0930, pick 0945, +3 days. Same Value - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. pick 09:45
    //   6. select date 18 oct
    //   7. click set reminder button on modal. 15 oct, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date today and date before today isDisabled
    //   - display time option as 18 0ct, stay on 09:45, option for 18 oct from 00:00 to 23:45, display option for every 15 min, scroll not loop
    //   - unticked repeat every, "1" hour
    //   - reminder set when click set reminder on modal. for 15 oct, 09:45. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-047] [UNDEVELOPED] set reminder validation. custom time. default 0930, repeat every 3 hours - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. ticked repeat every
    //   6. input 3 for hours
    //   7. click set reminder button on modal. 15 oct, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date today and date before today isDisabled
    //   - display time option as 15 0ct, 10:30, option for today from 09:45 to 23:45, display option for every 15 min, scroll not loop
    //   - ticked repeat every, 3 hours
    //   - reminder set when click set reminder on modal. for 15 oct, 10:30, and 3 hours after that, and so on. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-048] [UNDEVELOPED] set reminder validation. custom time. default 0930, repeat every 6 days - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. ticked repeat every
    //   6. input 6 for days
    //   7. click set reminder button on modal. 15 oct, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date today and date before today isDisabled
    //   - display time option as 15 0ct, 10:30, option for today from 09:45 to 23:45, display option for every 15 min, scroll not loop
    //   - ticked repeat every, 6 days
    //   - reminder set when click set reminder on modal. for 15 oct, 10:30, and 6 days after that(21 oct), and so on. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-049] [UNDEVELOPED] set reminder validation. custom time. default 0930, repeat every 2 weeks - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. ticked repeat every
    //   6. input 2 for weeks
    //   7. click set reminder button on modal. 15 oct, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date today and date before today isDisabled
    //   - display time option as 15 0ct, 10:30, option for today from 09:45 to 23:45, display option for every 15 min, scroll not loop
    //   - ticked repeat every, 2 weeks
    //   - reminder set when click set reminder on modal. for 15 oct, 10:30, and 2 weeks(+14 days) after that(29 oct), and so on. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-050] [UNDEVELOPED] set reminder validation. custom time. default 0930, repeat every 1 month - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. ticked repeat every
    //   6. input 1 for month
    //   7. click set reminder button on modal. 15 oct, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date today and date before today isDisabled
    //   - display time option as 15 0ct, 10:30, option for today from 09:45 to 23:45, display option for every 15 min, scroll not loop
    //   - ticked repeat every, 1 month
    //   - reminder set when click set reminder on modal. for 15 oct, 10:30, and 1 month(same date next month) after that(15 nov), and so on. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-051] [UNDEVELOPED] set reminder validation. custom time. default 0930, repeat every 12 months - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click custom time tab
    //   5. ticked repeat every
    //   6. input 12 for months
    //   7. click set reminder button on modal. 15 oct 25, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - custom time tab highlighted
    //   - display pick date today and date before today isDisabled
    //   - display time option as 15 0ct, 10:30, option for today from 09:45 to 23:45, display option for every 15 min, scroll not loop
    //   - ticked repeat every, 12 months
    //   - reminder set when click set reminder on modal. for 15 oct 25, 10:30, and 12 months/1 year(same date next year) after that(15 oct 26), and so on. send reminder to conversation as yellow bubble chat
    //   - success toast appears
  });

  test.fixme('[SIX-Convo-052] [UNDEVELOPED] set reminder validation. cancel - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. click cancel
    // Expected:
    //   - display set reminder for this conversation modal
    //   - modal close
    //   - reminder not set
  });

  test.fixme('[SIX-Convo-053] [UNDEVELOPED] set reminder validation. input alphabet on repeat every - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. tick repeat every checkbox
    //   5. input "a"
    //   6. click set reminder button on modal, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - modal not close
    //   - reminder not set
    //   - display error message "only input numbers"
  });

  test.fixme('[SIX-Convo-054] [UNDEVELOPED] set reminder validation. input 3 digits on repeat every - feature not yet developed', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open your-inbox
    //   2. select and open conversation
    //   4. tick repeat every checkbox
    //   5. input "999"
    //   6. click set reminder button on modal, 09:30
    // Expected:
    //   - display set reminder for this conversation modal
    //   - modal not close
    //   - reminder not set
    //   - display error message "max 2 digits"
  });

});

test.describe('verify create ticket button', () => {
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

  test.fixme('[SIX-Convo-055] create ticket button validation - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    // Expected:
    //   - display create ticket from this conversation modal
  });

});

test.describe('verify conversation status', () => {
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

  test.fixme('[SIX-Convo-056] change conversastion status validation. from open to close - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    // Expected:
    //   - change conversation types to closed
    //   - change status button to reopen button
    //   - conversation moved to closed converstion
    //   - success toast appears
    //   - update sort counter instantly
    //   - disable message input and can't send message
  });

  test.fixme('[SIX-Convo-057] change conversation status validation. from closed to reopen - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. open closed conversation
    //   4. click reopen button on convo room
    //   5. open new conversation from re open conversation
    // Expected:
    //   - create new conversation(duplicate) for this conversation
    //   - user directed to the new conversation
    //   - change conversation types to open
    //   - change status button to close
    //   - success toast appears
    //   - update sort counter instantly
  });

});

test.describe('verify message input', () => {
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

  test.fixme('[SIX-Convo-058] message input validation. display for outbound - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    // Expected:
    //   - display placeholder "Ketik Pesan" on text field
    //   - display message as notes button
    //   - display attachment button
    //   - display emoji button
    //   - display disable send button
    //   - sticky on bottom when scrolled on convo room
    //   - message input on focus on default
  });

  test.fixme('[SIX-Convo-059] message input validation. highlight message input on focus - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. typing
    //   5. click on attachment
    //   6. click on emoji
    // Expected:
    //   - message input highlighted
  });

});

test.describe('verify message input text', () => {
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

  test.fixme('[SIX-Convo-060] text message input validation. no text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. click on text field
    //   5. press enter
    //   6. click send button
    // Expected:
    //   - message not send
    //   - disable send button
  });

  test.fixme('[SIX-Convo-061] text message input validation. input text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. input "tes"
    //   5. press enter
    // Expected:
    //   - display text preview on text input
    //   - message sent
  });

  test.fixme('[SIX-Convo-062] text message input validation. shift enter > text = new line before text not created on bubble chat - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. shift enter
    //   5. input "a"
    //   6. click send button
    // Expected:
    //   - new line by shift enter not created on bubble chat satuinbox and whatsapp
    //   - display "a" without leading empty line
  });

  test.fixme('[SIX-Convo-063] text message input validation. text > shift enter = new line after text not created on bubble chat - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. input "a"
    //   5. shift enter
    //   6. click send button
    // Expected:
    //   - new line by shift enter not created on bubble chat satuinbox and whatsapp
    //   - display "a"
  });

  test.fixme('[SIX-Convo-064] text message input validation. spaces > text = spaces trimmed on bubble chat - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. press space few times
    //   5. input "a"
    //   6. click send button
    // Expected:
    //   - leading spaces trimmed on bubble chat satuinbox and whatsapp
    //   - display "a"
  });

  test.fixme('[SIX-Convo-065] text message input validation. text > spaces = spaces trimmed on bubble chat - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. input "a"
    //   5. press space few times
    //   6. click send button
    // Expected:
    //   - trailing spaces trimmed on bubble chat satuinbox and whatsapp
    //   - display "a"
  });

  test.fixme('[SIX-Convo-066] text message input validation. shift enter > spaces > text > shift enter = new line and spaces not created on bubble chat - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. shift enter
    //   5. press spaces few times
    //   6. input "a"
    //   7. shift enter
    //   8. click send button
    // Expected:
    //   - new line before and after text not created on bubble chat satuinbox and whatsapp
    //   - leading spaces trimmed on bubble chat satuinbox and whatsapp
    //   - display "a"
  });

  test.fixme('[SIX-Convo-067] text message input validation. shift enter > spaces > text > shift enter > spaces > text = new line and spaces before the first text not created on bubble chat, new line created between first and second text, and spaces before second text not trimmed - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. shift enter
    //   5. press spaces few times
    //   6. input "a"
    //   7. shift enter twice
    //   8. press spaces few times
    //   9. input "a"
    //   10. click send button
    // Expected:
    //   - new line before the first text not created on bubble chat satuinbox and whatsapp
    //   - leading spaces on the first text trimmed on bubble chat satuinbox and whatsapp
    //   - new line between first and second text created on bubble chat satuinbox and whatsapp
    //   - leading spaces on the second text not trimmed on bubble chat satuinbox and whatsapp
    //   - display  "a      a"
  });

  test.fixme('[SIX-Convo-068] text message input validation. text > spaces > text = spaces between text are not trimmed - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. input "1"
    //   5. press spaces few times
    //   6. input "2"
    //   7. click send button
    // Expected:
    //   - spaces between the first and second text not trimmed on bubble chat satuinbox and whatsapp
    //   - display "1   2"
  });

  test.fixme('[SIX-Convo-069] text message input validation. text input area will adjust the height up to 10 lines without scroll bar - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. click send button
    // Expected:
    //   - text input area expand to 10 lines without scroll bar
  });

  test.fixme('[SIX-Convo-070] text message input validation. text input area will scrollable if input are more than 10 lines - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. click send button
    // Expected:
    //   - text input area expand to 10 lines without scroll bar
    //   - text input area is scrollable
  });

  test.fixme('[SIX-Convo-071] text message input validation. text input area lenght limit. small convo room - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. input "12345678901234567890123456789012345678901234567890" on the same line
    //   5. click send button
    // Expected:
    //   - display input adjusting the small convo room on text input area, display input in few lines
    //   - convo room small enough to make lines became >10, have scrollbar
  });

  test.fixme('[SIX-Convo-072] text message input validation. text input area lenght limit. wide convo room - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. input "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789" on the same line
    //   5. click send button
    // Expected:
    //   - display input adjusting the wide convo room on text input area, display input in 1 line
  });

});

test.describe('verify message input notes', () => {
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

  test.fixme('[SIX-Convo-073] message as notes validation. - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open your-inbox
    //   2. select conversation
    //   4. click as notes button
    //   5. click send button
    // Expected:
    //   - as notes button on message input highlighted when clicked
    //   - display "" on yellow/notes bubble chat and highlighted
  });

});

test.describe('verify message input img', () => {
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

  test.fixme('[SIX-Convo-074] img message validation. .jpg < 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .jpg img < 20 mb
    // Expected:
    //   - display img preview on message input(9mb)
  });

  test.fixme('[SIX-Convo-075] img message validation. .png < 20 mb, big 1:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .png img < 20 mb, big 1:1
    // Expected:
    //   - display fitted img preview on message input
  });

  test.fixme('[SIX-Convo-076] img message validation. .png < 20 mb, big 1:5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .jpg img < 20 mb, big 1:5
    // Expected:
    //   - display cropped img to 1:1 center for preview on message input
  });

  test.fixme('[SIX-Convo-077] img message validation. .png < 20 mb, big 5:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .jpg img < 20 mb, big 5:1
    // Expected:
    //   - display cropped img to 1:1 center for preview on message input
  });

  test.fixme('[SIX-Convo-078] img message validation. .png < 1 mb, small 1:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .jpg img < 1 mb, small 1:1
    // Expected:
    //   - display fitted img preview on message input
  });

  test.fixme('[SIX-Convo-079] img message validation. .png < 1 mb, small 1:5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .jpg img < 1 mb, small 1:5
    // Expected:
    //   - display zoomed img to 1:1 center for preview on message input
  });

  test.fixme('[SIX-Convo-080] img message validation. .png < 1 mb, small 5:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .jpg img < 1 mb, small 5:1
    // Expected:
    //   - display zoomed img to 1:1 center for preview on message input
  });

  test.fixme('[SIX-Convo-081] img message validation. moving jpg < 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick moving jpg < 20 mb
    // Expected:
    //   - display moving img preview on message input
  });

  test.fixme('[SIX-Convo-082] img message validation. .jpg > 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick jpg img > 20 mb
    // Expected:
    //   - not display img preview on message input
    //   - display error message "img size too big, max 20 mb"
  });

});

test.describe('verify message input vid', () => {
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

  test.fixme('[SIX-Convo-083] vid message validation. .mp4 < 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .mp4 vid < 20 mb
    // Expected:
    //   - display vid  thumbnail preview on message input with play button
  });

  test.fixme('[SIX-Convo-084] vid message validation. .mp4 < 20 mb, big 1:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .mp4 vid < 20 mb, big 1:1
    // Expected:
    //   - display fitted vid thumbnail preview on message input
  });

  test.fixme('[SIX-Convo-085] vid message validation. .mp4 < 20 mb, big 1:5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .mp4 vid < 20 mb, big 1:5
    // Expected:
    //   - display cropped vid thumbnail to 1:1 center for preview on message input
  });

  test.fixme('[SIX-Convo-086] vid message validation. .mp4 < 20 mb, big 5:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .mp4 vid < 20 mb, big 5:1
    // Expected:
    //   - display cropped vid thumbnail to 1:1 center for preview on message input
  });

  test.fixme('[SIX-Convo-087] vid message validation. .mp4 < 20 mb, small 1:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .mp4 vid < 20 mb, small 1:1
    // Expected:
    //   - display fitted vid thumbnail preview on message input
  });

  test.fixme('[SIX-Convo-088] vid message validation. .mp4 < 20 mb, small 1:5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .mp4 vid < 20 mb, small 1:5
    // Expected:
    //   - display zoomed vid thumbnail to 1:1 center for preview on message input
  });

  test.fixme('[SIX-Convo-089] vid message validation. .mp4 < 20 mb, small 5:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .mp4 vid < 20 mb, small 5:1
    // Expected:
    //   - display zoomed vid thumbnail to 1:1 center for preview on message input
  });

  test.fixme('[SIX-Convo-090] vid message validation. .mov < 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .mov vid < 20 mb
    // Expected:
    //   - display vid thumbnail preview on message input with play button
  });

  test.fixme('[SIX-Convo-091] vid message validation. .mp4 > 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick mp4 vid > 20 mb
    // Expected:
    //   - not display thumbnail vid preview on message input
    //   - display error message "video size too big, max 20 mb"
  });

});

test.describe('verify message input file', () => {
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

  test.fixme('[SIX-Convo-092] file message validation. .pdf < 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .pdf file < 20 mb
    // Expected:
    //   - display file preview on message input with file type icon
  });

  test.fixme('[SIX-Convo-093] file message validation. .docx < 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .docx file < 20 mb
    // Expected:
    //   - display file preview on message input with file type icon
  });

  test.fixme('[SIX-Convo-094] file message validation. .xlsx< 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick .xlsx file < 20 mb
    // Expected:
    //   - display file preview on message input with file type icon
  });

  test.fixme('[SIX-Convo-095] file message validation. .pdf > 20 mb - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick pdf file > 20 mb
    // Expected:
    //   - not display file preview on message input
    //   - display error message "file size too big, max 20 mb"
  });

});

test.describe('verify message input multiple media/file', () => {
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

  test.fixme('[SIX-Convo-096] multiple media/file message validation. max on visible display = based on convo room width, input 5, 1 time attach - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 9 media/file < 20 mb total
    // Expected:
    //   - display 9 media/file preview on message input - img = img - vid = thumbnail with play button - file = file icon
    //   - display preview from left(first) to right(last), based on file name
    //   - display (X) button on each media/file preview
  });

  test.fixme('[SIX-Convo-097] multiple media/file message validation. max preview = 25, input 25, 1 time attach - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 25 media/file < 20 mb total
    // Expected:
    //   - display 25 media/file preview on message input with scrollbar/carousel
    //   - display preview from left(first) to right(last), based on file name
    //   - display (X) button on each media/file preview
  });

  test.fixme('[SIX-Convo-098] multiple media/file message validation. input 4, 1 time attach, alphabetical - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 4 media/file < 20 mb total, alphabetical order
    // Expected:
    //   - display 4 media/file preview on message input
    //   - display preview from left(first) to right(last), based on file name
    //   - display (X) button on each media/file preview
  });

  test.fixme('[SIX-Convo-099] multiple media/file message validation. input 4, 1 time attach, smallest to largest size - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 4 media/file < 20 mb total, smallest to largest size order
    // Expected:
    //   - display 4 media/file preview on message input
    //   - display preview from left(first) to right(last), based on file name
    //   - display (X) button on each media/file preview
  });

  test.fixme('[SIX-Convo-100] multiple media/file message validation. (X) button on media/file preview - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick media/file
    //   5. click (X) button on selected media/files
    // Expected:
    //   - media/file remove from preview
  });

  test.fixme('[SIX-Convo-101] multiple media/file message validation. input 4, 1 time attach, over 20mb in total - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 4 media/file > 20 mb total
    // Expected:
    //   - media in preview displayed
  });

  test.fixme('[SIX-Convo-102] multiple media/file message validation. input 4, 1 time attach, over 20mb in total - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 4 media/file > 20 mb each
    // Expected:
    //   - media in preview not displayed
    //   - display failed toast "media size is too big, max 20mb"
  });

  test.fixme('[SIX-Convo-103] multiple media/file message validation. max preview = 25, input 26, 1 time attach - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 26 media/file < 20 mb total
    // Expected:
    //   - media in preview not displayed
    //   - display failed toast "Jumlah file yang diunggah melebihi batas maksimum (25)"
  });

  test.fixme('[SIX-Convo-104] multiple media/file message validation. input 1, drag n drop from file explorer - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open selected convo room
    //   2. open file explorer
    // Expected:
    //   - media in preview not displayed
    //   - open media in new tab
  });

  test.fixme('[SIX-Convo-105] multiple media/file message validation. input 4, 2 time attach, smallest to largest size - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 2 media/file < 20 mb total, smallest to largest size order
    //   5. click attachment button
    //   6. click media/files button
    //   7. pick 2 media/file < 20 mb total, smallest to largest size order
    // Expected:
    //   - display 4 media/file preview on message input
    //   - display preview from left(first) to right(last), based on file name first attach > file name second attach
    //   - display (X) button on each media/file preview
  });

  test.fixme('[SIX-Convo-106] multiple media/file message validation. input 4, 2 time attach, variative first letter - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 2 media/file < 20 mb total, variative first letter
    //   5. click attachment button
    //   6. click media/files button
    //   7. pick 2 media/file < 20 mb total, variative first letter
    // Expected:
    //   - display 4 media/file preview on message input
    //   - display preview from left(first) to right(last), sort based on file name first attach > file name second attach
    //   - display (X) button on each media/file preview
  });

  test.fixme('[SIX-Convo-107] multiple media/file message validation. input 4, 3 time attach, >15mb<20mb per attach - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 1 media/file > 15 mb < 20mb
    //   5. click attachment button
    //   6. click media/files button
    //   7. pick 1 media/file > 15 mb < 20mb
    //   8. click attachment button
    //   9. click media/files button
    //   10. pick 2 media/file > 15 mb < 20mb in total
    // Expected:
    //   - display 4 media/file preview on message input
    //   - display preview from left(first) to right(last), sort based on first attach > second attach > file name third attach
    //   - display (X) button on each media/file preview
  });

  test.fixme('[SIX-Convo-108] multiple media/file message validation. input 2, 2 time attach, same value - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open selected convo room
    //   2. click attachment button
    //   4. pick 1 media/file < 20 mb
    //   5. click attachment button
    //   6. click media/files button
    //   7. pick the same media/file < 20 mb
    // Expected:
    //   - the second media not added to preview
    //   - display failed toast "cannot have the same file"
  });

});

test.describe('verify message input reply', () => {
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

  test.fixme('[SIX-Convo-109] reply message validation. text with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display sender name, original message preview(max 2 lines) on message input with (X) button
    //   - direct user to original message
    //   - display text bubble chat with truncated text replyed message
  });

  test.fixme('[SIX-Convo-110] reply message validation. img with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display sender name, original message preview on message input with img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display text bubble chat with img(+img icon+"Image") replyed message
  });

  test.fixme('[SIX-Convo-111] reply message validation. gif with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected gif bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display sender name, original message paused preview on message input with gif icon and "Gif" with (X) button
    //   - direct user to original message
    //   - display text bubble chat with paused gif(+gif icon+"Gif") replyed message
  });

  test.fixme('[SIX-Convo-112] reply message validation. vid with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display sender name, original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display text bubble chat with thumbnail vid(+vid icon+"Video") replyed message
  });

  test.fixme('[SIX-Convo-113] reply message validation. file with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display sender name, original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display text bubble chat with file icon with file name.format replyed message
  });

  test.fixme('[SIX-Convo-114] reply message validation. text with img - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display sender name, original message preview(max 2 lines) on message input with (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px) with truncated replyed message
  });

  test.fixme('[SIX-Convo-115] reply message validation. img with img - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview on message input with sender name, img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px) with sender name, img(+img icon+"Image") replyed message
  });

  test.fixme('[SIX-Convo-116] reply message validation. vid with img - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview with play button on message input with sender name, vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px) with sender name, thumbnail vid(+vid icon+"Video") replyed message
  });

  test.fixme('[SIX-Convo-117] reply message validation. file with img - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview on message input with sender name, file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px) + file icon with sender name, file name.format replyed message
  });

  test.fixme('[SIX-Convo-118] reply message validation. text with img+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview(max 2 lines) on message input with sender name and (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px) + text(max height 720px) + sender name truncated replyed message and original message
  });

  test.fixme('[SIX-Convo-119] reply message validation. img with img+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px)+text(max height 720px) + img(+img icon+"Image") replyed message
  });

  test.fixme('[SIX-Convo-120] reply message validation. vid with img+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px)+text(max height 720px) + thumbnail vid(+vid icon+"Video") replyed message
  });

  test.fixme('[SIX-Convo-121] reply message validation. file with img+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px)+text(max height 720px) + file icon with file name.format replyed message
  });

  test.fixme('[SIX-Convo-122] reply message validation. text with vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview(max 2 lines) on message input with (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button + truncated replyed message
  });

  test.fixme('[SIX-Convo-123] reply message validation. img with vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button + img(+img icon+"Image") replyed message
  });

  test.fixme('[SIX-Convo-124] reply message validation. vid with vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button + thumbnail vid(+vid icon+"Video") replyed message
  });

  test.fixme('[SIX-Convo-125] reply message validation. file with vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button + file icon with file name.format replyed message
  });

  test.fixme('[SIX-Convo-126] reply message validation. text with vid+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview(max 2 lines) on message input with (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button + text(max height 720px) + truncated replyed message
  });

  test.fixme('[SIX-Convo-127] reply message validation. img with vid+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button +text(max height 720px) + img(+img icon +"Image") replyed message
  });

  test.fixme('[SIX-Convo-128] reply message validation. vid with vid+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button +text(max height 720px) + thumbnail vid(+vid icon+"Video") replyed message
  });

  test.fixme('[SIX-Convo-129] reply message validation. file with vid+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button+text(max height 720px) + file icon with file name.format replyed message
  });

  test.fixme('[SIX-Convo-130] reply message validation. text with file - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview(max 2 lines) on message input with (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format) with truncated replyed message
  });

  test.fixme('[SIX-Convo-131] reply message validation. img with file - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview on message input with img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format) with img(+img icon+"Image") replyed message
  });

  test.fixme('[SIX-Convo-132] reply message validation. vid with file - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format) with thumbnail vid(+vid icon+"Video") replyed message
  });

  test.fixme('[SIX-Convo-133] reply message validation. file with file - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format) + file icon with file name.format replyed message
  });

  test.fixme('[SIX-Convo-134] reply message validation. text with file+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview(max 2 lines) on message input with (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format) + text(max height 720px) + truncated replyed message
  });

  test.fixme('[SIX-Convo-135] reply message validation. img with file+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format)+text(max height 720px) + img(img icon+"Image") replyed message
  });

  test.fixme('[SIX-Convo-136] reply message validation. vid with file+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format)+text(max height 720px) + thumbnail vid(+vid icon+"Video") replyed message
  });

  test.fixme('[SIX-Convo-137] reply message validation. file with file+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file bubble chat
    //   4. input "" < 800 characters
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format)+text(max height 720px) + file icon with file name.format replyed message
  });

  test.fixme('[SIX-Convo-138] reply message validation. img+text with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img+text bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview on message input with img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display text bubble chat with img(+img icon+text) replyed message
  });

  test.fixme('[SIX-Convo-139] reply message validation. vid+text with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid+text bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display text bubble chat with thumbnail vid(+vid icon+text) replyed message
  });

  test.fixme('[SIX-Convo-140] reply message validation. file+text with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file+text bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display text bubble chat with file icon+text) replyed message
  });

  test.fixme('[SIX-Convo-141] reply message validation. img+text with img+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img+text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px)+text(max height 720px) + img(+img icon+text) replyed message
  });

  test.fixme('[SIX-Convo-142] reply message validation. vid+text with img+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid+text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px)+text(max height 720px) + thumbnail vid(+vid icon+text) replyed message
  });

  test.fixme('[SIX-Convo-143] reply message validation. file+text with img+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file+text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px)+text(max height 720px) + file icon+text replyed message
  });

  test.fixme('[SIX-Convo-144] reply message validation. img+text with vid+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img+text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button+text(max height 720px) + img(+img icon+text) replyed message
  });

  test.fixme('[SIX-Convo-145] reply message validation. vid+text with vid+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid+text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button+text(max height 720px) + thumbnail vid(+vid icon+text) replyed message
  });

  test.fixme('[SIX-Convo-146] reply message validation. file+text with vid+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file+text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display thumbnail vid bubble chat(400pxX400px) with play button+text(max height 720px) + file icon+text replyed message
  });

  test.fixme('[SIX-Convo-147] reply message validation. img+text with file+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected img+text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with img icon and "Image" with (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format)+text(max height 720px) + img(+img icon+text) replyed message
  });

  test.fixme('[SIX-Convo-148] reply message validation. vid+text with file+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected vid+text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview with play button on message input with vid icon and "Video" with (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format)+text(max height 720px) + thumbnail vid(+vid icon+text) replyed message
  });

  test.fixme('[SIX-Convo-149] reply message validation. file+text with file+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected file+text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview on message input with file icon and file name.format and (X) button
    //   - direct user to original message
    //   - display file bubble chat(file format icon+file name.format+file size+file format)+text(max height 720px) + file icon+text replyed message
  });

  test.fixme('[SIX-Convo-150] reply message validation. text with multiple media - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. click replyed message preview
    //   5. click send button
    // Expected:
    //   - display original message preview(max 2 lines) on message input with (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px) with truncated replyed message only to first img sent
  });

  test.fixme('[SIX-Convo-151] reply message validation. text with multiple media+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. input ""
    //   5. click replyed message preview
    //   6. click send button
    // Expected:
    //   - display original message preview(max 2 lines) on message input with (X) button
    //   - direct user to original message
    //   - display img bubble chat(400pxX400px) with truncated replyed message only to first img sent, but text only attach to the last img sent
  });

  test.fixme('[SIX-Convo-152] reply message validation. cancel reply - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click reply message button when hover selected text bubble chat
    //   4. click (X) button on replyed message preview on message input
    //   5. click send button
    // Expected:
    //   - remove replyed message preview from message input
    //   - send normal text message
  });

});

test.describe('verify message input emoji', () => {
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

  test.fixme('[SIX-Convo-153] emoji message validation - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. click emoji button
    // Expected:
    //   - display emoji preview on message input
  });

});

test.describe('verify bubble chat', () => {
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

  test.fixme('[SIX-Convo-154] all conversation. opened convo room. user(inbound) message validation. from user(mobile) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. user(mobile) send message to selected convo room
    // Expected:
    //   - bubble chat on right side, blue bubble chat
    //   - new message appears instantly in convo room
    //   - message display correctly
    //   - display with user name and number
    //   - display with delivery status
  });

  test.fixme('[SIX-Convo-155] all conversation. opened convo room. user(inbound) message validation. from customer(mobile) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) send message to selected convo room
    // Expected:
    //   - bubble chat on left side, grey bubble chat
    //   - new message appears instantly in convo room
    //   - message display correctly
    //   - display with customer name and number
    //   - not display delivery status
  });

  test.fixme('[SIX-Convo-156] all conversation. opened convo room. user(inbound) message validation. from customer(mobile), with no displayed name/saved by user - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) send message to selected convo room
    // Expected:
    //   - bubble chat on left side, grey bubble chat
    //   - new message appears instantly in convo room
    //   - message display correctly
    //   - display with customer number
    //   - not display delivery status
  });

  test.fixme('[SIX-Convo-157] all conversation. opened convo room. user(inbound) message validation. from agent(assignee) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. agent(assignee) send message to selected convo room
    // Expected:
    //   - bubble chat on right side, blue bubble chat
    //   - new message appears instantly in convo room
    //   - message display correctly
    //   - display with agent name and number
    //   - display with delivery status
  });

  test.fixme('[SIX-Convo-158] all conversation. opened convo room. user(mobile) message validation. from outbound - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. outbound send message to selected convo room
    // Expected:
    //   - new message appears instantly in convo room
    //   - message display correctly
    //   - bubble chat on right side, blue bubble chat
  });

  test.fixme('[SIX-Convo-159] all conversation. opened convo room. user(mobile) message validation. from agent(assignee) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. agent(assignee) send message to selected convo room
    // Expected:
    //   - new message appears instantly in convo room
    //   - message display correctly
    //   - bubble chat on right side, blue bubble chat
  });

  test.fixme('[SIX-Convo-160] all conversation. opened convo room. customer(mobile) message validation. from outbound - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. outbound message to selected convo room
    // Expected:
    //   - new message appears instantly in convo room
    //   - message display correctly
    //   - display with user name and number in satuinbox convo room bubble chat
  });

  test.fixme('[SIX-Convo-161] all conversation. opened convo room. customer(mobile) message validation. from agent(assignee) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. agent(assignee) send message to selected convo room
    // Expected:
    //   - new message appears instantly in convo room
    //   - message display correctly as user
    //   - display with agent(assignee) name and number in satuinbox convo room bubble chat
  });

  test.fixme('[SIX-Convo-162] all conversation. unopened convo room. user(inbound) message validation. from user(mobile) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 2 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open any convo room
    //   2. user(mobile) send message to another selected convo room
    // Expected:
    //   - bubble chat on right side, blue bubble chat
    //   - new message appears instantly in convo room
    //   - message display correctly
  });

  test.fixme('[SIX-Convo-163] all conversation. opened convo room, open another convo room. user(inbound) message validation - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 2 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. open another convo room
    //   4. open selected convo room
    // Expected:
    //   - bubble chat on right side, blue bubble chat
    //   - new message appears instantly in convo room
    //   - message display correctly
  });

  test.fixme('[SIX-Convo-164] bubble chat validation. ticketed bubble chat - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. create ticket from bubble chat
    // Expected:
    //   - display ticketed bubble chat with pink bubble chat and highlighted
    //   - have see ticket link button on bubble chat
  });

  test.fixme('[SIX-Convo-165] bubble chat validation. long text, read more not open. bubble chat on max height and widht - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. closed submenu & conversation details
    // Expected:
    //   - display ~1100 characters include empty lines and spaces
    //   - display the rest as truncated "read more"
  });

  test.fixme('[SIX-Convo-166] bubble chat validation. long text, read more not open. web on small size - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. small app
    // Expected:
    //   - display text, prioritizing height bubble chat to 720px
    //   - smaller widht, 240px
  });

  test.fixme('[SIX-Convo-167] bubble chat validation. text, open read more - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send 2000 characters
    // Expected:
    //   - display all 2000 characters
  });

  test.fixme('[SIX-Convo-168] bubble chat validation. img - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send img
    // Expected:
    //   - display img on blue bubble chat
  });

  test.fixme('[SIX-Convo-169] bubble chat validation. img, big 1:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send big 1:1 img
    // Expected:
    //   - display fitted img in bubble chat
  });

  test.fixme('[SIX-Convo-170] bubble chat validation. img, big 1:5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send big 1:5 img
    // Expected:
    //   - display cropped img to 1:5 center on bubble chat
  });

  test.fixme('[SIX-Convo-171] bubble chat validation. img, big 5:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send big 5:1 img
    // Expected:
    //   - display cropped img to 5:1 center on bubble chat
  });

  test.fixme('[SIX-Convo-172] bubble chat validation. img, small 1:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send small 1:1 img
    // Expected:
    //   - display fitted img in bubble chat
  });

  test.fixme('[SIX-Convo-173] bubble chat validation. img, small 1:5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send small 1:5 img
    // Expected:
    //   - display zoomed img to 1:5 center on bubble chat
  });

  test.fixme('[SIX-Convo-174] bubble chat validation. img, small 5:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send small 5:1 img
    // Expected:
    //   - display zoomed img to 5:1 center on bubble chat
  });

  test.fixme('[SIX-Convo-175] bubble chat validation. img with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send img with text
    // Expected:
    //   - display img(400px 1:1) with text on blue bubble chat
  });

  test.fixme('[SIX-Convo-176] bubble chat validation. img, expired link to database after 15 minutes - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send img
    //   4. click redownload
    // Expected:
    //   - display message "Terjadi Kesalahan"
    //   - img not displayed
    //   - redownload button with img icon and download icon
  });

  test.fixme('[SIX-Convo-177] bubble chat validation. gif - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send gif
    // Expected:
    //   - display moving gif on blue bubble chat
  });

  test.fixme('[SIX-Convo-178] bubble chat validation. vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send vid
    // Expected:
    //   - display thumbnail vid with play button on blue bubble chat
  });

  test.fixme('[SIX-Convo-179] bubble chat validation. vid, big 1:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send big 1:1 vid
    // Expected:
    //   - display fitted vid thumbnail in bubble chat
  });

  test.fixme('[SIX-Convo-180] bubble chat validation. vid, big 1:5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send big 1:5 vid
    // Expected:
    //   - display cropped vid thumbnail to 1:5 center on bubble chat
  });

  test.fixme('[SIX-Convo-181] bubble chat validation. vid, big 5:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send big 5:1 vid
    // Expected:
    //   - display cropped vid thumbnail to 5:1 center on bubble chat
  });

  test.fixme('[SIX-Convo-182] bubble chat validation. vid, small 1:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send small 1:1 vid
    // Expected:
    //   - display fitted vid thumbnail in bubble chat
  });

  test.fixme('[SIX-Convo-183] bubble chat validation. vid, small 1:5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send small 1:5 vid
    // Expected:
    //   - display zoomed vid thumbnail to 1:5 center on bubble chat
  });

  test.fixme('[SIX-Convo-184] bubble chat validation. vid, small 5:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send small 5:1 vid
    // Expected:
    //   - display zoomed vid thumbnail  to 5:1 center on bubble chat
  });

  test.fixme('[SIX-Convo-185] bubble chat validation. vid with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send vid with text
    // Expected:
    //   - display vid thumbnail with text on blue bubble chat
  });

  test.fixme('[SIX-Convo-186] bubble chat validation. vid, expired link to database after 15 minutes - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send vid
    //   4. click redownload
    // Expected:
    //   - display message "Terjadi Kesalahan"
    //   - vid not displayed
    //   - redownload button with vid icon and download icon
  });

  test.fixme('[SIX-Convo-187] bubble chat validation. file - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send file .pdf
    // Expected:
    //   - display file format icon, file name, file size, file format name on blue bubble chat
  });

  test.fixme('[SIX-Convo-188] bubble chat validation. file with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send file .xlsx with text
    // Expected:
    //   - display file format icon, file name, file size, file format name and with text on blue bubble chat
  });

  test.fixme('[SIX-Convo-189] bubble chat validation. receive file - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. receive file from customer (mobile)
    // Expected:
    //   - display file format icon, file name, file size, file format name and with text on blue bubble chat
  });

  test.fixme('[SIX-Convo-190] bubble chat validation. receive file + text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. receive file + text from customer (mobile)
    // Expected:
    //   - display file format icon, file name, file size, file format name and with text on blue bubble chat
  });

  test.fixme('[SIX-Convo-191] bubble chat validation. outbound multiple media/files - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send multiple media/files
    // Expected:
    //   - media/files sent in different bubble chat
    //   - sended sort by preview
    //   - mobile receive the same media/files
  });

  test.fixme('[SIX-Convo-192] bubble chat validation. outbound multiple media/files with text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. send multiple media/files with text
    // Expected:
    //   - media/files sent in different bubble chat
    //   - last media/file have text attach to it
    //   - sended sort by preview
    //   - mobile receive the same media/files and text
  });

  test.fixme('[SIX-Convo-193] bubble chat validation. inbound multiple media/files. from customer(mobile) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) send multiple media/files
    // Expected:
    //   - multiple media receive in group bubble chat
    //   - multiple files receive in different bubble chat
    //   - sended sort by customer pick order
    //   - inbound receive the same media/files
  });

  test.fixme('[SIX-Convo-194] bubble chat validation. inbound multiple media/files with text. from customer(mobile) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) send multiple media/files with text in each media
    // Expected:
    //   - media/files receive in different bubble chat
    //   - each media have text attach to it
    //   - files can't attach text
    //   - sended sort by customer pick order
    //   - inbound receive the same media/files and text
  });

  test.fixme('[SIX-Convo-195] bubble chat validation. received voice record from customer(mobile) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) send voice record to user
    // Expected:
    //   - display mic icon, and info message "Content not available yet"
  });

  test.fixme('[SIX-Convo-196] bubble chat validation. received sticker from customer(mobile) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) send sticker to user
    // Expected:
    //   - display bubble chat with sticker or moving stikcer
  });

  test.fixme('[SIX-Convo-197] bubble chat validation. received view once media from customer(mobile) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) send view once media to user
    // Expected:
    //   - display bubble chat with message "You received a view once message. For added privacy, you can only open it on your phone."
  });

  test.fixme('[SIX-Convo-198] bubble chat validation. message reply by customer(mobile) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) reply our message
    // Expected:
    //   - display customer bubble chat with replyed message
  });

  test.fixme('[SIX-Convo-199] bubble chat validation. Clicking a reply message from user navigation - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click reply message from user
    // Expected:
    //   - user will directed to the original message
    //   - original message will highlighted for a moment
  });

  test.fixme('[SIX-Convo-200] bubble chat validation. Clicking a reply message from customer navigation - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click reply message from customer
    // Expected:
    //   - user will directed to the original message
    //   - original message will highlighted for a moment
  });

});

test.describe('verify infinite scroll', () => {
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

  test.fixme('[SIX-Convo-201] content validation. scroll to top - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. scroll to 25th bubble chat on display
    // Expected:
    //   - bubble chat only display 25, if bubble chat < 25
    //   - fetch another 25 bubble chat
    //   - stayed at /25th bubble chat when load another 25
    //   - bubble chat displayed based on message sent timestamp and owner
  });

});

test.describe('verify open media/file', () => {
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

  test.fixme('[SIX-Convo-202] open media/file validation. from bubble chat, img - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click img message on convo room
    // Expected:
    //   - img will opens as gallery viewer modal with  - customer icon & name - pin button - save button - (X) button  - fullsize fitted img, container max at 1366x768 - can zoom + up to 1000% - <- & -> button  - thumbnail bar contains another media(vid(+play button)/img) in the convo thumbnail(1:1) - highlighted thumbnail for opened media
  });

  test.fixme('[SIX-Convo-203] open media/file validation. from bubble chat, img+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click img message on convo room
    // Expected:
    //   - img will opens as gallery viewer modal with  - customer icon & name - pin button - save button - (X) button  - fullsize fitted img, container max at 1366x768 - can zoom + up to 1000% - <- & -> button  - text container up tp 96 characters, >96 = truncated - thumbnail bar contains another media(vid(+play button)/img) in the convo thumbnail(1:1) - highlighted thumbnail for opened media
  });

  test.fixme('[SIX-Convo-204] open media/file validation. from message input preview, img - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. input 3 images
    // Expected:
    //   - img will opens as gallery viewer modal with  - (X) button  - fullsize fitted img, container max at 1366x768 - can zoom + up to 1000% - thumbnail bar contains another media(vid(+play button)/img)/files in the preview thumbnail(1:1) - highlighted thumbnail for opened media
  });

  test.fixme('[SIX-Convo-205] open media/file validation. from bubble chat, vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click vid message on convo room
    // Expected:
    //   - vid will opens as gallery viewer modal with  - customer icon & name - pin button - save button - (X) button  - fullsize fitted img, container max at 1366x768 - pause/play button - volume button - progress bar - <- & -> button  - thumbnail bar contains another media(vid(+play button)/img) in the convo thumbnail(1:1) - highlighted thumbnail for opened media
    //   - vid automatically plays
  });

  test.fixme('[SIX-Convo-206] open media/file validation. from bubble chat, vid+text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click vid message on convo room
    // Expected:
    //   - vid will opens as gallery viewer modal with  - customer icon & name - pin button - save button - (X) button  - fullsize fitted img, container max at 1366x768 - pause/play button - volume button - progress bar - <- & -> button  - text container up tp 96 characters, >96 = truncated - thumbnail bar contains another media(vid(+play button)/img) in the convo thumbnail(1:1) - highlighted thumbnail for opened media
    //   - automatically play vid
  });

  test.fixme('[SIX-Convo-207] open media/file validation. from message input preview, vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. input 3 videos
    // Expected:
    //   - vid will opens as gallery viewer modal with  - (X) button  - fullsize fitted img, container max at 1366x768 - pause/play button - volume button - progress bar - thumbnail bar contains another media(vid(+play button)/img)/files in the preview thumbnail(1:1) - highlighted thumbnail for opened media
    //   - vid automatically plays
  });

  test.fixme('[SIX-Convo-208] open media/file validation. from message input preview, files - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. input 3 files(pdf, docx, xlsx)
    // Expected:
    //   - file will opens as gallery viewer modal with  - (X) button  - file format icon - file name.format - size - file format - thumbnail bar contains another media(vid(+play button)/img)/files in the preview thumbnail(1:1) - highlighted thumbnail for opened media
    //   - thumbnail displayed as file format icon
    //   - pdf display : - pdf file icon - file name.pdf - size - pdf
    //   - docx display : - docx file icon - file name.docx - size - docx
    //   - xlsx display : - xlsx file icon - file name.xlsx - size - xlsx
  });

  test.fixme('[SIX-Convo-209] open media/file validation. bubble chat img, normal resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click normal resolution img message on convo room
    // Expected:
    //   - fullsize fitted img at 100%, container max at 1366x768
    //   - can zoom + up to 1000%
  });

  test.fixme('[SIX-Convo-210] open media/file validation. bubble chat img, small resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click small resolution img message on convo room
    // Expected:
    //   - fullsize zoom in fitted img (~1000%), container max at 1366x768
    //   - can zoom out up to 100%
  });

  test.fixme('[SIX-Convo-211] open media/file validation. bubble chat img, big resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click big resolution img message on convo room
    // Expected:
    //   - fullsize zoom out fitted img (60%), container max at 1366x768
    //   - can zoom in up to 1000%
  });

  test.fixme('[SIX-Convo-212] open media/file validation. message input preview img, normal resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click normal resolution img preview on message input
    // Expected:
    //   - fullsize fitted img at 100%, container max at 1366x768
    //   - can zoom + up to 1000%
  });

  test.fixme('[SIX-Convo-213] open media/file validation. message input preview img, small resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click small resolution img preview on message input
    // Expected:
    //   - fullsize zoom in fitted img (~1000%), container max at 1366x768
    //   - can zoom out up to 100%
  });

  test.fixme('[SIX-Convo-214] open media/file validation. message input preview img, big resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click big resolution img preview on message input
    // Expected:
    //   - fullsize zoom out fitted img (60%), container max at 1366x768
    //   - can zoom in up to 1000%
  });

  test.fixme('[SIX-Convo-215] open media/file validation. bubble chat vid, normal resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click normal resolution vid message on convo room
    // Expected:
    //   - fullsize fitted vid, container max at 1366x768
  });

  test.fixme('[SIX-Convo-216] open media/file validation. bubble chat vid, small resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click small resolution vid message on convo room
    // Expected:
    //   - fullsize zoom in fitted vid, container max at 1366x768
  });

  test.fixme('[SIX-Convo-217] open media/file validation. bubble chat vid, big resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click small resolution vid message on convo room
    // Expected:
    //   - fullsize zoom out fitted vid, container max at 1366x768
  });

  test.fixme('[SIX-Convo-218] open media/file validation. message input preview vid, normal resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click normal resolution vid preview on message input
    // Expected:
    //   - fullsize fitted vid, container max at 1366x768
  });

  test.fixme('[SIX-Convo-219] open media/file validation. message input preview vid, small resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click small resolution vid preview on message input
    // Expected:
    //   - fullsize zoom in fitted vid, container max at 1366x768
  });

  test.fixme('[SIX-Convo-220] open media/file validation. message input preview vid, big resolution - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click small resolution vid preview on message input
    // Expected:
    //   - fullsize zoom out fitted vid, container max at 1366x768
  });

  test.fixme('[SIX-Convo-221] open media/file validation. bubble chat file, .pdf - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click .pdf file message on convo room
    // Expected:
    //   - download file and open in user app to open .pdf(foxit/adobe acrobat)
  });

  test.fixme('[SIX-Convo-222] open media/file validation. bubble chat file, .docx - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click .docx file message on convo room
    // Expected:
    //   - download file and open in user app to open .docx(microsoft office) on view only mode
  });

  test.fixme('[SIX-Convo-223] open media/file validation. bubble chat file, .xlsx - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click .xlsx file message on convo room
    // Expected:
    //   - download file and open in user app to open .xlsx(microsoft office) on view only mode
  });

  test.fixme('[SIX-Convo-224] open media/file validation. bubble chat media, customer icon and name - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - display icon the same as in convo room header and convo list
    //   - display name the same as in convo room header and convo list
  });

  test.fixme('[SIX-Convo-225] open media/file validation. bubble chat media, all media in conversation room displayed in thumbnail bar - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - display all media(img/vid) in this conversation room on thumbnail bar
  });

  test.fixme('[SIX-Convo-226] open media/file validation. bubble chat media+text, text < 96 characters - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message+<96 characters text on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - display text between media container and thumbnail bar
  });

  test.fixme('[SIX-Convo-227] open media/file validation. bubble chat media+text, text > 96 characters - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message+>96 characters text on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - display text between media container and thumbnail bar, only to 96th character
    //   - display the rest truncated "...read more"
  });

  test.fixme('[SIX-Convo-228] open media/file validation. bubble chat media+text, text > 96 characters, show/hide truncated text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message+>96 characters text on convo room
    //   4. click "show less"
    // Expected:
    //   - open gallery viewer modal
    //   - expand the text container to media container, not thumbnail bar
    //   - display all >96 characters text
    //   - truncated the rest after 96th character
  });

  test.fixme('[SIX-Convo-229] open media/file validation. bubble chat media, click <- (left arrow button) & -> (right arrow button) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message on convo room
    //   4. click right arrow button (->) 1 time
    // Expected:
    //   - open gallery viewer modal
    //   - open media on the left from opened media right now
    //   - open media on the right from opened media right now
  });

  test.fixme('[SIX-Convo-230] open media/file validation. bubble chat media, -> (right arrow button) & <- (left arrow button) isHide on far right media and far left media - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message on convo room
    //   4. open far left media
    // Expected:
    //   - open gallery viewer modal
    //   - right arrow button on far right media not visible
    //   - left arrow button on far left media not visible
  });

  test.fixme('[SIX-Convo-231] open media/file validation. bubble chat media, pin button - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click not pinned media message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - media bubble chat is pinned
  });

  test.fixme('[SIX-Convo-232] open media/file validation. bubble chat media, unpin button - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click pinned media message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - media bubble chat is unpin
  });

  test.fixme('[SIX-Convo-233] open media/file validation. bubble chat media, save button - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - media is downloaded to /downloads on file explorer / user open file explorer to edit download path
  });

  test.fixme('[SIX-Convo-234] open media/file validation. bubble chat media, (X) button - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - gallery viewer modal is closed
  });

  test.fixme('[SIX-Convo-235] open media/file validation. bubble chat media, close modal in different media when open - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click latest media message on convo room
    //   4. close modal
    // Expected:
    //   - open gallery viewer modal
    //   - gallery viewer modal is closed
    //   - Keep the conversation room in the same scroll position as when the media was first opened. Not direct user to the last opened media
  });

  test.fixme('[SIX-Convo-236] open media/file validation. bubble chat media, expired img link, redownload - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click latest media message on convo room
    //   4. click redownload button
    // Expected:
    //   - open gallery viewer modal
    //   - thumbnail display as img icon+"Expired"
    //   - media display as img icon+"Expired"+ redownload button
    //   - original img displayed
  });

  test.fixme('[SIX-Convo-237] open media/file validation. bubble chat media, expired img data, redownload - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click latest media message on convo room
    //   4. click redownload button
    // Expected:
    //   - open gallery viewer modal
    //   - thumbnail display as img icon+"Expired"
    //   - media display as img icon+"Expired"+ redownload button
    //   - open error message "media is missing, please ask owner to resend it"
  });

  test.fixme('[SIX-Convo-238] open media/file validation. bubble chat media, expired vid link, redownload - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click latest media message on convo room
    //   4. click redownload button
    // Expected:
    //   - open gallery viewer modal
    //   - thumbnail display as vid icon+"Expired"
    //   - media display as vid icon+"Expired"+ redownload button
    //   - original vid displayed
  });

  test.fixme('[SIX-Convo-239] open media/file validation. bubble chat media, expired vid data, redownload - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click latest media message on convo room
    //   4. click redownload button
    // Expected:
    //   - open gallery viewer modal
    //   - thumbnail display as vid icon+"Expired"
    //   - media display as vid icon+"Expired"+ redownload button
    //   - open error message "media is missing, please ask owner to resend it"
  });

  test.fixme('[SIX-Convo-240] open media/file validation. message input preview media, all media in message input preview displayed in thumbnail bar - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. input 5 media
    // Expected:
    //   - open gallery viewer modal
    //   - display all media(img/vid)/files in this preview on thumbnail bar
  });

  test.fixme('[SIX-Convo-241] open media/file validation. message input preview media, (X) button - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. input 5 media
    //   4. click (X) button
    // Expected:
    //   - open gallery viewer modal
    //   - gallery viewer modal closed
  });

  test.fixme('[SIX-Convo-242] open media/file validation. preview/bubble chat. click other media on thumbnail bar to open media directly - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - open directly the selected media
  });

  test.fixme('[SIX-Convo-243] open media/file validation. preview/bubble chat. scroll thumbnail bar - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - thumbnail bar scrolled, opened media not changed
  });

  test.fixme('[SIX-Convo-244] open media/file validation. preview/bubble chat. zoom + - img - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click img message on convo room
    //   4. zoom out
    // Expected:
    //   - open gallery viewer modal
    //   - img zoomed in (max 1000%)
    //   - img zoomed out (max 100%)
  });

  test.fixme('[SIX-Convo-245] open media/file validation. preview/bubble chat. pause/play vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click vid message on convo room
    //   4. pause
    //   5. wait 3 secs
    //   6. play
    // Expected:
    //   - open gallery viewer modal
    //   - vid automatically play
    //   - vid paused at 3secs
    //   - vid continue play
  });

  test.fixme('[SIX-Convo-246] open media/file validation. preview/bubble chat. volume button vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click vid message on convo room
    //   4. increase volume
    //   5. decrease volume
    // Expected:
    //   - open gallery viewer modal
    //   - vid sound is louder
    //   - vid sound is quieter
  });

  test.fixme('[SIX-Convo-247] open media/file validation. preview/bubble chat. volume button vid, pc volume is muted - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. mute pc volume
    //   4. click volume button
    //   5. increase volume
    //   6. decrease volume
    // Expected:
    //   - open gallery viewer modal
    //   - vid has no sound
  });

  test.fixme('[SIX-Convo-248] open media/file validation. preview/bubble chat. play vid on preview and from bubble chat - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. input video to message input
    //   4. send vid
    //   5. open vid message on convo room
    //   6. play full
    // Expected:
    //   - open gallery viewer modal
    //   - content is the same
    //   - no missing data
  });

  test.fixme('[SIX-Convo-249] open media/file validation. preview/bubble chat. change media to video on thumbnail bar - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click media message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - vid not automatically played
  });

  test.fixme('[SIX-Convo-250] open media/file validation. preview/bubble chat. change media from played video - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click vid message on convo room
    //   4. change media on thumbnail bar
    // Expected:
    //   - open gallery viewer modal
    //   - vid pause, sound stop
  });

  test.fixme('[SIX-Convo-251] open media/file validation. preview/bubble chat. change media 1 place away from played video then back to vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click vid message on convo room
    //   4. open 1 place away media on thumbnail bar
    //   5. back to vid
    // Expected:
    //   - open gallery viewer modal
    //   - vid pause, progress bar at 3 secs
  });

  test.fixme('[SIX-Convo-252] open media/file validation. preview/bubble chat. change media 2 place away from played video then back to vid - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click vid message on convo room
    //   4. open 2 place away media on thumbnail bar
    //   5. back to vid
    // Expected:
    //   - open gallery viewer modal
    //   - vid progress bar reset
  });

  test.fixme('[SIX-Convo-253] open media/file validation. preview/bubble chat. skip few minutes on progress bar - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click vid message on convo room
    //   4. drag at 00:05secs to 00:15secs on progress bar, and release
    // Expected:
    //   - open gallery viewer modal
    //   - vid played at 00:10secs
    //   - vid paused when draging in progress bar
    //   - vid played at 00:15secs
  });

  test.fixme('[SIX-Convo-254] open media/file validation. preview/bubble chat. thumbnail vid, 1:1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click 1:1 vid message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - thumbnail on thumbnail bar display fiited to 1:1
  });

  test.fixme('[SIX-Convo-255] open media/file validation. preview/bubble chat. thumbnail img, small&long - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click small 1:5 vid message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - thumbnailon thumbnail bar displayed zoom in to 1:1 center
    //   - with play button on thumbnail
  });

  test.fixme('[SIX-Convo-256] open media/file validation. preview/bubble chat. thumbnail img, big&wide - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. Click big 5:1 vid message on convo room
    // Expected:
    //   - open gallery viewer modal
    //   - thumbnail on thumbnail bar displayed crop to 1:1 center
    //   - with play button on thumbnail
  });

  test.fixme('[SIX-Convo-257] open media/file validation. preview/bubble chat. thumbnail file, docx - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. input docx file on message input
    // Expected:
    //   - open gallery viewer modal
    //   - thumbnail on thumbnail bar displayed as docx file icon
  });

});

test.describe('verify quick action button', () => {
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

  test.fixme('[SIX-Convo-258] copy message validation. text - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected text bubble chat
    // Expected:
    //   - open quick action when bubble chat hovered
    //   - text message copied
  });

  test.fixme('[SIX-Convo-259] copy message validation. media/files - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected media/file bubble chat
    // Expected:
    //   - open quick action when bubble chat hovered
    //   - media/files copied
  });

  test.fixme('[SIX-Convo-260] pin message validation - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected text bubble chat
    // Expected:
    //   - open quick action when bubble chat hovered
    //   - message pin on pinned message accordion in conversation details
    //   - display pin icon on pinned bubble chat
  });

  test.fixme('[SIX-Convo-261] select message validation. select 1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected text bubble chat
    // Expected:
    //   - display sticky div on bottom replacing message input contains selected messages counter, create ticket button, copy button, cancel button
    //   - ticked checkbox == blue highlighted bubble chat(user/customer)
    //   - checkbox not ticked == normal bubble chat
    //   - quick action/reply message unactive
  });

  test.fixme('[SIX-Convo-262] select message validation. select 1, copy text message - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected text bubble chat
    //   4. click copy
    // Expected:
    //   - text message copied
  });

  test.fixme('[SIX-Convo-263] select message validation. select 1, copy media/file message - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected media/file bubble chat
    //   4. click copy
    // Expected:
    //   - media/files copied
  });

  test.fixme('[SIX-Convo-264] select message validation. select 2 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected text bubble chat
    //   4. ticked 1 more bubble chat
    // Expected:
    //   - display bulk action bar replacing message input contains selected messages counter, create as one ticket button, create seperated button, copy button, cancel button
    //   - ticked checkbox == blue highlighted bubble chat(user/customer)
    //   - checkbox not ticked == normal bubble chat
    //   - quick action/reply message unactive
  });

  test.fixme('[SIX-Convo-265] select message validation. select 2. bulk copy - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected text bubble chat
    //   4. ticked 1 more bubble chat
    //   5. click copy
    // Expected:
    //   - display bulk action bar replacing message input contains selected messages counter, create as one ticket button, create seperated button, copy button, cancel button
    //   - ticked checkbox == blue highlighted bubble chat(user/customer)
    //   - checkbox not ticked == normal bubble chat
    //   - quick action/reply message unactive
    //   - message copied with "[timestamp] bubble chat owner: message [timestamp] bubble chat owner: message" format
  });

  test.fixme('[SIX-Convo-266] select message validation. select 2. bulk copy + media/files - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected text bubble chat
    //   4. ticked 1 more bubble chat, media/file
    //   5. click copy
    // Expected:
    //   - display bulk action bar replacing message input contains selected messages counter, create as one ticket button, create seperated button, copy button, cancel button
    //   - ticked checkbox == blue highlighted bubble chat(user/customer)
    //   - checkbox not ticked == normal bubble chat
    //   - quick action/reply message unactive
    //   - message copied with "[timestamp] bubble chat owner: message [timestamp] bubble chat owner: message" format include the media/file
  });

  test.fixme('[SIX-Convo-267] select message validation. cannot select bubble chat from 2 different conversation room - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open selected convo room
    //   2. hover selected text bubble chat
    //   4. open another conversation room
    // Expected:
    //   - messages unselected, message input replacing bulk action bar
  });

});

test.describe('verify timestamp', () => {
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

  test.fixme('[SIX-Convo-268] inbound timestamp validation. from user(mobile). today(21.11.25) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. user(mobile) send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp by clock for today
  });

  test.fixme('[SIX-Convo-269] inbound timestamp validation. from user(mobile).  today(21.11.25). yesterday - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. user(mobile) send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with "Kemarin"
  });

  test.fixme('[SIX-Convo-270] inbound timestamp validation. from user(mobile). today(21.11.25). 2 days ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. user(mobile) send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with day name "Rabu"
  });

  test.fixme('[SIX-Convo-271] inbound timestamp validation. from user(mobile). today(21.11.25). 7 days ago/ a week ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. user(mobile) send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with date "14 November 2025"
  });

  test.fixme('[SIX-Convo-272] inbound timestamp validation. from customer(mobile). today(21.11.25) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. customer(mobile) send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp by clock for today
  });

  test.fixme('[SIX-Convo-273] inbound timestamp validation. from customer(mobile).  today(21.11.25). yesterday - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. customer(mobile) send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with "Kemarin"
  });

  test.fixme('[SIX-Convo-274] inbound timestamp validation. from customer(mobile). today(21.11.25). 2 days ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. customer(mobile) send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with day name "Selasa"
  });

  test.fixme('[SIX-Convo-275] inbound timestamp validation. from customer(mobile). today(21.11.25). 7 days ago/ a week ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. customer(mobile) send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with date "14 November 2025"
  });

  test.fixme('[SIX-Convo-276] inbound timestamp validation. from outbound. today(21.11.25) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp by clock for today
  });

  test.fixme('[SIX-Convo-277] inbound timestamp validation. from outbound. today(21.11.25). pending then sent - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room without/slow interner
    //   4. message sent with good internet
    // Expected:
    //   - display message timestamp by clock, when pending
    //   - display message timestamp by clock, when sent
  });

  test.fixme('[SIX-Convo-278] inbound timestamp validation. from outbound.  today(21.11.25). yesterday - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with "Kemarin"
  });

  test.fixme('[SIX-Convo-279] inbound timestamp validation. from outbound. today(21.11.25). 2 days ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with day name "Selasa"
  });

  test.fixme('[SIX-Convo-280] inbound timestamp validation. from outbound. today(21.11.25). 7 days ago/ a week ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with date "14 November 2025"
  });

  test.fixme('[SIX-Convo-281] user(mobile) timestamp validation. from outbound. today(21.11.25) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp by clock for today
  });

  test.fixme('[SIX-Convo-282] user(mobile) timestamp validation. from outbound.  today(21.11.25). yesterday - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with "Kemarin"
  });

  test.fixme('[SIX-Convo-283] user(mobile) timestamp validation. from outbound. today(21.11.25). 2 days ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with day name "Selasa"
  });

  test.fixme('[SIX-Convo-284] user(mobile) timestamp validation. from outbound. today(21.11.25). 7 days ago/ a week ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with date "14 November 2025"
  });

  test.fixme('[SIX-Convo-285] customer(mobile) timestamp validation. from outbound. today(21.11.25) - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp by clock for today
  });

  test.fixme('[SIX-Convo-286] customer(mobile) timestamp validation. from outbound.  today(21.11.25). yesterday - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with "Kemarin"
  });

  test.fixme('[SIX-Convo-287] customer(mobile) timestamp validation. from outbound. today(21.11.25). 2 days ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with day name "Selasa"
  });

  test.fixme('[SIX-Convo-288] customer(mobile) timestamp validation. from outbound. today(21.11.25). 7 days ago/ a week ago - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. select convo room
    //   2. outbound send message to selected convo room
    //   4. open selected convo room
    // Expected:
    //   - display delivered message timestamp with date "14 November 2025"
  });

});

test.describe('verify delivery status', () => {
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

  test.fixme('[SIX-Convo-289] user(inbound) delivery status validation. from user(mobile). sending - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. with no internet/high ping, user(mobile) send message to selected convo room
    // Expected:
    //   - not display new bubble chat in satuninbox convo room
  });

  test.fixme('[SIX-Convo-290] user(inbound) delivery status validation. from user(mobile). sent - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. with offline customer, user(mobile) send message to selected convo room
    // Expected:
    //   - display delivery status as sent, 1 grey tick
  });

  test.fixme('[SIX-Convo-291] user(inbound) delivery status validation. from user(mobile). delivered - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. user(mobile) send message to selected convo room
    // Expected:
    //   - display delivery status as delivered, 2 grey tick
  });

  test.fixme('[SIX-Convo-292] user(inbound) delivery status validation. from user(mobile). read - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open any convo room
    //   2. user(mobile) send message to selected convo room
    // Expected:
    //   - display delivery status as read, 2 green tick
  });

  test.fixme('[SIX-Convo-293] user(inbound) delivery status validation. from user(mobile). not delivered - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open any convo room
    //   2. ???
    // Expected:
    //   - not display new bubble chat in satuninbox convo room
  });

  test.fixme('[SIX-Convo-294] user(inbound) delivery status validation. from outbound. sending - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. with no internet/high ping, outbound message to selected convo room
    // Expected:
    //   - display delivery status as sending, grey clock
    //   - not display new bubble chat in user(mobile) convo room
  });

  test.fixme('[SIX-Convo-295] user(inbound) delivery status validation. from outbound. sent - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. with offline customer, outbound message to selected convo room
    // Expected:
    //   - display delivery status as sent, 1 grey tick
  });

  test.fixme('[SIX-Convo-296] user(inbound) delivery status validation. from outbound. delivered - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. outbound message to selected convo room
    // Expected:
    //   - display delivery status as delivered, 2 grey tick
  });

  test.fixme('[SIX-Convo-297] user(inbound) delivery status validation. from outbound. read - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open any convo room
    //   2. outbound message to selected convo room
    // Expected:
    //   - display delivery status as read, 2 green tick
  });

  test.fixme('[SIX-Convo-298] user(mobile) delivery status validation. from outbound. sending - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open any convo room
    //   2. ???
    //   1. open selected convo room
    //   2. with no internet/high ping, outbound message to selected convo room
    // Expected:
    //   - display delivery status as not delivered, red (!)
    //   - display "Not Delivered"
    //   - not display new bubble chat in user(mobile) convo room
  });

  test.fixme('[SIX-Convo-299] user(mobile) delivery status validation. from outbound. sent - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. with offline customer, outbound message to selected convo room
    // Expected:
    //   - display delivery status as sent, 1 grey tick
  });

  test.fixme('[SIX-Convo-300] user(mobile) delivery status validation. from outbound. delivered - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. outbound message to selected convo room
    // Expected:
    //   - display delivery status as delivered, 2 grey tick
  });

  test.fixme('[SIX-Convo-301] user(mobile) delivery status validation. from outbound. read - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open any convo room
    //   2. outbound message to selected convo room
    //   4. open convo room in user(mobile)
    // Expected:
    //   - display delivery status as read, 2 green tick
  });

  test.fixme('[SIX-Convo-302] user(mobile) delivery status validation. from outbound. not delivered - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: NEGATIVE
    // Steps:
    //   1. open any convo room
    //   2. ???
    // Expected:
    //   - not display new bubble chat in user(mobile) convo room
  });

});

test.describe('verify typing indicator', () => {
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

  test.fixme('[SIX-Convo-303] inbound typing indicator validation. customer(mobile) typing. 1 click - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) click keyboard 1 time
    // Expected:
    //   - typing indicator not displayed
  });

  test.fixme('[SIX-Convo-304] inbound typing indicator validation. customer(mobile) typing. 5 click - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) click keyboard 5 time
    // Expected:
    //   - display typing indicator when typing after 3 click and for 3s after last click
  });

  test.fixme('[SIX-Convo-305] inbound typing indicator validation. customer(mobile) typing. delete 1/1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) input 1 letter
    //   4. delete message 1/1
    // Expected:
    //   - typing indicator not displayed
  });

  test.fixme('[SIX-Convo-306] inbound typing indicator validation. customer(mobile) typing. delete 3/5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) input 5 letter
    //   4. delete message 3/5
    // Expected:
    //   - display typing indicator when deleting after 3 click and for 3s after last click
  });

  test.fixme('[SIX-Convo-307] inbound typing indicator validation. customer(mobile) typing. delete 2/2 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. customer(mobile) input 2 letter
    //   4. delete message 2/2
    // Expected:
    //   - typing indicator not displayed
  });

  test.fixme('[SIX-Convo-308] customer(mobile) typing indicator validation. outbound typing. 1 click - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. customer(mobile) open convo room
    //   2. open selected convo room
    // Expected:
    //   - typing indicator not displayed
  });

  test.fixme('[SIX-Convo-309] customer(mobile)typing indicator validation. outbound typing. 5 click - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. customer(mobile) open convo room
    //   2. open selected convo room
    // Expected:
    //   - display typing indicator when typing after 3 click and for 3s after last click
  });

  test.fixme('[SIX-Convo-310] customer(mobile) typing indicator validation. outbound typing. delete 1/1 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. customer(mobile) open convo room
    //   2. open selected convo room
    //   4. wait 4s
    //   5. delete message 1/1
    // Expected:
    //   - typing indicator not displayed
  });

  test.fixme('[SIX-Convo-311] customer(mobile) typing indicator validation. outbound typing. delete 3/5 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. customer(mobile) open convo room
    //   2. open selected convo room
    //   4. wait 4s after last click
    //   5. delete message 3/5
    // Expected:
    //   - display typing indicator when deleting after 3 click and for 3s after last click
  });

  test.fixme('[SIX-Convo-312] customer(mobile) typing indicator validation. outbound typing. delete 2/2 - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. customer(mobile) open convo room
    //   2. open selected convo room
    //   4. wait 4s after last click
    //   5. delete message 2/2
    // Expected:
    //   - typing indicator not displayed
  });

  test.fixme('[SIX-Convo-313] inbound typing indicator validation. 1 another agent typing. 3 click - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. another agent(assignee) open selected convo room
    // Expected:
    //   - display bubble chat "-indicator- [agentname] is typing" in user coversation room
  });

  test.fixme('[SIX-Convo-314] inbound typing indicator validation. 3 another agent typing. 3 click - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. 3 another agent(assignee) open selected convo room
    // Expected:
    //   - display bubble chat "-indicator- [agentname1], [agentname2] and [agentname3] are typing" in user coversation room
  });

  test.fixme('[SIX-Convo-315] inbound typing indicator validation. 4+ another agent typing. 3 click - not yet automated', async ({ page }) => {
    // Precondition: accessed inbox page. linked number. have at least 1 conversation
    // Test type: POSITIVE
    // Steps:
    //   1. open selected convo room
    //   2. 4+ another agent(assignee) open selected convo room
    // Expected:
    //   - display bubble chat "-indicator- [agentname1], [agentname2], [agentname3] and n more are typing" in user coversation room
  });

});
