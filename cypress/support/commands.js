// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
// Cypress.Commands.add('visit',() =>{
//     cy.visit('https://dev.example.test/');
// })

import { regexp } from "assert-plus";
import spamData from "./data/spamLogin";
import "./commands/dataLogin";
import "./commands/button";
import "./commands/filter";
import "./commands/dashboard_element";
import "./commands/inbox";
import "./commands/groupChat";
import "./commands/ticketing";
import "./commands/broadcast";
import "./commands/termAndPolicy";
import "./commands/notification";
import "./commands/socket";
// endpoint detection is implemented as a Page Object (support/pages/endpointDetectPage.js)

// // Versi untuk chaining setelah cy.get()
let successLogs = [];
let failedLogs = [];
let errorLogs = [];

// versi softAssert → tidak stop test
Cypress.Commands.add(
  "softAssert",
  { prevSubject: true },
  (subject, expectedText, message) => {
    return cy.wrap(subject).then(($el) => {
      try {
        expect($el).to.be.visible;
        expect($el.text().trim()).to.eq(expectedText);
        cy.task("log", `✅ Passed: ${message || expectedText}`);
        successLogs.push(`✅ Passed: ${message || expectedText}`);
      } catch (error) {
        cy.task(
          "log",
          `❌ Failed: ${message || expectedText} - ${error.message}`,
        );
        failedLogs.push(
          `❌ Failed: ${message || expectedText} - ${error.message}`,
        );
      }
    });
  },
);

// versi hardSoftAssert → stop test kalau gagal
Cypress.Commands.add("hardAssert", (subject, message) => {
  try {
    if (!subject || subject.length === 0) {
      throw new Error("Element not found");
    }

    const successMessage = `✅ Passed: ${message || "Element exists"}`;
    cy.task("log", successMessage);
    successLogs.push(successMessage);

    return cy.wrap(subject); // penting: biar bisa .type(), .click(), dst
  } catch (error) {
    const failedMessage = `❌ Failed (STOP): ${
      message || "Hard assertion failed"
    } - ${error.message}`;
    cy.task("log", failedMessage);
    failedLogs.push(failedMessage);
    throw error; // stop test
  }
});

// Cypress.Commands.add('printLogs_successLogs', (successLogs = []) => {
Cypress.Commands.add("printLogs_successLogs", () => {
  // Print success logs
  cy.log("--- Success Logs ---");
  successLogs.forEach((log) => {
    cy.log(log);
    cy.task("log", log);
  });
});
// Cypress.Commands.add('printLogs_failedLogs', (failedLogs = []) => {
Cypress.Commands.add("printLogs_failedLogs", () => {
  // Print failed logs
  cy.log("--- Failed Logs ---");
  failedLogs.forEach((log) => {
    cy.log(log);
    cy.task("log", log);
  });
});
// Cypress.Commands.add('printLogs_errorLogs', (errorLogs = []) => {
Cypress.Commands.add("printLogs_errorLogs", () => {
  // Print error logs
  cy.log("--- Error Logs ---");
  errorLogs.forEach((log) => {
    cy.log(log);
    cy.task("log", log);
  });
});

Cypress.Commands.add(
  "scrollUntilLoaded",
  (scrollTarget, checkElement, maxScrolls = 10, scrollStep = 200) => {
    let scrollCount = 0;

    function scrollAndCheck() {
      scrollCount++;

      // Scroll the target element
      cy.get(scrollTarget).scrollTo("bottom", { duration: 1000 });

      // Wait for lazy-loaded content to appear
      cy.wait(1000); // Adjust this timeout if necessary

      // Check if the required element appears
      cy.get(scrollTarget).then(($container) => {
        if (
          $container.find(checkElement).length >= 6 ||
          scrollCount >= maxScrolls
        ) {
          cy.log(`✅ Scrolling completed after ${scrollCount} scrolls.`);
        } else {
          // Continue scrolling if the element is not found
          scrollAndCheck();
        }
      });
    }

    // Start the recursive scroll
    scrollAndCheck();
  },
);

Cypress.Commands.add("error", (message) => {
  console.log(`%c${message}`, "color: red; font-weight: bold;");
  cy.task("error", `❌❌❌❌❌❌❌❌❌❌❌❌`);
  cy.task("error", `❌ ${message} ❌`);
  // cy.log(`%c${message}`, "color: red; font-weight: bold;");
});

