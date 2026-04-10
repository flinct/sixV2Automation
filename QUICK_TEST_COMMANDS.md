# Quick Test Commands - Ready to Use!

## 🚀 Copy & Paste Commands

### Command 1: Soak Test (Default Report Location)
```powershell
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "soak"
$env:TARGET_CONNECTIONS = "50"
$env:RUN_DURATION_MS = "300000"
node scripts/widget-socket-load-2.js
```
**Report saved to:** `scripts/report/load-test-YYYY-MM-DD-HHMMSS.html`

---

### Command 2: Throughput Test (Default Report Location)
```powershell
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "50"
$env:EMIT_EVERY_MS = "200"
$env:RUN_DURATION_MS = "300000"
node scripts/widget-socket-load-2.js
```
**Report saved to:** `scripts/report/load-test-YYYY-MM-DD-HHMMSS.html`

---

### Command 3: Stress Test (More Load)
```powershell
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "200"
$env:EMIT_EVERY_MS = "100"
$env:RUN_DURATION_MS = "600000"
node scripts/widget-socket-load-2.js
```
**Report saved to:** `scripts/report/load-test-YYYY-MM-DD-HHMMSS.html`

---

### Command 4: Quick Test (Baseline - 1 minute)
```powershell
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "10"
$env:EMIT_EVERY_MS = "500"
$env:RUN_DURATION_MS = "60000"
node scripts/widget-socket-load-2.js
```
**Report saved to:** `scripts/report/load-test-YYYY-MM-DD-HHMMSS.html`

---

### Command 5: Custom Report Name
```powershell
$env:BASE_URL = "https://dev-v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "50"
$env:REPORT_OUTPUT = "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\my-custom-test.html"
node scripts/widget-socket-load-2.js
```
**Report saved to:** `scripts/report/my-custom-test.html`

---

### Command 6: Production Environment Test
```powershell
$env:BASE_URL = "https://v2.satuinbox.com"
$env:MODE = "throughput"
$env:TARGET_CONNECTIONS = "500"
$env:EMIT_EVERY_MS = "500"
$env:RUN_DURATION_MS = "900000"
node scripts/widget-socket-load-2.js
```
**Report saved to:** `scripts/report/load-test-YYYY-MM-DD-HHMMSS.html`

---

## 📂 View Reports

### Open Latest Report
```powershell
$latest = Get-ChildItem "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report" -Filter "*.html" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
Invoke-Item $latest.FullName
```

### List All Reports
```powershell
Get-ChildItem "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\*.html" | Select-Object Name, LastWriteTime
```

### Open Report Folder
```powershell
explorer "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report"
```

### Open Specific Report
```powershell
Invoke-Item "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report\load-test-2026-04-09-143000.html"
```

---

## 📊 Report Directory

All reports are saved to:
```
C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\scripts\report
```

**Naming pattern:** `load-test-YYYY-MM-DD-HHMMSS.html`

---

## 🎯 Parameter Explanations

| Parameter | Example | Explanation |
|-----------|---------|-------------|
| `BASE_URL` | `https://dev-v2.satuinbox.com` | Target server (dev or production) |
| `MODE` | `throughput` or `soak` | Test mode (soak=idle, throughput=messages) |
| `TARGET_CONNECTIONS` | `50` | Number of concurrent connections/VUs |
| `EMIT_EVERY_MS` | `200` | Message interval in milliseconds (lower = more load) |
| `RUN_DURATION_MS` | `300000` | Test duration in milliseconds (300000 = 5 min) |
| `REPORT_OUTPUT` | `scripts/report/my-test.html` | Custom report location (optional) |

---

## ⏱️ Common Durations

| Duration | Milliseconds |
|----------|-------------|
| 30 seconds | 30000 |
| 1 minute | 60000 |
| 2 minutes | 120000 |
| 5 minutes | 300000 |
| 10 minutes | 600000 |
| 15 minutes | 900000 |
| 30 minutes | 1800000 |
| 1 hour | 3600000 |

---

## 🔄 Workflow

1. **Copy a command** from above
2. **Run it** in PowerShell
3. **Wait** for test to complete
4. **Check** console for report location
5. **Open** report in browser

---

## 💡 Tips

- Start with **Command 4** (Quick Test) for testing
- Use **Command 2** for standard load test
- Use **Command 3** for stress testing
- Reports auto-open in browser from `scripts/report/` folder
- Each test creates a new timestamped report
- Reports never overwrite each other

---

## ✅ Ready to Test!

Pick a command above, copy it, paste into PowerShell, and hit Enter!
