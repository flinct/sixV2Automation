const baseUrl = Cypress.config("baseUrl");
class elementNavigation {
  defaultUrl() {
    // cy.visit("https://dev-v2.satuinbox.com/id");
    // cy.visit(baseUrl + "/id/conversation/your-inbox");
    cy.visit("/conversation/your-inbox");
    // cy.visit("/id");
    // cy.visit("/conversation/your-inbox");
  }
  //main Navigation
  inboxNav() {
    // return cy.get('[data-cy="main-nav-inbox"]').parent().find("p");
    return cy.get('[data-cy="Sidebar-Navigation-List"]').find("button").eq(0);
  }

  ticketNav() {
    // return cy.get('[data-cy="main-nav-ticket"]').parent().find("p");
    return cy.get('[data-cy="Sidebar-Navigation-List"]').find("button").eq(1);
  }

  broadcastNav() {
    // return cy.get('[data-cy="main-nav-broadcast"]').parent().find("p");
    return cy.get('[data-cy="Sidebar-Navigation-List"]').find("button").eq(2);
  }

  statisticNav() {
    // return cy.get('[data-cy="main-nav-statistic"]').parent().find("p");
    return cy.get('[data-cy="Sidebar-Navigation-List"]').find("button").eq(3);
  }

  contactNav() {
    // return cy.get('[data-cy="main-nav-contact"]').parent().find("p");
    return cy.get('[data-cy="Sidebar-Navigation-List"]').find("button").eq(4);
  }

  settingsNav() {
    // return cy.get('[data-cy="main-nav-settings"]').parent().find("p");
    // return cy.get('[data-cy="Sidebar-Navigation-List"]').find("button").eq(5);
    return cy.get('a[href="/settings/organization/general"] button');
  }

  profileNav() {
    // return cy.get('[data-cy="main-nav-profile"]').parent().find("p");
    return cy.get("span:has(svg.tabler-icon-user-filled)");
  }

  //--------------ALL SETTING NAV------------------
  teamNav() {
    // return cy.get('[data-cy="main-nav-profile"]').parent().find("p");
    return cy
      .get('[data-cy="Setting-Sidebar-Navigation"]')
      .find("button")
      .contains("p", /anggota|members/i);
  }
}
export default new elementNavigation();
