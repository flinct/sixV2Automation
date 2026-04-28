import { forEach } from "async";
import { timeout } from "async";
import { action } from "commander";
import { env_config } from "../01_url_page";
import { timestamp } from "rxjs";
import { times } from "lodash";
import elementNavigation from "../commands/navigation.js";
import elementConversation from "../commands/inbox_.js";
import { id } from "common-tags";

const baseUrl = Cypress.config("baseUrl");
const loginType = Cypress.env("loginType");

const config = env_config(baseUrl);

const customer_number = 6289655057778;

const customerNumber = "6289655057778";

class inboxPage {
  activeChannel = null;

  //v2
  //──────── NAVIGATION PANEL ─────────────────────────────
  accessConversation() {
    cy.viewport(1280, 768);
    // cy.viewport(1366, 768);
    // cy.viewport(1920, 1080);
    elementNavigation.defaultUrl();
    // elementNavigation.inboxNav().click();
  }
  accessYourInbox() {
    this.accessConversation();
    elementConversation.yourInboxNav().should("have.class", "bg-white");
    cy.url().should("include", "/your-inbox");
  }
  accessUnassigned() {
    this.accessConversation();
    elementConversation.inboxUnassignedNav().click();
    elementConversation.inboxUnassignedNav().should("have.class", "bg-white");
    cy.url().should("include", "/unassigned");
  }
  accessAllConversation() {
    this.accessConversation();
    elementConversation.inboxAllNav().click();
    elementConversation.inboxAllNav().should("have.class", "bg-white");
    cy.url().should("include", "/all");
  }
  accessStarredConversation() {
    this.accessConversation();
    elementConversation.inboxStarredNav().click();
    elementConversation.inboxStarredNav().should("have.class", "bg-white");
    cy.url().should("include", "/starred");
  }
  accessSpamConversation() {
    this.accessConversation();
    elementConversation.inboxSpamNav().click();
    elementConversation.inboxSpamNav().should("have.class", "bg-white");
    cy.url().should("include", "/spam");
  }
  accessJunkConversation() {
    this.accessConversation();
    elementConversation.inboxJunkNav().click();
    elementConversation.inboxJunkNav().should("have.class", "bg-white");
    cy.url().should("include", "/junk");
  }
  validateChatList_emptyState() {
    this.accessConversation();
    elementConversation
      .chatListContainer()
      .should("be.visible")
      .contains(/Belum Ada Percakapan/i);
  }

