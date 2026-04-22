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

// function getHeaderByLoginType(config, baseUrl, loginType) {
//   if (baseUrl === "https://app.satuinbox.com") {
//     if (loginType === "goddummyprod") return config.headers;
//     if (loginType === "testing270520252")
//       return config.headers_testing270520252;
//   }

//   if (baseUrl === "https://dev.satuinbox.com") {
//     if (loginType === "chickentester") return config.headers_CT;
//     if (loginType === "goddevsa1") return config.headers_GD;
//     if (loginType === "messagelogsatu") return config.headers_ms1;
//   }

//   if (baseUrl === "https://staging.satuinbox.com") {
//     if (loginType === "chickentester") return config.headers_CT_staging;
//     if (loginType === "goddevsa1") return config.headers_GD;
//     if (loginType === "messagelogsatu") return config.headers_ms1;
//   }
// }
// function getLoginBodyByLoginType(config, baseUrl, loginType) {
//   if (baseUrl === "https://app.satuinbox.com") {
//     if (loginType === "goddummyprod") return config.loginBody;
//     if (loginType === "testing270520252")
//       return config.loginBody_testing270520252;
//   }

//   if (baseUrl === "https://dev.satuinbox.com") {
//     if (loginType === "chickentester") return config.loginBody_CT;
//     if (loginType === "goddevsa1") return config.loginBody_SAP;
//     if (loginType === "goddummysa") return config.loginBodySuperAdminSap;
//     if (loginType === "spongebobkotak") return config.loginBody_bikini;
//   }

//   if (baseUrl === "https://staging.satuinbox.com") {
//     if (loginType === "chickentester") return config.loginBody_CT;
//     if (loginType === "goddevsa1") return config.loginBody_SAP;
//     if (loginType === "goddummysa") return config.loginBodySuperAdminSap;
//     if (loginType === "spongebobkotak") return config.loginBody_bikini;
//   }
// }

// const loginBody = getLoginBodyByLoginType(config, baseUrl, loginType);
// const headers = getHeaderByLoginType(config, baseUrl, loginType);

// function formatCustomerNumber(customerNumber) {
//   return customerNumber.replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, "$1 $2 $3 $4");
// }

// const broadcastCount = 4;

// const generateRandomId2 = () => {
//   return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a number between 10000 and 99999
// };

// const randomAWB2 = () => {
//   return Math.floor(10000000 + Math.random() * 90000000).toString();
// };

// const agent = "chicken tester 2";

// const el_chatList = '[data-cy^="chat-list-"]';

// const emptyState_chatListInbox =
//   'div.mt-3.flex.flex-col.items-center.justify-center.space-y-3 p:contains("Belum Ada Pesan")';

// function scroll() {
//   cy.get(el_chatList, { timeout: 2000 })
//     .its("length")
//     .then((count) => {
//       cy.log(`Found ${count} data loaded`);
//       cy.softAssert(count > 0, "Data loaded correctly"); // Use softAssert here

//       // Calculate maximum scroll attempts based on the count
//       const maxScrollAttempts =
//         count < 7 ? 0 : Math.min(8, Math.max(1, Math.ceil(count / 10))); // Limit to a maximum of 8

//       cy.log(`Maximum scroll attempts: ${maxScrollAttempts}`);
//       // Use the calculated maximum scroll attempts
//       if (maxScrollAttempts > 0) {
//         cy.scrollUntilLoaded(
//           "div.custom-scrollbar.overflow-y-auto.h-full.w-full.pb-5", // Scrollable container
//           ".lazy-loaded-item", // Lazy-loaded item selector
//           maxScrollAttempts, // Dynamic maximum scroll attempts
//           300, // Optional scroll step duration
//         );
//       } else {
//         cy.log("Skipping scrolling as count is below 6.");
//       }
//     });
// }

