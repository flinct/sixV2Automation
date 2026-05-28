# Socket.IO Load Test - k6

Script load testing untuk Socket.IO multi-channel messaging.

## Quick Start

```bash
k6 run --vus 50 --duration 5m \
  -e BASE_URL=https://app.example.test \
  -e API_BASE=https://api.example.test/ \
  -e SIGNATURE_KEY=replace-with-secret \
  -e WIDGET_CHANNEL_ID=replace-with-channel-id \
  -e WIDGET_ACCOUNT_CHANNEL_IDS=id1,id2 \
  socketLoadMultichannel.js
```

## Modes

| Mode | Purpose |
|---|---|
| `soak` | Banyak koneksi idle untuk melihat memory dan connection stability |
| `throughput` | Banyak client mengirim event berkala untuk melihat CPU dan message flow |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BASE_URL` | Yes | Frontend/app URL |
| `API_BASE` | Recommended | API base URL |
| `SIGNATURE_KEY` | Yes | Widget signature key from secret storage |
| `WIDGET_CHANNEL_ID` | Yes | Widget channel id |
| `WIDGET_ACCOUNT_CHANNEL_IDS` | Yes | Comma-separated account channel ids |
| `MODE` | No | `soak` or `throughput` |
| `EMIT_EVERY_MS` | No | Emit interval for throughput mode |
| `PREPARE_MODE` | No | `shared` or `perClient` |

## Output Metrics

- `socket_connect_success`
- `socket_connect_errors`
- `messages_sent`
- `messages_received`
- `connect_latency`
- `emit_latency`
- `active_connections`
- `errors`

Real endpoint, key, channel, and customer data must be supplied through environment variables only.
