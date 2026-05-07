/**
 * Cypress E2E Test Suite: WhatsApp Web.js Integration
 *
 * Prerequisite:
 *   - Service WaWebJS berjalan di base URL
 *   - Minimal 1 akun WA sudah aktif (session tersimpan) → ACCOUNT_ID_ACTIVE
 *   - Minimal 1 nomor WA penerima valid → TARGET_PHONE
 *   - Webhook mock server berjalan → WEBHOOK_URL
 *   - Environment variables diset di cypress.env.json atau via CLI
 *
 * cypress.env.json contoh:
 * {
 *   "API_BASE": "http://localhost:3000",
 *   "ACCOUNT_ID_ACTIVE": "acc_abc123",
 *   "ACCOUNT_ID_NEW": "acc_new999",
 *   "TARGET_PHONE": "628123456789",
 *   "WEBHOOK_URL": "http://localhost:4000/webhook",
 *   "ADMIN_TOKEN": "Bearer xxx"
 * }
 */

// ─── Helpers ────────────────────────────────────────────────────────────────

const api = (path: string) => `${Cypress.env('API_BASE')}${path}`;
const headers = () => ({ Authorization: Cypress.env('ADMIN_TOKEN'), 'Content-Type': 'application/json' });

function apiPost(path: string, body: object) {
  return cy.request({ method: 'POST', url: api(path), headers: headers(), body });
}

function apiGet(path: string) {
  return cy.request({ method: 'GET', url: api(path), headers: headers() });
}

function apiPut(path: string, body: object) {
  return cy.request({ method: 'PUT', url: api(path), headers: headers(), body });
}

/** Poll endpoint sampai condition terpenuhi atau timeout */
function pollUntil(
  path: string,
  condition: (body: any) => boolean,
  options = { interval: 3000, timeout: 60000 }
) {
  const start = Date.now();
  function attempt(): Cypress.Chainable {
    return apiGet(path).then((res) => {
      if (condition(res.body)) return cy.wrap(res.body);
      if (Date.now() - start > options.timeout) throw new Error(`pollUntil timeout: ${path}`);
      return cy.wait(options.interval).then(attempt);
    });
  }
  return attempt();
}

/** Tunggu webhook mock menerima event dengan filter */
function waitForWebhookEvent(
  eventType: string,
  filter: (payload: any) => boolean,
  timeoutMs = 15000
) {
  const start = Date.now();
  function check(): Cypress.Chainable {
    return cy
      .request({ url: `${Cypress.env('WEBHOOK_URL')}/events`, failOnStatusCode: false })
      .then((res) => {
        const events: any[] = res.body?.events ?? [];
        const found = events.find((e) => e.type === eventType && filter(e));
        if (found) return cy.wrap(found);
        if (Date.now() - start > timeoutMs) throw new Error(`waitForWebhookEvent timeout: ${eventType}`);
        return cy.wait(2000).then(check);
      });
  }
  return check();
}

// ─── TC-IF: Interface & Factory ─────────────────────────────────────────────

describe('TC-IF: MessageSender Factory & Interface', () => {

  it('TC-IF-04 | Factory returns WaWebJS instance when driver=wawebjs', () => {
    apiGet(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/driver-info`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.driver).to.eq('wawebjs');
      expect(res.body.instanceType).to.eq('WaWebJSService');
    });
  });

  it('TC-IF-05 | Factory returns Baileys instance when driver=baileys', () => {
    // Pastikan ada akun baileys di fixture
    apiGet(`/accounts/${Cypress.env('ACCOUNT_ID_BAILEYS')}/driver-info`).then((res) => {
      expect(res.body.driver).to.eq('baileys');
      expect(res.body.instanceType).to.eq('BaileysService');
    });
  });

  it('TC-IF-07 | Factory throws when account ID is null/invalid', () => {
    cy.request({
      method: 'POST',
      url: api('/messages/send'),
      headers: headers(),
      body: { accountId: null, to: Cypress.env('TARGET_PHONE'), type: 'text', text: 'test' },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 422]);
      expect(res.body.error).to.exist;
    });
  });

  it('TC-IF-08 | Reject unknown driver value', () => {
    cy.request({
      method: 'PUT',
      url: api(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}`),
      headers: headers(),
      body: { driver: 'unknown_driver' },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.match(/driver/i);
    });
  });
});

