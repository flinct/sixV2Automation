# API Testing Integration into Socket.IO Load Test Loop

## Overview

API endpoints are now tested **inside the main throughput loop** of `widget-socket-load-2.js`. Each Virtual User (VU) will:

1. Emit Socket.IO messages (existing behavior)
2. **Test 3 API endpoints periodically** (new behavior)

---

## How It Works

### Flow per Client:

```
Main Loop (every EMIT_EVERY_MS = 200ms):
├─ Emit Socket.IO message
├─ Check if time for API test
└─ If 10 seconds elapsed:
   ├─ GET /api/account-channel (with Bearer token)
   ├─ GET /api/conversation (with Bearer token)
   ├─ GET /api/ticket (with Bearer token)
   └─ Record response times & status codes
```

### API Test Interval:

- **Per Client**: Every 10 seconds (configurable)
- **Total per 5 minutes**: ~30 API test cycles per client
- **Example with 50 VUs**: ~1,500 total API test executions

---

## Implementation Details

### Step 1: Login & Get AccessToken (Before Ramp-Up)

```javascript
// If credentials provided via env vars:
const apiUsername = process.env.API_TEST_USERNAME;
const apiPassword = process.env.API_TEST_PASSWORD;

// Make login call to: POST /api/auth/login
// Extract: accessToken from response
// Pass to all clients
```

### Step 2: New `testApiEndpoints()` Function

```javascript
async function testApiEndpoints({
  apiBase,
  accessToken,
}) {
  // Tests 3 endpoints with Bearer token auth
  // Records response time & status for each
  // Returns: { accountChannel, conversation, ticket }
}
```

### Step 3: Updated LoadClient Stats

Added tracking for:
- `apiCalls`: Total API calls made
- `apiSuccesses`: Successful calls (200/201)
- `apiErrors`: Failed calls
- `apiTotalTime`: Total response time
- Per-endpoint tracking:
  - `accountChannelCalls`, `accountChannelTime`
  - `conversationCalls`, `conversationTime`
  - `ticketCalls`, `ticketTime`

### Step 4: Main Loop Integration

```javascript
// In client loop (every EMIT_EVERY_MS):
while (!stop) {
  // 1. Emit socket message
  c.emit(EMIT_EVENT, payload);

  // 2. Every 10 seconds, test API
  if (accessToken && elapsed >= 10000) {
    const apiResults = await testApiEndpoints({
      apiBase,
      accessToken,
    });
    // Track results in client stats
  }

  await sleep(EMIT_EVERY_MS);
}
```

---

## Configuration

### Required Environment Variables:

```bash
API_TEST_USERNAME=admin@example.com
API_TEST_PASSWORD=yourpassword
```

### Optional:

- `API_TEST_INTERVAL_MS`: How often per client to test APIs (default: 10000ms)

### Example:

```bash
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=password123 \
BASE_URL=https://dev-v2.satuinbox.com \
MODE=throughput \
TARGET_CONNECTIONS=50 \
docker-compose up
```

---

## Endpoints Tested

Each cycle tests 3 endpoints:

| Endpoint | Method | Auth | Expected |
|----------|--------|------|----------|
| `/api/account-channel` | GET | Bearer Token | 200/201 |
| `/api/conversation` | GET | Bearer Token | 200/201 |
| `/api/ticket` | GET | Bearer Token | 200/201 |

---

## Metrics Reported

### In Logs:

```
[INFO ] done {
  ...socketMetrics,
  apiCalls: 1500,              // Total API endpoint calls
  apiSuccesses: 1485,          // Successful calls
  apiErrors: 15,               // Failed calls
  apiAvgTime: 245              // Avg response time in ms
}
```

### In HTML Report:

**Metrics Grid (New Cards):**
- API Calls Tested: 1500
- API Avg Response Time: 245ms
- Account Channel: 198ms (500 calls)
- Conversation: 245ms (500 calls)
- Ticket: 292ms (500 calls)

**Summary Section:**
- Mentions API testing
- Reports total API calls and success rate
- Shows average response times

**Detailed Table:**
- API Testing Results section
- Per-endpoint breakdown
- Success/error status

---

## Example Results (6 Machines × 5 Minutes)

### Per Machine:
- Socket.IO Messages: 7,500 (50 VUs × 150 msgs each)
- API Cycles: 30 per client = 1,500 total
- API Calls: 4,500 (1,500 cycles × 3 endpoints)
- Account Channel: 1,500 calls @ 198ms avg
- Conversation: 1,500 calls @ 245ms avg
- Ticket: 1,500 calls @ 292ms avg

### Total (6 Machines):
- Socket.IO Messages: 45,000
- API Calls: 27,000
- Account Channel Avg: 198ms
- Conversation Avg: 245ms
- Ticket Avg: 292ms

---

## Response Time Tracking

### What's Measured:

```javascript
const startTime = Date.now();
const res = await fetch(url, { headers });
const responseTime = Date.now() - startTime;
```

