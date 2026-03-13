// Helper to generate random alphanumeric (e.g., 6 characters)
// const randomAlphanumeric = (length = 6) => {
//   return Math.random()
//     .toString(36)
//     .substring(2, 2 + length)
//     .toUpperCase();
// };

// // Generate random alphanumeric + special characters
// const randomAlphanumericSpecial = (length = 8) => {
//   const chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return result;
// };

// // Helper to generate a UUID v4 (simple version, not cryptographically strong)
// const generateUUID = () => {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
//     const r = (Math.random() * 16) | 0;
//     const v = c === "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// };

// // Static data arrays (can be placed outside the loop)
// const contactNames = [
//   "Andi",
//   "Budi",
//   "Citra",
//   "Dewi",
//   "Eka",
//   "Alice",
//   "Bob",
//   "Charlie",
//   "David",
//   "Eve",
//   "Frank",
//   "Grace",
//   "Hannah",
//   "Ivy",
//   "Jack",
//   "Kara",
//   "Liam",
//   "Mia",
//   "Noah",
//   "Olivia",
//   "Paul",
//   "Quinn",
//   "Riley",
//   "Sophia",
//   "Tyler",
//   "Uma",
//   "Vera",
//   "Will",
//   "Xander",
//   "Yara",
//   "Zane",
//   "Amelia",
//   "Ben",
//   "Clara",
//   "Dylan",
//   "Ella",
//   "Finn",
//   "Gina",
//   "Henry",
//   "Isla",
//   "James",
//   "Kate",
//   "Leo",
//   "Mason",
//   "Nina",
//   "Oscar",
//   "Piper",
//   "Quincy",
//   "Ruby",
//   "Sam",
//   "Tara",
//   "Ulysses",
//   "Violet",
//   "Wyatt",
//   "Xena",
// ];
// const lastNames = [
//   "Smith",
//   "Johnson",
//   "Williams",
//   "Brown",
//   "Jones",
//   "Garcia",
//   "Miller",
//   "Davis",
//   "Rodriguez",
//   "Martinez",
//   "Hernandez",
//   "Lopez",
//   "Gonzalez",
//   "Wilson",
//   "Anderson",
//   "Thomas",
//   "Taylor",
//   "Moore",
//   "Jackson",
//   "Martin",
//   "Lee",
//   "Perez",
//   "Thompson",
//   "White",
//   "Harris",
//   "Sanchez",
//   "Clark",
//   "Ramirez",
//   "Lewis",
//   "Robinson",
//   "Walker",
//   "Young",
//   "Allen",
//   "King",
//   "Wright",
//   "Scott",
//   "Torres",
//   "Nguyen",
//   "Hill",
//   "Flores",
//   "Green",
//   "Adams",
//   "Nelson",
//   "Baker",
//   "Hall",
//   "Rivera",
//   "Campbell",
//   "Mitchell",
//   "Carter",
//   "Roberts",
// ];

// // // Set the base URL according to your target environment
// // const baseUrl = "https://unwinded-diann-protrusile.ngrok-free.dev/"; // local alfaz
// const baseUrl = "https://dev-v2-api.satuinbox.com/"; // dev environment

// // Environment-specific settings
// let channelId, signatureKey, accountChannels;

// if (baseUrl.includes("ngrok-free.dev")) {
//   // Local alfaz configuration
//   channelId = "694222d0c553d64073737291";
//   signatureKey = "sk_mi83pedn_PmN_rMg_OpaV0ecMFtfheZZXoLcdf8N7";
//   accountChannels = [
//     { id: "69422310c553d640737372a6", topic: "amatukam-test widget" },
//     { id: "69684f3fb4118ee5f0a315ba", topic: "test timestaps-test topik" },
//   ];
// } else if (baseUrl.includes("dev-v2-api.satuinbox.com")) {
//   // Dev environment configuration
//   channelId = "692fe8eaaff05e8a1623e0d3";
//   signatureKey = "sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if";
//   accountChannels = [
//     { id: "698ef3aada258f2a5a46bf89", topic: "hey" },
//     { id: "6964ac1d2a5dbde9a5c6fa28", topic: "tumbler biru" },
//     { id: "69783b0154be8e7508b4af08", topic: "CS harga" },
//     { id: "69782d3654be8e7508b4abfe", topic: "Complain" },
//     { id: "6964ab6929de985a0fe73e48", topic: "kipas angin" },
//   ];
// } else {
//   throw new Error("Unknown baseUrl – cannot determine environment");
// }

