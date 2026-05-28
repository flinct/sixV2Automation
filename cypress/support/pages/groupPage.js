import { timeout } from "async";

const baseUrl = Cypress.config("baseUrl");
const emptyStateTicketActive = '[data-cy="empty-state"]';
const listTicketActive = '[data-cy^="active-ticket-list-"]';
class groupPage {
  elementCheckingGroupPage() {
    cy.softAssert(cy.nav_link_Group().click(), "navigate to group chat");
    cy.wait(1000);
    cy.url().then((url) => {
      // if (url === "https://dev.example.test/group") {
      if (
        /^(https:\/\/(dev|staging|ticketing)\.satuinbox\.com\/group)$/.test(url)
      ) {
        cy.wait(1000);
        cy.log("success direct to group chat page");
      } else {
        cy.log("failed direct to group chat page");
      }
    });
    cy.softAssert(cy.userLoginNameLabel().click(), "User section setting");
    cy.document().wait(800).trigger("keydown", { key: "Escape" });
    // cy.softAssert(
    //   cy
    //     .textLabel_groupChat()
    //     .wait(800)
    //     // .should('be.visible')
    //     .contains("Group"),
    //   "get H1 text label group page"
    // );
    cy.softAssert(
      cy.labelPriorityMessage_Unread().should("be.visible"),
      "group chat > filter unread message"
    );
    cy.softAssert(
      cy.searchbar_groupChat().should("be.visible"),
      "group chat > get searchbar"
    );
    cy.softAssert(
      cy.searchbar_groupChat_icon().should("be.visible"),
      "group chat > get searchbar icon"
    );
    cy.softAssert(
      cy.listChatGroup().should("be.visible"),
      "get list group chat"
    );
    cy.softAssert(
      cy.firstList_groupChat().click(),
      "group chat > click first list"
    );
    cy.softAssert(
      cy.group_name_section().should("be.visible"),
      "group chat > get group name"
    );
    cy.softAssert(
      cy.group_chat_input().should("be.visible").type("test Typing"),
      "group chat > group chat input"
    );
    cy.softAssert(
      cy.inbox_media_attachment().should("be.visible"),
      "group chat > attachment media group chat"
    );
    cy.softAssert(
      cy.emoji_button().should("be.visible"),
      "group chat > emoji button"
    );
    cy.softAssert(
      cy.buble_chat().should("be.visible"),
      "group chat > message bubble"
    );
    cy.softAssert(
      cy.detail_group_name().should("be.visible"),
      "group chat > detail grup > textLabel"
    );
    cy.softAssert(
      cy.detail_group_name_value().should("be.visible"),
      "group chat > detail grup > name value"
    );
    cy.softAssert(
      cy.detail_group_agent().should("be.visible"),
      "group chat > detail grup > agent textLabel"
    );
    cy.softAssert(
      cy.detail_group_agent_value().should("be.visible"),
      "group chat > detail grup > agent value"
    );
    cy.softAssert(
      cy.detail_group_textLabel().should("be.visible"),
      "group chat > detail grup > label textLabel"
    );
    cy.softAssert(
      cy.detail_group_label_list().should("be.visible"),
      "group chat > detail grup > label value"
    );
    cy.softAssert(
      cy.detail_group_label_button_delete().should("be.visible"),
      "group chat > detail grup > delete label button"
    );
    cy.softAssert(
      cy.detail_group_label_button_add().should("be.visible"),
      "group chat > detail grup > add label button"
    );
    cy.softAssert(
      cy.detail_group_tiket_counter().should("be.visible"),
      "group chat > detail grup > tiket counter textLabel"
    );
    cy.softAssert(
      cy.detail_group_tiket_directOngoing().should("be.visible"),
      "group chat > detail grup > tiket counter ongoing"
    );
    cy.softAssert(
      cy.detail_group_tiket_directSolved().should("be.visible"),
      "group chat > detail grup > tiket counter solved"
    );
    cy.softAssert(
      cy.detail_group_tiketAktif().should("be.visible"),
      "group chat > tiket aktif"
    );
    cy.get("body", { timeout: 2000 }).then(($body) => {
      if ($body.find(listTicketActive).length) {
        cy.log("a");
        cy.softAssert(
          cy.detail_group_list_tiketAktif(),
          "get list ticket active at group chat"
        );
      } else {
        cy.log("b");
        cy.softAssert(
          cy.detail_group_direct_to_ticketing_emptyState(),
          " get empty state list ticket active at group chat"
        );
      }
    });
    // cy.softAssert(
    //   cy.detail_group_direct_to_ticketing().should("be.visible"),
    //   "group chat > tiket aktif > direct to ticketing"
    // );
    // cy.get("body", { timeout: 2000 }).then((body) => {
    //   cy.xpath(
    //     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[2]/div[2]/p[1]"
    //   ).then(($element) => {
    //     if ($element.length) {
    //       cy.softAssert(
    //         cy.detail_group_list_tiketAktif_emptyState(),
    //         "group chat > tiket list > empty state "
    //       );
    //     } else {
    //       cy.log("get list latest tiket aktif");
    //     }
    //   });
    // });

    cy.softAssert(cy.detail_group_list_notes(), "group chat > notes");
    cy.softAssert(
      cy.detail_group_list_notes_input(),
      "group chat > notes > input"
    );
    cy.softAssert(
      cy.buble_chat().first().rightclick(),
      "group chat > message bubble"
    );
    cy.wait(1000);
    cy.softAssert(
      cy.copy_value_bubbleMessage().should("be.visible"),
      "group chat > message bubble > copy value"
    );
    cy.softAssert(
      cy.reply_bubbleMessage().should("be.visible"),
      "group chat > message bubble > reply a message"
    );
    cy.softAssert(
      cy.select_bubbleMessage().should("be.visible"),
      "group chat > message bubble > select bubble chat"
    );

    let copiedText = "";

    cy.window()
      .then((win) => {
        cy.stub(win.navigator.clipboard, "writeText").callsFake((text) => {
          copiedText = text;
          return Promise.resolve();
        });
      })
      .then(() => {
        cy.softAssert(
          cy.copy_value_bubbleMessage().click(),
          "group chat > message bubble > copy value"
        );
      })
      .then(() => {
        expect(copiedText).to.not.equal("");

        cy.group_chat_input().clear().type(copiedText);
      });
  }

  navigateToGroupChat() {
    cy.softAssert(cy.nav_link_Group().click(), "navigate to group chat");
  }
}

export default groupPage;
