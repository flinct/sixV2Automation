import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import dashboardPage from "../../support/pages/dashboardPage.js";
const baseUrl = Cypress.config("baseUrl");
import userDataSpam from "../../support/data/spamLogin.js";
import broadcastPage from "../../support/pages/broadcastPage.js";
import groupPage from "../../support/pages/groupPage.js";
import ticketingPage from "../../support/pages/ticketingPage.js";
// import 'cypress-file-upload';

describe("testing INBOX page", () => {
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

  beforeEach(() => {
    cy.session("loginSession", () => {
      // Adjust cookie names to match your app
      authAction.loginValidUsername();
      // cy.wait(2000);
      cy.softAssert(cy.dashboardNav(), "a");
    });
  });

  // after(() => {
  //   inboxAction.writeCombinedLog();
  // });

  it("checking account whatsapp", () => {
    cy.task("log", "select chat without open the chat then assign to yourself");
    cy.task("log", "after success, handover, back to pool");
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.single_bulkSelect_unassign();
    inboxAction.single_bulk_back_to_unassigned();
  });
  it.only("bulk action single assign", () => {
    cy.task("log", "select chat without open the chat then assign to yourself");
    cy.task("log", "after success, handover, back to pool");
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.single_bulkSelect_unassign();
    inboxAction.single_bulk_back_to_unassigned();
  });
  it("bulk action single handover", () => {
    cy.task(
      "log",
      "select chat without open the chat then handover to yourself"
    );
    cy.task("log", "after success, handover, back to pool");
    // authAction.loginValidUsername_chickentesterDev();
    cy.wait(1000);
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    cy.log("a");
    inboxAction.single_bulk_handover_unassigned();
    cy.log("b");
    inboxAction.single_bulk_back_to_unassigned();
  });
  it("bulk action multiple assign", () => {
    cy.task(
      "log",
      "select multiple chat without open the chat then handover to yourself"
    );
    cy.task("log", "after success, handover, back to pool");
    // authAction.loginValidUsername_chickentesterDev();
    cy.wait(1000);
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.multiple_bulk_unassign();
    // inboxAction.multiple_bulk_back_to_unassigned();
  });

  it("filtering inbox test", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.filtering_byCustomerNumber();
    // inboxAction.filtering_byFilterAction();
  });

  it("change customer aliases at unassigned", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.select_chatFrom_unassigned();
    inboxAction.changeCustomerAliasses();
  });

  it("try delete customer aliases at unassigned", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.select_roomChat();
    inboxAction.tryDeleteCustomerAliasses();
  });

  it("create comments at inbox", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.select_chatFrom_unassigned();
    inboxAction.sendMessage_sendEnter();
    inboxAction.getStatusMessage();
    inboxAction.createComments();
    inboxAction.solveChat();
  });

  it("send broadcast then verify pagination multiprops", () => {
    //error broadcast, belum beres
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.sendMultipleBroadcast();
    inboxAction.select_chatFrom_unassigned();
    inboxAction.sendMessage_sendEnter();
    inboxAction.navigateToInbox_propertiesTab();
    inboxAction.pagination_multiprops();
    inboxAction.solveChat();
  });

  it("send broadcast then verify multiprops", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    // inboxAction.navigateToInbox();
    inboxAction.sendBroadcast();
    inboxAction.select_chatFrom_unassigned();
    inboxAction.sendMessage_sendEnter();
    inboxAction.solveChat();
    inboxAction.navigateToInbox_resolved();
    inboxAction.select_roomChat();
    inboxAction.checkMultiProps();
    // cy.visit('/broadcast/riwayat');
  });

  it("reopen solved chat", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.navigateToInbox_resolved();
    inboxAction.select_roomChat();
    inboxAction.reopen_chat();
    inboxAction.select_roomChat();
    inboxAction.sendMessage_sendEnter();
    inboxAction.solveChat();
  });

  it("handover chat at unassigned tab", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    // inboxAction.navigateToInbox();
    inboxAction.select_chatFrom_unassigned();
    inboxAction.handoverChat();
    inboxAction.solveChat();
  });

  it("verify value history room chat", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    // inboxAction.navigateToInbox();
    inboxAction.select_chatFrom_unassigned();
    inboxAction.sendMessage_sendEnter();
    inboxAction.solveChat();
    inboxAction.checkLastHistoryInbox();
  });

  it("add, remove label inbox", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    // inboxAction.navigateToInbox();
    inboxAction.select_chatFrom_unassigned();
    inboxAction.sendMessage_sendEnter();
    inboxAction.navigateToInbox_Ongoing();
    inboxAction.select_roomChat();
    inboxAction.inbox_validate_add_label_oneCharacter(); //case : label kosong
    cy.document().trigger("keydown", { key: "Escape" });
    inboxAction.inbox_validate_add_label();
    cy.document().trigger("keydown", { key: "Escape" });
    inboxAction.inbox_add_label();
  });

  it("add agent, remove agent inbox", () => {
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    // inboxAction.navigateToInbox();
    inboxAction.navigateToInbox_Ongoing();
    inboxAction.select_roomChat();
    inboxAction.inbox_add_agent();
    inboxAction.inbox_remove_second_agent();
  });

  it("Send text message, files, document", () => {
    // authAction.loginValidEmail();
    cy.wait(1000);
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.navigateToInbox_Ongoing();
    inboxAction.select_roomChat();
    inboxAction.sendMessage_sendEnter();
    inboxAction.sendImg_dragndrop();
    inboxAction.sendImg_dragndrop_withQuotes();
  });

  it.skip("Send text message then save respose", () => {
    authAction.loginValidEmail();
    cy.wait(1000);
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.navigateToInbox_Ongoing();
    inboxAction.select_roomChat_saveResponse();
    inboxAction.sendMessage_sendEnter_saveResponse();
    inboxAction.writeAllLogData();
  });

  it.skip("Send text message then save respose to disconnected account", () => {
    authAction.loginValidEmail();
    cy.wait(1000);
    cy.visit("/inbox");
    cy.viewport(1366, 768);
    inboxAction.navigateToInbox_Ongoing();
    inboxAction.select_roomChat_saveResponse_disconnectAccount();
    inboxAction.sendMessage_sendEnter_saveResponse();
    inboxAction.writeAllLogData();
  });

  // it("printing all logs result", () => {
  //   // cy.printLogs();
  //   // cy.printSoftAssertLogs();
  //   cy.printLogs_successLogs();
  //   cy.printLogs_failedLogs();
  //   cy.printLogs_errorLogs();
  //   cy.wait(500);
  // });
});
