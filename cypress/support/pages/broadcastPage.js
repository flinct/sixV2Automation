import userDataSpam from "../data/spamLogin.js";
import elementAuth from "../commands/auth.js";
import elementToast from "../commands/notification.js";
import {
  getLoginBodyByLoginType,
  getHeaderByLoginType,
} from "../selectorBase.js";
import { log, timeout } from "async";
import { env_config } from "../01_url_page.js";
import "cypress-mailslurp";
import { includes } from "lodash";
import * as randomMessage from "../quoteGenerator.js";

const baseUrl = Cypress.config("baseUrl");
const loginType = Cypress.env("loginType");
const randomNumber = Math.floor(10000000 + Math.random() * 10000000);
const randomSortNumber = Math.floor(10 + Math.random() * 10);
const randomNumber2 = Math.floor(Math.random() * 1000) + 1000;
const randomPhoneNumber = Math.floor(100000000 + Math.random() * 100000000);
const nib = Math.floor(1000000000000 + Math.random() * 1000000000000); //13 digits
const npwp = Math.floor(100000000000000 + Math.random() * 100000000000000); //15 digits
const idNumber = Math.floor(
  1000000000000000 + Math.random() * 1000000000000000,
); //16 digits
const generateRandomText = (length = 6) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
const indentifierRegres = "cyt ";

const config = env_config(baseUrl);

class broadcastPage {
  getAllList(config, selectedHeader, selectedBody) {
    cy.request({
      method: "GET",
      url: config.getAllNomorWhatsapp,
      // headers: config.headers_ms1,
      // headers: config.headers_CT,
      headers: selectedHeader,
      // headers: config.headers_testing270520252,
    }).then((response) => {
      const getDataTeamAndNumber = response.body;
      // cy.log("Response Body:", JSON.stringify(r));
      let whatsappAccount = [];
      let inactiveAccounts = [];

      getDataTeamAndNumber.items.forEach((item) => {
        if (item.accountChannels && Array.isArray(item.accountChannels)) {
          const waChannel = item.accountChannels.find(
            (channel) =>
              channel.platform === "Whatsapp Web" &&
              channel.connectionStatus === "active" &&
              channel.accountStatus === "used",
          );

          if (waChannel) {
            whatsappAccount.push({
              name: item.name,
              accountChannelName: waChannel.name,
              phoneNumber: waChannel.phoneNumber,
            });
          }
        }
      });

      getDataTeamAndNumber.items.forEach((item) => {
        if (item.accountChannels && Array.isArray(item.accountChannels)) {
          const inactiveChannel = item.accountChannels.find(
            (channel) =>
              channel.platform === "Whatsapp Web" &&
              channel.connectionStatus === "inactive" &&
              channel.accountStatus === "used",
          );

          if (inactiveChannel) {
            inactiveAccounts.push({
              name: item.name,
              accountChannelName: inactiveChannel.name,
              phoneNumber: inactiveChannel.phoneNumber,
            });
          }
        }
      });

      cy.log(`Total Whatsapp Web Accounts: ${whatsappAccount.length}`);
      cy.log("Whatsapp Web Accounts:", JSON.stringify(whatsappAccount));
      cy.wrap(whatsappAccount).as("whatsappAccounts");

      cy.log(
        `Total INACTIVE Whatsapp Web Accounts: ${inactiveAccounts.length}`,
      );
      cy.log("Whatsapp Web Accounts:", JSON.stringify(inactiveAccounts));

      // return whatsappAccount;
    });
    // })
  }

  bodyMessage(sender) {
    const functions = [
      randomMessage.generateRandomQuote,
      randomMessage.randomAsk,
      randomMessage.randomAsk2,
      randomMessage.randomAsk3,
      randomMessage.randomAsk4,
      randomMessage.randomAsk5,
      randomMessage.randomAsk6,
      randomMessage.randomAnswer,
    ];

    // Pilih fungsi secara random dan panggil
    const randomIndex = Math.floor(Math.random() * functions.length);
    const selectedFunction = functions[randomIndex];
    const randomValue = selectedFunction();

    // const randomValue = randomMessage.generateRandomQuote();

    cy.log("log usedMessage : ", randomValue);
    return {
      name: `bcName sender ${sender}`,
      channel: "whatsapp_web",
      sender: sender,
      audience: ["6289655057778"],
      message: `${randomValue}, test BC from ${sender}`,
      // scheduleAt: "{{scheduleAt}}",
      scheduleAt: "2026-02-04T22:00:31.198Z",
      properties: [
        {
          contactName: "{{randomContact}}",
          AirwayBill: "{{awbNumber}}",
          awbNumber: "{{awbNumber}}",
          awb: "{{awbNumber}}",
          proofOfDeliveryNo: "{{awbNumber}}",
          scheduleVar: "{{scheduleAtVariation}}",
          scheduleAt: "{{scheduleAt}}",
          value: randomValue,
          reasonPOD: "reason",
        },
      ],
    };
  }

  sendbroadcast(config, selectedHeader, selectedBody) {
    cy.get("@whatsappAccounts").then((accounts) => {
      cy.log(accounts);
      // const accountNumbers = accounts.map((acc) => acc.phoneNumber);
      // cy.log("account number sender:", JSON.stringify(accountNumbers));
      accounts.forEach((acc) => {
        const usedPhoneNumber = acc.phoneNumber.replace(/\+/g, "");
        cy.log(`Sending broadcast from ${usedPhoneNumber}`);
        cy.request({
          method: "POST",
          url: config.sendBroadcastUrl,
          headers: selectedHeader,
          body: this.bodyMessage(usedPhoneNumber),
        }).then((response) => {
          cy.log(`Broadcast sent from ${usedPhoneNumber}`);
          cy.log(JSON.stringify(response.body));
        });
      });
    });
  }
}
export default broadcastPage;
