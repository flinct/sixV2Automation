# Conversation Storm Reproducer

Reproducer untuk symptom prod:

- pending berulang pada
  - `GET /api/conversation?status=open&sort=isPinned:desc,pinnedAt:desc,timestamp:desc&hideEmpty=true&limit=20&page=1`
  - `GET /api/conversation/count`
- terjadi saat user ada di halaman conversation (terutama `/conversation/your-inbox`)
- memicu DB spike
- list chat yang dibutuhkan user tidak muncul

Fokus tool ini **bukan** sekadar pukul endpoint langsung, tapi meniru bentuk load FE yang lebih dekat ke real browser:

1. login user
2. warm landing burst `/your-inbox`
3. connect socket namespace `conversations`
4. receive event seperti `notification.new.message`, `conversation.assigned`, `conversation.unassigned`
5. trigger overlapping refetch ke query yang memang di-invalidate FE

---

## Komponen

| Script                | Fungsi                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------- |
| `storm-reproducer.js` | socket subscriber + invalidation reflex                                                |
| `hotpath-probe.js`    | monitor kontinu 2 endpoint symptom (`/conversation` Variant 1 + `/conversation/count`) |
| `run-all.sh`          | orchestrator: start probe + storm, tunggu ready, lalu jalankan `inbound-rmq-flood`     |

Existing dependency yang dipakai:

- `scripts/inbound-rmq-flood/inbound-rmq-flood.js` → trigger RMQ publish
- `playwright/support/config/*` → env + credential + endpoint builder

---

## Exact FE facts yang sudah diaudit

### Socket connect

FE connect ke:

```ts
io(`${url}/${subPath}`, {
  auth: { token, type: "bearer" },
  autoConnect: false,
  reconnection: true,
  transports: ["websocket", "polling"],
});
```

Subpath yang relevan untuk conversation storm:

- `conversations`

### Socket events yang relevan

- `notification.new.message`
- `conversation.assigned`
- `conversation.unassigned`

### Invalidate pattern di FE

Dari `use-conversation-socket-event.ts`:

- `notification.new.message` → untuk message non-active conversation, FE bisa invalidate:
  - current conversation list query
  - `COUNT_CONVERSATIONS`

- `conversation.assigned` / `conversation.unassigned` → FE invalidate prefix:
  - `[CONVERSATIONS]`
  - `[COUNT_CONVERSATIONS]`
  - `[FETCH_CONVERSATION_COUNTS]`
  - `[FETCH_CONVERSATION_FILTER_COUNTS]`
  - `[CONVERSATION_LIMIT]`

### Exact list query shape yang dipakai FE

Variant 1 (`/all`, dan juga ikut ter-load saat landing `/your-inbox`):

```text
/api/conversation?status=open&sort=isPinned:desc,pinnedAt:desc,timestamp:desc&hideEmpty=true&limit=20&page=1
```

Variant 2 (`/your-inbox`):

```text
/api/conversation?assign=true&status=open&sort=isPinned:desc,pinnedAt:desc,timestamp:desc&hideEmpty=true&limit=20&page=1
```

---

## Running — Single device

### Prerequisites

1. SSH tunnel ke RabbitMQ sudah hidup di device yang sama
2. `RMQ_PASS` sudah di-export
3. Credential login automation di `.env` valid

Quick check:

```bash
nc -vz 127.0.0.1 5672
# expected: succeeded

echo "RMQ_PASS length: ${#RMQ_PASS}"
# expected: > 0
```

---

## A. Jalankan storm subscriber saja

```bash
node scripts/storm-reproducer/storm-reproducer.js \
  --env dev \
  --subscribers danyatmin01:1,danyspv01:2,danyagent01:2 \
  --duration-sec 180 \
  --route your-inbox
```

Expected log:

```text
[storm] env=dev route=your-inbox duration=180s subscribers=danyatmin01:1,...
[storm] 5 subscriber(s) ready
```

Kalau ada traffic inbound real di company yang sama, subscriber akan mulai receive event dan issue refetch overlap.

---

## B. Jalankan hotpath probe saja

```bash
node scripts/storm-reproducer/hotpath-probe.js \
  --env dev \
  --login-type danyatmin01 \
  --duration-sec 120 \
  --interval-ms 1000
```

Probe ini **hanya** monitor 2 endpoint symptom:

