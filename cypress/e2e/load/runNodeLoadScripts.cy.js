describe("Load tests (Node scripts)", () => {
  // NOTE
  // - These tests run Node scripts via `cy.exec` so you can monitor output from Cypress.
  // - We forward env vars from Cypress -> Node so you can keep using your existing
  //   `CYPRESS_baseUrl` / `CYPRESS_loginType` launch flow.

  function commonNodeEnv() {
    return {
      // Reuse Cypress baseUrl that you set via $env:CYPRESS_baseUrl
      BASE_URL: Cypress.config("baseUrl"),

      // Prefer `CYPRESS_*` vars (set via CLI) so they show up in Cypress.env()
      SIGNATURE_KEY: Cypress.env("SIGNATURE_KEY"),
      X_API_KEY: Cypress.env("X_API_KEY"),
      WIDGET_CHANNEL_ID: Cypress.env("WIDGET_CHANNEL_ID"),

      // Tuning
      AGENTS: Cypress.env("AGENTS"),
      CHURN_AGENTS: Cypress.env("CHURN_AGENTS"),
      MESSAGES_PER_AGENT: Cypress.env("MESSAGES_PER_AGENT"),
      CYCLES: Cypress.env("CYCLES"),

      // WhatsApp QR
      ITERATIONS: Cypress.env("ITERATIONS"),
      POLL_TIMEOUT_MS: Cypress.env("POLL_TIMEOUT_MS"),
      POLL_INTERVAL_MS: Cypress.env("POLL_INTERVAL_MS"),
      INIT_PATH: Cypress.env("INIT_PATH"),
      GET_QR_PATH: Cypress.env("GET_QR_PATH"),
      QR_FIELD: Cypress.env("QR_FIELD"),
      REQUIRE_DATA_IMAGE_PREFIX: Cypress.env("REQUIRE_DATA_IMAGE_PREFIX"),
      NUMBERS: Cypress.env("NUMBERS"),
    };
  }

  it("widgetSocketLoad", () => {
    cy.exec("node scripts/widget-socket-load.js", {
      timeout: 1000 * 60 * 30, // 30 minutes
      failOnNonZeroExit: true,
      env: commonNodeEnv(),
    }).then((res) => {
      cy.log(`exitCode: ${res.code}`);
    });
  });

  it("waQrHealth", () => {
    cy.exec("node scripts/wa-qr-health.js", {
      timeout: 1000 * 60 * 30,
      failOnNonZeroExit: true,
      env: commonNodeEnv(),
    }).then((res) => {
      cy.log(`exitCode: ${res.code}`);
    });
  });
});
