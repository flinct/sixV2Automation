# How to Run Load Test with Endpoint Report

## Problem

Endpoint report tidak muncul di HTML karena:
1. `API_TEST_USERNAME` dan `API_TEST_PASSWORD` tidak dipass
2. Login gagal, `accessToken` menjadi `null`
3. API testing skipped
4. `endpointHits` array tetap kosong
5. Endpoint report tidak ditampilkan

## Solution

### Pastikan Pass API Credentials:

```bash
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=password \
docker-compose up
```

**PENTING:** Pastikan credentials benar!

---

## Complete Command Examples

### 1. Full Test dengan API Endpoint Report

```bash
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation"

API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=yourpassword \
docker-compose up
```

### 2. Single Machine Test

```bash
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=yourpassword \
BASE_URL=https://dev-v2.satuinbox.com \
MODE=throughput \
TARGET_CONNECTIONS=50 \
node scripts/widget-socket-load-2.js
```

### 3. Debug Level (Lihat All Endpoint Hits)

```bash
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=yourpassword \
LOG_LEVEL=debug \
docker-compose up
```

Output:
```
[DEBUG] [client 1] account-channel: 200 (198ms)
[DEBUG] [client 1] conversation: 200 (245ms)
[DEBUG] [client 1] ticket: 200 (156ms)
```

---

## Verify Credentials Work

Test manually sebelum run full test:

```bash
curl -X POST https://dev-v2-api.satuinbox.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "yourpassword"
  }'
```

Success response:
```json
{
  "data": {
    "accessToken": "eyJhbGc..."
  }
}
```

---

## Expected HTML Report Sections

Ketika API credentials benar dan testing berjalan:

### 1. Test Metrics (ada API cards)
```
[✓] Target Connections: 50
[✓] Connected: 50
[✓] Conversations Created: 50
[✓] API Calls Tested: 1500
[✓] API Avg Response Time: 245ms
[✓] Account Channel: 198ms (500 calls)
[✓] Conversation: 245ms (500 calls)
[✓] Ticket: 292ms (500 calls)
```

### 2. Endpoint Performance Details (NEW!)
```
Table with first 100 endpoint hits:
| Endpoint          | Status | Response Time | Success | Timestamp |
|-------------------|--------|---------------|---------|-----------|
| account-channel   | 200    | 198ms         | ✓       | 10:15:23  |
| conversation      | 200    | 245ms         | ✓       | 10:15:24  |
| ticket            | 200    | 156ms         | ✓       | 10:15:24  |
| ... (97 more)     |        |               |         |           |
```

### 3. Endpoint Summary (NEW!)
```
Per-endpoint breakdown:

Account Channel
- Total Hits: 500
- Success: 495 (99%)
- Failed: 5
- Avg Response: 198ms
- Min/Max: 145ms / 350ms

Conversation
- Total Hits: 500
- Success: 498 (99.6%)
- Failed: 2
- Avg Response: 245ms
- Min/Max: 180ms / 500ms

Ticket
- Total Hits: 500
- Success: 492 (98.4%)
- Failed: 8
- Avg Response: 156ms
- Min/Max: 120ms / 280ms
```

---

## Checklist Before Running

- [ ] Has valid admin account?
  - Email: `admin@example.com`
  - Password: (your actual password)

- [ ] Test login manually?
  ```bash
  curl -X POST https://dev-v2-api.satuinbox.com/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@example.com","password":"password"}'
  ```
  - Expected: Response with `accessToken`

- [ ] Set environment variables?
  ```bash
  export API_TEST_USERNAME=admin@example.com
  export API_TEST_PASSWORD=yourpassword
  ```

- [ ] Run with env vars?
  ```bash
  API_TEST_USERNAME=admin@example.com \
  API_TEST_PASSWORD=password \
  docker-compose up
  ```

---

## Troubleshooting

### Issue: "API login failed or no accessToken returned"

