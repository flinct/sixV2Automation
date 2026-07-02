# Subscriber spec files

Taruh list subscriber besar di folder ini supaya command run lebih pendek.

## Format

Satu line per subscriber spec:

```text
admintest:1
cx001:4
cx002:4
# comment allowed
cx003:4
```

Rules:
- kosong / blank line boleh
- line yang diawali `#` di-ignore
- format default: `loginType[:count]`
- kalau `:count` tidak diisi, default = `1`

## Cara pakai

### Opsi 1 — env file path (single company / flat)

```bash
STORM_SUBSCRIBERS_FILE=scripts/storm-reproducer/subscribers/dev-bulk.txt \
ENV=dev \
LOGIN_TYPE=admintest \
TOTAL_MESSAGES=2000 \
DISCOVER_TARGETS=200 \
STORM_ROUTE=your-inbox \
STORM_DURATION_SEC=600 \
PROBE_DURATION_SEC=600 \
PROBE_INTERVAL_MS=1000 \
STORM_READY_TIMEOUT_SEC=1800 \
bash scripts/storm-reproducer/run-all.sh
```

### Opsi 2 — full multi-company

```bash
ENV=dev \
LOGIN_TYPE=admintest \
TOTAL_MESSAGES=2000 \
DISCOVER_TARGETS=200 \
STORM_SUBSCRIBERS_FILE=scripts/storm-reproducer/subscribers/dev-multi-company.template.txt \
FLOOD_COMPANY_IDS=684a7dee68bd32a1f552e453,6866480abdea2b03ef333165 \
FLOOD_COMPANY_BALANCE=true \
STORM_HOTPATH_ENABLED=true \
STORM_HOTPATH_INTERVAL_MS=1000 \
STORM_ROUTE=your-inbox \
STORM_DURATION_SEC=600 \
PROBE_DURATION_SEC=600 \
PROBE_INTERVAL_MS=1000 \
STORM_READY_TIMEOUT_SEC=1800 \
bash scripts/storm-reproducer/run-all.sh
```

### Opsi 3 — shorthand langsung ke storm-reproducer

```bash
node scripts/storm-reproducer/storm-reproducer.js \
  --env dev \
  --subscribers-file scripts/storm-reproducer/subscribers/dev-bulk.txt
```

### Opsi 3 — `@file` shorthand

```bash
node scripts/storm-reproducer/storm-reproducer.js \
  --env dev \
  --subscribers @scripts/storm-reproducer/subscribers/dev-bulk.txt
```
