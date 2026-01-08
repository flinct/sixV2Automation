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
import { pick, times } from "lodash";
import {
  getLoginBodyByLoginType,
  getHeaderByLoginType,
} from "../../support/selectorBase.js";
import channelAPIPage from "../../support/pages/channel_API.js";

describe("Open API broadcast", () => {
  const channelApiAction = new channelAPIPage();

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
    platform: "652f1e9d5a3c0b1a2d4f5678",
    status: "active",
  };

  it("channel method GET - get all channel", () => {
    channelApiAction.getChannel();
  });
  it("channel method GET - Omit token", () => {
    channelApiAction.getChannelOmitToken();
  });
  it("channel method GET - invalid token", () => {
    channelApiAction.getChannelInvalidToken();
  });
  it("channel method GET - expired token", () => {
    channelApiAction.getChannelExpiredToken();
  });
  // it.only("channel method GET - simulate server error", () => {
  //   channelApiAction.getChannelErrorServerSimulation();
  // });
  it("channel method GET - invalid value param", () => {
    channelApiAction.getChannelInvalidValueParam();
  });
  it("channel method GET - invalid input param", () => {
    channelApiAction.getChannelInvalidParamInput();
  });
  it.only("channel method POST - create new channel", () => {
    channelApiAction.createChannel();
  });
  it("channel method POST - create new channel - missing platform", () => {
    channelApiAction.createChannelMissingPlatform();
  });
  it("channel method POST - create new channel - missing status", () => {
    channelApiAction.createChannelMissingStatus();
  });
  it("channel method POST - create new channel - invalid platform ID", () => {
    channelApiAction.createChannelInvalidPlatformId();
  });
  it("channel method POST - create new channel - invalid status type", () => {
    channelApiAction.createChannelInvalidStatusType();
  });
  it("channel method POST - create new channel - unexpected status value", () => {
    channelApiAction.createChannelUnexpectedStatusValue();
  });
  it("channel method POST - create new channel - invalid JSON body value", () => {
    channelApiAction.createChannelInvalidJSONBodyValue();
  });
  it("channel method POST - create new channel - Omit token", () => {
    channelApiAction.createChannelOmitToken();
  });
  it("channel method POST - create new channel - Invalid token", () => {
    channelApiAction.createChannelOmitToken();
  });
  it("channel method POST - create new channel - Expired token", () => {
    channelApiAction.createChannelExpiredToken();
  });
  it("channel method POST - create new channel - SQL Injection", () => {
    channelApiAction.createChanneTrySQLInjection();
  });
  it("channel method POST - create new channel - No SQL Injection", () => {
    channelApiAction.createChanneTryNoSQLInjection();
  });
  it("channel method POST - create new channel - invalid media type", () => {
    channelApiAction.createChanneTryInvalidMediaType();
  });
  it("channel method GET by ID- get channel by ID", () => {
    channelApiAction.getChannelbyID();
  });
  it("channel method GET by ID- get channel by NON EXIST ID", () => {
    channelApiAction.getChannelbyNonExistID();
  });
  it("channel method GET by ID- get channel by invalid ID", () => {
    channelApiAction.getChannelbyInvalidID();
  });
  it("channel method GET by ID- Omit token", () => {
    channelApiAction.getChannelbyIdOmitToken();
  });
  it("channel method PATCH", () => {
    channelApiAction.patchChannel();
  });
  it("channel method PATCH - partial -", () => {
    channelApiAction.patchChannelPartial();
  });
  it("channel method PATCH - non exist platform -", () => {
    channelApiAction.patchChannelWithNonexistPlatform();
  });
  it("channel method PATCH - non exist channel id -", () => {
    channelApiAction.patchChannelWithNonexistChannelId();
  });
  it("channel method PATCH - with empty body -", () => {
    channelApiAction.patchChannelWithEmptyBody();
  });
  it("channel method PATCH - with changed id -", () => {
    channelApiAction.patchChannelWithChangeIdPlatform();
  });
  it("channel method PATCH - Omit token -", () => {
    channelApiAction.patchChannelOmitToken();
  });
  it("channel method PATCH - invalid token -", () => {
    channelApiAction.patchChannelInvalidToken();
  });
  it("channel method PATCH - SQL injection -", () => {
    channelApiAction.patchChannelInjectionSQL();
  });
  it("channel method PATCH - No SQL injection -", () => {
    channelApiAction.patchChannelInjectionNoSQL();
  });
  it("channel method DELETE", () => {
    channelApiAction.deleteChannel();
  });
  it("channel method DELETE- idempotency -", () => {
    channelApiAction.deleteChannelIdempotency();
  });
  it("channel method DELETE - Non exist Id -", () => {
    channelApiAction.deleteChannelNonExistId();
  });
  it("channel method DELETE - Omit token -", () => {
    channelApiAction.deleteChannelOmitToken();
  });
});
