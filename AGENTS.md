# AGENTS.md - Master Index + Agent Instructions

> **Policy:** This file is both an index AND a set of binding instructions for AI agents writing automation scripts. Read this file FIRST before any automation task. Update this file every time scripts change or new tests added.

---

## Agent Instructions

### 1. Pre-Work Checklist
Before writing ANY automation code, you MUST:
1. **Read this file fully** (AGENTS.md) to understand conventions, available pages, config, and test patterns.
2. **Check `memory/` folder** — read `memory/rbac-memory.md` for RBAC rules if the task involves roles/permissions/feature access.
3. **Scan existing page objects** in `playwright/support/pages/` to see what locators and methods already exist. NEVER duplicate selectors.
4. **Check `playwright/support/pages/index.js`** to see all exported classes and the `CHANNELS` constant.
5. **Check `playwright/support/config/`** for available accounts, endpoints, environments.

### 2. Test File Conventions
- **Location:** `playwright/tests/e2e/<category>/<feature>.spec.js`
- **Imports (always use require):**
  ```javascript
  const { test, expect } = require('@playwright/test');
  const { AuthPage, InboxPage } = require('../../../support/pages');  // or other pages
  const { getCurrentConfig } = require('../../../support/config');
  const { randomAsk } = require('../../../support/helpers/generators');  // if needed
  ```
- **Structure (mandatory):**
  ```javascript
  test.describe('Feature Name', () => {
    let authPage, inboxPage, config;  // declare all vars
    test.beforeAll(async () => { config = getCurrentConfig(); });
    test.beforeEach(async ({ page }) => {
      authPage = new AuthPage(page);
      inboxPage = new InboxPage(page);   // instantiate only pages you need
      const credentials = config.getDefaultAccount();
      await authPage.loginWithCredentials(credentials, { useV2: true });
    });
    test('should ...', async ({ page }) => { ... });
  });
  ```
- **Naming:** `test('should do something', ...)` — descriptive sentence case.
- **Skipping:** Use `test.skip(condition, 'reason')` for conditional skip. For stubs, do not call `test.fixme('title', 'reason')` inside a `describe` because Playwright treats it as a suite modifier; use `test.fixme('title - reason', async () => {})` or a local helper that declares an individual fixme test.
- **Assertions:** Always use `@playwright/test` `expect` (jest-like). Prefer `await expect(locator).toBeVisible()`, `toHaveText()`, `toHaveURL()`, `toContainText()` over manual checks.
- **Timeouts:** Default actionTimeout 30s (from config). Only add explicit `.waitFor({ timeout: ... })` when you need to extend beyond default.

### 3. Page Object Conventions
- **Location:** `playwright/support/pages/<feature>.page.js`
- **Export pattern:**
  ```javascript
  class FeaturePage {
    constructor(page) {
      this.page = page;
      this.someButton = page.getByTestId('Some-Button');
      this.someField = page.locator('input[name="field"]');
    }
    async someAction() { ... }
  }
  module.exports = { FeaturePage };
  ```
- **Locator priority:** `getByTestId()` > `getByRole()` > `getByText()` > `locator()` with CSS selectors.
- **Locale-aware selectors:** Use regex with both ID and EN (e.g. `/Tutup|Close/i`, `/Kirim|Send/i`).
- **Register in index:** Add `const { FeaturePage } = require('./feature.page');` and `module.exports = { ..., FeaturePage }` to `playwright/support/pages/index.js`.
- **CHANNELS constant:** Defined in `pages/index.js`. Import with `const { CHANNELS } = require('../../../support/pages')`.

### 4. Config Usage
- **Environment:** Default is `dev`. Override with `ENV=prod npx playwright test`.
- **Accounts:** Use `config.getDefaultAccount()` for the admin test user. Use `config.getAccountByLoginType(key, envName)` for specific roles.
- **Available keys:** `chickentester01` (admin, default), `cekerayam01` (admin), `mataayam01` (supervisor), `leherayam01` (agent).
- **Login methods:**
  - `authPage.loginWithCredentials(credentials, { useV2: true })` — for beforeEach
  - `authPage.login(identifier, password, { useV2: true, expectSuccess: false })` — for negative tests
