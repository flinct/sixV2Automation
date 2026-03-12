// import { cli } from "cypress";

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
    base = "https://dev-v2-api.satuinbox.com/";
    // return base;
  }
  if (baseUrl === "https://v2.satuinbox.com") {
    base = "https://v2-api.satuinbox.com/";
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
    //--------------OPEN API-----------------
    // getAllNomorWhatsapp: `${base}/open/account-whatsapp?limit=300`, //OPEN API
    getAllNomorWhatsapp: `${base}open-api/broadcast/team-inboxes?limit=200`, //get account channel from team inboxes for broadcast
    getAllNomorWhatsapp_active: `${base}open/account-whatsapp?statusNumberWhatsapp=active&limit=300`, //OPEN API //with active filter
    openAPI_broadcast: `${base}/open/broadcast?accountNumberWhatsapp=`,
    sendBroadcastUrl: `${base}open-api/broadcast`,
    openAPI_createTicketing: `${base}/open/ticketing`,
    openAPI_createBULKTicketing: `${base}/open/ticketing/bulk`,
    instanceInfo: `${base}/open/instance/info?key=`,
    initInstance: `${base}/open/whatsapp/init?force=true&whatsappNumber=`,
    clientContact: `${base}open-api/client-contact`,
    submitTopic: `${base}open-api/conversation/submit/topic`,

    //--------------OPEN API-----------------

    //--------------API-----------------
    loginUrl: `${base}api/auth/login`,
    currentProfile: `${base}api/auth/me`,
    whatsappUrl: `${base}api/account-whatsapp?limit=9000`,
    whatsappUrl_filterJabodetabek: `${base}api/account-whatsapp?accountStatus=used&page=1&limit=999&populate=division.agents&statusNumberWhatsapp=active&division=`, // for search active account without filtering
    whatsappUrl_filterJabodetabek2: `${base}api/account-whatsapp?accountStatus=used&page=1&limit=999&populate=division.agents&division=`, //without statusNumberWhatsapp=active
    whatsappUrl_filterJabodetabek3: `${base}api/account-whatsapp?page=1&limit=999&populate=division.agents&division=`, //without statusNumberWhatsapp=active accountStatus=used
    sendMessageUrl: `${base}api/message/text?key=`,
    getAll_Inbox: `${base}api/inbox/`,
    createTicketing: `${base}api/ticketing`,
    instanceInfoLocal: `${base}/instance/info?key=`,
    initInstanceLocal: `${base}/whatsapp/init?force=true&whatsappNumber=`,
    getAllDivision: `${base}api/division?sortBy=name_division:asc&limit=999&populate=agents  `,
    privacyPolicy: `${base}api/privacy-policy`,
    termOfUse: `${base}api/term-of-use`,
    platform: `${base}api/platform`,
    channel: `${base}api/channel`,
    channelById: `${base}api/channel/`,
    channelInvalidValueParam: `${base}api/channel?limit=abc`,
    channelInvalidInputParam: `${base}api/channel?asdqw12abc`,
    // approveOnboarding: `${base}api/company/${companyId}/approve`,
    approveOnboarding: (companyId) => `${base}api/company/${companyId}/approve`,
    getAccountChannel: `${base}api/account-channel`,
    getAccountChannelFilterActive: `${base}api/account-channel?limit=200&connectionStatus=active`,
    getWhatsappWeb: `${base}api/account-channel`,

    // WhatsApp Web instance endpoints (Baileys) via omnichannel service
    // Note: these are newer endpoints; keep the legacy open/* endpoints above for backward compatibility.
    initInstanceV2: `${base}api/account-channel/instance`,
    getQrInstanceV2: `${base}api/account-channel/instance/qr/:id`,
    instanceInfoV2: `${base}api/account-channel/instance/:id`,

    instance: `${base}api/account-channel/instance/`,
    getTeam: `${base}api/team/`,
    conversationSocket: `${base}conversations`,
    //--------------API-----------------

    //--------------PATH-----------------
    visit_user: "/setting/manage-team",
    visit_user_grup: "/setting/manage-group",
    visit_register: "/register",
    visit_broadcast: "/broadcast/riwayat",
    visit_broadcast_temp: "/broadcast/riwayat",
    visit_template: "/broadcast/template",
    visit_ticket: "/ticket",
    visit_liveChat: "/live-chat",
    inbox: "/inbox",
    //----V2-----
    visitGeneralSetting: "/settings/organization/general",
    visitRole: "/settings/organization/roles",
    visitMembers: "/settings/organization/members",
    visitShift: "/settings/organization/shift-hours",
    visitTags: "/settings/organization/tags",
    visitChangePass: "/settings/organization/change-password",
    visitTeaminbox: "/settings/inbox/team-inbox",
    visitAssignment: "/settings/inbox/assignments",
    visitMacros: "/settings/inbox/macros",
    visitTicketTypes: "/settings/inbox/tickets",
    visitSLA: "/settings/inbox/sla",
    visitWidgetSetting: "/settings/channels/widget",
    visitWhatsappwebSetting: "/settings/channels/whatsapp-web",
    visitAddons: "/settings/channels/addon",
    visitSubscription: "/settings/subscriptions/billing",
    visitWebhookSetting: "/settings/developer/webhook",
    visitTrackingSetting: "/settings/developer/shipping-credentials",
    visitConversation: "/conversation",
    visitTicket: "/ticketing",
    visitBroadcast: "/broadcast/messages",
    visitStatistic: "/statistic",
    //--------------PATH-----------------

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

    //-------roleValidation--------
    //dev
    loginBody_supervisor: {
      //agent
      identifier: "pusatadmin10",
      password: "Password1@",
    },
    loginBody_agent: {
      //agent
      identifier: "aprilch",
      password: "Password1@",
    },
    loginBody_crm: {
      //agent
      identifier: "crmagent01",
      password: "Password1@",
    },
    loginBody_tlc: {
      //agent
      identifier: "jbaagent01",
      password: "Password1@",
    },

    //prod
    loginBody_supervisorProd: {
      //agent
      identifier: "pusatadmin10",
      password: "Password1@",
    },
    loginBody_agentProd: {
      //agent
      identifier: "aprilch",
      password: "Password1@",
    },
    loginBody_crmProd: {
      //agent
      identifier: "crmagent01",
      password: "Password1@",
    },
    loginBody_tlcProd: {
      //agent
      identifier: "jbaagent01",
      password: "Password1@",
    },
    //-------roleValidation--------

    headers: {
      //goddummyprod
      "x-api-key":
        // "ae1bd41cfbe437bb5755068ab5d2038aa240660d87c5cdca0f69001a3a52e3c5",
        "10f1d5e1eb1ea0cb632f2d02edf2ccf896efb73123e7b3f484db5cb52a19dbc6",
    },
    header_tantaffgo: {
      "x-signature-key": "sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM",
    },
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
