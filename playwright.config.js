const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

const ENV = process.env.ENV || 'dev';

function envValue(name, fallback) {
  return process.env[name] || fallback;
}

const environments = {
  local: {
    baseURL: envValue('LOCAL_BASE_URL', 'http://localhost:3002'),
    apiBase: envValue('LOCAL_API_BASE', 'http://localhost:3000/'),
  },
  dev: {
    baseURL: envValue('DEV_BASE_URL', envValue('E2E_BASE_URL', 'https://app.example.test')),
    apiBase: envValue('DEV_API_BASE', envValue('E2E_API_BASE', 'https://api.example.test/')),
  },
  staging: {
    baseURL: envValue('STAGING_BASE_URL', 'https://staging.example.test'),
    apiBase: envValue('STAGING_API_BASE', 'https://staging-api.example.test/'),
  },
  prod: {
    baseURL: envValue('PROD_BASE_URL', 'https://app.example.test'),
    apiBase: envValue('PROD_API_BASE', 'https://api.example.test/'),
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
