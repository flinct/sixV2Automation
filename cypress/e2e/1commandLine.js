//open runner
$env:CYPRESS_baseUrl="https://dev.satuinbox.com"; $env:CYPRESS_loginType="chickentester"; npx cypress open

//run specific spec
$env: CYPRESS_baseUrl = "https://dev.satuinbox.com"; $env: CYPRESS_loginType = "chickentester"; npx cypress run--spec "cypress/e2e/OPEN API/OpenAPI_broadcast.cy.js"

$env: CYPRESS_baseUrl = "https://dev.satuinbox.com"; $env: CYPRESS_loginType = "chickentester"; npx cypress run--spec "cypress/e2e/REGRESI/2_Regres_inboxAction.cy.js"

$env:CYPRESS_baseUrl="https://app.satuinbox.com"; $env:CYPRESS_loginType="goddummyprod";  npx cypress run --env taskType=monitoring --spec "cypress/e2e/OPEN API/OpenAPI_monitoringActiveNumber_SAP.cy.js"


k6 run "test/OPEN API/OPEN_create_Bulk_Ticket.js"


//ubah nama json untuk kirim email
node rename-report.js

//kirim email
node send-report.js

//run rename-report and send report
npm run copysend

//ssh qa
ssh -i qa-automation.pem ubuntu@13.250.107.154

git init
git remote add origin git@gitlab.com:username/nama-repo.git
git add .
git commit -m "Initial commit"
git push -u origin main

command untuk putty :
login as: risyandi

risyandi@gcp-id-nprd-app-01:~$ cd ..

risyandi@gcp-id-nprd-app-01:/home$ cd ..

risyandi@gcp-id-nprd-app-01:/$ ls -l

risyandi@gcp-id-nprd-app-01:/$ cd srv

risyandi@gcp-id-nprd-app-01:/srv$ ls

risyandi@gcp-id-nprd-app-01:/srv$ cd chat-wa-broadcast-staging
risyandi@gcp-id-nprd-app-01:/srv/chat-wa-broadcast-staging$ docker compose logs

risyandi@gcp-id-nprd-app-01:~$ ls
CI-Satuinbox
risyandi@gcp-id-nprd-app-01:~$ cd CI-Satuinbox/
risyandi@gcp-id-nprd-app-01:~/CI-Satuinbox$ ls
Dockerfile cypress cypress.config.js docker-compose.yml login.cy.js package-lock.json package.json
risyandi@gcp-id-nprd-app-01:~/CI-Satuinbox$ git pull
docker compose up --build --detach ==up code

crontab -e ==edit
-l ==list
ctr o ==untuk save
ctr x ==untuk exit

//for extract data-cy
allow pasting

const dataCyElements = Array.from(document.querySelectorAll('[data-cy]'));
const dataCyList = dataCyElements.map(el => el.getAttribute('data-cy'));
console.log(`data-cy= ${dataCyList.join(', ')}`);

[...document.querySelectorAll('[data-cy]')].map(el => el.getAttribute('data-cy'))
[...document.querySelectorAll('[data-testid]')].map(el => el.getAttribute('data-testid'))

