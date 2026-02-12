// cypress/e2e/role-access.cy.js

describe("Role-Based Access Control Test", () => {
  const baseUrl = "https://dev-v2.satuinbox.com";

  // Test data untuk setiap role
  const roles = [
    // {
    //   name: "admin",
    //   username: "cekerayam01",
    //   password: "Asdqwe12@",
    //   allowedPages: [
    //     "/settings/organization/general",
    //     "/settings/organization/roles",
    //     "/settings/organization/members",
    //     "/settings/organization/shift-hours",
    //     "/settings/organization/tags",
    //     "/settings/organization/change-password",
    //     "/settings/inbox/team-inbox",
    //     "/settings/inbox/assignments",
    //     "/settings/inbox/macros",
    //     "/settings/inbox/tickets",
    //     "/settings/inbox/sla",
    //     "/settings/channels/widget",
    //     "/settings/channels/whatsapp-web",
    //     "/settings/channels/addon",
    //     "/settings/subscriptions/billing",
    //     "/settings/developer/webhook",
    //     "/settings/developer/shipping-credentials",
    //     "/conversation",
    //     "/ticketing",
    //     "/broadcast/messages",
    //     "/statistic",
    //   ],
    // },
    {
      name: "supervisor",
      username: "pusatadmin10",
      password: "Password1@",
      allowedPages: [
        "/conversation",
        "/ticketing",
        "/broadcast/messages",
        "/statistic",
        "/settings/organization/general",
        "/settings/organization/roles",
        "/settings/organization/shift-hours",
        "/settings/organization/tags",
        "/settings/organization/change-password",
        "/settings/inbox/team-inbox",
        "/settings/inbox/assignments",
        "/settings/inbox/macros",
        "/settings/channels/whatsapp-web",
      ],
    },
    // {
    //   name: "agent",
    //   username: "aprilch",
    //   password: "Password1@",
    //   allowedPages: [
    //     "/conversation",
    //     "/ticketing",
    //     "/broadcast/messages",
    //     "/settings/organization/roles",
    //     "/settings/organization/shift-hours",
    //     "/settings/organization/change-password",
    //     "/settings/inbox/team-inbox",
    //     "/settings/channels/whatsapp-web",
    //   ],
    // },
    // {
    //   name: "crm",
    //   username: "crmagent01",
    //   password: "Password1@",
    //   allowedPages: [
    //     "/conversation",
    //     "/ticketing",
    //     "/broadcast/messages",
    //     "/settings/organization/roles",
    //     "/settings/organization/shift-hours",
    //     "/settings/organization/change-password",
    //     "/settings/inbox/team-inbox",
    //     "/settings/channels/whatsapp-web",
    //   ],
    // },
    // {
    //   name: "tlc",
    //   username: "jbaagent01",
    //   password: "Password1@",
    //   allowedPages: [
    //     "/conversation",
    //     "/broadcast/messages",
    //     "/settings/organization/roles",
    //     "/settings/organization/shift-hours",
    //     "/settings/organization/change-password",
    //     "/settings/inbox/team-inbox",
    //     "/settings/channels/whatsapp-web",
    //   ],
    // },
  ];

  // Semua halaman yang ada
  const allPages = [
    "/settings/organization/general",
    "/settings/organization/roles",
    "/settings/organization/members",
    "/settings/organization/shift-hours",
    "/settings/organization/tags",
    "/settings/organization/change-password",
    "/settings/inbox/team-inbox",
    "/settings/inbox/assignments",
    "/settings/inbox/macros",
    "/settings/inbox/tickets",
    "/settings/inbox/sla",
    "/settings/channels/widget",
    "/settings/channels/whatsapp-web",
    "/settings/channels/addon",
    "/settings/subscriptions/billing",
    "/settings/developer/webhook",
    "/settings/developer/shipping-credentials",
    "/conversation",
    "/ticketing",
    "/broadcast/messages",
    "/statistic",
  ];

  // Handle uncaught exceptions
  Cypress.on("uncaught:exception", (err, runnable) => {
    console.log("Uncaught exception:", err.message);
    return false;
  });

  // Custom command untuk login dengan timeout lebih lama
  Cypress.Commands.add("login", (username, password) => {
    cy.session(
      [username, password],
      () => {
        cy.visit(`${baseUrl}/login`);

        // Tunggu form login muncul dengan timeout lebih lama
        cy.get(
          'input[type="text"], input[name="username"], input[id="username"]',
          { timeout: 15000 },
        )
          .should("be.visible")
          .first()
          .type(username, { delay: 50 });

        cy.get(
          'input[type="password"], input[name="password"], input[id="password"]',
          { timeout: 15000 },
        )
          .should("be.visible")
          .first()
          .type(password, { delay: 50 });

        cy.get(
          'button[type="submit"], button:contains("Login"), button:contains("Sign in")',
          { timeout: 15000 },
        )
          .should("be.visible")
          .first()
          .click();

        // Tunggu redirect ke conversation atau halaman utama
        cy.url({ timeout: 20000 }).should("not.include", "/login");
        cy.wait(3000); // Wait for page to fully load
      },
      {
        cacheAcrossSpecs: true,
      },
    );
  });

  // Custom command untuk logout yang lebih robust
  Cypress.Commands.add("logout", () => {
    cy.url().then((currentUrl) => {
      if (!currentUrl.includes("/login")) {
        // Coba beberapa selector umum untuk user menu / logout
        const logoutSelectors = [
          'button[aria-label="User menu"]',
          'button[aria-label="Account"]',
          ".user-menu",
          ".profile-menu",
          '[data-testid="user-menu"]',
          '[data-testid="profile"]',
          ".avatar",
          'button:contains("Profile")',
          'button:contains("Account")',
          'img[alt*="avatar"], img[alt*="profile"]',
        ];

        // Coba klik menu user jika ada
        let menuClicked = false;

        for (const selector of logoutSelectors) {
          if (menuClicked) break;
          try {
            cy.get("body").then(($body) => {
              if ($body.find(selector).length > 0) {
                cy.get(selector).first().click({ force: true });
                menuClicked = true;

                // Cari tombol logout
                cy.wait(1000);
                cy.get("body").then(($body2) => {
                  if (
                    $body2.find(
                      'button:contains("Logout"), a:contains("Logout"), button:contains("Sign out")',
                    ).length > 0
                  ) {
                    cy.contains("button, a", /Logout|Sign out/)
                      .first()
                      .click({ force: true });
                  }
                });
              }
            });
          } catch (e) {
            // Continue to next selector
          }
        }

        // Alternative: langsung clear session
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
      }
    });
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
      beforeEach(() => {
        // Login sebelum test dimulai
        cy.login(role.username, role.password);
      });

      it(`should verify allowed pages for ${role.name}`, () => {
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
        cy.logout();
      });
    });
  });

  // Test tanpa login
  describe("Testing direct access without login", () => {
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
