# Scaling QA Automation
## for Multi-Channel SaaS Platform

50+ Automated E2E Suites
Dual Framework Strategy
CI/CD Integrated Testing
Cross-Browser Validation
Load + Socket Testing
Hourly Regression Execution

---

# Customer Communication Platform

Managing multi-channel conversations in a single workspace

**Channels**
WhatsApp · Instagram · Telegram · Email · Widget Chat · Facebook Messenger

**Used for**
Customer support · Broadcast campaigns
Ticketing workflows · Team collaboration

**Scale**
200+ API endpoints · 5 deployment environments
35+ E2E test specs · 3 browser targets

---

# QA Challenges

| Problem | Impact |
|---|---|
| Flaky CSS/XPath selectors | False positives, maintenance burden |
| Duplicate test data | MongoDB unique key errors |
| Email verification dependency | Blocked registration flows |
| Single-browser coverage | Missed cross-browser bugs |
| Slow regression suites | Delayed releases |
| Environment drift | Tests pass locally, fail in CI |

---

# Why Dual Framework?

**Cypress — Mature & battle-tested**
35+ spec files · 16 custom command modules
17 page objects · GitHub Actions + GitLab CI
Hourly scheduled runs with email reports

**Playwright — Modern & scalable**
17 spec files (growing) · Multi-browser (3)
Parallel execution · data-cy selectors
Mail.tm automation · Built-in network interception

**Strategy:** Incremental migration, zero downtime

---

# Repository Architecture

| Layer | Purpose | Key Details |
|---|---|---|
| Playwright | Modern E2E suite | 17 specs, 3 browsers, data-cy selectors |
| Cypress | Legacy regression suite | 35+ specs, 16 commands, hourly CI |
| k6 | Load & stress testing | Socket.IO + QR flow + multi-channel |
| CI/CD | Automation pipeline | 5 GitHub Actions + GitLab CI |
| Scripts | Utilities | Proxy check, QR health, report distribution |
| Config | Centralized environment | 5 envs, 200+ endpoints, 20+ accounts |

Folder tree detail available in repo documentation.

---

# CI/CD Pipeline

```
Developer Push
       │
       ▼
  Automated Validation (Cypress + Playwright)
       │
       ▼
  Cross-Browser Regression (Chromium, Firefox, WebKit)
       │
       ▼
  HTML Reports + JSON Artifacts + Video on Failure
       │
       ▼
  Faster Release Confidence
  Hourly Regression Signal
  Email Distribution to Team
```

5 GitHub Actions workflows · GitLab CI · On-push + Scheduled + Hourly

---

# Cypress Architecture

**Test Categories**
- Regression — 10 numbered specs
- V2 Auth + Conversation — 6 specs
- API (Channel, Platform) — 4 specs
- OPEN API + Ticketing

**Support Layer**
- 16 custom commands (auth, socket, inbox, filter, team)
- 17 page objects
- 5 data generators (AWB, random, name/phone)

---

# Playwright Architecture

**Test Categories**
- Auth — 31 tests (login, register, onboarding)
- Conversation — 6 specs (inbox, socket, endpoint, empty state)
- RBAC — 110 assertions (5 roles × 22 pages)
- Check All — Navigation across all pages
- Ticketing, Team

**Support Layer**
- 15 page objects (data-cy selectors)
- Config: 5 environments, 200+ endpoints, 20+ accounts
- Helpers: mail.tm, random generators

---

# Key Numbers

| Metric | Value |
|---|---|
| Cypress E2E specs | 35+ |
| Playwright E2E specs | 17 |
| Combined test coverage | 50+ |
| Browser targets | 3 (Chromium, Firefox, WebKit) |
| RBAC assertions per run | 110 |
| Page objects (total) | 32 |
| API endpoints mapped | 200+ |
| CI/CD pipelines | 5 GitHub Actions + GitLab CI |
| Regression frequency | Hourly |

---

# mail.tm Flow

**Problem:** Email verification blocks registration E2E testing

**Solution:** Free temp email API — no API keys, no setup

```
mail.tm Account Created
       ↓
Register on Satuinbox
       ↓
Poll Inbox (5 retries × 3s)
       ↓
Extract Verification Link from HTML
       ↓
Click Verify → Login → Onboard
       ↓
Graceful Skip if email not delivered
```

Built-in: 429 rate limit retry with exponential backoff
Fallback: Tests never falsely red — skip when email unavailable

---

# Engineering Problems Solved

| Problem | Solution | Impact |
|---|---|---|
| Flaky selectors | data-cy strategy | Less maintenance |
| Duplicate DB keys | Random generators (NIB, NPWP) | Zero collisions |
| Email dependency | mail.tm integration | Full auth E2E |
| Slow regression | Parallel Playwright (3 browsers) | Faster feedback |
| Env inconsistency | Config layer (5 envs) | Same tests everywhere |
| Cross-browser bugs | 3-browser matrix | Wider coverage |
| Legacy migration | Dual framework coexistence | Zero rewrite risk |

---

# Migration: Cypress → Playwright

| Improvement | Implementation | Outcome |
|---|---|---|
| Resilient selectors | data-cy → no XPath | Reduced flaky tests |
| Parallel execution | fullyParallel: true | Faster CI feedback |
| Auto-waiting | Built-in actionability | Less manual sync |
| Multi-browser | Chromium + Firefox + WebKit | Cross-browser confidence |
| Email automation | mail.tm helper | Fully automated onboarding |
| Config centralization | Environment layer | One change, all tests |

---

# Engineering Outcomes

**Before Playwright**
- Single-browser coverage
- XPath-related flaky failures
- Manual email verification
- Sequential test execution
- Environment-specific scripts

**After Playwright**
- 3-browser confidence
- Stable data-cy selectors
- End-to-end auth automation
- Parallel execution (3× workers)
- Centralized config per env

**Net result:** More reliable CI, faster feedback, easier maintenance

---

# Reliability Engineering

**CI/CD Resilience**
- Hourly execution catches regressions fast
- 2 retries on failure (CI), 0 locally
- Screenshots + video on failure
- HTML + JSON + console reporters

**Test Isolation**
- Each test generates unique data
- Randomization prevents collision
- Parallel-safe by design

**Maintenance**
- data-cy selectors survive CSS/JS refactors
- Config layer centralizes env changes
- Page objects encapsulate locators

---

# Migration Roadmap

| Phase | Scope | Status |
|---|---|---|
| 1 — Auth | Login, Register, Onboarding, mail.tm | ✅ Complete |
| 2 — Conversation | Inbox, Socket, Endpoint, Empty state | 🔄 In progress |
| 3 — Remaining | API, OPEN API, REGRESI (10 specs), Ticketing | 📋 Planned |
| 4 — Enhancement | Playwright CI, WS E2E, Visual regression, Benchmarks | 🔮 Next |

---

# Key Takeaways

**Engineering Mindset**
- data-cy selectors → resilient, maintainable tests
- Random generators → no duplicate key errors
- mail.tm → full auth flow without real email
- Graceful skip → dependency failure ≠ test failure

**Architecture Decisions**
- Dual framework → migrate incrementally, no rewrite
- Config layer → same tests, any environment
- Parallel execution → faster feedback, 3× coverage
- Environment-driven → consistency across dev/staging/prod

---

# Questions?

**Key Topics**
- Playwright migration
- CI/CD strategy
- E2E reliability patterns
- mail.tm integration
- Multi-browser testing
- RBAC data-driven validation

**Repository:** sixV2Automation
**Stack:** Playwright · Cypress · k6 · GitHub Actions · GitLab CI
