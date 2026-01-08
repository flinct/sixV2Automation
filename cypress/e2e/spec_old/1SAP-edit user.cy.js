import { beforeEach } from "/cypress/support/beforeEachSetup.js";
import { timeout } from "rxjs";
import userNumber from "../../support/userNumber.js";
import "cypress-real-events";
const baseUrl = Cypress.config("baseUrl");

describe("Main Element Test", () => {
  //Element testing Dashboard
  before(() => {});

  const filteredData = userNumber.filter((number) => number.whatsapp !== "");
  filteredData.forEach((number) => {
    it("should get all element on Dashboard", () => {
      cy.session("loginSession", () => {
        // Adjust cookie names to match your app
        if (baseUrl === "https://sap.satuinbox.com") {
          cy.login_prod_by_username("myUsername", "myPassword");
        } else if (baseUrl === "https://dev.satuinbox.com") {
          cy.login_dev_by_username("myUsername", "myPassword");
        }
        // Cek apakah login berhasil
        cy.get_headerDashboard();
        cy.get("@headerDashboard");
      });
      // cy.visit('/setting/account-whatsapp');
      cy.visit("/setting/manage-team");
      cy.searchOnHalamanKelolaTim().type(number.userName);
      // cy.get('@comboboxPilihDivisiOnHalamanKelolaTim').click();
      cy.wait(1000);
      // cy.contains(number.userName).should('be.visible');
      cy.contains(number.userName).should("be.visible");
      cy.editButtonOnHalamanKelolaTim().click();
      cy.roleOnEditUserLogin().click();
      cy.get('[data-cy = "role-agent"]').click();
      cy.emailOnAddUserLogin().clear().type(number.userEmail);
      cy.contains("Simpan").click();
      cy.wait(500);
    });
  });
});
