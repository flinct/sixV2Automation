describe("Load tests (Node scripts)", () => {
  // NOTE:
  // - These tests run Node scripts via `cy.exec` so you can monitor output from Cypress.
  // - For real stress/parallel runs, prefer running the scripts directly in terminal/CI.

  it("widgetSocketLoad", () => {
    cy.exec("node scripts/widget-socket-load.js", {
      timeout: 1000 * 60 * 30, // 30 minutes
      failOnNonZeroExit: true,
    }).then((res) => {
      // surface output into the Cypress UI log (res.stdout already appears in the Command Log)
      cy.log(`exitCode: ${res.code}`);
    });
  });

  it("waQrHealth", () => {
    cy.exec("node scripts/wa-qr-health.js", {
      timeout: 1000 * 60 * 30,
      failOnNonZeroExit: true,
    }).then((res) => {
      cy.log(`exitCode: ${res.code}`);
    });
  });
});
