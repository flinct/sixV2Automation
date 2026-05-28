# Docker Multi-Machine Setup - COMPLETE SUMMARY

Penjelasan lengkap tentang setup 3 Docker containers sebagai "3 machines" dengan 3 IP berbeda.

---

## 🎯 GOAL: Setiap VU Memiliki IP Masing-masing

Anda ingin: **150 total connections ke server, tapi dari 3 IP sources berbeda (50 per IP)**

### ❌ Tidak Bisa (Single Machine, Single IP):
```
1 Machine (IP: 192.168.1.10)
├─ VU 1-50 (IP source: 192.168.1.10)
├─ VU 51-100 (IP source: 192.168.1.10)
└─ VU 101-150 (IP source: 192.168.1.10)
=================================
Server melihat: 150 connections dari 1 IP
```

### ✅ BISA (3 Docker Containers, 3 IP Berbeda):
```
Container 1 (IP: 172.20.0.2)
├─ VU 1-50 (IP source: 172.20.0.2)

Container 2 (IP: 172.20.0.3)
├─ VU 51-100 (IP source: 172.20.0.3)

Container 3 (IP: 172.20.0.4)
└─ VU 101-150 (IP source: 172.20.0.4)

=================================
Server melihat: 150 connections dari 3 IP berbeda
```

---

## ❓ WHY DOCKER?

### Problem: Multiple IP per Single Machine

Ingin 150 connections dari 3 IP dengan 1 machine?

```
Option 1: Virtual Network Adapters
  - Windows: Kompleks, perlu admin
  - Linux: Mungkin tapi susah automasi
  - Network stack: Complex setup
  - Risk: Unstable, hard to debug

Option 2: Proxy dengan Multiple Upstream
  - Perlu infrastructure (Nginx/HAProxy)
  - Perlu multiple server instances
  - Overhead untuk manage

Option 3: Fake IP Headers
  - Server bisa ignore/validate
  - Tidak genuine connections
  - Mudah dideteksi sebagai fake

Option 4: Docker Containers ✅
  - Each container = separate environment
  - Each container = different IP (dalam Docker network)
  - Easy to setup (docker-compose)
  - Production-ready approach
  - Scalable (bisa 3 atau 100 containers)
```

### Why Docker is BEST:

✅ **Each container has own IP** (172.20.0.2, 172.20.0.3, 172.20.0.4)
✅ **Isolated environments** (each container independent)
✅ **Easy orchestration** (docker-compose manage semua)
✅ **Scalable** (duplicate containers untuk scale)
✅ **Reproducible** (same setup di any machine)
✅ **No admin complexity** (Docker handle network untuk Anda)
✅ **Production pattern** (industry standard)

---

## 📋 WHAT YOU'LL CREATE

### Files to Create:

```
1. Dockerfile
   - Base image: Node.js Alpine
   - Install dependencies
   - Copy scripts
   - Set environment variables
   - Run widget-socket-load-2.js

2. docker-compose.yml
   - Define 3 services (load-test-1, load-test-2, load-test-3)
   - Each service = 1 container
   - Shared network (172.20.0.0/16)
   - Volume mounts untuk reports
   - Environment variables per service

3. .dockerignore (Optional)
   - Exclude files not needed untuk image
   - Reduce image size
```

### How It Works:

```
Step 1: docker-compose build
├─ Read Dockerfile
├─ Download Node.js Alpine image
├─ Install npm dependencies
├─ Copy scripts
└─ Create image: sixv2automation_load-test:latest

Step 2: docker-compose up
├─ Create network: load-test-network (subnet 172.20.0.0/16)
├─ Start container 1 (IP: 172.20.0.2)
│  └─ Run: node scripts/widget-socket-load-2.js
├─ Start container 2 (IP: 172.20.0.3)
│  └─ Run: node scripts/widget-socket-load-2.js
└─ Start container 3 (IP: 172.20.0.4)
   └─ Run: node scripts/widget-socket-load-2.js

Result:
├─ Container 1: 50 connections from 172.20.0.2
├─ Container 2: 50 connections from 172.20.0.3
├─ Container 3: 50 connections from 172.20.0.4
└─ Reports: Saved to ./scripts/report/ (shared volume)
```

---

## 💾 ABOUT DOCKER STORAGE

### Current Situation:
```
Docker Disk: 10 GB
- Used: 4.7 GB (existing images/containers)
- Available: 5.3 GB

Need for 3 containers:
- Base image: ~250MB
- Each container: ~400-500MB runtime
- Total need: ~1.5-2GB for all 3
```

### Storage Check:
```powershell
docker system df

Output:
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          5         3         2.5GB     1.2GB
Containers      8         2         500MB     400MB
Local Volumes   10        5         1.2GB     500MB
Build Cache     15        0         3.2GB     3.2GB (reclaimable!)
```

### Problem:
- Build cache sudah 3.2GB (mostly unused)
- Total disk 10GB kurang untuk peace of mind
- Resizing dari 10GB → 20GB lebih aman

### Solution:

