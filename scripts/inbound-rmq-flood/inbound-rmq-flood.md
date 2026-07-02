# inbound-rmq-flood.js

Simulator untuk membanjiri jalur **inbound message** lewat RabbitMQ dev.

## Jalur yang disimulasikan

Script ini publish langsung ke queue backend yang dipakai product:

- `message.inbound` → `inbound-messages`
- `group.message.inbound` → `inbound-group-messages`

Flow yang diuji tetap real:

`publisher` → `RabbitMQ` → `conversation-service` → `socket emit` → FE refetch `/conversation` + `/conversation/count`

---

## Kapan dipakai

Pakai script ini ketika tujuanmu adalah:

- reproduce **pending storm** `/conversation` + `/conversation/count`
- cek apakah volume inbound memicu invalidation/refetch FE
- bandingkan **single target**, **multi-target**, dan **multi-channel**
- menguji jalur queue yang sama dengan inbound real

---

## Workflow yang direkomendasikan

> **Penting:** jalankan tunnel SSH dan flood script dari **environment yang sama** (disarankan WSL / bash). Jangan buka tunnel di WSL lalu publish dari PowerShell, karena bisa kena mismatch localhost bridge / `ECONNREFUSED`.

### Step 1 — pastikan RabbitMQ dev hidup

Di server dev:

```bash
docker compose ps rabbitmq-satuinbox
```

Minimal pastikan:

- service `rabbitmq-satuinbox` status `Up`
- port `5672` exposed

### Step 2 — buka SSH tunnel ke RabbitMQ dev

Dari WSL / bash lokal:

```bash
ssh -i ~/.ssh/satuinbox.pem \
  -o ExitOnForwardFailure=yes \
  -o ServerAliveInterval=30 \
  -L 5672:127.0.0.1:5672 \
  ubuntu@ec2-16-79-6-229.ap-southeast-3.compute.amazonaws.com \
  -N
```

Expected:

- terminal akan diam / menunggu
- itu normal
- biarkan terminal ini tetap terbuka selama test berjalan

> Kalau kamu punya alias SSH yang sudah hardcode host, tetap lebih aman pakai raw `ssh -L ... user@host -N`. Jangan letakkan `-L` setelah destination host.

### Step 3 — verifikasi tunnel

Langkah 1 — pindah ke folder project dulu
Di WSL:

Code
· bash
cd /mnt/c/Users/MyBook\ SAGA\ 12/Desktop/sixV2Automation

Di terminal WSL lain:

```bash
ss -ltnp | grep 5672 || echo "NO_LISTENER_ON_5672"
nc -vz 127.0.0.1 5672
```

Expected:

- ada listener di `127.0.0.1:5672`
- `nc` sukses connect

Kalau mau cek dari PowerShell:

```powershell
Test-NetConnection 127.0.0.1 -Port 5672
```

### Step 4 — set password RabbitMQ

Di WSL:

```bash
export RMQ_PASS='PKMj9cx51pObnykpLc5I34lbFVpqA9au'
echo "RMQ_PASS length: ${#RMQ_PASS}"
```

Kalau perlu set dari PowerShell:

```powershell
$env:RMQ_PASS = 'ISI_PASSWORD_RMQ_ASLI'
$rmqUri = "amqp://admin:$($env:RMQ_PASS)@127.0.0.1:5672"
```

> Jangan kirim placeholder literal seperti `PASSWORD_ASLI_RABBITMQ`, karena akan berujung `ACCESS_REFUSED`.

### Step 5 — mulai dari smoke test kecil

Pakai target eksplisit yang sudah diketahui valid / aktif:

```bash
npm run inbound:rmq:flood -- \
  --channel-account-id 6a3a09fde42a5248d98c2715 \
  --client-contact-ids 692e883e12f9fe277213850d \
  --channel-profile whatsapp \
  --total-messages 5 \
  --batch-size 1 \
  --message-type text \
  --log-every 1 \
  --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672" \
  --skip-preflight
```

Expected minimal:

```text
[publish] 1/5 ...
published 1/5
...
publish complete.
```

### Step 6 — pantau queue dan consumer

Di server dev:

```bash
docker exec -it rabbitmq-satuinbox rabbitmqctl list_queues name messages_ready messages_unacknowledged consumers | egrep 'inbound|group'
```

Interpretasi cepat:

- `ready > 0` → message masuk queue tapi belum diambil consumer
- `unack > 0` → consumer sudah ambil tapi belum ack
- `ready = 0` dan `unack = 0` dengan `consumers = 1` → message sudah di-consume dan di-ack

Untuk log consumer:

```bash
docker compose logs --since=10m conversation-service | egrep 'Successfully processed inbound message|Error processing inbound message|Max retries reached|Re-queue message|Duplicate message'
```

### Step 7 — scale up bertahap

Contoh scale ke 100:

```bash
npm run inbound:rmq:flood -- \
  --channel-account-id 6a3a09fde42a5248d98c2715 \
  --client-contact-ids 692e883e12f9fe277213850d \
  --channel-profile whatsapp \
  --total-messages 100 \
  --batch-size 5 \
  --message-type text \
  --log-every 5 \
  --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672" \
  --skip-preflight
```

### Step 8 — observasi FE

Di browser dev, buka DevTools → Network dan pantau:

- `/api/conversation`
- `/api/conversation/count`

Lihat:

- apakah request mulai refetch berulang
- apakah `pending` menumpuk
- apakah `/conversation/count` melambat lebih dulu
- apakah perilaku beda saat room aktif vs non-active room

---

## Log yang bisa dilihat saat jalan

### Default

Script akan print:

- summary run
- sample envelopes
- progress per batch (`published X/Y`)
- beberapa publish line awal + berkala

### Verbose

Untuk log setiap event:

```bash
npm run inbound:rmq:flood -- --verbose ...
```

### Log berkala

Untuk log tiap N event:

```bash
npm run inbound:rmq:flood -- --log-every 25 ...
```

Contoh runtime line:

```text
[publish] 25/300 queue=inbound-messages pattern=message.inbound profile=widget channelAccountId=... clientContactId=... type=text
```

---

## Preflight & target discovery

### Kenapa penting

Kalau `accountChannelId` tidak valid / inactive, atau `clientContactId` tidak valid, backend bisa reject inbound sebelum conversation resolve selesai.

Safest path:

1. **discover target dari conversation yang memang sudah ada**, atau
2. kalau target diisi manual, **validate dulu** via API sebelum publish

### Default behavior

- **dry-run**: tidak publish, tapi tetap bisa discovery / preflight
- **publish run**: preflight target otomatis kecuali pakai `--skip-preflight`
- auth discovery/preflight bisa dari `--auth-bearer-token`, `--identifier + --password`, `--login-type`, atau fallback ke default account automation

### Filter env & company

- `--env dev|staging|prod|local`
- `--api-base https://.../`
- `--company-id <id>`
- `--company-ids id1,id2,id3`
- `--company-balance`

### Auto-discover target dari recent conversations

```bash
npm run inbound:rmq:flood:dry -- \
  --env dev \
  --login-type cekerayam01 \
  --discover-targets 10 \
  --discover-profiles widget,messenger,email,instagram,whatsapp \
  --company-ids companyA,companyB
```

Ini akan ambil pasangan **account channel + contact** dari recent conversations, jadi jauh lebih aman daripada cross-pairing account channel aktif dengan contact random.

### Validasi target manual

Kalau kamu tetap pakai `--targets-file` atau `--channel-account-id + --client-contact-ids`, publish run akan cek:

- account channel ada
- contact ada
- untuk direct inbound, account channel active
- untuk group, member contacts juga ada

Kalau mau skip:

```bash
npm run inbound:rmq:flood -- --skip-preflight ...
```

---

## Randomisasi target

Script sekarang mendukung:

```bash
--random-targets
```

### Yang diacak apa?

Yang diacak adalah **pasangan target valid**:

- `channelAccountId + clientContactId`

Bukan `channelAccountId` dan `clientContactId` diacak terpisah.

### Cara kerja random

- target list di-**shuffle**
- script kirim satu per satu sesuai urutan acak
- kalau satu cycle habis, list akan **di-shuffle ulang**
- jadi random **tanpa replacement per cycle**

### Kalau target cuma 1

Kalau cuma ada satu pair:

```bash
--channel-account-id ...
--client-contact-ids only-one-id
```

maka `--random-targets` **tidak ada efek**.

### Random + discovery

```bash
npm run inbound:rmq:flood -- \
  --env dev \
  --login-type cekerayam01 \
  --discover-targets 20 \
  --discover-profiles whatsapp,widget \
  --total-messages 300 \
  --batch-size 10 \
  --message-type text \
  --log-every 10 \
  --random-targets \
  --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672" \
  --skip-preflight
```