// function getTokenThenBroadcast() {
//   return cy.request({
//     method: "POST",
//     url: `${config.sendBroadcastUrl}${config.parentNumber}`,
//     // body: value_BC,
//     body: {
//       broadcastMessage: [
//         {
//           number_whatsapp_customer: customer_number.toString(),
//           message: `${value_randomQuotes} from : ${config.parentNumber} please reply this BC`,
//           id_template: generateRandomId2(),
//           properties:
//             // [
//             {
//               contactName: `Customer${randomAWB2()}`,
//               division: config.parentNumber,
//               senderName: "TESTER",
//               category: "any",
//               orderId: `AWB-${randomAWB2()}`,
//               batchId: `BATCH00${randomAWB2()}`,
//             },
//           // ]
//         },
//         // {
//         //     "number_whatsapp_customer": "6289655057778",
//         //     "message": "Terima kasih menjadi customer setia kami!, mari antar paketmu ke kami dan paketmu sampi esok hari :) | Broadcast - SAP 2:25PM",
//         //     "id_template": "48688", // id template broadcast (optional)
//         //     "properties":
//         //     // [ //use this when needs multiprops
//         //         {
//         //             "contactName": "ayam",
//         //             "division": "Jawa Barat",
//         //             "senderName": "System-SAP",
//         //             "category": "food and baverage",
//         //             "orderId": "AWB-48928394294", // awb number
//         //             "batchId": "BATCH001" // batch number
//         //         }
//         //     // ]
//         // }
//       ],
//     },
//     headers: {
//       "x-api-key":
//         "7058d1c05c763aaa5d5744baf5c371ae01ed38455d90eb29dd16ccd4bcb47d17",
//     },
//   });
// }

// function generateRandomText(length = 10) {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }
// const randomText = generateRandomText();

// function navigateToInbox_Ongoing_() {
//   cy.inboxOngoingTab().click();
// }
// function navigateToInbox_unassigned_() {
//   cy.inboxUnassignedTab().click();
// }
// function navigateToInbox_resolved_() {
//   cy.inboxResolvedTab().click();
// }

// function writeCombinedLog() {
//   const sessionTimestamp = Cypress.env("sessionLogTimestamp");
//   const inboxLogs = Cypress.env("inboxLogs") || [];
//   const messageLogs = Cypress.env("messageLogs") || [];

//   const sessionLog = {
//     timestamp: sessionTimestamp,
//     inboxLogs,
//     messageLogs,
//   };

//   const fileSafeTime = sessionTimestamp.replace(/:/g, "-"); // avoid ":" in file name
//   const fileName = `cypress/logs/session_log_${fileSafeTime}.json`;

//   // cy.writeFile(fileName, sessionLog);
//   // cy.task("log", `✅ Saved combined session log to ${fileName}`);
//   cy.task("readJsonFile", fileName).then((existingLogs) => {
//     const logsArray = Array.isArray(existingLogs) ? existingLogs : [];
//     logsArray.push(sessionLog);

//     cy.writeFile(fileName, logsArray, { log: false });
//     cy.task("log", `✅ Appended log to ${fileName}`);
//   });
// }

// function interceptResponse() {
//   // cy.intercept("GET", /\/api\/v1\/inbox\/.*/).as("idOneInbox");

//   cy.wait("@idOneInbox").then((interception) => {
//     const responseBody = interception.response.body;
//     const responseBodyInbox = interception.response.body;

//     // const responseBodyContactHistory = responseBody.contact.roomHistory[0];

//     const responseBodyInboxCompany = responseBody.company;
//     const responseBodyInboxContactName = responseBody.accountName;
//     const responseBodyInboxContact = responseBody.accountNumberWhatsapp;
//     const responseBodyInboxCustomerName = responseBody.nameCustomer;
//     const responseBodyInboxCustomerNumber = responseBody.accountNumberWhatsapp;
//     const statusCodeInbox = interception.response.statusCode;

