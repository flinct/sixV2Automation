# Docker Multi-Machine Load Testing Setup

Complete guide untuk setup 3 Docker containers sebagai distributed load test dengan 3 unique IP sources.

---

## 🎯 GOAL

**Ingin:** 150 WebSocket connections ke server, tapi dari 3 IP sources berbeda
- Machine 1 (IP: 172.20.0.2): 50 connections
- Machine 2 (IP: 172.20.0.3): 50 connections
- Machine 3 (IP: 172.20.0.4): 50 connections

**Result:** Server melihat 150 connections dari 3 unique IPs ✅

---

## 📚 DOCUMENTATION STRUCTURE

### 1. **DOCKER_SETUP_SUMMARY.md** (READ FIRST)
   - **What:** Overview & explanation
   - **Why:** Why Docker is best approach
   - **When:** Problem vs solution
   - **Time:** 5 minutes reading
   - **Best for:** Understanding the concept

### 2. **DOCKER_STORAGE_RESIZE.md** (READ SECOND)
   - **What:** How to resize Docker disk from 10GB to 20GB
   - **Why:** Current storage not enough (4.7GB used, need 6-8GB for 3 containers)
   - **How:** 4 methods (GUI recommended)
   - **Time:** 10-15 minutes for resize
   - **Best for:** Preparing environment

### 3. **DOCKER_QUICK_START.md** (DO THIS)
   - **What:** Step-by-step copy-paste commands
   - **Why:** Get it running fast
   - **How:** 5 clear steps with commands
   - **Time:** 20 minutes total
   - **Best for:** Implementation

### 4. **DOCKER_MULTI_MACHINE_SETUP.md** (REFERENCE)
   - **What:** Complete detailed guide
   - **Why:** Detailed explanations for everything
   - **How:** 6 phases with troubleshooting
   - **Time:** Read as needed
   - **Best for:** Understanding details, fixing issues

### 5. **DOCKER_NETWORK_IP_EXPLANATION.md** (OPTIONAL)
   - **What:** How Docker networking works
   - **Why:** Understand why 3 containers = 3 IPs
   - **How:** Diagrams, flows, technical deep-dive
   - **Time:** 10 minutes for understanding
   - **Best for:** Learning, debugging network issues

---

## 🚀 QUICK REFERENCE

### Files You Need to Create

```
<repo>\

├── Dockerfile                    ← NEW (create from DOCKER_QUICK_START.md)
├── docker-compose.yml            ← NEW (create from DOCKER_QUICK_START.md)
├── .dockerignore                 ← OPTIONAL (optional, in DOCKER_MULTI_MACHINE_SETUP.md)

├── scripts/
│   ├── widget-socket-load-2.js   ✅ Already exists
│   ├── report-generator.js       ✅ Already exists
│   └── report/                   ✅ Will be created automatically
```

### Commands You'll Run

```powershell
# 1. Resize Docker disk (10GB → 20GB)
# Via Docker Desktop Settings GUI
# Takes: 5-10 minutes

# 2. Create files
# Copy-paste from DOCKER_QUICK_START.md
# Takes: 5 minutes

# 3. Build image
docker-compose build
# Takes: 2-3 minutes

# 4. Start containers
docker-compose up
# Takes: 5 minutes (auto-runs test for 5 min, reports auto-generate)

# 5. View results
ls scripts/report/
explorer scripts/report/
# Takes: 1 minute
```

**Total Time: ~30 minutes**

---

## 📋 STEP-BY-STEP CHECKLIST

### Phase 1: Preparation

- [ ] Read DOCKER_SETUP_SUMMARY.md (understand why)
- [ ] Read DOCKER_STORAGE_RESIZE.md (prepare storage)
- [ ] Open Docker Desktop Settings
- [ ] Resize disk: 10GB → 20GB
- [ ] Wait for Docker restart (~10 min)
- [ ] Verify with: `docker system df`

### Phase 2: Create Files

- [ ] Create `Dockerfile` (from DOCKER_QUICK_START.md Step 2)
- [ ] Create `docker-compose.yml` (from DOCKER_QUICK_START.md Step 3)
- [ ] (Optional) Create `.dockerignore`
- [ ] Verify files exist in project root

### Phase 3: Build

- [ ] Open PowerShell in project directory
- [ ] Run: `docker-compose build`
- [ ] Wait for build to complete (~2-3 min)

### Phase 4: Run

- [ ] Run: `docker-compose up`
- [ ] Watch output (should see all 3 containers starting)
- [ ] See progress logs every 10 seconds
- [ ] Test runs for 5 minutes automatically

