require('dotenv').config();

function envValue(name, fallback = '') {
  return process.env[name] || fallback;
}

function account(identifierEnv, passwordEnv, role, env, identifierFallback) {
  return {
    identifier: envValue(identifierEnv, identifierFallback),
    password: envValue(passwordEnv, 'replace-me'),
    role,
    env,
  };
}

const testAccounts = {
  goddummy: account('E2E_DEV_ADMIN_USER', 'E2E_DEV_ADMIN_PASSWORD', 'admin', ['dev', 'local'], 'dev-admin'),
  goddummyprod: account('E2E_PROD_ADMIN_USER', 'E2E_PROD_ADMIN_PASSWORD', 'admin', ['prod'], 'prod-admin'),
  goddummyprod2: account('E2E_PROD_ADMIN_2_USER', 'E2E_PROD_ADMIN_2_PASSWORD', 'admin', ['prod'], 'prod-admin-2'),
  goddumstag: account('E2E_STAGING_ADMIN_USER', 'E2E_STAGING_ADMIN_PASSWORD', 'admin', ['staging'], 'staging-admin'),

  cekerayam01: account('E2E_DEV_ADMIN_USER', 'E2E_DEV_ADMIN_PASSWORD', 'admin', ['dev'], 'dev-admin'),
  mataayam01: account('E2E_DEV_SUPERVISOR_USER', 'E2E_DEV_SUPERVISOR_PASSWORD', 'supervisor', ['dev'], 'dev-supervisor'),
  leherayam01: account('E2E_DEV_AGENT_USER', 'E2E_DEV_AGENT_PASSWORD', 'agent', ['dev'], 'dev-agent'),

  chickentester01: account('E2E_DEV_ADMIN_USER', 'E2E_DEV_ADMIN_PASSWORD', 'admin', ['dev'], 'dev-admin'),
  CT2: account('E2E_DEV_ADMIN_USER', 'E2E_DEV_ADMIN_PASSWORD', 'admin', ['dev'], 'dev-admin'),

  messagelogdua: account('E2E_MESSAGE_LOG_USER', 'E2E_MESSAGE_LOG_PASSWORD', 'agent', ['dev', 'prod'], 'message-log-agent'),
  prodtestingjuli: account('E2E_PROD_AGENT_USER', 'E2E_PROD_AGENT_PASSWORD', 'agent', ['prod'], 'prod-agent'),
  prodtestingakun1dua: account('E2E_PROD_AGENT_2_USER', 'E2E_PROD_AGENT_2_PASSWORD', 'agent', ['prod'], 'prod-agent-2'),
  testerdummy01: account('E2E_PROD_TESTER_USER', 'E2E_PROD_TESTER_PASSWORD', 'agent', ['prod'], 'prod-tester'),

  tantaffgo01: account('E2E_PROD_ADMIN_USER', 'E2E_PROD_ADMIN_PASSWORD', 'admin', ['prod'], 'prod-admin'),
  danyatmin01: account('E2E_PROD_ADMIN_USER', 'E2E_PROD_ADMIN_PASSWORD', 'admin', ['prod'], 'prod-admin'),
  danyspv01: account('E2E_PROD_SUPERVISOR_USER', 'E2E_PROD_SUPERVISOR_PASSWORD', 'supervisor', ['prod'], 'prod-supervisor'),
  danyagent01: account('E2E_PROD_AGENT_USER', 'E2E_PROD_AGENT_PASSWORD', 'agent', ['prod'], 'prod-agent'),

  testing270520252: account('E2E_DEV_ADMIN_2_USER', 'E2E_DEV_ADMIN_2_PASSWORD', 'admin', ['dev'], 'dev-admin-2'),

  roleValidation: {
    supervisor: account('E2E_RBAC_SUPERVISOR_USER', 'E2E_RBAC_SUPERVISOR_PASSWORD', 'supervisor', ['dev', 'prod'], 'rbac-supervisor'),
    agent: account('E2E_RBAC_AGENT_USER', 'E2E_RBAC_AGENT_PASSWORD', 'agent', ['dev', 'prod'], 'rbac-agent'),
    crm: account('E2E_RBAC_CRM_USER', 'E2E_RBAC_CRM_PASSWORD', 'agent', ['dev', 'prod'], 'rbac-crm-agent'),
    tlc: account('E2E_RBAC_TLC_USER', 'E2E_RBAC_TLC_PASSWORD', 'agent', ['dev', 'prod'], 'rbac-tlc-agent'),
  },
};

const apiKeys = {
  default: envValue('E2E_API_KEY'),
  tantaffgo: envValue('E2E_TANTAFFGO_SIGNATURE_KEY'),
  automation01: envValue('E2E_AUTOMATION_SIGNATURE_KEY'),
};

const testData = {
  parentNumber: envValue('E2E_PARENT_NUMBER', '6280000000000'),
  parentNumber2: envValue('E2E_PARENT_NUMBER_2', '6280000000000'),
  targetMessage_me: envValue('E2E_TARGET_NUMBER', '6280000000000'),
  targetMessage_dummy: envValue('E2E_TARGET_NUMBER_2', '6280000000000'),
  customerNumber: envValue('E2E_CUSTOMER_NUMBER', '6280000000000'),

  channelTypes: {
    widget: 'widget',
    baileys: 'baileys',
    whatsappOfficial: 'whatsapp-official',
    email: 'email',
    instagram: 'instagram',
    facebook: 'facebook',
    whatsappWeb: 'whatsapp_web',
    whatsappApi: 'whatsapp_api',
  },

  userRoles: {
    superAdmin: 'super_admin',
    admin: 'admin',
    supervisor: 'supervisor',
    agent: 'agent',
  },

  conversationStatus: {
    ongoing: 'ongoing',
    resolved: 'resolved',
    unassigned: 'unassigned',
    spam: 'spam',
    junk: 'junk',
  },

  delays: {
    randomGlobalDelay: Math.floor(Math.random() * 1800000) + 60000,
    randomGlobalDelayStaging: Math.floor(Math.random() * 2000) + 10000,
    short: 1000,
    medium: 3000,
    long: 5000,
    extraLong: 10000,
  },
};

function getAccountByLoginType(loginType, env = 'dev') {
  const account = testAccounts[loginType];
  if (!account) {
    throw new Error(`Account not found for loginType: ${loginType}`);
  }

  if (Array.isArray(account.env) && !account.env.includes(env)) {
    throw new Error(`Account '${loginType}' is not configured for env '${env}'`);
  }

  return {
    identifier: account.identifier,
    password: account.password,
    role: account.role,
  };
}

function getRequestedLoginType() {
  return process.env.LOGIN_TYPE || null;
}

function getDefaultAccount(env = 'dev') {
  const requestedLoginType = getRequestedLoginType();

  if (requestedLoginType) {
    return getAccountByLoginType(requestedLoginType, env);
  }

  if (env === 'prod') {
    return getAccountByLoginType('goddummyprod', env);
  }
  if (env === 'staging') {
    return getAccountByLoginType('goddumstag', env);
  }
  return getAccountByLoginType('goddummy', env);
}

module.exports = {
  testAccounts,
  apiKeys,
  testData,
  getAccountByLoginType,
  getDefaultAccount,
  getRequestedLoginType,
};