- **Endpoints:** Use `config.endpoints.someEndpoint` (see `endpoints.js` for all available routes).

### 5. When You Create New Files
AFTER creating a new test spec or page object, you MUST update this AGENTS.md:
- **New test file:** Add row to "Test Files (All)" table with filename, test count, and scope description.
- **New page object:** Add row to "Page Objects Index" table with filename, class name, and what it covers.
- **New helper/config:** Add entry under "Config" or "Key Helpers" table.
- **Keep test count accurate:** Update "Total: N active tests" line.

### 6. RBAC Awareness
When writing tests that involve feature access by different roles:
- Read `memory/rbac-memory.md` for the complete RBAC matrix.
- Key rules: agents see own contacts, supervisors see team, admins see all.
- Privacy: agents see masked PII, supervisor+ see full.
- Ticket views differ per role (agent: my tickets only; supervisor: team tickets; admin: all).
- Use `mataayam01` for supervisor tests, `leherayam01` for agent tests.

### 7. Scripts Reference
| Command | Description |
|---------|-------------|
| `npm run pw:test` | Playwright all tests |
| `npm run pw:test:chrome` | Chromium only |
| `npm run pw:report` | Show HTML report |
| `ENV=prod npx playwright test` | Run on prod |
| `LOGIN_TYPE=xxx npx playwright test` | Use specific account |
| `npm run inbound:rmq:flood -- --dry-run ...` | Preview RabbitMQ inbound flood envelopes without publishing (script lives under `scripts/inbound-rmq-flood/`) |
| `npm run inbound:rmq:flood -- ...` | Publish prod-like inbound burst to `message.inbound` / `group.message.inbound` queues, with env/company discovery and balancing options |
| `npm run convo:size:probe -- --env dev --login-type cekerayam01 --hit-count --label v270-dev` | Capture `/api/conversation` + `/api/conversation/count` timing, payload size, and v2.7.0 bloat-field census (script lives under `scripts/conversation-size-probe/`) |
| `npm run convo:size:probe:diff -- snapshots/v261.json snapshots/v270.json` | Diff two saved conversation size snapshots |
| `npm run storm:reproducer -- --env dev --subscribers-file scripts/storm-reproducer/subscribers/dev-bulk.txt` | Start socket-driven storm subscribers that mimic FE invalidation on conversation socket events |
| `npm run storm:hotpath:probe -- --env dev --login-type admintest --duration-sec 120 --interval-ms 1000` | Continuously probe the exact prod hotpath endpoints (`/conversation` variant-1 + `/conversation/count`) |
| `bash scripts/storm-reproducer/run-all.sh` | Orchestrate hotpath probe + storm subscribers + inbound flood from one command; supports `STORM_SUBSCRIBERS_FILE`, `FLOOD_COMPANY_IDS`, and `FLOOD_COMPANY_BALANCE` for full multi-company runs |

---

## Sources
- FE: private frontend monorepo reference redacted for portfolio publication
- BE: private backend monorepo reference redacted for portfolio publication
- Auto: this QA automation portfolio repo
- PRD/Test source of truth: `C:\Users\MyBook SAGA 12\Desktop\PRDanalisis\Test\conversation\Conversation.tsv`
- PRD/Test bridge rules: `C:\Users\MyBook SAGA 12\Desktop\PRDanalisis\Rules\automation-bridge-rule.md`

---

## Cross-Repo Sync Contract

When conversation test cases change in `PRDanalisis`:
1. Refresh the TSV/JSON source in `PRDanalisis/Test/conversation/`.
2. Regenerate automation-ready test data from those files.
3. Update generated Playwright specs in this repo.
4. If page objects or test conventions change, update this AGENTS.md and the bridge rule in `PRDanalisis`.

Do not treat the automation repo as the source of truth for test scope; it is the implementation target.

---

