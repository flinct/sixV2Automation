# Docker Desktop Storage Resize Guide

Panduan lengkap untuk menambah storage Docker dari 10GB ke 20GB (atau lebih).

---

## 📊 Current Status

**Storage yang digunakan:**
- Used: 4.7 GB
- Total: 10 GB
- Available: 5.3 GB

**Problem:** Untuk 3 containers + Node.js, butuh minimal 6-8GB. Sudah tidak cukup.

**Solution:** Resize ke 20GB.

---

## ✅ METHOD 1: Via GUI (RECOMMENDED - Paling Simple)

### Step 1: Buka Docker Desktop Settings

Klik Docker icon di taskbar (system tray):

```
Docker icon (whale) → Click
```

Pilih "Settings":

```
Settings (⚙️) 
```

### Step 2: Go to Resources Tab

```
Settings Window
├── General
├── Resources        ← CLICK HERE
├── Docker Engine
└── ...
```

### Step 3: Resize Disk Image Size

Cari "Disk image size" section:

```
RESOURCES TAB:
├── CPU
├── Memory
├── Swap
├── Disk image size:
│   Current value: 10 GB
│   Slider: [=====>    ]
│   Input box: 10
└── ...
```

**Option A: Gunakan Slider**
```
Geser slider ke kanan sampai 20GB
```

**Option B: Langsung ketik di input box**
```
Click input box
Clear current value: 10
Type: 20
```

**Input valid range: 10 GB - 500 GB**

### Step 4: Apply dan Restart

```
Click: Apply & Restart
```

Docker akan restart (proses ini ambil 5-10 menit):

```
Status: "Docker Desktop is stopping..."
[Loading indicator]
Status: "Docker Desktop is restarting..."
[Loading indicator - tunggu sampai selesai]
Status: "Docker Desktop is running" ✅
```

### Step 5: Verify Success

```powershell
# Di PowerShell, check new disk size
docker system df

# Expected output:
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          5         3         2.5GB     1.2GB
Containers      8         2         500MB     400MB
Local Volumes   10        5         1.2GB     500MB
Build Cache     15        0         3.2GB     3.2GB
```

**Atau verify via Docker info:**
```powershell
docker info | findstr -i "storage"

# Output akan menunjukkan new total
```

---

## ✅ METHOD 2: Via PowerShell (Manual - Jika GUI tidak bekerja)

⚠️ **Lebih kompleks, gunakan hanya jika Method 1 gagal**

### Step 1: Stop Docker Desktop

```powershell
# Close Docker Desktop completely
# Check: No whale icon di taskbar
```

### Step 2: Open PowerShell as Administrator

```powershell
# Right-click PowerShell
# Select: Run as Administrator

# Verify:
# Prompt shows: PS C:\Windows\System32>
```

### Step 3: List WSL Distros

```powershell
wsl --list --verbose

# Expected output:
#   NAME                   STATE           VERSION
#   docker-desktop         Stopped         2
#   docker-desktop-data    Stopped         2
```

### Step 4: Export Current Data (Backup)

⚠️ **PENTING: Backup dulu sebelum resize!**

```powershell
# Buat folder backup
mkdir "C:\Docker-Backup"

# Export docker-desktop-data
wsl --export docker-desktop-data "C:\Docker-Backup\docker-desktop-data-backup.tar"

# Proses ini ambil 5-10 menit (copying 4.7GB)
# Output: [████████████████████] 100%
```

### Step 5: Unregister Current Distro

```powershell
wsl --unregister docker-desktop-data

# Output:
# Unregistering...
# The operation completed successfully.

# Verify:
wsl --list --verbose
# docker-desktop-data tidak ada lagi
```

### Step 6: Re-register dengan Size Baru

```powershell
# Import kembali dengan size baru (20GB)
# Syntax: wsl --import [distro-name] [install-location] [tar-file] --version 2

wsl --import docker-desktop-data `
  "C:\Users\MyBook SAGA 12\AppData\Local\Docker\wsl\data" `
  "C:\Docker-Backup\docker-desktop-data-backup.tar" `
  --version 2

# Proses ini ambil 10-15 menit
# Output: Import in progress, this may take a few minutes...
```

### Step 7: Restart Docker Desktop

```powershell
# Buka Docker Desktop lagi
# Status: Docker Desktop is starting...
# [Tunggu sampai selesai]
```

### Step 8: Verify

```powershell
docker system df
```

---

## ⚙️ METHOD 3: Extend Existing Disk (Advanced)

Jika existing disk sudah allocated tapi penuh:

### Step 1: Stop Docker

```powershell
"Docker Desktop icon → Quit Docker Desktop"
```

### Step 2: Find Disk Location

Disk biasanya di:
```
C:\Users\<Username>\AppData\Local\Docker\wsl\data\ext4.vhdx
```

### Step 3: Extend VHDX File

```powershell
# Using Hyper-V Manager (jika ada)
# Atau gunakan PowerShell:

# Get current size
$diskPath = "C:\Users\MyBook SAGA 12\AppData\Local\Docker\wsl\data\ext4.vhdx"
(Get-Item $diskPath).Length / 1GB

# Expected: ~4.7 GB

# Extend ke 20GB
Resize-VirtualDisk -Path $diskPath -SizeBytes 20GB