### Random + targets file

```bash
npm run inbound:rmq:flood -- \
  --targets-file scripts/inbound-rmq-flood/inbound-rmq-flood.example.targets.json \
  --total-messages 500 \
  --batch-size 5 \
  --message-type text \
  --log-every 5 \
  --random-targets \
  --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672" \
  --skip-preflight
```

### Random + company balance

Kalau `--company-balance` dipakai bersama `--random-targets`:

- company tetap dipilih **round-robin**
- target di **dalam tiap bucket company** akan diacak

Jadi hasilnya:

- sebaran company tetap rata
- pair di tiap company tidak monoton

---

## Mixed conversation mode (Pool A / B / C)

Untuk simulasi yang lebih realistis, script bisa mencampur 3 jenis flow inbound dalam satu run:

| Pool | Apa yang dibuat di backend                                  | Source pair                                                         |
| ---- | ----------------------------------------------------------- | ------------------------------------------------------------------- |
| A    | **Existing conversation** (update last message, bump count) | Pair dari `/api/conversation` (discovery atau targets-file)         |
| B    | **New conversation, existing contact**                      | Active account channel × contact valid, pair belum ada conversation |
| C    | **New conversation, NEW contact**                           | Active account channel + contact baru yang dibuat saat run          |

### Ratio CLI

```bash
--existing-contact-new-conv-ratio 10    # 10% messages → Pool B
--new-contact-new-conv-ratio      20    # 20% messages → Pool C
                                        # sisanya       → Pool A (default)
--new-contact-count               20    # contact baru yg dibuat untuk Pool C
--new-conv-settle-ms            5000    # setelah seed 1st-message Pool B/C, tunggu 5s sebelum repeat pair
```

- Default keduanya `0` → behavior tetap seperti sebelumnya (Pool A only).
- B + C tidak boleh melebihi 100, jika lebih script akan error fail-fast.
- `--new-contact-count` default 20. 1 contact baru dipakai untuk **banyak** message Pool C (tidak 1:1).
- `--new-conv-settle-ms` default 5000. Dipakai untuk mengurangi race `Conversation already exists` saat pair B/C yang sama dipublish berulang terlalu cepat.

### Validasi per pool

| Pool | account channel exist | `isDeleted=false` | linked channel | `connectionStatus=active` |
| ---- | --------------------- | ----------------- | -------------- | ------------------------- |
| A    | ✅                    | ✅                | ✅             | ❌ (boleh inactive)       |
| B    | ✅                    | ✅                | ✅             | ✅                        |
| C    | ✅                    | ✅                | ✅             | ✅                        |

Pool B dan C sengaja **strict active-only** karena backend `validateAccountChannel()` akan reject inactive channel untuk new conversation.

### Uniqueness key yang dipakai script vs backend

Untuk mencegah false-negative saat cek “conversation sudah ada atau belum”, script sekarang mengikuti key yang dipakai `conversation-service` saat duplicate guard:

```text
accountChannelId + contactInfo.referenceId
```

Bukan lagi `accountChannelId + clientContactId` murni.

Artinya:

- Pool B akan exclude candidate kalau sudah ada **open conversation** untuk `referenceId` tersebut pada `accountChannel` yang sama, walau `clientContactId`-nya berbeda.
- Pool C menyimpan `referenceId` floodtest ke target pair, jadi scheduler dan log punya identity key yang sama dengan duplicate guard backend.

### Seed → settle → flood untuk Pool B/C

Untuk mengurangi race `contactInfo with Conversation already exists`, publish Pool B/C sekarang dibagi 2 phase:

1. **Seed phase** — kirim **1 first-message** per unique pair B/C
2. **Settle phase** — tunggu `--new-conv-settle-ms`
3. **Main flood phase** — baru kirim sisa message untuk pair yang sama

Ini penting karena tanpa phase ini, message kedua untuk pair yang sama bisa masuk sebelum conversation pertama selesai dipersist dan terbaca oleh worker berikutnya.

### Format referenceId Pool C (contact baru)

Semua contact baru pakai prefix `floodtest` di referenceId + marker di metaData. `<id>` adalah random 8-char alphanumeric (a-z, 0-9) yang digenerate ulang setiap contact — bukan sequence 1, 2, 3, ... — sehingga aman dipakai walau ada concurrent runs.

