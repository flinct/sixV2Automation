// import { elements } from 'C:/Users/flinc/OneDrive/Desktop/folderAutomation/automation2/cypress/support/selectors.js';
import {beforeEach} from '/cypress/support/beforeEachSetup.js';
import { timeout } from 'rxjs';
import { generateRandomName, generateRandomNamesArray, generateRandomPhoneNumber } from '/cypress/support/nameAndPhone';
import userData from '../../support/userData';

//for generating long text
// const generateLongText = (length) => {
//   const baseText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
//   let longText = '';
//   while (longText.length < length) {
//     longText += baseText;
//   }
//   return longText.slice(0, length);
// };


describe('create-akun whatsapp', () => {
  // before(() =>{
  // });
  userData.forEach((user, index) =>{
    it('should creating-akun whatsapp', () => {
      cy.login_as_pointbreak('myUsername','myPassword');
      beforeEach(()=>{
        beforeEachSetup();
      });
      cy.get('@settingNav').click();
      cy.get('@akunWhatsappNav').click();
      // Memastikan bahwa pengguna berada di halaman setting-akun whatsapp
      cy.wait(2000);
      //nagivagasi ke riwayat broadcast
      beforeEach(()=>{
        beforeEachSetup();
      });
      cy.url().should('include', '/setting/account-whatsapp');
      cy.get('img').should('be.visible');
      
      // create akun whatsaap
      cy.get('body > main > main > aside > nav > div.mx-2.rounded-lg.py-1.bg-blue-50 > div.flex.flex-col.gap-1.overflow-hidden.px-2.font-semibold.transition-all.duration-500.mb-1.max-h-60 > a:nth-child(2) > span').contains('Kelola Group').click();
      // cy.get('[id^="radix-"] > div.my-5.flex.items-center.justify-between > div.space-x-3 > button').contains('Tambahkan Divisi').click();
      
      //kelola tim
      // cy.get('body > main > main > aside > nav > div.mx-2.rounded-lg.py-1.bg-blue-50 > div.flex.flex-col.gap-1.overflow-hidden.px-2.font-semibold.transition-all.duration-500.mb-1.max-h-60 > a:nth-child(3) > span').contains('Kelola Tim').click();
      // cy.get('body > main > main > section > div.custom-scrollbar.flex-1.overflow-y-auto > div > div.p-8.pt-0.-mt-3 > div.flex.items-center.justify-between > div.space-x-3 > button').contains('Tambahkan Anggota').click();
      //
      cy.get('@akunWhatsappNav').click();
      cy.get('@buttonTambahAkunWhatsapp').click();
      cy.get('@textboxNameTambahAkun').type(user.name);
      cy.get('@textboxNomorHpTambahAkun').type(user.whatsapp); 
      cy.contains('Cadangan').scrollIntoView();  
      cy.contains('Gunakan').scrollIntoView().click();
      // cy.contains('Select Divisi').scrollIntoView().click();
      // cy.get(".flex-1 .overflow-y-auto").should("be.visible");
      // cy.get('p[class="font-semibold"]').contains('Ringkasan Akun');
      // cy.contains('Your Name Here');
      // cy.contains('Tambahkan Nomor');
      cy.screenshot('get elemen in setting akun whatsapp');
      // cy.get('@buttonBatal').click();
      // cy.wait(5       000);
    });
  });
})