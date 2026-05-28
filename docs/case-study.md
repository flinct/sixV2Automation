# Case Study: Omnichannel QA Automation

## Context

Automation suite untuk platform SaaS yang mengelola percakapan customer dari WhatsApp, Instagram, Telegram, Email, Widget Chat, dan Facebook Messenger.

## Problem

- Regression manual lambat untuk flow auth, inbox, ticketing, dan RBAC.
- Selector lama rawan flaky karena bergantung pada CSS dan XPath.
- Banyak environment membuat credential dan endpoint sulit dijaga konsisten.
- Realtime chat dan Socket.IO butuh validasi di luar UI biasa.

## Solution

- Membuat Playwright suite berbasis Page Object Model.
- Memusatkan config environment, account, endpoint, dan test data.
- Menambahkan helper generator agar data unik di setiap run.
- Mempertahankan Cypress legacy suite sambil melakukan migrasi bertahap.
- Menambahkan k6 dan Node.js socket scripts untuk load testing dan health check.

## Results

- 181 active Playwright tests untuk critical journeys.
- 3 browser targets: Chromium, Firefox, WebKit.
- RBAC coverage untuk admin, supervisor, dan agent.
- HTML dan JSON report siap dipakai di CI.
- Secret dan endpoint asli dipisahkan dari source code untuk portfolio/public review.
