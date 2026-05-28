Cypress.Commands.add("headLabelInbox", () => {
  // cy.get('body > main > main > section > div.sticky.top-0.z-50.flex.items-center.justify-between.border-b-\\[1px\\].bg-background.p-4.w-full > div.text-xl.font-bold')
  cy.xpath("/html[1]/body[1]/main[1]/main[1]/section[1]/div[1]/div[1]");
});
Cypress.Commands.add("labelPriorityMessage_Unread", () => {
  cy.get('[data-cy="inbox-filter-unread"]');
});
Cypress.Commands.add("labelPriorityMessage_Waiting", () => {
  cy.get('[data-cy="inbox-filter-waiting "]');
});
Cypress.Commands.add("buttonFilterForInboxMessage", () => {
  cy.xpath(
    '/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/button[1]/*[name()="svg"][1]/*[name()="path"][1]'
  );
});
Cypress.Commands.add("buttonFilterForInboxMessage_agent", () => {
  cy.xpath(
    "/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]"
  );
});
Cypress.Commands.add("buttonFilterForInboxMessage_label", () => {
  cy.xpath(
    "/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]"
  );
});
Cypress.Commands.add("buttonFilterForInboxMessage_divisi", () => {
  cy.xpath(
    "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]"
  );
});
Cypress.Commands.add("buttonSendMessage", () => {
  cy.get('[data-cy="submit-message-inbox-button"]');
});
Cypress.Commands.add("buttonAttachFile", () => {
  cy.get('[data-cy="inbox-media-attachment"]');
});
Cypress.Commands.add("buttonAttachFile_Img", () => {
  cy.get('[data-cy="inbox-button-media-upload"]');
});
Cypress.Commands.add("buttonAttachFile_Docs", () => {
  cy.get('[data-cy="inbox-button-docs-upload"]');
});
Cypress.Commands.add("dragNdropAreaInbox", () => {
  // cy.get("#containerChat");
  cy.get('input[type="file"]');
});
Cypress.Commands.add("textBoxArea_SendImg", () => {
  cy.get('[data-cy="media-input-field"]');
});
Cypress.Commands.add("listChatInbox", () => {
  cy.get('[data-cy^="chat-list-"]');
});
Cypress.Commands.add("emptyState_chatListInbox", () => {
  // cy.xpath('/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/p[1]')
  cy.get("div.mt-3.flex.flex-col.items-center.justify-center.space-y-3")
    .find("p")
    .contains("Belum Ada Pesan");
});
Cypress.Commands.add("inboxOngoingTab", () => {
  cy.get('[data-cy="inbox-tab-ongoing"]');
});
Cypress.Commands.add("inboxUnassignedTab", () => {
  cy.get('[data-cy="inbox-tab-unassigned"]');
});
Cypress.Commands.add("inboxResolvedTab", () => {
  cy.get('[data-cy="inbox-tab-resolved"]');
});
Cypress.Commands.add("chat_list", () => {
  cy.get('[data-cy^="chat-list-"]');
});
Cypress.Commands.add("history_chat_list", () => {
  cy.get('[data-cy^="room-history-list-"]');
});
Cypress.Commands.add("textbox_input_inbox", () => {
  cy.get('[data-cy="inbox-chatting-input"]');
});
Cypress.Commands.add("custumer_number", () => {
  cy.get('[data-cy="contact-name"]');
});
Cypress.Commands.add("custumer_profilePicture", () => {
  cy.get('[data-cy="contact-name"]').find("div").eq(0);
});
Cypress.Commands.add("handover_chat_button", () => {
  cy.get('[data-cy="handover-chat-button"]');
});
Cypress.Commands.add("resolved_chat_button", () => {
  cy.get(".bg-primary").contains("Resolved");
});
Cypress.Commands.add("opened_handover_modal", () => {
  cy.get('[data-cy="opened-handover-modal"]');
  // cy.get('[data-cy="bulk-handover-modal-container"]');
});
Cypress.Commands.add("inbox_chat_detail_tab", () => {
  cy.get('[data-cy="inbox-tab-chat-detail"]');
});
Cypress.Commands.add("inbox_chat_properties_tab", () => {
  cy.get('[data-cy="inbox-tab-properties"]');
});
Cypress.Commands.add("multiselect_agent_input_handover", () => {
  cy.get('[data-cy="multiselect-agent-input"]');
});
Cypress.Commands.add("container_chat_detail", () => {
  cy.get('[data-cy="container-chat-detail"]');
});
Cypress.Commands.add("inbox_tab_chat_detail", () => {
  cy.get('[data-cy="inbox-tab-chat-detail"]');
});
Cypress.Commands.add("inbox_tab_properties", () => {
  cy.get('[data-cy="inbox-tab-properties"]');
});
Cypress.Commands.add("inbox_container_label", () => {
  cy.get('[data-cy^="chat-detail-badge-"]');
});
Cypress.Commands.add("inbox_container_label_deleteButton", () => {
  cy.get('[data-cy^="chat-detail-badge-"]').find("div").eq(0);
});
Cypress.Commands.add("inbox_chat_detail_add_agents_label", () => {
  cy.contains("Add Agent");
});
Cypress.Commands.add("inbox_chat_detail_add_agents_batal", () => {
  cy.contains("Batal");
});
Cypress.Commands.add("inbox_chat_detail_add_agents_simpan", () => {
  cy.contains("Simpan");
});
Cypress.Commands.add("general_filter_Pilih_Agent", () => {
  cy.get('[data-cy="general-filter-Pilih Agent"]');
});
Cypress.Commands.add("inbox_chat_detail_all_agent", () => {
  // cy.get('[data-cy^="chat-detail-agent-"]');//[data-cy^="chat-detail-agent-"]
  cy.get('[data-cy*="chat-detail-agent-"]');
});
// Cypress.Commands.add('inbox_chat_detail_all_agent', () => {
//     // cy.get('[data-cy^="chat-detail-agent-"]');//[data-cy^="chat-detail-agent-"]
//     cy.get('[data-cy="chat-detail-agent-0"]');
// });
Cypress.Commands.add("inbox_chat_detail_removeAgent", () => {
  cy.get('[data-cy^="chat-detail-agent-"]').find("div");
});
Cypress.Commands.add("inbox_chat_detail_firstAgent", () => {
  cy.get('[data-cy^="chat-detail-agent-"]').eq(0);
});
Cypress.Commands.add("inbox_chat_detail_secondAgent", () => {
  cy.get('[data-cy^="chat-detail-agent-"]').eq(1);
});
Cypress.Commands.add("case_created_value", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[5]/div[1]/p[2]"
  );
});
Cypress.Commands.add("inbox_properties_container", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[3]/div[1]/p[1]"
  );
});
Cypress.Commands.add("inbox_comment_section", () => {
  cy.get('[data-cy ="container-inbox-comment-section"]');
});
Cypress.Commands.add("inbox_comment_section_textLabel", () => {
  cy.get('[data-cy ="container-inbox-comment-section"]').find("div").eq(0);
});
Cypress.Commands.add("inbox_comment_section_commentArea", () => {
  cy.get('[data-cy ="container-inbox-comment-section"]').find("div").eq(3);
});
Cypress.Commands.add("inbox_comment_section_commentInput", () => {
  cy.get('[data-cy ="container-inbox-comment-section"]').find("div").eq(6);
});
Cypress.Commands.add("inbox_comment_section_list", () => {
  cy.get('[data-cy^="comment-list-"]');
});
Cypress.Commands.add("inbox_roomHistory", () => {
  cy.contains("Room History");
});
Cypress.Commands.add("inbox_bubleMessage", () => {
  cy.get('[data-cy="buble-chat"]');
});
Cypress.Commands.add("inbox_messageDelivered", () => {
  cy.get('[data-cy = "inbox-status-chat-sent"]');
});
Cypress.Commands.add("notice_message", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]"
  );
});
Cypress.Commands.add("reopen_chatRoom", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/button[1]"
  );
});
Cypress.Commands.add("alert_Aliasses", () => {
  cy.contains("Nama Alias wajib diisi!");
});
Cypress.Commands.add("selectButton_assign", () => {
  // cy.get('p.text-xs').contains('Assign');
  cy.get(
    'button.bg-primary[type="button"][aria-haspopup="dialog"][aria-expanded="false"][data-state="closed"]'
  ).contains("Assign");
});
const customerNumber = "6280000000000";
Cypress.Commands.add("checkbox_chatList", () => {
  function formatNumber(customerNumber) {
    return customerNumber.replace(
      /(\d{2})(\d{3})(\d{4})(\d{4})/,
      "$1 $2 $3 $4"
    );
  }
  const formatted_customer_number = formatNumber(customerNumber);
  // cy.get('body', { timeout: 2000 }).then(($body) => {
  //     if ($body.find('[data-cy^="chat-list-"]').length > 0) {
  //         cy.contains('[data-cy^="chat-list-"]', formatted_customer_number).within(() => {
  // Click the first checkbox within the chat list item
  cy.get('button[role="checkbox"][data-state="unchecked"]').click({
    force: true,
  });
  //         });
  //     }
  // })
});
Cypress.Commands.add("checkbox_chatList_noState", () => {
  cy.get('button[role="checkbox"][aria-checked="true"][data-state="checked"]');
  // .click({ force: true });
});
// Cypress.Commands.add('assign_unassignedChat', () => {
//     cy.xpath('/html/body/div[2]/div[4]/button[2]').should('have.attr','type','button')
//         .contains('Assign')
// });
Cypress.Commands.add("bulk_handoverChat", () => {
  cy.get('button.border-primary[aria-controls^="radix-"]').contains("Handover");
});
Cypress.Commands.add("bulk_resolved", () => {
  cy.get('button[type="button"]').contains("Resolved");
});
Cypress.Commands.add("back_toPool", () => {
  cy.get('button[role="tab"][tabindex="-1"]').contains("Kembalikan ke Pool");
});
Cypress.Commands.add("more_opt", () => {
  cy.get('[data-cy="more-option-btn"]');
});
Cypress.Commands.add("delete_unassigned", () => {
  cy.get('[data-cy="delete-chat-btn"]');
});
Cypress.Commands.add("handover_unassigned", () => {
  cy.get('[data-cy="bulk-handover-unassigned-btn"]');
});
// Cypress.Commands.add("opened_handover_modal", () => { //duplicate
//   cy.get('[data-cy="opened-handover-modal"]');
// });
Cypress.Commands.add("btn_buka_kembali", () => {
  cy.get("button.inline-flex.items-center.justify-center")
    .contains("Buka Kembali")
    .click();
});
