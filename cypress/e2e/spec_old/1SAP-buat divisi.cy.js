// import { elements } from '/cypress/support/selectors.js';
import { beforeEach } from "/cypress/support/beforeEachSetup.js";
import { timeout } from "rxjs";
import userDivisi from "../../support/userData";

describe("Main Element Test", () => {
  //Element testing Dashboard
  // before(() =>{
  //   cy.login_prod('myUsername','myPassword');
  // });

  userDivisi.forEach((divisi, index) => {
    it("should get all element on Dashboard", () => {
      cy.login_dev_by_username("myUsername", "myPassword");
      beforeEach(() => {
        beforeEachSetup();
      });
      cy.get("@settingNav").click();
      cy.get("@kelolaGrupNav").click();
      cy.contains("button", "Tambahkan Divisi").click(); //klik tambah divisi
      // #radix-\:r6\:-content-divisi > div > div > div > div > div.mt-3.flex.flex-col.items-center.justify-center.space-y-3 > div > button
      cy.get("#divisionName").clear();
      cy.get("#divisionName").type(divisi.division);
      cy.contains("Simpan").click();
      cy.wait(1000);
    });
  });
});
