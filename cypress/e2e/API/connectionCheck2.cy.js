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
          connectionStatus: "",
          initStatus: "",
          teamStatus: "",
          finalStatus: "",
          category: "",
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
            const connectionStatus = res.body.items?.[0]?.connectionStatus;
            const accountName = res.body.items?.[0]?.name || tlc;

            reportEntry.accountChannelStatus = idChannel
              ? "found"
              : "not found";
            reportEntry.connectionStatus = connectionStatus || "unknown";

            // FLOW 6: Account Channel Not Found
            if (!idChannel) {
              reportEntry.finalStatus = "no account channel";
              reportEntry.category = "not_found";
              report.push(reportEntry);
              return; // Exit, no account channel found
            }

            // FLOW 1: Account Channel Found but Inactive
            if (connectionStatus === "inactive") {
              reportEntry.finalStatus = "disconnected account";
              reportEntry.category = "disconnected";
              report.push(reportEntry);
              return; // Skip further checks for inactive accounts
            }

            // FLOW 2-5: Account Channel Found and Active
            // Check instance (init) status
            return cy
              .request({
                method: "GET",
                url: `${config.instance}${idChannel}`,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                failOnStatusCode: false,
              })
              .then((initRes) => {
                // FLOW 2-3: Instance (init) status is 200 (active)
                if (initRes.status === 200) {
                  reportEntry.initStatus = "active";
                  reportEntry.finalStatus = "account is active";

                  // Check team pairing
                  return checkTeamPairing(tlc, idChannel, reportEntry, false);
                }

                // FLOW 4-5: Instance (init) status is 400/500/404 (need re-init)
                if (
                  initRes.status === 400 ||
                  initRes.status === 500 ||
                  initRes.status === 404
                ) {
                  reportEntry.initStatus = "inactive";
                  reportEntry.finalStatus = "need re-init";

                  // Re-init the instance
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
                    .then((reinitRes) => {
                      if (
                        reinitRes.status === 200 ||
                        reinitRes.status === 201
                      ) {
                        reportEntry.initStatus = "re-init successfully";
                        reportEntry.finalStatus = "success re-init channel";

                        // Check team pairing after re-init
                        return checkTeamPairing(
                          tlc,
                          idChannel,
                          reportEntry,
                          true,
                        );
                      } else {
                        reportEntry.finalStatus = `re-init failed (${reinitRes.status})`;
                        reportEntry.category = "error";
                        report.push(reportEntry);
                        return;
                      }
                    });
                }

                // Unexpected init status
                reportEntry.finalStatus = `unexpected init status ${initRes.status}`;
                reportEntry.category = "error";
                report.push(reportEntry);
              });
          });
      })
      .then(() => {
        // ================= SUMMARY & FILTERS =================
        generateReportWithFilters();
      });

    // Helper function to check team pairing
    function checkTeamPairing(tlc, idChannel, reportEntry, isAfterReinit) {
      return cy
        .request({
          method: "GET",
          url: config.getTeam,
          qs: { search: tlc, limit: 200 },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          failOnStatusCode: false,
        })
        .then((teamRes) => {
          if (
            teamRes.status === 200 &&
            teamRes.body.items &&
            teamRes.body.items.length > 0
          ) {
            // Find team that has this account channel in accountChannels array
            const matchedTeam = teamRes.body.items.find((team) => {
              // Check if team has accountChannels array and find matching accountChannelId
              if (team.accountChannels && Array.isArray(team.accountChannels)) {
                return team.accountChannels.some(
                  (ac) => ac.accountChannelId === idChannel,
                );
              }
              return false;
            });

            if (matchedTeam) {
              reportEntry.teamStatus = "paired";
              reportEntry.teamName = matchedTeam.name || "N/A";
              if (isAfterReinit) {
                reportEntry.finalStatus =
                  "success re-init channel, team is paired";
              } else {
                reportEntry.finalStatus =
                  "account channel active, team is paired";
              }
              reportEntry.category = "success_paired";
            } else {
              reportEntry.teamStatus = "not paired";
              // Get first team name for reference (if exists)
              reportEntry.teamName = teamRes.body.items[0]?.name || "N/A";
              if (isAfterReinit) {
                reportEntry.finalStatus =
                  "success re-init channel, team not paired, need pairing";
              } else {
                reportEntry.finalStatus =
                  "account channel active, team not paired, need pairing";
              }
              reportEntry.category = "need_pairing";

              // Additional debug info: show what accountChannels are available
              if (teamRes.body.items[0]?.accountChannels) {
                const accountChannelIds =
                  teamRes.body.items[0].accountChannels.map(
                    (ac) => ac.accountChannelId,
                  );
                cy.log(
                  `DEBUG: Available accountChannelIds for team: ${accountChannelIds.join(", ")}`,
                );
                cy.log(`DEBUG: Looking for idChannel: ${idChannel}`);
              }
            }
          } else {
            reportEntry.teamStatus = "team not found";
            reportEntry.teamName = "N/A";
            if (isAfterReinit) {
              reportEntry.finalStatus =
                "success re-init channel, team not found";
            } else {
              reportEntry.finalStatus =
                "account channel active, team not found";
            }
            reportEntry.category = "team_not_found";
          }

          report.push(reportEntry);
        });
    }

    // Helper function to generate report with filters
    function generateReportWithFilters() {
      cy.log("========== SUMMARY DENGAN FILTER ==========");

      // Kategorikan data berdasarkan flow
      const successPaired = report.filter(
        (r) => r.category === "success_paired",
      );
      const needPairing = report.filter((r) => r.category === "need_pairing");
      const disconnected = report.filter((r) => r.category === "disconnected");
      const notFound = report.filter((r) => r.category === "not_found");
      const teamNotFound = report.filter(
        (r) => r.category === "team_not_found",
      );
      const errors = report.filter((r) => r.category === "error");

      const total = report.length;

      // Log ringkasan
      cy.log(`\n📊 RINGKASAN KATEGORI (BERDASARKAN FLOW):`);
      cy.log(`1. SUCCESS PAIRED: ${successPaired.length} akun`);
      cy.log(`2. NEED PAIRING: ${needPairing.length} akun`);
      cy.log(`3. DISCONNECTED: ${disconnected.length} akun`);
      cy.log(`4. NOT FOUND: ${notFound.length} akun`);
      cy.log(`5. TEAM NOT FOUND: ${teamNotFound.length} akun`);
      cy.log(`6. ERRORS: ${errors.length} akun`);
      cy.log(`TOTAL: ${total} akun`);

      // Tampilkan per kategori
      displayCategory("✅ SUCCESS PAIRED", successPaired, "#2ecc71");
      displayCategory("🔗 NEED PAIRING", needPairing, "#f39c12");
      displayCategory("🔌 DISCONNECTED", disconnected, "#e74c3c");
      displayCategory("❌ NOT FOUND", notFound, "#95a5a6");
      displayCategory("👥 TEAM NOT FOUND", teamNotFound, "#3498db");

      if (errors.length > 0) {
        displayCategory("⚠️ ERRORS", errors, "#9b59b6");
      }

      // ⭐ Tabel di console browser
      console.table(report);

      // ===== Bangun HTML dengan Filter =====
      const html = buildHTMLReport(
        successPaired,
        needPairing,
        disconnected,
        notFound,
        teamNotFound,
        errors,
        total,
      );

      // ===== Tulis file HTML =====
      const timestamp = new Date()
        .toISOString()
        .slice(0, 16)
        .replace(/[:T]/g, "-");
      cy.writeFile(`cypress/reports/chInstance-${timestamp}.html`, html);

      // Juga tulis versi JSON untuk analisis lebih lanjut
      cy.writeFile(
        `cypress/reports/chInstanceJson-${timestamp}.json`,
        JSON.stringify(
          {
            success_paired: successPaired,
            need_pairing: needPairing,
            disconnected: disconnected,
            not_found: notFound,
            team_not_found: teamNotFound,
            errors: errors,
            summary: {
              total: total,
              success_paired: successPaired.length,
              need_pairing: needPairing.length,
              disconnected: disconnected.length,
              not_found: notFound.length,
              team_not_found: teamNotFound.length,
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

      cy.log(`\n${categoryName} (${items.length}):`);
      items.forEach((r, index) => {
        const teamInfo =
          r.teamName && r.teamName !== "N/A" ? ` [Team: ${r.teamName}]` : "";
        cy.log(
          `  ${index + 1}. ${r.tlc.padEnd(25)} → ${r.finalStatus}${teamInfo}`,
        );
      });
    }

    // Helper untuk membangun HTML report
    function buildHTMLReport(
      successPaired,
      needPairing,
      disconnected,
      notFound,
      teamNotFound,
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
            let teamInfo = "";

            if (r.category === "success_paired") {
              statusBadge = '<span class="badge-success">✓ Paired</span>';
              teamInfo =
                r.teamName && r.teamName !== "N/A"
                  ? `<br><small style="color: #38a169">Team: ${r.teamName}</small>`
                  : "";
            } else if (r.category === "need_pairing") {
              statusBadge =
                '<span class="badge-warning">🔗 Need Pairing</span>';
              teamInfo =
                r.teamName && r.teamName !== "N/A"
                  ? `<br><small style="color: #d69e2e">Available Team: ${r.teamName}</small>`
                  : "";
            } else if (r.category === "disconnected") {
              statusBadge = '<span class="badge-error">🔌 Disconnected</span>';
            } else if (r.category === "not_found") {
              statusBadge = '<span class="badge-notfound">❌ Not Found</span>';
            } else if (r.category === "team_not_found") {
              statusBadge = '<span class="badge-info">👥 Team Not Found</span>';
            } else if (r.category === "error") {
              statusBadge = '<span class="badge-error">⚠️ Error</span>';
            }

            return `
              <tr>
                <td class="number">${index + 1}</td>
                <td class="tlc-name">${r.tlc}</td>
                <td>
                  <div class="status-container">
                    ${statusBadge}
                    <span class="status-text">${r.finalStatus}</span>
                  </div>
                  ${teamInfo}
                  <div class="details">
                    <small>Account: ${r.accountChannelStatus} | Connection: ${r.connectionStatus} | Init: ${r.initStatus} | Team: ${r.teamStatus}</small>
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
  <title>Channel Instance Flow Report</title>
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
      gap: 10px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }
    
    .filter-tab {
      padding: 10px 20px;
      border-radius: 8px;
      background: white;
      border: 2px solid #e2e8f0;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
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
      padding: 3px 8px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: bold;
      color: white;
    }
    
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px;
      margin-bottom: 30px;
    }
    
    .summary-card {
      padding: 18px;
      border-radius: 10px;
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
    .card-info { border-top: 4px solid #3498db; }
    .card-gray { border-top: 4px solid #95a5a6; }
    .card-purple { border-top: 4px solid #9b59b6; }
    
    .card-value {
      font-size: 28px;
      font-weight: 800;
      margin: 8px 0;
    }
    
    .card-label {
      font-size: 12px;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    
    .category-section {
      margin-bottom: 30px;
      border: 2px solid;
      border-radius: 10px;
      overflow: hidden;
      display: none;
    }
    
    .category-section.active {
      display: block;
      animation: fadeIn 0.5s;
    }
    
    .category-header {
      padding: 18px 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .category-header h3 {
      margin: 0;
      font-size: 18px;
      color: #2d3748;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th {
      background: #f7fafc;
      padding: 14px 18px;
      text-align: left;
      font-weight: 600;
      color: #4a5568;
      border-bottom: 2px solid #e2e8f0;
    }
    
    td {
      padding: 14px 18px;
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
    
    .badge-success, .badge-warning, .badge-error, .badge-notfound, .badge-info {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
    }
    
    .badge-success { background: #c6f6d5; color: #22543d; }
    .badge-warning { background: #feebc8; color: #744210; }
    .badge-error { background: #fed7d7; color: #742a2a; }
    .badge-notfound { background: #f1f5f9; color: #475569; }
    .badge-info { background: #dbeafe; color: #1e40af; }
    
    .status-text {
      font-weight: 500;
      color: #4a5568;
      font-size: 14px;
    }
    
    .details small {
      color: #718096;
      font-size: 11px;
      display: block;
      margin-top: 4px;
    }
    
    .number {
      font-weight: 600;
      color: #718096;
      text-align: center;
      width: 50px;
    }
    
    .empty-category {
      text-align: center;
      padding: 30px;
      background: #f7fafc;
      border-radius: 10px;
      color: #718096;
    }
    
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      color: #718096;
      font-size: 13px;
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
        padding: 8px 15px;
        font-size: 13px;
      }
      
      th, td {
        padding: 10px 12px;
      }
      
      .status-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
      }
    }
  </style>
</head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Channel Instance Flow Report</h1>
              <div class="subtitle">Laporan berdasarkan 6 flow check yang ditentukan</div>
            </div>
            
            <div class="summary-cards">
              <div class="summary-card card-success">
                <div class="card-value">${successPaired.length}</div>
                <div class="card-label">Success Paired</div>
                <small>Flow 2 & 4</small>
              </div>
              <div class="summary-card card-warning">
                <div class="card-value">${needPairing.length}</div>
                <div class="card-label">Need Pairing</div>
                <small>Flow 3 & 5</small>
              </div>
              <div class="summary-card card-error">
                <div class="card-value">${disconnected.length}</div>
                <div class="card-label">Disconnected</div>
                <small>Flow 1</small>
              </div>
              <div class="summary-card card-gray">
                <div class="card-value">${notFound.length}</div>
                <div class="card-label">Not Found</div>
                <small>Flow 6</small>
              </div>
              <div class="summary-card card-info">
                <div class="card-value">${teamNotFound.length}</div>
                <div class="card-label">Team Not Found</div>
                <small>Team check</small>
              </div>
              <div class="summary-card card-purple">
                <div class="card-value">${total}</div>
                <div class="card-label">Total</div>
                <small>Semua akun</small>
              </div>
            </div>
            
            <div class="filter-tabs" id="filterTabs">
              <div class="filter-tab active" data-filter="all">
                <span>Semua</span>
                <span class="count-badge" style="background: #4299e1">${total}</span>
              </div>
              <div class="filter-tab" data-filter="success">
                <span>Success Paired</span>
                <span class="count-badge" style="background: #38a169">${successPaired.length}</span>
              </div>
              <div class="filter-tab" data-filter="pairing">
                <span>Need Pairing</span>
                <span class="count-badge" style="background: #d69e2e">${needPairing.length}</span>
              </div>
              <div class="filter-tab" data-filter="disconnected">
                <span>Disconnected</span>
                <span class="count-badge" style="background: #e53e3e">${disconnected.length}</span>
              </div>
              <div class="filter-tab" data-filter="notfound">
                <span>Not Found</span>
                <span class="count-badge" style="background: #95a5a6">${notFound.length}</span>
              </div>
              <div class="filter-tab" data-filter="team">
                <span>Team Not Found</span>
                <span class="count-badge" style="background: #3498db">${teamNotFound.length}</span>
              </div>
            </div>
            
            <!-- Success Paired Section (Flow 2 & 4) -->
            ${createTableHTML(successPaired, "✅ SUCCESS PAIRED (Flow 2 & 4)", "#38a169")}
            
            <!-- Need Pairing Section (Flow 3 & 5) -->
            ${createTableHTML(needPairing, "🔗 NEED PAIRING (Flow 3 & 5)", "#d69e2e")}
            
            <!-- Disconnected Section (Flow 1) -->
            ${createTableHTML(disconnected, "🔌 DISCONNECTED (Flow 1)", "#e53e3e")}
            
            <!-- Not Found Section (Flow 6) -->
            ${createTableHTML(notFound, "❌ NOT FOUND (Flow 6)", "#95a5a6")}
            
            <!-- Team Not Found Section -->
            ${createTableHTML(teamNotFound, "👥 TEAM NOT FOUND", "#3498db")}
            
            ${errors.length > 0 ? createTableHTML(errors, "⚠️ ERRORS", "#9b59b6") : ""}
            
            <div class="footer">
              Laporan dihasilkan pada ${new Date().toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })} • Total ${total} akun diproses • Berdasarkan 6 flow check
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
                    } else if (filter === 'pairing') {
                      if (section.querySelector('h3')?.textContent.includes('NEED PAIRING')) {
                        section.classList.add('active');
                      }
                    } else if (filter === 'disconnected') {
                      if (section.querySelector('h3')?.textContent.includes('DISCONNECTED')) {
                        section.classList.add('active');
                      }
                    } else if (filter === 'notfound') {
                      if (section.querySelector('h3')?.textContent.includes('NOT FOUND')) {
                        section.classList.add('active');
                      }
                    } else if (filter === 'team') {
                      if (section.querySelector('h3')?.textContent.includes('TEAM NOT FOUND')) {
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
