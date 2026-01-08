describe('login invalid email format (not complete)', () => {
  it('passes ', () => {
    /* ==== Generated with Cypress Studio ==== */
    // cy.visit('https://dev.d2ea0lh0eyah3b.amplifyapp.com/login');
    cy.visit('http://34.101.99.66/login');
    // cy.visit('http://172.66.40.100:443/login');
    cy.viewport(1920, 1080);
    cy.get('img').should('be.visible').click();
    cy.get('.text-2xl').should('be.visible').click();
    cy.get('.flex-col > :nth-child(1) > .font-medium').should('be.visible').click();
    // cy.get('#email').should('be.visible').click();
    cy.get(':nth-child(2) > .font-medium').should('be.visible').click();
    cy.get('#password').should('be.visible').click();
    // cy.get('#email').clear('');
    cy.get('#keyword').type('adasdsasds@gmail');
    cy.get('#password').clear('');
    cy.get('#password').type('123123qw');
    cy.get('.bg-primary').click();
    cy.get('.text-red-500').should('be.visible');
    // cy.get('.text-red-500').contains('Email is required');
    cy.get('.text-red-500').contains('Invalid email address');
    cy.screenshot('SS login invalid email format (not complete)')
    /* ==== End Cypress Studio ==== */
  })
})