| Channel   | referenceId                                           |
| --------- | ----------------------------------------------------- |
| WhatsApp  | `floodtest_<runId>_<id>@s.whatsapp.net`               |
| Messenger | `floodtest-fb-<runId>-<id>`                           |
| Instagram | `floodtest-ig-<runId>-<id>`                           |
| Email     | `floodtest+<runId>-<id>@floodtest.invalid::FloodTest` |
| Widget    | `floodtest-widget-<runId>-<id>`                       |

`metaData` di setiap contact baru:

```json
{
  "source": "inbound-rmq-flood",
  "runId": "<timestamp>",
  "isFloodTest": true,
  "createdAt": "<isoDate>"
}
```

### Cara cari & hapus data floodtest (manual cleanup)

Semua contact yang dibuat oleh Pool C dapat dicari di MongoDB:

```js
// dari referenceId
db.client_contacts.find({ referenceId: /^floodtest[_+-]/ });

// dari metaData (lebih jelas)
db.client_contacts.find({ "metaData.isFloodTest": true });
```

Conversation yang nempel ke contact tersebut bisa dicari via `client_contact_id`. Message floodtest punya content prefix `[dev-inbound-flood]`.

### Contoh full mixed run

```bash
npm run inbound:rmq:flood -- \
  --env dev \
  --login-type cekerayam01 \
  --discover-targets 200 \
  --discover-profiles widget,messenger,email,instagram,whatsapp \
  --total-messages 2000 \
  --batch-size 10 \
  --message-type text \
  --log-every 10 \
  --random-targets \
  --existing-contact-new-conv-ratio 10 \
  --new-contact-new-conv-ratio 20 \
  --new-contact-count 20 \
  --uri "amqp://admin:***@127.0.0.1:5672"
```

Output yang diharapkan:

```text
[mix] schedule split:
  existing-conv:              1400 (70%)
  existing-contact-new-conv:  200  (10%)
  new-contact-new-conv:       400  (20%)
[mix] pools collected:
  A: 187 unique pair(s)  (existing conversation)
  B: 64 unique pair(s)   (existing contact, new conversation)
  C: 20 unique pair(s)   (20 floodtest contact(s) created)
[mix] phase-1 seeding (one first message per new-conversation pair):
  seed B: 64 unique pair(s)
  seed C: 20 unique pair(s)
  settle: wait 5000ms before flooding repeats
[publish] phase=seed-new-conv start (84 message(s))
...
[publish] phase=seed-new-conv complete; settling 5000ms before flooding repeats
...
```

> Catatan: data Pool B/C persist di DB dev setelah run. Cleanup tidak otomatis — gunakan filter `floodtest` di atas untuk hapus manual saat perlu reset.

---

## Concurrent FE-style viewers (multi-role login)

Untuk reproduce **pending storm** beneran, script bisa menjalankan beberapa sesi login paralel yang polling `/conversation` + `/conversation/count` selama publish berjalan. Tiap viewer punya token sendiri (login terpisah), sesuai role yang kamu pilih.

### Akun tersedia di config

| loginType         | Role            |
| ----------------- | --------------- |
| `chickentester01` | admin (default) |
| `cekerayam01`     | admin           |
| `mataayam01`      | supervisor      |
| `leherayam01`     | agent           |

Pilih sesuai test plan kamu. Default behavior berbeda per role (privacy, scope, visibility) — pakai mix untuk reproduce real beban.

### CLI

```bash
--viewer-roles <list>             # comma-separated loginType. Setiap entry boleh 'loginType' ATAU 'loginType:count'.
                                  # Contoh: --viewer-roles chickentester01,mataayam01:4,leherayam01:4
                                  #   → 1 admin + 4 supervisor + 4 agent (ratio 4:1 supervisor/agent vs admin)
--viewers-per-role <n>            # fallback multiplier untuk role TANPA ':count' di --viewer-roles. Default 1.
--viewer-poll-interval-ms <n>     # default 3000
--viewer-warmup-ms <n>            # default 1000 (delay sebelum poll pertama)
--viewer-persona <name>           # force admin|supervisor|agent; default auto-detect dari loginType
--viewer-detail-every <n>         # tiap N poll, juga panggil /:id, /participants, /sla-metrics, /history (default 3, 0=off)
--no-viewer-discover-channels     # disable per-channel tab (default discovery on)
--no-viewer-discover-team-inboxes # disable per-team-inbox tab (default discovery on)
```

