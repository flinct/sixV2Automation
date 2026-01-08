import { elements } from 'C:/Users/flinc/OneDrive/Desktop/folderAutomation/automation2/cypress/support/selectors.js';
import {beforeEach} from 'C:/Users/flinc/OneDrive/Desktop/folderAutomation/automation2/cypress/support/beforeEachSetup.js';

describe('test personal inbox, send text', () => {
  before(() =>{
    cy.visit('http://34.101.99.66/login');
    cy.viewport(1366, 768);
    cy.login('myUsername','myPassword');
    //nagivagasi ke inbox
  });
  
  it('test personal inbox', () => {
    /* ==== Generated with Cypress Studio ==== */
    // Memastikan bahwa pengguna berada di halaman Dashboard
    beforeEach(()=>{
      beforeEachSetup();
    });
    cy.get('@inboxNav').click();
    cy.url().should('include', '/inbox');
    cy.get('img').should('be.visible');
    beforeEach(()=>{
      beforeEachSetup();
    });
    // cy.get('').as('UserList'); blm ada data cy
    //input text pada InputMsgBox buat munculin button send
    // cy.get('.min-h-10').as('InputMsgBox');
    // cy.get('@inputMsgBox').click().type('a');//trigger untuk buttonSend showed
    // cy.get('form.flex > .inline-flex').as('buttonSend').click(); //harus di get terpisah
    // cy.get('').as('Divisi'); gabs get element blm ada data cy
       
    // Assertions untuk memastikan elemen terlihat dan memiliki teks yang benar
    // cy.get('@HeaderInbox').should('be.visible').contains('Inbox'); //gabs get element blm ada data cy
    cy.get('@buttonHandover').should('be.visible').contains('Handover');
    cy.get('@buttonAssign').should('be.visible').contains('Resolved');
    cy.get('@filterSearchByTitle').should('be.visible');
    cy.get('@labelStatus').should('be.visible');
    cy.get('@unassignedTab').should('be.visible');
    cy.get('@ongoingTab').should('be.visible');
    cy.get('@resolvedTab').should('be.visible');
    // cy.get('@UserList').should('be.visible');  //gabs get element blm ada data cy
    cy.get('@historyMsgContainer').should('be.visible');
    cy.get('@buttonAttch').should('be.visible');
    cy.get('@chatDetailTab').should('be.visible').click();
    cy.get('@propsTab').should('be.visible').click();
    cy.get('@chatDetailTab').should('be.visible').click();
    // cy.get('@Divisi').should('be.visible'); //gabs get element blm ada data cy
    cy.get('@agentLabelProp').should('be.visible');
    cy.get('@labelTag').should('be.visible');
    cy.get('@tglCaseDibuat').should('be.visible');
    cy.get('@tglCaseStart').should('be.visible');
    cy.get('@tglCaseSolved').should('be.visible');
    cy.get('@commentSection').should('be.visible');
    cy.get('@roomHistoryTab').scrollIntoView().should('be.visible');
    
    //ACTION send message in inbox
    cy.get('@inputMsgBox').click();
    cy.get('@inputMsgBox').type('racun kuda liar');
    cy.get('@buttonSend').click();
    // cy.get(':nth-child(3) > span[data-state="closed"] > :nth-child(1) > .group > .w-fit').as('senderText');
    // cy.get('senderText').should('be.visible');
    /* ==== End Cypress Studio ==== */
    cy.wait(2000);
    cy.screenshot('test personal inbox, send text');
  })
})