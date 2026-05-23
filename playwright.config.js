const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

const ENV = process.env.ENV || 'dev';

const environments = {
  local: {
    baseURL: 'http://localhost:3002',
    apiBase: 'https://dev-v2-api.satuinbox.com/',
  },
  dev: {
    baseURL: 'https://dev-v2.satuinbox.com',
    apiBase: 'https://dev-v2-api.satuinbox.com/',
  },
  staging: {
    baseURL: 'https://staging.satuinbox.com',
    apiBase: 'https://staging.satuinbox.com/api/v1',
  },
  prod: {
    baseURL: 'https://v2.satuinbox.com',
    apiBase: 'https://v2-api.satuinbox.com/',
  },
};

const currentEnv = environments[ENV] || environments.dev;

module.exports = defineConfig({
  testDir: './playwright/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright/reports/html' }],
    ['json', { outputFile: 'playwright/reports/results.json' }],
  ],
  outputDir: 'playwright/test-results',

  timeout: 180000,

  use: {
    baseURL: currentEnv.baseURL,
    testIdAttribute: 'data-cy',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 60000,
    viewport: { width: 1280, height: 768 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: undefined,
});
