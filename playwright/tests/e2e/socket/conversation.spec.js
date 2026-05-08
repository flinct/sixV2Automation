const { test, expect } = require('@playwright/test');
const { ConversationSocketPage } = require('../../../support/pages');
const { AuthPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Conversation Socket Tests', () => {
  let socketPage;
  let authPage;
  let config;
  let token;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page, request }) => {
    authPage = new AuthPage(page);
    socketPage = new ConversationSocketPage(page);

    const loginResponse = await request.post(config.endpoints.loginUrl, {
      data: config.getDefaultAccount(),
    });
    const loginData = await loginResponse.json();
    token = loginData.tokens.access.token;
  });

  test('connect to websocket successfully', async () => {
    const socket = await socketPage.connectSocket(token);
    expect(socket.connected).toBeTruthy();
    socketPage.disconnectSocket();
  });

  test('generate random data', async () => {
    const alphanumeric = socketPage.generateRandomAlphanumeric();
    expect(alphanumeric.length).toBe(6);

    const uuid = socketPage.generateUUID();
    expect(uuid).toMatch(/^[0-9a-f-]{36}$/i);
  });
});
