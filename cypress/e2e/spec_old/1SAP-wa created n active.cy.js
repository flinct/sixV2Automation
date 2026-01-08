// import { elements } from '/cypress/support/selectors.js';
import { beforeEach } from "/cypress/support/beforeEachSetup.js";
import { timeout } from "rxjs";
import userNumber from "../../support/userNumber.js";

describe("Main Element Test", () => {
  //Element testing Dashboard
  before(() => {});

  // beforeEach(()=>{
  //   cy.session('loginSession');
  // })

  const filteredData = userNumber.filter((number) => number.whatsapp !== "");
  filteredData.forEach((number) => {
    it("should get all element on Dashboard", () => {
      cy.session("loginSession", () => {
        // Adjust cookie names to match your app
        cy.login_dev_by_username("myUsername", "myPassword").then(() => {
          // Cek apakah login berhasil
          cy.get_headerDashboard();
          cy.get("@headerDashboard");
          // cy.url().should('include', 'https://sap.satuinbox.com/dashboard'); // Ubah sesuai dengan URL setelah login
        });
      });
      cy.visit("https://sap.satuinbox.com/setting/account-whatsapp");
      // cy.login_prod('myUsername','myPassword');
      // cy.login_prod('myUsername','myPassword');
      // beforeEach(()=>{
      //   beforeEachSetup();
      // });
      // filteredData.forEach((number, index) =>{
      // cy.get_settingNav();
      // cy.get_akunWhatsappNav();
      // cy.get('@settingNav').click();
      // cy.get('@akunWhatsappNav').click();
      cy.get(
        '[id^="radix-"] > div.my-4.flex.items-center.justify-between > div:nth-child(1) > div.relative.flex.items-center > input'
      ).type(number.whatsapp);
      cy.wait(1200);
      cy.get(
        '[id^="radix-"] > div.mt-5 > div.rounded-md.border > div > table > tbody > tr > td:nth-child(1)'
      ).contains(number.division);
      cy.get_statusAkunWhatsappOnAccountPage();
      // cy.get('@statusAkunWhatsappOnAccountPage').should('be.visible');
      cy.get("@statusAkunWhatsappOnAccountPage")
        .should("be.visible")
        .then(($element) => {
          const text = $element.text();
          cy.log("Text inside element:", text); // Prints the text in Cypress console
          console.log("Text inside element:", text); // Also logs to browser dev tools console
          if (text.includes("Tidak Aktif")) {
            // Take a screenshot when text contains 'Tidak Aktif'
            cy.screenshot(
              "screenshot account created divisi :" +
                number.division +
                " Tidak Aktif"
            );
          } else {
            // Take a screenshot for other cases
            cy.screenshot(
              "screenshot account created divisi :" + number.division
            );
          }

          // // Update Google Sheets with the status in column T for the current division
          // const rowIndex = number.division; // Assuming division corresponds to the row index
          // const range = `Sheet1!T${rowIndex}`; // Column T for the row corresponding to the division

          // // Make the request to update the Google Sheet
          // cy.request({
          //   method: 'PUT',  // Update requires PUT method
          //   url: `https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/${range}?valueInputOption=USER_ENTERED`,
          //   headers: {
          //     'Authorization': `Bearer ${Cypress.env('GOOGLE_API_TOKEN')}`,  // Ensure you have your API token stored in env variables
          //     'Content-Type': 'application/json',
          //   },
          //   body: {
          //     range: range,  // Specify the cell to update (column T, current row)
          //     majorDimension: 'ROWS',
          //     values: [[status]],  // Update the status value ("Aktif" or "Tidak Aktif")
          //   }
          // }).then((response) => {
          //   expect(response.status).to.eq(200);  // Ensure the request was successful
          //   cy.log(`Updated Google Sheet for division ${number.division} with status: ${status}`);
          // });
        });
      // cy.get('@statusAkunWhatsappOnAccountPage').should('be.visible').contains('Aktif');
      // cy.screenshot('screenshot account created divisi :'+number.division);
      // cy.get('[id^="radix-"] > div.mt-5 > div.rounded-md.border > div > table > tbody > tr > td:nth-child(2)').contains(new RegExp(number.whatsapp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1\\s?')));
      // cy.contains('button', 'Tambahkan Divisi').click(); //klik tambah divisi
      // // #radix-\:r6\:-content-divisi > div > div > div > div > div.mt-3.flex.flex-col.items-center.justify-center.space-y-3 > div > button
      // cy.get('#divisionName').clear();
      // cy.get('#divisionName').type(divisi.division);
      // cy.contains('Simpan').click();
      cy.wait(500);
    });
  });
});
