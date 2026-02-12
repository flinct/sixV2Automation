export function env_config(baseUrl) {
  // cy.log(baseUrl);
  let base;
  if (baseUrl === "https://app.satuinbox.com") {
    base = "https://app.satuinbox.com/api/v1";
    // return base;
  }
  if (baseUrl === "https://dev.satuinbox.com") {
    base = "https://dev.satuinbox.com/api/v1";
    // return base;
  }
  if (baseUrl === "https://staging.satuinbox.com") {
    base = "https://staging.satuinbox.com/api/v1";
    // return base;
  }
  if (baseUrl === "https://dev-v2.satuinbox.com") {
    base = "https://dev-v2-api.satuinbox.com/api";
    // return base;
  }
  if (baseUrl === "https://v2.satuinbox.com") {
    base = "https://v2-api.satuinbox.com/api";
    // return base;
  }
  if (
    baseUrl !== "https://app.satuinbox.com" &&
    baseUrl !== "https://dev.satuinbox.com" &&
    baseUrl !== "https://staging.satuinbox.com" &&
    baseUrl !== "https://dev-v2.satuinbox.com" &&
    baseUrl !== "https://v2.satuinbox.com"
  ) {
    throw new Error(`Unknown baseUrl: ${baseUrl}`);
  }
  return {
    loginUrl: `${base}/auth/login`,
    currentProfile: `${base}/auth/me`,
    getAllNomorWhatsapp: `${base}/open/account-whatsapp?limit=300`, //OPEN API
    getAllNomorWhatsapp_active: `${base}/open/account-whatsapp?statusNumberWhatsapp=active&limit=300`, //OPEN API //with active filter
    openAPI_broadcast: `${base}/open/broadcast?accountNumberWhatsapp=`,
    whatsappUrl: `${base}/account-whatsapp?limit=9000`,
    whatsappUrl_filterJabodetabek: `${base}/account-whatsapp?accountStatus=used&page=1&limit=999&populate=division.agents&statusNumberWhatsapp=active&division=`, // for search active account without filtering
    whatsappUrl_filterJabodetabek2: `${base}/account-whatsapp?accountStatus=used&page=1&limit=999&populate=division.agents&division=`, //without statusNumberWhatsapp=active
    whatsappUrl_filterJabodetabek3: `${base}/account-whatsapp?page=1&limit=999&populate=division.agents&division=`, //without statusNumberWhatsapp=active accountStatus=used
    sendMessageUrl: `${base}/message/text?key=`,
    sendBroadcastUrl: `${base}/open/broadcast?account_number_whatsapp=`,
    getAll_Inbox: `${base}/inbox/`,
    createTicketing: `${base}/ticketing`,
    openAPI_createTicketing: `${base}/open/ticketing`,
    openAPI_createBULKTicketing: `${base}/open/ticketing/bulk`,
    instanceInfo: `${base}/open/instance/info?key=`,
    instanceInfoLocal: `${base}/instance/info?key=`,
    initInstance: `${base}/open/whatsapp/init?force=true&whatsappNumber=`,
    initInstanceLocal: `${base}/whatsapp/init?force=true&whatsappNumber=`,
    getAllDivision: `${base}/division?sortBy=name_division:asc&limit=999&populate=agents  `,
    privacyPolicy: `${base}/privacy-policy`,
    termOfUse: `${base}/term-of-use`,
    platform: `${base}/platform`,
    channel: `${base}/channel`,
    channelById: `${base}/channel/`,
    channelInvalidValueParam: `${base}/channel?limit=abc`,
    channelInvalidInputParam: `${base}/channel?asdqw12abc`,
    // approveOnboarding: `${base}api/company/${companyId}/approve`,
    approveOnboarding: (companyId) => `${base}/company/${companyId}/approve`,
    getAccountChannel: `${base}/account-channel`,
    getWhatsappWeb: `${base}/account-channel`,
    instance: `${base}/account-channel/instance/`,
    getTeam: `${base}/team/`,

    visit_user: "/setting/manage-team",
    visit_user_grup: "/setting/manage-group",
    visit_register: "/register",
    visit_broadcast: "/broadcast/riwayat",
    visit_broadcast_temp: "/broadcast/riwayat",
    visit_template: "/broadcast/template",
    visit_ticket: "/ticket",
    visit_liveChat: "/live-chat",
    inbox: "/inbox",

    loginBody: { keyword: "goddummyprod", password: "TongTji89" },
    loginBody_GD_dev: { keyword: "goddummy", password: "asdqwe12" },
    loginBody_testing270520252: {
      keyword: "testing270520252",
      password: "Asdqwe12@",
    },
    loginBody_CT: { keyword: "chickentester01", password: "asdqwe12" },
    loginBody_ms2: { keyword: "messagelogdua", password: "Asdqwe12@" },
    loginBody_prodtestingjuli: {
      keyword: "prodtestingjuli",
      password: "asdqwe12",
    },
    loginBody_prodtestingakun1dua: {
      keyword: "prodtestingakun1dua",
      password: "Asdqwe12@",
    },
    loginBody_goddumstag: {
      keyword: "goddumstag",
      password: "Asdqwe12!",
    },

    //---------goddummyprod2 SAP----------
    loginBody_goddummyprod2: {
      identifier: "goddummyprod2",
      password: "Password1@",
    },
    //---------goddummyprod2 SAP----------

    //---------tester dummy prod -------
    loginBody_testerdummy01: {
      identifier: "testerdummy01",
      password: "Asdqwe12@",
    },
    loginBody_testerdummy01: {
      identifier: "testerdummyprod01",
      password: "Asdqwe12@",
    },
    //---------tester dummy prod -------

    //----------tantaffgo---------- prod
    loginBody_tantaffgo: {
      identifier: "tantaffgo01",
      password: "Asdqwe12@",
    },
    loginBody_danyatminsatu: {
      //adm
      identifier: "danyatmin01",
      password: "Asdqwe12@",
    },
    loginBody_danyspvsatu: {
      //spv
      identifier: "danyspv01",
      password: "Asdqwe12@",
    },
    loginBody_danyaagentsatu: {
      //agent
      identifier: "danyagent01",
      password: "Asdqwe12@",
    },
    //----------tantaffgo----------

    //-------chickentester-------- dev
    loginBody_CT2: {
      identifier: "chickentester01",
      password: "Asdqwe12@",
    },
    loginBody_cekerayam01: {
      //adm
      identifier: "cekerayam01",
      password: "Asdqwe12@",
    },
    loginBody_mataayam01: {
      //spv
      identifier: "mataayam01",
      password: "f^(B2WdK3uh.p@!?",
    },
    loginBody_leherayam01: {
      //agent
      identifier: "leherayam01",
      password: "5481p#9kKxb?M=!G",
    },
    //-------chickentester--------

    headers: {
      //goddummyprod
      "x-api-key":
        // "ae1bd41cfbe437bb5755068ab5d2038aa240660d87c5cdca0f69001a3a52e3c5",
        "10f1d5e1eb1ea0cb632f2d02edf2ccf896efb73123e7b3f484db5cb52a19dbc6",
    },
    headers_testing270520252: {
      //testing270520252
      "x-api-key":
        "754b5fcd5e5a5cd7f2f416957a9d228efbf4f788347d37ae51f6b5e2873a6347",
    },
    headers_GD: {
      "x-api-key":
        "7058d1c05c763aaa5d5744baf5c371ae01ed38455d90eb29dd16ccd4bcb47d17",
    },
    headers_CT: {
      "x-api-key":
        "a7d468050c774ebbda4765a4a1edd01889ba7f1d4c12aa9c6aeb65142cf29834",
    }, //chickentester dev
    headers_CT_staging: {
      "x-api-key":
        "E0ZZ5qfdTfNj5msRVvY9nUfPCjOaU9SgtmStXj0S1DS4rwP6XO0iaVpb1yLu4gu0",
    },
    headers_ms1: {
      "x-api-key":
        "1dcc58cdd4ccb4a56b20ed367ef2c4addc3ed951a2e59c01118e787333255d91",
    }, //messagelogsatu
    headers_ms2: {
      "x-api-key":
        "3c9fbf9f3f3c84106c3eca82e8360692ae352410bc53a86310754bdc3e5c2541",
    }, //messagelogsatu
    headers_prodtestingjuli: {
      "x-api-key":
        "a1a66b07b4a9820d2a1de4b25a25e133f73615b6acb96b13f635fe1011db8063",
    }, //prodtestingjuli
    headers_prodtestingakun1dua: {
      "x-api-key":
        "b6ea86dc861c927f1817593074ed5b709bcc474037a381bda87f92533243d7db",
    }, //prodtestingakun1dua
    headers_goddumstag: {
      "x-api-key":
        "30914e3ab4bd0a8bf92f47cc0067024a59dae88ca826eb67f9ff012539ed210d",
    }, //goddumstag
    randomGlobalDelay: Math.floor(Math.random() * 1800000) + 60000, //1 menit + random wait time
    randomGlobalDelayStaging: Math.floor(Math.random() * 2000) + 10000, //1 menit + random wait time
    parentNumber: "6285147211094",
    parentNumber2: "6285135431734",
    targetMessage_me: "6289655057778",
    targetMessage_dummy: "6285135431270",
  };

  // const config = environmentConfig[baseUrl];
  // if (!config) throw new Error(`Unknown baseUrl: ${baseUrl}`);
  // return config;
}
