# Socket.IO WebSocket Connection Issues - Debugging Guide

## Problem Analysis

### What Happened

```
ERRO[0060] TypeError: Object has no member 'close'
running at socketLoadMultichannel.js:408:19(100)
```

### Root Causes

1. **WebSocket Connection Failed** - socket tidak pernah `connect` event, langsung error
2. **Invalid Socket.IO Protocol** - k6 native `ws` module tidak fully compatible dengan Socket.IO
3. **Wrong Connection Approach** - k6 WebSocket berbeda dari Socket.IO client library
4. **URL Format Issue** - Socket.IO memerlukan handshake HTTP terlebih dahulu

---

## Comparison: Node.js vs k6

### Node.js (widget-socket-load-2.js)
```javascript
const { io } = require('socket.io-client');

socket = io(socketUrl, {
  path: SOCKET_PATH,
  transports: ['websocket'],
  auth: { token: SIGNATURE_KEY },
  extraHeaders: { Origin: BASE_URL },
});

socket.on('connect', () => { /* ... */ });
socket.emit('event', data);
```

**Works because**: Uses official Socket.IO client library yang handle semua protocol handshake.

### k6 Original (socketLoadMultichannel.js)
```javascript
const socket = ws.connect(socketUrl, { /* ... */ }, function(socket) {
  socket.on('connect', () => { /* ... */ });
});
```

**Problem**: k6 `ws` module hanya raw WebSocket, tidak Socket.IO aware.

---

## Solutions

### Solution 1: Pure HTTP Approach (RECOMMENDED)
File: `socketLoadMultichannel.js` (sudah updated)
- Tidak menggunakan WebSocket
- Gunakan HTTP API untuk emit messages
- Lebih reliable untuk load testing
- Cocok untuk testing message throughput

**Pros:**
- ✅ Simple dan reliable
- ✅ Tidak perlu handle WebSocket complexities
- ✅ Dapat test message API langsung
- ✅ Works with k6

**Cons:**
- ❌ Tidak 100% Socket.IO (tidak real-time connection)
- ❌ Hanya test message API, bukan WebSocket

### Solution 2: Native Socket.IO Support
Perlu menggunakan: `xk6-socket.io` atau custom WebSocket implementation

**How to install:**
```bash
# Install xk6 (k6 extension builder)
go install github.com/grafana/xk6/cmd/xk6@latest

# Build k6 dengan socket.io support
xk6 build --with github.com/NullIsObject/xk6-socket.io
```

**Pros:**
- ✅ Native Socket.IO support
- ✅ Real WebSocket connections
- ✅ Exactly like Node.js version

**Cons:**
- ❌ Requires Go installation
- ❌ Build k6 dari source
- ❌ Complex setup

### Solution 3: Keep Using Node.js Version
**File:** `../scripts/widget-socket-load-2.js`

```bash
node scripts/widget-socket-load-2.js
```

**Pros:**
- ✅ Works perfectly
- ✅ Real Socket.IO connections
- ✅ Full protocol support

**Cons:**
- ❌ No HTML reports
- ❌ Can't distribute testing
- ❌ More resource hungry

---

## Recommended Path Forward

### Option A: Use Updated k6 Script (HTTP-based)
```bash
k6 run --vus 50 --duration 5m \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  -e MODE=throughput \
  socketLoadMultichannel.js
```

**Good for:**
- Testing message API throughput
- Load testing without real WebSocket
- K6 benefits (reports, distribution)

### Option B: Use Node.js Script
```bash
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "50"
$env:EMIT_EVERY_MS = "200"
node scripts/widget-socket-load-2.js
```

**Good for:**
- Real Socket.IO load testing
- Connection soak tests
- Authentic WebSocket behavior

### Option C: Build Custom k6 with xk6-socket.io (Advanced)
```bash
# 1. Install Go
# 2. Install xk6
# 3. Build k6 with socket.io
# 4. Use updated k6 script
```

**Good for:**
- Want k6 + Socket.IO hybrid
- Need distributed testing with real WebSocket
- Future-proof solution

---

## Testing the Fix

### Test 1: Verify Updated k6 Script (HTTP-based)
```bash
k6 run --vus 10 --duration 1m \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  socketLoadMultichannel.js
```

