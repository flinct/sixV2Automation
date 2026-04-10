# Socket.IO Load Test with k6 - Complete Guide

## 📁 Files Dibuat

```
k6/
├── 📄 socketLoadMultichannel.js          # Main k6 script (455 lines)
├── 🎯 run-socket-load.bat                # Batch helper untuk Windows
├── 💻 run-socket-load.ps1                # PowerShell helper (recommended)
├── 📖 README.md                          # Full documentation
├── ⚡ QUICK_START.md                     # Quick start dengan examples
├── 🔧 INSTALLATION.md                    # Setup & troubleshooting
└── 📋 SOCKET_LOAD_TEST_GUIDE.md          # This file
```

---

## ✨ Key Features

### ✅ Automatic Signature Key
- **Hardcoded defaults** per environment (dev & production)
- **No manual input** needed untuk signature key
- Auto-detect dari BASE_URL

### ✅ Dual Mode Testing
- **Soak**: Idle connections (memory focus)
- **Throughput**: Message streaming (CPU focus)

### ✅ Multi-Channel Support
- Auto-create client contact via API
- Create conversation otomatis
- Support multiple account channels

### ✅ Built-in Monitoring
- Real-time metrics
- Connection latency tracking
- Message throughput metrics
- Error rate monitoring

### ✅ Gradual Ramp-up
- 5 stages: 10% → 50% → 100% → sustain → ramp down
- Prevent sudden spike
- Realistic load profile

---

## 🚀 Quick Start (30 detik)

### Soak Test
```powershell
k6 run --vus 100 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"
```

### Throughput Test
```powershell
k6 run --vus 50 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e MODE=throughput `
  -e EMIT_EVERY_MS=200 `
  "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"
```

**That's it!** ✅ Signature key sudah auto-loaded.

---

## 📊 Signature Keys (Auto-Loaded)

| Environment | Key |
|-------------|-----|
| **dev-v2.satuinbox.com** | `sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if` |
| **v2.satuinbox.com** | `sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM` |

✓ **Otomatis dipilih** berdasarkan BASE_URL yang Anda input.

---

## 📚 Documentation Map

| Document | Purpose | Audience |
|----------|---------|----------|
| **QUICK_START.md** | Common scenarios & examples | Everyone (START HERE!) |
| **README.md** | Full documentation & options | Technical users |
| **INSTALLATION.md** | Setup & troubleshooting | First-time setup |
| **SOCKET_LOAD_TEST_GUIDE.md** | This overview | Everyone |

---

## 🎯 Common Scenarios

### Scenario 1: First Test (Baseline)
```powershell
k6 run --vus 10 --duration 1m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  socketLoadMultichannel.js
```
**Purpose**: Verify setup, baseline metrics
**Time**: ~1.5 min

### Scenario 2: Soak Test (Memory focus)
```powershell
k6 run --vus 200 --duration 10m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  socketLoadMultichannel.js
```
**Purpose**: Test server memory stability
**Time**: ~11 min

### Scenario 3: Throughput Test (Message rate)
```powershell
k6 run --vus 100 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e MODE=throughput `
  -e EMIT_EVERY_MS=200 `
  socketLoadMultichannel.js
```
**Purpose**: Test message handling capacity
**Time**: ~6 min

### Scenario 4: Stress Test (Find breaking point)
```powershell
k6 run --vus 500 --duration 15m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e MODE=throughput `
  socketLoadMultichannel.js
```
**Purpose**: Find server limits
**Time**: ~16 min

### Scenario 5: Production Test (Realistic load)
```powershell
k6 run --vus 1000 --duration 30m `
  -e BASE_URL=https://v2.satuinbox.com `
  -e MODE=throughput `
  -e EMIT_EVERY_MS=500 `
  socketLoadMultichannel.js
```
**Purpose**: Production validation
**Time**: ~31 min

---

## 🔧 Environment Variables

### Minimal (Recommended)
```powershell
BASE_URL=https://dev-v2.satuinbox.com
MODE=soak|throughput
```

### Standard
```powershell
BASE_URL=https://dev-v2.satuinbox.com
MODE=throughput
EMIT_EVERY_MS=2000
AUTO_PREPARE=true
PREPARE_MODE=shared
```

### Full Control
```powershell
BASE_URL=https://dev-v2.satuinbox.com
SIGNATURE_KEY=your_key
MODE=throughput
TARGET_CONNECTIONS=100
EMIT_EVENT=socket.inbound.message
EMIT_EVERY_MS=2000
AUTO_PREPARE=true
PREPARE_MODE=shared
TOPIC_PREFIX=loadtest
DEBUG_ALL_EVENTS=false
```

---

## 📈 What Gets Measured

### Connection Metrics
- ✓ Successful connections
- ✓ Connection errors
- ✓ Connection latency (p50, p95, p99)
- ✓ Active connections (gauge)

### Message Metrics (Throughput mode)
- ✓ Messages sent
- ✓ Messages received
- ✓ Emit latency
- ✓ Message delivery confirmation

### System Metrics
- ✓ Overall error rate
- ✓ Test duration
- ✓ VU ramping progress

---

## 💡 Best Practices

### 1. Start Small
```powershell
# 1. Baseline test
k6 run --vus 10 --duration 1m -e BASE_URL=... socketLoadMultichannel.js

