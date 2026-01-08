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

describe("testing INBOX page", () => {
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

  Cypress.on("uncaught:exception", (err, runnable) => {
    // cy.task(
    //   "log asd",
    //   `Unhandled exception: ${err.message || JSON.stringify(err)}`
    // );
    console.error("Unhandled exception:", err.message || JSON.stringify(err));
    // if (err.message && err.message.includes("You cannot delete this user!")) {
    //   cy.task("log", `Specific error caught: ${err.message}`);
    // }
    return false;
  });

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

  it("TEST", () => {
    authAction.test();
  });
  it("check exist element on register", () => {
    authAction.elementCheckingRegister();
  });
  it("check register error state", () => {
    authAction.checkingRegisterErrorState();
  });
  it("check exist element on login", () => {
    authAction.elementCheckingV2Login();
  });
  it("check login error state", () => {
    authAction.elementCheckingV2LoginErrorState();
  });

  //register validation
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
  it.only("check successfull register with all valid format input", () => {
    authAction.successfullRegisterWithValidAllInputFormat();
  });

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

  //onboarding validation
  it("check login validation - try login without validate email -", () => {
    authAction.tryLoginBeforeEmailValidated();
  });

  it("check onboarding validation -display behavior-", () => {
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

  //test functional auth - REGISTER - LOGIN - LOGOUT - RESET PASSWORD - LOGIN WITH NEW PASSWORD
  it("try register and reset password", () => {
    authAction.registerAndResetWithMailTm();
  });

  // it("try login with valid credentials", () => {
  //   authAction.loginValidUsername();
  // });
  // it("try login with INVALID credentials", () => {
  //   authAction.loginInvalidUsername();
  // });

  //access token validation
  it.only("Confirm that the access token truly becomes invalid after 15 minutes", () => {
    authAction.tokenValidationAfter15minutes();
  });
});