//     // cy.task("log", "Print response body get one inbox : ");
//     // cy.task("log", responseBodyInbox);
//     cy.task("log", "Print company from get one inbox : ");
//     cy.task("log", responseBodyInboxCompany);
//     cy.task("log", "- - - - - - - - - - - - -");
//     cy.task("log", "Print whatsapp name from get one inbox : ");
//     cy.task("log", responseBodyInboxContactName);
//     cy.task("log", "- - - - - - - - - - - - -");
//     cy.task("log", "Print account number whatsapp from get one inbox : ");
//     cy.task("log", responseBodyInboxContact);
//     cy.task("log", "- - - - - - - - - - - - -");
//     cy.task("log", "Print receiver from get one inbox : ");
//     cy.task("log", responseBodyInboxCustomerName);
//     cy.task("log", "- - - - - - - - - - - - -");
//     cy.task("log", "Print receiver number whatsapp from get one inbox : ");
//     cy.task("log", responseBodyInboxCustomerNumber);
//     cy.task("log", "- - - - - - - - - - - - -");
//     cy.task("log", "Print status code get one inbox : ");
//     cy.task("log", statusCodeInbox);
//     cy.task("log", "- - - - - - - - - - - - -");

//     cy.wrap(responseBodyInboxContact).as("responseBodyInboxContact");

//     const logEntry = {
//       timestamp: new Date().toISOString(),
//       statusCodeInbox: statusCodeInbox,
//       responseBodyInboxCompany: responseBodyInboxCompany,
//       responseBodyInboxContactName: responseBodyInboxContactName,
//       responseBodyInboxContact: responseBodyInboxContact,
//       responseBodyInboxCustomerName: responseBodyInboxCustomerName,
//       responseBodyInboxCustomerNumber: responseBodyInboxCustomerNumber,
//     };

//     //push ke inboxLogs
//     const logs = Cypress.env("inboxLogs");
//     logs.push(logEntry);
//     Cypress.env("inboxLogs", logs);
//   });
// }

// function getCustomerNumberList(el_chatList, length_val = 0) {
//   const text_cus_num_value = [];
//   return cy.get("body", { timeout: 2000 }).then(($body) => {
//     if ($body.find(el_chatList).length > length_val) {
//       return cy
//         .get(el_chatList)
//         .each(($els_cust_number) => {
//           cy.wrap($els_cust_number)
//             .find("h1.text-sm")
//             .invoke("text")
//             .then((text_cus_num) => {
//               if (text_cus_num) {
//                 const formattedText = text_cus_num.replace(/\s+/g, "");
//                 text_cus_num_value.push(formattedText);
//               }
//             });
//         })
//         .then(() => {
//           cy.task("log", "List ditemukan : " + text_cus_num_value.join(", "));
//           return cy.wrap(text_cus_num_value).as("customerNumValues");
//           return text_cus_num_value;
//         });
//     } else {
//       cy.task("log", "List kosong").then(() => {
//         cy.reload();
//         cy.wait(2000);
//         return getCustomerNumberList(el_chatList, length_val);
//       });
//     }
//   });
// }

// function assignChatList(el_chatList, textList) {
//   textList.forEach((value) => {
//     cy.get(`${el_chatList}:contains("${value}")`).within(() => {
//       cy.softAssert(cy.checkbox_chatList());
//       cy.wait(500);
//     });
//   });
//   cy.softAssert(cy.selectButton_assign().click());
//   cy.softAssert(cy.simpan_popupModal_min1().click());
//   cy.wait(2000);
//   cy.softAssert(
//     cy.inboxOngoingTab().should("have.attr", "data-state", "active"),
//   );
// }

// function verifyAssigneUsers(el_chatList, textList) {
//   textList.forEach((value) => {
//     let userLoginName;
//     cy.get(`${el_chatList}:contains("${value})`).within(() => {
//       cy.softAssert(
//         cy.checkbox_chatList(),
//         `checking ${value} succes assigned to ongoing`,
//       );
//       cy.contains(value).click();
//     });
//     cy.wait(2000);
//     cy.userLoginNameLabel()
//       .invoke("text")
//       .then((text) => {
//         userLoginName = text.trim();
//       });
//     cy.wait(2000);
//     cy.softAssert(
//       cy
//         .inbox_chat_detail_all_agent()
//         .invoke("text")
//         .then((text2) => {
//           expect(text2.trim()).to.equal(userLoginName);
//           cy.softAssert(
//             cy.inbox_chat_detail_all_agent().contains(userLoginName),
//             "this value is equal to : " + userLoginName,
//           );
//         }),
//     );
//   });
// }

