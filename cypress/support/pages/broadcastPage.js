const baseUrl = Cypress.config("baseUrl");
import inboxPage from "./inboxPage.js";
const inboxAction = new inboxPage();

function generateRandomText(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const randomText = generateRandomText();

class broadcastPage {
  elementCheckingBroadcast_history() {
    // cy.softAssert(cy.headLabelBroadcast().click(),'Navigate to Broadcast History');
    cy.wait(800);
    // cy.softAssert(cy.headLabelBroadcast().contains('Broadcast'),'Head Label Broadcast');
    cy.headLabelBroadcast()
      .should("contain", "Riwayat")
      .then(($label) => {
        const retries = 3;
        const retryInterval = 150000;

        const checkLabel = () => {
          const label = $label.text();
          if (label.includes("Broadcast")) {
            cy.softAssert(true, "Head Label Broadcast");
          } else {
            if (retries > 0) {
              setTimeout(() => {
                checkLabel();
              }, retryInterval);
              retries--;
            } else {
              cy.softAssert(false, "failed  get Head Label Broadcast");
            }
          }
        };
      });
    cy.softAssert(cy.userLoginNameLabel().click(), "User Login Broadcast");
    // cy.softAssert(
    //   cy.headLabelBroadcast_riwayat_template().click(),
    //   "Head Label Broadcast > Riwayat"
    // );
    cy.softAssert(cy.searchbar().click(), "search on broadcast history");
    cy.softAssert(
      cy.dateFIlter().click(),
      "date pickerdateFIlter on broadcast history"
    );
    cy.document().trigger("keydown", { key: "Escape" });
    cy.softAssert(
      cy.statusFilter_BroadcastHistory().click({ force: true }),
      "status filter on broadcast history"
    );
    cy.document().trigger("keydown", { key: "Escape" });
    cy.softAssert(
      cy.selectDivisionFilter().click(),
      "division filter on broadcast history"
    );
    cy.document().trigger("keydown", { key: "Escape" });
    cy.softAssert(
      cy.groupFIlter().click(),
      "group filter on broadcast history"
    );
    cy.document().trigger("keydown", { key: "Escape" });
    cy.get("body", { timeout: 2000 }).then(($body) => {
      if ($body.find('[data-cy^="history-broadcast-"]').length) {
        cy.softAssert(cy.list_BroadcastHistory(), "List broadcast history");
        cy.softAssert(
          cy.second_list_BroadcastHistory().click(),
          "click second list broadcast history"
        );
        cy.softAssert(
          cy.first_list_BroadcastHistory().click(),
          "click first list broadcast history"
        );
        cy.softAssert(
          cy.first_list_BroadcastHistory().find("p").eq(1).contains("Pesan"),
          "label-pesan history BC"
        );
        cy.softAssert(
          cy.first_list_BroadcastHistory().find("h1").eq(0),
          "value message from history BC"
        );
        cy.softAssert(
          cy.first_list_BroadcastHistory().find("p").eq(2),
          "status history BC"
        );
        cy.softAssert(
          cy.first_list_BroadcastHistory().find("p").eq(3).contains("Dari"),
          "label-sender history BC"
        );
        cy.softAssert(
          cy.first_list_BroadcastHistory().find("h1").eq(1),
          "value sender history BC"
        );
        cy.softAssert(
          cy.first_list_BroadcastHistory().find("p").eq(4).contains("Ke"),
          "label-receiver history BC"
        );
        cy.softAssert(
          cy.first_list_BroadcastHistory().find("h1").eq(2),
          "value receiver history BC"
        );
        cy.softAssert(cy.detail_BroadcastHistory(), "detail broadcast history");
        cy.softAssert(
          cy
            .detail_BroadcastHistory()
            .find("h1")
            .eq(0)
            .contains("Detail Riwayat"),
          "Detail selected BC history"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("p").eq(0).contains("Tanggal"),
          "Detail selected BC history - date and time"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("h1").eq(1),
          "Detail selected BC history - date and time>value"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("p").eq(1).contains("Dari"),
          "Detail selected BC history - sender"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("h1").eq(2),
          "Detail selected BC history - sender> value division"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("p").eq(2),
          "Detail selected BC history - sender> value phone"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("p").eq(3).contains("Ke"),
          "Detail selected BC history - receiver"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("h1").eq(3),
          "Detail selected BC history - receiver> value name"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("p").eq(4),
          "Detail selected BC history - receiver> value phone"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("p").eq(5).contains("Divisi"),
          "Detail selected BC history - division"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("h1").eq(4),
          "Detail selected BC history - division> value division"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("p").eq(6).contains("Grup"),
          "Detail selected BC history - grup"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("h1").eq(5),
          "Detail selected BC history - division> value grup"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("h1").eq(6).contains("Pesan"),
          "Detail selected BC history - pesan"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("p").eq(7),
          "Detail selected BC history - BC status"
        );
        cy.softAssert(
          cy.detail_message_BroadcastHistory(),
          "Detail selected BC history - message value BC"
        );
        cy.softAssert(
          cy.detail_BroadcastHistory().find("h1").eq(7).contains("Properties"),
          "Detail selected BC history - properties"
        );
        cy.softAssert(
          cy
            .properties_BroadcastHistory()
            .find("h1")
            .eq(0)
            .contains("contact Name"),
          "Detail selected BC history - properties_name"
        );
        cy.softAssert(
          cy.properties_BroadcastHistory().find("p").eq(0),
          "Detail selected BC history - properties_name> value"
        );
        cy.softAssert(
          cy
            .properties_BroadcastHistory()
            .find("h1")
            .eq(1)
            .contains("division"),
          "Detail selected BC history - division || TYPO"
        );
        cy.softAssert(
          cy.properties_BroadcastHistory().find("p").eq(1),
          "Detail selected BC history - division > value"
        );
        cy.softAssert(
          cy.properties_BroadcastHistory().find("h1").eq(2).contains("sender"),
          "Detail selected BC history - sender || TYPO"
        );
        cy.softAssert(
          cy.properties_BroadcastHistory().find("p").eq(2),
          "Detail selected BC history - sender > value"
        );
        cy.softAssert(
          cy
            .properties_BroadcastHistory()
            .find("h1")
            .eq(3)
            .contains("category"),
          "Detail selected BC history - category || TYPO"
        );
        cy.softAssert(
          cy.properties_BroadcastHistory().find("p").eq(3),
          "Detail selected BC history - category > value"
        );
        cy.softAssert(
          cy
            .properties_BroadcastHistory()
            .find("h1")
            .eq(4)
            .contains("order Id"),
          "Detail selected BC history - order ID || TYPO"
        );
        cy.softAssert(
          cy.properties_BroadcastHistory().find("p").eq(4),
          "Detail selected BC history - order ID > value"
        );
        cy.softAssert(
          cy
            .properties_BroadcastHistory()
            .find("h1")
            .eq(5)
            .contains("batch Id"),
          "Detail selected BC history - batch ID || TYPO"
        );
        cy.softAssert(
          cy.properties_BroadcastHistory().find("p").eq(5),
          "Detail selected BC history - batch ID > value"
        );
        cy.softAssert(cy.pagination_container(), "pagination > value");
        // cy.softAssert(
        //   cy.loadLimit_BroadcastHistory(),
        //   "Load Limiter BC history > value"
        // );
        cy.get('[data-cy^="history-broadcast-"]')
          .not(
            '[data-cy*="-detail"], [data-cy*="-properties"], [data-cy*="-detail-message"]'
          )
          .its("length")
          .then((count) => {
            cy.log(`Found ${count} data loaded`);
          });
        cy.softAssert(
          cy.pagination_container().click(),
          "click Load Limiter BC history"
        );
        // cy.softAssert(cy.get('[data-radix-popper-content-wrapper]'),'Load Limiter BC history');
        cy.get("[data-radix-popper-content-wrapper]").contains("20").click();
        cy.get('[data-cy^="history-broadcast-"]')
          .not(
            '[data-cy*="-detail"], [data-cy*="-properties"], [data-cy*="-detail-message"]'
          )
          .its("length")
          .then((count) => {
            cy.log(`Found ${count} data loaded`);
          });
        cy.softAssert(cy.pagination_container(), "pagination > value");
      } else {
        cy.softAssert(
          cy.broadcast_emptyState(),
          "empty state Broadcast history"
        );
        // cy.log('empty state Broadcast history')
      }
    });
  }

  elementCheckingBroadcast_template() {
    cy.wait(800);
    // cy.headLabelBroadcast()
    //   .should("contain", "Broadcast")
    //   .then(($label) => {
    //     const retries = 3;
    //     const retryInterval = 150000;

    //     const checkLabel = () => {
    //       const label = $label.text();
    //       if (label.includes("Broadcast")) {
    //         cy.softAssert(true, "Head Label Broadcast");
    //       } else {
    //         if (retries > 0) {
    //           setTimeout(() => {
    //             checkLabel();
    //           }, retryInterval);
    //           retries--;
    //         } else {
    //           cy.softAssert(false, "failed  get Head Label Broadcast");
    //         }
    //       }
    //     };
    //   });
    cy.softAssert(
      cy.headLabelBroadcast_template(),
      "Head Label Broadcast > Template"
    );
    cy.softAssert(cy.searchbar(), "Searchbar Template Broadcast");
    cy.softAssert(
      cy.add_new_template_broadcast().click(),
      "add new template broadcast"
    );
    cy.softAssert(
      cy.headLabel_addNewTemplate().contains("Template Baru"),
      "Head Label add new template"
    );
    cy.softAssert(
      cy.labelNamaTemplate_addNewTemplate().contains("Nama Template"),
      "Label Nama Template add new template"
    );
    cy.softAssert(
      cy.textboxNamaTemplate_addNewTemplate(),
      "Label Nama Template add new template"
    );
    cy.softAssert(
      cy.labelPesanTemplate_addNewTemplate().contains("Pesan"),
      "Label Pesan Template add new template"
    );
    cy.softAssert(
      cy.textboxPesanTemplate_addNewTemplate(),
      "textbox Pesan Template add new template"
    );
    cy.softAssert(
      cy.buttonBatal_addNewTemplate().contains("Batal"),
      "button batal add new template"
    );
    cy.softAssert(
      cy.buttonSimpan_addNewTemplate().contains("Simpan"),
      "button simpan add new template"
    );
    cy.document().trigger("keydown", { key: "Escape" });
  }

  navigateToBroadcast_history() {
    cy.url().then((url) => {
      if (url === "https://staging.satuinbox.com/broadcast/template") {
        // cy.templateBroadcastNav().click({ force: true });
        cy.templateBroadcastNav().click({ force: true });
        cy.wait(400);
        cy.broadcastRiwayatNav().click();
      } else {
        cy.broadcastNav().click({ force: true });
        cy.wait(400);
        cy.broadcastRiwayatNav().click();
      }
    });
  }

  navigateToBroadcast_template() {
    cy.wait(1000);
    cy.url().then((url) => {
      if (url === "https://staging.satuinbox.com/broadcast/riwayat") {
        cy.log("a");
        // cy.riwayatBroadcastNav().click({ force: true });
        cy.riwayatBroadcastNav().click({ force: true });
        cy.wait(1000);
        cy.broadcastTemplateNav().click();
      } else {
        cy.log("b");
        cy.broadcastNav().click({ force: true });
        cy.wait(400);
        cy.broadcastTemplateNav().click();
      }
    });
  }

  create_new_templateBC_save() {
    cy.softAssert(
      cy.add_new_template_broadcast().click(),
      "add new template broadcast"
    );
    cy.softAssert(
      cy
        .textboxNamaTemplate_addNewTemplate()
        .type("testingtemplate" + randomText),
      "add new template broadcast> nama template value"
    );
    cy.softAssert(
      cy
        .textboxPesanTemplate_addNewTemplate()
        .type("value testing template " + randomText + " " + randomText),
      "add new template broadcast> pesan value"
    );
    cy.softAssert(
      cy.buttonSimpan_addNewTemplate().click(),
      "save new template broadcast"
    );
    inboxAction.navigateToInbox();
    inboxAction.navigateToInbox_Ongoing();
    cy.softAssert(
      cy.searchbar().type("6289655057778"),
      "search number 089655057778"
    );
    cy.softAssert(cy.chat_list().eq(0).click(), "open chat with 089655057778");
    cy.softAssert(
      cy.textbox_input_inbox().type("/"),
      "open chat with 089655057778"
    );
  }

  create_new_templateBC_cancel() {
    cy.softAssert(
      cy.add_new_template_broadcast().click(),
      "add new template broadcast"
    );
    cy.softAssert(
      cy
        .textboxNamaTemplate_addNewTemplate()
        .type("testingtemplate" + randomText),
      "add new template broadcast> nama template value"
    );
    cy.softAssert(
      cy
        .textboxPesanTemplate_addNewTemplate()
        .type("value testing template " + randomText + " " + randomText),
      "add new template broadcast> pesan value"
    );
    cy.softAssert(
      cy.buttonBatal_addNewTemplate().click(),
      "cancel create new template broadcast"
    );
  }

  navigateToInbox_resolved() {
    cy.inboxResolvedTab().click();
  }

  generateRandomChat() {}
}

export default broadcastPage;
