import { forEach } from "async";
import { timeout } from "async";
import { action } from "commander";
import { env_config } from "../01_url_page.js";
import { timestamp } from "rxjs";
import { times } from "lodash";
import elementNavigation from "../commands/navigation.js";
import elementAuth from "../commands/auth.js";
import elementTicket from "../commands/ticketing.js";
import elementConversation from "../commands/inbox_.js";
import elementBroadcast from "../commands/broadcast.js";
import elementSettings from "../commands/settings.js";
import elementTeam from "../commands/team.js";
import { id } from "common-tags";

class teamPageAccess {
  visitDefault() {
    elementNavigation.defaultUrl();
    cy.viewport(1366, 768);
  }
  accessTeamPage() {
    cy.url().then((url) => {
      if (url.includes("/settings/organization/general")) {
        cy.log("ok");
      } else {
        elementNavigation.settingsNav().click();
      }
    });
    elementNavigation.teamNav().click();
  }
  inviteNewMember() {
    this.visitDefault();
    this.accessTeamPage();
    elementTeam.createMember().click();
    elementTeam.modalInviteMember();
    // elementTeam.inviteMemberEmailInput();
    elementTeam.inviteMemberEmailPlaceholder();
    elementTeam.inviteMemberEmailInput().type("email@email.com");
    cy.wait(1000);
    cy.focused().type("{enter}");
    // cy.contains("email@email.com").click();
    cy.wait(1000);
    elementTeam.inviteMemberSelectRole().click({ force: true });
    cy.wait(1000);
    cy.contains(/admin/i).click();
    elementTeam.inviteMemberSelectShift().click({ force: true });
    cy.wait(1000);
    cy.focused().click();
    cy.contains(/Standard Office Hours/i).click({ force: true });
  }
  addMemberToTeam() {
    this.visitDefault();
    elementNavigation.settingsNav().click();
    elementNavigation.teamInboxNav().click();

    elementTeam.teamInboxTitle();
    elementTeam.searchTeamName().type("cs");
    elementTeam.elipsisIcon().click();
    elementTeam.elipsisChildEdit().click();

    elementTeam.editTeamInboxTitle();
    elementTeam.editChannelTeamInbox().click();
    elementTeam.searchChannelTeamInbox().type("complain");
    elementTeam.selectChannelTeamInbox("complain").click();

    elementTeam.editMemberTeamInbox().click();
    elementTeam.searchMemberTeamInbox().type("chicken");
    elementTeam.selectMemberTeamInbox("chicken").click();

    elementTeam.buttonSaveTeamInboc();
  }
}

export default teamPageAccess;
