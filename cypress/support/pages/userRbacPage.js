import { forEach } from "async";
import { timeout } from "async";
import { action } from "commander";
import { env_config } from "../01_url_page";
// import { time } from "node:console";

const baseUrl = Cypress.config("baseUrl");

const config = env_config(baseUrl);
let errorLogs = [];

const customer_number = 6289655057778;

const customerNumber = "6289655057778";

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

function getTokenThenBroadcast() {
  return cy.request({
    method: "POST",
    url: `${config.sendBroadcastUrl}${config.parentNumber}`,
    // body: value_BC,
    body: {
      broadcastMessage: [
        {
          number_whatsapp_customer: customer_number.toString(),
          message: `${value_randomQuotes} from : ${config.parentNumber} please reply this BC`,
          id_template: generateRandomId2(),
          properties:
            // [
            {
              contactName: `Customer${randomAWB2()}`,
              division: config.parentNumber,
              senderName: "TESTER",
              category: "any",
              orderId: `AWB-${randomAWB2()}`,
              batchId: `BATCH00${randomAWB2()}`,
            },
          // ]
        },
        // {
        //     "number_whatsapp_customer": "6289655057778",
        //     "message": "Terima kasih menjadi customer setia kami!, mari antar paketmu ke kami dan paketmu sampi esok hari :) | Broadcast - SAP 2:25PM",
        //     "id_template": "48688", // id template broadcast (optional)
        //     "properties":
        //     // [ //use this when needs multiprops
        //         {
        //             "contactName": "ayam",
        //             "division": "Jawa Barat",
        //             "senderName": "System-SAP",
        //             "category": "food and baverage",
        //             "orderId": "AWB-48928394294", // awb number
        //             "batchId": "BATCH001" // batch number
        //         }
        //     // ]
        // }
      ],
    },
    headers: {
      "x-api-key":
        "7058d1c05c763aaa5d5744baf5c371ae01ed38455d90eb29dd16ccd4bcb47d17",
    },
  });
}

