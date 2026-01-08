import { timeout } from "async";
// import { json } from "stream/consumers";

const baseUrl = Cypress.config("baseUrl");

const Configuration = {
  "https://staging.satuinbox.com": {
    parentNumber: "6285135430944",
    loginBody: { keyword: "goddummystaging", password: "asdqwe12" },
    loginUrl: "https://staging.satuinbox.com/api/v1/auth/login",
    whatsappUrl:
      "https://staging.satuinbox.com/api/v1/account-whatsapp?limit=9000",
    sendMessageUrl: "https://staging.satuinbox.com/api/v1/message/text?key=",
    randomGlobalDelay: Math.floor(Math.random() * 1000) + 300,
  },
  "https://dev.satuinbox.com": {
    parentNumber: "6285135431734",
    // loginBody: { "keyword": "goddummy", "password": "asdqwe12" },
    loginBody: { keyword: "chickentester01", password: "asdqwe12" },
    loginUrl: "https://dev.satuinbox.com/api/v1/auth/login",
    whatsappUrl: "https://dev.satuinbox.com/api/v1/account-whatsapp?limit=9000",
    sendMessageUrl: "https://dev.satuinbox.com/api/v1/message/text?key=",
    sendBroadcastUrl:
      "https://dev.satuinbox.com/api/v1/open/broadcast?account_number_whatsapp=",
    instanceInfoUrl: "https://dev.satuinbox.com/api/v1/instance/info?key=",
    randomGlobalDelay: Math.floor(Math.random() * 1000) + 300,
    // sendBroadcastUrl : 'https://dev.satuinbox.com/api/v1/broadcast/?key='
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

const config = Configuration[baseUrl];
if (!config) throw new Error(`Unknown baseUrl: ${baseUrl}`);
let errorLogs = [];

function reloadAccountPage() {
  cy.get("body", { timeout: 2000 }).then(($body) => {
    // Cari elemen dengan teks persis "Aktif"
    const isActive =
      $body.find('[data-cy="cell-used-account-status-3"]').text().trim() ===
      "Aktif";

    if (isActive) {
      // Jika teks "Aktif" ditemukan, lakukan soft assert
      cy.softAssert(cy.statusAkunWhatsapp().should("have.text", "Aktif"));
    } else {
      // Jika tidak ditemukan, reload halaman
      cy.reload();
      cy.loginAkunWhatsapp().click();
      cy.wait(10000); // Tambahkan waktu tunggu jika diperlukan
      reloadAccountPage(); // Panggil ulang fungsi untuk mencoba lagi
    }
  });
}

function getInstanceInfo() {
  return cy
    .request({
      method: "POST",
      url: config.loginUrl,
      body: config.loginBody,
    })
    .then((loginResponse) => {
      // cy.log(JSON.stringify(loginResponse))
      const accessToken = loginResponse.body.tokens.access.token;
      cy.log("asd", JSON.stringify(accessToken));
      Cypress.env("accessToken_", accessToken);
      // cy.wait(3000)
      return cy
        .request({
          method: "GET",
          url: config.instanceInfoUrl + config.parentNumber,
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          const instanceData_ = response.body.instance_data;

          const statusCode_ = instanceData_.statusCode;
          cy.log("get status code > statusCode_");
          cy.log(JSON.stringify(statusCode_));
          const instance_key_ = instanceData_.instance_key;
          const phone_connected_ = instanceData_.phone_connected;
          cy.log("get phone status > phone_connected_");
          cy.log(JSON.stringify(phone_connected_));

          Cypress.env("storedStatusCode_", instanceData_.statusCode);
          Cypress.env("storedInstance_key_", instanceData_.instance_key);
          Cypress.env("storedPhone_connected_", instanceData_.phone_connected);

          if (statusCode_ === 403) {
            cy.log("init success");
            // cy.task(cy.log('init sccess'));
            retryLoginAndVerify();
            // verifyStatusAccountWhatsapp();
          } else if (phone_connected_ === false) {
            cy.log("retry scanning qr code");
            cy.softAssert(cy.statusAkunWhatsapp().find("span"));
            // cy.task(cy.log('retry scanning qr code'));
            retryLoginAndVerify();
            // verifyStatusAccountWhatsapp();
          } else if (phone_connected_ === true) {
            if (instance_key_ === config.parentNumber) {
              cy.softAssert(
                cy.statusAkunWhatsapp().should("have.text", "Aktif")
              );
            }
          } else {
            cy.task(cy.log("no condition matched"));
          }
        });
    });
}

function retryLoginAndVerify() {
  const maxRetries = 1; // Set a limit to avoid infinite loops
  let attempt = 0;

  function attemptRetry() {
    if (attempt < maxRetries) {
      attempt++;
      cy.log(`Retry attempt: ${attempt}`);
      cy.loginAkunWhatsapp().click();
      cy.wait(10000);
      cy.reload();
      getInstanceInfo(); // Update storedStatusCode_, etc.
      cy.wait(1000);
    } else {
      cy.log("Max retries reached. Stopping attempts.");
    }
  }

  attemptRetry(); // Start retry attempts
}

class accountWhatsappPage {
  elementCheckingAccountWhatsappPagePage() {
    cy.softAssert(cy.nav_link_Ticket().click(), "navigate to group chat");
    cy.wait(1000);
    cy.url().then((url) => {
      if (url === "https://dev.satuinbox.com/ticket") {
        cy.wait(1000);
        cy.log("success direct to group chat page");
      } else {
        cy.log("failed direct to group chat page");
      }
    });
    cy.softAssert(cy.userLoginNameLabel().click(), "User section setting");
    cy.document().wait(800).trigger("keydown", { key: "Escape" });
    cy.softAssert(
      cy.monitoringTicket_section().should("be.visible"),
      "ticketing > ticket monitoring and filter"
    );
  }
  navigateToAccountWhatsappPagePage() {
    cy.softAssert(cy.nav_link_Group().click(), "navigate to group chat");
  }
  getToken() {
    getAccessToken();
  }
  verifyStatusAccountWhatsapp() {
    getInstanceInfo();
  }
}

export default accountWhatsappPage;