// //wrapNumber, tickallNumber,loopWrapandTick digunakan saat ingin assign/handover semua chat, fungsi ini akan mengulang proses select dan scroll hingga semua number terpilih (NEED ADJUSTMENT)
// let wrappedNumbers = [];

// function wrapNumber(offset = 0) {
//   const text_cus_num_value = [];

//   cy.get(el_chatList)
//     .each(($el, index) => {
//       if (index >= offset && index < offset + 10) {
//         cy.wrap($el)
//           .find("h1.text-sm")
//           .invoke("text")
//           .then((text_cus_num) => {
//             text_cus_num_value.push(text_cus_num);
//             // if (text_cus_num) {
//             //   const formattedText = text_cus_num.replace(/\s+/g, "");
//             //   text_cus_num_value.push(formattedText);
//             // }
//           });
//       }
//     })
//     .then(() => {
//       text_cus_num_value.forEach((text, index) => {
//         cy.task("log", `logArray[${offset + index}]: ${text}`);
//       });

//       wrappedNumbers = wrappedNumbers.concat(text_cus_num_value); // gabungkan ke global array
//       cy.wrap(text_cus_num_value).as("customerNumValues");
//     });
// }

// function tickAllNumber(offset = 0) {
//   cy.get("@customerNumValues").then((values) => {
//     cy.task(
//       "log",
//       `✔️ Tick dari index ${offset} sampai ${offset + values.length - 1}`,
//     );
//     values.forEach((value) => {
//       cy.get(`${el_chatList}:contains("${value}")`).within(() => {
//         cy.softAssert(cy.checkbox_chatList());
//         cy.wait(400);
//       });
//     });
//   });
// }

// function loopWrapAndTick() {
//   let currentOffset = 0;

//   cy.get("@badgeValue").then((badgeVal) => {
//     function nextBatch() {
//       cy.task("log", `🔁 Iterasi offset: ${currentOffset}`);
//       wrapNumber(currentOffset);
//       cy.wait(1000); // tunggu hasil wrapping

//       cy.get("@customerNumValues").then((currentWrapped) => {
//         tickAllNumber(currentOffset);
//         currentOffset += currentWrapped.length;

//         if (wrappedNumbers.length < badgeVal) {
//           // cy.scrollTo("bottom"); // trigger lazy-load jika ada
//           cy.get(el_chatList).last().scrollIntoView();
//           cy.wait(1000);
//           nextBatch();
//         } else {
//           cy.task("log", `✅ Total ticked number: ${wrappedNumbers.length}`);
//         }
//       });
//     }

//     nextBatch(); // mulai loop pertama
//   });
// }

// function wrapNumber2(length_val) {
//   const text_cus_num_value = [];
//   cy.get(el_chatList)
//     .each(($els) => {
//       cy.wrap($els)
//         .find("h1.text-sm")
//         .invoke("text")
//         .then((text_cus_num) => {
//           if (text_cus_num) {
//             const formattedText = text_cus_num.replace(/\s+/g, "");
//             text_cus_num_value.push(text_cus_num);
//           }
//         });
//     })
//     .then(() => {
//       text_cus_num_value.forEach((text, index) => {
//         cy.log(`logArray[${index}]: ${text}`);
//       });
//       expect(text_cus_num_value.length).to.be.greaterThan(length_val);
//       cy.wrap(text_cus_num_value).as("customerNumValues");
//     });
// }

