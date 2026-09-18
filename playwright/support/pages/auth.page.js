const { expect } = require('@playwright/test');

class AuthPage {
  constructor(page) {
    this.page = page;

    this.logo = page.getByTestId('Satuinbox-Logo');

    this.keywordInput = page.getByTestId('Keyword-Input');
    this.passwordInput = page.getByTestId('Password-Input');
    this.loginButton = page.getByTestId('Login-Submit-Button');
    this.showPasswordButton = page.getByTestId('Show-Password');

    this.resetPasswordLink = page.getByTestId('Reset-Password-Link');
    this.registerLink = page.getByTestId('Register-Link');

    this.loginForm = page.getByTestId('Login-Form');
    this.loginTitle = this.logo.locator('..').locator('p');
    this.loginErrorMessage = page.getByTestId('Auth-Error');
    this.keywordRequiredMessage = this.loginForm.getByText(/username atau email wajib diisi/i);
    this.passwordRequiredMessage = this.loginForm.getByText(/password minimal 8 karakter/i);

    // First-login workspace-setup screen: progress bar (random 15-45s) then a
    // "Buka workspace" button. FE has no data-cy for it yet (flow unmerged), so
    // target by role/text. ponytail: swap to getByTestId when FE adds a hook.
    this.workspaceSetupTitle = page.getByText(/Menyiapkan workspace Anda/i);
    this.openWorkspaceButton = page.getByRole('button', { name: /buka workspace/i });

    this.regFullname = page.getByTestId('Fullname-Input');
    this.regUsername = page.getByTestId('Username-Input');
    this.regEmail = page.getByTestId('Email-Input');
    this.regPhone = page.getByTestId('Phone-Input');
    this.regPassword = page.getByTestId('Password-Input');
    this.regPasswordConfirm = page.getByTestId('Re-Enter-Password-Input');
    this.registerButton = page.getByTestId('Register-Submit-Button');

    this.resetForm = page.getByTestId('Reset-Password-Form');
    this.resetEmailInput = page.getByTestId('Email-Input');
    this.resetSubmit = page.getByTestId('Reset-Password-Submit-Button');
    this.setNewPasswordForm = page.getByTestId('Set-New-Password-Form');
    this.setNewPasswordSubmit = page.getByTestId('Set-New-Password-Submit-Button');
    this.verifyEmailButton = page.getByTestId('Verify-Email-Button');

    this.regFullnameErrorMessage = this.regFullname.locator('..').getByText(/Nama lengkap minimal 3 karakter/i);
    this.regUsernameErrorMessage = this.regUsername.locator('..').getByText(/Nama pengguna minimal 6 karakter/i);
    this.regEmailErrorMessage = this.regEmail.locator('..').getByText(/Email wajib diisi/i);
    this.regPhoneErrorMessage = this.regPhone.locator('..').getByText(/Nomor telepon hanya boleh berisi angka/i);
    this.regPasswordErrorMessage = this.regPassword.locator('..').getByText(/Kata sandi minimal 8 karakter/i);
    this.regPasswordConfirmErrorMessage = this.regPasswordConfirm.locator('..').getByText(/Silakan masukkan kembali kata sandi Anda/i);

    this.successRegisterTitle = this.page.getByText(/Periksa email Anda untuk melanjutkan/i);
    this.resendEmailButton = page.getByRole('button', { name: 'Kirim Ulang Email' });

    this.sidebar = page.getByTestId('Sidebar-Navigation');
    this.userMenu = page.getByTestId('User-Menu');
    this.logoutButton = page.getByTestId('Logout-Button');
  }

  async gotoLogin() {
    await this.page.goto('/login');
  }

  async gotoLoginV2() {
    await this.page.goto('/id/login', { waitUntil: 'load', timeout: 30000 });
  }

  async gotoRegister() {
    await this.page.goto('/register');
  }

  async gotoRegisterV2() {
    await this.page.goto('/id/register', { waitUntil: 'domcontentloaded' });
    await this.registerButton.waitFor({ state: 'visible', timeout: 15000 });
  }