// describe("Conversation and Socket Test - Multiple Iterations with Dynamic Topics", () => {
//   const iterations = 1; // Change as needed

//   for (let i = 0; i < iterations; i++) {
//     it(`should complete full flow for iteration ${i + 1}`, () => {
//       // Pick a random account channel for this iteration
//       const channel =
//         accountChannels[Math.floor(Math.random() * accountChannels.length)];
//       const accountChannelId = channel.id;
//       const topicName = channel.topic;
//       cy.log(
//         `Iteration ${i + 1}: Using accountChannelId = ${accountChannelId} (topic: "${topicName}")`,
//       );

//       // 1. Generate unique data for this iteration
//       const guestName = `guest-${randomAlphanumeric()}`;
//       const referenceId = generateUUID();

//       // 2. Create client contact
//       cy.request({
//         method: "POST",
//         url: `${baseUrl}open-api/client-contact`,
//         headers: { "x-signature-key": signatureKey },
//         body: {
//           channelId: channelId,
//           metaData: {
//             browserName: "Chrome",
//             deviceType: "Desktop",
//             userAgent:
//               "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
//           },
//           name: guestName,
//           referenceId: referenceId,
//         },
//       }).then((response) => {
//         expect(response.status).to.be.oneOf([200, 201]);
//         const clientContactId = response.body.id;
//         cy.log(`Iteration ${i + 1}: clientContactId = ${clientContactId}`);

//         cy.wait(2000); // Add a short delay before the next request

//         // 3. Submit topic using the selected accountChannelId and topic name
//         return cy
//           .request({
//             method: "POST",
//             url: `${baseUrl}open-api/conversation/submit/topic`,
//             headers: { "x-signature-key": signatureKey },
//             body: {
//               accountChannelId: accountChannelId,
//               clientContactId: clientContactId,
//               metadata: [
//                 {
//                   browserName: "Chrome",
//                   deviceType: "Desktop",
//                   topic: topicName, // Use the dynamic topic name
//                   userAgent:
//                     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
//                 },
//               ],
//             },
//           })
//           .then((resp2) => {
//             expect(resp2.status).to.be.oneOf([200, 201]);
//             // The response may return the same accountChannelId, but we already have it
//             cy.log(`Iteration ${i + 1}: submit/topic successful`);
//             cy.wait(2000); // Add a short delay before connecting socket

//             // 4. Prepare dynamic message content, including the topic name
//             const firstName =
//               contactNames[Math.floor(Math.random() * contactNames.length)];
//             const lastName =
//               lastNames[Math.floor(Math.random() * lastNames.length)];
//             const randomSuffix = randomAlphanumericSpecial(6);
//             const content = `${topicName}: ${firstName} ${lastName} ${randomSuffix}`;
//             cy.log(`Iteration ${i + 1}: message content = "${content}"`);

//             // 5. Connect socket and send inbound message
//             cy.connectSocket(signatureKey, baseUrl);
//             cy.log(`baseUrl = ${baseUrl}`);

//             cy.sendInboundMessage({
//               channelAccountId: accountChannelId,
//               clientContactId: clientContactId,
//               content: content,
//             });

//             // 6. Listen for the new message and verify content
//             // Assumes listenNewMessage returns a chainable that yields the message
//             cy.listenNewMessage().then((receivedData) => {
//               cy.log("Received message:", receivedData);
//               // expect(receivedData).to.have.property("content", content);
//             });

//             // 7. Disconnect socket
//             cy.disconnectSocket();
//           });
//       });
//       cy.wait(2000); // Add a delay between iterations
//     });
//   }
// });

import { connect } from "rxjs";
import conversationSocketPage from "../../support/pages/conversationSocketPage.js";
import notification from "../../support/commands/notification.js";
import { cli } from "cypress";

describe("Conversation and Socket Test - POM Structure", () => {
  const socketAction = new conversationSocketPage();
  const iterations = 1; // Change as needed

  for (let i = 0; i < iterations; i++) {
    it(`should complete full flow for iteration ${i + 1}`, () => {
      // Memanggil metode utama dari Page Object
      socketAction.performSocketFlow(i);

      // Delay antar iterasi (opsional, tergantung kebutuhan timing server)
      cy.wait(200);
    });
  }
});

