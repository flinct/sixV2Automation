import authPage from '../../support/pages/authPage.js';
import inboxPage from '../../support/pages/inboxPage.js';
import dashboardPage from '../../support/pages/dashboardPage.js';
const baseUrl = Cypress.config('baseUrl');
import userDataSpam from '../../support/data/spamLogin.js';
import broadcastPage from '../../support/pages/broadcastPage.js';
import groupPage from '../../support/pages/groupPage.js';
import ticketingPage from '../../support/pages/ticketingPage.js';
import contactPage from '../../support/pages/contactPage.js';
// import 'cypress-file-upload';

describe('testing auth page', ()=>{
  const authAction = new authPage();
  const inboxAction = new inboxPage();
  const dashboardAction = new dashboardPage();
  const broadcastAction = new broadcastPage();
  const groupAction = new groupPage();
  const ticketingAction = new ticketingPage();
  const contactAction = new contactPage();

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
      cy.session('loginSession', () => {  // Adjust cookie names to match your app
        authAction.loginValidUsername();
        // cy.wait(2000);
        cy.softAssert(cy.headLabelPageOnDashboard(),'a');
      });
    });
    
  it.only('handover chat at unassigned tab', () => {
    cy.visit('https://dev.satuinbox.com/contact');
    cy.viewport(1366, 768);
    contactAction.elementCheckingContactPage();
  });
  
  it('printing all logs result', () => {
    // cy.printLogs();
    // cy.printSoftAssertLogs();
    cy.printLogs_successLogs();
    cy.printLogs_failedLogs();
    cy.printLogs_errorLogs();
    cy.wait(500);
  });
})