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
import allPageAccess from "../../support/pages/checkAllPage.js";
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
  const accessAction = new allPageAccess();

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

  // --- LOGIN PAGE ---
  it("Access Login Page", () => {
    cy.visit("/id/login");
    // accessAction.accessConversation();
    cy.url().should("include", "/id/login");
    cy.document().should("have.property", "readyState", "complete");
  });

  // --- REGISTER PAGE ---
  it("Access Register Page", () => {
    cy.visit("/id/login");
    accessAction.accessRegister();
    cy.url().should("include", "/id/register");
    cy.document().should("have.property", "readyState", "complete");
  });

  // --- ONBOARDING PAGE ---
  it.skip("Access Onboarding Page", () => {
    cy.visit("/id/login");
    accessAction.accessRegister();
    cy.url().should("include", "/id/onboarding");
    cy.document().should("have.property", "readyState", "complete");
  });

  // --- CONVERSATION PAGE ---
  it("Access Conversation Page", () => {
    cy.visit("/id/login");
    authAction.loginValidUsername();
    accessAction.accessConversation();
    accessAction.accessConversationUnassigned();
    accessAction.accessConversationAll();
    accessAction.accessConversationSpam();
    accessAction.accessConversationStarred();
    accessAction.accessGroupConversation();
    accessAction.accessChannelWhatsappWeb();
    accessAction.accessConversationTeam();
  });

  // --- TICKET PAGE ---
  it("Access Ticket Page", () => {
    cy.visit("/id/login");
    authAction.loginValidUsername();
    accessAction.accessTicket();
    accessAction.accessTicketClosed();
    accessAction.accessCreateTicket();
  });

  // --- BROADCAST PAGE ---
  it("Access Broadcast Page", () => {
    cy.visit("/id/login");
    authAction.loginValidUsername();
    accessAction.accessBroadcast({
      timeout: 15000,
    });
  });

  // --- STATISTIC PAGE ---
  it("Access Statistic Page", () => {
    cy.visit("/id/login");
    authAction.loginValidUsername();
    accessAction.accessStatistic({
      timeout: 15000,
    });
    cy.url({
      timeout: 15000,
    }).should("include", "/id/statistic");
    cy.document().should("have.property", "readyState", "complete");
  });

  // --- CONTACT PAGE ---
  it("Access Contact Page", () => {
    cy.visit("/id/login");
    authAction.loginValidUsername();
    accessAction.accessContact({
      timeout: 15000,
    });
    cy.url({
      timeout: 15000,
    }).should("include", "/id/contacts");
    cy.document().should("have.property", "readyState", "complete");
  });

  // --- SETTING PAGE ---
  it.only("Access Setting Page", () => {
    cy.visit("/id/login");
    authAction.loginValidUsername();
    accessAction.accessSetting({
      timeout: 15000,
    });
  });

  // --- YOUR PROFILE ---
  it("Access Your Profile", () => {
    cy.visit("/id/login");
    authAction.loginValidUsername();
    accessAction.accessProfile({
      timeout: 15000,
    });
    cy.url({
      timeout: 15000,
    }).should("include", "/id/conversation/your-inbox");

    // cek icon profile
    cy.get(
      'div[role="dialog"][data-state="open"] button:has(svg.tabler-icon-logout)'
    );
  });
});
