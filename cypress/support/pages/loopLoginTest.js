import userDataSpam from "../data/spamLogin.js";
import elementAuth from "../commands/auth.js";
import elementToast from "../commands/notification.js";
import elementNavigation from "../commands/navigation.js";
import { userName } from "../loopDataUser.js";
import {
  getLoginBodyByLoginType,
  getHeaderByLoginType,
} from "../selectorBase.js";
import { log, timeout } from "async";
import { env_config } from "../01_url_page.js";
import { keyword } from "color-convert";
const baseUrl = Cypress.config("baseUrl");
const loginType = Cypress.env("loginType");
const randomNumber = Math.floor(Math.random() * 10000000);
const randomNumber2 = Math.floor(Math.random() * 1000) + 1000;
const nib = Math.floor(Math.random() * 1000000000000); //13 digits
const npwp = Math.floor(Math.random() * 100000000000000); //15 digits
const idNumber = Math.floor(Math.random() * 1000000000000000); //16 digits
const config = env_config(baseUrl);
const selectedHeader = getHeaderByLoginType(config, baseUrl, loginType);
const selectedBody = getLoginBodyByLoginType(config, baseUrl, loginType);

// const dataLogin = [
//   // { keyword: "ffqagent02", password: "password1" },
//   // { keyword: "soqagent02", password: "password1" },
//   // { keyword: "mkwagent02", password: "password1" },
//   // { keyword: "mkqagent02", password: "password1" },
//   // { keyword: "bikagent02", password: "password1" },
//   // { keyword: "djjagent03", password: "password1" },
//   // { keyword: "nbxagent02", password: "password1" },
//   // { keyword: "timagent02", password: "password1" },
//   // { keyword: "wmnagent02", password: "password1" },
//   // { keyword: "amqagent04", password: "password1" },
//   // { keyword: "bruagent01", password: "Password1!" },
//   // { keyword: "luvagent02", password: "password1" },
//   // { keyword: "mshagent02", password: "password1" },
//   // { keyword: "sofagent02", password: "password1" },
//   // { keyword: "tobagent02", password: "password1" },
//   // { keyword: "tteagent02", password: "password1" },
//   // { keyword: "bgkagent02", password: "password1" },
//   // { keyword: "luwagent02", password: "password1" },
//   // { keyword: "pgiagent02", password: "password1" },
//   // { keyword: "plwagent03", password: "password1" },
//   // { keyword: "psjagent02", password: "password1" },
//   // { keyword: "tliagent02", password: "password1" },
//   // { keyword: "buwagent02", password: "password1" },
//   // { keyword: "kdiagent02", password: "password1" },
//   // { keyword: "kkaagent02", password: "password1" },
//   // { keyword: "rhaagent02", password: "password1" },
//   // { keyword: "unhagent02", password: "password1" },
//   // { keyword: "blkagent01", password: "Password1!" },
//   // { keyword: "bswagent02", password: "password1" },
//   // { keyword: "mmjagent02", password: "password1" },
//   // { keyword: "pliagent02", password: "password1" },
//   // { keyword: "plpagent02", password: "password1" },
//   // { keyword: "preagent02", password: "password1" },
//   // { keyword: "trjagent01", password: "Password1!" },
//   // { keyword: "upgagent03", password: "password1" },
//   // { keyword: "bitagent02", password: "password1" },
//   // { keyword: "ktgagent02", password: "password1" },
//   // { keyword: "mdcagent03", password: "password1" },
//   // { keyword: "tmhagent02", password: "password1" },
//   { keyword: "gtoagent02", password: "password1" },
// ];
const dataLogin = userName.map((usernameValue) => ({
  keyword: usernameValue,
  password: "TestPassword1!",
}));

class authPage {
  logout() {
    elementNavigation.profileNav().click();
    // elementNavigation.profileNav().click();
    cy.contains(/Log Out|keluar/i).click();
    cy.wait(2000);
    cy.url().should("include", "/login");
  }
  visitLoginPage() {
    cy.visit(baseUrl + "/login");
    cy.viewport(1366, 768);
  }
  visitLoginPageV2() {
    cy.visit(baseUrl + "/id/login");
    cy.viewport(1366, 768);
  }

  loopLoginTest() {
    // this.visitLoginPage();
    // elementAuth.keyword().type("chickentester01");
    // elementAuth.password().type("TestPassword1!");
    // elementAuth.buttonLogin().click();
    this.visitLoginPage();
    cy.wait(2000);
    dataLogin.forEach((item) => {
      // this.visitLoginPageV2();
      elementAuth.keyword().type(item.keyword);
      elementAuth.password().type(item.password);
      elementAuth.buttonLogin().click();
      cy.wait(500);
      cy.get("body").then(($body) => {
        if ($body.find("p.flex-1.text-sm.text-slate-600").length) {
          elementAuth.buttonLogin().click();
        }
      });
      // elementAuth.keyword().clear().type(item.keyword);
      // elementAuth.password().clear().type(item.password);
      // elementAuth.buttonLogin().click();
      cy.wait(500);
      // cy.contains("Dashboard");
      // cy.visit("/inbox");
      cy.wait(500);
      // cy.url().should("include", "/inbox");
      cy.url().should("include", "/id/conversation/your-inbox");
      this.logout();
    });
  }
}
export default authPage;
