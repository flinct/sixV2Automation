import { method } from "bluebird";
import { env_config } from "../../support/01_url_page.js";
import { numberAWB } from "../../support/awbGenerator.js";
import { generateBatchId, generatePOD } from "../../support/nameAndPhone.js";
import { generateRandomName } from "../../support/nameAndPhone.js";
import { generateRandomDivision } from "../../support/nameAndPhone.js";
import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import {
  generateRandomQuote,
  randomAnswer,
  randomAsk,
} from "../../support/quoteGenerator.js";
import { times } from "lodash";
import {
  getLoginBodyByLoginType,
  getHeaderByLoginType,
} from "../../support/selectorBase.js";

describe("Open API broadcast", () => {
  const authAction = new authPage();

  const baseUrl = Cypress.config("baseUrl");
  const loginType = Cypress.env("loginType");
  const config = env_config(baseUrl);

  const selectedHeader = getHeaderByLoginType(config, baseUrl, loginType);
  const selectedBody = getLoginBodyByLoginType(config, baseUrl, loginType);
  // const timestamp = new Date().toISOString();//UTC
  const timestamp = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  });

  const name = [
    "Whatsapp",
    "Whatsapp API",
    "Instagram",
    "Facebook",
    "Telegram",
    "Widget",
    "Email",
  ];
  const randomName = name[Math.floor(Math.random() * name.length)];

  const platformCodes = {
    Whatsapp: "WA",
    "Whatsapp API": "WAPI",
    Instagram: "IG",
    Facebook: "FB",
    Telegram: "TELE",
    Widget: "WIDGET",
    Email: "EMAIL",
  };

  const code = platformCodes[randomName];

  const addons = [true, false];
  const randomAddons = addons[Math.floor(Math.random() * addons.length)];

  const currencyCodes = ["IDR", "USD", "SGD", "MYR"];
  const randomCurrency =
    currencyCodes[Math.floor(Math.random() * currencyCodes.length)];

  const randomUnits = Math.floor(Math.random() * 10000) + 1000; // 1000–11000
  const randomNanos = Math.floor(Math.random() * 1_000_000_000); // 0–999,999,999

  const logoUrl = [
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/typography-minimalist-brand-logo-design-template-bc44717c44517af50179a251c2c939d2_screen.jpg?ts=1720947631",
    "https://images.unsplash.com/photo-1752432138370-b2114a7971ac?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo%2C-company-logo%2C-alphabet-logo-%281-design-template-a39a56feb29208db1f43c8e939b1fca2_screen.jpg?ts=1709214616",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-template%2C-company-logo-design-%28-034810302dc8aa4f1a667b8bbd7230e4_screen.jpg?ts=1707851299",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-%26-minimal-hair-studio-logo-design-template-6fb17e84983b88f2ed10e4b8920cca60_screen.jpg?ts=1716721241",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/editable-modern-dj-logo-diy-design-template-1febfbd6a51a1fb2f459cdb84ec29643_screen.jpg?ts=1736499685",
  ];
  const randomLogoUrl = logoUrl[Math.floor(Math.random() * logoUrl.length)];

  const validBodyPlatform = {
    name: randomName,
    code: code,
    logo: randomLogoUrl,
    isAddOns: randomAddons,
    billing: {
      perAccount: {
        currencyCode: randomCurrency,
        nanos: randomNanos,
        units: randomUnits,
      },
    },
  };

  it("platform method GET - get all data successfully", () => {
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: config.loginBody_CT2,
    }).then((response) => {
      const accessToken = response.body.accessToken;
      cy.log(JSON.stringify(accessToken));
      return cy.request({
        method: "GET",
        url: config.platform,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    });
  });
  it.only("platform method POST - get all data successfully", () => {
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: config.loginBody_CT2,
    }).then((response) => {
      const accessToken = response.body.accessToken;
      cy.log(JSON.stringify(accessToken));
      return cy.request({
        method: "POST",
        url: config.platform,
        headers: { Authorization: `Bearer ${accessToken}` },
        body: validBodyPlatform,
      });
    });
  });
});