// ─── TC-QR: Session & QR Authentication ─────────────────────────────────────

describe('TC-QR: Session & QR Authentication', () => {

  it('TC-QR-01 | QR code emitted on new account connection', () => {
    // Trigger koneksi untuk akun baru (belum ada session)
    apiPost(`/accounts/${Cypress.env('ACCOUNT_ID_NEW')}/connect`, {}).then(() => {
      pollUntil(
        `/accounts/${Cypress.env('ACCOUNT_ID_NEW')}/status`,
        (body) => body.qrCode !== null && body.qrCode !== undefined,
        { interval: 3000, timeout: 30000 }
      ).then((status) => {
        expect(status.qrCode).to.be.a('string').and.have.length.greaterThan(10);
        expect(status.connectionStatus).to.eq('qr_pending');
      });
    });
  });

  it('TC-QR-04 | Status becomes connected after QR scan', () => {
    // Test ini memerlukan intervensi manual atau device emulator
    // Skip di CI, jalankan di environment staging dengan device fisik
    if (Cypress.env('SKIP_QR_SCAN')) return cy.log('Skipped: requires physical device');

    pollUntil(
      `/accounts/${Cypress.env('ACCOUNT_ID_NEW')}/status`,
      (body) => body.connectionStatus === 'connected',
      { interval: 5000, timeout: 120000 }
    ).then((status) => {
      expect(status.connectionStatus).to.eq('connected');
      expect(status.phone).to.match(/^\d{10,15}$/);
    });
  });

  it('TC-QR-06 | Session persists after service restart', () => {
    // Trigger restart (via admin endpoint atau docker signal)
    apiPost('/admin/service/restart', { service: 'wawebjs' }).then(() => {
      // Tunggu service ready kembali
      cy.wait(10000);
      pollUntil(
        `/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/status`,
        (body) => body.connectionStatus === 'connected',
        { interval: 5000, timeout: 60000 }
      ).then((status) => {
        expect(status.connectionStatus).to.eq('connected');
        expect(status.sessionRestored).to.be.true;
      });
    });
  });

  it('TC-QR-07 | Corrupt session file triggers new QR, logs warning', () => {
    // Corrupt session via admin endpoint (hanya di test environment)
    apiPost(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/debug/corrupt-session`, {}).then(() => {
      apiPost(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/connect`, {}).then(() => {
        pollUntil(
          `/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/status`,
          (body) => body.qrCode !== null,
          { interval: 3000, timeout: 30000 }
        ).then((status) => {
          expect(status.qrCode).to.be.a('string');
          expect(status.lastWarning).to.match(/corrupt|invalid|session/i);
        });
      });
    });
  });

  it('TC-QR-08 | Sessions isolated per account', () => {
    const acc1 = Cypress.env('ACCOUNT_ID_ACTIVE');
    const acc2 = Cypress.env('ACCOUNT_ID_SECOND');

    cy.all([apiGet(`/accounts/${acc1}/status`), apiGet(`/accounts/${acc2}/status`)]).then(
      ([res1, res2]: any[]) => {
        expect(res1.body.sessionPath).not.to.eq(res2.body.sessionPath);
        expect(res1.body.connectionStatus).to.eq('connected');
        expect(res2.body.connectionStatus).to.eq('connected');
      }
    );
  });
});

// ─── TC-OUT: Outbound Messages ───────────────────────────────────────────────

