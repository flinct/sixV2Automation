const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../../../support/pages');

const deferredCases = [
  'check duplicate email validation',
  'check email validation no leading include',
  'check email validation normalization to lowercase',
  "check email validation - missing '@'",
  'check email validation - missing domain',
  'check email validation -invalid input',
  'check registration token and link verify',
  'check successfull register with all valid format input',
  'check minimum fullname register',
  'check maximum fullname register',
  'check fullname register with numbers',
  'check fullname register with special character',
  'check fullname register with double spacing',
  'check minimum username register',
  'check maximum username register',
  'check username register with spacing',
  'check username register with special character',
  'check already registered username',
  'check username register with uppercases',
  'check username register with trailing space',
  'check phoneNumber register with local code',
  'check phoneNumber register with international code',
  'check minimum phoneNumber register - 9 digit -',
  'check minimum phoneNumber register - 5 digit -',
  'check minimum phoneNumber register - 2 digit -',
  'check maximum phoneNumber register - 13 digits -',
  'check maximum phoneNumber register - 17 digits -',
  'check maximum phoneNumber register - 25 digits -',
  'check phoneNumber register with special character',
  'check phoneNumber register with spacing',
  'check phoneNumber register with trailing spacing',
  'check phoneNumber register with invalid prefix',
  'check phoneNumber register with prefix spacing',
  'check phoneNumber register with already registered number',
  'check password register with minimum input',
  'check password register with maximum input',
  'check password register without special chars',
  'check password register without capital chars',
  'check password register same as username',
  'check password register same as email',
  'check password register contains spacing',
  'try register and reset password',
];

test.describe('Register Page Tests', () => {
  let authPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    await authPage.gotoRegisterV2();
  });

  test('check exist element on register', async () => {
    await expect(authPage.regFullname).toBeVisible();
    await expect(authPage.regUsername).toBeVisible();
    await expect(authPage.regEmail).toBeVisible();
    await expect(authPage.regPhone).toBeVisible();
    await expect(authPage.regPassword).toBeVisible();
    await expect(authPage.regPasswordConfirm).toBeVisible();
    await expect(authPage.registerButton).toBeVisible();
  });

  test('check register error state', async () => {
    await authPage.registerButton.click();
    await expect(authPage.regFullname).toHaveAttribute('aria-invalid', 'true');
    await expect(authPage.regUsername).toHaveAttribute('aria-invalid', 'true');
    await expect(authPage.regEmail).toHaveAttribute('aria-invalid', 'true');
    await expect(authPage.regPhone).toHaveAttribute('aria-invalid', 'true');
    await expect(authPage.regPassword).toHaveAttribute('aria-invalid', 'true');
  });

  for (const title of deferredCases) {
    test.fixme(title, 'Source Cypress flow depends on richer register validation helpers or external email flow that is not yet modeled in Playwright page objects.');
  }
});
