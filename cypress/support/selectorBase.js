function getHeaderByLoginType(config, baseUrl, loginType) {
  if (baseUrl === "https://app.satuinbox.com") {
    if (loginType === "goddummyprod") return config.headers;
    if (loginType === "testing270520252")
      return config.headers_testing270520252;
    if (loginType === "prodtestingjuli") return config.headers_prodtestingjuli;
    if (loginType === "prodtestingakun1dua")
      return config.headers_prodtestingakun1dua;
    if (loginType === "chickentester") return config.headers_CT;
  }

  if (baseUrl === "https://staging.satuinbox.com") {
    if (loginType === "chickentester") return config.headers_CT_staging;
    if (loginType === "goddevsa1") return config.headers_GD;
    if (loginType === "goddummy") return config.headers_GD;
    if (loginType === "messagelogsatu") return config.headers_ms1;
    if (loginType === "messagelogdua") return config.headers_ms2;
    if (loginType === "goddumstag") return config.headers_goddumstag;
  }

  if (baseUrl === "https://dev.satuinbox.com") {
    if (loginType === "chickentester") return config.headers_CT;
    if (loginType === "goddevsa1") return config.headers_GD;
    if (loginType === "goddummy") return config.headers_GD;
    if (loginType === "messagelogsatu") return config.headers_ms1;
    if (loginType === "messagelogdua") return config.headers_ms2;
  }
  if (baseUrl === "https://dev-v2.satuinbox.com") {
    if (loginType === "chickentester") return config.headers_CT;
    if (loginType === "testerdummy01") return config.loginBody_testerdummy01;
  }
  if (baseUrl === "https://v2.satuinbox.com") {
    if (loginType === "tantaffgo") return config.loginBody_tantaffgo;
    if (loginType === "danyatminsatu") return config.loginBody_danyatminsatu;
  }

  throw new Error(`No headers found for baseUrl: ${baseUrl} `);
}

function getLoginBodyByLoginType(config, baseUrl, loginType) {
  if (baseUrl === "https://app.satuinbox.com") {
    if (loginType === "goddummyprod") return config.loginBody;
    if (loginType === "testing270520252")
      return config.loginBody_testing270520252;
    if (loginType === "prodtestingjuli")
      return config.loginBody_prodtestingjuli;
    if (loginType === "prodtestingakun1dua")
      return config.loginBody_prodtestingakun1dua;
    if (loginType === "chickentester") return config.headers_CT;
  }

  if (baseUrl === "https://staging.satuinbox.com") {
    if (loginType === "chickentester") return config.loginBody_CT;
    if (loginType === "goddevsa1") return config.loginBody_SAP;
    if (loginType === "goddummysa") return config.loginBodySuperAdminSap;
    if (loginType === "goddummy") return config.loginBody_GD_dev;
    if (loginType === "messagelogdua") return config.loginBody_ms2;
    if (loginType === "goddumstag") return config.loginBody_goddumstag;
  }

  if (baseUrl === "https://dev.satuinbox.com") {
    if (loginType === "chickentester") return config.loginBody_CT;
    if (loginType === "goddevsa1") return config.loginBody_SAP;
    if (loginType === "goddummysa") return config.loginBodySuperAdminSap;
    if (loginType === "goddummy") return config.loginBody_GD_dev;
    if (loginType === "messagelogdua") return config.loginBody_ms2;
    if (loginType === "spongebobkotak") return config.loginBody_bikini;
  }
  if (baseUrl === "https://dev-v2.satuinbox.com") {
    if (loginType === "chickentester") return config.loginBody_CT2;
    if (loginType === "testerdummy01") return config.loginBody_testerdummy01;
  }
  if (baseUrl === "https://v2.satuinbox.com") {
    if (loginType === "tantaffgo") return config.loginBody_tantaffgo;
    if (loginType === "danyatminsatu") return config.loginBody_danyatminsatu;
  }

  throw new Error(`No headers found for login type: ${loginType}`);
}

// Export the functions for use in test files
export { getHeaderByLoginType, getLoginBodyByLoginType };
