# QA Automation Portfolio - Omnichannel SaaS

Portfolio project untuk automation testing platform customer communication multi-channel. Nama produk, endpoint, credential, dan data pelanggan sudah dianonimkan agar aman dipublikasikan.

## Highlights

| Area | Detail |
|---|---|
| Framework | Playwright, Cypress, k6 |
| Coverage | Auth, onboarding, inbox conversation, ticketing, RBAC, socket, navigation smoke |
| Architecture | Page Object Model, centralized config, reusable helpers, generated test data |
| Browser Matrix | Chromium, Firefox, WebKit |
| Test Suite | 181 active Playwright tests plus legacy Cypress regression assets |
| Non-Functional | Socket.IO load testing, QR health check, proxy precheck, report automation |

## What This Shows

- Building maintainable E2E automation with Page Object Model.
- Migrating legacy Cypress coverage into a modern Playwright suite.
- Validating role-based access control across admin, supervisor, and agent flows.
- Testing real-time conversation behavior through WebSocket and Socket.IO flows.
- Separating secrets and environment-specific values from source code.
- Producing reports for CI and stakeholder review.

## Repository Map

```text
playwright/
  tests/e2e/              Playwright E2E specs
  support/pages/          Page objects and shared locators
  support/config/         Environment, account, endpoint config
  support/helpers/        Generators, temp email helper, utilities
cypress/                  Legacy regression suite and fixtures
k6/                       Load and stress test scripts
scripts/                  Socket load, QR health, report utilities
docs/                     Portfolio case study and test strategy
```

## Run Locally

1. Install dependencies.

```powershell
npm install
npm run pw:install
```

2. Configure local secrets.

```powershell
Copy-Item .env.example .env
```

3. Run Playwright.

```powershell
npm run pw:test:chrome
npm run pw:report
```

4. Run load test example.

```powershell
$env:BASE_URL="https://app.example.test"
$env:SIGNATURE_KEY="replace-with-ci-secret"
npm run widget:socket:load
```

## Documentation

- `docs/case-study.md` - portfolio story, problem, solution, and outcomes.
- `docs/test-strategy.md` - coverage model, selector strategy, and CI approach.
- `docs/security-and-sanitization.md` - what was redacted before publishing.
- `docs/loadTests.md` - load and health-check command reference.

## Security Note

This repo is intended for portfolio review. Use `.env.example` as a template and keep real credentials in local `.env` files or CI secret storage only.
