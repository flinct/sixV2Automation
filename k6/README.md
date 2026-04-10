# Socket.IO Load Test - K6 Version

Script load testing untuk Socket.IO dengan k6 yang support multi-channel messaging.

## Quick Start

### 1. Install k6
```bash
# Windows (menggunakan Chocolatey)
choco install k6

# Atau download dari: https://k6.io/docs/getting-started/installation/
```

### 2. Run Test (Auto-grab signature key)

**Soak Mode** (idle connections):
```bash
k6 run --vus 100 --duration 5m \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"
```

**Throughput Mode** (send messages):
```bash
k6 run --vus 50 --duration 5m \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  -e MODE=throughput \
  -e EMIT_EVERY_MS=200 \
  "C:\Users\MyBook SAGA 12\Desktop\sixV2Automation\k6\socketLoadMultichannel.js"
```

## Features

| Feature | Detail |
|---------|--------|
| **Auto Signature Key** | Auto-load dari hardcoded defaults per BASE_URL |
| **Dual Mode** | Soak (idle) & Throughput (messaging) |
| **Multi-Channel** | Support multiple account channels |
| **Auto-Setup** | Create contact & conversation otomatis |
| **Metrics** | Real-time monitoring dengan k6 |
| **Ramp-up** | 5 stages gradual increase |

## Environment Variables

### Required
```bash
BASE_URL              # https://dev-v2.satuinbox.com atau https://v2.satuinbox.com
```

### Optional (dengan smart defaults)
```bash
MODE                  # "soak" (default) | "throughput"
TARGET_CONNECTIONS   # Target VUs (default: 100)
EMIT_EVENT           # Event name (default: socket.inbound.message)
EMIT_EVERY_MS        # Emit interval (default: 2000)
PREPARE_MODE         # "shared" (default) | "perClient"
AUTO_PREPARE         # Auto-create conversation (default: true)
DEBUG_ALL_EVENTS     # Log semua events (default: false)
```

### Override (jika perlu)
```bash
SIGNATURE_KEY         # Override hardcoded signature key
WIDGET_CHANNEL_ID     # Override channel ID
WIDGET_ACCOUNT_CHANNEL_IDS  # Override account channels (comma-separated)
```

## Examples

### Contoh 1: Soak Test 200 VUs, 10 menit
```bash
k6 run --vus 200 --duration 10m \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  socketLoadMultichannel.js
```

### Contoh 2: Throughput Test dengan message setiap 100ms
```bash
k6 run --vus 50 --duration 5m \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  -e MODE=throughput \
  -e EMIT_EVERY_MS=100 \
  socketLoadMultichannel.js
```

### Contoh 3: Per-client prepare mode (setiap VU punya conversation sendiri)
```bash
k6 run --vus 30 --duration 3m \
  -e BASE_URL=https://dev-v2.satuinbox.com \
  -e MODE=throughput \
  -e PREPARE_MODE=perClient \
  socketLoadMultichannel.js
```

### Contoh 4: Production dengan override signature key
```bash
k6 run --vus 500 --duration 30m \
  -e BASE_URL=https://v2.satuinbox.com \
  -e MODE=throughput \
  -e SIGNATURE_KEY=your_custom_key \
  socketLoadMultichannel.js
```

## Hardcoded Defaults per Environment

### dev-v2.satuinbox.com
```javascript
{
  channelId: "692fe8eaaff05e8a1623e0d3",
  signatureKey: "sk_mio7hnje_KXM6RXnFXBUqK-3_wBpnVVWfBlgPH-if",
  accountChannels: [
    { id: "698ef3aada258f2a5a46bf89", topic: "hey" },
    { id: "6964ac1d2a5dbde9a5c6fa28", topic: "tumbler biru" },
    { id: "69783b0154be8e7508b4af08", topic: "CS harga" },
    { id: "69782d3654be8e7508b4abfe", topic: "Complain" },
    { id: "6964ab6929de985a0fe73e48", topic: "kipas angin" }
  ]
}
```

### v2.satuinbox.com
```javascript
{
  channelId: "694b55ffbb886b39e785d2c0",
  signatureKey: "sk_mjjm7yx2_-K2UbqX1qiyK6LvbbClG291GbWXM9fbM",
  accountChannels: [
    { id: "6996bcd952ef87df9e414fd3", topic: "Complain" },
    { id: "69649c6b905d65859c36f81c", topic: "remote control" },
    { id: "697845cf1782f1bd889b6bfc", topic: "CS harga" },
    { id: "6964931c905d65859c36f618", topic: "kipas angin" },
    { id: "69a9c8c86e7924748d4af383", topic: "Hayoh kumaha" }
  ]
}
```

## Metrics Output

Script akan generate metrics berikut:

```
socket_connect_success    - Total successful connections
socket_connect_errors     - Total connection errors
messages_sent            - Total messages emitted
messages_received        - Total messages received
connect_latency          - Time to connect (ms) - histogram
emit_latency            - Time to emit message (ms) - histogram
active_connections      - Current active connections - gauge
errors                  - Error rate
```

## Viewing Results

### Console Output
```bash
# Run dan lihat output langsung
k6 run socketLoadMultichannel.js
```

### HTML Report
```bash
# Generate HTML report
k6 run --out=html=report.html socketLoadMultichannel.js
```

### JSON Report
```bash
# Export ke JSON untuk analisis
k6 run --out=json=results.json socketLoadMultichannel.js
```

## Troubleshooting

### Error: "Missing SIGNATURE_KEY"
**Solusi**: Pastikan BASE_URL sudah benar atau provide SIGNATURE_KEY manual:
```bash
k6 run -e BASE_URL=https://dev-v2.satuinbox.com -e SIGNATURE_KEY=your_key socketLoadMultichannel.js
```

### Error: "No account channels available"
**Solusi**: Set WIDGET_ACCOUNT_CHANNEL_IDS:
```bash
k6 run -e WIDGET_ACCOUNT_CHANNEL_IDS=id1,id2,id3 socketLoadMultichannel.js
```

### Connection timeout
**Solusi**: Increase connection timeout di socket parameters (edit script di line ~315)

## Performance Tips

1. **Start small**: Test dengan 10-50 VUs dulu sebelum scale
2. **Monitor server**: Perhatikan CPU, memory, network saat test
3. **Gradual ramp**: Script default sudah ramp up gradually (30s, 1m, 2m)
4. **Emit rate**: Kurangi `EMIT_EVERY_MS` untuk lebih aggressive throughput test
5. **Duration**: Mulai dengan 5-10 menit untuk baseline, kemudian extend

## Notes

- Script ini menggunakan WebSocket transport (bukan HTTP polling)
- Ramp-up: 10% → 50% → 100% target VUs
- Ramp-down: 30 detik
- Threshold defaults: 10% error rate allowed
- Auto-prepare: Shared mode = 1 conversation untuk semua VUs
- Auto-prepare: Per-client mode = 1 conversation per VU

## Related Files

- Original Node.js version: `../scripts/widget-socket-load-2.js`
- Cypress tests: `../cypress/` (optional)
