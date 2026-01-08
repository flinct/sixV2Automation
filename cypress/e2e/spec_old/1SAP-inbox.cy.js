// import {beforeEach} from '/cypress/support/beforeEachSetup.js';
// import { timeout } from 'rxjs';
// import userNumber from '../support/userNumber.js';
import "cypress-real-events";
import loginPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
const baseUrl = Cypress.config("baseUrl");

describe("Main Element Test", () => {
  const loginAction = new loginPage();
  const inboxAction = new inboxPage();
  //Element testing Dashboard
  it("cek semua elemen di inbox", () => {
    loginAction.loginValidUsername();
    inboxAction.elementCheckingInbox();
  });
});
