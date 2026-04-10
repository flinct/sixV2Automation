# Perbandingan: socketLoadMultichannel.js vs Advanced

## 📊 Ringkas

| Aspek | Regular | Advanced |
|-------|---------|----------|
| **File Size** | 13.2 KB | 6.3 KB |
| **Lines of Code** | 389 lines | 184 lines |
| **Complexity** | Medium | Simple |
| **Features** | Lebih banyak | Fokus |
| **Setup Phase** | Ada (untuk throughput) | Minimal |
| **Main VU Logic** | Kompleks (Socket.IO protocol aware) | Sederhana (HTTP GET + POST) |
| **Configuration Options** | Lebih banyak (MODE, PREPARE_MODE, dll) | Minimal |
| **Metrics Tracking** | Detail (8 metrics) | Basic (8 metrics) |
| **Recommended For** | Production, flexibility | Quick testing, simplicity |

---

## 🔄 Perbedaan Detail

### 1. Setup Phase

**Regular Version:**
```javascript
export function setup() {
  // 1. Check signature key
  // 2. Auto-prepare shared conversation (jika MODE=throughput)
  // 3. Create client contact via API
  // 4. Submit topic via API
  // 5. Return setup data untuk VU
  
  // Result: Shared conversation ready untuk semua VU
}
```

**Advanced Version:**
```javascript
export function setup() {
  // 1. Check signature key
  // 2. Return empty setup data
  
  // Result: No setup, langsung ke VU
}
```

**Difference:** Regular mempersiapkan conversation dulu, Advanced tidak.

---

### 2. Main VU Function (Eksekusi di setiap VU)

**Regular Version:**
```javascript
export default function (setupData) {
  // 1. Extract VU ID
  // 2. Try WebSocket connection (ws.connect)
  // 3. Handle 'connect' event
  // 4. Join conversation (jika throughput mode)
  // 5. Start emitting messages (setInterval)
  // 6. Handle disconnect
  // 7. Return connection result
  
  // Lines: ~150 lines
}
```

**Advanced Version:**
```javascript
export default function (setupData) {
  // 1. Extract VU ID
  // 2. HTTP GET to handshake
  // 3. Check response
  // 4. If throughput mode:
  //    - Loop 5 times
  //    - HTTP POST emit messages
  //    - Sleep between messages
  // 5. Return result
  
  // Lines: ~70 lines
}
```

**Difference:** Regular lebih complete, Advanced lebih direct.

---

### 3. Konfigurasi yang Support

**Regular Version:**
```
MODE                    (soak | throughput)
TARGET_CONNECTIONS     (jumlah VU)
EMIT_EVENT             (event name)
EMIT_EVERY_MS          (interval)
SOCKET_AUTH_MODE       (auth method)
DEBUG_ALL_EVENTS       (verbose logging)
AUTO_PREPARE           (auto-create conversation)
PREPARE_MODE           (shared | perClient)
TOPIC_PREFIX           (naming)
JOIN_EVENT             (event name)
WIDGET_CHANNEL_ID      (channel)
WIDGET_ACCOUNT_CHANNEL_IDS (multiple channels)
```
**Total: 12 options**

**Advanced Version:**
```
BASE_URL               (environment)
MODE                   (soak | throughput)
TARGET_CONNECTIONS    (jumlah VU)
EMIT_EVERY_MS         (interval)
DEBUG                  (verbose logging)
```
**Total: 5 options**

---

### 4. Setup Data Handling

**Regular Version:**
```javascript
// Setup menghasilkan:
const setupData = {
  channelAccountId: "...",      // Dari API call
  clientContactId: "...",        // Dari API call
  conversationId: "...",         // Dari API call
};

// Setiap VU menggunakan data yang sama (shared)
```

**Advanced Version:**
```javascript
// Setup menghasilkan:
const setupData = {
  channelAccountId: null,
  clientContactId: null,
  conversationId: null,
};

// Setiap VU melakukan sendiri HTTP calls
```

---

### 5. Message Emitting

**Regular Version:**
```javascript
// Dalam loop (setInterval):
socket.emit(EMIT_EVENT, payload);
emitLatency.add(emitTime);
messagesSent.add(1);

// Terus emit selama VU berjalan
// Mengukur latency setiap emit
```

**Advanced Version:**
```javascript
// HTTP POST loop (5 iterasi max):
for (let i = 0; i < 5; i++) {
  http.post(emitUrl, payload);
  emitLatency.add(emitTime);
  messagesSent.add(1);
  sleep(EMIT_EVERY_MS / 1000);
}
// Hanya 5 messages per VU
```

---

### 6. Connection Handling

**Regular Version:**
```javascript
// Real WebSocket attempt
ws.connect(socketUrl, {
  tags: { name: `socket-${vuId}` },
}, function(socket) {
  socket.on('connect', () => { /* ... */ });
  socket.on('disconnect', () => { /* ... */ });
  socket.on('error', () => { /* ... */ });
  // Real WebSocket events
});
```

