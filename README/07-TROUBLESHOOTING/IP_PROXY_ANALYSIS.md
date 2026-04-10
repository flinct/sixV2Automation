# Analisis: Multiple IP Address untuk Load Testing

## 1. Status Logging di widget-socket-load-2.js

### ✅ Logging yang Sudah Ada:
```javascript
// 1. Console logging dengan timestamp
const makeLogger() {
  return {
    info: (...args) => console.log(...fmt('[INFO ]', args)),
    debug: (...args) => console.log(...fmt('[DEBUG]', args)),
    error: (...args) => console.error(...fmt('[ERROR]', args)),
  };
}

// 2. Progress logging setiap 10 detik
setInterval(() => {
  log.info('progress', {
    uptimeSec,
    created,
    connected,
    connectErrors,
    disconnects,
    emits,
    expectHits,
    prepareErrors,
    preparedRooms,
  });
}, 10000);

// 3. Final summary logging
log.info('done', {
  created,
  connected,
  connectErrors,
  disconnects,
  emits,
  expectHits,
  prepareErrors,
  preparedRooms,
});
```

### ✅ Yang Dicatat:
- Timestamps (dari console)
- Progress metrics setiap 10 detik
- Final summary
- Errors dan warnings

### ❌ Yang TIDAK Ada:
- **File output** (hanya console)
- **Detailed per-VU logging** (connection timing, disconnect reasons)
- **Error details** (error stack, error messages per client)
- **Message delivery confirmation**
- **Latency histogram data**

---

## 2. Analisis: Multiple IP Address untuk VU

### 🤔 Apakah Memungkinkan?

**Jawaban: SULIT / TIDAK PRAKTIS untuk Node.js socket.io-client**

### Alasan:

#### A. **Dari Sisi Socket.IO Client:**
```javascript
const { io } = require('socket.io-client');

socket = io(socketUrl, {
  transports: ['websocket'],
  auth: { token: signatureKey },
  // TIDAK ada opsi untuk set source IP
});
```
✗ Socket.IO client library **tidak mendukung** pengaturan source IP
✗ Tidak bisa specify interface atau local address
✗ Node.js `socket.io-client` hanya bisa gunakan default network interface

#### B. **Dari Sisi Sistem Operasi (Windows):**
```
- Binding ke IP tertentu memerlukan root/admin privilege
- Windows tidak mudah untuk manage multiple IPs secara programmatic
- Memerlukan network interface configuration di OS level
```

#### C. **Dari Sisi Server:**
```
- Server mungkin tidak peduli dengan source IP (WebSocket di layer 7)
- Server hanya lihat client yang connect via socket
- IP source mungkin ter-NAT anyway
```

---

## 3. Alternatif Solusi

### Option 1: Proxy dengan Multiple IPs (PALING FEASIBLE)
**Status: ✅ POSSIBLE**

```
Client -> Proxy (dengan IP rotation) -> Server
```

**Bagaimana:**
1. Setup proxy server (nginx, HAProxy, squid)
2. Proxy dikonfigurasi dengan multiple outgoing IPs
3. Setiap request dari proxy keluar dengan IP berbeda

**Kelebihan:**
- ✅ Realistic simulation
- ✅ Server lihat berbagai IPs
- ✅ Tidak perlu modifikasi app

**Kekurangan:**
- ❌ Setup kompleks
- ❌ Tambahan overhead
- ❌ Need extra infrastructure

**Implementasi:**
```bash
# NAT dengan multiple IPs di Linux:
ip addr add 192.168.1.100 dev eth0
ip addr add 192.168.1.101 dev eth0
ip addr add 192.168.1.102 dev eth0

# Atau gunakan HAProxy dengan source IP routing
```

---

### Option 2: Modify Node.js Socket dengan Low-Level API (ADVANCED)
**Status: ⚠️ VERY DIFFICULT**

```javascript
// Menggunakan net module dengan custom socket
const net = require('net');
const tls = require('tls');

// Bind ke specific local address
const socket = net.createConnection({
  port: 443,
  host: 'server.com',
  localAddress: '192.168.1.100', // SOURCE IP!
});

// Tapi: socket.io-client tidak support ini
```

**Kelebihan:**
- ✅ No extra infrastructure

**Kekurangan:**
- ❌ Very complex
- ❌ Need custom socket.io-client fork
- ❌ Maintenance nightmare
- ❌ Tidak worth effort

---

### Option 3: Distributed Load Testing (RECOMMENDED)
**Status: ✅ MOST PRACTICAL**

```
Multiple Machines -> Each with different IP -> Same Server
```

**Bagaimana:**
1. Setup multiple test machines (VM, cloud, physical)
2. Each machine punya IP berbeda
3. Run script di setiap machine
4. Aggregate results

**Kelebihan:**
- ✅ Realistic (berbeda IP, berbeda location)
- ✅ Lebih testing-friendly
- ✅ Scalable
- ✅ Tidak perlu modifikasi code

