// import { number } from 'yargs';
// import { bodyValue_Broadcast } from '../support/bodyValue_BC.js';
import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import { generateRandomQuote } from "../../support/quoteGenerator.js";

const baseUrl = Cypress.config("baseUrl");
const environmentConfig = {
  "https://staging.satuinbox.com": {
    parentNumber: "6285135430944",
    loginBody: { keyword: "goddummystaging", password: "asdqwe12" },
    loginUrl: "https://staging.satuinbox.com/api/v1/auth/login",
    whatsappUrl:
      "https://staging.satuinbox.com/api/v1/account-whatsapp?limit=9000",
    sendMessageUrl: "https://staging.satuinbox.com/api/v1/message/text?key=",
    sendBroadcastUrl:
      "https://staging.satuinbox.com/api/v1/open/broadcast?account_number_whatsapp=",
    getAllAccountWhatsappOpenApiUrl:
      "https://staging.satuinbox.com/api/v1/open/account-whatsapp?limit=9999&account_status=used&status_number_whatsapp=active",
    randomGlobalDelay: Math.floor(Math.random() * 1000) + 300,
  },
  "https://sap.satuinbox.com": {
    parentNumber: "6285147211094",
    loginBody: { keyword: "goddummyprod", password: "TongTji89" },
    loginUrl: "https://api.satuinbox.com/v1/auth/login",
    whatsappUrl: "https://api.satuinbox.com/v1/account-whatsapp?limit=9000",
    sendMessageUrl: "https://api.satuinbox.com/v1/message/text?key=",
    // randomGlobalDelay : Math.floor(Math.random() * 3000000) + 60000, //1 jam wait time
    randomGlobalDelay: Math.floor(Math.random() * 1800000) + 60000, //30 menit wait time
  },
};

const config = environmentConfig[baseUrl];
if (!config) throw new Error(`Unknown baseUrl: ${baseUrl}`);

// const value_BC = bodyValue_Broadcast();

let errorLogs = [];

