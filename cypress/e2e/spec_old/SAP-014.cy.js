describe('test lupa password link, blank textbox email', () => {
  it('reset password', () => {
    /* ==== Generated with Cypress Studio ==== */
    // cy.visit('https://dev.d2ea0lh0eyah3b.amplifyapp.com/login');
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
    // cy.get('#email').type('dany.christian@g');
    cy.get('@buttonKirimLinkReset').click();
    cy.wait(3000);
    //failed result
    cy.get('.text-red-500').as('alertMsg')
    cy.get('@alertMsg').should('be.visible').contains('Email is required');
    cy.screenshot('SS test lupa password link, blank textbox email')
    // cy.get('.text-xl').should('be.visible').contains('Link Berhasil Dikirim');
    // cy.get('.flex > .inline-flex').should('be.visible').contains('Kirim ulang');
    // cy.get('a > .inline-flex').should('be.visible').contains('Buka Halaman Login');
    // cy.get('a > .inline-flex').click();
    /* ==== End Cypress Studio ==== */
  })
})