// inital socket connection :
// sent : 40 / conversations, { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2OTRiNGJhYTI0MDFiYjMxMGYwZmRmMmEiLCJlbWFpbCI6ImJham9sNzIyNTNAbTNwbGF5ZXIuY29tIiwib3JnYW5pemF0aW9uSWQiOiI2OTRiNGJhYTI0MDFiYjMxMGYwZmRmMmMiLCJyb2xlIjp7Il9pZCI6IjY5NGI0YmFhNmU4OTEwNDgzOGMyNTViZCIsImNvZGUiOiJBRE1JTiIsIm5hbWUiOiJBRE1JTiIsInBlcm1pc3Npb24iOlsiKiIsInByaXZhY3k6dmlld19mdWxsX3Bob25lIiwicHJpdmFjeTp2aWV3X2Z1bGxfZW1haWwiXX0sInNlc3Npb25JZCI6ImI3MjFjZTJhLTAyODgtNDYyMy1hOTM0LTg4MTNkOGJhODI0MiIsInN1YiI6IjY5NGI2MjgxODczMTRkNzU0NDE0MDJhYyIsInVzZXJuYW1lIjoiZGFueWF0bWluMDEiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzczMTMwNDg4LCJleHAiOjE3NzMxNzM2ODgsImF1ZCI6InNhdHVpbmJveC11c2VycyIsImlzcyI6InNhdHVpbmJveC1hcHAifQ.nDnlwH02PmOjYbAQGXS2J9x-QIZNCovHtwM0XZFTvOw", "type": "bearer" }

// received :
// 40 / conversations, { "sid": "ss1m7WK-CKu6V7FAAzS9" }
// 42/conversations,["connected",{"clientId":"ss1m7WK-CKu6V7FAAzS9","message":"Client connected: ss1m7WK-CKu6V7FAAzS9 using auth type bearer","timestamp":"2026-03-10T08:41:23.192Z"}]

// join a conversation :
// sent
// 42 / conversations, 0["join.conversation", { "conversationId": "69ae51d541b5f868986420bc" }]

// received
// 43 / conversations, 0[{ "conversationId": "69ae51d541b5f868986420bc", "success": true }]

// send message:
// sent
// 42 / conversations, ["typing.start", { "conversationId": "69ae51d541b5f868986420bc" }]
// 42/conversations,["typing.stop",{"conversationId":"69ae51d541b5f868986420bc"}]
// 42 / conversations, 1["socket.outbound.message", { "content": "a", "conversationId": "69ae51d541b5f868986420bc", "tempMessageId": "71f64ce3-782a-4742-b2a3-17d6ed33570f", "timestamp": "2026-03-10T08:32:44.448Z", "type": "text" }]
// received
// 43 / conversations, 1[{ "success": true }]
// sent
// 42 / conversations, ["typing.stop", { "conversationId": "69ae51d541b5f868986420bc" }]

