# API Performance Testing Guide

## Overview

This guide explains how to use the API Performance Testing script and how it integrates with the Socket.IO Load Testing infrastructure.

## Features

### 1. API Performance Script (`scripts/api-performance-test.js`)

Tests 4 critical API endpoints with multiple Virtual Users (VUs):

- **Login Endpoint**: `POST /api/auth/login`
- **Account Channel**: `GET /api/account-channel`
- **Conversation**: `GET /api/conversation`
- **Ticket**: `GET /api/ticket`

#### Flow:
1. Each VU authenticates with login credentials to get `accessToken`
2. Each VU tests remaining 3 endpoints using the token
3. Records response time and status code for each endpoint
4. Reports success/failure and response times

#### Usage:

```bash
# Run with 5 VUs
API_TEST_USERNAME=your@email.com \
API_TEST_PASSWORD=yourpassword \
API_TEST_VUS=5 \
BASE_URL=https://dev-v2.satuinbox.com \
node scripts/api-performance-test.js
```

#### Environment Variables:
- `API_TEST_USERNAME`: Email for login (required)
- `API_TEST_PASSWORD`: Password for login (required)
- `API_TEST_VUS`: Number of virtual users (default: 5)
- `BASE_URL`: API base URL (default: https://dev-v2.satuinbox.com)
- `LOG_LEVEL`: Log verbosity (default: info)

#### Output:
```
========== API PERFORMANCE TEST SUMMARY ==========
Total VUs: 5
Total Duration: 2345ms

login:
  Tests: 5, Success: 5, Avg Time: 245ms
accountChannel:
  Tests: 5, Success: 5, Avg Time: 156ms
conversation:
  Tests: 5, Success: 5, Avg Time: 234ms
ticket:
  Tests: 5, Success: 4, Avg Time: 189ms

Total Errors: 0
==================================================
```

---

### 2. Socket.IO Load Test Enhancements

#### Machine Information Logging
Each machine now logs:
- **Hostname**: Container name (e.g., `load-test-1`)
- **IP Address**: Primary network interface IP
- **Configuration**: All environment settings

#### Conversation Tracking
- Counts conversations created per machine
- Tracks preparation errors
- Reports in HTML output

#### Report Enhancements
The HTML report now includes:
- Machine hostname and IP address
- Number of conversations created
- Conversation creation errors
- Summary mentioning machine and conversation count

---

## Docker Setup

### Updated Files:
1. **Dockerfile**: Now includes `PREPARE_MODE=perClient` and uses entrypoint script
2. **docker-compose.yml**: 6 machines configured with `PREPARE_MODE: perClient`
3. **scripts/entrypoint.sh**: New startup script that logs IP and configuration

### Running Docker Compose:

```bash
# Build and start all machines
docker-compose up

# Background mode
docker-compose up -d

# View logs from specific machine
docker-compose logs load-test-machine-1

# View all logs
docker-compose logs -f
```

### Example Output:
```
==========================================
Load Test Machine Starting...
==========================================
Hostname: load-test-1
Container ID: load-test-machine-1

Network Interfaces:
  Primary IP: 172.30.0.2

Environment Configuration:
  BASE_URL: https://dev-v2.satuinbox.com
  MODE: throughput
  TARGET_CONNECTIONS: 50
  RUN_DURATION_MS: 300000
  EMIT_EVERY_MS: 200
  LOG_LEVEL: info
  PREPARE_MODE: perClient
  MAX_PREPARE_CONCURRENCY: 10

==========================================
Starting widget-socket-load-2.js...
==========================================

[2026-04-10T10:15:23.456Z] [INFO ] Starting widget-socket-load-2 {...}
...
```

---

## Machine Configuration

### 6 Machines Total:
```
machine1 → machine2 → machine3 → machine4 → machine5 → machine6
   |          |          |          |          |          |
  50 VUs    50 VUs     50 VUs     50 VUs     50 VUs     50 VUs
```

**Total Load**: 300 concurrent clients

### Per-Machine Settings:
- TARGET_CONNECTIONS: 50
- PREPARE_MODE: perClient (each VU gets own conversation)
- RUN_DURATION_MS: 300000 (5 minutes)
- EMIT_EVERY_MS: 200
- MAX_PREPARE_CONCURRENCY: 10

---

## HTML Reports

Each machine generates an HTML report with:
- Test ID and duration
- Machine hostname and IP address
- Metrics:
  - Created connections
  - Successfully connected
  - Connect errors
  - Messages sent
  - Messages per second rate
  - **Conversations created**
  - Preparation errors
- Configuration details
- Timing information
- Summary

### Report Location:
```
scripts/report/load-test-YYYY-MM-DDTHH-MM-SS.html
```

---

## API Endpoints Reference

From `cypress/support/01_url_page.js`:

```javascript
loginUrl: `/api/auth/login`                    // POST
getAccountChannel: `/api/account-channel`       // GET (requires auth)
get_api_conversation: `/api/conversation`       // GET (requires auth)
get_api_ticket: `/api/ticket`                   // GET (requires auth)
```

---

## Performance Metrics Expected

### Socket.IO Load Test (per machine, per 5 minutes):
- Messages sent: ~7,500 (50 VUs × 150 messages per VU)
- Message rate: 25 msg/sec
- Conversations created: 50
- Success rate: > 95%

### API Performance Test (5 VUs):
- Login: ~200-300ms average
- Account Channel: ~150-250ms average
- Conversation: ~200-350ms average
- Ticket: ~150-300ms average

---

## Troubleshooting

### No IP Shown in Logs
- Check network connectivity in container
- Verify bridge network is created: `docker network ls`

### Conversation Count is 0
- Check `PREPARE_MODE` is set to `perClient`
- Verify `AUTO_PREPARE` is enabled (default: true)
- Check logs for prepare errors

### API Test Fails
- Verify credentials are correct
- Check BASE_URL environment variable
- Ensure token-based auth works
- Verify all endpoints are accessible

---

## Next Steps

1. Run API performance test with your credentials
2. Monitor response times and success rates
3. Scale up VUs as needed
4. Analyze HTML reports from each machine
5. Aggregate results across all 6 machines

---

Generated: 2026-04-10
