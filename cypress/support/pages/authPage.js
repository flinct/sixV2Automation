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
const baseUrl = Cypress.config("baseUrl");
const loginType = Cypress.env("loginType");
const randomNumber = Math.floor(Math.random() * 10000000);
const randomNumber2 = Math.floor(Math.random() * 1000) + 1000;
const randomPhoneNumber = Math.floor(100000000 + Math.random() * 100000000);
const nib = Math.floor(1000000000000 + Math.random() * 1000000000000); //13 digits
const npwp = Math.floor(100000000000000 + Math.random() * 100000000000000); //15 digits
const idNumber = Math.floor(
  1000000000000000 + Math.random() * 1000000000000000
); //16 digits
const generateRandomText = (length = 6) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

const randomText = generateRandomText(6);
const config = env_config(baseUrl);
const selectedHeader = getHeaderByLoginType(config, baseUrl, loginType);
const selectedBody = getLoginBodyByLoginType(config, baseUrl, loginType);

function logout() {
  cy.userLoginNameLabel().click();
  cy.softAssert(cy.contains("Log Out").click(), "button logout found");
  cy.wait(2000);
  cy.softAssert(cy.url().should("include", "/login"), "directed to login page");
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
      "Login Success, directed to Dashboard"
    );
    cy.wait(1000);
  }

  //-----------------------V2---------------------------------
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
    elementAuth.keywordErrState().softAssert("Username atau Email wajib diisi");
    elementAuth.passwordErrState().softAssert("");
  }

  elementCheckingV2Setup() {
    cy.softAssert(elementAuth.satuinboxLogo());
  }

  constructor() {
    this.loginBody = getLoginBodyByLoginType(config, baseUrl, loginType);
  }

  loginValidUsername() {
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
        .type(body.identifier);
      elementAuth
        .password({
          timeout: 15000,
        })
        .type(body.password);
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
    cy.xpath(
      // "/html[1]/body[1]/main[1]/main[1]/section[1]/div[1]/div[2]/form[1]/div[4]/p[1]"
      "/html[1]/body[1]/main[1]/main[1]/section[1]/div[1]/div[2]/div[1]/div[1]"
    )
      .should("be.visible")
      .contains(
        // "Akun tidak ditemukan, periksa kembali email/username dan password Anda!"
        // "Email dan/atau password salah. Coba lagi atau coba reset password anda."
        "Email atau kata sandi tidak valid. Silakan coba lagi atau atur ulang kata sandi Anda."
      );
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
    // elementAuth.fullnameErrorState().type("a");
    // elementAuth.emailErrorState().type("a");
    // elementAuth.usernameErrorState().type("a");
    // elementAuth.phoneErrorState().type("1");
    // elementAuth.passwordErrorState().type("a");
    // elementAuth.passwordConfirmErrorState().type("a");
    elementAuth.buttonDaftar().click();
    elementAuth.regFullnameErr().should("be.visible");
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
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka"
      );
    elementAuth.regPassword().should("be.visible");
    elementAuth.regPasswordErrMsg().softAssert("Kata sandi minimal 8 karakter");
    elementAuth.regPasswordConfirmErr().should("be.visible");
    elementAuth
      .regPasswordConfirmErrMsg()
      .softAssert("Silakan masukkan kembali kata sandi Anda");
    // elementAuth
    //   .confirmation()
    //   .hardAssert(
    //     "By signing up, i accept the Satuinbox Terms of Service and Privacy Policy"
    //   );
  }

  validateAlreadyRegisteredEmail() {
    this.visitRegisterPage();
    cy.task("log", "checking already used email");
    cy.task("log", "--------------");
    elementAuth.regFullname().type("test duplicate email");
    elementAuth.regUsername().type("testduplicateemail");
    elementAuth.regEmail().type("duplicate@email.com");
    elementAuth.regPhone().type("08" + randomPhoneNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();
    cy.wait(2000);
  }

  validateEmailWithLeading() {
    const prefix = " leading" + randomNumber2;
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

    elementAuth.regFullname().type("test spacing email");
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08" + randomPhoneNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //validate
    const prefixTrim = prefix.trim();
    const emailTrim = prefixTrim + "@mail.com";
    cy.log(emailTrim);
    elementAuth.regEmail().contains(emailTrim, { timeout: 500 });
    // cy.url().should(
    //   "include",
    //   `/register/verify-email?email=${encodeURIComponent(email)}`
    // );
    // elementAuth.satuinboxLogo().should('be.visible')
    // elementAuth.successTitle().softAssert('Periksa email Anda')
    // elementAuth.iconSent().should('be.visible')
    // elementAuth.checkEmailDesc().softAssert('Kami telah mengirimkan email verifikasi ke')
    // elementAuth.registeredUserEmail().softAssert(email)
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

    elementAuth.regFullname().type("uppercase email");
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08" + randomPhoneNumber);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    // elementAuth.buttonDaftar().click();

    //validate login with email
    const emailTrim = prefix + "@mail.com";
    elementAuth.regEmail().contains(emailTrim, { timeout: 500 });
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

    elementAuth.regFullname().type("invalid email");
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

    elementAuth.regFullname().type("invalid email");
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

    elementAuth.regFullname().type("invalid email");
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

  successfullRegisterWithValidAllInputFormat() {
    this.visitRegisterPage();
    elementAuth.regFullname().clear();
    elementAuth.regUsername().clear();
    elementAuth.regEmail().clear();
    elementAuth.regPhone().clear();
    elementAuth.regPassword().clear();
    elementAuth.regPasswordConfirm().clear();

    elementAuth.regFullname().type("success register ");
    elementAuth.regUsername().type("testatc" + randomNumber2);
    elementAuth.regEmail().type(randomNumber + "@testatc.com");
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //success
    elementAuth.successTitle().should("be.visible");
    // elementAuth.iconSent().should('be.visible')
    elementAuth.checkEmailDesc().should("be.visible");
    elementAuth.registeredUserEmail().should("be.visible");
    elementAuth.resendEmail().should("be.visible");
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

    elementAuth.regFullname().type("su");
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

    elementAuth.regFullname().type("10000000testmaxusername");
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

    elementAuth.regFullname().type("asd!@#$%^&*()_+{}:',./?><;][-=~`");
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

    elementAuth.regFullname().type("double  space"); //double spacing
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    // elementAuth.buttonDaftar().click();

    //error steps
    //validate
    // const usernameTrim = prefix.trim();
    // elementAuth.regFullname().contains("double space", { timeout: 500 });
    elementAuth.regFullname().should("have.value", "double space");
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
    elementAuth.regUsername().type("chickentester01");
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //validate duplicate username message
    // cy.wait(200);
    elementToast.toastError().should("be.visible");
    elementToast.toastErrorTitle().contains("Error");
    elementToast.toastErrorMsg().should("include.text", "User with username");
    elementToast.toastErrorMsg().should("include.text", "chickentester01");
  }
  validateUsernameWithUppercase() {
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

    elementAuth.regFullname().type(fullname);
    elementAuth.regUsername().type("CHICKENTESTER01");
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

    elementAuth.regFullname().type(fullname);
    elementAuth.regUsername().type(username); //trailing spacing
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    // elementAuth.buttonDaftar().click();

    //error steps
    const usernameTrim = username.trim();
    cy.task("log", usernameTrim);
    elementAuth
      .regUsername({ timeout: 500 })
      .should("have.value", usernameTrim);
    // elementAuth.regUsername().contains(usernameTrim, { timeout: 500 });
  }

  validatePhoneNumberLocalCode() {
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

    elementAuth.regFullname().type(fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    //validate
    cy.url().should(
      "include",
      `/register/verify-email?email=${encodeURIComponent(email)}`
    );
  }
  validatePhoneNumberInternationalCode() {
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

    elementAuth.regFullname().type(fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("628960000" + randomNumber2);
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    //validate
    cy.url().should(
      "include",
      `/register/verify-email?email=${encodeURIComponent(email)}`
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka"
      );
  }
  validatePhoneNumberWithSpacing() {
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

    elementAuth.regFullname().type(fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("08960000 23");
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert(
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka"
      );
  }
  validatePhoneNumberWithTrailing() {
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

    elementAuth.regFullname().type(fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("0896000000 ");
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    cy.wait(1000);
    elementAuth.regPhoneErr().should("be.visible");
    elementAuth
      .regPhoneErrMsg()
      .softAssert(
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka"
      );
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

    elementAuth.regFullname().type(fullname);
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
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka"
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

    elementAuth.regFullname().type(fullname);
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
        "Nomor whatsapp harus dimulai dengan 0 atau 62 dan hanya berisi angka"
      );
  }
  validatePhoneNumberWithAlreadyRegisteredNumber() {
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

    elementAuth.regFullname().type(fullname);
    elementAuth.regUsername().type(username);
    elementAuth.regEmail().type(email);
    elementAuth.regPhone().type("089655057778");
    elementAuth.regPassword().type("Asdqwe12@");
    elementAuth.regPasswordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    //error steps
    //validate duplicate username message
    elementToast.toastError().should("be.visible");
    elementToast.toastErrorTitle().contains("Error");
    elementToast.toastErrorMsg().should("include.text", "User with username");
    elementToast.toastErrorMsg().should("include.text", "chickentester01");
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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

    elementAuth.regFullname().type(fullname);
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
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus"
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

    elementAuth.regFullname().type(fullname);
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
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus"
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

    elementAuth.regFullname().type(fullname);
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
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus, tidak dapat sama dengan username / email"
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

    elementAuth.regFullname().type(fullname);
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
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus, tidak dapat sama dengan username / email"
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

    elementAuth.regFullname().type(fullname);
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
        "Kata sandi harus mencakup huruf besar, huruf kecil, angka, dan karakter khusus, tidak dapat sama dengan username / email"
      );
  }

  //login
  tryLoginBeforeEmailValidated() {}

  //onboarding
  validateOnboardingSuccessAccess() {
    this.visitRegisterPage();
    elementAuth.fullname().clear();
    elementAuth.username().clear();
    elementAuth.emai().clear();
    elementAuth.phone().clear();
    elementAuth.password().clear();
    elementAuth.passwordConfirm().clear();

    elementAuth.fullname().type("success register");
    elementAuth.username().type("testatc" + randomNumber2);
    elementAuth.emai().type(randomNumber + "@testatc.com");
    elementAuth.phone().type("08960000" + randomNumber2);
    elementAuth.password().type("Asdqwe12@");
    elementAuth.passwordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    cy.wait(2000);

    elementAuth.onboardingTitle().should("be.visible");
    elementAuth.onboardingOrganizationInfo().should("be.visible");
    elementAuth.onboardingOrganizationName().should("be.visible");
    elementAuth.onboardingOrganizationNIB().should("be.visible");
    elementAuth.onboardingOrganizationNPWP().should("be.visible");
    elementAuth.onboardingOrganizationNIBupload().should("be.visible");
    elementAuth.onboardingOrganizationPICdesc().should("be.visible");
    elementAuth.onboardingOrganizationIDnumber().should("be.visible");
    elementAuth.onboardingOrganizationIDnumberUpload().should("be.visible");
    elementAuth.onboardingButtonSubmit().should("be.visible");

    elementAuth
      .onboardingTitle()
      .contains("Verify your organization or company");
    elementAuth.onboardingOrganizationInfo().type("");
    elementAuth
      .onboardingOrganizationName()
      .type("Dummy Organization" + randomNumber2);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationPICdesc().contains();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberUpload().type("");
    elementAuth.onboardingButtonSubmit().click();

    //validation
  }
  validateOnboardingNotRedisplayWhenRefreshed() {
    this.visitRegisterPage();
    elementAuth.fullname().clear();
    elementAuth.username().clear();
    elementAuth.emai().clear();
    elementAuth.phone().clear();
    elementAuth.password().clear();
    elementAuth.passwordConfirm().clear();

    elementAuth.fullname().type("success register");
    elementAuth.username().type("testatc" + randomNumber2);
    elementAuth.email().type(randomNumber + "@testatc.com");
    elementAuth.phone().type("08960000" + randomNumber2);
    elementAuth.password().type("Asdqwe12@");
    elementAuth.passwordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    cy.wait(2000);

    elementAuth.onboardingTitle().should("be.visible");
    elementAuth.onboardingOrganizationInfo().should("be.visible");
    elementAuth.onboardingOrganizationName().should("be.visible");
    elementAuth.onboardingOrganizationNIB().should("be.visible");
    elementAuth.onboardingOrganizationNPWP().should("be.visible");
    elementAuth.onboardingOrganizationNIBupload().should("be.visible");
    elementAuth.onboardingOrganizationPICdesc().should("be.visible");
    elementAuth.onboardingOrganizationIDnumber().should("be.visible");
    elementAuth.onboardingOrganizationIDnumberUpload().should("be.visible");
    elementAuth.onboardingButtonSubmit().should("be.visible");

    elementAuth
      .onboardingTitle()
      .contains("Verify your organization or company");
    elementAuth.onboardingOrganizationInfo().type("");
    elementAuth
      .onboardingOrganizationName()
      .type("Dummy Organization" + randomNumber2);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationPICdesc().contains();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberUpload().type("");
    elementAuth.onboardingButtonSubmit().click();

    //validation
    cy.reload();
  }
  validateOnboardingReAccessViaPath() {
    this.visitRegisterPage();
    elementAuth.fullname().clear();
    elementAuth.username().clear();
    elementAuth.email().clear();
    elementAuth.phone().clear();
    elementAuth.password().clear();
    elementAuth.passwordConfirm().clear();

    elementAuth.fullname().type("success register");
    elementAuth.username().type("testatc" + randomNumber2);
    elementAuth.email().type(randomNumber + "@testatc.com");
    elementAuth.phone().type("08960000" + randomNumber2);
    elementAuth.password().type("Asdqwe12@");
    elementAuth.passwordConfirm().type("Asdqwe12@");
    elementAuth.buttonDaftar().click();

    cy.wait(2000);

    elementAuth.onboardingTitle().should("be.visible");
    elementAuth.onboardingOrganizationInfo().should("be.visible");
    elementAuth.onboardingOrganizationName().should("be.visible");
    elementAuth.onboardingOrganizationNIB().should("be.visible");
    elementAuth.onboardingOrganizationNPWP().should("be.visible");
    elementAuth.onboardingOrganizationNIBupload().should("be.visible");
    elementAuth.onboardingOrganizationPICdesc().should("be.visible");
    elementAuth.onboardingOrganizationIDnumber().should("be.visible");
    elementAuth.onboardingOrganizationIDnumberUpload().should("be.visible");
    elementAuth.onboardingButtonSubmit().should("be.visible");

    elementAuth
      .onboardingTitle()
      .contains("Verify your organization or company");
    elementAuth.onboardingOrganizationInfo().type("");
    elementAuth
      .onboardingOrganizationName()
      .type("Dummy Organization" + randomNumber2);
    elementAuth.onboardingOrganizationNIB().type(nib);
    elementAuth.onboardingOrganizationNPWP().type(npwp);
    elementAuth.onboardingOrganizationNIBupload();
    elementAuth.onboardingOrganizationPICdesc().contains();
    elementAuth.onboardingOrganizationIDnumber().type(idNumber);
    elementAuth.onboardingOrganizationIDnumberUpload().type("");
    elementAuth.onboardingButtonSubmit().click();

    //validation
    cy.visit("onboarding");
  }
  validateOnboardingWithValidCriteria() {}

  validateOnboardingMinimumOrganizationName() {}
  validateOnboardingOrganizationNameValidLength() {}
  validateOnboardingMaximumOrganizationName() {}
  validateOnboardingOrganizationNameWithSpecialChars() {}
  validateOnboardingOrganizationNameWithNumericOnly() {}
  validateOnboardingOrganizationNameWithExistingData() {}

  validateOnboardingMinimumNIB() {}
  validateOnboardingNIBValidLength() {}
  validateOnboardingMaximumNIB() {}
  validateOnboardingNIBWithAlphabet() {}
  validateOnboardingNIBWithSpecialChars() {}
  validateOnboardingNIBWithSpaces() {}

  validateOnboardingMinimumNPWP() {}
  validateOnboardingNPWPValidLength() {}
  validateOnboardingMaximumNPWP() {}
  validateOnboardingNPWPWithAlphabet() {}
  validateOnboardingNPWPWithSpecialChars() {}
  validateOnboardingNPWPWithSpaces() {}

  validateOnboardingNIBUploadBelowMax() {}
  validateOnboardingNIBUploadExceedMax() {}
  validateOnboardingNIBUploadInvalidExt() {}
  validateOnboardingNIBUploadCorruptFile() {}

  validateOnboardingMinimumIDnumber() {}
  validateOnboardingIDnumberValidLength() {}
  validateOnboardingMaximumIDnumber() {}
  validateOnboardingIDnumberWithAlphabeth() {}
  validateOnboardingIDnumberWithSpaces() {}

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
    const newpassword = "newasdqwe12";

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
      elementAuth.regFullname().type(firstTextMailAndName);
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

    // // cy.get("@messages").then((msg) => {
    // //   cy.log(msg);
    // // });

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
          // const regex = /href=https:"([^"]+)"/;
          // const regex = /href="(https:[^"]+)"/;
          // const match = htmlContent?.match(regex);
          const regex =
            /href='(https:\/\/v2\.satuinbox\.com\/verification\?token[^']+)'/;

          const match = htmlContent.match(regex);
          // if (match) {
          //   const verificationUrl = match[1];
          //   cy.task("log", "access verification link from");
          //   cy.visit(verificationUrl); // lanjutkan ke halaman verify
          // } else {
          //   cy.log("failed to visit verification link");
          //   // failOnStatusCode: true;
          // }
          if (!match) {
            throw new Error("Failed to find verification link");
          }

          // Decode HTML entities
          const verificationUrl = match[1]
            .replace(/&#x3D;/g, "=")
            .replace(/&amp;/g, "&");

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
            responseOnboarding.status
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

  tokenValidationAfter15minutes() {
    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: selectedBody,
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
