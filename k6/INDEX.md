# Socket.IO Load Test (k6) - Documentation Index

## ⚠️ IMPORTANT: WebSocket Issue Fixed!

**If you got WebSocket errors**, see **[TROUBLESHOOTING_WEBSOCKET.md](./TROUBLESHOOTING_WEBSOCKET.md)**

- ✅ Updated `socketLoadMultichannel.js` to use HTTP-based approach
- ✅ Use Node.js script for real Socket.IO WebSocket testing
- ℹ️ See troubleshooting guide for details

---

## 📖 Documentation Files

### 🚀 Start Here
- **[QUICK_START.md](./QUICK_START.md)** - 5-10 min read
  - Copy & paste commands for immediate testing
  - Common test scenarios (baseline, medium, stress)
  - Example outputs
  - Troubleshooting quick tips

### ⚠️ WebSocket Issues
- **[TROUBLESHOOTING_WEBSOCKET.md](./TROUBLESHOOTING_WEBSOCKET.md)** - If you got errors
  - Why WebSocket failed in k6
  - Solutions and recommendations
  - Comparison: k6 vs Node.js

### 📚 Complete Guide
- **[SOCKET_LOAD_TEST_GUIDE.md](./SOCKET_LOAD_TEST_GUIDE.md)** - 10-15 min read
  - Overview of features
  - Documentation roadmap
  - Common scenarios with explanations
  - Best practices
  - Learning path (beginner → advanced)

### 📘 Reference Manual
- **[README.md](./README.md)** - 20-30 min read
  - Full feature list
  - All environment variables explained
  - Hardcoded defaults per environment
  - Metrics documentation
  - Advanced configurations

### 🔧 Installation & Setup
- **[INSTALLATION.md](./INSTALLATION.md)** - 10-15 min read
  - k6 installation instructions (Windows/Mac/Linux)
  - Signature key setup
  - Environment configuration
  - Firewall & network setup
  - Comprehensive troubleshooting

### 🔄 Migration From Node.js
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - 10 min read
  - Comparison: Node.js vs k6
  - Feature mapping
  - Command translation
  - Performance comparison
  - Step-by-step migration

---

## 📄 Code Files

### Main Script
- **[socketLoadMultichannel.js](./socketLoadMultichannel.js)** (455 lines)
  - k6 load test script
  - Features: Soak + Throughput modes
  - Multi-channel support
  - Auto signature key loading
  - Real-time metrics

### Helper Scripts
- **[run-socket-load.ps1](./run-socket-load.ps1)** ⭐ Recommended
  - PowerShell automation script
  - Guided parameter input
  - Multiple invocation methods
  - Cross-platform compatible

- **[run-socket-load.bat](./run-socket-load.bat)**
  - Windows batch file helper
  - Interactive menu
  - Simple to use

---

## 🎯 Quick Navigation

### If you want to...

**Run a test RIGHT NOW** (in 2 minutes)
→ Go to [QUICK_START.md](./QUICK_START.md)

**Understand what you're testing**
→ Go to [SOCKET_LOAD_TEST_GUIDE.md](./SOCKET_LOAD_TEST_GUIDE.md)

**Learn all options & features**
→ Go to [README.md](./README.md)

**Fix installation issues**
→ Go to [INSTALLATION.md](./INSTALLATION.md)

**Compare with Node.js version**
→ Go to [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)

**Understand the k6 script code**
→ Read [socketLoadMultichannel.js](./socketLoadMultichannel.js)

---

## 📊 Reading Time Guide

| Document | Time | Audience |
|----------|------|----------|
| QUICK_START.md | 5-10 min | Everyone |
| SOCKET_LOAD_TEST_GUIDE.md | 10-15 min | Technical users |
| README.md | 20-30 min | Advanced users |
| INSTALLATION.md | 10-15 min | First-time setup |
| MIGRATION_GUIDE.md | 10 min | Node.js users |

**Total**: ~60-75 min for complete understanding  
**Minimum**: 5-10 min to start testing

---

## 🚀 Typical User Journeys

### Journey 1: Just Want to Run a Test (⏱️ 10 min)
1. Read: QUICK_START.md (5 min)
2. Run: One of the copy-paste commands (2 min)
3. Observe: Console output (3 min)
✅ Done!

