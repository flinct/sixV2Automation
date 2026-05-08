const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;

    this.dashboardNav = page.getByTestId('nav-link-Dashboard').or(page.getByText('Dashboard'));
    this.dateFilter = page.getByTestId('dashboard-date-filter');
    this.divisionFilter = page.getByTestId('dashboard-division-filter');
    this.groupFilter = page.getByTestId('dashboard-group-filter');

    this.totalBroadcastCard = page.getByText('Total Broadcast');
    this.broadcastSuccessCard = page.getByTestId('broadcast-card-success');
    this.broadcastPendingCard = page.getByTestId('broadcast-card-pending');
    this.broadcastFailedCard = page.getByTestId('broadcast-card-failed');
    this.broadcastInboundCard = page.getByTestId('broadcast-card-inbound');

    this.agentPerformanceTab = page.getByRole('tab', { name: 'Total Case' });
    this.perAgentTab = page.getByRole('tab', { name: 'Per Agent' });

    this.totalCaseValue = page.getByTestId('agent-performance-total-case-value');
    this.totalCaseUnassign = page.getByTestId('agent-performance-unassign');
    this.totalCaseOpen = page.getByTestId('agent-performance-open');
    this.totalCaseResolved = page.getByTestId('agent-performance-resolved');

    this.messagesSentValue = page.getByTestId('agent-performance-messages-sent');
    this.messagesReceivedValue = page.getByTestId('agent-performance-messages-received');
    this.activeCustomerValue = page.getByTestId('agent-performance-active-customer');
    this.averageResolveValue = page.getByTestId('agent-performance-average-resolve');
    this.activeAgentValue = page.getByTestId('agent-performance-active-agent');
  }

  async goto() {
    await this.page.goto('/statistic');
  }

  async navigateToDashboard() {
    await this.dashboardNav.click();
  }

  async verifyDashboardElements() {
    await expect.soft(this.dashboardNav).toHaveClass(/text-primary/);
    await expect.soft(this.dateFilter).toBeVisible();
    await expect.soft(this.divisionFilter).toBeVisible();
    await expect.soft(this.groupFilter).toBeVisible();
    await expect.soft(this.totalBroadcastCard).toBeVisible();
    await expect.soft(this.broadcastSuccessCard).toBeVisible();
    await expect.soft(this.broadcastPendingCard).toBeVisible();
    await expect.soft(this.broadcastFailedCard).toBeVisible();
    await expect.soft(this.broadcastInboundCard).toBeVisible();
  }
}

module.exports = { DashboardPage };
