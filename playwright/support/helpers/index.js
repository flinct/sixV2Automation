const { getConfig, getCurrentConfig, environments } = require('../config');
const { AuthPage, InboxPage } = require('../pages');
const generators = require('./generators');
const testDataGenerators = require('./test-data-generators');
const awbGenerator = require('./awb-generator');

const loginTypeMap = {
  chickentester: 'CT2',
  cekerayam01: 'cekerayam01',
  testerdummy01: 'testerdummy01',
  mataayam01: 'mataayam01',
  leherayam01: 'leherayam01',
  admin_dev: 'cekerayam01',
  spv_dev: 'roleValidation.supervisor',
  agent_dev: 'roleValidation.agent',
  crm_dev: 'roleValidation.crm',
  tlc_dev: 'roleValidation.tlc',
  tantaffgo: 'tantaffgo01',
  danyatmin01: 'danyatmin01',
  danyspv01: 'danyspv01',
  danyagent01: 'danyagent01',
  testerdummyprod01: 'testerdummy01',
  goddummyprod2: 'goddummyprod2',
  admin: 'danyatmin01',
  spv: 'roleValidation.supervisor',
  agent: 'roleValidation.agent',
  crm: 'roleValidation.crm',
  tlc: 'roleValidation.tlc',
};

function readAccount(config, key) {
  if (key.startsWith('roleValidation.')) {
    const roleKey = key.split('.')[1];
    const account = config.testAccounts.roleValidation[roleKey];
    return {
      identifier: account.identifier,
      password: account.password,
    };
  }
  return config.getAccountByLoginType(key, config.env.name);
}

function getLoginTypeMapping(loginType, env = 'dev') {
  const config = getConfig(env);
  const accountKey = loginTypeMap[loginType];
  if (accountKey) {
    return readAccount(config, accountKey);
  }
  return config.getDefaultAccount();
}

function getHeaderByLoginType(loginType, env = 'dev') {
  const { apiKeys } = getConfig(env);

  if (loginType === 'tantaffgo' || loginType === 'danyatmin01') {
    return apiKeys.tantaffgo;
  }
  return apiKeys.default;
}

function generateRandomText(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateRandomSpecialChars(length = 4) {
  const chars = "!@#$%^&*()-=_+~`{}|[]";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = {
  getLoginTypeMapping,
  getHeaderByLoginType,
  generateRandomText,
  generateRandomSpecialChars,
  generators,
  testDataGenerators,
  awbGenerator,
  AuthPage,
  InboxPage,
  getConfig,
  getCurrentConfig,
  environments,
};
