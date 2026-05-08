const environments = {
  local: {
    name: 'local',
    baseURL: 'http://localhost:3002',
    apiBase: 'https://dev-v2-api.satuinbox.com/',
  },
  dev: {
    name: 'dev',
    baseURL: 'https://dev-v2.satuinbox.com',
    apiBase: 'https://dev-v2-api.satuinbox.com/',
  },
  staging: {
    name: 'staging',
    baseURL: 'https://staging.satuinbox.com',
    apiBase: 'https://staging.satuinbox.com/api/v1',
  },
  prod: {
    name: 'prod',
    baseURL: 'https://v2.satuinbox.com',
    apiBase: 'https://v2-api.satuinbox.com/',
  },
  legacy: {
    name: 'legacy',
    baseURL: 'https://dev.satuinbox.com',
    apiBase: 'https://dev.satuinbox.com/api/v1',
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
