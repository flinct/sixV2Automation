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

  // Global fail handler
  // Cypress.on('fail', (error, runnable) => {
  //     const logMessage = `⚠️ Caught Error: ${error.message}`;
  //     assertionLogs.push(logMessage);
  //     cy.log(logMessage);
  //     // Prevent test failure
  //     return false;
  //     // failOnStatusCode: false
  // });

  // Cypress.on("uncaught:exception", (err, runnable) => {
  //   // Log any error using our custom task
  //   // Log a generic message if needed
  //   cy.task(
  //     "log asd",
  //     `Unhandled exception: ${err.message || JSON.stringify(err)}`
  //   );

  //   // Additionally log a custom message if specific content exists in the error
  //   if (err.message && err.message.includes("You cannot delete this user!")) {
  //     cy.task("log", `Specific error caught: ${err.message}`);
  //     // Optionally, you can check for other conditions here
  //   }

  //   // Return false to prevent Cypress from failing the test for this error
  //   return false;
  // });

  it("testing register with temporary email", () => {
    authAction.registerWithMailTm();
    // authAction.loginValidUsername();
    // authAction.doLogout();
  });

  // it.skip("printing all logs result", () => {
  //   // cy.printLogs();
  //   // cy.printSoftAssertLogs();
  //   cy.printLogs_successLogs();
  //   cy.printLogs_failedLogs();
  //   cy.printLogs_errorLogs();
  //   cy.wait(500);
  // });
});
