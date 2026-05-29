const { test, expect } = require("@playwright/test");
const {
  CheckAllPage,
  AuthPage,
  TicketingPage,
  BroadcastPage,
  ContactPage,
  DashboardPage,
  InboxPage,
} = require("../../../support/pages");
const { getCurrentConfig } = require("../../../support/config");

const PUBLIC_NAVIGATION_TESTS = new Set(["access register page"]);

test.describe("Check All Page Navigation Tests", () => {
  let checkAllPage;
  let authPage;
  let ticketingPage;
  let broadcastPage;
  let contactPage;
  let dashboardPage;
  let inboxPage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }, testInfo) => {
    authPage = new AuthPage(page);
    checkAllPage = new CheckAllPage(page);
    ticketingPage = new TicketingPage(page);
    broadcastPage = new BroadcastPage(page);
    contactPage = new ContactPage(page);
    dashboardPage = new DashboardPage(page);
    inboxPage = new InboxPage(page);

    if (PUBLIC_NAVIGATION_TESTS.has(testInfo.title)) {
      await authPage.gotoLoginV2();
      return;
    }

    const credentials = config.getDefaultAccount();
    await authPage.login(credentials.identifier, credentials.password, {
      useV2: true,
    });
  });

  test("access register page", async ({ page }) => {
    await authPage.registerLink.click();
    await expect(page).toHaveURL(/\/register/);
    await expect(authPage.regFullname).toBeVisible();
  });

  test("access conversation your inbox", async () => {
    await checkAllPage.accessConversation();
  });

  test("access conversation unassigned", async () => {
    await checkAllPage.accessConversationUnassigned();
  });

  test("access conversation all", async () => {
    await checkAllPage.accessConversationAll();
  });

  test("access conversation spam", async () => {
    await checkAllPage.accessConversationSpam();
  });

  test("access conversation starred", async () => {
    await checkAllPage.accessConversationStarred();
  });

  test("access group conversation", async () => {
    await checkAllPage.accessGroupConversation();
  });

  test("access conversation whatsapp web channel", async ({ page }) => {
    await inboxPage.goto();
    await inboxPage.channelWhatsappWeb.click();
    await expect(page).toHaveURL(/channel\?channel=whatsapp_web/);
  });

  test("access conversation team", async ({ page }) => {
    await inboxPage.goto();
    const teamNav = page.getByText(/team/i).first();
    test.skip(
      (await teamNav.count()) === 0,
      "No visible team navigation found in current environment",
    );
    await teamNav.click();
    await expect(page).toHaveURL(/\/conversation\/(team|your-inbox|channel)/);
  });

  test("access ticket page", async ({ page }) => {
    await ticketingPage.goto();
    await expect(page).toHaveURL(/\/ticketing/);
    await ticketingPage.verifyTicketingElements();
  });

  test("access ticket closed tab", async ({ page }) => {
    await ticketingPage.goto();
    await expect(page).toHaveURL(/\/ticketing/);
    const closedTab = page.getByRole("tab", { name: /ditutup|closed/i });
    await closedTab.click();
    await expect(closedTab).toHaveAttribute("data-state", /active/);
  });

  test("access create ticket drawer", async () => {
    await ticketingPage.goto();
    await ticketingPage.createTicketButton.click();
    await expect(ticketingPage.page.getByRole("dialog")).toBeVisible();
  });

  test("access broadcast page", async ({ page }) => {
    await broadcastPage.goto();
    await expect(page).toHaveURL(/\/broadcast\/messages/);
    await expect(broadcastPage.broadcastLabelHead).toBeVisible();
  });

  test("access statistic page", async ({ page }) => {
    await dashboardPage.goto();
    await expect(page).toHaveURL(/\/statistic/);
    await dashboardPage.verifyDashboardElements();
  });

  test("access contact page", async ({ page }) => {
    await contactPage.goto();
    await expect(page).toHaveURL(/\/contact(s)?/);
    await contactPage.verifyContactElements();
  });

  test("access setting page", async ({ page }) => {
    await page.goto(config.pagePaths.visitGeneralSetting);
    await expect(page).toHaveURL(/\/settings\/organization\/general/);
    await expect(page.getByText(/general|umum/i).first()).toBeVisible();
  });

  test("access profile menu", async ({ page }) => {
    const profileButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .last();
    await profileButton.click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
