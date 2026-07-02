# conversation-size-probe

Read-only probe untuk menjawab **poin 1** dari analisis 2.7.0 slowdown:

> ukur ukuran response `/conversation` + `/conversation/count` dan bandingkan v2.6.1 vs v2.7.0 untuk tenant yang sama.

Script ini tidak publish apa-apa. Cuma:

- login → ambil token
- panggil `/api/conversation?<filter>` beberapa kali, ukur:
  - TTFB
  - total time
  - response size
  - per-item size
- (opsional) panggil `/api/conversation/count` dengan filter yang sama
- census kehadiran field bloat 2.7.0:
  - `unreadMentionCount`
  - `mentionAll`
  - `clientContact.lid`
  - `memberContactInfo[]` + `memberContactInfo[].lid`
  - `participants[].assignSource`
  - `latestMessage.mentions[]`, `latestMessage.mentionAll`
  - `pinnedMessage.mentions[]`, `pinnedMessage.mentionAll`
- simpan snapshot JSON di `snapshots/`
- `--diff` dua snapshot → cetak delta size/TTFB/total + perubahan field census

## Kenapa script ini ada

Analisis 2.7.0 menduga payload bloat sebagai salah satu major cause. Tapi sampai sekarang **belum ada angka aktual**. Ini cara paling murah untuk dapat angkanya tanpa nyentuh repo FE/BE.

## Cara pakai

### 1. Capture v2.6.1 (atau snapshot prod sebelum 2.7.0 deploy)
```bash
npm run convo:size:probe -- \
  --env prod \
  --login-type goddummyprod \
  --query "status=ongoing&limit=20&page=1" \
  --hit-count \
  --repeat 5 \
  --label v261-prod-ongoing-limit20
```

Output disimpan ke `scripts/conversation-size-probe/snapshots/v261-prod-ongoing-limit20.json`.

### 2. Capture v2.7.0 dengan filter yang sama
```bash
npm run convo:size:probe -- \
  --env dev \
  --login-type cekerayam01 \
  --query "status=ongoing&limit=20&page=1" \
  --hit-count \
  --repeat 5 \
  --label v270-dev-ongoing-limit20
```

### 3. Diff dua snapshot
```bash
npm run convo:size:probe:diff -- \
  scripts/conversation-size-probe/snapshots/v261-prod-ongoing-limit20.json \
  scripts/conversation-size-probe/snapshots/v270-dev-ongoing-limit20.json
```

Output kira-kira:
```
bytes mean                    14.2 KiB ->     22.7 KiB   (+8.5 KiB, +60%)
bytes p95                     16.1 KiB ->     27.0 KiB   (+10.9 KiB, +68%)
ttfb mean ms                       430 ->          760   (+330, +77%)
items                               20 ->           20   (0, 0%)
per-item mean                      711 ->         1163   (+452, +63%)

Field census (% of items where field appears):
  unreadMentionCount                  0%  ->    85%
  latestMessage.mentions[]            0%  ->    34%
  memberContactInfo[].lid             0%  ->    25%
```

## Auth options

Salah satu dari ini:

- `--auth-bearer-token <token>` (paling aman buat prod)
- `--identifier <login> --password <pass>` (jangan masukkan password ke shell history kalau prod)
- `--login-type <name>` pakai mapping di `playwright/support/config/test-data.js`
- fallback: `config.getDefaultAccount()` untuk env yang dipilih

Untuk run **prod**, sangat disarankan pakai `--auth-bearer-token` dari session login manual.

## Catatan penting

- script ini **tidak** publish ke queue, tidak mutate apapun
- query default `status=ongoing&limit=20&page=1` — sesuaikan dengan filter yang user kamu pakai saat lihat slowdown
- kalau tenant beda antara 2.6.1 vs 2.7.0, bandinganmu tidak fair. Idealnya capture di tenant yang sama
- `--include-body` opsional kalau mau simpan raw response juga (off by default supaya snapshot kecil)
- untuk reproduksi pending storm, gunakan ini bersama `scripts/inbound-rmq-flood/` (capture before/after flood)
