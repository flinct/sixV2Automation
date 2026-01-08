class elementToast {
  toastError() {
    return cy.get(".Toastify__toast--error");
  }
  toastErrorMsg() {
    return cy.get(".Toastify__toast--error");
    // return cy.get(".Toastify__toast--error").find("h1");
  }
  toastErrorTitle() {
    return cy.get(".Toastify__toast--error");
    // return cy.get(".Toastify__toast--error").find("p");
  }
}
export default new elementToast();
