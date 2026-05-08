const { expect } = require('@playwright/test');

class AccountWhatsappPage {
  constructor(page) {
    this.page = page;

    this.ticketNav = page.getByTestId('nav-link-Ticket').or(page.getByText('Ticketing'));
    this.groupNav = page.getByTestId('nav-link-Group').or(page.getByText('Group'));

    this.userLoginNameLabel = page.getByTestId('user-login-name-label');

    this.monitoringTicketSection = page.getByTestId('monitoring-ticket-section');
    this.monitoringTicketHeadLabel = page.getByTestId('monitoring-ticket-head-label');
    this.monitoringTicketMoreAction = page.getByTestId('monitoring-ticket-more-action');
    this.monitoringTicketCreateTicket = page.getByTestId('monitoring-ticket-create-ticket');

    this.statusAkunWhatsapp = page.getByTestId('cell-used-account-status-3');
    this.loginAkunWhatsapp = page.getByTestId('login-account-1');
  }

  async goto() {
    await this.page.goto('/settings/channels/whatsapp-web');
  }

  async verifyAccountWhatsappPage() {
    await expect.soft(this.userLoginNameLabel).toBeVisible();
    await expect.soft(this.monitoringTicketSection).toBeVisible();
  }

  async navigateToAccountWhatsappPage() {
    await this.groupNav.click();
  }

  async getInstanceInfo(apiRequest, config, loginBody) {
    const loginResponse = await apiRequest.post(config.endpoints.loginUrl, {
      data: loginBody,
    });
    const loginData = await loginResponse.json();
    const accessToken = loginData.tokens.access.token;

    const instanceResponse = await apiRequest.get(
      `${config.endpoints.instanceInfo}${config.parentNumber}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return instanceResponse.json();
  }

  async verifyStatusAccountWhatsapp() {
    const statusElement = this.statusAkunWhatsapp;
    await expect(statusElement).toContainText('Aktif');
  }

  async clickLoginAccountWhatsapp() {
    await this.loginAkunWhatsapp.click();
  }
}

module.exports = { AccountWhatsappPage };
