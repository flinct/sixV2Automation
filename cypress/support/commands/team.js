class elementTeam {
  //create team
  createMember() {
    return cy.get('[data-cy="Add-Member"]');
  }
  modalInviteMember() {
    return cy.contains("h2", "Tambah Anggota").closest('[role="dialog"]');
  }
  inviteMemberEmailPlaceholder() {
    return cy
      .contains("h2", "Tambah Anggota")
      .closest('[role="dialog"]')
      .find("div")
      .contains("div", /Masukkan alamat email anggota tim Anda/i);
  }
  inviteMemberEmailInput() {
    return cy
      .contains("h2", "Tambah Anggota")
      .closest('[role="dialog"]')
      .find("#react-select-2-input");
  }
  inviteMemberSelectRole() {
    return cy
      .contains("h2", "Tambah Anggota")
      .closest('[role="dialog"]')
      .find("button")
      .contains("span", /pilih peran/i);
  }
  inviteMemberSelectShift() {
    return cy
      .contains("h2", "Tambah Anggota")
      .closest('[role="dialog"]')
      .find("button")
      .contains("span", /pilih shift/i);
  }

  teamInboxTitle() {
    return cy.get("h3").contains(/Kotak Masuk Tim|team-inbox/i);
  }
  searchTeamName() {
    return cy.get("input");
    // .contains("span", /pilih shift/i);
  }

  elipsisIcon() {
    return cy.get("button:has(svg.tabler-icon-dots)");
  }
  elipsisChildEdit() {
    return cy
      .get('div[cmdk-item][role="option"]')
      .contains(/Edit Kotak Masuk Tim/i);
  }

  buttonSaveTeamInboc() {
    cy.contains("button", "Simpan");
  }
  editTeamInboxTitle() {
    return cy.get("h3").contains(/Kotak Masuk Tim|team-inbox/i);
  }
  editChannelTeamInbox() {
    return cy.get("button").contains(/Pilih saluran untuk terhubung/i);
  }
  searchChannelTeamInbox() {
    return cy.get("input[cmdk-input]");
  }
  selectChannelTeamInbox(value) {
    return cy.get("[cmdk-item]").find("span").contains(value);
  }

  editMemberTeamInbox() {
    return cy.contains("button", /Tambah anggota tim ke kotak masuk/i);
  }
  searchMemberTeamInbox() {
    return cy.get("input[cmdk-input]");
  }
  selectMemberTeamInbox(value) {
    return cy
      .get("[cmdk-item]")
      .find("span")
      .contains(value)
      .parents("[cmdk-item]");
  }
}
export default new elementTeam();
