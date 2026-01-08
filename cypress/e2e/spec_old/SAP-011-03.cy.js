describe('login dengan email/password yang tidak terdaftar', () => {
  it('passes', () => {
    /* ==== Generated with Cypress Studio ==== */
    // cy.visit('https://dev.d2ea0lh0eyah3b.amplifyapp.com/login');
    cy.visit('https://dev.satuinbox.com/login');
    cy.viewport(1366, 768);
    cy.get('img').should('be.visible').click();
    cy.get('.text-2xl').should('be.visible').click();
    cy.get('.flex-col > :nth-child(1) > .font-medium').should('be.visible').click();
    cy.get('#email').should('be.visible').click();
    cy.get(':nth-child(2) > .font-medium').should('be.visible').click();
    cy.get('#password').should('be.visible').click();
    cy.get('#email').clear('');
    cy.get('#email').type('adasdsasds@gmail.com');
    cy.get('#password').clear('asd12345');
    cy.get('#password').type('asd12345');
    cy.get('.bg-primary').click();
    cy.get('.text-sm').should('be.visible');
    // cy.get('.text-red-500').contains('Email is required');
    cy.get('.text-sm').contains('Akun tidak ditemukan, periksa kembali email dan password anda!');
    cy.screenshot('SS login dengan email/password yang tidak terdaftar')
    /* ==== End Cypress Studio ==== */
  })
})