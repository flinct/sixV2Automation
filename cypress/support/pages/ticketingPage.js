import { timeout } from "async";

const baseUrl = Cypress.config("baseUrl");

class ticketingPage {
  elementCheckingTicketingPage() {
    cy.softAssert(cy.nav_link_Ticket().click(), "navigate to group chat");
    cy.wait(1000);
    cy.url().then((url) => {
      if (url === "https://dev.example.test/ticket") {
        cy.wait(1000);
        cy.log("success direct to group chat page");
      } else {
        cy.log("failed direct to group chat page");
      }
    });
    cy.softAssert(cy.userLoginNameLabel().click(), "User section setting");
    cy.document().wait(800).trigger("keydown", { key: "Escape" });
    cy.softAssert(
      cy.monitoringTicket_headLabel().should("be.visible"),
      "head Label ticketing"
    );
    cy.softAssert(
      cy.monitoringTicket_moreAction().should("be.visible"),
      "more action button at ticketing"
    );
    cy.softAssert(
      cy.monitoringTicket_createTicket().should("be.visible"),
      "create new ticket"
    );

    cy.softAssert(
      cy.monitoringTicket_newTicket().should("be.visible"),
      "new ticket statistic counter"
    );
    cy.softAssert(
      cy.monitoringTicket_semuaTicket().should("be.visible"),
      "semua ticket statistic counter"
    );
    cy.softAssert(
      cy.monitoringTicket_butuhResponse().should("be.visible"),
      "butuh response statistic counter"
    );
    cy.softAssert(
      cy.monitoringTicket_sedangDItangani().should("be.visible"),
      "sedang ditangani statistic counter"
    );
    cy.softAssert(
      cy.monitoringTicket_overSLA().should("be.visible"),
      "over SLA statistic counter"
    );
    cy.softAssert(
      cy.monitoringTicket_solvedTicket().should("be.visible"),
      "ticket selesai statistic counter"
    );

    cy.softAssert(
      cy.searchbar_atTicket().should("be.visible"),
      "searchbar at ticketing"
    );
    cy.softAssert(
      cy.filterByCourier().should("be.visible"),
      "filter by courier at ticketing"
    );
    cy.softAssert(
      cy.dateFIlter().should("be.visible"),
      "date picker at ticketing"
    );
    cy.softAssert(
      cy.filterTicketList().should("be.visible"),
      "filter ticket list at ticketing"
    );
    // cy.softAssert(
    //   cy.ticketList_kurirFilter().should("be.visible"),
    //   "filter kurir at ticketing"
    // );
    cy.softAssert(
      cy.ticketList_fliterKendala().should("be.visible"),
      "filter kendala at ticketing"
    );

    // cy.softAssert(
    //   cy.ticketList_tableHeading_checkbox().should("be.visible"),
    //   "table heading checkbox"
    // );
    // cy.softAssert(
    //   cy.ticketList_tableHeading_awb().should("be.visible"),
    //   "table heading awb"
    // );
    // cy.softAssert(
    //   cy.ticketList_tableHeading_kendala().should("be.visible"),
    //   "table heading kendala"
    // );
    // cy.softAssert(
    //   cy.ticketList_tableHeading_SLA().should("be.visible"),
    //   "table heading sla"
    // );
    // cy.softAssert(
    //   cy.ticketList_tableHeading_tglManifest().should("be.visible"),
    //   "table heading tgl manifest"
    // );
    // cy.softAssert(
    //   cy.ticketList_tableHeading_destinasi().should("be.visible"),
    //   "table heading destinasi"
    // );
    // cy.softAssert(
    //   cy.ticketList_tableHeading_tracking().should("be.visible"),
    //   "table heading tracking"
    // );

    // cy.softAssert(
    //   cy.ticketList_checkbox().should("be.visible"),
    //   "ticket list info checkbox"
    // );
    // cy.softAssert(
    //   cy.ticketList_kurirLogo().should("be.visible"),
    //   "ticket list info kurir logo"
    // );
    // cy.softAssert(
    //   cy.ticketList_abw().should("be.visible"),
    //   "ticket list info awb number"
    // );
    // cy.softAssert(
    //   cy.ticketList_deskripsiKendala().should("be.visible"),
    //   "ticket list info deskripsi kendala"
    // );
    // cy.softAssert(
    //   cy.ticketList_SLA().should("be.visible"),
    //   "ticket list info SLA"
    // );
    // cy.softAssert(
    //   cy.ticketList_manifestDate().should("be.visible"),
    //   "ticket list info manifest date"
    // );
    // cy.softAssert(
    //   cy.ticketList_destinasi().should("be.visible"),
    //   "ticket list info destinasi"
    // );
    // cy.softAssert(
    //   cy.ticketList_lastTracking().should("be.visible"),
    //   "ticket list info last tracking"
    // );
    // cy.softAssert(
    //   cy.ticketList_lastTrackingButton().should("be.visible"),
    //   "ticket list info button last tracking"
    // );
    // cy.softAssert(
    //   cy.ticketList_sellerNameAndIcon().should("be.visible"),
    //   "ticket list info seller name"
    // );
    // cy.softAssert(
    //   cy.ticketList_sellerPhoneAndIcon().should("be.visible"),
    //   "ticket list info seller phone"
    // );
    // cy.softAssert(
    //   cy.ticketList_ticketIdAndIcon().should("be.visible"),
    //   "ticket list info ticket number"
    // );
    // cy.softAssert(
    //   cy.ticketList_priority().should("be.visible"),
    //   "ticket list info priority"
    // );
    // cy.softAssert(
    //   cy.ticketList_kendala().should("be.visible"),
    //   "ticket list info kendala"
    // );
    // cy.softAssert(
    //   cy.ticketList_createdAt().should("be.visible"),
    //   "ticket list info waktu dibuat"
    // );
    // cy.softAssert(
    //   cy.ticketList_handoverAgent().should("be.visible"),
    //   "ticket list info agent handler"
    // );
    // cy.softAssert(
    //   cy.ticketList_buttonTindakLanjuti().should("be.visible"),
    //   "ticket list info button tindak lanjuti"
    // );
    // cy.softAssert(
    //   cy.ticketList_buttonViewTicket().should("be.visible"),
    //   "ticket list info button lihat tiket"
    // );
    // cy.softAssert(
    //   cy.ticketList_buttonSolveTIcket().should("be.visible"),
    //   "ticket list info button solve"
    // );
  }

  navigateToTicketingPage() {
    cy.softAssert(cy.nav_link_Group().click(), "navigate to group chat");
  }
}

export default ticketingPage;
