describe("Oddo testing", () => {
  it("testing login oddo", () => {
    // cy.visit("https://test.kokamail.com/web/login");

    cy.visit("https://test.kokamail.com/web/login?db=RJU_LIVE");

    // cy.url().should("include", "/web/database/selector");

    // cy.intercept("GET", "/web?db=RJU_LIVE").as("selectDB");
    // cy.get('a[href="/web?db=RJU_LIVE"]').click();
    // cy.wait("@selectDB").then((intercept) => {
    //   cy.log("Status:", intercept.response.statusCode);
    //   cy.log("Redirect to:", intercept.response.headers.location);
    // });

    cy.url().should("include", "/web/login");

    cy.get('input[name="login"]').type("4dm1n");
    cy.get('input[name="password"]').type("apaya");
    cy.get("button.btn.btn-primary").click();

    loginAction.login();
  });
});