Cypress.Commands.add("success", (message) => {
  console.log(`%c${message}`, "color: green; font-weight: bold;");
  cy.task("success", message);
});

// define and add custom command all element here

// ALL ELEMENT commands

Cypress.Commands.add("data_list_1", () => {
  cy.get('[data-cy="data-list-1"]');
});

Cypress.Commands.add("nav_link_Group", () => {
  // cy.get('[data-cy="nav-link-Group"]');
  cy.get("button").contains("Group");
});
Cypress.Commands.add("emoji_button", () => {
  cy.get('[data-cy="emoji-button"]');
});
Cypress.Commands.add("buble_chat", () => {
  cy.get('[data-cy="buble-chat"]');
});
Cypress.Commands.add("dropdown_content_container", () => {
  cy.get('[data-cy="dropdown-content"]');
});
Cypress.Commands.add("dropdown_content_container_emptyState", () => {
  cy.get('[data-cy="dropdown-content"]').find("h1").contains("Data not found!");
});
Cypress.Commands.add("combo_filter", () => {
  // cy.get('[data-cy="dropdown-content"]');
  cy.xpath(
    "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/button[1]",
  );
});

Cypress.Commands.add("simpan_popupModal_min1", () => {
  // cy.get('div[role="dialog"][tabindex="-1"]').find('button[type="button"]').contains('Assign')
  cy.get('div[role="dialog"][tabindex="-1"]')
    .find("button[type]")
    .contains("Simpan");
  // cy.get('div[role="dialog"][tabindex="-1"]').find('button[type="submit"]').contains('Simpan')
});

Cypress.Commands.add("dropdown_content_container", () => {
  cy.get('[data-cy="dropdown-content"]');
});