# PART 1: AUTOMATION REPO
## Structure
```
scripts/                - Node load/replay helpers; custom RCA harnesses live in dedicated subfolders (e.g. `scripts/inbound-rmq-flood/`)
playwright/
  tests/e2e/           - Test specs
    auth/              - login, register, onboarding
    conversation/      - inbox, chat-list, inbound-outbound, sla, agent, history
    check-all/         - cross-page nav smoke tests
    rbac/              - role validation
    socket/            - websocket tests
    ticket/            - ticketing
    team/              - team management
  support/
    pages/             - Page objects (15+ files)
      index.js         - Aggregator exports all pages
    config/            - env, endpoints, test-data, accounts
    helpers/           - generators, test-data-gen, mail-tm
  reports/             - HTML + JSON output
```

## Page Objects Index
| File | Class | Coverage |
|------|-------|----------|
| `auth.page.js` | AuthPage | Login, register, logout, onboarding |
| `inbox.page.js` | InboxPage | Canonical conversation page object: nav, channels, chat list/card locators, quick actions, room open, screenshot/modal, send msg, bubbles, SLA |
| `conversation-detail.page.js` | ConversationDetailPage | Detail panel, FRT/TTC/RLT labels |
| `conversation-history.page.js` | ConversationHistoryPage | History section in detail panel |
| `conversation-socket.page.js` | ConversationSocketPage | Socket.io connect/disconnect |
| `dashboard.page.js` | DashboardPage | Statistics page |
| `ticketing.page.js` | TicketingPage | Ticket list, create, tabs |
| `broadcast.page.js` | BroadcastPage | Broadcast dashboard |
| `contact.page.js` | ContactPage | Contact search/list |
| `group.page.js` | GroupPage | Group chat |
| `team.page.js` | TeamPage | Team settings |
| `check-all.page.js` | CheckAllPage | Cross-page nav smoke |
| `user-rbac.page.js` | UserRbacPage | RBAC access validation |
| `live-chat.page.js` | LiveChatPage | Widget live chat, generate new widget chat |
| `account-whatsapp.page.js` | AccountWhatsappPage | WhatsApp account monitoring |
| `endpoint-detect.page.js` | EndpointDetectPage | API route capture utility |
| `ticket-linked-bubble.page.js` | TicketLinkedBubblePage | Bubble select, create linked ticket setup, append to ticket (AddToTicketModal), remove linked bubble (LinkedMessagesSection), navigation (LinkedConversationPanel), reply sync |
| `member.page.js` | MemberPage | Member list, toggle active/deactive, status badge, row menu |