  async login(identifier, password, options = {}) {
    const { useV2 = false, expectSuccess = true } = options;

    if (useV2) {
      await this.gotoLoginV2();
    } else {
      await this.gotoLogin();
    }

    await this.keywordInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.keywordInput.fill(identifier);
    await this.passwordInput.fill(password);

    // Record the login API response without blocking on it: an empty-field submit
    // fires no request, so we must never await a response that will not arrive.
    let loginResponse = null;
    const onResponse = (r) => {
      if (/\/api\/auth\/login\b/.test(r.url()) && r.request().method() === 'POST') {
        loginResponse = r;
      }
    };
    this.page.on('response', onResponse);

    let outcome;
    try {
      await this.loginButton.click();

      // Long enough for first-login workspace progress (random 15-45s) + margin.
      // ponytail: 60s fixed; bump if BE progress duration ceiling changes.
      const NAV_TIMEOUT_MS = 60000;

      // Resolve the real UI outcome, whichever settles first.
      // Path A: returning user → direct nav
      // Path B: server error banner (wrong creds)
      // Path C: client-side required-field validation (empty submit)
      // Path D: first-login workspace setup → progress bar (15-45s) → "Buka workspace" button → nav
      // Playwright waitFor polls internally, satisfies "check every second".
      outcome = await Promise.race([
        this.page
          .waitForURL(/\/conversation\/your-inbox/, { timeout: NAV_TIMEOUT_MS })
          .then(() => 'success')
          .catch(() => null),
        this.loginErrorMessage
          .waitFor({ state: 'visible', timeout: NAV_TIMEOUT_MS })
          .then(() => 'failed')
          .catch(() => null),
        Promise.race([
          this.keywordRequiredMessage.waitFor({ state: 'visible', timeout: NAV_TIMEOUT_MS }),
          this.passwordRequiredMessage.waitFor({ state: 'visible', timeout: NAV_TIMEOUT_MS }),
        ])
          .then(() => 'invalid')
          .catch(() => null),
        (async () => {
          try {
            await this.openWorkspaceButton.waitFor({ state: 'visible', timeout: NAV_TIMEOUT_MS });
            await this.openWorkspaceButton.click();
            await this.page.waitForURL(/\/conversation\/your-inbox/, { timeout: NAV_TIMEOUT_MS });
            return 'success';
          } catch {
            return null;
          }
        })(),
      ]);
    } finally {
      this.page.off('response', onResponse);
    }

    const uiErrorText =
      outcome === 'failed'
        ? (await this.loginErrorMessage.textContent().catch(() => null))
        : null;

    const result = {
      success: outcome === 'success',
      apiStatus: loginResponse ? loginResponse.status() : null,
      apiOk: loginResponse ? loginResponse.ok() : false,
      uiError: uiErrorText ? uiErrorText.trim() : null,
    };

    if (expectSuccess && !result.success) {
      throw new Error(
        `Login failed for "${identifier}": apiStatus=${result.apiStatus}, ` +
          `apiOk=${result.apiOk}, uiError=${JSON.stringify(result.uiError)}`
      );
    }

    return result;
  }

  async loginWithCredentials(credentials, options = {}) {
    return this.login(credentials.identifier, credentials.password, options);
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
    await this.page.waitForURL(/\/login/);
  }

  async verifyLoginPageElements() {
    await expect(this.logo).toBeVisible();
    await expect(this.keywordInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginErrorMessage() {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async verifyEmptyLoginValidation() {
    await expect(this.keywordRequiredMessage).toBeVisible();
    await expect(this.passwordRequiredMessage).toBeVisible();
    await expect(this.keywordInput).toHaveClass(/border-red-600/);
    await expect(this.passwordInput).toHaveClass(/border-red-600/);
  }

  async register(userData, options = {}) {
    const { useV2 = false } = options;
    const { fullname, username, email, phone, password } = userData;

    if (useV2) {
      await this.gotoRegisterV2();
    } else {
      await this.gotoRegister();
    }

    if (fullname) await this.regFullname.fill(fullname);
    if (username) await this.regUsername.fill(username);
    if (email) await this.regEmail.fill(email);
    if (phone) await this.regPhone.fill(phone);
    if (password) {
      await this.regPassword.fill(password);
      await this.regPasswordConfirm.fill(password);
    }

    await this.registerButton.click();
  }

  async verifySuccessfulRegister() {
    await expect(this.successRegisterTitle).toBeVisible();
  }

  generateRandomTestData(prefix = 'test') {
    const timestamp = Date.now();

    return {
      fullname: `${prefix} User ${timestamp}`,
      username: `${prefix}user${timestamp}`,
      email: `${prefix}${timestamp}@testmail.com`,
      phone: `08${Math.floor(Math.random() * 90000000) + 10000000}`,
      password: process.env.E2E_TEMP_PASSWORD || 'TestPassword1!',
    };
  }
}

module.exports = { AuthPage };
