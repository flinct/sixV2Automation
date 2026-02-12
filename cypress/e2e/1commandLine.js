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



//sosialchat
https://api.socialchat.id/api/channel/698999a283706c6c354a3026
{
    "_id": "698999a283706c6c354a3026",
    "name": "",
    "channelId": "",
    "channelType": "whatsapp-unofficial",
    "isConnected": false,
    "picture": "",
    "status": "premium",
    "label": {
        "name": "vemme luxe",
        "phone": "085122638155"
    },
    "createdBy": {
        "_id": "672d927a8526c2b034051a70",
        "email": "flinctchristian@gmail.com"
    },
    "additionalData": {
        "qrcode": "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAAExElEQVR42uyZP67rrhPFB1HQhQ1EeBspLLGllO6go8yWkFx4G6BsYNxRWJyfxsl97/aJXfy+j+ZKvh8peJg/52D6t/5bSwGIlhzpbFhho+nOjjQSA8gnAYV0vMtuDBg1+0hE1zEkLqTPAirmxLY+52xINmlgAbTAFfNXAfWcl4SLyga8x6GdDTyYriMRK6CZqDrRFOhEoJBOD1uLR2Rb9NJCV8W3iX4d1tEAgPSw7jreJl7rvKTHxV3HafqdtJ8Br2Sz2Hwja4vOFIiGHOLv8jsYUFVKD3XzS7MKWBAVJA783uMJADkaDXN9YkmyO6I7pDqi7W78DqDq5gEqem7EnUaPx4XkLKiod04eD3S/BUDOwjANyCGyKj4aonfKHQ/QMM+JqWIzsJchG0QanmiGnXslxBlAHgOTG7JPzArZcB+KRrS1jN8BVBl9tFLkNPHax1vAWp9oE1Tx+RyAnN4okNp0MyxxaLRKR0iE91scD6g+Sn9Tz+yjtV0veJDTM5p17vUWHwOSWJOlKgDkLIKcBU1ka39t8gzAIzEV6bQyWG8hqqI3g5+hdgKg6ryZiKKRjb1ITsYLDXOcqL4T5gQAm4537le6EV2cByQnc4hw7zb4MUDOZxOtG+YFuDifA1sUImP7sJ0FkJ8boT5nRN4HHNaKLTQe3qV3CpApQBRrou5GE+niBqSGQj85+TFAOkXeGylIZQpxlQ0l9J/SOx5Qc56s3V8aF6Ib3S026bTvoXYGIPoUL8HMa/HNQEmfN7yH8BRA/kMENwARNMxLs6sMnAnk3i7pY6B70Ul1G8lYK6qYFZ45NPzoyROAOosj6Hrzideic+CLu5JJrPpbRx0OyHhJEcNzzmRRZ6S41qLbxLXo/B2AfDYPkSgUsIr4v0scJsPqb3UfDKg6A2wdkW9iFbLBLpMCUOfTgDwayT+/AC8dtcqGI9yr034OEI0+PbgMaHvKZaLu9NwM1R/1fzggKRfYOr2ZRjJJiGyXxoe/Z3E0QIO4A6arXuLu+gEenvKn1tdLnAA4LYN19yZ7tU13dKKQ7I8y/xjYbXWkAZtptisgMUtQZKCMZwFVMp3rU45krRtN97VfdaRfNzmHA13PkdB19g2oIllJHAr2Z98Bit4ma53GAgnKbborFAmNe8+s4wEasm9kpdSn3R2kiLdUOw8gnyeLTn5JxGKCRD8QTTgRGGa0Ow8yzkBq8wlrIS8tqH8JUHsKMJ7ZJNhCBlEkRUjoaqOTgE46BhlqN2NZzY2ChRC2/iTt4YCsAMYmXU6JcI1iBsn8ks0fA34G70kWWdV8Cw+FpzSaAdtJgAyUKTCem3gPeXbf1Wmi4nQ+BxDNEO0uFydprl5arM4h/im94wGFWXQUXUeTrK3Zt7sY4AS8puxXgE0DILHVtF9HS7Pz++DcTgL2e9qH+IJsGKJV7yLJQ2JV/qT9wcD+FYa4DzJYbZ0XxLXTGCL/uV74GNhv3eG02Op1/9nLIAOFVfk73A8GKuYEdBplkxKBx4qnHAlqPhNg8SlL3PWD4d3zJlvrr880xwMgbOPNSNRMJKZhE3k3fAsopCNh2C/uLOY22fWVHCj6LABAgh02v4DJjTfzUGIGg62/PtMcC/xb/z/rfwEAAP//IYB3zoarkZ0AAAAASUVORK5CYII=",
        "virtualMachineId": "690dc17cea7d56aaf7f29684"
    },
    "createdAt": "2026-02-09T08:24:02.326Z",
    "updatedAt": "2026-02-09T08:43:08.377Z",
    "__v": 0,
    "disconnectedAt": "2026-02-09T08:43:08.377Z",
    "autoResponse": {
        "isActive": {
            "online": false,
            "offline": false
        },
        "times": [
            {
                "type": "offline",
                "day": 0,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 1,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 2,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 3,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 4,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 5,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "offline",
                "day": 6,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            }
        ],
        "timezone": {
            "code": "GMT",
            "region": "Asia/Jakarta",
            "offsetMinute": 420,
            "formatHour": "+07:00"
        },
        "text": {
            "online": "",
            "offline": ""
        },
        "createdBy": {
            "_id": "672d927a8526c2b034051a70",
            "email": "flinctchristian@gmail.com"
        },
        "updatedAt": "2026-02-09T08:43:25.768Z"
    },
    "agentRotatorDivision": {
        "text": "Terima kasih telah menghubungi kami! Untuk membantu Anda lebih lanjut, silakan ketik nomor sesuai divisi yang ingin Anda hubungi:\n{agents}"
    }
}

