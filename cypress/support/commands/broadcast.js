//BROADCAST
Cypress.Commands.add("headLabelBroadcast", () => {
  cy.get("div").find("h3").contains("Riwayat");
});
Cypress.Commands.add("headLabelBroadcast_template", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/h3[1]"
  );
});
Cypress.Commands.add("statusFilter_BroadcastHistory", () => {
  //   cy.xpath(
  //     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[3]/button[1]"
  //   );
  cy.get("button").contains("Semua Status");
});
Cypress.Commands.add("list_BroadcastHistory", () => {
  cy.get('[data-cy^="history-broadcast-"]');
});
Cypress.Commands.add("first_list_BroadcastHistory", () => {
  cy.get('[data-cy^="history-broadcast-"]').eq(0);
});
Cypress.Commands.add("second_list_BroadcastHistory", () => {
  cy.get('[data-cy^="history-broadcast-"]').eq(1);
});
Cypress.Commands.add("detail_BroadcastHistory", () => {
  cy.get('[data-cy="history-broadcast-detail"]');
});
Cypress.Commands.add("detail_message_BroadcastHistory", () => {
  cy.get('[data-cy="history-broadcast-detail-message"]');
});
Cypress.Commands.add("properties_BroadcastHistory", () => {
  cy.get('[data-cy="history-broadcast-properties"]');
});
// Cypress.Commands.add("loadLimit_BroadcastHistory", () => {
//   cy.xpath(
//     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/button[1]"
//   );
// });
Cypress.Commands.add("headLabelBroadcast_template", () => {
  // cy.xpath(
  //   "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/h3[1]"
  // );
  cy.contains("h3", "Template");
});
Cypress.Commands.add("add_new_template_broadcast", () => {
  cy.get('[data-cy="add-new-template-broadcast"]');
});
Cypress.Commands.add("headLabel_addNewTemplate", () => {
  cy.xpath("/html/body/div[2]/div[1]/h1");
});
Cypress.Commands.add("labelNamaTemplate_addNewTemplate", () => {
  cy.xpath("/html/body/div[2]/form/div[1]/div[1]/label");
});
Cypress.Commands.add("textboxNamaTemplate_addNewTemplate", () => {
  cy.xpath("/html/body/div[2]/form/div[1]/div[1]/div");
});
Cypress.Commands.add("labelPesanTemplate_addNewTemplate", () => {
  cy.xpath("/html/body/div[2]/form/div[1]/div[2]/label");
});
Cypress.Commands.add("textboxPesanTemplate_addNewTemplate", () => {
  cy.xpath("/html/body/div[2]/form/div[1]/div[2]/textarea");
});
Cypress.Commands.add("buttonBatal_addNewTemplate", () => {
  cy.xpath("/html/body/div[2]/form/div[2]/button[1]");
});
Cypress.Commands.add("buttonSimpan_addNewTemplate", () => {
  cy.xpath("/html/body/div[2]/form/div[2]/button[2]");
});
Cypress.Commands.add("broadcast_emptyState", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[2]/div[1]"
  );
});

//--------------------V2--------------------

class elementBroadcast {
  broadcastNavTitle() {
    return cy
      .get('[data-cy="Broadcast-Sidebar-Navigation"]')
      .find("div")
      .contains("h1", /broadcast/i);
  }
  broadcastNavMessage() {
    return cy
      .get('[data-cy="Broadcast-Sidebar-Navigation"]')
      .find("button")
      .eq(0);
  }
  broadcastMessageTable() {
    return (
      cy
        // .get('[data-cy="Broadcast-Sidebar-Navigation"]')
        .get("table")
    );
  }
  broadcastMessageTableLength() {
    return (
      cy
        // .get('[data-cy="Broadcast-Sidebar-Navigation"]')
        .get("table")
        .find("tbody")
    );
  }
  broadcastMessageBulk() {
    return (
      cy
        // .get('[data-cy="Broadcast-Sidebar-Navigation"]')
        .get("#action")
        .contains("button", /bulk broadcast/i)
    );
  }
  broadcastMessageBulkInputModal() {
    return (
      cy
        // .get('[data-cy="Broadcast-Sidebar-Navigation"]')
        .get('div[role="dialog"]')
        .contains("h2", /bulk broadcast/i)
    );
  }
  broadcastMessageBulkInputModalCancel() {
    return (
      cy
        // .get('[data-cy="Broadcast-Sidebar-Navigation"]')
        .get('div[role="dialog"]')
        .contains("button", /cancel/i)
    );
  }
  broadcastNavDraft() {
    return cy
      .get('[data-cy="Broadcast-Sidebar-Navigation"]')
      .find("button")
      .eq(1);
  }
  broadcastNavTemplateSection() {
    return cy.get('[data-cy="Broadcast-Sidebar-Navigation"]').find("p");
  }
  broadcastNavTemplateWaUnoff() {
    return cy
      .get('[data-cy="Broadcast-Sidebar-Navigation"]')
      .find("p")
      .contains(/templates/i)
      .next()
      .find("button")
      .eq(0)
      .contains(/whatsapp web/i);
  }
  broadcastNavTemplateWaOfficials() {
    return cy
      .get('[data-cy="Broadcast-Sidebar-Navigation"]')
      .find("p")
      .contains(/templates/i)
      .next()
      .find("button")
      .eq(1)
      .contains(/whatsapp api/i);
  }
}
export default new elementBroadcast();
