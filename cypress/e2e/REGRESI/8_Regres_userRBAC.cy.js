import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import dashboardPage from "../../support/pages/dashboardPage.js";
const baseUrl = Cypress.config("baseUrl");
import userDataSpam from "../../support/data/spamLogin.js";
import broadcastPage from "../../support/pages/broadcastPage.js";
import groupPage from "../../support/pages/groupPage.js";
import ticketingPage from "../../support/pages/ticketingPage.js";
import contactPage from "../../support/pages/contactPage.js";
import accountWhatsappPage from "../../support/pages/accountWhatsappPage.js";
import userRbacPage from "../../support/pages/userRbacPage.js";
import { env_config } from "../../support/01_url_page.js";
// import 'cypress-file-upload';

describe("testing auth page", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage();
  const dashboardAction = new dashboardPage();
  const broadcastAction = new broadcastPage();
  const groupAction = new groupPage();
  const ticketingAction = new ticketingPage();
  const contactAction = new contactPage();
  const accountWhatsappAction = new accountWhatsappPage();
  const userRbacAction = new userRbacPage();

  let assertionLogs = [];

  const config = env_config(baseUrl);

  const mainUrl2 = "https://dev.satuinbox.com/";
  const visit_user_grup = "https://dev.satuinbox.com/setting/manage-group";
  const visit_register = "https://dev.satuinbox.com/register";

  // Global fail handler
  // Cypress.on('fail', (error, runnable) => {
  //     const logMessage = `⚠️ Caught Error: ${error.message}`;
  //     assertionLogs.push(logMessage);
  //     cy.log(logMessage);
  //     // Prevent test failure
  //     return false;
  //     // failOnStatusCode: false
  // });

  Cypress.on("uncaught:exception", (err, runnable) => {
    // Log any error using our custom task
    // Log a generic message if needed
    cy.task(
      "log asd",
      `Unhandled exception: ${err.message || JSON.stringify(err)}`
    );

    // Additionally log a custom message if specific content exists in the error
    if (err.message && err.message.includes("You cannot delete this user!")) {
      cy.task("log", `Specific error caught: ${err.message}`);
      // Optionally, you can check for other conditions here
    }

    // Return false to prevent Cypress from failing the test for this error
    return false;
  });

  beforeEach(() => {
    cy.session("loginSession", () => {
      // Adjust cookie names to match your app
      // authAction.loginValidUsername();
      authAction.login_kentang_owner();
      // cy.wait(2000);
      cy.softAssert(cy.headLabelPageOnDashboard(), "a");
    });
  });

  it("element testing kelola tim", () => {
    cy.visit(config.visit_user);
    cy.viewport(1366, 768);
    cy.wait(1000);
    userRbacAction.elementCheckingUserRbac_kelolaTim();
  });

  it("login as admin and delete user", () => {
    cy.visit(config.visit_user);
    authAction.doLogout();
    authAction.loginAsAdmin();
    cy.visit(visit_user);
    cy.viewport(1366, 768);
    authAction.doLogout();
    authAction.login_bikini_bottom_admin();
    userRbacAction.navigateToKelolaTim();
    cy.wait(1000);
    userRbacAction.deleteUserLogin_Admin();
    authAction.doLogout();
  });

  it("login as agent and validate agent access page", () => {
    cy.visit(config.inbox);
    cy.viewport(1366, 768);
    authAction.doLogout();
    authAction.login_bikini_bottom_agent();
    userRbacAction.access_page_asAgent();
    cy.wait(1000);
    authAction.doLogout();
  });
  it("login as admin and validate admin access page", () => {
    cy.visit(config.inbox);
    cy.viewport(1366, 768);
    authAction.doLogout();
    authAction.login_bikini_bottom_admin();
    userRbacAction.access_page_asAdmin();
    cy.wait(1000);
    authAction.doLogout();
  });

  it("create user Login - super Admin , admin , agent", () => {
    cy.visit(config.visit_user);
    cy.viewport(1366, 768);
    cy.wait(1000);
    const loop = 3;
    for (let i = 0; i < loop; i++) {
      userRbacAction.createChildUser_SuperAdmin();
      cy.reload();
      userRbacAction.createChildUser_Admin();
      cy.reload();
      userRbacAction.createChildUser_agent();
      cy.reload();
    }
  });

  it("create user Login static name - super Admin , admin , agent", () => {
    cy.visit(config.visit_user);
    cy.viewport(1366, 768);
    cy.wait(1000);
    const loop = 1;
    for (let i = 0; i < loop; i++) {
      userRbacAction.createChildUser_SuperAdminStatic();
      cy.reload();
      // userRbacAction.createChildUser_AdminStatic();
      // cy.reload();
      // userRbacAction.createChildUser_agentStatic();
      // cy.reload();
    }
  });

  it("delete user Login static - super Admin , admin , agent", () => {
    cy.visit(config.visit_user);
    cy.viewport(1366, 768);
    cy.wait(1000);
    userRbacAction.deleteUserLogin_superAdminStatic();
    // cy.reload();
    // userRbacAction.deleteUserLogin_agent();
    // cy.reload();
    // userRbacAction.deleteUserLogin_superAdmin();
    // cy.reload();
  });

  it("delete user Login - super Admin , admin , agent", () => {
    cy.visit(config.visit_user);
    cy.viewport(1366, 768);
    cy.wait(1000);
    userRbacAction.deleteUserLogin_Admin();
    // cy.reload();
    // userRbacAction.deleteUserLogin_agent();
    // cy.reload();
    // userRbacAction.deleteUserLogin_superAdmin();
    // cy.reload();
  });

  it.skip("printing all logs result", () => {
    // cy.printLogs();
    // cy.printSoftAssertLogs();
    cy.printLogs_successLogs();
    cy.printLogs_failedLogs();
    cy.printLogs_errorLogs();
    cy.wait(500);
  });
});
