# Quick Start - Socket.IO Load Test (k6)

## Tanpa Input Manual - Recommended ✅

Signature key **OTOMATIS** diambil dari hardcoded defaults!

### Soak Test (100 idle connections, 5 menit)
```powershell
k6 run --vus 100 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"
```

### Throughput Test (50 clients, send messages every 200ms, 5 menit)
```powershell
k6 run --vus 50 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e MODE=throughput `
  -e EMIT_EVERY_MS=200 `
  "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"
```

---

## Menggunakan Helper Scripts

### Option 1: Batch File (Interactive)
```cmd
C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\run-socket-load.bat
```

Akan muncul menu interaktif untuk memilih mode & parameter.

### Option 2: PowerShell (Recommended untuk automation)

**Soak test:**
```powershell
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6"
.\run-socket-load.ps1 -Mode soak -VUs 100 -Duration 5m
```

**Throughput test:**
```powershell
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6"
.\run-socket-load.ps1 -Mode throughput -VUs 50 -Duration 5m -EmitEveryMs 200
```

**Interactive mode:**
```powershell
cd "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6"
.\run-socket-load.ps1 -Interactive
```

---

## Common Test Scenarios

### Scenario 1: Baseline (10 clients, 1 menit)
```powershell
k6 run --vus 10 --duration 1m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  socketLoadMultichannel.js
```

### Scenario 2: Medium Load (100 clients, 10 menit)
```powershell
k6 run --vus 100 --duration 10m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e MODE=throughput `
  socketLoadMultichannel.js
```

### Scenario 3: High Throughput (50 clients, aggressive messaging - every 100ms)
```powershell
k6 run --vus 50 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e MODE=throughput `
  -e EMIT_EVERY_MS=100 `
  socketLoadMultichannel.js
```

### Scenario 4: Stress Test (300+ clients, 15 menit)
```powershell
k6 run --vus 300 --duration 15m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e MODE=throughput `
  socketLoadMultichannel.js
```

### Scenario 5: Production Test (dengan override signature key)
```powershell
k6 run --vus 500 --duration 30m `
  -e BASE_URL=https://v2.satuinbox.com `
  -e SIGNATURE_KEY=your_custom_key `
  -e MODE=throughput `
  socketLoadMultichannel.js
```

---

## Expected Output

```
          /\      |‾‾|
     /\  /  \     |  |
    /  \/    \    |  |
   /          \   |  |
  / __________ \  |__|
 
     execution: local
        script: socketLoadMultichannel.js
        output: -

     scenarios: (100.00%) 1 scenario, 100 max VUs, 5m30s max duration (incl. 30s graceful rampdown):
              * default: 100 VUs in 5 stages over 5m0s run time

   ✓ socket_connect_errors
     socket_connect_success: 100
     messages_sent: 5000
     messages_received: 5000
     connect_latency: avg=245ms min=50ms med=180ms max=2000ms p(95)=800ms p(99)=1200ms
     emit_latency: avg=10ms min=0ms med=8ms max=150ms p(95)=20ms p(99)=50ms
     active_connections: 100
     errors: 0%
```

---

## Signature Keys Auto-Loaded

Tergantung BASE_URL yang digunakan:

| BASE_URL | Signature Key |
|----------|---------------|
| https://dev-v2.satuinbox.com | sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if |
| https://v2.satuinbox.com | sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM |

**Jadi Anda tidak perlu input SIGNATURE_KEY manual!** ✅

---

## Monitoring During Test

### Real-time Metrics in k6
k6 akan display metrics setiap 5 detik di console.

### Monitor Server
Buka terminal lain dan monitor server:
```bash
# Linux/Mac
top
htop

# Windows
tasklist
Get-Process | Sort-Object CPU -Descending
```

### Save Results to HTML Report
```powershell
k6 run --out=html=report.html `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  socketLoadMultichannel.js
```

Hasil akan di-save ke `report.html` dan bisa dibuka di browser.

---

## Troubleshooting

### Issue: "k6: The term 'k6' is not recognized"
**Solusi**: Install k6 dari https://k6.io/docs/getting-started/installation/

### Issue: "ERROR: Missing SIGNATURE_KEY"
**Solusi**: 
1. Pastikan BASE_URL sudah benar
2. Atau provide SIGNATURE_KEY manual:
```powershell
k6 run --vus 100 --duration 5m `
  -e BASE_URL=https://dev-v2.satuinbox.com `
  -e SIGNATURE_KEY=your_key `
  socketLoadMultichannel.js
```

### Issue: "connect timeout"
**Solusi**: Server mungkin overloaded. Coba:
- Kurangi VUs
- Kurangi emit rate (EMIT_EVERY_MS)
- Extend timeout (edit script)

### Issue: "Error rate too high"
**Solusi**:
- Start dari VUs yang lebih kecil
- Check server logs
- Verify network connectivity

---

## Next Steps

1. **Run baseline test** (Scenario 1)
2. **Monitor hasil** di console
3. **Adjust parameters** based on performance
4. **Scale up gradually** (100 → 300 → 500 VUs)
5. **Save HTML report** untuk analysis

---

## More Info

- Full documentation: `README.md`
- Original Node.js version: `../scripts/widget-socket-load-2.js`
- k6 docs: https://k6.io/docs/
