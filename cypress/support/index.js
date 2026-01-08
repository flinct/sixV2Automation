import './commands';

Cypress.on('fail', (error, runnable) => {
    // Take a screenshot with a name based on the test title
    cy.screenshot(`${runnable.title} (failed)`)
    throw error // Rethrow the error to let Cypress handle it
  })