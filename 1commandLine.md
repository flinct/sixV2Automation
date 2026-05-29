//-------------------CYPRESS--------------------
$env:CYPRESS_baseUrl="https://dev.example.test"; $env:CYPRESS_loginType="cekerayam01"; npx cypress open

//run time 5 menit WIDGET LOAD
$env:BASE_URL = "https://dev.example.test"; $env:LOG_LEVEL = "debug"; $env:MODE = "throughput"; $env:TARGET_CONNECTIONS = "50"; $env:RUN_DURATION_MS = "300000"; node scripts/widget-socket-load-2.js

$env:BASE_URL = "https://dev.example.test"; $env:MODE="throughput"
$env:TARGET_CONNECTIONS = "50";
$env:RUN_DURATION_MS = "300000"; $env:EMIT_EVERY_MS = "200"; $env:LOG_LEVEL = "info"; node scripts/widget-socket-load-2.js

//shared mode tidak usah kirim prepare_mode / perClient
$env:BASE_URL = "https://dev.example.test";
$env:MODE = "throughput";
$env:TARGET_CONNECTIONS = "50";
$env:PREPARE_MODE = "perClient";
$env:RUN_DURATION_MS = "300000";
$env:EMIT_EVERY_MS = "200";
$env:LOG_LEVEL = "info"; node scripts/widget-socket-load-2.js

//stress test get qr code
$env:BASE_URL = "https://dev.example.test";
$env:CYPRESS_loginType = "cekerayam01";
node scripts/print-k6-env-from-cypress.js | Invoke-Expression

k6 run .\k6\wa_qr_fullflow.js
//-------------------CYPRESS--------------------

-
-
-
-
-
-
- //-------------------PLAYWRIGHT--------------------
  $env:ENV="dev"
$env:LOGIN_TYPE="cekerayam01"
  npx playwright test --ui

$env:ENV="dev"
$env:LOGIN_TYPE="cekerayam01"
npx playwright test "playwright/tests/e2e/auth/login.spec.js" --headed --project=chromium

$env:ENV="dev"
$env:LOGIN_TYPE="cekerayam01"
npx playwright codegen  
//-------------------PLAYWRIGHT--------------------

-
-
-
-
-
-
- //-------------------prompt analisa prd--------------------

dengan rule yang ada
analisa PRD {....}

cari conflict atau requirement yang tidak relevan tapi ada di PRD
impact ketika development dilakukan

dengan rule yang ada
analisa PRD {....} <local-prd-folder>

cari conflict atau requirement yang tidak relevan tapi ada di PRD
impact ketika development dilakukan

bandingkan kedua file, seharusnya contact adalah existing contact yang di prod
contact - context and visibility adalah update feature

## //-------------------prompt analisa prd--------------------

-
-
-
-
-
- //-------------------crikket credentials--------------------

NEXT_PUBLIC_CRIKKET_KEY=crk_Tc-3VeBRCgXtKsj6YeAOt8o7

# Crikket API host (self-hosted: https://qa.satuinbox.dev)

NEXT_PUBLIC_CRIKKET_HOST=https://qa.satuinbox.dev

## //-------------------crikket credentials--------------------

