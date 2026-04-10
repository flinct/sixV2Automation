# Quick API Performance Test Guide

## One-Command Testing

### 1. Socket.IO Load Test with 6 Machines

```bash
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation"
docker-compose up
```

**Result**: 
- 6 machines start sequentially (dependencies)
- Each machine creates 50 concurrent WebSocket connections
- Each machine creates 50 conversations (PREPARE_MODE=perClient)
- Each machine emits messages for 5 minutes
- HTML report generated in `scripts/report/` for each machine
- IP address and machine hostname logged for each

**What to expect in logs**:
```
load-test-machine-1 | ==========================================
load-test-machine-1 | Load Test Machine Starting...
load-test-machine-1 | ==========================================
load-test-machine-1 | Hostname: load-test-1
load-test-machine-1 | Network Interfaces:
load-test-machine-1 |   Primary IP: 172.30.0.2
load-test-machine-1 | ...
load-test-machine-1 | [INFO ] Starting widget-socket-load-2 {...}
load-test-machine-1 | [INFO ] progress { uptimeSec: 10, created: 50, connected: 50, ... conversationsCreated: 50 }
```

---

### 2. API Performance Test (Manual)

```bash
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation"

# With credentials
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=yourpassword \
API_TEST_VUS=10 \
BASE_URL=https://dev-v2.satuinbox.com \
node scripts/api-performance-test.js
```

**Result**:
```
========== API PERFORMANCE TEST SUMMARY ==========
Total VUs: 10
Total Duration: 3456ms

login:
  Tests: 10, Success: 10, Avg Time: 287ms
accountChannel:
  Tests: 10, Success: 10, Avg Time: 198ms
conversation:
  Tests: 10, Success: 10, Avg Time: 245ms
ticket:
  Tests: 10, Success: 10, Avg Time: 156ms

Total Errors: 0
==================================================
```

---

### 3. Docker Compose - Common Commands

```bash
# Start all machines in background
docker-compose up -d

# Stop all machines
docker-compose down

# View logs from all machines
docker-compose logs -f

# View logs from one machine
docker-compose logs -f load-test-machine-1

# Stop without removing containers
docker-compose stop

# Remove containers and volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Scale (not applicable here due to dependencies)
```

---

## Metrics Summary

### Per Machine (after 5 minutes):
| Metric | Value |
|--------|-------|
| Concurrent Connections | 50 |
| Conversations Created | 50 |
| Total Messages Sent | ~7,500 |
| Message Rate | 25 msg/sec |
| Preparation Concurrency | 10 |
| Success Rate (target) | > 95% |

### Total for 6 Machines:
| Metric | Value |
|--------|-------|
| Total Connections | 300 |
| Total Conversations | 300 |
| Total Messages | ~45,000 |
| Combined Duration | 5 minutes |

---

## Reports Location

After tests complete:

```
scripts/report/load-test-2026-04-10T10-15-23.html  ← machine 1
scripts/report/load-test-2026-04-10T10-15-27.html  ← machine 2
scripts/report/load-test-2026-04-10T10-15-31.html  ← machine 3
scripts/report/load-test-2026-04-10T10-15-35.html  ← machine 4
scripts/report/load-test-2026-04-10T10-15-39.html  ← machine 5
scripts/report/load-test-2026-04-10T10-15-43.html  ← machine 6
```

Each report contains:
- Machine hostname and IP
- Number of conversations created
- Message statistics
- Success/error rates
- Performance metrics

---

## API Endpoints Tested

1. **Login**: `POST /api/auth/login`
   - Authenticates user
   - Returns accessToken
   - No Auth Required

2. **Account Channel**: `GET /api/account-channel`
   - Lists team inboxes/channels
   - Auth: Bearer Token

3. **Conversation**: `GET /api/conversation`
   - Lists conversations
   - Auth: Bearer Token

4. **Ticket**: `GET /api/ticket`
   - Lists tickets
   - Auth: Bearer Token

---

## Expected Response Times

### API Endpoints (milliseconds):
```
Login:            200-400ms  (includes auth processing)
Account Channel:  100-300ms  (lightweight list)
Conversation:     200-500ms  (depends on data volume)
Ticket:           150-400ms  (depends on data volume)
```

### WebSocket Events (Socket.IO):
```
Connection:       < 5s (per client, CONNECT_TIMEOUT_MS=15000)
Message Emit:     < 50ms (local emit to server)
Message Rate:     25 msg/sec (with EMIT_EVERY_MS=200)
```

---

## Troubleshooting

### Issue: "Port already in use"
```bash
# Find and stop containers
docker-compose down
docker container prune
docker-compose up
```

### Issue: No IP address shown
```bash
# Check network
docker network ls
docker network inspect sixv2automation_load-test-network
```

### Issue: Conversations created = 0
```bash
# Verify settings
# Check env var: PREPARE_MODE=perClient
# Check AUTO_PREPARE=true (default)
# Check logs for prepare errors
docker-compose logs load-test-machine-1 | grep prepare
```

### Issue: API test fails
```bash
# Verify credentials
# Test manually:
curl -X POST https://dev-v2-api.satuinbox.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"pass"}'
```

---

## Performance Tips

1. **Increase VUs per machine**:
   - Edit docker-compose.yml
   - Change `TARGET_CONNECTIONS: 50` → `TARGET_CONNECTIONS: 100`

2. **Test API endpoints more intensively**:
   - Run: `API_TEST_VUS=50 node scripts/api-performance-test.js`

3. **Monitor system resources**:
   ```bash
   docker stats
   ```

4. **Analyze reports**:
   - Open HTML files in browser
   - Check success rates and response times
   - Compare across machines

---

## Files Created/Modified

### New Files:
- `scripts/api-performance-test.js` - API performance testing script
- `scripts/entrypoint.sh` - Container startup script with IP logging
- `API_PERFORMANCE_TEST_GUIDE.md` - Detailed guide
- `QUICK_API_TEST_GUIDE.md` - This file

### Modified Files:
- `Dockerfile` - Added PREPARE_MODE env var and entrypoint
- `docker-compose.yml` - Added machines 4, 5, 6 with PREPARE_MODE
- `scripts/widget-socket-load-2.js` - Added machine hostname/IP tracking
- `scripts/report-generator.js` - Added conversation count and machine info to HTML

---

**Ready to test!** 🚀

```bash
docker-compose up
```
