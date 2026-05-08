const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../../../support/pages');
const { getCurrentConfig, pagePaths, testAccounts } = require('../../../support/config');

const roleCases = [
  {
    name: 'admin',
    credentials: (config) => config.getDefaultAccount(),
    allowedPages: [
      pagePaths.visitGeneralSetting,
      pagePaths.visitRole,
      pagePaths.visitMembers,
      pagePaths.visitShift,
      pagePaths.visitTags,
      pagePaths.visitChangePass,
      pagePaths.visitTeaminbox,
      pagePaths.visitAssignment,
      pagePaths.visitMacros,
      pagePaths.visitTicketTypes,
      pagePaths.visitSLA,
      pagePaths.visitWidgetSetting,
      pagePaths.visitWhatsappwebSetting,
      pagePaths.visitAddons,
      pagePaths.visitSubscription,
      pagePaths.visitWebhookSetting,
      pagePaths.visitTrackingSetting,
      pagePaths.visitConversation,
      pagePaths.visitTicketing,
      pagePaths.visitBroadcast,
      pagePaths.visitStatistic,
    ],
  },
  {
    name: 'supervisor',
    credentials: () => testAccounts.roleValidation.supervisor,
    allowedPages: [
      pagePaths.visitGeneralSetting,
      pagePaths.visitRole,
      pagePaths.visitShift,
      pagePaths.visitTags,
      pagePaths.visitChangePass,
      pagePaths.visitTeaminbox,
      pagePaths.visitAssignment,
      pagePaths.visitMacros,
      pagePaths.visitWhatsappwebSetting,
      pagePaths.visitConversation,
      pagePaths.visitTicketing,
      pagePaths.visitBroadcast,
      pagePaths.visitStatistic,
    ],
  },
  {
    name: 'agent',
    credentials: () => testAccounts.roleValidation.agent,
    allowedPages: [
      pagePaths.visitRole,
      pagePaths.visitShift,
      pagePaths.visitChangePass,
      pagePaths.visitTeaminbox,
      pagePaths.visitWhatsappwebSetting,
      pagePaths.visitConversation,
      pagePaths.visitTicketing,
      pagePaths.visitBroadcast,
    ],
  },
  {
    name: 'crm',
    credentials: () => testAccounts.roleValidation.crm,
    allowedPages: [
      pagePaths.visitRole,
      pagePaths.visitShift,
      pagePaths.visitChangePass,
      pagePaths.visitTeaminbox,
      pagePaths.visitWhatsappwebSetting,
      pagePaths.visitConversation,
      pagePaths.visitTicketing,
      pagePaths.visitBroadcast,
    ],
  },
  {
    name: 'tlc',
    credentials: () => testAccounts.roleValidation.tlc,
    allowedPages: [
      pagePaths.visitRole,
      pagePaths.visitShift,
      pagePaths.visitChangePass,
      pagePaths.visitTeaminbox,
      pagePaths.visitWhatsappwebSetting,
      pagePaths.visitConversation,
      pagePaths.visitBroadcast,
    ],
  },
];

const allPages = [
  pagePaths.visitGeneralSetting,
  pagePaths.visitRole,
  pagePaths.visitMembers,
  pagePaths.visitShift,
  pagePaths.visitTags,
  pagePaths.visitChangePass,
  pagePaths.visitTeaminbox,
  pagePaths.visitAssignment,
  pagePaths.visitMacros,
  pagePaths.visitTicketTypes,
  pagePaths.visitSLA,
  pagePaths.visitWidgetSetting,
  pagePaths.visitWhatsappwebSetting,
  pagePaths.visitAddons,
  pagePaths.visitSubscription,
  pagePaths.visitWebhookSetting,
  pagePaths.visitTrackingSetting,
  pagePaths.visitConversation,
  pagePaths.visitTicketing,
  pagePaths.visitBroadcast,
  pagePaths.visitStatistic,
];

async function checkAccess(page, targetPath, shouldAccess) {
  await page.goto(targetPath, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  const currentUrl = page.url();
  const blocked = /\/login|\/403|\/404|unauthorized|forbidden/i.test(currentUrl);

  if (shouldAccess) {
    expect.soft(blocked, `${targetPath} should be accessible but landed on ${currentUrl}`).toBeFalsy();
  } else {
    expect.soft(blocked, `${targetPath} should be blocked but landed on ${currentUrl}`).toBeTruthy();
  }
}

test.describe('Role-Based Access Control Test', () => {
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.skip(process.env.ENV === 'prod' || process.env.ENV === 'staging', 'Role validation accounts are currently aligned to dev data.');

  for (const roleCase of roleCases) {
    test(`validate access for ${roleCase.name}`, async ({ page }) => {
      const authPage = new AuthPage(page);
      const credentials = roleCase.credentials(config);
      await authPage.login(credentials.identifier, credentials.password, { useV2: true });

      for (const targetPath of allPages) {
        await checkAccess(page, targetPath, roleCase.allowedPages.includes(targetPath));
      }
    });
  }
});
