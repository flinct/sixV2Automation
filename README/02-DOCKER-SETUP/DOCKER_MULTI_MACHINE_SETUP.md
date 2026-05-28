# Docker Multi-Machine Setup untuk Socket.IO Load Testing

## Ringkasan Cepat

Setup 3 Docker containers sebagai "3 machines" untuk distributed load testing dengan 3 IP sources berbeda.

**Hasil yang diharapkan:**
- Machine 1 (Container 1): 50 connections dari IP 1
- Machine 2 (Container 2): 50 connections dari IP 2
- Machine 3 (Container 3): 50 connections dari IP 3
- **Total: 150 connections dari 3 IP berbeda**

---

## BAGIAN 1: Menambah Storage Docker Desktop

### ❓ Mengapa Storage Penuh?

Docker Desktop menggunakan `docker-desktop-data` virtual disk. Saat ini Anda sudah menggunakan **4.7GB dari 10GB**.

Untuk 3 containers + Node.js + dependencies, butuh minimal **6-8GB**.

### ✅ Solusi: Resize Docker Disk

#### **Option 1: Via Docker Desktop GUI (RECOMMENDED - Paling Simple)**

**Step 1:** Buka Docker Desktop Settings
```
Docker Desktop Icon → Settings (⚙️) → Resources
```

**Step 2:** Cari bagian "Disk image size"
```
Disk image size: 10 GB ← Saat ini
```

**Step 3:** Ubah ke 20GB atau lebih
```
Disk image size: 20 GB ← Baru
Apply & Restart
```

**Step 4:** Tunggu Docker restart (5-10 menit)
```
Status: Docker is restarting...
(Tunggu sampai "Docker Desktop is running")
```

**Verification:**
```powershell
docker system df
```

Output akan menunjukkan:
```
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          5         3         2.5GB     1.2GB
Containers      8         2         500MB     400MB
Local Volumes   10        5         1.2GB     500MB
Build Cache     15        0         3.2GB     3.2GB
```

---

#### **Option 2: Via PowerShell (Manual - Jika Option 1 tidak bekerja)**

**Step 1:** Buka PowerShell sebagai Administrator
```powershell
# Run as Administrator
Start-Process PowerShell -Verb RunAs
```

**Step 2:** Stop Docker
```powershell
& 'C:\Program Files\Docker\Docker\Docker Desktop.exe' --unregister-service
```

**Step 3:** Resize disk image
```powershell
# Buka command prompt dari Docker (Windows)
# Disk biasanya di: C:\Users\<Username>\AppData\Local\Docker\wsl\data\ext4.vhdx

# Menggunakan wsl tools:
wsl --list --verbose
wsl --export docker-desktop-data "C:\Docker Backup\docker-desktop-data.tar"
```

**⚠️ Ini kompleks! Gunakan Option 1 saja.**

---

#### **Option 3: Cleanup Docker (Bersihkan space yang tidak terpakai)**

Jika tidak ingin resize, coba bersihkan dulu:

```powershell
# Hapus unused images
docker image prune -a -f

# Hapus unused containers
docker container prune -f

# Hapus build cache
docker builder prune -a -f

# Lihat space yang terbebaskan
docker system df
```

**Biasanya dapat kembalikan 1-2GB.**

---

## BAGIAN 2: Setup 3 Docker Containers

### ✅ Prerequisites

```powershell
# Verify Docker installed
docker --version
# Docker version 20.10+

# Verify Docker running
docker ps
```

### 📋 Struktur Directory untuk Docker

```
<repo>\
├── Dockerfile                          ← Create baru
├── docker-compose.yml                  ← Create baru
├── .dockerignore                       ← Create baru (optional)
├── scripts/
│   ├── widget-socket-load-2.js         ✅ Sudah ada
│   ├── report-generator.js             ✅ Sudah ada
│   └── package.json                    (perlu copy dari root)
└── docker/
    └── entrypoint.sh                   ← Create baru
```

---

## LANGKAH-LANGKAH SETUP

### Step 1: Buat Dockerfile

**File:** `<repo>\Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy scripts
COPY scripts/ ./scripts/

# Create report directory
RUN mkdir -p scripts/report

# Set default env vars (bisa override saat run)
ENV BASE_URL=https://dev.example.test
ENV MODE=throughput
ENV TARGET_CONNECTIONS=50
ENV RUN_DURATION_MS=300000
ENV EMIT_EVERY_MS=200
ENV LOG_LEVEL=info

# Run the load test
CMD ["node", "scripts/widget-socket-load-2.js"]
```

### Step 2: Buat docker-compose.yml

**File:** `<repo>\docker-compose.yml`

