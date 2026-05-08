const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage, EndpointDetectPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Endpoint Detection - conversation/your-inbox', () => {
  let authPage;
  let inboxPage;
  let endpointDetectPage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    endpointDetectPage = new EndpointDetectPage(page);
    const credentials = config.getDefaultAccount();
    await authPage.login(credentials.identifier, credentials.password, { useV2: true });
  });

  test('captures endpoints used on /conversation/your-inbox', async ({ page }) => {
    await endpointDetectPage.start({
      name: 'conversation-your-inbox',
      urlPattern: '**/api/**',
    });

    await inboxPage.gotoYourInbox();
    await page.waitForTimeout(5000);
    await endpointDetectPage.save('endpoint_detect');

    expect(endpointDetectPage.entries.length).toBeGreaterThan(0);
  });
});
