const { expect } = require('@playwright/test');
const { getConfig } = require('../config');
const generators = require('../helpers/generators');

class BroadcastPage {
  constructor(page) {
    this.page = page;

    this.broadcastNav = page.getByTestId('nav-link-Broadcast').or(page.getByText('Broadcast'));

    this.broadcastLabelHead = page.getByTestId('broadcast-label-head');
    this.broadcastFilterHead = page.getByTestId('broadcast-filter-head');
    this.broadcastTitleOnDashboard = page.getByText('Total Broadcast');
    this.broadcastResultOnDashboard = page.getByTestId('broadcast-result-dashboard');
    this.broadcastButtonOnDashboard = page.getByTestId('broadcast-button-dashboard');

    this.broadcastCardSuccess = page.getByTestId('broadcast-card-dashboard-success');
    this.broadcastCardPending = page.getByTestId('broadcast-card-dashboard-pending');
    this.broadcastCardFailed = page.getByTestId('broadcast-card-dashboard-failed');
    this.broadcastCardInbound = page.getByTestId('broadcast-card-dashboard-inbound');
    this.broadcastFilterPerAccount = page.getByTestId('broadcast-filter-per-account-dashboard');

    this.ticketPerformanceTotal = page.getByTestId('broadcast-ticket-performance-total');
    this.ticketPerformanceSolved = page.getByTestId('broadcast-ticket-performance-solved');
    this.ticketPerformanceUnsolved = page.getByTestId('broadcast-ticket-performance-unsolved');
    this.ticketPerformanceAvgReply = page.getByTestId('broadcast-ticket-performance-avg-reply');
    this.ticketPerformanceAvgSolve = page.getByTestId('broadcast-ticket-performance-avg-solve');
  }

  async goto() {
    await this.page.goto('/broadcast/messages');
  }

  async navigateToBroadcastPage() {
    await this.broadcastNav.click();
  }

  generateRandomMessage(sender = 'test') {
    const functions = [
      () => generators.generateRandomQuote(),
      () => generators.randomAsk(),
      () => generators.randomAsk2(),
      () => generators.randomAsk3(),
      () => generators.randomAsk4(),
      () => generators.randomAsk5(),
      () => generators.randomAsk6(),
      () => generators.randomAnswer(),
    ];
    const randomIndex = Math.floor(Math.random() * functions.length);
    const randomValue = functions[randomIndex]();
    return {
      name: `bcName sender ${sender}`,
      channel: 'whatsapp_web',
      sender: sender,
      audience: ['6289655057778'],
      message: `${randomValue}, test BC from ${sender}`,
      scheduleAt: '2026-02-04T22:00:31.198Z',
      properties: [{
        contactName: '{{randomContact}}',
        AirwayBill: '{{awbNumber}}',
        awbNumber: '{{awbNumber}}',
        awb: '{{awbNumber}}',
        proofOfDeliveryNo: '{{awbNumber}}',
        scheduleVar: '{{scheduleAtVariation}}',
        scheduleAt: '{{scheduleAt}}',
        value: randomValue,
        reasonPOD: 'reason',
      }],
    };
  }

  async getWhatsappAccounts(apiRequest, config) {
    const response = await apiRequest.get(config.endpoints.getAllNomorWhatsapp, {
      headers: { 'x-api-key': '10f1d5e1eb1ea0cb632f2d02edf2ccf896efb73123e7b3f484db5cb52a19dbc6' },
    });
    const data = await response.json();
    const whatsappAccount = [];
    const inactiveAccounts = [];

    if (data.items) {
      for (const item of data.items) {
        if (item.accountChannels && Array.isArray(item.accountChannels)) {
          const waChannel = item.accountChannels.find(
            (channel) =>
              channel.platform === 'Whatsapp Web' &&
              channel.connectionStatus === 'active' &&
              channel.accountStatus === 'used'
          );
          if (waChannel) {
            whatsappAccount.push({
              name: item.name,
              accountChannelName: waChannel.name,
              phoneNumber: waChannel.phoneNumber,
            });
          }
          const inactiveChannel = item.accountChannels.find(
            (channel) =>
              channel.platform === 'Whatsapp Web' &&
              channel.connectionStatus === 'inactive' &&
              channel.accountStatus === 'used'
          );
          if (inactiveChannel) {
            inactiveAccounts.push({
              name: item.name,
              accountChannelName: inactiveChannel.name,
              phoneNumber: inactiveChannel.phoneNumber,
            });
          }
        }
      }
    }
    return { whatsappAccount, inactiveAccounts };
  }
}

module.exports = { BroadcastPage };