**Option A: Cleanup first (Safe)**
```powershell
docker system prune -a -f  # Free up 3.2GB build cache
# Then: 4.7GB - 3.2GB = 1.5GB used, 8.5GB free ✅
```

**Option B: Resize (Recommended)**
```
10GB → 20GB (via Docker Desktop GUI)
Takes: 10 minutes
Risk: None (Docker handle it)
Result: Plenty of space for everything
```

**Option C: Both (Best)**
```
1. Cleanup with docker prune
2. Resize to 20GB
3. Peace of mind + performance
```

---

## 🚀 STEP-BY-STEP IMPLEMENTATION

### Phase 1: Prepare (5 minutes)

**1.1: Resize Docker Storage**

Go to: Docker Desktop Settings → Resources → Disk image size

```
Change: 10 GB → 20 GB
Click: Apply & Restart
Wait: 5-10 minutes
```

**Verify:**
```powershell
docker system df
# Should show TOTAL available increased
```

---

### Phase 2: Create Files (5 minutes)

**2.1: Create Dockerfile**

```powershell
@"
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
"@ | Out-File -Encoding UTF8 Dockerfile
```

**Location:** `<repo>\Dockerfile`

**2.2: Create docker-compose.yml**

See: `DOCKER_QUICK_START.md` Step 3 (copy-paste ready)

**Location:** `<repo>\docker-compose.yml`

**2.3: (Optional) Create .dockerignore**

Reduces image size from ~350MB to ~250MB.

---

### Phase 3: Build & Run (10 minutes)

**3.1: Build Image**

```powershell
cd "<repo>"
docker-compose build
# Wait 2-3 minutes
```

**3.2: Start Containers**

```powershell
docker-compose up

# Wait for output:
# load-test-machine-1  | [INIT] Starting widget socket load test
# load-test-machine-2  | [INIT] Starting widget socket load test
# load-test-machine-3  | [INIT] Starting widget socket load test
```

---

### Phase 4: Monitor (5 minutes every 10 seconds)

```powershell
# In new terminal:
docker-compose logs -f

# Or monitor each:
docker logs -f load-test-machine-1
docker logs -f load-test-machine-2
docker logs -f load-test-machine-3

# Or see resource usage:
docker stats
```

---

### Phase 5: Collect Results (2 minutes)

After 5 minutes test completes:

```powershell
# Reports automatically saved to:
ls "scripts/report/"

# Output:
# load-test-2026-04-09-143000.html
# load-test-2026-04-09-143005.html
# load-test-2026-04-09-143010.html

# Open in browser:
start "scripts/report"
```

---

### Phase 6: Cleanup (1 minute)

```powershell
# Stop containers
docker-compose down

# Optional: Remove image
docker rmi sixv2automation_load-test:latest

# Optional: Cleanup all unused
docker system prune -a -f
```

---

## 🎯 EXPECTED RESULTS

### Server-side view (via server logs):

```
[CONNECTION] IP: 172.20.0.2, Connections: 50
[CONNECTION] IP: 172.20.0.3, Connections: 50
[CONNECTION] IP: 172.20.0.4, Connections: 50

Total: 150 connections from 3 unique IPs
```

### Client-side output:

**Container 1:**
```
[INIT] Connecting 50 WebSocket clients...
[PROGRESS] Time: 10s | Connected: 50 | Messages: 50
[PROGRESS] Time: 20s | Connected: 50 | Messages: 100
...
[SUMMARY] Total connections: 50
[SUMMARY] Total messages: 1500
[REPORT] HTML report generated: /app/scripts/report/load-test-2026-04-09-143000.html
```

**Container 2:**
```
[INIT] Connecting 50 WebSocket clients...
[PROGRESS] Time: 10s | Connected: 50 | Messages: 50
[PROGRESS] Time: 20s | Connected: 50 | Messages: 100
...
[SUMMARY] Total connections: 50
[SUMMARY] Total messages: 1500
[REPORT] HTML report generated: /app/scripts/report/load-test-2026-04-09-143005.html
```

**Container 3:**
```
[INIT] Connecting 50 WebSocket clients...
[PROGRESS] Time: 10s | Connected: 50 | Messages: 50
[PROGRESS] Time: 20s | Connected: 50 | Messages: 100
...
[SUMMARY] Total connections: 50
[SUMMARY] Total messages: 1500
[REPORT] HTML report generated: /app/scripts/report/load-test-2026-04-09-143010.html
```

---

## 📊 PERFORMANCE IMPACT

### Disk Usage:

```
Before: 4.7GB / 10GB
After: ~6.5GB / 20GB

Breakdown:
- Images: +250MB (load-test image)
- Containers: +1.5GB (3x containers running)
- Cache: Same (cleared by prune)
```

### Memory Usage:

```
Per container: ~400-500MB
Total for 3: ~1.2-1.5GB
Available after: 8GB-14GB (depends on system)
```

### CPU Usage:

```
Multi-core distribution
Container 1: ~20-30% of 1 core
Container 2: ~20-30% of 1 core
Container 3: ~20-30% of 1 core
Total: ~60-90% of 1 full core (parallelizable)
```

### Network:

```
Per container: ~50-100 Mbps (depends on server)
Total: ~150-300 Mbps (3 containers)
```

---

## ✅ ADVANTAGES vs ALTERNATIVES

### vs Physical Machines:
```
Docker: ✅ Single Windows PC, setup 5 mins
Physical: ❌ Need 3 PCs, network them, manage 3x OS
```

### vs VM (VirtualBox/Hyper-V):
```
Docker: ✅ Lightweight, ~250MB per container
VM: ❌ Heavy, ~2-5GB per VM
```

### vs Kubernetes:
```
Docker: ✅ Simple, docker-compose, perfect for test
K8s: ❌ Overkill, complex, for production scale
```

### vs K6 (Distributed):
```
Docker: ✅ Genuine Socket.IO, run locally
K6: ❌ WebSocket incompatible with Socket.IO
```

### vs Single Machine + Fake Headers:
```
Docker: ✅ Genuine IPs, server can't detect fake
Fake: ❌ Server validates headers, detects fake
```

---

## 🎓 LEARNING OUTCOMES

After this setup, you'll understand:

1. **Docker basics** - Building images, running containers
2. **docker-compose** - Orchestration, networking, volumes
3. **Container networking** - Bridged networks, IP assignment
4. **Load testing patterns** - Distributed testing best practices
5. **Performance testing** - Multi-source load simulation

---

## 📚 DOCUMENTATION FILES

This package includes:

| File | Purpose |
|------|---------|
| `DOCKER_QUICK_START.md` | Copy-paste ready 5-step setup |
| `DOCKER_MULTI_MACHINE_SETUP.md` | Detailed guide for everything |
| `DOCKER_STORAGE_RESIZE.md` | Complete storage resize guide |
| `DOCKER_SETUP_SUMMARY.md` | This file - overview & explanation |

**Reading Order:**
1. Read this file (DOCKER_SETUP_SUMMARY.md) - understand what & why
2. Read DOCKER_STORAGE_RESIZE.md - resize storage
3. Follow DOCKER_QUICK_START.md - do the setup
4. Refer to DOCKER_MULTI_MACHINE_SETUP.md - detailed reference

---

## 🚀 READY TO START?

### Pre-flight Checklist:

- [ ] Understand the goal (150 connections from 3 IPs)
- [ ] Understand why Docker (best approach)
- [ ] Have Docker Desktop installed
- [ ] Have 20GB available storage OR cleanup first
- [ ] Have scripts/widget-socket-load-2.js ready
- [ ] Have scripts/report-generator.js ready
- [ ] Have package.json ready

### Next Step:

1. **Resize Docker** (DOCKER_STORAGE_RESIZE.md, Method 1)
2. **Follow Quick Start** (DOCKER_QUICK_START.md)
3. **Monitor & Collect** (scripts/report/*.html)

---

## 💡 TIPS & TRICKS

### Customize Before Running:

Edit `docker-compose.yml` to change:

```yaml
TARGET_CONNECTIONS: 50        # Per container
RUN_DURATION_MS: 300000       # Test duration
EMIT_EVERY_MS: 200            # Emit interval
MODE: throughput              # or: messages, rampup
```

### Scale to More Containers:

Copy-paste service definition to add 4th, 5th, etc container.

### Get Container IP:

```powershell
docker inspect load-test-machine-1 | findstr '"IPAddress"'
# Shows actual IP in Docker network
```

### View All Logs Combined:

```powershell
docker-compose logs
# Shows all containers together (easier to compare)
```

### Tail Last 50 Lines:

```powershell
docker logs --tail 50 load-test-machine-1
```

### Follow Logs (Like tail -f):

```powershell
docker logs -f load-test-machine-1
```

---

## ⚠️ COMMON MISTAKES

❌ **Mistake 1:** Forget to resize storage first
✅ **Fix:** Do DOCKER_STORAGE_RESIZE.md first

❌ **Mistake 2:** Run docker-compose up without build
✅ **Fix:** Always `docker-compose build` first

❌ **Mistake 3:** Edit docker-compose but forget rebuild
✅ **Fix:** After config change: `docker-compose down && docker-compose build --no-cache && docker-compose up`

❌ **Mistake 4:** Close terminal before test finishes
✅ **Fix:** Test runs in background, use `-d`: `docker-compose up -d`

---

## 🎯 OUTCOME

After completing this setup:

✅ 3 Docker containers running simultaneously
✅ 150 total connections (50 per container)
✅ 3 unique IP sources (Docker network IPs)
✅ 3 HTML reports generated (one per container)
✅ Full control over parameters (scalable)
✅ Production-ready architecture

**Total time:** ~30 minutes (including storage resize)

---

## 📞 STILL HAVE QUESTIONS?

See specific guides:
- **Storage issue:** DOCKER_STORAGE_RESIZE.md
- **Setup confusion:** DOCKER_QUICK_START.md
- **Advanced topics:** DOCKER_MULTI_MACHINE_SETUP.md
- **Troubleshooting:** DOCKER_MULTI_MACHINE_SETUP.md → TROUBLESHOOTING section

---

Good luck! 🚀