### Phase 5: Collect Results

- [ ] After 5 minutes, containers stop automatically
- [ ] Check: `ls scripts/report/`
- [ ] Should see 3 HTML files with timestamps
- [ ] Open in browser to view reports

### Phase 6: Cleanup

- [ ] Run: `docker-compose down` (stop containers)
- [ ] Verify containers stopped: `docker ps`
- [ ] (Optional) Clean space: `docker system prune -a -f`

---

## 🎯 WHAT YOU'LL LEARN

After completing this setup:

1. **Docker basics**
   - Building images from Dockerfile
   - Running containers with docker-compose
   - Managing multiple containers

2. **Container networking**
   - Custom Docker networks
   - IP assignment (IPAM)
   - Bridge networking

3. **Load testing patterns**
   - Distributed load simulation
   - Multi-source testing
   - Performance measurement

4. **DevOps concepts**
   - IaC (Infrastructure as Code)
   - Containerization
   - Orchestration

---

## ❓ FAQs

### Q: Why Docker instead of 3 physical machines?
**A:** Much simpler, no network setup, single PC, 30 minutes vs days.

### Q: Why is storage resize needed?
**A:** Current 4.7GB used / 10GB total leaves only 5.3GB. Need 6-8GB for 3 containers. Safer to resize to 20GB.

### Q: Can I use VM (VirtualBox/Hyper-V) instead?
**A:** Possible but heavier (~2-5GB per VM). Docker is lighter (~250MB per container).

### Q: What if I don't resize storage?
**A:** Might fail with "No space left on device" during build or run. Better to resize.

### Q: How long does test take?
**A:** 5 minutes (RUN_DURATION_MS: 300000). Can change in docker-compose.yml.

### Q: Can I scale to more containers?
**A:** Yes, duplicate services in docker-compose.yml. Can have 10+ containers with 10 unique IPs.

### Q: Are the IPs genuine?
**A:** Yes, 172.20.0.2/3/4 are real Docker network IPs, not faked or spoofed.

### Q: Server will see 3 IPs?
**A:** Yes, each connection from Docker container will have its container's IP as source.

### Q: Can containers talk to each other?
**A:** Yes, via IP (172.20.0.2, etc) or hostname (load-test-1, load-test-2).

### Q: Where are reports saved?
**A:** `scripts/report/` folder. Auto-created when containers run.

### Q: Can I view reports while test is running?
**A:** Reports are only created after test finishes.

---

## 📖 READING RECOMMENDATIONS

### For Understanding (10 min)
1. DOCKER_SETUP_SUMMARY.md → Overview

### For Implementation (30 min total)
1. DOCKER_STORAGE_RESIZE.md → Resize storage (10 min)
2. DOCKER_QUICK_START.md → Do the setup (20 min)

### For Details & Reference
1. DOCKER_MULTI_MACHINE_SETUP.md → Detailed guide
2. DOCKER_NETWORK_IP_EXPLANATION.md → How networking works

### For Troubleshooting
→ DOCKER_MULTI_MACHINE_SETUP.md → Search "TROUBLESHOOTING"

---

## 🔧 COMMON ISSUES & SOLUTIONS

### Issue: "No space left on device"
→ See DOCKER_STORAGE_RESIZE.md, Method 1 or 4

### Issue: "docker-compose: command not found"
→ Install: `choco install docker-compose` or `scoop install docker-compose`

### Issue: Build fails with network error
→ Check internet connection
→ Run: `docker pull node:18-alpine` separately

### Issue: Containers crash immediately
→ Check logs: `docker logs load-test-machine-1 --tail 20`
→ Rebuild: `docker-compose build --no-cache`

### Issue: Cannot reach server
→ Check DNS: `docker exec load-test-machine-1 nslookup dev.example.test`
→ Check network: `docker exec load-test-machine-1 ping 8.8.8.8`

### Issue: Reports not generated
→ Check space: `docker system df`
→ Check paths: `docker exec load-test-machine-1 ls -la /app/scripts/report`

---

## ✅ SUCCESS INDICATORS

When everything works:

✅ `docker-compose up` starts all 3 containers
✅ Containers show progress logs every 10 seconds
✅ Each container reports 50 connections
✅ Test runs for 5 minutes and completes
✅ 3 HTML reports generated in `scripts/report/`
✅ `docker-compose down` gracefully stops all

---

## 🚀 NEXT STEPS AFTER SETUP WORKS

1. **Customize parameters** (docker-compose.yml)
   - Change TARGET_CONNECTIONS
   - Change RUN_DURATION_MS
   - Change EMIT_EVERY_MS
   - Change MODE

