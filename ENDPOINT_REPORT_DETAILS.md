# Endpoint Report Details

## Overview

Setiap endpoint yang di-hit akan dicatat dengan detail:
- Status code (200/201 atau error)
- Response time (milliseconds)
- Timestamp
- Success/failure indicator

---

## What's Logged Per Endpoint Hit

### Console Debug Logs:

```
[DEBUG] [client 1] account-channel: 200 (198ms)
[DEBUG] [client 1] conversation: 200 (245ms)
[DEBUG] [client 1] ticket: 200 (156ms)
```

### Data Tracked:

```javascript
{
  endpoint: "account-channel",
  status: 200,
  responseTime: 198,
  success: true,
  timestamp: "2026-04-10T10:15:23.456Z"
}
```

---

## HTML Report Sections

### 1. Endpoint Performance Details Table

**Shows first 100 hits with:**
- Endpoint name (account-channel, conversation, ticket)
- HTTP Status code (200, 201, etc.)
- Response time in milliseconds
- Success indicator (✓ or ✗)
- Timestamp (HH:MM:SS)

**Example:**

| Endpoint | Status | Response Time (ms) | Success | Timestamp |
|----------|--------|-------------------|---------|-----------|
| account-channel | 200 | 198 | ✓ | 10:15:23 |
| conversation | 200 | 245 | ✓ | 10:15:24 |
| ticket | 200 | 156 | ✓ | 10:15:24 |
| account-channel | 200 | 205 | ✓ | 10:15:34 |
| ... | ... | ... | ... | ... |

### 2. Endpoint Summary Cards

Per-endpoint breakdown showing:

**Account Channel:**
- Total Hits: 500
- Success: 495 (99%)
- Failed: 5
- Avg Response: 198ms
- Min/Max: 145ms / 350ms

**Conversation:**
- Total Hits: 500
- Success: 498 (99.6%)
- Failed: 2
- Avg Response: 245ms
- Min/Max: 180ms / 500ms

**Ticket:**
- Total Hits: 500
- Success: 492 (98.4%)
- Failed: 8
- Avg Response: 156ms
- Min/Max: 120ms / 280ms

---

## Per Client Tracking

### Data Collected:

Each client tracks all endpoint hits in `stats.endpointHits` array:

```javascript
c.stats.endpointHits = [
  { endpoint: "account-channel", status: 200, responseTime: 198, success: true, timestamp: "..." },
  { endpoint: "conversation", status: 200, responseTime: 245, success: true, timestamp: "..." },
  { endpoint: "ticket", status: 200, responseTime: 156, success: true, timestamp: "..." },
  // ... more hits
]
```

### Aggregation:

All endpoint hits from all clients collected into single array:

```javascript
allEndpointHits = []
for each client:
  allEndpointHits.push(...client.stats.endpointHits)
```

---

## Filtering & Analysis

### By Endpoint:

```javascript
const accountChannelHits = allEndpointHits.filter(h => h.endpoint === 'account-channel');
const conversationHits = allEndpointHits.filter(h => h.endpoint === 'conversation');
const ticketHits = allEndpointHits.filter(h => h.endpoint === 'ticket');
```

### By Status:

```javascript
const successHits = hits.filter(h => h.success);
const failureHits = hits.filter(h => !h.success);
```

### By Response Time:

```javascript
const avgTime = Math.round(
  hits.reduce((sum, h) => sum + h.responseTime, 0) / hits.length
);
const minTime = Math.min(...hits.map(h => h.responseTime));
const maxTime = Math.max(...hits.map(h => h.responseTime));
```

---

## Console Output Example

### Debug Level:

```
[DEBUG] [client 1] account-channel: 200 (198ms)
[DEBUG] [client 1] conversation: 200 (245ms)
[DEBUG] [client 1] ticket: 200 (156ms)
[DEBUG] [client 2] account-channel: 200 (205ms)
[DEBUG] [client 2] conversation: 200 (252ms)
[DEBUG] [client 2] ticket: 200 (159ms)
...
```

### Info Level:

```
[INFO ] progress {
  uptimeSec: 10,
  created: 50,
  connected: 50,
  emits: 42,
  apiCalls: 45,
  apiSuccesses: 44,
  apiErrors: 1
}
```

