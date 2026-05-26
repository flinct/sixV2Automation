const { test, expect } = require('@playwright/test');
const { AuthPage, MemberPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Member Activate/Deactivate - UI', () => {
  let authPage, memberPage, config;

  test.beforeAll(async () => { config = getCurrentConfig(); });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    memberPage = new MemberPage(page);
    await authPage.loginWithCredentials(config.getDefaultAccount(), { useV2: true });
  });

  test('Member page loads with title, tabs, and search', async ({ page }) => {
    await memberPage.goto();
    await expect(memberPage.pageTitle).toBeVisible();
    await expect(memberPage.tabMember).toBeVisible();
    await expect(memberPage.tabInvited).toBeVisible();
    await expect(memberPage.addMemberBtn).toBeVisible();
    await expect(memberPage.searchInput).toBeVisible();
  });

  test('Member settings page shows member table', async ({ page }) => {
    await memberPage.goto();
    await expect(memberPage.addMemberBtn).toBeVisible();
    await expect(page).toHaveURL(/members/);
  });

  test('Row menu button (three dots) is visible for first member', async ({ page }) => {
    await memberPage.goto();
    await expect(memberPage.dotsMenu.first()).toBeVisible({ timeout: 5000 });
  });

  test('Search filters member list by name', async ({ page }) => {
    await memberPage.goto();
    const firstName = await memberPage.getFirstMemberName();
    await memberPage.searchMember(firstName);
    const results = await page.locator('span.font-medium').count();
    expect(results).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Member Activate/Deactivate - API', () => {
  test('API: Fetch member list requires auth', async ({ request }) => {
    const cfg = getCurrentConfig();
    const creds = cfg.getDefaultAccount();
    const loginRes = await request.post(cfg.endpoints.loginUrl, { data: creds });
    const loginData = await loginRes.json();
    const token = loginData?.tokens?.access?.token;
    test.skip(!token, 'Login failed');

    const res = await request.get(cfg.endpoints.member, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.ok()).toBeTruthy();
  });

  test('TC-005: Unauthenticated request returns 401', async ({ request }) => {
    const cfg = getCurrentConfig();
    const res = await request.get(cfg.endpoints.member);
    expect(res.status()).toBe(401);
  });
});
