import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
const baseUrl = Cypress.config("baseUrl");
import userDataSpam from "../../support/data/spamLogin.js";
// import customerData from '../support/userNumber.js';
import getCustomerData from "../../support/getDataApi.js";
// import { element } from 'prop-types';
// import { array } from 'yargs';

describe("Send Random message to all number whatsapp that active", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage();

  // let accountNumbers = [];

  // before(() => {
  //   // Set default stdout columns if undefined
  //   getCustomerData().then((numbers) => {
  //     accountNumbers = numbers;
  //     cy.log('Fetched account numbers : ', JSON.stringify(accountNumbers));
  //   })
  // });

  beforeEach(() => {
    // Clear cookies, local storage, and session storage to simulate clearing cache
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    // cy.intercept('*').as('allRequests'); // Catch all API calls
  });

  // getCustomerData().then ((accountNumbers) => {
  // accountNumbers.forEach((accountNumbers) =>{
  it("send random quotes to actived and used number", () => {
    // cy.session('loginSession',() =>{
    authAction.loginValidUsername();
    cy.headLabelPageOnDashboard().should("be.visible");
    cy.userLoginNameLabel().should("be.visible");
    // go to inbox
    inboxAction.navigateToInbox();
    cy.headLabelInbox().should("be.visible").contains("Inbox");
    // })
    // inboxAction.navigateToInbox_Ongoing();
    getCustomerData().then((accountNumbers) => {
      cy.log("Filtered account numbers: ", JSON.stringify(accountNumbers));
      //   accountNumbers.forEach((number) =>{
      //     cy.searchBoxOnInbox().type(number);
      //     function formatPhoneNumber(phoneNumber) {
      //       const str = phoneNumber.toString();
      //       return `${str.slice(0,2)} ${str.slice(2,5)} ${str.slice(5,9)} ${str.slice(9)}`
      //     }
      //     const formattedNumber = formatPhoneNumber(number);
      //     cy.log(formattedNumber);

      // cy.get('body').then(($body) => {
      // cy.xpath('/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]').then(($body) => {
      //   if ($body.find(':contains("formattedNumber")').length) {
      //     cy.contains(formattedNumber).click();
      //     inboxAction.sendRandomQuotesMessage();
      //   } else {
      //     inboxAction.navigateToInbox_unassigned();
      //     // cy.searchBoxOnInbox().type(number);
      //     cy.contains(formattedNumber).click();
      //     inboxAction.sendRandomQuotesMessage();
      //   }
      // })
      cy.wait(1000);
      // })
      // });
      // });
    });
  });
});
