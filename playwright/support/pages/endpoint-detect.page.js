const fs = require('fs/promises');
const path = require('path');

class EndpointDetectPage {
  constructor(page) {
    this.page = page;
    this.entries = [];
    this.maxEntries = 2000;
  }

  nowIso() {
    return new Date().toISOString();
  }

  async start(opts = {}) {
    const { name = 'session', urlPattern = '**/api/**', methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] } = opts;
    this.name = name;
    this.startedAt = this.nowIso();
    this.entries = [];

    await this.page.route(urlPattern, async (route) => {
      const requestMethod = route.request().method();
      if (!methods.includes(requestMethod)) {
        await route.continue();
        return;
      }

      const startedAt = Date.now();
      const response = await route.fetch();
      if (this.entries.length < this.maxEntries) {
        this.entries.push({
          ts: this.nowIso(),
          name: this.name,
          method: requestMethod,
          url: route.request().url(),
          statusCode: response.status(),
          durationMs: Date.now() - startedAt,
        });
      }
      await route.fulfill({ response });
    });
  }

  async save(fileBaseName = 'endpoints') {
    const safeTime = this.startedAt.replace(/[:.]/g, '-');
    const fileName = `playwright/logs/${fileBaseName}_${safeTime}.json`;

    const payload = {
      name: this.name,
      startedAt: this.startedAt,
      baseUrl: this.page.url().split('/')[2],
      spec: this.page.url(),
      entries: this.entries,
    };

    const fullPath = path.resolve(fileName);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, JSON.stringify(payload, null, 2));

    console.log(`✅ Endpoint detection saved: ${fileName} (count=${this.entries.length})`);
  }
}

module.exports = { EndpointDetectPage };
