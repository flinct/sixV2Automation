function getHeaderByLoginType(config, baseUrl, loginType) {
  if (baseUrl === "http://localhost:3002") {
    if (loginType === "chickentester") return config.loginBody_CT2;
    if (loginType === "cekerayam01") return config.loginBody_cekerayam01;
    if (loginType === "testerdummy01") return config.loginBody_testerdummy01;
    if (loginType === "mataayam01") return config.loginBody_mataayam01;
    if (loginType === "leherayam01") return config.loginBody_leherayam01;

    if (loginType === "admin_dev") return config.loginBody_cekerayam01;
    if (loginType === "spv_dev") return config.loginBody_supervisor;
    if (loginType === "agent_dev") return config.loginBody_agent;
    if (loginType === "crm_dev") return config.loginBody_crm;
    if (loginType === "tlc_dev") return config.loginBody_tlc;
  }
  if (baseUrl === "https://dev-v2.satuinbox.com") {
    if (loginType === "chickentester") return config.loginBody_CT2;
    if (loginType === "cekerayam01") return config.loginBody_cekerayam01;
    if (loginType === "testerdummy01") return config.loginBody_testerdummy01;
    if (loginType === "mataayam01") return config.loginBody_mataayam01;
    if (loginType === "leherayam01") return config.loginBody_leherayam01;

    if (loginType === "admin_dev") return config.loginBody_cekerayam01;
    if (loginType === "spv_dev") return config.loginBody_supervisor;
    if (loginType === "agent_dev") return config.loginBody_agent;
    if (loginType === "crm_dev") return config.loginBody_crm;
    if (loginType === "tlc_dev") return config.loginBody_tlc;
  }
  if (baseUrl === "https://v2.satuinbox.com") {
    if (loginType === "tantaffgo") return config.header_tantaffgo;
    if (loginType === "danyatmin01") return config.header_tantaffgo;
    if (loginType === "danyspv01") return config.loginBody_danyspvsatu;
    if (loginType === "danyagent01") return config.loginBody_danyaagentsatu;
    if (loginType === "testerdummyprod01")
      return config.loginBody_testerdummyprod01;
    if (loginType === "goddummyprod2") return config.loginBody_goddummyprod2;
  }

  throw new Error(`No headers found for baseUrl: ${baseUrl} `);
}

function getLoginBodyByLoginType(config, baseUrl, loginType) {
  if (baseUrl === "http://localhost:3002") {
    if (loginType === "chickentester") return config.loginBody_CT2;
    if (loginType === "cekerayam01") return config.loginBody_cekerayam01;
    if (loginType === "testerdummy01") return config.loginBody_testerdummy01;
    if (loginType === "mataayam01") return config.loginBody_mataayam01;
    if (loginType === "leherayam01") return config.loginBody_leherayam01;

    if (loginType === "admin_dev") return config.loginBody_cekerayam01;
    if (loginType === "spv_dev") return config.loginBody_supervisor;
    if (loginType === "agent_dev") return config.loginBody_agent;
    if (loginType === "crm_dev") return config.loginBody_crm;
    if (loginType === "tlc_dev") return config.loginBody_tlc;
  }

  if (baseUrl === "https://dev-v2.satuinbox.com") {
    if (loginType === "chickentester") return config.loginBody_CT2;
    if (loginType === "cekerayam01") return config.loginBody_cekerayam01;
    if (loginType === "testerdummy01") return config.loginBody_testerdummy01;
    if (loginType === "mataayam01") return config.loginBody_mataayam01;
    if (loginType === "leherayam01") return config.loginBody_leherayam01;

    if (loginType === "admin_dev") return config.loginBody_cekerayam01;
    if (loginType === "spv_dev") return config.loginBody_supervisor;
    if (loginType === "agent_dev") return config.loginBody_agent;
    if (loginType === "crm_dev") return config.loginBody_crm;
    if (loginType === "tlc_dev") return config.loginBody_tlc;
  }
  if (baseUrl === "https://v2.satuinbox.com") {
    if (loginType === "tantaffgo") return config.loginBody_tantaffgo;
    if (loginType === "danyatmin01") return config.loginBody_danyatminsatu;
    if (loginType === "danyspv01") return config.loginBody_danyspvsatu;
    if (loginType === "danyagent01") return config.loginBody_danyaagentsatu;
    if (loginType === "testerdummyprod01")
      return config.loginBody_testerdummyprod01;
    if (loginType === "goddummyprod2") return config.loginBody_goddummyprod2;

    if (loginType === "admin") return config.loginBody_danyatminsatu;
    if (loginType === "spv") return config.loginBody_supervisorProd;
    if (loginType === "agent") return config.loginBody_agentProd;
    if (loginType === "crm") return config.loginBody_crmProd;
    if (loginType === "tlc") return config.loginBody_tlcProd;
  }

  throw new Error(`No headers found for login type: ${loginType}`);
}

// Export the functions for use in test files
export { getHeaderByLoginType, getLoginBodyByLoginType };