git remote remove origin
git remote add origin https://github.com/flinct/SatuInbox.git
git branch -M maiun
git branch -M main
git push -u origin main

  {
    "$set": {
      "feature.dashboard.access": true,
      "feature.inbox.access": true,
      "feature.broadcast.access": true,
      "feature.ticketing.access": true,
      "feature.ticketing.viewAll": true,
      "feature.ticketing.viewSpecificByUserAgent": false,
      "feature.ticketing.viewSpecificByDivision": false ,
      "feature.ticketing.create": true,
      "feature.ticketing.import": true,
      "feature.ticketing.export": true,
      "feature.ticketing.bulkUpload": true,
      "feature.ticketing.solve": true,
      "feature.ticketing.reopen": true,
      "feature.ticketing.reopenBulk": true,
      "feature.ticketing.changePriority": true,
      "feature.ticketing.delete": true,
      "feature.ticketing.changeProblem": true,
      "feature.ticketing.changeInstruction": true,
      "feature.ticketing.setting": true,
      "feature.ticketing.viewDetail": true,
      "feature.ticketing.addTag": true,
      "feature.ticketing.addMedia": true,
      "feature.ticketing.sendMessageThread": true,
      "feature.ticketing.manageTag": true,
      "feature.ticketing.removeTag": true,
      "feature.groupInbox.access": true,
      "feature.users.access": true,
      "feature.templateMessages.access": true,
      "feature.accountWhatsapp.access": true,
      "feature.accountWhatsapp.create": true,
      "feature.accountWhatsapp.edit": true,
      "feature.accountWhatsapp.delete": true,
      "feature.accountWhatsapp.login": true,
      "feature.accountWhatsapp.logout": true,
      "feature.division.access": true,
      "feature.groupDivision.access": true,
      "feature.workingHour.access": true,
      "feature.contact.access": true,
      "feature.templateBroadcast.access": true,
      "feature.liveChat.access": true,
      "feature.liveChat.channelSettingChatWidgetSetting": true,
      "feature.liveChat.channelSettingComingSoon": true,
      "feature.liveChat.settingLivechatHandlerByDivision": true,
      "feature.liveChat.settingLivechatHandlerByUserAgent": true,
      "feature.liveChat.crossDivisionSetting": true,
      "feature.liveChat.sendMessage": true,
      "feature.liveChat.createTicketFromLivechat": true,
      "feature.liveChat.viewAllContent": true,
      "feature.liveChat.viewSpecificContent": true
    }
  }


{
    $set: {
      "feature.ticketing.access": true,
      "feature.ticketing.viewAll": true,
      "feature.ticketing.viewSpecificByUserAgent": true,
      "feature.ticketing.viewSpecificByDivision": true,
      "feature.ticketing.create": true,
      "feature.ticketing.import": true,
      "feature.ticketing.export": true,
      "feature.ticketing.bulkUpload": true,
      "feature.ticketing.solve": true,
      "feature.ticketing.reopen": true,
      "feature.ticketing.reopenBulk": true,
      "feature.ticketing.changePriority": true,
      "feature.ticketing.delete": true,
      "feature.ticketing.changeProblem": true,
      "feature.ticketing.changeInstruction": true,
      "feature.ticketing.setting": true,
      "feature.ticketing.viewDetail": true,
      "feature.ticketing.addTag": true,
      "feature.ticketing.addMedia": true,
      "feature.ticketing.sendMessageThread": true,
      "feature.groupInbox.access": true,
      "feature.liveChat.access": true,
      "feature.liveChat.channelSettingChatWidgetSetting": true,
      "feature.liveChat.channelSettingComingSoon": true,
      "feature.liveChat.settingLivechatHandlerByDivision": true,
      "feature.liveChat.settingLivechatHandlerByUserAgent": true,
      "feature.liveChat.crossDivisionSetting": true,
      "feature.liveChat.sendMessage": true,
      "feature.liveChat.createTicketFromLivechat": true,
      "feature.liveChat.viewAllContent": true,
      "feature.liveChat.viewSpecificContent": true
    }
  }
//update

divisi SAP

https://satuinbox.com/api/v1/account-whatsapp?accountStatus=used&page=1&limit=25&populate=division.agents&statusNumberWhatsapp=active&division=66ebca36b8d4a225aa7e5529:66ebca85b8d4a225aa7e5658:66ebcabfb8d4a225aa7e5742:66ebcb13b8d4a225aa7e58a4:66f625ea798b04d66868a0c3:66ebcb90b8d4a225aa7e5a99:66ebc0c9b8d4a225aa7e5263:66ebcba7b8d4a225aa7e5afa:66ebcbbeb8d4a225aa7e5b51:66ebcbc6b8d4a225aa7e5b73:66ebcbfcb8d4a225aa7e5c4d:66ebcca9b8d4a225aa7e5e91:66ebcf8cb8d4a225aa7e5ef1:66ebcf93b8d4a225aa7e5f12:66ebcfbbb8d4a225aa7e6039:66ebcfcab8d4a225aa7e60a0:66ebcfe7b8d4a225aa7e6163:66ebcfeeb8d4a225aa7e6189:66ebcff3b8d4a225aa7e61ab:66ebcff8b8d4a225aa7e61d9:66ebcffeb8d4a225aa7e620f:66ebd006b8d4a225aa7e6239:66ebd00db8d4a225aa7e6273:66ebd011b8d4a225aa7e6295:66ebd018b8d4a225aa7e62c1:66ebd0c8b8d4a225aa7e6594:66ebd1e8b8d4a225aa7e6be6:66ee99b73a84b963ffbaf490:66ebd5b2b8d4a225aa7e74af:66ebd5c7b8d4a225aa7e754a:66ebd62fb8d4a225aa7e7824:66ebd6c5b8d4a225aa7e7b8a:66ebd6d2b8d4a225aa7e7be1:66ebd6dbb8d4a225aa7e7c07:66ebd72fb8d4a225aa7e7e32:66ebd739b8d4a225aa7e7e7e:66ebd754b8d4a225aa7e7f16



