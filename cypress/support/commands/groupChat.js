Cypress.Commands.add("listChatGroup", () => {
  // cy.get('[data-cy ="container-inbox-comment-section"]').find('div').eq(6);
  cy.xpath(
    "/html[1]/body[1]/main[1]/section[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]"
  );
});
Cypress.Commands.add("firstList_groupChat", () => {
  cy.get('[data-cy^="data-list-"]').eq(0);
});
Cypress.Commands.add("textLabel_groupChat", () => {
  // cy.get('[data-cy ="container-inbox-comment-section"]').find('div').eq(6);
  cy.xpath("/html[1]/body[1]/main[1]/main[1]/section[1]/div[1]/div[1]");
});
Cypress.Commands.add("searchbar_groupChat", () => {
  // cy.get('[data-cy ="container-inbox-comment-section"]').find('div').eq(6);
  cy.get('input[placeholder="Cari nama, nomor, atau keyword chat"]');
});
Cypress.Commands.add("searchbar_groupChat_icon", () => {
  // cy.get('[data-cy ="container-inbox-comment-section"]').find('div').eq(6);
  cy.get(
    "svg.iconify.iconify--ic.text-2xl.absolute.right-2.top-1\\/2.-translate-y-1\\/2.transform"
  );
});
Cypress.Commands.add("group_name_section", () => {
  cy.get('[data-cy ="group-name"]');
});
Cypress.Commands.add("group_chat_container", () => {
  // cy.get('[data-cy ="group-name"]');
  cy.xpath(
    `/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]`
  );
});
Cypress.Commands.add("group_chat_input", () => {
  cy.get('[data-cy ="group-chatting-input"]');
});
Cypress.Commands.add("inbox_media_attachment", () => {
  cy.get('[data-cy ="inbox-media-attachment"]');
});
Cypress.Commands.add("detail_group_name", () => {
  cy.get('[data-cy ="detail-group-container"]').find("p").eq(0);
});
Cypress.Commands.add("detail_group_name_value", () => {
  cy.get('[data-cy ="detail-group-container"]').find("p").eq(1);
});
Cypress.Commands.add("detail_group_agent", () => {
  cy.get('[data-cy ="detail-group-container"]').find("p").eq(2);
});
Cypress.Commands.add("detail_group_agent_value", () => {
  cy.get('[data-cy ="detail-group-container"]').find("div").eq(2);
});
Cypress.Commands.add("detail_group_textLabel", () => {
  cy.get('[data-cy ="detail-group-container"]').find("p").eq(3);
});
Cypress.Commands.add("detail_group_label_list", () => {
  cy.get('[data-cy ="detail-group-container"]').find("div").eq(7);
});
Cypress.Commands.add("detail_group_label_button_delete", () => {
  cy.get('[data-cy ="detail-group-container"]').find("div").eq(9);
});
Cypress.Commands.add("detail_group_label_button_add", () => {
  cy.get('[data-cy ="detail-group-container"]').find("div").eq(10);
});
Cypress.Commands.add("detail_group_tiket_counter", () => {
  cy.get('[data-cy ="detail-group-container"]').find("div").eq(12);
});
Cypress.Commands.add("detail_group_tiket_directOngoing", () => {
  cy.get('[data-cy ="detail-group-container"]').find("a").eq(0);
});
Cypress.Commands.add("detail_group_tiket_directSolved", () => {
  cy.get('[data-cy ="detail-group-container"]').find("a").eq(1);
});
Cypress.Commands.add("detail_group_tiketAktif", () => {
  cy.get('[data-cy="active-ticket-container"]').contains("Tiket Aktif");
});
Cypress.Commands.add("detail_group_direct_to_ticketing_emptyState", () => {
  cy.get('[data-cy="empty-state"]').contains("Belum Ada Tiket");
});
Cypress.Commands.add("detail_group_direct_to_ticketing", () => {
  cy.get('[data-cy^="active-ticket-list-0"]');
});
Cypress.Commands.add("detail_group_list_tiketAktif", () => {
  cy.get('[data-cy^="active-ticket-list-"]');
});
// Cypress.Commands.add("detail_group_list_tiketAktif_emptyState", () => {
//   cy.xpath(
//     "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[2]/div[2]/p[1]"
//   );
// });
Cypress.Commands.add("detail_group_list_notes", () => {
  cy.get('[data-cy="group-notes-container"]');
});
Cypress.Commands.add("detail_group_list_notes_input", () => {
  cy.get('[data-cy="group-notes-input"]');
});
Cypress.Commands.add("copy_value_bubbleMessage", () => {
  // cy.xpath('');
  cy.contains("Copy");
});
Cypress.Commands.add("reply_bubbleMessage", () => {
  // cy.xpath('');
  cy.contains("Balas");
});
Cypress.Commands.add("select_bubbleMessage", () => {
  // cy.xpath('');
  cy.contains("pilih");
});
