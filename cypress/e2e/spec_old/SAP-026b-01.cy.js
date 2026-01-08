import { elements } from 'C:/Users/flinc/OneDrive/Desktop/folderAutomation/automation2/cypress/support/selectors.js';

//for generating long text
const generateLongText = (length) => {
  const baseText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
  let longText = '';
  while (longText.length < length) {
    longText += baseText;
  }
  return longText.slice(0, length);
};


describe('test personal inbox, spam long text', () => {
  before(() =>{
    cy.visit('http://34.101.99.66/login');
    cy.viewport(1366, 768);
    cy.get('img').should('be.visible').click();
    cy.get('.text-2xl').should('be.visible').click();
    cy.get('.flex-col > :nth-child(1) > .font-medium').should('be.visible').click();
    cy.get('#email').should('be.visible').click();
    cy.get(':nth-child(2) > .font-medium').should('be.visible').click();
    cy.get('#password').should('be.visible').click();
    cy.login('myUsername','myPassword');
    //nagivagasi ke inbox
    cy.get('nav > :nth-child(2) > .flex').click();
  });

  beforeEach(() => {
    cy.get_dashboardNav();
    cy.get_inboxNav();
    cy.get_broadcastNav();
    cy.get_contactNav();
    cy.get_settingNav();
    cy.get_userName();
    cy.get_buttonHandover();
    cy.get_buttonAssign();
    cy.get_labelStatus();
    cy.get_ongoingTab();
    cy.get_resolvedTab();
    cy.get_unassignedTab();
    cy.get_historyMsgContainer();
    cy.get_buttonAttch();
    cy.get_searchBox();
    cy.get_chatDetailTab();
    cy.get_propsTab();
    cy.get_agentLabelProp();
    cy.get_labelTag();
    cy.get_tglCaseDibuat();
    cy.get_tglCaseStart();
    cy.get_tglCaseSolved();
    cy.get_commentSection();
    cy.get_roomHistoryTab();
    cy.get_inputMsgBox();
  });

  it('test personal inbox', () => {
    /* ==== Generated with Cypress Studio ==== */
    // Memastikan bahwa pengguna berada di halaman Dashboard
    cy.url().should('include', '/inbox');
    cy.get('img').should('be.visible');
    
    // cy.get('').as('UserList'); blm ada data cy

    //input text pada InputMsgBox buat munculin button send
    // cy.get('.min-h-10').as('InputMsgBox');
    cy.get('@inputMsgBox').click().type('a');//trigger untuk buttonSend showed
    cy.get('form.flex > .inline-flex').as('buttonSend').click(); //harus di get terpisah
    // cy.get('').as('Divisi'); gabs get element blm ada data cy
    
    
    
    // Assertions untuk memastikan elemen terlihat dan memiliki teks yang benar
    cy.get('@dashboardNav').should('be.visible').contains('Dashboard');
    cy.get('@inboxNav').should('be.visible').contains('Inbox');
    cy.get('@broadcastNav').should('be.visible').contains('Broadcast');
    cy.get('@contactNav').should('be.visible').contains('Contact');
    cy.get('@settingNav').should('be.visible').contains('Pengaturan');
    // cy.get('@HeaderInbox').should('be.visible').contains('Inbox'); //gabs get element blm ada data cy
    cy.get('@buttonHandover').should('be.visible').contains('Handover');
    cy.get('@buttonAssign').should('be.visible').contains('Resolved');
    cy.get('@searchBox').should('be.visible');
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
    
    //ACTION send long text
    const longText = generateLongText(20000);
    cy.get('@inputMsgBox').click();
    cy.get('@inputMsgBox').type(longText,{delay: 1});
    cy.get('@buttonSend').click();
    // cy.get(':nth-child(3) > span[data-state="closed"] > :nth-child(1) > .group > .w-fit').as('senderText');
    // cy.get('senderText').should('be.visible');
    /* ==== End Cypress Studio ==== */
    cy.wait(2000);
    cy.screenshot('SS test personal inbox, spam long text');
  })
})