2. **Scale to more containers**
   - Add load-test-4, load-test-5, etc
   - Get 10+ sources instead of 3

3. **Add monitoring**
   - Portainer dashboard for visual monitoring
   - Custom metrics collection

4. **Performance tuning**
   - Adjust memory/CPU limits
   - Test with different server responses

---

## 📞 NEED HELP?

**For specific topics:**

| Topic | See File |
|-------|----------|
| "What & Why" | DOCKER_SETUP_SUMMARY.md |
| "Storage issue" | DOCKER_STORAGE_RESIZE.md |
| "How to do it" | DOCKER_QUICK_START.md |
| "Details/reference" | DOCKER_MULTI_MACHINE_SETUP.md |
| "How networking works" | DOCKER_NETWORK_IP_EXPLANATION.md |
| "Troubleshooting" | DOCKER_MULTI_MACHINE_SETUP.md → TROUBLESHOOTING |

**For general help:**
- Check Docker docs: https://docs.docker.com
- Check Docker Compose: https://docs.docker.com/compose

---

## 📊 EXPECTED TIMELINE

| Phase | Time | Activity |
|-------|------|----------|
| Read docs | 15 min | DOCKER_SETUP_SUMMARY.md + STORAGE_RESIZE.md |
| Resize Docker | 10-15 min | Docker GUI → resize disk → restart |
| Create files | 5 min | Copy-paste Dockerfile + docker-compose.yml |
| Build image | 2-3 min | `docker-compose build` |
| Run test | 5 min | `docker-compose up` (auto-runs) |
| View results | 1 min | Open `scripts/report/` folder |
| **TOTAL** | **~40 min** | Full setup to viewing results |

---

## 🎓 LEARNING PATH

**Beginner:**
1. DOCKER_SETUP_SUMMARY.md (understand why)
2. DOCKER_QUICK_START.md (just follow steps)
3. Run it, see it work

**Intermediate:**
1. DOCKER_SETUP_SUMMARY.md
2. DOCKER_MULTI_MACHINE_SETUP.md (detailed)
3. DOCKER_NETWORK_IP_EXPLANATION.md (how it works)
4. Customize and experiment

**Advanced:**
1. Read all documentation
2. Modify Dockerfile for custom setup
3. Scale to 10+ containers
4. Integrate with monitoring/dashboards
5. Add health checks and logging

---

## ✨ KEY INSIGHTS

🔑 **Docker provides:**
- ✅ 3 genuine IP sources (not faked)
- ✅ Real network isolation
- ✅ Easy to setup and scale
- ✅ Reproducible across machines
- ✅ Production-ready architecture

🔑 **Socket.IO client limitation:**
- ❌ Cannot bind to specific local IP
- ✅ But Docker handles it at container level

🔑 **Network bridge approach:**
- ✅ Custom subnet (172.20.0.0/16)
- ✅ Docker auto-assigns IPs (172.20.0.2/3/4)
- ✅ Server sees different IP for each container

🔑 **Scalability:**
- Add more containers = Add more IP sources
- No code changes needed
- Just edit docker-compose.yml

---

## 📝 DOCUMENT SIZES

| Document | Size | Read Time |
|----------|------|-----------|
| DOCKER_SETUP_SUMMARY.md | ~13KB | 10 min |
| DOCKER_STORAGE_RESIZE.md | ~9KB | 8 min |
| DOCKER_QUICK_START.md | ~8KB | 5 min |
| DOCKER_MULTI_MACHINE_SETUP.md | ~14KB | 15 min |
| DOCKER_NETWORK_IP_EXPLANATION.md | ~16KB | 12 min |

**Total reading:** ~50 minutes (optional)
**To just do it:** ~5 minutes (follow QUICK_START)

---

## 🎯 SUCCESS CRITERIA

After completing this:

✅ You understand why Docker approach
✅ You can setup 3 Docker containers
✅ Each container has unique IP
✅ Load test runs with 3 sources
✅ Reports auto-generate with metrics
✅ You can scale to more containers if needed
✅ You understand Docker networking basics

---

## 📞 SUPPORT

This is a complete, self-contained guide. All information needed is in these documents.

If you have questions:
1. Search relevant document (Ctrl+F)
2. Check TROUBLESHOOTING section
3. Re-read the specific section

---

**Ready to start?** → Begin with **DOCKER_STORAGE_RESIZE.md** (resize disk first)

Then → Follow **DOCKER_QUICK_START.md** (5-step implementation)

Good luck! 🚀
