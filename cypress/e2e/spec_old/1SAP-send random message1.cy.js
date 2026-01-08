import { env_config } from "../../support/01_url_page.js";
import { loginAndRetrieveTokenAndAccounts } from "../../support/getDataApi3.js";
import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import { generateRandomQuote } from "../../support/quoteGenerator.js";

const baseUrl = Cypress.config("baseUrl");

const config = env_config(baseUrl);
let errorLogs = [];

describe("Spam login and send message", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage();

  before(() => {
    loginAndRetrieveTokenAndAccounts();
  });

  beforeEach(() => {
    cy.session("loginSession", () => {
      authAction.loginValidUsername();
      // authAction.login_SAP_superAdmin(                              );
      // cy.headLabelPageOnDashboard().should('be.visible');
      // cy.userLoginNameLabel().should('be.visible');

      // // Go to inbox
      // inboxAction.navigateToInbox();
      // cy.headLabelInbox().should('be.visible').contains('Inbox');
    });
  });

  function sendMessage(accountList, parentNumber) {
    accountList.forEach((accountNumber) => {
      const randomDelay = Math.floor(Math.random() * 8000) + 4000;

      cy.wait(randomDelay).then(() => {
        const randomQuote = generateRandomQuote();

        cy.request({
          method: "POST",
          url: `${config.sendMessageUrl}${accountNumber}`,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
          body: {
            id: config.targetMessage_me,
            message: randomQuote,
          },
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status === 403) {
            const errorMessage = `Error for key ${accountNumber}: ${response.body.message}`;
            // cy.log(errorMessage);
            cy.wrap(errorMessage).as("errorMessage");
            cy.task("log", `403 Errors encountered: ${errorMessage}`);
            // errorLogs.push(errorMessage); // Store the error message
          } else {
            cy.log(
              `Reply from ${accountNumber} to parent ${parentNumber}:`,
              JSON.stringify(response.body)
            );
          }
          // sendReply(accountNumber, parentNumber);
        });
      });
    });
  }

  // Main test case
  it("Run tests for prioritized and remaining WhatsApp numbers", () => {
    cy.wait(config.randomGlobalDelay);
    cy.visit("/inbox");

    cy.get("@accessToken").then(() => {
      cy.get("@priorityAccounts").then((priorityAccounts) => {
        cy.get("@remainingAccounts").then((remainingAccounts) => {
          // If baseUrl is `sap.satuinbox.com`, run priority accounts first
          if (Cypress.config("baseUrl") === "https://sap.satuinbox.com") {
            sendMessage(priorityAccounts, config.parentNumber);
          }

          // Run tests for remaining accounts
          sendMessage(remainingAccounts, config.parentNumber);

          const totalAccounts =
            priorityAccounts.length + remainingAccounts.length;

          cy.task("log", `Total WhatsApp numbers to process: ${totalAccounts}`);
          cy.task(
            "log",
            `Priority Accounts (${
              priorityAccounts.length
            }): ${priorityAccounts.join(", ")}`
          );
          cy.task(
            "log",
            `Remaining Accounts (${
              remainingAccounts.length
            }): ${remainingAccounts.join(", ")}`
          );

          const timestamp = new Date().toISOString();
          cy.task("log", `Test completed at: ${timestamp}`);
          cy.task(
            "log",
            `Test get delayed: ${config.randomGlobalDelay / 1000} s`
          );
          // cy.task("log", `error: ${errorMessage}`);
        });
      });
    });
  });

  //end it section
});
