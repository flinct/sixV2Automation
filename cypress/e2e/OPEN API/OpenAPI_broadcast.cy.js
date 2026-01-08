import { method } from "bluebird";
import { env_config } from "../../support/01_url_page.js";
import { numberAWB } from "../../support/awbGenerator.js";
import { generateBatchId } from "../../support/nameAndPhone.js";
import { generateRandomName } from "../../support/nameAndPhone.js";
import { generateRandomDivision } from "../../support/nameAndPhone.js";
import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import {
  generateRandomQuote,
  randomAnswer,
  randomAsk,
} from "../../support/quoteGenerator.js";

describe("Open API broadcast", () => {
  const authAction = new authPage();

  const baseUrl = Cypress.config("baseUrl");

  const config = env_config(baseUrl);

  function body_message(randomQuote) {
    return {
      broadcastMessage: [
        {
          numberWhatsappCustomer: "6289655057778",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285135430934",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285147210599",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285147211100",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285135425746",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285147211129",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285147211061",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285198965975",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285198966005",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
        {
          numberWhatsappCustomer: "6285135421718",
          message: `${generateRandomName()}\n
          your number AWB ${numberAWB()}\n
          ${randomQuote}`,
          // templateId: "86667", // id template broadcast (optional)
          properties: {
            contactName: `${generateRandomName()}`,
            division: `${generateRandomDivision()}`,
            senderName: "System-SAP",
            category: "food and baverage",
            orderId: `AWB- ${numberAWB()}`, // awb number
            batchId: `${generateBatchId()}`, // batch number
          },
        },
      ],
    };
  }

  function getAllList() {
    // numberAirWayBill.forEach((AWBnumber) => {
    cy.request({
      method: "GET",
      url: config.getAllNomorWhatsapp,
      headers: config.headers_ms1,
    }).then((response) => {
      // const accountNumbers = response.body.result.account_number_whatsapp;
      const accountNumbers = response.body.results.map(
        (value) => value.accountNumberWhatsapp
      );

      // const divisionName = response.body.result.map(
      //   (value) => value.division?.divisionName || "unknown"
      // );
      cy.task("log", `Response Body:  ${JSON.stringify(accountNumbers)}`);
      cy.task(
        "log",
        `Total account whatsapp active :  ${JSON.stringify(
          accountNumbers.length
        )}`
      );
      cy.wrap(accountNumbers).as("accountNumbers");
    });
    // })
  }

  function sendBroadcastMessage(accountList, delay, messagePrefix = "") {
    const responseTimes = [];

    accountList.forEach((accountNumbers) => {
      cy.wait(delay).then(() => {
        const randomQuote = generateRandomQuote();
        const startTime = Date.now();
        cy.request({
          method: "POST",
          url: config.openAPI_broadcast + accountNumbers,
          headers: config.headers_ms1,
          body: body_message(randomQuote),
        }).then((response) => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          responseTimes.push(responseTime);
          cy.task(
            "log",
            `response time for ${accountNumbers} : ${responseTime} ms`
          );
        });
        cy.task("log", JSON.stringify(body_message(randomQuote)));
        // cy.softAssert(
        //   cy.dashboardNav(),
        //   `${messagePrefix} send message from ${accountNumbers}`
        // ); //command at CI
      });
    });

    cy.then(() => {
      const total = responseTimes.reduce((sum, val) => sum + val, 0);
      const average =
        responseTimes.length > 0 ? total / responseTimes.length : 0;

      cy.task("log", `responose times recorded : ${responseTimes}`);
      cy.task("log", `total broadcast : ${responseTimes.length}`);
      cy.task("log", `average : ${average.toFixed(2)} ms`);
    });
  }

  function sendChatBetweenAccounts(accountList, delay) {
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: config.loginBody,
    }).then((response) => {
      const accessToken = response.body.tokens.access.token;
      cy.wrap(accessToken).as("accessToken");
      // Cypress.env("accessToken", accessToken);
    });
    cy.task("log", "start");
    getAllList();
    const dummyNumbers = [
      6285135425714, 6285147211084, 6285135431231,
      // , 4, 5, 6, 7, 8
    ];

    cy.get("@accountNumbers").then((accountNumbers) => {
      accountNumbers.forEach((sender) => {
        // dummyNumbers.forEach((sender) => {
        // const otherReceivers = dummyNumbers.filter((r) => r !== sender);
        const otherReceivers = accountNumbers.filter((r) => r !== sender);

        otherReceivers.forEach((receiver) => {
          const delay = Math.floor(Math.random() * 3500) + 1000;
          // const delay = Math.floor(Math.random() * 35) + 10;
          cy.wait(delay).then(() => {
            const randomChat = randomAsk();

            cy.get("@accessToken").then((accessToken) => {
              const startTime2 = Date.now();
              cy.request({
                method: "POST",
                url: config.sendMessageUrl + sender,
                headers: { Authorization: `Bearer ${accessToken}` },
                body: {
                  id: receiver.toString(),
                  message: randomChat,
                  // tempId: "1744903184888",
                },
              }).then((response) => {
                const endTime2 = Date.now();
                const responseTime2 = endTime2 - startTime2;
                cy.task("log", `response time 1 = ${responseTime2}`);
              });
            });
            cy.task("log", `send chat from ${sender} to ${receiver}`);
            cy.task("log", randomChat);
            cy.wait(delay);
            cy.get("@accessToken").then((accessToken) => {
              const startTime3 = Date.now();
              cy.request({
                method: "POST",
                url: config.sendMessageUrl + receiver.toString(),
                headers: { Authorization: `Bearer ${accessToken}` },
                body: {
                  id: sender,
                  message: randomAnswer(),
                  // tempId: "1744903184888",
                },
              }).then((response) => {
                const endTime3 = Date.now();
                const responseTime3 = endTime3 - startTime3;
                cy.task("log", `response time 2 = ${responseTime3}`);
              });
            });
            cy.task("log", `${receiver} reply to ${sender}`);
            cy.task("log", randomChat);
            // cy.log(`reply from receiver ${receiver}`);
            // cy.log(randomAnswer());
          });
          getAllList();
        });
      });
      cy.task("log", "end");
    });
  }

  it("send broadcast from active and used number whatsapp", () => {
    // authAction.login_SAP_superAdmin(); //command at CI
    // cy.visit(config.visit_broadcast); //command at CI
    cy.wait(800);
    getAllList();
    cy.wait(800);
    getAllList();

    cy.get("@accountNumbers").then((accountNumbers) => {
      const repeatCount = 1;
      const delayBetween = Math.floor(Math.random() * 3000) + 1000;

      let delay;
      let prefix = "";

      if (baseUrl === "https://dev.satuinbox.com") {
        delay = config.randomGlobalDelayDev;
        prefix = "";
      } else if (baseUrl === "https://staging.satuinbox.com") {
        delay = config.randomGlobalDelayStaging;
        prefix = "STAGING :";
      } else {
        delay = config.randomGlobalDelay;
        prefix = "PROD :";
      }

      // sendBroadcastMessage(accountNumbers, delay, prefix);
      // cy.log("account number sender:", JSON.stringify(accountNumbers));
      for (let i = 0; i < repeatCount; i++) {
        cy.wait(delayBetween).then(() => {
          // cy.wait(i * delayBetween).then(() => {
          sendBroadcastMessage(accountNumbers, delay, prefix);
          cy.task("log", i);
          cy.task("log", delayBetween);
        });
      }
    });
    // cy.reload(); // command at CI
    cy.wait(800);
    getAllList();
    cy.task("log", "end");
    // cy.wait(1200);
    // sendChatBetweenAccounts();
  });

  // it.skip("send and reply chat antar active number", () => {
  //   sendChatBetweenAccounts();
  // });
});