## Test Files (All)
| File | Tests | Scope |
|------|-------|-------|
| `conversation/chat-list.spec.js` | 21 | Nav sections (6), channels (7), click/open/switch |
| `conversation/inbox.spec.js` | 10 | Legacy nav + multi-channel |
| `conversation/empty-state.spec.js` | 10 | Empty states per nav |
| `conversation/inbound-outbound.spec.js` | 6 | Outbound per channel, inbound, multi-msg |
| `conversation/sla-metrics.spec.js` | 3 | Detail panel, SLA badge, close button |
| `conversation/agent-validation.spec.js` | 4 | Status, team inbox, channel source, conv ID |
| `conversation/conversation-history.spec.js` | 4 | History section, items, empty state |
| `conversation/endpoint-detect.spec.js` | 1 | API endpoint capture |
| `conversation/collect-elements.spec.js` | 1 | Element collection |
| `conversation/loop-login.spec.js` | 1 | Login/logout loop |
| `conversation/runner-checker.spec.js` | 1 | Widget channel send message |
| `auth/login.spec.js` | 8 | Login page, valid/invalid, role, token expiry |
| `auth/sap-batch-login.spec.js` | 1 | Batch login sweep for all SAP env-driven accounts, writes JSON result summary |
| `auth/storm-subscribers-login.spec.js` | 1 | Login sweep for every loginType in a storm-reproducer subscriber file (default `scripts/storm-reproducer/subscribers/dev-multi-company.template.txt`), writes JSON + failed.csv, resolves via `testAccounts`, controlled by `PW_SUBSCRIBERS_FILE`, `PW_LOGIN_LIMIT`, `PW_LOGIN_MODE`, `PW_SOFT_LOGIN`, `PW_FAIL_ON_UNRESOLVED` |
| `auth/register.spec.js` | 17 | Field validation, duplicate, full flow |
| `auth/onboarding.spec.js` | 9 | Org name, NIB, NPWP, ID number validation |
| `auth/member-toggle-active.spec.js` | 6 | Member activate/deactivate UI + API (active tests) |
| `auth/member-toggle-active-scaffold.spec.js` | 39 | Member toggle scaffold (all fixme, pending feature) |
| `socket/conversation.spec.js` | 2 | WebSocket connect, random data |
| `check-all/navigation.spec.js` | 17 | Cross-module nav smoke tests |
| `rbac/role-validation.spec.js` | 5 | 5 roles x page access |
| `ticket/ticketing.spec.js` | 1 | Ticketing page smoke |
| `ticket/linked-bubble.spec.js` | 45 | Linked bubble: existing (4 active + 3 fixme) + append (5 active) + remove (4 active) + navigation (2 active) + sync (9 fixme) + concurrency (5 fixme) + regression (7 active + 1 fixme) + data integrity (5 fixme) |
| `conversation/conversation-sync.spec.js` | 0 | DEPRECATED — replaced by 6 convo-*.spec.js files below |
| `conversation/convo-list-overview.spec.js` | 31 | TC 001-031: conversation list UI, icons, indicators, ellipsis. Active: 001,002,019,022,023,025,026,027,028,029,030,031. fixme: 003-018,020-021,024 (require device/test data) |
| `conversation/convo-room.spec.js` | 284 | TC 032-315: set reminder (UNDEVELOPED), message input all types, bubble chat, media, delivery, typing |
| `conversation/convo-detail-panel.spec.js` | 167 | TC 316-482: conversation details + all accordion groups |
| `conversation/convo-nav.spec.js` | 74 | TC 483-545, 688-698: inbox/unassigned/all/starred/spam/group/channel/team/junk nav |
| `conversation/convo-list-features.spec.js` | 118 | TC 546-663: list title, status filter, read/unread, sort, advance filter, combining filter, item behavior |
| `conversation/convo-supplement.spec.js` | 39 | TC 664-713: gap supplement — Chat List, Room, Get New Conversation, Group Handling |

**Total: 187 active tests + 713 convo spec stubs (fixme), 29 files**
**Note:** All 713 convo-*.spec.js tests are currently `test.fixme` stubs. Nav tests (convo-nav.spec.js) have InboxPage call scaffolding ready — implement assertions to activate.

## Config
| File | Content |
|------|---------|
| `playwright.config.js` | ENV=dev, 3 projects (chromium/firefox/webkit), actionTimeout 30s, data-cy attr |
| `support/config/environments.js` | local/dev/staging/prod + apiBase |
| `support/config/endpoints.js` | ApiEndpoints class: all API routes |
| `support/config/test-data.js` | Env-driven account placeholders, apiKeys, channelTypes |
| `support/config/conversation-testcases.generated.json` | Generated sync manifest from `PRDanalisis/Test/conversation/Conversation.tsv` |
| `support/config/conversation-testcases.generated.js` | CommonJS export of the generated conversation testcase manifest |
| `support/config/index.js` | getConfig() aggregator |

## Key Accounts (Dev)
| Login | Password | Role |
|-------|----------|------|
| `E2E_DEV_ADMIN_USER` | `E2E_DEV_ADMIN_PASSWORD` | admin (DEFAULT) |
| `E2E_DEV_ADMIN_USER` | `E2E_DEV_ADMIN_PASSWORD` | admin |
| `E2E_DEV_SUPERVISOR_USER` | `E2E_DEV_SUPERVISOR_PASSWORD` | supervisor |
| `E2E_DEV_AGENT_USER` | `E2E_DEV_AGENT_PASSWORD` | agent |

