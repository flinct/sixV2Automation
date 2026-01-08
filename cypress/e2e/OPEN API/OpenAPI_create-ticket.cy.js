// import { string } from 'yargs';
// import { loginAndRetrieveTokenAndAccounts } from '../support/getDataApi3.js';
import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import {
  getInstruction,
  getPriority,
  getProblems,
  getRandomText,
  generateRandomName,
  generateRandomNamesArray,
  generateRandomPhoneNumber,
  generateRandomDivision,
  generateBatchId,
  generatePOD,
  sellerId,
  sellerName,
  tenantName,
  tenantId,
} from "../../support/nameAndPhone.js";
import { env_config } from "../../support/01_url_page.js";
import { generateRandomQuote } from "../../support/quoteGenerator.js";
import {
  numberAWB,
  numberAWB2,
  awbLincah,
} from "../../support/awbGenerator.js";
import {
  getLoginBodyByLoginType,
  getHeaderByLoginType,
} from "../../support/selectorBase.js";

describe("Open API create ticketing", () => {
  const authAction = new authPage();

  const baseUrl = Cypress.config("baseUrl");
  const loginType = Cypress.env("loginType");
  const config = env_config(baseUrl);
  const awbkhususLincah = awbLincah();

  const selectedHeader = getHeaderByLoginType(config, baseUrl, loginType);
  const selectedBody = getLoginBodyByLoginType(config, baseUrl, loginType);
  const timestamp = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  });

  // "use strict";
  const numberAirWayBill = [
    // "1257042400000485", // commented out
    // "0267862400000635",
    // "0179102400042841",
    // // "0179102400042833",//
    // "0267862400000627",
    // "0179102400042825",
    // // "0179102400042817",//
    // "0179102400042791",
    // "0267842400150697",
    // "0267842400150887",
    // // "0267842400150846",//
    // "0267842400150879",
    // // "0267842400150911",//
    // "0267842400150895",
    // "0267842400150820",
    // "0267842400150812",
    // "0267842400150838",
    // "0267842400150861",
    // // "0267842400150697",
    // "OEX1142056",
    // "OEX1142415",
    // "OEX1141768",
    // "OEX1142546",
    // "OEX1142576",
    // "OEX1141912",
    // "OEX1142594",
    // "OEX1142595",
    // "OEX1142613",
    // "OEX1143241",
    // "OEX1143298",
    // "OEX1143297",
    // "OEX1143309",
    // "OEX1143316",
    // "OEX1143338",
    // "OEX1143349",
    // "OEX1143374",
    // "OEX1143375",
    // "OEX1143380",
    // "OEX1143379",
    // "OEX1143523",
    // "OEX1143534",
    // "OEX1143535",
    // "OEX1143546",
    // "OEX1143570",
    // "OEX1143652",
    // "OEX1143708",
    // "OEX1143763",
    // "OEX1143760",
    // "OEX1143762",
    // "OEX1143765",
    // "OEX1143766",
    // "OEX1143767",
    // "OEX1143768",
    // "OEX1143769",
    // "OEX1143770",
    // "OEX1143774",
    // "OEX1143775",
    // "OEX1143778",
    // "OEX1143779",
    // "OEX1143929",
    // "OEX1143931",
    // "OEX1143932",
    // "OEX1143936",
    // "OEX1143938",
    // "OEX1143939",
    // "OEX1143941",
    // "OEX1143943",
    // "OEX1143944",
    // "OEX1143945",
    // "OEX1143946",
    // "OEX1143949",
    // "OEX1143952",
    // "OEX1143959",
    // "OEX1143963",
    // "OEX1143966"
    "OEX1143349",
  ];

  let responseTimes = [];

  function createTicket(AWBnumber) {
    // numberAirWayBill.forEach((AWBnumber) => {

    const problemName = `atx-single-${getRandomText(8)}`;
    const courierName = `${getPriority()}`;
    const problemTicket = `${getProblems()}`;
    const priority = `${getPriority()}`;
    const instructionTicket = `${getInstruction()}`;
    const sellerId_ = `${sellerId()}`;
    const sellerName_ = `${sellerName()}`;
    const tenantName_ = `${tenantName()}`;
    const tenantId_ = `${tenantId()}`;
    const randomQuoteThread_ = `${generateRandomQuote()}`;

    // cy.log(`Generated problemName: ${problemName}`);
    // cy.log(`Generated courierName: ${courierName}`);
    // cy.log(`Generated problemTicket: ${problemTicket}`);
    // cy.log(`Generated priority: ${priority}`);
    // cy.log(`Generated instructionTicket: ${instructionTicket}`);

    cy.request({
      method: "POST",
      url: config.openAPI_createTicketing,
      // headers: config.headers_CT,
      headers: selectedHeader,
      body: {
        problemName: problemName,
        // problemName: "u8iC6q7YKtvXhdVafj5DLsH5-sapi1",
        //   "messageTicket": [
        //     {
        //       "idMessage": "3F1DE433F02E9FBADEB1",
        //       "from": "628817761425",
        //       "content": "halo",
        //       "media": [
        //         {
        //           "fileName": "1739516782378-pngtree-bakpao-is-asian-traditional-food-cute-illustration-png-image_6547784.jpg",
        //           "fileSize": "117453",
        //           "messageType": "image",
        //           "mimeType": "image/jpeg",
        //           "preview": "https://storage.googleapis.com/sapexpressstorage/ticketing/1739516782378-pngtree-bakpao-is-asian-traditional-food-cute-illustration-png-image_6547784.jpg"
        //         }
        //       ],
        //       "fromMe": false,
        //       "isRead": false,
        //       "name_customer": "Prakasa",
        //       "accountName": "test prakasa",
        //       "agent_name": "broadcast",
        //       "agent_email": "broadcast"
        //     }
        //   ],
        //   "media": [
        //     {
        //       "fileName": "1739516782378-pngtree-bakpao-is-asian-traditional-food-cute-illustration-png-image_6547784.jpg",
        //       "fileSize": "117453",
        //       "messageType": "image",
        //       "mimeType": "image/jpeg",
        //       "preview": "https://storage.googleapis.com/sapexpressstorage/ticketing/1739516782378-pngtree-bakpao-is-asian-traditional-food-cute-illustration-png-image_6547784.jpg"
        //     }
        //   ],
        //   "groupInbox": "6757c0a63d951076efd3044d",
        courierName: courierName,
        //   "numberAirWayBill": "5345852400000201",
        //   "numberAirWayBill": "{{awb}}",
        numberAirWayBill: "OEX1141740",
        //   "numberAirWayBill": "LNCH2507BFVNAD4Y",
        //   "numberAirWayBill": "8888918293891231",
        problemTicket: problemTicket,
        descriptionTicket: problemName,
        priority: priority,
        instructionTicket: instructionTicket,
        source: {
          name: "livechat",
          code: "platform",
        },
        threads: [
          {
            userId: sellerId_,
            userName: sellerName_,
            tenantId: tenantId_,
            tenantName: tenantName_,
            companyId: "2399-atx-23",
            companyName: "random",
            // "role": "seller",
            // "role": "Seller",
            role: "role",
            //"sendTo": "",
            content: randomQuoteThread_,
            media: {
              name: "image.jpg",
              url: "https://example.com/image.jpg",
            },
            // "createdAt": "2025-09-03T15:15:19.113Z",
            // "updatedAt": "2025-09-03T15:15:19.113Z"
          },
        ],
      },
    }).then((createResponse) => {
      cy.log(
        `Response Time for AWB ${AWBnumber}: ${createResponse.duration}ms`
      );
      responseTimes.push(createResponse.duration);
      // get respose body (if needed)
      // cy.log(`Response Body for AWB ${AWBnumber}:`, JSON.stringify(createResponse.body, null, 2));
    });
  }
  // })

  function createTicketBulk(repeatCount, awbType) {
    // numberAirWayBill.forEach((AWBnumber) => {

    const problemName = `atx-bulk-${getRandomText(20)}`;
    // const problemName = `atx-bulk-${getRandomText(20)}`;
    const courierName = `${getPriority()}`;
    const problemTicket = `${getProblems()}`; //harus diterapkan kaya awb kalo mau setiap hit beda problem
    const priority = `${getPriority()}`;
    const instructionTicket = `${getInstruction()}`;
    const sellerId_ = `${sellerId()}`;
    const sellerName_ = `${sellerName()}`;
    const tenantName_ = `${tenantName()}`;
    const tenantId_ = `${tenantId()}`;
    const randomQuoteThread_ = `${generateRandomQuote()}`;
    const abwList = awbLincah();
    const selectingAwb = abwList.slice(0, repeatCount);
    // const abwList = numberAWB2();
    // const abwList = numberAWB();

    // cy.log(`ayam : ${selectingAwb}`);
    let bodyTicketArray;

    if (awbType === "dummy") {
      //use this for bulk with dummy
      bodyTicketArray = Array.from({ length: repeatCount }, () => ({
        problemName: problemName,
        courierName: courierName,
        numberAirWayBill: "OEX1141740", // selalu pakai AWB yang sama
        problemTicket: problemTicket,
        descriptionTicket: problemName,
        priority: priority,
        instructionTicket: instructionTicket,
        source: {
          name: "livechat",
          code: "platform",
        },
        threads: [
          {
            userId: sellerId_,
            userName: sellerName_,
            tenantId: tenantId_,
            tenantName: tenantName_,
            companyId: "2399-atx-23",
            companyName: "random",
            // "role": "seller",
            // "role": "Seller",
            role: "{{role}}",
            //"sendTo": "",
            content: randomQuoteThread_,
            media: {
              name: "image.jpg",
              url: "https://example.com/image.jpg",
            },
            // "createdAt": "2025-09-03T15:15:19.113Z",
            // "updatedAt": "2025-09-03T15:15:19.113Z"
          },
        ],
      })); //bulk dengan 1 awb
    } else {
      //bulk dengan multiple awb
      bodyTicketArray = selectingAwb.map((awb) => ({
        problemName: problemName,
        // problemName: "u8iC6q7YKtvXhdVafj5DLsH5-sapi1",
        //   "messageTicket": [
        //     {
        //       "idMessage": "3F1DE433F02E9FBADEB1",
        //       "from": "628817761425",
        //       "content": "halo",
        //       "media": [
        //         {
        //           "fileName": "1739516782378-pngtree-bakpao-is-asian-traditional-food-cute-illustration-png-image_6547784.jpg",
        //           "fileSize": "117453",
        //           "messageType": "image",
        //           "mimeType": "image/jpeg",
        //           "preview": "https://storage.googleapis.com/sapexpressstorage/ticketing/1739516782378-pngtree-bakpao-is-asian-traditional-food-cute-illustration-png-image_6547784.jpg"
        //         }
        //       ],
        //       "fromMe": false,
        //       "isRead": false,
        //       "name_customer": "Prakasa",
        //       "accountName": "test prakasa",
        //       "agent_name": "broadcast",
        //       "agent_email": "broadcast"
        //     }
        //   ],
        //   "media": [
        //     {
        //       "fileName": "1739516782378-pngtree-bakpao-is-asian-traditional-food-cute-illustration-png-image_6547784.jpg",
        //       "fileSize": "117453",
        //       "messageType": "image",
        //       "mimeType": "image/jpeg",
        //       "preview": "https://storage.googleapis.com/sapexpressstorage/ticketing/1739516782378-pngtree-bakpao-is-asian-traditional-food-cute-illustration-png-image_6547784.jpg"
        //     }
        //   ],
        //   "groupInbox": "6757c0a63d951076efd3044d",
        courierName: courierName,
        //   "numberAirWayBill": "5345852400000201",
        numberAirWayBill: awb,
        // numberAirWayBill: abwList,
        // numberAirWayBill: numberAirWayBill2,
        // numberAirWayBill: "OEX1141740",
        //   "numberAirWayBill": "LNCH2507BFVNAD4Y",
        //   "numberAirWayBill": "8888918293891231",
        problemTicket: problemTicket,
        descriptionTicket: problemName,
        priority: priority,
        instructionTicket: instructionTicket,
        source: {
          name: "livechat",
          code: "platform",
        },
        threads: [
          {
            userId: sellerId_,
            userName: sellerName_,
            tenantId: tenantId_,
            tenantName: tenantName_,
            companyId: "2399-atx-23",
            companyName: "random",
            // "role": "seller",
            // "role": "Seller",
            role: "role",
            //"sendTo": "",
            content: randomQuoteThread_,
            media: {
              name: "image.jpg",
              url: "https://example.com/image.jpg",
            },
            // "createdAt": "2025-09-03T15:15:19.113Z",
            // "updatedAt": "2025-09-03T15:15:19.113Z"
          },
        ],
      }));
    }

    cy.writeFile(
      "cypress/logs/bodyTicketArray.txt",
      JSON.stringify(bodyTicketArray, null, 2)
    );

    cy.log(`Generated problemName: ${problemName}`);
    cy.log(`Generated courierName: ${courierName}`);
    cy.log(`Generated problemTicket: ${problemTicket}`);
    cy.log(`Generated priority: ${priority}`);
    cy.log(`Generated instructionTicket: ${instructionTicket}`);
    cy.log(`body ticket array : ${JSON.stringify(bodyTicketArray)}`);
    cy.task("log", `body ticket array : ${JSON.stringify(bodyTicketArray)}`);
    // cy.log(JSON.stringify(bodyTicketArray2));
    cy.request({
      method: "POST",
      url: config.openAPI_createBULKTicketing,
      // headers: config.headers_CT,
      headers: selectedHeader,
      body: {
        ticketing: bodyTicketArray,
        // ticketing: bodyTicketArray2,
      },
    }).then((createResponse) => {
      cy.task(
        "log",
        `Response Time for Create Bulk Ticket: ${createResponse.duration}ms > ${timestamp}`
        // `Response Time for AWB ${AWBnumber}: ${createResponse.duration}ms`
      );
      cy.task(
        "log",
        `Response Body Create Bulk Ticket: ${JSON.stringify(
          createResponse.body,
          null,
          2
        )}`
      );
      responseTimes.push(createResponse.duration);
      // get respose body (if needed)
      // cy.log(`Response Body for AWB ${AWBnumber}:`, JSON.stringify(createResponse.body, null, 2));
    });
  }
  // })

  it.only("create single ticket from open API", () => {
    const repeatCount = 10;
    // const repeatCount = 100;
    // const repeatCount = 500;

    //create ticket with endpoint bulk but single data
    for (let count = 0; count < repeatCount; count++) {
      //command if using awb data from awbGenerator
      createTicket();

      //use this to take awb data from awbGenerator
      // awbkhususLincah.forEach((awb) => {
      //   // numberAirWayBill.forEach((awb) => {
      //   // cy.log(`${getRandomText(25)}`);
      //   createTicket(awb);
      // });
    }
    // cy.then(() => {
    //   const totalResponseTime = responseTimes.reduce(
    //     (sum, time) => sum + time,
    //     0
    //   );
    //   const averageResponseTime = totalResponseTime / responseTimes.length;

    //   cy.log(`average response time : ${averageResponseTime.toFixed(2)}ms`);

    //   //add detail to report
    //   // this.test.title += ` | Avg Response Time: ${averageResponseTime.toFixed(2)}ms`;
    //   cy.task(
    //     "log",
    //     `Average Response Time: ${averageResponseTime.toFixed(2)}ms`
    //   );
    //   // cy.screenshot('final-average-response-time');

    //   cy.document().then((doc) => {
    //     const avgElement = doc.createElement("div");
    //     avgElement.setAttribute("id", "avgLogElement");
    //     avgElement.innerText = `Average Response Time: ${averageResponseTime.toFixed(
    //       2
    //     )}ms`;
    //     doc.body.appendChild(avgElement);
    //   });

    //   // Take a screenshot of the average response log element
    //   cy.get("#avgLogElement").screenshot("final-average-response-time");
    // });
  });
  it("create bulk ticket from open API", () => {
    const repeatCount = 5;
    const awbType = "dummy";
    createTicketBulk(repeatCount, awbType);
    // createTicketBulk(repeatCount);
  });
});
