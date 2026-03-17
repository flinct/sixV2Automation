import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import endpointDetectPage from "../../support/pages/endpointDetectPage.js";

describe("endpoint detection - conversation/your-inbox", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage();
  const endpointDetect = new endpointDetectPage();

  beforeEach(() => {
    cy.session("loginSession", () => {
      authAction.loginValidUsername();
      cy.wait(2000);
    });
  });

  it("captures endpoints used on /conversation/your-inbox", () => {
    endpointDetect.start({
      name: "conversation-your-inbox",
      urlPattern: "**/api/**",
    });

    inboxAction.accessYourInbox();

    // Give the page time to finish initial fetches
    cy.wait(5000);

    endpointDetect.save("endpoint_detect");
  });
});
