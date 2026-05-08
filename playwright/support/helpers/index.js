const { getConfig, getCurrentConfig, environments } = require('../config');
const { AuthPage, InboxPage } = require('../pages');
const generators = require('./generators');
const testDataGenerators = require('./test-data-generators');
const awbGenerator = require('./awb-generator');

const loginTypeMap = {
  chickentester: 'loginBody_CT2',
  cekerayam01: 'loginBody_cekerayam01',
  testerdummy01: 'loginBody_testerdummy01',
  mataayam01: 'loginBody_mataayam01',
  leherayam01: 'loginBody_leherayam01',
  admin_dev: 'loginBody_cekerayam01',
  spv_dev: 'loginBody_supervisor',
  agent_dev: 'loginBody_agent',
  crm_dev: 'loginBody_crm',
  tlc_dev: 'loginBody_tlc',
  tantaffgo: 'loginBody_tantaffgo',
  danyatmin01: 'loginBody_danyatminsatu',
  danyspv01: 'loginBody_danyspvsatu',
  danyagent01: 'loginBody_danyaagentsatu',
  testerdummyprod01: 'loginBody_testerdummyprod01',
  goddummyprod2: 'loginBody_goddummyprod2',
  admin: 'loginBody_danyatminsatu',
  spv: 'loginBody_supervisorProd',
  agent: 'loginBody_agentProd',
  crm: 'loginBody_crmProd',
  tlc: 'loginBody_tlcProd',
};

function getLoginTypeMapping(loginType, env = 'dev') {
  const config = getConfig(env);
  const loginBodies = {
    loginBody_CT2: { identifier: 'chickentester01', password: 'Asdqwe12@' },
    loginBody_cekerayam01: { identifier: 'cekerayam01', password: 'Asdqwe12@' },
    loginBody_testerdummy01: { identifier: 'testerdummyprod01', password: 'Asdqwe12@' },
    loginBody_mataayam01: { identifier: 'mataayam01', password: 'Asdqwe12@' },
    loginBody_leherayam01: { identifier: 'leherayam01', password: 'Asdqwe12@' },
    loginBody_supervisor: { identifier: 'pusatadmin10', password: 'Password1@' },
    loginBody_agent: { identifier: 'aprilch', password: 'Password1@' },
    loginBody_crm: { identifier: 'crmagent01', password: 'Password1@' },
    loginBody_tlc: { identifier: 'jbaagent01', password: 'Password1@' },
    loginBody_tantaffgo: { identifier: 'tantaffgo01', password: 'Asdqwe12@' },
    loginBody_danyatminsatu: { identifier: 'danyatmin01', password: 'Asdqwe12@' },
    loginBody_danyspvsatu: { identifier: 'danyspv01', password: 'Asdqwe12@' },
    loginBody_danyaagentsatu: { identifier: 'danyagent01', password: 'Asdqwe12@' },
    loginBody_testerdummyprod01: { identifier: 'testerdummyprod01', password: 'Asdqwe12@' },
    loginBody_goddummyprod2: { identifier: 'goddummyprod2', password: 'Password1@' },
    loginBody_supervisorProd: { identifier: 'pusatadmin10', password: 'Password1@' },
    loginBody_agentProd: { identifier: 'aprilch', password: 'Password1@' },
    loginBody_crmProd: { identifier: 'crmagent01', password: 'Password1@' },
    loginBody_tlcProd: { identifier: 'jbaagent01', password: 'Password1@' },
  };

  const bodyKey = loginTypeMap[loginType];
  if (bodyKey && loginBodies[bodyKey]) {
    return loginBodies[bodyKey];
  }
  return config.getDefaultAccount();
}

function getHeaderByLoginType(loginType, env = 'dev') {
  const headers = {
    default: '10f1d5e1eb1ea0cb632f2d02edf2ccf896efb73123e7b3f484db5cb52a19dbc6',
    tantaffgo: 'sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM',
    automation01: 'sk_moic2ycf_nXXxomZIUKhIE-p493wF3biOfdK_th4h',
  };

  if (loginType === 'tantaffgo' || loginType === 'danyatmin01') {
    return headers.tantaffgo;
  }
  return headers.default;
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