function generateRandomText(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const randomText = generateRandomText();

const kelolaTimNav = '[data-cy="nav-link-Settings-Kelola Tim"]';

const kelolaTimNav_url = "setting/manage-team";

const manageTeam_modal =
  'div[role="dialog"][data-state="open"][tabindex="-1"] h2:contains("Tambah Anggota")';

function navigateToKelolaTim_() {
  cy.url().then((url) => {
    if (url.includes(config.visit_user)) {
      // cy.softAssert(
      //   cy.kelolaTimNav().click(),
      //   "flow a ,",
      //   "navigate to kelola tim page"
      // );
      cy.softAssert(cy.kelola_tim_headLabel(), "didalam halaman kelola tim");
    } else {
      cy.log("b");
      cy.softAssert(cy.settingNav().click(), "flow b ,", "click setting-nav");
      cy.softAssert(
        cy.kelolaTimNav().click(),
        "flow b ,",
        "navigate to kelola tim page"
      );
    }
  });
}

function access_page_asAdmin() {
  cy.softAssert(cy.dashboardNav());
  cy.softAssert(cy.inboxNav());
  cy.softAssert(cy.contactNav());
  cy.url().then((url) => {
    if (url.includes(config.visit_user)) {
      // cy.softAssert(
      //   cy.kelolaTimNav().click(),
      //   "flow a ,",
      //   "navigate to kelola tim page"
      // );
      cy.softAssert(cy.kelola_tim_headLabel(), "didalam halaman kelola tim");
    } else {
      cy.log("b");
      cy.softAssert(cy.settingNav().click(), "flow b ,", "click setting-nav");
      cy.softAssert(
        cy.akunWhatsappNav(),
        "admin hanya bisa access halaman setting ini"
      );
      cy.softAssert(
        cy.jamKerjaNav(),
        "admin hanya bisa access halaman setting ini"
      );
      cy.softAssert(
        cy.templatePesanNav(),
        "admin hanya bisa access halaman setting ini"
      );
    }
    if (url.includes(config.visit_broadcast)) {
      cy.softAssert(cy.broadcastLabelHeadOnDashboard(), "on broadcast page");
    } else if (url.includes(config.visit_template)) {
      cy.log("b");
      cy.softAssert(cy.broadcastRiwayatNav().click());
    } else {
      cy.log("c");
      cy.softAssert(cy.broadcastNav().click(), "flow c , click setting-nav");
      cy.softAssert(cy.broadcastRiwayatNav(), "is visible");
      cy.softAssert(cy.broadcastTemplateNav(), "is visible");
    }
  });
}

function access_page_asAgent() {
  // cy.softAssert(cy.dashboardNav());
  cy.softAssert(cy.inboxNav());
  cy.softAssert(cy.contactNav());
  cy.url().then((url) => {
    if (url.includes(config.visit_user)) {
      // cy.softAssert(
      //   cy.kelolaTimNav().click(),
      //   "flow a ,",
      //   "navigate to kelola tim page"
      // );
      cy.softAssert(cy.kelola_tim_headLabel(), "didalam halaman kelola tim");
    } else {
      cy.log("b");
      cy.softAssert(cy.settingNav().click(), "flow b ,", "click setting-nav");
      cy.softAssert(
        cy.akunWhatsappNav(),
        "admin hanya bisa access halaman setting ini"
      );
      cy.softAssert(
        cy.jamKerjaNav(),
        "admin hanya bisa access halaman setting ini"
      );
      cy.softAssert(
        cy.templatePesanNav(),
        "admin hanya bisa access halaman setting ini"
      );
    }
    if (url.includes(config.visit_broadcast)) {
      cy.softAssert(cy.broadcastLabelHeadOnDashboard(), "on broadcast page");
    } else {
      cy.log("b");
      cy.softAssert(cy.broadcastNav().click(), "flow c , click setting-nav");
      cy.softAssert(cy.broadcastRiwayatNav(), "is visible");
      // cy.softAssert(cy.broadcastTemplateNav(), "is visible");
    }
  });
}

function getRandomName() {
  const firstNames = [
    // "Aiden",
    // "Bella",
    // "Charlie",
    // "Daisy",
    // "Ethan",
    // "Fiona",
    // "George",
    // "Hannah",
    // "Isaac",
    // "Julia",
    // "Kevin",
    // "Luna",
    // "Mason",
    // "Nora",
    // "Oliver",
    // "Penelope",
    // "Quinn",
    // "Ryan",
    // "Sophia",
    // "Theodore",
    // "Ursula",
    // "Victor",
    // "Willow",
    // "Xander",
    // "Yasmine",
    // "Zachary",
    // "Steven",
    // "Yudha",
    // "Andrew",
    // "Filly",
    // "Maria",
    // "Intan",
    // "Jude",
    // "Jenny",
    // "Vincent",
    // "Ray",
    "Carrot",
    "Broccoli",
    "Spinach",
    "Cauliflower",
    "Cabbage",
    "Kale",
    "Lettuce",
    "Tomato",
    "Cucumber",
    "Bell Pepper",
    "Potato",
    "Sweet Potato",
    "Radish",
    "Beetroot",
    "Onion",
    "Garlic",
    "Shallot",
    "Leek",
    "Zucchini",
    "Eggplant",
    "Okra",
    "Green Beans",
    "Peas",
    "Asparagus",
    "Celery",
    "Fennel",
    "Corn",
    "Pumpkin",
    "Squash",
    "Turnip",
    "Parsnip",
    "Chard",
    "Arugula",
    "Endive",
    "Watercress",
    "Artichoke",
    "Brussels Sprouts",
    "Mustard Greens",
    "Collard Greens",
    "Bok Choy",
    "Napa Cabbage",
    "Bitter Melon",
    "Yam",
    "Taro",
    "Daikon",
    "Jicama",
    "Lotus Root",
    "Chayote",
    "Radicchio",
    "Microgreens",
  ];

  const lastNames = [
    "Anderson",
    "Brown",
    "Carter",
    "Davis",
    "Evans",
    "Foster",
    "Garcia",
    "Harris",
    "Iverson",
    "Johnson",
    "Kim",
    "Lopez",
    "Miller",
    "Nelson",
    "Owens",
    "Parker",
    "Quinn",
    "Robinson",
    "Smith",
    "Taylor",
    "Underwood",
    "Vasquez",
    "Williams",
    "Xu",
    "Yamada",
    "Zimmerman",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const index = String(Math.floor(Math.random() * 90) + 10); // Menghasilkan angka 10-99

  return `${firstName} ${lastName} ${index}`;
}

function removeSpaces(str) {
  return str.replace(/\s+/g, ""); // Menghapus semua spasi
}

function generateEmail(name) {
  const cleanedName = removeSpaces(name);
  return `${cleanedName}@dummymail.com`.toLowerCase();
}
function createUser(roleText) {
  const randomName = getRandomName(); // Generate a random name
  const userName_tanpaSpasi = removeSpaces(randomName); // Remove spaces
  const user_email = generateEmail(randomName); // Generate email
  cy.softAssert(cy.buttonAddUserLogin().click(), "click tambahkan anggota");
  cy.softAssert(
    cy.manageTeam_TextboxFullname().type(randomName),
    "manageTeam_TextboxFullname"
  );
  // cy.softAssert(
  //   cy.manageTeam_TextboxUsername().click(),
  //   "manageTeam_TextboxUsername"
  // );
  cy.softAssert(
    cy.manageTeam_TextboxEmail().type(user_email),
    "manageTeam_TextboxEmail"
  );
  // cy.softAssert(
  //   cy.manageTeam_TextboxPassword().type("Asdqwe12@"),
  //   "manageTeam_TextboxPassword"
  // );
  cy.softAssert(
    cy.manageTeam_ComboboxRole().click({ force: true }),
    "manageTeam_ComboboxRole"
  );
  cy.select_role_agent().then(($roleText) => {
    let role_text_value = $roleText.text().trim();
    role_text_value = roleText;
    cy.wrap(role_text_value).as("role_text_value_");
  });
  if (roleText === "agent") {
    cy.softAssert(cy.select_role_agent().click(), "select role " + roleText);
  } else if (roleText === "admin") {
    cy.softAssert(cy.select_role_admin().click(), "select role " + roleText);
  } else if (roleText === "super Admin") {
    cy.softAssert(
      cy.select_role_superAdmin().click(),
      "select role " + roleText
    );
  } else {
    cy.softAssert(
      cy.select_role_internal_team().click(),
      "select role " + roleText
    );
  }
  cy.get("body", { timeout: 2000 }).then(($body) => {
    cy.get(manageTeam_modal)
      .closest('div[role="dialog"]')
      .within(() => {
        cy.softAssert(cy.general_FilterSemuaDivisi().click());
      });
  });
  cy.userDIvisiDataList1().click();
  // cy.softAssert(
  //   cy.manageTeam_SwitchIsActive(),
  //   "click manageTeam_SwitchIsActive"
  // );
  // cy.manageTeam_SwitchIsActive().click({ force: true });
  cy.contains("Simpan").click();
  cy.wait(5000);
  cy.searchbar().clear().type(randomName);
  cy.wait(3000);
  cy.getUserName().then(($el) => {
    const getUserName_value = $el.text().trim();
    expect(getUserName_value).to.contains(randomName);
  });
  cy.softAssert(cy.getUserRole());
  cy.get("@role_text_value_").then((as_role_text_value_) => {
    cy.getUserRole().then(($el) => {
      const getUserRole_value = $el.text().trim();
      expect(getUserRole_value).to.contains(as_role_text_value_);
    });
  });
  cy.getUserEmail().then(($el) => {
    const getUserName_value = $el.text().trim();
    expect(getUserName_value).to.contains(user_email);
  });
}

function deleteUserLogin(roleTarget) {
  cy.get("body").then(($body) => {
    if ($body.text().includes(roleTarget)) {
      cy.log("a", roleTarget);
      deleteUser(roleTarget);
    } else {
      cy.log("b");
      // cy.softAssert(cy.paginationButton_10().click({ force: true }));
      // cy.popperContentWrapper().within(() => {
      //   cy.contains("20").click({ force: true });
      // });
      cy.softAssert(cy.pagination_next().click());
      deleteUser(roleTarget);
    }
  });
}

function deleteUser(roleTarget) {
  cy.getUserRole()
    .contains(roleTarget)
    .parents("tr")
    .within(() => {
      cy.getUserName().then((userName) => {
        const userNameText = userName.text().trim();
        cy.wrap(userNameText).as("userName");
      });
    });
  cy.getUserRole()
    .contains(roleTarget)
    .parents("tr")
    .within(() => {
      cy.getUserEmail().then((userEmail) => {
        const userEmailText = userEmail.text().trim();
        cy.wrap(userEmailText).as("userEmail");
      });
    });
  cy.getUserRole()
    .contains(roleTarget)
    .parents("tr")
    .within(() => {
      cy.getUserDivision().then((userDivision) => {
        const userDivisionText = userDivision.text().trim();
        cy.wrap(userDivisionText).as("userDivisi");
      });
    });
  cy.getUserRole()
    .contains(roleTarget) // pilih elemen getUserRole pertama yang mengandung "admin"
    .parents("tr") // naik ke elemen baris (tr) yang sesuai
    .within(() => {
      cy.getUserName().click();
    });
  cy.softAssert(cy.backButton_inDetail());
  cy.softAssert(cy.headline_userName());
  cy.get("@userName").then((as_username) => {
    cy.headline_userName().then(($el) => {
      const headline_userName_text = $el.text().trim();
      expect(headline_userName_text).to.eq(as_username);
    });
  });
  cy.softAssert(cy.headline_userJoinDate());
  cy.softAssert(cy.profileCard());
  cy.softAssert(cy.profileName());
  cy.softAssert(cy.profileRole());
  cy.softAssert(cy.profileEmail());
  cy.get("@userEmail").then((as_userEmail) => {
    cy.profileEmail().then(($el) => {
      const profileEmail_text = $el.text().trim();
      expect(profileEmail_text).to.eq(as_userEmail);
    });
  });
  cy.softAssert(cy.profileDivision());
  cy.get("@userDivisi").then((as_userDivisi) => {
    cy.profileDivision().then(($el) => {
      const profileDivisionText = $el.text().trim();
      expect(profileDivisionText).to.eq(as_userDivisi);
    });
  });
  cy.softAssert(cy.userRoleDesc());
  cy.get("@userName").then((as_username) => {
    cy.get("@userDivisi").then((as_userDivisi) => {
      cy.userRoleDesc().then(($el) => {
        const userRoleDescText = $el.text().trim();
        expect(userRoleDescText).contains(as_userDivisi);
        expect(userRoleDescText).contains(as_username);
      });
    });
  });
  cy.softAssert(cy.backButton_inDetail().click());
  cy.softAssert(cy.buttonMoreOptions());
  cy.getUserRole()
    .contains(roleTarget)
    .parents("tr")
    .within(() => {
      cy.buttonMoreOptions().click();
    });
  cy.softAssert(cy.button_hapusAnggota().click());
  cy.softAssert(cy.deleteModalTitle());
  cy.softAssert(cy.deleteModalDescription());
  cy.softAssert(cy.deleteModalMemberName());
  cy.softAssert(cy.deleteModalCheckbox());
  cy.deleteModalTitle()
    .contains("Hapus Anggota?")
    .closest('div[role="dialog"]')
    .within(() => {
      cy.softAssert(cy.deleteModalDeleteButton_disabled());
    });
  cy.deleteModalTitle()
    .contains("Hapus Anggota?")
    .closest('div[role="dialog"]')
    .within(() => {
      cy.softAssert(cy.deleteModalCancelButton());
    });
  cy.softAssert(cy.deleteModalCheckbox().click());
  cy.deleteModalTitle()
    .contains("Hapus Anggota?")
    .closest('div[role="dialog"]')
    .within(() => {
      cy.softAssert(cy.deleteModalDeleteButton());
    });
}

//generate function data random 2
function getRandomName2() {
  const firstNames = ["testing"];

  const lastNames = ["account"];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const index = String(Math.floor(Math.random() * 90) + 10); // Menghasilkan angka 10-99

  return `${firstName} ${lastName} ${index}`;
}
function removeSpaces2(str) {
  return str.replace(/\s+/g, ""); // Menghapus semua spasi
}
function generateEmail2(name) {
  const cleanedName = removeSpaces2(name);
  return `${cleanedName}@dummymail.com`.toLowerCase();
}
// call funtion random 2
function createUser_staticName(roleText) {
  const staticName = getRandomName2(); // Generate a random name
  const userName_tanpaSpasi = removeSpaces(staticName); // Remove spaces
  const user_emailStatic = generateEmail(staticName + roleText); // Generate email
  // cy.wrap(user_emailStatic).as("user_emailStatic");
  Cypress.env("user_emailStatic", user_emailStatic);
  cy.softAssert(cy.buttonAddUserLogin().click(), "click tambahkan anggota");
  cy.softAssert(
    cy.manageTeam_TextboxFullname().type(staticName + roleText),
    "manageTeam_TextboxFullname"
  );
  // cy.softAssert(
  //   cy.manageTeam_TextboxUsername().click(),
  //   "manageTeam_TextboxUsername"
  // );
  cy.softAssert(
    cy.manageTeam_TextboxEmail().type(user_emailStatic),
    "manageTeam_TextboxEmail"
  );
  // cy.softAssert(
  //   cy.manageTeam_TextboxPassword().type("Asdqwe12@"),
  //   "manageTeam_TextboxPassword"
  // );
  cy.softAssert(
    cy.manageTeam_ComboboxRole().click({ force: true }),
    "manageTeam_ComboboxRole"
  );
  cy.select_role_agent().then(($roleText) => {
    let role_text_value = $roleText.text().trim();
    role_text_value = roleText;
    cy.wrap(role_text_value).as("role_text_value_");
  });
  if (roleText === "agent") {
    cy.softAssert(cy.select_role_agent().click(), "select role " + roleText);
  } else if (roleText === "admin") {
    cy.softAssert(cy.select_role_admin().click(), "select role " + roleText);
  } else if (roleText === "super Admin") {
    cy.softAssert(
      cy.select_role_superAdmin().click(),
      "select role " + roleText
    );
  } else {
    cy.softAssert(
      cy.select_role_internal_team().click(),
      "select role " + roleText
    );
  }
  cy.get("body", { timeout: 2000 }).then(($body) => {
    cy.get(manageTeam_modal)
      .closest('div[role="dialog"]')
      .within(() => {
        cy.softAssert(cy.general_FilterSemuaDivisi().click());
      });
  });
  cy.userDIvisiDataList1().click();
  // cy.softAssert(
  //   cy.manageTeam_SwitchIsActive(),
  //   "click manageTeam_SwitchIsActive"
  // );
  // cy.manageTeam_SwitchIsActive().click({ force: true });
  cy.contains("Simpan").click();
  cy.wait(5000);
  cy.searchbar()
    .clear()
    .type(staticName + roleText);
  cy.wait(3000);
  cy.getUserName().then(($el) => {
    const getUserName_value = $el.text().trim();
    expect(getUserName_value).to.contains(staticName + roleText);
  });
  cy.softAssert(cy.getUserRole());
  cy.get("@role_text_value_").then((as_role_text_value_) => {
    cy.getUserRole().then(($el) => {
      const getUserRole_value = $el.text().trim();
      expect(getUserRole_value).to.contains(as_role_text_value_);
    });
  });
  cy.getUserEmail().then(($el) => {
    const getUserName_value = $el.text().trim();
    expect(getUserName_value).to.contains(user_emailStatic);
  });
}

function deleteUserLogin2(roleTarget) {
  const user_emailStatic = Cypress.env("user_emailStatic");
  cy.get("body").then(($body) => {
    // cy.get(user_emailStatic).then(($body) => {
    if ($body.text().includes(user_emailStatic)) {
      cy.log("a", roleTarget);
      deleteUser2(roleTarget);
    } else {
      cy.log("b");
      cy.softAssert(cy.pagination_next().click());
      deleteUser2(roleTarget);
    }
  });
}

function deleteUser2(roleTarget) {
  const user_emailStatic = Cypress.env("user_emailStatic");
  cy.getUserEmail()
    .contains(user_emailStatic)
    .parents("tr")
    .within(() => {
      cy.getUserName().then((userName) => {
        const userNameText = userName.text().trim();
        cy.wrap(userNameText).as("userName");
      });
    });
  cy.getUserEmail()
    .contains(user_emailStatic)
    .parents("tr")
    .within(() => {
      cy.getUserEmail().then((userEmail) => {
        const userEmailText = userEmail.text().trim();
        cy.wrap(userEmailText).as("userEmail");
      });
    });
  cy.getUserEmail()
    .contains(user_emailStatic)
    .parents("tr")
    .within(() => {
      cy.getUserDivision().then((userDivision) => {
        const userDivisionText = userDivision.text().trim();
        cy.wrap(userDivisionText).as("userDivisi");
      });
    });
  cy.getUserEmail()
    .contains(user_emailStatic) // pilih elemen getUserRole pertama yang mengandung "admin"
    .parents("tr") // naik ke elemen baris (tr) yang sesuai
    .within(() => {
      cy.getUserName().click();
    });
  cy.softAssert(cy.backButton_inDetail());
  cy.softAssert(cy.headline_userName());
  cy.get("@userName").then((as_username) => {
    cy.headline_userName().then(($el) => {
      const headline_userName_text = $el.text().trim();
      expect(headline_userName_text).to.eq(as_username);
    });
  });
  cy.softAssert(cy.headline_userJoinDate());
  cy.softAssert(cy.profileCard());
  cy.softAssert(cy.profileName());
  cy.softAssert(cy.profileRole());
  cy.softAssert(cy.profileEmail());
  cy.get("@userEmail").then((as_userEmail) => {
    cy.profileEmail().then(($el) => {
      const profileEmail_text = $el.text().trim();
      expect(profileEmail_text).to.eq(as_userEmail);
    });
  });
  cy.softAssert(cy.profileDivision());
  cy.get("@userDivisi").then((as_userDivisi) => {
    cy.profileDivision().then(($el) => {
      const profileDivisionText = $el.text().trim();
      expect(profileDivisionText).to.eq(as_userDivisi);
    });
  });
  cy.softAssert(cy.userRoleDesc());
  cy.get("@userName").then((as_username) => {
    cy.get("@userDivisi").then((as_userDivisi) => {
      cy.userRoleDesc().then(($el) => {
        const userRoleDescText = $el.text().trim();
        expect(userRoleDescText).contains(as_userDivisi);
        expect(userRoleDescText).contains(as_username);
      });
    });
  });
  cy.softAssert(cy.backButton_inDetail().click());
  function searchAndClickUserEmail(user_emailStatic) {
    cy.get("body").then(($body) => {
      if (
        $body.find(
          `[data-cy^="cell-email_anggota-"]:contains("${user_emailStatic}")`
        ).length > 0
      ) {
        cy.log("a");
        cy.softAssert(cy.buttonMoreOptions());
        cy.getUserEmail()
          .contains(user_emailStatic)
          .parents("tr")
          .within(() => {
            cy.buttonMoreOptions().click();
          });
      } else {
        cy.log("b");
        cy.softAssert(cy.pagination_next().click());
        searchAndClickUserEmail(user_emailStatic);
      }
    });
  }
  searchAndClickUserEmail(user_emailStatic);
  cy.softAssert(cy.button_hapusAnggota().click());
  cy.softAssert(cy.deleteModalTitle().contains(), "a");
  cy.softAssert(cy.deleteModalDescription(), "b");
  cy.softAssert(cy.deleteModalMemberName(), "c");
  cy.softAssert(cy.deleteModalCheckbox(), "d");
  cy.deleteModalTitle()
    .contains("Hapus Anggota?")
    .closest('div[role="dialog"]')
    .within(() => {
      cy.softAssert(cy.deleteModalDeleteButton_disabled());
    });
  cy.deleteModalTitle()
    .contains("Hapus Anggota?")
    .closest('div[role="dialog"]')
    .within(() => {
      cy.softAssert(cy.deleteModalCancelButton());
    });
  cy.softAssert(cy.deleteModalCheckbox().click());
  cy.deleteModalTitle()
    .contains("Hapus Anggota?")
    .closest('div[role="dialog"]')
    .within(() => {
      cy.softAssert(cy.deleteModalDeleteButton());
    });
}

function navigateToInbox_unassigned_() {
  cy.inboxUnassignedTab().click();
}
function navigateToInbox_resolved_() {
  cy.inboxResolvedTab().click();
}
function modal_role_divisi() {
  cy.getUserName().eq(0).invoke("text").as("userName");
  // cy.getUserDivision().eq(0).invoke("text").as("userDivisi");
  cy.softAssert(cy.modalAturRole_divisi());
  cy.modalAturRole_divisi()
    .find("h4.text-xl.font-semibold")
    .invoke("text")
    .as("modalTitle");
  cy.get("@modalTitle").then((modalTitle) => {
    if (modalTitle.includes("Atur Role")) {
      cy.log("open modal ubah role");
      cy.get("@userName").then((userName) => {
        const extractedName = modalTitle.replace("Atur Role ", "").trim();
        expect(extractedName.trim()).to.eq(
          userName.trim(),
          "modal user sesuai"
        );
      });
      cy.softAssert(cy.modalAtur_Role_desc());
      cy.softAssert(cy.modalAturRole_selectRole().click());
      cy.softAssert(cy.select_role_superAdmin());
      cy.softAssert(cy.select_role_internal_team());
      cy.softAssert(cy.select_role_agent());
      cy.softAssert(cy.select_role_admin());
      cy.document().trigger("keydown", { key: "Escape" });
      cy.wait(600);
      cy.softAssert(cy.modalAturRole_cancel());
      cy.softAssert(cy.modalAturRole_ubahRole());
      cy.document().trigger("keydown", { key: "Escape" });
      cy.wait(600);
    } else if (modalTitle.includes("Atur Divisi")) {
      cy.log("open modal ubah divisi");
      cy.get("@userName").then((userName) => {
        const extractedName = modalTitle.replace("Atur Divisi ", "").trim();
        expect(extractedName.trim()).to.eq(
          userName.trim(),
          "modal user sesuai"
        );
      });
      cy.softAssert(cy.modalAtur_Divisi_desc());
      cy.softAssert(cy.modalAturRole_selectDivisi().click());
      cy.softAssert(cy.userDIvisiDataListAll());
      cy.document().trigger("keydown", { key: "Escape" });
      cy.wait(600);
      cy.softAssert(cy.modalAturDivisi_save());
      cy.softAssert(cy.modalAturDivisi_cancel());
      cy.document().trigger("keydown", { key: "Escape" });
      cy.wait(600);
      // cy.document().trigger("keydown", { key: "Escape" });
    }
  });
}

function findRole_EC(roleTarget) {
  cy.get("body").then(($body) => {
    if ($body.text().includes("have.text", roleTarget)) {
      cy.log("a");
      roleAction(roleTarget);
    } else {
      cy.log("b");
      // cy.softAssert(cy.paginationButton_10().click({ force: true }));
      // cy.popperContentWrapper().within(() => {
      //   cy.contains("20").click({ force: true });
      // });
      cy.softAssert(cy.pagination_next().click());
      roleAction(roleTarget);
    }
  });
}
function roleAction(roleTarget) {
  cy.getUserRole()
    .contains(roleTarget)
    .parents("tr")
    .within(() => {
      cy.getUserName().then((userName) => {
        const userNameText = userName.text().trim();
        cy.wrap(userNameText).as("userName");
      });
    });
  cy.getUserRole()
    .contains(roleTarget)
    .parents("tr")
    .within(() => {
      cy.getUserEmail().then((userEmail) => {
        const userEmailText = userEmail.text().trim();
        cy.wrap(userEmailText).as("userEmail");
      });
    });
  cy.getUserRole()
    .contains(roleTarget)
    .parents("tr")
    .within(() => {
      cy.getUserDivision().then((userDivision) => {
        const userDivisionText = userDivision.text().trim();
        cy.wrap(userDivisionText).as("userDivisi");
      });
    });
  cy.getUserRole()
    .contains(roleTarget) // pilih elemen getUserRole pertama yang mengandung "admin"
    .parents("tr") // naik ke elemen baris (tr) yang sesuai
    .within(() => {
      cy.getUserName().click();
    });
  cy.softAssert(cy.backButton_inDetail());
  cy.softAssert(cy.headline_userName());
  cy.get("@userName").then((as_username) => {
    cy.headline_userName().then(($el) => {
      const headline_userName_text = $el.text().trim();
      expect(headline_userName_text).to.eq(as_username);
    });
  });
  cy.softAssert(cy.headline_userJoinDate());
  cy.softAssert(cy.profileCard());
  cy.softAssert(cy.profileName());
  cy.softAssert(cy.profileRole());
  cy.softAssert(cy.profileEmail());
  cy.get("@userEmail").then((as_userEmail) => {
    cy.profileEmail().then(($el) => {
      const profileEmail_text = $el.text().trim();
      expect(profileEmail_text).to.eq(as_userEmail);
    });
  });
  cy.softAssert(cy.profileDivision());
  cy.get("@userDivisi").then((as_userDivisi) => {
    cy.profileDivision().then(($el) => {
      const profileDivisionText = $el.text().trim();
      expect(profileDivisionText).to.eq(as_userDivisi);
    });
  });
  cy.softAssert(cy.userRoleDesc());
  cy.get("@userName").then((as_username) => {
    cy.get("@userDivisi").then((as_userDivisi) => {
      cy.userRoleDesc().then(($el) => {
        const userRoleDescText = $el.text().trim();
        expect(userRoleDescText).contains(as_userDivisi);
        expect(userRoleDescText).contains(as_username);
      });
    });
  });
  cy.softAssert(cy.dashboardCMS());
  cy.softAssert(cy.inboxCMS());
  cy.softAssert(cy.broadcastCMS());
  cy.softAssert(cy.ticketCMS());
  cy.softAssert(cy.groupInboxCMS());
  cy.softAssert(cy.templatePesanCMS());
  cy.softAssert(cy.akunWhatsappCMS());
  cy.softAssert(cy.divisionCMS());
  cy.softAssert(cy.kelolaGroupCMS());
  cy.softAssert(cy.jamCMS());
  cy.softAssert(cy.contactCMS());
  cy.softAssert(cy.templateBroadcastCMS());
  cy.softAssert(cy.moreOpt_detailUser().should("be.visible").click());
  cy.softAssert(cy.ubahRole_detailUser().should("be.visible"));
  cy.softAssert(cy.ubahDivisi_detailUser().should("be.visible"));
  cy.softAssert(cy.backButton_inDetail().click());
  cy.softAssert(cy.buttonMoreOptions());
  cy.getUserRole()
    .contains(roleTarget)
    .parents("tr")
    .within(() => {
      cy.buttonMoreOptions().click();
    });
  cy.softAssert(cy.buttonUbahRole());
  cy.softAssert(cy.buttonUbahDivisi());
  cy.softAssert(cy.buttonKirimPassword());
  cy.softAssert(cy.button_nonAktifkan());
  cy.softAssert(cy.button_hapusAnggota());
}

class userRbacPage {
  elementCheckingUserRbac_kelolaTim() {
    cy.softAssert(cy.kelola_tim_headLabel(), "kelola_tim_headLabel");
    cy.softAssert(cy.buttonAddUserLogin(), "buttonAddUserLogin");
    // cy.softAssert(cy.toggleUserStatus().eq(0), "toggleUserStatus");
    cy.softAssert(cy.getUserName().eq(0), "getUserName");
    cy.getUserName().eq(0).invoke("text").as("userName");
    cy.softAssert(cy.getUserRole().eq(0), "getUserRole");
    cy.softAssert(cy.getUserEmail().eq(0), "getUserEmail");
    cy.softAssert(cy.getUserDivision().eq(0), "getUserDivision");
    cy.getUserDivision().eq(0).invoke("text").as("userDivisi");
    cy.softAssert(cy.getUserStatus().eq(0), "getUserStatus");
    // cy.softAssert(cy.buttonEditUser().eq(0), "buttonEditUser");
    cy.softAssert(cy.buttonMoreOptions().eq(0), "buttonMoreOptions");
    cy.softAssert(
      cy.buttonMoreOptions().eq(0).click(),
      "open hidden element buttonMoreOptions"
    );
    cy.softAssert(cy.buttonUbahRole(), "ubah role");
    cy.softAssert(cy.buttonUbahRole().click(), "open modal ubah role");
    modal_role_divisi();
    cy.softAssert(cy.buttonUbahDivisi().click(), "ubah divisi");
    modal_role_divisi();
    cy.softAssert(cy.button_nonAktifkan());
    cy.document().trigger("keydown", { key: "Escape" });
    cy.softAssert(cy.searchbar());
    cy.softAssert(cy.filterButton().click());
    cy.softAssert(cy.filterModalPopup());
    cy.softAssert(cy.roleCheckbox("Owner").click());
    cy.softAssert(cy.roleCheckbox("Super Admin").click());
    cy.softAssert(cy.roleCheckbox("Admin").click());
    cy.softAssert(cy.roleCheckbox("Agent").click());
    cy.softAssert(cy.statusCheckbox("Aktif").click());
    cy.softAssert(cy.statusCheckbox("Tidak Aktif").click());
    cy.softAssert(cy.statusCheckbox("Diundang").click());
    cy.softAssert(cy.accessFeatureCheckbox("Inbox").click());
    cy.softAssert(cy.accessFeatureCheckbox("Group").click());
    cy.softAssert(cy.accessFeatureCheckbox("Ticketing").click());
    cy.softAssert(cy.accessFeatureCheckbox("Users").click());
    cy.softAssert(cy.accessFeatureCheckbox("Template Pesan").click());
    cy.softAssert(cy.accessFeatureCheckbox("Account Whatsapp").click());
    cy.softAssert(cy.accessFeatureCheckbox("Division").click());
    cy.softAssert(cy.accessFeatureCheckbox("Group Division").click());
    cy.softAssert(cy.accessFeatureCheckbox("Working Hour").click());
    cy.softAssert(cy.accessFeatureCheckbox("Contact").click());
    cy.softAssert(cy.accessFeatureCheckbox("Template Broadcast").click());
    cy.softAssert(cy.clearFilterButton().click());
    cy.wait(1000);
    cy.document().trigger("keydown", { key: "Escape" });
    cy.document().trigger("keydown", { key: "Escape" });
    const roleTarget = "super Admin";
    findRole_EC(roleTarget);

    // cy.softAssert(cy.button_nonAktifkan(), "non aktifkan anggota");
    // cy.softAssert(cy.deleteButton().eq(0).click(), "getDeleteButton");
    // cy.softAssert(cy.deleteModalTitle(), "getDeleteModalTitle");
    // cy.softAssert(cy.deleteModalDescription(), "getDeleteModalDescription");
    // cy.softAssert(cy.deleteModalMemberName(), "getDeleteModalMemberName");
    // cy.softAssert(cy.deleteModalCheckbox(), "getDeleteModalCheckbox");
    // cy.softAssert(cy.deleteModalCancelButton(), "getDeleteModalCancelButton");
    // cy.softAssert(
    //   cy.deleteModalDeleteButton_disabled(),
    //   "getDeleteModalDeleteButton_disabled"
    // );
    // cy.softAssert(cy.deleteModalCheckbox().click(), "getDeleteModalCheckbox");
    // cy.softAssert(cy.deleteModalDeleteButton(), "getDeleteModalDeleteButton");
    // cy.softAssert(
    //   cy.deleteModalCloseButton().click(),
    //   "getDeleteModalCloseButton"
    // );

    // cy.softAssert(
    //   cy.kelola_tim_headLabel().click(),
    //   "END of elementCheckingUserRbac_kelolaTim"
    // );
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
export default userRbacPage;
