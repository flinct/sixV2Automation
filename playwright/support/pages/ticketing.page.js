const { expect } = require('@playwright/test');

class TicketingPage {
  constructor(page) {
    this.page = page;

    this.ticketNav = page.getByTestId('nav-link-Ticket').or(page.getByText('Ticketing'));

    this.headLabel = page.getByTestId('monitoring-ticket-head-label');
    this.moreActionButton = page.getByTestId('monitoring-ticket-more-action');
    this.createTicketButton = page.getByTestId('monitoring-ticket-create-ticket');

    this.newTicketCounter = page.getByTestId('monitoring-ticket-new-ticket');
    this.allTicketCounter = page.getByTestId('monitoring-ticket-all-ticket');
    this.needResponseCounter = page.getByTestId('monitoring-ticket-need-response');
    this.beingHandledCounter = page.getByTestId('monitoring-ticket-being-handled');
    this.overSLACounter = page.getByTestId('monitoring-ticket-over-sla');
    this.solvedTicketCounter = page.getByTestId('monitoring-ticket-solved');

    this.searchbar = page.getByTestId('searchbar-at-ticket');
    this.filterByCourier = page.getByTestId('filter-by-courier');
    this.dateFilter = page.getByTestId('date-filter-ticket');
    this.filterTicketList = page.getByTestId('filter-ticket-list');
    this.filterKendala = page.getByTestId('ticket-list-filter-kendala');

    this.ticketListCheckbox = page.getByTestId('ticket-list-table-heading-checkbox');
    this.ticketListAwb = page.getByTestId('ticket-list-awb');
    this.ticketListKendala = page.getByTestId('ticket-list-kendala');
    this.ticketListSLA = page.getByTestId('ticket-list-sla');
    this.ticketListManifestDate = page.getByTestId('ticket-list-manifest-date');
    this.ticketListDestinasi = page.getByTestId('ticket-list-destinasi');
    this.ticketListTracking = page.getByTestId('ticket-list-tracking');

    this.ticketListCheckboxItem = page.getByTestId('ticket-list-checkbox');
    this.ticketListKurirLogo = page.getByTestId('ticket-list-kurir-logo');
    this.ticketListAwbNumber = page.getByTestId('ticket-list-awb-number');
    this.ticketListDeskripsiKendala = page.getByTestId('ticket-list-deskripsi-kendala');
    this.ticketListSLAValue = page.getByTestId('ticket-list-sla-value');
    this.ticketListManifestDateValue = page.getByTestId('ticket-list-manifest-date-value');
    this.ticketListDestinasiValue = page.getByTestId('ticket-list-destinasi-value');
    this.ticketListLastTracking = page.getByTestId('ticket-list-last-tracking');
    this.ticketListLastTrackingButton = page.getByTestId('ticket-list-last-tracking-button');
    this.ticketListSellerName = page.getByTestId('ticket-list-seller-name');
    this.ticketListSellerPhone = page.getByTestId('ticket-list-seller-phone');
    this.ticketListTicketId = page.getByTestId('ticket-list-ticket-id');
    this.ticketListPriority = page.getByTestId('ticket-list-priority');
    this.ticketListCreatedAt = page.getByTestId('ticket-list-created-at');
    this.ticketListAgentHandler = page.getByTestId('ticket-list-agent-handler');
    this.ticketListButtonTindakLanjuti = page.getByTestId('ticket-list-button-tindak-lanjuti');
    this.ticketListButtonViewTicket = page.getByTestId('ticket-list-button-view-ticket');
    this.ticketListButtonSolveTicket = page.getByTestId('ticket-list-button-solve');
  }

  async goto() {
    await this.page.goto('/ticketing');
  }

  async navigateToTicketingPage() {
    await this.ticketNav.click();
  }

  async verifyTicketingElements() {
    await expect.soft(this.headLabel).toBeVisible();
    await expect.soft(this.moreActionButton).toBeVisible();
    await expect.soft(this.createTicketButton).toBeVisible();
    await expect.soft(this.newTicketCounter).toBeVisible();
    await expect.soft(this.allTicketCounter).toBeVisible();
    await expect.soft(this.needResponseCounter).toBeVisible();
    await expect.soft(this.searchbar).toBeVisible();
    await expect.soft(this.filterByCourier).toBeVisible();
    await expect.soft(this.dateFilter).toBeVisible();
  }
}

module.exports = { TicketingPage };
