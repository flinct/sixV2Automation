# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\auth\login.spec.js >> Auth Login Tests >> invalid login with wrong password
- Location: playwright\tests\e2e\auth\login.spec.js:41:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('login-error-message')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('login-error-message')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - region "Notifications Alt+T"
  - main [ref=e2]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - img "logo" [ref=e6]
        - paragraph [ref=e8]: Log in sekarang
      - generic [ref=e10]:
        - generic [ref=e12]:
          - img [ref=e13]
          - paragraph [ref=e15]:
            - text: Email dan/atau password salah. Coba lagi atau coba
            - link "reset password" [ref=e16] [cursor=pointer]:
              - /url: /reset-password
            - text: anda.
        - generic [ref=e18]:
          - img [ref=e20]
          - textbox "Masukan username atau email" [ref=e23]: goddummy
        - generic [ref=e25]:
          - img [ref=e27]
          - textbox "Masukan password" [ref=e34]: wrongpassword123
          - button "Tampilkan Password" [ref=e35] [cursor=pointer]:
            - img [ref=e36]
        - generic [ref=e39]:
          - checkbox [ref=e40] [cursor=pointer]
          - checkbox
          - paragraph [ref=e41]: Ingat saya
        - button "Log in" [ref=e42] [cursor=pointer]
        - generic [ref=e43]:
          - link "Tidak bisa login?" [ref=e44] [cursor=pointer]:
            - /url: /reset-password
            - paragraph [ref=e45]: Tidak bisa login?
          - img [ref=e46]
          - link "Buat akun" [ref=e48] [cursor=pointer]:
            - /url: /register
            - paragraph [ref=e49]: Buat akun
  - alert [ref=e50]
  - button "open-chat" [ref=e53] [cursor=pointer]:
    - img [ref=e54]
    - generic "hide-launcher" [ref=e56]: ×
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { AuthPage } = require('../../../support/pages');
  3  | const { getCurrentConfig } = require('../../../support/config');
  4  | 
  5  | function getSupervisorAccountKey(envName) {
  6  |   return envName === 'prod' ? 'danyspv01' : 'mataayam01';
  7  | }
  8  | 
  9  | function getAgentAccountKey(envName) {
  10 |   return envName === 'prod' ? 'danyagent01' : 'leherayam01';
  11 | }
  12 | 
  13 | test.describe('Auth Login Tests', () => {
  14 |   let authPage;
  15 |   let config;
  16 | 
  17 |   test.beforeAll(async () => {
  18 |     config = getCurrentConfig();
  19 |   });
  20 | 
  21 |   test.beforeEach(async ({ page }) => {
  22 |     authPage = new AuthPage(page);
  23 |     await authPage.gotoLoginV2();
  24 |   });
  25 | 
  26 |   test('check exist element on login page', async () => {
  27 |     await authPage.verifyLoginPageElements();
  28 |   });
  29 | 
  30 |   test('check login error state', async () => {
  31 |     await authPage.login('invalid-user', 'wrong-pass', { expectSuccess: false });
  32 |     await expect(authPage.page.getByTestId('login-error-message')).toBeVisible();
  33 |   });
  34 | 
  35 |   test('valid login with admin credentials', async () => {
  36 |     const credentials = config.getDefaultAccount();
  37 |     await authPage.login(credentials.identifier, credentials.password, { useV2: true });
  38 |     await expect(authPage.page).toHaveURL(/\/id\/conversation\/your-inbox/);
  39 |   });
  40 | 
  41 |   test('invalid login with wrong password', async () => {
  42 |     const credentials = config.getDefaultAccount();
  43 |     await authPage.login(credentials.identifier, 'wrongpassword123', { expectSuccess: false });
> 44 |     await expect(authPage.page.getByTestId('login-error-message')).toBeVisible();
     |                                                                    ^ Error: expect(locator).toBeVisible() failed
  45 |   });
  46 | 
  47 |   test('login with empty fields', async () => {
  48 |     await authPage.login('', '', { expectSuccess: false });
  49 |     await expect(authPage.keywordInput).toHaveAttribute('aria-invalid', 'true');
  50 |     await expect(authPage.passwordInput).toHaveAttribute('aria-invalid', 'true');
  51 |   });
  52 | 
  53 |   test('try login with ROLE SUPERVISOR', async () => {
  54 |     const supervisorCreds = config.getAccountByLoginType(getSupervisorAccountKey(config.env.name), config.env.name);
  55 |     await authPage.login(supervisorCreds.identifier, supervisorCreds.password, { useV2: true });
  56 |     await expect(authPage.page).toHaveURL(/\/id\/conversation\/your-inbox/);
  57 |   });
  58 | 
  59 |   test('try login with ROLE AGENT', async () => {
  60 |     const agentCreds = config.getAccountByLoginType(getAgentAccountKey(config.env.name), config.env.name);
  61 |     await authPage.login(agentCreds.identifier, agentCreds.password, { useV2: true });
  62 |     await expect(authPage.page).toHaveURL(/\/id\/conversation\/your-inbox/);
  63 |   });
  64 | 
  65 |   test('Confirm that the access token truly becomes invalid after 15 minutes', async () => {
  66 |     const credentials = config.getDefaultAccount();
  67 |     await authPage.login(credentials.identifier, credentials.password, { useV2: true });
  68 |     await authPage.page.waitForTimeout(900000); // 15 minutes
  69 |     await authPage.page.reload();
  70 |     await expect(authPage.page).toHaveURL(/\/login/);
  71 |   });
  72 | });
  73 | 
```