{ "inboxMessage": [{ "id": "6879c9ab3fcdc9b2f18130c8", "assign": true }, { "id": "6879c7f13fcdc9b2f1812615", "assign": true }, { "id": "6878ae987ae04b68a1dca919", "assign": true }, { "id": "686a85ccdd239b089560a7f5", "assign": true }, { "id": "686a4cfddd239b0895549df5", "assign": true }, { "id": "686a4d53dd239b0895549e53", "assign": true }, { "id": "686a87ffdd239b0895610405", "assign": true }, { "id": "686a87fddd239b08956103c3", "assign": true }, { "id": "686a4cc5dd239b0895549dab", "assign": true }, { "id": "686a85d7dd239b089560abed", "assign": true }] }
6879c9ab3fcdc9b2f18130c8
6879c7f13fcdc9b2f1812615
686a4cc5dd239b0895549dab


{ "inboxMessage": [{ "id": "686a4d53dd239b0895549e53" }, { "id": "686a87fddd239b08956103c3" }, { "id": "686a85d7dd239b089560abed" }, { "id": "686a85ccdd239b089560a7f5" }, { "id": "686a4cfddd239b0895549df5" }, { "id": "686a87ffdd239b0895610405" }, { "id": "686a2335dd239b089553680a" }] }
686a4d53dd239b0895549e53
686a85ccdd239b089560a7f5


{
  "inboxMessage": [
    { "id": "6879c7f13fcdc9b2f1812615", "assign": true },
    { "id": "686a4cfddd239b0895549df5", "assign": true },
    { "id": "686a85d7dd239b089560abed", "assign": true },
    { "id": "686a87ffdd239b0895610405", "assign": true },
    { "id": "686a87fddd239b08956103c3", "assign": true },
    { "id": "6879c9ab3fcdc9b2f18130c8", "assign": true },
    { "id": "686a4d53dd239b0895549e53", "assign": true }]
}
6879c7f13fcdc9b2f1812615
686a4cfddd239b0895549df5
686a85d7dd239b089560abed
686a87ffdd239b0895610405
686a87fddd239b08956103c3
6879c9ab3fcdc9b2f18130c8
686a4d53dd239b0895549e53



//sap
https://apisanbox.coresyssap.com/ext/satuinbox/confirmation
//sap pass
// $2a$08$8uIzQhwFQL.izeHnUeDH1.nDpVc0fevJpKq.15Zyhpr14p/rgcHXa

[{ //aggregate user to company
  $lookup: {
    from: "divisions",
    localField: "division",
    foreignField: "_id",
    as: "divisionData"
  }
},
 {$match: {
   "divisionData.company":ObjectId('689aa5cf0c03c57308eec36b')
 }},
 {$project: {
   fullname:1,
   username:1,
   email:1
  }
  }] 
 

