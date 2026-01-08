//Navigation pannel
// [data-cy="settings-container-section"]

// [data-cy="settings-organization-container-section"]
// [data-cy="settings-organization-general"]
// [data-cy="settings-organization-roles"]
// [data-cy="settings-organization-team"]
// [data-cy="settings-organization-officeHours"]

// [data-cy="settings-general-nameTime-container-section"]
// [data-cy="settings-general-nameTime-organization-label"]
// [data-cy="settings-general-nameTime-organization-textInput"]
// [data-cy="settings-general-nameTime-organization-id-label"]
// [data-cy="settings-general-nameTime-organization-id-textInput"]
// [data-cy="settings-general-nameTime-language-label"]
// [data-cy="settings-general-nameTime-language-combo"]
// [data-cy="settings-general-deleteOrg-container-section"]
// [data-cy="settings-general-deleteOrg-confirm-label"]
// [data-cy="settings-general-deleteOrg-confirm-textInput"]

// [data-cy="settings-roles-listRole-container-section"]
// [data-cy="settings-roles-listRole-title"]
// [data-cy="settings-roles-listRole-addButton"]
// [data-cy="settings-roles-listRole-list-{index}"]
// [data-cy="settings-roles-setup-container-section"]
// [data-cy="settings-roles-setup-title"]
// [data-cy="settings-roles-setup-cancelButton"]
// [data-cy="settings-roles-setup-submitButton"]//save
// [data-cy="settings-roles-setup-updateButton"]
// [data-cy="settings-roles-setup-roleDetail-container-section"]
// [data-cy="settings-roles-setup-roleDetail-labelDescription"]
// [data-cy="settings-roles-setup-roleDetail-roleName-label"]
// [data-cy="settings-roles-setup-roleDetail-roleName-textInput"]
// [data-cy="settings-roles-setup-roleDetail-roleDesc-label"]
// [data-cy="settings-roles-setup-roleDetail-roleDesc-textInput"]
// [data-cy="settings-roles-setup-rolePermission-container-section"]
// [data-cy="settings-roles-setup-rolePermission-labelDescription"]
// [data-cy="settings-roles-setup-rolePermission-convo-subtitle"]
// [data-cy="settings-roles-setup-rolePermission-convo-access-all"]
// [data-cy="settings-roles-setup-rolePermission-convo-access-pulling"]
// [data-cy="settings-roles-setup-rolePermission-convo-access-handler"]
// [data-cy="settings-roles-setup-rolePermission-convo-access-team"]
// [data-cy="settings-roles-setup-rolePermission-settings-subtitle"]
// [data-cy="settings-roles-setup-rolePermission-settings-selectAll"]
// [data-cy="settings-roles-setup-rolePermission-settings-General"]
// [data-cy="settings-roles-setup-rolePermission-settings-user"]
// [data-cy="settings-roles-setup-rolePermission-settings-team"]
// [data-cy="settings-roles-setup-rolePermission-settings-widget"]
// [data-cy="settings-roles-setup-rolePermission-settings-whatsapp"]
// [data-cy="settings-roles-setup-rolePermission-settings-tags"]
// [data-cy="settings-roles-setup-rolePermission-inbox-subtitle"]
// [data-cy="settings-roles-setup-rolePermission-inbox-selectAll"]
// [data-cy="settings-roles-setup-rolePermission-inbox-macros"]
// [data-cy="settings-roles-setup-rolePermission-inbox-notes"]
// [data-cy="settings-roles-setup-rolePermission-inbox-handler"]
// [data-cy="settings-roles-setup-rolePermission-inbox-pinConvo"]
// [data-cy="settings-roles-setup-rolePermission-inbox-pinMessage"]
// [data-cy="settings-roles-setup-rolePermission-inbox-SLA"]
// [data-cy="settings-roles-setup-rolePermission-inbox-autoReply"]
// [data-cy="settings-roles-setup-rolePermission-inbox-viewClientData"]

// [data-cy="settings-team-title"]
// [data-cy="settings-team-addButtonMember"]
// [data-cy="settings-team-pageMember"]
// [data-cy="settings-team-pageInvited"]
// [data-cy="settings-team-searchbar"]
// [data-cy="settings-team-showFilter-presence"]
// [data-cy="settings-team-showFilter-role"]
// [data-cy="settings-team-showFilter-team"]
// [data-cy="settings-team-tableHead-container"]
// [data-cy="settings-team-listMember-container-{index}"]
// [data-cy="settings-team-listMember-checkbox-{index}"]
// [data-cy="settings-team-listMember-name-{index}"]
// [data-cy="settings-team-listMember-email-{index}"]
// [data-cy="settings-team-listMember-presence-{index}"]
// [data-cy="settings-team-listMember-role-{index}"]
// [data-cy="settings-team-listMember-moreOpt-{index}"]
// [data-cy="settings-team-listMember-modalOpt-container"]
// [data-cy="settings-team-listMember-modalChangeRole-container"]
// [data-cy="settings-team-listMember-modalChangeRole-currentRole-container"]
// [data-cy="settings-team-listMember-modalChangeRole-newRole-container"]
// [data-cy="settings-team-listMember-modalChangeRole-newRole-selector"]
// [data-cy="settings-team-listMember-modalChangeRole-manageRole-container"]
// [data-cy="settings-team-listMember-modalChangeRole-cancel"]
// [data-cy="settings-team-listMember-modalChangeRole-submit"]

// [data-cy="settings-inbox-container-section"]
// [data-cy="settings-inbox-team"]
// [data-cy="settings-inbox-assignment"]
// [data-cy="settings-inbox-tickets"]
// [data-cy="settings-inbox-SLA"]
// [data-cy="settings-inbox-tags"]

// [data-cy="settings-channels-container-section"]
// [data-cy="settings-channels-widget"]
// [data-cy="settings-channels-whatsappWeb"]

class elementSettings {
  settingContainer() {
    return cy.get('[data-cy="Setting-Sidebar-Navigation"]');
  }
  titleSetting() {
    return cy
      .get('[data-cy="Setting-Sidebar-Navigation"]')
      .find("div")
      .eq(0)
      .contains(/pengaturan|setting/i);
  }
  organizationSetting() {
    return cy
      .get('[data-cy="Setting-Sidebar-Navigation"]')
      .find("h3")
      .contains("button", /organisasi|organization/i);
  }
  organizationSettingGeneral() {
    return cy
      .get('[data-cy="Setting-Sidebar-Navigation"]')
      .find("a")
      .contains("button", /umum|general/i);
  }
  organizationSettingRole() {
    return cy
      .get('[data-cy="Setting-Sidebar-Navigation"]')
      .find("a")
      .contains("button", /peran|roles/i);
  }
  organizationSettingMember() {
    return cy
      .get('[data-cy="Setting-Sidebar-Navigation"]')
      .find("a")
      .contains("button", /anggota|members/i);
  }
  organizationSettingShift() {
    return cy
      .get('[data-cy="Setting-Sidebar-Navigation"]')
      .find("a")
      .contains("button", /jam shift|shift hours/i);
  }
  organizationSettingTags() {
    return cy
      .get('[data-cy="Setting-Sidebar-Navigation"]')
      .find("a")
      .contains("button", /penanda|tags/i);
  }
  conversationSetting() {
    return cy.get('[data-cy="Setting-Sidebar-Navigation"]');
  }
  channelSetting() {
    return cy.get('[data-cy="Setting-Sidebar-Navigation"]');
  }
  subscribeSetting() {
    return cy.get('[data-cy="Setting-Sidebar-Navigation"]');
  }
}
export default new elementSettings();
