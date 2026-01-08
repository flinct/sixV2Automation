import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import dashboardPage from "../../support/pages/dashboardPage.js";
const baseUrl = Cypress.config("baseUrl");
import userDataSpam from "../../support/data/spamLogin.js";
import broadcastPage from "../../support/pages/broadcastPage.js";
import groupPage from "../../support/pages/groupPage.js";
import ticketingPage from "../../support/pages/ticketingPage.js";

describe("testing auth page", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage();
  const dashboardAction = new dashboardPage();
  const broadcastAction = new broadcastPage();
  const groupAction = new groupPage();
  const ticketingAction = new ticketingPage();

  let assertionLogs = [];

  // Global fail handler
  // Cypress.on('fail', (error, runnable) => {
  //     const logMessage = `⚠️ Caught Error: ${error.message}`;
  //     assertionLogs.push(logMessage);
  //     cy.log(logMessage);
  //     // Prevent test failure
  //     return false;
  //     // failOnStatusCode: false
  // });

  beforeEach(() => {
    // Clear cookies, local storage, and session storage to simulate clearing cache
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    // cy.intercept('*').as('allRequests'); // Catch all API calls
  });

  it("element checking on auth page", () => {
    authAction.elementChecking();
    cy.task("log", "end of >> element checking on auth page");
    cy.wait(500);
  });

  it("valid login with username", () => {
    authAction.loginValidUsername();
    cy.task("log", "end of >> valid login with username");
    cy.wait(500);
    // authAction.doLogout();
  });

  it("valid login with email", () => {
    authAction.loginValidEmail();
    cy.task("log", "end of >> valid login with email");
    cy.wait(500);
    // authAction.doLogout();
  });

  it("invalid login with username", () => {
    authAction.loginInvalidUsername();
    cy.task("log", "end of >> invalid login with username");
    cy.wait(500);
    // authAction.doLogout();
  });
  it("invalid login with email", () => {
    authAction.loginInvalidEmail();
    cy.task("log", "end of >> invalid login with username");
    cy.wait(500);
    // authAction.doLogout();
  });
  it("invalid login with wrong password", () => {
    authAction.loginInvalidPassword();
    cy.task("log", "end of >> invalid login with wrong password");
    cy.wait(500);
    // authAction.doLogout();
  });
  it("invalid login with blank username or email", () => {
    authAction.loginBlankemail();
    cy.task("log", "end of >> invalid login with blank username or email");
    cy.wait(500);
    // authAction.doLogout();
  });
  it("invalid login with blank password", () => {
    authAction.loginBlankPassword();
    cy.task("log", "end of >> invalid login with blank password");
    cy.wait(500);
    // authAction.doLogout();
  });

  it("logout", () => {
    authAction.loginValidUsername();
    authAction.doLogout();
    cy.task("log", "end of >> logout");
    cy.wait(500);
  });

  it("element checking dashboard", () => {
    authAction.loginValidUsername();
    dashboardAction.elementCheckDashboard();
    cy.task("log", "end of >> element checking dashboard");
    // authAction.doLogout();
    cy.wait(500);
  });

  it("element checking inbox", () => {
    authAction.loginValidUsername();
    inboxAction.elementCheckingInbox();
    cy.task("log", "end of >> element checking inbox");
    // authAction.doLogout();
    cy.wait(500);
  });

  it("element checking group chat", () => {
    authAction.loginValidUsername();
    // groupAction.navigateToGroupChat();
    groupAction.elementCheckingGroupPage();
    cy.task("log", "end of >> element checking group chat");
  });

  it("element checking ticketing", () => {
    authAction.loginValidUsername();
    ticketingAction.elementCheckingTicketingPage();
    cy.task("log", "end of >> element checking ticketing");
  });

  it("element checking broadcast", () => {
    authAction.loginValidUsername();
    broadcastAction.navigateToBroadcast_history();
    broadcastAction.elementCheckingBroadcast_history();
    // authAction.doLogout();
    // authAction.loginValidUsername();
    dashboardAction.navigateToDashboard();
    broadcastAction.navigateToBroadcast_template();
    broadcastAction.elementCheckingBroadcast_template();
    cy.task("log", "end of >> element checking broadcast");
    cy.wait(500);
  });

  // it.skip("insert new template broadcast", () => {
  //   authAction.loginValidUsername();
  //   broadcastAction.navigateToBroadcast_template();
  //   broadcastAction.create_new_templateBC_save();
  //   cy.task("log", "end of >> insert new template broadcast");
  //   //send message to
  //   // inboxAction.navigateToInbox()
  //   // inboxAction.navigateToInbox_Ongoing();
  //   // cy.task('log',cy.searchBoxOnInbox().type('89655057778'),'search number 089655057778');
  //   // cy.task('log',cy.contains('89655057778').click(),'open chat with 089655057778');
  //   // broadcastAction.create_new_templateBC_cancel();
  //   cy.wait(500);
  // });

  it("printing all logs result", () => {
    // cy.printLogs();
    // cy.printSoftAssertLogs();
    cy.printLogs_successLogs();
    cy.printLogs_failedLogs();
    cy.printLogs_errorLogs();
    cy.wait(500);
  });
});
