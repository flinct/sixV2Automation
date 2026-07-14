require("dotenv").config();

function envValue(name, fallback = "") {
  return process.env[name] || fallback;
}

function account(identifierEnv, passwordEnv, role, env, identifierFallback) {
  return {
    identifier: envValue(identifierEnv, identifierFallback),
    password: envValue(passwordEnv, "replace-me"),
    role,
    env,
    meta: {
      identifierEnv,
      passwordEnv,
      identifierFallback,
    },
  };
}

const testAccounts = {
  goddummy: account(
    "E2E_DEV_ADMIN_USER",
    "E2E_DEV_ADMIN_PASSWORD",
    "admin",
    ["dev", "local"],
    "dev-admin",
  ),
  goddummyprod: account(
    "E2E_PROD_ADMIN_USER",
    "E2E_PROD_ADMIN_PASSWORD",
    "admin",
    ["prod"],
    "prod-admin",
  ),
  goddummyprod2: account(
    "E2E_PROD_ADMIN_2_USER",
    "E2E_PROD_ADMIN_2_PASSWORD",
    "admin",
    ["prod"],
    "prod-admin-2",
  ),
  goddumstag: account(
    "E2E_STAGING_ADMIN_USER",
    "E2E_STAGING_ADMIN_PASSWORD",
    "admin",
    ["staging"],
    "staging-admin",
  ),

  cekerayam01: account(
    "E2E_DEV_ADMIN_USER",
    "E2E_DEV_ADMIN_PASSWORD",
    "admin",
    ["dev"],
    "dev-admin",
  ),
  mataayam01: account(
    "E2E_DEV_SUPERVISOR_USER",
    "E2E_DEV_SUPERVISOR_PASSWORD",
    "supervisor",
    ["dev"],
    "dev-supervisor",
  ),
  leherayam01: account(
    "E2E_DEV_AGENT_USER",
    "E2E_DEV_AGENT_PASSWORD",
    "agent",
    ["dev"],
    "dev-agent",
  ),

  chickentester01: account(
    "E2E_DEV_ADMIN_USER",
    "E2E_DEV_ADMIN_PASSWORD",
    "admin",
    ["dev"],
    "dev-admin",
  ),
  CT2: account(
    "E2E_DEV_ADMIN_USER",
    "E2E_DEV_ADMIN_PASSWORD",
    "admin",
    ["dev"],
    "dev-admin",
  ),

  messagelogdua: account(
    "E2E_MESSAGE_LOG_USER",
    "E2E_MESSAGE_LOG_PASSWORD",
    "agent",
    ["dev", "prod"],
    "message-log-agent",
  ),
  prodtestingjuli: account(
    "E2E_PROD_AGENT_USER",
    "E2E_PROD_AGENT_PASSWORD",
    "agent",
    ["prod"],
    "prod-agent",
  ),
  prodtestingakun1dua: account(
    "E2E_PROD_AGENT_2_USER",
    "E2E_PROD_AGENT_2_PASSWORD",
    "agent",
    ["prod"],
    "prod-agent-2",
  ),
  testerdummy01: account(
    "E2E_PROD_TESTER_USER",
    "E2E_PROD_TESTER_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-tester",
  ),

  tantaffgo01: account(
    "E2E_taffgo_ADMIN_USER",
    "E2E_taffgo_ADMIN_PASSWORD",
    "admin",
    ["prod"],
    "prod-admin",
  ),
  danyatmin01: account(
    "E2E_taffgo_ADMIN_USER",
    "E2E_taffgo_ADMIN_PASSWORD",
    "admin",
    ["dev", "prod"],
    "prod-admin",
  ),
  danyagent01: account(
    "E2E_taffgo_AGENT_USER",
    "E2E_taffgo_AGENT_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  danyagent02: account(
    "E2E_taffgo_AGENT2_USER",
    "E2E_taffgo_AGENT2_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  danyagent03: account(
    "E2E_taffgo_AGENT3_USER",
    "E2E_taffgo_AGENT3_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  danyagent04: account(
    "E2E_taffgo_AGENT4_USER",
    "E2E_taffgo_AGENT4_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  danyspv01: account(
    "E2E_taffgo_SUPERVISOR_USER",
    "E2E_taffgo_SUPERVISOR_PASSWORD",
    "supervisor",
    ["dev", "prod"],
    "prod-supervisor",
  ),
  danyspv02: account(
    "E2E_taffgo_SUPERVISOR2_USER",
    "E2E_taffgo_SUPERVISOR2_PASSWORD",
    "supervisor ",
    ["dev", "prod"],
    "prod-supervisor",
  ),
  leherdany01: account(
    "E2E_taffgo_SUPERVISOR_USER",
    "E2E_taffgo_SUPERVISOR_PASSWORD",
    "supervisor ",
    ["dev", "prod"],
    "prod-supervisor",
  ),

  //SAPaccount
  bdbagent01: account(
    "E2E_sap_AGENT1_USER",
    "E2E_sap_AGENT1_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bdoagent01: account(
    "E2E_sap_AGENT2_USER",
    "E2E_sap_AGENT2_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bduagent01: account(
    "E2E_sap_AGENT3_USER",
    "E2E_sap_AGENT3_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  agragent01: account(
    "E2E_sap_AGENT4_USER",
    "E2E_sap_AGENT4_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  financesuperadmin: account(
    "E2E_sap_AGENT5_USER",
    "E2E_sap_AGENT5_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  atcagent01: account(
    "E2E_sap_AGENT6_USER",
    "E2E_sap_AGENT6_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bjiagent01: account(
    "E2E_sap_AGENT7_USER",
    "E2E_sap_AGENT7_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  atbagent01: account(
    "E2E_sap_AGENT8_USER",
    "E2E_sap_AGENT8_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bjoagent01: account(
    "E2E_sap_AGENT9_USER",
    "E2E_sap_AGENT9_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bktagent01: account(
    "E2E_sap_AGENT10_USER",
    "E2E_sap_AGENT10_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  goddummyprod: account(
    "E2E_sap_AGENT11_USER",
    "E2E_sap_AGENT11_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bjbagent01: account(
    "E2E_sap_AGENT12_USER",
    "E2E_sap_AGENT12_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bgkagent01: account(
    "E2E_sap_AGENT13_USER",
    "E2E_sap_AGENT13_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  aegagent01: account(
    "E2E_sap_AGENT14_USER",
    "E2E_sap_AGENT14_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bibagent01: account(
    "E2E_sap_AGENT15_USER",
    "E2E_sap_AGENT15_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  blgagent01: account(
    "E2E_sap_AGENT16_USER",
    "E2E_sap_AGENT16_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  techagent: account(
    "E2E_sap_AGENT17_USER",
    "E2E_sap_AGENT17_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bdjagent01: account(
    "E2E_sap_AGENT18_USER",
    "E2E_sap_AGENT18_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bdwagent01: account(
    "E2E_sap_AGENT19_USER",
    "E2E_sap_AGENT19_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bkiagent01: account(
    "E2E_sap_AGENT20_USER",
    "E2E_sap_AGENT20_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  amqagent01: account(
    "E2E_sap_AGENT21_USER",
    "E2E_sap_AGENT21_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bbragent01: account(
    "E2E_sap_AGENT22_USER",
    "E2E_sap_AGENT22_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bikagent01: account(
    "E2E_sap_AGENT23_USER",
    "E2E_sap_AGENT23_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bejagent01: account(
    "E2E_sap_AGENT24_USER",
    "E2E_sap_AGENT24_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bknagent01: account(
    "E2E_sap_AGENT25_USER",
    "E2E_sap_AGENT25_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bitagent01: account(
    "E2E_sap_AGENT26_USER",
    "E2E_sap_AGENT26_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bksagent01: account(
    "E2E_sap_AGENT27_USER",
    "E2E_sap_AGENT27_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bkoagent01: account(
    "E2E_sap_AGENT28_USER",
    "E2E_sap_AGENT28_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bjnagent01: account(
    "E2E_sap_AGENT29_USER",
    "E2E_sap_AGENT29_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  goddummyprod2: account(
    "E2E_sap_AGENT30_USER",
    "E2E_sap_AGENT30_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  booagent01: account(
    "E2E_sap_AGENT31_USER",
    "E2E_sap_AGENT31_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bwxagent01: account(
    "E2E_sap_AGENT32_USER",
    "E2E_sap_AGENT32_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jbbagent01: account(
    "E2E_sap_AGENT33_USER",
    "E2E_sap_AGENT33_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ltmagent01: account(
    "E2E_sap_AGENT34_USER",
    "E2E_sap_AGENT34_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mjaagent01: account(
    "E2E_sap_AGENT35_USER",
    "E2E_sap_AGENT35_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mueagent01: account(
    "E2E_sap_AGENT36_USER",
    "E2E_sap_AGENT36_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  nbxagent01: account(
    "E2E_sap_AGENT37_USER",
    "E2E_sap_AGENT37_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pgiagent01: account(
    "E2E_sap_AGENT38_USER",
    "E2E_sap_AGENT38_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pwkagent01: account(
    "E2E_sap_AGENT39_USER",
    "E2E_sap_AGENT39_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  skwagent01: account(
    "E2E_sap_AGENT40_USER",
    "E2E_sap_AGENT40_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  smiagent01: account(
    "E2E_sap_AGENT41_USER",
    "E2E_sap_AGENT41_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sppagent01: account(
    "E2E_sap_AGENT42_USER",
    "E2E_sap_AGENT42_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tbnagent01: account(
    "E2E_sap_AGENT43_USER",
    "E2E_sap_AGENT43_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx023: account(
    "E2E_sap_AGENT44_USER",
    "E2E_sap_AGENT44_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx025: account(
    "E2E_sap_AGENT45_USER",
    "E2E_sap_AGENT45_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx029: account(
    "E2E_sap_AGENT46_USER",
    "E2E_sap_AGENT46_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx044: account(
    "E2E_sap_AGENT47_USER",
    "E2E_sap_AGENT47_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx045: account(
    "E2E_sap_AGENT48_USER",
    "E2E_sap_AGENT48_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx051: account(
    "E2E_sap_AGENT49_USER",
    "E2E_sap_AGENT49_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx054: account(
    "E2E_sap_AGENT50_USER",
    "E2E_sap_AGENT50_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx055: account(
    "E2E_sap_AGENT51_USER",
    "E2E_sap_AGENT51_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx069: account(
    "E2E_sap_AGENT52_USER",
    "E2E_sap_AGENT52_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx074: account(
    "E2E_sap_AGENT53_USER",
    "E2E_sap_AGENT53_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx087: account(
    "E2E_sap_AGENT54_USER",
    "E2E_sap_AGENT54_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead01: account(
    "E2E_sap_AGENT55_USER",
    "E2E_sap_AGENT55_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  brjagent01: account(
    "E2E_sap_AGENT56_USER",
    "E2E_sap_AGENT56_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cimagent01: account(
    "E2E_sap_AGENT57_USER",
    "E2E_sap_AGENT57_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  dryagent01: account(
    "E2E_sap_AGENT58_USER",
    "E2E_sap_AGENT58_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  idyagent01: account(
    "E2E_sap_AGENT59_USER",
    "E2E_sap_AGENT59_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jbragent01: account(
    "E2E_sap_AGENT60_USER",
    "E2E_sap_AGENT60_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jktagent01: account(
    "E2E_sap_AGENT61_USER",
    "E2E_sap_AGENT61_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  knoagent01: account(
    "E2E_sap_AGENT62_USER",
    "E2E_sap_AGENT62_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kpnagent01: account(
    "E2E_sap_AGENT63_USER",
    "E2E_sap_AGENT63_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lswagent01: account(
    "E2E_sap_AGENT64_USER",
    "E2E_sap_AGENT64_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pboagent01: account(
    "E2E_sap_AGENT65_USER",
    "E2E_sap_AGENT65_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pklagent01: account(
    "E2E_sap_AGENT66_USER",
    "E2E_sap_AGENT66_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pwdagent01: account(
    "E2E_sap_AGENT67_USER",
    "E2E_sap_AGENT67_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rmbagent01: account(
    "E2E_sap_AGENT68_USER",
    "E2E_sap_AGENT68_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  spnagent01: account(
    "E2E_sap_AGENT69_USER",
    "E2E_sap_AGENT69_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tjqagent01: account(
    "E2E_sap_AGENT70_USER",
    "E2E_sap_AGENT70_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tliagent01: account(
    "E2E_sap_AGENT71_USER",
    "E2E_sap_AGENT71_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  trgagent01: account(
    "E2E_sap_AGENT72_USER",
    "E2E_sap_AGENT72_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  trjagent01: account(
    "E2E_sap_AGENT73_USER",
    "E2E_sap_AGENT73_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx004: account(
    "E2E_sap_AGENT74_USER",
    "E2E_sap_AGENT74_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx011: account(
    "E2E_sap_AGENT75_USER",
    "E2E_sap_AGENT75_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx020: account(
    "E2E_sap_AGENT76_USER",
    "E2E_sap_AGENT76_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx042: account(
    "E2E_sap_AGENT77_USER",
    "E2E_sap_AGENT77_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx057: account(
    "E2E_sap_AGENT78_USER",
    "E2E_sap_AGENT78_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx081: account(
    "E2E_sap_AGENT79_USER",
    "E2E_sap_AGENT79_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead10: account(
    "E2E_sap_AGENT80_USER",
    "E2E_sap_AGENT80_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead12: account(
    "E2E_sap_AGENT81_USER",
    "E2E_sap_AGENT81_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  btgagent01: account(
    "E2E_sap_AGENT82_USER",
    "E2E_sap_AGENT82_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  btwagent01: account(
    "E2E_sap_AGENT83_USER",
    "E2E_sap_AGENT83_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cmsagent01: account(
    "E2E_sap_AGENT84_USER",
    "E2E_sap_AGENT84_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jbaagent01: account(
    "E2E_sap_AGENT85_USER",
    "E2E_sap_AGENT85_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lhtagent01: account(
    "E2E_sap_AGENT86_USER",
    "E2E_sap_AGENT86_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mglagent01: account(
    "E2E_sap_AGENT87_USER",
    "E2E_sap_AGENT87_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pgkagent01: account(
    "E2E_sap_AGENT88_USER",
    "E2E_sap_AGENT88_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pwoagent01: account(
    "E2E_sap_AGENT89_USER",
    "E2E_sap_AGENT89_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sraagent01: account(
    "E2E_sap_AGENT90_USER",
    "E2E_sap_AGENT90_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  suuagent01: account(
    "E2E_sap_AGENT91_USER",
    "E2E_sap_AGENT91_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tpbagent01: account(
    "E2E_sap_AGENT92_USER",
    "E2E_sap_AGENT92_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx038: account(
    "E2E_sap_AGENT93_USER",
    "E2E_sap_AGENT93_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx040: account(
    "E2E_sap_AGENT94_USER",
    "E2E_sap_AGENT94_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx046: account(
    "E2E_sap_AGENT95_USER",
    "E2E_sap_AGENT95_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx052: account(
    "E2E_sap_AGENT96_USER",
    "E2E_sap_AGENT96_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx065: account(
    "E2E_sap_AGENT97_USER",
    "E2E_sap_AGENT97_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx080: account(
    "E2E_sap_AGENT98_USER",
    "E2E_sap_AGENT98_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead07: account(
    "E2E_sap_AGENT99_USER",
    "E2E_sap_AGENT99_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bobagent01: account(
    "E2E_sap_AGENT100_USER",
    "E2E_sap_AGENT100_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  briagent01: account(
    "E2E_sap_AGENT101_USER",
    "E2E_sap_AGENT101_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  gnsagent01: account(
    "E2E_sap_AGENT102_USER",
    "E2E_sap_AGENT102_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kkaagent01: account(
    "E2E_sap_AGENT103_USER",
    "E2E_sap_AGENT103_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  krwagent01: account(
    "E2E_sap_AGENT104_USER",
    "E2E_sap_AGENT104_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  llgagent01: account(
    "E2E_sap_AGENT105_USER",
    "E2E_sap_AGENT105_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mlbagent01: account(
    "E2E_sap_AGENT106_USER",
    "E2E_sap_AGENT106_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pkuagent01: account(
    "E2E_sap_AGENT107_USER",
    "E2E_sap_AGENT107_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  plmagent01: account(
    "E2E_sap_AGENT108_USER",
    "E2E_sap_AGENT108_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pnkagent01: account(
    "E2E_sap_AGENT109_USER",
    "E2E_sap_AGENT109_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ppuagent01: account(
    "E2E_sap_AGENT110_USER",
    "E2E_sap_AGENT110_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sbsagent01: account(
    "E2E_sap_AGENT111_USER",
    "E2E_sap_AGENT111_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  subagent01: account(
    "E2E_sap_AGENT112_USER",
    "E2E_sap_AGENT112_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tobagent01: account(
    "E2E_sap_AGENT113_USER",
    "E2E_sap_AGENT113_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  trlagent01: account(
    "E2E_sap_AGENT114_USER",
    "E2E_sap_AGENT114_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tsbagent01: account(
    "E2E_sap_AGENT115_USER",
    "E2E_sap_AGENT115_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  wngagent01: account(
    "E2E_sap_AGENT116_USER",
    "E2E_sap_AGENT116_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx003: account(
    "E2E_sap_AGENT117_USER",
    "E2E_sap_AGENT117_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx005: account(
    "E2E_sap_AGENT118_USER",
    "E2E_sap_AGENT118_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx010: account(
    "E2E_sap_AGENT119_USER",
    "E2E_sap_AGENT119_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx017: account(
    "E2E_sap_AGENT120_USER",
    "E2E_sap_AGENT120_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx030: account(
    "E2E_sap_AGENT121_USER",
    "E2E_sap_AGENT121_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx050: account(
    "E2E_sap_AGENT122_USER",
    "E2E_sap_AGENT122_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx060: account(
    "E2E_sap_AGENT123_USER",
    "E2E_sap_AGENT123_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx071: account(
    "E2E_sap_AGENT124_USER",
    "E2E_sap_AGENT124_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx072: account(
    "E2E_sap_AGENT125_USER",
    "E2E_sap_AGENT125_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  blsagent01: account(
    "E2E_sap_AGENT126_USER",
    "E2E_sap_AGENT126_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  brbagent01: account(
    "E2E_sap_AGENT127_USER",
    "E2E_sap_AGENT127_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  dpsagent01: account(
    "E2E_sap_AGENT128_USER",
    "E2E_sap_AGENT128_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ginagent01: account(
    "E2E_sap_AGENT129_USER",
    "E2E_sap_AGENT129_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kdragent01: account(
    "E2E_sap_AGENT130_USER",
    "E2E_sap_AGENT130_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  luwagent01: account(
    "E2E_sap_AGENT131_USER",
    "E2E_sap_AGENT131_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mesagent01: account(
    "E2E_sap_AGENT132_USER",
    "E2E_sap_AGENT132_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mlgagent01: account(
    "E2E_sap_AGENT133_USER",
    "E2E_sap_AGENT133_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mshagent01: account(
    "E2E_sap_AGENT134_USER",
    "E2E_sap_AGENT134_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mtwagent01: account(
    "E2E_sap_AGENT135_USER",
    "E2E_sap_AGENT135_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pciagent01: account(
    "E2E_sap_AGENT136_USER",
    "E2E_sap_AGENT136_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pdlagent01: account(
    "E2E_sap_AGENT137_USER",
    "E2E_sap_AGENT137_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  prmagent01: account(
    "E2E_sap_AGENT138_USER",
    "E2E_sap_AGENT138_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rapagent01: account(
    "E2E_sap_AGENT139_USER",
    "E2E_sap_AGENT139_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rhaagent01: account(
    "E2E_sap_AGENT140_USER",
    "E2E_sap_AGENT140_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sguagent01: account(
    "E2E_sap_AGENT141_USER",
    "E2E_sap_AGENT141_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sjoagent01: account(
    "E2E_sap_AGENT142_USER",
    "E2E_sap_AGENT142_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  skyagent01: account(
    "E2E_sap_AGENT143_USER",
    "E2E_sap_AGENT143_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tmhagent01: account(
    "E2E_sap_AGENT144_USER",
    "E2E_sap_AGENT144_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ttgagent01: account(
    "E2E_sap_AGENT145_USER",
    "E2E_sap_AGENT145_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx014: account(
    "E2E_sap_AGENT146_USER",
    "E2E_sap_AGENT146_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx024: account(
    "E2E_sap_AGENT147_USER",
    "E2E_sap_AGENT147_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sapxadmin01: account(
    "E2E_sap_AGENT148_USER",
    "E2E_sap_AGENT148_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ckragent01: account(
    "E2E_sap_AGENT149_USER",
    "E2E_sap_AGENT149_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  dpuagent01: account(
    "E2E_sap_AGENT150_USER",
    "E2E_sap_AGENT150_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  dumagent01: account(
    "E2E_sap_AGENT151_USER",
    "E2E_sap_AGENT151_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lkaagent01: account(
    "E2E_sap_AGENT152_USER",
    "E2E_sap_AGENT152_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lopagent01: account(
    "E2E_sap_AGENT153_USER",
    "E2E_sap_AGENT153_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mjkagent01: account(
    "E2E_sap_AGENT154_USER",
    "E2E_sap_AGENT154_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pknagent01: account(
    "E2E_sap_AGENT155_USER",
    "E2E_sap_AGENT155_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  psnagent01: account(
    "E2E_sap_AGENT156_USER",
    "E2E_sap_AGENT156_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sbbagent01: account(
    "E2E_sap_AGENT157_USER",
    "E2E_sap_AGENT157_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sitagent01: account(
    "E2E_sap_AGENT158_USER",
    "E2E_sap_AGENT158_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tgsagent01: account(
    "E2E_sap_AGENT159_USER",
    "E2E_sap_AGENT159_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tjsagent01: account(
    "E2E_sap_AGENT160_USER",
    "E2E_sap_AGENT160_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tsmagent01: account(
    "E2E_sap_AGENT161_USER",
    "E2E_sap_AGENT161_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  wnoagent01: account(
    "E2E_sap_AGENT162_USER",
    "E2E_sap_AGENT162_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx032: account(
    "E2E_sap_AGENT163_USER",
    "E2E_sap_AGENT163_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx033: account(
    "E2E_sap_AGENT164_USER",
    "E2E_sap_AGENT164_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx056: account(
    "E2E_sap_AGENT165_USER",
    "E2E_sap_AGENT165_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx067: account(
    "E2E_sap_AGENT166_USER",
    "E2E_sap_AGENT166_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bpnagent01: account(
    "E2E_sap_AGENT167_USER",
    "E2E_sap_AGENT167_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bthagent01: account(
    "E2E_sap_AGENT168_USER",
    "E2E_sap_AGENT168_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cbiagent01: account(
    "E2E_sap_AGENT169_USER",
    "E2E_sap_AGENT169_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  dmkagent01: account(
    "E2E_sap_AGENT170_USER",
    "E2E_sap_AGENT170_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  gntagent01: account(
    "E2E_sap_AGENT171_USER",
    "E2E_sap_AGENT171_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jogagent01: account(
    "E2E_sap_AGENT172_USER",
    "E2E_sap_AGENT172_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jsdagent01: account(
    "E2E_sap_AGENT173_USER",
    "E2E_sap_AGENT173_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kbmagent01: account(
    "E2E_sap_AGENT174_USER",
    "E2E_sap_AGENT174_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lmnagent01: account(
    "E2E_sap_AGENT175_USER",
    "E2E_sap_AGENT175_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  luvagent01: account(
    "E2E_sap_AGENT176_USER",
    "E2E_sap_AGENT176_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mdnagent01: account(
    "E2E_sap_AGENT177_USER",
    "E2E_sap_AGENT177_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mdragent01: account(
    "E2E_sap_AGENT178_USER",
    "E2E_sap_AGENT178_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pdgagent01: account(
    "E2E_sap_AGENT179_USER",
    "E2E_sap_AGENT179_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  psjagent01: account(
    "E2E_sap_AGENT180_USER",
    "E2E_sap_AGENT180_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ptsagent01: account(
    "E2E_sap_AGENT181_USER",
    "E2E_sap_AGENT181_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sofagent01: account(
    "E2E_sap_AGENT182_USER",
    "E2E_sap_AGENT182_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tbkagent01: account(
    "E2E_sap_AGENT183_USER",
    "E2E_sap_AGENT183_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tglagent01: account(
    "E2E_sap_AGENT184_USER",
    "E2E_sap_AGENT184_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tpragent01: account(
    "E2E_sap_AGENT185_USER",
    "E2E_sap_AGENT185_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx021: account(
    "E2E_sap_AGENT186_USER",
    "E2E_sap_AGENT186_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx047: account(
    "E2E_sap_AGENT187_USER",
    "E2E_sap_AGENT187_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx068: account(
    "E2E_sap_AGENT188_USER",
    "E2E_sap_AGENT188_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx079: account(
    "E2E_sap_AGENT189_USER",
    "E2E_sap_AGENT189_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bliagent01: account(
    "E2E_sap_AGENT190_USER",
    "E2E_sap_AGENT190_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  byiagent01: account(
    "E2E_sap_AGENT191_USER",
    "E2E_sap_AGENT191_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jkpagent01: account(
    "E2E_sap_AGENT192_USER",
    "E2E_sap_AGENT192_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jscagent01: account(
    "E2E_sap_AGENT193_USER",
    "E2E_sap_AGENT193_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  juaagent01: account(
    "E2E_sap_AGENT194_USER",
    "E2E_sap_AGENT194_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kagagent01: account(
    "E2E_sap_AGENT195_USER",
    "E2E_sap_AGENT195_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ktpagent01: account(
    "E2E_sap_AGENT196_USER",
    "E2E_sap_AGENT196_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mofagent01: account(
    "E2E_sap_AGENT197_USER",
    "E2E_sap_AGENT197_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ntxagent01: account(
    "E2E_sap_AGENT198_USER",
    "E2E_sap_AGENT198_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pliagent01: account(
    "E2E_sap_AGENT199_USER",
    "E2E_sap_AGENT199_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  plwagent01: account(
    "E2E_sap_AGENT200_USER",
    "E2E_sap_AGENT200_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sliagent01: account(
    "E2E_sap_AGENT201_USER",
    "E2E_sap_AGENT201_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tgbagent01: account(
    "E2E_sap_AGENT202_USER",
    "E2E_sap_AGENT202_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tlgagent01: account(
    "E2E_sap_AGENT203_USER",
    "E2E_sap_AGENT203_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tnbagent01: account(
    "E2E_sap_AGENT204_USER",
    "E2E_sap_AGENT204_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tnjagent01: account(
    "E2E_sap_AGENT205_USER",
    "E2E_sap_AGENT205_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx027: account(
    "E2E_sap_AGENT206_USER",
    "E2E_sap_AGENT206_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx036: account(
    "E2E_sap_AGENT207_USER",
    "E2E_sap_AGENT207_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx041: account(
    "E2E_sap_AGENT208_USER",
    "E2E_sap_AGENT208_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx058: account(
    "E2E_sap_AGENT209_USER",
    "E2E_sap_AGENT209_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx062: account(
    "E2E_sap_AGENT210_USER",
    "E2E_sap_AGENT210_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx064: account(
    "E2E_sap_AGENT211_USER",
    "E2E_sap_AGENT211_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx070: account(
    "E2E_sap_AGENT212_USER",
    "E2E_sap_AGENT212_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx078: account(
    "E2E_sap_AGENT213_USER",
    "E2E_sap_AGENT213_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx088: account(
    "E2E_sap_AGENT214_USER",
    "E2E_sap_AGENT214_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxpagent01: account(
    "E2E_sap_AGENT215_USER",
    "E2E_sap_AGENT215_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  djjagent01: account(
    "E2E_sap_AGENT216_USER",
    "E2E_sap_AGENT216_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jsbagent01: account(
    "E2E_sap_AGENT217_USER",
    "E2E_sap_AGENT217_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kbjagent01: account(
    "E2E_sap_AGENT218_USER",
    "E2E_sap_AGENT218_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kbtagent01: account(
    "E2E_sap_AGENT219_USER",
    "E2E_sap_AGENT219_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lbjagent01: account(
    "E2E_sap_AGENT220_USER",
    "E2E_sap_AGENT220_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lbpagent01: account(
    "E2E_sap_AGENT221_USER",
    "E2E_sap_AGENT221_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mdcagent01: account(
    "E2E_sap_AGENT222_USER",
    "E2E_sap_AGENT222_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  metagent01: account(
    "E2E_sap_AGENT223_USER",
    "E2E_sap_AGENT223_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mmjagent01: account(
    "E2E_sap_AGENT224_USER",
    "E2E_sap_AGENT224_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pmsagent01: account(
    "E2E_sap_AGENT225_USER",
    "E2E_sap_AGENT225_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ponagent01: account(
    "E2E_sap_AGENT226_USER",
    "E2E_sap_AGENT226_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  preagent01: account(
    "E2E_sap_AGENT227_USER",
    "E2E_sap_AGENT227_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sdwagent01: account(
    "E2E_sap_AGENT228_USER",
    "E2E_sap_AGENT228_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tbwagent01: account(
    "E2E_sap_AGENT229_USER",
    "E2E_sap_AGENT229_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  wmnagent01: account(
    "E2E_sap_AGENT230_USER",
    "E2E_sap_AGENT230_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx034: account(
    "E2E_sap_AGENT231_USER",
    "E2E_sap_AGENT231_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx035: account(
    "E2E_sap_AGENT232_USER",
    "E2E_sap_AGENT232_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx059: account(
    "E2E_sap_AGENT233_USER",
    "E2E_sap_AGENT233_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead02: account(
    "E2E_sap_AGENT234_USER",
    "E2E_sap_AGENT234_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bswagent01: account(
    "E2E_sap_AGENT235_USER",
    "E2E_sap_AGENT235_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  btuagent01: account(
    "E2E_sap_AGENT236_USER",
    "E2E_sap_AGENT236_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cbnagent01: account(
    "E2E_sap_AGENT237_USER",
    "E2E_sap_AGENT237_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  grtagent01: account(
    "E2E_sap_AGENT238_USER",
    "E2E_sap_AGENT238_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jbgagent01: account(
    "E2E_sap_AGENT239_USER",
    "E2E_sap_AGENT239_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kbpagent01: account(
    "E2E_sap_AGENT240_USER",
    "E2E_sap_AGENT240_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ktgagent01: account(
    "E2E_sap_AGENT241_USER",
    "E2E_sap_AGENT241_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lgsagent01: account(
    "E2E_sap_AGENT242_USER",
    "E2E_sap_AGENT242_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  prragent01: account(
    "E2E_sap_AGENT243_USER",
    "E2E_sap_AGENT243_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rtiagent01: account(
    "E2E_sap_AGENT244_USER",
    "E2E_sap_AGENT244_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sriagent01: account(
    "E2E_sap_AGENT245_USER",
    "E2E_sap_AGENT245_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  timagent01: account(
    "E2E_sap_AGENT246_USER",
    "E2E_sap_AGENT246_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tkgagent01: account(
    "E2E_sap_AGENT247_USER",
    "E2E_sap_AGENT247_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx019: account(
    "E2E_sap_AGENT248_USER",
    "E2E_sap_AGENT248_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  itsapx2026: account(
    "E2E_sap_AGENT249_USER",
    "E2E_sap_AGENT249_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  blkagent01: account(
    "E2E_sap_AGENT250_USER",
    "E2E_sap_AGENT250_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cjragent01: account(
    "E2E_sap_AGENT251_USER",
    "E2E_sap_AGENT251_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  crpagent01: account(
    "E2E_sap_AGENT252_USER",
    "E2E_sap_AGENT252_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kdsagent01: account(
    "E2E_sap_AGENT253_USER",
    "E2E_sap_AGENT253_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kltagent01: account(
    "E2E_sap_AGENT254_USER",
    "E2E_sap_AGENT254_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lmjagent01: account(
    "E2E_sap_AGENT255_USER",
    "E2E_sap_AGENT255_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mkqagent01: account(
    "E2E_sap_AGENT256_USER",
    "E2E_sap_AGENT256_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mkwagent01: account(
    "E2E_sap_AGENT257_USER",
    "E2E_sap_AGENT257_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pmlagent01: account(
    "E2E_sap_AGENT258_USER",
    "E2E_sap_AGENT258_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pykagent01: account(
    "E2E_sap_AGENT259_USER",
    "E2E_sap_AGENT259_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  stgagent01: account(
    "E2E_sap_AGENT260_USER",
    "E2E_sap_AGENT260_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tteagent01: account(
    "E2E_sap_AGENT261_USER",
    "E2E_sap_AGENT261_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx009: account(
    "E2E_sap_AGENT262_USER",
    "E2E_sap_AGENT262_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx012: account(
    "E2E_sap_AGENT263_USER",
    "E2E_sap_AGENT263_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx037: account(
    "E2E_sap_AGENT264_USER",
    "E2E_sap_AGENT264_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  btjagent01: account(
    "E2E_sap_AGENT265_USER",
    "E2E_sap_AGENT265_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kkpagent01: account(
    "E2E_sap_AGENT266_USER",
    "E2E_sap_AGENT266_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ksragent01: account(
    "E2E_sap_AGENT267_USER",
    "E2E_sap_AGENT267_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mrdagent01: account(
    "E2E_sap_AGENT268_USER",
    "E2E_sap_AGENT268_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ppnagent01: account(
    "E2E_sap_AGENT269_USER",
    "E2E_sap_AGENT269_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ptiagent01: account(
    "E2E_sap_AGENT270_USER",
    "E2E_sap_AGENT270_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sbgagent01: account(
    "E2E_sap_AGENT271_USER",
    "E2E_sap_AGENT271_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  srgagent01: account(
    "E2E_sap_AGENT272_USER",
    "E2E_sap_AGENT272_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tpeagent01: account(
    "E2E_sap_AGENT273_USER",
    "E2E_sap_AGENT273_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tpkagent01: account(
    "E2E_sap_AGENT274_USER",
    "E2E_sap_AGENT274_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  trkagent01: account(
    "E2E_sap_AGENT275_USER",
    "E2E_sap_AGENT275_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  wgpagent01: account(
    "E2E_sap_AGENT276_USER",
    "E2E_sap_AGENT276_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx013: account(
    "E2E_sap_AGENT277_USER",
    "E2E_sap_AGENT277_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx015: account(
    "E2E_sap_AGENT278_USER",
    "E2E_sap_AGENT278_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx031: account(
    "E2E_sap_AGENT279_USER",
    "E2E_sap_AGENT279_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx066: account(
    "E2E_sap_AGENT280_USER",
    "E2E_sap_AGENT280_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx083: account(
    "E2E_sap_AGENT281_USER",
    "E2E_sap_AGENT281_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx086: account(
    "E2E_sap_AGENT282_USER",
    "E2E_sap_AGENT282_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead04: account(
    "E2E_sap_AGENT283_USER",
    "E2E_sap_AGENT283_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead06: account(
    "E2E_sap_AGENT284_USER",
    "E2E_sap_AGENT284_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead08: account(
    "E2E_sap_AGENT285_USER",
    "E2E_sap_AGENT285_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  buwagent01: account(
    "E2E_sap_AGENT286_USER",
    "E2E_sap_AGENT286_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  eneagent01: account(
    "E2E_sap_AGENT287_USER",
    "E2E_sap_AGENT287_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  gstagent01: account(
    "E2E_sap_AGENT288_USER",
    "E2E_sap_AGENT288_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kbbagent01: account(
    "E2E_sap_AGENT289_USER",
    "E2E_sap_AGENT289_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kdiagent01: account(
    "E2E_sap_AGENT290_USER",
    "E2E_sap_AGENT290_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kngagent01: account(
    "E2E_sap_AGENT291_USER",
    "E2E_sap_AGENT291_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  krgagent01: account(
    "E2E_sap_AGENT292_USER",
    "E2E_sap_AGENT292_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ktbagent01: account(
    "E2E_sap_AGENT293_USER",
    "E2E_sap_AGENT293_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  seragent01: account(
    "E2E_sap_AGENT294_USER",
    "E2E_sap_AGENT294_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  socagent01: account(
    "E2E_sap_AGENT295_USER",
    "E2E_sap_AGENT295_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  soqagent01: account(
    "E2E_sap_AGENT296_USER",
    "E2E_sap_AGENT296_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  srjagent01: account(
    "E2E_sap_AGENT297_USER",
    "E2E_sap_AGENT297_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tgragent01: account(
    "E2E_sap_AGENT298_USER",
    "E2E_sap_AGENT298_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tubagent01: account(
    "E2E_sap_AGENT299_USER",
    "E2E_sap_AGENT299_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx001: account(
    "E2E_sap_AGENT300_USER",
    "E2E_sap_AGENT300_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx008: account(
    "E2E_sap_AGENT301_USER",
    "E2E_sap_AGENT301_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx048: account(
    "E2E_sap_AGENT302_USER",
    "E2E_sap_AGENT302_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx049: account(
    "E2E_sap_AGENT303_USER",
    "E2E_sap_AGENT303_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx077: account(
    "E2E_sap_AGENT304_USER",
    "E2E_sap_AGENT304_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx084: account(
    "E2E_sap_AGENT305_USER",
    "E2E_sap_AGENT305_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bruagent01: account(
    "E2E_sap_AGENT306_USER",
    "E2E_sap_AGENT306_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  clnagent01: account(
    "E2E_sap_AGENT307_USER",
    "E2E_sap_AGENT307_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  djbagent01: account(
    "E2E_sap_AGENT308_USER",
    "E2E_sap_AGENT308_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  dpkagent01: account(
    "E2E_sap_AGENT309_USER",
    "E2E_sap_AGENT309_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ffqagent01: account(
    "E2E_sap_AGENT310_USER",
    "E2E_sap_AGENT310_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jbcagent01: account(
    "E2E_sap_AGENT311_USER",
    "E2E_sap_AGENT311_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jsaagent01: account(
    "E2E_sap_AGENT312_USER",
    "E2E_sap_AGENT312_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kbsagent01: account(
    "E2E_sap_AGENT313_USER",
    "E2E_sap_AGENT313_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kbuagent01: account(
    "E2E_sap_AGENT314_USER",
    "E2E_sap_AGENT314_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kmaagent01: account(
    "E2E_sap_AGENT315_USER",
    "E2E_sap_AGENT315_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  plpagent01: account(
    "E2E_sap_AGENT316_USER",
    "E2E_sap_AGENT316_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pnnagent01: account(
    "E2E_sap_AGENT317_USER",
    "E2E_sap_AGENT317_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sstagent01: account(
    "E2E_sap_AGENT318_USER",
    "E2E_sap_AGENT318_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  unhagent01: account(
    "E2E_sap_AGENT319_USER",
    "E2E_sap_AGENT319_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  wtsagent01: account(
    "E2E_sap_AGENT320_USER",
    "E2E_sap_AGENT320_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx007: account(
    "E2E_sap_AGENT321_USER",
    "E2E_sap_AGENT321_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx016: account(
    "E2E_sap_AGENT322_USER",
    "E2E_sap_AGENT322_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx053: account(
    "E2E_sap_AGENT323_USER",
    "E2E_sap_AGENT323_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx073: account(
    "E2E_sap_AGENT324_USER",
    "E2E_sap_AGENT324_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead05: account(
    "E2E_sap_AGENT325_USER",
    "E2E_sap_AGENT325_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bmuagent01: account(
    "E2E_sap_AGENT326_USER",
    "E2E_sap_AGENT326_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  gtoagent01: account(
    "E2E_sap_AGENT327_USER",
    "E2E_sap_AGENT327_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jpaagent01: account(
    "E2E_sap_AGENT328_USER",
    "E2E_sap_AGENT328_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jpbagent01: account(
    "E2E_sap_AGENT329_USER",
    "E2E_sap_AGENT329_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jtbagent01: account(
    "E2E_sap_AGENT330_USER",
    "E2E_sap_AGENT330_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jtcagent01: account(
    "E2E_sap_AGENT331_USER",
    "E2E_sap_AGENT331_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jubagent01: account(
    "E2E_sap_AGENT332_USER",
    "E2E_sap_AGENT332_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  kdlagent01: account(
    "E2E_sap_AGENT333_USER",
    "E2E_sap_AGENT333_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pkyagent01: account(
    "E2E_sap_AGENT334_USER",
    "E2E_sap_AGENT334_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pmkagent01: account(
    "E2E_sap_AGENT335_USER",
    "E2E_sap_AGENT335_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pspagent01: account(
    "E2E_sap_AGENT336_USER",
    "E2E_sap_AGENT336_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  slkagent01: account(
    "E2E_sap_AGENT337_USER",
    "E2E_sap_AGENT337_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tknagent01: account(
    "E2E_sap_AGENT338_USER",
    "E2E_sap_AGENT338_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  upgagent01: account(
    "E2E_sap_AGENT339_USER",
    "E2E_sap_AGENT339_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  utgagent01: account(
    "E2E_sap_AGENT340_USER",
    "E2E_sap_AGENT340_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  wnbagent01: account(
    "E2E_sap_AGENT341_USER",
    "E2E_sap_AGENT341_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx002: account(
    "E2E_sap_AGENT342_USER",
    "E2E_sap_AGENT342_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx006: account(
    "E2E_sap_AGENT343_USER",
    "E2E_sap_AGENT343_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx018tester: account(
    "E2E_sap_AGENT344_USER",
    "E2E_sap_AGENT344_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx022: account(
    "E2E_sap_AGENT345_USER",
    "E2E_sap_AGENT345_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx026: account(
    "E2E_sap_AGENT346_USER",
    "E2E_sap_AGENT346_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx028: account(
    "E2E_sap_AGENT347_USER",
    "E2E_sap_AGENT347_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx039: account(
    "E2E_sap_AGENT348_USER",
    "E2E_sap_AGENT348_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx061: account(
    "E2E_sap_AGENT349_USER",
    "E2E_sap_AGENT349_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx076: account(
    "E2E_sap_AGENT350_USER",
    "E2E_sap_AGENT350_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead03: account(
    "E2E_sap_AGENT351_USER",
    "E2E_sap_AGENT351_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  bnoagent01: account(
    "E2E_sap_AGENT352_USER",
    "E2E_sap_AGENT352_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  driagent01: account(
    "E2E_sap_AGENT353_USER",
    "E2E_sap_AGENT353_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  grsagent01: account(
    "E2E_sap_AGENT354_USER",
    "E2E_sap_AGENT354_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jbdagent01: account(
    "E2E_sap_AGENT355_USER",
    "E2E_sap_AGENT355_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  koeagent01: account(
    "E2E_sap_AGENT356_USER",
    "E2E_sap_AGENT356_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ltgagent01: account(
    "E2E_sap_AGENT357_USER",
    "E2E_sap_AGENT357_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pbmagent01: account(
    "E2E_sap_AGENT358_USER",
    "E2E_sap_AGENT358_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pkragent01: account(
    "E2E_sap_AGENT359_USER",
    "E2E_sap_AGENT359_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  prwagent01: account(
    "E2E_sap_AGENT360_USER",
    "E2E_sap_AGENT360_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rgtagent01: account(
    "E2E_sap_AGENT361_USER",
    "E2E_sap_AGENT361_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sgragent01: account(
    "E2E_sap_AGENT362_USER",
    "E2E_sap_AGENT362_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sjuagent01: account(
    "E2E_sap_AGENT363_USER",
    "E2E_sap_AGENT363_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  slgagent01: account(
    "E2E_sap_AGENT364_USER",
    "E2E_sap_AGENT364_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  smdagent01: account(
    "E2E_sap_AGENT365_USER",
    "E2E_sap_AGENT365_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  smqagent01: account(
    "E2E_sap_AGENT366_USER",
    "E2E_sap_AGENT366_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  swqagent01: account(
    "E2E_sap_AGENT367_USER",
    "E2E_sap_AGENT367_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tlwagent01: account(
    "E2E_sap_AGENT368_USER",
    "E2E_sap_AGENT368_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx043: account(
    "E2E_sap_AGENT369_USER",
    "E2E_sap_AGENT369_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx063: account(
    "E2E_sap_AGENT370_USER",
    "E2E_sap_AGENT370_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx075: account(
    "E2E_sap_AGENT371_USER",
    "E2E_sap_AGENT371_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx082: account(
    "E2E_sap_AGENT372_USER",
    "E2E_sap_AGENT372_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx085: account(
    "E2E_sap_AGENT373_USER",
    "E2E_sap_AGENT373_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead09: account(
    "E2E_sap_AGENT374_USER",
    "E2E_sap_AGENT374_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cxlead11: account(
    "E2E_sap_AGENT375_USER",
    "E2E_sap_AGENT375_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  septilead: account(
    "E2E_sap_AGENT376_USER",
    "E2E_sap_AGENT376_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  andilead: account(
    "E2E_sap_AGENT377_USER",
    "E2E_sap_AGENT377_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ruslanabdulgani: account(
    "E2E_sap_AGENT378_USER",
    "E2E_sap_AGENT378_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mayacarolina: account(
    "E2E_sap_AGENT379_USER",
    "E2E_sap_AGENT379_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  suriantoraviadichandra: account(
    "E2E_sap_AGENT380_USER",
    "E2E_sap_AGENT380_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx090: account(
    "E2E_sap_AGENT381_USER",
    "E2E_sap_AGENT381_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx093: account(
    "E2E_sap_AGENT382_USER",
    "E2E_sap_AGENT382_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sultonititopratama: account(
    "E2E_sap_AGENT383_USER",
    "E2E_sap_AGENT383_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  jeiskyaputrapratomo: account(
    "E2E_sap_AGENT384_USER",
    "E2E_sap_AGENT384_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  aliramdan: account(
    "E2E_sap_AGENT385_USER",
    "E2E_sap_AGENT385_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rizqidwikurniawan: account(
    "E2E_sap_AGENT386_USER",
    "E2E_sap_AGENT386_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  irmadyahsusanti: account(
    "E2E_sap_AGENT387_USER",
    "E2E_sap_AGENT387_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  iqbaltawakhal: account(
    "E2E_sap_AGENT388_USER",
    "E2E_sap_AGENT388_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  fakhrurrozi: account(
    "E2E_sap_AGENT389_USER",
    "E2E_sap_AGENT389_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sarifullah: account(
    "E2E_sap_AGENT390_USER",
    "E2E_sap_AGENT390_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  irwansetiawan: account(
    "E2E_sap_AGENT391_USER",
    "E2E_sap_AGENT391_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx092: account(
    "E2E_sap_AGENT392_USER",
    "E2E_sap_AGENT392_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rifkiordo24: account(
    "E2E_sap_AGENT393_USER",
    "E2E_sap_AGENT393_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  veronikadiask: account(
    "E2E_sap_AGENT394_USER",
    "E2E_sap_AGENT394_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  aldidwiseptiadi: account(
    "E2E_sap_AGENT395_USER",
    "E2E_sap_AGENT395_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rudisapx: account(
    "E2E_sap_AGENT396_USER",
    "E2E_sap_AGENT396_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  donacindyrachma: account(
    "E2E_sap_AGENT397_USER",
    "E2E_sap_AGENT397_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  yudisetiawan: account(
    "E2E_sap_AGENT398_USER",
    "E2E_sap_AGENT398_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lindahandayani: account(
    "E2E_sap_AGENT399_USER",
    "E2E_sap_AGENT399_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  muhammadrizky: account(
    "E2E_sap_AGENT400_USER",
    "E2E_sap_AGENT400_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  robisetiawan: account(
    "E2E_sap_AGENT401_USER",
    "E2E_sap_AGENT401_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rioyunaldi: account(
    "E2E_sap_AGENT402_USER",
    "E2E_sap_AGENT402_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  admintest: account(
    "E2E_sap_AGENT403_USER",
    "E2E_sap_AGENT403_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  adikhermawan: account(
    "E2E_sap_AGENT404_USER",
    "E2E_sap_AGENT404_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tengkufachrurrazi: account(
    "E2E_sap_AGENT405_USER",
    "E2E_sap_AGENT405_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lailatulrohmah: account(
    "E2E_sap_AGENT406_USER",
    "E2E_sap_AGENT406_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  yaserslamatzega: account(
    "E2E_sap_AGENT407_USER",
    "E2E_sap_AGENT407_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  dhonnyirfansyah: account(
    "E2E_sap_AGENT408_USER",
    "E2E_sap_AGENT408_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  tikayunirma: account(
    "E2E_sap_AGENT409_USER",
    "E2E_sap_AGENT409_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  lianurbaiti: account(
    "E2E_sap_AGENT410_USER",
    "E2E_sap_AGENT410_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  adityonugroho: account(
    "E2E_sap_AGENT411_USER",
    "E2E_sap_AGENT411_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rendiwinardo: account(
    "E2E_sap_AGENT412_USER",
    "E2E_sap_AGENT412_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rachmadhidayat: account(
    "E2E_sap_AGENT413_USER",
    "E2E_sap_AGENT413_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  pratiwirhapsari: account(
    "E2E_sap_AGENT414_USER",
    "E2E_sap_AGENT414_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  mochamadibnurizky: account(
    "E2E_sap_AGENT415_USER",
    "E2E_sap_AGENT415_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  panjiandhika: account(
    "E2E_sap_AGENT416_USER",
    "E2E_sap_AGENT416_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  rezaaffandirambe: account(
    "E2E_sap_AGENT417_USER",
    "E2E_sap_AGENT417_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ambyah: account(
    "E2E_sap_AGENT418_USER",
    "E2E_sap_AGENT418_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  yosromaidi: account(
    "E2E_sap_AGENT419_USER",
    "E2E_sap_AGENT419_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx089: account(
    "E2E_sap_AGENT420_USER",
    "E2E_sap_AGENT420_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx091: account(
    "E2E_sap_AGENT421_USER",
    "E2E_sap_AGENT421_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx094: account(
    "E2E_sap_AGENT422_USER",
    "E2E_sap_AGENT422_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  satriomuttaqien: account(
    "E2E_sap_AGENT423_USER",
    "E2E_sap_AGENT423_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  juniawatigunawan: account(
    "E2E_sap_AGENT424_USER",
    "E2E_sap_AGENT424_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sulhah: account(
    "E2E_sap_AGENT425_USER",
    "E2E_sap_AGENT425_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  sudarmono: account(
    "E2E_sap_AGENT426_USER",
    "E2E_sap_AGENT426_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx095: account(
    "E2E_sap_AGENT427_USER",
    "E2E_sap_AGENT427_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx096: account(
    "E2E_sap_AGENT428_USER",
    "E2E_sap_AGENT428_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx097: account(
    "E2E_sap_AGENT429_USER",
    "E2E_sap_AGENT429_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  dickyramadhanrwiyanto: account(
    "E2E_sap_AGENT430_USER",
    "E2E_sap_AGENT430_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  dodolead: account(
    "E2E_sap_AGENT431_USER",
    "E2E_sap_AGENT431_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cahayamuslim: account(
    "E2E_sap_AGENT432_USER",
    "E2E_sap_AGENT432_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  ariewahjoeprabowo: account(
    "E2E_sap_AGENT433_USER",
    "E2E_sap_AGENT433_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  anggadwikurniawan: account(
    "E2E_sap_AGENT434_USER",
    "E2E_sap_AGENT434_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  salestest: account(
    "E2E_sap_AGENT435_USER",
    "E2E_sap_AGENT435_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  salestestspv: account(
    "E2E_sap_AGENT436_USER",
    "E2E_sap_AGENT436_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  supportagent01: account(
    "E2E_sap_AGENT437_USER",
    "E2E_sap_AGENT437_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  supportagent02: account(
    "E2E_sap_AGENT438_USER",
    "E2E_sap_AGENT438_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx098: account(
    "E2E_sap_AGENT439_USER",
    "E2E_sap_AGENT439_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  cx0099: account(
    "E2E_sap_AGENT440_USER",
    "E2E_sap_AGENT440_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  //SAPaccount

  //LINCAHaccount
  deakhaerun: account(
    "E2E_lincah_AGENT1_USER",
    "E2E_lincah_AGENT1_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  trihartinahtitin: account(
    "E2E_lincah_AGENT2_USER",
    "E2E_lincah_AGENT2_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  putrisadian8: account(
    "E2E_lincah_AGENT3_USER",
    "E2E_lincah_AGENT3_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rahmahdesfi: account(
    "E2E_lincah_AGENT4_USER",
    "E2E_lincah_AGENT4_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ristikurnia6: account(
    "E2E_lincah_AGENT5_USER",
    "E2E_lincah_AGENT5_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  testeragent01: account(
    "E2E_lincah_AGENT6_USER",
    "E2E_lincah_AGENT6_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bpangra: account(
    "E2E_lincah_AGENT7_USER",
    "E2E_lincah_AGENT7_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pamungkasaji435: account(
    "E2E_lincah_AGENT8_USER",
    "E2E_lincah_AGENT8_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  maliamal2503: account(
    "E2E_lincah_AGENT9_USER",
    "E2E_lincah_AGENT9_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ningsihwiyati514: account(
    "E2E_lincah_AGENT10_USER",
    "E2E_lincah_AGENT10_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  admintest01: account(
    "E2E_lincah_AGENT11_USER",
    "E2E_lincah_AGENT11_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  yohanes: account(
    "E2E_lincah_AGENT12_USER",
    "E2E_lincah_AGENT12_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rositaneni851: account(
    "E2E_lincah_AGENT13_USER",
    "E2E_lincah_AGENT13_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  awanglincah: account(
    "E2E_lincah_AGENT14_USER",
    "E2E_lincah_AGENT14_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  silviaviyaa21: account(
    "E2E_lincah_AGENT15_USER",
    "E2E_lincah_AGENT15_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  nadialch: account(
    "E2E_lincah_AGENT16_USER",
    "E2E_lincah_AGENT16_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  anakkicil96: account(
    "E2E_lincah_AGENT17_USER",
    "E2E_lincah_AGENT17_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  widiwidi: account(
    "E2E_lincah_AGENT18_USER",
    "E2E_lincah_AGENT18_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  itapusspitasari: account(
    "E2E_lincah_AGENT19_USER",
    "E2E_lincah_AGENT19_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  aprilch: account(
    "E2E_lincah_AGENT20_USER",
    "E2E_lincah_AGENT20_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  satuinboxlincah: account(
    "E2E_lincah_AGENT21_USER",
    "E2E_lincah_AGENT21_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  testeradminlch: account(
    "E2E_lincah_AGENT22_USER",
    "E2E_lincah_AGENT22_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tester: account(
    "E2E_lincah_AGENT23_USER",
    "E2E_lincah_AGENT23_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  widiakiki215: account(
    "E2E_lincah_AGENT24_USER",
    "E2E_lincah_AGENT24_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  "gilang.ramadhan@ordo.co.id": account(
    "E2E_lincah_AGENT25_USER",
    "E2E_lincah_AGENT25_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kamil4: account(
    "E2E_lincah_AGENT26_USER",
    "E2E_lincah_AGENT26_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  muhammadrifaldiharahap3: account(
    "E2E_lincah_AGENT27_USER",
    "E2E_lincah_AGENT27_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ajieee: account(
    "E2E_lincah_AGENT28_USER",
    "E2E_lincah_AGENT28_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  denintams: account(
    "E2E_lincah_AGENT29_USER",
    "E2E_lincah_AGENT29_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  "lincahsumbawa@gmail.com": account(
    "E2E_lincah_AGENT30_USER",
    "E2E_lincah_AGENT30_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jinimardiani: account(
    "E2E_lincah_AGENT31_USER",
    "E2E_lincah_AGENT31_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dikolincah: account(
    "E2E_lincah_AGENT32_USER",
    "E2E_lincah_AGENT32_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bayu85: account(
    "E2E_lincah_AGENT33_USER",
    "E2E_lincah_AGENT33_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  vialincah: account(
    "E2E_lincah_AGENT34_USER",
    "E2E_lincah_AGENT34_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sumbawaaji: account(
    "E2E_lincah_AGENT35_USER",
    "E2E_lincah_AGENT35_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  aris12: account(
    "E2E_lincah_AGENT36_USER",
    "E2E_lincah_AGENT36_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  alyalincah: account(
    "E2E_lincah_AGENT37_USER",
    "E2E_lincah_AGENT37_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  "081324823932": account(
    "E2E_lincah_AGENT38_USER",
    "E2E_lincah_AGENT38_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kristanti05: account(
    "E2E_lincah_AGENT39_USER",
    "E2E_lincah_AGENT39_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  "agung.oktavia@ordonesia.com": account(
    "E2E_lincah_AGENT40_USER",
    "E2E_lincah_AGENT40_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rifailavaaa: account(
    "E2E_lincah_AGENT41_USER",
    "E2E_lincah_AGENT41_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  nandaputralincah: account(
    "E2E_lincah_AGENT42_USER",
    "E2E_lincah_AGENT42_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dwnviaa05: account(
    "E2E_lincah_AGENT43_USER",
    "E2E_lincah_AGENT43_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  deakhae: account(
    "E2E_lincah_AGENT44_USER",
    "E2E_lincah_AGENT44_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  zanuar: account(
    "E2E_lincah_AGENT45_USER",
    "E2E_lincah_AGENT45_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  //LINCAHaccount

  //LINCAHaccountdev
  itapusspitasari: account(
    "E2E_lincah_AGENT1_USER",
    "E2E_lincah_AGENT1_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  satuinboxlincah: account(
    "E2E_lincah_AGENT2_USER",
    "E2E_lincah_AGENT2_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tester: account(
    "E2E_lincah_AGENT3_USER",
    "E2E_lincah_AGENT3_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  maliamal2503: account(
    "E2E_lincah_AGENT4_USER",
    "E2E_lincah_AGENT4_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  nadialch: account(
    "E2E_lincah_AGENT5_USER",
    "E2E_lincah_AGENT5_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  silviaviyaa21: account(
    "E2E_lincah_AGENT6_USER",
    "E2E_lincah_AGENT6_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  anakkicil96: account(
    "E2E_lincah_AGENT7_USER",
    "E2E_lincah_AGENT7_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  deakhaerun: account(
    "E2E_lincah_AGENT8_USER",
    "E2E_lincah_AGENT8_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rahmahdesfi: account(
    "E2E_lincah_AGENT9_USER",
    "E2E_lincah_AGENT9_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  trihartinahtitin: account(
    "E2E_lincah_AGENT10_USER",
    "E2E_lincah_AGENT10_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bpangra: account(
    "E2E_lincah_AGENT11_USER",
    "E2E_lincah_AGENT11_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  awanglincah: account(
    "E2E_lincah_AGENT12_USER",
    "E2E_lincah_AGENT12_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ningsihwiyati514: account(
    "E2E_lincah_AGENT13_USER",
    "E2E_lincah_AGENT13_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  yohanes: account(
    "E2E_lincah_AGENT14_USER",
    "E2E_lincah_AGENT14_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  widiwidi: account(
    "E2E_lincah_AGENT15_USER",
    "E2E_lincah_AGENT15_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rositaneni851: account(
    "E2E_lincah_AGENT16_USER",
    "E2E_lincah_AGENT16_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  widiakiki215: account(
    "E2E_lincah_AGENT17_USER",
    "E2E_lincah_AGENT17_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ristikurnia6: account(
    "E2E_lincah_AGENT18_USER",
    "E2E_lincah_AGENT18_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  putrisadian8: account(
    "E2E_lincah_AGENT19_USER",
    "E2E_lincah_AGENT19_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pamungkasaji435: account(
    "E2E_lincah_AGENT20_USER",
    "E2E_lincah_AGENT20_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  aprilch: account(
    "E2E_lincah_AGENT21_USER",
    "E2E_lincah_AGENT21_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  //LINCAHaccountdev

  //SAPaccountdev
  jbdagent01: account(
    "E2E_sapDEV_AGENT1_USER",
    "E2E_sapDEV_AGENT1_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  testing: account(
    "E2E_sapDEV_AGENT2_USER",
    "E2E_sapDEV_AGENT2_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  admin002: account(
    "E2E_sapDEV_AGENT3_USER",
    "E2E_sapDEV_AGENT3_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  atcagent01: account(
    "E2E_sapDEV_AGENT4_USER",
    "E2E_sapDEV_AGENT4_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bdjagent01: account(
    "E2E_sapDEV_AGENT5_USER",
    "E2E_sapDEV_AGENT5_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bdwagent01: account(
    "E2E_sapDEV_AGENT6_USER",
    "E2E_sapDEV_AGENT6_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bgkagent01: account(
    "E2E_sapDEV_AGENT7_USER",
    "E2E_sapDEV_AGENT7_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bibagent01: account(
    "E2E_sapDEV_AGENT8_USER",
    "E2E_sapDEV_AGENT8_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bklagent01: account(
    "E2E_sapDEV_AGENT9_USER",
    "E2E_sapDEV_AGENT9_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bknagent01: account(
    "E2E_sapDEV_AGENT10_USER",
    "E2E_sapDEV_AGENT10_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bkoagent01: account(
    "E2E_sapDEV_AGENT11_USER",
    "E2E_sapDEV_AGENT11_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bnoagent01: account(
    "E2E_sapDEV_AGENT12_USER",
    "E2E_sapDEV_AGENT12_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bpnagent01: account(
    "E2E_sapDEV_AGENT13_USER",
    "E2E_sapDEV_AGENT13_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  briagent01: account(
    "E2E_sapDEV_AGENT14_USER",
    "E2E_sapDEV_AGENT14_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  brjagent01: account(
    "E2E_sapDEV_AGENT15_USER",
    "E2E_sapDEV_AGENT15_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  btjagent01: account(
    "E2E_sapDEV_AGENT16_USER",
    "E2E_sapDEV_AGENT16_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  cbiagent01: account(
    "E2E_sapDEV_AGENT17_USER",
    "E2E_sapDEV_AGENT17_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ckpagent01: account(
    "E2E_sapDEV_AGENT18_USER",
    "E2E_sapDEV_AGENT18_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  cmsagent01: account(
    "E2E_sapDEV_AGENT19_USER",
    "E2E_sapDEV_AGENT19_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dumagent01: account(
    "E2E_sapDEV_AGENT20_USER",
    "E2E_sapDEV_AGENT20_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gnsagent01: account(
    "E2E_sapDEV_AGENT21_USER",
    "E2E_sapDEV_AGENT21_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jbaagent01: account(
    "E2E_sapDEV_AGENT22_USER",
    "E2E_sapDEV_AGENT22_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jksagent01: account(
    "E2E_sapDEV_AGENT23_USER",
    "E2E_sapDEV_AGENT23_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jktagent01: account(
    "E2E_sapDEV_AGENT24_USER",
    "E2E_sapDEV_AGENT24_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jogagent01: account(
    "E2E_sapDEV_AGENT25_USER",
    "E2E_sapDEV_AGENT25_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jscagent01: account(
    "E2E_sapDEV_AGENT26_USER",
    "E2E_sapDEV_AGENT26_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jubagent01: account(
    "E2E_sapDEV_AGENT27_USER",
    "E2E_sapDEV_AGENT27_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kbbagent01: account(
    "E2E_sapDEV_AGENT28_USER",
    "E2E_sapDEV_AGENT28_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kbmagent01: account(
    "E2E_sapDEV_AGENT29_USER",
    "E2E_sapDEV_AGENT29_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kdiagent01: account(
    "E2E_sapDEV_AGENT30_USER",
    "E2E_sapDEV_AGENT30_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kdlagent01: account(
    "E2E_sapDEV_AGENT31_USER",
    "E2E_sapDEV_AGENT31_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  krgagent01: account(
    "E2E_sapDEV_AGENT32_USER",
    "E2E_sapDEV_AGENT32_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ksragent01: account(
    "E2E_sapDEV_AGENT33_USER",
    "E2E_sapDEV_AGENT33_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ktpagent01: account(
    "E2E_sapDEV_AGENT34_USER",
    "E2E_sapDEV_AGENT34_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lbjagent01: account(
    "E2E_sapDEV_AGENT35_USER",
    "E2E_sapDEV_AGENT35_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lhtagent01: account(
    "E2E_sapDEV_AGENT36_USER",
    "E2E_sapDEV_AGENT36_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  llgagent01: account(
    "E2E_sapDEV_AGENT37_USER",
    "E2E_sapDEV_AGENT37_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lopagent01: account(
    "E2E_sapDEV_AGENT38_USER",
    "E2E_sapDEV_AGENT38_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  luvagent01: account(
    "E2E_sapDEV_AGENT39_USER",
    "E2E_sapDEV_AGENT39_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mesagent01: account(
    "E2E_sapDEV_AGENT40_USER",
    "E2E_sapDEV_AGENT40_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mlgagent01: account(
    "E2E_sapDEV_AGENT41_USER",
    "E2E_sapDEV_AGENT41_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mmjagent01: account(
    "E2E_sapDEV_AGENT42_USER",
    "E2E_sapDEV_AGENT42_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mtwagent01: account(
    "E2E_sapDEV_AGENT43_USER",
    "E2E_sapDEV_AGENT43_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mueagent01: account(
    "E2E_sapDEV_AGENT44_USER",
    "E2E_sapDEV_AGENT44_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mkwagent01: account(
    "E2E_sapDEV_AGENT45_USER",
    "E2E_sapDEV_AGENT45_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mrdagent01: account(
    "E2E_sapDEV_AGENT46_USER",
    "E2E_sapDEV_AGENT46_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jsbagent01: account(
    "E2E_sapDEV_AGENT47_USER",
    "E2E_sapDEV_AGENT47_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mlbagent01: account(
    "E2E_sapDEV_AGENT48_USER",
    "E2E_sapDEV_AGENT48_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bdsagent01: account(
    "E2E_sapDEV_AGENT49_USER",
    "E2E_sapDEV_AGENT49_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  risyandi94: account(
    "E2E_sapDEV_AGENT50_USER",
    "E2E_sapDEV_AGENT50_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  agent02: account(
    "E2E_sapDEV_AGENT51_USER",
    "E2E_sapDEV_AGENT51_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  aegagent01: account(
    "E2E_sapDEV_AGENT52_USER",
    "E2E_sapDEV_AGENT52_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  atbagent01: account(
    "E2E_sapDEV_AGENT53_USER",
    "E2E_sapDEV_AGENT53_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bbragent01: account(
    "E2E_sapDEV_AGENT54_USER",
    "E2E_sapDEV_AGENT54_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bikagent01: account(
    "E2E_sapDEV_AGENT55_USER",
    "E2E_sapDEV_AGENT55_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bitagent01: account(
    "E2E_sapDEV_AGENT56_USER",
    "E2E_sapDEV_AGENT56_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bjoagent01: account(
    "E2E_sapDEV_AGENT57_USER",
    "E2E_sapDEV_AGENT57_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bkiagent01: account(
    "E2E_sapDEV_AGENT58_USER",
    "E2E_sapDEV_AGENT58_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bktagent01: account(
    "E2E_sapDEV_AGENT59_USER",
    "E2E_sapDEV_AGENT59_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bliagent01: account(
    "E2E_sapDEV_AGENT60_USER",
    "E2E_sapDEV_AGENT60_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  blsagent01: account(
    "E2E_sapDEV_AGENT61_USER",
    "E2E_sapDEV_AGENT61_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  brbagent01: account(
    "E2E_sapDEV_AGENT62_USER",
    "E2E_sapDEV_AGENT62_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  btgagent01: account(
    "E2E_sapDEV_AGENT63_USER",
    "E2E_sapDEV_AGENT63_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  buwagent01: account(
    "E2E_sapDEV_AGENT64_USER",
    "E2E_sapDEV_AGENT64_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bxbagent01: account(
    "E2E_sapDEV_AGENT65_USER",
    "E2E_sapDEV_AGENT65_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  byiagent01: account(
    "E2E_sapDEV_AGENT66_USER",
    "E2E_sapDEV_AGENT66_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  clnagent01: account(
    "E2E_sapDEV_AGENT67_USER",
    "E2E_sapDEV_AGENT67_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  crpagent01: account(
    "E2E_sapDEV_AGENT68_USER",
    "E2E_sapDEV_AGENT68_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  djbagent01: account(
    "E2E_sapDEV_AGENT69_USER",
    "E2E_sapDEV_AGENT69_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  djjagent01: account(
    "E2E_sapDEV_AGENT70_USER",
    "E2E_sapDEV_AGENT70_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dpkagent01: account(
    "E2E_sapDEV_AGENT71_USER",
    "E2E_sapDEV_AGENT71_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dpuagent01: account(
    "E2E_sapDEV_AGENT72_USER",
    "E2E_sapDEV_AGENT72_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  driagent01: account(
    "E2E_sapDEV_AGENT73_USER",
    "E2E_sapDEV_AGENT73_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  eneagent01: account(
    "E2E_sapDEV_AGENT74_USER",
    "E2E_sapDEV_AGENT74_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gntagent01: account(
    "E2E_sapDEV_AGENT75_USER",
    "E2E_sapDEV_AGENT75_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gtxagent01: account(
    "E2E_sapDEV_AGENT76_USER",
    "E2E_sapDEV_AGENT76_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jbragent01: account(
    "E2E_sapDEV_AGENT77_USER",
    "E2E_sapDEV_AGENT77_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jkkagent01: account(
    "E2E_sapDEV_AGENT78_USER",
    "E2E_sapDEV_AGENT78_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jkuagent01: account(
    "E2E_sapDEV_AGENT79_USER",
    "E2E_sapDEV_AGENT79_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jpaagent01: account(
    "E2E_sapDEV_AGENT80_USER",
    "E2E_sapDEV_AGENT80_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jpbagent01: account(
    "E2E_sapDEV_AGENT81_USER",
    "E2E_sapDEV_AGENT81_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jsaagent01: account(
    "E2E_sapDEV_AGENT82_USER",
    "E2E_sapDEV_AGENT82_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jsdagent01: account(
    "E2E_sapDEV_AGENT83_USER",
    "E2E_sapDEV_AGENT83_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jtbagent01: account(
    "E2E_sapDEV_AGENT84_USER",
    "E2E_sapDEV_AGENT84_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jtcagent01: account(
    "E2E_sapDEV_AGENT85_USER",
    "E2E_sapDEV_AGENT85_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kagagent01: account(
    "E2E_sapDEV_AGENT86_USER",
    "E2E_sapDEV_AGENT86_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kkpagent01: account(
    "E2E_sapDEV_AGENT87_USER",
    "E2E_sapDEV_AGENT87_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  krwagent01: account(
    "E2E_sapDEV_AGENT88_USER",
    "E2E_sapDEV_AGENT88_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lkaagent01: account(
    "E2E_sapDEV_AGENT89_USER",
    "E2E_sapDEV_AGENT89_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mdcagent01: account(
    "E2E_sapDEV_AGENT90_USER",
    "E2E_sapDEV_AGENT90_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  metagent01: account(
    "E2E_sapDEV_AGENT91_USER",
    "E2E_sapDEV_AGENT91_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mkqagent01: account(
    "E2E_sapDEV_AGENT92_USER",
    "E2E_sapDEV_AGENT92_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  soqagent01: account(
    "E2E_sapDEV_AGENT93_USER",
    "E2E_sapDEV_AGENT93_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  idyagent01: account(
    "E2E_sapDEV_AGENT94_USER",
    "E2E_sapDEV_AGENT94_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  agragent01: account(
    "E2E_sapDEV_AGENT95_USER",
    "E2E_sapDEV_AGENT95_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ardagent01: account(
    "E2E_sapDEV_AGENT96_USER",
    "E2E_sapDEV_AGENT96_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bdbagent01: account(
    "E2E_sapDEV_AGENT97_USER",
    "E2E_sapDEV_AGENT97_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bjiagent01: account(
    "E2E_sapDEV_AGENT98_USER",
    "E2E_sapDEV_AGENT98_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bksagent01: account(
    "E2E_sapDEV_AGENT99_USER",
    "E2E_sapDEV_AGENT99_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bobagent01: account(
    "E2E_sapDEV_AGENT100_USER",
    "E2E_sapDEV_AGENT100_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bthagent01: account(
    "E2E_sapDEV_AGENT101_USER",
    "E2E_sapDEV_AGENT101_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  cbnagent01: account(
    "E2E_sapDEV_AGENT102_USER",
    "E2E_sapDEV_AGENT102_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  cimagent01: account(
    "E2E_sapDEV_AGENT103_USER",
    "E2E_sapDEV_AGENT103_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  cjragent01: account(
    "E2E_sapDEV_AGENT104_USER",
    "E2E_sapDEV_AGENT104_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  cxpagent01: account(
    "E2E_sapDEV_AGENT105_USER",
    "E2E_sapDEV_AGENT105_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dpsagent01: account(
    "E2E_sapDEV_AGENT106_USER",
    "E2E_sapDEV_AGENT106_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dveagent01: account(
    "E2E_sapDEV_AGENT107_USER",
    "E2E_sapDEV_AGENT107_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  grsagent01: account(
    "E2E_sapDEV_AGENT108_USER",
    "E2E_sapDEV_AGENT108_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  grtagent01: account(
    "E2E_sapDEV_AGENT109_USER",
    "E2E_sapDEV_AGENT109_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gstagent01: account(
    "E2E_sapDEV_AGENT110_USER",
    "E2E_sapDEV_AGENT110_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jbcagent01: account(
    "E2E_sapDEV_AGENT111_USER",
    "E2E_sapDEV_AGENT111_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jkbagent01: account(
    "E2E_sapDEV_AGENT112_USER",
    "E2E_sapDEV_AGENT112_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jkpagent01: account(
    "E2E_sapDEV_AGENT113_USER",
    "E2E_sapDEV_AGENT113_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  juaagent01: account(
    "E2E_sapDEV_AGENT114_USER",
    "E2E_sapDEV_AGENT114_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kbpagent01: account(
    "E2E_sapDEV_AGENT115_USER",
    "E2E_sapDEV_AGENT115_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kbuagent01: account(
    "E2E_sapDEV_AGENT116_USER",
    "E2E_sapDEV_AGENT116_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kdsagent01: account(
    "E2E_sapDEV_AGENT117_USER",
    "E2E_sapDEV_AGENT117_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kltagent01: account(
    "E2E_sapDEV_AGENT118_USER",
    "E2E_sapDEV_AGENT118_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ktbagent01: account(
    "E2E_sapDEV_AGENT119_USER",
    "E2E_sapDEV_AGENT119_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lbpagent01: account(
    "E2E_sapDEV_AGENT120_USER",
    "E2E_sapDEV_AGENT120_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lmjagent01: account(
    "E2E_sapDEV_AGENT121_USER",
    "E2E_sapDEV_AGENT121_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lmnagent01: account(
    "E2E_sapDEV_AGENT122_USER",
    "E2E_sapDEV_AGENT122_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ltgagent01: account(
    "E2E_sapDEV_AGENT123_USER",
    "E2E_sapDEV_AGENT123_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ltmagent01: account(
    "E2E_sapDEV_AGENT124_USER",
    "E2E_sapDEV_AGENT124_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  luwagent01: account(
    "E2E_sapDEV_AGENT125_USER",
    "E2E_sapDEV_AGENT125_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mdragent01: account(
    "E2E_sapDEV_AGENT126_USER",
    "E2E_sapDEV_AGENT126_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mglagent01: account(
    "E2E_sapDEV_AGENT127_USER",
    "E2E_sapDEV_AGENT127_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mjaagent01: account(
    "E2E_sapDEV_AGENT128_USER",
    "E2E_sapDEV_AGENT128_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mjkagent01: account(
    "E2E_sapDEV_AGENT129_USER",
    "E2E_sapDEV_AGENT129_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mofagent01: account(
    "E2E_sapDEV_AGENT130_USER",
    "E2E_sapDEV_AGENT130_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bjnagent01: account(
    "E2E_sapDEV_AGENT131_USER",
    "E2E_sapDEV_AGENT131_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ckragent01: account(
    "E2E_sapDEV_AGENT132_USER",
    "E2E_sapDEV_AGENT132_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ffqagent01: account(
    "E2E_sapDEV_AGENT133_USER",
    "E2E_sapDEV_AGENT133_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tliagent01: account(
    "E2E_sapDEV_AGENT134_USER",
    "E2E_sapDEV_AGENT134_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  wtsagent01: account(
    "E2E_sapDEV_AGENT135_USER",
    "E2E_sapDEV_AGENT135_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dpsagent02: account(
    "E2E_sapDEV_AGENT136_USER",
    "E2E_sapDEV_AGENT136_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pkyagent01: account(
    "E2E_sapDEV_AGENT137_USER",
    "E2E_sapDEV_AGENT137_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tjqagent01: account(
    "E2E_sapDEV_AGENT138_USER",
    "E2E_sapDEV_AGENT138_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pbmagent01: account(
    "E2E_sapDEV_AGENT139_USER",
    "E2E_sapDEV_AGENT139_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pciagent01: account(
    "E2E_sapDEV_AGENT140_USER",
    "E2E_sapDEV_AGENT140_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pdgagent01: account(
    "E2E_sapDEV_AGENT141_USER",
    "E2E_sapDEV_AGENT141_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pdlagent01: account(
    "E2E_sapDEV_AGENT142_USER",
    "E2E_sapDEV_AGENT142_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pdnagent01: account(
    "E2E_sapDEV_AGENT143_USER",
    "E2E_sapDEV_AGENT143_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pgkagent01: account(
    "E2E_sapDEV_AGENT144_USER",
    "E2E_sapDEV_AGENT144_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pkuagent01: account(
    "E2E_sapDEV_AGENT145_USER",
    "E2E_sapDEV_AGENT145_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pliagent01: account(
    "E2E_sapDEV_AGENT146_USER",
    "E2E_sapDEV_AGENT146_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  plmagent01: account(
    "E2E_sapDEV_AGENT147_USER",
    "E2E_sapDEV_AGENT147_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pmlagent01: account(
    "E2E_sapDEV_AGENT148_USER",
    "E2E_sapDEV_AGENT148_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pnnagent01: account(
    "E2E_sapDEV_AGENT149_USER",
    "E2E_sapDEV_AGENT149_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ppuagent01: account(
    "E2E_sapDEV_AGENT150_USER",
    "E2E_sapDEV_AGENT150_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  prwagent01: account(
    "E2E_sapDEV_AGENT151_USER",
    "E2E_sapDEV_AGENT151_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ptiagent01: account(
    "E2E_sapDEV_AGENT152_USER",
    "E2E_sapDEV_AGENT152_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pwdagent01: account(
    "E2E_sapDEV_AGENT153_USER",
    "E2E_sapDEV_AGENT153_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pwkagent01: account(
    "E2E_sapDEV_AGENT154_USER",
    "E2E_sapDEV_AGENT154_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pykagent01: account(
    "E2E_sapDEV_AGENT155_USER",
    "E2E_sapDEV_AGENT155_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sbgagent01: account(
    "E2E_sapDEV_AGENT156_USER",
    "E2E_sapDEV_AGENT156_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sbsagent01: account(
    "E2E_sapDEV_AGENT157_USER",
    "E2E_sapDEV_AGENT157_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sdwagent01: account(
    "E2E_sapDEV_AGENT158_USER",
    "E2E_sapDEV_AGENT158_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sjtagent01: account(
    "E2E_sapDEV_AGENT159_USER",
    "E2E_sapDEV_AGENT159_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sliagent01: account(
    "E2E_sapDEV_AGENT160_USER",
    "E2E_sapDEV_AGENT160_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  slkagent01: account(
    "E2E_sapDEV_AGENT161_USER",
    "E2E_sapDEV_AGENT161_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  smdagent01: account(
    "E2E_sapDEV_AGENT162_USER",
    "E2E_sapDEV_AGENT162_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  smqagent01: account(
    "E2E_sapDEV_AGENT163_USER",
    "E2E_sapDEV_AGENT163_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sriagent01: account(
    "E2E_sapDEV_AGENT164_USER",
    "E2E_sapDEV_AGENT164_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tbnagent01: account(
    "E2E_sapDEV_AGENT165_USER",
    "E2E_sapDEV_AGENT165_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tgbagent01: account(
    "E2E_sapDEV_AGENT166_USER",
    "E2E_sapDEV_AGENT166_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tglagent01: account(
    "E2E_sapDEV_AGENT167_USER",
    "E2E_sapDEV_AGENT167_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  timagent01: account(
    "E2E_sapDEV_AGENT168_USER",
    "E2E_sapDEV_AGENT168_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tjsagent01: account(
    "E2E_sapDEV_AGENT169_USER",
    "E2E_sapDEV_AGENT169_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tmhagent01: account(
    "E2E_sapDEV_AGENT170_USER",
    "E2E_sapDEV_AGENT170_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tpeagent01: account(
    "E2E_sapDEV_AGENT171_USER",
    "E2E_sapDEV_AGENT171_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tsbagent01: account(
    "E2E_sapDEV_AGENT172_USER",
    "E2E_sapDEV_AGENT172_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tubagent01: account(
    "E2E_sapDEV_AGENT173_USER",
    "E2E_sapDEV_AGENT173_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  wmnagent01: account(
    "E2E_sapDEV_AGENT174_USER",
    "E2E_sapDEV_AGENT174_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin06: account(
    "E2E_sapDEV_AGENT175_USER",
    "E2E_sapDEV_AGENT175_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin10: account(
    "E2E_sapDEV_AGENT176_USER",
    "E2E_sapDEV_AGENT176_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bjbagent02: account(
    "E2E_sapDEV_AGENT177_USER",
    "E2E_sapDEV_AGENT177_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bksagent02: account(
    "E2E_sapDEV_AGENT178_USER",
    "E2E_sapDEV_AGENT178_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  djjagent02: account(
    "E2E_sapDEV_AGENT179_USER",
    "E2E_sapDEV_AGENT179_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jsaagent02: account(
    "E2E_sapDEV_AGENT180_USER",
    "E2E_sapDEV_AGENT180_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  koeagent02: account(
    "E2E_sapDEV_AGENT181_USER",
    "E2E_sapDEV_AGENT181_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  krwagent02: account(
    "E2E_sapDEV_AGENT182_USER",
    "E2E_sapDEV_AGENT182_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mdcagent02: account(
    "E2E_sapDEV_AGENT183_USER",
    "E2E_sapDEV_AGENT183_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mlgagent03: account(
    "E2E_sapDEV_AGENT184_USER",
    "E2E_sapDEV_AGENT184_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pgkagent02: account(
    "E2E_sapDEV_AGENT185_USER",
    "E2E_sapDEV_AGENT185_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pkuagent02: account(
    "E2E_sapDEV_AGENT186_USER",
    "E2E_sapDEV_AGENT186_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pknagent01: account(
    "E2E_sapDEV_AGENT187_USER",
    "E2E_sapDEV_AGENT187_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pnkagent01: account(
    "E2E_sapDEV_AGENT188_USER",
    "E2E_sapDEV_AGENT188_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ponagent01: account(
    "E2E_sapDEV_AGENT189_USER",
    "E2E_sapDEV_AGENT189_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  preagent01: account(
    "E2E_sapDEV_AGENT190_USER",
    "E2E_sapDEV_AGENT190_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  psjagent01: account(
    "E2E_sapDEV_AGENT191_USER",
    "E2E_sapDEV_AGENT191_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rapagent01: account(
    "E2E_sapDEV_AGENT192_USER",
    "E2E_sapDEV_AGENT192_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rgtagent01: account(
    "E2E_sapDEV_AGENT193_USER",
    "E2E_sapDEV_AGENT193_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rmbagent01: account(
    "E2E_sapDEV_AGENT194_USER",
    "E2E_sapDEV_AGENT194_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rtiagent01: account(
    "E2E_sapDEV_AGENT195_USER",
    "E2E_sapDEV_AGENT195_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sguagent01: account(
    "E2E_sapDEV_AGENT196_USER",
    "E2E_sapDEV_AGENT196_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sjbagent01: account(
    "E2E_sapDEV_AGENT197_USER",
    "E2E_sapDEV_AGENT197_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sjoagent01: account(
    "E2E_sapDEV_AGENT198_USER",
    "E2E_sapDEV_AGENT198_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  socagent01: account(
    "E2E_sapDEV_AGENT199_USER",
    "E2E_sapDEV_AGENT199_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sofagent01: account(
    "E2E_sapDEV_AGENT200_USER",
    "E2E_sapDEV_AGENT200_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  spgagent01: account(
    "E2E_sapDEV_AGENT201_USER",
    "E2E_sapDEV_AGENT201_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sppagent01: account(
    "E2E_sapDEV_AGENT202_USER",
    "E2E_sapDEV_AGENT202_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  srgagent01: account(
    "E2E_sapDEV_AGENT203_USER",
    "E2E_sapDEV_AGENT203_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  subagent01: account(
    "E2E_sapDEV_AGENT204_USER",
    "E2E_sapDEV_AGENT204_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tgragent01: account(
    "E2E_sapDEV_AGENT205_USER",
    "E2E_sapDEV_AGENT205_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  trlagent01: account(
    "E2E_sapDEV_AGENT206_USER",
    "E2E_sapDEV_AGENT206_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tsmagent01: account(
    "E2E_sapDEV_AGENT207_USER",
    "E2E_sapDEV_AGENT207_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tteagent01: account(
    "E2E_sapDEV_AGENT208_USER",
    "E2E_sapDEV_AGENT208_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  utgagent01: account(
    "E2E_sapDEV_AGENT209_USER",
    "E2E_sapDEV_AGENT209_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  wnbagent01: account(
    "E2E_sapDEV_AGENT210_USER",
    "E2E_sapDEV_AGENT210_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  yiaagent01: account(
    "E2E_sapDEV_AGENT211_USER",
    "E2E_sapDEV_AGENT211_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin09: account(
    "E2E_sapDEV_AGENT212_USER",
    "E2E_sapDEV_AGENT212_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  amqagent02: account(
    "E2E_sapDEV_AGENT213_USER",
    "E2E_sapDEV_AGENT213_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  amqagent03: account(
    "E2E_sapDEV_AGENT214_USER",
    "E2E_sapDEV_AGENT214_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bdoagent04: account(
    "E2E_sapDEV_AGENT215_USER",
    "E2E_sapDEV_AGENT215_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  djbagent02: account(
    "E2E_sapDEV_AGENT216_USER",
    "E2E_sapDEV_AGENT216_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jbragent02: account(
    "E2E_sapDEV_AGENT217_USER",
    "E2E_sapDEV_AGENT217_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jsbagent02: account(
    "E2E_sapDEV_AGENT218_USER",
    "E2E_sapDEV_AGENT218_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kdiagent02: account(
    "E2E_sapDEV_AGENT219_USER",
    "E2E_sapDEV_AGENT219_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kdsagent02: account(
    "E2E_sapDEV_AGENT220_USER",
    "E2E_sapDEV_AGENT220_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  knoagent02: account(
    "E2E_sapDEV_AGENT221_USER",
    "E2E_sapDEV_AGENT221_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lopagent02: account(
    "E2E_sapDEV_AGENT222_USER",
    "E2E_sapDEV_AGENT222_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pklagent02: account(
    "E2E_sapDEV_AGENT223_USER",
    "E2E_sapDEV_AGENT223_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pwoagent02: account(
    "E2E_sapDEV_AGENT224_USER",
    "E2E_sapDEV_AGENT224_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ptsagent01: account(
    "E2E_sapDEV_AGENT225_USER",
    "E2E_sapDEV_AGENT225_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tbkagent01: account(
    "E2E_sapDEV_AGENT226_USER",
    "E2E_sapDEV_AGENT226_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tgsagent01: account(
    "E2E_sapDEV_AGENT227_USER",
    "E2E_sapDEV_AGENT227_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ntxagent01: account(
    "E2E_sapDEV_AGENT228_USER",
    "E2E_sapDEV_AGENT228_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  prmagent01: account(
    "E2E_sapDEV_AGENT229_USER",
    "E2E_sapDEV_AGENT229_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  smiagent02: account(
    "E2E_sapDEV_AGENT230_USER",
    "E2E_sapDEV_AGENT230_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  subagent04: account(
    "E2E_sapDEV_AGENT231_USER",
    "E2E_sapDEV_AGENT231_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  upgagent02: account(
    "E2E_sapDEV_AGENT232_USER",
    "E2E_sapDEV_AGENT232_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin05: account(
    "E2E_sapDEV_AGENT233_USER",
    "E2E_sapDEV_AGENT233_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin06: account(
    "E2E_sapDEV_AGENT234_USER",
    "E2E_sapDEV_AGENT234_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tgsagent02: account(
    "E2E_sapDEV_AGENT235_USER",
    "E2E_sapDEV_AGENT235_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bkiagent02: account(
    "E2E_sapDEV_AGENT236_USER",
    "E2E_sapDEV_AGENT236_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ckragent03: account(
    "E2E_sapDEV_AGENT237_USER",
    "E2E_sapDEV_AGENT237_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jsbagent03: account(
    "E2E_sapDEV_AGENT238_USER",
    "E2E_sapDEV_AGENT238_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jbgagent01: account(
    "E2E_sapDEV_AGENT239_USER",
    "E2E_sapDEV_AGENT239_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  goddummyprod: account(
    "E2E_sapDEV_AGENT240_USER",
    "E2E_sapDEV_AGENT240_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin02: account(
    "E2E_sapDEV_AGENT241_USER",
    "E2E_sapDEV_AGENT241_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  admin001: account(
    "E2E_sapDEV_AGENT242_USER",
    "E2E_sapDEV_AGENT242_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bdoagent01: account(
    "E2E_sapDEV_AGENT243_USER",
    "E2E_sapDEV_AGENT243_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bduagent01: account(
    "E2E_sapDEV_AGENT244_USER",
    "E2E_sapDEV_AGENT244_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bejagent01: account(
    "E2E_sapDEV_AGENT245_USER",
    "E2E_sapDEV_AGENT245_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bjbagent01: account(
    "E2E_sapDEV_AGENT246_USER",
    "E2E_sapDEV_AGENT246_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  blgagent01: account(
    "E2E_sapDEV_AGENT247_USER",
    "E2E_sapDEV_AGENT247_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bmuagent01: account(
    "E2E_sapDEV_AGENT248_USER",
    "E2E_sapDEV_AGENT248_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  booagent01: account(
    "E2E_sapDEV_AGENT249_USER",
    "E2E_sapDEV_AGENT249_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bswagent01: account(
    "E2E_sapDEV_AGENT250_USER",
    "E2E_sapDEV_AGENT250_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  btuagent01: account(
    "E2E_sapDEV_AGENT251_USER",
    "E2E_sapDEV_AGENT251_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  btwagent01: account(
    "E2E_sapDEV_AGENT252_USER",
    "E2E_sapDEV_AGENT252_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bwxagent01: account(
    "E2E_sapDEV_AGENT253_USER",
    "E2E_sapDEV_AGENT253_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  cjtagent01: account(
    "E2E_sapDEV_AGENT254_USER",
    "E2E_sapDEV_AGENT254_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dmkagent01: account(
    "E2E_sapDEV_AGENT255_USER",
    "E2E_sapDEV_AGENT255_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ginagent01: account(
    "E2E_sapDEV_AGENT256_USER",
    "E2E_sapDEV_AGENT256_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gtoagent01: account(
    "E2E_sapDEV_AGENT257_USER",
    "E2E_sapDEV_AGENT257_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  hlpagent01: account(
    "E2E_sapDEV_AGENT258_USER",
    "E2E_sapDEV_AGENT258_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dryagent01: account(
    "E2E_sapDEV_AGENT259_USER",
    "E2E_sapDEV_AGENT259_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kbjagent01: account(
    "E2E_sapDEV_AGENT260_USER",
    "E2E_sapDEV_AGENT260_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kbsagent01: account(
    "E2E_sapDEV_AGENT261_USER",
    "E2E_sapDEV_AGENT261_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kbtagent01: account(
    "E2E_sapDEV_AGENT262_USER",
    "E2E_sapDEV_AGENT262_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kdragent01: account(
    "E2E_sapDEV_AGENT263_USER",
    "E2E_sapDEV_AGENT263_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kmaagent01: account(
    "E2E_sapDEV_AGENT264_USER",
    "E2E_sapDEV_AGENT264_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kngagent01: account(
    "E2E_sapDEV_AGENT265_USER",
    "E2E_sapDEV_AGENT265_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  knoagent01: account(
    "E2E_sapDEV_AGENT266_USER",
    "E2E_sapDEV_AGENT266_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  koeagent01: account(
    "E2E_sapDEV_AGENT267_USER",
    "E2E_sapDEV_AGENT267_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kpnagent01: account(
    "E2E_sapDEV_AGENT268_USER",
    "E2E_sapDEV_AGENT268_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ktgagent01: account(
    "E2E_sapDEV_AGENT269_USER",
    "E2E_sapDEV_AGENT269_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lgsagent01: account(
    "E2E_sapDEV_AGENT270_USER",
    "E2E_sapDEV_AGENT270_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mdnagent01: account(
    "E2E_sapDEV_AGENT271_USER",
    "E2E_sapDEV_AGENT271_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mshagent01: account(
    "E2E_sapDEV_AGENT272_USER",
    "E2E_sapDEV_AGENT272_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kkaagent01: account(
    "E2E_sapDEV_AGENT273_USER",
    "E2E_sapDEV_AGENT273_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pboagent01: account(
    "E2E_sapDEV_AGENT274_USER",
    "E2E_sapDEV_AGENT274_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pklagent01: account(
    "E2E_sapDEV_AGENT275_USER",
    "E2E_sapDEV_AGENT275_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  plpagent01: account(
    "E2E_sapDEV_AGENT276_USER",
    "E2E_sapDEV_AGENT276_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  plwagent01: account(
    "E2E_sapDEV_AGENT277_USER",
    "E2E_sapDEV_AGENT277_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  prtagent01: account(
    "E2E_sapDEV_AGENT278_USER",
    "E2E_sapDEV_AGENT278_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pspagent01: account(
    "E2E_sapDEV_AGENT279_USER",
    "E2E_sapDEV_AGENT279_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sbpagent01: account(
    "E2E_sapDEV_AGENT280_USER",
    "E2E_sapDEV_AGENT280_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sgragent01: account(
    "E2E_sapDEV_AGENT281_USER",
    "E2E_sapDEV_AGENT281_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sjpagent01: account(
    "E2E_sapDEV_AGENT282_USER",
    "E2E_sapDEV_AGENT282_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sjsagent01: account(
    "E2E_sapDEV_AGENT283_USER",
    "E2E_sapDEV_AGENT283_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  skdagent01: account(
    "E2E_sapDEV_AGENT284_USER",
    "E2E_sapDEV_AGENT284_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  nbxagent01: account(
    "E2E_sapDEV_AGENT285_USER",
    "E2E_sapDEV_AGENT285_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pgiagent01: account(
    "E2E_sapDEV_AGENT286_USER",
    "E2E_sapDEV_AGENT286_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pkragent01: account(
    "E2E_sapDEV_AGENT287_USER",
    "E2E_sapDEV_AGENT287_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pmkagent01: account(
    "E2E_sapDEV_AGENT288_USER",
    "E2E_sapDEV_AGENT288_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pmsagent01: account(
    "E2E_sapDEV_AGENT289_USER",
    "E2E_sapDEV_AGENT289_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ppnagent01: account(
    "E2E_sapDEV_AGENT290_USER",
    "E2E_sapDEV_AGENT290_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  prragent01: account(
    "E2E_sapDEV_AGENT291_USER",
    "E2E_sapDEV_AGENT291_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  psnagent01: account(
    "E2E_sapDEV_AGENT292_USER",
    "E2E_sapDEV_AGENT292_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pwoagent01: account(
    "E2E_sapDEV_AGENT293_USER",
    "E2E_sapDEV_AGENT293_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rhaagent01: account(
    "E2E_sapDEV_AGENT294_USER",
    "E2E_sapDEV_AGENT294_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sbbagent01: account(
    "E2E_sapDEV_AGENT295_USER",
    "E2E_sapDEV_AGENT295_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  seragent01: account(
    "E2E_sapDEV_AGENT296_USER",
    "E2E_sapDEV_AGENT296_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sitagent01: account(
    "E2E_sapDEV_AGENT297_USER",
    "E2E_sapDEV_AGENT297_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sjuagent01: account(
    "E2E_sapDEV_AGENT298_USER",
    "E2E_sapDEV_AGENT298_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  skyagent01: account(
    "E2E_sapDEV_AGENT299_USER",
    "E2E_sapDEV_AGENT299_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  slgagent01: account(
    "E2E_sapDEV_AGENT300_USER",
    "E2E_sapDEV_AGENT300_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  smiagent01: account(
    "E2E_sapDEV_AGENT301_USER",
    "E2E_sapDEV_AGENT301_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  smpagent01: account(
    "E2E_sapDEV_AGENT302_USER",
    "E2E_sapDEV_AGENT302_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lswagent01: account(
    "E2E_sapDEV_AGENT303_USER",
    "E2E_sapDEV_AGENT303_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  spnagent01: account(
    "E2E_sapDEV_AGENT304_USER",
    "E2E_sapDEV_AGENT304_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sraagent01: account(
    "E2E_sapDEV_AGENT305_USER",
    "E2E_sapDEV_AGENT305_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sstagent01: account(
    "E2E_sapDEV_AGENT306_USER",
    "E2E_sapDEV_AGENT306_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  suuagent01: account(
    "E2E_sapDEV_AGENT307_USER",
    "E2E_sapDEV_AGENT307_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tkgagent01: account(
    "E2E_sapDEV_AGENT308_USER",
    "E2E_sapDEV_AGENT308_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tknagent01: account(
    "E2E_sapDEV_AGENT309_USER",
    "E2E_sapDEV_AGENT309_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tlgagent01: account(
    "E2E_sapDEV_AGENT310_USER",
    "E2E_sapDEV_AGENT310_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tlwagent01: account(
    "E2E_sapDEV_AGENT311_USER",
    "E2E_sapDEV_AGENT311_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tnbagent01: account(
    "E2E_sapDEV_AGENT312_USER",
    "E2E_sapDEV_AGENT312_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tnjagent01: account(
    "E2E_sapDEV_AGENT313_USER",
    "E2E_sapDEV_AGENT313_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tobagent01: account(
    "E2E_sapDEV_AGENT314_USER",
    "E2E_sapDEV_AGENT314_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tpbagent01: account(
    "E2E_sapDEV_AGENT315_USER",
    "E2E_sapDEV_AGENT315_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  trkagent01: account(
    "E2E_sapDEV_AGENT316_USER",
    "E2E_sapDEV_AGENT316_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  wgpagent01: account(
    "E2E_sapDEV_AGENT317_USER",
    "E2E_sapDEV_AGENT317_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  wngagent01: account(
    "E2E_sapDEV_AGENT318_USER",
    "E2E_sapDEV_AGENT318_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  wnoagent01: account(
    "E2E_sapDEV_AGENT319_USER",
    "E2E_sapDEV_AGENT319_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin04: account(
    "E2E_sapDEV_AGENT320_USER",
    "E2E_sapDEV_AGENT320_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin05: account(
    "E2E_sapDEV_AGENT321_USER",
    "E2E_sapDEV_AGENT321_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bpnagent02: account(
    "E2E_sapDEV_AGENT322_USER",
    "E2E_sapDEV_AGENT322_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ckragent02: account(
    "E2E_sapDEV_AGENT323_USER",
    "E2E_sapDEV_AGENT323_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jbbagent02: account(
    "E2E_sapDEV_AGENT324_USER",
    "E2E_sapDEV_AGENT324_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jogagent02: account(
    "E2E_sapDEV_AGENT325_USER",
    "E2E_sapDEV_AGENT325_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mlgagent02: account(
    "E2E_sapDEV_AGENT326_USER",
    "E2E_sapDEV_AGENT326_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pkuagent03: account(
    "E2E_sapDEV_AGENT327_USER",
    "E2E_sapDEV_AGENT327_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pkyagent02: account(
    "E2E_sapDEV_AGENT328_USER",
    "E2E_sapDEV_AGENT328_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  plwagent02: account(
    "E2E_sapDEV_AGENT329_USER",
    "E2E_sapDEV_AGENT329_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  srjagent01: account(
    "E2E_sapDEV_AGENT330_USER",
    "E2E_sapDEV_AGENT330_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bdoagent05: account(
    "E2E_sapDEV_AGENT331_USER",
    "E2E_sapDEV_AGENT331_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  skwagent01: account(
    "E2E_sapDEV_AGENT332_USER",
    "E2E_sapDEV_AGENT332_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  swqagent01: account(
    "E2E_sapDEV_AGENT333_USER",
    "E2E_sapDEV_AGENT333_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tbwagent01: account(
    "E2E_sapDEV_AGENT334_USER",
    "E2E_sapDEV_AGENT334_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tpkagent01: account(
    "E2E_sapDEV_AGENT335_USER",
    "E2E_sapDEV_AGENT335_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tpragent01: account(
    "E2E_sapDEV_AGENT336_USER",
    "E2E_sapDEV_AGENT336_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  trgagent01: account(
    "E2E_sapDEV_AGENT337_USER",
    "E2E_sapDEV_AGENT337_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  unhagent01: account(
    "E2E_sapDEV_AGENT338_USER",
    "E2E_sapDEV_AGENT338_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  upgagent01: account(
    "E2E_sapDEV_AGENT339_USER",
    "E2E_sapDEV_AGENT339_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin04: account(
    "E2E_sapDEV_AGENT340_USER",
    "E2E_sapDEV_AGENT340_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin01: account(
    "E2E_sapDEV_AGENT341_USER",
    "E2E_sapDEV_AGENT341_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin07: account(
    "E2E_sapDEV_AGENT342_USER",
    "E2E_sapDEV_AGENT342_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin08: account(
    "E2E_sapDEV_AGENT343_USER",
    "E2E_sapDEV_AGENT343_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  aegagent02: account(
    "E2E_sapDEV_AGENT344_USER",
    "E2E_sapDEV_AGENT344_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bdoagent03: account(
    "E2E_sapDEV_AGENT345_USER",
    "E2E_sapDEV_AGENT345_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  booagent02: account(
    "E2E_sapDEV_AGENT346_USER",
    "E2E_sapDEV_AGENT346_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  cbnagent02: account(
    "E2E_sapDEV_AGENT347_USER",
    "E2E_sapDEV_AGENT347_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gtoagent02: account(
    "E2E_sapDEV_AGENT348_USER",
    "E2E_sapDEV_AGENT348_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jbaagent02: account(
    "E2E_sapDEV_AGENT349_USER",
    "E2E_sapDEV_AGENT349_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jkpagent02: account(
    "E2E_sapDEV_AGENT350_USER",
    "E2E_sapDEV_AGENT350_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jktagent02: account(
    "E2E_sapDEV_AGENT351_USER",
    "E2E_sapDEV_AGENT351_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jogagent03: account(
    "E2E_sapDEV_AGENT352_USER",
    "E2E_sapDEV_AGENT352_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  juaagent02: account(
    "E2E_sapDEV_AGENT353_USER",
    "E2E_sapDEV_AGENT353_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kdragent02: account(
    "E2E_sapDEV_AGENT354_USER",
    "E2E_sapDEV_AGENT354_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  knoagent03: account(
    "E2E_sapDEV_AGENT355_USER",
    "E2E_sapDEV_AGENT355_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  koeagent03: account(
    "E2E_sapDEV_AGENT356_USER",
    "E2E_sapDEV_AGENT356_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mdnagent02: account(
    "E2E_sapDEV_AGENT357_USER",
    "E2E_sapDEV_AGENT357_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pdgagent02: account(
    "E2E_sapDEV_AGENT358_USER",
    "E2E_sapDEV_AGENT358_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  plmagent02: account(
    "E2E_sapDEV_AGENT359_USER",
    "E2E_sapDEV_AGENT359_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pnkagent02: account(
    "E2E_sapDEV_AGENT360_USER",
    "E2E_sapDEV_AGENT360_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ttgagent01: account(
    "E2E_sapDEV_AGENT361_USER",
    "E2E_sapDEV_AGENT361_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  seragent02: account(
    "E2E_sapDEV_AGENT362_USER",
    "E2E_sapDEV_AGENT362_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pgkagent03: account(
    "E2E_sapDEV_AGENT363_USER",
    "E2E_sapDEV_AGENT363_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ksragent02: account(
    "E2E_sapDEV_AGENT364_USER",
    "E2E_sapDEV_AGENT364_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ksragent03: account(
    "E2E_sapDEV_AGENT365_USER",
    "E2E_sapDEV_AGENT365_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  subagent02: account(
    "E2E_sapDEV_AGENT366_USER",
    "E2E_sapDEV_AGENT366_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  subagent03: account(
    "E2E_sapDEV_AGENT367_USER",
    "E2E_sapDEV_AGENT367_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tgragent02: account(
    "E2E_sapDEV_AGENT368_USER",
    "E2E_sapDEV_AGENT368_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tpeagent02: account(
    "E2E_sapDEV_AGENT369_USER",
    "E2E_sapDEV_AGENT369_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin07: account(
    "E2E_sapDEV_AGENT370_USER",
    "E2E_sapDEV_AGENT370_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin08: account(
    "E2E_sapDEV_AGENT371_USER",
    "E2E_sapDEV_AGENT371_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jsaagent03: account(
    "E2E_sapDEV_AGENT372_USER",
    "E2E_sapDEV_AGENT372_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  financesuperadmin: account(
    "E2E_sapDEV_AGENT373_USER",
    "E2E_sapDEV_AGENT373_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  metagent02: account(
    "E2E_sapDEV_AGENT374_USER",
    "E2E_sapDEV_AGENT374_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tbwagent02: account(
    "E2E_sapDEV_AGENT375_USER",
    "E2E_sapDEV_AGENT375_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pnnagent02: account(
    "E2E_sapDEV_AGENT376_USER",
    "E2E_sapDEV_AGENT376_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bknagent02: account(
    "E2E_sapDEV_AGENT377_USER",
    "E2E_sapDEV_AGENT377_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ppnagent02: account(
    "E2E_sapDEV_AGENT378_USER",
    "E2E_sapDEV_AGENT378_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mueagent02: account(
    "E2E_sapDEV_AGENT379_USER",
    "E2E_sapDEV_AGENT379_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ntxagent21: account(
    "E2E_sapDEV_AGENT380_USER",
    "E2E_sapDEV_AGENT380_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  aegagent03: account(
    "E2E_sapDEV_AGENT381_USER",
    "E2E_sapDEV_AGENT381_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sliagent02: account(
    "E2E_sapDEV_AGENT382_USER",
    "E2E_sapDEV_AGENT382_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mlbagent02: account(
    "E2E_sapDEV_AGENT383_USER",
    "E2E_sapDEV_AGENT383_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pmsagent03: account(
    "E2E_sapDEV_AGENT384_USER",
    "E2E_sapDEV_AGENT384_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  prragent02: account(
    "E2E_sapDEV_AGENT385_USER",
    "E2E_sapDEV_AGENT385_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pspagent02: account(
    "E2E_sapDEV_AGENT386_USER",
    "E2E_sapDEV_AGENT386_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ttgagent03: account(
    "E2E_sapDEV_AGENT387_USER",
    "E2E_sapDEV_AGENT387_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  brjagent03: account(
    "E2E_sapDEV_AGENT388_USER",
    "E2E_sapDEV_AGENT388_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sofagent02: account(
    "E2E_sapDEV_AGENT389_USER",
    "E2E_sapDEV_AGENT389_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  plwagent03: account(
    "E2E_sapDEV_AGENT390_USER",
    "E2E_sapDEV_AGENT390_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kkaagent02: account(
    "E2E_sapDEV_AGENT391_USER",
    "E2E_sapDEV_AGENT391_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pliagent02: account(
    "E2E_sapDEV_AGENT392_USER",
    "E2E_sapDEV_AGENT392_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  plpagent02: account(
    "E2E_sapDEV_AGENT393_USER",
    "E2E_sapDEV_AGENT393_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  trjagent01: account(
    "E2E_sapDEV_AGENT394_USER",
    "E2E_sapDEV_AGENT394_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  atcagent02: account(
    "E2E_sapDEV_AGENT395_USER",
    "E2E_sapDEV_AGENT395_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  amqagent01: account(
    "E2E_sapDEV_AGENT396_USER",
    "E2E_sapDEV_AGENT396_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  driagent03: account(
    "E2E_sapDEV_AGENT397_USER",
    "E2E_sapDEV_AGENT397_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  socagent02: account(
    "E2E_sapDEV_AGENT398_USER",
    "E2E_sapDEV_AGENT398_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dpkagent02: account(
    "E2E_sapDEV_AGENT399_USER",
    "E2E_sapDEV_AGENT399_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin03: account(
    "E2E_sapDEV_AGENT400_USER",
    "E2E_sapDEV_AGENT400_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jpbagent02: account(
    "E2E_sapDEV_AGENT401_USER",
    "E2E_sapDEV_AGENT401_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  testingadmin29: account(
    "E2E_sapDEV_AGENT402_USER",
    "E2E_sapDEV_AGENT402_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  krwagent03: account(
    "E2E_sapDEV_AGENT403_USER",
    "E2E_sapDEV_AGENT403_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  techagent: account(
    "E2E_sapDEV_AGENT404_USER",
    "E2E_sapDEV_AGENT404_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  prwagent02: account(
    "E2E_sapDEV_AGENT405_USER",
    "E2E_sapDEV_AGENT405_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  slkagent02: account(
    "E2E_sapDEV_AGENT406_USER",
    "E2E_sapDEV_AGENT406_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sppagent02: account(
    "E2E_sapDEV_AGENT407_USER",
    "E2E_sapDEV_AGENT407_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  blsagent02: account(
    "E2E_sapDEV_AGENT408_USER",
    "E2E_sapDEV_AGENT408_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dumagent02: account(
    "E2E_sapDEV_AGENT409_USER",
    "E2E_sapDEV_AGENT409_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  utgagent02: account(
    "E2E_sapDEV_AGENT410_USER",
    "E2E_sapDEV_AGENT410_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mrdagent02: account(
    "E2E_sapDEV_AGENT411_USER",
    "E2E_sapDEV_AGENT411_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  skyagent02: account(
    "E2E_sapDEV_AGENT412_USER",
    "E2E_sapDEV_AGENT412_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tnjagent02: account(
    "E2E_sapDEV_AGENT413_USER",
    "E2E_sapDEV_AGENT413_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bkoagent02: account(
    "E2E_sapDEV_AGENT414_USER",
    "E2E_sapDEV_AGENT414_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  prragent03: account(
    "E2E_sapDEV_AGENT415_USER",
    "E2E_sapDEV_AGENT415_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mkqagent02: account(
    "E2E_sapDEV_AGENT416_USER",
    "E2E_sapDEV_AGENT416_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  djjagent03: account(
    "E2E_sapDEV_AGENT417_USER",
    "E2E_sapDEV_AGENT417_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  nbxagent02: account(
    "E2E_sapDEV_AGENT418_USER",
    "E2E_sapDEV_AGENT418_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  luvagent02: account(
    "E2E_sapDEV_AGENT419_USER",
    "E2E_sapDEV_AGENT419_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mshagent02: account(
    "E2E_sapDEV_AGENT420_USER",
    "E2E_sapDEV_AGENT420_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tteagent02: account(
    "E2E_sapDEV_AGENT421_USER",
    "E2E_sapDEV_AGENT421_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  psjagent02: account(
    "E2E_sapDEV_AGENT422_USER",
    "E2E_sapDEV_AGENT422_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  preagent02: account(
    "E2E_sapDEV_AGENT423_USER",
    "E2E_sapDEV_AGENT423_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  upgagent03: account(
    "E2E_sapDEV_AGENT424_USER",
    "E2E_sapDEV_AGENT424_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jbbagent03: account(
    "E2E_sapDEV_AGENT425_USER",
    "E2E_sapDEV_AGENT425_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin03: account(
    "E2E_sapDEV_AGENT426_USER",
    "E2E_sapDEV_AGENT426_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  driagent02: account(
    "E2E_sapDEV_AGENT427_USER",
    "E2E_sapDEV_AGENT427_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kbjagent03: account(
    "E2E_sapDEV_AGENT428_USER",
    "E2E_sapDEV_AGENT428_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  demosuperadmin1_superadmin01: account(
    "E2E_sapDEV_AGENT429_USER",
    "E2E_sapDEV_AGENT429_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bdoagent02: account(
    "E2E_sapDEV_AGENT430_USER",
    "E2E_sapDEV_AGENT430_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gnsagent02: account(
    "E2E_sapDEV_AGENT431_USER",
    "E2E_sapDEV_AGENT431_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ktbagent02: account(
    "E2E_sapDEV_AGENT432_USER",
    "E2E_sapDEV_AGENT432_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bktagent02: account(
    "E2E_sapDEV_AGENT433_USER",
    "E2E_sapDEV_AGENT433_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dryagent02: account(
    "E2E_sapDEV_AGENT434_USER",
    "E2E_sapDEV_AGENT434_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pykagent02: account(
    "E2E_sapDEV_AGENT435_USER",
    "E2E_sapDEV_AGENT435_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pkragent02: account(
    "E2E_sapDEV_AGENT436_USER",
    "E2E_sapDEV_AGENT436_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  agragent02: account(
    "E2E_sapDEV_AGENT437_USER",
    "E2E_sapDEV_AGENT437_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  crpagent02: account(
    "E2E_sapDEV_AGENT438_USER",
    "E2E_sapDEV_AGENT438_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  brjagent02: account(
    "E2E_sapDEV_AGENT439_USER",
    "E2E_sapDEV_AGENT439_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lhtagent02: account(
    "E2E_sapDEV_AGENT440_USER",
    "E2E_sapDEV_AGENT440_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tbkagent02: account(
    "E2E_sapDEV_AGENT441_USER",
    "E2E_sapDEV_AGENT441_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bnoagent02: account(
    "E2E_sapDEV_AGENT442_USER",
    "E2E_sapDEV_AGENT442_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bjiagent03: account(
    "E2E_sapDEV_AGENT443_USER",
    "E2E_sapDEV_AGENT443_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  blgagent02: account(
    "E2E_sapDEV_AGENT444_USER",
    "E2E_sapDEV_AGENT444_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gntagent02: account(
    "E2E_sapDEV_AGENT445_USER",
    "E2E_sapDEV_AGENT445_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gstagent02: account(
    "E2E_sapDEV_AGENT446_USER",
    "E2E_sapDEV_AGENT446_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gstagent03: account(
    "E2E_sapDEV_AGENT447_USER",
    "E2E_sapDEV_AGENT447_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mesagent03: account(
    "E2E_sapDEV_AGENT448_USER",
    "E2E_sapDEV_AGENT448_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pspagent03: account(
    "E2E_sapDEV_AGENT449_USER",
    "E2E_sapDEV_AGENT449_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rapagent02: account(
    "E2E_sapDEV_AGENT450_USER",
    "E2E_sapDEV_AGENT450_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ttgagent02: account(
    "E2E_sapDEV_AGENT451_USER",
    "E2E_sapDEV_AGENT451_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mkwagent02: account(
    "E2E_sapDEV_AGENT452_USER",
    "E2E_sapDEV_AGENT452_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  timagent02: account(
    "E2E_sapDEV_AGENT453_USER",
    "E2E_sapDEV_AGENT453_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  amqagent04: account(
    "E2E_sapDEV_AGENT454_USER",
    "E2E_sapDEV_AGENT454_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pgiagent02: account(
    "E2E_sapDEV_AGENT455_USER",
    "E2E_sapDEV_AGENT455_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rhaagent02: account(
    "E2E_sapDEV_AGENT456_USER",
    "E2E_sapDEV_AGENT456_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  blkagent01: account(
    "E2E_sapDEV_AGENT457_USER",
    "E2E_sapDEV_AGENT457_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bruagent01: account(
    "E2E_sapDEV_AGENT458_USER",
    "E2E_sapDEV_AGENT458_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bitagent02: account(
    "E2E_sapDEV_AGENT459_USER",
    "E2E_sapDEV_AGENT459_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ktgagent02: account(
    "E2E_sapDEV_AGENT460_USER",
    "E2E_sapDEV_AGENT460_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mdcagent03: account(
    "E2E_sapDEV_AGENT461_USER",
    "E2E_sapDEV_AGENT461_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tmhagent02: account(
    "E2E_sapDEV_AGENT462_USER",
    "E2E_sapDEV_AGENT462_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin11: account(
    "E2E_sapDEV_AGENT463_USER",
    "E2E_sapDEV_AGENT463_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  stgagent01: account(
    "E2E_sapDEV_AGENT464_USER",
    "E2E_sapDEV_AGENT464_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pusatadmin02: account(
    "E2E_sapDEV_AGENT465_USER",
    "E2E_sapDEV_AGENT465_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  achmad_superadmin01: account(
    "E2E_sapDEV_AGENT466_USER",
    "E2E_sapDEV_AGENT466_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tobagent02: account(
    "E2E_sapDEV_AGENT467_USER",
    "E2E_sapDEV_AGENT467_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sriagent02: account(
    "E2E_sapDEV_AGENT468_USER",
    "E2E_sapDEV_AGENT468_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  trkagent02: account(
    "E2E_sapDEV_AGENT469_USER",
    "E2E_sapDEV_AGENT469_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tsmagent02: account(
    "E2E_sapDEV_AGENT470_USER",
    "E2E_sapDEV_AGENT470_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin09: account(
    "E2E_sapDEV_AGENT471_USER",
    "E2E_sapDEV_AGENT471_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  superadmin10: account(
    "E2E_sapDEV_AGENT472_USER",
    "E2E_sapDEV_AGENT472_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  testingagentprod: account(
    "E2E_sapDEV_AGENT473_USER",
    "E2E_sapDEV_AGENT473_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  goddummyprod2: account(
    "E2E_sapDEV_AGENT474_USER",
    "E2E_sapDEV_AGENT474_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bobagent02: account(
    "E2E_sapDEV_AGENT475_USER",
    "E2E_sapDEV_AGENT475_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bksagent03: account(
    "E2E_sapDEV_AGENT476_USER",
    "E2E_sapDEV_AGENT476_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tjqagent02: account(
    "E2E_sapDEV_AGENT477_USER",
    "E2E_sapDEV_AGENT477_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pdgagent03: account(
    "E2E_sapDEV_AGENT478_USER",
    "E2E_sapDEV_AGENT478_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  prmagent02: account(
    "E2E_sapDEV_AGENT479_USER",
    "E2E_sapDEV_AGENT479_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rgtagent02: account(
    "E2E_sapDEV_AGENT480_USER",
    "E2E_sapDEV_AGENT480_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kmaagent02: account(
    "E2E_sapDEV_AGENT481_USER",
    "E2E_sapDEV_AGENT481_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kagagent02: account(
    "E2E_sapDEV_AGENT482_USER",
    "E2E_sapDEV_AGENT482_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  llgagent02: account(
    "E2E_sapDEV_AGENT483_USER",
    "E2E_sapDEV_AGENT483_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pbmagent02: account(
    "E2E_sapDEV_AGENT484_USER",
    "E2E_sapDEV_AGENT484_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  spnagent02: account(
    "E2E_sapDEV_AGENT485_USER",
    "E2E_sapDEV_AGENT485_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bjiagent02: account(
    "E2E_sapDEV_AGENT486_USER",
    "E2E_sapDEV_AGENT486_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  blgagent03: account(
    "E2E_sapDEV_AGENT487_USER",
    "E2E_sapDEV_AGENT487_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  gntagent03: account(
    "E2E_sapDEV_AGENT488_USER",
    "E2E_sapDEV_AGENT488_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  knoagent04: account(
    "E2E_sapDEV_AGENT489_USER",
    "E2E_sapDEV_AGENT489_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lbpagent02: account(
    "E2E_sapDEV_AGENT490_USER",
    "E2E_sapDEV_AGENT490_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lbpagent03: account(
    "E2E_sapDEV_AGENT491_USER",
    "E2E_sapDEV_AGENT491_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mesagent02: account(
    "E2E_sapDEV_AGENT492_USER",
    "E2E_sapDEV_AGENT492_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pmsagent02: account(
    "E2E_sapDEV_AGENT493_USER",
    "E2E_sapDEV_AGENT493_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rapagent03: account(
    "E2E_sapDEV_AGENT494_USER",
    "E2E_sapDEV_AGENT494_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ffqagent02: account(
    "E2E_sapDEV_AGENT495_USER",
    "E2E_sapDEV_AGENT495_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  soqagent02: account(
    "E2E_sapDEV_AGENT496_USER",
    "E2E_sapDEV_AGENT496_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bikagent02: account(
    "E2E_sapDEV_AGENT497_USER",
    "E2E_sapDEV_AGENT497_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  wmnagent02: account(
    "E2E_sapDEV_AGENT498_USER",
    "E2E_sapDEV_AGENT498_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bgkagent02: account(
    "E2E_sapDEV_AGENT499_USER",
    "E2E_sapDEV_AGENT499_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  luwagent02: account(
    "E2E_sapDEV_AGENT500_USER",
    "E2E_sapDEV_AGENT500_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tliagent02: account(
    "E2E_sapDEV_AGENT501_USER",
    "E2E_sapDEV_AGENT501_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  buwagent02: account(
    "E2E_sapDEV_AGENT502_USER",
    "E2E_sapDEV_AGENT502_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  unhagent02: account(
    "E2E_sapDEV_AGENT503_USER",
    "E2E_sapDEV_AGENT503_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  bswagent02: account(
    "E2E_sapDEV_AGENT504_USER",
    "E2E_sapDEV_AGENT504_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mmjagent02: account(
    "E2E_sapDEV_AGENT505_USER",
    "E2E_sapDEV_AGENT505_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jscagent02: account(
    "E2E_sapDEV_AGENT506_USER",
    "E2E_sapDEV_AGENT506_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  srjagent02: account(
    "E2E_sapDEV_AGENT507_USER",
    "E2E_sapDEV_AGENT507_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  techtest01: account(
    "E2E_sapDEV_AGENT508_USER",
    "E2E_sapDEV_AGENT508_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  kbjagent02: account(
    "E2E_sapDEV_AGENT509_USER",
    "E2E_sapDEV_AGENT509_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  crmagent01: account(
    "E2E_sapDEV_AGENT510_USER",
    "E2E_sapDEV_AGENT510_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  adikhermawan: account(
    "E2E_sapDEV_AGENT511_USER",
    "E2E_sapDEV_AGENT511_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  aliramdan: account(
    "E2E_sapDEV_AGENT512_USER",
    "E2E_sapDEV_AGENT512_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ambyah: account(
    "E2E_sapDEV_AGENT513_USER",
    "E2E_sapDEV_AGENT513_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  anggadwikurniawan: account(
    "E2E_sapDEV_AGENT514_USER",
    "E2E_sapDEV_AGENT514_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ariewahjoeprabowo: account(
    "E2E_sapDEV_AGENT515_USER",
    "E2E_sapDEV_AGENT515_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  cahayamuslim: account(
    "E2E_sapDEV_AGENT516_USER",
    "E2E_sapDEV_AGENT516_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dhonnyirfansyah: account(
    "E2E_sapDEV_AGENT517_USER",
    "E2E_sapDEV_AGENT517_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  dickyramadhanrwiyanto: account(
    "E2E_sapDEV_AGENT518_USER",
    "E2E_sapDEV_AGENT518_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  fakhrurrozi: account(
    "E2E_sapDEV_AGENT519_USER",
    "E2E_sapDEV_AGENT519_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  iqbaltawakhal: account(
    "E2E_sapDEV_AGENT520_USER",
    "E2E_sapDEV_AGENT520_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  irmadyahsusanti: account(
    "E2E_sapDEV_AGENT521_USER",
    "E2E_sapDEV_AGENT521_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  irwansetiawan: account(
    "E2E_sapDEV_AGENT522_USER",
    "E2E_sapDEV_AGENT522_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  jeiskyaputrapratomo: account(
    "E2E_sapDEV_AGENT523_USER",
    "E2E_sapDEV_AGENT523_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  juniawatigunawan: account(
    "E2E_sapDEV_AGENT524_USER",
    "E2E_sapDEV_AGENT524_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  lindahandayani: account(
    "E2E_sapDEV_AGENT525_USER",
    "E2E_sapDEV_AGENT525_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mayacarolina: account(
    "E2E_sapDEV_AGENT526_USER",
    "E2E_sapDEV_AGENT526_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  mochamadibnurizky: account(
    "E2E_sapDEV_AGENT527_USER",
    "E2E_sapDEV_AGENT527_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  muhammadrizky: account(
    "E2E_sapDEV_AGENT528_USER",
    "E2E_sapDEV_AGENT528_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  pratiwirhapsari: account(
    "E2E_sapDEV_AGENT529_USER",
    "E2E_sapDEV_AGENT529_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rendiwinardo: account(
    "E2E_sapDEV_AGENT530_USER",
    "E2E_sapDEV_AGENT530_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rezaaffandirambe: account(
    "E2E_sapDEV_AGENT531_USER",
    "E2E_sapDEV_AGENT531_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rioyunaldi: account(
    "E2E_sapDEV_AGENT532_USER",
    "E2E_sapDEV_AGENT532_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  rizqidwikurniawan: account(
    "E2E_sapDEV_AGENT533_USER",
    "E2E_sapDEV_AGENT533_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  robisetiawan: account(
    "E2E_sapDEV_AGENT534_USER",
    "E2E_sapDEV_AGENT534_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  ruslanabdulgani: account(
    "E2E_sapDEV_AGENT535_USER",
    "E2E_sapDEV_AGENT535_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  sarifullah: account(
    "E2E_sapDEV_AGENT536_USER",
    "E2E_sapDEV_AGENT536_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  satriomuttaqien: account(
    "E2E_sapDEV_AGENT537_USER",
    "E2E_sapDEV_AGENT537_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  suriantoraviadichandra: account(
    "E2E_sapDEV_AGENT538_USER",
    "E2E_sapDEV_AGENT538_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  tikayunirma: account(
    "E2E_sapDEV_AGENT539_USER",
    "E2E_sapDEV_AGENT539_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  veronikadiask: account(
    "E2E_sapDEV_AGENT540_USER",
    "E2E_sapDEV_AGENT540_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  yaserslamatzega: account(
    "E2E_sapDEV_AGENT541_USER",
    "E2E_sapDEV_AGENT541_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  yosromaidi: account(
    "E2E_sapDEV_AGENT542_USER",
    "E2E_sapDEV_AGENT542_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),

  yudisetiawan: account(
    "E2E_sapDEV_AGENT543_USER",
    "E2E_sapDEV_AGENT543_PASSWORD",
    "agent",
    ["dev", "prod"],
    "prod-agent",
  ),
  //SAPaccountdev

  testing270520252: account(
    "E2E_DEV_ADMIN_2_USER",
    "E2E_DEV_ADMIN_2_PASSWORD",
    "admin",
    ["dev"],
    "dev-admin-2",
  ),

  roleValidation: {
    supervisor: account(
      "E2E_RBAC_SUPERVISOR_USER",
      "E2E_RBAC_SUPERVISOR_PASSWORD",
      "supervisor",
      ["dev", "prod"],
      "rbac-supervisor",
    ),
    agent: account(
      "E2E_RBAC_AGENT_USER",
      "E2E_RBAC_AGENT_PASSWORD",
      "agent",
      ["dev", "prod"],
      "rbac-agent",
    ),
    crm: account(
      "E2E_RBAC_CRM_USER",
      "E2E_RBAC_CRM_PASSWORD",
      "agent",
      ["dev", "prod"],
      "rbac-crm-agent",
    ),
    tlc: account(
      "E2E_RBAC_TLC_USER",
      "E2E_RBAC_TLC_PASSWORD",
      "agent",
      ["dev", "prod"],
      "rbac-tlc-agent",
    ),
  },
};

const apiKeys = {
  default: envValue("E2E_API_KEY"),
  tantaffgo: envValue("E2E_TANTAFFGO_SIGNATURE_KEY"),
  automation01: envValue("E2E_AUTOMATION_SIGNATURE_KEY"),
};

const testData = {
  parentNumber: envValue("E2E_PARENT_NUMBER", "6280000000000"),
  parentNumber2: envValue("E2E_PARENT_NUMBER_2", "6280000000000"),
  targetMessage_me: envValue("E2E_TARGET_NUMBER", "6280000000000"),
  targetMessage_dummy: envValue("E2E_TARGET_NUMBER_2", "6280000000000"),
  customerNumber: envValue("E2E_CUSTOMER_NUMBER", "6280000000000"),

  channelTypes: {
    widget: "widget",
    baileys: "baileys",
    whatsappOfficial: "whatsapp-official",
    email: "email",
    instagram: "instagram",
    facebook: "facebook",
    whatsappWeb: "whatsapp_web",
    whatsappApi: "whatsapp_api",
  },

  userRoles: {
    superAdmin: "super_admin",
    admin: "admin",
    supervisor: "supervisor",
    agent: "agent",
  },

  conversationStatus: {
    ongoing: "ongoing",
    resolved: "resolved",
    unassigned: "unassigned",
    spam: "spam",
    junk: "junk",
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

function getAccountByLoginType(loginType, env = "dev") {
  const account = testAccounts[loginType];
  if (!account) {
    throw new Error(`Account not found for loginType: ${loginType}`);
  }

  if (Array.isArray(account.env) && !account.env.includes(env)) {
    throw new Error(
      `Account '${loginType}' is not configured for env '${env}'`,
    );
  }

  const identifier = account.identifier;
  const password = account.password;
  if (!identifier || !password || password === "replace-me") {
    const identifierEnv = account.meta?.identifierEnv || "<unknown>";
    const passwordEnv = account.meta?.passwordEnv || "<unknown>";
    throw new Error(
      `Account '${loginType}' has unresolved credentials for env '${env}'. Check ${identifierEnv} and ${passwordEnv} in .env`,
    );
  }

  return {
    identifier,
    password,
    role: account.role,
  };
}

function getRequestedLoginType() {
  return process.env.LOGIN_TYPE || null;
}

function getSapAgentAccounts(env = "dev") {
  return Object.entries(testAccounts)
    .filter(([, account]) =>
      Boolean(account?.meta?.identifierEnv?.match(/^E2E_sap_AGENT\d+_USER$/)),
    )
    .filter(
      ([, account]) => Array.isArray(account.env) && account.env.includes(env),
    )
    .map(([key, account]) => ({
      key,
      identifier: account.identifier,
      password: account.password,
      role: account.role,
      identifierEnv: account.meta.identifierEnv,
      passwordEnv: account.meta.passwordEnv,
    }));
}

function getDefaultAccount(env = "dev") {
  const requestedLoginType = getRequestedLoginType();

  if (requestedLoginType) {
    return getAccountByLoginType(requestedLoginType, env);
  }

  if (env === "prod") {
    return getAccountByLoginType("goddummyprod", env);
  }
  if (env === "staging") {
    return getAccountByLoginType("goddumstag", env);
  }
  return getAccountByLoginType("goddummy", env);
}

module.exports = {
  testAccounts,
  apiKeys,
  testData,
  getAccountByLoginType,
  getDefaultAccount,
  getSapAgentAccounts,
  getRequestedLoginType,
};
