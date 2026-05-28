# 🚀 START HERE: Docker Multi-Machine Setup

**Tujuan:** Membuat 3 Docker containers sebagai "3 machines" dengan 3 IP berbeda untuk load testing

---

## 📌 QUICK OVERVIEW (2 minutes)

### ❌ Problem
Anda ingin 150 WebSocket connections ke server, tapi dari 3 IP sources **berbeda**:
- Saat ini: Semua 150 connections dari 1 IP (tidak realistic)
- Diinginkan: 50 dari IP1, 50 dari IP2, 50 dari IP3 ✅

### ❌ Why Not Single Machine?
- Socket.IO client tidak support multiple source IPs per machine
- Windows makes it complex dengan virtual network adapters
- Tidak praktis untuk testing

### ✅ Solution: Docker Containers
Jalankan 3 Docker containers (setiap container = "machine" terpisah dengan IP sendiri):

```
Container 1 → IP: 172.20.0.2 → 50 connections
Container 2 → IP: 172.20.0.3 → 50 connections  
Container 3 → IP: 172.20.0.4 → 50 connections
======================================
Total: 150 connections dari 3 IP berbeda ✅
```

---

## 📦 WHAT YOU'LL CREATE

Just 2 files (copy-paste ready):

### File 1: `Dockerfile`
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY scripts/ ./scripts/
RUN mkdir -p scripts/report
ENV BASE_URL=https://dev.example.test
ENV MODE=throughput
ENV TARGET_CONNECTIONS=50
ENV RUN_DURATION_MS=300000
ENV EMIT_EVERY_MS=200
ENV LOG_LEVEL=info
CMD ["node", "scripts/widget-socket-load-2.js"]
```

### File 2: `docker-compose.yml`
See **DOCKER_QUICK_START.md** → Step 3

---

## ⏱️ TIMELINE

| Step | Time | What |
|------|------|------|
| 1. Resize Docker disk | 10 min | Change 10GB → 20GB |
| 2. Create files | 5 min | Copy Dockerfile & docker-compose.yml |
| 3. Build image | 3 min | `docker-compose build` |
| 4. Run test | 5 min | `docker-compose up` |
| 5. View results | 1 min | Open `scripts/report/` |
| **TOTAL** | **24 min** | |

---

## 🎯 3 SIMPLE STEPS

### Step 1️⃣: Resize Docker Storage (10 minutes)

**Why?** Current usage 4.7GB/10GB. Need 6-8GB for 3 containers.

**How?**
```
Docker Desktop icon → Settings ⚙️ → Resources
Change: Disk image size: 10GB → 20GB
Click: Apply & Restart
Wait: Docker restarts (5-10 min)
```

**Verify:**
```powershell
docker system df
# Should show more space available
```

---

### Step 2️⃣: Create Files (5 minutes)

**Create File 1: Dockerfile**

Save as: `<repo>\Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY scripts/ ./scripts/
RUN mkdir -p scripts/report

ENV BASE_URL=https://dev.example.test
ENV MODE=throughput
ENV TARGET_CONNECTIONS=50
ENV RUN_DURATION_MS=300000
ENV EMIT_EVERY_MS=200
ENV LOG_LEVEL=info

CMD ["node", "scripts/widget-socket-load-2.js"]
```

**Create File 2: docker-compose.yml**

Save as: `<repo>\docker-compose.yml`

Copy from: **DOCKER_QUICK_START.md** → Step 3

(Or get full example from **DOCKER_MULTI_MACHINE_SETUP.md** → Step 2)

---

### Step 3️⃣: Run Tests (10 minutes total)

**Open PowerShell in project directory:**

```powershell
cd "<repo>"
```

**Build image (first time only, takes 2-3 min):**

```powershell
docker-compose build
```

**Start 3 containers:**

```powershell
docker-compose up
```

**Expected output:**
```
Creating load-test-machine-1 ... done
Creating load-test-machine-2 ... done
Creating load-test-machine-3 ... done

