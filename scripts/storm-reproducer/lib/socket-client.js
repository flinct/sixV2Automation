'use strict';

const { io } = require('socket.io-client');

const DEFAULT_MAX_RECONNECT_MS = 60_000;

function createSocket(socketUrl, token, options = {}) {
  const {
    subPath = 'conversations',
    logger = console,
    failAfter60 = true,
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
  const reconnectState = {
    startedAt: 0,
    retries: 0,
    lastError: '',
    timer: null,
    disconnectReason: '',
  };

  const clearReconnectTimer = () => {
    if (reconnectState.timer) clearTimeout(reconnectState.timer);
    reconnectState.timer = null;
  };

  const finishReconnect = (status, silent) => {
    if (!reconnectState.startedAt) return;
    const durationMs = Date.now() - reconnectState.startedAt;
    if (!silent) {
      logger.warn(
        `[socket] ${status} after=${durationMs}ms retries=${reconnectState.retries} lastError=${reconnectState.lastError || 'unknown'} disconnect=${reconnectState.disconnectReason || 'unknown'}`
      );
    }
    reconnectState.startedAt = 0;
    reconnectState.retries = 0;
    reconnectState.lastError = '';
    reconnectState.disconnectReason = '';
    clearReconnectTimer();
  };

  const ensureReconnectWindow = (reason, errorMessage) => {
    if (!reconnectState.startedAt) {
      reconnectState.startedAt = Date.now();
      reconnectState.disconnectReason = reason || reconnectState.disconnectReason || 'unknown';
      reconnectState.lastError = errorMessage || reconnectState.lastError || 'unknown';
      logger.warn(
        `[socket] reconnecting start=${new Date(reconnectState.startedAt).toISOString()} reason=${reconnectState.disconnectReason} lastError=${reconnectState.lastError}`
      );
      if (failAfter60) {
        reconnectState.timer = setTimeout(() => {
          logger.error(
            `[socket] reconnect-abort after=${Date.now() - reconnectState.startedAt}ms retries=${reconnectState.retries} lastError=${reconnectState.lastError || 'unknown'} disconnect=${reconnectState.disconnectReason || 'unknown'}`
          );
          socket.disconnect();
        }, DEFAULT_MAX_RECONNECT_MS);
      }
      return;
    }
    reconnectState.lastError = errorMessage || reconnectState.lastError || 'unknown';
  };

  socket.on('connect', () => {
    finishReconnect('reconnected', true);
  });
  socket.on('disconnect', (reason) => {
    if (reason === 'io client disconnect') {
      finishReconnect('reconnect-stop');
      logger.warn(`[socket] disconnected (${reason})`);
      return;
    }
    reconnectState.disconnectReason = reason || 'unknown';
    ensureReconnectWindow(reconnectState.disconnectReason, reconnectState.lastError);
  });
  socket.io.on('reconnect_attempt', () => {
    reconnectState.retries += 1;
  });
  socket.on('connect_error', (error) => {
    const message = error?.message || String(error);
    ensureReconnectWindow(reconnectState.disconnectReason || 'connect_error', message);
  });

  return socket;
}

module.exports = { createSocket };
