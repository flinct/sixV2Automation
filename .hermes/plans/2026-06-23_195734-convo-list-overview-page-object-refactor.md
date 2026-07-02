# convo-list-overview.spec.js Page Object Refactor Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Refactor `playwright/tests/e2e/conversation/convo-list-overview.spec.js` so all runtime page interactions go through a Page Object instead of local selector helpers and inline locators.

**Architecture:** Promote `playwright/support/pages/conversation.page.js` as the canonical page object for this spec. Keep assertions, skip decisions, and data/setup commentary in the spec; move selectors, hover/click mechanics, list-card access, quick-action access, screenshot access, and room opening logic into the page object.

**Tech Stack:** Playwright `@playwright/test` 1.60, CommonJS page objects, repo `data-cy` convention (`playwright.config.js` sets `testIdAttribute: 'data-cy'`), FE-derived fallback selector `#conversation-chatroom-container` where `Chat-Room-Container` is not currently rendered.

---

## Current Context / Findings

### Why `ConversationPage`, not `InboxPage`
- `convo-list-overview.spec.js` currently imports `AuthPage` and `InboxPage` directly from file paths instead of the aggregator export required by `AGENTS.md`.
- The spec only uses 3 `InboxPage` methods today:
  - `gotoUnassigned()`
  - `gotoYourInbox()`
  - `gotoSpam()`
- `ConversationPage` already contains most of what this spec needs:
  - `chatListContainer`
  - `chatListHeader`
  - `chatListTitle`
  - `chatListEmpty`
  - `chatItem(n)`
  - `chatItems`
  - `cardPart(n, key)`
  - `cardName(n)`
  - `cardQuickAction(n)`
  - `quickAction(key)`
  - `roomHeader`
  - `messageInput`
  - `sendButton`
  - `openChat(n)`
- Growing `InboxPage` further would duplicate behavior that already belongs in `ConversationPage`.

### Current spec-local selector debt
`playwright/tests/e2e/conversation/convo-list-overview.spec.js` still defines local selector helpers and direct locators for runtime behavior:
- `chatCard(page, n)`
- `cardPart(page, n, part)`
- `chatList(page)`
- `emptyState(page)`
- `chatRoom(page)`
- `openQuickAction(page, n)`
- `menuItem(page, labelRx)`
- `requireFirstChat(page)`
- raw count selector: `[data-cy^="chat-list-"]`
- raw room/screenshot selectors:
  - `[data-cy="Chat-Room-Header"]`
  - `button:has(svg.tabler-icon-camera-plus)`
  - `[data-cy="modal-screenshot-container"]`
  - `[data-cy="cancel-ss-button"]`
  - `[data-cy="send-ss-button"]`

### Known selector mismatch to fix during refactor
- `ConversationPage.chatRoom` currently uses `getByTestId('Chat-Room-Container')`.
- FE evidence shows the room container is currently rendered as `id="conversation-chatroom-container"` in `ConversationChatRoomContainer.tsx`.
- The spec already uses `#conversation-chatroom-container`, so the page object should match the real DOM.

### FE-backed stable selector sources already available
- Quick-action menu items already have stable `data-cy` keys in FE:
  - `quick-action-mark-read`
  - `quick-action-close`
  - `quick-action-reopen`
  - `quick-action-reminder`
  - `quick-action-star`
  - `quick-action-pin`
  - `quick-action-spam`
  - `quick-action-junk`
- Chat card subparts are standardized in FE constants:
  - `avatar`
  - `channel-icon`
  - `name`
  - `pinned-icon`
  - `quick-action`
  - `sla-badge`
  - `starred-icon`
  - `typing-indicator`
  - `unread-count`
- Screenshot preview modal has stable `data-cy` hooks:
  - `modal-screenshot-container`
  - `cancel-ss-button`
  - `send-ss-button`
- Screenshot trigger itself still has **no data-cy**, so the page object must encapsulate the current fallback selector (`button:has(svg.tabler-icon-camera-plus)`).

---

## Scope of This Refactor

### In scope
- Remove all runtime inline page selectors from `convo-list-overview.spec.js`.
- Replace `InboxPage` usage in this spec with `ConversationPage`.
- Add the missing list/card/quick-action/screenshot helpers to `ConversationPage`.
- Align imports with `AGENTS.md` (`require('../../../support/pages')`).
- Update `AGENTS.md` because automation scripts/page-object coverage changed.

