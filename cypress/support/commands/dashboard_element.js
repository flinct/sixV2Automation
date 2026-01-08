//SECTION DASHBOARD ELEMENT

// Cypress.Commands.add("headLabelPageOnDashboard", () => {
//   // cy.get(
//   //   "body > main > main > section > div.sticky.top-0.z-50.flex.items-center.justify-between.border-b-\\[1px\\].bg-background.p-4 > div.text-xl.font-bold"
//   // );
//   cy.get("button").contains("Dashboard");
// });
// Cypress.Commands.add("datePickerOnDashboadPage", () => {
//   cy.xpath(
//     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/div[1]/div[1]/button[1]"
//   );
// });
// Cypress.Commands.add("filterDivisiOnDashboard", () => {
//   cy.xpath(
//     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/div[2]/div[1]/button[1]"
//   );
// });
// Cypress.Commands.add("filterGrupDivisiOnDashboard", () => {
//   cy.xpath(
//     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/div[3]/div[1]/button[1]"
//   );
// });

Cypress.Commands.add("broadcastFilterHeadOnDashboard", () => {
  // cy.get('[data-cy="dashboard-count-broadcast-title"]');
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/h3[1]/p[1]"
  );
});
Cypress.Commands.add("broadcastTitleOnDashboard", () => {
  cy.get('[data-cy="dashboard-count-broadcast-title"]');
});
Cypress.Commands.add("broadcastResultOnDashboard", () => {
  cy.get('[data-cy="dashboard-count-broadcast-result"]');
});
Cypress.Commands.add("broadcastButtonOnDashboard", () => {
  cy.get('[data-cy="dashboard-count-broadcast-button"]');
});
// Cypress.Commands.add("broadcastCardOnDashboard_totalButton", () => {
//   cy.xpath(
//     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/a[1]/button[1]"
//   );
// });
Cypress.Commands.add("broadcastCardOnDashboard_success", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]"
  );
});
Cypress.Commands.add("broadcastCardOnDashboard_pending", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[1]/div[1]"
  );
});
Cypress.Commands.add("broadcastCardOnDashboard_failed", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[4]/div[1]/div[1]"
  );
});
Cypress.Commands.add("broadcastCardOnDashboard_inbound", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[2]/div[1]/div[1]"
  );
});
Cypress.Commands.add("broadcastFilter_perAccountOndashboard", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/h3[1]/div[1]/div[1]/div[1]/button[1]"
  );
});

Cypress.Commands.add("broadcastTicketPerformance_total", () => {
  cy.get('[data-cy="Total Ticket"]');
});
Cypress.Commands.add("broadcastTicketPerformance_solved", () => {
  cy.get('[data-cy="Total Solved"]');
});
Cypress.Commands.add("broadcastTicketPerformance_unsolved", () => {
  cy.get('[data-cy="Total Unsolved"]');
});
Cypress.Commands.add("broadcastTicketPerformance_avgReply", () => {
  cy.get('[data-cy="Avg. Reply Time"]');
});
Cypress.Commands.add("broadcastTicketPerformance_avgSolve", () => {
  cy.get('[data-cy="Avg. Solved Time"]');
});

Cypress.Commands.add("tab_agent_performa_totalcase", () => {
  cy.get('[data-cy="dashboard-tabs-agent-overview"]');
});
Cypress.Commands.add("tab_agent_performa_perAgent", () => {
  cy.get('[data-cy="dashboard-tabs-agent-per-agent"]');
});

Cypress.Commands.add("agent_performa_totalcase", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/p[1]"
  );
});
Cypress.Commands.add("agent_performa_totalcase_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/p[2]"
  );
});
Cypress.Commands.add("agent_performa_totalcase_unassign", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/p[1]"
  );
});
Cypress.Commands.add("agent_performa_totalcase_unassign_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/p[2]"
  );
});
Cypress.Commands.add("agent_performa_totalcase_open", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[2]/p[1]"
  );
});
Cypress.Commands.add("agent_performa_totalcase_open_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[2]/p[2]"
  );
});
Cypress.Commands.add("agent_performa_totalcase_resolved", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[3]/p[1]"
  );
});
Cypress.Commands.add("agent_performa_totalcase_resolved_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[3]/p[2]"
  );
});

Cypress.Commands.add("agent_performa_pesanDikirim", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/p[1]"
  );
});
Cypress.Commands.add("agent_performa_pesanDikirim_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/p[2]"
  );
});
Cypress.Commands.add("agent_performa_pesanDiterima", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/p[1]"
  );
});
Cypress.Commands.add("agent_performa_pesanDiterima_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/p[2]"
  );
});
Cypress.Commands.add("agent_performa_activeCust", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[1]/p[1]"
  );
});
Cypress.Commands.add("agent_performa_activeCust_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[1]/div[1]/p[2]"
  );
});
Cypress.Commands.add("agent_performa_averageResolve", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[4]/div[1]/div[1]/p[1]"
  );
});
Cypress.Commands.add("agent_performa_averageResolve_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[4]/div[1]/div[1]/p[2]"
  );
});
Cypress.Commands.add("agent_performa_activeAgent", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[5]/div[1]/div[1]/p[1]"
  );
});
Cypress.Commands.add("agent_performa_activeAgent_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[5]/div[1]/div[1]/p[2]"
  );
});
// Cypress.Commands.add("agent_overview_tab", () => {
//   cy.xpath(
//     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]/div[1]/button[1]"
//   );
// });
// Cypress.Commands.add("agent_perAgent_tab", () => {
//   cy.xpath(
//     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[2]/div[2]/div[1]/div[1]/button[2]"
//   );
// });