# Verify
(Get-Item $diskPath).Length / 1GB
# Expected: 20 GB
```

### Step 4: Start Docker

```powershell
# Buka Docker Desktop
```

---

## 🧹 METHOD 4: Cleanup Space (Jika tidak ingin resize)

Jika ingin avoid resize, coba bersihkan dulu:

### Option A: Remove Unused Images

```powershell
# Lihat semua images
docker images

# Remove specific image
docker rmi image-name

# Remove semua unused images
docker image prune -a -f

# Expected: Reclaimable 1-2GB
```

### Option B: Remove Unused Containers

```powershell
# Lihat semua containers
docker ps -a

# Remove specific container
docker rm container-id

# Remove semua stopped containers
docker container prune -f

# Expected: Reclaimable 500MB-1GB
```

### Option C: Clear Build Cache

```powershell
# Remove build cache
docker builder prune -a -f

# Expected: Reclaimable 1-2GB
```

### Option D: Clear All Unused

```powershell
# Remove EVERYTHING unused (images, containers, volumes, cache)
docker system prune -a --volumes -f

# Check space freed
docker system df

# ⚠️ WARNING: This removes a lot, backup first jika ada important data
```

### Result

```powershell
# Check available space
docker system df

# Output:
# TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
# Images          2         2         1.5GB     0B
# Containers      3         2         200MB     100MB
# Local Volumes   5         3         800MB     200MB
# Build Cache     0         0         0B        0B
```

Jika berhasil cleanup 1-2GB, bisa lanjut tanpa resize.

---

## 📋 Comparison: Method Mana yang Terbaik?

| Method | Ease | Time | Risk | Recommended |
|--------|------|------|------|------------|
| **Method 1 (GUI)** | Very Easy | 10 min | Very Low | ⭐⭐⭐ |
| **Method 2 (PowerShell)** | Hard | 30 min | Medium | ⭐ |
| **Method 3 (Hyper-V)** | Very Hard | 20 min | High | ❌ |
| **Method 4 (Cleanup)** | Easy | 5 min | None | ⭐⭐ |

**Recommendation:**
1. **First try:** Method 1 (GUI) - paling simple
2. **If Method 1 fails:** Method 4 (Cleanup) - risk-free
3. **If still tidak cukup:** Method 2 (PowerShell with backup)
4. **Avoid:** Method 3 (Advanced, risky)

---

## ✅ Recommended Solution untuk Anda

**Untuk setup 3 Docker containers dengan 4.7GB sudah dipakai:**

### Option A: Simple (Recommended)

1. **Cleanup dulu** (Method 4)
   ```powershell
   docker system prune -a -f
   ```

2. **Resize via GUI** (Method 1)
   - 10GB → 20GB
   - Takes 10 minutes

3. **Build dan run**
   ```powershell
   docker-compose build
   docker-compose up
   ```

### Option B: Maximum Space

1. **Backup** (Method 2, Step 4)
   ```powershell
   wsl --export docker-desktop-data "C:\Docker-Backup\backup.tar"
   ```

2. **Resize via PowerShell** (Method 2)
   - 10GB → 30GB (extra aman)

3. **Run tests**

---

## 🚨 Troubleshooting

### ❌ "Error: The operation is not supported on this system"

**Possible causes:**
- WSL2 tidak fully enabled
- Hyper-V tidak active

**Solution:**
```powershell
# Enable WSL2
wsl --install -d Ubuntu-22.04

# Enable Hyper-V
Enable-WindowsOptionalFeature -Online -FeatureName Hyper-V -All

# Restart computer
Restart-Computer
```

### ❌ "Error: VirtualDisk object not found"

**Solution:**
- Gunakan Method 1 (GUI) saja
- PowerShell method memerlukan admin + Hyper-V

### ❌ "Storage still full after cleanup"

**Solution:**
```powershell
# Check detailed breakdown
docker system df --verbose

# Remove old images
docker images | grep none | awk '{print $3}' | xargs docker rmi

# Clear dangling volumes
docker volume prune -f
```

### ❌ Docker tidak mau restart setelah resize

```powershell
# Force stop
wsl --shutdown

# Start Docker Desktop lagi
# Tunggu 5 menit
```

---

## 📊 Monitoring Storage Usage

### Real-time Monitoring

```powershell
# Check current usage
docker system df

# Detailed view
docker system df --verbose

# Watch (update setiap 2 detik)
while ($true) { docker system df; Start-Sleep -Seconds 2 }
```

### Per Container Usage

```powershell
# Size setiap container
docker ps -s

# Size setiap image
docker images --format "{{.Repository}}:{{.Tag}} {{.Size}}"

# Size setiap volume
docker volume ls --format "{{.Name}} {{.Driver}}"
docker system df --verbose | grep -i volume
```

---

## 🎯 Final Checklist

Sebelum run 3 containers:

- [ ] Docker disk sudah 20GB (via Method 1, 2, atau 3)
- [ ] Verify dengan `docker system df`
- [ ] Cleanup dilakukan jika perlu (Method 4)
- [ ] Dockerfile sudah created
- [ ] docker-compose.yml sudah created
- [ ] Image sudah built (`docker-compose build`)
- [ ] Ready untuk run (`docker-compose up`)

---

## 📞 Need More Help?

Check Docker docs: https://docs.docker.com/desktop/
WSL2 docs: https://docs.microsoft.com/en-us/windows/wsl/
