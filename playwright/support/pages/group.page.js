const { expect } = require('@playwright/test');

class GroupPage {
  constructor(page) {
    this.page = page;

    this.groupNav = page.getByTestId('nav-link-Group').or(page.getByText('Group'));

    this.labelPriorityMessageUnread = page.getByTestId('inbox-filter-unread');
    this.searchbarGroupChat = page.getByTestId('group-chat-searchbar');
    this.searchbarGroupChatIcon = page.getByTestId('group-chat-searchbar-icon');

    this.listChatGroup = page.getByTestId(/^group-chat-list-/);
    this.firstListGroupChat = this.listChatGroup.first();

    this.groupNameSection = page.getByTestId('group-name-section');
    this.groupChatInput = page.getByTestId('group-chat-input');
    this.inboxMediaAttachment = page.getByTestId('inbox-media-attachment');
    this.emojiButton = page.getByTestId('emoji-button');
    this.bubleChat = page.getByTestId('buble-chat');

    this.detailGroupName = page.getByTestId('detail-group-name');
    this.detailGroupNameValue = page.getByTestId('detail-group-name-value');
    this.detailGroupAgent = page.getByTestId('detail-group-agent');
    this.detailGroupAgentValue = page.getByTestId('detail-group-agent-value');
    this.detailGroupTextLabel = page.getByTestId('detail-group-text-label');
    this.detailGroupLabelList = page.getByTestId('detail-group-label-list');
    this.detailGroupLabelButtonDelete = page.getByTestId('detail-group-label-button-delete');
    this.detailGroupLabelButtonAdd = page.getByTestId('detail-group-label-button-add');

    this.detailGroupTiketCounter = page.getByTestId('detail-group-ticket-counter');
    this.detailGroupTiketDirectOngoing = page.getByTestId('detail-group-ticket-direct-ongoing');
    this.detailGroupTiketDirectSolved = page.getByTestId('detail-group-ticket-direct-solved');

    this.detailGroupTiketAktif = page.getByTestId('detail-group-ticket-active');
    this.detailGroupListTiketAktif = page.getByTestId('detail-group-list-ticket-active');
    this.detailGroupDirectToTicketing = page.getByTestId('detail-group-direct-to-ticketing');

    this.detailGroupListNotes = page.getByTestId('detail-group-list-notes');
    this.detailGroupListNotesInput = page.getByTestId('detail-group-list-notes-input');

    this.copyValueBubbleMessage = page.getByText('Copy');
    this.replyBubbleMessage = page.getByText('Reply');
    this.selectBubbleMessage = page.getByText('Select');

    this.emptyState = page.getByTestId('empty-state');
    this.listTicketActive = page.getByTestId(/^active-ticket-list-/);
  }

  async goto() {
    await this.page.goto('/group');
  }

  async navigateToGroupChat() {
    await this.groupNav.click();
  }

  async verifyGroupChatElements() {
    await expect.soft(this.groupNav).toBeVisible();
    await expect.soft(this.searchbarGroupChat).toBeVisible();
    await expect.soft(this.labelPriorityMessageUnread).toBeVisible();
  }

  async openFirstGroupChat() {
    await this.firstListGroupChat.click();
  }

  async sendGroupMessage(message) {
    await this.groupChatInput.fill(message);
    await this.page.keyboard.press('Enter');
  }

  async rightClickFirstBubble() {
    const firstBubble = this.bubleChat.first();
    await firstBubble.click({ button: 'right' });
  }
}

module.exports = { GroupPage };
