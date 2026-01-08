describe('login dengan blank password', () => {
  it('passes ', () => {
    /* ==== Generated with Cypress Studio ==== */
    // cy.visit('https://dev.d2ea0lh0eyah3b.amplifyapp.com/login');
    cy.visit('http://34.101.99.66/login');
    cy.viewport(1920, 1080);
    cy.get('img').should('be.visible').click();
    cy.get('.text-2xl').should('be.visible').click();
    cy.get('.flex-col > :nth-child(1) > .font-medium').should('be.visible').click();
    cy.get('#email').should('be.visible').click();
    cy.get(':nth-child(2) > .font-medium').should('be.visible').click();
    cy.get('#password').should('be.visible').click();
    cy.get('#email').clear('dany.christian@orderfaz.com');
    cy.get('#email').type('dany.christian@orderfaz.com');
    cy.get('#password').clear('');
    // cy.get('#password').type('');
    cy.get('.bg-primary').click();
    cy.get('.text-red-500').should('be.visible');
    cy.get('.text-red-500').contains('Password must be at least 6 characters long');
    cy.screenshot('SS login dengan blank password');
    /* ==== End Cypress Studio ==== */
  })
})