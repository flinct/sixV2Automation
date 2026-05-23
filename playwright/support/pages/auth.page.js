const { expect } = require('@playwright/test');

class AuthPage {
  constructor(page) {
    this.page = page;

    this.logo = page.getByTestId('Satuinbox-Logo');

    this.keywordInput = page.getByTestId('Keyword-Input');
    this.passwordInput = page.getByTestId('Password-Input');
    this.loginButton = page.getByTestId('Login-Submit-Button');
    this.showPasswordButton = page.getByTestId('Show-Password');

    this.resetPasswordLink = page.locator('a[href="/reset-password"]');
    this.registerLink = page.locator('a[href="/register"]');

    this.loginForm = page.getByTestId('Login-Form');
    this.loginTitle = this.logo.locator('..').locator('p');
    this.loginErrorMessage = this.loginForm.getByText(/email dan\/atau password salah|coba lagi|reset password/i);
    this.keywordRequiredMessage = this.loginForm.getByText(/username atau email wajib diisi/i);
    this.passwordRequiredMessage = this.loginForm.getByText(/password minimal 8 karakter/i);

    this.regFullname = page.locator('#fullname');
    this.regUsername = page.locator('#username');
    this.regEmail = page.locator('#email');
    this.regPhone = page.locator('#phone');
    this.regPassword = page.locator('#password');
    this.regPasswordConfirm = page.getByTestId('Re-Enter-Password-Input');
    this.registerButton = page.getByRole('button', { name: 'Daftar' });

    // Error messages for registration form - located relative to input fields
    this.regFullnameErrorMessage = this.regFullname.locator('..').getByText(/Nama lengkap minimal 3 karakter/i);
    this.regUsernameErrorMessage = this.regUsername.locator('..').getByText(/Nama pengguna minimal 6 karakter/i);
    this.regEmailErrorMessage = this.regEmail.locator('..').getByText(/Email wajib diisi/i);
    this.regPhoneErrorMessage = this.regPhone.locator('..').getByText(/Nomor telepon hanya boleh berisi angka/i);
    this.regPasswordErrorMessage = this.regPassword.locator('..').getByText(/Kata sandi minimal 8 karakter/i);
    this.regPasswordConfirmErrorMessage = this.regPasswordConfirm.locator('..').getByText(/Silakan masukkan kembali kata sandi Anda/i);

    this.successRegisterTitle = this.page.getByText(/Periksa email Anda untuk melanjutkan/i);
    this.resendEmailButton = page.getByRole('button', { name: 'Kirim Ulang Email' });

    this.sidebar = page.getByTestId('Sidebar-Navigation');
    this.logoutButton = this.sidebar.locator('div').nth(2);
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
      // Wait for the register form to be visible
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
    await this.loginButton.click();

    if (expectSuccess) {
      await this.page.waitForURL(/\/conversation\/your-inbox/, { timeout: 30000 });
    }
  }

  async loginWithCredentials(credentials, options = {}) {
    return this.login(credentials.identifier, credentials.password, options);
  }

  async logout() {
    await this.logoutButton.click({ force: true });
    await this.page.getByText(/keluar|logout/i).click();
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
    const randomNum = Math.floor(Math.random() * 100000);

    return {
      fullname: `${prefix} User ${timestamp}`,
      username: `${prefix}user${timestamp}`,
      email: `${prefix}${timestamp}@testmail.com`,
      phone: `08${Math.floor(Math.random() * 90000000) + 10000000}`,
      password: 'Asdqwe12@',
    };
  }
}

module.exports = { AuthPage };
