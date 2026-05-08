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
    if (baseUrl.includes('ngrok-free.dev')) {
      return {
        channelId: '694222d0c553d64073737291',
        signatureKey: 'sk_mi83pedn_PmN_rMg_OpaV0ecMFtfheZZXoLcdf8N7',
        accountChannels: [
          { id: '69422310c553d640737372a6', topic: 'amatukam-test widget' },
          { id: '69684f3fb4118ee5f0a315ba', topic: 'test timestaps-test topik' },
        ],
        conversationSocket: `wss://${baseUrl}/conversations`,
      };
    }

    if (baseUrl.includes('dev-v2.satuinbox.com')) {
      return {
        channelId: '692fe8eaaff05e8a1623e0d3',
        signatureKey: 'sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if',
        accountChannels: [
          { id: '698ef3aada258f2a5a46bf89', topic: 'hey' },
          { id: '6964ac1d2a5dbde9a5c6fa28', topic: 'tumbler biru' },
          { id: '69783b0154be8e7508b4af08', topic: 'CS harga' },
          { id: '69782d3654be8e7508b4abfe', topic: 'Complain' },
          { id: '6964ab6929de985a0fe73e48', topic: 'kipas angin' },
        ],
        conversationSocket: `wss://${baseUrl}/conversations`,
      };
    }

    if (baseUrl.includes('v2.satuinbox.com')) {
      return {
        channelId: '692fe8eaaff05e8a1623e0d3',
        signatureKey: 'sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if',
        accountChannels: [
          { id: '6996bcd952ef87df9e414fd3', topic: 'Complain' },
          { id: '69649c6b905d65859c36f81c', topic: 'remote control' },
          { id: '697845cf1782f1bd889b6bfc', topic: 'CS harga' },
          { id: '6964931c905d65859c36f618', topic: 'kipas angin' },
          { id: '69a9c8c86e7924748d4af383', topic: 'Hayoh kumaha' },
        ],
        conversationSocket: `wss://${baseUrl}/conversations`,
      };
    }

    throw new Error(`Unknown baseUrl: ${baseUrl}`);
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
