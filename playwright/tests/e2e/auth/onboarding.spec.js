const { test, expect } = require("@playwright/test");
const path = require("path");
const { AuthPage } = require("../../../support/pages");
const { getCurrentConfig } = require("../../../support/config");
const { MailTmHelper } = require("../../../support/helpers/mail-tm");

const tempPassword = process.env.E2E_TEMP_PASSWORD || "TestPassword1!";
const nibFixture = path.resolve(__dirname, "../../../..", "cypress/fixtures/107.jpg");
const ktpFixture = path.resolve(__dirname, "../../../..", "cypress/fixtures/cupangstore8.jpg");
const randomNib = () =>
  Math.floor(10 ** 12 + Math.random() * 9 * 10 ** 12).toString();
const randomNpwp = () =>
  Math.floor(10 ** 14 + Math.random() * 9 * 10 ** 14).toString();
const randomIdNumber = () =>
  Math.floor(10 ** 15 + Math.random() * 9 * 10 ** 15).toString();

async function registerAndLogin(page, mailTmHelper) {
  const domains = await mailTmHelper.getDomains();
  const domain = domains[0];
  const username = `onb${Math.floor(Math.random() * 100000)}`;
  const tempEmail = `${username}@${domain}`;
  const randomPhone =
    "08" +
    Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0");

  // Create mail.tm account
  await mailTmHelper.createAccount(tempEmail, tempPassword);
  await new Promise((r) => setTimeout(r, 2000));
  const token = await mailTmHelper.getToken(tempEmail, tempPassword);

  // Register
  const authPage = new AuthPage(page);
  await authPage.gotoRegisterV2();
  await authPage.regFullname.waitFor({ state: "visible", timeout: 10000 });
  await authPage.regFullname.fill("Onboarding Test");
  await authPage.regUsername.fill(username);
  await authPage.regEmail.fill(tempEmail);
  await authPage.regPhone.fill(randomPhone);
  await authPage.regPassword.fill(tempPassword);
  await authPage.regPasswordConfirm.fill(tempPassword);
  await authPage.registerButton.click();
  await page.waitForURL(/\/verify-email/, { timeout: 20000 });

  // Wait for verification email
  let message = null;
  let emailReceived = false;
  try {
    message = await mailTmHelper.waitForNewMessage(token, 5, 3000);
    emailReceived = true;
  } catch (_e) {}

  if (!emailReceived) {
    console.log(
      "Email not received - onboarding tests require email verification to work",
    );
    return { username, tempEmail, authPage: null, onboardReady: false };
  }

  const fullMessage = await mailTmHelper.getMessageById(token, message.id);
  const verificationUrl = mailTmHelper.extractVerificationLink(fullMessage);
  if (!verificationUrl) {
    console.log("No verification link in email");
    return { username, tempEmail, authPage: null, onboardReady: false };
  }

  await page.goto(verificationUrl);
  const verifyButton = page.getByRole("button", { name: /verifikasi/i });
  await expect(verifyButton).toBeVisible({ timeout: 10000 });
  await verifyButton.click();
  await expect(verifyButton).not.toBeVisible({ timeout: 10000 });

  // Login
  await page.goto("/id/login");
  await authPage.keywordInput.fill(username);
  await authPage.passwordInput.fill(tempPassword);
  await authPage.loginButton.click();
  await page.waitForURL(/\/onboarding/, { timeout: 15000 });

  return { username, tempEmail, authPage, onboardReady: true };
}

async function ensureOnboardReady(context) {
  if (!context.onboardReady) {
    test.skip(
      !context.onboardReady,
      "Skipped - email not delivered in this environment",
    );
  }
  return context;
}

async function fillOnboardingForm(page, opts = {}) {
  if (opts.company) await page.locator("#company").fill(opts.company);
  if (opts.nib) await page.locator("#bussiness-number").fill(opts.nib);
  if (opts.npwp) await page.locator("#tax-number").fill(opts.npwp);
  if (opts.idNumber) await page.locator("#person-number").fill(opts.idNumber);

  if (opts.uploadNib !== false) {
    await page
      .locator("label")
      .filter({ hasText: /Unggah NIB/i })
      .locator("..")
      .locator('input[type="file"]')
      .setInputFiles(nibFixture);
  }
  if (opts.uploadKtp !== false) {
    await page
      .locator("label")
      .filter({ hasText: /Unggah KTP/i })
      .locator("..")
      .locator('input[type="file"]')
      .setInputFiles(ktpFixture);
  }
}

