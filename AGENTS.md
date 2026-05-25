# AGENTS.md - FE + Automation Index (Compressed)

> **Policy:** Update this file every time scripts change or new tests added.

## Sources
- FE: `C:\Users\MyBook SAGA 12\Desktop\FE satuinbox\omnichannel-satuinbox-fe`
- Auto: `C:\Users\MyBook SAGA 12\Desktop\sixV2Automation` (this repo)

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
| `socket/conversation.spec.js` | 2 | WebSocket connect, random data |
| `check-all/navigation.spec.js` | 17 | Cross-module nav smoke tests |
| `rbac/role-validation.spec.js` | 5 | 5 roles x page access |
| `ticket/ticketing.spec.js` | 1 | Ticketing page smoke |

| `auth/auth-legacy.spec.js` | 51 | Legacy Cypress regression stubs (all fixme) |
| `team/team.spec.js` | 3 | Team page stubs (all fixme) |

**Total: 121 active tests, 18 files (20 with fixme stubs)**

## Config
| File | Content |
|------|---------|
| `playwright.config.js` | ENV=dev, 3 projects (chromium/firefox/webkit), actionTimeout 30s, data-cy attr |
| `support/config/environments.js` | local/dev/staging/prod + apiBase |
| `support/config/endpoints.js` | ApiEndpoints class: all API routes |
| `support/config/test-data.js` | Accounts (goddummy, chickentester01, dany*, dll), apiKeys, channelTypes |
| `support/config/index.js` | getConfig() aggregator |

## Key Accounts (Dev)
| Login | Password | Role |
|-------|----------|------|
| chickentester01 | Asdqwe12@ | admin (DEFAULT) |
| cekerayam01 | Asdqwe12@ | admin |
| mataayam01 | Asdqwe12@ | supervisor |
| leherayam01 | Asdqwe12@ | agent |

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

## Scripts
| Command | Description |
|---------|-------------|
| `npm run pw:test` | Playwright all tests |
| `npm run pw:test:chrome` | Chromium only |
| `npm run pw:report` | Show HTML report |
| `ENV=prod npx playwright test` | Run on prod |
| `LOGIN_TYPE=xxx npx playwright test` | Use specific account |

## Test Pattern
```javascript
const { test, expect } = require('@playwright/test');
const { AuthPage, InboxPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Feature', () => {
  let authPage, inboxPage, config;
  test.beforeAll(async () => { config = getCurrentConfig(); });
  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    await authPage.loginWithCredentials(config.getDefaultAccount(), { useV2: true });
  });
  test('should ...', async ({ page }) => { ... });
});
```

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