// notification new message
// 42 / conversations, ["notification.new.message", { "id": "69afd9ea36356229abc6b5cc", "externalMessageId": "3EB035A6DAC1CDC171DCB7", "conversationId": "69ae51d541b5f868986420bc", "sender": { "referenceId": "694b628187314d75441402ac", "name": "Dany Atmin Satu", "type": "agent", "email": "bajol72253@m3player.com", "lastSyncedAt": "2026-03-10T08:44:26.003Z" }, "accountChannel": { "id": "699fa642e4f819f6774b2af1", "name": "akun 1734 4", "phoneNumber": "+6285135431734", "accountStatus": "used", "connectionStatus": "active" }, "content": "sending", "direction": "outbound", "type": "text", "status": "pending", "isFromBroadcast": false, "isEdited": false, "timestamp": "2026-03-10T08:44:24.800Z", "primaryMessage": false, "references": [], "isPinned": false, "pinnedAt": null, "isDeleted": false, "isCsat": false, "deletedAt": null, "deletedBy": null, "createdAt": "2026-03-10T08:44:26.003Z", "updatedAt": "2026-03-10T08:45:00.762Z", "__v": 0, "attachments": [], "tempMessageId": "1a9a8caf-46b5-4bce-ac0e-a9c2b8ad0b10", "conversation": null }]
// 42 / conversations, ["message.status", { "_id": "69afd9ea36356229abc6b5cc", "externalMessageId": "3EB035A6DAC1CDC171DCB7", "conversationId": "69ae51d541b5f868986420bc", "sender": { "referenceId": "694b628187314d75441402ac", "name": "Dany Atmin Satu", "type": "agent", "email": "bajol72253@m3player.com", "lastSyncedAt": "2026-03-10T08:44:26.003Z" }, "accountChannel": { "id": "699fa642e4f819f6774b2af1", "name": "akun 1734 4", "phoneNumber": "+6285135431734", "accountStatus": "used", "connectionStatus": "active" }, "content": "sending", "direction": "outbound", "type": "text", "status": "delivered", "isFromBroadcast": false, "isEdited": false, "timestamp": "2026-03-10T08:44:24.800Z", "primaryMessage": false, "references": [], "isPinned": false, "pinnedAt": null, "isDeleted": false, "isCsat": false, "deletedAt": null, "deletedBy": null, "createdAt": "2026-03-10T08:44:26.003Z", "updatedAt": "2026-03-10T08:45:03.060Z", "__v": 0, "deliveredAt": "2026-03-10T08:45:01.925Z", "id": "69afd9ea36356229abc6b5cc" }]
// 42/conversations,["notification.message.status",{"_id":"69afd9ea36356229abc6b5cc","externalMessageId":"3EB035A6DAC1CDC171DCB7","conversationId":"69ae51d541b5f868986420bc","sender":{"referenceId":"694b628187314d75441402ac","name":"Dany Atmin Satu","type":"agent","email":"bajol72253@m3player.com","lastSyncedAt":"2026-03-10T08:44:26.003Z"},"accountChannel":{"id":"699fa642e4f819f6774b2af1","name":"akun 1734 4","phoneNumber":"+6285135431734","accountStatus":"used","connectionStatus":"active"},"content":"sending","direction":"outbound","type":"text","status":"delivered","isFromBroadcast":false,"isEdited":false,"timestamp":"2026-03-10T08:44:24.800Z","primaryMessage":false,"references":[],"isPinned":false,"pinnedAt":null,"isDeleted":false,"isCsat":false,"deletedAt":null,"deletedBy":null,"createdAt":"2026-03-10T08:44:26.003Z","updatedAt":"2026-03-10T08:45:03.060Z","__v":0,"deliveredAt":"2026-03-10T08:45:01.925Z","id":"69afd9ea36356229abc6b5cc"}]
// 42 / conversations, 0["join.conversation", { "conversationId": "69b13c902f1451435c2e7105" }]
// 42/conversations,1["join.conversation",{"conversationId":"69b13c902f1451435c2e7105"}]

// 42/conversations,["widget.set.user",{"email":"","id":"69b2cfb641b5f8689865a9ee","name":"guest-WA6WX0","phone":"","referenceId":"4c47922f-44f1-4c3a-b5f4-ab695998cef8"}]

// 42/conversations,0["join.conversation",{"conversationId":"69b2cfb641b5f8689865a9ef"}]

// 42/conversations,1["join.conversation",{"conversationId":"69b2cfb641b5f8689865a9ef"}]

// 43/conversations,0[{"conversationId":"69b2cfb641b5f8689865a9ef","success":true}]