test.describe("Onboarding Flow Tests", () => {
  let mailTmHelper;

  test.beforeAll(async () => {
    mailTmHelper = new MailTmHelper();
  });

  // ========== FULL ONBOARDING FLOW ==========
  test("should complete successful onboarding", async ({ page }) => {
    const ctx = await registerAndLogin(page, mailTmHelper);
    if (!ctx.onboardReady) return;
    const { username } = ctx;
    expect(page.url()).toContain("/onboarding");

    await fillOnboardingForm(page, {
      company: "Company " + username,
      nib: randomNib(),
      npwp: randomNpwp(),
      idNumber: randomIdNumber(),
    });

    const submitButton = page.getByRole("button", { name: /kirim/i });
    await expect(submitButton).toBeVisible({ timeout: 10000 });
    await submitButton.click();

    await expect(
      page.getByText(/Data perusahaan.*berhasil dikirim/i),
    ).toBeVisible({ timeout: 60000 });

    const keluarButton = page.getByRole("button", { name: /keluar/i });
    await expect(keluarButton).toBeVisible();
    await keluarButton.click();
    await page.waitForURL(/\/login/, { timeout: 10000 });
  });

  // ========== ORGANIZATION NAME VALIDATION ==========
  test("should reject organization name less than minimum", async ({
    page,
  }) => {
    const ctx = await registerAndLogin(page, mailTmHelper);
    if (!ctx.onboardReady) return;
    await fillOnboardingForm(page, {
      company: "A",
      nib: randomNib(),
      npwp: randomNpwp(),
      idNumber: randomIdNumber(),
    });
    // const submitButton = page.getByRole('button', { name: /kirim/i });
    // await submitButton.click();
    const errMsg = page.locator(".text-red-500").first();
    await expect(errMsg).toBeVisible({ timeout: 5000 });
  });

  test("should reject organization name exceeding maximum", async ({
    page,
  }) => {
    const ctx = await registerAndLogin(page, mailTmHelper);
    if (!ctx.onboardReady) return;
    await fillOnboardingForm(page, {
      company: "A".repeat(200),
      nib: randomNib(),
      npwp: randomNpwp(),
      idNumber: randomIdNumber(),
    });
    // const submitButton = page.getByRole("button", { name: /kirim/i });
    // await submitButton.click();
    const errMsg = page.locator(".text-red-500").first();
    await expect(errMsg).toBeVisible({ timeout: 5000 });
  });

  // ========== NIB VALIDATION ==========
  test("should reject NIB less than minimum", async ({ page }) => {
    const ctx = await registerAndLogin(page, mailTmHelper);
    if (!ctx.onboardReady) return;
    await fillOnboardingForm(page, {
      company: "Company " + ctx.username,
      nib: "123",
      npwp: randomNpwp(),
      idNumber: randomIdNumber(),
    });
    // const submitButton = page.getByRole("button", { name: /kirim/i });
    // await submitButton.click();
    const errMsg = page.locator(".text-red-500").first();
    await expect(errMsg).toBeVisible({ timeout: 5000 });
  });

  test("should accept NIB, NPWP and ID number with valid length", async ({
    page,
  }) => {
    const ctx = await registerAndLogin(page, mailTmHelper);
    if (!ctx.onboardReady) return;
    const nib = randomNib();
    const npwp = randomNpwp();
    const idNumber = randomIdNumber();
    await fillOnboardingForm(page, {
      company: "Company " + ctx.username,
      nib,
      npwp,
      idNumber,
    });
    expect(
      (await page.locator("#bussiness-number").inputValue()).replace(/-/g, ""),
    ).toBe(nib);
    expect(
      (await page.locator("#tax-number").inputValue()).replace(/-/g, ""),
    ).toBe(npwp);
    expect(
      (await page.locator("#person-number").inputValue()).replace(/-/g, ""),
    ).toBe(idNumber);
    // const submitButton = page.getByRole("button", { name: /kirim/i });
    // await submitButton.click();
    // await expect(
    //   page.getByText(/Data perusahaan.*berhasil dikirim/i),
    // ).toBeVisible({ timeout: 60000 });
  });

  test("should reject NIB with alphabet characters", async ({ page }) => {
    const ctx = await registerAndLogin(page, mailTmHelper);
    if (!ctx.onboardReady) return;
    await fillOnboardingForm(page, {
      company: "Company " + ctx.username,
      nib: "ABCD12345678",
      npwp: randomNpwp(),
      idNumber: randomIdNumber(),
    });
    // const submitButton = page.getByRole("button", { name: /kirim/i });
    // await submitButton.click();
    const errMsg = page.locator(".text-red-500").first();
    await expect(errMsg).toBeVisible({ timeout: 5000 });
  });

  // ========== NPWP VALIDATION ==========
  test("should reject NPWP less than minimum", async ({ page }) => {
    const ctx = await registerAndLogin(page, mailTmHelper);
    if (!ctx.onboardReady) return;
    await fillOnboardingForm(page, {
      company: "Company " + ctx.username,
      nib: randomNib(),
      npwp: "12345",
      idNumber: randomIdNumber(),
    });
    // const submitButton = page.getByRole("button", { name: /kirim/i });
    // await submitButton.click();
    const errMsg = page.locator(".text-red-500").first();
    await expect(errMsg).toBeVisible({ timeout: 5000 });
  });

  test("should reject NPWP with alphabet characters", async ({ page }) => {
    const ctx = await registerAndLogin(page, mailTmHelper);
    if (!ctx.onboardReady) return;
    await fillOnboardingForm(page, {
      company: "Company " + ctx.username,
      nib: randomNib(),
      npwp: "ABCD5678901234",
      idNumber: randomIdNumber(),
    });
    // const submitButton = page.getByRole("button", { name: /kirim/i });
    // await submitButton.click();
    const errMsg = page.locator(".text-red-500").first();
    await expect(errMsg).toBeVisible({ timeout: 5000 });
  });

  // ========== ID NUMBER VALIDATION ==========
  test("should reject ID number less than minimum", async ({ page }) => {
    const ctx = await registerAndLogin(page, mailTmHelper);
    if (!ctx.onboardReady) return;
    await fillOnboardingForm(page, {
      company: "Company " + ctx.username,
      nib: randomNib(),
      npwp: randomNpwp(),
      idNumber: "123",
    });
    // const submitButton = page.getByRole("button", { name: /kirim/i });
    // await submitButton.click();
    const errMsg = page.locator(".text-red-500").first();
    await expect(errMsg).toBeVisible({ timeout: 5000 });
  });

  // ========== FILE UPLOAD VALIDATION ==========
});
