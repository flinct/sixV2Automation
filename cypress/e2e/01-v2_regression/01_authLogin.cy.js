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

  it("check exist element on login", () => {
    authAction.elementCheckingV2Login();
  });
  it("check login error state", () => {
    authAction.elementCheckingV2LoginErrorState();
  });

  it("try login with valid credentials", () => {
    authAction.loginValidUsername();
  });
  it("try login with INVALID credentials", () => {
    authAction.loginInvalidUsername();
  });

  //access token validation
  it.only("Confirm that the access token truly becomes invalid after 15 minutes", () => {
    authAction.tokenValidationAfter15minutes();
  });
});