//CONTACT
Cypress.Commands.add("contact_head_label", () => {
  cy.xpath("/html[1]/body[1]/main[1]/main[1]/section[1]/div[1]/div[1]");
});
Cypress.Commands.add("contact_sub_label", () => {
  cy.xpath(
    "/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/h3[1]/p[1]",
  );
});
Cypress.Commands.add("contact_tab_contact", () => {
  cy.get('[data-cy="contact-tab-contact"]');
});
Cypress.Commands.add("contact_tab_block", () => {
  cy.get('[data-cy="contact-tab-block"]');
});
Cypress.Commands.add("cell_name_customer", () => {
  cy.get('[data-cy="cell-name_customer-1"]');
});
Cypress.Commands.add("cell_createdAt", () => {
  cy.get('[data-cy="cell-createdAt-2"]');
});
Cypress.Commands.add("cell_whatsapp", () => {
  cy.get('[data-cy="cell-whatsapp-3"]');
});
Cypress.Commands.add("cell_name_division", () => {
  cy.get('[data-cy="cell-name_division-4"]');
});
Cypress.Commands.add("cell_label", () => {
  cy.get('[data-cy="cell-label-5"]');
});
Cypress.Commands.add("cell_roomHistory", () => {
  cy.get('[data-cy="cell-roomHistory-6"]');
});
Cypress.Commands.add("cell_actions", () => {
  cy.get('[data-cy="cell-actions-7"]');
});
Cypress.Commands.add("cell_actions_update", () => {
  cy.get('[data-cy="contact-table-actions-update-1"]');
});
Cypress.Commands.add("cell_actions_delete", () => {
  cy.get('[data-cy="contact-table-actions-elipsis-1"]');
});
Cypress.Commands.add("cell_actions_delete_button", () => {
  // cy.get('[data-cy="contact-table-actions-elipsis-1"]');
  cy.contains("Delete");
});
Cypress.Commands.add("modal_update_customer", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("foto_profil", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("update_profil", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("delete_profil", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("x_button_update_customer", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("container_nama", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("container_nomor", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("container_label", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("modal_delete", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("modal_delete_hapus", () => {
  cy.get('[data-cy=""]');
});
Cypress.Commands.add("modal_delete_batal", () => {
  cy.get('[data-cy=""]');
});

//KELOLA TIM
Cypress.Commands.add("kelola_tim_headLabel", () => {
  cy.get("div.h-auto.align-middle p.text-xl.font-bold")
    // .find("p.text-xl.font-bold")
    // .should("have.text", "Kelola Tim");
    .should("have.text", "Anggota Tim");
});
Cypress.Commands.add("buttonAddUserLogin", () => {
  cy.get('[data-cy="manage-team-add"]');
});
// Cypress.Commands.add("toggleUserStatus", () => {
//   cy.get('[data-cy^="cell-switch-"] button[role="switch"]');
// });
Cypress.Commands.add("getUserName", () => {
  cy.get('[data-cy^="cell-nama_anggota-"]');
});
Cypress.Commands.add("getUserRole", () => {
  cy.get('[data-cy^="cell-role-"]');
});
Cypress.Commands.add("getUserEmail", () => {
  cy.get('[data-cy^="cell-email_anggota-"]');
});
Cypress.Commands.add("getUserDivision", () => {
  cy.get('[data-cy^="cell-division_name-"]');
});
Cypress.Commands.add("getUserStatus", () => {
  cy.get('[data-cy^="cell-label-"]');
});
Cypress.Commands.add("buttonEditUser", () => {
  cy.get('[data-cy="manage-team-edit"]');
});
Cypress.Commands.add("buttonMoreOptions", () => {
  cy.get('[data-cy^="cell-actions-"] button');
});
Cypress.Commands.add("buttonUbahRole", () => {
  cy.get('[role="dialog"][data-state="open"] button')
    .eq(0)
    .contains("Ubah Role");
});
Cypress.Commands.add("buttonUbahDivisi", () => {
  cy.get('[role="dialog"][data-state="open"] button')
    .eq(1)
    .contains("Ubah Divisi");
});
Cypress.Commands.add("buttonKirimPassword", () => {
  cy.get('[role="dialog"][data-state="open"] button')
    .eq(2)
    .contains("Kirim Password");
});
Cypress.Commands.add("button_nonAktifkan", () => {
  cy.get('[role="dialog"][data-state="open"] button')
    .eq(3)
    .contains("Non-Aktifkan Anggota");
});
Cypress.Commands.add("button_hapusAnggota", () => {
  cy.get('[role="dialog"][data-state="open"] button')
    .eq(4)
    .contains("Hapus Anggota");
});
Cypress.Commands.add("modalAturRole_divisi", () => {
  cy.get('div[role="dialog"][data-state="open"]').filter(":visible"); // Pastikan hanya yang terlihat
});
Cypress.Commands.add("modalAtur_Role_desc", () => {
  cy.get('div[role="dialog"][data-state="open"]')
    .filter(":visible")
    .find("div")
    .contains(
      "Tetapkan role pengguna sesuai kebutuhan. Pastikan setiap anggota memiliki akses yang tepat.",
    );
});
Cypress.Commands.add("modalAtur_Divisi_desc", () => {
  cy.get('div[role="dialog"][data-state="open"]')
    .filter(":visible")
    .find("div")
    .contains(
      "Anggota grup diberikan izin, batasan, dan akses produk yang sama.",
    );
});
Cypress.Commands.add("modalAturRole_selectRole", () => {
  cy.get('div[role="dialog"][data-state="open"]')
    .filter(":visible")
    .find('button[role="combobox"]');
});
Cypress.Commands.add("modalAturRole_cancel", () => {
  cy.get('button[data-cy="edit-role-button-cancel"]');
});
Cypress.Commands.add("modalAturRole_ubahRole", () => {
  cy.get('button[data-cy="edit-role-button-save"]');
});
Cypress.Commands.add("modalAturRole_selectDivisi", () => {
  cy.get('button[data-cy="general-filter-Tambahkan Divisi"]');
});
Cypress.Commands.add("modalAturDivisi_save", () => {
  cy.get('button[data-cy="edit-division-button-save"]');
});
Cypress.Commands.add("modalAturDivisi_cancel", () => {
  cy.get('button[data-cy="edit-division-button-cancel"]');
});
Cypress.Commands.add("filterButton", () => {
  cy.get('button[type="button"][aria-haspopup="dialog"]').contains("Filter");
});
Cypress.Commands.add("filterModalPopup", () => {
  cy.get('div[role="dialog"][data-state="open"]').contains("Filter");
});
Cypress.Commands.add("roleCheckbox", (role) => {
  cy.contains("h4", "ROLE")
    .parent()
    .find("label")
    .contains("span", new RegExp(`^${role}$`))
    .prev('button[role="checkbox"]');
});
Cypress.Commands.add("statusCheckbox", (status) => {
  cy.contains("h4", "STATUS")
    .parent()
    .find("label")
    .contains("span", new RegExp(`^${status}$`))
    .prev('button[role="checkbox"]');
});
Cypress.Commands.add("accessFeatureCheckbox", (feature) => {
  cy.contains("h4", "AKSES FITUR")
    .parent()
    .find("label")
    .contains("span", new RegExp(`^${feature}$`))
    .prev('button[role="checkbox"]');
});
Cypress.Commands.add("clearFilterButton", () => {
  cy.get('div[role="dialog"][data-state="open"]')
    .find("p")
    .contains("Bersihkan Filter");
});

Cypress.Commands.add("deleteButton", () => {
  cy.get('div[data-state="open"][role="dialog"] button').contains("Delete");
});
Cypress.Commands.add("deleteModalTitle", () => {
  cy.get('div[role="dialog"][data-state="open"] h2').contains("Hapus Anggota?");
});
Cypress.Commands.add("deleteModalDescription", () => {
  cy.get('div[role="dialog"][data-state="open"] p').contains(
    "Apakah anda yakin untuk menghapus Akun Anggota ini?",
  );
});
Cypress.Commands.add("deleteModalMemberName", () => {
  cy.get('div[role="dialog"][data-state="open"] span.font-bold');
});
Cypress.Commands.add("deleteModalCheckbox", () => {
  cy.get('div[role="dialog"][data-state="open"] #validate');
});
Cypress.Commands.add("deleteModalCancelButton", () => {
  cy.get("button").contains("Batal");
});
Cypress.Commands.add("deleteModalDeleteButton_disabled", () => {
  cy.get("button").contains("Hapus").should("be.disabled");
});
Cypress.Commands.add("deleteModalDeleteButton", () => {
  cy.get("button").contains("Hapus").should("not.be.disabled");
});
Cypress.Commands.add("deleteModalCloseButton", () => {
  cy.get(
    'div[role="dialog"][data-state="open"] button[data-cy="close-modal-btn"]',
  );
});

Cypress.Commands.add("manageTeam_modal", () => {
  cy.get('div[role="dialog"][data-state="open"][tabindex="-1"]').contains(
    "Tambah Anggota", //add child user
  );
});
Cypress.Commands.add("manageTeam_TextboxFullname", () => {
  cy.get('[data-cy="manage-team-textbox-fullname"]'); //add child user
});
// Cypress.Commands.add("manageTeam_TextboxUsername", () => {
//   cy.get('[data-cy="manage-team-textbox-username"]'); //add child user
// });
Cypress.Commands.add("manageTeam_TextboxEmail", () => {
  cy.get('[data-cy="manage-team-textbox-email"]'); //add child user
});
// Cypress.Commands.add("manageTeam_TextboxPassword", () => {
//   cy.get('[data-cy="manage-team-textbox-password"]'); //add child user
// });
Cypress.Commands.add("manageTeam_ComboboxRole", () => {
  cy.get('[data-cy="manage-team-combobox-role"]'); //add child user
});

// Cypress.Commands.add("manageTeam_SwitchIsActive", () => {
//   cy.get('[data-cy="manage-team-switch-isActive"]'); //add child user
// });
Cypress.Commands.add("select_role_internal_team", () => {
  cy.get('[data-cy="role-internal-team"]'); //add child user
});
Cypress.Commands.add("select_role_agent", () => {
  cy.get('[data-cy="role-agent"]'); //add child user
});
Cypress.Commands.add("select_role_superAdmin", () => {
  cy.get('[data-cy="role-super-admin"]'); //add child user
});
Cypress.Commands.add("select_role_admin", () => {
  cy.get('[data-cy="role-admin"]'); //add child user
});
Cypress.Commands.add("userDIvisiDataListAll", () => {
  cy.get('div[data-cy^="data-list-"]');
});
Cypress.Commands.add("userDIvisiDataList1", () => {
  cy.get('div[data-cy="data-list-1"]');
});
Cypress.Commands.add("userDIvisiDataList2", () => {
  cy.get('div[data-cy="data-list-2"]');
});
Cypress.Commands.add("userDIvisiDataList3", () => {
  cy.get('div[data-cy="data-list-3"]');
});
Cypress.Commands.add("paginationButton_10", () => {
  cy.get(
    'button[role="combobox"][data-state="closed"][aria-controls^="radix-"]',
  ).contains("10");
});
Cypress.Commands.add("popperContentWrapper", () => {
  cy.get('div[data-radix-popper-content-wrapper][dir="ltr"]');
});
Cypress.Commands.add("toastNotification", () => {
  cy.get('ol[data-sonner-toaster="true"] ');
  // .contains("You cannot delete this user!")
});
Cypress.Commands.add("nameOnAddUserLogin", () => {
  cy.get("#fullname");
});
Cypress.Commands.add("usernameOnAddUserLogin", () => {
  cy.get("#username");
});
Cypress.Commands.add("emailOnAddUserLogin", () => {
  cy.get("#email");
});
Cypress.Commands.add("passwordOnAddUserLogin", () => {
  cy.get("#password");
});
Cypress.Commands.add("roleOnAddUserLogin", () => {
  cy.get(
    '[id^="radix-"] > div.custom-scrollbar.max-h-\\[calc\\(100vh-130px\\)\\].overflow-y-auto.px-7 > form > div:nth-child(5) > button',
  );
});
Cypress.Commands.add("comboboxPilihDivisiOnAddUserLogin", () => {
  cy.get(
    '[id^="radix-"] > div.custom-scrollbar.max-h-\\[calc\\(100vh-130px\\)\\].overflow-y-auto.px-7 > form > div:nth-child(6) > div > button.inline-flex.items-center.whitespace-nowrap.rounded-md.text-sm.font-medium.ring-offset-background.transition-colors.focus-visible\\:outline-none.focus-visible\\:ring-2.focus-visible\\:ring-ring.focus-visible\\:ring-offset-2.disabled\\:pointer-events-none.disabled\\:opacity-100.disabled\\:bg-gray-200.disabled\\:text-gray-400.border.border-input.bg-background.hover\\:bg-accent.hover\\:text-accent-foreground.h-10.px-4.py-2.w-full.justify-between.truncate.rounded-br-none.rounded-tr-none.border-r-0',
  );
});
Cypress.Commands.add("comboboxPilihDivisiOnHalamanKelolaTim", () => {
  cy.get(
    "body > main > main > section > div.custom-scrollbar.flex-1.overflow-y-auto > div > div.p-8.pt-0.-mt-3 > div.flex.items-center.justify-between > div.flex.items-center.gap-3 > div.flex.w-full.items-center > button",
  );
});
Cypress.Commands.add("searchOnHalamanKelolaTim", () => {
  cy.get(
    "body > main > main > section > div.custom-scrollbar.flex-1.overflow-y-auto > div > div.p-8.pt-0.-mt-3 > div.flex.items-center.justify-between > div.flex.items-center.gap-3 > div.relative.flex.items-center > input",
  );
});
Cypress.Commands.add("editButtonOnHalamanKelolaTim", () => {
  cy.xpath(
    '/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[2]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[6]/div[1]/button[1]/*[name()="svg"][1]',
  );
});
Cypress.Commands.add("roleOnEditUserLogin", () => {
  cy.get(
    '[id^="radix-"] > div.custom-scrollbar.max-h-\\[calc\\(100vh-130px\\)\\].overflow-y-auto.px-7 > form > div:nth-child(5) > button',
  );
});
Cypress.Commands.add("backButton_inDetail", () => {
  cy.get(".flex.items-center.space-x-2 button.mb-4.flex.text-black");
});
Cypress.Commands.add("headline_userName", () => {
  return cy.get(".flex.items-center.space-x-2 h2.text-2xl.font-bold");
});
Cypress.Commands.add("headline_userJoinDate", () => {
  return cy.get(".flex.items-center.space-x-2 p.text-sm.text-gray-500");
});
Cypress.Commands.add("profileCard", () => {
  // cy.get(".h-full.max-w-[400px]");
  cy.get("div.bg-gray-300");
});
Cypress.Commands.add("profileName", () => cy.get("div h3").eq(0));
Cypress.Commands.add("profileRole", () =>
  cy.get("div.inline-flex.bg-blue-100"),
);
Cypress.Commands.add("profileEmail", () => cy.get("div h3").eq(1));
Cypress.Commands.add("profileDivision", () => cy.get("div h3").eq(2));
Cypress.Commands.add("userRoleDesc", () => cy.get("div h3").eq(3));
Cypress.Commands.add("dashboardCMS", () => cy.contains("div", "Dashboard"));
Cypress.Commands.add("inboxCMS", () => cy.contains("div", "Inbox"));
Cypress.Commands.add("broadcastCMS", () => cy.contains("div", "Broadcast"));
Cypress.Commands.add("ticketCMS", () => cy.contains("div", "Ticketing"));
Cypress.Commands.add("groupInboxCMS", () => cy.contains("div", "Group Inbox"));
Cypress.Commands.add("templatePesanCMS", () =>
  cy.contains("div", "Template Pesan"),
);
Cypress.Commands.add("akunWhatsappCMS", () =>
  cy.contains("div", "Akun Whatsapp"),
);
Cypress.Commands.add("divisionCMS", () => cy.contains("div", "Division"));
Cypress.Commands.add("kelolaGroupCMS", () =>
  cy.contains("div", "Kelola Group"),
);
Cypress.Commands.add("jamCMS", () => cy.contains("div", "Jam Kerja"));
Cypress.Commands.add("contactCMS", () => cy.contains("div", "Contact"));
Cypress.Commands.add("templateBroadcastCMS", () =>
  cy.contains("div", "Template Broadcast"),
);
Cypress.Commands.add("moreOpt_detailUser", () =>
  cy.xpath(
    `/html[1]/body[1]/main[1]/main[1]/section[1]/div[2]/div[1]/div[1]/button[1]/button[1]/*[name()='svg'][1]`,
  ),
);
Cypress.Commands.add("ubahRole_detailUser", () =>
  cy.xpath(`/html[1]/body[1]/div[1]/div[1]/button[1]`),
);
Cypress.Commands.add("ubahDivisi_detailUser", () =>
  cy.xpath(`/html[1]/body[1]/div[1]/div[1]/button[2]`),
);
Cypress.Commands.add("deleteUser_detailUser", () => cy.xpath(``));

//AKUN WHATSAPP
Cypress.Commands.add("roleOnEditUserLogin", () => {
  cy.get(
    '[id^="radix-"] > div.custom-scrollbar.max-h-\\[calc\\(100vh-130px\\)\\].overflow-y-auto.px-7 > form > div:nth-child(5) > button',
  );
});
Cypress.Commands.add("statusAkunWhatsapp", () => {
  cy.get('[data-cy="cell-used-account-status-3"]');
});
Cypress.Commands.add("loginAkunWhatsapp", () => {
  cy.get('[data-cy="login-account-1"]');
});

//LIVECHAT
//LIVECHAT INBOX

Cypress.Commands.add("liveChatNav_active", () => {
  cy.get("button")
    .contains("Live Chat")
    .should("be.visible")
    .should("have.class", "text-primary")
    .should("have.length", 1);
});

// Cypress.Commands.add("chat-list-1", () => {
//   cy.get('[data-cy="chat-list-1"]');
// }); //list chat inbox

Cypress.Commands.add("login-account-1", () => {
  cy.get('[data-cy="login-account-1"]');
});
Cypress.Commands.add("login-account-1", () => {
  cy.get('[data-cy="login-account-1"]');
});
Cypress.Commands.add("chat-list-2", () => {
  cy.get('[data-cy="chat-list-2"]');
});
Cypress.Commands.add("empty-state", () => {
  cy.get('[data-cy="empty-state"]');
});
Cypress.Commands.add("searchbarInbox_2_0", () => {
  // cy.get('');
  cy.xpath(
    "/html[1]/body[1]/main[1]/div[1]/section[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
  );
});
Cypress.Commands.add("inbox_tanggal", () => {
  cy.get("div.flex.items-center.justify-end.gap-1.group-hover\\:hidden")
    .find("span")
    .should("be.visible");
});
