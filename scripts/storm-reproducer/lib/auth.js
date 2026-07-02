'use strict';

const { ApiEndpoints, getAccountByLoginType, getConfig } = require('../../../playwright/support/config');
const { loginErrorHint, normalizeApiBase } = require('../../_shared/api-base');
const { request } = require('./http');

function buildRuntime(envName = 'dev', apiBaseOverride = '') {
  const config = getConfig(envName);
  const normalizedApiBase = normalizeApiBase(apiBaseOverride || config.env.apiBase);

  return {
    envName,
    apiBase: normalizedApiBase,
    endpoints: new ApiEndpoints(normalizedApiBase),
    baseConfig: config,
  };
}

function resolveCredentials({ envName = 'dev', loginType = '', identifier = '', password = '' }) {
  if (identifier && password) {
    return { identifier, password, role: 'custom' };
  }
  if (loginType) {
    return getAccountByLoginType(loginType, envName);
  }
  return getConfig(envName).getDefaultAccount();
}

function unwrapData(json) {
  return json && typeof json === 'object' && 'data' in json ? json.data : json;
}

async function loginWithCredentials(runtime, credentials) {
  const response = await request(runtime.endpoints.loginUrl, {
    method: 'POST',
    body: {
      identifier: credentials.identifier,
      password: credentials.password,
    },
  });

  if (!response.ok) {
    const hint = loginErrorHint(response.text);
    throw new Error(
      `Login failed: HTTP ${response.status} ${response.statusText}${hint} body=${response.text.slice(0, 200)}`,
    );
  }

  const payload = unwrapData(response.json) || response.json || {};
  const accessToken =
    payload?.accessToken ||
    response.json?.accessToken ||
    payload?.data?.accessToken ||
    payload?.token ||
    response.json?.token;

  if (!accessToken) {
    throw new Error('Login succeeded but no accessToken found in response.');
  }

  return accessToken;
}

async function fetchCurrentProfile(runtime, token) {
  const response = await request(runtime.endpoints.currentProfile, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(
      `Fetch current profile failed: HTTP ${response.status} ${response.statusText} body=${response.text.slice(0, 200)}`,
    );
  }

  return unwrapData(response.json) || response.json || {};
}

async function authenticate(options = {}) {
  const runtime = buildRuntime(options.envName || 'dev', options.apiBase || '');
  const credentials = resolveCredentials(options);
  const token = options.authBearerToken || await loginWithCredentials(runtime, credentials);
  const profile = await fetchCurrentProfile(runtime, token);
  return { runtime, credentials, token, profile };
}

module.exports = {
  authenticate,
  buildRuntime,
  fetchCurrentProfile,
  loginWithCredentials,
  resolveCredentials,
  unwrapData,
};