### Out of scope
- Rewriting or deleting `InboxPage` for other specs.
- Changing FE code.
- Converting `fixme` commentary into executable tests.
- Solving all data-seeding / environment flakiness.
- Cross-spec page-object consolidation beyond what this file needs.

---

## Files Likely to Change

### Modify
- `../sixV2Automation/playwright/tests/e2e/conversation/convo-list-overview.spec.js`
- `../sixV2Automation/playwright/support/pages/conversation.page.js`
- `../sixV2Automation/AGENTS.md`

### Likely no change needed
- `../sixV2Automation/playwright/support/pages/index.js` (already exports `ConversationPage`)
- `../sixV2Automation/playwright/support/pages/inbox.page.js` (leave as-is for now to minimize blast radius)

---

## Proposed Refactor Strategy

### Core decision
Standardize this spec on `ConversationPage` and stop expanding `InboxPage`.

### Division of responsibilities after refactor

#### `ConversationPage` owns
- navigation to sections
- locating chat list / empty state / cards / card subparts
- opening a chat room
- opening quick-action menus and clicking quick-action items
- locating screenshot trigger / menu / modal / modal buttons
- returning list counts and visible card names

#### `convo-list-overview.spec.js` keeps
- test titles and test grouping
- `test.skip(...)` decisions
- env/data precondition commentary
- business assertions (`expect(found).toBe(true)`, phone-regex checks, etc.)
- scenario-specific state normalization logic (e.g. “if already starred, unstar first”)

---

## Step-by-Step Plan

### Task 1: Switch the spec to the page aggregator and `ConversationPage`

**Objective:** Align imports with repo convention and stop using `InboxPage` for this spec.

**Files:**
- Modify: `../sixV2Automation/playwright/tests/e2e/conversation/convo-list-overview.spec.js`

**Changes:**
1. Replace direct imports:
   - from:
     - `require('../../../support/pages/auth.page')`
     - `require('../../../support/pages/inbox.page')`
   - to:
     - `const { AuthPage, ConversationPage } = require('../../../support/pages');`
2. Rename local page instance from `inboxPage` to `conversationPage` throughout the file.
3. Keep `getCurrentConfig()` and `AuthPage` login flow unchanged.

**Target import shape:**
```js
const { test, expect } = require('@playwright/test');
const { getCurrentConfig } = require('../../../support/config');
const { AuthPage, ConversationPage } = require('../../../support/pages');
```

**Verification:**
- The file still parses.
- No remaining `InboxPage` import or `new InboxPage(page)` usage in this spec.

---

### Task 2: Extend `ConversationPage` with the missing chat-list card helpers

**Objective:** Remove the spec’s need for local `chatCard`, `cardPart`, `requireFirstChat`, and raw count/name selectors.

**Files:**
- Modify: `../sixV2Automation/playwright/support/pages/conversation.page.js`

**Add/adjust locators:**
```js
this.cardAvatar = (n) => this.cardPart(n, 'avatar');
this.cardChannelIcon = (n) => this.cardPart(n, 'channel-icon');
this.cardStarredIcon = (n) => this.cardPart(n, 'starred-icon');
this.cardPinnedIcon = (n) => this.cardPart(n, 'pinned-icon');
this.cardUnreadCount = (n) => this.cardPart(n, 'unread-count');
```

**Add helper methods:**
```js
async hasChat(n = 1, timeout = 8000) {
  return this.chatItem(n).isVisible({ timeout }).catch(() => false);
}

async getChatCount() {
  return this.chatItems.count();
}

async getChatName(n = 1) {
  return this.cardName(n).textContent();
}

async getVisibleChatNames() {
  return this.page.locator('[data-cy^="chat-list-"][data-cy$="-name"]').allTextContents();
}
```

**Notes:**
- Use the narrower `[data-cy^="chat-list-"][data-cy$="-name"]` selector instead of the spec’s broad `[data-cy*="-name"]`.
- Do **not** move `test.skip(...)` into the page object; the page object should return booleans and data, not call the test runner.

**Verification:**
- `ConversationPage` can answer whether the first chat exists.
- `ConversationPage` can count cards and retrieve visible chat names without any spec-local locator helper.