-
-
-
-
-
-
-

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
// 42 / conversations, ["notification.new.message", { "id": "69afd9ea36356229abc6b5cc", "externalMessageId": "3EB035A6DAC1CDC171DCB7", "conversationId": "69ae51d541b5f868986420bc", "sender": { "referenceId": "694b628187314d75441402ac", "name": "Dany Atmin Satu", "type": "agent", "email": "bajol72253@m3player.com", "lastSyncedAt": "2026-03-10T08:44:26.003Z" }, "accountChannel": { "id": "699fa642e4f819f6774b2af1", "name": "akun 1734 4", "phoneNumber": "6280000000000", "accountStatus": "used", "connectionStatus": "active" }, "content": "sending", "direction": "outbound", "type": "text", "status": "pending", "isFromBroadcast": false, "isEdited": false, "timestamp": "2026-03-10T08:44:24.800Z", "primaryMessage": false, "references": [], "isPinned": false, "pinnedAt": null, "isDeleted": false, "isCsat": false, "deletedAt": null, "deletedBy": null, "createdAt": "2026-03-10T08:44:26.003Z", "updatedAt": "2026-03-10T08:45:00.762Z", "**v": 0, "attachments": [], "tempMessageId": "1a9a8caf-46b5-4bce-ac0e-a9c2b8ad0b10", "conversation": null }]
// 42 / conversations, ["message.status", { "\_id": "69afd9ea36356229abc6b5cc", "externalMessageId": "3EB035A6DAC1CDC171DCB7", "conversationId": "69ae51d541b5f868986420bc", "sender": { "referenceId": "694b628187314d75441402ac", "name": "Dany Atmin Satu", "type": "agent", "email": "bajol72253@m3player.com", "lastSyncedAt": "2026-03-10T08:44:26.003Z" }, "accountChannel": { "id": "699fa642e4f819f6774b2af1", "name": "akun 1734 4", "phoneNumber": "6280000000000", "accountStatus": "used", "connectionStatus": "active" }, "content": "sending", "direction": "outbound", "type": "text", "status": "delivered", "isFromBroadcast": false, "isEdited": false, "timestamp": "2026-03-10T08:44:24.800Z", "primaryMessage": false, "references": [], "isPinned": false, "pinnedAt": null, "isDeleted": false, "isCsat": false, "deletedAt": null, "deletedBy": null, "createdAt": "2026-03-10T08:44:26.003Z", "updatedAt": "2026-03-10T08:45:03.060Z", "**v": 0, "deliveredAt": "2026-03-10T08:45:01.925Z", "id": "69afd9ea36356229abc6b5cc" }]
// 42/conversations,["notification.message.status",{"\_id":"69afd9ea36356229abc6b5cc","externalMessageId":"3EB035A6DAC1CDC171DCB7","conversationId":"69ae51d541b5f868986420bc","sender":{"referenceId":"694b628187314d75441402ac","name":"Dany Atmin Satu","type":"agent","email":"bajol72253@m3player.com","lastSyncedAt":"2026-03-10T08:44:26.003Z"},"accountChannel":{"id":"699fa642e4f819f6774b2af1","name":"akun 1734 4","phoneNumber":"6280000000000","accountStatus":"used","connectionStatus":"active"},"content":"sending","direction":"outbound","type":"text","status":"delivered","isFromBroadcast":false,"isEdited":false,"timestamp":"2026-03-10T08:44:24.800Z","primaryMessage":false,"references":[],"isPinned":false,"pinnedAt":null,"isDeleted":false,"isCsat":false,"deletedAt":null,"deletedBy":null,"createdAt":"2026-03-10T08:44:26.003Z","updatedAt":"2026-03-10T08:45:03.060Z","\_\_v":0,"deliveredAt":"2026-03-10T08:45:01.925Z","id":"69afd9ea36356229abc6b5cc"}]
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
// 12. nanti socket meresponse dengan 42/conversations,["message",{"id":"69b2d8d541b5f8689865aa3d","externalMessageId":"48a68fab-2e00-4dc3-bcc5-72fa7da3d9f2","conversationId":"69b2d7e841b5f8689865aa3a","**v":0,"accountChannel":{"id":"6996bcd952ef87df9e414fd3","name":"Complain","accountStatus":"used","connectionStatus":"active"},"content":"eaaa","createdAt":"2026-03-12T15:16:37.257Z","deletedAt":null,"deletedBy":null,"direction":"inbound","isCsat":false,"isDeleted":false,"isEdited":false,"isFromBroadcast":false,"isPinned":false,"pinnedAt":null,"primaryMessage":false,"references":[],"sender":{"referenceId":"69b2d7e841b5f8689865aa39","name":"guest-SE1EHG","type":"client","lastSyncedAt":"2026-03-12T15:02:09.941Z"},"status":"delivered","timestamp":"2026-03-12T15:16:30.041Z","type":"text","updatedAt":"2026-03-12T15:16:37.257Z","attachments":[],"tempMessageId":"48a68fab-2e00-4dc3-bcc5-72fa7da3d9f2"}]
// 12. dan meresponse juga dengan 42/conversations,["notification.new.message",{"id":"69b2d8d541b5f8689865aa3d","externalMessageId":"48a68fab-2e00-4dc3-bcc5-72fa7da3d9f2","conversationId":"69b2d7e841b5f8689865aa3a","**v":0,"accountChannel":{"id":"6996bcd952ef87df9e414fd3","name":"Complain","accountStatus":"used","connectionStatus":"active"},"content":"eaaa","createdAt":"2026-03-12T15:16:37.257Z","deletedAt":null,"deletedBy":null,"direction":"inbound","isCsat":false,"isDeleted":false,"isEdited":false,"isFromBroadcast":false,"isPinned":false,"pinnedAt":null,"primaryMessage":false,"references":[],"sender":{"referenceId":"69b2d7e841b5f8689865aa39","name":"guest-SE1EHG","type":"client","lastSyncedAt":"2026-03-12T15:02:09.941Z"},"status":"delivered","timestamp":"2026-03-12T15:16:30.041Z","type":"text","updatedAt":"2026-03-12T15:16:37.257Z","attachments":[],"tempMessageId":"48a68fab-2e00-4dc3-bcc5-72fa7da3d9f2","conversation":{"\_id":"69b2d7e841b5f8689865aa3a","contactInfo":{"id":"69b2d7e841b5f8689865aa39","referenceId":"747a6c93-8dd1-49c7-a4ba-ca5af4f2799a","displayName":"guest-SE1EHG","lastSyncedAt":"2026-03-12T15:12:40.814Z"},"status":"open","\_\_v":1,"accountChannel":[{"id":"6996bcd952ef87df9e414fd3","name":"Complain","accountStatus":"used","connectionStatus":"active","widgetProperties":{"widgetTopics":[{"topicId":"694b8a685eb17c63021c525b","topicName":"Complain"}]},"vmId":"64b8f0f5e1b1c8a1f0e4d2c5","channel":{"id":"694b68192e63bd3a524ed694","platform":{"id":"68f700860102705ee04ad411","name":"Widget","logo":"/messages","code":"widget","isAddOns":false,"lastSyncedAt":"2026-03-12T15:12:40.852Z"},"lastSyncedAt":"2026-03-12T15:12:40.852Z"},"lastSyncedAt":"2026-03-12T15:12:40.814Z"}],"channel":{"id":"694b68192e63bd3a524ed694","platform":{"id":"68f700860102705ee04ad411","name":"Widget","logo":"/messages","code":"widget","isAddOns":false,"lastSyncedAt":"2026-03-12T15:12:40.852Z"},"lastSyncedAt":"2026-03-12T15:12:40.852Z"},"companyId":"694b4baa2401bb310f0fdf2a","conversationNumber":"CV-635","createdAt":"2026-03-12T15:12:40.851Z","deletedAt":null,"deletedBy":null,"expiresAt":"2026-03-13T15:12:40.814Z","favorites":[],"isDeleted":false,"isGroup":false,"isGroupComment":false,"isJunked":false,"isPinned":false,"lastReEngagementAt":null,"memberContactInfo":[],"metaData":[{"browserName":"Chrome","deviceType":"Desktop","topic":"Complain","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36","Nama 2":"dddd"}],"organizationId":"694b4baa2401bb310f0fdf2c","participants":[],"pinnedAt":null,"pinnedMessage":[],"sessionDetails":[],"spams":[],"tags":[],"unread":0,"updatedAt":"2026-03-12T15:16:37.083Z","team":{"teamId":"69a9c478381e3d13731810bf","name":"Complain","icon":"😎","color":"#BFDBFE"}}}]