### Endpoint coverage (semua role)

Tiap poll cycle, viewer panggil endpoint berikut **paralel** via `Promise.all` (mirror FE behavior):

| Endpoint                                        | Catatan                                  |
| ----------------------------------------------- | ---------------------------------------- |
| `GET /conversation?<tab-filter>`                | filter rotasi weighted random            |
| `GET /conversation/count`                       |                                          |
| `GET /conversation/filter-count?assign=true`    | sama spt FE                              |
| `GET /conversation/active-conversation-count`   |                                          |
| `GET /conversation/group`                       |                                          |
| `GET /conversation/tags`                        |                                          |
| `GET /conversation/available-slot`              | **agent only**                           |
| `GET /notifications/unread-count?group=primary` |                                          |
| `GET /notifications/unread-count?group=updates` |                                          |
| `GET /member/status`                            |                                          |
| `GET /member?limit=100&page=1`                  |                                          |
| `GET /tag?limit=100&page=1`                     | global tag, beda dari /conversation/tags |
| `GET /away-reasons`                             |                                          |

### Detail endpoints (tiap N poll)

Setiap `--viewer-detail-every` cycle (default 3), viewer pick 1 conversation random dari `/conversation` list terakhir dan panggil paralel:

- `GET /conversation/:id`
- `GET /conversation/participants?conversationId=:id`
- `GET /conversation-sla-metrics/:id`
- `GET /conversation/history?clientContactId=<contact dari conv>`

### Tab rotation (weighted random)

Tiap poll, viewer pilih tab pakai distribusi:

| Tab            | Weight | Query                                                                                 |
| -------------- | -----: | ------------------------------------------------------------------------------------- |
| my-inbox       |    40% | `status=open&assign=true&sort=isPinned:desc,timestamp:desc&hideEmpty=true&limit=20`   |
| unassigned     |    20% | `status=open&unassign=true&sort=isPinned:desc,timestamp:desc&hideEmpty=true&limit=20` |
| all            |    15% | `status=open&sort=isPinned:desc,timestamp:desc&hideEmpty=true&limit=20`               |
| spam           |     5% | `isSpam=true&sort=...&limit=20`                                                       |
| favorite       |     5% | `isFavorite=true&sort=...&limit=20`                                                   |
| junk           |     5% | `isJunked=true&sort=...&limit=20`                                                     |
| per-channel    |     5% | `status=open&platform=<discovered>&sort=...&hideEmpty=true`                           |
| per-team-inbox |     5% | `status=open&team=<discovered>&sort=...&hideEmpty=true`                               |

Per-channel & per-team-inbox tab discovered otomatis tiap viewer login: script panggil `/account-channel?limit=50` untuk dapat list platform yang available, dan `/team` untuk list team inbox. Discovery scope-nya **per role login** — admin lihat semua, supervisor cuma team-nya, agent cuma yang assigned ke dia.

Kalau discovery return kosong (mis. agent tidak punya team inbox), tab tersebut otomatis di-skip.

Metric track per-endpoint **per-tab** terpisah — bisa lihat apakah tab tertentu (mis. junk atau per-channel) lebih lambat dari yang lain.

### Persona

Persona auto-detected dari loginType:

| loginType       | Persona    | Extra endpoint                 |
| --------------- | ---------- | ------------------------------ |
| chickentester01 | admin      | —                              |
| cekerayam01     | admin      | —                              |
| mataayam01      | supervisor | —                              |
| leherayam01     | agent      | `/conversation/available-slot` |

Note: persona **hanya** mempengaruhi `/available-slot`. Semua endpoint lain dipanggil semua role.

### Contoh: full mixed flood + 1 admin + 4 supervisor + 4 agent (ratio 4:1)

```bash
npm run inbound:rmq:flood -- \
  --env dev \
  --login-type cekerayam01 \
  --discover-targets 200 \
  --discover-profiles widget,messenger,email,instagram,whatsapp \
  --total-messages 2000 \
  --batch-size 10 \
  --message-type text \
  --log-every 10 \
  --random-targets \
  --existing-contact-new-conv-ratio 10 \
  --new-contact-new-conv-ratio 20 \
  --new-contact-count 20 \
  --viewer-roles chickentester01,mataayam01:4,leherayam01:4 \
  --viewer-poll-interval-ms 2000 \
  --viewer-detail-every 3 \
  --uri "amqp://admin:***@127.0.0.1:5672"
```