---

## Expected Statistics

### Per Machine (50 VUs, 5 minutes, 10s interval):

**Total Endpoint Hits:** 1,500 (50 VUs × 30 cycles)

Breaking down:
- **Account Channel:** 500 hits
  - Success: ~495 (99%)
  - Avg Response: 150-250ms

- **Conversation:** 500 hits
  - Success: ~498 (99.6%)
  - Avg Response: 200-350ms

- **Ticket:** 500 hits
  - Success: ~492 (98.4%)
  - Avg Response: 150-300ms

---

## HTTP Status Validation

Each endpoint must return:
- ✓ 200 OK - Request successful
- ✓ 201 Created - Resource created
- ✗ Any other status = Failure

### Tracked Status Codes:

```
200: Success
201: Success (resource created)
400: Bad request
401: Unauthorized
403: Forbidden
404: Not found
500: Server error
503: Service unavailable
```

---

## Response Time Metrics

### Per Endpoint Hit:

- **Measured:** From request sent → response received
- **Unit:** Milliseconds (ms)
- **Includes:** Network latency + server processing

### Aggregated Stats:

- **Average:** Sum of all response times / number of hits
- **Minimum:** Fastest response time
- **Maximum:** Slowest response time
- **Success Rate:** (Successful hits / Total hits) × 100%

---

## Report Display

### Table (First 100 Hits)

- Shows chronological order of endpoint hits
- Color-coded status (green=success, red=failure)
- Sorted by timestamp

### Summary Cards (All Hits)

- Per-endpoint statistics
- Min/Max/Avg response times
- Success percentage
- Total hit count

### Note:

If more than 100 hits, table shows first 100 with note:
"Showing first 100 of 1500 endpoint hits"

---

## Configuration

### Debug Logging:

Enable debug logs to see all endpoint hits:

```bash
LOG_LEVEL=debug docker-compose up
```

### HTTP Client:

Response time measurement:
```javascript
const startTime = Date.now();
const res = await fetch(url, { headers });
const responseTime = Date.now() - startTime;
```

---

## Example Report Output

```
┌─ Endpoint Performance Details ─────────────────────┐
│                                                     │
│ Endpoint          Status  Response Time   Success   │
├─────────────────────────────────────────────────────┤
│ account-channel    200        198ms         ✓        │
│ conversation       200        245ms         ✓        │
│ ticket             200        156ms         ✓        │
│ account-channel    200        205ms         ✓        │
│ conversation       200        252ms         ✓        │
│ ... (96 more)                                        │
│                                                     │
│ Showing first 100 of 1500 endpoint hits             │
└─────────────────────────────────────────────────────┘

┌─ Endpoint Summary ─────────────────────────────────┐
│                                                     │
│ Account Channel          Conversation     Ticket   │
│ ─────────────────       ─────────────    ────────  │
│ Total Hits: 500         Total: 500       Total: 500│
│ Success: 495 (99%)      Success: 498%    Success:  │
│ Failed: 5               Failed: 2        Failed: 8 │
│ Avg: 198ms              Avg: 245ms       Avg: 156ms│
│ Min/Max: 145/350ms      Min/Max: 180/500 Min/Max:  │
│                                          120/280ms │
└─────────────────────────────────────────────────────┘
```

---

## Files Updated

1. **`scripts/widget-socket-load-2.js`**
   - Added `endpointHits` array to LoadClient stats
   - Log each endpoint hit with status and response time
   - Collect all endpoint hits before report generation

2. **`scripts/report-generator.js`**
   - New section: "Endpoint Performance Details" table
   - New section: "Endpoint Summary" cards
   - Shows status codes, response times, timestamps
   - Per-endpoint statistics (min/max/avg)

---

## Summary

✓ Every endpoint hit is logged with:
- HTTP Status code (200/201 validation)
- Response time in milliseconds
- Timestamp of when hit occurred
- Success/failure indicator

✓ Detailed report shows:
- All endpoint hits (first 100 in table)
- Per-endpoint summary with statistics
- Min/Max/Avg response times
- Success rates per endpoint

✓ Console logs available at debug level:
- Real-time endpoint test results
- Status code + response time per hit
- Client-level tracking

**Ready for detailed endpoint analysis!** 📊
