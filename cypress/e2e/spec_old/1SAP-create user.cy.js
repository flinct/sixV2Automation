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
      cy.wait(500);
      cy.buttonAddUserLogin().click();
      cy.nameOnAddUserLogin().type(number.userName);
      cy.usernameOnAddUserLogin().click();
      cy.emailOnAddUserLogin().type(number.userEmail);
      cy.passwordOnAddUserLogin().type("password1");
      cy.roleOnAddUserLogin().click();
      // cy.get('[data-cy = "role-agent"]').click();
      cy.get('[data-cy = "role-admin"]').click();
      cy.comboboxPilihDivisiOnAddUserLogin().click();
      cy.get("#search").type(number.division);
      cy.get("#container > div > div > div").contains(number.division).click();
      cy.get("#isActive").click();
      cy.contains("Simpan").click();
      // cy.contains('Batal').click();
      cy.wait(5000);
      cy.searchOnHalamanKelolaTim().type(number.division);
      // cy.get('@comboboxPilihDivisiOnHalamanKelolaTim').click();
      cy.wait(1000);
      // cy.contains(number.userName).should('be.visible');
      cy.contains(number.userEmail).should("be.visible");
      // cy.screenshot('user login '+number.user);

      // cy.get('[id^="radix-"] > div.my-4.flex.items-center.justify-between > div:nth-child(1) > div.relative.flex.items-center > input').type(number.whatsapp);
      // cy.wait(1200);
      // cy.get('[id^="radix-"] > div.mt-5 > div.rounded-md.border > div > table > tbody > tr > td:nth-child(1)').contains(number.division);
      // cy.get_statusAkunWhatsappOnAccountPage();
      // cy.get('@statusAkunWhatsappOnAccountPage').should('be.visible').then(($element) => {
      //   const text = $element.text();
      //   cy.log('Text inside element:', text);  // Prints the text in Cypress console
      //   console.log('Text inside element:', text);  // Also logs to browser dev tools console
      //   if (text.includes('Tidak Aktif')) {
      //     // Take a screenshot when text contains 'Tidak Aktif'
      //     cy.screenshot('screenshot account created divisi :' + number.division + ' Tidak Aktif');
      //   } else {
      //     // Take a screenshot for other cases
      //     cy.screenshot('screenshot account created divisi :' + number.division);
      //   }
      //   // // Update Google Sheets with the status in column T for the current division
      //   // const rowIndex = number.division; // Assuming division corresponds to the row index
      //   // const range = `Sheet1!T${rowIndex}`; // Column T for the row corresponding to the division

      //   // // Make the request to update the Google Sheet
      //   // cy.request({
      //   //   method: 'PUT',  // Update requires PUT method
      //   //   url: `https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/${range}?valueInputOption=USER_ENTERED`,
      //   //   headers: {
      //   //     'Authorization': `Bearer ${Cypress.env('GOOGLE_API_TOKEN')}`,  // Ensure you have your API token stored in env variables
      //   //     'Content-Type': 'application/json',
      //   //   },
      //   //   body: {
      //   //     range: range,  // Specify the cell to update (column T, current row)
      //   //     majorDimension: 'ROWS',
      //   //     values: [[status]],  // Update the status value ("Aktif" or "Tidak Aktif")
      //   //   }
      //   // }).then((response) => {
      //   //   expect(response.status).to.eq(200);  // Ensure the request was successful
      //   //   cy.log(`Updated Google Sheet for division ${number.division} with status: ${status}`);
      //   // });
      // });
      cy.wait(500);
    });
  });
});
