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

describe("testing REGISTER page", () => {
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

  before(() => {
    const timestamp = new Date().toISOString();
    Cypress.env("sessionLogTimestamp", timestamp);
    Cypress.env("inboxLogs", []);
    Cypress.env("messageLogs", []);
  });

  // beforeEach(() => {
  //   cy.session("loginSession", () => {
  //     // Adjust cookie names to match your app
  //     authAction.loginValidUsername();
  //     // cy.wait(2000);
  //     cy.softAssert(cy.dashboardNav(), "a");
  //   });
  // });

  // after(() => {
  //   inboxAction.writeCombinedLog();
  // });

  it("check exist element on register", () => {
    authAction.elementCheckingRegister();
  });
  it("check register error state", () => {
    authAction.checkingRegisterErrorState();
  });

  //---------register validation-----------
  it("check duplicate email validation", () => {
    authAction.validateAlreadyRegisteredEmail();
  });
  it("check email validation no leading include", () => {
    authAction.validateEmailWithLeading();
  });
  it("check email validation normalization to lowercase", () => {
    authAction.validateEmailWithUpprecase();
  });
  it("check email validation - missing '@'", () => {
    authAction.validateInvalidEmailInput();
  });
  it("check email validation - missing domain", () => {
    authAction.validateInvalidEmailInput2();
  });
  it("check email validation -invalid input", () => {
    authAction.validateInvalidEmailInput3();
  });
  it("check registration token and link verify", () => {
    authAction.validateTokenAndLinkEmail();
  });
  it("check successfull register with all valid format input", () => {
    authAction.successfullRegisterWithValidAllInputFormat();
  });

  //--------------fullname validation--------------------
  it("check minimum fullname register", () => {
    authAction.validateMinimumFullname();
  });
  it("check maximum fullname register", () => {
    authAction.validateMaximumFullname();
  });
  it("check fullname register with numbers", () => {
    authAction.validateFullnameWithNumbers();
  });
  it("check fullname register with special character", () => {
    authAction.validateFullnameWithSpecialChar();
  });
  it("check fullname register with double spacing", () => {
    authAction.validateFullnameContainsDoubleSpace();
  });

  //--------------username validation--------------------
  it("check minimum username register", () => {
    authAction.validateMinimumUsername();
  });
  it("check maximum username register", () => {
    authAction.validateMaximumUsername();
  });
  it("check username register with spacing", () => {
    authAction.validateUsernameWithSpacing();
  });
  it("check username register with special character", () => {
    authAction.validateUsernameWithSpecialChar();
  });
  it("check already registered username", () => {
    authAction.validateAlreadyRegisteredUsername();
  });
  it("check username register with uppercases", () => {
    authAction.validateUsernameWithUppercase();
  });
  it("check username register with trailing space", () => {
    authAction.validateUsernameWithtrailingSpace();
  });

  //--------------phoneNumber validation--------------------
  it("check phoneNumber register with local code", () => {
    authAction.validatePhoneNumberLocalCode();
  });
  it("check phoneNumber register with international code", () => {
    authAction.validatePhoneNumberInternationalCode();
  });
  it("check minimum phoneNumber register - 9 digit -", () => {
    authAction.validateMinimumPhoneNumber9digit();
  });
  it("check minimum phoneNumber register - 5 digit -", () => {
    authAction.validateMinimumPhoneNumber5digit();
  });
  it("check minimum phoneNumber register - 2 digit -", () => {
    authAction.validateMinimumPhoneNumber2digit();
  });
  it("check maximum phoneNumber register - 13 digits -", () => {
    authAction.validateMaximumPhoneNumber13digit();
  });
  it("check maximum phoneNumber register - 17 digits -", () => {
    authAction.validateMaximumPhoneNumber17digit();
  });
  it("check maximum phoneNumber register - 25 digits -", () => {
    authAction.validateMaximumPhoneNumber25digit();
  });
  it("check phoneNumber register with special character", () => {
    authAction.validatePhoneNumberWithSpecialCharacter();
  });
  it("check phoneNumber register with spacing", () => {
    authAction.validatePhoneNumberWithSpacing();
  });
  it("check phoneNumber register with trailing spacing", () => {
    authAction.validatePhoneNumberWithTrailing();
  });
  it("check phoneNumber register with invalid prefix", () => {
    authAction.validatePhoneNumberWithInvalidPrefix();
  });
  it("check phoneNumber register with prefix spacing", () => {
    authAction.validatePhoneNumberWithPrefixSpacing();
  });
  it("check phoneNumber register with already registered number", () => {
    authAction.validatePhoneNumberWithAlreadyRegisteredNumber();
  });

  //--------------password validation--------------------
  it("check password register with minimum input", () => {
    authAction.validateMinimumPassword();
  });
  it("check password register with maximum input", () => {
    authAction.validateMaximumPassword();
  });
  it("check password register without special chars", () => {
    authAction.validatePasswordNoSpecialChar();
  });
  it("check password register without capital chars", () => {
    authAction.validatePasswordNoCapitalChar();
  });
  it("check password register same as username", () => {
    authAction.validatePasswordSameAsUsername();
  });
  it("check password register same as email", () => {
    authAction.validatePasswordSameAsEmail();
  });
  it("check password register contains spacing", () => {
    authAction.validatePasswordContainsSpacing();
  });

  //test functional auth - REGISTER - LOGIN - LOGOUT - RESET PASSWORD - LOGIN WITH NEW PASSWORD
  it("try register and reset password", () => {
    authAction.registerAndResetWithMailTm();
  });
});

//check phoneNumber register with local code
//check phoneNumber register with trailing spacing
//check onboarding validation -display behavior-
//check onboarding validation -try re-access with refreshing the page-
//check onboarding validation -re access via path-