---

### Task 3: Fix and harden room / quick-action behavior in `ConversationPage`

**Objective:** Make the page object own the hover/click mechanics and real room selector used by this spec.

**Files:**
- Modify: `../sixV2Automation/playwright/support/pages/conversation.page.js`

**Patch room selector:**
Replace the current room locator with the FE-confirmed DOM id:
```js
this.chatRoom = page.locator('#conversation-chatroom-container');
```

**Add quick-action interaction methods:**
```js
async openQuickActionMenu(n = 1) {
  await expect(this.chatItem(n)).toBeVisible({ timeout: 15000 });
  await this.chatItem(n).hover();
  await expect(this.cardQuickAction(n)).toBeVisible({ timeout: 5000 });
  await this.cardQuickAction(n).click();
}

async clickQuickAction(n, key) {
  await this.openQuickActionMenu(n);
  await expect(this.quickAction(key)).toBeVisible({ timeout: 5000 });
  await this.quickAction(key).click();
}
```

**Backward-compatibility option:**
If any future consumer already depends on `openQuickAction(n, key)`, either:
- replace its implementation with the new hover-aware flow, or
- keep it and have it delegate to `clickQuickAction(n, key)`.

**Key mapping to use in this spec:**
- star/unstar: `star`
- pin/unpin: `pin`
- spam/unspam: `spam`

**Notes:**
- The FE keeps the same `quick-action-${key}` data-cy for both starred/unstarred and pinned/unpinned states; the label changes but the key does not.
- This is better than bilingual text matching because it is less brittle.

**Verification:**
- The page object can open the ellipsis menu without the spec calling `hover()` directly.
- The page object can click quick-action items by key instead of by label text.

---

### Task 4: Add screenshot-specific abstractions to `ConversationPage`

**Objective:** Remove screenshot trigger/modal selectors from the spec and keep the fallback trigger selector in one place.

**Files:**
- Modify: `../sixV2Automation/playwright/support/pages/conversation.page.js`

**Add screenshot locators:**
```js
this.screenshotTrigger = this.roomHeader.locator('button:has(svg.tabler-icon-camera-plus)').first();
this.screenshotModal = page.getByTestId('modal-screenshot-container');
this.screenshotCancelButton = page.getByTestId('cancel-ss-button');
this.screenshotSendButton = page.getByTestId('send-ss-button');
```

**Add screenshot option helpers:**
```js
this.screenshotOption = (labelRx) => page.getByRole('button', { name: labelRx });
```

**Suggested methods:**
```js
async hasScreenshotTrigger(timeout = 5000) {
  return this.screenshotTrigger.isVisible({ timeout }).catch(() => false);
}

async openScreenshotMenu() {
  await expect(this.screenshotTrigger).toBeVisible({ timeout: 5000 });
  await this.screenshotTrigger.click();
}

async chooseEntireRoomScreenshot() {
  const option = this.screenshotOption(/Entire Room|Seluruh Ruangan/i);
  await expect(option).toBeVisible({ timeout: 5000 });
  await option.click();
}

async waitForScreenshotModal() {
  await expect(this.screenshotModal).toBeVisible({ timeout: 10000 });
}

async sendScreenshot() {
  await expect(this.screenshotSendButton).toBeVisible();
  await this.screenshotSendButton.click();
}

async cancelScreenshot() {
  await expect(this.screenshotCancelButton).toBeVisible();
  await this.screenshotCancelButton.click();
}
```

**Notes:**
- Keep the room option text regex inside the page object unless/until FE exposes a `data-cy` for those buttons.
- The success toast can stay asserted in the spec, because it is a scenario assertion rather than a structural page element.

**Verification:**
- The spec no longer needs to locate room header, screenshot trigger, screenshot modal, cancel button, or send button directly.

---

### Task 5: Remove local helpers and direct runtime selectors from `convo-list-overview.spec.js`

**Objective:** Make the spec consume only page-object access for runtime interactions.

**Files:**
- Modify: `../sixV2Automation/playwright/tests/e2e/conversation/convo-list-overview.spec.js`

**Delete these helper functions from the spec:**
- `chatCard`
- `cardPart`
- `chatList`
- `emptyState`
- `chatRoom`
- `openQuickAction`
- `menuItem`
- `requireFirstChat`

