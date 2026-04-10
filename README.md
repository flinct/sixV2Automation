# sixV2Automation

Repository automation test untuk Cypress, script load test widget socket, dan health check QR.

## Prerequisites

- Node.js 18+
- npm
- (Opsional) k6 untuk stress test QR flow

## Setup

```powershell
npm install
```

## Menjalankan Cypress (interactive)

```powershell
$env:CYPRESS_baseUrl="https://dev-v2.satuinbox.com"; $env:CYPRESS_loginType="cekerayam01"; npx cypress open
```

## Menjalankan Widget Socket Load Test

### Opsi 1 (single-line)

```powershell
$env:BASE_URL="https://dev-v2.satuinbox.com"; $env:LOG_LEVEL="debug"; $env:MODE="throughput"; $env:TARGET_CONNECTIONS="50"; $env:RUN_DURATION_MS="300000"; node scripts/widget-socket-load-2.js
```

### Opsi 2 (dengan EMIT_EVERY_MS)

```powershell
$env:BASE_URL="https://dev-v2.satuinbox.com"; $env:MODE="throughput"; $env:TARGET_CONNECTIONS="50"; $env:RUN_DURATION_MS="300000"; $env:EMIT_EVERY_MS="200"; $env:LOG_LEVEL="info"; node scripts/widget-socket-load-2.js
```

### Opsi 3 (prepare mode)

```powershell
$env:BASE_URL="https://dev-v2.satuinbox.com"
$env:MODE="throughput"
$env:TARGET_CONNECTIONS="50"
$env:PREPARE_MODE="perClient"
$env:RUN_DURATION_MS="300000"
$env:EMIT_EVERY_MS="200"
$env:LOG_LEVEL="info"
node scripts/widget-socket-load-2.js
```

## Menjalankan Stress Test QR (k6)

```powershell
$env:BASE_URL="https://dev-v2.satuinbox.com"
$env:CYPRESS_loginType="cekerayam01"
node scripts/print-k6-env-from-cypress.js | Invoke-Expression
k6 run .\k6\wa_qr_fullflow.js
```

k6 run --vus 100 --duration 5m `  -e BASE_URL=https://dev-v2.satuinbox.com`
"C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"

k6 run --vus 50 --duration 5m `  -e BASE_URL=https://dev-v2.satuinbox.com`
-e MODE=throughput `  -e EMIT_EVERY_MS=200`
"C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"

## Script npm yang tersedia

```powershell
npm run widget:socket:load
npm run widget:socket:load-2
npm run wa:qr:health
npm run proxy:precheck
npm run copysend
npm run sendemail
```

## Referensi Command

Daftar command manual tersimpan di:

- `cypress/e2e/1commandLine.js`
