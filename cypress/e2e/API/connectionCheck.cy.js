// cypress/e2e/channelInstanceFlow.cy.js

import { env_config } from "../../support/01_url_page.js";
import channelAPIPage from "../../support/pages/channel_API.js";
import { tlcNames } from "../../support/data/tlcSAP.js";
import { tlcNamesComplain } from "../../support/data/tlcSAP.js";

describe("Account Channel Instance Flow", () => {
  let accessToken;
  const report = []; // ⭐ collect result - 1 baris per TLC
  const channelApiAction = new channelAPIPage();

  const baseUrl = Cypress.config("baseUrl");
  const loginType = Cypress.env("loginType");
  const config = env_config(baseUrl);

  // const usedTlc = tlcNames;
  const usedTlc = tlcNamesComplain;

  // ================= LOGIN =================
  before(() => {
    if (loginType !== "goddummyprod2") {
      throw new Error("Unsupported loginType");
    }

    cy.request({
      method: "POST",
      url: config.loginUrl,
      body: config.loginBody_goddummyprod2,
    }).then((res) => {
      accessToken = res.body.accessToken;
    });
  });

  // ================= MAIN FLOW =================
  it("Process all tlcNames", () => {
    cy.wrap(usedTlc)
      .each((tlc) => {
        cy.log(`Processing ${tlc}`);

        // Inisialisasi entry untuk TLC ini
        const reportEntry = {
          tlc,
          accountChannelStatus: "",
          whatsappWebStatus: "",
          instanceStatus: "",
          finalStatus: "",
          category: "", // Tambah kategori untuk filter
        };

        // ---- STEP 1 : GET ACCOUNT CHANNEL ----
        return cy
          .request({
            method: "GET",
            url: config.getAccountChannel,
            qs: { limit: 200, search: tlc },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            const idChannel = res.body.items?.[0]?.id;
            const accountChannelStatus = res.body.items?.[0]?.connectionStatus;

            // 🔴 CHECK IF ACCOUNT CHANNEL IS INACTIVE
            if (idChannel && accountChannelStatus === "inactive") {
              cy.log(`${tlc}: Account channel is inactive`);
              reportEntry.accountChannelStatus = "inactive";
              reportEntry.whatsappWebStatus = "not checked";
              reportEntry.instanceStatus = "skipped";
              reportEntry.finalStatus = "account channel inactive";
              reportEntry.category = "inactive_account";
              report.push(reportEntry);
              return; // Skip step selanjutnya, lanjut loop berikutnya
            }

            // FLOW 1: Account Channel Found and Active
            if (idChannel) {
              reportEntry.accountChannelStatus = "account paired (active)";

              // Check instance for FLOW 1
              return checkInstance(tlc, idChannel, reportEntry, "account");
            }
            // FLOW 2: Account Channel Not Found
            else {
              reportEntry.accountChannelStatus = "not found";

              // Try WhatsApp Web
              return cy
                .request({
                  method: "GET",
                  url: config.getWhatsappWeb,
                  qs: { limit: 200, search: tlc, platform: "whatsapp_web" },
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                })
                .then((whatsappRes) => {
                  const whatsappIdChannel = whatsappRes.body.items?.[0]?.id;

                  // WhatsApp Web Found
                  if (whatsappIdChannel) {
                    reportEntry.whatsappWebStatus = "found";

                    // Check instance for WhatsApp Web
                    return checkInstance(
                      tlc,
                      whatsappIdChannel,
                      reportEntry,
                      "whatsapp_only",
                    );
                  }
                  // WhatsApp Web Not Found
                  else {
                    reportEntry.whatsappWebStatus = "not found";
                    reportEntry.finalStatus = "whatsapp web not found!";
                    reportEntry.category = "not_found";
                    report.push(reportEntry);
                    return; // Exit, nothing more to do
                  }
                });
            }
          });
      })
      .then(() => {
        // ================= SUMMARY & FILTERS =================
        generateReportWithFilters();
      });

    // Helper function to check instance status
    function checkInstance(tlc, idChannel, reportEntry, source) {
      return cy
        .request({
          method: "GET",
          url: `${config.instance}${idChannel}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          failOnStatusCode: false,
        })
        .then((instanceRes) => {
          // ✅ INSTANCE EXISTS (200)
          if (instanceRes.status === 200) {
            reportEntry.instanceStatus = "already available";
            reportEntry.finalStatus = "instance already available";

            // Tentukan kategori berdasarkan source
            if (source === "account") {
              reportEntry.category = "success_paired";
            } else if (source === "whatsapp_only") {
              reportEntry.category = "whatsapp_only";
            }

            report.push(reportEntry);
            return;
          }

          // 🔧 INSTANCE MISSING (404 or 500) → re-init
          if (instanceRes.status === 404 || instanceRes.status === 500) {
            return cy
              .request({
                method: "POST",
                url: config.instance,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                body: {
                  id: idChannel,
                  force: true,
                },
              })
              .then((createRes) => {
                if (createRes.status === 200 || createRes.status === 201) {
                  reportEntry.instanceStatus = "re-init successfully";
                  reportEntry.finalStatus = "instance re-init successfully";

                  // Tentukan kategori berdasarkan source
                  if (source === "account") {
                    reportEntry.category = "success_paired";
                  } else if (source === "whatsapp_only") {
                    reportEntry.category = "whatsapp_only";
                  }
                } else {
                  reportEntry.instanceStatus = `re-init failed (${createRes.status})`;
                  reportEntry.finalStatus = `re-init failed (${createRes.status})`;
                  reportEntry.category = "error";
                }
                report.push(reportEntry);
              });
          }

          // ❗ Unexpected response
          reportEntry.instanceStatus = `unexpected status ${instanceRes.status}`;
          reportEntry.finalStatus = `unexpected status ${instanceRes.status}`;
          reportEntry.category = "error";
          report.push(reportEntry);
        });
    }

    // Helper function to generate report with filters
    function generateReportWithFilters() {
      cy.log("========== SUMMARY DENGAN 4 FILTER ==========");

      // Kategorikan data
      const successPaired = report.filter(
        (r) => r.category === "success_paired",
      );
      const whatsappOnly = report.filter((r) => r.category === "whatsapp_only");
      const notFound = report.filter((r) => r.category === "not_found");
      const inactiveAccount = report.filter(
        (r) => r.category === "inactive_account",
      );
      const errors = report.filter((r) => r.category === "error");

      const total = report.length;

      // Log ringkasan
      cy.log(`\n📊 RINGKASAN KATEGORI:`);
      cy.log(`1. SUCCESS PAIRED: ${successPaired.length} akun`);
      cy.log(`2. WHATSAPP ONLY (not paired): ${whatsappOnly.length} akun`);
      cy.log(`3. NOT FOUND (both): ${notFound.length} akun`);
      cy.log(`4. INACTIVE ACCOUNT: ${inactiveAccount.length} akun`);
      cy.log(`5. ERRORS: ${errors.length} akun`);
      cy.log(`TOTAL: ${total} akun`);

      // Tampilkan per kategori
      displayCategory("SUCCESS PAIRED", successPaired, "#2ecc71");
      displayCategory("WHATSAPP ONLY (not paired)", whatsappOnly, "#f39c12");
      displayCategory("NOT FOUND (both)", notFound, "#e74c3c");
      displayCategory("INACTIVE ACCOUNT", inactiveAccount, "#3498db");

      if (errors.length > 0) {
        displayCategory("ERRORS", errors, "#9b59b6");
      }

      // ⭐ Tabel di console browser
      console.table(report);

      // ===== Bangun HTML dengan Filter =====
      const html = buildHTMLReport(
        successPaired,
        whatsappOnly,
        notFound,
        inactiveAccount,
        errors,
        total,
      );

      // ===== Tulis file HTML =====
      const timestamp = new Date()
        .toISOString()
        .slice(0, 16)
        .replace(/[:T]/g, "-");
      cy.writeFile(`cypress/reports/chInstance${timestamp}.html`, html);

      // Juga tulis versi JSON untuk analisis lebih lanjut
      cy.writeFile(
        `cypress/reports/chInstanceJSon${timestamp}.json`,
        JSON.stringify(
          {
            success_paired: successPaired,
            whatsapp_only: whatsappOnly,
            not_found: notFound,
            inactive_account: inactiveAccount,
            errors: errors,
            summary: {
              total: total,
              success_paired: successPaired.length,
              whatsapp_only: whatsappOnly.length,
              not_found: notFound.length,
              inactive_account: inactiveAccount.length,
              errors: errors.length,
            },
          },
          null,
          2,
        ),
      );
    }

    // Helper untuk menampilkan kategori di console
    function displayCategory(categoryName, items, colorCode) {
      if (items.length === 0) return;

      cy.log(`\n🔍 ${categoryName} (${items.length}):`);
      items.forEach((r, index) => {
        const statusSymbol =
          r.instanceStatus === "already available"
            ? "✓"
            : r.instanceStatus === "re-init successfully"
              ? "🔄"
              : r.instanceStatus === "skipped"
                ? "⏭️"
                : r.instanceStatus.includes("failed")
                  ? "✗"
                  : "❓";
        cy.log(
          `  ${index + 1}. ${r.tlc.padEnd(25)} ${statusSymbol} ${r.finalStatus}`,
        );
      });
    }

    // Helper untuk membangun HTML report
    function buildHTMLReport(
      successPaired,
      whatsappOnly,
      notFound,
      inactiveAccount,
      errors,
      total,
    ) {
      // Fungsi untuk membuat tabel HTML dari data
      function createTableHTML(categoryData, categoryName, categoryColor) {
        if (categoryData.length === 0) {
          return `<div class="empty-category">
                    <h3>${categoryName}</h3>
                    <p>Tidak ada data</p>
                  </div>`;
        }

        const rows = categoryData
          .map((r, index) => {
            let statusBadge = "";
            let statusText = r.finalStatus;

            if (r.instanceStatus === "already available") {
              statusBadge = '<span class="badge-success">✓ Active</span>';
            } else if (r.instanceStatus === "re-init successfully") {
              statusBadge = '<span class="badge-success">🔄 Re-init</span>';
              statusText = "Instance re-init successfully";
            } else if (r.instanceStatus === "skipped") {
              statusBadge = '<span class="badge-skipped">⏭️ Skipped</span>';
              statusText = "Account channel is inactive";
            } else if (r.instanceStatus.includes("failed")) {
              statusBadge = '<span class="badge-error">✗ Failed</span>';
            } else if (r.finalStatus === "whatsapp web not found!") {
              statusBadge = '<span class="badge-error">❌ Not Found</span>';
            }

            return `
              <tr>
                <td class="number">${index + 1}</td>
                <td class="tlc-name">${r.tlc}</td>
                <td>
                  <div class="status-container">
                    ${statusBadge}
                    <span class="status-text">${statusText}</span>
                  </div>
                  <div class="details">
                    <small>Account: ${r.accountChannelStatus} | WhatsApp: ${r.whatsappWebStatus}</small>
                  </div>
                </td>
              </tr>
            `;
          })
          .join("");

        return `
          <div class="category-section" style="border-color: ${categoryColor}">
            <div class="category-header" style="background: ${categoryColor}20">
              <h3>${categoryName}</h3>
              <span class="count-badge" style="background: ${categoryColor}">${categoryData.length}</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th width="50">#</th>
                  <th>TLC Name</th>
                  <th>Status & Details</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        `;
      }

      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Channel Instance Report dengan 4 Filter</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              padding: 20px;
              margin: 0;
              background-color: #f8fafc;
              color: #333;
            }
            
            .container {
              max-width: 1400px;
              margin: 0 auto;
              background: white;
              padding: 30px;
              border-radius: 15px;
              box-shadow: 0 8px 30px rgba(0,0,0,0.08);
            }
            
            .header {
              text-align: center;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e2e8f0;
            }
            
            h1 {
              color: #2d3748;
              margin: 0;
              font-size: 32px;
            }
            
            .subtitle {
              color: #718096;
              font-size: 16px;
              margin-top: 10px;
            }
            
            .filter-tabs {
              display: flex;
              gap: 15px;
              margin-bottom: 30px;
              flex-wrap: wrap;
            }
            
            .filter-tab {
              padding: 12px 25px;
              border-radius: 8px;
              background: white;
              border: 2px solid #e2e8f0;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            
            .filter-tab:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .filter-tab.active {
              border-color: #4299e1;
              background: #4299e1;
              color: white;
            }
            
            .count-badge {
              padding: 4px 10px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              color: white;
            }
            
            .summary-cards {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
              gap: 15px;
              margin-bottom: 40px;
            }
            
            .summary-card {
              padding: 20px;
              border-radius: 12px;
              background: white;
              border: 1px solid #e2e8f0;
              text-align: center;
              transition: transform 0.3s;
            }
            
            .summary-card:hover {
              transform: translateY(-5px);
            }
            
            .card-success { border-top: 4px solid #38a169; }
            .card-warning { border-top: 4px solid #d69e2e; }
            .card-error { border-top: 4px solid #e53e3e; }
            .card-info { border-top: 4px solid #4299e1; }
            .card-inactive { border-top: 4px solid #3498db; }
            
            .card-value {
              font-size: 32px;
              font-weight: 800;
              margin: 10px 0;
            }
            
            .card-label {
              font-size: 13px;
              color: #718096;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 5px;
            }
            
            .category-section {
              margin-bottom: 40px;
              border: 2px solid;
              border-radius: 12px;
              overflow: hidden;
              display: none;
            }
            
            .category-section.active {
              display: block;
              animation: fadeIn 0.5s;
            }
            
            .category-header {
              padding: 20px 25px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .category-header h3 {
              margin: 0;
              font-size: 20px;
              color: #2d3748;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
            }
            
            th {
              background: #f7fafc;
              padding: 15px 20px;
              text-align: left;
              font-weight: 600;
              color: #4a5568;
              border-bottom: 2px solid #e2e8f0;
            }
            
            td {
              padding: 15px 20px;
              border-bottom: 1px solid #edf2f7;
            }
            
            tr:hover {
              background: #f7fafc;
            }
            
            .tlc-name {
              font-weight: 600;
              color: #2d3748;
            }
            
            .status-container {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 5px;
            }
            
            .badge-success, .badge-warning, .badge-error, .badge-skipped, .badge-notfound {
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
            }
            
            .badge-success { background: #c6f6d5; color: #22543d; }
            .badge-warning { background: #feebc8; color: #744210; }
            .badge-error { background: #fed7d7; color: #742a2a; }
            .badge-skipped { background: #dbeafe; color: #1e40af; }
            .badge-notfound { background: #f1f5f9; color: #475569; }
            
            .status-text {
              font-weight: 500;
              color: #4a5568;
            }
            
            .details small {
              color: #718096;
              font-size: 12px;
            }
            
            .number {
              font-weight: 600;
              color: #718096;
              text-align: center;
            }
            
            .empty-category {
              text-align: center;
              padding: 40px;
              background: #f7fafc;
              border-radius: 12px;
              color: #718096;
            }
            
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              color: #718096;
              font-size: 14px;
            }
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            @media (max-width: 768px) {
              .container {
                padding: 15px;
              }
              
              .summary-cards {
                grid-template-columns: repeat(2, 1fr);
              }
              
              .filter-tabs {
                overflow-x: auto;
                padding-bottom: 10px;
              }
              
              .filter-tab {
                white-space: nowrap;
              }
              
              th, td {
                padding: 10px 12px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Channel Instance Report</h1>
              <div class="subtitle">Filter berdasarkan kategori untuk analisis yang lebih mudah</div>
            </div>
            
            <div class="summary-cards">
              <div class="summary-card card-success">
                <div class="card-value">${successPaired.length}</div>
                <div class="card-label">Success Paired</div>
                <small>Aktif & terhubung</small>
              </div>
              <div class="summary-card card-warning">
                <div class="card-value">${whatsappOnly.length}</div>
                <div class="card-label">WhatsApp Only</div>
                <small>Aktif WhatsApp, tidak paired</small>
              </div>
              <div class="summary-card card-error">
                <div class="card-value">${notFound.length}</div>
                <div class="card-label">Not Found</div>
                <small>Tidak ditemukan</small>
              </div>
              <div class="summary-card card-inactive">
                <div class="card-value">${inactiveAccount.length}</div>
                <div class="card-label">Inactive Account</div>
                <small>Account channel inactive</small>
              </div>
              <div class="summary-card card-info">
                <div class="card-value">${total}</div>
                <div class="card-label">Total Akun</div>
                <small>Semua TLC diproses</small>
              </div>
            </div>
            
            <div class="filter-tabs" id="filterTabs">
              <div class="filter-tab active" data-filter="all">
                <span>Semua Data</span>
                <span class="count-badge" style="background: #4299e1">${total}</span>
              </div>
              <div class="filter-tab" data-filter="success">
                <span>Success Paired</span>
                <span class="count-badge" style="background: #38a169">${successPaired.length}</span>
              </div>
              <div class="filter-tab" data-filter="whatsapp">
                <span>WhatsApp Only</span>
                <span class="count-badge" style="background: #d69e2e">${whatsappOnly.length}</span>
              </div>
              <div class="filter-tab" data-filter="notfound">
                <span>Not Found</span>
                <span class="count-badge" style="background: #e53e3e">${notFound.length}</span>
              </div>
              <div class="filter-tab" data-filter="inactive">
                <span>Inactive Account</span>
                <span class="count-badge" style="background: #3498db">${inactiveAccount.length}</span>
              </div>
            </div>
            
            <!-- Success Paired Section -->
            ${createTableHTML(successPaired, "✅ SUCCESS PAIRED", "#38a169")}
            
            <!-- WhatsApp Only Section -->
            ${createTableHTML(whatsappOnly, "📱 WHATSAPP ONLY (not paired)", "#d69e2e")}
            
            <!-- Not Found Section -->
            ${createTableHTML(notFound, "❌ NOT FOUND (both)", "#e53e3e")}
            
            <!-- Inactive Account Section -->
            ${createTableHTML(inactiveAccount, "⏭️ INACTIVE ACCOUNT", "#3498db")}
            
            ${errors.length > 0 ? createTableHTML(errors, "⚠️ ERRORS", "#9b59b6") : ""}
            
            <div class="footer">
              Laporan dihasilkan pada ${new Date().toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })} • Total ${total} akun diproses
            </div>
          </div>
          
          <script>
            // JavaScript untuk filter tabs
            document.addEventListener('DOMContentLoaded', function() {
              const tabs = document.querySelectorAll('.filter-tab');
              const sections = document.querySelectorAll('.category-section');
              
              // Tampilkan semua data secara default
              sections.forEach(section => {
                if (!section.classList.contains('empty-category')) {
                  section.classList.add('active');
                }
              });
              
              tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                  // Update active tab
                  tabs.forEach(t => t.classList.remove('active'));
                  this.classList.add('active');
                  
                  const filter = this.getAttribute('data-filter');
                  
                  // Tampilkan/sembunyikan section berdasarkan filter
                  sections.forEach(section => {
                    section.classList.remove('active');
                    
                    if (filter === 'all') {
                      if (!section.classList.contains('empty-category')) {
                        section.classList.add('active');
                      }
                    } else if (filter === 'success') {
                      if (section.querySelector('h3')?.textContent.includes('SUCCESS PAIRED')) {
                        section.classList.add('active');
                      }
                    } else if (filter === 'whatsapp') {
                      if (section.querySelector('h3')?.textContent.includes('WHATSAPP ONLY')) {
                        section.classList.add('active');
                      }
                    } else if (filter === 'notfound') {
                      if (section.querySelector('h3')?.textContent.includes('NOT FOUND')) {
                        section.classList.add('active');
                      }
                    } else if (filter === 'inactive') {
                      if (section.querySelector('h3')?.textContent.includes('INACTIVE ACCOUNT')) {
                        section.classList.add('active');
                      }
                    }
                  });
                });
              });
            });
          </script>
        </body>
        </html>
      `;
    }
  });
});
