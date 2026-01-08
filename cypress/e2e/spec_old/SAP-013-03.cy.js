

describe('test lupa password link, email yang tidak terdaftar', () => {
  it('reset password', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://34.101.99.66/login');
    cy.viewport(1366, 768);
    //declare element name
    cy.get('img').as('Logo');
    cy.get('.text-2xl').as('loginHeader');
    cy.get('.flex-col > :nth-child(1) > .font-medium').as('TXTemail');
    cy.get('#email').as('TXTboxEmail');
    cy.get(':nth-child(2) > .font-medium').as('TXTpass');
    cy.get('#password').as('TXTboxPass');
    cy.get('a > .inline-flex').as('buttonBackToLogin');
    cy.get('.text-2xl').as('LupaPassHeader');
    cy.get('.grid > .font-medium').as('TXTemail_onForgotPass');
    cy.get('.flex-col > .inline-flex').as('buttonKirimLinkReset');
    //action for element name
    cy.get('@Logo').should('be.visible');
    cy.get('@loginHeader').should('be.visible');
    cy.get('@TXTemail').should('be.visible').click();
    cy.get('@TXTboxEmail').should('be.visible').click();
    cy.get('@TXTpass').should('be.visible').click();
    cy.get('@TXTboxPass').should('be.visible').click();
    cy.get('.inline-flex').should('be.visible').contains('Lupa Password').click();
    cy.get('@buttonBackToLogin').should('be.visible').contains('Kembali ke halaman login');
    cy.get('@LupaPassHeader').should('be.visible');
    cy.get('@TXTemail_onForgotPass').should('be.visible');
    cy.get('@buttonKirimLinkReset').should('be.visible');
    cy.get('#email').clear('');
    cy.get('#email').type('asdasd@g.com');
    
    cy.get('@buttonKirimLinkReset').should('be.visible').click();
    // cy.on('uncaught:exception', (err, runnable) => {
    //   if (err.message.includes('No users found with this email')) {
    //     // This error is expected, prevent Cypress from failing the test
    //     return false
    //   }
    //   // Let Cypress handle the error
    //   throw err
    // });
    Cypress.on('uncaught:exception', (err, runnable) => {
      // we expect a 3rd party library error with message 'list not defined'
      // and don't want to fail the test so we return false
      if (err.message.includes('No users found with this email')) {
        return false
      }
      // we still want to ensure there are no other unexpected
      // errors, so we let them fail the test
    })
    cy.screenshot('SS test lupa password link, email yang tidak terdaftar');

  
  })
})