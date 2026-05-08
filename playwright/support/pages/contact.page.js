const { expect } = require('@playwright/test');

class ContactPage {
  constructor(page) {
    this.page = page;

    this.contactNav = page.getByTestId('nav-link-Contact').or(page.getByText('Contact'));

    this.headLabel = page.getByTestId('contact-head-label');
    this.subLabel = page.getByTestId('contact-sub-label');
    this.tabContact = page.getByTestId('contact-tab-contact');
    this.tabBlock = page.getByTestId('contact-tab-block');

    this.searchbar = page.getByTestId('contact-searchbar');
    this.dateFilter = page.getByTestId('contact-date-filter');
    this.comboFilter = page.getByTestId('contact-combo-filter');

    this.cellNameCustomer = page.getByTestId(/^cell-name_customer-/);
    this.cellCreatedAt = page.getByTestId(/^cell-createdAt-/);
    this.cellWhatsapp = page.getByTestId(/^cell-whatsapp-/);
    this.cellNameDivision = page.getByTestId(/^cell-name_division-/);
    this.cellLabel = page.getByTestId(/^cell-label-/);
    this.cellRoomHistory = page.getByTestId(/^cell-roomHistory-/);
    this.cellActions = page.getByTestId(/^cell-actions-/);

    this.cellActionsUpdate = page.getByTestId(/^contact-table-actions-update-/);
    this.cellActionsDelete = page.getByTestId(/^contact-table-actions-elipsis-/);
    this.cellActionsDeleteButton = page.getByText('Delete');

    this.modalUpdateCustomer = page.getByRole('dialog', { name: 'Update Customer' });
    this.modalDelete = page.getByRole('dialog', { name: 'Delete' });
    this.modalDeleteHapus = page.getByRole('button', { name: 'Hapus' });
    this.modalDeleteBatal = page.getByRole('button', { name: 'Batal' });
  }

  async goto() {
    await this.page.goto('/contact');
  }

  async navigateToContactPage() {
    await this.contactNav.click();
  }

  async verifyContactElements() {
    await expect.soft(this.headLabel).toContainText('Contact');
    await expect.soft(this.subLabel).toContainText('Semua Kontak');
    await expect.soft(this.searchbar).toBeVisible();
    await expect.soft(this.dateFilter).toBeVisible();
    await expect.soft(this.comboFilter).toBeVisible();
  }

  async searchContact(query) {
    await this.searchbar.fill(query);
  }

  async openUpdateModal(index = 0) {
    const updateBtn = this.cellActionsUpdate.nth(index);
    await updateBtn.click();
  }

  async openDeleteModal(index = 0) {
    const elipsisBtn = this.cellActionsDelete.nth(index);
    await elipsisBtn.click();
    await this.cellActionsDeleteButton.click();
  }
}

module.exports = { ContactPage };