load-test-machine-1  | [INIT] Starting widget socket load test
load-test-machine-1  | [INIT] Connecting 50 WebSocket clients...
load-test-machine-2  | [INIT] Starting widget socket load test
load-test-machine-3  | [INIT] Starting widget socket load test

[Wait 5 minutes - test runs automatically]

load-test-machine-1  | [SUMMARY] Test completed. Total connections: 50
load-test-machine-2  | [SUMMARY] Test completed. Total connections: 50
load-test-machine-3  | [SUMMARY] Test completed. Total connections: 50
```

**View results:**

```powershell
# Lihat reports yang auto-generated
ls "scripts/report/"

# Buka di browser
explorer "scripts/report/"
```

---

## 🔍 HOW IT WORKS (Technical)

```
┌─ Container 1 (172.20.0.2)
│  └─ 50 WebSocket connections
│     └─ All from IP: 172.20.0.2
│
├─ Container 2 (172.20.0.3)
│  └─ 50 WebSocket connections
│     └─ All from IP: 172.20.0.3
│
├─ Container 3 (172.20.0.4)
│  └─ 50 WebSocket connections
│     └─ All from IP: 172.20.0.4
│
└─→ Server gets 150 connections from 3 different IPs ✅
```

**Key points:**
- Each container = separate Docker network IP (172.20.0.2/3/4)
- Each container = isolated environment
- Server sees different source IP for each container
- Real IPs (not faked/spoofed)

---

## ❓ FAQS

**Q: Why resize Docker?**
A: Current 4.7GB used / 10GB total. Need 6-8GB for build + 3 containers. Resize to 20GB to be safe.

**Q: Is 172.20.0.2 a real IP?**
A: Yes, real Docker network IP. Not faked. Server genuinely sees 3 different sources.

**Q: Can I use different subnet?**
A: Yes, change `subnet: 172.20.0.0/16` in docker-compose.yml if needed.

**Q: How long does test take?**
A: 5 minutes (RUN_DURATION_MS: 300000). Can change in docker-compose.yml.

**Q: Can server tell these are Docker IPs?**
A: No. They're just 172.20.x.x IPs. Server has no way to know.

**Q: Can I have 10 containers instead of 3?**
A: Yes! Just duplicate services in docker-compose.yml. Get 10 unique IPs.

---

## 📚 DOCUMENTATION

After quick start, refer to these for details:

| Document | For |
|----------|-----|
| **DOCKER_SETUP_README.md** | Navigation & file index |
| **DOCKER_SETUP_SUMMARY.md** | Detailed explanation & comparison |
| **DOCKER_STORAGE_RESIZE.md** | Storage resize options & troubleshooting |
| **DOCKER_QUICK_START.md** | Copy-paste commands (detailed) |
| **DOCKER_MULTI_MACHINE_SETUP.md** | Complete reference guide |
| **DOCKER_NETWORK_IP_EXPLANATION.md** | How Docker networking works |

---

## 🎯 EXPECTED RESULTS

**After 5 minutes, you'll have:**

✅ 3 Docker containers running independently
✅ 150 total connections to server (50 per container)
✅ 3 unique IP sources (server logs will show 3 different IPs)
✅ 3 HTML reports generated (one per container)
✅ Full metrics captured (connections, errors, messages, timing)
✅ Production-ready distributed load test setup

---

## 🛑 STOP & READ FIRST

Before jumping in, consider reading these short docs:

**5 minutes:**
```
DOCKER_SETUP_SUMMARY.md → Understand why Docker
```

**After resize, before running:**
```
DOCKER_STORAGE_RESIZE.md → Method 1 (GUI) - 10 minutes
```

**Ready to implement:**
```
DOCKER_QUICK_START.md → Copy-paste steps - 20 minutes
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Docker Desktop installed
- [ ] Have 10GB+ free disk space
- [ ] Project files exist (widget-socket-load-2.js, report-generator.js, package.json)
- [ ] Read DOCKER_STORAGE_RESIZE.md
- [ ] Resized Docker disk to 20GB
- [ ] Created Dockerfile
- [ ] Created docker-compose.yml
- [ ] Ran `docker-compose build`
- [ ] Ran `docker-compose up`
- [ ] Test ran for 5 minutes
- [ ] Reports generated in `scripts/report/`

