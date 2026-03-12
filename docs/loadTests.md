# loadTests

## widgetSocketLoad

Runs parallel socket.io clients to stress-test the **Widget** channel flow:

- `open-api/client-contact`
- `open-api/conversation/submit/topic`
- socket join + inbound message emit
- validates by receiving `notification.new.message`

### Run (PowerShell)

```powershell
$env:BASE_URL="https://dev-v2.satuinbox.com"
$env:SIGNATURE_KEY="sk_..."
$env:X_API_KEY="..."
$env:WIDGET_CHANNEL_ID="..."

$env:AGENTS="5"
$env:CHURN_AGENTS="2"
$env:MESSAGES_PER_AGENT="20"
$env:CYCLES="5"

npm run widget:socket:load
```

## waQrHealth

Validates Baileys/WhatsApp Web QR pipeline health.

PASS if response contains `qrCode` and it starts with `data:image`.

### Run (PowerShell)

```powershell
$env:BASE_URL="https://dev-v2.satuinbox.com"
$env:X_API_KEY="..."  # if required

$env:ITERATIONS="20"
$env:POLL_TIMEOUT_MS="60000"
$env:POLL_INTERVAL_MS="2000"

npm run wa:qr:health
```

## Running via Cypress

See `cypress/e2e/load/runNodeLoadScripts.cy.js`.
- Cypress will show stdout/stderr in the Command Log (as one big string per `cy.exec`).
- This is convenient for monitoring, but Cypress is not a true load-testing harness.