**Advanced Version:**
```javascript
// HTTP Handshake only
http.get(handshakeUrl);

// If success:
for (let i = 0; i < 5; i++) {
  http.post(emitUrl, payload);
}
// No WebSocket connection
```

---

## 🎯 Kapan Menggunakan Yang Mana?

### Gunakan **Regular** (socketLoadMultichannel.js) Jika:

✅ Ingin test message throughput yang realistic  
✅ Perlu shared conversation preparation  
✅ Ingin detail metrics (connect time, emit latency)  
✅ Ingin test soak mode (idle connections)  
✅ Perlu flexibility (banyak opsi konfigurasi)  
✅ Production load testing  
✅ Ingin WebSocket-like behavior (meski HTTP)  

**Best for:** Production testing, realistic scenarios

```bash
k6 run --vus 100 --duration 5m \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  -e MODE=throughput \
  socketLoadMultichannel.js
```

---

### Gunakan **Advanced** Jika:

✅ Ingin quick baseline test  
✅ Hanya test message API (bukan connection)  
✅ Ingin script yang simple dan mudah dipahami  
✅ Server sedang development  
✅ Quick sanity check sebelum full load test  
✅ Limited resources / fast iteration  

**Best for:** Quick testing, debugging, baseline

```bash
k6 run --vus 50 --duration 2m \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  socketLoadMultichannel-advanced.js
```

---

## 📈 Expected Results Comparison

### Regular Version (500 VUs, 5 min test)
```
socket_connect_success: 500
active_connections: 500
messages_sent: 75000+
emit_latency: p(95)=25ms
connect_latency: p(95)=800ms
errors: 0%
```
**Realistic production load pattern**

### Advanced Version (500 VUs, 5 min test)
```
socket_connect_success: 500
messages_sent: 2500+ (hanya 5 per VU)
emit_latency: p(95)=15ms
connect_latency: p(95)=200ms
errors: 0%
```
**Quick baseline, fewer messages**

---

## 🔧 Quick Decision

```
Apakah test ini untuk production/staging?
  ├─ YA  → Gunakan Regular
  └─ TIDAK (quick test) → Gunakan Advanced

Apakah butuh realistic message throughput?
  ├─ YA  → Gunakan Regular
  └─ TIDAK (hanya baseline) → Gunakan Advanced

Apakah perlu detailed metrics?
  ├─ YA  → Gunakan Regular
  └─ TIDAK (hanya pass/fail) → Gunakan Advanced

Apakah ingin auto-prepare conversation?
  ├─ YA  → Gunakan Regular
  └─ TIDAK (manual) → Gunakan Advanced
```

---

## 💡 Recommendation

**Untuk majority use case:**
→ **Gunakan Regular (socketLoadMultichannel.js)**

Alasan:
- Lebih production-ready
- Better metrics
- More features
- Realistic scenarios
- Flexibility

**Gunakan Advanced hanya jika:**
- Quick baseline (< 10 VU)
- Testing API endpoint
- Debugging
- First-time sanity check

---

## Performance Impact

### Regular Version
- Setup time: +500ms (API calls untuk prepare)
- Per VU resource: ~5MB (WebSocket connection)
- Total for 100 VU: ~500MB memory

### Advanced Version
- Setup time: ~0ms
- Per VU resource: ~1MB (just HTTP)
- Total for 100 VU: ~100MB memory

**Advanced lebih light, Regular lebih realistic.**

---

## Side-by-Side Code Example

### How to emit messages:

**Regular:**
```javascript
// Continuous loop (production-like)
const messageLoop = setInterval(function () {
  if (socket.readyState === ws.OPEN) {
    socket.emit(EMIT_EVENT, payload);
    messagesSent.add(1);
  }
}, EMIT_EVERY_MS);
```

**Advanced:**
```javascript
// Fixed 5 iterations
for (let i = 0; i < 5; i++) {
  http.post(emitUrl, payload);
  messagesSent.add(1);
  sleep(EMIT_EVERY_MS / 1000);
}
```

---

## Conclusion

| Skenario | Pilih |
|----------|-------|
| Production load test | Regular |
| Soak test (idle) | Regular |
| Realistic message throughput | Regular |
| Detail metrics analysis | Regular |
| Quick baseline | Advanced |
| API endpoint test | Advanced |
| Debugging | Advanced |
| First-time check | Advanced |

**Default Recommendation:** **Regular (socketLoadMultichannel.js)** ✅

---

**Kapan menggunakan Advanced?**
- Saat VU < 20
- Saat test duration < 2 menit
- Saat hanya cek "server up/down"
- Saat develop/debugging

**Kapan menggunakan Regular?**
- Saat VU > 20
- Saat test duration > 5 menit
- Saat production validation
- Saat perlu detail metrics
