// button and nav commands

Cypress.Commands.add("dashboardNav", () => {
  // cy.get('[data-cy="nav-link-Dashboard"]');
  cy.get("button").contains("Dashboard");
});
Cypress.Commands.add("inboxNav", () => {
  // cy.get('[data-cy="nav-link-Inbox"]');
  cy.get("button").contains("Inbox");
});
Cypress.Commands.add("broadcastNav", () => {
  // cy.get('[data-cy="nav-link-Broadcast"]');
  cy.get("button").contains("Broadcast");
});
Cypress.Commands.add("broadcastRiwayatNav", () => {
  // cy.get('[data-cy="nav-link-Broadcast-Riwayat"]');
  cy.contains("Riwayat Broadcast");
});
Cypress.Commands.add("broadcastTemplateNav", () => {
  cy.get('[data-cy="nav-link-Broadcast-Template"]');
});
Cypress.Commands.add("contactNav", () => {
  cy.get('[data-cy="nav-link-Contact"]');
});
Cypress.Commands.add("settingNav", () => {
  cy.get('[data-cy="nav-link-Settings"]');
});
Cypress.Commands.add("akunWhatsappNav", () => {
  cy.get('a[data-cy="nav-link-Settings-Akun Whatsapp"]');
});
Cypress.Commands.add("kelolaGrupNav", () => {
  cy.get('a[data-cy="nav-link-Settings-Kelola Group"]');
});
Cypress.Commands.add("kelolaTimNav", () => {
  cy.get('a[data-cy="nav-link-Settings-Kelola Tim"]');
});
Cypress.Commands.add("jamKerjaNav", () => {
  cy.get('a[data-cy="nav-link-Settings-Jam Kerja"]');
});
Cypress.Commands.add("templatePesanNav", () => {
  cy.get('a[data-cy="nav-link-Settings-Template Pesan"]');
});
Cypress.Commands.add("userLoginNameLabel", () => {
  // cy.get('[data-testId="avatar-root"]').eq(0);
  cy.get('[data-cy="Sidebar-Navigation"]').find("div").eq(2);

  //   .xpath(
  //   "/html[1]/body[1]/main[1]/main[1]/section[1]/div[1]/div[2]/div[1]/div[1]/p[1]"
  // );
});
Cypress.Commands.add("userLoginNameLabel_valueName", () => {
  cy
    // .get('[data-testId="avatar-root"]').eq(0);
    .xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/h1[1]");
});
Cypress.Commands.add("userLoginNameLabel_role", () => {
  cy
    // .get('[data-testId="avatar-root"]').eq(0);
    // .xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/h1[1]");
    .xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/p[1]");
});
// Cypress.Commands.add("buttonSettingUserLogin", () => {
//   // cy.get('[data-cy="navbar-button-profile"]');
//   // cy.get('button[aria-haspopup="dialog"][data-state="closed"]')
//   //   .find('[data-testid="avatar-root"]')
//   //   .should("have.class", "rounded-full");
//   cy.xpath(
//     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[1]/div[1]/div[2]/button[1]/span[1]/span[1]"
//   );
// });
// Cypress.Commands.add("buttonSettingUserLoginName", () => {
//   cy.get("div.mb-2.text-slate-600 h1");
// });
Cypress.Commands.add("batal", () => {
  cy.contains("Batal");
});
Cypress.Commands.add("button_simpan", () => {
  cy.contains("Simpan");
});
Cypress.Commands.add("inbox_filter_button", () => {
  cy.get('[data-cy="inbox-filter-button"]');
});
Cypress.Commands.add("broadcastLabelHeadOnDashboard", () => {
  // cy.xpath(
  //   "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[1]/h3[1]/p[1]"
  // );
  cy.get('[data-cy="dashboard-count-broadcast-button"]');
});
Cypress.Commands.add("registerButton", () => {
  cy.get('[data-cy="register-button-sign-up"]');
});

//v2
class buttonClass {
  buttonCreateTicket() {
    return cy.contains("button", "Tiket Baru");
  }
}
export default new buttonClass();
