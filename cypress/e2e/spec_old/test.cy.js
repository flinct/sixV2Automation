import { elements } from '/cypress/support/selectors.js';

describe('Main Element Test', ()=>{
    //Element testing Dashboard
    it('cek semua elemen di login page', () => {
      /* ==== Generated with Cypress Studio ==== */
    //   cy.setCookie('cf_clearance', 'valid_clearance_cookie_value');
    // cy.request({
    //     method: 'POST',
    //     url: 'http://34.101.99.66/api/v1/auth/login', // Change this to your login API
    //     body: {
    //         "keyword": "goddummy",
    //         "password": "asdqwe12"
    //     }
    //   }).then((resp) => {
    //     // Assuming the server sends back a token or session info
    //     const accessToken = resp.body.tokens.access.token;
    //     // Set cookie or token here if necessary
    //     // cy.setCookie('authToken', token);
    //     if (accessToken && typeof accessToken === 'string') {
    //         cy.setCookie('authToken', accessToken); // 'authToken' is the cookie name, replace with actual name if different
    //       } else {
    //         throw new Error('Token is missing or invalid');
    //       }
    //   });
    cy.intercept('POST', '/captcha-endpoint', { body: { success: true } }).as('captchaCheck');
    cy.visit('https://dev.satuinbox.com/login'  ).wait(5000);

    //   cy.visit('http://34.101.99.66');
    cy.viewport(1366, 768);
    cy.get('#keyword').type('goddummy');
    cy.get('#password').type('asdqwe12');
    cy.get('.bg-primary').click();
      // if (baseUrl === "https://sap.satuinbox.com") {
      //   cy.login_prod_by_username('myUsername','myPassword');      
      // } else if (baseUrl === "https://dev.satuinbox.com") {
      //   cy.login_dev_by_username('myUsername','myPassword');
      // }
      cy.get_labelHeadPageOnDashboard();
      cy.get('@labelHeadPageOnDashboard').contains('Dashboard');
      cy.visit('/inbox', { failOnStatusCode: false });
      // cy.get('#radix-\:R2bbqtt6la\:-trigger-ongoing > div:nth-child(1) > p');
      cy.contains('Ongoing').should('be.visible').click();
      // beforeEach(()=>{
      //   beforeEachSetup();
      // });
      /* ==== End Cypress Studio ==== */
    })  
  })