**Solution:**
1. Verify email is correct
2. Verify password is correct
3. Test manually with curl
4. Check if API is accessible

```bash
# Test API accessibility
curl https://dev-v2-api.satuinbox.com/api/auth/login

# Test login
curl -X POST https://dev-v2-api.satuinbox.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"pass"}'
```

### Issue: Endpoint report tidak muncul di HTML

**Root Cause:** `accessToken` kosong

**Solutions:**
1. Pass API_TEST_USERNAME
2. Pass API_TEST_PASSWORD
3. Verify credentials benar
4. Check API server online

```bash
# Verify sebelum run
echo "Username: $API_TEST_USERNAME"
echo "Password: $API_TEST_PASSWORD"

# Run dengan explicit variables
API_TEST_USERNAME=admin@example.com \
API_TEST_PASSWORD=mypassword \
docker-compose up
```

### Issue: Connected = 0

Ini OK untuk test manual dengan 5 VUs jika ada delay di network. Endpoint report masih akan muncul jika API testing berjalan.

---

## Reports Location

```
scripts/report/load-test-2026-04-10T10-15-23.html
```

Open dengan browser untuk lihat:
- Test Metrics dengan API cards
- Endpoint Performance Details table
- Endpoint Summary cards

---

## Expected Metrics Per Machine (50 VUs, 5 min)

```
Socket.IO Metrics:
✓ Connections: 50
✓ Conversations: 50
✓ Messages: 7,500
✓ Rate: 25 msg/sec

API Endpoint Metrics:
✓ Total Calls: 1,500 (3 endpoints × 500 cycles)
✓ Success Rate: > 95%
✓ Account Channel: 500 calls @ 198ms avg
✓ Conversation: 500 calls @ 245ms avg
✓ Ticket: 500 calls @ 156ms avg
```

---

## Environment Variables Summary

**REQUIRED (untuk endpoint report):**
```bash
API_TEST_USERNAME=admin@example.com
API_TEST_PASSWORD=yourpassword
```

**OPTIONAL:**
```bash
BASE_URL=https://dev-v2.satuinbox.com
MODE=throughput
TARGET_CONNECTIONS=50
RUN_DURATION_MS=300000
LOG_LEVEL=info  # atau debug untuk lihat semua endpoint hits
PREPARE_MODE=perClient
```

---

## Complete Working Example

```bash
#!/bin/bash

# Set variables
export API_TEST_USERNAME="admin@example.com"
export API_TEST_PASSWORD="mypassword123"
export BASE_URL="https://dev-v2.satuinbox.com"
export MODE="throughput"
export TARGET_CONNECTIONS="50"
export RUN_DURATION_MS="300000"
export LOG_LEVEL="info"
export PREPARE_MODE="perClient"

# Verify
echo "Testing login..."
curl -s -X POST https://dev-v2-api.satuinbox.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$API_TEST_USERNAME\",\"password\":\"$API_TEST_PASSWORD\"}" | grep -q "accessToken" && \
  echo "✓ Login OK" || echo "✗ Login FAILED"

# Run test
cd /path/to/sixV2Automation
docker-compose up
```

---

## After Test Complete

1. **Check HTML Report:**
   ```bash
   ls -la scripts/report/
   open scripts/report/load-test-*.html
   ```

2. **Look for these sections:**
   - ✓ Test Metrics (dengan API cards)
   - ✓ Endpoint Performance Details (table)
   - ✓ Endpoint Summary (per-endpoint stats)

3. **Verify data:**
   - Status codes: 200/201 ✓
   - Response times: 100-500ms ✓
   - Success rates: >95% ✓

---

## Summary

1. Get valid API credentials
2. Test login manually
3. Pass `API_TEST_USERNAME` dan `API_TEST_PASSWORD`
4. Run: `API_TEST_USERNAME=... API_TEST_PASSWORD=... docker-compose up`
5. Check report untuk endpoint details

**Ready!** 🚀
