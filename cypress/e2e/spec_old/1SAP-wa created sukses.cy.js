// import { elements } from '/cypress/support/selectors.js';
import { beforeEach } from "/cypress/support/beforeEachSetup.js";
import { timeout } from "rxjs";
import userNumber from "../../support/userNumber";

describe("Main Element Test", () => {
  //Element testing Dashboard
  // before(() =>{
  //   cy.login_prod('myUsername','myPassword');
  // });

  const filteredData = userNumber.filter((number) => number.whatsapp !== "");
  filteredData.forEach((number) => {
    it("cek semua nomor yang telah didaftarkan", () => {
      cy.session("loginSession", () => {
        // Adjust cookie names to match your app
        cy.login_prod("myUsername", "myPassword").then(() => {
          // Cek apakah login berhasil
          cy.get_headerDashboard();
          cy.get("@headerDashboard");
          // cy.url().should('include', 'https://sap.satuinbox.com/dashboard'); // Ubah sesuai dengan URL setelah login
        });
      });
      cy.visit("https://sap.satuinbox.com/setting/account-whatsapp");

      cy.get_settingNav();
      cy.get_akunWhatsappNav();
      cy.get("@settingNav").click();
      cy.get("@akunWhatsappNav").click();
      cy.get(
        '[id^="radix-"] > div.my-4.flex.items-center.justify-between > div:nth-child(1) > div.relative.flex.items-center > input'
      ).type(number.whatsapp);
      cy.wait(1200);
      cy.get(
        '[id^="radix-"] > div.mt-5 > div.rounded-md.border > div > table > tbody > tr > td:nth-child(1)'
      ).contains(number.division);
      cy.screenshot("screenshot account created divisi :" + number.division);
      // cy.get('[id^="radix-"] > div.mt-5 > div.rounded-md.border > div > table > tbody > tr > td:nth-child(2)').contains(new RegExp(number.whatsapp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\\s?')));
      // cy.contains('button', 'Tambahkan Divisi').click(); //klik tambah divisi
      // // #radix-\:r6\:-content-divisi > div > div > div > div > div.mt-3.flex.flex-col.items-center.justify-center.space-y-3 > div > button
      // cy.get('#divisionName').clear();
      // cy.get('#divisionName').type(divisi.division);
      // cy.contains('Simpan').click();
      cy.wait(1000);
    });
  });
});