---

## 🚀 START NOW

### Option A: Fast Track (Just do it)
1. Resize Docker disk (10 min)
2. Follow DOCKER_QUICK_START.md (20 min)
3. Done! (30 min total)

### Option B: Understand First (Recommended)
1. Read DOCKER_SETUP_SUMMARY.md (10 min)
2. Read DOCKER_STORAGE_RESIZE.md (5 min)
3. Follow DOCKER_QUICK_START.md (20 min)
4. Done! (35 min total)

### Option C: Complete Deep Dive
1. Read all DOCKER_* documents (1 hour)
2. Follow DOCKER_QUICK_START.md (20 min)
3. Experiment with variations (30 min)
4. Done! (2 hours total)

---

## 📞 TROUBLESHOOTING

**Problem: "No space left on device"**
→ See DOCKER_STORAGE_RESIZE.md

**Problem: Containers won't start**
→ Check logs: `docker logs load-test-machine-1`
→ Rebuild: `docker-compose build --no-cache`

**Problem: Cannot reach server**
→ Test DNS: `docker exec load-test-machine-1 nslookup dev.example.test`

**More issues?**
→ See DOCKER_MULTI_MACHINE_SETUP.md → TROUBLESHOOTING

---

## 🎓 WHAT YOU'LL LEARN

- ✅ Docker basics (Dockerfile, docker-compose)
- ✅ Container networking (subnets, IP assignment)
- ✅ Load testing patterns (distributed testing)
- ✅ Performance measurement (metrics, reporting)
- ✅ DevOps concepts (containerization, orchestration)

---

## ⚡ QUICK COMMANDS

```powershell
# Build
docker-compose build

# Run
docker-compose up

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Check status
docker ps

# Get container IP
docker inspect load-test-machine-1 -f '{{.NetworkSettings.Networks.load_test_network.IPAddress}}'

# View reports
explorer scripts/report/
```

---

## 📈 AFTER IT WORKS

### Customize:
- Change `TARGET_CONNECTIONS: 50` to any number
- Change `RUN_DURATION_MS: 300000` to test duration
- Change `MODE: throughput` to messages or rampup

### Scale:
- Add 4th, 5th, 10th container for more sources
- Just duplicate service in docker-compose.yml

### Monitor:
- Use `docker stats` for real-time resources
- Use Portainer dashboard for visual monitoring

---

## 🎯 SUCCESS LOOKS LIKE

```
load-test-machine-1  | [SUMMARY] Connected: 50 | Messages: 1500 | Errors: 0
load-test-machine-2  | [SUMMARY] Connected: 50 | Messages: 1500 | Errors: 0
load-test-machine-3  | [SUMMARY] Connected: 50 | Messages: 1500 | Errors: 0
[REPORT] Generated: scripts/report/load-test-2026-04-09-143000.html
[REPORT] Generated: scripts/report/load-test-2026-04-09-143005.html
[REPORT] Generated: scripts/report/load-test-2026-04-09-143010.html
```

Server sees: **150 connections from 3 different IPs** ✅

---

## 📞 NEED HELP?

**Before starting:** Read DOCKER_SETUP_SUMMARY.md

**During setup:** Follow DOCKER_QUICK_START.md

**If stuck:** Check DOCKER_MULTI_MACHINE_SETUP.md → TROUBLESHOOTING

**For details:** Read all DOCKER_*.md files

---

## 🏁 READY?

→ **Step 1:** Open DOCKER_STORAGE_RESIZE.md

→ **Step 2:** Resize your Docker disk (10 min)

→ **Step 3:** Follow DOCKER_QUICK_START.md (20 min)

→ **Done!** View results in `scripts/report/`

Good luck! 🚀