- Variant 1 `/conversation`
- `/conversation/count`

Summary contoh:

```text
[probe] summary:
  GET /conversation (variant-1 all)   ok=120 errors=0 statuses={"200":120} min=120ms avg=340ms p50=280ms p95=890ms max=1600ms
  GET /conversation/count             ok=120 errors=0 statuses={"200":120} min=90ms avg=310ms p50=240ms p95=840ms max=1500ms
```

---

## C. Jalankan full pipeline via orchestrator

```bash
export RMQ_PASS='YOUR_REAL_RMQ_PASSWORD'

./scripts/storm-reproducer/run-all.sh
```

### Default yang dipakai orchestrator

- env: `dev`
- login flood: `danyatmin01`
- storm subscribers: `danyatmin01:1,danyspv01:2,danyagent01:2`
- storm route: `your-inbox`
- total messages flood: `300`
- probe duration: `300s`
- storm duration: `300s`

### Override via env

#### Opsi pendek — pakai file subscriber list

Simpan list besar ke file, misalnya:

```text
scripts/storm-reproducer/subscribers/dev-bulk.txt
```

Lalu run:

```bash
ENV=dev \
LOGIN_TYPE=admintest \
TOTAL_MESSAGES=2000 \
DISCOVER_TARGETS=200 \
STORM_SUBSCRIBERS_FILE=scripts/storm-reproducer/subscribers/dev-bulk.txt \
STORM_ROUTE=your-inbox \
STORM_DURATION_SEC=600 \
PROBE_DURATION_SEC=600 \
PROBE_INTERVAL_MS=1000 \
STORM_READY_TIMEOUT_SEC=1800 \
bash scripts/storm-reproducer/run-all.sh
```

#### Opsi full multi-company

Pakai file subscriber dengan section `[company:<id>]`, misalnya:

```text
scripts/storm-reproducer/subscribers/dev-multi-company.template.txt
```

Run:

```bash
ENV=dev \
LOGIN_TYPE=satuinboxlincah,admintest \
TOTAL_MESSAGES=4000 \
DISCOVER_TARGETS=800 \
STORM_SUBSCRIBERS_FILE=scripts/storm-reproducer/subscribers/dev-multi-company.template.txt \
FLOOD_COMPANY_IDS=684a7dee68bd32a1f552e453,6889b71ded520395ba12028b \
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

Behavior:

- flood dibalance ke company yang kamu set di `FLOOD_COMPANY_IDS`
- subscriber dibedakan per company dari file section `[company:<id>]`
- setiap subscriber jalankan hotpath probe sendiri (`/conversation` variant-1 + `/conversation/count`)
- summary akhir tampil per company dan per subscriber

#### Opsi lama — inline env var

```bash
ENV=dev \
LOGIN_TYPE=admintest \
TOTAL_MESSAGES=2000 \
DISCOVER_TARGETS=200 \
STORM_SUBSCRIBERS=danyatmin01:1,danyspv01:4,danyagent01:4 \
STORM_ROUTE=your-inbox \
STORM_DURATION_SEC=600 \
PROBE_DURATION_SEC=600 \
PROBE_INTERVAL_MS=1000 \
./scripts/storm-reproducer/run-all.sh
```

`test dev akun sap prod`
`364+ akun`

````bash
ENV=dev \
LOGIN_TYPE=admintest \
TOTAL_MESSAGES=2000 \
DISCOVER_TARGETS=200 \
STORM_SUBSCRIBERS_FILE=scripts/storm-reproducer/subscribers/dev-bulk.txt \
STORM_ROUTE=your-inbox \
STORM_DURATION_SEC=600 \
PROBE_DURATION_SEC=600 \
PROBE_INTERVAL_MS=1000 \
STORM_READY_TIMEOUT_SEC=1800 \
bash scripts/storm-reproducer/run-all.sh

`partial akun`
```bash
ENV=dev \
LOGIN_TYPE=admintest \
TOTAL_MESSAGES=2000 \
DISCOVER_TARGETS=200 \
STORM_SUBSCRIBERS=admintest:1,adikhermawan:4,cxlead01:4,cxlead12:4,cxlead03:4,cxlead04:4,cx070:4,cx076:4,cx074:4,cx080:4 \
STORM_ROUTE=your-inbox \
STORM_DURATION_SEC=600 \
PROBE_DURATION_SEC=600 \
PROBE_INTERVAL_MS=1000 \
STORM_READY_TIMEOUT_SEC=1800 \
bash scripts/storm-reproducer/run-all.sh
````

