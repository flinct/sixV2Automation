const { expect } = require('@playwright/test');
const { getCurrentConfig } = require('../config');
const { io } = require('socket.io-client');

class ConversationSocketPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = page.url().split('/')[2];
    this.config = this.resolveEnvironmentConfig(this.baseUrl);
    this.socketInstance = null;
  }

  resolveEnvironmentConfig(baseUrl) {
    const accountChannels = process.env.CONVERSATION_ACCOUNT_CHANNELS_JSON
      ? JSON.parse(process.env.CONVERSATION_ACCOUNT_CHANNELS_JSON)
      : [{ id: process.env.CONVERSATION_ACCOUNT_CHANNEL_ID || 'account-channel-id', topic: process.env.CONVERSATION_TOPIC || 'general' }];

    return {
      channelId: process.env.CONVERSATION_CHANNEL_ID || 'channel-id',
      signatureKey: process.env.CONVERSATION_WIDGET_SIGNATURE_KEY || '',
      accountChannels,
      conversationSocket: `${process.env.CONVERSATION_SOCKET_URL || `wss://${baseUrl}`}/conversations`,
    };
  }

  async connectSocket(token) {
    return new Promise((resolve) => {
      this.socketInstance = io(this.config.conversationSocket, {
        transports: ['websocket'],
        forceNew: true,
        auth: token ? { token } : undefined,
        extraHeaders: { Origin: `https://${this.baseUrl}` },
      });

      this.socketInstance.on('connect', () => {
        console.log('SOCKET Connected');
        resolve(this.socketInstance);
      });

      this.socketInstance.on('connect_error', (err) => {
        console.log('SOCKET ERROR:', err.message);
      });
    });
  }

  disconnectSocket() {
    if (this.socketInstance) {
      this.socketInstance.disconnect();
      this.socketInstance = null;
    }
  }

  generateRandomAlphanumeric(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
  }

  generateRandomAlphanumericSpecial(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

module.exports = { ConversationSocketPage };