**Replace them with `ConversationPage` calls.**

#### Required old → new replacements

| Current spec usage | Replace with |
|---|---|
| `chatList(page)` | `conversationPage.chatListContainer` |
| `emptyState(page)` | `conversationPage.chatListEmpty` |
| `chatCard(page, 1)` | `conversationPage.chatItem(1)` |
| `cardPart(page, 1, 'name')` | `conversationPage.cardName(1)` |
| `cardPart(page, 1, 'starred-icon')` | `conversationPage.cardStarredIcon(1)` |
| `cardPart(page, 1, 'pinned-icon')` | `conversationPage.cardPinnedIcon(1)` |
| `openQuickAction(page, 1)` | `conversationPage.openQuickActionMenu(1)` |
| `menuItem(page, /.../)` | `conversationPage.quickAction('star'|'pin'|'spam')` or `conversationPage.clickQuickAction(1, key)` |
| `chatRoom(page)` | `conversationPage.chatRoom` |
| `page.locator('[data-cy^="chat-list-"]').count()` | `conversationPage.getChatCount()` |
| `page.locator('[data-cy*="-name"]').allTextContents()` | `conversationPage.getVisibleChatNames()` |
| room header raw locator | `conversationPage.roomHeader` |
| screenshot trigger raw locator | `conversationPage.screenshotTrigger` |
| screenshot modal/button raw locators | `conversationPage.screenshotModal`, `conversationPage.screenshotCancelButton`, `conversationPage.screenshotSendButton` |

**Section-by-section rewrite targets:**
- `verify conversation list` block (TC 001-005)
- `verify customer name` block (TC 019-022)
- `verify screenshot` block (TC 023-025)
- `verify ellipsis` block (TC 026-031)

**What may remain in the spec:**
- regex assertions like `/^6[0-9]/`
- `test.skip(...)` decisions
- env/data commentary in fixme blocks
- success-toast assertion text

---

### Task 6: Normalize the active scenarios block-by-block

**Objective:** Apply the page object consistently to every active runtime test in the file.

**Files:**
- Modify: `../sixV2Automation/playwright/tests/e2e/conversation/convo-list-overview.spec.js`

**Active scenarios to convert now:**
- `SIX-Convo-001`
- `SIX-Convo-002`
- `SIX-Convo-019`
- `SIX-Convo-022`
- `SIX-Convo-023`
- `SIX-Convo-025`
- `SIX-Convo-026`
- `SIX-Convo-027`
- `SIX-Convo-028`
- `SIX-Convo-029`
- `SIX-Convo-030`
- `SIX-Convo-031`

**Examples of desired spec shape after refactor:**

```js
await conversationPage.goto('unassigned');
await expect(conversationPage.chatListContainer.or(conversationPage.chatListEmpty)).toBeVisible({ timeout: 15000 });
```

```js
const hasChat = await conversationPage.hasChat(1);
if (!hasChat) {
  test.skip(true, 'No conversations found');
  return;
}
await conversationPage.openChat(1);
await expect(conversationPage.chatRoom).toBeVisible({ timeout: 15000 });
```

```js
await conversationPage.openQuickActionMenu(1);
await conversationPage.quickAction('star').click();
await expect(conversationPage.cardStarredIcon(1)).toBeVisible({ timeout: 8000 });
```

```js
await conversationPage.openChat(1);
const hasScreenshot = await conversationPage.hasScreenshotTrigger();
if (!hasScreenshot) {
  test.skip(true, 'Screenshot button not visible — add-on may not be active for this org');
  return;
}
await conversationPage.openScreenshotMenu();
await conversationPage.chooseEntireRoomScreenshot();
await conversationPage.waitForScreenshotModal();
await conversationPage.sendScreenshot();
```

**Fixme blocks:**
- Leave them as `test.fixme(...)`.
- Only update comments if the old inline selectors become misleading after refactor.
- Do not spend time converting comment-only pseudo-steps unless they actively contradict the new page object design.

---

### Task 7: Update `AGENTS.md` to reflect the new canonical pattern

**Objective:** Keep repo instructions accurate after the page-object refactor.

**Files:**
- Modify: `../sixV2Automation/AGENTS.md`

