const { expect } = require('@playwright/test');
const { getConfig } = require('../config');

class UserRbacPage {
  constructor(page) {
    this.page = page;

    this.settingNav = page.getByTestId('nav-link-Settings').or(page.getByText('Settings'));
    this.kelolaTimNav = page.getByTestId('nav-link-Settings-Kelola Tim');
    this.akunWhatsappNav = page.getByTestId('nav-link-Settings-Akun Whatsapp');
    this.jamKerjaNav = page.getByTestId('nav-link-Settings-Jam Kerja');
    this.templatePesanNav = page.getByTestId('nav-link-Settings-Template Pesan');
    this.broadcastNav = page.getByTestId('nav-link-Broadcast');
    this.broadcastRiwayatNav = page.getByTestId('nav-link-Broadcast-Riwayat');
    this.broadcastTemplateNav = page.getByTestId('nav-link-Broadcast-Template');
    this.dashboardNav = page.getByTestId('nav-link-Dashboard');
    this.inboxNav = page.getByTestId('nav-link-Inbox');
    this.contactNav = page.getByTestId('nav-link-Contact');

    this.kelolaTimHeadLabel = page.getByTestId('kelola-tim-head-label');
    this.broadcastLabelHeadOnDashboard = page.getByText('Broadcast');
    this.broadcastFilterHeadOnDashboard = page.getByTestId('broadcast-filter-head-dashboard');
    this.broadcastTitleOnDashboard = page.getByText('Total Broadcast');
    this.broadcastResultOnDashboard = page.getByTestId('broadcast-result-dashboard');
    this.broadcastButtonOnDashboard = page.getByTestId('broadcast-button-dashboard');
    this.broadcastCardOnDashboardSuccess = page.getByTestId('broadcast-card-dashboard-success');
    this.broadcastCardOnDashboardPending = page.getByTestId('broadcast-card-dashboard-pending');
    this.broadcastCardOnDashboardFailed = page.getByTestId('broadcast-card-dashboard-failed');
    this.broadcastCardOnDashboardInbound = page.getByTestId('broadcast-card-dashboard-inbound');
    this.broadcastFilterPerAccountOndashboard = page.getByTestId('broadcast-filter-per-account-dashboard');

    this.broadcastTicketPerformanceTotal = page.getByTestId('broadcast-ticket-performance-total');
    this.broadcastTicketPerformanceSolved = page.getByTestId('broadcast-ticket-performance-solved');
    this.broadcastTicketPerformanceUnsolved = page.getByTestId('broadcast-ticket-performance-unsolved');
    this.broadcastTicketPerformanceAvgReply = page.getByTestId('broadcast-ticket-performance-avg-reply');
    this.broadcastTicketPerformanceAvgSolve = page.getByTestId('broadcast-ticket-performance-avg-solve');

    this.tabAgentPerformaTotalcase = page.getByRole('tab', { name: 'Total Case' });
    this.tabAgentPerformaPerAgent = page.getByRole('tab', { name: 'Per Agent' });

    this.chatList = page.getByTestId(/^chat-list-/);
    this.emptyStateChatListInbox = page.locator('div.mt-3.flex.flex-col.items-center.justify-center.space-y-3').getByText('Belum Ada Pesan');

    this.ongoingTab = page.getByTestId('inbox-tab-ongoing');
    this.unassignedTab = page.getByTestId('inbox-tab-unassigned');
    this.resolvedTab = page.getByTestId('inbox-tab-resolved');

    this.manageTeamModal = page.getByRole('dialog', { name: 'Tambah Anggota' });
  }

  async goto() {
    await this.page.goto('/settings/organization/members');
  }

  generateRandomId2() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  generateRandomAWB2() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }

  formatCustomerNumber(customerNumber) {
    return customerNumber.toString().replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, '$1 $2 $3 $4');
  }

  async accessPageAsAdmin() {
    await expect.soft(this.dashboardNav).toBeVisible();
    await expect.soft(this.inboxNav).toBeVisible();
    await expect.soft(this.contactNav).toBeVisible();

    const url = this.page.url();
    const config = getConfig();

    if (url.includes(config.pagePaths.visitUser)) {
      await expect.soft(this.kelolaTimHeadLabel).toBeVisible();
    } else {
      await this.settingNav.click();
      await expect.soft(this.akunWhatsappNav).toBeVisible();
      await expect.soft(this.jamKerjaNav).toBeVisible();
      await expect.soft(this.templatePesanNav).toBeVisible();
    }

    if (url.includes(config.pagePaths.visitBroadcast)) {
      await expect.soft(this.broadcastLabelHeadOnDashboard).toBeVisible();
    } else if (url.includes(config.pagePaths.visitTemplate)) {
      await this.broadcastRiwayatNav.click();
    } else {
      await this.broadcastNav.click();
      await expect.soft(this.broadcastRiwayatNav).toBeVisible();
      await expect.soft(this.broadcastTemplateNav).toBeVisible();
    }
  }

  async accessPageAsAgent() {
    await expect.soft(this.inboxNav).toBeVisible();
    await expect.soft(this.contactNav).toBeVisible();

    const url = this.page.url();
    const config = getConfig();

    if (url.includes(config.pagePaths.visitUser)) {
      await expect.soft(this.kelolaTimHeadLabel).toBeVisible();
    } else {
      await this.settingNav.click();
      await expect.soft(this.akunWhatsappNav).toBeVisible();
      await expect.soft(this.jamKerjaNav).toBeVisible();
      await expect.soft(this.templatePesanNav).toBeVisible();
    }

    if (url.includes(config.pagePaths.visitBroadcast)) {
      await expect.soft(this.broadcastLabelHeadOnDashboard).toBeVisible();
    } else {
      await this.broadcastNav.click();
      await expect.soft(this.broadcastRiwayatNav).toBeVisible();
    }
  }
}

module.exports = { UserRbacPage };