describe("Spam login and send message", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage();
  const logs = [];
  // before(() => {
  //   loginAndRetrieveTokenAndAccounts();
  // });

  beforeEach(() => {
    cy.session("loginSession", () => {
      authAction.loginValidUsername();
    });
  });

  const valueRandomMessage = [
    "Announcement:'This is a test broadcast message. Please ignore this message and do not block the sender. This is for testing purposes.'",
    "Notice:'This is a dummy message. Kindly disregard and refrain from blocking the sender. This is part of a test.'",
    "Information:'This is a test broadcast. Please do not take action, and avoid blocking the sender. It is solely for testing purposes.'",
    "Reminder:'This is a sample broadcast message for testing. Please ignore and do not block the sender. Thank you for your understanding.'",
    "Announcement: 'This is a dummy broadcast. Please disregard this message, do not block, it is for testing purposes only.'",
  ];
  const getRandomMessage = () => {
    return valueRandomMessage[
      Math.floor(Math.random() * valueRandomMessage.length)
    ];
  };

  const customer_number = [
    // 6282344571978, //mantan hadi

    6289655057778, //danny
    6285135431270, //dummy
    // 6287728940621, //salman
    // 6282120813181, //aldi
    // 6285888339026, //govin
    // 6281395195668, //hadi
    // 6289538411006,
    // 6285736422728, //fikri
    // 6287726947394, //kevin
    // 6289618319350, //mico
    // 6281380745594, //risyandi
    // 6283849306083, //tomi
    // 6285155412232,
    // 6285158722427, //rezky
    // 6285798182929, //adit
  ];
  const sendBroadcast_to_customer_number = () => {
    return customer_number[
      Math.floor(Math.random() * customer_number.length)
    ].toString();
  };

  const generateRandomId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a number between 10000 and 99999
  };

  const randomAWB = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const getActiveAccountForBC = () => {
    return cy
      .request({
        method: "GET",
        url: config.getAllAccountWhatsappOpenApiUrl,
        headers: {
          "x-api-key":
            "7058d1c05c763aaa5d5744baf5c371ae01ed38455d90eb29dd16ccd4bcb47d17",
        },
      })
      .then((response_getActiveAccountForBC) => {
        expect(response_getActiveAccountForBC.status).to.eq(200);
        const accountData = response_getActiveAccountForBC.body.results.map(
          (account) => ({
            account_name: account.account_name,
            account_number_whatsapp: account.account_number_whatsapp,
          })
        );

        // const logString = accountData
        //   .map(account => `Account Name: ${account.account_name}, WhatsApp Number: ${account.account_number_whatsapp}`)
        //   .join(' | ');
        // cy.task('log', `Active Accounts: ${JSON.stringify(accountData)}`);
        // cy.log(logString);
        // cy.wrap(accountData).as('accountData'); // Store it for later use
        return accountData;
      });
  };

  // const sendBroadcast = (account_number_whatsapp) => { //sent from all accoun_number_whatsapp to RANDOM customer_number
  const sendBroadcast = (
    account_number_whatsapp,
    customer_number,
    account_name
  ) => {
    //sent from all account_number_whatsapp to customer_number
    // const numberForBC = accountData.account_number_whatsapp;
    // cy.log(account_name)

    // const customer = sendBroadcast_to_customer_number();
    // cy.log(customer)

    cy.request({
      method: "POST",
      url: `${config.sendBroadcastUrl}${account_number_whatsapp}`,
      // body: value_BC,
      body: {
        broadcastMessage: [
          {
            // "number_whatsapp_customer": customer.toString(),
            number_whatsapp_customer: customer_number.toString(),
            message: `${getRandomMessage()} from : ${account_name} please reply this BC`,
            id_template: generateRandomId(),
            properties: {
              contactName: `Customer${randomAWB()}`,
              division: account_name,
              senderName: "TESTER",
              category: "any",
              orderId: `AWB-${randomAWB()}`,
              batchId: `BATCH00${randomAWB()}`,
            },
          },
        ],
      },
      headers: {
        "x-api-key":
          "7058d1c05c763aaa5d5744baf5c371ae01ed38455d90eb29dd16ccd4bcb47d17",
      },
    }).then((response) => {
      // cy.task('log', `Broadcast sent to ${customer} from ${account_number_whatsapp}. Status: ${response.status}`);
      // cy.task('log', `Broadcast sent to ${customer_number} from ${account_number_whatsapp}. Status: ${response.status}`);
      logs.push(
        `Broadcast sent to ${customer_number} from ${account_number_whatsapp}. Status: ${response.status}`
      );
      expect(response.status).to.eq(200);
    });
    // cy.get('@accountData').then((accountData) =>{
    // })
  };

  // Main test case
  it("send message broadcast", () => {
    cy.wait(config.randomGlobalDelay);
    cy.visit("/setting/account-whatsapp");
    // getActiveAccountForBC()
    // sendBroadcast()

    //sent from all account_number_whatsapp to customer_number
    getActiveAccountForBC().then((accountData) => {
      accountData.forEach((account) => {
        customer_number.forEach((customer) => {
          sendBroadcast(
            account.account_number_whatsapp,
            customer,
            account.account_name
          );
          cy.log(account.account_name);
        });
      });
    });

    //sent from all accoun_number_whatsapp to RANDOM customer_number
    // getActiveAccountForBC().then((accountData) => {
    //   accountData.forEach(account => {
    //     // const broadcastBody = sendBroadcast_to_customer_number();
    //     // const broadcastBody = generateBroadcastBody(sendBroadcast_to_customer_number());
    //     sendBroadcast(account.account_number_whatsapp);
    //   });
    // });

    // cy.log(`${JSON.stringify(logs)}`);
    cy.then(() => {
      logs.forEach((log) => {
        cy.log(log); // Log all messages to Cypress log output
      });
    });
  });
});
