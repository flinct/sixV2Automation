class elementConversation {
  //new inbox data-cy
  //navigation filter inbox
  conversationSidebarNavigation() {
    return cy.get('[data-cy="Conversation-Sidebar-Navigation"]');
  }

  titleNav() {
    return cy.get('[data-cy="nav-filter-navName"]');
  }

  yourInboxNav() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .find("button")
      .eq(0);
  }

  inboxUnassignedNav() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .find("button")
      .eq(1);
  }

  // navFilterInboxClosed() {
  //   return cy.get('[data-cy="nav-filter-inbox-closed"]');
  // }

  inboxAllNav() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .find("button")
      .eq(2);
  }

  inboxStarredNav() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .find("button")
      .eq(4);
  }

  inboxSpamNav() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .find("button")
      .eq(3);
  }

  inboxJunkNav() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .find("button")
      .eq(5);
  }

  groupChatNav() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .contains("h3", /saluran|channel/i)
      .next()
      .find("button")
      .contains(/wa web group/i);
  }

  // ─── CHANNEL ─────────────────────────────────────
  navFilterChannelContainerSection() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .contains("h3", /saluran|channel/i)
      .parent()
      .find("div");
    // .contains(/whatsapp web/i);
  }

  navFilterChannelLivechat() {
    return cy.get('[data-cy="nav-filter-channel-livechat"]');
  }

  navFilterChannelWhatsapp() {
    return cy.get('[data-cy="nav-filter-channel-whatsapp"]');
  }

  navFilterChannelWhatsappUnoff() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .contains("h3", /saluran|channel/i)
      .next()
      .find("button")
      .contains(/whatsapp web/i);
  }

  navFilterChannelInstagram() {
    return cy.get('[data-cy="nav-filter-channel-instagram"]');
  }

  navFilterChannelEmail() {
    return cy.get('[data-cy="nav-filter-channel-email"]');
  }

  // ─── TEAM ─────────────────────────────────────
  navFilterTeamContainerSection() {
    return cy.get('[data-cy="nav-filter-team-container-section"]');
  }

  // navFilterTeamLabel(index) {
  navFilterTeamLabel() {
    return cy
      .get('[data-cy="Conversation-Sidebar-Navigation"]')
      .contains("h3", /kotak masuk tim|team inbox/i)
      .next()
      .find("button")
      .eq(0);
    // .contains(/whatsapp web/i);
    return cy.get(`[data-cy="nav-filter-team-${index}-label"]`);
  }

  // ─── CHAT LIST ─────────────────────────────────────
  chatListEmptyState() {
    return cy.get('[data-cy="Conversation-Chat-List-Container"]');
  }
  chatListTitle() {
    return cy.get('[data-cy="Conversation-Chat-List-Header"]').find("h1");
  }
  chatListNavPanelControlButton() {
    return cy
      .get('[data-cy="Conversation-Chat-List-Header"]')
      .find("svg")
      .eq(0);
  }
  chatListSearchFilter() {
    return cy.get('[data-cy="Conversation-Chat-List-Header"]').find("button");
  }
  openFilterSearch() {
    return cy.get('[data-cy="Conversation-Chat-List-Container"]').find("input");
  }
  closeFilterSearch() {
    return cy
      .get('[data-cy="Conversation-Chat-List-Container"]')
      .find("button")
      .eq(0);
  }

  chatListFilterDeliveryMessageStatus() {
    return cy
      .get('[data-cy="Conversation-Chat-List-Container"]')
      .find("div")
      .eq(5)
      .find("button")
      .eq(0);
  }
  chatListFilterReadConversation() {
    return cy
      .get('[data-cy="Conversation-Chat-List-Container"]')
      .find("div")
      .eq(5)
      .find("button")
      .eq(1);
  }
  chatListFilterSort() {
    return cy
      .get('[data-cy="Conversation-Chat-List-Container"]')
      .find("div")
      .eq(6)
      .find("button")
      .eq(0);
  }
  chatListFilterVisibility() {
    return cy
      .get('[data-cy="Conversation-Chat-List-Container"]')
      .find("div")
      .eq(6)
      .find("button")
      .eq(1);
  }
  chatListFilterAdvance() {
    return cy
      .get('[data-cy="Conversation-Chat-List-Container"]')
      .find("div")
      .eq(6)
      .find("button")
      .eq(2);
  }
  closePopupFIlterButton() {
    return cy.get('[data-slot="dialog-close"]');
  }

  chatListContainer() {
    return cy.get('[data-cy="Conversation-Chat-List-Container"]');
  }
  chatListClientContainer(index, option = {}) {
    return cy.get(`[data-cy="chat-list-${index}"]`, option);
    // return cy.get(`[data-cy="Conversation-Chat-List-Container"]`).eq({index});
  }
  chatListClientAccountChannelNumber(index, option = {}) {
    return cy.get(`[data-cy="chat-list-${index}"]`, option).find("span").eq(2);
    // return cy.get(`[data-cy="Conversation-Chat-List-Container"]`).eq({index});
  }

  chatListClientName() {
    return cy.get('[data-cy="chatList-client-name"]');
  }

  chatListClientInitial() {
    return cy.get('[data-cy="chatList-client-initial"]');
  }

  chatListClientButtonChecked() {
    return cy.get('[data-cy="chatList-client-buttonChecked"]');
  }

  chatListClientSourceIcon() {
    return cy.get('[data-cy="chatList-client-sourceIcon"]');
  }

  chatListClientStarredIndicator() {
    return cy.get('[data-cy="chatList-client-starred-indicator"]');
  }

  chatListClientSLAIndicator() {
    return cy.get('[data-cy="chatList-client-SLA-indicator"]');
  }

  chatListClientTimestamp() {
    return cy.get('[data-cy="chatList-client-timestamp"]');
  }

  chatListClientDeliveryMessageStatus() {
    return cy.get('[data-cy="chatList-client-deliveryMessageStatus"]');
  }

  chatListClientLatestMsg() {
    return cy.get('[data-cy="chatList-client-latestMsg"]');
  }

  chatListClientCounterMessage() {
    return cy.get('[data-cy="chatList-client-counterMessage"]');
  }

  chatListClientTags() {
    return cy.get('[data-cy="chatList-client-tags"]');
  }

  chatListClientWhatsappNumber() {
    return cy.get('[data-cy="chatList-client-whatsappNumber"]');
  }

  chatListPullConversationButton() {
    return cy.get('[data-cy="chatList-pullConversationButton"]');
  }

  chatListPullConversationButtonValueSetter() {
    return cy.get('[data-cy="chatList-pullConversationButton-valueSetter"]');
  }

  // ─── CHAT SECTION ─────────────────────────────────────
  chatRoom() {
    return cy.get("#conversation-screenshot-chatroom-capture-area");
    // return cy.get('[data-cy="chatSection-clientName"]');
  }
  chatSectionClientName() {
    return cy.get('[data-cy="chatSection-clientName"]');
  }
  chatSectionClientNameInitial() {
    return cy.get('[data-cy="chatSection-clientName-initial"]');
  }
  chatSectionClientOnlineStatus() {
    return cy.get('[data-cy="chatSection-clientName-initial-onlineStatus"]');
  }
  chatSectionMoreButton() {
    return cy.get('[data-cy="chatSection-moreButton"]');
  }
  chatSectionButtonChangeStatus() {
    return cy.get('[data-cy="chatSection-button-changeStatus"]');
  }

  chatSectionChatRoomContainer() {
    return cy.get('[data-cy="chatSection-chatRoom-container"]');
  }
  chatSectionBubbleChatCustomer(index) {
    return cy.get(`#conversation-buble.items-start`).eq(index);
  }
  chatSectionBubbleChatCustomerName(index) {
    return cy
      .get(`#conversation-buble.items-start`)
      .eq(index)
      .find("span")
      .eq(0);
  }
  chatSectionBubbleChatCustomerNumber(index) {
    return cy
      .get(`#conversation-buble.items-start`)
      .eq(index)
      .find("span")
      .eq(1);
  }
  chatSectionBubbleChatCustomerMessage(index) {
    return cy
      .get(`#conversation-buble.items-start`)
      .eq(index)
      .find("span.whitespace-pre-wrap"); //.eq(2)
  }
  chatSectionBubbleChatCustomerMessageTimestamp(index) {
    return cy.get(`#conversation-buble.items-start`).eq(index).find("p");
  }

  chatSectionBubbleChatAgent(index) {
    return cy.get(`#conversation-buble.items-end`).eq(index);
  }
  chatSectionBubbleChatAgentMessage(index) {
    return cy
      .get(`#conversation-buble.items-end`)
      .eq(index)
      .find("span.whitespace-pre-wrap");
  }
  chatSectionBubbleChatAgentName(index) {
    return cy.get(`#conversation-buble.items-end`).eq(index).find("span").eq(0);
  }
  chatSectionBubbleChatAgentNumber(index) {
    return cy.get(`#conversation-buble.items-end`).eq(index).find("span").eq(1);
  }
  chatSectionBubbleChatAgentTimestamp(index) {
    return cy.get(`#conversation-buble.items-end`).eq(index).find("p");
  }
  chatSectionBubbleChatAgentMessageStatus(index) {
    return cy
      .get(`#conversation-buble.items-end`)
      .eq(index)
      .find("svg.tabler-icon.tabler-icon-checks")
      .eq(0)
      .should("have.class", "text-slate-500");
  }
  chatSectionBubbleChatAgentMessageStatus_read(index) {
    return cy
      .get(`#conversation-buble.items-end`)
      .eq(index)
      .find("svg.tabler-icon.tabler-icon-checks")
      .eq(0)
      .should("have.class", "text-green-600");
  }

  chatSectionBubbleChatTimestamp(index) {
    return cy.get(`[data-cy="chatSection-buble-chat-${index}-timestamp"]`);
  }

  chatSectionBubbleChatDeliveryStatus(index) {
    return cy.get(
      `[data-cy="chatSection-buble-chat-${index}-deliveryMessageStatus"]`,
    );
  }

  chatSectionTypingIndicator() {
    return cy.get('[data-cy="chatSection-buble-chat-typingIndicator"]');
  }

  chatSectionTextbox() {
    return cy.get('[data-cy="chatSection-textbox"]');
  }

  chatSectionTextboxAttachButton() {
    return cy.get('[data-cy="chatSection-textbox-button-attch"]');
  }

  chatSectionTextboxEmojiButton() {
    return cy.get('[data-cy="chatSection-textbox-button-emoji"]');
  }

  chatSectionTextboxSendChatButton() {
    return cy.get('[data-cy="chatSection-textbox-button-sendChat"]');
  }

  // ─── CHAT DETAILS ─────────────────────────────────────
  chatDetailContainerSection() {
    return cy.get('[data-cy="chatDetail-container-scetion"]');
  }

  chatDetailLabel() {
    return cy.get('[data-cy="chatDetail-label"]');
  }

  chatDetailTeamLabel() {
    return cy.get('[data-cy="chatDetail-team-label"]');
  }

  chatDetailTeamValue() {
    return cy.get('[data-cy="chatDetail-team-value"]');
  }

  chatDetailHandlerLabel() {
    return cy.get('[data-cy="chatDetail-handler-label"]');
  }

  chatDetailHandlerValue(index) {
    return cy.get(`[data-cy="chatDetail-handler-value-${index}"]`);
  }

  chatDetailResponseTimeLabel() {
    return cy.get('[data-cy="chatDetail-responseTime-label"]');
  }

  chatDetailResponseTimeValue() {
    return cy.get('[data-cy="chatDetail-responseTime-value"]');
  }

  chatDetailCloseTimeLabel() {
    return cy.get('[data-cy="chatDetail-closeTime-label"]');
  }

  chatDetailCloseTimeValue() {
    return cy.get('[data-cy="chatDetail-closeTime-value"]');
  }

  // ─── CONVERSATION ATTRIBUTES ─────────────────────────────────────
  chatDetailConvAttrContainerSection() {
    return cy.get('[data-cy="chatDetail-conv-attr-container-section"]');
  }

  chatDetailConvAttr(index) {
    return cy.get(`[data-cy="chatDetail-conv-attr-${index}"]`);
  }

  chatDetailConvAttrDisplayAll() {
    return cy.get('[data-cy="chatDetail-conv-attr-displayAll"]');
  }

  // ─── CLIENT DATA ─────────────────────────────────────
  chatDetailClientDataContainerSection() {
    return cy.get('[data-cy="chatDetail-clientData-container-section"]');
  }

  chatDetailClientDataName() {
    return cy.get('[data-cy="chatDetail-clientData-name"]');
  }

  chatDetailClientDataNameValue() {
    return cy.get('[data-cy="chatDetail-clientData-name-value"]');
  }

  chatDetailClientDataNumber() {
    return cy.get('[data-cy="chatDetail-clientData-number"]');
  }

  chatDetailClientDataNumberValue() {
    return cy.get('[data-cy="chatDetail-clientData-number-value"]');
  }

  chatDetailClientDataEmail() {
    return cy.get('[data-cy="chatDetail-clientData-email"]');
  }

  chatDetailClientDataEmailValue() {
    return cy.get('[data-cy="chatDetail-clientData-email-value"]');
  }

  chatDetailClientDataLocation() {
    return cy.get('[data-cy="chatDetail-clientData-location"]');
  }

  chatDetailClientDataLocationValue() {
    return cy.get('[data-cy="chatDetail-clientData-location-value"]');
  }

  chatDetailClientDataOS() {
    return cy.get('[data-cy="chatDetail-clientData-os"]');
  }

  chatDetailClientDataOSValue() {
    return cy.get('[data-cy="chatDetail-clientData-os-value"]');
  }

  chatDetailClientDataBrowser() {
    return cy.get('[data-cy="chatDetail-clientData-browser"]');
  }

  chatDetailClientDataBrowserValue() {
    return cy.get('[data-cy="chatDetail-clientData-browser-value"]');
  }

  // ─── TAGS ─────────────────────────────────────
  chatDetailTagsContainerSection() {
    return cy.get('[data-cy="chatDetail-tags-container-section"]');
  }

  chatDetailTags(index) {
    return cy.get(`[data-cy="chatDetail-tags-${index}"]`);
  }

  // ─── NOTES ─────────────────────────────────────
  chatDetailNotesContainerSection() {
    return cy.get('[data-cy="chatDetail-notes-container-section"]');
  }

  chatDetailNotesMessage(index) {
    return cy.get(`[data-cy="chatDetail-notes-message-${index}"]`);
  }

  chatDetailNotesMessagePinned(index) {
    return cy.get(`[data-cy="chatDetail-notes-message-${index}-pinned"]`);
  }

  chatDetailNotesMessageDisplayAll() {
    return cy.get('[data-cy="chatDetail-notes-message-displayAll"]');
  }

  // ─── PINNED MESSAGE ─────────────────────────────────────
  chatDetailPinnedMessageContainerSection() {
    return cy.get('[data-cy="chatDetail-pinnedMessage-container-section"]');
  }

  chatDetailPinnedMessageValue(index) {
    return cy.get(`[data-cy="chatDetail-pinnedMessage-value-${index}"]`);
  }

  chatDetailPinnedMessageDisplayAll() {
    return cy.get('[data-cy="chatDetail-pinnedMessage-displayAll"]');
  }

  // ─── CONVERSATION HISTORY ─────────────────────────────────────
  chatDetailConvoHistoryContainerSection() {
    return cy.get('[data-cy="chatDetail-convoHistory-container-section"]');
  }

  chatDetailConvoHistoryValue(index) {
    return cy.get(`[data-cy="chatDetail-convoHistory-value-${index}"]`);
  }

  chatDetailConvoHistoryDisplayAll() {
    return cy.get('[data-cy="chatDetail-convoHistory-displayAll"]');
  }

  // ─── MEDIA ─────────────────────────────────────
  chatDetailMediaContainerSection() {
    return cy.get('[data-cy="chatDetail-media-container-section"]');
  }

  chatDetailMediaList(index) {
    return cy.get(`[data-cy="chatDetail-media-list-${index}"]`);
  }

  chatDetailMediaDisplayAll() {
    return cy.get('[data-cy="chatDetail-media-displayAll"]');
  }

  // ─── FILES ─────────────────────────────────────
  chatDetailFilesContainerSection() {
    return cy.get('[data-cy="chatDetail-files-container-section"]');
  }

  chatDetailFilesList(index) {
    return cy.get(`[data-cy="chatDetail-files-list-${index}"]`);
  }

  chatDetailFilesDisplayAll() {
    return cy.get('[data-cy="chatDetail-files-displayAll"]');
  }

  // ─── CONVERSATION LOGS ─────────────────────────────────────
  chatDetailConvoLogsContainerSection() {
    return cy.get('[data-cy="chatDetail-convoLogs-container-section"]');
  }

  chatDetailConvoLogsList(index) {
    return cy.get(`[data-cy="chatDetail-convoLogs-list-${index}"]`);
  }

  chatDetailConvoLogsDisplayAll() {
    return cy.get('[data-cy="chatDetail-convoLogs-displayAll"]');
  }

  // ─── SCREENSHOT ─────────────────────────────────────
  chatDetailScreenshotContainerSection() {
    return cy.get('[data-cy="chatDetail-screenshot-container-section"]');
  }

  chatDetailScreenshotList(index) {
    return cy.get(`[data-cy="chatDetail-screenshot-list-${index}"]`);
  }

  chatDetailScreenshotDisplayAll() {
    return cy.get('[data-cy="chatDetail-screenshot-displayAll"]');
  }
}
export default new elementConversation();