- **Measured**: From request sent to response received
- **Includes**: Network latency + server processing time
- **Unit**: Milliseconds (ms)
- **Tracked per**: Client + Endpoint type
- **Aggregated**: Average across all VUs and cycles

### Calculation:

```
Average = Total Response Time / Number of Calls

Example:
Account Channel: 9,900ms total / 50 calls = 198ms average
```

---

## Error Handling

### If Login Fails:

```
Log: "API login failed or no accessToken returned"
Result: API testing skipped, Socket.IO testing continues
```

### If API Endpoint Fails:

```
- Recorded as apiError
- Stats incremented but test continues
- Next cycle retries
```

### If Network Error:

```
- Caught and logged
- Counted as apiError
- Test continues
```

---

## Running the Test

### Option 1: Docker Compose (All 6 Machines)

```bash
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation"

# With API testing
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=password \
docker-compose up
```

### Option 2: Single Machine (Manual)

```bash
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=password \
BASE_URL=https://dev-v2.satuinbox.com \
MODE=throughput \
TARGET_CONNECTIONS=50 \
node scripts/widget-socket-load-2.js
```

---

## Output Examples

### Console Logs:

```
[INFO ] Attempting to login for API testing...
[INFO ] API login successful, accessToken obtained
[INFO ] Starting widget-socket-load-2 {...}
[INFO ] progress {
  uptimeSec: 10,
  created: 50,
  connected: 50,
  apiCalls: 45,           ← API test results
  apiSuccesses: 44,
  apiErrors: 1
}
...
[INFO ] done {
  created: 50,
  connected: 50,
  emits: 7500,
  apiCalls: 1500,
  apiSuccesses: 1485,
  apiErrors: 15,
  apiAvgTime: 245
}
```

### HTML Report:

```html
<!-- Metrics Grid -->
<div class="metric-card">
  <div class="metric-label">API Calls Tested</div>
  <div class="metric-value">1500</div>
  <small>1485 successful</small>
</div>

<div class="metric-card">
  <div class="metric-label">API Avg Response Time</div>
  <div class="metric-value">245ms</div>
</div>

<!-- Per-Endpoint Cards -->
<div class="metric-card">
  <div class="metric-label">Account Channel</div>
  <div class="metric-value">198ms</div>
  <small>500 calls</small>
</div>
```

---

## Performance Impact

### Socket.IO Throughput:

- **Minimal impact**: API testing happens every 10 seconds per client
- **Emit frequency**: Every 200ms (50 emits per 10 seconds)
- **During API test**: Brief pause, then continues

### Resource Usage:

- **Network**: ~27,000 API calls over 5 min = ~90 calls/sec
- **CPU**: Minimal (async/await handling)
- **Memory**: No additional memory overhead

---

## Troubleshooting

### Issue: "API login failed"

```bash
# Solution: Verify credentials
curl -X POST https://dev-v2-api.satuinbox.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"pass"}'
```

### Issue: API calls all failing

```bash
# Check: Is endpoint accessible?
curl -H "Authorization: Bearer TOKEN" \
  https://dev-v2-api.satuinbox.com/api/account-channel

# Check: Token validity
# Check: Network connectivity
```

### Issue: API response times too high

```
- Check server load
- Check network latency: ping api.satuinbox.com
- Reduce TARGET_CONNECTIONS if overwhelming server
- Check API server logs
```

---

## Modifications Summary

### Files Changed:

1. **`scripts/widget-socket-load-2.js`** (1019 lines)
   - Added `testApiEndpoints()` function
   - Updated LoadClient class for API tracking
   - Added login logic before ramp-up
   - Integrated API testing in main loop
   - Updated stats aggregation
   - Updated report generation

2. **`scripts/report-generator.js`**
   - Added API metrics cards to metrics grid
   - Added API data to detailed table
   - Updated summary paragraph with API info
   - Conditional rendering (only if API testing enabled)

---

## Next Steps

1. **Run with API testing enabled:**
   ```bash
   API_TEST_USERNAME=your@email.com \
   API_TEST_PASSWORD=password \
   docker-compose up
   ```

2. **Review HTML reports:**
   - Open `scripts/report/load-test-*.html`
   - Check API metrics section
   - Verify response times

3. **Analyze results:**
   - Compare API response times across machines
   - Identify bottleneck endpoints
   - Check success rate

4. **Iterate:**
   - Adjust TARGET_CONNECTIONS if needed
   - Modify API_TEST_INTERVAL_MS for different frequencies
   - Add additional endpoints if needed

---

## Summary

✓ API endpoints integrated into Socket.IO load test loop
✓ Each VU tests 3 endpoints every 10 seconds
✓ Response times recorded and tracked
✓ Status codes validated (200/201)
✓ Metrics aggregated and reported
✓ HTML reports show detailed API performance

**Ready for production API performance testing!** 🚀