```yaml
version: '3.8'

services:
  # Machine 1
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
      MACHINE_ID: "Machine-1"
    volumes:
      - ./scripts/report:/app/scripts/report:rw
    networks:
      - load-test-network
    # Healthcheck untuk track status
    healthcheck:
      test: ["CMD", "test", "-f", "/app/scripts/report"]
      interval: 10s
      timeout: 5s
      retries: 3

  # Machine 2
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
      MACHINE_ID: "Machine-2"
    volumes:
      - ./scripts/report:/app/scripts/report:rw
    networks:
      - load-test-network
    depends_on:
      load-test-1:
        condition: service_started
    healthcheck:
      test: ["CMD", "test", "-f", "/app/scripts/report"]
      interval: 10s
      timeout: 5s
      retries: 3

  # Machine 3
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
      MACHINE_ID: "Machine-3"
    volumes:
      - ./scripts/report:/app/scripts/report:rw
    networks:
      - load-test-network
    depends_on:
      load-test-2:
        condition: service_started
    healthcheck:
      test: ["CMD", "test", "-f", "/app/scripts/report"]
      interval: 10s
      timeout: 5s
      retries: 3

# Shared network untuk ketiga containers
networks:
  load-test-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

**Network Explanation:**
- Setiap container mendapat IP berbeda dalam network 172.20.0.0/16
- Container 1: 172.20.0.2
- Container 2: 172.20.0.3
- Container 3: 172.20.0.4
- Server melihat 3 IP sources berbeda

### Step 3: Buat .dockerignore (Optional)

**File:** `<repo>\.dockerignore`

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
k6/
cypress/
.github/
docs/
tools/
widgetHtml/
cypress.config.js
webpack.config.js
dummy
.gitlab-ci.yml
```

---

## BAGIAN 3: Jalankan 3 Containers

### Step 1: Build Docker Image

```powershell
cd "<repo>"

# Build image (pertama kali saja, ambil waktu ~2-3 menit)
docker-compose build

# Output:
# Building load-test-1
# Step 1/9 : FROM node:18-alpine
# ...
# Successfully built abc123def456
```

### Step 2: Start 3 Containers

```powershell
# Start semua 3 containers
docker-compose up

# Output akan terlihat:
# Creating load-test-machine-1 ...
# Creating load-test-machine-2 ...
# Creating load-test-machine-3 ...
# Creating load-test-machine-1 ... done
# 
# load-test-machine-1  | [INIT] Starting widget socket load test
# load-test-machine-1  | [INIT] Connecting 50 WebSocket clients...
# load-test-machine-2  | [INIT] Starting widget socket load test
# ...
```

### Step 3: Monitor Real-time Progress

**Di terminal baru, jalankan:**

```powershell
# Watch all 3 containers
docker-compose logs -f

# Atau lihat individual container:
docker logs -f load-test-machine-1
docker logs -f load-test-machine-2
docker logs -f load-test-machine-3

# Lihat stats resource
docker stats
```

---

## BAGIAN 4: Collect Results

### Option A: Reports ke Local Machine

Reports otomatis tersimpan di `scripts/report/` karena volume mounting:

```powershell
# Lihat semua reports (dari ketiga containers)
ls "<repo>\scripts\report\"

# Output:
# load-test-2026-04-09-143000.html
# load-test-2026-04-09-143005.html
# load-test-2026-04-09-143010.html
```

Setiap container generate report-nya sendiri dengan timestamp berbeda.

### Option B: Copy Reports dari Container

```powershell
# Copy semua reports dari container
docker cp load-test-machine-1:/app/scripts/report ./reports-machine-1
docker cp load-test-machine-2:/app/scripts/report ./reports-machine-2
docker cp load-test-machine-3:/app/scripts/report ./reports-machine-3

# Verify
ls ./reports-machine-*
```

### Option C: Aggregate Reports (Advanced)

Buat script untuk combine ketiga reports jadi satu:

**File:** `scripts/aggregate-reports.js`

```javascript
const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, 'report');
const reports = fs.readdirSync(reportDir)
  .filter(f => f.endsWith('.html'))
  .sort()
  .map(f => path.join(reportDir, f));

console.log(`\n📊 DISTRIBUTED LOAD TEST RESULTS\n`);
console.log(`Total Reports: ${reports.length}`);
console.log(`Generated Reports:\n`);

reports.forEach((report, idx) => {
  const size = fs.statSync(report).size;
  console.log(`  ${idx + 1}. ${path.basename(report)} (${(size/1024).toFixed(2)}KB)`);
});

console.log(`\n✅ Open reports to view detailed metrics for each machine\n`);
```

**Jalankan:**
```powershell
node scripts/aggregate-reports.js
```

---

## BAGIAN 5: Cleanup

### Stop Containers