# 2. Then medium
k6 run --vus 100 --duration 5m -e BASE_URL=... socketLoadMultichannel.js

# 3. Then scale
k6 run --vus 500 --duration 15m -e BASE_URL=... socketLoadMultichannel.js
```

### 2. Monitor Server During Test
Open terminal lain:
```powershell
# Windows: Watch resource usage
while(1) { Clear-Host; Get-Process | Sort-Object CPU -Descending | Select -First 10; Start-Sleep 1 }

# Linux: Use htop
htop
```

### 3. Save Results
```powershell
k6 run --out=html=report.html \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  socketLoadMultichannel.js

# Report saved to report.html - buka di browser
```

### 4. Test Different Profiles
- **Load test**: Realistic production load (500-1000 VUs)
- **Stress test**: Find breaking point (gradually increase)
- **Soak test**: Long duration, low load (check memory leaks)
- **Spike test**: Sudden spike in traffic (resilience check)

### 5. Gradual Scaling
```powershell
# Don't jump straight to 500 VUs!
# Use helper script untuk interactive mode:
.\run-socket-load.ps1 -Interactive

# Atau custom stages di script
```

---

## ⚙️ Helper Scripts

### Batch File (Interactive)
```cmd
C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\run-socket-load.bat
```
Akan muncul menu untuk pilih mode, VUs, duration, etc.

### PowerShell Script (Recommended)
```powershell
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6"

# Interactive mode
.\run-socket-load.ps1 -Interactive

# Direct mode
.\run-socket-load.ps1 -Mode soak -VUs 100 -Duration 5m

# Throughput
.\run-socket-load.ps1 -Mode throughput -VUs 50 -EmitEveryMs 200 -Duration 5m
```

---

## 🔍 Understanding Output

### Sample Output
```
scenarios: (100.00%) 1 scenario, 100 max VUs, 5m30s max duration
default: 100 VUs in 5 stages over 5m0s run time

✓ socket_connect_success
  100 successful connections
✗ socket_connect_errors
  5 connection errors (5%)
  messages_sent: 10000
  messages_received: 9950
  connect_latency:
    avg: 245ms
    p(95): 800ms
    p(99): 1200ms
```

### Interpretation
- **✓ = Pass** (success)
- **✗ = Fail** (threshold exceeded)
- **p(95)**: 95% dari requests selesai dalam waktu ini
- **p(99)**: 99% dari requests selesai dalam waktu ini

---

## 🐛 Troubleshooting

### "Connection refused"
→ Server tidak running atau wrong BASE_URL

### "SIGNATURE_KEY missing"
→ Check BASE_URL atau provide manual SIGNATURE_KEY

### "High error rate"
→ Server overloaded, kurangi VUs atau EMIT_EVERY_MS

### "Timeout"
→ Network issue atau server terlalu slow

**See INSTALLATION.md for detailed troubleshooting.**

---

## 📞 Support Resources

| Resource | Link |
|----------|------|
| k6 Docs | https://k6.io/docs/ |
| k6 GitHub | https://github.com/grafana/k6 |
| Socket.IO | https://socket.io/ |
| WebSocket API | https://developer.mozilla.org/en-US/docs/Web/API/WebSocket |

---

## 📋 Checklist Sebelum Test

- [ ] k6 installed (`k6 version`)
- [ ] BASE_URL correct (dev-v2 atau v2?)
- [ ] Network connectivity OK
- [ ] Server running dan accessible
- [ ] No firewall blocking WebSocket
- [ ] Enough disk space untuk hasil
- [ ] Monitor server (open another terminal)
- [ ] Know expected baseline (what's normal?)

---

## 🎓 Learning Path

**Beginner**
1. Read: QUICK_START.md
2. Run: Scenario 1 (Baseline)
3. Observe: Console output

**Intermediate**
1. Read: README.md
2. Run: Scenario 2-3
3. Save: HTML reports
4. Analyze: Results

**Advanced**
1. Modify: Script parameters
2. Create: Custom scenarios
3. Automate: CI/CD integration
4. Monitor: Real-time metrics

---

## ✅ You're Ready!

**Next step**: Open `QUICK_START.md` dan run command pertama! 

```powershell
k6 run --vus 10 --duration 1m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"
```

**Happy load testing!** 🚀

---

**Last Updated**: April 9, 2026  
**Version**: v2 (k6 with auto-loaded signature keys)  
**Status**: ✅ Production Ready
