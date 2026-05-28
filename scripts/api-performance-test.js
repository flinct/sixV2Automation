#!/usr/bin/env node
/**
 * API Performance Testing Script
 * 
 * Tests 4 API endpoints:
 * 1. loginUrl - POST /api/auth/login
 * 2. getAccountChannel - GET /api/account-channel
 * 3. get_api_conversation - GET /api/conversation
 * 4. get_api_ticket - GET /api/ticket
 * 
 * Each VU (Virtual User) will:
 * - Login first to get accessToken
 * - Test all 4 endpoints with accessToken
 * - Record response time for each endpoint
 * - Report status code (200/201) and timing
 */

const http = require('http');
const https = require('https');
const url = require('url');

// Helper functions
function envStr(name, def) {
  const v = process.env[name];
  return v == null || v === '' ? def : String(v);
}

function envInt(name, def) {
  const v = process.env[name];
  if (v == null || v === '') return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Invalid number for ${name}: ${v}`);
  return n;
}

function makeLogger() {
  const level = (envStr('LOG_LEVEL', 'info') || 'info').toLowerCase();
  const levels = { silent: 0, error: 1, warn: 2, info: 3, debug: 4 };
  const cur = levels[level] ?? 3;

  const ts = () => new Date().toISOString();
  const fmt = (tag, args) => [`[${ts()}] ${tag}`, ...args];

  return {
    error: (...args) => cur >= 1 && console.error(...fmt('[ERROR]', args)),
    warn: (...args) => cur >= 2 && console.warn(...fmt('[WARN ]', args)),
    info: (...args) => cur >= 3 && console.log(...fmt('[INFO ]', args)),
    debug: (...args) => cur >= 4 && console.log(...fmt('[DEBUG]', args)),
  };
}

function getHttpModule(urlStr) {
  return urlStr.startsWith('https') ? https : http;
}

// HTTP request helper
async function makeRequest(urlStr, options = {}) {
  const client = getHttpModule(urlStr);
  
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const parsedUrl = new url.URL(urlStr);
    
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const req = client.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const responseTime = Date.now() - startTime;
        let jsonData = null;
        try {
          jsonData = JSON.parse(data);
        } catch {
          jsonData = data;
        }
        resolve({
          status: res.statusCode,
          data: jsonData,
          responseTime,
        });
      });
    });

    req.on('error', (err) => {
      reject({
        error: err.message,
        responseTime: Date.now() - startTime,
      });
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

// Get API base from BASE_URL
function apiBaseFromBaseUrl(baseUrl) {
  const apiBase = process.env.API_BASE || process.env.E2E_API_BASE;
  if (apiBase) return apiBase;
  if (!baseUrl) throw new Error('Missing BASE_URL or API_BASE');
  return `${baseUrl.replace(/\/+$/g, '')}/api/v1`;
}

function joinUrl(base, path) {
  if (!base.endsWith('/') && !path.startsWith('/')) return `${base}/${path}`;
  if (base.endsWith('/') && path.startsWith('/')) return `${base}${path.slice(1)}`;
  return `${base}${path}`;
}

async function testVirtualUser(vuId, apiBase, credentials) {
  const log = makeLogger();
  const results = {
    vuId,
    endpoints: {},
    errors: [],
  };

  try {
    // 1. LOGIN
    const loginUrl = joinUrl(apiBase, 'api/auth/login');
    log.debug(`VU${vuId}: Testing login...`);
    
    const loginRes = await makeRequest(loginUrl, {
      method: 'POST',
      body: credentials,
    });

    if (loginRes.status !== 200 && loginRes.status !== 201) {
      throw new Error(`Login failed: ${loginRes.status}`);
    }

    const accessToken = loginRes.data?.data?.accessToken || loginRes.data?.accessToken;
    if (!accessToken) {
      throw new Error('No accessToken in login response');
    }

    results.endpoints.login = {
      status: loginRes.status,
      responseTime: loginRes.responseTime,
      success: true,
    };

    const authHeader = { Authorization: `Bearer ${accessToken}` };

    // 2. GET ACCOUNT CHANNEL
    const accountChannelUrl = joinUrl(apiBase, 'api/account-channel');
    log.debug(`VU${vuId}: Testing account-channel...`);
    
    const acRes = await makeRequest(accountChannelUrl, {
      headers: authHeader,
    });

    results.endpoints.accountChannel = {
      status: acRes.status,
      responseTime: acRes.responseTime,
      success: acRes.status === 200 || acRes.status === 201,
    };

    // 3. GET CONVERSATION
    const conversationUrl = joinUrl(apiBase, 'api/conversation');
    log.debug(`VU${vuId}: Testing conversation...`);
    
    const convRes = await makeRequest(conversationUrl, {
      headers: authHeader,
    });

    results.endpoints.conversation = {
      status: convRes.status,
      responseTime: convRes.responseTime,
      success: convRes.status === 200 || convRes.status === 201,
    };

    // 4. GET TICKET
    const ticketUrl = joinUrl(apiBase, 'api/ticket');
    log.debug(`VU${vuId}: Testing ticket...`);
    
    const ticketRes = await makeRequest(ticketUrl, {
      headers: authHeader,
    });

    results.endpoints.ticket = {
      status: ticketRes.status,
      responseTime: ticketRes.responseTime,
      success: ticketRes.status === 200 || ticketRes.status === 201,
    };

    return results;
  } catch (err) {
    results.errors.push(err.message || String(err));
    return results;
  }
}

async function main() {
  const log = makeLogger();

  const baseUrl = process.env.BASE_URL || process.env.E2E_BASE_URL || 'https://app.example.test';
  const apiBase = apiBaseFromBaseUrl(baseUrl);

  const USERNAME = envStr('API_TEST_USERNAME', '');
  const PASSWORD = envStr('API_TEST_PASSWORD', '');
  const NUM_VUS = envInt('API_TEST_VUS', 5);

  if (!USERNAME || !PASSWORD) {
    throw new Error('Missing API_TEST_USERNAME or API_TEST_PASSWORD env vars');
  }

  log.info('Starting API Performance Test', {
    baseUrl,
    apiBase,
    numVUs: NUM_VUS,
  });

  const credentials = {
    email: USERNAME,
    password: PASSWORD,
  };

  const results = [];
  const startTime = Date.now();

  // Test all VUs in parallel
  const promises = [];
  for (let i = 1; i <= NUM_VUS; i++) {
    promises.push(testVirtualUser(i, apiBase, credentials));
  }

  const vuResults = await Promise.allSettled(promises);

  // Collect results
  for (const result of vuResults) {
    if (result.status === 'fulfilled') {
      results.push(result.value);
    } else {
      log.error('VU test failed:', result.reason);
      results.push({
        vuId: '?',
        endpoints: {},
        errors: [result.reason?.message || String(result.reason)],
      });
    }
  }

  const testDuration = Date.now() - startTime;

  // Aggregate results
  const summary = {
    totalVUs: NUM_VUS,
    duration: testDuration,
    endpoints: {
      login: { count: 0, success: 0, avgTime: 0, times: [] },
      accountChannel: { count: 0, success: 0, avgTime: 0, times: [] },
      conversation: { count: 0, success: 0, avgTime: 0, times: [] },
      ticket: { count: 0, success: 0, avgTime: 0, times: [] },
    },
    errors: [],
  };

  for (const vuResult of results) {
    for (const [endpoint, data] of Object.entries(vuResult.endpoints)) {
      if (summary.endpoints[endpoint]) {
        summary.endpoints[endpoint].count++;
        if (data.success) summary.endpoints[endpoint].success++;
        summary.endpoints[endpoint].times.push(data.responseTime);
      }
    }
    summary.errors.push(...vuResult.errors);
  }

  // Calculate averages
  for (const endpoint in summary.endpoints) {
    const data = summary.endpoints[endpoint];
    if (data.times.length > 0) {
      data.avgTime = Math.round(data.times.reduce((a, b) => a + b, 0) / data.times.length);
    }
    delete data.times; // Clean up
  }

  log.info('API Performance Test Complete', {
    duration: `${testDuration}ms`,
    endpoints: summary.endpoints,
    totalErrors: summary.errors.length,
  });

  if (summary.errors.length > 0) {
    log.warn('Errors encountered:');
    summary.errors.forEach((err, i) => {
      log.warn(`  ${i + 1}. ${err}`);
    });
  }

  // Output summary
  console.log('\n========== API PERFORMANCE TEST SUMMARY ==========');
  console.log(`Total VUs: ${NUM_VUS}`);
  console.log(`Total Duration: ${testDuration}ms\n`);

  for (const [endpoint, data] of Object.entries(summary.endpoints)) {
    console.log(`${endpoint}:`);
    console.log(`  Tests: ${data.count}, Success: ${data.success}, Avg Time: ${data.avgTime}ms`);
  }

  if (summary.errors.length > 0) {
    console.log(`\nTotal Errors: ${summary.errors.length}`);
  }
  console.log('==================================================\n');

  return summary;
}

main().catch((err) => {
  console.error('FAILED:', err?.message || err);
  process.exitCode = 1;
});