// function tickAllNumber2(maxLoop) {
//   cy.get("@customerNumValues").then((values) => {
//     cy.task("log", "check all number in unassigned tab");
//     values.forEach((value, index) => {
//       if (index < maxLoop) {
//         // Limit the iteration
//         cy.get(`${el_chatList}:contains("${value}")`)
//           // cy.wrap($value)
//           .within(() => {
//             cy.softAssert(cy.checkbox_chatList());
//             cy.wait(400);
//           });
//       }
//     });
//   });
// }

// function validateAssigned(maxLoop) {
//   cy.get("@customerNumValues").then((values) => {
//     let userLoginName;
//     cy.userLoginNameLabel() //change this function
//       .click();
//     cy.softAssert(
//       cy
//         .userLoginNameLabel_valueName()
//         .invoke("text")
//         .then((text) => {
//           userLoginName = text.trim();
//         }),
//     );
//     values.forEach((value, index2) => {
//       if (index2 < maxLoop) {
//         cy.get(`${el_chatList}:contains("${value}")`)
//           .scrollIntoView()
//           .should("be.visible")
//           // cy.wrap($value)
//           .within(() => {
//             cy.softAssert(
//               cy.checkbox_chatList(),
//               `checking ${value} success assigned to ongoing`,
//             );
//             cy.contains(value).click();
//           });
//         cy.wait(2000);
//         cy.wait(2000);
//         cy.softAssert(
//           cy
//             .inbox_chat_detail_all_agent()
//             .invoke("text")
//             .then((text2) => {
//               const value = text2;
//               expect(value.trim()).to.equal(userLoginName);
//               cy.softAssert(
//                 cy.inbox_chat_detail_all_agent().contains(userLoginName),
//                 "this value is equal to :" + userLoginName,
//               );
//             }),
//         );
//         cy.get(el_chatList).eq(0).scrollIntoView();
//         // .scrollTo("top");
//         // cy.scrollUntilLoaded(
//         //   "div.custom-scrollbar.overflow-y-auto.h-full.w-full.pb-5", // Scrollable container
//         //   ".lazy-loaded-item"
//         // ).scrollTo("top");
//       }
//     });
//   });
// }

// function get_multipleList_unassigned() {
//   let length_val = 0;
//   // cy.get("body", { timeout: 2000 }).then(($body) => {
//   cy.log("asd");
//   cy.log(el_chatList.length);
//   if (el_chatList.length > length_val) {
//     cy.log("a");
//     //looping wrap number then tick
//     const allCheckedNumbers = new Set();
//     cy.wait(2000);
//     cy.inboxUnassignedTab()
//       .invoke("text")
//       .then((text) => {
//         const badgeVal = parseInt(text.replace("Unassigned", "").trim());
//         cy.task("log", `Total badge value: ${badgeVal}`);
//         cy.wrap(badgeVal).as("badgeValue");
//       });

//     cy.task(
//       "log",
//       `jumlah list chat yang dibaca cypress : ${el_chatList.length}`,
//     );
//     cy.get("@badgeValue").then((badgeVal) => {
//       cy.log(badgeVal);

//       cy.wrap(badgeVal).as("badgeValue");
//       // loopWrapAndTick();
//       wrapNumber2(length_val);
//       tickAllNumber2(10);
//     });
//     // return;
//   }
//   if (el_chatList.length === length_val) {
//     cy.log("b");
//     cy.task("log", "Unassigned tab kosong, try to relkoad page");
//     cy.reload();
//     cy.wait(2000);
//     get_multipleList_unassigned();
//   }

//   cy.softAssert(cy.selectButton_assign().click()); //click button assign bulk
//   cy.softAssert(cy.simpan_popupModal_min1().click()); //konfirmasi simpan

//   cy.wait(2000);
//   cy.softAssert(
//     cy.inboxOngoingTab().should("have.attr", "data-state", "active"),
//   );

//   validateAssigned(10);
//   cy.bulk_handoverChat().click();
//   cy.simpan_popupModal_min1().click();
// }

class inboxPage {
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
  }
  accessWdigetCodepen() {
    cy.visit("https://codepen.io/pen/");
  }

  validateAccessConversationTeamAsAgent() {}
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
