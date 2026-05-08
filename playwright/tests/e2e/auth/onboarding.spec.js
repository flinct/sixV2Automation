const { test } = require('@playwright/test');

const onboardingCases = [
  'check login validation - try login without validate email -',
  'check onboarding validation -display behavior-',
  'check onboarding validation -try re-access with refreshing the page-',
  'check onboarding validation -re access via path-',
  'check onboarding validation -successfull onboarding-',
  'check onboarding field validation -minimum organization name-',
];

test.describe('Onboarding Tests', () => {
  for (const title of onboardingCases) {
    test.fixme(title, 'Source Cypress onboarding flow requires verified registration state, uploaded documents, and stable onboarding locators that are not yet available in Playwright support.');
  }
});