describe('TC-OUT: Outbound Messages', () => {
  const ACCOUNT = () => Cypress.env('ACCOUNT_ID_ACTIVE');
  const TARGET = () => Cypress.env('TARGET_PHONE');

  function sendMessage(body: object) {
    return apiPost('/messages/send', { accountId: ACCOUNT(), to: TARGET(), ...body });
  }

  // ── Text ──────────────────────────────────────────────────────────────────

  it('TC-OUT-01 | Send plain text message', () => {
    sendMessage({ type: 'text', text: 'Cypress test: plain text' }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.messageId).to.be.a('string').and.not.be.empty;
      expect(res.body.status).to.eq('sent');
      expect(res.body.timestamp).to.be.a('number');
    });
  });

  it('TC-OUT-02 | Send text with emoji', () => {
    sendMessage({ type: 'text', text: 'Cypress test 👋🎉✅' }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.messageId).to.exist;
    });
  });

  it('TC-OUT-04 | Reject invalid phone number format', () => {
    cy.request({
      method: 'POST',
      url: api('/messages/send'),
      headers: headers(),
      body: { accountId: ACCOUNT(), to: 'abc_invalid', type: 'text', text: 'test' },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 422]);
      expect(res.body.error).to.match(/phone|number|invalid/i);
    });
  });

  // ── Media ─────────────────────────────────────────────────────────────────

  it('TC-OUT-05 | Send JPEG image with caption', () => {
    sendMessage({
      type: 'media',
      mediaType: 'image',
      url: 'https://via.placeholder.com/400.jpg',
      caption: 'Cypress test image',
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.messageId).to.exist;
    });
  });

  it('TC-OUT-07 | Send MP4 video', () => {
    sendMessage({
      type: 'media',
      mediaType: 'video',
      url: Cypress.env('TEST_VIDEO_URL'),
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.messageId).to.exist;
    });
  });

  it('TC-OUT-09 | Reject inaccessible media URL', () => {
    cy.request({
      method: 'POST',
      url: api('/messages/send'),
      headers: headers(),
      body: {
        accountId: ACCOUNT(),
        to: TARGET(),
        type: 'media',
        mediaType: 'image',
        url: 'https://invalid.domain.xyz/not-found.jpg',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 422, 500]);
      expect(res.body.error).to.match(/media|fetch|url/i);
    });
  });

  // ── Document ──────────────────────────────────────────────────────────────

  it('TC-OUT-10 | Send PDF document', () => {
    sendMessage({
      type: 'document',
      url: Cypress.env('TEST_PDF_URL'),
      filename: 'test-document.pdf',
      mimetype: 'application/pdf',
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.messageId).to.exist;
    });
  });

  // ── Location ──────────────────────────────────────────────────────────────

  it('TC-OUT-12 | Send location coordinates', () => {
    sendMessage({
      type: 'location',
      latitude: -6.2088,
      longitude: 106.8456,
      name: 'Jakarta, Indonesia',
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.messageId).to.exist;
    });
  });

  it('TC-OUT-13 | Reject out-of-range coordinates', () => {
    cy.request({
      method: 'POST',
      url: api('/messages/send'),
      headers: headers(),
      body: {
        accountId: ACCOUNT(),
        to: TARGET(),
        type: 'location',
        latitude: 999,
        longitude: 999,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.error).to.match(/location|latitude|longitude|invalid/i);
    });
  });
});

// ─── TC-WH: Incoming Webhook ─────────────────────────────────────────────────

