//TERM OF USE
Cypress.Commands.add("term_opening", () => {
  cy.get("div.text-base.mt-4");
});
Cypress.Commands.add("term_definitions", () => {
  cy.get("section#definitions");
});
Cypress.Commands.add("term_definitions_0", () => {
  cy.get("section#definitions").find("p").eq(0);
});
Cypress.Commands.add("term_definitions_1", () => {
  cy.get("section#definitions").find("p").eq(1);
});
Cypress.Commands.add("term_definitions_2", () => {
  cy.get("section#definitions").find("p").eq(2);
});
Cypress.Commands.add("term_definitions_3", () => {
  cy.get("section#definitions").find("p").eq(3);
});
Cypress.Commands.add("term_definitions_4", () => {
  cy.get("section#definitions").find("p").eq(4);
});
Cypress.Commands.add("term_definitions_5", () => {
  cy.get("section#definitions").find("p").eq(5);
});
Cypress.Commands.add("term_definitions_6", () => {
  // cy.get("section#definitions").find("p").eq(6);
  cy.get("section#definitions").find("p").eq(5);
});
Cypress.Commands.add("term_definitions_7", () => {
  cy.get("section#definitions").find("p").eq(6);
  // cy.get("section#definitions").find("p").eq(7);
});
Cypress.Commands.add("term_definitions_8", () => {
  cy.get("section#definitions").find("p").eq(7);
  // cy.get("section#definitions").find("p").eq(8);
});
Cypress.Commands.add("term_license", () => {
  cy.get("section#license");
});
Cypress.Commands.add("term_customer", () => {
  cy.get("section#customer-data");
});
Cypress.Commands.add("term_use", () => {
  cy.get("section#use-of-trademarks");
});
Cypress.Commands.add("term_license_restrictions", () => {
  cy.get("section#license-restrictions");
});
Cypress.Commands.add("term_availability", () => {
  cy.get("section#availability");
});
Cypress.Commands.add("term_fees", () => {
  cy.get("section#fees");
});
Cypress.Commands.add("term_prohibited", () => {
  cy.get("section#prohibited");
});
Cypress.Commands.add("term_term_termination", () => {
  cy.get("section#term-termination");
});
Cypress.Commands.add("term_confidentiality", () => {
  cy.get("section#confidentiality");
});
Cypress.Commands.add("term_indemnity", () => {
  cy.get("section#indemnity");
});
Cypress.Commands.add("term_intellectual_property", () => {
  cy.get("section#intellectual-property");
});
Cypress.Commands.add("term_governing_law", () => {
  cy.get("section#governing-law");
});
Cypress.Commands.add("term_force", () => {
  cy.get("section#force-majeure");
});
Cypress.Commands.add("term_miscellaneous", () => {
  cy.get("section#miscellaneous");
});
Cypress.Commands.add("term_contact", () => {
  cy.get("section#contact");
});

//PRIVACY POLICY
Cypress.Commands.add("privacy_opening", () => {
  cy.get("div.space-y-3.mt-4");
});
Cypress.Commands.add("privacy_definitions", () => {
  cy.get("section#definitions");
});
Cypress.Commands.add("privacy_scope", () => {
  cy.get("section#scope");
});
Cypress.Commands.add("privacy_information", () => {
  cy.get("section#information");
});
Cypress.Commands.add("privacy_use_data", () => {
  cy.get("section#use-data");
});
Cypress.Commands.add("privacy_platform_integrations", () => {
  cy.get("section#platform-integrations");
});
Cypress.Commands.add("privacy_data_storage", () => {
  cy.get("section#data-storage");
});
Cypress.Commands.add("privacy_cookies", () => {
  cy.get("section#cookies");
});
Cypress.Commands.add("privacy_share", () => {
  cy.get("section#share");
});
Cypress.Commands.add("privacy_retention", () => {
  cy.get("section#retention");
});
Cypress.Commands.add("privacy_security", () => {
  cy.get("section#security");
});
Cypress.Commands.add("privacy_rights", () => {
  cy.get("section#rights");
});
Cypress.Commands.add("privacy_childrens_privacy", () => {
  cy.get("section#childrens-privacy");
});
Cypress.Commands.add("privacy_changes_policy", () => {
  cy.get("section#changes-policy");
});
Cypress.Commands.add("privacy_contact", () => {
  cy.get("section#contact");
});
