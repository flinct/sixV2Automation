class elementToast {
  toastError() {
    // return cy.get(".Toastify__toast--error");
    // return cy.get(".Toastify__toast-container");
    return cy.get(".Toastify__toast");
    //Toastify__toast-container Toastify__toast-container--bottom-right
  }
  toastErrorMsg() {
    return cy.get(".Toastify__toast").find("div");
    // return cy.get(".Toastify__toast--error").find("h1");
  }
  toastErrorTitle() {
    return cy.get(".Toastify__toast--error");
    // return cy.get(".Toastify__toast--error").find("p");
  }
}
export default new elementToast();