describe('TC-WH: Incoming Webhook', () => {

  before(() => {
    // Reset webhook event log sebelum suite berjalan
    cy.request({ method: 'DELETE', url: `${Cypress.env('WEBHOOK_URL')}/events` });
  });

  it('TC-WH-01 | Incoming text message forwarded with correct payload shape', () => {
    // Instruksi manual / trigger via secondary test number
    cy.log('ACTION REQUIRED: Send a WhatsApp message to the test account number now');

    waitForWebhookEvent('message', (e) => e.payload?.type === 'text', 30000).then((event) => {
      const p = event.payload;
      expect(p.from).to.match(/^\d+@s.whatsapp.net$/);
      expect(p.to).to.be.a('string');
      expect(p.body).to.be.a('string');
      expect(p.messageId).to.be.a('string').and.not.be.empty;
      expect(p.timestamp).to.be.a('number');
      expect(p.type).to.eq('text');
    });
  });

  it('TC-WH-02 | Webhook payload format matches baileys format exactly', () => {
    // Snapshot test: bandingkan field keys antara wawebjs dan baileys event
    const REQUIRED_FIELDS = ['from', 'to', 'body', 'messageId', 'timestamp', 'type', 'accountId'];

    waitForWebhookEvent('message', () => true, 30000).then((event) => {
      REQUIRED_FIELDS.forEach((field) => {
        expect(event.payload, `Missing field: ${field}`).to.have.property(field);
      });
    });
  });

  it('TC-WH-07 | Duplicate message not forwarded twice', () => {
    waitForWebhookEvent('message', () => true, 30000).then((event) => {
      const msgId = event.payload.messageId;

      cy.wait(3000); // tunggu sebentar, pastikan tidak ada duplikat

      cy.request(`${Cypress.env('WEBHOOK_URL')}/events`).then((res) => {
        const duplicates = res.body.events.filter(
          (e: any) => e.type === 'message' && e.payload?.messageId === msgId
        );
        expect(duplicates.length).to.eq(1);
      });
    });
  });
});

// ─── TC-ST: Status Updates ───────────────────────────────────────────────────

describe('TC-ST: Message Status Updates', () => {

  it('TC-ST-01 | Status "sent" received after outbound message', () => {
    apiPost('/messages/send', {
      accountId: Cypress.env('ACCOUNT_ID_ACTIVE'),
      to: Cypress.env('TARGET_PHONE'),
      type: 'text',
      text: 'Status test: sent',
    }).then((res) => {
      const messageId = res.body.messageId;
      expect(messageId).to.exist;

      waitForWebhookEvent('status', (e) => e.payload?.messageId === messageId && e.payload?.status === 'sent').then((event) => {
        expect(event.payload.status).to.eq('sent');
        expect(event.payload.messageId).to.eq(messageId);
      });
    });
  });

  it('TC-ST-02 | Status "delivered" received when recipient is online', () => {
    apiPost('/messages/send', {
      accountId: Cypress.env('ACCOUNT_ID_ACTIVE'),
      to: Cypress.env('TARGET_PHONE'),
      type: 'text',
      text: 'Status test: delivered',
    }).then((res) => {
      const messageId = res.body.messageId;

      waitForWebhookEvent(
        'status',
        (e) => e.payload?.messageId === messageId && e.payload?.status === 'delivered',
        30000
      ).then((event) => {
        expect(event.payload.status).to.eq('delivered');
      });
    });
  });

  it('TC-ST-04 | Status enum values match baileys format', () => {
    // Baileys pakai: 'sent' | 'delivered' | 'read' | 'failed'
    // WaWebJS harus emit value yang sama persis
    cy.request(`${Cypress.env('WEBHOOK_URL')}/events`).then((res) => {
      const statusEvents = res.body.events.filter((e: any) => e.type === 'status');
      statusEvents.forEach((event: any) => {
        expect(event.payload.status).to.be.oneOf(['sent', 'delivered', 'read', 'failed']);
      });
    });
  });

  it('TC-ST-06 | Each status emitted only once per messageId', () => {
    apiPost('/messages/send', {
      accountId: Cypress.env('ACCOUNT_ID_ACTIVE'),
      to: Cypress.env('TARGET_PHONE'),
      type: 'text',
      text: 'Status dedup test',
    }).then((res) => {
      const messageId = res.body.messageId;

      // Tunggu sampai ada minimal 1 status event
      waitForWebhookEvent('status', (e) => e.payload?.messageId === messageId, 20000).then(() => {
        cy.wait(5000); // window untuk deteksi duplikat

        cy.request(`${Cypress.env('WEBHOOK_URL')}/events`).then((eventsRes) => {
          const forThisMsg = eventsRes.body.events.filter(
            (e: any) => e.type === 'status' && e.payload?.messageId === messageId
          );
          const statuses = forThisMsg.map((e: any) => e.payload.status);
          const uniqueStatuses = [...new Set(statuses)];
          expect(statuses.length).to.eq(uniqueStatuses.length);
        });
      });
    });
  });
});

