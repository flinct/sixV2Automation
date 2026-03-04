import { env_config } from "../../support/01_url_page.js";
import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";

describe("Role-Based Access Control Test", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage
  const baseUrl = Cypress.config("baseUrl");
  const config = env_config(baseUrl);
  // const baseUrl = "https://dev-v2.satuinbox.com";

  const roleNameRule = {
    admin: {
      "https://dev-v2.satuinbox.com": "admin_dev",
      "https://v2.satuinbox.com": "admin",
    },
    supervisor: {
      "https://dev-v2.satuinbox.com": "spv_dev",
      "https://v2.satuinbox.com": "supervisor",
    },
    agent: {
      "https://dev-v2.satuinbox.com": "agent_dev",
      "https://v2.satuinbox.com": "agent",
    },
    crm: {
      "https://dev-v2.satuinbox.com": "crm_dev",
      "https://v2.satuinbox.com": "crm",
    },
    tlc: {
      "https://dev-v2.satuinbox.com": "tlc_dev",
      "https://v2.satuinbox.com": "tlc",
    },
  };

  const resolveRoleName = (defaultName, baseUrl) => {
    return roleNameRule[defaultName]?.[baseUrl] || defaultName;
  };

  // Test data untuk setiap role
  const roles = [
    {
      name: resolveRoleName("admin", baseUrl),
      username: "cekerayam01",
      password: "Asdqwe12@",
      allowedPages: [
        config.visitGeneralSetting,
        config.visitRole,
        config.visitMembers,
        config.visitShift,
        config.visitTags,
        config.visitChangePass,
        config.visitTeaminbox,
        config.visitAssignment,
        config.visitMacros,
        config.visitTicketTypes,
        config.visitSLA,
        config.visitWidgetSetting,
        config.visitWhatsappwebSetting,
        config.visitAddons,
        config.visitSubscription,
        config.visitWebhookSetting,
        config.visitTrackingSetting,
        config.visitConversation,
        config.visitTicket,
        config.visitBroadcast,
        config.visitStatistic,
      ],
    },
    {
      name: resolveRoleName("supervisor", baseUrl),
      username: "pusatadmin10",
      password: "Password1@",
      allowedPages: [
        //     "/conversation",
        //     "/ticketing",
        //     "/broadcast/messages",
        //     "/statistic",

        //     "/settings/organization/general",
        //     "/settings/organization/roles",
        //     "/settings/organization/shift-hours",
        //     "/settings/organization/tags",
        //     "/settings/organization/change-password",
        //     "/settings/inbox/team-inbox",
        //     "/settings/inbox/assignments",
        //     "/settings/inbox/macros",
        //     "/settings/channels/whatsapp-web",
        config.visitGeneralSetting,
        config.visitRole,
        config.visitShift,
        config.visitTags,
        config.visitChangePass,
        config.visitTeaminbox,
        config.visitAssignment,
        config.visitMacros,
        config.visitWhatsappwebSetting,

        config.visitConversation,
        config.visitTicket,
        config.visitBroadcast,
        config.visitStatistic,
      ],
    },
    {
      name: resolveRoleName("agent", baseUrl),
      username: "aprilch",
      password: "Password1@",
      allowedPages: [
        //     "/conversation",
        //     "/ticketing",
        //     "/broadcast/messages",
        //     "/settings/organization/roles",
        //     "/settings/organization/shift-hours",
        //     "/settings/organization/change-password",
        //     "/settings/inbox/team-inbox",
        //     "/settings/channels/whatsapp-web",
        config.visitRole,
        config.visitShift,
        config.visitChangePass,
        config.visitTeaminbox,
        config.visitWhatsappwebSetting,

        config.visitConversation,
        config.visitTicket,
        config.visitBroadcast,
      ],
    },
    {
      name: resolveRoleName("crm", baseUrl),
      username: "crmagent01",
      password: "Password1@",
      allowedPages: [
        //     "/conversation",
        //     "/ticketing",
        //     "/broadcast/messages",

        //     "/settings/organization/roles",
        //     "/settings/organization/shift-hours",
        //     "/settings/organization/change-password",
        //     "/settings/inbox/team-inbox",
        //     "/settings/channels/whatsapp-web",
        config.visitRole,
        config.visitShift,
        config.visitChangePass,
        config.visitTeaminbox,
        config.visitWhatsappwebSetting,

        config.visitConversation,
        config.visitTicket,
        config.visitBroadcast,
      ],
    },
    {
      name: resolveRoleName("tlc", baseUrl),
      username: "jbaagent01",
      password: "Password1@",
      allowedPages: [
        //     "/conversation",
        //     "/broadcast/messages",

        //     "/settings/organization/roles",
        //     "/settings/organization/shift-hours",
        //     "/settings/organization/change-password",
        //     "/settings/inbox/team-inbox",
        //     "/settings/channels/whatsapp-web",
        config.visitRole,
        config.visitShift,
        config.visitChangePass,
        config.visitTeaminbox,
        config.visitWhatsappwebSetting,

        config.visitConversation,
        config.visitBroadcast,
      ],
    },
  ];

  // Semua halaman yang ada
  const allPages = [
    config.visitGeneralSetting,
    config.visitRole,
    config.visitMembers,
    config.visitShift,
    config.visitTags,
    config.visitChangePass,
    config.visitTeaminbox,
    config.visitAssignment,
    config.visitMacros,
    config.visitTicketTypes,
    config.visitSLA,
    config.visitWidgetSetting,
    config.visitWhatsappwebSetting,
    config.visitAddons,
    config.visitSubscription,
    config.visitWebhookSetting,
    config.visitTrackingSetting,
    config.visitConversation,
    config.visitTicket,
    config.visitBroadcast,
    config.visitStatistic,
  ];

  // Handle uncaught exceptions
  Cypress.on("uncaught:exception", (err, runnable) => {
    console.log("Uncaught exception:", err.message);
    return false;
  });

  // Custom command untuk cek akses dengan lebih baik
  Cypress.Commands.add("checkAccess", (page, shouldAccess = true) => {
    const fullUrl = `${baseUrl}${page}`;

    cy.visit(fullUrl, {
      failOnStatusCode: false,
      timeout: 30000,
    });

    cy.wait(3000); // Wait for redirects to happen

    cy.url({ timeout: 15000 }).then((currentUrl) => {
      const isLoginPage = currentUrl.includes("/login");
      const isUnauthorizedPage =
        currentUrl.includes("/403") ||
        currentUrl.includes("/404") ||
        currentUrl.includes("/unauthorized") ||
        currentUrl.includes("/forbidden");

      const isRedirected = isLoginPage || isUnauthorizedPage;

      if (shouldAccess) {
        if (isRedirected) {
          cy.log(
            `❌ ERROR: ${page} - Should be accessible but was redirected to ${currentUrl}`,
          );
          cy.screenshot(
            `error-access-denied-${Cypress.currentTest.titlePath.join("-")}-${page.replace(/\//g, "-")}`,
            {
              capture: "viewport",
            },
          );
        } else {
          cy.log(`✅ SUCCESS: ${page} - Access granted as expected`);
        }
      } else {
        if (!isRedirected && !currentUrl.includes("/login")) {
          cy.log(
            `❌ ERROR: ${page} - Should NOT be accessible but was accessed`,
          );
          cy.screenshot(
            `error-access-granted-${Cypress.currentTest.titlePath.join("-")}-${page.replace(/\//g, "-")}`,
            {
              capture: "viewport",
            },
          );
        } else {
          cy.log(`✅ SUCCESS: ${page} - Access denied as expected`);
        }
      }
    });
  });

  // Test untuk setiap role
  roles.forEach((role) => {
    describe(`Testing access for ${role.name}`, () => {
      if (baseUrl === "https://dev-v2.satuinbox.com") {
        const paramLogin = role.name;
        // authAction.loginAsSupervisor(paramLogin);
        beforeEach(() => {
          // Login sebelum test dimulai
          // cy.login(role.username, role.password);
          authAction.loginOverride(paramLogin);
        });
      }
      if (baseUrl === "https://v2.satuinbox.com") {
        const paramLogin = role.name;
        // authAction.loginAsSupervisor(paramLogin);
        beforeEach(() => {
          // Login sebelum test dimulai
          // cy.login(role.username, role.password);
          authAction.loginOverride(paramLogin);
        });
      }

      it(`should verify allowed pages for ${role.name}`, () => {
        // authAction.loginOverride(paramLogin);
        cy.log(
          `\n========== TESTING ALLOWED PAGES FOR ${role.name.toUpperCase()} ==========`,
        );

        role.allowedPages.forEach((page) => {
          cy.checkAccess(page, true);
        });
      });

      it(`should verify restricted pages for ${role.name}`, () => {
        cy.log(
          `\n========== TESTING RESTRICTED PAGES FOR ${role.name.toUpperCase()} ==========`,
        );

        const restrictedPages = allPages.filter(
          (page) => !role.allowedPages.includes(page),
        );

        if (restrictedPages.length > 0) {
          cy.log(`Testing ${restrictedPages.length} restricted pages`);
          restrictedPages.forEach((page) => {
            cy.checkAccess(page, false);
          });
        } else {
          cy.log(`No restricted pages for ${role.name}`);
        }
      });

      after(() => {
        // Cleanup setelah test
        cy.url().then((currentUrl) => {
          if (!currentUrl.includes("/login")) {
            authAction.logout();
            cy.clearCookies();
            cy.clearLocalStorage();
            cy.window().then((win) => {
              win.sessionStorage.clear();
            });
          }
        });
      });
    });
  });

  describe("Test conversation page based role userlogin", () => {
    it('accessing conversation as agent -- navigation list', () => {
        inboxPage.accessYourInbox()
        inboxPage.accessSpamConversation()
        inboxPage.accessJunkConversation()
        inboxPage.accessStarredConversation()
        inboxPage.
    });
    it('accessing conversation as supervisor', () => {
        
    });
    it('accessing conversation as admin', () => {
        
    });
  })

  // Test tanpa login
  describe.skip("Testing direct access without login", () => {
    const sensitivePages = [
      "/conversation",
      "/ticketing",
      "/broadcast/messages",
      "/statistic",
      "/settings/organization/general",
      "/settings/inbox/team-inbox",
      "/settings/channels/whatsapp-web",
    ];

    it("should redirect to login when accessing protected pages without authentication", () => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });

      sensitivePages.forEach((page) => {
        cy.visit(`${baseUrl}${page}`, {
          failOnStatusCode: false,
          timeout: 15000,
        });
        cy.url({ timeout: 15000 }).should("include", "/login");
        cy.log(`✅ SUCCESS: ${page} - Redirected to login`);
      });
    });
  });

  // Test summary
  after(() => {
    cy.log("\n========== TEST SUMMARY ==========");
    cy.log("✅ Test completed - Check logs and screenshots for any errors");
    cy.log("📸 Screenshots are saved in cypress/screenshots/");
    cy.log("====================================");
  });


});
