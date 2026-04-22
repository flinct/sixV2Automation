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

  it("check onboarding validation -display behavior-", () => {
    authAction.validateOnboardingSuccessAccess();
  });
  it("check onboarding validation -try re-access with refreshing the page- FAILED, REFRESH - RE-ENTER ONBOARDING FORM", () => {
    authAction.validateOnboardingNotRedisplayWhenRefreshed();
  });
  it("check onboarding validation -re access via path-", () => {
    authAction.validateOnboardingReAccessViaPath();
  });
  it("check onboarding validation -successfull onboarding-", () => {
    authAction.validateOnboardingWithValidCriteria();
  });

  //field validation
  it.only("check onboarding field validation -minimum organization name-", () => {
    // ORGANIZATION NAME
    authAction.validateOnboardingMinimumOrganizationName();
    authAction.validateOnboardingMaximumOrganizationName();
    authAction.validateOnboardingMaximumOrganizationName();
    authAction.validateOnboardingOrganizationNameWithSpecialChars();
    authAction.validateOnboardingOrganizationNameWithNumericOnly();
    // authAction.validateOnboardingOrganizationNameWithExistingData();

    // NIB
    authAction.validateOnboardingMinimumNIB();
    authAction.validateOnboardingNIBValidLength();
    authAction.validateOnboardingMaximumNIB();
    authAction.validateOnboardingNIBWithAlphabet();
    authAction.validateOnboardingNIBWithSpecialChars();
    authAction.validateOnboardingNIBWithSpaces();

    // NPWP
    authAction.validateOnboardingMinimumNPWP();
    authAction.validateOnboardingNPWPValidLength();
    authAction.validateOnboardingMaximumNPWP();
    authAction.validateOnboardingNPWPWithAlphabet();
    authAction.validateOnboardingNPWPWithSpecialChars();

    // NIB FILE UPLOAD
    authAction.validateOnboardingNIBUploadBelowMax();
    authAction.validateOnboardingNIBUploadExceedMax();
    authAction.validateOnboardingNIBUploadInvalidExt();
    // authAction.validateOnboardingNIBUploadCorruptFile();

    // NPWP FILE UPLOAD
    authAction.validateOnboardingNPWPValidLength();
    authAction.validateOnboardingMaximumNPWP();
    authAction.validateOnboardingNPWPWithAlphabet();
    authAction.validateOnboardingNPWPWithSpecialChars();
    // authAction.validateOnboardingNPWPWithSpaces();

    //ID NUMBER
    authAction.validateOnboardingMinimumIDnumber();
    // authAction.validateOnboardingIDnumberValidLength();
    authAction.validateOnboardingMaximumIDnumber();
    authAction.validateOnboardingIDnumberWithSpaces();
    authAction.validateOnboardingIDnumberWithAlphabet();
    authAction.validateOnboardingIDnumberWithSpecialChars();
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