```powershell
# Stop semua containers (graceful)
docker-compose down

# Output:
# Stopping load-test-machine-3 ... done
# Stopping load-test-machine-2 ... done
# Stopping load-test-machine-1 ... done
# Removing load-test-machine-3 ... done
# ...
```

### Remove Images (jika tidak perlu lagi)

```powershell
# Remove image
docker rmi sixv2automation_load-test:latest

# Remove dangling images
docker image prune -a -f
```

### Cleanup Space

```powershell
# Bersihkan semua unused
docker system prune -a

# Verifikasi
docker system df
```

---

## TROUBLESHOOTING

### ❌ Error: "No space left on device"

**Solusi:** Resize Docker disk (Bagian 1) atau cleanup (Option 3 Bagian 1)

### ❌ Error: "docker-compose: command not found"

**Solusi:** Install Docker Compose
```powershell
# Download docker-compose binary
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-Windows-x86_64.exe" -o $env:ProgramFiles\Docker\Docker\resources\bin\docker-compose.exe

# Verify
docker-compose --version
```

### ❌ Containers crash/exit immediately

**Check logs:**
```powershell
docker-compose logs

# Lihat error details
docker logs load-test-machine-1 --tail 20
```

**Common causes:**
- Node dependencies tidak install → Rebuild: `docker-compose build --no-cache`
- PORT conflict → Ubah ports di docker-compose.yml
- Memory insufficient → Resize Docker resources

### ❌ Containers tidak bisa connect ke server

**Debug:**
```powershell
# Ping dari container
docker exec load-test-machine-1 ping -c 4 8.8.8.8

# Test DNS
docker exec load-test-machine-1 nslookup dev.example.test

# Check network
docker network inspect sixv2automation_load-test-network
```

### ❌ Reports tidak tergenerate

**Check:**
```powershell
# Lihat isi container
docker exec load-test-machine-1 ls -la /app/scripts/report/

# Check permissions
docker exec load-test-machine-1 ls -la /app/scripts/

# Lihat logs
docker logs load-test-machine-1 | tail -30
```

---

## QUICK REFERENCE

### Umum Command

```powershell
# Build
docker-compose build

# Start
docker-compose up

# Start di background
docker-compose up -d

# Stop
docker-compose down

# Logs
docker-compose logs -f

# Individual logs
docker logs -f load-test-machine-1

# Stats
docker stats

# Exec command di container
docker exec load-test-machine-1 ls -la /app/

# Copy file from container
docker cp load-test-machine-1:/app/scripts/report ./local-report

# Remove image
docker rmi image-name
```

### Environment Variables yang bisa di-override

Edit `docker-compose.yml` bagian `environment:` untuk:

- `BASE_URL` - Target server URL
- `MODE` - throughput | messages | rampup
- `TARGET_CONNECTIONS` - Jumlah VUs (default 50)
- `RUN_DURATION_MS` - Durasi test (default 300000 = 5 menit)
- `EMIT_EVERY_MS` - Interval emit messages (default 200ms)
- `LOG_LEVEL` - debug | info | warn | error

---

## MONITORING DASHBOARD (Optional)

Untuk real-time monitoring 3 containers, bisa gunakan:

```powershell
# Portainer - Visual container management
docker run -d \
  -p 8000:8000 \
  -p 9000:9000 \
  --name portainer \
  -v /var/run/docker.sock:/var/run/docker.sock \
  portainer/portainer-ce

# Buka: http://localhost:9000
```

---

## PERFORMA ESTIMATE

**Untuk 3 containers dengan 50 VUs each (150 total):**

| Resource | Usage | Notes |
|----------|-------|-------|
| CPU | ~60-80% | Multi-core usage |
| Memory | ~1.2-1.5GB | Per container ~400-500MB |
| Network | ~50-100 Mbps | Tergantung server response |
| Disk Space | ~500MB | Script + dependencies |
| Storage (Images) | ~200-300MB | Per image |

**Waktu Test:** 5 menit (sesuai RUN_DURATION_MS)

---

## NEXT STEPS

1. **Resize Docker disk** (Bagian 1 - PENTING!)
2. **Create files** (Dockerfile, docker-compose.yml, .dockerignore)
3. **Build image** (`docker-compose build`)
4. **Run containers** (`docker-compose up`)
5. **Monitor progress** (`docker-compose logs -f`)
6. **Collect reports** dari `scripts/report/`

---

## QUESTIONS?

- Berapa IP yang diharapkan terlihat di server? **3 IP berbeda** (dari 3 containers)
- Apakah 3 containers bisa jalankan bersamaan? **Ya, docker-compose handle orchestration**
- Bagaimana lihat real-time metrics? **docker-compose logs -f atau Docker Dashboard**
- Bisa customize parameters? **Ya, edit docker-compose.yml environment section**
