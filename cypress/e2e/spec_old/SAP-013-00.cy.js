describe('test lupa password link (invalid email)', () => {
  it('passes', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://34.101.99.66/login');

    // declare element name
    cy.get('img').as('Logo');
    cy.get('.text-2xl').as('loginHeader');
    cy.get('.flex-col > :nth-child(1) > .font-medium').as('TXTemail');
    cy.get('#email').as('TXTboxEmail');
    cy.get(':nth-child(2) > .font-medium').as('TXTpass');
    cy.get('#password').as('TXTboxPass');
    cy.get('a > .inline-flex').as('forgotPassLink');
    cy.get('.bg-primary').as('buttonLogin');
    cy.get('.text-2xl').as('LupaPassHeader');
    cy.get('.grid > .font-medium').as('TXTemail_onForgotPass');
    cy.get('.flex-col > .inline-flex').as('buttonKirimLinkReset');
    cy.get('a > .inline-flex').as('buttonBackToLogin');
    
    //action
    cy.get('@Logo').should('be.visible').click();
    cy.get('@loginHeader').should('be.visible').click();
    cy.get('@TXTemail').should('be.visible').click();
    cy.get('@TXTboxEmail').should('be.visible').click();
    cy.get('@TXTpass').should('be.visible').click();
    cy.get('@TXTboxPass').should('be.visible').click();
    cy.get('@buttonLogin').should('be.visible');
    cy.get('@forgotPassLink').click();
    cy.get('@buttonBackToLogin').should('be.visible').contains('Kembali ke halaman login');
    cy.get('@LupaPassHeader').should('be.visible').contains('Lupa Password').click();
    cy.get('@TXTemail_onForgotPass').should('be.visible');
    cy.get('@buttonKirimLinkReset').should('be.visible');
    cy.get('@TXTboxEmail').clear('');
    cy.get('@TXTboxEmail').type('asdasdasd');
    cy.get('@buttonKirimLinkReset').should('be.visible').click();

    //failed result
    //take screenshoot
    cy.screenshot('SS test lupa password link (invalid email)')
    
    // cy.get('.mt-2 > .flex > .text-sm').as('failedAlert');
    // cy.get('@failedAlert').should('be.visible').contains('No users found with this email');

    // cy.get('.text-xl').as('suksesHeader');
    // cy.get('@suksesHeader').should('be.visible').contains('Link Berhasil Dikirim');
    // cy.get('.flex > .inline-flex').as('retryLink');
    // cy.get('.flex > .inline-flex').should('be.visible').contains('Kirim ulang');
    // cy.get('a > .inline-flex').as('buttonToLogin');
    // cy.get('@buttonToLogin').should('be.visible').contains('Buka Halaman Login');
    // cy.screenshot('SS_tes lupa password link_sukses');
  })
})