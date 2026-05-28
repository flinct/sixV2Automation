import authPage from "../../support/pages/authPage.js";
import inboxPage from "../../support/pages/inboxPage.js";
import dashboardPage from "../../support/pages/dashboardPage.js";
const baseUrl = Cypress.config("baseUrl");
import userDataSpam from "../../support/data/spamLogin.js";
import broadcastPage from "../../support/pages/broadcastPage.js";
import groupPage from "../../support/pages/groupPage.js";
import ticketingPage from "../../support/pages/ticketingPage.js";
import contactPage from "../../support/pages/contactPage.js";
import accountWhatsappPage from "../../support/pages/accountWhatsappPage.js";
import userRbacPage from "../../support/pages/userRbacPage.js";
import { env_config } from "../../support/01_url_page.js";
import liveChatPage from "../../support/pages/liveChatPage.js";
// import 'cypress-file-upload';

describe("testing auth page", () => {
  const authAction = new authPage();
  const inboxAction = new inboxPage();
  const dashboardAction = new dashboardPage();
  const broadcastAction = new broadcastPage();
  const groupAction = new groupPage();
  const ticketingAction = new ticketingPage();
  const contactAction = new contactPage();
  const accountWhatsappAction = new accountWhatsappPage();
  const userRbacAction = new userRbacPage();
  const liveChatAction = new liveChatPage();

  let assertionLogs = [];

  const config = env_config(baseUrl);
  const privacyPolicyUrl = `${baseUrl}/privacy-policy`;
  const termOfUseUrl = `${baseUrl}/term-of-use`;

  // Global fail handler
  // Cypress.on("fail", (error, runnable) => {
  //   const logMessage = `⚠️ Caught Error: ${error.message}`;
  //   assertionLogs.push(logMessage);
  //   cy.task("log", logMessage);
  //   // Prevent test failure
  //   return false;
  //   // failOnStatusCode: false
  // });

  // Cypress.on("fail", (error, runnable) => {
  //   cy.log("⚠️ Test failed but continuing: " + error.message);
  //   return false; // prevents Cypress from failing the test
  // });

  Cypress.on("uncaught:exception", (err, runnable) => {
    // Log any error using our custom task
    // Log a generic message if needed
    cy.task(
      "log asd",
      `Unhandled exception: ${err.message || JSON.stringify(err)}`
    );

    // Additionally log a custom message if specific content exists in the error
    if (err.message && err.message.includes("You cannot delete this user!")) {
      cy.task("log", `Specific error caught: ${err.message}`);
      // Optionally, you can check for other conditions here
    }

    // Return false to prevent Cypress from failing the test for this error
    return false;
  });

  it("validate privacy policy", () => {
    cy.visit(privacyPolicyUrl);
    cy.viewport(1366, 768);
    cy.wait(1000);

    cy.privacy_opening()
      .find("p")
      .invoke("text")
      .then((txt) => txt.replace(/\s+/g, " ").trim())
      // .contains(
      .should(
        "include",
        `SatuInbox (“SatuInbox,” “we,” “us,” or “our”) provides an omnichannel customer engagement platform that unifies conversations across WhatsApp, Facebook, Instagram, Email, X (formerly Twitter), TikTok, TikTok Shop, Live Chat, and other channels (the “Products”), together with related integrations, APIs, support, and Websites (the “Services”).`
        // ` that unifies conversations across WhatsApp, Facebook, Instagram, Email, X (formerly Twitter), TikTok, TikTok Shop, Live Chat, and other channels (the "`
      );

    const privacy_definitions_expectedTexts = [
      "Personal Data: Information about an identified or identifiable individual, such as name, email, phone number, address, identifiers, and similar data.",
      "Service Data: Data generated or processed when you use our Products and Services, such as conversation history, ticket logs, message counts, metadata, device/browser info, IP addresses, geolocation, and other usage information.",
      "Third Party: Any person or entity other than SatuInbox and its affiliates, including providers of integrated platforms (e.g., Meta, X, TikTok), hosting, analytics, payment, and other services.",
    ];

    cy.privacy_definitions()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_definitions_expectedTexts[index]
        );
      });

    const privacy_scope_expectedTexts = [
      "All SatuInbox Products and Services.",
      "Our Websites, portals, and apps.",
      "Other interactions you may have with our staff through chat, email, or events.",
    ];

    cy.privacy_scope()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should("include.text", privacy_scope_expectedTexts[index]);
      });

    const privacy_scope_expectedTexts2 = [
      "This Policy applies to:",
      "If you use SatuInbox on behalf of an organization, that organization controls the Service Data you provide. In case of conflict, the organization’s service agreement with us will prevail.",
    ];

    cy.privacy_scope()
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_scope_expectedTexts2[index]
        );
      });

    const privacy_information_expectedTexts = [
      "Personal Data you provide", //subtitle
      "Account & Profile: Name, email, phone number, company, role, password, or authentication tokens.",
      "Billing Information: Payment method, billing contact, and transaction details.",
      "Support/Contact: Content of inquiries, surveys, or feedback you submit to us.",
      "Third-party sources: Data received from partners, resellers, or integration providers.",
      "Service Data we process on your behalf", //subtitle
      "Channel Content & Metadata: Messages, attachments, orders, comments, tickets, tags, timestamps, delivery/read status, and session data from connected channels (Meta, X, TikTok, TikTok Shop, Email, etc.).",
      "Technical & Usage: Device/browser type, operating system, IP address, session identifiers, referral URLs, and activity logs.",
      "Cookies & Similar Technologies", //subtitle
    ];

    cy.privacy_information() //subtitle check
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_information_expectedTexts[index]
        );
      });

    cy.privacy_use_data()
      .find("p")
      .contains("We process Personal Data and Service Data to:");
    const privacy_use_data_expectedTexts = [
      "Provide and operate our Services.",
      "Enable integrations across channels (Meta, X, TikTok, TikTok Shop, marketplaces, email).",
      "Deliver customer support and respond to requests.",
      "Monitor, improve, and personalize performance and user experience.",
      "Manage billing, fraud prevention, and account administration.",
      "Train models for classification, routing, and service reliability (only with aggregated/de-identified data).",
      "Send administrative communications and, with consent, marketing updates.",
      "Comply with legal obligations and enforce terms of service.",
    ];

    cy.privacy_use_data()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_use_data_expectedTexts[index]
        );
      });

    const privacy_platform_integrations_expectedTexts = [
      "When you connect Meta channels, we process conversation data, profile details, and channel metadata necessary for messaging and synchronization. Meta may also process this data under their own Privacy Policy.",
      "If you connect your X account, we access tweets, messages, mentions, and related metadata strictly for omnichannel messaging, analytics, and service delivery.",
      "When you connect TikTok or TikTok Shop:",
      "Disconnecting an integration stops new data flows but does not automatically delete previously stored data, which is handled under Section 9 (Retention).",
    ];

    cy.privacy_platform_integrations()
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_platform_integrations_expectedTexts[index]
        );
      });
    const privacy_platform_integrations_expectedTexts2 = [
      "Platform Integrations",
      "Meta (Facebook, Instagram, WhatsApp)",
      "X (formerly Twitter)",
      "TikTok & TikTok Shop",
    ];

    cy.privacy_platform_integrations() //check subtitle
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_platform_integrations_expectedTexts2[index]
        );
      });
    const privacy_platform_integrations_expectedTexts3 = [
      "We may access messages, comments, posts, profile data, and e-commerce order information.",
      "Data is used only to enable customer engagement, analytics, and marketplace order/ticket workflows.",
      "TikTok may process this data in accordance with its own policies.",
    ];

    cy.privacy_platform_integrations() //check subtitle
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_platform_integrations_expectedTexts3[index]
        );
      });

    const privacy_data_storage_expectedTexts = ["Data Storage & Transfers"];

    cy.privacy_data_storage() //check subtitle
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_data_storage_expectedTexts[index]
        );
      });
    const privacy_data_storage_expectedTexts2 = [
      "We may store and process Data in Indonesia or other regions via secure cloud providers (e.g., AWS, GCP). For on-premise deployments, your organization manages hosting. Where data is transferred internationally, safeguards (such as contractual clauses) are applied.",
    ];

    cy.privacy_data_storage() //check subtitle
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_data_storage_expectedTexts2[index]
        );
      });

    const privacy_cookies_expectedTexts = ["Cookies & Third-Party Tracking"];

    cy.privacy_cookies() //check subtitle
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_cookies_expectedTexts[index]
        );
      });
    const privacy_cookies_expectedTexts2 = [
      "Essential cookies: Required for login, session continuity, and security.",
      "Analytics cookies/SDKs: Measure performance, usage, and reliability.",
      "Advertising cookies/pixels: With consent, we and partners (e.g., Meta, Google, TikTok) may use tracking technologies to optimize campaigns, attribution, and personalized experiences.",
    ];

    cy.privacy_cookies() //check subtitle
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_cookies_expectedTexts2[index]
        );
      });
    const privacy_cookies_expectedTexts3 = [
      "You may disable cookies in your browser or reject non-essential cookies where consent banners are provided.",
    ];

    cy.privacy_cookies() //check subtitle
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_cookies_expectedTexts3[index]
        );
      });

    const privacy_share_expectedTexts = ["How We Share Data"];

    cy.privacy_share() //check subtitle
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should("include.text", privacy_share_expectedTexts[index]);
      });
    const privacy_share_expectedTexts2 = [
      "We do not sell your Personal Data. We may share Data with:",
    ];

    cy.privacy_share() //check subtitle
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_share_expectedTexts2[index]
        );
      });
    const privacy_share_expectedTexts3 = [
      "Authorized users within your organization’s account.",
      "Vendors/sub-processors providing hosting, payment, analytics, and channel integrations.",
      "Affiliates that support global operations.",
      "Authorities when legally required.",
      "Business transfers in mergers, acquisitions, or asset sales under confidentiality.",
    ];

    cy.privacy_share() //check subtitle
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_share_expectedTexts3[index]
        );
      });

    const privacy_retention_expectedTexts = ["Data Retention"];

    cy.privacy_retention() //check subtitle
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_retention_expectedTexts[index]
        );
      });
    const privacy_retention_expectedTexts2 = [
      "Communication logs are retained for at least 6 months.",
      "Data is archived after 6 months and deleted after 12 months, unless otherwise agreed.",
      "Custom retention rules may apply per contract.",
      "Some data may be kept longer for compliance, audit, or dispute resolution.",
    ];

    cy.privacy_retention() //check subtitle
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_retention_expectedTexts2[index]
        );
      });

    const privacy_security_expectedTexts = ["Security"];

    cy.privacy_security() //check subtitle
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_security_expectedTexts[index]
        );
      });
    const privacy_security_expectedTexts2 = [
      "We implement technical and organizational measures such as encryption, access controls, session isolation, and monitoring. While no system is fully secure, we encourage users to set strong passwords and enable two-factor authentication.",
    ];

    cy.privacy_security() //check subtitle
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_security_expectedTexts2[index]
        );
      });

    const privacy_rights_expectedTexts = ["Your Rights"];

    cy.privacy_rights() //check subtitle
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_rights_expectedTexts[index]
        );
      });
    const privacy_rights_expectedTexts2 = [
      "Depending on your location, you may have rights to:",
    ];

    cy.privacy_rights() //check subtitle
      .scrollIntoView()
      .find("p")
      .eq(0)
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_rights_expectedTexts2[index]
        );
      });
    const privacy_rights_expectedTexts3 = [
      "Access and obtain a copy of your Personal Data.",
      "Correct or delete inaccurate information.",
      "Restrict or object to processing.",
      "Withdraw consent (e.g., for marketing or tracking).",
      "Port data to another provider.",
    ];

    cy.privacy_rights() //check subtitle
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_rights_expectedTexts3[index]
        );
      });
    const privacy_rights_expectedTexts4 = [
      "If your data is controlled by an organization using SatuInbox, please contact that organization first. We will assist them as processor.",
    ];

    cy.privacy_rights() //check subtitle
      .scrollIntoView()
      .find("p")
      .eq(1)
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_rights_expectedTexts4[index]
        );
      });

    const privacy_childrens_privacy_expectedTexts = ["Children's Privacy"];

    cy.privacy_childrens_privacy() //check subtitle
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_childrens_privacy_expectedTexts[index]
        );
      });

    const privacy_childrens_privacy_expectedTexts2 = [
      "SatuInbox is not directed at children under 13 years old (or applicable minimum age). We do not knowingly collect Personal Data from such individuals. If discovered, we will delete the information promptly.",
    ];

    cy.privacy_childrens_privacy() //check subtitle
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_childrens_privacy_expectedTexts2[index]
        );
      });

    const privacy_changes_policy_expectedTexts = ["Changes to This Policy"];

    cy.privacy_changes_policy() //check subtitle
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_changes_policy_expectedTexts[index]
        );
      });
    const privacy_changes_policy_expectedTexts2 = [
      "We may update this Privacy Policy periodically. Updates will be posted on this page with a revised “Last updated” date. Where required by law, we will notify you by email or in-app message.",
    ];

    cy.privacy_changes_policy() //check subtitle
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_changes_policy_expectedTexts2[index]
        );
      });

    const privacy_contact_expectedTexts = ["Contact"];
    cy.privacy_contact()
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_contact_expectedTexts[index]
        );
      });
    const privacy_contact_expectedTexts2 = [
      "For questions or requests regarding this Policy:",
    ];

    cy.privacy_contact()
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_contact_expectedTexts2[index]
        );
      });
    const privacy_contact_expectedTexts3 = [
      "support@example.test",
      "https://example.test",
      "PT Ordo Nusa Digital",
    ];

    cy.privacy_contact()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          privacy_contact_expectedTexts3[index]
        );
      });
  });

  it.only("validate term of use", () => {
    cy.visit(termOfUseUrl);
    cy.viewport(1366, 768);
    cy.wait(1000);

    cy.term_opening()
      .should("be.visible")
      .contains(
        "These Terms of Use (the “Agreement”) govern your access to and use of SatuInbox solutions, whether in trial or paid plans. By signing up, registering, or accessing SatuInbox Products and Services, you agree to be bound by these Terms."
      );

    const term_definitions_expectedTexts3 = ["Definitions"];

    cy.term_definitions()
      .scrollIntoView()
      .find("h2")
      .each(($el, index) => {
        cy.wrap($el).should(
          "include.text",
          term_definitions_expectedTexts3[index]
        );
      });
    cy.term_definitions_0()
      .should("be.visible")
      .find("b")
      .should("have.text", '"Satuinbox"');
    cy.term_definitions_0().contains(
      `means PT Ordo Nusa Digital, its affiliates, and subsidiaries operating the SatuInbox platform.`
    );
    cy.term_definitions_1()
      .should("be.visible")
      .find("b")
      .should("have.text", `"Customer"`);
    cy.term_definitions_1().contains(
      `means the company, organization, or individual that has subscribed to SatuInbox Products and Services.`
    );
    cy.term_definitions_2()
      .should("be.visible")
      .find("b")
      .should("have.text", `"Party / Parties"`);
    cy.term_definitions_2().contains(
      `refers individually to either SatuInbox or Customer, and collectively as both.`
    );
    cy.term_definitions_3()
      .should("be.visible")
      .find("b")
      .should("have.text", `"Satuinbox Products"`);
    cy.term_definitions_3().contains(
      `means the omnichannel platform and related services provided by SatuInbox, including but not limited to Unified Inbox, Ticketing, Broadcast, Team Collaboration, Analytics, Integrations (Meta APIs, X, TikTok, TikTok Shop, Marketplace, Email), and support tools.`
    );
    cy.term_definitions_4()
      .should("be.visible")
      .find("b")
      .should("have.text", `"Monthly Active User (MAU)"`);
    cy.term_definitions_4().contains(
      `means A unique end-user account that connects to SatuInbox during a calendar month.`
    );
    //term_definitions_5 customer data gaada

    cy.term_definitions_5().then(($el) => {
      cy.softAssert(() => expect($el).to.be.visible);
      cy.softAssert(() => expect($el.find("b")).to.have.text("Customer Data"));
    });
    cy.term_definitions_5().then(($el) => {
      cy.softAssert(() =>
        expect($el).to.have.text(
          `means all data, messages, content, or attachments submitted by Customer or its users through SatuInbox Products.`
        )
      );
    });

    cy.term_definitions_6()
      .should("be.visible")
      .find("b")
      .should("have.text", `"Unavailable"`);
    cy.term_definitions_6().contains(
      `means a state in which SatuInbox core services are not accessible or functioning`
    );
    cy.term_definitions_7()
      .should("be.visible")
      .find("b")
      .should("have.text", `"Intellectual Property Rights"`);
    cy.term_definitions_7().then(($el) => {
      //includes Includes
      cy.softAssert(() =>
        expect($el).to.have.text(
          `"Intellectual Property Rights" includes copyrights, trademarks, trade secrets, patents, know-how, and all associated rights, worldwide.`
        )
      );
    });
    cy.term_definitions_8()
      .scrollIntoView()
      .should("be.visible")
      .find("b")
      .should("have.text", `"Order Form"`);
    cy.term_definitions_8().contains(
      `means the online or written form that specifies subscription details, fees, billing period, and scope of Products/Services purchased.`
    );
    cy.term_license().scrollIntoView().contains(`License`);
    cy.term_license()
      .find("p")
      .then(($el) => {
        cy.softAssert(() =>
          expect($el).to.have.text(
            `SatuInbox grants Customer a non-exclusive, non-transferable, limited license to access and use SatuInbox Products, subject to this Agreement. Customer may use the Products only for its internal business purposes, in accordance with applicable law.`
          )
        );
      });
    cy.term_license()
      .contains(`SatuInbox grants Customer`)
      .contains(`a non-exclusive, non-transferable, limited license`) //bold section
      .contains(
        `to access and use SatuInbox Products, subject to this Agreement. Customer may use the Products only for its internal business purposes, in accordance with applicable law.`
      );

    cy.term_customer().scrollIntoView().contains(`Customer Data`);
    const expectedTexts = [
      "Customer retains all ownership rights to Customer Data.",
      "Customer grants SatuInbox a limited right to process, transmit, and store Customer Data as necessary to provide the Products and Services.",
      "Customer acknowledges that Data may be transmitted across third-party networks and adapted to meet technical requirements.",
      "Personal Data within Customer Data is subject to the SatuInbox Privacy Policy.",
    ];
    cy.term_customer()
      .find("li")
      .each(($el, index) => {
        cy.wrap($el).should("include.text", expectedTexts[index]);
      });

    cy.term_use().scrollIntoView().contains(`Use of Trademarks`);
    const term_use_expectedTexts = [
      "Each Party shall comply with the other trademark use guidelines.", //other's or other Party's
      "SatuInbox may list Customer’s name and/or logo in promotional materials, unless Customer provides written objection.", // ada comma setelah materials
    ];
    //ada typo
    cy.term_use()
      .find("li")
      .each(($el, index) => {
        cy.softAssert(() =>
          expect($el).to.have.text(term_use_expectedTexts[index])
        );
      });

    cy.term_license_restrictions()
      .scrollIntoView()
      .contains(`License Restrictions`);
    const term_license_restrictions_expectedTexts = [
      // "Customer may not :",
      // "Sell, transfer, or sublicense SatuInbox Products.",
      "Customer may not sell, transfer, or sublicense SatuInbox Products.",
      // "modify, reverse engineer, decompile, or disassemble the Products.",
      "No modifying, reverse engineering, decompiling, or disassembling of the Products.",
      // "Copy the Products except for internal backup or training purposes.",
      "No copying except for internal training or backup purposes.",
      // "Use sandbox/test environments for commercial purposes.",
      "No commercial use of sandbox/test environments.",
      // "Use the Products in ways that violate law, infringe rights, or enable fraudulent or harmful activity.",
      "No unlawful, infringing, fraudulent, or harmful activity.",
    ];
    cy.term_license_restrictions()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.softAssert(() =>
          expect($el).to.have.text(
            term_license_restrictions_expectedTexts[index]
          )
        );
      });

    cy.term_availability()
      .scrollIntoView()
      .contains(`Availability & Service Levels`);
    const term_availability_expectedTexts = [
      "SatuInbox commits to 99% uptime, measured monthly.",
      // "Downtime caused by force majeure, scheduled maintenance, Customer-requested downtime, or third-party failures (collectively, “Exclusions”) will not count against uptime calculations.",
      // "Support is provided according to Customer’s subscription tier (basic email/chat support for standard users; premium SLA packages for enterprise customers).",
      // "Exclusions: force majeure, scheduled maintenance,

      //  Customer-requested downtime, or third-party failures.",//missing exclusion
      "Exclusions: force majeure, scheduled maintenance, Customer-requested downtime, or third-party failures.", //missing exclusion
      "Support according to tier: standard (email/chat) or enterprise SLA packages.",
    ];
    cy.term_availability()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.softAssert(() =>
          expect($el).to.have.text(term_availability_expectedTexts[index])
        );
      });

    cy.term_fees().scrollIntoView().contains(`Fees & Payment`);
    const term_fees_expectedTexts = [
      "Fees are based on MAU, packages, and add-ons as set out in the Order Form.",
      "Subscriptions billed monthly or annually; payment due per invoice terms.",
      "Late or missing payments may lead to suspension or termination.",
      "All fees are non-cancellable and non-refundable unless agreed otherwise in writing",
    ];
    cy.term_fees()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.softAssert(() =>
          expect($el).to.have.text(term_fees_expectedTexts[index])
        );
      });

    cy.term_prohibited()
      .scrollIntoView()
      .contains(`Prohibited Businesses & Content`);
    const term_prohibited_expectedTexts = [
      "SatuInbox does not support businesses engaging in illegal gambling, criminal/terrorist activities, weapons/illegal drugs, counterfeit or IP-infringing goods, adult content/pornography, or fraudulent financial activity. Violation may result in immediate termination and penalties.",
    ];
    cy.term_prohibited()
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.softAssert(() => {
          expect($el).to.have.text(term_prohibited_expectedTexts[index]);
        });
      });

    cy.term_term_termination().scrollIntoView().contains(`Term & Termination`);
    const term_term_termination_expectedTexts = [
      "Agreement starts on the Effective Date and continues month-to-month unless terminated.",
      "Either Party may terminate with 30 days’ written notice.",
      "Immediate suspension/termination for malicious or illegal use, non-payment beyond holding period, or threats to platform security/stability.",
      "Upon termination: outstanding fees are due; licenses expire; Services cease; data may be deleted per retention rules. No refunds for partial periods.",
    ];
    cy.term_term_termination()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.softAssert(() => {
          expect($el).to.have.text(term_term_termination_expectedTexts[index]);
        });
      });

    cy.term_confidentiality().scrollIntoView().contains(`Confidentiality`);
    const term_confidentiality_expectedTexts = [
      "Both Parties will keep Confidential Information strictly confidential, using it only as necessary to perform under this Agreement, and will return or destroy it upon request or termination, unless retention is required by law.",
    ];
    cy.term_confidentiality()
      .find("p")
      .each(($el, index) => {
        cy.softAssert(() => {
          expect($el).to.have.text(term_confidentiality_expectedTexts[index]);
        });
      });

    cy.term_indemnity()
      .scrollIntoView()
      .contains(`Indemnity & Limitation of Liability`);
    const term_indemnity_expectedTexts = [
      "Customer will indemnify SatuInbox for third-party claims arising from Customer’s use or breach.",
      "SatuInbox’s total liability is capped at subscription fees paid in the 12 months preceding the claim.",
      "No liability for indirect, incidental, special, or consequential damages.",
    ];
    cy.term_indemnity()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.softAssert(() => {
          expect($el).to.have.text(term_indemnity_expectedTexts[index]);
        });
      });

    cy.term_intellectual_property()
      .scrollIntoView()
      .contains(`Intellectual Property`);
    const term_intellectual_property_expectedTexts = [
      "SatuInbox retains all Intellectual Property Rights in and to the Products. No ownership rights are transferred to Customer by this Agreement; only the usage rights in Section 2 apply.",
    ];
    cy.term_intellectual_property()
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.softAssert(() => {
          expect($el).to.have.text(
            term_intellectual_property_expectedTexts[index]
          );
        });
      });

    cy.term_governing_law()
      .scrollIntoView()
      .contains(`Governing Law & Dispute Resolution`);
    const term_governing_law_expectedTexts = [
      "Governing law: Republic of Indonesia.", //typo "Law"
      "Parties will attempt amicable resolution within 30 days of notice.",
      "If unresolved, disputes are referred to BANI (Badan Arbitrase Nasional Indonesia) in Jakarta; decisions are final and binding.",
    ];
    cy.term_governing_law()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.softAssert(() => {
          expect($el).to.have.text(term_governing_law_expectedTexts[index]);
        });
      });

    cy.term_force().scrollIntoView().contains(`Force Majeure`);
    const term_force_expectedTexts = [
      "Neither Party is liable for failure or delay due to events beyond reasonable control, including natural disasters, war, terrorism, government actions, internet/power outages, or pandemics.",
    ];
    cy.term_force()
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.softAssert(() => {
          expect($el).to.have.text(term_force_expectedTexts[index]);
        });
      });

    cy.term_miscellaneous().scrollIntoView().contains(`Miscellaneous`);
    const term_miscellaneous_expectedTexts = [
      "Entire Agreement: These Terms plus any Order Forms constitute the entire understanding.",
      "Assignment: Customer may not assign without SatuInbox’s consent; SatuInbox may assign in corporate transactions.",
      "No Waiver: Failure to enforce is not a waiver of rights.",
    ];
    cy.term_miscellaneous()
      .scrollIntoView()
      .find("li")
      .each(($el, index) => {
        cy.softAssert(() => {
          expect($el).to.have.text(term_miscellaneous_expectedTexts[index]);
        });
      });

    cy.term_contact().scrollIntoView().contains(`Contact`);
    const term_contact_expectedTexts = ["Questions about these Terms?"];
    cy.term_contact()
      .scrollIntoView()
      .find("p")
      .each(($el, index) => {
        cy.wrap($el).should("include.text", term_contact_expectedTexts[index]);
      });
    const term_contact_expectedTexts2 = [
      // "Email: support@example.test", //email changed to icon
      // "Website: https://example.test", //website changed to icon
      "support@example.test",
      "https://example.test",
    ];
    cy.term_contact()
      .scrollIntoView()
      .find("a")
      .each(($el, index) => {
        cy.wrap($el).should("include.text", term_contact_expectedTexts2[index]);
      });
  });
});
