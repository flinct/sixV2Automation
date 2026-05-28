require('dotenv').config();

function envValue(name, fallback) {
  return process.env[name] || fallback;
}

const environments = {
  local: {
    name: 'local',
    baseURL: envValue('LOCAL_BASE_URL', 'http://localhost:3002'),
    apiBase: envValue('LOCAL_API_BASE', 'http://localhost:3000/'),
  },
  dev: {
    name: 'dev',
    baseURL: envValue('DEV_BASE_URL', envValue('E2E_BASE_URL', 'https://app.example.test')),
    apiBase: envValue('DEV_API_BASE', envValue('E2E_API_BASE', 'https://api.example.test/')),
  },
  staging: {
    name: 'staging',
    baseURL: envValue('STAGING_BASE_URL', 'https://staging.example.test'),
    apiBase: envValue('STAGING_API_BASE', 'https://staging-api.example.test/'),
  },
  prod: {
    name: 'prod',
    baseURL: envValue('PROD_BASE_URL', 'https://app.example.test'),
    apiBase: envValue('PROD_API_BASE', 'https://api.example.test/'),
  },
  legacy: {
    name: 'legacy',
    baseURL: envValue('LEGACY_BASE_URL', 'https://legacy.example.test'),
    apiBase: envValue('LEGACY_API_BASE', 'https://legacy-api.example.test/'),
  },
};

function getEnvironment(envName) {
  const env = environments[envName] || environments.dev;
  return env;
}

function getCurrentEnvironment() {
  const envName = process.env.ENV || process.env.CYPRESS_ENV || 'dev';
  return getEnvironment(envName);
}

module.exports = {
  environments,
  getEnvironment,
  getCurrentEnvironment,
};
