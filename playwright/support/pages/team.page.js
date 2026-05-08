const { expect } = require('@playwright/test');

class TeamPage {
  constructor(page) {
    this.page = page;

    this.settingsNav = page.getByTestId('nav-link-Settings').or(page.getByText('Settings'));
    this.teamNav = page.getByTestId('nav-link-Team').or(page.getByText('Kelola Tim'));
    this.teamInboxNav = page.getByTestId('nav-link-Team-Inbox').or(page.getByText('Team Inbox'));

    this.createMemberButton = page.getByTestId('team-create-member');
    this.modalInviteMember = page.getByRole('dialog', { name: 'Tambah Anggota' });
    this.inviteMemberEmailInput = page.getByTestId('team-invite-email-input');
    this.inviteMemberSelectRole = page.getByTestId('team-invite-role-select');
    this.inviteMemberSelectShift = page.getByTestId('team-invite-shift-select');

    this.teamInboxTitle = page.getByTestId('team-inbox-title');
    this.searchTeamName = page.getByTestId('team-search-name');
    this.elipsisIcon = page.getByTestId('team-elipsis-icon');
    this.elipsisChildEdit = page.getByTestId('team-elipsis-edit');

    this.editTeamInboxTitle = page.getByTestId('team-edit-inbox-title');
    this.deleteChannelTeamInbox = page.getByTestId('team-delete-channel-inbox');
    this.editChannelTeamInbox = page.getByTestId('team-edit-channel-inbox');
    this.searchChannelTeamInbox = page.getByTestId('team-search-channel-inbox');
    this.selectChannelTeamInbox = (name) => page.getByText(name).first();

    this.deleteMemberTeamInbox = page.getByTestId('team-delete-member-inbox');
    this.editMemberTeamInbox = page.getByTestId('team-edit-member-inbox');
    this.searchMemberTeamInbox = page.getByTestId('team-search-member-inbox');
    this.selectMemberTeamInbox = (name) => page.getByText(name).first();

    this.buttonSaveTeamInbox = page.getByTestId('team-save-inbox');
  }

  async goto() {
    await this.page.goto('/settings/organization/members');
  }

  async accessTeamPage() {
    const url = this.page.url();
    if (!url.includes('/settings/organization/general')) {
      await this.settingsNav.click();
    }
    await this.teamNav.click();
  }

  async inviteNewMember(email, role = 'admin', shift = 'Standard Office Hours') {
    await this.createMemberButton.click();
    await expect(this.modalInviteMember).toBeVisible();
    await this.inviteMemberEmailInput.fill(email);
    await this.page.keyboard.press('Enter');

    await this.inviteMemberSelectRole.click();
    await this.page.getByText(new RegExp(role, 'i')).click();

    await this.inviteMemberSelectShift.click();
    await this.page.getByText(new RegExp(shift, 'i')).click();
  }

  async addMemberToTeamInbox(teamName, memberName) {
    await this.settingsNav.click();
    await this.teamInboxNav.click();

    await this.searchTeamName.fill(teamName);
    await this.elipsisIcon.click();
    await this.elipsisChildEdit.click();

    await this.editMemberTeamInbox.click();
    await this.searchMemberTeamInbox.fill(memberName);
    await this.selectMemberTeamInbox(memberName).click();

    await this.buttonSaveTeamInbox.click();
  }
}

module.exports = { TeamPage };
