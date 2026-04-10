# Quick Run - API Testing in Load Test Loop

## One Command - Full Test with API

```bash
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation"

API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=yourpassword \
docker-compose up
```

**What happens:**
1. All 6 machines start (sequential)
2. Each machine logs IP address
3. All 300 clients connect
4. 300 conversations created
5. Socket.IO messages emitted
6. **API endpoints tested every 10s per client** (NEW!)
7. HTML reports generated with API metrics

---

## Expected Output

### Machine Startup:
```
load-test-machine-1 | Hostname: load-test-1
load-test-machine-1 | Network Interfaces:
load-test-machine-1 |   Primary IP: 172.30.0.2
load-test-machine-1 | [INFO ] Attempting to login for API testing...
load-test-machine-1 | [INFO ] API login successful, accessToken obtained
```

### Progress (every 10 seconds):
```
[INFO ] progress {
  uptimeSec: 10,
  created: 50,
  connected: 50,
  emits: 42,
  apiCalls: 45,           ← NEW!
  apiSuccesses: 44,
  apiErrors: 1
}
```

### Final Results:
```
[INFO ] done {
  created: 50,
  connected: 50,
  emits: 7500,
  preparedRooms: 50,
  apiCalls: 1500,         ← 3 endpoints × 500 test cycles
  apiSuccesses: 1485,
  apiErrors: 15,
  apiAvgTime: 245         ← Average response time in ms
}
```

---

## HTML Report Now Shows

### Metrics:
- ✓ Created connections: 50
- ✓ Successfully connected: 50
- ✓ Conversations created: 50
- ✓ Messages sent: 7,500
- ✓ **API Calls Tested: 1,500** (NEW!)
- ✓ **API Avg Response Time: 245ms** (NEW!)
- ✓ **Account Channel: 198ms (500 calls)** (NEW!)
- ✓ **Conversation: 245ms (500 calls)** (NEW!)
- ✓ **Ticket: 292ms (500 calls)** (NEW!)

### Summary:
"During the test, **1500 API calls** were made across 3 endpoints (Account Channel, Conversation, Ticket) with an average response time of **245ms**. **1485 API calls succeeded** and **15 failed**."

---

## Configuration

### Credentials Required:
```bash
API_TEST_USERNAME=admin@example.com
API_TEST_PASSWORD=yourpassword
```

### Optional Env Vars:
```bash
BASE_URL=https://dev-v2.satuinbox.com        # (default)
MODE=throughput                               # (default)
TARGET_CONNECTIONS=50                         # per machine
RUN_DURATION_MS=300000                        # 5 minutes
LOG_LEVEL=info                                # or debug
PREPARE_MODE=perClient                        # (default)
```

---

## Example Full Command

```bash
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=mypassword123 \
BASE_URL=https://dev-v2.satuinbox.com \
MODE=throughput \
TARGET_CONNECTIONS=50 \
RUN_DURATION_MS=300000 \
LOG_LEVEL=info \
docker-compose up
```

---

## What Gets Tested (Per VU)

### Every 10 seconds:
1. `GET /api/account-channel` (with Bearer token)
2. `GET /api/conversation` (with Bearer token)
3. `GET /api/ticket` (with Bearer token)

### Measured:
- ✓ Response time (ms)
- ✓ Status code (200/201)
- ✓ Success/failure

### Per Machine (5 minutes):
```
API Test Frequency: Every 10 seconds
VUs per machine: 50
Test cycles: 30 (one per 10s interval)
Total API calls per endpoint: 50 × 30 = 1,500
Total API calls: 1,500 × 3 endpoints = 4,500
```

### Total (6 machines):
```
API Calls: 4,500 × 6 = 27,000
Duration: 5 minutes
Rate: 27,000 / 300 seconds = 90 calls/sec
```

---

## Verify It's Working

### Check Logs:
```bash
docker-compose logs | grep -i api
# Should see:
# - "API login successful"
# - "apiCalls" in progress logs
# - Final stats with apiCalls, apiSuccesses
```

### Check Reports:
```bash
ls -la scripts/report/load-test-*.html
# Open in browser
# Look for "API Calls Tested" card
# Look for per-endpoint metrics
```

---

## If Credentials Wrong

```
Log: "[WARN] API login failed or no accessToken returned"
Result: API testing skipped, Socket.IO continues normally
```

→ Just Socket.IO test runs, no API testing

---

## Stop/Cleanup

```bash
# Stop all containers
docker-compose down

# Stop + remove volumes
docker-compose down -v

# View logs after
docker-compose logs
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API login fails | Check email/password, test manually with curl |
| API response times too high | Check if server is overloaded, reduce TARGET_CONNECTIONS |
| No API metrics in report | Verify credentials provided, check logs for "API login" |
| Network errors | Check connectivity to dev-v2-api.satuinbox.com |

---

## Performance Baseline

### Expected Response Times:
```
Account Channel:  150-250ms average
Conversation:     200-350ms average
Ticket:           150-300ms average
Overall API Avg:  200-300ms average
```

### Expected Success Rate:
```
API Success: > 95% (1,425+ of 1,500 calls)
Socket.IO Success: > 98%
```

---

## Summary

✓ Run one command with API credentials
✓ All endpoints tested in main loop
✓ Response times tracked
✓ Results in HTML reports
✓ 27,000 API calls across 6 machines in 5 minutes

**Ready to go!** 🚀

```bash
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=password \
docker-compose up
```
