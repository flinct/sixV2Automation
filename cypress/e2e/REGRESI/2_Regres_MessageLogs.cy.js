import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import dashboardPage from "../../support/pages/dashboardPage.js";
const baseUrl = Cypress.config("baseUrl");
import userDataSpam from "../../support/data/spamLogin.js";
import broadcastPage from "../../support/pages/broadcastPage.js";
import groupPage from "../../support/pages/groupPage.js";
import ticketingPage from "../../support/pages/ticketingPage.js";
// import 'cypress-file-upload';

describe("testing send message then log the response", () => {
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

  before(() => {
    const timestamp = new Date().toISOString();
    Cypress.env("sessionLogTimestamp", timestamp);
    Cypress.env("inboxLogs", []);
    Cypress.env("messageLogs", []);
  });

  it.only("Send text message then save respose", () => {
    authAction.loginValidEmail();
    // cy.wait(1000);
    cy.wait(3000);
    cy.visit("/inbox");
    // cy.viewport(1366, 768);
    inboxAction.navigateToInbox_Ongoing();
    cy.wait(2000);
    cy.task("log", "select_roomChat_saveResponse");
    inboxAction.select_roomChat_saveResponse();
    cy.wait(2000);
    cy.task("log", "sendMessage_sendEnter_saveResponse");
    inboxAction.sendMessage_sendEnter_saveResponse();
    cy.wait(2000);
    cy.task("ensureLogsDir");
    cy.wait(2000);
    inboxAction.writeAllLogData();
  });

  // it("Send text message then save respose to disconnected account", () => {
  //   authAction.loginValidEmail();
  //   cy.wait(1000);
  //   cy.visit("/inbox");
  //   cy.viewport(1366, 768);
  //   inboxAction.navigateToInbox_Ongoing();
  //   inboxAction.select_roomChat_saveResponse_disconnectAccount();
  //   inboxAction.sendMessage_sendEnter_saveResponse();
  //   inboxAction.writeAllLogData();
  // });

  // it("printing all logs result", () => {
  //   // cy.printLogs();
  //   // cy.printSoftAssertLogs();
  //   cy.printLogs_successLogs();
  //   cy.printLogs_failedLogs();
  //   cy.printLogs_errorLogs();
  //   cy.wait(500);
  // });
});
