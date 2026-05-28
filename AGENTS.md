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
- **Skipping:** Use `test.skip(condition, 'reason')` for conditional skip, `test.fixme('title', 'why not implemented')` for stubs.
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

---

## Sources
- FE: private frontend monorepo reference redacted for portfolio publication
- BE: private backend monorepo reference redacted for portfolio publication
- Auto: this QA automation portfolio repo

---
# PART 1: AUTOMATION REPO

## Structure
```
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
| `inbox.page.js` | InboxPage | Nav (ID/EN), channels, chat list, send msg, bubbles, SLA |
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
| `live-chat.page.js` | LiveChatPage | Widget live chat |
| `account-whatsapp.page.js` | AccountWhatsappPage | WhatsApp account monitoring |
| `endpoint-detect.page.js` | EndpointDetectPage | API route capture utility |
| `ticket-linked-bubble.page.js` | TicketLinkedBubblePage | Bubble select, create ticket, append to ticket (AddToTicketModal), remove linked bubble (LinkedMessagesSection), navigation (LinkedConversationPanel), reply sync |
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
| `auth/register.spec.js` | 17 | Field validation, duplicate, full flow |
| `auth/onboarding.spec.js` | 9 | Org name, NIB, NPWP, ID number validation |
| `auth/member-toggle-active.spec.js` | 6 | Member activate/deactivate UI + API (active tests) |
| `auth/member-toggle-active-scaffold.spec.js` | 39 | Member toggle scaffold (all fixme, pending feature) |
| `socket/conversation.spec.js` | 2 | WebSocket connect, random data |
| `check-all/navigation.spec.js` | 17 | Cross-module nav smoke tests |
| `rbac/role-validation.spec.js` | 5 | 5 roles x page access |
| `ticket/ticketing.spec.js` | 1 | Ticketing page smoke |
| `ticket/linked-bubble.spec.js` | 45 | Linked bubble: existing (4 active + 3 fixme) + append (5 active) + remove (4 active) + navigation (2 active) + sync (9 fixme) + concurrency (5 fixme) + regression (7 active + 1 fixme) + data integrity (5 fixme) |

**Total: 181 active tests, 20 files (21 with fixme stubs)**

## Config
| File | Content |
|------|---------|
| `playwright.config.js` | ENV=dev, 3 projects (chromium/firefox/webkit), actionTimeout 30s, data-cy attr |
| `support/config/environments.js` | local/dev/staging/prod + apiBase |
| `support/config/endpoints.js` | ApiEndpoints class: all API routes |
| `support/config/test-data.js` | Env-driven account placeholders, apiKeys, channelTypes |
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