//SAP open create and scan akun whatsapp
[
  {
    $lookup: {
      from: "divisions",
      localField: "division",
      foreignField: "_id",
      as: "divisionData"
    }
  },
  {
    $unwind: "$divisionData"
  },
  {
    $match: {
      "divisionData.company": ObjectId("67ee2ecf9f4f80b0902b3fc3"),
      role: { $ne: "internalTeam" }
    }
  },
  {
    $set:{
      "feature": {
        "dashboard": {
          "access": true
        },
        "inbox": {
          "access": true
        },
        "broadcast": {
          "access": true
        },
        "ticketing": {
          "access": false,
          "viewAll": false,
          "viewSpecificByUserAgent": false,
          "viewSpecificByDivision": false,
          "create": false,
          "import": false,
          "export": false,
          "bulkUpload": false,
          "solve": false,
          "reopen": false,
          "reopenBulk": false,
          "changePriority": false,
          "delete": false,
          "changeProblem": false,
          "changeInstruction": false,
          "setting": false,
          "viewDetail": false,
          "addTag": false,
          "addMedia": false,
          "sendMessageThread": false
        },
        "groupInbox": {
          "access": false
        },
        "users": {
          "access": true
        },
        "templateMessages": {
          "access": true
        },
        "accountWhatsapp": {
          "access": true,
          "create": true,
          "edit": true,
          "delete": true,
          "login": true,
          "logout": false
        },
        "division": {
          "access": true
        },
        "groupDivision": {
          "access": true
        },
        "workingHour": {
          "access": true
        },
        "contact": {
          "access": true
        },
        "templateBroadcast": {
          "access": true
        },
        "liveChat": {
          "access": false,
          "channelSettingChatWidgetSetting": false,
          "channelSettingComingSoon": false,
          "settingLivechatHandlerByDivision": false,
          "settingLivechatHandlerByUserAgent": false,
          "crossDivisionSetting": false,
          "sendMessage": false,
          "createTicketFromLivechat": false,
          "viewAllContent": false,
          "viewSpecificContent": false
        }
      }
    }
  }
]
  
[
  {
    $lookup: {
      from: "divisions",
      localField: "division",
      foreignField: "_id",
      as: "divisionData"
    }
  },
  {
    $unwind: "$divisionData"
  },
  {
    $match: {
      "divisionData.company": ObjectId("67ee2ecf9f4f80b0902b3fc3"),
      role: { $ne: "internalTeam" }
    }
  }
]
//company sap staging 67ee2ecf9f4f80b0902b3fc3
//company sap prod 684a7dee68bd32a1f552e453
  
[
  {
    $lookup: {
      from: "divisions",
      localField: "division",
      foreignField: "_id",
      as: "divisionData"
    }
  },
  {
    $unwind: "$divisionData"
  },
  {
    $match: {
      "divisionData.company":ObjectId('684a7dee68bd32a1f552e453'),
      "divisionData.divisionName":{
        $in:[
          /AMQ/i,
      /MKW/i,
      /CLN/i,
      /PLM/i,
      /FFQ/i,
      /JBA/i,
      /JSC/i,
      /JUB/i,
      /SBG/i,
      /PDG/i,
      /BTH/i,
      /UPG/i,
      /KDI/i,
      /TGR/i,
      /TNJ/i
        ]
      },
    }
  }
]

  
,
  {
    $set:{
      "feature": {
        "dashboard": {
          "access": true
        },
        "inbox": {
          "access": true
        },
        "broadcast": {
          "access": true
        },
        "ticketing": {
          "access": false,
          "viewAll": false,
          "viewSpecificByUserAgent": false,
          "viewSpecificByDivision": false,
          "create": false,
          "import": false,
          "export": false,
          "bulkUpload": false,
          "solve": false,
          "reopen": false,
          "reopenBulk": false,
          "changePriority": false,
          "delete": false,
          "changeProblem": false,
          "changeInstruction": false,
          "setting": false,
          "viewDetail": false,
          "addTag": false,
          "addMedia": false,
          "sendMessageThread": false
        },
        "groupInbox": {
          "access": false
        },
        "users": {
          "access": true
        },
        "templateMessages": {
          "access": true
        },
        "accountWhatsapp": {
          "access": true,
          "create": true,
          "edit": true,
          "delete": true,
          "login": true,
          "logout": false
        },
        "division": {
          "access": true
        },
        "groupDivision": {
          "access": true
        },
        "workingHour": {
          "access": true
        },
        "contact": {
          "access": true
        },
        "templateBroadcast": {
          "access": true
        },
        "liveChat": {
          "access": false,
          "channelSettingChatWidgetSetting": false,
          "channelSettingComingSoon": false,
          "settingLivechatHandlerByDivision": false,
          "settingLivechatHandlerByUserAgent": false,
          "crossDivisionSetting": false,
          "sendMessage": false,
          "createTicketFromLivechat": false,
          "viewAllContent": false,
          "viewSpecificContent": false
        }
      }
    }
}
  


