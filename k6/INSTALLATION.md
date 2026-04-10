# Installation & Setup Guide

## Prerequisites

### 1. Install k6

#### Windows (Recommended: Chocolatey)
```powershell
# Install Chocolatey (if not already installed)
# Run PowerShell as Administrator and paste:
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Then install k6:
choco install k6
```

#### Windows (Direct Download)
1. Download dari https://k6.io/docs/getting-started/installation/
2. Extract ke C:\Program Files\k6 (atau folder pilihan Anda)
3. Add ke PATH:
   - Buka Environment Variables (Win + X → System)
   - Edit PATH dan tambahkan folder k6
4. Verify: Buka PowerShell baru dan jalankan `k6 version`

#### macOS
```bash
brew install k6
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6-stable.list
sudo apt-get update
sudo apt-get install k6
```

### 2. Verify Installation
```powershell
k6 version
```

Output yang diharapkan:
```
k6 v0.47.0 (compatible with v1.0.0)
```

---

## Setup Files

Script k6 sudah tersedia di:
```
C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\
```

### File Structure

```
k6/
├── socketLoadMultichannel.js      # Main k6 script
├── run-socket-load.bat            # Batch file helper (Windows)
├── run-socket-load.ps1            # PowerShell helper (Windows)
├── README.md                        # Full documentation
├── QUICK_START.md                  # Quick start guide
└── INSTALLATION.md                 # This file
```

---

## Quick Verification

Run test dengan config minimal:

```powershell
# Navigate to folder
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6"

# Run 10 VUs for 1 minute (baseline test)
k6 run --vus 10 --duration 1m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  socketLoadMultichannel.js
```

Expected output: ✓ Successful connections, metrics displayed

---

## Signature Key Setup

### Automatic (Recommended)

Script sudah punya hardcoded signature keys per environment:

| Environment | Auto-loaded signature key |
|-------------|---------------------------|
| dev-v2.satuinbox.com | ✓ sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if |
| v2.satuinbox.com | ✓ sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM |

**Jadi Anda tidak perlu setup apa-apa!** Cukup jalankan script dengan BASE_URL yang benar.

### Manual Override (Optional)

Jika signature key berubah atau ingin menggunakan key custom:

```powershell
k6 run --vus 100 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e SIGNATURE_KEY=your_custom_key `
  socketLoadMultichannel.js
```

---

## Recommended Environment Setup

### 1. PowerShell Alias (Optional tapi convenient)

Tambahkan ke PowerShell profile:
```powershell
# Edit profile
notepad $PROFILE

# Tambahkan:
$k6Path = "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6"
Set-Alias -Name socket-load -Value "& $k6Path\run-socket-load.ps1"
Set-Alias -Name socket-soak -Value {
    param([int]$Vus = 100, [string]$Duration = "5m")
    k6 run --vus $Vus --duration $Duration -e BASE_URL=https://dev-v2.satuinbox.com $k6Path\socketLoadMultichannel.js
}

# Save, close, restart PowerShell
```

### 2. Add to PATH (Optional)

Agar bisa run dari folder manapun:

```powershell
# Permanent
[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", "User") + ";C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6",
    "User"
)

# Restart PowerShell
```

---

## Running Tests

### Option 1: Direct Command (Recommended)
```powershell
k6 run --vus 100 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"
```

### Option 2: Using Helper Scripts
```powershell
# Batch file (interactive)
"C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\run-socket-load.bat"

# PowerShell (recommended for automation)
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6"
.\run-socket-load.ps1 -Mode soak -VUs 100 -Duration 5m
```

---

## Firewall & Network

Jika ada firewall/proxy, pastikan:

1. **WebSocket (port 443)** allowed untuk domain:
   - dev-v2-api.satuinbox.com
   - v2-api.satuinbox.com

2. **Outbound HTTPS traffic** allowed (k6 needs internet untuk beberapa features)

---

## Troubleshooting

### Issue: "k6 command not found"
```powershell
# Verify installation
k6 version

# If not found, check PATH:
$env:PATH -split ';' | findstr k6

# If missing, reinstall k6 or add to PATH manually
```

### Issue: "Connection refused"
```
Possible causes:
- Server tidak berjalan
- Wrong BASE_URL
- Firewall blocking WebSocket
```

**Solusi:**
```powershell
# Test connectivity
curl -I https://dev-v2-api.satuinbox.com/

# Check with different BASE_URL
k6 run --vus 10 --duration 30s `
  -e BASE_URL=https://v2.satuinbox.com `
  socketLoadMultichannel.js
```

### Issue: "SIGNATURE_KEY is missing"
```
Script failed with: ERROR: SIGNATURE_KEY is missing!
```

**Solusi:**
1. Verify BASE_URL correct
2. Or provide SIGNATURE_KEY manually:
```powershell
k6 run --vus 100 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e SIGNATURE_KEY=your_key `
  socketLoadMultichannel.js
```

---

## Next Steps

1. ✓ Install k6
2. ✓ Verify installation (`k6 version`)
3. → Read QUICK_START.md for common scenarios
4. → Read README.md for full documentation
5. → Run first test!

---

## Resources

- k6 Official Docs: https://k6.io/docs/
- k6 GitHub: https://github.com/grafana/k6
- Socket.IO: https://socket.io/
- WebSocket: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

---

**Ready to start load testing?** 
→ Go to `QUICK_START.md` for examples!
