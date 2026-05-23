const { environments, getEnvironment, getCurrentEnvironment } = require('./environments');
const { ApiEndpoints, pagePaths } = require('./endpoints');
const { testAccounts, apiKeys, testData, getAccountByLoginType, getDefaultAccount, getRequestedLoginType } = require('./test-data');

function getConfig(envName) {
  const env = getEnvironment(envName);
  const endpoints = new ApiEndpoints(env.apiBase);

  return {
    env,
    endpoints,
    pagePaths,
    testAccounts,
    apiKeys,
    testData,
    getAccountByLoginType,
    getRequestedLoginType,
    getDefaultAccount: () => getDefaultAccount(env.name),
  };
}

function getCurrentConfig() {
  const env = getCurrentEnvironment();
  return getConfig(env.name);
}

module.exports = {
  environments,
  getEnvironment,
  getCurrentEnvironment,
  getConfig,
  getCurrentConfig,
  ApiEndpoints,
  pagePaths,
  testAccounts,
  apiKeys,
  testData,
  getAccountByLoginType,
  getDefaultAccount,
  getRequestedLoginType,
};