### Output di akhir publish

```text
publish complete.

[viewers] summary:
  chickentester01#1 (admin, 90 poll cycle(s))
    GET /away-reasons                                        count=  90 errors=0 min=82ms avg=145ms p50=132ms p95=287ms max=412ms
    GET /conversation (filtered) [your-inbox]                count=  36 errors=0 min=98ms avg=287ms p50=234ms p95=687ms max=912ms
    GET /conversation (filtered) [unassigned]                count=  18 errors=0 min=145ms avg=323ms p50=289ms p95=587ms max=712ms
    GET /conversation (filtered) [all]                       count=  14 errors=0 min=187ms avg=412ms p50=378ms p95=823ms max=1024ms
    GET /conversation (filtered) [spam]                      count=   5 errors=0 ...
    GET /conversation (filtered) [favorite]                  count=   4 errors=0 ...
    GET /conversation (filtered) [junk]                      count=   5 errors=0 ...
    GET /conversation (filtered) [per-channel]               count=   4 errors=0 ...
    GET /conversation (filtered) [per-team-inbox]            count=   4 errors=0 ...
    GET /conversation-sla-metrics/:id                        count=  30 errors=0 ...
    GET /conversation/:id                                    count=  30 errors=0 ...
    GET /conversation/active-conversation-count              count=  90 errors=0 ...
    GET /conversation/count                                  count=  90 errors=0 ...
    GET /conversation/filter-count?assign=true               count=  90 errors=0 ...
    GET /conversation/group                                  count=  90 errors=0 ...
    GET /conversation/history?clientContactId                count=  30 errors=0 ...
    GET /conversation/participants?conversationId            count=  30 errors=0 ...
    GET /conversation/tags                                   count=  90 errors=0 ...
    GET /member?limit=100                                    count=  90 errors=0 ...
    GET /member/status                                       count=  90 errors=0 ...
    GET /notifications/unread-count?group=primary            count=  90 errors=0 ...
    GET /notifications/unread-count?group=updates            count=  90 errors=0 ...
    GET /tag?limit=100                                       count=  90 errors=0 ...
  ...
```

### Cara baca

- Bandingkan **per endpoint** per role — endpoint mana yang p95-nya bocor paling parah saat publish window?
- Bandingkan **per tab** dalam endpoint `/conversation` — kalau `[unassigned]` jauh lebih lambat dari `[your-inbox]`, query plan tab tersebut suspect.
- `errors > 0` di endpoint manapun → BE sempat 5xx/timeout selama storm.
- Tracking endpoint NON-conversation (`/member`, `/tag`, `/away-reasons`, `/notifications`) penting untuk dx apakah bottleneck-nya specific ke conversation domain atau kontensi shared resource (DB pool, gRPC, Redis).

### Tips untuk dapat sample size yang reliable

- Naikkan `--total-messages` ke 2000 untuk publish window ~3-5 menit → ~90+ polls per viewer per tab
- Turunkan `--viewer-poll-interval-ms` ke 1000-2000 untuk lebih agresif (mirip socket-driven refetch real)
- Naikkan `--viewers-per-role 2` untuk simulate beberapa user concurrent per role

---

## Multi-channel support

Script ini bisa dipakai untuk mix banyak channel dalam satu targets file:

- `widget`
- `messenger`
- `instagram`
- `email`
- `whatsapp`

Untuk WhatsApp group bisa set:

- `group: true`
- `memberContactIds`
- `isAdmin`
- `senderContactId`
- `memberLids`

Lihat contoh di:

- `scripts/inbound-rmq-flood/inbound-rmq-flood.example.targets.json`

### Penting

- semua channel non-group tetap publish ke `message.inbound`
- group WhatsApp publish ke `group.message.inbound`
- satu run bisa mengandung target direct + group sekaligus

---

## Message types

### Aman lintas channel

```bash
--message-type text
```

### WhatsApp-heavy simulation

```bash
--message-type mixed-2045
```

`mixed-2045` mencampur:

- text
- reaction
- location
- contact
- interactive
- poll

Untuk target non-WhatsApp, mode ini fallback ke `text`.

---

## Cara pakai cepat

### Dry run minimal

```bash
npm run inbound:rmq:flood:dry -- \
  --targets-file scripts/inbound-rmq-flood/inbound-rmq-flood.example.targets.json \
  --message-type text
```

### All-channel mixed run