## Key Helpers
| File | Functions |
|------|-----------|
| `generators.js` | randomAsk(), randomQuote(), randomAnswer() |
| `test-data-generators.js` | randomName, Phone, Division, BatchId |
| `awb-generator.js` | numberAWB(), getRandomAWB() |
| `mail-tm.js` | MailTmHelper: temp email untuk register flow |

## Key Selector Rules (Locale)
- Nav buttons: use `/Kotak Pesan Anda|Your Inbox/i` (bilingual)
- Channels: `button:has-text(...)` or `getByRole('button', { name: ... })`
- Chat list items: `data-cy="chat-list-{n}"` (1-indexed)
- Chat room: `#conversation-chatroom-container`
- Agent bubble: `div.bg-blue-100`
- Customer bubble: `div.bg-slate-100:not(:has(div.rounded-full))`
- Message input: `textarea[data-cy="autogrowing-textarea"]`
- Send button: `/Kirim|Send/i` with `{ force: true }`
- Close: `/Tutup|Close/i`, Reopen: `/Buka|Reopen/i`



---
# PART 2: FE REPO (Omnichannel)

## Architecture
```
apps/omnichannel/   - Agent Next.js 16 (port 3002)
apps/widget/        - Customer chat widget
packages/types/     - Conversation, messages, socket, data-sources TS types
packages/constants/ - Platform, message, socket event enums
packages/helpers/   - is-sender, messages-helper utils
packages/ui/        - Radix/shadcn components
packages/react-query/ - TanStack Query wrappers
```

## Conversation Types Index
| File | Content |
|------|---------|
| `packages/types/src/conversation.ts` | Conversation, ContactInfo, ParticipantInfo, TeamInfo, SessionDetailResponse |
| `packages/types/src/messages.ts` | Message, Sender, MessageAttachment, direction/status/type enums |
| `packages/types/src/socket.ts` | OutboundMessagePayload, InboundMessagePayload, assign/pull events |
| `apps/omnichannel/types/conversation/conversation.ts` | ConversationStatusEnum, ConversationFilter, ConversationStats, PaginatedConversation |
| `apps/omnichannel/types/conversation/conversation-sla-metrics.ts` | ConversationSLAMetrics (FRT/RLT/TTC/wait-time fields) |
| `apps/omnichannel/types/conversation/conversation-event.ts` | ConversationEventType enum, ConversationEvent entity |

