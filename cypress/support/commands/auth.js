class elementAuth {
  //global element
  satuinboxLogo() {
    return cy.get('[data-cy="Satuinbox-Logo"]');
  }

  //login element
  //MAIN ELEMENT
  keyword() {
    return cy.get('[data-cy="Keyword-Input"]');
  }
  password() {
    return cy.get('[data-cy="Password-Input"]');
  }
  buttonLogin() {
    return cy.get('[data-cy="Login-Submit-Button"]');
    // return cy.get('[data-cy="login-button-sign-in"]');
  }
  errState() {
    return cy.get('[data-cy="Login-Form"]').find("div").find("p");
  }

  //SECONDARY ELEMENT
  loginTitle() {
    return cy.get('[data-cy="Satuinbox-Logo"]').parent().find("p");
  }
  keywordIcon() {
    return cy.get("#username").parent().find("svg").should("be.visible");
  }
  passwordIcon() {
    return cy.get("#password").parent().find("svg").should("be.visible");
  }
  showPasswordIconButton() {
    return cy.get('[data-cy="Show-Password"]');
  }
  hyperlinkResetPassword() {
    return cy.get('a[href="/reset-password"]');
  }
  hyperlinkRegister() {
    return cy.get('a[href="/register"]');
  }

  //register element
  //MAIN ELEMENT
  regFullname() {
    return cy.get("#fullname");
  }
  regFullnameTitle() {
    return cy.get("#fullname").parent().parent().find("p");
  }
  regUsername() {
    return cy.get("#username");
  }
  regUsernameTitle() {
    return cy.get("#username").parent().parent().find("p");
  }
  regEmail() {
    return cy.get("#email");
  }
  regEmailTitle() {
    return cy.get("#email").parent().parent().find("p");
  }
  regPhone() {
    return cy.get("#phone");
  }
  regPhoneTitle() {
    return cy.get("#phone").parent().parent().find("p");
  }
  regPassword() {
    return cy.get("#password");
  }
  regPasswordTitle() {
    return cy.get("#password").parent().parent().find("p");
  }
  regPasswordConfirm() {
    return cy.get('[data-cy="Re-Enter-Password-Input"]');
    // return cy.get("#passwordConfirm");
  }
  regPasswordConfirmTitle() {
    return cy
      .get('[data-cy="Re-Enter-Password-Input"]')
      .parent()
      .parent()
      .find("p");
    // return cy.get("#passwordConfirm");
  }
  buttonDaftar() {
    return cy.contains("button", "Daftar");
    // return cy.get('[data-cy="register-button-sign-up"]');
  }
  buttonDaftarDisabledState() {
    return cy.get('[data-cy="register-button-sign-up"]');
  }

  //error state
  regFullnameErr() {
    return cy.get("#fullname.border-red-600");
  }
  regFullnameErrMsg() {
    return cy.get("#fullname").parent().parent().find("p").eq(1);
  }
  regUsernameErr() {
    return cy.get("#username.border-red-600");
  }
  regUsernameErrMsg() {
    return cy.get("#username").parent().parent().find("p").eq(1);
  }
  regEmailErr() {
    return cy.get("#email.border-red-600");
  }
  regEmailErrMsg() {
    return cy.get("#email").parent().parent().find("p").eq(1);
  }
  regPhoneErr() {
    return cy.get("#phone.border-red-600");
  }
  regPhoneErrMsg() {
    return cy.get("#phone").parent().parent().find("p").eq(1);
  }
  regPasswordErr() {
    return cy.get("#password.border-red-600");
  }
  regPasswordErrMsg() {
    return cy.get("#password").parent().parent().find("p").eq(1);
  }
  regPasswordConfirmErr() {
    return cy.get('[data-cy="Re-Enter-Password-Input"]');
  }
  regPasswordConfirmErrMsg() {
    return cy
      .get('[data-cy="Re-Enter-Password-Input"]')
      .parent()
      .parent()
      .find("p")
      .eq(1);
  }
  //SECONDARY ELEMENT
  registerTitle() {
    return cy.get('[data-cy="Satuinbox-Logo"]').parent().find("p.text-base");
  }
  confirmation() {
    return cy.get(
      "div.grid.place-self-start p.text-xs.leading-4.text-slate-800"
    );
  } //TOF and P.Policy
  hyperlinkToLoginPage() {
    return cy.get('a[href="/login"]');
  }

  //successRegister
  successTitle() {
    return cy
      .get('[data-cy="Satuinbox-Logo"]')
      .parent()
      .find("p")
      .contains(/Periksa email Anda untuk melanjutkan/i);
  }
  iconSent() {
    return cy.get('img[alt="verify-email"]');
  }
  checkEmailDesc() {
    return cy.get('img[alt="verify-email"]').parent().find("p");
  }
  registeredUserEmail() {
    return cy.get('img[alt="verify-email"]').parent().find("p").eq(0).find("b");
  }
  resendEmailDesc() {
    return cy.get('img[alt="verify-email"]').parent().find("p").eq(1);
  }
  resendEmail() {
    return cy.contains("button", "Kirim Ulang Email");
  }
  resendEmail_sentState() {
    return cy.get("");
  }
  verifyUserEmail() {
    return cy.contains("button", "Verifikasi User");
  }

  //onboarding element
  isUsedEmail() {
    return cy.get(".Toastify__toast-container");
  }
  fullnameErrorState() {
    return cy.get("#fullname.border-red-600");
  }
  fullnameErrorDesc() {
    return cy.get("#fullname.border-red-600").parent().parent().find("p");
  }
  emailErrorState() {
    return cy.get("#email.border-red-600");
  }
  emailErrorDesc() {
    return cy.get("#email.border-red-600").parent().parent().find("p");
  }
  usernameErrorState() {
    return cy.get("#username.border-red-600");
  }
  phoneErrorState() {
    return cy.get("#phone.border-red-600");
  }
  passwordErrorState() {
    return cy.get("#password.border-red-600");
  }
  passwordConfirmErrorState() {
    return cy.get("#passwordConfirm.border-red-600");
  }

  //expired
  expiredTitle() {
    return cy.get("");
  }
  expiredIcon() {
    return cy.get("");
  }
  expiredDesc() {
    return cy.get("");
  }

  //onboarding
  onboardingTitle() {
    return cy.get("");
  }
  onboardingOrganizationInfo() {
    return cy.get("");
  }
  onboardingOrganizationName() {
    return cy.get("#company");
  }
  onboardingOrganizationNIB() {
    return cy.get("#bussiness-number");
  }
  onboardingOrganizationNPWP() {
    return cy.get("#tax-number");
  }
  onboardingOrganizationNIBupload() {
    return cy
      .get("label")
      .contains(/Unggah NIB/i)
      .parent()
      .find('input[type="file"]')
      .selectFile("cypress/fixtures/107.jpg", { force: true });
  }
  onboardingOrganizationPICdesc() {
    return cy.get("");
  }
  onboardingOrganizationIDnumber() {
    return cy.get("#person-number");
  }
  onboardingOrganizationIDnumberUpload() {
    return cy
      .get("label")
      .contains(/Unggah KTP/i)
      .parent()
      .find('input[type="file"]')
      .selectFile("cypress/fixtures/cupangstore8.jpg", { force: true });
  }
  onboardingButtonSubmit() {
    return cy.contains("button", /Kirim/i);
  }
  onboardingSUBMITTEDdataTitle() {
    return cy.contains(
      "h1",
      /Data perusahaan atau organisasi Anda telah berhasil dikirim./i
    );
  }
  onboardingSUBMITTEDdataLogout() {
    return cy.contains("button", /Keluar/i);
  }
}
export default new elementAuth();