//connected
{
    "_id": "698999a283706c6c354a3026",
    "name": "",
    "channelId": "6285122638155:6@s.whatsapp.net",
    "channelType": "whatsapp-unofficial",
    "isConnected": true,
    "picture": "",
    "status": "premium",
    "label": {
        "name": "vemme luxe",
        "phone": "085122638155"
    },
    "createdBy": {
        "_id": "672d927a8526c2b034051a70",
        "email": "flinctchristian@gmail.com"
    },
    "additionalData": {
        "virtualMachineId": "690dc17cea7d56aaf7f29684"
    },
    "createdAt": "2026-02-09T08:24:02.326Z",
    "updatedAt": "2026-02-09T08:43:26.131Z",
    "__v": 0,
    "autoResponse": {
        "isActive": {
            "online": false,
            "offline": false
        },
        "times": [
            {
                "type": "offline",
                "day": 0,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 1,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 2,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 3,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 4,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "online",
                "day": 5,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            },
            {
                "type": "offline",
                "day": 6,
                "from": {
                    "hour": 9,
                    "minute": 0
                },
                "to": {
                    "hour": 17,
                    "minute": 0
                }
            }
        ],
        "timezone": {
            "code": "GMT",
            "region": "Asia/Jakarta",
            "offsetMinute": 420,
            "formatHour": "+07:00"
        },
        "text": {
            "online": "",
            "offline": ""
        },
        "createdBy": {
            "_id": "672d927a8526c2b034051a70",
            "email": "flinctchristian@gmail.com"
        },
        "updatedAt": "2026-02-09T08:43:28.796Z"
    },
    "agentRotatorDivision": {
        "text": "Terima kasih telah menghubungi kami! Untuk membantu Anda lebih lanjut, silakan ketik nomor sesuai divisi yang ingin Anda hubungi:\n{agents}"
    }
}

//get list

https://api.socialchat.id/api/channel?page=1&limit=12&search=&channelTypes[]=whatsapp-unofficial
{
    "docs": [
        {
            "_id": "698999a283706c6c354a3026",
            "name": "",
            "channelId": "6285122638155:6@s.whatsapp.net",
            "channelType": "whatsapp-unofficial",
            "isConnected": true,
            "picture": "",
            "status": "premium",
            "label": {
                "name": "vemme luxe",
                "phone": "085122638155"
            },
            "createdBy": {
                "_id": "672d927a8526c2b034051a70",
                "email": "flinctchristian@gmail.com"
            },
            "additionalData": {
                "virtualMachineId": "690dc17cea7d56aaf7f29684"
            },
            "createdAt": "2026-02-09T08:24:02.326Z",
            "updatedAt": "2026-02-09T08:43:26.131Z",
            "__v": 0,
            "autoResponse": {
                "isActive": {
                    "online": false,
                    "offline": false
                },
                "times": [
                    {
                        "type": "offline",
                        "day": 0,
                        "from": {
                            "hour": 9,
                            "minute": 0
                        },
                        "to": {
                            "hour": 17,
                            "minute": 0
                        }
                    },
                    {
                        "type": "online",
                        "day": 1,
                        "from": {
                            "hour": 9,
                            "minute": 0
                        },
                        "to": {
                            "hour": 17,
                            "minute": 0
                        }
                    },
                    {
                        "type": "online",
                        "day": 2,
                        "from": {
                            "hour": 9,
                            "minute": 0
                        },
                        "to": {
                            "hour": 17,
                            "minute": 0
                        }
                    },
                    {
                        "type": "online",
                        "day": 3,
                        "from": {
                            "hour": 9,
                            "minute": 0
                        },
                        "to": {
                            "hour": 17,
                            "minute": 0
                        }
                    },
                    {
                        "type": "online",
                        "day": 4,
                        "from": {
                            "hour": 9,
                            "minute": 0
                        },
                        "to": {
                            "hour": 17,
                            "minute": 0
                        }
                    },
                    {
                        "type": "online",
                        "day": 5,
                        "from": {
                            "hour": 9,
                            "minute": 0
                        },
                        "to": {
                            "hour": 17,
                            "minute": 0
                        }
                    },
                    {
                        "type": "offline",
                        "day": 6,
                        "from": {
                            "hour": 9,
                            "minute": 0
                        },
                        "to": {
                            "hour": 17,
                            "minute": 0
                        }
                    }
                ],
                "timezone": {
                    "code": "GMT",
                    "region": "Asia/Jakarta",
                    "offsetMinute": 420,
                    "formatHour": "+07:00"
                },
                "text": {
                    "online": "",
                    "offline": ""
                },
                "createdBy": {
                    "_id": "672d927a8526c2b034051a70",
                    "email": "flinctchristian@gmail.com"
                },
                "updatedAt": "2026-02-09T08:43:28.914Z"
            },
            "rotationAgents": [],
            "agentRotatorDivision": {
                "text": "Terima kasih telah menghubungi kami! Untuk membantu Anda lebih lanjut, silakan ketik nomor sesuai divisi yang ingin Anda hubungi:\n{agents}"
            }
        }
    ],
    "totalDocs": 1,
    "limit": 12,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
}