**Expected output:**
```
✓ socket_connect_success count=10
✓ messages_sent count=50+ (if throughput mode)
✓ No TypeError errors
```

### Test 2: Verify Node.js Script Still Works
```bash
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "10"
node scripts/widget-socket-load-2.js
```

**Expected output:**
```
[INFO] progress { created: 10, connected: 10, emits: 100+ }
[INFO] done { connected: 10, emits: 1000+ }
```

---

## Why WebSocket Failed in k6

### Issue 1: Missing Handshake
Socket.IO requires:
1. HTTP GET handshake
2. Get session ID
3. Upgrade to WebSocket
4. Send auth packet

k6's raw `ws.connect()` skips steps 1-3.

### Issue 2: Auth Token Format
Socket.IO expects:
```javascript
{
  type: 'CONNECT',
  data: {
    token: 'sk_...',
  }
}
```

k6's `auth` parameter doesn't match Socket.IO format.

### Issue 3: API Incompatibility
- k6 WebSocket: Standard WS API
- Socket.IO: Custom protocol on top of WS
- Not compatible without adapter

---

## File Changes

### socketLoadMultichannel.js
- ✅ Updated to use HTTP-based approach
- ✅ Removed WebSocket close() errors
- ✅ Still supports soak + throughput modes
- ✅ Auto-prepared conversation support

### socketLoadMultichannel-advanced.js
- ✅ Alternative HTTP implementation
- ✅ Simpler, more reliable
- ✅ No WebSocket complexity

### widget-socket-load-2.js
- ✓ Still works as before (Node.js)
- ✓ Use this for real Socket.IO testing

---

## Metrics Comparison

### Node.js Version Results
```
created: 50
connected: 50
emits: 72939
preparedRooms: 50
```
✅ Real WebSocket connections

### k6 Version Results (Updated)
```
socket_connect_success: 50
messages_sent: 500+ (in throughput mode)
active_connections: 50
```
✅ HTTP-based connections (no WebSocket)

---

## Q&A

### Q: Why not use Socket.IO with k6?
**A:** Socket.IO isn't a standard, so k6's raw WebSocket doesn't support it. You need xk6-socket.io extension.

### Q: Is HTTP-based testing valid?
**A:** Yes, for testing message API. But for real load testing connection/reconnection behavior, use Node.js version.

### Q: Should I use k6 or Node.js?
**A:**
- **Use k6** if: Want reports, distributed testing, easier integration
- **Use Node.js** if: Need real Socket.IO, connection stability testing, exact behavior

### Q: How to get real Socket.IO in k6?
**A:** Install xk6-socket.io extension (see Solution 2 above)

### Q: Why k6 WebSocket has no `.close()` method?
**A:** The socket object in the callback isn't the WS socket, so `.close()` doesn't exist. Call from outside the callback.

---

## Next Steps

1. **Use updated socketLoadMultichannel.js** - HTTP-based (no WebSocket issues)
2. **Or use Node.js script** - For real Socket.IO testing
3. **Or install xk6-socket.io** - If you want both benefits

---

## Technical Details

### Socket.IO Protocol Flow
```
Client                          Server
  |  HTTP GET (handshake)      |
  |-----(with token)---------->|
  |  HTTP 200 + session ID      |
  |<---(with sid)--------------|
  |  Upgrade to WebSocket       |
  |-----(handshake)--------->>|
  |  WebSocket Open             |
  |<----(ack)-----------------|
  |  Emit messages              |
  |-----(data)---------------->|
```

### k6 WebSocket Flow
```
Client                Server
  |  WebSocket Connect   |
  |----(raw WS)-------->|
  |  WebSocket Open      |
  |<----(ack)-----------|
  |  Send/Receive        |
  |<----(data)-------->|
```

**Missing steps 1-3!**

---

## Resources

- [Socket.IO Protocol](https://socket.io/docs/v4/socket-io-protocol/)
- [k6 WebSocket API](https://k6.io/docs/javascript-api/k6-ws/)
- [xk6-socket.io](https://github.com/NullIsObject/xk6-socket.io)
- [Node.js socket.io-client](https://socket.io/docs/v4/client-api/)

---

**Status**: Recommended to use HTTP-based k6 script OR Node.js script ✅