## API Endpoints (Conversation)
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/conversation` | GET | List conversations (paginated, filtered) |
| `/conversation/count` | GET | Conversation counts/stats |
| `/conversation/history` | GET | Conversation history for contact |
| `/conversation/pull` | GET | Pull conversations from queue |
| `/conversation/available-slot` | GET | Agent capacity check |
| `/conversation-sla-metrics/:id` | GET | SLA metrics (FRT/RLT/TTC) |
| `/conversation/:id/close` | PATCH | Close conversation |
| `/conversation/:id/assign` | PATCH | Assign to members/team |
| `/conversation/:id/unassign` | PATCH | Unassign members |
| `/messages/conversation/:id` | GET | Fetch messages |
| `/messages/conversation/:id` | POST | Send message |

## SLA Metrics
| Metric | Field | Description |
|--------|-------|-------------|
| FRT | `frtMs` | Customer msg -> first agent reply (ms) |
| RLT | `rltMs` | First assignment -> first agent reply (ms) |
| TTC | `ttcMs` | Conversation duration until closed (ms) |
| Wait Time | `waitTimeInQueueMs` | Customer msg -> agent assignment (ms) |

## Channel Types
| Platform | Enum | SLA | Locale EN→ID |
|----------|------|-----|--------------|
| WhatsApp API | `whatsapp_api` | Yes | Whatsapp Api |
| WhatsApp Web | `whatsapp_web` | Yes | Whatsapp Web |
| WhatsApp Web Group | `whatsapp_web_group` | No | Wa Web Group |
| Instagram | `instagram` | Yes | Instagram |
| Facebook Messenger | `facebook_messenger` | Yes | Facebook Messenger |
| Telegram | `telegram` | Yes | Telegram |
| Email | `email` | Yes | Email |
| Widget | `widget` | Yes | Widget |

## Socket Events
| Event | Direction | Payload |
|-------|-----------|---------|
| `socket.outbound.message` | Agent -> Server | OutboundMessagePayload |
| `socket.inbound.message` | Customer -> Server | InboundMessagePayload |
| `notification.new.message` | Server -> Client | Message notification |
| `message.status` | Server -> Client | Status update |
| `conversation.assigned` | Server -> Client | Assignment info |

## Message Enums
```
Direction: INBOUND | OUTBOUND
Sender: ACCOUNT_CHANNEL | AGENT | BOT | CLIENT | EXTERNAL
Status: PENDING | PROCESSING | SENT | DELIVERED | READ | FAILED | RETRY
```

## UI Components (Conversation)
- `chat-lists/` - Left: list, filters, search, bulk actions
- `chat-room/` - Center: message thread, input, media picker
- `chat-detail/` - Right: assignee, SLA, tags, notes
- `nav-lists/` - Sidebar: inbox (ID), unassigned, all, spam, starred, junk + channels + teams

## Agent Features
- `hooks/use-agent-search.ts` - Agent search (debounce, infinite scroll)
- `hooks/conversation/useAgentConversationLimit.ts` - Slot check
- `hooks/conversation/use-assign-modal.ts` - Assignment modal
- `services/member/` - Agent list API

## Page Routes
| Path | Page |
|------|------|
| `/conversation/your-inbox` | Your Inbox (ID: Kotak Pesan Anda) |
| `/conversation/unassigned` | Unassigned (ID: Belum Ditugaskan) |
| `/conversation/all` | All (ID: Semua) |
| `/conversation/spam` | Spam |
| `/conversation/starred` | Starred (ID: Berbintang) |
| `/conversation/junk` | Junk (ID: Folder Sampah) |
| `/ticketing` | Ticketing |
| `/broadcast/messages` | Broadcast |
| `/statistic` | Statistics |
| `/settings/inbox/sla` | SLA settings |

---
# PART 3: BE REPO (Omnichannel)

## Architecture
```
apps/                  - 21 microservices (Nx monorepo)
  api-gateway/         - HTTP/REST gateway (NestJS, port 3000)
  auth-service/        - Auth, roles, permissions, sessions
  people-service/      - Users, members, teams, contacts, privacy policy
  company-service/     - Companies, orgs, tags, shifts
  conversation-service/- Conversations, SLA, messages
  ticket-service/      - Tickets, stages, bulk replies
  broadcast-service/   - Broadcast campaigns, templates
  channel-service/     - Channel management (WhatsApp, IG, etc.)
  notification-service/- Notifications (in-app, email)
  widget/              - Customer chat widget logic
  whatsapp/            - WhatsApp Web integration
  whatsapp-api/        - WhatsApp Business API
  instagram/           - Instagram messaging
  messenger/           - Facebook Messenger
  email/               - Email channel
  media-service/       - File upload/storage
  payment-service/     - Payment/subscription
  analytics-service/   - Analytics & reporting
  audit-service/       - Audit logging
  sales-service/       - Sales (leads, visits, comments)
libs/                  - Shared libraries (4)
  common/              - Enums, decorators, guards, utils, constants
  cache/               - Redis caching decorators
  proto-types/         - gRPC type definitions
  security/            - Encryption, hashing, token services
proto/                 - gRPC proto definitions (22 files)
```

## RBAC System
See `memory/rbac-memory.md` for complete RBAC reference:
- 9 roles with permission matrices
- 50+ permission actions across 22 resources
- Contact scope (area + visibility) for contact-level access
- Privacy masking (PII) per role
- Ticket view config per role
- Guard chain: JwtAuthGuard → RolesGuard + PermissionsGuard
- Session invalidation triggers