flow check baru
getAccountChannel=api/accountChannel
instance=/account-channel/instance (method get)
instance=/account-channel/instance (method post)
getTeam=api/team

1. hit getAccountChannel, jika idChannel ditemukan, cek connectionStatus, jika connectionStatus=inactive log sebagai "disconnected account"

2. hit getAccountChannel, jika idChannel ditemukan, cek connectionStatus, jika connectionStatus = active, hit init(method get), jika init status 200 log sebagai "account is active", lalu hit getTeam, jika status 200 bandingkan, jika  accountChannelId dari response = idChannel, log sebagai "account channel active, team is paired"

3. hit getAccountChannel, jika idChannel ditemukan, cek connectionStatus, jika connectionStatus = active, hit init(method get), jika init status 200 log sebagai "account is active", lalu hit getTeam, jika status 200 bandingkan, jika  accountChannelId dari response != idChannel atau idChannel = kosong, log sebagai "account channel active, team not paired, need pairing"

4. hit getAccountChannel, jika idChannel ditemukan, cek connectionStatus, jika connectionStatus = active, hit init(method get), jika init status 500 / 400 log sebagai "need re-init", hit init(method post), status harus 200, lalu hit getTeam, jika status 200 bandingkan, jika  accountChannelId dari response = idChannel, log sebagai "success re-init channel, team is paired"

5. hit getAccountChannel, jika idChannel ditemukan, cek connectionStatus, jika connectionStatus=active, hit init (method get), jika init status 500/400 log sebagai "need re-init", hit init (method post), status harus 200, lalu hit getTeam, jika status 200 bandingkan, jika  accountChannelId dari response != idChannel atau idChannel = kosong, log sebagai "success re-init channel, team not paired, need pairing"

6. hit getAccountChannel, jika idChannel tidak ditemukan log sebagai "no account channel"

//settings
https://dev-v2.satuinbox.com/settings/organization/general

//general
https://dev-v2.satuinbox.com/settings/organization/general
https://dev-v2.satuinbox.com/settings/organization/roles
https://dev-v2.satuinbox.com/settings/organization/members
https://dev-v2.satuinbox.com/settings/organization/shift-hours
https://dev-v2.satuinbox.com/settings/organization/tags
https://dev-v2.satuinbox.com/settings/organization/change-password

//teamInbox
https://dev-v2.satuinbox.com/settings/inbox/team-inbox
https://dev-v2.satuinbox.com/settings/inbox/assignments
https://dev-v2.satuinbox.com/settings/inbox/macros
https://dev-v2.satuinbox.com/settings/inbox/tickets
https://dev-v2.satuinbox.com/settings/inbox/sla

//channel
https://dev-v2.satuinbox.com/settings/channels/widget
https://dev-v2.satuinbox.com/settings/channels/whatsapp-web
https://dev-v2.satuinbox.com/settings/channels/addon

//subscription
https://dev-v2.satuinbox.com/settings/subscriptions/billing

//dev mode
https://dev-v2.satuinbox.com/settings/developer/webhook
https://dev-v2.satuinbox.com/settings/developer/shipping-credentials

//conversation
https://dev-v2.satuinbox.com/conversation

//ticket
https://dev-v2.satuinbox.com/ticketing

//broadcast
https://dev-v2.satuinbox.com/broadcast/messages

//statistics
https://dev-v2.satuinbox.com/statistic