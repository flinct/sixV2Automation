Cypress.Commands.add("searchbar", () => {
  cy.get('[data-cy="general-filter-search"]');
});
Cypress.Commands.add("dateFIlter", () => {
  cy.get('[data-cy="general-filter-date"]');
});
Cypress.Commands.add("selectDivisionFilter", () => {
  cy.get('[data-cy="general-filter-Semua\\ Divisi"]');
});
Cypress.Commands.add("groupFIlter", () => {
  cy.get('[data-cy="general-filter-Semua Group"]');
});
Cypress.Commands.add("pagination_container", () => {
  // cy.xpath(
  //   "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[2]/div[1]/div[2]/div[2]"
  // );
  // cy.get('button[role="combobox"]').contains("10");
  cy.get('button[role="combobox"]').eq(5); //value 10,20,30
});
Cypress.Commands.add("pagination_back", () => {
  cy.get('[data-cy="pagination-back"]');
});
Cypress.Commands.add("pagination_order", () => {
  cy.get('[data-cy^="pagination-order-"]');
});
Cypress.Commands.add("pagination_next", () => {
  cy.get('[data-cy="pagination-next"]');
});
Cypress.Commands.add("general_FilterSemuaDivisi", () => {
  cy.get('[data-cy="general-filter-Semua Divisi"]');
});
Cypress.Commands.add("filterTicketList", () => {
  // cy.get('[data-cy="general-filter-Semua Divisi"]');
  cy.contains("button", "Filter");
});
Cypress.Commands.add("filterByCourier", () => {
  cy.get('[data-cy="courier-dropdown-Pilih kurir"]');
});
// Cypress.Commands.add("ticketList_kurirFilter", () => {
//   cy.get('input[placeholder="Semua Kurir"]');
// });
Cypress.Commands.add("ticketList_fliterKendala", () => {
  // cy.get('')
  cy.xpath("/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[4]");
});
