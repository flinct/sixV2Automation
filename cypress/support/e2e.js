// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-mochawesome-reporter/register";
import "cypress-file-upload";
const addContext = require("mochawesome/addContext");

// import 'cypress-real-events/support';

require("cypress-xpath");
// beforeEach(() => {
//     cy.clearCookies();        // Clears all cookies
//     cy.clearLocalStorage();   // Clears local storage
//     cy.window().then((win) => {
//       win.sessionStorage.clear();  // Clears session storage
//     });
//   });

Cypress.on("uncaught:exception", (err, runnable) => {
  // Prevent Cypress from failing the test on this specific error
  if (
    err.message.includes(
      "ResizeObserver loop completed with undelivered notifications",
    )
  ) {
    return false; // Returning false prevents Cypress from failing the test
  }
});

// afterEach(function () {
//   // Gunakan kondisi jika kamu hanya ingin screenshot pada kondisi tertentu, misalnya:
//   // if (this.currentTest.state === 'failed') {
//   //   cy.screenshot(`screenshot_${this.currentTest.title}`);
//   // }

//   // Untuk selalu mengambil screenshot setiap test:
//   const testName = this.currentTest
//     .fullTitle()
//     .replace(/[^a-z0-9]/gi, "_")
//     .toLowerCase();
//   cy.screenshot(`screenshot_${testName}`, { capture: "runner" });
// });

// afterEach(function () {
//   if (Cypress.env("CI")) {
//     const testName = this.currentTest
//       .fullTitle()
//       .replace(/[^a-z0-9]/gi, "_")
//       .toLowerCase();

//     const screenshotFolder =
//       Cypress.config("screenshotsFolder") || "cypress/screenshots";
//     // cy.screenshot(`${screenshotFolder}/custom_folder/screenshot_${testName}`, {
//     // capture: "runner",
//     cy.screenshot(`${screenshotFolder}/custom_folder/screenshot_${testName}`, {
//       capture: "runner",
//     });
//   }
// });

// afterEach(function () {
//   const testState = this.currentTest.state;
//   const testName = this.currentTest
//     .fullTitle()
//     .replace(/[^a-z0-9]/gi, "_")
//     .toLowerCase();

//   const screenshotFolder =
//     Cypress.config("screenshotsFolder") || "cypress/screenshots";

//   // Screenshot path per status: passed / failed
//   const screenshotPath = `screenshot_${testName}`;

//   // Ambil screenshot untuk semua test (tidak hanya di CI)
//   cy.screenshot(screenshotPath, {
//     capture: "runner", // bisa diganti "viewport" atau "fullPage"
//   });
// });

// afterEach(function () {
//   const testName = this.currentTest
//     .fullTitle()
//     .replace(/[^a-z0-9]/gi, "_")
//     .toLowerCase();

//   const specName = Cypress.spec.name; // Nama file spec seperti 2_Regres_inboxAction.cy.js
//   const screenshotFileName = `screenshot_${testName}`;

//   // Path dengan folder spec
//   const relativePath = `../../screenshots/${specName}/${screenshotFileName}`;

//   // Ambil screenshot
//   cy.screenshot(screenshotFileName, { capture: "runner" });

//   // Inject ke mochawesome
//   cy.once("test:after:run", () => {
//     addContext({ test: this }, relativePath);
//   });
// });

// Alternatively you can use CommonJS syntax:
// require('./commands')
