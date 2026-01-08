//TICKETING
Cypress.Commands.add("monitoringTicket_headLabel", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[1]/h1[1]"
  ).contains("Ticket");
});
Cypress.Commands.add("monitoringTicket_moreAction", () => {
  cy.get('[data-cy="more-action-button"]');
});
Cypress.Commands.add("monitoringTicket_createTicket", () => {
  cy.get('[data-cy="create-single-ticket-btn"]');
});

Cypress.Commands.add("monitoringTicket_newTicket", () => {
  cy.get('[data-cy="Tiket Baru"]');
});
Cypress.Commands.add("monitoringTicket_semuaTicket", () => {
  cy.get('[data-cy="Semua Tiket"]');
});
Cypress.Commands.add("monitoringTicket_butuhResponse", () => {
  cy.get('[data-cy="Butuh Response"]');
});
Cypress.Commands.add("monitoringTicket_sedangDItangani", () => {
  cy.get('[data-cy="Sedang Ditangani"]');
});
Cypress.Commands.add("monitoringTicket_solvedTicket", () => {
  cy.get('[data-cy="Ticket Selesai"]');
});
Cypress.Commands.add("monitoringTicket_overSLA", () => {
  cy.get('[data-cy="Over SLA"]');
});

Cypress.Commands.add("searchbar_atTicket", () => {
  cy.get('[data-cy="searchbar-ticket"]');
});

// Cypress.Commands.add("ticketList_ongoing_tab", () => {
//   cy.xpath("");
// });
// Cypress.Commands.add("ticketList_solved_tab", () => {
//   cy.xpath("");
// });
// Cypress.Commands.add("ticketList_all_tab", () => {
//   cy.xpath("");
// });
// Cypress.Commands.add("ticketList_trackingFilter", () => {
//   cy.xpath("");
// });

Cypress.Commands.add("ticketList_tableHeading_checkbox", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_tableHeading_awb", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_tableHeading_kendala", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_tableHeading_SLA", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_tableHeading_tglManifest", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_tableHeading_destinasi", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_tableHeading_tracking", () => {
  cy.xpath("");
});

Cypress.Commands.add("ticketList_checkbox", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_kurirLogo", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_abw", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_deskripsiKendala", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_SLA", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_manifestDate", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_destinasi", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_lastTracking", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_lastTrackingButton", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_sellerNameAndIcon", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_sellerPhoneAndIcon", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_ticketIdAndIcon", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_priority", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_kendala", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_createdAt", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_handoverAgent", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_buttonTindakLanjuti", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_buttonViewTicket", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_buttonSolveTIcket", () => {
  cy.xpath("");
});
Cypress.Commands.add("ticketList_", () => {
  cy.xpath("");
});

//v2
class ticketClass {
  buttonCreateTicket() {
    return cy.contains("button", "Tiket Baru");
  }
  createTicketDrawerModal() {
    return cy.contains("div", "Buat tiket baru").closest('div[role="dialog"]');
  }
}
export default new ticketClass();
