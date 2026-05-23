const testAccounts = {
  goddummy: {
    identifier: 'chickentester01',
    password: 'Asdqwe12@',
    role: 'admin',
    env: ['dev', 'local'],
  },
  goddummyprod: {
    identifier: 'goddummyprod',
    password: 'TongTji89',
    role: 'admin',
    env: ['prod'],
  },
  goddummyprod2: {
    identifier: 'goddummyprod2',
    password: 'Password1@',
    role: 'admin',
    env: ['prod'],
  },
  goddumstag: {
    identifier: 'goddumstag',
    password: 'Asdqwe12!',
    role: 'admin',
    env: ['staging'],
  },

  cekerayam01: {
    identifier: 'cekerayam01',
    password: 'Asdqwe12@',
    role: 'admin',
    env: ['dev'],
  },
  mataayam01: {
    identifier: 'mataayam01',
    password: 'Asdqwe12@',
    role: 'supervisor',
    env: ['dev'],
  },
  leherayam01: {
    identifier: 'leherayam01',
    password: 'Asdqwe12@',
    role: 'agent',
    env: ['dev'],
  },

  chickentester01: {
    identifier: 'chickentester01',
    password: 'Asdqwe12@',
    role: 'admin',
    env: ['dev'],
  },
  CT2: {
    identifier: 'chickentester01',
    password: 'Asdqwe12@',
    role: 'admin',
    env: ['dev'],
  },

  messagelogdua: {
    identifier: 'messagelogdua',
    password: 'Asdqwe12@',
    role: 'agent',
    env: ['dev', 'prod'],
  },
  prodtestingjuli: {
    identifier: 'prodtestingjuli',
    password: 'asdqwe12',
    role: 'agent',
    env: ['prod'],
  },
  prodtestingakun1dua: {
    identifier: 'prodtestingakun1dua',
    password: 'Asdqwe12@',
    role: 'agent',
    env: ['prod'],
  },
  testerdummy01: {
    identifier: 'testerdummyprod01',
    password: 'Asdqwe12@',
    role: 'agent',
    env: ['prod'],
  },

  tantaffgo01: {
    identifier: 'tantaffgo01',
    password: 'Asdqwe12@',
    role: 'admin',
    env: ['prod'],
  },
  danyatmin01: {
    identifier: 'danyatmin01',
    password: 'Asdqwe12@',
    role: 'admin',
    env: ['prod'],
  },
  danyspv01: {
    identifier: 'danyspv01',
    password: 'Asdqwe12@',
    role: 'supervisor',
    env: ['prod'],
  },
  danyagent01: {
    identifier: 'danyagent01',
    password: 'Asdqwe12@',
    role: 'agent',
    env: ['prod'],
  },

  testing270520252: {
    identifier: 'testing270520252',
    password: 'Asdqwe12@',
    role: 'admin',
    env: ['dev'],
  },

  roleValidation: {
    supervisor: {
      identifier: 'pusatadmin10',
      password: 'Password1@',
      role: 'supervisor',
    },
    agent: {
      identifier: 'aprilch',
      password: 'Password1@',
      role: 'agent',
    },
    crm: {
      identifier: 'crmagent01',
      password: 'Password1@',
      role: 'agent',
    },
    tlc: {
      identifier: 'jbaagent01',
      password: 'Password1@',
      role: 'agent',
    },
  },
};

const apiKeys = {
  default: '10f1d5e1eb1ea0cb632f2d02edf2ccf896efb73123e7b3f484db5cb52a19dbc6',
  tantaffgo: 'sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM',
  automation01: 'sk_moic2ycf_nXXxomZIUKhIE-p493wF3biOfdK_th4h',
};

const testData = {
  parentNumber: '6285147211094',
  parentNumber2: '6285135431734',
  targetMessage_me: '6289655057778',
  targetMessage_dummy: '6285135431270',
  customerNumber: '6289655057778',

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