```bash
npm run inbound:rmq:flood -- \
  --targets-file scripts/inbound-rmq-flood/inbound-rmq-flood.example.targets.json \
  --total-messages 300 \
  --message-type text \
  --batch-size 60 \
  --log-every 25 \
  --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"
```

<!-- ```WSL
npm run inbound:rmq:flood -- --env dev --login-type cekerayam01 --discover-targets 200 --discover-profiles widget,messenger,email,instagram,whatsapp --total-messages 2000 --batch-size 10 --message-type text --log-every 10 --random-targets --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"
``` -->

### Multi-company balanced run

```bash
npm run inbound:rmq:flood -- \
  --env dev \
  --login-type cekerayam01 \
  --discover-targets 24 \
  --discover-profiles widget,messenger,email,instagram,whatsapp \
  --company-ids companyA,companyB,companyC \
  --company-balance \
  --total-messages 240 \
  --message-type text \
  --batch-size 40 \
  --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"
```

`LAST RUN`
npm run inbound:rmq:flood -- \
 --env dev \
 --login-type cekerayam01 \
 --discover-targets 200 \
 --discover-profiles widget,messenger,email,instagram,whatsapp \
 --total-messages 100 \
 --batch-size 10 \
 --message-type text \
 --log-every 10 \
 --random-targets \
 --existing-contact-new-conv-ratio 10 \
 --new-contact-new-conv-ratio 20 \
 --new-contact-count 20 \
 --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"

npm run inbound:rmq:flood -- \
 --env dev \
 --login-type cekerayam01 \
 --discover-targets 200 \
 --discover-profiles widget,messenger,email,instagram,whatsapp \
 --total-messages 2000 \
 --batch-size 10 \
 --message-type text \
 --log-every 10 \
 --random-targets \
 --existing-contact-new-conv-ratio 10 \
 --new-contact-new-conv-ratio 20 \
 --new-contact-count 20 \
 --viewer-roles chickentester01,mataayam01,leherayam01 \
 --viewer-poll-interval-ms 3000 \
 --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"

npm run inbound:rmq:flood -- \
 --env dev \
 --login-type cekerayam01 \
 --discover-targets 200 \
 --discover-profiles widget,messenger,email,instagram,whatsapp \
 --total-messages 2000 \
 --batch-size 10 \
 --message-type text \
 --log-every 10 \
 --random-targets \
 --existing-contact-new-conv-ratio 10 \
 --new-contact-new-conv-ratio 20 \
 --new-contact-count 20 \
 --viewer-roles chickentester01,mataayam01:4,leherayam01:4 \
 --viewer-poll-interval-ms 2000 \
 --viewer-detail-every 3 \
 --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"
`akun prod`
npm run inbound:rmq:flood -- \
 --env dev \
 --login-type danyatmin01 \
 --discover-targets 200 \
 --discover-profiles widget,messenger,email,instagram,whatsapp \
 --total-messages 2000 \
 --batch-size 10 \
 --message-type text \
 --log-every 10 \
 --random-targets \
 --existing-contact-new-conv-ratio 10 \
 --new-contact-new-conv-ratio 20 \
 --new-contact-count 20 \
 --viewer-roles danyagent01:4,danyagent02:4,danyagent03:4,danyagent04:4,danyspv01:4,danyspv02:4\
 --viewer-poll-interval-ms 2000 \
 --viewer-detail-every 3 \
 --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"
`admin only`
npm run inbound:rmq:flood -- \
 --env dev \
 --login-type admintest \
 --discover-targets 200 \
 --discover-profiles widget,messenger,email,instagram,whatsapp \
 --total-messages 2000 \
 --batch-size 10 \
 --message-type text \
 --log-every 10 \
 --random-targets \
 --existing-contact-new-conv-ratio 10 \
 --new-contact-new-conv-ratio 20 \
 --new-contact-count 20 \
 --viewer-poll-interval-ms 2000 \
 --viewer-detail-every 3 \
 --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"

npm run inbound:rmq:flood -- \
 --env dev \
 --login-type admintest \
 --discover-targets 200 \
 --discover-profiles widget,messenger,email,instagram,whatsapp \
 --total-messages 2000 \
 --batch-size 10 \
 --message-type text \
 --log-every 10 \
 --random-targets \
 --existing-contact-new-conv-ratio 10 \
 --new-contact-new-conv-ratio 20 \
 --new-contact-count 20 \
 --new-conv-settle-ms 5000 \
 --viewer-roles admintest:4 \
 --viewer-poll-interval-ms 2000 \
 --viewer-detail-every 3 \
 --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"

