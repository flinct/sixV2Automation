import loginPage from "../../support/pages/authPage.js";

describe("test login PROD", () => {
  const loginAction = new loginPage();

  it("cek semua elemen di login page", () => {
    loginAction.elementChecking();
  });

  it("login dengan VALID USERNAME dan password", () => {
    loginAction.loginValidUsername();
  });

  it("login dengan VALID EMAIL dan password ", () => {
    loginAction.loginValidEmail();
  });

  it("login dengan INVALID USERNAME ", () => {
    loginAction.loginInvalidUsername();
  });

  it("login dengan INVALID EMAIL ", () => {
    loginAction.loginInvalidEmail();
  });

  it("login dengan INVALID password ", () => {
    loginAction.loginInvalidPassword();
  });

  it("login dengan BLANK email ", () => {
    loginAction.loginBlankemail();
  });

  it("login dengan BLANK password ", () => {
    loginAction.loginBlankPassword();
  });
});