### Journey 2: Want to Understand Better (⏱️ 30 min)
1. Read: QUICK_START.md (5 min)
2. Read: SOCKET_LOAD_TEST_GUIDE.md (10 min)
3. Run: A few scenarios (10 min)
4. Review: Output & metrics (5 min)
✅ Full understanding!

### Journey 3: Complete Setup & Migration (⏱️ 60 min)
1. Read: SOCKET_LOAD_TEST_GUIDE.md (10 min)
2. Read: INSTALLATION.md (10 min)
3. Install: k6 (5 min)
4. Run: Baseline test (5 min)
5. Read: MIGRATION_GUIDE.md (10 min)
6. Read: README.md (15 min)
7. Run: Advanced scenarios (5 min)
✅ Expert ready!

### Journey 4: Node.js Migration (⏱️ 20 min)
1. Read: MIGRATION_GUIDE.md (10 min)
2. Install: k6 (5 min)
3. Run: First k6 test (5 min)
✅ Migrated!

---

## 📋 Key Features Checklist

- ✅ Auto-load signature keys (no manual input!)
- ✅ Soak mode (idle connections)
- ✅ Throughput mode (message streaming)
- ✅ Multi-channel support
- ✅ Auto-prepare conversations
- ✅ Real-time metrics
- ✅ HTML report generation
- ✅ Gradual ramp-up (5 stages)
- ✅ Connection latency tracking
- ✅ Error rate monitoring
- ✅ Interactive helpers
- ✅ Cloud ready

---

## 🔑 Signature Keys (Auto-Loaded)

| Environment | Signature Key |
|-------------|---------------|
| dev-v2.satuinbox.com | sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if |
| v2.satuinbox.com | sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM |

✅ No manual input needed!

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| k6 not found | Install: https://k6.io/docs/getting-started/installation/ |
| SIGNATURE_KEY missing | Check BASE_URL or provide manually with -e flag |
| Connection timeout | Check server, reduce VUs, extend timeout |
| High error rate | Server overloaded, reduce EMIT_EVERY_MS or VUs |

More help: See [INSTALLATION.md](./INSTALLATION.md)

---

## 📞 External Resources

| Resource | URL |
|----------|-----|
| k6 Official Docs | https://k6.io/docs/ |
| k6 GitHub | https://github.com/grafana/k6 |
| k6 Slack Community | https://community.grafana.com/c/k6/ |
| Socket.IO Docs | https://socket.io/docs/ |
| WebSocket API | https://developer.mozilla.org/en-US/docs/Web/API/WebSocket |

---

## 📝 File Structure

```
k6/
├── 📄 socketLoadMultichannel.js       Main k6 script
├── 💻 run-socket-load.ps1            PowerShell helper
├── 🎯 run-socket-load.bat            Batch helper
├── 📖 QUICK_START.md                 Quick start guide
├── 📘 README.md                      Full documentation
├── 🔧 INSTALLATION.md                Setup guide
├── 📋 SOCKET_LOAD_TEST_GUIDE.md      Overview
├── 🔄 MIGRATION_GUIDE.md             Node.js migration
└── 📇 INDEX.md                       This file
```

---

## ⭐ Most Important Files

1. **socketLoadMultichannel.js** - The actual test script
2. **QUICK_START.md** - How to run it
3. **README.md** - Full reference

All others are support/documentation.

---

## 🎓 Beginner Tips

1. **Start with Scenario 1** (Baseline test, 10 VUs, 1 min)
2. **Read output carefully** - metrics tell you what's happening
3. **Monitor server** - open another terminal to watch CPU/memory
4. **Gradual scaling** - don't jump to 500 VUs immediately
5. **Save reports** - use `--out=html=report.html` for analysis

---

## 📞 Need Help?

1. **First**: Check [INSTALLATION.md](./INSTALLATION.md) troubleshooting section
2. **Then**: Review [QUICK_START.md](./QUICK_START.md) examples
3. **Finally**: Check [README.md](./README.md) for all options

---

**Last Updated**: April 9, 2026  
**Version**: v2 (k6 with auto-loaded signature keys)  
**Status**: ✅ Production Ready

---

👉 **Ready to start?** Go to [QUICK_START.md](./QUICK_START.md)!
