class dashboardPage {
  elementCheckDashboard() {
    cy.softAssert(
      cy.dashboardNav().should("have.class", "text-primary"),
      "Head Label: Dashboard"
    );
    cy.softAssert(cy.dateFIlter().should("be.visible"), "Date Picker");
    cy.softAssert(
      cy.selectDivisionFilter().should("be.visible"),
      "Filter Divisi"
    );
    cy.softAssert(cy.groupFIlter().should("be.visible"), "Filter Grup Divisi");
    // cy.softAssert(cy.broadcastLabelHeadOnDashboard().should('be.visible').contains('Broadcast'), 'Broadcast Label');
    cy.softAssert(
      cy.broadcastFilterHeadOnDashboard().should("be.visible"),
      "Broadcast Filter"
    );
    // groupFIlter;
    cy.softAssert(
      cy
        .broadcastTitleOnDashboard()
        .should("be.visible")
        .contains("Total Broadcast"),
      "Total Broadcast Card"
    );
    cy.softAssert(
      cy.broadcastResultOnDashboard().should("be.visible"),
      "Total Broadcast value"
    );
    cy.softAssert(
      cy.broadcastButtonOnDashboard().should("be.visible"),
      "Total Broadcast Button"
    );
    cy.softAssert(
      cy.broadcastCardOnDashboard_success().should("be.visible"),
      "Broadcast Success"
    );
    cy.softAssert(
      cy.broadcastCardOnDashboard_pending().should("be.visible"),
      "Broadcast Pending"
    );
    cy.softAssert(
      cy.broadcastCardOnDashboard_failed().should("be.visible"),
      "Broadcast Failed"
    );
    cy.softAssert(
      cy.broadcastCardOnDashboard_inbound().should("be.visible"),
      "Broadcast Inbound"
    );
    cy.softAssert(
      cy.broadcastFilter_perAccountOndashboard().should("be.visible"),
      "Broadcast Akun filter"
    );

    cy.softAssert(
      cy.broadcastTicketPerformance_total().should("be.visible"),
      "Broadcast ticket performance total"
    );
    cy.softAssert(
      cy.broadcastTicketPerformance_solved().should("be.visible"),
      "Broadcast ticket performance solve"
    );
    cy.softAssert(
      cy.broadcastTicketPerformance_unsolved().should("be.visible"),
      "Broadcast ticket performance unsolve"
    );
    cy.softAssert(
      cy.broadcastTicketPerformance_avgReply().should("be.visible"),
      "Broadcast ticket performance avg reply time"
    );
    cy.softAssert(
      cy.broadcastTicketPerformance_avgSolve().should("be.visible"),
      "Broadcast ticket performance avg solve time"
    );

    cy.softAssert(
      cy.tab_agent_performa_totalcase().scrollIntoView().should("be.visible"),
      "Broadcast overview agent tab"
    );
    cy.softAssert(
      cy.tab_agent_performa_perAgent().scrollIntoView().should("be.visible"),
      "Broadcast per agent tab"
    );

    cy.softAssert(
      cy.agent_performa_totalcase().should("be.visible").contains("Total Case"),
      "Total Case Performance"
    );
    cy.softAssert(
      cy.agent_performa_totalcase_value().scrollIntoView().should("be.visible"),
      "Total Case Value"
    );
    cy.softAssert(
      cy
        .agent_performa_totalcase_unassign()
        .scrollIntoView()
        .should("be.visible"),
      "Total Case Label unassign"
    );
    cy.softAssert(
      cy
        .agent_performa_totalcase_unassign_value()
        .scrollIntoView()
        .should("be.visible"),
      "Total Case Value unassign"
    );
    cy.softAssert(
      cy.agent_performa_totalcase_open().scrollIntoView().should("be.visible"),
      "Total Case Label open"
    );
    cy.softAssert(
      cy
        .agent_performa_totalcase_open_value()
        .scrollIntoView()
        .should("be.visible"),
      "Total Case Value open"
    );
    cy.softAssert(
      cy
        .agent_performa_totalcase_resolved()
        .scrollIntoView()
        .should("be.visible"),
      "Total Case Label resolved"
    );
    cy.softAssert(
      cy
        .agent_performa_totalcase_resolved_value()
        .scrollIntoView()
        .should("be.visible"),
      "Total Case Value resolved"
    );
    cy.softAssert(
      cy.agent_performa_pesanDikirim().scrollIntoView().should("be.visible"),
      "Pesan Dikirim"
    );
    cy.softAssert(
      cy
        .agent_performa_pesanDikirim_value()
        .scrollIntoView()
        .should("be.visible"),
      "Value Pesan Dikirim"
    );
    cy.softAssert(
      cy.agent_performa_pesanDiterima().scrollIntoView().should("be.visible"),
      "Pesan Diterima"
    );
    cy.softAssert(
      cy
        .agent_performa_pesanDiterima_value()
        .scrollIntoView()
        .should("be.visible"),
      "Value Pesan Diterima"
    );
    cy.softAssert(
      cy.agent_performa_activeCust().scrollIntoView().should("be.visible"),
      "Active Customer"
    );
    cy.softAssert(
      cy
        .agent_performa_activeCust_value()
        .scrollIntoView()
        .should("be.visible"),
      "Value Active Customer"
    );
    cy.softAssert(
      cy.agent_performa_averageResolve().scrollIntoView().should("be.visible"),
      "Average Resolve"
    );
    cy.softAssert(
      cy
        .agent_performa_averageResolve_value()
        .scrollIntoView()
        .should("be.visible"),
      "Value Average Resolve"
    );
    cy.softAssert(
      cy.agent_performa_activeAgent().scrollIntoView().should("be.visible"),
      "Active Agent"
    );
    cy.softAssert(
      cy
        .agent_performa_activeAgent_value()
        .scrollIntoView()
        .should("be.visible"),
      "Value Active Agent"
    );
    // cy.softAssert(cy.get('#nonexistent-element', { timeout: 5000 }), 'Nonexistent Element');
    // cy.softAssert(cy.get('#existing-element'), 'Existing Element');
  }

  navigateToDashboard() {
    cy.contains("button", "Dashboard").click();
  }
}

export default dashboardPage;
