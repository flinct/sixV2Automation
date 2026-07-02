'use strict';

const { io } = require('socket.io-client');

function createSocket(socketUrl, token, options = {}) {
  const {
    subPath = 'conversations',
    logger = console,
  } = options;

  const url = `${String(socketUrl).replace(/\/+$/g, '')}/${subPath}`;
  const socket = io(url, {
    auth: {
      token,
      type: 'bearer',
    },
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => logger.info(`[socket] connected to ${url} (id=${socket.id})`));
  socket.on('disconnect', (reason) => logger.warn(`[socket] disconnected (${reason})`));
  socket.on('connect_error', (error) => logger.error(`[socket] connect_error: ${error?.message || error}`));

  return socket;
}

module.exports = { createSocket };
