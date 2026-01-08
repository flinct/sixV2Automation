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
}
export default new elementTeam();
