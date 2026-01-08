import { each, method } from "bluebird";
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
  const loginType = Cypress.env("loginType");
  const config = env_config(baseUrl);
  const jabodetabekDiv =
    "66ebca36b8d4a225aa7e5529:66ebca85b8d4a225aa7e5658:66ebcabfb8d4a225aa7e5742:66ebcb13b8d4a225aa7e58a4:66f625ea798b04d66868a0c3:66ebcb90b8d4a225aa7e5a99:66ebc0c9b8d4a225aa7e5263:66ebcba7b8d4a225aa7e5afa:66ebcbbeb8d4a225aa7e5b51:66ebcbc6b8d4a225aa7e5b73:66ebcbfcb8d4a225aa7e5c4d:66ebcca9b8d4a225aa7e5e91:66ebcf8cb8d4a225aa7e5ef1:66ebcf93b8d4a225aa7e5f12:66ebcfbbb8d4a225aa7e6039:66ebcfcab8d4a225aa7e60a0:66ebcfe7b8d4a225aa7e6163:66ebcfeeb8d4a225aa7e6189:66ebcff3b8d4a225aa7e61ab:66ebcff8b8d4a225aa7e61d9:66ebcffeb8d4a225aa7e620f:66ebd006b8d4a225aa7e6239:66ebd00db8d4a225aa7e6273:66ebd011b8d4a225aa7e6295:66ebd018b8d4a225aa7e62c1:66ebd0c8b8d4a225aa7e6594:66ebd1e8b8d4a225aa7e6be6:66ee99b73a84b963ffbaf490:66ebd5b2b8d4a225aa7e74af:66ebd5c7b8d4a225aa7e754a:66ebd62fb8d4a225aa7e7824:66ebd6c5b8d4a225aa7e7b8a:66ebd6d2b8d4a225aa7e7be1:66ebd6dbb8d4a225aa7e7c07:66ebd72fb8d4a225aa7e7e32:66ebd739b8d4a225aa7e7e7e:66ebd754b8d4a225aa7e7f16";
  const listNameDivision = [
    // "BBR",
    // "BIB",
    // "BOB",
    // "CBI",
    // "CGK",
    // "HO Pusat",
    // "CLN",
    // "DPK",
    // "BOO",
    // "CJR",
    // "BKI",
    // "CKR",
    // "JKT",
    // "JPB",
    // "JSA",
    // "JSB",
    // "JSC",
    // "JSD",
    // "JBA",
    // "JBB",
    // "JUA",
    // "JUB",
    // "KRW",
    // "PDL",
    // "PWK",
    // "SBG",
    // "SER",
    // "SMI",
    // "TGS",
    // "TPE",
    // "JBC",
    // "JKP",
    // "JTB",
    // "JTC",
    // "TPR",
    // "TSB",
    // "TGB",
    // "TGR",

    "BBR",
    "BIB",
    "BKI",
    "BOB",
    "BOO",
    "CBI",
    "CGK",
    "HO ",
    "CJR",
    "CKR",
    "CLN",
    "DPK",
    "JBA",
    "JBB",
    "JBC",
    "JKP",
    "JKT",
    "JPB",
    "JSA",
    "JSB",
    "JSC",
    "JSD",
    "JTB",
    "JTC",
    "JUA",
    "JUB",
    "KRW",
    "PDL",
    "PWK",
    "SBG",
    "SER",
    "SMI",
    "TGB",
    "TGR",
    "TGS",
    "TPE",
    "TPR",
    "TSB",
  ];

  function getHeaderByLoginType(config, baseUrl, loginType) {
    if (baseUrl === "https://app.satuinbox.com") {
      if (loginType === "goddummyprod") return config.headers;
      if (loginType === "testing270520252")
        return config.headers_testing270520252;
    }
    if (baseUrl === "https://appaws.satuinbox.com") {
      if (loginType === "goddummyprod") return config.headers;
      if (loginType === "testing270520252")
        return config.headers_testing270520252;
      if (loginType === "prodtestingjuli")
        return config.headers_prodtestingjuli;
    }

    if (baseUrl === "https://staging.satuinbox.com") {
      if (loginType === "chickentester") return config.headers_CT_staging;
      // if (loginType === "goddevsa1") return config.headers_GD;
      // if (loginType === "goddummy") return config.headers_GD;
      // if (loginType === "messagelogsatu") return config.headers_ms1;
      // if (loginType === "messagelogdua") return config.headers_ms2;
    }
    if (baseUrl === "https://stagaws.satuinbox.com") {
      if (loginType === "chickentester") return config.headers_CT_staging;
      // if (loginType === "goddevsa1") return config.headers_GD;
      // if (loginType === "goddummy") return config.headers_GD;
      // if (loginType === "messagelogsatu") return config.headers_ms1;
      // if (loginType === "messagelogdua") return config.headers_ms2;
    }

    if (baseUrl === "https://dev.satuinbox.com") {
      if (loginType === "chickentester") return config.headers_CT;
      if (loginType === "goddevsa1") return config.headers_GD;
      if (loginType === "goddummy") return config.headers_GD;
      if (loginType === "messagelogsatu") return config.headers_ms1;
      if (loginType === "messagelogdua") return config.headers_ms2;
    }

    throw new Error(`No headers found for baseUrl: ${baseUrl} `);
  }
  function getLoginBodyByLoginType(config, baseUrl, loginType) {
    if (baseUrl === "https://app.satuinbox.com") {
      if (loginType === "goddummyprod") return config.loginBody;
      if (loginType === "testing270520252")
        return config.loginBody_testing270520252;
    }
    if (baseUrl === "https://appaws.satuinbox.com") {
      if (loginType === "goddummyprod") return config.loginBody;
      if (loginType === "testing270520252")
        return config.loginBody_testing270520252;
      if (loginType === "prodtestingjuli")
        return config.loginBody_prodtestingjuli;
    }

    if (baseUrl === "https://staging.satuinbox.com") {
      if (loginType === "chickentester") return config.loginBody_CT;
      // if (loginType === "goddevsa1") return config.loginBody_SAP;
      // if (loginType === "goddummysa") return config.loginBodySuperAdminSap;
      // if (loginType === "goddummy") return config.loginBody_GD_dev;
      // if (loginType === "messagelogdua") return config.loginBody_ms2;
    }
    if (baseUrl === "https://stagaws.satuinbox.com") {
      if (loginType === "chickentester") return config.loginBody_CT;
      // if (loginType === "goddevsa1") return config.loginBody_SAP;
      // if (loginType === "goddummysa") return config.loginBodySuperAdminSap;
      // if (loginType === "goddummy") return config.loginBody_GD_dev;
      // if (loginType === "messagelogdua") return config.loginBody_ms2;
    }

    if (baseUrl === "https://dev.satuinbox.com") {
      if (loginType === "chickentester") return config.loginBody_CT;
      if (loginType === "goddevsa1") return config.loginBody_SAP;
      if (loginType === "goddummysa") return config.loginBodySuperAdminSap;
      if (loginType === "goddummy") return config.loginBody_GD_dev;
      if (loginType === "messagelogdua") return config.loginBody_ms2;
    }

    throw new Error(`No headers found for login type: ${loginType}`);
  }

  function getAllList() {
    const timestamp = new Date().toISOString();
    // Cypress.env("MonitorTimestamp", timestamp);
    // numberAirWayBill.forEach((AWBnumber) => {
    // let selectedHeader;
    const selectedHeader = getHeaderByLoginType(config, baseUrl, loginType);
    const selectedBody = getLoginBodyByLoginType(config, baseUrl, loginType);
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: selectedBody,
    }).then((response) => {
      const accessToken = response.body.tokens.access.token;
      cy.wrap(accessToken).as("accessToken");

      cy.request({
        method: "GET",
        url: config.whatsappUrl_filterJabodetabek3 + jabodetabekDiv,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((responseJabodetabek) => {
        const results = responseJabodetabek.body.results;

        const listAkun = results;
        cy.wrap(listAkun).as("listDivisionAkunWhatsapp");

        const getNumberFromList = results.map((numberWhatsapp) => {
          return {
            // logNameDivision: items.division?.divisionName,
            logAccountNumberWhatsapp: numberWhatsapp.accountNumberWhatsapp,
          };
        });
        // cy.task("log", getNumberFromList);
        cy.wrap(getNumberFromList).as("getAllNumberJabodetabek");

        const listAktifAkun = results
          .filter(
            (filteredItems) => filteredItems.statusNumberWhatsapp === "active"
          )
          .map((items) => {
            return {
              logNameDivision: items.division?.divisionName,
              logAccountNumberWhatsapp: items.accountNumberWhatsapp,
              logStatusAccount: items.statusNumberWhatsapp,
            };
          });

        const listNonAktifAkun = results
          .filter(
            (filteredItems2) =>
              filteredItems2.inactiveAt &&
              filteredItems2.statusNumberWhatsapp !== "active"
          )
          .map((items2) => {
            return {
              logNameDivision: items2.division?.divisionName,
              logAccountNumberWhatsapp: items2.accountNumberWhatsapp,
              logStatusAccount: items2.statusNumberWhatsapp,
              logInactiveAt: items2.inactiveAt,
            };
          });
        const listAkunSuspend = results
          .filter(
            (filteredItems2) =>
              filteredItems2.inactiveAt &&
              filteredItems2.statusNumberWhatsapp !== "active"
          )
          .map((items2) => {
            return {
              logNameDivision: items2.division?.divisionName,
              logAccountNumberWhatsapp: items2.accountNumberWhatsapp,
              logStatusAccount: items2.statusNumberWhatsapp,
              logInactiveAt: items2.inactiveAt,
            };
          });

        const formatLineSpacing = listAktifAkun.map((items3) =>
          JSON.stringify(items3, null, 2)
        );
        const formatLineSpacing2 = listNonAktifAkun.map((items4) =>
          JSON.stringify(items4, null, 2)
        );
        cy.task("log", `Total akun: ${listAkun.length}`);
        cy.task("log", `-------------------------------`);
        cy.task("log", `Total akun NON ACTIVE: ${listNonAktifAkun.length}`);
        cy.task("log", `List Akun NON ACTIVE: ${formatLineSpacing2}`);
        // cy.task("log", `List Akun NON ACTIVE: ${listNonAktifAkun}`);
        cy.task("log", `-------------------------------`);
        cy.task("log", `Total akun ACTIVE: ${listAktifAkun.length}`);
        // cy.task("log", `List Akun ACTIVE:  ${listAktifAkun}`);
        cy.task("log", `List Akun ACTIVE:  ${formatLineSpacing}`);

        cy.log("start create log for sending email");
        const monitorLog = {
          timestamp: timestamp,
          totalAkun: listAkun.length,
          totalAkunNonAktif: listNonAktifAkun.length,
          // listNonAktifAkun: formatLineSpacing2,
          listNonAktifAkun: listNonAktifAkun,
          totalAkunAktif: listAktifAkun.length,
          listAkunAktif: listAktifAkun,
          // listAkunAktif: formatLineSpacing,
        };
        const safeTimestamp = timestamp.replace(/[:.]/g, "-");
        const fileName = `cypress/logs/monitoringSAP_log_${safeTimestamp}.json`;

        cy.task("readJsonFile").then((existsLogs) => {
          const logArray = Array.isArray(existsLogs) ? existsLogs : [];
          logArray.push(monitorLog);

          cy.writeFile(fileName, logArray, { log: false });
          cy.task("log", `✅ Appended log to ${fileName}`);
        });
        cy.log("end sending email");
      });

      cy.request({
        method: "GET",
        url: config.getAllDivision,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((responseDivision) => {
        const respAllDivision = responseDivision.body.results;

        const responseDivisionList = respAllDivision
          .filter((division) =>
            // listNameDivision.includes(division.divisionName)
            listNameDivision.some((short) =>
              division.divisionName.toUpperCase().includes(short)
            )
          )
          .map((division) => {
            return {
              listDivisionName: division.divisionName,
              idDivision: division._id,
            };
          });

        cy.task("log", `---------------------------------------------`);
        cy.task("log", `total division ${responseDivisionList.length}`);
        cy.task("log", `---------------------------------------------`);
        // const formatLineSpacing3 = responseDivisionList.map((items5) =>
        //   JSON.stringify(items5, null, 2)
        // );
        cy.wrap(responseDivisionList).as("allDivisionNameJabodetabek");
        // cy.task("log", `list divisi jabodetabek ${formatLineSpacing3}`);
      });
    });

    cy.get("@allDivisionNameJabodetabek").then((allDivisionName_) => {
      cy.get("@listDivisionAkunWhatsapp").then((listDivisionAkunWhatsapp) => {
        if (listDivisionAkunWhatsapp !== allDivisionName_) {
          const allDivisionName = allDivisionName_.map((division) =>
            division.listDivisionName?.toUpperCase()
          );
          const divisionWithWhatsapp = listDivisionAkunWhatsapp.map((list) =>
            list.division?.divisionName?.toUpperCase()
          );

          const divisionWithoutWhatsapp = allDivisionName.filter(
            (division_a) => !divisionWithWhatsapp.includes(division_a)
          );

          if (divisionWithoutWhatsapp.length > 0) {
            cy.task(
              "log",
              `total division tanpa akun whatsapp : ${divisionWithoutWhatsapp.length}`
            );
            cy.task("log", `daftar divisi tanpa akun whatsapp`);
            divisionWithoutWhatsapp.forEach((divName) => {
              cy.task("log", `- ${divName}`);
            });
          } else {
            cy.task("log", `all division have registered whatsapp`);
          }

          // cy.task("log", `division did not have akun whatsapp : ${allDivisionName}`);
        }
      });
    });

    cy.get("@getAllNumberJabodetabek").then((allNumber) => {
      const totalData = allNumber.length;
      cy.task("log", `total data yang akan di get info : ${totalData}`);
    });
    cy.get("@accessToken").then((accessToken) => {
      cy.get("@getAllNumberJabodetabek").each((number) => {
        const numberObj = number.logAccountNumberWhatsapp;
        cy.request({
          method: "GET",
          url: config.instanceInfoLocal + numberObj,
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then((responseInstance) => {
          const resultInstance = responseInstance.body.instance_data;

          const printDataInstanceNumber = {
            // return {
            instanceKey: resultInstance.instance_key,
            isOpen: resultInstance.isOpen,
            phoneConnected: resultInstance.phoneConnected,
            // };
          };
          cy.task("log", printDataInstanceNumber);
          if (resultInstance.isOpen === "false") {
            cy.task("log", `phone need to rescan qrcode : ${needActivation}`);
            cy.task("log");
          }
          if (resultInstance.phoneConnected === "false") {
            cy.task("log", `phone need to rescan qrcode : ${needActivation}`);
          }
        });
      });
    });
  }

  // it("log", () => {
  //   cy.wait(800);
  //   cy.log(baseUrl);
  // });
  it("send broadcast from active and used number whatsapp", () => {
    cy.wait(800);
    cy.log(baseUrl);
    getAllList();

    cy.task("log", "end");
  });
});
