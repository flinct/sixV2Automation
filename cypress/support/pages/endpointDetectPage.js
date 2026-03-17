// Endpoint detection helper (Page Object style)
//
// Captures XHR/fetch HTTP requests that match urlPattern.
// Does NOT capture WebSocket frames.
//
// Usage:
//   import endpointDetectPage from "../../support/pages/endpointDetectPage";
//   const endpointDetect = new endpointDetectPage();
//   endpointDetect.start({ name: 'your-inbox', urlPattern: '**/api/**' })
//   ...do actions...
//   endpointDetect.save('endpoint_detect')

class endpointDetectPage {
  nowIso() {
    return new Date().toISOString();
  }

  start(opts = {}) {
    const {
      name = "session",
      urlPattern = "**/api/**",
      methods = ["GET", "POST", "PUT", "PATCH", "DELETE"],
      maxEntries = 2000,
    } = opts;

    Cypress.env("endpointDetect:name", name);
    Cypress.env("endpointDetect:startedAt", this.nowIso());
    Cypress.env("endpointDetect:entries", []);
    Cypress.env("endpointDetect:maxEntries", maxEntries);

    methods.forEach((method) => {
      cy.intercept(method, urlPattern, (req) => {
        const startedAt = Date.now();
        req.on("response", (res) => {
          const entries = Cypress.env("endpointDetect:entries") || [];
          const limit = Cypress.env("endpointDetect:maxEntries") || maxEntries;
          if (entries.length >= limit) return;

          entries.push({
            ts: this.nowIso(),
            name,
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            durationMs: Date.now() - startedAt,
          });
          Cypress.env("endpointDetect:entries", entries);
        });
      }).as(`endpointDetect_${name}_${method}`);
    });
  }

  save(fileBaseName = "endpoints") {
    const name = Cypress.env("endpointDetect:name") || "session";
    const startedAt = Cypress.env("endpointDetect:startedAt") || this.nowIso();
    const entries = Cypress.env("endpointDetect:entries") || [];

    const payload = {
      name,
      startedAt,
      baseUrl: Cypress.config("baseUrl"),
      spec: Cypress.spec?.relative || Cypress.spec?.name,
      entries,
    };

    // ensureLogsDir task exists in cypress.config.js
    cy.task("ensureLogsDir");

    const safeTime = startedAt.replace(/[:.]/g, "-");
    const fileName = `cypress/logs/${fileBaseName}_${safeTime}.json`;

    cy.writeFile(fileName, payload, { log: false });
    cy.task("log", `✅ Endpoint detection saved: ${fileName} (count=${entries.length})`);
  }
}

export default endpointDetectPage;
