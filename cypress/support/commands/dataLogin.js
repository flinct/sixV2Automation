import elementAuth from "../commands/auth.js";

Cypress.Commands.add("login_dev_by_username", (username, password) => {
  elementAuth.keyword().type("goddummy");
  elementAuth.password().type("asdqwe12");
  elementAuth.buttonLogin().click();
});
Cypress.Commands.add("login_dev_by_email", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("god@dummy.com");
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("login_goddummstag", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("goddumstag");
  cy.get("#password").type("Asdqwe12!");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("login_staging", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("testerloginstaging");
  cy.get("#password").type("Asdqwe12@");
  cy.get(".bg-primary").click();
});

Cypress.Commands.add("login_staging_by_email", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("chickentester@g.com");
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});

Cypress.Commands.add("login_chickentester_email", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("syncmchristian2@gmail.com");
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});

Cypress.Commands.add("login_chickentester_username", (username, password) => {
  elementAuth.keyword().type("chickentester01");
  elementAuth.password().type("asdqwe12");
  elementAuth.buttonLogin().click();
});
Cypress.Commands.add("login_chickentester_usernameV2", (username, password) => {
  elementAuth.keyword().type("chickentester01");
  elementAuth.password().type("Asdqwe12@");
  elementAuth.buttonLogin().click();
});

Cypress.Commands.add("login_chickentester_2_username", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("chickentester2");
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});

Cypress.Commands.add("login_as_admin", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("dummychickenadmin");
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});

Cypress.Commands.add("login_SAP_superAdmin", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("goddevsa1");
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("login_goddummysa", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("goddummysa");
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});

//login to production

Cypress.Commands.add("login_prod_by_username", (username, password) => {
  // cy.visit("/login");
  cy.viewport(1366, 768);
  cy.get("#keyword").type("goddummyprod");
  cy.get("#password").type("TongTji89");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("login_prod_by_email", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("god@dummy1.com");
  cy.get("#password").type("TongTji89");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add(
  "login_prod_by_username_prodtestingjuli",
  (username, password) => {
    cy.viewport(1366, 768);
    cy.get("#keyword").type("prodtestingjuli");
    cy.get("#password").type("asdqwe12");
    cy.get(".bg-primary").click();
  }
);

//login to niagakara

Cypress.Commands.add("login_niagakara", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("niagakara");
  cy.get("#password").type("password1");
  cy.get(".bg-primary").click();
});

Cypress.Commands.add("loginBikiniBottom_owner", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("spongebobkotak");
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("loginBikiniBottom_superAdmin", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("sandytupai");
  cy.get("#password").type("Asdqwe12@");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("loginBikiniBottom_agent", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("patrick");
  cy.get("#password").type("Asdqwe12@");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("loginBikiniBottom_admin", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("squidward");
  cy.get("#password").type("Asdqwe12@");
  cy.get(".bg-primary").click();
});

Cypress.Commands.add("loginKentang_owner", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("potato");
  // cy.get("#password").type("Asdqwe12@");
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("loginKentang_admin", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("bayam1");
  cy.get("#password").type("Asdqwe12@");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("loginKentang_agent", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("carrot");
  cy.get("#password").type("Asdqwe12@");
  cy.get(".bg-primary").click();
});

Cypress.Commands.add("login_messagelogsatu", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("messagelogsatu");
  cy.get("#password").type("Asdqwe12@");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("login_messagelogdua", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("messagelogdua");
  cy.get("#password").type("Asdqwe12@");
  cy.get(".bg-primary").click();
});

//invalid login
Cypress.Commands.add("login_invalid_username", (username, password) => {
  // cy.viewport(1366, 768);
  // cy.get("#keyword").type("asdinvalid01");
  // cy.get("#password").type("asdqwe129");
  // cy.get(".bg-primary").click();
  elementAuth.keyword().type("asdinvalid01");
  elementAuth.password().type("asdqwe129");
  elementAuth.buttonLogin().click();
});
Cypress.Commands.add("login_invalid_email", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("asd@invalid01.com");
  cy.get("#password").type("asdqwe129");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("login_invalid_password", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("god@dummy1.com");
  cy.get("#password").type("asalah");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("login_blank_email", (username, password) => {
  cy.viewport(1366, 768);
  // cy.get('#keyword').type('god@dummy1.com');
  cy.get("#password").type("asdqwe12");
  cy.get(".bg-primary").click();
});
Cypress.Commands.add("login_blank_password", (username, password) => {
  cy.viewport(1366, 768);
  cy.get("#keyword").type("god@dummy1.com");
  // cy.get('#password').type('');
  cy.get(".bg-primary").click();
});
