# Docker Multi-Machine Load Test - QUICK START GUIDE

Copy-paste ready commands untuk setup dan jalankan 3 Docker containers!

---

## 🚀 QUICK START (5 Langkah)

### 1️⃣ Resize Docker Disk (PENTING!)

**Buka Docker Desktop:**
```
Docker Desktop Icon (tray) → Settings ⚙️ → Resources → Disk image size
```

**Ubah dari 10GB ke 20GB:**
```
Current: 10 GB
Change to: 20 GB
Click: Apply & Restart
```

⏳ **Tunggu Docker restart (5-10 menit)**

Verifikasi:
```powershell
docker system df
```

---

### 2️⃣ Create Dockerfile

**Buka PowerShell di project directory:**

```powershell
cd "<repo>"
```

**Create file: `Dockerfile`**

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

**Verify file created:**
```powershell
ls Dockerfile
# Output: Dockerfile (yang baru)
```

---

### 3️⃣ Create docker-compose.yml

**Create file: `docker-compose.yml`**

```powershell
@"
version: '3.8'

services:
  load-test-1:
    build: .
    container_name: load-test-machine-1
    hostname: load-test-1
    environment:
      BASE_URL: https://dev.example.test
      MODE: throughput
      TARGET_CONNECTIONS: 50
      RUN_DURATION_MS: 300000
      EMIT_EVERY_MS: 200
      LOG_LEVEL: info
    volumes:
      - ./scripts/report:/app/scripts/report:rw
    networks:
      - load-test-network

  load-test-2:
    build: .
    container_name: load-test-machine-2
    hostname: load-test-2
    environment:
      BASE_URL: https://dev.example.test
      MODE: throughput
      TARGET_CONNECTIONS: 50
      RUN_DURATION_MS: 300000
      EMIT_EVERY_MS: 200
      LOG_LEVEL: info
    volumes:
      - ./scripts/report:/app/scripts/report:rw
    networks:
      - load-test-network
    depends_on:
      - load-test-1

  load-test-3:
    build: .
    container_name: load-test-machine-3
    hostname: load-test-3
    environment:
      BASE_URL: https://dev.example.test
      MODE: throughput
      TARGET_CONNECTIONS: 50
      RUN_DURATION_MS: 300000
      EMIT_EVERY_MS: 200
      LOG_LEVEL: info
    volumes:
      - ./scripts/report:/app/scripts/report:rw
    networks:
      - load-test-network
    depends_on:
      - load-test-2

networks:
  load-test-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
"@ | Out-File -Encoding UTF8 docker-compose.yml
```

**Verify:**
```powershell
ls docker-compose.yml
# Output: docker-compose.yml (yang baru)
```

---

### 4️⃣ Build Docker Image

```powershell
# Go to project directory
cd "<repo>"

# Build image (pertama kali, ambil 2-3 menit)
docker-compose build

# Expected output:
# Building load-test-1 ...
# Step 1/9 : FROM node:18-alpine
# Step 2/9 : WORKDIR /app
# ...
# Successfully built [hash]
```

⏳ **Tunggu sampai selesai**

Verify:
```powershell
docker images | findstr "sixv2automation"
# Output: sixv2automation_load-test   latest   abc123def   2 minutes ago   ...
```

---

### 5️⃣ Run 3 Containers!

```powershell
# Start semua 3 containers
docker-compose up

# Expected output:
# Creating load-test-machine-1 ... done
# Creating load-test-machine-2 ... done
# Creating load-test-machine-3 ... done
# 
# load-test-machine-1  | [INIT] Starting widget socket load test
# load-test-machine-1  | [INIT] Connecting 50 WebSocket clients...
# ...
# load-test-machine-2  | [INIT] Starting widget socket load test
# ...
# load-test-machine-3  | [INIT] Starting widget socket load test
```

**Live monitoring akan terlihat di console!**

---

## 📊 Monitor Progress

**Buka terminal baru, jalankan:**

```powershell
# Lihat semua logs
docker-compose logs -f

# Atau individual container
docker logs -f load-test-machine-1
docker logs -f load-test-machine-2
docker logs -f load-test-machine-3

# Lihat resource usage
docker stats
```

---

## 📈 Expected Behavior

Setiap 10 detik akan print progress:

```
load-test-machine-1  | [PROGRESS] Time: 10s | Connected: 50 | Errors: 0 | Messages: 50
load-test-machine-1  | [PROGRESS] Time: 20s | Connected: 50 | Errors: 0 | Messages: 100

load-test-machine-2  | [PROGRESS] Time: 10s | Connected: 50 | Errors: 0 | Messages: 50
load-test-machine-2  | [PROGRESS] Time: 20s | Connected: 50 | Errors: 0 | Messages: 100

load-test-machine-3  | [PROGRESS] Time: 10s | Connected: 50 | Errors: 0 | Messages: 50
load-test-machine-3  | [PROGRESS] Time: 20s | Connected: 50 | Errors: 0 | Messages: 100
```

**TOTAL di server: 150 connections dari 3 IP berbeda!**

---

## 📁 Lihat Reports

Setelah test selesai (5 menit), reports otomatis tersimpan:

```powershell
# Lihat semua reports
ls "scripts/report/"

# Expected output:
# load-test-2026-04-09-143000.html
# load-test-2026-04-09-143005.html
# load-test-2026-04-09-143010.html

# Open reports
explorer "scripts/report"

# Atau buka di browser
start "scripts/report/load-test-2026-04-09-143000.html"
```

Setiap report akan menunjukkan metrics dari masing-masing container.

---

## 🛑 Stop Containers

Setelah selesai, stop containers:

```powershell
# Di terminal yang running docker-compose, tekan:
Ctrl + C

# Atau di terminal baru:
docker-compose down

# Output:
# Stopping load-test-machine-3 ... done
# Stopping load-test-machine-2 ... done
# Stopping load-test-machine-1 ... done
# Removing load-test-machine-3 ... done
# ...
```

---

## ⚙️ Customize Parameters

**Edit `docker-compose.yml`** untuk ubah test parameters:

```yaml
services:
  load-test-1:
    environment:
      TARGET_CONNECTIONS: 50        # ← Ubah jumlah VUs
      RUN_DURATION_MS: 300000       # ← Ubah durasi (ms)
      EMIT_EVERY_MS: 200            # ← Ubah emit interval
      MODE: throughput              # ← Mode: throughput|messages|rampup
```

**Save dan re-run:**
```powershell
docker-compose down
docker-compose build --no-cache
docker-compose up
```

---

## 🚨 Troubleshooting

### Error: "No space left on device"
→ Resize Docker disk (Step 1)

### Error: "docker-compose: command not found"
```powershell
# Install docker-compose
choco install docker-compose
# atau
scoop install docker-compose
```

### Containers crash immediately
```powershell
# Check logs
docker logs load-test-machine-1 --tail 30

# Rebuild without cache
docker-compose build --no-cache
docker-compose up
```

### Cannot reach server (dev.example.test)
```powershell
# Test dari container
docker exec load-test-machine-1 ping 8.8.8.8

# Check DNS
docker exec load-test-machine-1 nslookup dev.example.test
```

---

## 📋 Commands Summary

| Command | Purpose |
|---------|---------|
| `docker-compose build` | Build image pertama kali |
| `docker-compose up` | Start 3 containers |
| `docker-compose down` | Stop semua containers |
| `docker-compose logs -f` | Lihat live logs |
| `docker logs -f [container]` | Lihat logs container tertentu |
| `docker stats` | Monitor resource usage |
| `docker ps` | Lihat running containers |
| `docker images` | Lihat available images |

---

## ✅ What You Get

After 5 minutes, you'll have:

✅ **3 Docker containers running** sebagai 3 "machines"
✅ **150 total connections** ke target server (50 per container)
✅ **3 IP sources** - server akan melihat requests dari 3 IP berbeda
✅ **3 HTML reports** - masing-masing container generate reportnya
✅ **All metrics captured** - connected, errors, messages, timing

---

## 🎯 Next: Advanced

Setelah basic setup berjalan, bisa customize:

- **Different parameters per machine** (edit docker-compose.yml)
- **Scale to 5+ containers** (duplicate services)
- **Custom network IPs** (edit subnet di networks section)
- **Data persistence** (named volumes)
- **Health monitoring** (healthcheck configuration)

---

## 📞 Need Help?

Check detailed guide: `DOCKER_MULTI_MACHINE_SETUP.md`

Troubleshooting section: Same file, scroll to "TROUBLESHOOTING"
