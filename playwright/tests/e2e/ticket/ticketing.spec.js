const { test, expect } = require('@playwright/test');
const { AuthPage, TicketingPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Ticketing Smoke Tests', () => {
  let authPage;
  let ticketingPage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    ticketingPage = new TicketingPage(page);
    const credentials = config.getDefaultAccount();
    await authPage.login(credentials.identifier, credentials.password, { useV2: true });
  });

  test('access ticketing page and verify main elements', async ({ page }) => {
    await ticketingPage.goto();
    await expect(page).toHaveURL(/\/ticketing/);
    await ticketingPage.verifyTicketingElements();
  });

  test.fixme('legacy 03_ticket Cypress cases', 'Source Cypress file is mostly a duplicate auth/register suite and does not map to a distinct ticket workflow.');
});