"feature": {
    "dashboard": {
      "access": true
    },
    "inbox": {
      "access": true
    },
    "broadcast": {
      "access": true
    },
    "ticketing": {
      "access": false,
      "viewAll": false,
      "viewSpecificByUserAgent": false,
      "viewSpecificByDivision": false,
      "create": false,
      "import": false,
      "export": false,
      "bulkUpload": false,
      "solve": false,
      "reopen": false,
      "reopenBulk": false,
      "changePriority": false,
      "delete": false,
      "changeProblem": false,
      "changeInstruction": false,
      "setting": false,
      "viewDetail": false,
      "addTag": false,
      "addMedia": false,
      "sendMessageThread": false
    },
    "groupInbox": {
      "access": false
    },
    "users": {
      "access": true
    },
    "templateMessages": {
      "access": true
    },
    "accountWhatsapp": {
      "access": true,
      "create": true,
      "edit": true,
      "delete": true,
      "login": true,
      "logout": false
    },
    "division": {
      "access": true
    },
    "groupDivision": {
      "access": true
    },
    "workingHour": {
      "access": true
    },
    "contact": {
      "access": true
    },
    "templateBroadcast": {
      "access": true
    },
    "liveChat": {
      "access": false,
      "channelSettingChatWidgetSetting": false,
      "channelSettingComingSoon": false,
      "settingLivechatHandlerByDivision": false,
      "settingLivechatHandlerByUserAgent": false,
      "crossDivisionSetting": false,
      "sendMessage": false,
      "createTicketFromLivechat": false,
      "viewAllContent": false,
      "viewSpecificContent": false
    }
  
  
  
  registerAndResetWithMailTm() {
      const mailSlurpApiKey =
        "sk_mFLuOb6wN19FJHQy_HL8T4acs2vp4caUR6vCeVM1p8ay90Xh9jQn6VzmWIjBZLo4qDGJ5cCGadocsXpiw";
  
      const mailslurpBaseUrl = "https://api.mailslurp.com";
      const inbox_id = "24ffd7ef-1529-4f76-945d-9cd97a6463712";
      // const inbox_id = "24ffd7ef-1529-4f76-945d-9cd97a646371";
      const mailslurpGetInboundEmailList =
        mailslurpBaseUrl + "/inboxes/" + inbox_id + "/emails/paginated";
      const mailslurpCreateNewInbox = mailslurpBaseUrl + "/inboxes/withDefaults";
      const mailslurpGetInboxList =
        mailslurpBaseUrl + "/inboxes?size=100&sort=ASC";
      const getEmailAndRead = mailslurpBaseUrl+"/waitForLatestEmail?inboxId=5afaf504-bfbe-485d-80e2-98604cad3d07&timeout=6000&unreadOnly=true"
  
      const firstTextMailAndName = "registermailslurp " + randomText;
  
      // const firstTextMailAndName = "registermailtm" + randomNumber;
      const mailTmGetDomains = "https://api.mail.tm/domains";
      const mailTmGetAccount = "https://api.mail.tm/accounts";
      const mailTmGetToken = "https://api.mail.tm/token";
      const mailTmGetAllMsg = "https://api.mail.tm/messages";
      const mailTmGetMsgById = "https://api.mail.tm/messages/";
      const password = "Asdqwe12@";
      const newpassword = "newasdqwe12";
  
      //check inbox is expired?
      // cy.log(mailslurpGetInboundEmailList);
      cy.request({
        method: "GET",
        url: mailslurpGetInboxList,
        headers: {
          "x-api-key": mailSlurpApiKey,
        },
        failOnStatusCode: false,
      }).then((response) => {
        const responseStatus = response.status;
        const inbox = response.body.find((item) => item.expiresAt === null);
        expect(inbox, "Inbox with expiresAt null").to.exist;
  
        const inboxId = inbox.id;
        const inboxEmail = inbox.emailAddress;
        cy.wrap(inbox.id).as("inboxId");
        cy.wrap(inbox.emailAddress).as("inboxEmail");
  
        cy.task("log", `Inbox ID: ${inboxId}`);
        cy.task("log", `Inbox Email: ${inboxEmail}`);
  
        cy.wrap(responseStatus).as("responseStatusInboundEmailList");
        if (responseStatus === 200) {
          cy.task("log", JSON.stringify(response.body));
        } else {
          cy.log("b");
          cy.request({
            method: "POST",
            url: mailslurpCreateNewInbox,
            headers: {
              "x-api-key": mailSlurpApiKey,
            },
          }).then((responseNewInbox) => {
            const getNewInboxId = responseNewInbox.body.id;
  
            cy.wrap(getNewInboxId).as("newInboxId");
          });
        }
      });
  
      // cy.wait(3000);
      // //register at satuinbox with created temp email
      cy.log(firstTextMailAndName);
      const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
      cy.log(trimFromFullName);
      cy.get("@responseStatusInboundEmailList").then((status) => {
        if (status === 200) {
        }
        cy.wait(2000);
        cy.visit("/login");
        elementAuth.hyperlinkRegister().click();
        elementAuth.regFullname().type(firstTextMailAndName);
        elementAuth.regUsername().type(trimFromFullName);
        cy.get("@inboxEmail").then((inboxEmail) => {
          elementAuth.regEmail().type(inboxEmail);
        });
        elementAuth.regPhone().type("628" + randomPhoneNumber);
        elementAuth.regPassword().clear().type("Asdqwe12@");
        elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
        elementAuth.buttonDaftar()
          .click();
        cy.wait(5000);
        elementAuth
          .successTitle()
          .should("be.visible")
        cy.get("@inboxEmail").then((inboxEmail) => {
          elementAuth
            .registeredUserEmail()
            .should("be.visible")
            .contains(inboxEmail);
        })
        //   elementAuth.resendEmail().should("be.visible");
        //   // elementAuth.resendEmail_sentState().should('be.visible')
        //   cy.wait(5000);
        //   // cy.get("#fullname").type(firstTextMailAndName);
        //   // cy.get("#email").type(tempMail);
        //   // cy.contains("button", "Daftar").click();
      });
  
      // //get all message from temp email
      cy.wait(5000);
      function waitForEmail(token, maxRetry = 10, delay = 3000) {
        if (maxRetry === 0)
          throw new Error("Email belum diterima setelah beberapa kali percobaan");
  
        return cy
          .request({
            method: "GET",
            url: mailTmGetAllMsg,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false,
          })
          .then((res) => {
            const messages = res.body["hydra:member"];
            if (messages && messages.length > 0) {
              return messages[0].id;
            } else {
              cy.wait(delay);
              return waitForEmail(token, maxRetry - 1, delay);
            }
          });
      }
  
      // cy.get("@accessToken").then((token) => {
      //   cy.task("log", "waiting inbox from satuinbox.....");
      //   waitForEmail(token).then((messageId) => {
      //     cy.task("log", "get inbox from satuinbox with ID :" + messageId);
      //     cy.task("log", "opening inbox.......");
  
      //     cy.request({
      //       method: "GET",
      //       url: mailTmGetMsgById + messageId,
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }).then((searchLink) => {
      //       const htmlContent = searchLink.body.html?.[0];
      //       const regex = /href="([^"]+)"/;
      //       const match = htmlContent?.match(regex);
      //       if (match) {
      //         const verificationUrl = match[1];
      //         cy.task("log", "access verification link from");
      //         cy.visit(verificationUrl); // lanjutkan ke form set password
      //       }
      //     });
      //   });
      // });
  
      // //setup username and password
      // cy.task("log", "setup username, company, password");
      // cy.wait(2500);
      // // cy.softAssert(
      // //   cy.get("#username").type(firstTextMailAndName),
      // //   "type username"
      // // );
      // elementAuth.greetingsToUsers().hardAssert(firstTextMailAndName);
      // elementAuth.username().type(firstTextMailAndName);
      // cy.wait(500);
      // elementAuth.companyName().type(firstTextMailAndName);
      // // cy.softAssert(
      // //   cy.get("#company_name").type(firstTextMailAndName),
      // //   "type company name"
      // // );
      // cy.wait(500);
      // elementAuth.password().type(password);
      // // cy.softAssert(cy.get("#password").type(password), "type password");
      // cy.wait(500);
      // elementAuth.buttonDaftar().click();
      // // cy.softAssert(cy.registerButton().click(), "click register");
  
      // //verify url then login
      // cy.task("log", "login with new registered username");
      // cy.wait(1000);
      // cy.url().should("include", "/login");
      // cy.viewport(1366, 768);
      // // cy.get("#keyword").type(firstTextMailAndName);
      // // cy.get("#password").type(password);
      // // cy.get(".bg-primary").click();
      // elementAuth.keyword().type(firstTextMailAndName);
      // elementAuth.password().type(password);
      // elementAuth.buttonLogin().click();
  
      // //try to reset password
      // cy.task("log", "do logout then reset password");
      // cy.wait(1000);
      // logout();
      // cy.wait(1000);
      // cy.get("@tempEmail").then((tempMail) => {
      //   cy.get("@accessToken").then((token) => {
      //     //input email for reset password
      //     cy.softAssert(
      //       cy
      //         .get(
      //           'a[href="/reset-password"] > p.text-sm.font-medium.text-blue-600'
      //         )
      //         .click(),
      //       "click reset password"
      //     );
      //     cy.softAssert(cy.get("#email").type(tempMail));
      //     cy.wait(500);
      //     cy.softAssert(
      //       cy.contains("button", "Kirim link pemulihan").click(),
      //       "klik button Kirim link pemulihan"
      //     );
      //     cy.wait(1000);
      //     //get all message
      //     // function waitForSecondEmail(token, maxRetry = 10, delay = 3000) {
      //     function waitForSecondEmail(
      //       token,
      //       subjectKeyword,
      //       maxRetry = 10,
      //       delay = 3000
      //     ) {
      //       if (maxRetry === 0)
      //         throw new Error(
      //           "Email belum diterima setelah beberapa kali percobaan"
      //         );
  
      //       return cy
      //         .request({
      //           method: "GET",
      //           url: mailTmGetAllMsg,
      //           headers: {
      //             Authorization: `Bearer ${token}`,
      //           },
      //           failOnStatusCode: false,
      //         })
      //         .then((secondRes) => {
      //           const secondMessages = secondRes.body["hydra:member"];
      //           const targetMsg = secondMessages.find((msg) =>
      //             msg.subject.toLowerCase().includes(subjectKeyword.toLowerCase())
      //           );
  
      //           if (targetMsg) {
      //             return targetMsg.id;
      //           } else {
      //             cy.wait(delay);
      //             return waitForSecondEmail(
      //               token,
      //               subjectKeyword,
      //               maxRetry - 1,
      //               delay
      //             );
      //           }
      //         });
      //     }
  
      //     //get seccond message
      //     cy.task("log", "waiting second inbox from satuinbox.....");
      //     // waitForSecondEmail(token).then((secondMessages) => {
      //     waitForSecondEmail(token, "Reset password").then((secondMessages) => {
      //       cy.task("log", "get inbox from satuinbox with ID :" + secondMessages);
      //       cy.task("log", "opening inbox.......");
  
      //       cy.request({
      //         method: "GET",
      //         url: mailTmGetMsgById + secondMessages,
      //         headers: {
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }).then((searchLink) => {
      //         const htmlContent = searchLink.body.html?.[0];
      //         const regex = /href="([^"]+)"/;
      //         const match = htmlContent?.match(regex);
      //         if (match) {
      //           const verificationUrl2 = match[1];
      //           cy.task(
      //             "log",
      //             "access verification link from: " + verificationUrl2
      //           );
      //           cy.visit(verificationUrl2); // lanjutkan ke form reset password
      //         }
      //       });
      //     });
  
      //     //setup new password
      //     cy.task("log", "setup new password");
      //     cy.wait(2000);
      //     cy.softAssert(
      //       cy.get("#password").type(newpassword),
      //       "type new password"
      //     );
      //     cy.wait(500);
      //     cy.softAssert(
      //       cy.get("#confirmPassword").type(newpassword),
      //       "type confirm new password"
      //     );
      //     cy.wait(500);
      //     cy.softAssert(
      //       cy.contains("button", "Konfirmasi").click(),
      //       "click button konfirmasi"
      //     );
      //     cy.wait(500);
      //     cy.softAssert(
      //       cy.contains("button", "Buka Halaman Login").click(),
      //       "click button Buka Halaman Login"
      //     );
  
      //     //cek login with new password
      //     cy.task("log", "login with new registered username");
      //     cy.wait(1000);
      //     cy.url().should("include", "/login");
      //     cy.viewport(1366, 768);
      //     elementAuth.keyword().type(firstTextMailAndName);
      //     elementAuth.password().type(newpassword);
      //     elementAuth.buttonLogin().click();
      //     // cy.get("#keyword").type(firstTextMailAndName);
      //     // cy.get("#password").type(newpassword);
      //     // cy.get(".bg-primary").click();
      //   });
      // });
    }