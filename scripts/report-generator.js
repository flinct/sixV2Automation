/**
 * HTML Report Generator for Socket.IO Load Test
 * Generates professional HTML reports similar to k6 format
 */

const fs = require('fs');
const path = require('path');

// Default report directory
const DEFAULT_REPORT_DIR = path.join(__dirname, 'report');

/**
 * Ensure report directory exists
 */
function ensureReportDir(reportDir = DEFAULT_REPORT_DIR) {
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  return reportDir;
}

/**
 * Generate HTML report in k6-style format
 * @param {Object} data - Test data and metrics
 * @param {string} outputFile - Output file path (optional, uses default if not provided)
 */
function generateHTMLReport(data, outputFile) {
  // Ensure report directory exists
  let finalOutputFile = outputFile;
  
  if (!finalOutputFile) {
    const reportDir = ensureReportDir(DEFAULT_REPORT_DIR);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    finalOutputFile = path.join(reportDir, `load-test-${timestamp}.html`);
  } else {
    // Ensure parent directory exists for custom path
    const parentDir = path.dirname(finalOutputFile);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
  }
  const {
    testId,
    startTime,
    endTime,
    duration,
    baseUrl,
    mode,
    targetConnections,
    machineHostname,
    machineIp,
    metrics,
    config,
  } = data;

  const status = metrics.connectErrors === 0 ? 'PASSED' : 'PASSED_WITH_ERRORS';
  const statusClass = metrics.connectErrors === 0 ? 'passed' : 'warning';
  const statusColor = metrics.connectErrors === 0 ? '#48bb78' : '#ed8936';

  const durationSec = Math.round((endTime - startTime) / 1000);
  const emitRate = Math.round(metrics.emits / durationSec);
  const successRate = Math.round((metrics.connected / metrics.created) * 100);

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Load Test Report - ${testId}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 2rem;
        color: #2d3748;
      }

      .container {
        max-width: 1400px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }

      header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        color: white;
      }

      header h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      header .subtitle {
        font-size: 1rem;
        opacity: 0.9;
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
      }

      header .subtitle span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .content {
        padding: 2rem;
      }

      .status-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 1rem;
      }

      .status-badge.passed {
        background: #c6f6d5;
        color: #22543d;
      }

      .status-badge.warning {
        background: #fed7d7;
        color: #742a2a;
      }

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 2rem 0 1rem 0;
        padding-bottom: 0.75rem;
        border-bottom: 2px solid #e2e8f0;
        color: #2d3748;
      }

      h3 {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 1.5rem 0 1rem 0;
        color: #4a5568;
      }

      /* Metrics Grid */
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin: 1.5rem 0;
      }

      .metric-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        border: 1px solid #e2e8f0;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .metric-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
      }

      .metric-card.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .metric-card.success {
        background: linear-gradient(135deg, #68d391 0%, #48bb78 100%);
        color: white;
      }

      .metric-card.warning {
        background: linear-gradient(135deg, #fbd38d 0%, #f6ad55 100%);
        color: #744210;
      }

      .metric-card.danger {
        background: linear-gradient(135deg, #fc8181 0%, #f56565 100%);
        color: white;
      }

      .metric-label {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        opacity: 0.9;
        margin-bottom: 0.5rem;
      }

      .metric-value {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1;
      }

      .metric-unit {
        font-size: 0.875rem;
        font-weight: 400;
        opacity: 0.8;
        margin-left: 0.5rem;
      }

      /* Tables */
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
      }

      thead {
        background: #f7fafc;
        border-bottom: 2px solid #e2e8f0;
      }

      thead th {
        padding: 1rem;
        text-align: left;
        font-weight: 600;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #4a5568;
      }

      tbody td {
        padding: 1rem;
        border-bottom: 1px solid #e2e8f0;
        font-size: 0.9rem;
      }

      tbody tr:hover {
        background: #f7fafc;
      }

      tbody tr:last-child td {
        border-bottom: none;
      }

      tbody td:first-child {
        font-weight: 500;
        color: #2d3748;
      }

      /* Stats Grid */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin: 1rem 0;
      }

      .stat-box {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        color: white;
        transition: transform 0.2s;
      }

      .stat-box:hover {
        transform: translateY(-4px);
      }

      .stat-box h4 {
        font-size: 0.875rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        opacity: 0.9;
        margin: 0 0 1rem 0;
      }

      .stat-row {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        font-size: 0.9rem;
      }

      .stat-label {
        opacity: 0.9;
      }

      .stat-value {
        font-weight: 700;
        font-size: 1.125rem;
      }

      /* Success/Failure coloring */
      .success {
        color: #38a169;
      }

      .warning {
        color: #d69e2e;
      }

      .danger {
        color: #e53e3e;
      }

      /* Footer */
      footer {
        padding: 2rem;
        border-top: 1px solid #e2e8f0;
        background: #f7fafc;
        text-align: center;
        color: #718096;
        font-size: 0.875rem;
      }

      footer a {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
      }

      footer a:hover {
        text-decoration: underline;
      }

      /* Responsive */
      @media (max-width: 768px) {
        body {
          padding: 1rem;
        }

        header {
          padding: 1.5rem;
        }

        header h1 {
          font-size: 1.5rem;
        }

        .content {
          padding: 1rem;
        }

        .metrics-grid {
          grid-template-columns: 1fr;
        }

        .stats-grid {
          grid-template-columns: 1fr;
        }

        table {
          font-size: 0.8rem;
        }

        thead th,
        tbody td {
          padding: 0.75rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>
          <i class="fas fa-chart-line"></i>
          Socket.IO Load Test Report
        </h1>
        <div class="subtitle">
          <span><strong>Test ID:</strong> ${testId}</span>
          <span><strong>Duration:</strong> ${durationSec} seconds</span>
          <span><strong>Mode:</strong> ${mode.toUpperCase()}</span>
          ${machineHostname ? `<span><strong>Machine:</strong> ${machineHostname}</span>` : ''}
          ${machineIp ? `<span><strong>IP:</strong> ${machineIp}</span>` : ''}
        </div>
      </header>

      <div class="content">
        <div class="status-badge ${statusClass}">
          <i class="fas fa-${metrics.connectErrors === 0 ? 'check-circle' : 'exclamation-circle'}"></i>
          ${status}
        </div>

        <h2>Test Metrics</h2>
        <div class="metrics-grid">
          <div class="metric-card primary">
            <div class="metric-label">Target Connections</div>
            <div class="metric-value">${metrics.created}</div>
          </div>
          <div class="metric-card success">
            <div class="metric-label">Connected</div>
            <div class="metric-value">${metrics.connected}</div>
            <small>${successRate}% success</small>
          </div>
          <div class="metric-card ${metrics.connectErrors === 0 ? 'success' : 'warning'}">
            <div class="metric-label">Connect Errors</div>
            <div class="metric-value">${metrics.connectErrors}</div>
          </div>
          <div class="metric-card primary">
            <div class="metric-label">Messages Sent</div>
            <div class="metric-value">${metrics.emits}</div>
            <small>${emitRate} msg/sec</small>
          </div>
          <div class="metric-card">
            <div class="metric-label">Disconnects</div>
            <div class="metric-value">${metrics.disconnects}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Conversations Created</div>
            <div class="metric-value">${metrics.conversationsCreated || metrics.preparedRooms || 0}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Prepare Errors</div>
            <div class="metric-value ${metrics.prepareErrors > 0 ? 'danger' : 'success'}">${metrics.prepareErrors}</div>
          </div>
          ${
            metrics.apiCalls
              ? `
          <div class="metric-card primary">
            <div class="metric-label">API Calls Tested</div>
            <div class="metric-value">${metrics.apiCalls}</div>
            <small>${metrics.apiSuccesses} successful</small>
          </div>
          <div class="metric-card ${metrics.apiErrors === 0 ? 'success' : 'warning'}">
            <div class="metric-label">API Avg Response Time</div>
            <div class="metric-value">${metrics.apiAvgTime}ms</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Account Channel</div>
            <div class="metric-value">${metrics.accountChannelAvgTime || 0}ms</div>
            <small>${metrics.accountChannelCalls || 0} calls</small>
          </div>
          <div class="metric-card">
            <div class="metric-label">Conversation</div>
            <div class="metric-value">${metrics.conversationAvgTime || 0}ms</div>
            <small>${metrics.conversationCalls || 0} calls</small>
          </div>
          <div class="metric-card">
            <div class="metric-label">Ticket</div>
            <div class="metric-value">${metrics.ticketAvgTime || 0}ms</div>
            <small>${metrics.ticketCalls || 0} calls</small>
          </div>
          `
              : ''
          }
        </div>

        <h2>Configuration</h2>
        <div class="stats-grid">
          <div class="stat-box">
            <h4>Test Settings</h4>
            <div class="stat-row">
              <span class="stat-label">Base URL</span>
              <span class="stat-value" style="font-size: 0.875rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${baseUrl}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Mode</span>
              <span class="stat-value" style="font-size: 1rem;">${mode.toUpperCase()}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Target VU</span>
              <span class="stat-value" style="font-size: 1.5rem;">${targetConnections}</span>
            </div>
          </div>

          <div class="stat-box">
            <h4>Timing</h4>
            <div class="stat-row">
              <span class="stat-label">Start</span>
              <span class="stat-value" style="font-size: 0.875rem;">${new Date(startTime).toLocaleString()}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">End</span>
              <span class="stat-value" style="font-size: 0.875rem;">${new Date(endTime).toLocaleString()}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Duration</span>
              <span class="stat-value" style="font-size: 1.5rem;">${durationSec}s</span>
            </div>
          </div>

          <div class="stat-box">
            <h4>Performance</h4>
            <div class="stat-row">
              <span class="stat-label">Emit Rate</span>
              <span class="stat-value" style="font-size: 1.5rem;">${emitRate}</span>
              <span style="opacity: 0.7; margin-left: 0.25rem;">msg/sec</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Success Rate</span>
              <span class="stat-value" style="font-size: 1.5rem;">${successRate}%</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Error Rate</span>
              <span class="stat-value" style="font-size: 1.5rem;">${100 - successRate}%</span>
            </div>
          </div>
        </div>

        <h2>Detailed Results</h2>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Created Clients</td>
              <td>${metrics.created}</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>Successfully Connected</td>
              <td>${metrics.connected}</td>
              <td><span class="${metrics.connected === metrics.created ? 'success' : 'warning'}">✓</span></td>
            </tr>
            <tr>
              <td>Connection Errors</td>
              <td>${metrics.connectErrors}</td>
              <td><span class="${metrics.connectErrors === 0 ? 'success' : 'danger'}">✓</span></td>
            </tr>
            <tr>
              <td>Disconnects</td>
              <td>${metrics.disconnects}</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>Total Messages Emitted</td>
              <td>${metrics.emits}</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>Emit Rate (msg/sec)</td>
              <td>${emitRate}</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>Expected Message Hits</td>
              <td>${metrics.expectHits}</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>Prepared Rooms</td>
              <td>${metrics.preparedRooms}</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>Prepare Errors</td>
              <td>${metrics.prepareErrors}</td>
              <td><span class="${metrics.prepareErrors === 0 ? 'success' : 'danger'}">✓</span></td>
            </tr>
            ${
              metrics.apiCalls
                ? `
            <tr style="background: #f7fafc; font-weight: 600;">
              <td colspan="3">API Testing Results</td>
            </tr>
            <tr>
              <td>Total API Calls</td>
              <td>${metrics.apiCalls}</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>API Successes</td>
              <td>${metrics.apiSuccesses}</td>
              <td><span class="${metrics.apiErrors === 0 ? 'success' : 'warning'}">✓</span></td>
            </tr>
            <tr>
              <td>API Errors</td>
              <td>${metrics.apiErrors}</td>
              <td><span class="${metrics.apiErrors === 0 ? 'success' : 'danger'}">✓</span></td>
            </tr>
            <tr>
              <td>API Avg Response Time</td>
              <td>${metrics.apiAvgTime}ms</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>&nbsp;&nbsp;→ Account Channel</td>
              <td>${metrics.accountChannelAvgTime || 0}ms (${metrics.accountChannelCalls || 0} calls)</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>&nbsp;&nbsp;→ Conversation</td>
              <td>${metrics.conversationAvgTime || 0}ms (${metrics.conversationCalls || 0} calls)</td>
              <td><span class="success">✓</span></td>
            </tr>
            <tr>
              <td>&nbsp;&nbsp;→ Ticket</td>
              <td>${metrics.ticketAvgTime || 0}ms (${metrics.ticketCalls || 0} calls)</td>
              <td><span class="success">✓</span></td>
            </tr>
            `
                : ''
            }
           </tbody>
         </table>

        ${
          metrics.endpointHits && metrics.endpointHits.length > 0
            ? `
        <h2>Endpoint Performance Details</h2>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
            <thead style="background: #f7fafc; font-weight: 600;">
              <tr>
                <th style="border: 1px solid #e2e8f0; padding: 0.75rem; text-align: left;">Endpoint</th>
                <th style="border: 1px solid #e2e8f0; padding: 0.75rem; text-align: center;">Status</th>
                <th style="border: 1px solid #e2e8f0; padding: 0.75rem; text-align: right;">Response Time (ms)</th>
                <th style="border: 1px solid #e2e8f0; padding: 0.75rem; text-align: center;">Success</th>
                <th style="border: 1px solid #e2e8f0; padding: 0.75rem; text-align: left;">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              ${metrics.endpointHits
                .slice(0, 100) // Show first 100 hits to avoid huge table
                .map((hit) => {
                  const statusColor =
                    hit.status === 200 || hit.status === 201 ? '#48bb78' : '#e53e3e';
                  return `
                <tr>
                  <td style="border: 1px solid #e2e8f0; padding: 0.75rem; font-family: monospace;">${hit.endpoint}</td>
                  <td style="border: 1px solid #e2e8f0; padding: 0.75rem; text-align: center; color: ${statusColor}; font-weight: 600;">${hit.status}</td>
                  <td style="border: 1px solid #e2e8f0; padding: 0.75rem; text-align: right; font-family: monospace;">${hit.responseTime}</td>
                  <td style="border: 1px solid #e2e8f0; padding: 0.75rem; text-align: center;">
                    <span class="${hit.success ? 'success' : 'danger'}">
                      ${hit.success ? '✓' : '✗'}
                    </span>
                  </td>
                  <td style="border: 1px solid #e2e8f0; padding: 0.75rem; font-size: 0.875rem; opacity: 0.8;">${new Date(hit.timestamp).toLocaleTimeString()}</td>
                </tr>
              `;
                })
                .join('')}
            </tbody>
          </table>
          ${
            metrics.endpointHits.length > 100
              ? `<p style="color: #718096; font-size: 0.875rem;">Showing first 100 of ${metrics.endpointHits.length} endpoint hits. <a href="#" style="color: #667eea;">View all</a></p>`
              : ''
          }
        </div>

        <h2>Endpoint Summary</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          ${[
            {
              name: 'Account Channel',
              hits: metrics.endpointHits.filter((h) => h.endpoint === 'account-channel'),
            },
            {
              name: 'Conversation',
              hits: metrics.endpointHits.filter((h) => h.endpoint === 'conversation'),
            },
            {
              name: 'Ticket',
              hits: metrics.endpointHits.filter((h) => h.endpoint === 'ticket'),
            },
          ]
            .map((endpoint) => {
              const successCount = endpoint.hits.filter((h) => h.success).length;
              const failCount = endpoint.hits.length - successCount;
              const avgTime =
                endpoint.hits.length > 0
                  ? Math.round(
                      endpoint.hits.reduce((sum, h) => sum + h.responseTime, 0) /
                        endpoint.hits.length,
                    )
                  : 0;
              const minTime =
                endpoint.hits.length > 0
                  ? Math.min(...endpoint.hits.map((h) => h.responseTime))
                  : 0;
              const maxTime =
                endpoint.hits.length > 0
                  ? Math.max(...endpoint.hits.map((h) => h.responseTime))
                  : 0;
              return `
          <div style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
            <h4 style="margin: 0 0 1rem 0; font-size: 1rem; font-weight: 600; color: #2d3748;">${endpoint.name}</h4>
            <div style="font-size: 0.875rem; color: #4a5568; line-height: 1.8;">
              <div><strong>Total Hits:</strong> ${endpoint.hits.length}</div>
              <div><strong style="color: #48bb78;">Success:</strong> ${successCount} (${endpoint.hits.length > 0 ? Math.round((successCount / endpoint.hits.length) * 100) : 0}%)</div>
              <div><strong style="color: #e53e3e;">Failed:</strong> ${failCount}</div>
              <div><strong>Avg Response:</strong> ${avgTime}ms</div>
              <div><strong>Min/Max:</strong> ${minTime}ms / ${maxTime}ms</div>
            </div>
          </div>
        `})
            .join('')}
        </div>
        `
            : ''
        }

        <h2>Summary</h2>
        <p>
          Load test completed on <strong>${new Date(endTime).toLocaleString()}</strong> on machine <strong>${machineHostname || 'unknown'}</strong> (IP: <strong>${machineIp || 'unknown'}</strong>).
          The test successfully created <strong>${metrics.created}</strong> client connections,
          with <strong>${metrics.connected}</strong> successfully connected (${successRate}% success rate).
          A total of <strong>${metrics.conversationsCreated || metrics.preparedRooms || 0}</strong> conversations were created.
          A total of <strong>${metrics.emits}</strong> messages were emitted at an average rate of
          <strong>${emitRate} messages per second</strong>.
          ${
            metrics.apiCalls
              ? `During the test, <strong>${metrics.apiCalls}</strong> API calls were made across 3 endpoints (Account Channel, Conversation, Ticket) with an average response time of <strong>${metrics.apiAvgTime}ms</strong>. <strong>${metrics.apiSuccesses}</strong> API calls succeeded and <strong>${metrics.apiErrors}</strong> failed.`
              : ''
          }
          ${metrics.connectErrors > 0 ? `<strong style="color: #e53e3e;">${metrics.connectErrors} connection errors</strong> were recorded.` : 'No connection errors were recorded.'}
        </p>
      </div>

      <footer>
        <p>
          Generated by <strong>Socket.IO Load Test</strong> | 
          <a href="https://socket.io/" target="_blank">Socket.IO</a> | 
          Report ID: ${testId}
        </p>
      </footer>
    </div>
  </body>
</html>`;

  fs.writeFileSync(finalOutputFile, html, 'utf8');
  console.log(`[REPORT] HTML report generated: ${finalOutputFile}`);
  return finalOutputFile;
}

module.exports = {
  generateHTMLReport,
  ensureReportDir,
  DEFAULT_REPORT_DIR,
};
