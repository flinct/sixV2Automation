import { forEach } from "async";
import { timeout } from "async";
import { action } from "commander";
import { env_config } from "../01_url_page.js";
import { timestamp } from "rxjs";
import { times } from "lodash";
import elementNavigation from "../commands/navigation.js";
import elementConversation from "../commands/inbox_.js";
import { id } from "common-tags";

const baseUrl = Cypress.config("baseUrl");
// const baseUrl = "https://unwinded-diann-protrusile.ngrok-free.dev/"; // local alfaz;
const loginType = Cypress.env("loginType");

const config = env_config(baseUrl);

// support/pages/conversationSocketPage.js
class conversationSocketPage {
  constructor() {
    this.baseUrl = Cypress.config("baseUrl");
    this.config = this.resolveEnvironmentConfig(this.baseUrl);
  }

  // Helper: Menentukan konfigurasi berdasarkan environment
  resolveEnvironmentConfig(baseUrl) {
    if (baseUrl.includes("ngrok-free.dev")) {
      return {
        channelId: "694222d0c553d64073737291",
        signatureKey: "sk_mi83pedn_PmN_rMg_OpaV0ecMFtfheZZXoLcdf8N7",
        accountChannels: [
          { id: "69422310c553d640737372a6", topic: "amatukam-test widget" },
          {
            id: "69684f3fb4118ee5f0a315ba",
            topic: "test timestaps-test topik",
          },
        ],
      };
    }

    if (baseUrl.includes("dev-v2.satuinbox.com")) {
      return {
        channelId: "692fe8eaaff05e8a1623e0d3",
        signatureKey: "sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if",
        accountChannels: [
          { id: "698ef3aada258f2a5a46bf89", topic: "hey" },
          { id: "6964ac1d2a5dbde9a5c6fa28", topic: "tumbler biru" },
          { id: "69783b0154be8e7508b4af08", topic: "CS harga" },
          { id: "69782d3654be8e7508b4abfe", topic: "Complain" },
          { id: "6964ab6929de985a0fe73e48", topic: "kipas angin" },
        ],
      };
    }

    throw new Error(`Unknown baseUrl: ${baseUrl}`);
  }

  // Helper: Generate Random Data
  generateData() {
    const randomAlphanumeric = (length = 6) =>
      Math.random()
        .toString(36)
        .substring(2, 2 + length)
        .toUpperCase();

    const randomAlphanumericSpecial = (length = 8) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result;
    };

    const generateUUID = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };

    const contactNames = [
      "Andi",
      "Budi",
      "Citra",
      "Dewi",
      "Eka",
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Eve",
      "Frank",
      "Grace",
      "Hannah",
      "Ivy",
      "Jack",
      "Kara",
      "Liam",
      "Mia",
      "Noah",
      "Olivia",
      "Paul",
      "Quinn",
      "Riley",
      "Sophia",
      "Tyler",
      "Uma",
      "Vera",
      "Will",
      "Xander",
      "Yara",
      "Zane",
      "Amelia",
      "Ben",
      "Clara",
      "Dylan",
      "Ella",
      "Finn",
      "Gina",
      "Henry",
      "Isla",
      "James",
      "Kate",
      "Leo",
      "Mason",
      "Nina",
      "Oscar",
      "Piper",
      "Quincy",
      "Ruby",
      "Sam",
      "Tara",
      "Ulysses",
      "Violet",
      "Wyatt",
      "Xena",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Hernandez",
      "Lopez",
      "Gonzalez",
      "Wilson",
      "Anderson",
      "Thomas",
      "Taylor",
      "Moore",
      "Jackson",
      "Martin",
      "Lee",
      "Perez",
      "Thompson",
      "White",
      "Harris",
      "Sanchez",
      "Clark",
      "Ramirez",
      "Lewis",
      "Robinson",
      "Walker",
      "Young",
      "Allen",
      "King",
      "Wright",
      "Scott",
      "Torres",
      "Nguyen",
      "Hill",
      "Flores",
      "Green",
      "Adams",
      "Nelson",
      "Baker",
      "Hall",
      "Rivera",
      "Campbell",
      "Mitchell",
      "Carter",
      "Roberts",
    ];

    return {
      guestName: `guest-${randomAlphanumeric()}`,
      referenceId: generateUUID(),
      randomSuffix: randomAlphanumericSpecial(6),
      firstName: contactNames[Math.floor(Math.random() * contactNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    };
  }

  // Action: Create Client Contact
  createClientContact(guestName, referenceId) {
    return cy.request({
      method: "POST",
      url: config.clientContact,
      headers: { "x-signature-key": this.config.signatureKey },
      body: {
        channelId: this.config.channelId,
        metaData: {
          browserName: "Chrome",
          deviceType: "Desktop",
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
        },
        name: guestName,
        referenceId: referenceId,
      },
    });
  }

  // Action: Submit Topic
  submitTopic(clientContactId, accountChannelId, topicName) {
    return cy.request({
      method: "POST",
      url: config.submitTopic,
      headers: { "x-signature-key": this.config.signatureKey },
      body: {
        accountChannelId: accountChannelId,
        clientContactId: clientContactId,
        metadata: [
          {
            browserName: "Chrome",
            deviceType: "Desktop",
            topic: topicName,
            userAgent:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
          },
        ],
      },
    });
  }

  // Main Action: Execute Full Socket Flow
  performSocketFlow(iterationIndex) {
    // 1. Pick Random Channel
    const channel =
      this.config.accountChannels[
        Math.floor(Math.random() * this.config.accountChannels.length)
      ];
    const accountChannelId = channel.id;
    const topicName = channel.topic;

    cy.log(
      `Iteration ${iterationIndex + 1}: Using accountChannelId = ${accountChannelId} (topic: "${topicName}")`,
    );

    // 2. Generate Data
    const data = this.generateData();
    const content = `${topicName}: ${data.firstName} ${data.lastName} ${data.randomSuffix}`;

    cy.log(`Iteration ${iterationIndex + 1}: guestName = ${data.guestName}`);
    cy.log(`Iteration ${iterationIndex + 1}: message content = "${content}"`);

    // 3. Chain API calls and Socket actions
    this.createClientContact(data.guestName, data.referenceId).then(
      (response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        const clientContactId = response.body.id;
        cy.log(JSON.stringify(response.body));
        cy.wait(200);

        this.submitTopic(clientContactId, accountChannelId, topicName).then(
          (resp2) => {
            expect(resp2.status).to.be.oneOf([200, 201]);
            cy.log(`Iteration ${iterationIndex + 1}: submit/topic successful`);
            cy.wait(200);

            // 4. Socket Interactions using Custom Commands
            cy.connectSocket(this.config.signatureKey, this.baseUrl);
            cy.log(`baseUrl = ${this.baseUrl}`);

            cy.sendInboundMessage({
              channelAccountId: accountChannelId,
              clientContactId: clientContactId,
              content: content,
            });

            // 5. Listen and Verify
            cy.listenNewMessage().then((receivedData) => {
              cy.log("Received message:", receivedData);
              // expect(receivedData).to.have.property("content", content);
            });

            // 6. Disconnect
            cy.disconnectSocket();
          },
        );
      },
    );
  }
}

export default conversationSocketPage;
