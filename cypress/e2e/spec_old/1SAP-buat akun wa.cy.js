// import { elements } from '/cypress/support/selectors.js';
import { beforeEach } from "/cypress/support/beforeEachSetup.js";
import { timeout } from "rxjs";
import userNumber from "../../support/userNumber.js";
import authPage from "../../support/pages/authPage.js";

describe("Main Element Test", () => {
  //Element testing Dashboard
  // before(() =>{
  //   cy.login_prod('myUsername','myPassword');
  // });

  userNumber.forEach((number, index) => {
    it("should get all element on Dashboard", () => {
      authPage.loginValidUsername();
      // beforeEach(()=>{
      //   beforeEachSetup();
      // });
      cy.get_settingNav();
      cy.get_akunWhatsappNav();
      cy.get("@settingNav").click();
      cy.get("@akunWhatsappNav").click();
      beforeEach(() => {
        beforeEachSetup();
      });
      cy.contains("Tambahkan Akun").click();
      cy.get("@textboxNameTambahAkun").type(number.name);
      // cy.get('input[name="profiles.0.name"]').type(number.name);
      cy.get("@textboxNomorHpTambahAkun").type(number.whatsapp);
      // cy.get('input[name="profiles.0.whatsapp"]').type(number.whatsapp);
      cy.get("@tabGunakanPosisiAkun").click();
      // cy.contains("Gunakan").click();
      // cy.contains('Select Divisi....').click();
      cy.get("@addComboboxPilihDivisi").click();
      cy.get("#search").type(number.division);
      // cy.contains("HUB "+number.division).click({force:true});
      cy.get(
        '[id^="radix-"] > div > div.custom-scrollbar.flex-1.overflow-y-auto.pt-2 > div'
      ).click();
      cy.get("@buttonSimpanAddAkunWhatsapp").should("be.visible");
      // .click();
      cy.screenshot("screenshot" + number.division);
      // cy.contains('button', 'Tambahkan Divisi').click(); //klik tambah divisi
      // // #radix-\:r6\:-content-divisi > div > div > div > div > div.mt-3.flex.flex-col.items-center.justify-center.space-y-3 > div > button
      // cy.get('#divisionName').clear();
      // cy.get('#divisionName').type(divisi.division);
      // cy.contains('Simpan').click();
      cy.wait(1000);
    });
  });
});