Untuk per-team-inbox:

```bash
ENV=dev \
LOGIN_TYPE=danyatmin01 \
STORM_ROUTE=per-team-inbox \
STORM_TEAM_ID=692e677de6f74788e2e6871b \
./scripts/storm-reproducer/run-all.sh
```

---

## Log output

`run-all.sh` bikin 3 log file di folder temp:

```text
scripts/storm-reproducer/logs/storm-YYYYMMDD-HHMMSS/
  probe.log
  storm.log
  flood.log
```

Folder `logs/` sudah di-`.gitignore` jadi tidak akan ke-commit.

Kalau mau override lokasi log:

```bash
LOG_DIR=/path/to/custom/logs bash scripts/storm-reproducer/run-all.sh
```

### `storm.log`

Berisi:

- subscriber ready info
- socket connect/disconnect
- event counts (`notification.new.message`, `conversation.assigned`, dll)
- per-endpoint refetch stats
- `max concurrent in-flight requests`

Metric paling penting:

```text
max concurrent in-flight requests: N
```

Kalau angka ini naik tajam (> jumlah subscriber), itu berarti event storm benar-benar membuat **overlapping refetch**, bukan polling biasa.

### `probe.log`

Berisi:

- kontinu measurement untuk 2 endpoint symptom
- summary p50/p95/max setelah run selesai

### `flood.log`

Berisi:

- publish progress dari `inbound-rmq-flood`
- useful untuk align timeline dengan `storm.log`

---

## Cara baca hasil

### Sukses mereproduce symptom bila:

1. `storm.log` menunjukkan event `notification.new.message` / `conversation.assigned` meningkat selama flood
2. `max concurrent in-flight requests` naik
3. `probe.log` menunjukkan `/conversation` Variant 1 + `/conversation/count` p95/max melonjak selama flood
4. di browser/devtools (kalau sambil dibuka) request yang sama mulai pending berulang

### Kalau flood jalan tapi storm sepi

Kemungkinan:

- subscriber login ke company yang berbeda dari target flood
- socket namespace / auth gagal
- inbound yang dipublish tidak menghasilkan socket event di company itu

### Kalau storm event ramai tapi probe tetap flat

Kemungkinan:

- endpoint refetch yang ditembak belum exact sama symptom
- jumlah subscriber / messages terlalu kecil
- DB/cache di env dev belum cukup panas

---

## Tuning

### Naikkan load socket-driven

Tambah subscriber:

```bash
STORM_SUBSCRIBERS=danyatmin01:1,danyspv01:4,danyagent01:4
```

### Naikkan beban trigger inbound

Tambah flood volume:

```bash
TOTAL_MESSAGES=2000
DISCOVER_TARGETS=200
```

### Run lebih lama untuk dapat p95 stabil

```bash
STORM_DURATION_SEC=600
PROBE_DURATION_SEC=600
```

---

## Troubleshooting

### `subscriber(s) ready` tidak muncul

Lihat:

```bash
tail -50 scripts/storm-reproducer/logs/storm-*/storm.log
```

Biasanya karena:

- credential salah
- socket auth fail
- API base salah (FE host, bukan BE gateway)

### `ACCESS_REFUSED` di flood

Masalah RabbitMQ auth / URI, bukan storm script.

Pastikan:

```bash
nc -vz 127.0.0.1 5672
```

Dan `RMQ_URI` pakai password real, bukan placeholder `***`.

### `storm.log` tidak menerima event apapun

Kemungkinan:

- inbound tidak diproses sukses di BE
- account channel inactive / invalid
- subscriber company mismatch dengan target flood

### Probe lambat bahkan tanpa storm

Ini menandakan baseline env dev memang sudah berat — tetap berguna, tapi bandingkan baseline vs during-flood.

---

## Next step yang mungkin

1. Tambah mode `--verbose` untuk dump event payload sample ke `storm.log`
2. Tambah mapping custom role `dany*` yang lebih explicit ke output summary
3. Tambah optional K6 stress script untuk backend-only saturation test
4. Tambah capture timeline (`event received at T`, `refetch fired at T+Xms`) untuk RCA report
