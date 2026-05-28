import { forEach } from "async";
import { timeout } from "async";
import { action } from "commander";
import { env_config } from "../01_url_page";
// import { time } from "node:console";

const baseUrl = Cypress.config("baseUrl");

const config = env_config(baseUrl);
let errorLogs = [];

const customer_number = 6280000000000;

const customerNumber = "6280000000000";

function formatCustomerNumber(customerNumber) {
  return customerNumber.replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, "$1 $2 $3 $4");
}

const broadcastCount = 4;

const generateRandomId2 = () => {
  return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a number between 10000 and 99999
};

const randomAWB2 = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const agent = "chicken tester 2";

const el_chatList = '[data-cy^="chat-list-"]';

const emptyState_chatListInbox =
  'div.mt-3.flex.flex-col.items-center.justify-center.space-y-3 p:contains("Belum Ada Pesan")';

class liveChatPage {
  elementChecking_liveChatPage() {
    cy.softAssert(cy.liveChatNav_active(), "live chat navbar active");
    cy.softAssert(cy.userLoginNameLabel().click(), "click user login");
    cy.softAssert(
      cy.userLoginNameLabel_valueName().click().should("be.visible"),
      "get user login value"
    );
    cy.softAssert(
      cy.userLoginNameLabel_role().click().should("be.visible"),
      "get user login role"
    );
    cy.softAssert(
      cy.searchbarInbox_2_0().should("be.visible"),
      "get searchbar pada inbox 2.0"
    );
    cy.softAssert(
      cy.listChatInbox().should("be.visible"),
      "get chat list pada inbox"
    );
    cy.softAssert(
      cy.inbox_tanggal().eq(0).should("be.visible"),
      "get inbox tanggal"
    );
    cy.softAssert(
      cy.inbox_tanggal().eq(0).should("be.visible"),
      "get inbox tanggal"
    );
    cy.softAssert(
      cy.listChatInbox().eq(0).click().should("be.visible"),
      "get chat list pada inbox"
    );
  }

  navigateToKelolaTim() {
    navigateToKelolaTim_();
  }

  createChildUser_SuperAdmin() {
    const roleText = "super Admin";
    createUser(roleText);
  }
  createChildUser_Admin() {
    const roleText = "admin";
    createUser(roleText);
  }
  createChildUser_agent() {
    const roleText = "agent";
    createUser(roleText);
  }

  createChildUser_SuperAdminStatic() {
    const roleText = "super Admin";
    createUser_staticName(roleText);
  }
  createChildUser_AdminStatic() {
    const roleText = "admin";
    createUser_staticName(roleText);
  }
  createChildUser_agentStatic() {
    const roleText = "agent";
    createUser_staticName(roleText);
  }

  try_createUser_asAdmin() {}

  deleteUserLogin_superAdmin() {
    const roleTarget = "super Admin";
    cy.wait(5000);
    deleteUserLogin(roleTarget);
  }
  deleteUserLogin_superAdminStatic() {
    const roleTarget = "super Admin";
    cy.wait(5000);
    deleteUserLogin2(roleTarget);
  }

  deleteUserLogin_Admin() {
    const roleTarget = "admin";
    // cy.log(roleTarget);
    cy.wait(2000);
    deleteUserLogin(roleTarget);
  }

  deleteUserLogin_agent() {
    const roleTarget = "agent";
    cy.wait(2000);
    deleteUser(roleTarget);
  }

  access_page_asAdmin() {
    access_page_asAdmin();
  }

  access_page_asAgent() {
    access_page_asAgent();
  }
}
// const value_randomQuotes = randomQuotes();
export default liveChatPage;
