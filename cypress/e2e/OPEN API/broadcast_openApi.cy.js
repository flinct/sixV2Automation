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
import broadcastPage from "../../support/pages/broadcastPage.js";

describe("Open API broadcast", () => {
  const authAction = new authPage();
  const broadcastAction = new broadcastPage();

  const baseUrl = Cypress.config("baseUrl");
  const loginType = Cypress.env("loginType");
  const config = env_config(baseUrl);

  const selectedHeader = getHeaderByLoginType(config, baseUrl, loginType);
  const selectedBody = getLoginBodyByLoginType(config, baseUrl, loginType);
  // const timestamp = new Date().toISOString();//UTC
  const timestamp = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  }); //GMT+7

  it("send broadcast from active and used number whatsapp", () => {
    // cy.get(staticNumber).then((accountNumbers) => {
    const repeatCount = 1;

    //get all list of active and used whatsapp number for broadcast
    broadcastAction.getAllList(config, selectedHeader, selectedBody);

    broadcastAction.sendbroadcast(config, selectedHeader, selectedBody);

    cy.task("log", "end");
    // cy.wait(1200);
  });

  // it.skip("send and reply chat antar active number", () => {
  //   sendChatBetweenAccounts();
  // });
});