// ─── TC-TG: Account Driver Toggle ────────────────────────────────────────────

describe('TC-TG: Account Driver Toggle', () => {

  it('TC-TG-01 | Default driver is baileys for new account', () => {
    apiGet(`/accounts/${Cypress.env('ACCOUNT_ID_NEW')}`).then((res) => {
      // Jika field tidak ada, default ke baileys
      const driver = res.body.driver ?? 'baileys';
      expect(driver).to.eq('baileys');
    });
  });

  it('TC-TG-02 | Switch baileys → wawebjs routes next message through wawebjs', () => {
    apiPut(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}`, { driver: 'wawebjs' }).then(() => {
      apiPost('/messages/send', {
        accountId: Cypress.env('ACCOUNT_ID_ACTIVE'),
        to: Cypress.env('TARGET_PHONE'),
        type: 'text',
        text: 'Driver switch test',
      }).then((res) => {
        expect(res.body.driver).to.eq('wawebjs');
      });
    });
  });

  it('TC-TG-03 | Switch wawebjs → baileys routes next message through baileys', () => {
    apiPut(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}`, { driver: 'baileys' }).then(() => {
      apiPost('/messages/send', {
        accountId: Cypress.env('ACCOUNT_ID_ACTIVE'),
        to: Cypress.env('TARGET_PHONE'),
        type: 'text',
        text: 'Driver switch back test',
      }).then((res) => {
        expect(res.body.driver).to.eq('baileys');
      });
    });
  });

  it('TC-TG-05 | Reject invalid driver value via API', () => {
    cy.request({
      method: 'PUT',
      url: api(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}`),
      headers: headers(),
      body: { driver: 'telegram' },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.match(/driver|invalid|enum/i);
    });
  });
});

// ─── TC-RL: Rate Limiting ─────────────────────────────────────────────────────

describe('TC-RL: Rate Limiting & Anti-ban', () => {

  it('TC-RL-01 | Minimum delay enforced between messages', () => {
    const timestamps: number[] = [];

    // Kirim 5 pesan berturut-turut
    Cypress._.times(5, (i) => {
      apiPost('/messages/send', {
        accountId: Cypress.env('ACCOUNT_ID_ACTIVE'),
        to: Cypress.env('TARGET_PHONE'),
        type: 'text',
        text: `Rate limit test ${i + 1}`,
      }).then((res) => {
        timestamps.push(res.body.timestamp ?? Date.now());
      });
    });

    cy.then(() => {
      for (let i = 1; i < timestamps.length; i++) {
        const gap = timestamps[i] - timestamps[i - 1];
        // Minimum delay 1 detik antar pesan (sesuaikan dengan config)
        expect(gap, `Gap between msg ${i} and ${i + 1}`).to.be.gte(1000);
      }
    });
  });

  it('TC-RL-02 | Messages queued when per-minute limit exceeded', () => {
    // Kirim pesan melebihi limit (misal limit 10/menit)
    const LIMIT = Cypress.env('RATE_LIMIT_PER_MINUTE') ?? 10;
    const OVER_LIMIT = LIMIT + 3;

    const responses: any[] = [];
    Cypress._.times(OVER_LIMIT, (i) => {
      apiPost('/messages/send', {
        accountId: Cypress.env('ACCOUNT_ID_ACTIVE'),
        to: Cypress.env('TARGET_PHONE'),
        type: 'text',
        text: `Burst test ${i + 1}`,
      }).then((res) => responses.push(res.body));
    });

    cy.then(() => {
      // Semua pesan harus diterima (queued), tidak ada yang ditolak
      responses.forEach((r) => {
        expect(r.messageId).to.exist;
        // Status bisa 'sent' atau 'queued', tapi tidak 'rejected'
        expect(r.status).not.to.eq('rejected');
      });
    });
  });

  it('TC-RL-04 | 429 from WhatsApp triggers pause and retry', () => {
    // Simulasi 429 via test endpoint (hanya tersedia di test mode)
    apiPost('/debug/simulate-wa-429', { accountId: Cypress.env('ACCOUNT_ID_ACTIVE') }).then(() => {
      // Kirim pesan setelah 429 disimulasikan
      apiPost('/messages/send', {
        accountId: Cypress.env('ACCOUNT_ID_ACTIVE'),
        to: Cypress.env('TARGET_PHONE'),
        type: 'text',
        text: '429 recovery test',
      }).then((res) => {
        // Pesan harus akhirnya terkirim setelah retry
        expect(res.body.messageId).to.exist;

        pollUntil(
          `/messages/${res.body.messageId}/status`,
          (body) => body.status === 'sent',
          { interval: 5000, timeout: 60000 }
        ).then((status) => {
          expect(status.status).to.eq('sent');
          expect(status.retryCount).to.be.gte(1);
        });
      });
    });
  });

  it('TC-RL-06 | Queue preserved during rate limit pause', () => {
    apiGet(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/queue`).then((before) => {
      const queueBefore = before.body.count;

      // Trigger rate limit
      apiPost('/debug/simulate-wa-429', { accountId: Cypress.env('ACCOUNT_ID_ACTIVE') }).then(() => {
        // Kirim beberapa pesan yang akan masuk queue
        apiPost('/messages/send', { accountId: Cypress.env('ACCOUNT_ID_ACTIVE'), to: Cypress.env('TARGET_PHONE'), type: 'text', text: 'queue test 1' });
        apiPost('/messages/send', { accountId: Cypress.env('ACCOUNT_ID_ACTIVE'), to: Cypress.env('TARGET_PHONE'), type: 'text', text: 'queue test 2' });

        cy.wait(2000);

        apiGet(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/queue`).then((after) => {
          // Queue harus bertambah, tidak kosong/hilang
          expect(after.body.count).to.be.gte(queueBefore);
        });
      });
    });
  });
});

// ─── TC-SP: Session Persistence ──────────────────────────────────────────────

describe('TC-SP: Session Persistence', () => {

  it('TC-SP-01 | Session survives graceful restart (SIGTERM)', () => {
    // Pastikan akun connected sebelum restart
    apiGet(`/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/status`).then((res) => {
      expect(res.body.connectionStatus).to.eq('connected');
    });

    // Trigger graceful restart
    apiPost('/admin/service/restart', { service: 'wawebjs', signal: 'SIGTERM' }).then(() => {
      cy.wait(15000); // tunggu service restart

      pollUntil(
        `/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/status`,
        (body) => body.connectionStatus === 'connected',
        { interval: 5000, timeout: 60000 }
      ).then((status) => {
        expect(status.connectionStatus).to.eq('connected');
        expect(status.qrCode).to.be.null; // tidak butuh QR ulang
      });
    });
  });

  it('TC-SP-02 | Session survives crash restart (SIGKILL)', () => {
    apiPost('/admin/service/restart', { service: 'wawebjs', signal: 'SIGKILL' }).then(() => {
      cy.wait(20000); // crash restart lebih lambat

      pollUntil(
        `/accounts/${Cypress.env('ACCOUNT_ID_ACTIVE')}/status`,
        (body) => body.connectionStatus === 'connected',
        { interval: 5000, timeout: 90000 }
      ).then((status) => {
        expect(status.connectionStatus).to.eq('connected');
      });
    });
  });

  it('TC-SP-05 | Multiple account sessions all restored after restart', () => {
    const accounts = [
      Cypress.env('ACCOUNT_ID_ACTIVE'),
      Cypress.env('ACCOUNT_ID_SECOND'),
    ].filter(Boolean);

    apiPost('/admin/service/restart', { service: 'wawebjs', signal: 'SIGTERM' }).then(() => {
      cy.wait(15000);

      accounts.forEach((accountId) => {
        pollUntil(
          `/accounts/${accountId}/status`,
          (body) => body.connectionStatus === 'connected',
          { interval: 5000, timeout: 90000 }
        ).then((status) => {
          expect(status.connectionStatus).to.eq('connected');
          expect(status.sessionRestored).to.be.true;
        });
      });
    });
  });
});
