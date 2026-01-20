import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import dashboardPage from "../../support/pages/dashboardPage.js";
const baseUrl = Cypress.config("baseUrl");
import userDataSpam from "../../support/data/spamLogin.js";
import broadcastPage from "../../support/pages/broadcastPage.js";
import groupPage from "../../support/pages/groupPage.js";
import ticketingPage from "../../support/pages/ticketingPage.js";
import contactPage from "../../support/pages/contactPage.js";
// import accountWhatsappPage from "../../support/pages/accountWhatsappPage.js";
import userRbacPage from "../../support/pages/userRbacPage.js";
import { env_config } from "../../support/01_url_page.js";
import liveChatPage from "../../support/pages/liveChatPage.js";
// import 'cypress-file-upload';

describe("testing ONBOARDING page", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage();
  const dashboardAction = new dashboardPage();
  const broadcastAction = new broadcastPage();
  const groupAction = new groupPage();
  const ticketingAction = new ticketingPage();
  const contactAction = new contactPage();
  // const accountWhatsappAction = new accountWhatsappPage();
  const userRbacAction = new userRbacPage();
  const liveChatAction = new liveChatPage();

  let assertionLogs = [];

  // const config = env_config(baseUrl);

  const baseUrl = Cypress.config("baseUrl");
  const loginType = Cypress.env("loginType");

  //--------------onboarding validation--------------------
  it("check login validation - try login without validate email -", () => {
    authAction.tryLoginBeforeEmailValidated();
  });

  it.only("check onboarding validation -display behavior-", () => {
    authAction.validateOnboardingSuccessAccess();
  });
  it("check onboarding validation -try re-access with refreshing the page-", () => {
    authAction.validateOnboardingNotRedisplayWhenRefreshed();
  });
  it("check onboarding validation -re access via path-", () => {
    authAction.validateOnboardingReAccessViaPath();
  });
  it("check onboarding validation -successfull onboarding-", () => {
    authAction.validateOnboardingWithValidCriteria();
  });
  it("check onboarding validation -minimum organization name-", () => {
    authAction.validateOnboardingMinimumOrganizationName();
  });
  it("check onboarding validation -valid length organization name-", () => {
    authAction.validateOnboardingOrganizationNameValidLength();
  });
  it("check onboarding validation -maximum organization name-", () => {
    authAction.validateOnboardingMaximumOrganizationName();
  });
  it("check onboarding validation -organization name with special chars-", () => {
    authAction.validateOnboardingOrganizationNameWithSpecialChars();
  });
  it("check onboarding validation -organization name with numeric only-", () => {
    authAction.validateOnboardingOrganizationNameWithNumericOnly();
  });
  it("check onboarding validation -organization name with exsisting data-", () => {
    authAction.validateOnboardingOrganizationNameWithExistingData();
  });
  it("check onboarding validation -minimum NIB-", () => {
    authAction.validateOnboardingMinimumNIB();
  });
  it("check onboarding validation -valid lenght NIB-", () => {
    authAction.validateOnboardingNIBValidLength();
  });
  it("check onboarding validation -maximum NIB-", () => {
    authAction.validateOnboardingMaximumNIB();
  });
  it("check onboarding validation -NIB with alphabeth-", () => {
    authAction.validateOnboardingNIBWithAlphabet();
  });
  it("check onboarding validation -NIB with special chars-", () => {
    authAction.validateOnboardingNIBWithSpecialChars();
  });
  it("check onboarding validation -NIB with spaces-", () => {
    authAction.validateOnboardingNIBWithSpaces();
  });
  it("check onboarding validation -minimum NPWP-", () => {
    authAction.validateOnboardingMinimumNPWP();
  });
  it("check onboarding validation -valid lenght NPWP-", () => {
    authAction.validateOnboardingNPWPValidLength();
  });
  it("check onboarding validation -maximum NPWP-", () => {
    authAction.validateOnboardingMaximumNPWP();
  });
  it("check onboarding validation -NPWP with alphabeth-", () => {
    authAction.validateOnboardingNPWPWithAlphabet();
  });
  it("check onboarding validation -NPWP with special chars-", () => {
    authAction.validateOnboardingNPWPWithAlphabet();
  });
  it("check onboarding validation -NPWP with spaces-", () => {
    authAction.validateOnboardingNPWPWithSpaces();
  });
  it("check onboarding validation -NIB upload minimum-", () => {
    authAction.validateOnboardingNIBUploadBelowMax();
  });
  it("check onboarding validation -NIB upload maximum-", () => {
    authAction.validateOnboardingNIBUploadExceedMax();
  });
  it("check onboarding validation -NIB upload invalid ext-", () => {
    authAction.validateOnboardingNIBUploadInvalidExt();
  });
  it("check onboarding validation -NIB upload corrupted file-", () => {
    authAction.validateOnboardingNIBUploadCorruptFile();
  });
  it("check onboarding validation -minimum ID number-", () => {
    authAction.validateOnboardingMinimumIDnumber();
  });
  it("check onboarding validation -valid length ID number-", () => {
    authAction.validateOnboardingIDnumberValidLength();
  });
  it("check onboarding validation -maximum ID number-", () => {
    authAction.validateOnboardingMaximumIDnumber();
  });
  it("check onboarding validation -ID number with alphabeth-", () => {
    authAction.validateOnboardingIDnumberWithAlphabeth();
  });
  it("check onboarding validation -ID number with spaces-", () => {
    authAction.validateOnboardingIDnumberWithSpaces();
  });
});