**Update areas:**
1. Page Objects Index row for `conversation.page.js`:
   - mention chat list items, quick actions, room selectors, screenshot helpers.
2. If useful, clarify `inbox.page.js` is a lighter / older helper and `ConversationPage` is preferred for new conversation specs.
3. If the total active behavior or conventions wording changes, refresh the relevant rows.

**Important:**
- No need to invent a new page object file.
- No need to change the test count unless the refactor changes executable test coverage (it should not).

---

## Validation Plan

### Static / discovery validation
Run from `../sixV2Automation`:

```bash
npx playwright test playwright/tests/e2e/conversation/convo-list-overview.spec.js --project=chromium --list
```

**Expected:**
- file parses successfully
- all tests are discovered
- no import or syntax error

### Targeted active-flow validation
Because some scenarios mutate state and depend on seeded data, validate in smaller groups.

#### Group A — non-mutating / lower-risk
```bash
npx playwright test playwright/tests/e2e/conversation/convo-list-overview.spec.js --project=chromium --grep "SIX-Convo-001|SIX-Convo-002|SIX-Convo-019|SIX-Convo-022"
```

#### Group B — screenshot flows (requires add-on active)
```bash
npx playwright test playwright/tests/e2e/conversation/convo-list-overview.spec.js --project=chromium --grep "SIX-Convo-023|SIX-Convo-025"
```

#### Group C — ellipsis flows (requires deterministic seeded conversation state)
```bash
npx playwright test playwright/tests/e2e/conversation/convo-list-overview.spec.js --project=chromium --grep "SIX-Convo-026|SIX-Convo-027|SIX-Convo-028|SIX-Convo-029|SIX-Convo-030|SIX-Convo-031"
```

### Optional smoke command using repo script
```bash
npm run pw:test:chrome -- playwright/tests/e2e/conversation/convo-list-overview.spec.js
```

---

## Risks / Tradeoffs / Open Questions

### 1. `ConversationPage` becomes the first-class owner, `InboxPage` remains partially redundant
This is acceptable for the first pass. Do not broaden scope into a repo-wide consolidation unless this spec is stable after refactor.

### 2. Screenshot trigger still uses a fallback DOM selector
There is no FE `data-cy` on the screenshot trigger button yet. The best current solution is to hide that fallback inside `ConversationPage`. If FE later adds a stable `data-cy`, update only the page object.

### 3. Chat room selector mismatch is a real bug source
If `ConversationPage.chatRoom` is not patched to `#conversation-chatroom-container`, the spec refactor may still fail even though the spec is “using a page object.” Fix this before converting the screenshot and open-chat flows.

### 4. State-mutating tests may still be flaky when run as a full file
Star/pin/spam tests mutate shared environment state and rely on “card 1”. This refactor removes selector duplication, but it does **not** guarantee stability if the environment changes concurrently.

**Optional follow-up after refactor:**
- consider serializing the mutation-heavy describe block, or
- seed dedicated test conversations for these scenarios.

### 5. Keep `test.skip` out of page objects
Even though the spec should use page objects for runtime selectors/interactions, `test.skip(...)` should remain in the spec so the page object does not become test-runner-aware.

---

## Recommended Execution Order

1. Patch `ConversationPage` core selectors and helpers.
2. Patch screenshot helpers in `ConversationPage`.
3. Rewrite imports and `beforeEach` in `convo-list-overview.spec.js`.
4. Convert active runtime scenarios to the new helpers.
5. Remove deleted local helper functions from the spec.
6. Update `AGENTS.md`.
7. Run `--list`, then run the active test groups.

---

## Success Criteria

The refactor is complete when all of the following are true:
- `convo-list-overview.spec.js` no longer defines runtime selector helpers.
- The spec no longer uses raw `page.locator(...)` for list cards, quick actions, screenshot modal/buttons, or room open flow.
- The spec imports `ConversationPage` via `../../../support/pages`.
- `ConversationPage` is the only runtime selector owner for this spec’s conversation UI interactions.
- `AGENTS.md` is updated to reflect the refined page-object coverage.

---

## Handoff Note

Implement the refactor in the smallest possible steps and validate after each cluster (`core list`, `screenshot`, `ellipsis`). Do **not** fold in broader page-object cleanup during this pass.
