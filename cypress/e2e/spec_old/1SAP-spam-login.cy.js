import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
const baseUrl = Cypress.config("baseUrl");
import userDataSpam from "../../support/data/spamLogin.js";

describe("Spam login dan send message", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage();

  beforeEach(() => {
    // Clear cookies, local storage, and session storage to simulate clearing cache
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.intercept("*").as("allRequests"); // Catch all API calls
  });

  userDataSpam.forEach((user) => {
    it("testing spam login, send message", () => {
      // authAction.spamLogin(user);
      authAction.loginValidUsername();
      // cy.headLabelInbox().should('be.visible').contains('Inbox');
      cy.userLoginNameLabel().should("be.visible");
      cy.wait("@allRequests").then((interception) => {
        cy.log("Intercepted request: ", interception);
        cy.log("Response Body: ", interception.response.body);
      });
      // Verify the visibility of an element on the dashboard
      cy.headLabelPageOnDashboard().should("be.visible");
      inboxAction.navigateToInbox();
      inboxAction.navigateToInbox_Ongoing();
      cy.contains("+62 896 5505 7778").click(); //click to chatbox destination
      inboxAction.sendMessageOngoing();
      inboxAction.sendImgOngoin();
      cy.wait(500);
      authAction.doLogout();
    });
  });
});
