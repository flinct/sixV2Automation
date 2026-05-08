# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\auth\login.spec.js >> Auth Login Tests >> valid login with admin credentials
- Location: playwright\tests\e2e\auth\login.spec.js:35:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
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
          - textbox "Masukan password" [ref=e34]: asdqwe12
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
  1   | const { expect } = require('@playwright/test');
  2   | 
  3   | class AuthPage {
  4   |   constructor(page) {
  5   |     this.page = page;
  6   | 
  7   |     this.logo = page.getByTestId('Satuinbox-Logo');
  8   | 
  9   |     this.keywordInput = page.getByTestId('Keyword-Input');
  10  |     this.passwordInput = page.getByTestId('Password-Input');
  11  |     this.loginButton = page.getByTestId('Login-Submit-Button');
  12  |     this.showPasswordButton = page.getByTestId('Show-Password');
  13  | 
  14  |     this.resetPasswordLink = page.locator('a[href="/reset-password"]');
  15  |     this.registerLink = page.locator('a[href="/register"]');
  16  | 
  17  |     this.loginForm = page.getByTestId('Login-Form');
  18  |     this.loginTitle = this.logo.locator('..').locator('p');
  19  | 
  20  |     this.regFullname = page.locator('#fullname');
  21  |     this.regUsername = page.locator('#username');
  22  |     this.regEmail = page.locator('#email');
  23  |     this.regPhone = page.locator('#phone');
  24  |     this.regPassword = page.locator('#password');
  25  |     this.regPasswordConfirm = page.getByTestId('Re-Enter-Password-Input');
  26  |     this.registerButton = page.getByRole('button', { name: 'Daftar' });
  27  | 
  28  |     this.successRegisterTitle = this.logo.locator('..').getByText(/Periksa email Anda untuk melanjutkan/i);
  29  |     this.resendEmailButton = page.getByRole('button', { name: 'Kirim Ulang Email' });
  30  | 
  31  |     this.sidebar = page.getByTestId('Sidebar-Navigation');
  32  |     this.logoutButton = this.sidebar.locator('div').nth(2);
  33  |   }
  34  | 
  35  |   async gotoLogin() {
  36  |     await this.page.goto('/login');
  37  |   }
  38  | 
  39  |   async gotoLoginV2() {
  40  |     await this.page.goto('/id/login');
  41  |   }
  42  | 
  43  |   async gotoRegister() {
  44  |     await this.page.goto('/register');
  45  |   }
  46  | 
  47  |   async gotoRegisterV2() {
  48  |     await this.page.goto('/id/register');
  49  |   }
  50  | 
  51  |   async login(identifier, password, options = {}) {
  52  |     const { useV2 = false, expectSuccess = true } = options;
  53  | 
  54  |     if (useV2) {
  55  |       await this.gotoLoginV2();
  56  |     } else {
  57  |       await this.gotoLogin();
  58  |     }
  59  | 
  60  |     await this.keywordInput.fill(identifier);
  61  |     await this.passwordInput.fill(password);
  62  |     await this.loginButton.click();
  63  | 
  64  |     if (expectSuccess) {
> 65  |       await this.page.waitForURL(/\/conversation\/your-inbox/, { timeout: 15000 });
      |                       ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  66  |     }
  67  |   }
  68  | 
  69  |   async loginWithCredentials(credentials, options = {}) {
  70  |     return this.login(credentials.identifier, credentials.password, options);
  71  |   }
  72  | 
  73  |   async logout() {
  74  |     await this.logoutButton.click({ force: true });
  75  |     await this.page.getByText(/keluar|logout/i).click();
  76  |     await this.page.waitForURL(/\/login/);
  77  |   }
  78  | 
  79  |   async verifyLoginPageElements() {
  80  |     await expect(this.logo).toBeVisible();
  81  |     await expect(this.keywordInput).toBeVisible();
  82  |     await expect(this.passwordInput).toBeVisible();
  83  |     await expect(this.loginButton).toBeVisible();
  84  |   }
  85  | 
  86  |   async register(userData, options = {}) {
  87  |     const { useV2 = false } = options;
  88  |     const { fullname, username, email, phone, password } = userData;
  89  | 
  90  |     if (useV2) {
  91  |       await this.gotoRegisterV2();
  92  |     } else {
  93  |       await this.gotoRegister();
  94  |     }
  95  | 
  96  |     if (fullname) await this.regFullname.fill(fullname);
  97  |     if (username) await this.regUsername.fill(username);
  98  |     if (email) await this.regEmail.fill(email);
  99  |     if (phone) await this.regPhone.fill(phone);
  100 |     if (password) {
  101 |       await this.regPassword.fill(password);
  102 |       await this.regPasswordConfirm.fill(password);
  103 |     }
  104 | 
  105 |     await this.registerButton.click();
  106 |   }
  107 | 
  108 |   async verifySuccessfulRegister() {
  109 |     await expect(this.successRegisterTitle).toBeVisible();
  110 |   }
  111 | 
  112 |   generateRandomTestData(prefix = 'test') {
  113 |     const timestamp = Date.now();
  114 |     const randomNum = Math.floor(Math.random() * 100000);
  115 | 
  116 |     return {
  117 |       fullname: `${prefix} User ${timestamp}`,
  118 |       username: `${prefix}user${timestamp}`,
  119 |       email: `${prefix}${timestamp}@testmail.com`,
  120 |       phone: `08${Math.floor(Math.random() * 90000000) + 10000000}`,
  121 |       password: 'Asdqwe12@',
  122 |     };
  123 |   }
  124 | }
  125 | 
  126 | module.exports = { AuthPage };
  127 | 
```