**Kekurangan:**
- ❌ Infrastruktur mahal
- ❌ Setup kompleks

**Implementasi:**
```bash
# Machine 1 (IP: 192.168.1.10)
$env:TARGET_CONNECTIONS = "100"
node widget-socket-load-2.js

# Machine 2 (IP: 192.168.1.11)
$env:TARGET_CONNECTIONS = "100"
node widget-socket-load-2.js

# Machine 3 (IP: 192.168.1.12)
$env:TARGET_CONNECTIONS = "100"
node widget-socket-load-2.js

# Total: 300 connections dari 3 IPs berbeda
```

---

### Option 4: Local Network Interface Simulation (EXPERIMENTAL)
**Status: ⚠️ POSSIBLE (Linux only)**

```javascript
// Binding ke multiple virtual interfaces
// Hanya work di Linux dengan network namespace
```

---

## 4. Rekomendasi untuk Anda

### A. Jika hanya perlu LOGGING (MUDAH)
✅ **Implementasi: Add File Output**

```javascript
// Add file logging
const fs = require('fs');
const logFile = fs.createWriteStream('load-test.log', { flags: 'a' });

function logToFile(message) {
  logFile.write(`${new Date().toISOString()} ${message}\n`);
}
```

**Effort:** 5 menit
**Complexity:** Low
**Result:** Detail log file

---

### B. Jika HARUS multiple IPs (SULIT)
⚠️ **Best Option: Distributed Testing (Option 3)**

Run script di beberapa machines dengan IPs berbeda
- Realistic
- Scalable
- No code modification needed
- Only infrastructure cost

---

### C. Jika ingin quick workaround (COMPROMIZE)
⚠️ **Use HTTP Proxy**

```bash
# Setup proxy dengan IP rotation
# Point socket.io connection through proxy
```

Tapi socket.io-client tidak support proxy directly.

---

## 5. KESIMPULAN

### Untuk Multiple IPs:

| Method | Feasibility | Effort | Realistic | Notes |
|--------|------------|--------|-----------|-------|
| Modify socket.io-client | ❌ No | Very High | Yes | Don't do this |
| OS-level IP binding | ⚠️ Hard | High | Yes | Windows hard, Linux possible |
| Proxy with IP rotation | ✅ Yes | Medium | High | Best if needed |
| Distributed testing | ✅ Yes | Medium | Yes | **RECOMMENDED** |
| Network namespace | ⚠️ Hard | High | Yes | Linux only |

### Untuk Logging:

| Method | Feasibility | Effort | Result |
|--------|------------|--------|--------|
| File output | ✅ Easy | 5 min | Good |
| JSON logging | ✅ Easy | 10 min | Better |
| CSV export | ✅ Easy | 15 min | Best |
| Database | ⚠️ Medium | 30 min | Professional |

---

## 6. REKOMENDASI FINAL

### Langsung lakukan (MUDAH):
✅ **Add File Logging**
- Export ke file (text/JSON/CSV)
- Tidak perlu infrastructure
- 10-15 menit implementasi

### Untuk Multiple IPs:
**Pilih salah satu:**

1. **Jika ingin realistic**: Setup 3-5 machines dengan IP berbeda (Distributed)
2. **Jika perlu sekarang**: Gunakan same IP, tapi note bahwa semua dari 1 IP
3. **Jika ada proxy**: Setup proxy dengan IP rotation

**TIDAK recommend:** Modify code untuk IP binding

---

## 7. CODE CHANGES NEEDED

### Logging (MUDAH):
```javascript
// Add ini ke widget-socket-load-2.js
const fs = require('fs');

const logStream = fs.createWriteStream('load-test-report.json');

// Log setiap event ke file
logStream.write(JSON.stringify({
  timestamp: new Date(),
  event: 'progress',
  metrics: { ... }
}) + '\n');

// Di akhir, close stream
logStream.end();
```

### Multiple IPs (TIDAK ada direct solution):
```javascript
// ❌ TIDAK BISA langsung di socket.io-client
// ✅ HARUS pakai salah satu option di atas
```

---

## NEXT STEPS

Apa yang harus dilakukan:

1. **Sepakat untuk logging** ✅ (mudah, langsung bisa)
   - Tambahkan file output
   - JSON format untuk analysis

2. **Untuk multiple IPs, pilih strategy:**
   - Jika urgent: Accept same IP (catat di log)
   - Jika timeline panjang: Setup distributed testing
   - Jika ada proxy: Configure proxy IP rotation

---

## Kesimpulan Singkat:

**LOGGING**: ✅ Bisa ditambah 10-15 menit  
**MULTIPLE IPs**: ⚠️ Sulit, butuh infrastructure atau modification

**Best approach:**
1. Add logging dulu (mudah)
2. Decide strategy untuk multiple IPs (butuh diskusi dengan stakeholder)
3. Implement sesuai pilihan
