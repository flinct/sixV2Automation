// import { elements } from '/cypress/support/selectors.js';
import {beforeEach} from '/cypress/support/beforeEachSetup.js';
import { timeout } from 'rxjs';
import userNumber from '../../support/userNumber';

describe('Main Element Test', ()=>{
  //Element testing Dashboard
  // before(() =>{
  //   cy.login_prod('myUsername','myPassword');
  // });

  userNumber.forEach((number, index) =>{
    it('should get all element on Dashboard', () => {
      cy.login_prod('myUsername','myPassword');
      beforeEach(()=>{
        beforeEachSetup();
      });
      cy.get('@settingNav').click();
      cy.get('@kelolaGrupNav').click();
      cy.get('[id^="radix-"] > div.my-5.flex.items-center.justify-between > div.flex.items-center.gap-3 > div > input').type(number.division);
      cy.wait(1200);
      cy.get('[id^="radix-"] > div.mt-5 > div.rounded-md.border > div > table > tbody > tr > td:nth-child(1)').contains("HUB "+number.division);
      // cy.contains('button', 'Tambahkan Divisi').click(); //klik tambah divisi
      // // #radix-\:r6\:-content-divisi > div > div > div > div > div.mt-3.flex.flex-col.items-center.justify-center.space-y-3 > div > button
      // cy.get('#divisionName').clear();
      // cy.get('#divisionName').type(divisi.division);
      // cy.contains('Simpan').click();
      cy.wait(1000);
    });
  });  
})