`all member`
npm run inbound:rmq:flood -- \
 --env dev \
 --login-type admintest \
 --discover-targets 200 \
 --discover-profiles widget,messenger,email,instagram,whatsapp \
 --total-messages 2000 \
 --batch-size 10 \
 --message-type text \
 --log-every 10 \
 --random-targets \
 --existing-contact-new-conv-ratio 10 \
 --new-contact-new-conv-ratio 20 \
 --new-contact-count 20 \
 --viewer-roles danyagent01:4,danyagent02:4,danyagent03:4,danyagent04:4,danyspv01:4,danyspv02:4\
 --viewer-poll-interval-ms 2000 \
 --viewer-detail-every 3 \
 --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"

### Randomized multi-target run

```bash
npm run inbound:rmq:flood -- \
  --targets-file scripts/inbound-rmq-flood/inbound-rmq-flood.example.targets.json \
  --total-messages 300 \
  --message-type text \
  --batch-size 10 \
  --log-every 10 \
  --random-targets \
  --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"
```

### WhatsApp-focused 2.7.0 hypothesis run

```bash
npm run inbound:rmq:flood -- \
  --targets-file scripts/inbound-rmq-flood/inbound-rmq-flood.example.targets.json \
  --total-messages 300 \
  --message-type mixed-2045 \
  --batch-size 60 \
  --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"
```

### Non-active conversation burst

Untuk reproduce storm `/conversation` + `/conversation/count`:

1. buka satu conversation aktif di UI
2. flood ke target lain yang masih match filter user
3. monitor FE network + backend log

Contoh:

```bash
npm run inbound:rmq:flood -- \
  --channel-account-id acc-dev-001 \
  --client-contact-ids c01,c02,c03,c04,c05,c06,c07,c08,c09,c10 \
  --total-messages 400 \
  --message-type text \
  --batch-size 100 \
  --uri "amqp://admin:$RMQ_PASS@127.0.0.1:5672"
```

---

## Argumen penting

- `--targets-file <path>`
- `--channel-account-id <id>`
- `--client-contact-ids <id1,id2,...>`
- `--group`
- `--channel-profile <generic|whatsapp|widget|messenger|instagram|email>`
- `--message-type <text|location|contact|reaction|interactive|poll|mixed-2045>`
- `--discover-targets <n>`
- `--discover-profiles <p1,p2,...>`
- `--discover-limit <n>`
- `--env <dev|staging|prod|local>`
- `--api-base <url>`
- `--company-id <id>` / `--company-ids <id1,id2,...>`
- `--company-balance`
- `--random-targets`
- `--login-type <name>`
- `--identifier <value>` + `--password <value>`
- `--auth-bearer-token <token>`
- `--skip-preflight`
- `--messages-per-target <n>`
- `--total-messages <n>`
- `--batch-size <n>`
- `--delay-ms <n>`
- `--log-every <n>`
- `--verbose`
- `--uri <amqp://...>`
- `--tls-ca`, `--tls-cert`, `--tls-key`

---

## Dibanding widget socket load

### `inbound-rmq-flood.js`

- injection point: **RabbitMQ queue**
- cocok untuk RCA backend + socket + FE invalidation
- bagus untuk simulasi multi-channel
- tidak menguji widget auth/open-api flow

### `widget-socket-load.js`

- injection point: **widget open-api + socket client**
- fokus ke widget-specific path
- bagus kalau suspect ada issue di widget/socket/gateway
- tidak mewakili semua channel

### `widget-socket-load-2.js`

- injection point: **Socket.IO connection / throughput**
- bagus untuk HPA, memory, CPU, connection soak
- lebih infra/socket-oriented
- kurang representatif untuk simulasi multi-channel inbound business flow

---

## Keterbatasan

1. Script ini bypass upstream parser/webhook tiap channel.
2. Validitas simulasi tetap tergantung `channelAccountId` dan `clientContactId` dev yang kamu pakai.
3. Untuk memunculkan storm seperti screenshot, target harus tetap relevan ke inbox/filter user.
4. Kalau tujuanmu adalah menguji parser webhook spesifik channel, lebih cocok pakai **webhook replay**.
5. `--random-targets` mengacak **pair valid**, bukan membentuk kombinasi baru antar-channelAccount dan contact secara bebas.
