import userDataSpam from "../data/spamLogin.js";
import elementAuth from "../commands/auth.js";
import elementToast from "../commands/notification.js";
import {
  getLoginBodyByLoginType,
  getHeaderByLoginType,
} from "../../support/selectorBase.js";
import { log, timeout } from "async";
import { env_config } from "../01_url_page.js";
import "cypress-mailslurp";
import { includes } from "lodash";
const baseUrl = Cypress.config("baseUrl");
const loginType = Cypress.env("loginType");
const randomNumber = Math.floor(10000000 + Math.random() * 10000000);
const randomSortNumber = Math.floor(10 + Math.random() * 10);
const randomNumber2 = Math.floor(Math.random() * 1000) + 1000;
const randomPhoneNumber = Math.floor(100000000 + Math.random() * 100000000);
const nib = Math.floor(1000000000000 + Math.random() * 1000000000000); //13 digits
const npwp = Math.floor(100000000000000 + Math.random() * 100000000000000); //15 digits
const idNumber = Math.floor(
  1000000000000000 + Math.random() * 1000000000000000,
); //16 digits
const generateRandomText = (length = 6) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
const generateRandomSpecialChars = (length = 4) => {
  const chars = "!@#$%^&*()-=_+~`{}|[]";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
const indentifierRegres = "cyt ";

const randomText = generateRandomText(6);
const randomSpecialChars = generateRandomSpecialChars(4);
const config = env_config(baseUrl);
// const selectedHeader = getHeaderByLoginType(config, baseUrl, loginType);
// const selectedBody = getLoginBodyByLoginType(config, baseUrl, loginType);

//testaka ubah sedikit
function logout() {
  cy.userLoginNameLabel().click();
  cy.contains("Keluar").click();
  cy.wait(2000);
  (cy.url().should("include", "/login"), "directed to login page");
}

class authPage {
  // mappingLogin() {
  //   const loginType = Cypress.env("loginType");
  //   const key = `${baseUrl}_${loginType}`;

  //   const loginMap = {
  //     "https://satuinbox.com_goddummyprodemail": () =>
  //       cy.login_prod_by_username("myUsername", "myPassword"), //godummy prod email,
  //     "https://dev.satuinbox.com_chickentester": () =>
  //       cy.login_chickentester_email("myUsername", "myPassword"), //chickentester dev email,
  //     "https://dev.satuinbox.com_godummydev": () =>
  //       cy.login_dev_by_username("myUsername", "myPassword"), //godummy dev email,
  //     "https://staging.satuinbox.com_chickentesterstagingemail": () =>
  //       cy.login_staging_by_email("myUsername", "myPassword"), //chickentester staging email,
  //     "https://niagakara.satuinbox.com_niagakarausername": () =>
  //       cy.login_niagakara("myUsername", "myPassword"), //niagakara username,
  //   };

  //   const loginFn = loginMap[key] || loginMap[`${baseUrl}_${loginType}`];

  //   if (!loginFn) {
  //     throw new Error(
  //       `No login method defined for baseUrl : ${baseUrl} and loginType :${loginType}`
  //     );
  //   }
  //   cy.wait(1000);
  // }

  logout() {
    elementAuth.logout().click({ force: true });
    cy.contains(/keluar|logout/i).click();
    cy.url().should("includes", "/login");
  }

  visitLoginPage() {
    cy.visit(baseUrl + "/login");
    cy.viewport(1366, 768);
  }
  visitLoginPageV2() {
    cy.visit(baseUrl + "/id/login");
    cy.viewport(1366, 768);
  }

  visitRegisterPage() {
    cy.visit("/register");
    cy.viewport(1366, 768);
  }

  validateSuccessAccess() {
    cy.wait(1000);
    cy.softAssert(
      cy.dashboardNav().should("be.visible"),
      "Login Success, directed to Dashboard",
    );
    cy.wait(1000);
  }

  //-----------------------V2---------------------------------
  constructor() {
    this.loginBody = getLoginBodyByLoginType(config, baseUrl, loginType);
    this.header = getHeaderByLoginType(config, baseUrl, loginType);
  }

  //login
  elementCheckingV2Login() {
    //test
    this.visitLoginPage();
    //MAIN ELEMENT
    elementAuth.satuinboxLogo().should("be.visible");
    elementAuth.keyword().should("be.visible");
    elementAuth.keyword().softAssert("Masukan username atau email");
    elementAuth.password().should("be.visible");
    elementAuth.buttonLogin().should("be.visible");
    //SECONDARY ELEMENT
    elementAuth.satuinboxLogo().should("be.visible");
    elementAuth.loginTitle().softAssert(`Log in sekarang`);
    elementAuth.keywordIcon().should("be.visible");
    elementAuth.passwordIcon().should("be.visible");
    elementAuth.showPasswordIconButton().should("be.visible");
    elementAuth.hyperlinkResetPassword().softAssert(`Tidak bisa login?`);
    elementAuth.hyperlinkRegister().softAssert(`Buat akun`);
  }
  elementCheckingV2LoginErrorState() {
    this.visitLoginPage();
    elementAuth.buttonLogin().click();
    elementAuth.keywordErrState().should("be.visible");
    cy.contains(/Username atau Email wajib diisi/i);
    elementAuth.passwordErrState().should("be.visible");
    cy.contains(/Password minimal 8 karakter/i);
  }

  elementCheckingV2Setup() {
    cy.softAssert(elementAuth.satuinboxLogo());
  }

  reGetConfigLogiType() {
    const baseUrl = Cypress.config("baseUrl");
    const config = env_config(baseUrl);

    return getLoginBodyByLoginType(config, baseUrl, Cypress.env("loginType"));
  }

  loginValidUsername() {
    // loginValidUsername(overrideLogin) {
    // if (overrideLogin) {
    //   Cypress.env("loginType", overrideLogin);
    // }

    const loginBody = this.reGetConfigLogiType();

    if (baseUrl === "https://dev-v2.satuinbox.com") {
      this.visitLoginPageV2();
    } else {
      this.visitLoginPage();
    }
    // cy.wrap(this.loginBody).then((body) => {
    elementAuth
      .keyword({
        timeout: 15000,
      })
      .type(loginBody.identifier);
    elementAuth
      .password({
        timeout: 15000,
      })
      .type(loginBody.password);
    elementAuth
      .buttonLogin({
        timeout: 15000,
      })
      .click();
    // });
    cy.url().should("include", `/conversation/your-inbox`);
    cy.task("log", "-----SUCCESSFULL LOGIN------");
  }
  loginAsSupervisor(overrideLogin) {
    if (overrideLogin) {
      Cypress.env("loginType", overrideLogin);
    }

    const loginBody = this.reGetConfigLogiType();

    if (baseUrl === "https://dev-v2.satuinbox.com") {
      this.visitLoginPageV2();
    } else {
      this.visitLoginPage();
    }
    // cy.wrap(this.loginBody).then((body) => {
    elementAuth
      .keyword({
        timeout: 15000,
      })
      .type(loginBody.identifier);
    elementAuth
      .password({
        timeout: 15000,
      })
      .type(loginBody.password);
    elementAuth
      .buttonLogin({
        timeout: 15000,
      })
      .click();
    // });
    cy.url().should("include", `/conversation/your-inbox`);
    cy.task("log", "-----SUCCESSFULL LOGIN as SPV------");
  }
  loginAsAgent(overrideLogin) {
    if (overrideLogin) {
      Cypress.env("loginType", overrideLogin);
    }

    const loginBody = this.reGetConfigLogiType();

    if (baseUrl === "https://dev-v2.satuinbox.com") {
      this.visitLoginPageV2();
    } else {
      this.visitLoginPage();
    }
    // cy.wrap(this.loginBody).then((body) => {
    elementAuth
      .keyword({
        timeout: 15000,
      })
      .type(loginBody.identifier);
    elementAuth
      .password({
        timeout: 15000,
      })
      .type(loginBody.password);
    elementAuth
      .buttonLogin({
        timeout: 15000,
      })
      .click();
    // });
    cy.url().should("include", `/conversation/your-inbox`);
    cy.task("log", "-----SUCCESSFULL LOGIN as AGENT------");
  }
  loginOverride(overrideLogin) {
    if (overrideLogin) {
      Cypress.env("loginType", overrideLogin);
    }

    const loginBody = this.reGetConfigLogiType();

    if (baseUrl === "https://dev-v2.satuinbox.com") {
      this.visitLoginPageV2();
    } else {
      this.visitLoginPage();
    }
    // cy.wrap(this.loginBody).then((body) => {
    elementAuth
      .keyword({
        timeout: 15000,
      })
      .type(loginBody.identifier);
    elementAuth
      .password({
        timeout: 15000,
      })
      .type(loginBody.password);
    elementAuth
      .buttonLogin({
        timeout: 15000,
      })
      .click();
    // });
    cy.url().should("include", `/conversation/your-inbox`);
    cy.task("log", "-----SUCCESSFULL LOGIN as AGENT------");
  }
  loginDummy_testerDummy01() {
    if (baseUrl === "https://dev-v2.satuinbox.com") {
      this.visitLoginPageV2();
    } else {
      this.visitLoginPage();
    }
    cy.wrap(this.loginBody).then((body) => {
      elementAuth
        .keyword({
          timeout: 15000,
        })
        .type("testerdummy01");
      // .type(body.identifier);
      elementAuth
        .password({
          timeout: 15000,
        })
        .type("Asdqwe12@");
      // .type(body.password);
      elementAuth
        .buttonLogin({
          timeout: 15000,
        })
        .click();
    });
    cy.url().should("include", `/conversation/your-inbox`);
  }
  loginDummy_testerDummy02() {
    if (baseUrl === "https://dev-v2.satuinbox.com") {
      this.visitLoginPageV2();
    } else {
      this.visitLoginPage();
    }
    cy.wrap(this.loginBody).then((body) => {
      elementAuth
        .keyword({
          timeout: 15000,
        })
        .type("testerdummy02");
      // .type(body.identifier);
      elementAuth
        .password({
          timeout: 15000,
        })
        .type("Asdqwe12@");
      // .type(body.password);
      elementAuth
        .buttonLogin({
          timeout: 15000,
        })
        .click();
    });
    cy.url().should("include", `/conversation/your-inbox`);
  }

  loginInvalidUsername() {
    this.visitLoginPage();
    cy.login_invalid_username("myUsername", "myPassword");
    elementAuth.errState().should("be.visible");
    cy.contains(/coba lagi atau coba reset password anda/i);
  }

  //register
  elementCheckingRegister() {
    this.visitRegisterPage();
    elementAuth.buttonDaftar().should("be.visible");
    cy.wait(500);
    elementAuth.satuinboxLogo().should("be.visible");
    elementAuth.regFullname().should("be.visible");
    elementAuth.regFullnameTitle().softAssert("Nama Lengkap");
    elementAuth.regUsername().should("be.visible");
    elementAuth.regUsernameTitle().softAssert("Username");
    elementAuth.regEmail().should("be.visible");
    elementAuth.regEmailTitle().softAssert("Email");
    elementAuth.regPhone().should("be.visible");
    elementAuth.regPhoneTitle().softAssert("Nomor Whatsapp");
    elementAuth.regPassword().should("be.visible");
    elementAuth.regPasswordTitle().softAssert("Kata Sandi");
    elementAuth.regPasswordConfirm().should("be.visible");
    elementAuth
      .regPasswordConfirmTitle()
      .softAssert("Masukan Kembali Kata Sandi");
    elementAuth.buttonDaftar().should("be.visible");
    //SECONDARY ELEMENT
    elementAuth.satuinboxLogo();
    elementAuth.registerTitle().softAssert("Daftar untuk melanjutkan!");
  }

  checkingRegisterErrorState() {
    this.visitRegisterPage();
    cy.wait(500);
    elementAuth.buttonDaftar().click();
    elementAuth
      .regFullnameErrMsg()
      .softAssert("Nama lengkap minimal 3 karakter");
    elementAuth.regUsernameErr().should("be.visible");
    elementAuth
      .regUsernameErrMsg()
      .softAssert("Nama pengguna minimal 6 karakter");
    elementAuth.regEmailErr().should("be.visible");
    elementAuth.regEmailErrMsg().softAssert("Email tidak valid");
    elementAuth.regPhone().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert(
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka",
      );
    elementAuth.regPassword().should("be.visible");
    elementAuth.regPasswordErrMsg().softAssert("Kata sandi minimal 8 karakter");
    elementAuth.regPasswordConfirmErr().should("be.visible");
    elementAuth
      .regPasswordConfirmErrMsg()
      .softAssert("Silakan masukkan kembali kata sandi Anda");
  }

  validateAlreadyRegisteredEmail() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("User with email") &&
        err.message.includes("already exists")
      ) {
        // do not fail the test for duplicate email error
        return false;
      }
    });

    this.visitRegisterPage();
    cy.task("log", "checking already used email");
    cy.task("log", "--------------");
    elementAuth.regFullname().type(indentifierRegres + "test duplicate email");
    elementAuth.regUsername().type("testduplicateemail");
    elementAuth.regEmail().type("duplicate@email.com");
    elementAuth.regPhone().type("08" + randomPhoneNumber); //0855695874
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();
    cy.wait(2000);
  }

  validateEmailWithLeading() {
    const prefix = " leading" + randomNumber;
    const email = prefix + "@mail.com";
    const username = prefix;
    this.visitRegisterPage();
    cy.task("log", "checking type email with leading space");
    cy.task("log", "--------------");
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + "test spacing email");
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08" + randomPhoneNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //validate
    const normalizedEmail = email.trim();

    cy.url().should(
      "include",
      `/register/verify-email?email=${encodeURIComponent(normalizedEmail)}`,
    );
    elementAuth.satuinboxLogo().should("be.visible");
    elementAuth
      .successTitle()
      .contains(/Periksa email Anda untuk melanjutkan/i);
    elementAuth.iconSent().should("be.visible");
    elementAuth
      .checkEmailDesc()
      .contains(
        new RegExp(
          `Kami telah mengirimkan email verifikasi ke.*${normalizedEmail}`,
          "i",
        ),
      );
  }

  validateEmailWithUpprecase() {
    const prefix = "uppercase" + randomNumber2;
    const email = (prefix + "@mail.com").toUpperCase();
    const username = prefix;
    this.visitRegisterPage();
    cy.task("log", "checking type email with capslock");
    cy.task("log", "--------------");
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + "uppercase email");
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08" + randomPhoneNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    // elementAuth.buttonDaftar().click();

    //validate login with email
    // const emailTrim = prefix + "@mail.com";
    elementAuth.regEmail().should("have.value", email, { timeout: 500 });
    elementAuth.regEmail().should("have.css", "text-transform", "lowercase");
  }

  validateInvalidEmailInput() {
    const prefix = "missing" + randomNumber2;
    const email = prefix + "mail.com";
    const username = prefix;
    this.visitRegisterPage();
    cy.task("log", "checking invalid email format - missing '@' ");
    cy.task("log", "--------------");
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + "invalid email");
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08" + randomPhoneNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();
    cy.wait(500);
    //validate
    elementAuth.regEmailErr().should("be.visible");
    elementAuth.regEmailErrMsg().softAssert("Email tidak valid");
  }

  validateInvalidEmailInput2() {
    this.visitRegisterPage();
    cy.task("log", "checking invalid email format - missing domain");
    cy.task("log", "--------------");
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + "invalid email");
    elementAuth.regUsername().type("invalidemail");
    elementAuth.regEmail().type("invalid@mail.");
    elementAuth.regPhone().type("08" + randomPhoneNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();
    cy.wait(500);
    //validate
    elementAuth.regEmailErr().should("be.visible");
    elementAuth.regEmailErrMsg().softAssert("Email tidak valid");
  }

  validateInvalidEmailInput3() {
    this.visitRegisterPage();
    cy.task("log", "checking invalid email format - invalid input");
    cy.task("log", "--------------");
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + "invalid email");
    elementAuth.regUsername().type("invalidemail");
    elementAuth.regEmail().type("invalidmail.");
    elementAuth.regPhone().type("08" + randomPhoneNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();
    cy.wait(500);
    //validate
    elementAuth.regEmailErr().should("be.visible");
    elementAuth.regEmailErrMsg().softAssert("Email tidak valid");
  }

  validateTokenAndLinkEmail() {
    cy.task("log", "checking user via API");
    cy.task("log", "checking email validation via API");
    cy.task("log", "checking token email registration via API");
    cy.task("log", "checking redirection page");
    //step
  }

  successRegisterPage() {
    elementAuth.successTitle().should("be.visible");
    // elementAuth.iconSent().should('be.visible')
    elementAuth.checkEmailDesc().should("be.visible");
    elementAuth.registeredUserEmail().should("be.visible");
    elementAuth.resendEmail().should("be.visible");
  }

  successfullRegisterWithValidAllInputFormat() {
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + "success register ");
    elementAuth.regUsername().type("testatc" + randomNumber2);
    elementAuth.regEmail().type(randomNumber + "@testatc.com");
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //success
    this.successRegisterPage();
    // elementAuth.successTitle().should("be.visible");
    // // elementAuth.iconSent().should('be.visible')
    // elementAuth.checkEmailDesc().should("be.visible");
    // elementAuth.registeredUserEmail().should("be.visible");
    // elementAuth.resendEmail().should("be.visible");
    // elementAuth.resendEmail_sentState()
  }

  validateMinimumFullname() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "minfulname";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type("cy");
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regFullnameErr().should("be.visible");
    elementAuth
      .regFullnameErrMsg()
      .softAssert("Nama lengkap minimal 3 karakter");
  }

  validateMaximumFullname() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "maxfullname";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth
      .regFullname()
      .type("testmaxusernameisthirtyfivedigitsdsadsadsa"); //42 digits
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regFullnameErr().should("be.visible");
    elementAuth
      .regFullnameErrMsg()
      .softAssert("Nama lengkap tidak boleh melebihi 35 karakter");
  }
  validateFullnameWithNumbers() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "withnumber";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth
      .regFullname()
      .type(indentifierRegres + "10000000testmaxusername");
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regFullnameErr().should("be.visible");
    elementAuth
      .regFullnameErrMsg()
      .softAssert("Nama lengkap hanya dapat berisi huruf dan spasi");
  }
  validateFullnameWithSpecialChar() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "withspecial";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth
      .regFullname()
      .type(indentifierRegres + "asd!@#$%^&*()_+{}:',./?><;][-=~`");
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regFullnameErr().should("be.visible");
    elementAuth
      .regFullnameErrMsg()
      .softAssert("Nama lengkap hanya dapat berisi huruf dan spasi");
  }
  validateFullnameContainsDoubleSpace() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "doublespace";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "double space " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + "double  space"); //double spacing
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08" + randomNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");

    //error steps
    //validate
    // const usernameTrim = prefix.trim();
    // elementAuth.regFullname().contains("double space", { timeout: 500 });
    elementAuth
      .regFullname()
      .should("have.value", indentifierRegres + "double  space");
    elementAuth.buttonDaftar().click();
    elementAuth.buttonDaftar().should("not.exist");
    this.successRegisterPage();
  }

  validateMinimumUsername() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "minusername";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "min " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type("te");
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regUsernameErr().should("be.visible");
    elementAuth
      .regUsernameErrMsg()
      .softAssert("Nama pengguna minimal 6 karakter");
  }
  validateMaximumUsername() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "maxusername";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "max " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth
      .regUsername()
      .type("testmaxusernameisthirtyfivedigitsdsadsadsa"); //42 digits
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regUsernameErr().should("be.visible");
    elementAuth
      .regUsernameErrMsg()
      .softAssert("Nama pengguna tidak boleh lebih dari 30 karakter");
  }
  validateUsernameWithSpacing() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "username";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "spacing " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type("test regUsername"); //spacing
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regUsernameErr().should("be.visible");
    elementAuth
      .regUsernameErrMsg()
      .softAssert("Nama pengguna hanya boleh berisi huruf kecil dan angka");
  }
  validateUsernameWithSpecialChar() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "username";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "special char " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type("asd!@#$%^&*()_+");
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regUsernameErr().should("be.visible");
    elementAuth
      .regUsernameErrMsg()
      .softAssert("Nama pengguna hanya boleh berisi huruf kecil dan angka");
  }
  validateAlreadyRegisteredUsername() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("User with username") &&
        err.message.includes("already exists")
      ) {
        // do not fail the test for duplicate email error
        return false;
      }
    });

    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "username";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "duplicate" + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type("chickentester01");
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //validate duplicate username message
    cy.wait(200);
    elementToast.toastError({ timeout: 3000 }).should("be.visible");
    elementToast.toastError().contains("Error");
    elementToast.toastError().should("include.text", "User with username");
    elementToast.toastError().should("include.text", "chickentester01");
  }
  validateUsernameWithUppercase() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("User with username") &&
        err.message.includes("already exists")
      ) {
        // do not fail the test for duplicate email error
        return false;
      }
    });

    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "username";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "uppercase " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type("CHICKENTESTER01");
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    // elementAuth.regUsername().should("have.value", fullname);
    elementAuth.regUsername().should("have.css", "text-transform", "lowercase");
    elementAuth.regUsername().should("have.value", "CHICKENTESTER01");
  }
  validateUsernameWithtrailingSpace() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "username";
    const email = prefix + number + "@gmail.com";
    // const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    const username = "chickentester01 ";
    cy.task("log", `username with trailing : ${username}`);
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username); //trailing spacing
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    // elementAuth.buttonDaftar().click();

    //error steps
    const normalize = (str) => str.replace(/\u00A0/g, "").trim();

    const usernameNormalized = normalize(username);

    elementAuth
      .regUsername({ timeout: 500 })
      .invoke("val")
      .then((val) => normalize(val))
      .should("eq", usernameNormalized);
    // elementAuth.regUsername().contains(usernameTrim, { timeout: 500 });
  }

  validatePhoneNumberLocalCode() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("already exists") ||
        err.message.includes("ServiceError")
      ) {
        return false; // prevent test failure
      }
    });

    const identifier = "atc";
    const number = randomNumber;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("6285173223344");
    // elementAuth.regPhone().type("0896" + randomNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    cy.intercept("POST", "/api/auth/register").as("register");
    elementAuth.buttonDaftar().click();

    //error steps
    //validate
    cy.wait("@register").then((interception) => {
      const status = interception.response?.statusCode;
      const changeNumber = randomNumber;
      cy.task("log", "is response 409?");
      cy.wait(5000);

      if (status === 409) {
        cy.task("log", "Phone already exists, retry with new number");

        // const newRandom = Math.floor(100000 + Math.random() * 900000);
        elementAuth
          .regPhone()
          .clear()
          .type("62897" + changeNumber);
        cy.wait(500);
        elementAuth.buttonDaftar().click();
      } else {
        cy.task("log", "no conflict");
      }
    });
    cy.url().should(
      "include",
      `/register/verify-email?email=${encodeURIComponent(email)}`,
    );
  }
  validatePhoneNumberInternationalCode() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("already exists") ||
        err.message.includes("ServiceError")
      ) {
        return false; // prevent test failure
      }
    });

    const identifier = "atc";
    const number = Math.floor(10000000 + Math.random() * 10000000);
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("6285173223344");
    // elementAuth.regPhone().type("62896" + randomNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    cy.intercept("POST", "/api/auth/register").as("register");
    elementAuth.buttonDaftar().click();

    //error steps
    //validate
    cy.wait("@register").then((interception) => {
      const status = interception.response?.statusCode;
      const changeNumber = number;
      cy.task("log", "is response 409?");
      cy.wait(5000);

      if (status === 409) {
        cy.task("log", "Phone already exists, retry with new number");

        // const newRandom = Math.floor(100000 + Math.random() * 900000);
        elementAuth
          .regPhone()
          .clear()
          .type("62897" + changeNumber);
        cy.wait(500);
        elementAuth.buttonDaftar().click();
      } else {
        cy.task("log", "no conflict");
      }
    });
    cy.url().should(
      "include",
      `/register/verify-email?email=${encodeURIComponent(email)}`,
    );
  }
  validateMinimumPhoneNumber9digit() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("089600001"); //9 digits
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert("Nomor telepon harus terdiri dari 10 hingga 12 digit");
  }
  validateMinimumPhoneNumber5digit() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960"); //5 digits
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert("Nomor telepon harus terdiri dari 10 hingga 12 digit");
  }
  validateMinimumPhoneNumber2digit() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08"); //2 digits
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert("Nomor telepon harus terdiri dari 10 hingga 12 digit");
  }
  validateMaximumPhoneNumber13digit() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("0896000000011"); //13 digits
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert("Nomor telepon harus terdiri dari 10 hingga 12 digit");
  }
  validateMaximumPhoneNumber17digit() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000000112345"); //17 digits
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert("Nomor telepon harus terdiri dari 10 hingga 12 digit");
  }
  validateMaximumPhoneNumber25digit() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("0896000000011234567891234"); //25 digits
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert("Nomor telepon harus terdiri dari 10 hingga 12 digit");
  }
  validatePhoneNumberWithSpecialCharacter() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000!@#$");
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert(
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka",
      );
  }
  validatePhoneNumberWithSpacing() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("User with phone") &&
        err.message.includes("already exists")
      ) {
        // do not fail the test for duplicate email error
        return false;
      }
    });

    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    const numberWithSpace = "0816382873 11";
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    // elementAuth.regPhone().type(numberWithSpace);
    elementAuth.regPhone().type(numberWithSpace);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    const normalize = (str) => str.replace(/\D/g, "");

    const numberWithSpaceTrimmed = normalize(numberWithSpace);

    elementAuth
      .regPhone({ timeout: 500 })
      .invoke("val")
      .then((val) => val.trim())
      .should("eq", numberWithSpaceTrimmed);

    elementToast.toastError().should("be.visible");
    // elementToast
    //   .toastErrorMsg()
    //   .should("include.text", `${numberWithSpaceTrimmed} already exists`);
    // cy.contains(
    //   "p",
    //   `Username with phone ${numberWithSpaceTrimmed} already exists`
    // );
  }
  validatePhoneNumberWithTrailing() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("User with phone") &&
        err.message.includes("already exists")
      ) {
        // do not fail the test for duplicate email error
        return false;
      }
    });

    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    const numberWithTrailingSpace = "081638287311 ";
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type(numberWithTrailingSpace);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    const normalize = (str) => str.replace(/\D/g, "");

    const numberWithSpaceTrimmed = numberWithTrailingSpace.trim();

    elementAuth
      .regPhone({ timeout: 500 })
      .invoke("val")
      .then((val) => val.trim())
      .should("eq", numberWithSpaceTrimmed);

    elementToast.toastError().should("be.visible").contains(/error/i);
  }
  validatePhoneNumberWithInvalidPrefix() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("02960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert(
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka",
      );
  }
  validatePhoneNumberWithPrefixSpacing() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type(" 02960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert(
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka",
      );
  }
  validatePhoneNumberWithAlreadyRegisteredNumber() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("User with phone") &&
        err.message.includes("already exists")
      ) {
        // do not fail the test for duplicate email error
        return false;
      }
    });

    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "phone";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    const numberWithTrailingSpace = "081638287311 ";
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type(numberWithTrailingSpace);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    //validate duplicate username message
    elementToast.toastError().should("be.visible");
    elementToast.toastError().contains("Error");
    // elementToast.toastErrorMsg().should("include.text", "User with username");
    // elementToast.toastErrorMsg().should("include.text", "chickentester01");
  }

  validateMinimumPassword() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "password";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08961234" + number);
    elementAuth.regPassword().type("Asd");
    elementAuth.regPasswordConfirm().type("Asd");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPasswordErr().should("be.visible");
    elementAuth.regPasswordErrMsg().softAssert("Kata sandi minimal 8 karakter");
  }
  validateMaximumPassword() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "password";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08961234" + number);
    elementAuth.regPassword().type("Asdqwe12@!#$%^&*("); //17 chars
    elementAuth.regPasswordConfirm().type("Asdqwe12@!#$%^&*(");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPasswordErr().should("be.visible");
    elementAuth
      .regPasswordErrMsg()
      .softAssert("Kata sandi maksimal 16 karakter");
  }
  validatePasswordNoSpecialChar() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "password";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08961234" + number);
    elementAuth.regPassword().type("Asdqwe123");
    elementAuth.regPasswordConfirm().type("Asdqwe123");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPasswordErr().should("be.visible");
    elementAuth
      .regPasswordErrMsg()
      .softAssert(
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus",
      );
  }
  validatePasswordNoCapitalChar() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "password";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08961234" + number);
    elementAuth.regPassword().type("asdqwe12@");
    elementAuth.regPasswordConfirm().type("asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPasswordErr().should("be.visible");
    elementAuth
      .regPasswordErrMsg()
      .softAssert(
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus",
      );
  }
  validatePasswordSameAsUsername() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "password";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08961234" + number);
    elementAuth.regPassword().type(username);
    elementAuth.regPasswordConfirm().type(username);
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPasswordErr().should("be.visible");
    elementAuth
      .regPasswordErrMsg()
      .softAssert(
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus, tidak dapat sama dengan username / email",
      );
  }
  validatePasswordSameAsEmail() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "password";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08961234" + number);
    elementAuth.regPassword().type(email);
    elementAuth.regPasswordConfirm().type(email);
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPasswordErr().should("be.visible");
    elementAuth
      .regPasswordErrMsg()
      .softAssert(
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus, tidak dapat sama dengan username / email",
      );
  }
  validatePasswordContainsSpacing() {
    const identifier = "atc";
    const number = randomNumber2;
    const prefix = "password";
    const email = prefix + number + "@gmail.com";
    const username = prefix + number;
    const fullname = "local num " + prefix + identifier;
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type(indentifierRegres + fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08961234" + number);
    elementAuth.regPassword().type("Asdqwe12 @");
    elementAuth.regPasswordConfirm().type("Asdqwe12 @");
    // elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPasswordErr().should("be.visible");
    elementAuth
      .regPasswordErrMsg()
      .softAssert(
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus, tidak dapat sama dengan username / email",
      );
  }

  //login
  tryLoginBeforeEmailValidated() {}

  //onboarding
  validateOnboardingSuccessAccess() {
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      // cy.task("log", "email : " + email);
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      // cy.wait(2000);
      // cy.visit("/login");
      // elementAuth.hyperlinkRegister().click();
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
    });

    // elementAuth.fullname().clear();
    // elementAuth.username().clear();
    // elementAuth.emai().clear();
    // elementAuth.phone().clear();
    // elementAuth.password().clear();
    // elementAuth.passwordConfirm().clear();

    // elementAuth.fullname().type("success register");
    // elementAuth.username().type("testatc" + randomNumber2);
    // elementAuth.emai().type(randomNumber + "@testatc.com");
    // elementAuth.phone().type("08960000" + randomNumber2);
    // elementAuth.password().type("Asdqwe12@");
    // elementAuth.passwordConfirm().type("Asdqwe12@");
    // elementAuth.buttonDaftar().click();

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
          // cy.wrap(messages).as("messages");
          if (messages && messages.length > 0) {
            return messages[0].id;
          } else {
            cy.wait(delay);
            return waitForEmail(token, maxRetry - 1, delay);
          }
        });
    }

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          // const htmlContent = searchLink.body.html?.[0];
          // const regex = /href=https:"([^"]+)"/;
          // const regex = /href="(https:[^"]+)"/;
          // const match = htmlContent?.match(regex);
          // ini yang sebelumnya nyala // const regex =
          //   /href='(https:\/\/v2\.satuinbox\.com\/verification\?token[^']+)'/;

          // ini yang sebelumnya nyala // const match = htmlContent.match(regex);
          // if (match) {
          //   const verificationUrl = match[1];
          //   cy.task("log", "access verification link from");
          //   cy.visit(verificationUrl); // lanjutkan ke halaman verify
          // } else {
          //   cy.log("failed to visit verification link");
          //   // failOnStatusCode: true;
          // }
          // ini yang sebelumnya nyala // if (!match) {
          //   throw new Error("Failed to find verification link");
          // }

          // Decode HTML entities
          // const verificationUrl = match[1]
          //   .replace(/&#x3D;/g, "=")
          //   .replace(/&amp;/g, "&");

          // testaka new try
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
          // elementAuth.verifyUserEmail().click();
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    // cy.wait(5000)
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    // // //login after verify email and setup onboarding
    cy.task("log", "login after verify email and setup onboarding");
    // cy.wait(2500);
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    // elementAuth.keyword().type("valencia10");
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    // cy.wait(5000);
    cy.url({ timeout: 10000 }).should("not.include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberUpload();
    elementAuth.onboardingButtonSubmit().click({ timeout: 60000 });

    cy.wait(1000);
    elementAuth.onboardingSUBMITTEDdataTitle();
    elementAuth.onboardingSUBMITTEDdataLogout().click();
    cy.url({ timeout: 10000 }).should("not.include", "/onboarding");
  }
  validateOnboardingNotRedisplayWhenRefreshed() {
    // this.visitRegisterPage();
    // elementAuth.regFullname().clear();
    // elementAuth.regUsername().clear();
    // elementAuth.regEmail().clear();
    // elementAuth.regPhone().clear();
    // elementAuth.regPassword().clear();
    // elementAuth.regPasswordConfirm().clear();

    // elementAuth.regFullname().type("success register");
    // elementAuth.regUsername().type("testatc" + randomNumber2);
    // elementAuth.regEmail().type(randomNumber + "@testatc.com");
    // elementAuth.regPhone().type("08960000" + randomNumber2);
    // elementAuth.regPassword().type("Asdqwe12@");
    // elementAuth.regPasswordConfirm().type("Asdqwe12@");
    // elementAuth.buttonDaftar().click();

    // cy.wait(2000);

    // elementAuth.onboardingTitle().should("be.visible");
    // elementAuth.onboardingOrganizationInfo().should("be.visible");
    // elementAuth.onboardingOrganizationName().should("be.visible");
    // elementAuth.onboardingOrganizationNIB().should("be.visible");
    // elementAuth.onboardingOrganizationNPWP().should("be.visible");
    // elementAuth.onboardingOrganizationNIBupload().should("be.visible");
    // elementAuth.onboardingOrganizationPICdesc().should("be.visible");
    // elementAuth.onboardingOrganizationIDnumber().should("be.visible");
    // elementAuth.onboardingOrganizationIDnumberUpload().should("be.visible");
    // elementAuth.onboardingButtonSubmit().should("be.visible");

    // elementAuth
    //   .onboardingTitle()
    //   .contains("Verify your organization or company");
    // elementAuth.onboardingOrganizationInfo().type("");
    // elementAuth
    //   .onboardingOrganizationName()
    //   .type("Dummy Organization" + randomNumber2);
    // elementAuth.onboardingOrganizationNIB().type(nib);
    // elementAuth.onboardingOrganizationNPWP().type(npwp);
    // elementAuth.onboardingOrganizationNIBupload();
    // elementAuth.onboardingOrganizationPICdesc().contains();
    // elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    // elementAuth.onboardingOrganizationIDnumberUpload().type("");
    // elementAuth.onboardingButtonSubmit().click();

    // //validation
    // cy.reload();

    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      // cy.task("log", "email : " + email);
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      // cy.wait(2000);
      // cy.visit("/login");
      // elementAuth.hyperlinkRegister().click();
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
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
          // cy.wrap(messages).as("messages");
          if (messages && messages.length > 0) {
            return messages[0].id;
          } else {
            cy.wait(delay);
            return waitForEmail(token, maxRetry - 1, delay);
          }
        });
    }

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
          // elementAuth.verifyUserEmail().click();
        });
      });
    });

    // verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    // cy.wait(5000)
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    // // //login after verify email and setup onboarding
    cy.task("log", "login after verify email and setup onboarding");
    // cy.wait(2500);
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    // elementAuth.keyword().type("valencia10");
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    // cy.wait(5000);
    cy.url({ timeout: 10000 }).should("not.include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberUpload();
    elementAuth.onboardingButtonSubmit().click({ timeout: 60000 });

    //validation
    cy.reload();
    elementAuth.onboardingSUBMITTEDdataTitle();
  }

  validateOnboardingReAccessViaPath() {
    // this.visitRegisterPage();
    // elementAuth.fullname().clear();
    // elementAuth.username().clear();
    // elementAuth.email().clear();
    // elementAuth.phone().clear();
    // elementAuth.password().clear();
    // elementAuth.passwordConfirm().clear();

    // elementAuth.fullname().type("success register");
    // elementAuth.username().type("testatc" + randomNumber2);
    // elementAuth.email().type(randomNumber + "@testatc.com");
    // elementAuth.phone().type("08960000" + randomNumber2);
    // elementAuth.password().type("Asdqwe12@");
    // elementAuth.passwordConfirm().type("Asdqwe12@");
    // elementAuth.buttonDaftar().click();

    // cy.wait(2000);

    // elementAuth.onboardingTitle().should("be.visible");
    // elementAuth.onboardingOrganizationInfo().should("be.visible");
    // elementAuth.onboardingOrganizationName().should("be.visible");
    // elementAuth.onboardingOrganizationNIB().should("be.visible");
    // elementAuth.onboardingOrganizationNPWP().should("be.visible");
    // elementAuth.onboardingOrganizationNIBupload().should("be.visible");
    // elementAuth.onboardingOrganizationPICdesc().should("be.visible");
    // elementAuth.onboardingOrganizationIDnumber().should("be.visible");
    // elementAuth.onboardingOrganizationIDnumberUpload().should("be.visible");
    // elementAuth.onboardingButtonSubmit().should("be.visible");

    // elementAuth
    //   .onboardingTitle()
    //   .contains("Verify your organization or company");
    // elementAuth.onboardingOrganizationInfo().type("");
    // elementAuth
    //   .onboardingOrganizationName()
    //   .type("Dummy Organization" + randomNumber2);
    // elementAuth.onboardingOrganizationNIB().type(nib);
    // elementAuth.onboardingOrganizationNPWP().type(npwp);
    // elementAuth.onboardingOrganizationNIBupload();
    // elementAuth.onboardingOrganizationPICdesc().contains();
    // elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    // elementAuth.onboardingOrganizationIDnumberUpload().type("");
    // elementAuth.onboardingButtonSubmit().click();

    // //validation
    // cy.visit("onboarding");

    //testaka
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      // cy.task("log", "email : " + email);
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      // cy.wait(2000);
      // cy.visit("/login");
      // elementAuth.hyperlinkRegister().click();
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
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
          // cy.wrap(messages).as("messages");
          if (messages && messages.length > 0) {
            return messages[0].id;
          } else {
            cy.wait(delay);
            return waitForEmail(token, maxRetry - 1, delay);
          }
        });
    }

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
          // elementAuth.verifyUserEmail().click();
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    // cy.wait(5000)
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    // // //login after verify email and setup onboarding
    cy.task("log", "login after verify email and setup onboarding");
    // cy.wait(2500);
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    // elementAuth.keyword().type("valencia10");
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    // cy.wait(5000);
    cy.url({ timeout: 10000 }).should("not.include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberUpload();
    elementAuth.onboardingButtonSubmit().click({ timeout: 60000 });

    //validation
    cy.visit("onboarding");
    elementAuth.onboardingSUBMITTEDdataTitle();
  }

  //testaka
  validateOnboardingWithValidCriteria() {
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
    });
    //get all message from temp email
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

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          // testaka new try
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    cy.task("log", "login after verify email and setup onboarding");
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    cy.url({ timeout: 10000 }).should("not.include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberUpload();
    elementAuth.onboardingButtonSubmit().click({ timeout: 60000 });

    cy.wait(1000);
    elementAuth.onboardingSUBMITTEDdataTitle();
    elementAuth.onboardingSUBMITTEDdataLogout().click();
    cy.url({ timeout: 10000 }).should("not.include", "/onboarding");

    //approve onboarding
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: {
        identifier: usernameSuperAdmin,
        password: passwordSuperAdmin,
      },
    }).then((getToken) => {
      const accessTokenSuperAdmin = getToken.body.accessToken;
      cy.wrap(accessTokenSuperAdmin).as("superAdminToken");
    });

    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: {
        identifier: firstTextMailAndName,
        password: password,
      },
    }).then((getcompanyId) => {
      const companyIdNewUser = getcompanyId.body.user.company.companyId;
      cy.wrap(companyIdNewUser).as("userCompanyId");
    });

    cy.get("@superAdminToken").then((token) => {
      cy.get("@userCompanyId").then((companyId) => {
        cy.request({
          method: "POST",
          url: config.approveOnboarding(companyId),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((responseOnboarding) => {
          cy.task(
            "log",
            "response after approvall ",
            responseOnboarding.status,
          );
        });
      });
    });

    //login after onboarding success
    cy.wait(3000);
    cy.task("log", "login after onboarding");
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    cy.url({ timeout: 10000 }).should("include", "/login");
  }

  validateOnboardingMinimumOrganizationName() {
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
    });
    //get all message from temp email
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

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          // testaka new try
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    cy.task("log", "login after verify email and setup onboarding");
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    //onboarding page
    elementAuth.onboardingOrganizationName().type("co");
    // elementAuth.onboardingOrganizationNIB().type(nib);
    // elementAuth.onboardingOrganizationNPWP().type(npwp);
    // elementAuth.onboardingOrganizationNIBupload();
    // elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    // elementAuth.onboardingOrganizationIDnumberUpload();

    cy.wait(1000);
    elementAuth.onboardingOrganizationNameErr;
    elementAuth
      .onboardingOrganizationNameErrorMsg()
      .should(
        "contain",
        "Nama organisasi harus terdiri dari 3–50 karakter dan dapat berisi huruf, angka, spasi, atau tanda titik.",
      );
  }

  validateOnboardingOrganizationNameValidLength() {} //sama kaya display behaviour ?

  validateOnboardingMaximumOrganizationName() {
    cy.task(
      "log",
      "validate onboarding with organization name more than 50 characters",
    );
    //onboarding page
    elementAuth.onboardingOrganizationName().clear();
    cy.wait(400);
    elementAuth
      .onboardingOrganizationName()
      .type(
        "company dengan nama organisasi berisi lebih dari lima puluh karakter",
      );

    cy.wait(1000);
    elementAuth.onboardingOrganizationNameErr;
    elementAuth
      .onboardingOrganizationNameErrorMsg()
      .should(
        "contain",
        "Nama organisasi harus terdiri dari 3–50 karakter dan dapat berisi huruf, angka, spasi, atau tanda titik.",
      );
  }
  validateOnboardingOrganizationNameWithSpecialChars() {
    cy.task(
      "log",
      "validate onboarding with organization name with special characters",
    );
    //onboarding page
    elementAuth.onboardingOrganizationName().clear();
    cy.wait(400);
    elementAuth.onboardingOrganizationName().type("company @!");

    cy.wait(1000);
    elementAuth.onboardingOrganizationNameErr;
    elementAuth
      .onboardingOrganizationNameErrorMsg()
      .should(
        "contain",
        "Nama organisasi harus terdiri dari 3–50 karakter dan dapat berisi huruf, angka, spasi, atau tanda titik.",
      );
  }

  validateOnboardingOrganizationNameWithNumericOnly() {
    cy.task(
      "log",
      "validate onboarding with organization name with numeric only",
    );
    //onboarding page
    elementAuth.onboardingOrganizationName().clear();
    cy.wait(400);
    elementAuth.onboardingOrganizationName().type("123456");

    cy.wait(1000);
    elementAuth.onboardingOrganizationNameErr;
    elementAuth
      .onboardingOrganizationNameErrorMsg()
      .should(
        "contain",
        "Nama organisasi jangan hanya terdiri dari nomor saja",
      );
  }
  validateOnboardingOrganizationNameWithExistingData() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("Company with name") &&
        err.message.includes("already exists")
      ) {
        // do not fail the test for duplicate email error
        return false;
      }
    });
    cy.task(
      "log",
      "validate onboarding with organization name that already exists",
    );

    // // //onboarding page
    elementAuth.onboardingOrganizationName().clear();
    cy.wait(400);
    elementAuth.onboardingOrganizationName().type("Taff Go Unify");
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberUpload();
    elementAuth.onboardingButtonSubmit().click();

    cy.wait(1000);
  }

  validateOnboardingMinimumNIB() {
    cy.task(
      "log",
      "validate onboarding with NIB with less than 13 digits or non-numeric",
    );

    elementAuth.onboardingOrganizationName().clear();
    elementAuth.onboardingOrganizationName().type("company test minimum NIB");
    elementAuth.onboardingOrganizationNIB().type("123");
    // elementAuth.onboardingOrganizationNPWP().type(npwp);
    // elementAuth.onboardingOrganizationNIBupload();
    // elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    // elementAuth.onboardingOrganizationIDnumberUpload();

    cy.wait(1000);
    elementAuth.onboardingOrganizationNIBErr;
    elementAuth
      .onboardingOrganizationNIBErrorMsg()
      .should(
        "contain",
        "Nomor NIB harus berupa angka dengan panjang 13 digit.",
      );
    elementAuth.onboardingButtonSubmit().should("be.disabled");

    // wait for generate new email. NOT WORKING
    // cy.wait(60000);
  }
  validateOnboardingNIBValidLength() {
    elementAuth.onboardingOrganizationNIB().clear();
    elementAuth.onboardingOrganizationNIB().type(nib);

    elementAuth
      .onboardingOrganizationNIB()
      .invoke("val")
      .then((val) => {
        // ✅ UI berubah (ada strip)
        expect(val).to.not.equal(nib);

        // ✅ format sesuai
        expect(val).to.match(/^\d-\d{4}-\d{4}-\d{4}$/);

        // ✅ data tetap sama
        const clean = val.replace(/-/g, "");
        expect(Number(clean)).to.equal(nib);
      });

    cy.wait(1000);
  }
  validateOnboardingMaximumNIB() {
    cy.task(
      "log",
      "validate onboarding with NIB with more than 13 digits or non-numeric",
    );

    elementAuth.onboardingOrganizationNIB().clear();

    const input = nib + "123";
    elementAuth.onboardingOrganizationNIB().type(input);
    // elementAuth.onboardingOrganizationNPWP().type(npwp);
    // elementAuth.onboardingOrganizationNIBupload();
    // elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    // elementAuth.onboardingOrganizationIDnumberUpload();

    cy.wait(1000);
    elementAuth
      .onboardingOrganizationNIB()
      .invoke("val")
      .then((val) => {
        const actual = val.replace(/\D/g, ""); // ambil angka saja
        const cleanInput = input.replace(/\D/g, "");

        // memastikan tidak sama dengan input awal
        expect(actual).to.not.equal(cleanInput);

        // memastikan yang tersimpan adalah 13 digit pertama
        expect(actual).to.equal(cleanInput.slice(0, 13));
      });
  }

  validateOnboardingNIBWithAlphabet() {
    cy.task("log", "validate onboarding with NIB with alphabet characters");
    elementAuth.onboardingOrganizationNIB().clear();

    elementAuth.onboardingOrganizationNIB().type(randomText);

    cy.wait(1000);
    elementAuth.onboardingOrganizationNIBErr;
    elementAuth
      .onboardingOrganizationNIBErrorMsg()
      .should(
        "contain",
        "Nomor NIB harus berupa angka dengan panjang 13 digit.",
      );

    expect(randomText).to.not.equal("");
    elementAuth
      .onboardingOrganizationNIB()
      .invoke("val")
      .then((val) => {
        // perbandingan: input vs output
        expect(val).to.not.equal(randomText);
        // field kosong
        expect(val).to.equal("");
      });
    elementAuth.onboardingButtonSubmit().should("be.disabled");

    // wait for generate new email. NOT WORKING
    // cy.wait(60000);
  }

  validateOnboardingNIBWithSpecialChars() {
    cy.task("log", "validate onboarding with NIB with special characters");
    elementAuth.onboardingOrganizationNIB().clear();
    elementAuth.onboardingOrganizationNIB().type(randomSpecialChars);

    cy.wait(1000);
    elementAuth.onboardingOrganizationNIBErr;
    elementAuth
      .onboardingOrganizationNIBErrorMsg()
      .should(
        "contain",
        "Nomor NIB harus berupa angka dengan panjang 13 digit.",
      );

    expect(randomSpecialChars).to.not.equal("");
    elementAuth
      .onboardingOrganizationNIB()
      .invoke("val")
      .then((val) => {
        // perbandingan: input vs output
        expect(val).to.not.equal(randomSpecialChars);
        // field kosong
        expect(val).to.equal("");
      });
    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }

  validateOnboardingNIBWithSpaces() {
    cy.task("log", "validate onboarding with NIB with spaces");
    elementAuth.onboardingOrganizationNIB().clear();

    const withspaces = "a b c  d  e";

    elementAuth.onboardingOrganizationNIB().type(withspaces);

    cy.wait(1000);
    elementAuth.onboardingOrganizationNIBErr;
    elementAuth
      .onboardingOrganizationNIBErrorMsg()
      .should(
        "contain",
        "Nomor NIB harus berupa angka dengan panjang 13 digit.",
      );

    expect(withspaces).to.not.equal("");
    elementAuth
      .onboardingOrganizationNIB()
      .invoke("val")
      .then((val) => {
        // perbandingan: input vs output
        expect(val).to.not.equal(withspaces);
        // field kosong
        expect(val).to.equal("");
      });
  }

  validateOnboardingMinimumNPWP() {
    cy.task(
      "log",
      "validate onboarding with NPWP with less than 15 digits or non-numeric",
    );
    elementAuth.onboardingOrganizationNPWP().clear();

    elementAuth.onboardingOrganizationNPWP().type("565");

    cy.wait(1000);
    elementAuth.onboardingOrganizationNPWPErr;
    elementAuth
      .onboardingOrganizationNPWPErrorMsg()
      .should(
        "contain",
        "Nomor NPWP harus berupa angka dengan panjang 15 digit.",
      );
    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }

  validateOnboardingNPWPValidLength() {
    cy.task(
      "log",
      "validate onboarding with NPWP with valid length but check format",
    );
    elementAuth.onboardingOrganizationNIB().clear();
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().clear();
    elementAuth.onboardingOrganizationNPWP().type(npwp);

    elementAuth
      .onboardingOrganizationNPWP()
      .invoke("val")
      .then((val) => {
        // ✅ UI berubah (ada strip)
        expect(val).to.not.equal(npwp);

        // ✅ format sesuai
        expect(val).to.match(/^\d{2}-\d{3}-\d{3}-\d-\d{3}-\d{3}$/);

        // ✅ data tetap sama
        const clean = val.replace(/-/g, "");
        expect(Number(clean)).to.equal(npwp);
      });

    cy.wait(1000);
  }

  validateOnboardingMaximumNPWP() {
    cy.task(
      "log",
      "validate onboarding with NPWP with more than 15 digits or non-numeric",
    );
    elementAuth.onboardingOrganizationNPWP().clear();

    const input = npwp + "123";

    elementAuth.onboardingOrganizationNPWP().type(input);

    cy.wait(1000);
    elementAuth
      .onboardingOrganizationNPWP()
      .invoke("val")
      .then((val) => {
        const actual = val.replace(/\D/g, ""); // ambil angka saja
        const cleanInput = input.replace(/\D/g, "");

        // memastikan tidak sama dengan input awal
        expect(actual).to.not.equal(cleanInput);

        // memastikan yang tersimpan adalah 15 digit pertama
        expect(actual).to.equal(cleanInput.slice(0, 15));
      });
  }

  validateOnboardingNPWPWithAlphabet() {
    cy.task("log", "validate onboarding with NPWP with alphabet characters");
    elementAuth.onboardingOrganizationNPWP().clear();

    elementAuth.onboardingOrganizationNPWP().type("565asdqwe123");

    cy.wait(1000);
    elementAuth.onboardingOrganizationNPWPErr;
    elementAuth
      .onboardingOrganizationNPWPErrorMsg()
      .should(
        "contain",
        "Nomor NPWP harus berupa angka dengan panjang 15 digit.",
      );

    expect(randomText).to.not.equal("");
    elementAuth
      .onboardingOrganizationNPWP()
      .invoke("val")
      .then((val) => {
        // perbandingan: input vs output
        expect(val).to.not.equal(randomText);
        // field kosong
        // expect(val).to.equal("");
      });
    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }

  validateOnboardingNPWPWithSpecialChars() {
    cy.task("log", "validate onboarding with NPWP with special characters");
    elementAuth.onboardingOrganizationNPWP().clear();

    const withspaces = "a b c  d  e";

    elementAuth.onboardingOrganizationNPWP().type(withspaces);

    cy.wait(1000);
    elementAuth.onboardingOrganizationNPWPErr;
    elementAuth
      .onboardingOrganizationNPWPErrorMsg()
      .should(
        "contain",
        "Nomor NPWP harus berupa angka dengan panjang 15 digit.",
      );

    expect(withspaces).to.not.equal("");
    elementAuth
      .onboardingOrganizationNPWP()
      .invoke("val")
      .then((val) => {
        // perbandingan: input vs output
        expect(val).to.not.equal(withspaces);
        // field kosong
        expect(val).to.equal("");
      });
    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }

  validateOnboardingNIBUploadBelowMax() {
    cy.task(
      "log",
      "validate onboarding NIB upload with valid file below max size",
    );
    elementAuth.onboardingOrganizationIDnumberUpload();

    elementAuth.onboardingOrganizationIDnumberuploadPNG();
    // elementAuth.onboardingOrganizationUploadImgMaxErr();
    cy.wait(1000);

    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }

  validateOnboardingNIBUploadValidExt() {
    cy.task(
      "log",
      "validate onboarding NIB upload with valid extension (.pdf, .jpg, .jpeg, .png)",
    );

    // Upload file dengan ekstension valid (contoh: .pdf)
    elementAuth
      .onboardingOrganizationIDnumberuploadMin()
      .selectFile("cypress/fixtures/valid_nib_document.pdf");

    cy.wait(1000);

    // Verify file uploaded successfully (no error message)
    elementAuth.onboardingOrganizationNIBErr().should("not.exist");

    // Button should still be disabled until all fields valid
    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }

  validateOnboardingNIBUploadExceedMax() {
    cy.task("log", "validate onboarding NIB upload exceeding size limit");

    cy.reload();
    cy.wait(1000);
    elementAuth.onboardingOrganizationIDnumberuploadMax();
    // .selectFile("cypress/fixtures/5,2mb.png");

    cy.wait(1000);

    // Should show error message for exceeding max size
    elementAuth.onboardingOrganizationUploadImgMaxErr();
    // .should("contain", "Ukuran file terlalu besar");

    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }

  validateOnboardingNIBUploadInvalidExt() {
    cy.task("log", "validate onboarding NIB upload with invalid extension");

    // Upload file dengan ekstension invalid (.doc, .txt, dll)
    elementAuth.onboardingOrganizationIDnumberuploadCorruptJPEG();
    // .selectFile("cypress/fixtures/invalid_file.doc");

    cy.wait(1000);

    // Should show error for invalid extension
    elementAuth.onboardingOrganizationUploadImgMaxErr();
    // .should("contain", "Format file tidak didukung");

    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }

  validateOnboardingMinimumIDnumber() {
    cy.task(
      "log",
      "validate onboarding with ID number with less than 16 digits",
    );

    elementAuth.onboardingOrganizationIDnumber().type("123");

    cy.wait(1000);
    elementAuth.onboardingOrganizationIDnumberErr;
    elementAuth
      .onboardingOrganizationIDnumberErrorMsg()
      .should(
        "contain",
        "Nomor ID harus berupa angka dengan panjang 16 digit.",
      );
    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }
  // validateOnboardingIDnumberValidLength() {
  //   cy.task(
  //     "log",
  //     "validate onboarding with ID number with valid length but check format",
  //   );

  //   elementAuth.onboardingOrganizationIDnumber().clear();
  //   elementAuth.onboardingOrganizationIDnumber().type(randomPhoneNumber);

  //   elementAuth
  //     .onboardingOrganizationIDnumber()
  //     .invoke("val")
  //     .then((val) => {
  //       // ✅ UI berubah (ada strip)
  //       expect(val).to.not.equal(idNumber);

  //       // ✅ format sesuai
  //       expect(val).to.match(/^\d{4}-\d{4}-\d{4}-\d{4}$/);

  //       // ✅ data tetap sama
  //       const clean = val.replace(/-/g, "");
  //       expect(Number(clean)).to.equal(idNumber);
  //     });
  //   elementAuth.onboardingButtonSubmit().should("be.enabled");

  //   cy.wait(1000);
  // }
  validateOnboardingMaximumIDnumber() {
    cy.task(
      "log",
      "validate onboarding with ID number with more than 16 digits or non-numeric",
    );

    elementAuth.onboardingOrganizationIDnumber().clear();
    elementAuth
      .onboardingOrganizationIDnumber()
      .type(randomPhoneNumber + "123");

    cy.wait(1000);
    // elementAuth
    //   .onboardingOrganizationIDnumber()
    //   .invoke("val")
    //   .then((val) => {
    //     const actual = val.replace(/\D/g, ""); // ambil angka saja
    //     const cleanInput = input.replace(/\D/g, "");

    //     // memastikan tidak sama dengan input awal
    //     expect(actual).to.not.equal(cleanInput);

    //     // memastikan yang tersimpan adalah 16 digit pertama
    //     expect(actual).to.equal(cleanInput.slice(0, 16));
    //   });
    // elementAuth.onboardingButtonSubmit().should("be.enabled");
  }
  validateOnboardingIDnumberWithAlphabet() {
    cy.task(
      "log",
      "validate onboarding with ID number with alphabet characters",
    );

    elementAuth.onboardingOrganizationIDnumber().clear();
    elementAuth.onboardingOrganizationIDnumber().type("123abc12345678");

    cy.wait(1000);
    elementAuth.onboardingOrganizationIDnumberErr;
    elementAuth
      .onboardingOrganizationIDnumberErrorMsg()
      .should(
        "contain",
        "Nomor ID harus berupa angka dengan panjang 16 digit.",
      );

    // expect(randomText).to.not.equal("");
    // elementAuth
    //   .onboardingOrganizationIDnumber()
    //   .invoke("val")
    //   .then((val) => {
    //     // perbandingan: input vs output
    //     expect(val).to.not.equal(randomText);
    //     // field kosong
    //     expect(val).to.equal("");
    //   });
    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }
  validateOnboardingIDnumberWithSpecialChars() {
    cy.task(
      "log",
      "validate onboarding with ID number with special characters",
    );

    elementAuth.onboardingOrganizationIDnumber().clear();
    elementAuth.onboardingOrganizationIDnumber().type("123!@#12345678");

    cy.wait(1000);
    elementAuth.onboardingOrganizationIDnumberErr;
    elementAuth
      .onboardingOrganizationIDnumberErrorMsg()
      .should(
        "contain",
        "Nomor ID harus berupa angka dengan panjang 16 digit.",
      );

    // elementAuth
    //   .onboardingOrganizationIDnumber()
    //   .invoke("val")
    //   .then((val) => {
    //     // perbandingan: input vs output
    //     expect(val).to.not.equal(randomSpecialChars);
    //     // field kosong
    //     expect(val).to.equal("");
    //   });
    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }
  validateOnboardingIDnumberWithSpaces() {
    cy.task("log", "validate onboarding with ID number with spaces");

    elementAuth.onboardingOrganizationIDnumber().clear();
    elementAuth.onboardingOrganizationIDnumber().type("123 12345678");

    cy.wait(1000);
    elementAuth.onboardingOrganizationIDnumberErr;
    elementAuth
      .onboardingOrganizationIDnumberErrorMsg()
      .should(
        "contain",
        "Nomor ID harus berupa angka dengan panjang 16 digit.",
      );

    // expect(withspaces).to.not.equal("");
    // elementAuth
    //   .onboardingOrganizationIDnumber()
    //   .invoke("val")
    //   .then((val) => {
    //     // perbandingan: input vs output
    //     expect(val).to.not.equal(withspaces);
    //     // field kosong
    //     expect(val).to.equal("");
    //   });
    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }

  validateOnboardingKTPUploadBelowMax() {
    // testaka
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
    });
    //get all message from temp email
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

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          // testaka new try
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    cy.task("log", "login after verify email and setup onboarding");
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberuploadMin();

    cy.wait(1000);

    elementAuth.onboardingButtonSubmit().should("be.enabled");
  }
  validateOnboardingKTPUploadExceedMax() {
    // testaka
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
    });
    //get all message from temp email
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

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          // testaka new try
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    cy.task("log", "login after verify email and setup onboarding");
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);

    elementAuth.onboardingOrganizationIDnumberuploadMax();
    elementAuth.onboardingOrganizationUploadImgMaxErr();
    cy.wait(1000);

    elementAuth.onboardingButtonSubmit().should("be.disabled");
  }
  validateOnboardingKTPUploadValidExt() {
    // testaka
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
    });
    //get all message from temp email
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

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          // testaka new try
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    cy.task("log", "login after verify email and setup onboarding");
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload(); //jpg
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);

    elementAuth.onboardingOrganizationIDnumberUpload(); //jpg
    elementAuth.onboardingButtonSubmit().should("be.enabled");
    cy.wait(1000);

    elementAuth.onboardingOrganizationIDnumberuploadMin(); //jpeg
    elementAuth.onboardingButtonSubmit().should("be.enabled");
    cy.wait(1000);

    elementAuth.onboardingOrganizationIDnumberuploadPNG(); //png
    elementAuth.onboardingButtonSubmit().should("be.enabled");
    cy.wait(1000);

    elementAuth.onboardingOrganizationIDnumberuploadPDF(); //pdf
    elementAuth.onboardingButtonSubmit().should("be.enabled");
    cy.wait(1000);
  }
  validateOnboardingKTPUploadInvalidExt() {
    // testaka
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
    });
    //get all message from temp email
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

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          // testaka new try
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    cy.task("log", "login after verify email and setup onboarding");
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);

    elementAuth.onboardingOrganizationIDnumberuploadXLSX(); //xlsx
    elementAuth.onboardingButtonSubmit().should("be.disabled");
    elementAuth.onboardingOrganizationUploadImgInvErr();
    cy.wait(1000);

    elementAuth.onboardingOrganizationIDnumberuploadDOCX(); //docx
    elementAuth.onboardingButtonSubmit().should("be.disabled");
    elementAuth.onboardingOrganizationUploadImgInvErr();
    cy.wait(1000);

    elementAuth.onboardingOrganizationIDnumberuploadTXT(); //txt
    elementAuth.onboardingButtonSubmit().should("be.disabled");
    elementAuth.onboardingOrganizationUploadImgInvErr();
    cy.wait(1000);

    elementAuth.onboardingOrganizationIDnumberuploadPPTX(); //pptx
    elementAuth.onboardingButtonSubmit().should("be.disabled");
    elementAuth.onboardingOrganizationUploadImgInvErr();
    cy.wait(1000);
  }
  validateOnboardingKTPUploadCorruptFile() {
    // testaka
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    this.visitRegisterPage();
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
    });
    //get all message from temp email
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

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          // testaka new try
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }

          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    cy.task("log", "login after verify email and setup onboarding");
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    cy.url({ timeout: 10000 }).should("include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);

    elementAuth.onboardingOrganizationIDnumberuploadCorruptJPEG(); //jpeg
    elementAuth.onboardingButtonSubmit().should("be.disabled");
    elementAuth.onboardingOrganizationUploadImgCorruptErr();
    cy.wait(1000);

    elementAuth.onboardingOrganizationIDnumberuploadCorruptPDF(); //pdf
    elementAuth.onboardingButtonSubmit().should("be.disabled");
    elementAuth.onboardingOrganizationUploadImgCorruptErr();
    cy.wait(1000);
  }

  //testaka made few changes
  registerAndResetWithMailTm() {
    const mailSlurpApiKey =
      "sk_mFLuOb6wN19FJHQy_HL8T4acs2vp4caUR6vCeVM1p8ay90Xh9jQn6VzmWIjBZLo4qDGJ5cCGadocsXpiw";

    // const firstTextMailAndName = "registermailtm" + randomNumber;
    const firstTextMailAndName = "registermailtm" + randomText;
    const createNewEmailName = "registermailtm" + randomNumber;
    const mailTmGetDomains = "https://api.mail.tm/domains";
    const mailTmGetAccount = "https://api.mail.tm/accounts";
    const mailTmGetToken = "https://api.mail.tm/token";
    const mailTmGetAllMsg = "https://api.mail.tm/messages";
    const mailTmGetMsgById = "https://api.mail.tm/messages/";
    const password = "Asdqwe12@";
    const newpassword = "newAsdqwe12@"; //testaka

    const usernameSuperAdmin = "satuinbox";
    const passwordSuperAdmin = "_-ng9E0ftEz5$d(I";

    //get domain mail.tm
    cy.request({
      method: "GET",
      url: mailTmGetDomains,
    }).then((response) => {
      const domain = response.body["hydra:member"][0].domain;
      cy.task("log", "get domain : " + domain);
      const email = `${createNewEmailName}@${domain}`; //`logArray[${index}]: ${text}`
      // cy.task("log", "email : " + email);
      //create random temp email
      cy.task("log", "create temp mail with this : " + email);
      cy.request({
        method: "POST",
        url: mailTmGetAccount,
        body: {
          address: email,
          password: password,
        },
      }).then(() => {
        //get token temp email
        cy.request({
          method: "POST",
          url: mailTmGetToken,
          body: {
            address: email,
            password: password,
          },
        }).then((loginResponse) => {
          const token = loginResponse.body.token;
          cy.task("log", "get temp mail token : " + token);
          cy.wrap(token).as("accessToken");
        });
      });
      cy.wrap(email).as("tempEmail");
    });

    cy.wait(2000);
    //register at satuinbox with created temp email
    const trimFromFullName = firstTextMailAndName.replace(/\s+/g, "");
    cy.get("@tempEmail").then((tempMail) => {
      cy.task("log", "register at satuinbox with temp mail : " + tempMail);
      cy.wait(2000);
      cy.visit("/login");
      elementAuth.hyperlinkRegister().click();
      elementAuth.regFullname().type(indentifierRegres + firstTextMailAndName);
      elementAuth.regUsername().type(trimFromFullName);
      elementAuth.regEmail().type(tempMail);
      elementAuth.regPhone().type("628" + randomPhoneNumber);
      elementAuth.regPassword().clear().type("Asdqwe12@");
      elementAuth.regPasswordConfirm().clear().type("Asdqwe12@");
      elementAuth.buttonDaftar().click();
      elementAuth.buttonDaftar({ timeout: 10000 }).should("not.exist");
      // cy.wait(5000);
      elementAuth.successTitle().should("be.visible");
      elementAuth.registeredUserEmail().should("be.visible").contains(tempMail);
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
          // cy.wrap(messages).as("messages");
          if (messages && messages.length > 0) {
            return messages[0].id;
          } else {
            cy.wait(delay);
            return waitForEmail(token, maxRetry - 1, delay);
          }
        });
    }

    cy.get("@accessToken").then((token) => {
      cy.task("log", "waiting inbox from satuinbox.....");
      waitForEmail(token).then((messageId) => {
        cy.task("log", "get inbox from satuinbox with ID :" + messageId);
        cy.task("log", "opening inbox.......");

        const getSpecificEmailInbox = mailTmGetMsgById + messageId;
        cy.task("log", getSpecificEmailInbox);

        cy.request({
          method: "GET",
          url: getSpecificEmailInbox,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((searchLink) => {
          // const htmlContent = searchLink.body.html?.[0];
          // const regex = /href=https:"([^"]+)"/;
          // const regex = /href="(https:[^"]+)"/;
          // const match = htmlContent?.match(regex);
          // const regex =
          //   /href='(https:\/\/v2\.satuinbox\.com\/verification\?token[^']+)'/;

          // const match = htmlContent.match(regex);
          // if (match) {
          //   const verificationUrl = match[1];
          //   cy.task("log", "access verification link from");
          //   cy.visit(verificationUrl); // lanjutkan ke halaman verify
          // } else {
          //   cy.log("failed to visit verification link");
          //   // failOnStatusCode: true;
          // }
          // if (!match) {
          //   throw new Error("Failed to find verification link");
          // }

          // // Decode HTML entities
          // const verificationUrl = match[1]
          //   .replace(/&#x3D;/g, "=")
          //   .replace(/&amp;/g, "&");

          // testaka get email
          const htmlContent = searchLink.body.html?.[0];
          const links = htmlContent.match(/https:[^\s"']+/g);

          if (!links) {
            throw new Error("No links found in email");
          }
          const decodedLinks = links.map((link) =>
            decodeURIComponent(
              link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
            ),
          );
          const verificationUrl = decodedLinks.find((link) =>
            link.includes("v2.satuinbox.com/verification?token="),
          );

          if (!verificationUrl) {
            throw new Error("Failed to find verification link");
          }
          cy.task("log", `access verification link: ${verificationUrl}`);
          cy.visit(verificationUrl);
          cy.task("log", "visiting verify user page");
          cy.task("log", "waiting page to load..........");
          // elementAuth.verifyUserEmail().click();
        });
      });
    });

    //verify user
    cy.task("log", "visited verify user page");
    cy.task("log", "verify user");
    elementAuth.verifyUserEmail().click();
    // cy.wait(5000)
    elementAuth.verifyUserEmail({ timeout: 10000 }).should("not.exist");

    // // //login after verify email and setup onboarding
    cy.task("log", "login after verify email and setup onboarding");
    // cy.wait(2500);
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    // elementAuth.keyword().type("valencia10");
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    // cy.wait(5000);
    cy.url({ timeout: 10000 }).should("not.include", "/login");

    // // //onboarding page
    elementAuth
      .onboardingOrganizationName()
      .type("company " + firstTextMailAndName);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberUpload();
    elementAuth.onboardingButtonSubmit().click();

    cy.wait(1000);
    elementAuth.onboardingSUBMITTEDdataTitle();
    elementAuth.onboardingSUBMITTEDdataLogout().click();

    //approve onboarding
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: {
        identifier: usernameSuperAdmin,
        password: passwordSuperAdmin,
      },
    }).then((getToken) => {
      const accessTokenSuperAdmin = getToken.body.accessToken;
      cy.wrap(accessTokenSuperAdmin).as("superAdminToken");
    });

    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: {
        identifier: firstTextMailAndName,
        password: password,
      },
    }).then((getcompanyId) => {
      const companyIdNewUser = getcompanyId.body.user.company.companyId;
      cy.wrap(companyIdNewUser).as("userCompanyId");
    });

    cy.get("@superAdminToken").then((token) => {
      cy.get("@userCompanyId").then((companyId) => {
        cy.request({
          method: "POST",
          url: config.approveOnboarding(companyId),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((responseOnboarding) => {
          cy.task(
            "log",
            "response after approvall ",
            responseOnboarding.status,
          );
        });
      });
    });

    // // //login after verify email and setup onboarding
    cy.task("log", "login after approvall");
    // cy.wait(2500);
    cy.visit("/login");
    elementAuth.keyword().type(firstTextMailAndName);
    // elementAuth.keyword().type("valencia10");
    elementAuth.password().type(password);
    elementAuth.buttonLogin().click();
    // cy.wait(5000);
    cy.url({ timeout: 10000 }).should("include", "/login");

    //try to reset password
    cy.task("log", "do logout then reset password");
    cy.wait(3000);
    logout();
    cy.wait(1000);
    cy.get("@tempEmail").then((tempMail) => {
      cy.get("@accessToken").then((token) => {
        //input email for reset password
        (cy
          .get(
            'a[href="/reset-password"] > p.text-sm.font-medium.text-blue-600',
          )
          .click(),
          "click tidak bisa login");
        cy.get("#email").type(tempMail);
        cy.wait(500);
        (cy.contains("button", "Kirim link pemulihan").click(),
          "klik button Kirim link pemulihan");
        cy.wait(1000);
        //get all message
        // function waitForSecondEmail(token, maxRetry = 10, delay = 3000) {
        function waitForSecondEmail(
          token,
          subjectKeyword,
          maxRetry = 2,
          delay = 3000,
        ) {
          if (maxRetry === 0)
            throw new Error(
              "Email belum diterima setelah beberapa kali percobaan",
            );

          return cy
            .request({
              method: "GET",
              url: mailTmGetAllMsg,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              failOnStatusCode: false,
            })
            .then((secondRes) => {
              const secondMessages = secondRes.body["hydra:member"];
              const targetMsg = secondMessages.find((msg) =>
                msg.subject
                  .toLowerCase()
                  .includes(subjectKeyword.toLowerCase()),
              );

              if (targetMsg) {
                return targetMsg.id;
              } else {
                cy.wait(delay);
                return waitForSecondEmail(
                  token,
                  subjectKeyword,
                  maxRetry - 1,
                  delay,
                );
              }
            });
        }

        //get seccond message
        cy.task("log", "waiting second inbox from satuinbox.....");
        // waitForSecondEmail(token).then((secondMessages) => {
        waitForSecondEmail(
          token,
          "Atur kembali kata sandi Satuinbox anda",
        ).then((secondMessages) => {
          //testaka mengubah subjek
          cy.task("log", "get inbox from satuinbox with ID :" + secondMessages);
          cy.task("log", "opening inbox.......");

          cy.request({
            method: "GET",
            url: mailTmGetMsgById + secondMessages,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((searchLink) => {
            // const htmlContent = searchLink.body.html?.[0];
            // const regex = /href="([^"]+)"/;
            // const match = htmlContent?.match(regex);
            // if (match) {
            //   const verificationUrl2 = match[1];
            //   cy.task(
            //     "log",
            //     "access verification link from: " + verificationUrl2
            //   );
            //   cy.visit(verificationUrl2); // lanjutkan ke form reset password
            // }

            //testaka
            const htmlContent = searchLink.body.html?.[0];
            const links = htmlContent.match(/https:[^\s"']+/g);
            if (!links) {
              throw new Error("No links found in email");
            }
            const decodedLinks = links.map((link) =>
              decodeURIComponent(
                link.replace(/&#x3D;/g, "=").replace(/&amp;/g, "&"),
              ),
            );
            const verificationUrl2 = decodedLinks.find((link) =>
              link.includes("v2.satuinbox.com/set-new-password?token="),
            );

            if (!verificationUrl2) {
              throw new Error("Failed to find set new password link");
            }
            cy.task("log", `access set new password link: ${verificationUrl2}`);
            cy.visit(verificationUrl2);
            cy.task("log", "visiting set new password page");
            cy.task("log", "waiting page to load..........");
          });
        });

        //setup new password
        // testaka
        cy.task("log", "setup new password");
        cy.wait(2000);
        (cy.get("#password").type(newpassword), "type new password");
        cy.wait(500);
        // cy.softAssert(
        //   cy.get("#confirmPassword").type(newpassword),
        //   "type confirm new password"
        // );
        cy.wait(500);
        (cy.contains("button", "Lanjutkan").click(), "click button konfirmasi");
        // cy.wait(500);
        //   cy.contains("button", "Buka Halaman Login").click(),
        //   "click button Buka Halaman Login";

        //cek login with new password
        cy.task("log", "login with new registered username");
        cy.wait(1000);
        cy.url().should("include", "/login");
        cy.viewport(1366, 768);
        elementAuth.keyword().type(firstTextMailAndName);
        elementAuth.password().type(newpassword);
        elementAuth.buttonLogin().click();
        // cy.get("#keyword").type(firstTextMailAndName);
        // cy.get("#password").type(newpassword);
        // cy.get(".bg-primary").click();
      });
    });
  }

  tokenValidationAfter15minutes() {
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: this.loginBody,
    }).then((responseLogin) => {
      const accessToken = responseLogin.body.accessToken;
      const refreshToken = responseLogin.body.refreshToken;
      const sessionID = responseLogin.body.sessionId;
      const fullname = responseLogin.body.user.fullName;
      cy.log("access token :", JSON.stringify(accessToken));
      cy.log("refresh token :", JSON.stringify(refreshToken));
      cy.log("session ID :", JSON.stringify(sessionID));
      cy.log("fullname :", JSON.stringify(fullname));

      cy.request({
        method: "GET",
        url: config.currentProfile,
        headers: { authorization: `Bearer ${accessToken}` },
      }).then((currentResponse) => {
        // const  = currentResponse
        // cy.log(currentResponse);
        cy.log(JSON.stringify(currentResponse));
      });

      cy.wait(900000); //wait 15 minutes

      cy.request({
        method: "GET",
        url: config.currentProfile,
        headers: { authorization: `Bearer ${accessToken}` },
        failOnStatusCode: false,
      }).then((currentResponse) => {
        if (currentResponse === 401) {
          cy.log("access token successfully changed");
        } else {
          cy.log("failed to refresh token");
        }
      });
    });
  }
}
export default authPage;