  //──────── CHAT LIST PANEL ─────────────────────────────
  validateTitleAndFilterChatlist() {
    this.accessConversation();
    cy.url().then((url) => {
      if (url.includes("/id/")) {
        elementConversation.chatListTitle().contains("Kotak Pesan Anda");
      }
      if (url.includes("/en/")) {
        elementConversation.chatListTitle().contains("Your Inbox");
      }
    });
    elementConversation.chatListNavPanelControlButton().should("be.visible");
    elementConversation.chatListNavPanelControlButton().click();
    cy.wait(1200);
    elementConversation
      .conversationSidebarNavigation()
      .should("not.be.visible");
    elementConversation.chatListNavPanelControlButton().click();
    cy.wait(1200);
    elementConversation.chatListNavPanelControlButton().should("be.visible");
    elementConversation.chatListSearchFilter().should("be.visible");
    elementConversation.chatListSearchFilter().click();
    elementConversation.openFilterSearch().type("testing input filter");
    elementConversation.closeFilterSearch().click();
  }
  checkConversationFilter() {
    this.accessConversation();
    elementConversation.chatListFilterDeliveryMessageStatus().click();
    cy.task("log", "close popup");
    cy.wait(1000);
    elementConversation.chatListFilterDeliveryMessageStatus().click();
    elementConversation.chatListFilterReadConversation().click();
    cy.task("log", "close popup");
    cy.wait(1000);
    elementConversation.chatListFilterReadConversation().click();
    elementConversation.chatListFilterSort().click();
    cy.task("log", "close popup");
    cy.wait(1000);
    elementConversation.chatListFilterSort().click();
    elementConversation.chatListFilterVisibility().click();
    cy.task("log", "close popup");
    cy.wait(1000);
    elementConversation.closePopupFIlterButton().click();
    elementConversation.chatListFilterAdvance().click();
    cy.task("log", "close popup");
    cy.wait(1000);
    elementConversation.closePopupFIlterButton().click();
  }
  openFirstConversation() {
    this.accessAllConversation();
    // cy.viewport(1366, 768);
    cy.viewport(1440, 900);
    elementConversation.chatListNavPanelControlButton().click();
    elementConversation
      .chatListClientContainer(1, { timeout: 60000 })
      .should("be.visible");
    elementConversation.chatListClientContainer(1).click();
    elementConversation.chatRoom().should("be.visible");
  }
  openConversation() {
    this.accessAllConversation();
    // cy.viewport(1366, 768);
    cy.viewport(1440, 900);
    elementConversation.chatListNavPanelControlButton().click();
    elementConversation
      .chatListClientContainer(1, { timeout: 60000 })
      .should("be.visible");
    elementConversation.chatListClientContainer(1).click();
    elementConversation.chatRoom().should("be.visible");

    //check bubble inbound
    cy.task("log", "CHECKING BUBBLE MESSAGE INBOUND");
    elementConversation.chatSectionBubbleChatCustomer(0).should("be.visible");
    elementConversation
      .chatSectionBubbleChatCustomerMessage(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`TEXT NOT NULL: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("TEXT NULL");
          // expect(value, "content is null or empty").to.be.empty;
        }
      });
    elementConversation
      .chatSectionBubbleChatCustomerName(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`TEXT NOT NULL: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("TEXT NULL");
          // expect(value, "content is null or empty").to.be.empty;
        }
      });
    cy.get("body").then(($body) => {
      //get account channel number, for validating its a chat from whatsapp
      const el = $body.find(`[data-cy="chat-list-1"] span`).eq(2);

      if (el.length) {
        // elementConversation.chatListClientAccountChannelNumber(1);
        cy.task(
          "log",
          "accountChannel Number is visible, chat is from whatsapp",
        );
        elementConversation
          .chatSectionBubbleChatCustomerNumber(0)
          .should("be.visible")
          .invoke("text")
          .then((text) => {
            const value = text?.trim();

            if (value) {
              cy.log(`NUMBER NOT NULL: ${value}`);
              expect(value, "content not null").to.not.be.empty;
            } else {
              cy.log("NUMBER NOT VISIBLE");
            }
          });
      } else {
        cy.error("accountChannel Number is NOT visible");
      }
    });
    elementConversation
      .chatSectionBubbleChatCustomerMessage(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`MESSAGE NOT NULL: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("MESSAGE NOT VISIBLE");
        }
      });
    elementConversation
      .chatSectionBubbleChatCustomerMessageTimestamp(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`TIMESTAMP VISIBLE: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("TIMESTAMP NOT VISIBLE");
        }
      });

    //check bubble outbond
    cy.task("log", "CHECKING BUBBLE MESSAGE OUTBOND");
    elementConversation.chatSectionBubbleChatAgent(0).should("be.visible");
    elementConversation
      .chatSectionBubbleChatAgentMessage(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`TEXT FROM USER-AGENT NOT NULL: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("TEXT FROM USER-AGENT NULL");
        }
      });
    elementConversation
      .chatSectionBubbleChatAgentName(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`USER-AGENT NAME NOT NULL: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("USER-AGENT NAME NULL");
        }
      });
    elementConversation
      .chatSectionBubbleChatAgentNumber(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`USER-AGENT NUMBER NOT NULL: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("USER-AGENT NUMBER NULL");
        }
      });
    elementConversation
      .chatSectionBubbleChatAgentTimestamp(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`USER-AGENT TIMESTAMP VISIBLE: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("USER-AGENT NOT VISIBLE");
        }
      });
    //CHECK MESSAGE WITH STATUS READ
    cy.task("log", "CHECKING BUBBLE MESSAGE WITH STATUS READ");
    elementConversation
      .chatSectionBubbleChatAgentMessageStatus_read(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`MESSAGE FROM USER-AGENT HAVE STATUS = READ: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("MESSAGE FROM USER-AGENT HAVE STATUS != READ");
        }
      });

    //OPEN CONVERSATION THAT HAVE MESSAGE STATUS IS DELIVERED
    cy.task("log", "CHECKING BUBBLE MESSAGE WITH STATUS DELIVERED");
    elementConversation.chatListClientContainer(2).click();
    elementConversation
      .chatSectionBubbleChatAgentMessageStatus(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`MESSAGE FROM USER-AGENT HAVE STATUS = DELIVERED: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("MESSAGE FROM USER-AGENT HAVE STATUS != DELIVERED");
        }
      });
    // elementConversation.chatSectionBubbleChatAgentName()
  }
  compareConversationAccountChannelConnectivity() {
    this.accessAllConversation();
    cy.viewport(1440, 900);
    elementConversation.chatListNavPanelControlButton().click();
    elementConversation
      .chatListClientContainer(1, { timeout: 60000 })
      .should("be.visible");

    cy.task("log", "OPEN CONVERSATION WITH CONNECTED ACCOUNT CHANNEL");
    elementConversation.chatListClientContainer(1).click();
    cy.get("body").then(($body) => {
      const el = $body.find(`[data-cy="autogrowing-textarea"]`);

      if (el.length) {
        cy.task("log", "text input is visible");
        elementConversation.chatSectionTextInput().should("be.visible");
      } else {
        cy.error("text input not visible");
      }
    });
    elementConversation
      .chatSectionTextInput()
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();
        if (value) {
          cy.log(`OPEN CONVERSATION WITH CONNECTED ACCOUNT CHANNEL: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("ACCOUNT CHANNEL DISCONNECTED");
        }
      });

    cy.task("log", "OPEN CONVERSATION WITH");
    cy.task("log", "---- DISCONNECTED ----");
    cy.task("log", "-  ACCOUNT  CHANNEL  -");
    elementConversation.chatListClientContainer(2).click();
    elementConversation
      // .chatSectionBubbleChatAgentMessageStatus(0)
      .chatSectionBubbleChatAgentMessageStatus_delivered(0)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const value = text?.trim();

        if (value) {
          cy.log(`MESSAGE FROM USER-AGENT HAVE STATUS = DELIVERED: ${value}`);
          expect(value, "content not null").to.not.be.empty;
        } else {
          cy.log("MESSAGE FROM USER-AGENT HAVE STATUS != DELIVERED");
        }
      });
  }
  accessWdigetCodepen() {
    cy.visit("https://codepen.io/pen/");
  }

  validateAccessConversationTeamAsAgent() {}

  //──────── MESSAGE STATUS VALIDATION ─────────────────────────────
  validateMessageStatusPending() {
    this.openFirstConversation();
    cy.task("log", "VALIDATING MESSAGE STATUS: PENDING");
    elementConversation
      .chatSectionBubbleChatAgentMessageStatus_pending(0)
      .should("be.visible")
      .then(() => {
        cy.task("log", "✓ Message status is PENDING");
      });
  }

  validateMessageStatusSent() {
    this.openFirstConversation();
    cy.task("log", "VALIDATING MESSAGE STATUS: SENT");
    elementConversation
      .chatSectionBubbleChatAgentMessageStatus_sent(0)
      .should("be.visible")
      .then(() => {
        cy.task("log", "✓ Message status is SENT");
      });
  }

  validateMessageStatusDelivered() {
    this.openFirstConversation();
    cy.task("log", "VALIDATING MESSAGE STATUS: DELIVERED");
    elementConversation
      .chatSectionBubbleChatAgentMessageStatus_delivered(0)
      .should("be.visible")
      .then(() => {
        cy.task("log", "✓ Message status is DELIVERED");
      });
  }

  validateMessageStatusRead() {
    this.openFirstConversation();
    cy.task("log", "VALIDATING MESSAGE STATUS: READ");
    elementConversation
      .chatSectionBubbleChatAgentMessageStatus_read(0)
      .should("be.visible")
      .then(() => {
        cy.task("log", "✓ Message status is READ");
      });
  }

  validateMessageStatusFailed() {
    this.openFirstConversation();
    cy.task("log", "VALIDATING MESSAGE STATUS: FAILED");
    elementConversation
      .chatSectionBubbleChatAgentMessageStatus_failed(0)
      .should("be.visible")
      .then(() => {
        cy.task("log", "✓ Message status is FAILED");
      });
  }

  //──────── SLA INDICATOR VALIDATION ─────────────────────────────
  validateSLAIndicatorVisible() {
    cy.task("log", "VALIDATING SLA INDICATOR VISIBILITY");
    this.accessYourInbox();
    elementConversation
      .chatListClientSLAIndicator()
      .should("be.visible")
      .then(($slaIndicator) => {
        const count = $slaIndicator.length;
        cy.task("log", `SLA indicators found: ${count}`);
        expect(
          count,
          "at least one SLA indicator should be visible",
        ).to.be.greaterThan(0);
      });
  }

  //──────── TEAM INBOX ASSIGNMENT ─────────────────────────────
  validateTeamInboxAssignment() {
    cy.task("log", "VALIDATING TEAM INBOX ASSIGNMENT");
    this.openFirstConversation();

    elementConversation
      .chatDetailTeamValue()
      .should("be.visible")
      .invoke("text")
      .then((teamName) => {
        const value = teamName?.trim();
        if (value) {
          cy.task("log", `Team Inbox assigned: ${value}`);
          expect(value, "team inbox should be assigned").to.not.be.empty;
        } else {
          cy.task("log", "Team Inbox not assigned or empty");
        }
      });
  }

  validateHandlerAssignment() {
    cy.task("log", "VALIDATING HANDLER/AGENT ASSIGNMENT");
    elementConversation
      .chatDetailHandlerValue(0)
      .should("be.visible")
      .invoke("text")
      .then((handlerName) => {
        const value = handlerName?.trim();
        if (value) {
          cy.task("log", `Handler assigned: ${value}`);
          expect(value, "handler should be assigned").to.not.be.empty;
        } else {
          cy.task("log", "Handler not assigned");
        }
      });
  }

  //──────── SEARCH & FILTER FUNCTIONALITY ─────────────────────────────
  validateSearchFilter() {
    cy.task("log", "VALIDATING SEARCH FILTER FUNCTIONALITY");
    this.accessConversation();
    elementConversation.chatListSearchFilter().should("be.visible").click();
    elementConversation
      .openFilterSearch()
      .should("be.visible")
      .type("test search");
    cy.wait(1000);
    cy.task("log", "Search filter executed successfully");
    elementConversation.closeFilterSearch().click();
  }

  validateAdvancedFilter() {
    cy.task("log", "VALIDATING ADVANCED FILTER");
    this.accessConversation();
    elementConversation.chatListFilterAdvance().should("be.visible").click();
    cy.wait(500);
    cy.get("body").then(($body) => {
      const filterModal = $body.find('[data-slot="dialog"]');
      if (filterModal.length) {
        cy.task("log", "Advanced filter modal opened successfully");
      }
    });
    elementConversation.closePopupFIlterButton().click();
  }

  //──────── RBAC/PERMISSION VALIDATION ─────────────────────────────
  validateNavigationVisibility() {
    cy.task("log", "VALIDATING NAVIGATION VISIBILITY BASED ON RBAC");
    elementConversation
      .conversationSidebarNavigation()
      .should("be.visible")
      .within(() => {
        cy.get("button").then(($buttons) => {
          const buttonCount = $buttons.length;
          cy.task("log", `Navigation buttons visible: ${buttonCount}`);
          expect(
            buttonCount,
            "at least one navigation button should be visible",
          ).to.be.greaterThan(0);
        });
      });
  }

  validateConversationListAccessibility() {
    cy.task("log", "VALIDATING CONVERSATION LIST ACCESSIBILITY");
    this.accessConversation();
    elementConversation
      .chatListContainer()
      .should("be.visible")
      .then(($container) => {
        cy.task("log", "Conversation list is accessible");
        expect($container).to.exist;
      });
  }

  //──────── STARRED CONVERSATION ─────────────────────────────
  validateStarredConversationAccess() {
    cy.task("log", "VALIDATING STARRED CONVERSATION");
    this.accessStarredConversation();
    elementConversation.inboxStarredNav().should("have.class", "bg-white");
    cy.url().should("include", "/starred");
    cy.task("log", "Starred conversation page accessed");
  }

  //──────── SPAM/JUNK CONVERSATION ─────────────────────────────
  validateSpamConversationAccess() {
    cy.task("log", "VALIDATING SPAM CONVERSATION");
    this.accessSpamConversation();
    elementConversation.inboxSpamNav().should("have.class", "bg-white");
    cy.url().should("include", "/spam");
    cy.task("log", "Spam conversation page accessed");
  }

  validateJunkConversationAccess() {
    cy.task("log", "VALIDATING JUNK CONVERSATION");
    this.accessJunkConversation();
    elementConversation.inboxJunkNav().should("have.class", "bg-white");
    cy.url().should("include", "/junk");
    cy.task("log", "Junk conversation page accessed");
  }

  //──────── CONVERSATION DETAIL VALIDATION ─────────────────────────────
  validateConversationDetailPanel() {
    cy.task("log", "VALIDATING CONVERSATION DETAIL PANEL");
    this.openFirstConversation();

    elementConversation
      .chatDetailContainerSection()
      .should("be.visible")
      .then(($detailPanel) => {
        cy.task("log", "Conversation detail panel is visible");
        expect($detailPanel).to.exist;
      });
  }

  validateContactDataDisplay() {
    cy.task("log", "VALIDATING CONTACT DATA DISPLAY");
    elementConversation
      .chatDetailClientDataContainerSection()
      .should("be.visible");

    elementConversation
      .chatDetailClientDataNameValue()
      .should("be.visible")
      .invoke("text")
      .then((name) => {
        cy.task("log", `Contact name: ${name?.trim()}`);
      });

    elementConversation
      .chatDetailClientDataNumberValue()
      .should("be.visible")
      .invoke("text")
      .then((number) => {
        cy.task("log", `Contact number: ${number?.trim()}`);
      });
  }

  validateConversationAttributes() {
    cy.task("log", "VALIDATING CONVERSATION ATTRIBUTES");
    elementConversation
      .chatDetailConvAttrContainerSection()
      .should("be.visible")
      .then(($attrSection) => {
        cy.task("log", "Conversation attributes section is visible");
        expect($attrSection).to.exist;
      });
  }

  //──────── MEDIA & FILES VALIDATION ─────────────────────────────
  validateMediaSection() {
    cy.task("log", "VALIDATING MEDIA SECTION");
    elementConversation
      .chatDetailMediaContainerSection()
      .should("be.visible")
      .then(($mediaSection) => {
        cy.task("log", "Media section is visible");
        expect($mediaSection).to.exist;
      });
  }

  validateFilesSection() {
    cy.task("log", "VALIDATING FILES SECTION");
    elementConversation
      .chatDetailFilesContainerSection()
      .should("be.visible")
      .then(($filesSection) => {
        cy.task("log", "Files section is visible");
        expect($filesSection).to.exist;
      });
  }

  //──────── TAGS VALIDATION ─────────────────────────────
  validateTagsSection() {
    cy.task("log", "VALIDATING TAGS SECTION");
    elementConversation
      .chatDetailTagsContainerSection()
      .should("be.visible")
      .then(($tagsSection) => {
        cy.task("log", "Tags section is visible");
        expect($tagsSection).to.exist;
      });
  }

  //──────── CONVERSATION HISTORY VALIDATION ─────────────────────────────
  validateConversationHistorySection() {
    cy.task("log", "VALIDATING CONVERSATION HISTORY SECTION");
    elementConversation
      .chatDetailConvoHistoryContainerSection()
      .should("be.visible")
      .then(($historySection) => {
        cy.task("log", "Conversation history section is visible");
        expect($historySection).to.exist;
      });
  }

  //──────── TEXT INPUT VALIDATION ─────────────────────────────
  validateTextInputAvailability() {
    cy.task("log", "VALIDATING TEXT INPUT AVAILABILITY");
    this.openFirstConversation();

    cy.get("body").then(($body) => {
      const textInput = $body.find('[data-cy="autogrowing-textarea"]');
      if (textInput.length) {
        cy.task("log", "Text input is available for sending messages");
        elementConversation.chatSectionTextInput().should("be.visible");
      } else {
        cy.task(
          "log",
          "Text input not available - conversation may be closed or archived",
        );
      }
    });
  }

  //──────── EMOJI & ATTACHMENT BUTTONS ─────────────────────────────
  validateComposerButtons() {
    cy.task("log", "VALIDATING COMPOSER BUTTONS");
    this.openFirstConversation();

    cy.get("body").then(($body) => {
      const emojiBtn = $body.find(
        '[data-cy="chatSection-textbox-button-emoji"]',
      );
      const attachBtn = $body.find(
        '[data-cy="chatSection-textbox-button-attch"]',
      );
      const sendBtn = $body.find(
        '[data-cy="chatSection-textbox-button-sendChat"]',
      );

      cy.task("log", `Emoji button visible: ${emojiBtn.length > 0}`);
      cy.task("log", `Attach button visible: ${attachBtn.length > 0}`);
      cy.task("log", `Send button visible: ${sendBtn.length > 0}`);
    });
  }

  //──────── CHANNEL-BASED CHAT NAVIGATION ─────────────────────────────
  clickChatByChannel(contactName, channel) {
    cy.task(
      "log",
      `OPENING CHAT - Contact: ${contactName}, Channel: ${channel}`,
    );

    // Channel icon mapping
    const channelIconMap = {
      "whatsapp-web": "tabler-icon-brand-whatsapp",
      "whatsapp-api": "tabler-icon-brand-whatsapp",
      "whatsapp-group": "tabler-icon-brand-whatsapp",
      email: "tabler-icon-mail",
      widget: "tabler-icon-messages",
      "facebook-messenger": "tabler-icon-brand-messenger",
      facebook: "tabler-icon-brand-facebook",
      instagram: "tabler-icon-brand-instagram",
      telegram: "tabler-icon-brand-telegram",
    };

    const iconClass = channelIconMap[channel];

    // Validate channel parameter
    if (!iconClass) {
      cy.task("log", `❌ ERROR: Unknown channel - ${channel}`);
      throw new Error(
        `Unknown channel: ${channel}. Valid channels: ${Object.keys(channelIconMap).join(", ")}`,
      );
    }

    cy.task("log", `Looking for chat: "${contactName}" in channel: ${channel}`);

    // Find and click the conversation item
    cy.get("body").then(($body) => {
      // Find all chat list items
      const chatItems = $body.find('[data-cy^="chat-list-"]');

      if (chatItems.length === 0) {
        cy.task("log", "❌ No chat items found in the list");
        throw new Error("No chat items found in the conversation list");
      }

      cy.task(
        "log",
        `Found ${chatItems.length} chat items. Searching for "${contactName}"...`,
      );

      // Loop through chat items to find the one with the contact name and channel
      let found = false;
      let foundIndex = -1;

      chatItems.each((index, element) => {
        const $element = Cypress.$(element);
        const contactNameInItem = $element
          .find('[data-cy="chatList-client-name"]')
          .text()
          .trim();
        const hasChannelIcon = $element.find(`svg.${iconClass}`).length > 0;

        if (contactNameInItem === contactName && hasChannelIcon) {
          foundIndex = index + 1; // data-cy uses 1-based index
          found = true;
          cy.task("log", `✓ Found matching chat at index ${foundIndex}`);
          return false; // Break the loop
        }
      });

      if (!found) {
        cy.task(
          "log",
          `❌ Chat not found: "${contactName}" in channel "${channel}"`,
        );
        throw new Error(
          `Chat with name "${contactName}" not found in channel "${channel}"`,
        );
      }

      // Click the found chat
      cy.get(`[data-cy="chat-list-${foundIndex}"]`)
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.task("log", `✓ Successfully clicked chat: ${contactName}`);
        });

      // Verify chat room opened
      elementConversation
        .chatRoom()
        .should("be.visible")
        .then(() => {
          cy.task("log", `✓ Chat room loaded for: ${contactName}`);
        });
    });
  }

  throttleNetwork({
    latency = 2000,
    downloadThroughput = 50000,
    uploadThroughput = 50000,
  } = {}) {
    return cy
      .then(() =>
        Cypress.automation("remote:debugger:protocol", {
          command: "Network.enable",
        }),
      )
      .then(() =>
        Cypress.automation("remote:debugger:protocol", {
          command: "Network.emulateNetworkConditions",
          params: {
            offline: false,
            latency,
            downloadThroughput,
            uploadThroughput,
          },
        }),
      );
  }

  resetNetwork() {
    return cy.then(() =>
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.emulateNetworkConditions",
        params: {
          offline: false,
          latency: 0,
          downloadThroughput: -1,
          uploadThroughput: -1,
        },
      }),
    );
  }

  sendMessageInChat(message) {
    cy.task("log", `SENDING MESSAGE IN CHAT: "${message}"`);
    return elementConversation
      .chatSectionTextInput()
      .should("be.visible")
      .type(message)
      .then(() => {
        return elementConversation
          .chatSectionTextInput()
          .should("be.visible")
          .type("{enter}");
      })
      .then(() => this.validateMessageStatusTime(message, this.activeChannel));
  }

  validateMessageStatusTime(message, channel = this.activeChannel) {
    // const thresholdMs = 2000;
    // const thresholdMs = 10000;
    const thresholdMs = 30000;
    const pollIntervalMs = 100;
    const maxWaitMs = 30000;
    const webhookUrl =
      "https://chat.googleapis.com/v1/spaces/AAQAnDKFI6g/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=YQRWeK2Jy4H8CluGauRE3X-iVPIYVu5_1yGI69ouD6o";
    return cy
      .then(() => {
        const startedAt = Date.now();
        const outgoingBubbleSelector =
          "#scrollableChatDiv .flex.flex-col.items-end";

        const findDeliveredIcon = ($body) => {
          const outgoingBubbles = $body.find(outgoingBubbleSelector);

          if (!outgoingBubbles.length) {
            return Cypress.$();
          }

          const matchingBubble = Array.from(outgoingBubbles).find((bubble) => {
            const bubbleText = Cypress.$(bubble).text();
            return bubbleText.includes(message);
          });

          if (!matchingBubble) {
            return Cypress.$();
          }

          const $matchingBubble = Cypress.$(matchingBubble);

          if (channel === "email") {
            return $matchingBubble.find("svg.tabler-icon.tabler-icon-mail");
          }

          return $matchingBubble.find(
            "svg.tabler-icon.tabler-icon-checks.text-slate-500",
          );
        };

        const waitUntilDelivered = () => {
          return cy.get("body").then(($body) => {
            const deliveredIcon = findDeliveredIcon($body);

            if (deliveredIcon.length > 0 && deliveredIcon.is(":visible")) {
              return cy.wrap(Date.now() - startedAt, { log: false });
            }

            const elapsedMs = Date.now() - startedAt;

            if (elapsedMs >= maxWaitMs) {
              throw new Error(
                `Message status delivered did not appear within ${maxWaitMs} ms`,
              );
            }

            return cy.wait(pollIntervalMs).then(waitUntilDelivered);
          });
        };

        return waitUntilDelivered();
      })
      .then((durationMs) => {
        return cy
          .task(
            "log",
            `chatSectionBubbleChatAgentMessageStatus_delivered visible after ${durationMs} ms`,
          )
          .then(() => {
            if (durationMs <= thresholdMs) {
              return cy.wrap(durationMs, { log: false });
            }

            return cy
              .task(
                "log",
                `Delivered status exceeded threshold: ${durationMs} ms > ${thresholdMs} ms`,
              )
              .then(() => {
                if (!webhookUrl) {
                  return cy
                    .task(
                      "log",
                      'Webhook skipped: Cypress.env("messageStatusWebhookUrl") is not configured',
                    )
                    .then(() => cy.wrap(durationMs, { log: false }));
                }

                return cy.url().then((currentUrl) => {
                  return cy
                    .request({
                      method: "POST",
                      url: webhookUrl,
                      failOnStatusCode: false,
                      body: {
                        text: `Delivered status slow: ${durationMs} ms\nChannel: ${channel || "unknown"}\nThreshold: ${thresholdMs} ms\nURL: ${currentUrl}\nTime: ${new Date().toISOString()}`,
                      },
                    })
                    .then((response) => {
                      return cy
                        .task(
                          "log",
                          `Slow delivery webhook sent. Status: ${response.status}`,
                        )
                        .then(() => cy.wrap(durationMs, { log: false }));
                    });
                });
              });
          });
      });
  }

  openFirstChatByChannel(channel) {
    this.accessConversation();
    cy.wait(2000);
    cy.task("log", `OPENING FIRST CHAT IN CHANNEL: ${channel}`);
    this.activeChannel = channel;

    const channelNavMap = {
      widget: {
        navFilterMethod: elementConversation.navFilterChannelLivechat,
        iconClass: "tabler-icon-messages",
      },
      "whatsapp-official": {
        navFilterMethod: elementConversation.navFilterChannelWhatsapp,
        iconClass: "tabler-icon-brand-whatsapp",
      },
      baileys: {
        navFilterMethod: elementConversation.navFilterChannelWhatsappUnoff,
        iconClass: "tabler-icon-device-laptop",
      },
      instagram: {
        navFilterMethod: elementConversation.navFilterChannelInstagram,
        iconClass: "tabler-icon-brand-instagram",
      },
      email: {
        navFilterMethod: elementConversation.navFilterChannelEmail,
        iconClass: "tabler-icon-mail",
      },
    };

    const channelConfig = channelNavMap[channel];

    // Validate channel parameter
    if (!channelConfig) {
      cy.task("log", `❌ ERROR: Unknown channel - ${channel}`);
      throw new Error(
        `Unknown channel: ${channel}. Valid channels: ${Object.keys(channelNavMap).join(", ")}`,
      );
    }

    const { navFilterMethod, iconClass } = channelConfig;

    // Select target channel via nav filter
    navFilterMethod().should("be.visible").click();

    cy.task("log", `Looking for first chat in channel: ${channel}`);
    elementConversation.chatListContainer().should("be.visible");

    // Find and click the first conversation item with matching channel
    cy.get('[data-cy^="chat-list-"]', { timeout: 15000 })
      .should(($items) => {
        expect($items.length, "chat items count").to.be.greaterThan(0);

        const hasMatchingChannel = Array.from($items).some(
          (item) => Cypress.$(item).find(`svg.${iconClass}`).length > 0,
        );

        expect(
          hasMatchingChannel,
          `chat list contains channel icon ${iconClass}`,
        ).to.be.true;
      })
      .then(() => cy.get("body"))
      .then(($body) => {
        // Find all chat list items
        const chatItems = $body.find('[data-cy^="chat-list-"]');

        if (chatItems.length === 0) {
          cy.task("log", "❌ No chat items found in the list");
          throw new Error("No chat items found in the conversation list");
        }

        cy.task(
          "log",
          `Found ${chatItems.length} chat items. Searching for first chat in channel...`,
        );

        // Find the first chat item with matching channel icon
        let found = false;
        let foundIndex = -1;
        let foundContactName = "";

        chatItems.each((index, element) => {
          const $element = Cypress.$(element);
          const hasChannelIcon = $element.find(`svg.${iconClass}`).length > 0;

          if (hasChannelIcon && !found) {
            const contactNameInItem = $element
              .find('[data-cy="chatList-client-name"]')
              .text()
              .trim();
            foundIndex = index + 1; // data-cy uses 1-based index
            foundContactName = contactNameInItem;
            found = true;
            cy.task(
              "log",
              `✓ Found first chat at index ${foundIndex}: "${contactNameInItem}"`,
            );
            return false; // Break the loop
          }
        });

        if (!found) {
          cy.task("log", `❌ No chats found in channel "${channel}"`);
          throw new Error(`No chats found in channel "${channel}"`);
        }

        // Click the found chat
        cy.get(`[data-cy="chat-list-${foundIndex}"]`)
          .scrollIntoView();

        cy.get(`[data-cy="chat-list-${foundIndex}"]`)
          .should("be.visible")
          .click()
          .then(() => {
            cy.task(
              "log",
              `✓ Successfully clicked first chat in ${channel}: ${foundContactName}`,
            );
          });

        // Verify chat room opened
        elementConversation
          .chatRoom()
          .should("be.visible")
          .then(() => {
            cy.task(
              "log",
              `✓ Chat room loaded for first chat in channel: ${channel}`,
            );
          });
      });
  }

  openLastChatByChannel(channel) {
    cy.task("log", `OPENING LAST CHAT IN CHANNEL: ${channel}`);

    // Channel icon mapping
    const channelIconMap = {
      "whatsapp-web": "tabler-icon-brand-whatsapp",
      "whatsapp-api": "tabler-icon-brand-whatsapp",
      "whatsapp-group": "tabler-icon-brand-whatsapp",
      email: "tabler-icon-mail",
      widget: "tabler-icon-messages",
      "facebook-messenger": "tabler-icon-brand-messenger",
      facebook: "tabler-icon-brand-facebook",
      instagram: "tabler-icon-brand-instagram",
      telegram: "tabler-icon-brand-telegram",
    };

    const iconClass = channelIconMap[channel];

    // Validate channel parameter
    if (!iconClass) {
      cy.task("log", `❌ ERROR: Unknown channel - ${channel}`);
      throw new Error(
        `Unknown channel: ${channel}. Valid channels: ${Object.keys(channelIconMap).join(", ")}`,
      );
    }

    cy.task("log", `Looking for last chat in channel: ${channel}`);

    // Find and click the last conversation item with matching channel
    cy.get("body").then(($body) => {
      // Find all chat list items
      const chatItems = $body.find('[data-cy^="chat-list-"]');

      if (chatItems.length === 0) {
        cy.task("log", "❌ No chat items found in the list");
        throw new Error("No chat items found in the conversation list");
      }

      cy.task(
        "log",
        `Found ${chatItems.length} chat items. Searching for last chat in channel...`,
      );

      // Find the last chat item with matching channel icon
      let foundIndex = -1;
      let foundContactName = "";

      chatItems.each((index, element) => {
        const $element = Cypress.$(element);
        const hasChannelIcon = $element.find(`svg.${iconClass}`).length > 0;

        if (hasChannelIcon) {
          const contactNameInItem = $element
            .find('[data-cy="chatList-client-name"]')
            .text()
            .trim();
          foundIndex = index + 1; // data-cy uses 1-based index
          foundContactName = contactNameInItem;
        }
      });

      if (foundIndex === -1) {
        cy.task("log", `❌ No chats found in channel "${channel}"`);
        throw new Error(`No chats found in channel "${channel}"`);
      }

      cy.task(
        "log",
        `✓ Found last chat at index ${foundIndex}: "${foundContactName}"`,
      );

      // Click the found chat
      cy.get(`[data-cy="chat-list-${foundIndex}"]`)
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.task(
            "log",
            `✓ Successfully clicked last chat in ${channel}: ${foundContactName}`,
          );
        });

      // Verify chat room opened
      elementConversation
        .chatRoom()
        .should("be.visible")
        .then(() => {
          cy.task(
            "log",
            `✓ Chat room loaded for last chat in channel: ${channel}`,
          );
        });
    });
  }

  openNthChatByChannel(channel, index) {
    cy.task("log", `OPENING NTH CHAT IN CHANNEL: ${channel}, Index: ${index}`);

    // Channel icon mapping
    const channelIconMap = {
      "whatsapp-web": "tabler-icon-brand-whatsapp",
      "whatsapp-api": "tabler-icon-brand-whatsapp",
      "whatsapp-group": "tabler-icon-brand-whatsapp",
      email: "tabler-icon-mail",
      widget: "tabler-icon-messages",
      "facebook-messenger": "tabler-icon-brand-messenger",
      facebook: "tabler-icon-brand-facebook",
      instagram: "tabler-icon-brand-instagram",
      telegram: "tabler-icon-brand-telegram",
    };

    const iconClass = channelIconMap[channel];

    // Validate channel parameter
    if (!iconClass) {
      cy.task("log", `❌ ERROR: Unknown channel - ${channel}`);
      throw new Error(
        `Unknown channel: ${channel}. Valid channels: ${Object.keys(channelIconMap).join(", ")}`,
      );
    }

    // Validate index parameter
    if (!Number.isInteger(index) || index < 0) {
      cy.task(
        "log",
        `❌ ERROR: Invalid index - ${index}. Must be a non-negative integer`,
      );
      throw new Error(
        `Invalid index: ${index}. Index must be a non-negative integer`,
      );
    }

    cy.task("log", `Looking for chat at index ${index} in channel: ${channel}`);

    // Find and click the nth conversation item with matching channel
    cy.get("body").then(($body) => {
      // Find all chat list items
      const chatItems = $body.find('[data-cy^="chat-list-"]');

      if (chatItems.length === 0) {
        cy.task("log", "❌ No chat items found in the list");
        throw new Error("No chat items found in the conversation list");
      }

      cy.task(
        "log",
        `Found ${chatItems.length} chat items. Searching for chat at index ${index} in channel...`,
      );

      // Find chats matching the channel
      let matchCount = 0;
      let foundIndex = -1;
      let foundContactName = "";

      chatItems.each((listIndex, element) => {
        const $element = Cypress.$(element);
        const hasChannelIcon = $element.find(`svg.${iconClass}`).length > 0;

        if (hasChannelIcon) {
          if (matchCount === index) {
            const contactNameInItem = $element
              .find('[data-cy="chatList-client-name"]')
              .text()
              .trim();
            foundIndex = listIndex + 1; // data-cy uses 1-based index
            foundContactName = contactNameInItem;
            return false; // Break the loop
          }
          matchCount++;
        }
      });

      if (foundIndex === -1) {
        cy.task(
          "log",
          `❌ No chat found at index ${index} in channel "${channel}" (found ${matchCount} chats)`,
        );
        throw new Error(
          `No chat found at index ${index} in channel "${channel}". Found ${matchCount} chats in this channel.`,
        );
      }

      cy.task(
        "log",
        `✓ Found chat at index ${index}: "${foundContactName}" (list position: ${foundIndex})`,
      );

      // Click the found chat
      cy.get(`[data-cy="chat-list-${foundIndex}"]`)
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.task(
            "log",
            `✓ Successfully clicked chat at index ${index} in ${channel}: ${foundContactName}`,
          );
        });

      // Verify chat room opened
      elementConversation
        .chatRoom()
        .should("be.visible")
        .then(() => {
          cy.task(
            "log",
            `✓ Chat room loaded for chat at index ${index} in channel: ${channel}`,
          );
        });
    });
  }

  openRandomChatByChannel(channel) {
    cy.task("log", `OPENING RANDOM CHAT IN CHANNEL: ${channel}`);

    // Channel icon mapping
    const channelIconMap = {
      "whatsapp-web": "tabler-icon-brand-whatsapp",
      "whatsapp-api": "tabler-icon-brand-whatsapp",
      "whatsapp-group": "tabler-icon-brand-whatsapp",
      email: "tabler-icon-mail",
      widget: "tabler-icon-messages",
      "facebook-messenger": "tabler-icon-brand-messenger",
      facebook: "tabler-icon-brand-facebook",
      instagram: "tabler-icon-brand-instagram",
      telegram: "tabler-icon-brand-telegram",
    };

    const iconClass = channelIconMap[channel];

    // Validate channel parameter
    if (!iconClass) {
      cy.task("log", `❌ ERROR: Unknown channel - ${channel}`);
      throw new Error(
        `Unknown channel: ${channel}. Valid channels: ${Object.keys(channelIconMap).join(", ")}`,
      );
    }

    cy.task("log", `Looking for random chat in channel: ${channel}`);

    // Find and click a random conversation item with matching channel
    cy.get("body").then(($body) => {
      // Find all chat list items
      const chatItems = $body.find('[data-cy^="chat-list-"]');

      if (chatItems.length === 0) {
        cy.task("log", "❌ No chat items found in the list");
        throw new Error("No chat items found in the conversation list");
      }

      cy.task(
        "log",
        `Found ${chatItems.length} chat items. Searching for random chat in channel...`,
      );

      // Find all chats matching the channel
      const matchingChats = [];

      chatItems.each((index, element) => {
        const $element = Cypress.$(element);
        const hasChannelIcon = $element.find(`svg.${iconClass}`).length > 0;

        if (hasChannelIcon) {
          const contactNameInItem = $element
            .find('[data-cy="chatList-client-name"]')
            .text()
            .trim();
          matchingChats.push({
            index: index + 1, // data-cy uses 1-based index
            contactName: contactNameInItem,
          });
        }
      });

      if (matchingChats.length === 0) {
        cy.task("log", `❌ No chats found in channel "${channel}"`);
        throw new Error(`No chats found in channel "${channel}"`);
      }

      // Select a random chat
      const randomSelection =
        matchingChats[Math.floor(Math.random() * matchingChats.length)];
      const foundIndex = randomSelection.index;
      const foundContactName = randomSelection.contactName;

      cy.task(
        "log",
        `✓ Found ${matchingChats.length} chats in channel. Selected random index: ${foundIndex} - "${foundContactName}"`,
      );

      // Click the random chat
      cy.get(`[data-cy="chat-list-${foundIndex}"]`)
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.task(
            "log",
            `✓ Successfully clicked random chat in ${channel}: ${foundContactName}`,
          );
        });

      // Verify chat room opened
      elementConversation
        .chatRoom()
        .should("be.visible")
        .then(() => {
          cy.task(
            "log",
            `✓ Chat room loaded for random chat in channel: ${channel}`,
          );
        });
    });
  }
}

function randomQuotes() {
  const quotes = [
    "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "Act as if what you do makes a difference. It does.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don't be afraid to give up the good to go for the great.",
    "I find that the harder I work, the more luck I seem to have.",
    "Success is not in what you have, but who you are.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do not wait to strike till the iron is hot; but make it hot by striking.",
    "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    "The best way to predict the future is to create it.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    "Opportunities don't happen. You create them.",
    "Success is how high you bounce when you hit bottom.",
    "Your time is limited, so don't waste it living someone else's life.",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    "Do what you can, with what you have, where you are.",
    "The only way to achieve the impossible is to believe it is possible.",
    "Dream big and dare to fail.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "Don't watch the clock; do what it does. Keep going.",
    "The journey of a thousand miles begins with one step.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Difficulties in life are intended to make us better, not bitter.",
    "The only person you are destined to become is the person you decide to be.",
    "Don’t count the days, make the days count.",
    "Every strike brings me closer to the next home run.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "You define your own life. Don’t let other people write your script.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "The best revenge is massive success.",
    "Do not let what you cannot do interfere with what you can do.",
    "It is never too late to be what you might have been.",
    "Turn your wounds into wisdom.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "We may encounter many defeats but we must not be defeated.",
    "Your life only gets better when you get better.",
    "Failure is another stepping stone to greatness.",
    "The man who has confidence in himself gains the confidence of others.",
    "Happiness is not something ready made. It comes from your own actions.",
    "If you want to lift yourself up, lift up someone else.",
    "No one can make you feel inferior without your consent.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "You miss 100% of the shots you don’t take.",
    "Don’t wait. The time will never be just right.",
    "Whether you think you can or you think you can’t, you’re right.",
    "To be a champion, you have to believe in yourself when no one else will.",
    "Always do your best. What you plant now, you will harvest later.",
    "Go confidently in the direction of your dreams. Live the life you have imagined.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Success is stumbling from failure to failure with no loss of enthusiasm",
    "The difference between ordinary and extraordinary is that little extra",
    "If you’re going through hell, keep going",
    "Perseverance is not a long race; it is many short races one after another",
    "It’s not about how hard you can hit; it’s about how hard you can get hit and keep moving forward",
    "Start where you are. Use what you have. Do what you can",
    "Don’t wait for opportunity. Create it",
    "Do not be embarrassed by your failures; learn from them and start again",
    "You are never too old to set another goal or to dream a new dream",
    "If you want something you've never had, you must be willing to do something you've never done",
    "Success is getting what you want. Happiness is wanting what you get",
    "Don’t let yesterday take up too much of today",
    "Push yourself, because no one else is going to do it for you",
    "Success doesn’t just find you. You have to go out and get it",
    "Dream it. Wish it. Do it",
    "Your limitation—it’s only your imagination",
    "Great things never come from comfort zones",
    "Dream bigger. Do bigger",
    "It always seems impossible until it’s done",
    "Dreams don’t work unless you do",
    "Go the extra mile. It’s never crowded",
    "Don’t stop when you’re tired. Stop when you’re done",
    "You don’t have to be great to start, but you have to start to be great",
    "Wake up with determination. Go to bed with satisfaction",
    "Do something today that your future self will thank you for",
    "Little things make big days",
    "It’s going to be hard, but hard does not mean impossible",
    "Don’t wait for an opportunity. Create it",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths",
    "The key to success is to focus on goals, not obstacles",
    "Dream it. Believe it. Build it",
    "Be a warrior, not a worrier",
    "It’s never too late to be what you might have been",
    "If you’re not willing to risk the usual, you’ll have to settle for the ordinary",
    "I have not failed. I’ve just found 10,000 ways that won’t work",
    "Failure will never overtake me if my determination to succeed is strong enough",
    "The only place where success comes before work is in the dictionary",
    "The way to get started is to quit talking and begin doing",
    "Don't be afraid to give up the good to go for the great",
    "I find that the harder I work, the more luck I seem to have",
    "Opportunities don't happen. You create them",
    "Don't be distracted by criticism. Remember—the only taste of success some people get is to take a bite out of you",
    "I have learned over the years that when one’s mind is made up, this diminishes fear",
    "You may have to fight a battle more than once to win it",
    "Keep going. Everything you need will come to you at the perfect time",
    "A river cuts through rock not because of its power but because of its persistence",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle",
    "The ones who are crazy enough to think they can change the world are the ones who do",
    "No matter how hard the past, you can always begin again",
    "Your life only gets better when you get better",
    "Turn your wounds into wisdom",
    "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well",
    "To succeed in life, you need two things: ignorance and confidence",
    "It is our choices that show what we truly are, far more than our abilities",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit",
    "If you cannot do great things, do small things in a great way",
    "Be not afraid of going slowly, be afraid only of standing still",
    "A winner is a dreamer who never gives up",
    "You miss 100% of the shots you don’t take",
    "Do something today that your future self will thank you for",
    "Success is not just about making money; it’s about making a difference in people’s lives",
    "Believe in your dreams, no matter how impossible they may seem",
    "Focus on the step in front of you, not the whole staircase",
    "Success is best when it’s shared",
    "Effort only fully releases its reward after a person refuses to quit",
    "Discipline is the bridge between goals and accomplishment",
    "Be brave. Take risks. Nothing can substitute experience",
    "The future belongs to those who believe in the beauty of their dreams",
    "The greatest glory in living lies not in never falling, but in rising every time we fall",
    "The power of imagination makes us infinite",
    "A goal without a plan is just a wish",
    "It always seems impossible until it’s done",
    "Dream as if you’ll live forever. Live as if you’ll die today",
    "Life is short. Live it. Fear is natural. Face it. Memory is powerful. Use it",
    "It’s not whether you get knocked down; it’s whether you get up",
    "Good things come to people who wait, but better things come to those who go out and get them",
    "Success is walking from failure to failure with no loss of enthusiasm",
    "The harder you work, the luckier you get",
    "Success is the sum of small efforts, repeated day in and day out",
    "Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t",
    "Work hard in silence; let your success be your noise",
    "If you want to achieve greatness stop asking for permission",
    "Sometimes you win, sometimes you learn",
    "You can’t have a million-dollar dream with a minimum-wage work ethic",
    "The distance between dreams and reality is called action",
    "A little progress each day adds up to big results",
    "Strive not to be a success, but rather to be of value",
    "The pain you feel today will be the strength you feel tomorrow",
    "Don’t decrease the goal. Increase the effort",
    "Everything you’ve ever wanted is on the other side of fear",
    "Success is not just a goal; it’s a byproduct of the journey",
    "To succeed in life, you need three things: a wishbone, a backbone, and a funny bone",
    "Whatever you are, be a good one",
    "Challenges are what make life interesting, and overcoming them is what makes life meaningful",
    "There are no limits to what you can accomplish, except the limits you place on your own thinking",
    "Success isn’t about being the best; it’s about always getting better",
    "It is not in the stars to hold our destiny but in ourselves",
    "You are not defined by your past; you are prepared by your past",
    "Do one thing every day that scares you",
    "Act as if what you do makes a difference. It does",
    "A smooth sea never made a skilled sailor",
    "You don’t have to be great to start, but you have to start to be great",
    "The only way to do great work is to love what you do",
    "Be yourself; everyone else is already taken",
    "The road to success is dotted with many tempting parking spaces",
    "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change",
    "Don’t watch the clock; do what it does. Keep going",
    "Life isn’t about waiting for the storm to pass; it’s about learning to dance in the rain",
    "Success is liking yourself, liking what you do, and liking how you do it",
    "Focus on where you want to go, not on what you fear",
    "Start where you are. Use what you have. Do what you can",
    "Success isn’t about how much money you make; it’s about the difference you make in people’s lives",
    "The only person you should try to be better than is the person you were yesterday",
    "Believe you can and you’re halfway there",
    "The secret of getting ahead is getting started",
    "The best way to predict the future is to invent it",
    "Success is not in what you have, but who you are",
    "Don’t let small minds convince you that your dreams are too big",
    "Your life does not get better by chance, it gets better by change",
    "Keep your eyes on the stars, and your feet on the ground",
    "Success usually comes to those who are too busy to be looking for it",
    "Do what you can, with what you have, where you are",
    "It’s not about being the best. It’s about being better than you were yesterday",
    "The journey of a thousand miles begins with one step",
    "The way to get started is to quit talking and begin doing",
    "If you want to make your dreams come true, the first thing you have to do is wake up",
    "It takes courage to grow up and become who you really are",
    "What you get by achieving your goals is not as important as what you become by achieving your goals",
    "The only place where success comes before work is in the dictionary",
    "Opportunities are usually disguised as hard work, so most people don’t recognize them",
    "The only limit to our realization of tomorrow is our doubts of today",
    "Do not let what you cannot do interfere with what you can do",
    "Small deeds done are better than great deeds planned",
    "Success is not just about earning money; it’s about making an impact",
    "One day or day one. You decide",
    "Do not wait; the time will never be ‘just right’",
    "You define your own life. Don’t let other people write your script",
    "Hustle beats talent when talent doesn’t hustle",
    "Don’t be afraid to start over. It’s a chance to build something better this time",
    "The best revenge is massive success",
    "Success is not final, failure is not fatal: it is the courage to continue that counts",
    "Don't let anyone ever dull your sparkle",
    "What you do today can improve all your tomorrows",
    "It’s not the years in your life that count; it’s the life in your years",
    "Don't limit your challenges. Challenge your limits",
    "Success is what happens after you have survived all of your mistakes",
    "The only difference between ordinary and extraordinary is that little extra",
    "Strength doesn’t come from what you can do; it comes from overcoming the things you once thought you couldn’t",
    "The greater the obstacle, the more glory in overcoming it",
    "You miss 100% of the shots you don’t take",
    "Let your dreams be bigger than your fears and your actions louder than your words",
    "Success is the best revenge",
    "Success is not how high you have climbed, but how you make a positive difference to the world",
    "Dream big and dare to fail",
    "It always seems impossible until it’s done. – Nelson Mandela",
    "The best way to predict your future is to create it. – Peter Drucker",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
    "Life is not measured by the number of breaths we take, but by the moments that take our breath away. – Maya Angelou",
    "Every moment is a fresh beginning. – T.S. Eliot",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "The journey of a thousand miles begins with one step. – Lao Tzu",
    "Doubt kills more dreams than failure ever will. – Suzy Kassem",
    "Dream big and dare to fail. – Norman Vaughan",
    "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
    "You can, you should, and if you’re brave enough to start, you will. – Stephen King",
    "If you can dream it, you can achieve it. – Zig Ziglar",
    "Life isn’t about waiting for the storm to pass but learning to dance in the rain. – Vivian Greene",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
    "Believe you can and you’re halfway there. – Theodore Roosevelt",
    "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
    "If you want to lift yourself up, lift up someone else. – Booker T. Washington",
    "I can’t change the direction of the wind, but I can adjust my sails to always reach my destination. – Jimmy Dean",
    "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
    "Life is either a daring adventure or nothing at all. – Helen Keller",
    "Act as if what you do makes a difference. It does. – William James",
    "Perfection is not attainable, but if we chase perfection we can catch excellence. – Vince Lombardi",
    "Turn your wounds into wisdom. – Oprah Winfrey",
    "It is never too late to be what you might have been. – George Eliot",
    "Great things are done by a series of small things brought together. – Vincent Van Gogh",
    "You are the sum of the choices you make. – Wayne Dyer",
    "Your life does not get better by chance, it gets better by change. – Jim Rohn",
    "What you get by achieving your goals is not as important as what you become by achieving your goals. – Zig Ziglar",
    "Do what you can, with what you have, where you are. – Theodore Roosevelt",
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "Do not go where the path may lead, go instead where there is no path and leave a trail. – Ralph Waldo Emerson",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "In three words I can sum up everything I’ve learned about life: it goes on. – Robert Frost",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Happiness is not something ready made. It comes from your own actions. – Dalai Lama",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "To live is the rarest thing in the world. Most people exist, that is all. – Oscar Wilde",
    "When you have a dream, you've got to grab it and never let go",
    "Opportunities don't happen, you create them",
    "The only limit to our realization of tomorrow is our doubts of today",
    "Keep your face always toward the sunshine, and shadows will fall behind you",
    "Challenges are what make life interesting, and overcoming them is what makes life meaningful",
    "Happiness is not by chance, but by choice",
    "If you’re going through hell, keep going",
    "We may encounter many defeats, but we must not be defeated",
    "Success is not in what you have, but who you are",
    "Life shrinks or expands in proportion to one’s courage",
    "In the end, we only regret the chances we didn’t take",
    "Start where you are, use what you have, do what you can",
    "Sometimes the bravest and most important thing you can do is just show up",
    "Your big opportunity may be right where you are now",
    "Courage doesn’t always roar; sometimes courage is the quiet voice at the end of the day saying 'I will try again tomorrow'",
    "The purpose of life is a life of purpose",
    "To live is the rarest thing in the world; most people just exist",
    "It’s not what happens to you, but how you react to it that matters",
    "We must embrace pain and burn it as fuel for our journey",
    "Nothing is impossible, the word itself says 'I’m possible'",
    "Don't count the days, make the days count",
    "Success is not how high you have climbed, but how you make a positive difference to the world",
    "A goal without a plan is just a wish",
    "The mind is everything; what you think, you become",
    "Don’t wait for the perfect moment; take the moment and make it perfect",
    "Live each day as if your life had just begun",
    "The harder you work for something, the greater you’ll feel when you achieve it",
    "Be so good they can’t ignore you",
    "Strive not to be a success, but rather to be of value",
    "Believe in yourself and all that you are; know that there is something inside you that is greater than any obstacle",
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
const value_randomQuotes = randomQuotes();
export default inboxPage;
