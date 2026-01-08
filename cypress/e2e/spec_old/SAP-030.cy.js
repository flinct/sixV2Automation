import { elements } from 'C:/Users/flinc/OneDrive/Desktop/folderAutomation/automation2/cypress/support/selectors.js';
import {beforeEach} from 'C:/Users/flinc/OneDrive/Desktop/folderAutomation/automation2/cypress/support/beforeEachSetup.js';
import { timeout } from 'rxjs';

//for generating long text
const generateLongText = (length) => {
  const baseText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
  let longText = '';
  while (longText.length < length) {
    longText += baseText;
  }
  return longText.slice(0, length);
};


describe('buat template broadcast', () => {
  it('should create new template broadcast', () => {
    //tag : broadcast
    /* ==== Generated with Cypress Studio ==== */
    // DECLARING ELEMENT
    cy.visit('http://34.101.99.66/login');
    cy.viewport(1366, 768);
    cy.login('myUsername','myPassword');
    //nagivagasi ke riwayat broadcast
    beforeEach(()=>{
      beforeEachSetup();
    });
    cy.get('@broadcastNav').click();
    cy.get('@broadcastTemplateNav').click();
    // Memastikan bahwa pengguna berada di halaman Dashboard
    beforeEach(()=>{
      beforeEachSetup();
    });
    cy.url().should('include', '/broadcast/template');
    cy.get('img').should('be.visible');
    
    // Assertions untuk memastikan elemen terlihat dan memiliki teks yang benar
    cy.get('@buttonBuatTemplateBaruBroadcast').click();
    cy.get('.flex > .text-xl').contains('Template Baru');
    cy.get('#template-name').type('as');
    cy.get('#message').type('as');
    cy.contains('Simpan').click();
    // cy.wait(2000);
    // cy.screenshot('SS test personal inbox, spam long text');
  })
})