// step create widget conversation:
// 1. create client contact (POST /open-api/client-contact)
// 2. submit topic (POST /open-api/conversation/submit/topic)
// 3. dari submit topic, dapatkan conversationId
// 4. kirim event "widget.set.user"
// 5. kirim event 0["join.conversation",{"conversationId":"69b2cfb641b5f8689865a9ef"}] dengan conversationId dari step 3
// 6. kirim event 1["join.conversation",{"conversationId":"69b2cfb641b5f8689865a9ef"}] dengan conversationId dari step 3
// 7. lalu socket akan merespon dengan 43/conversations,0[{"conversationId":"69b2cfb641b5f8689865a9ef","success":true}]
// 8. dan response dari socket 42/conversations,0["join.conversation",{"conversationId":"69b2cfb641b5f8689865a9ef"}] dengan conversationId dari step 3
// 9. baru dari sini bisa kirim event 42/conversations,["typing.start",{"conversationId":"69b2d7e841b5f8689865aa3a"}]
// 10. juga event 42/conversations,["typing.stop",{"conversationId":"69b2d7e841b5f8689865aa3a"}]
// 11 baru event 42/conversations,["socket.inbound.message",{"channelAccountId":"6996bcd952ef87df9e414fd3","clientContactId":"69b2d7e841b5f8689865aa39","content":"eaaa","tempMessageId":"48a68fab-2e00-4dc3-bcc5-72fa7da3d9f2","timestamp":"2026-03-12T15:16:30.041Z","type":"text"}]
// 12. nanti socket meresponse dengan 42/conversations,["message",{"id":"69b2d8d541b5f8689865aa3d","externalMessageId":"48a68fab-2e00-4dc3-bcc5-72fa7da3d9f2","conversationId":"69b2d7e841b5f8689865aa3a","__v":0,"accountChannel":{"id":"6996bcd952ef87df9e414fd3","name":"Complain","accountStatus":"used","connectionStatus":"active"},"content":"eaaa","createdAt":"2026-03-12T15:16:37.257Z","deletedAt":null,"deletedBy":null,"direction":"inbound","isCsat":false,"isDeleted":false,"isEdited":false,"isFromBroadcast":false,"isPinned":false,"pinnedAt":null,"primaryMessage":false,"references":[],"sender":{"referenceId":"69b2d7e841b5f8689865aa39","name":"guest-SE1EHG","type":"client","lastSyncedAt":"2026-03-12T15:02:09.941Z"},"status":"delivered","timestamp":"2026-03-12T15:16:30.041Z","type":"text","updatedAt":"2026-03-12T15:16:37.257Z","attachments":[],"tempMessageId":"48a68fab-2e00-4dc3-bcc5-72fa7da3d9f2"}]
// 12. dan meresponse juga dengan 42/conversations,["notification.new.message",{"id":"69b2d8d541b5f8689865aa3d","externalMessageId":"48a68fab-2e00-4dc3-bcc5-72fa7da3d9f2","conversationId":"69b2d7e841b5f8689865aa3a","__v":0,"accountChannel":{"id":"6996bcd952ef87df9e414fd3","name":"Complain","accountStatus":"used","connectionStatus":"active"},"content":"eaaa","createdAt":"2026-03-12T15:16:37.257Z","deletedAt":null,"deletedBy":null,"direction":"inbound","isCsat":false,"isDeleted":false,"isEdited":false,"isFromBroadcast":false,"isPinned":false,"pinnedAt":null,"primaryMessage":false,"references":[],"sender":{"referenceId":"69b2d7e841b5f8689865aa39","name":"guest-SE1EHG","type":"client","lastSyncedAt":"2026-03-12T15:02:09.941Z"},"status":"delivered","timestamp":"2026-03-12T15:16:30.041Z","type":"text","updatedAt":"2026-03-12T15:16:37.257Z","attachments":[],"tempMessageId":"48a68fab-2e00-4dc3-bcc5-72fa7da3d9f2","conversation":{"_id":"69b2d7e841b5f8689865aa3a","contactInfo":{"id":"69b2d7e841b5f8689865aa39","referenceId":"747a6c93-8dd1-49c7-a4ba-ca5af4f2799a","displayName":"guest-SE1EHG","lastSyncedAt":"2026-03-12T15:12:40.814Z"},"status":"open","__v":1,"accountChannel":[{"id":"6996bcd952ef87df9e414fd3","name":"Complain","accountStatus":"used","connectionStatus":"active","widgetProperties":{"widgetTopics":[{"topicId":"694b8a685eb17c63021c525b","topicName":"Complain"}]},"vmId":"64b8f0f5e1b1c8a1f0e4d2c5","channel":{"id":"694b68192e63bd3a524ed694","platform":{"id":"68f700860102705ee04ad411","name":"Widget","logo":"/messages","code":"widget","isAddOns":false,"lastSyncedAt":"2026-03-12T15:12:40.852Z"},"lastSyncedAt":"2026-03-12T15:12:40.852Z"},"lastSyncedAt":"2026-03-12T15:12:40.814Z"}],"channel":{"id":"694b68192e63bd3a524ed694","platform":{"id":"68f700860102705ee04ad411","name":"Widget","logo":"/messages","code":"widget","isAddOns":false,"lastSyncedAt":"2026-03-12T15:12:40.852Z"},"lastSyncedAt":"2026-03-12T15:12:40.852Z"},"companyId":"694b4baa2401bb310f0fdf2a","conversationNumber":"CV-635","createdAt":"2026-03-12T15:12:40.851Z","deletedAt":null,"deletedBy":null,"expiresAt":"2026-03-13T15:12:40.814Z","favorites":[],"isDeleted":false,"isGroup":false,"isGroupComment":false,"isJunked":false,"isPinned":false,"lastReEngagementAt":null,"memberContactInfo":[],"metaData":[{"browserName":"Chrome","deviceType":"Desktop","topic":"Complain","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36","Nama 2":"dddd"}],"organizationId":"694b4baa2401bb310f0fdf2c","participants":[],"pinnedAt":null,"pinnedMessage":[],"sessionDetails":[],"spams":[],"tags":[],"unread":0,"updatedAt":"2026-03-12T15:16:37.083Z","team":{"teamId":"69a9c478381e3d13731810bf","name":"Complain","icon":"😎","color":"#BFDBFE"}}}]
