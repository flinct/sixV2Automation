const { expect } = require('@playwright/test');

class MemberPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.getByRole('heading', { name: /Member|Anggota/i });
    this.addMemberBtn = page.getByTestId('Add-Member');
    this.tabMember = page.getByTestId('Tabs-0');
    this.tabInvited = page.getByTestId('Tabs-1');
    this.searchInput = page.locator('input[placeholder*="Search" i], input[placeholder*="Cari" i]');

    this.statusBadgeAktif = page.locator('span:has-text("Aktif")').first();
    this.statusBadgeNonaktif = page.locator('span:has-text("Nonaktif")').first();
    this.memberRow = (name) => page.locator(`span.font-medium:has-text("${name}")`).locator('..').locator('..');
    this.memberRows = page.locator('table tbody tr, div[role="row"]');
    this.memberNames = page.locator('span.font-medium');

    this.dotsMenu = page.locator('button:has(svg.tabler-icon-dots)');
    this.deactivateOption = page.getByRole('menuitem', { name: /Nonaktifkan anggota|Deactivate member/i });
    this.activateOption = page.getByRole('menuitem', { name: /Aktifkan anggota|Activate member/i });
    this.changeRoleOption = page.getByRole('menuitem', { name: /Ganti Peran|Change Role/i });
    this.changeShiftOption = page.getByRole('menuitem', { name: /Ganti Shift|Change Shift/i });
    this.changePasswordOption = page.getByRole('menuitem', { name: /Ganti Password|Change Password/i });
    this.changeMaxConvOption = page.getByRole('menuitem', { name: /Max Conversation/i });
    this.removeMemberOption = page.getByRole('menuitem', { name: /Hapus Anggota|Remove Member/i });

    this.confirmModal = page.locator('[role="dialog"]');
    this.confirmModalTitle = this.confirmModal.locator('h2').first();
    this.confirmBtn = this.confirmModal.getByRole('button', { name: /Nonaktifkan|Aktifkan|Ya|Confirm/i });
    this.cancelBtn = this.confirmModal.getByRole('button', { name: /Batal|Cancel/i });

    this.toast = page.locator('[role="status"], [data-sonner-toast]').first();
    this.deactivateToast = page.getByText(/berhasil dinonaktifkan/i);
    this.activateToast = page.getByText(/berhasil diaktifkan/i);
    this.errorToast = page.getByText(/Gagal|gagal|Error/i);

    this.preservationNote = page.getByText(/anggota tetap terdaftar|tetap terdaftar di tim/i);
    this.activateNote = page.getByText(/akan dapat masuk kembali|dapat login kembali/i);

    this.inviteModalEmail = page.locator('[placeholder*="email" i]');
    this.inviteBtn = page.getByTestId('Send-Invitation');
  }

  async goto() {
    await this.page.goto('/settings/organization/members', { waitUntil: 'load', timeout: 30000 });
    await expect(this.pageTitle).toBeVisible({ timeout: 15000 });
  }

  async gotoAssignableSearch() {
    await this.page.goto('/ticketing', { waitUntil: 'load', timeout: 30000 });
  }

  async clickRowMenu(index = 0) {
    await this.dotsMenu.nth(index).waitFor({ state: 'visible', timeout: 10000 });
    await this.dotsMenu.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  async toggleMemberStatus(memberIndex = 0) {
    await this.clickRowMenu(memberIndex);
    const toggleBtn = this.deactivateOption.or(this.activateOption);
    const isVisible = await toggleBtn.isVisible().catch(() => false);
    if (!isVisible) return 'not-found';
    const label = await toggleBtn.textContent();
    await toggleBtn.click();
    await expect(this.confirmModal).toBeVisible({ timeout: 5000 });
    return label.includes('Nonaktifkan') ? 'deactivate' : 'activate';
  }

  async confirmToggle() { await this.confirmBtn.click(); }
  async cancelToggle() { await this.cancelBtn.click(); }

  async verifyStatusBadge(expectedStatus) {
    const badge = this.page.locator(`span:has-text("${expectedStatus}")`).first();
    await expect(badge).toBeVisible({ timeout: 5000 });
  }

  async verifyToastSuccess(action) {
    if (action === 'deactivate') {
      await expect(this.deactivateToast).toBeVisible({ timeout: 8000 });
    } else {
      await expect(this.activateToast).toBeVisible({ timeout: 8000 });
    }
  }

  async getFirstMemberName() {
    return this.memberNames.first().textContent();
  }

  async searchMember(query) {
    await this.searchInput.fill(query);
    await this.page.waitForTimeout(1500);
  }

  async getMemberCount() {
    return this.memberNames.count();
  }

  async getRowCount() {
    return this.memberRows.count();
  }

  async openChangeRoleModal(memberIndex = 0) {
    await this.clickRowMenu(memberIndex);
    await this.changeRoleOption.click();
    await expect(this.confirmModal).toBeVisible({ timeout: 5000 });
  }

  async openRemoveMemberModal(memberIndex = 0) {
    await this.clickRowMenu(memberIndex);
    await this.removeMemberOption.click();
    await expect(this.confirmModal).toBeVisible({ timeout: 5000 });
  }
}

module.exports = { MemberPage };
