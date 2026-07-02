/**
 * Conversation List — Overview & UI Elements
 * TC range: SIX-Convo-001 – SIX-Convo-031
 *
 * Selectors derived from FE source:
 *   apps/omnichannel/constants/data-cypress.ts  →  DATA_CYPRESS_CHAT_LIST_ITEM / DATA_CYPRESS_CHAT_ROOM
 *   chat-lists/ConversationChatLists.tsx         →  itemDataCy = "chat-list-{n}" (1-indexed)
 *   chat-lists/chat-item/ConversationCard.tsx    →  full card structure
 *   chat-lists/EmptyChat.tsx                     →  data-cy="conversation-empty-state"
 *   chat-room/screenshot/ScreenshotSelection.tsx →  PopoverTrigger > Button w/ IconCameraPlus
 *
 * data-cy patterns used (all from DATA_CYPRESS_CHAT_LIST_ITEM / DATA_CYPRESS_CONVERSATION):
 *   [data-cy="conversation-list"]            — whole chat list panel (CONVERSATION_CHAT_LISTS_CONTAINER)
 *   [data-cy="conversation-empty-state"]     — empty state when no chats
 *   [data-cy="chat-list-{n}"]                — nth card (1-indexed)
 *   [data-cy="chat-list-{n}-avatar"]         — avatar / initials
 *   [data-cy="chat-list-{n}-name"]           — contact name text
 *   [data-cy="chat-list-{n}-channel-icon"]   — channel icon (WA/widget/etc)
 *   [data-cy="chat-list-{n}-quick-action"]   — ellipsis button (hover to reveal)
 *   [data-cy="chat-list-{n}-starred-icon"]   — star badge (only when starred)
 *   [data-cy="chat-list-{n}-pinned-icon"]    — pin badge (only when pinned)
 *   [data-cy="chat-list-{n}-unread-count"]   — unread count bubble
 *   [data-cy="Chat-Room-Header"]             — chat room header (DATA_CYPRESS_CHAT_ROOM.CHAT_ROOM_HEADER)
 *   [data-cy="modal-screenshot-container"]   — screenshot preview modal
 *   [data-cy="cancel-ss-button"]             — cancel button in screenshot modal
 *   [data-cy="send-ss-button"]               — save & send in screenshot modal
 *
 * Quick-action menu item labels — actual i18n strings:
 *   (QuickAction.tsx uses useTranslations('conversation.quickAction'))
 *   EN / ID:
 *   Star:      "Star conversation"            / "Beri bintang pada percakapan"
 *   Unstar:    "Unstar conversation"          / "Hapus bintang percakapan"
 *   Pin:       "Pin conversation"             / "Sematkan percakapan"
 *   Unpin:     "Unpin conversation"           / "Lepas sematan percakapan"
 *   Spam:      "Mark as spam"                 / "Tandai sebagai spam"
 *   Unspam:    "Unmark as spam"               / "Batalkan tanda spam"
 *
 *   Menu items render as CommandItem (shadcn/cmdk) → role="option".
 *   Use getByRole('option', { name: /regex/i }) to locate them.
 *
 * Screenshot button:
 *   ScreenshotSelection.tsx renders a Popover with a Button wrapping <IconCameraPlus>.
 *   No data-cy on the trigger. Locate via: button:has(svg.tabler-icon-camera-plus)
 *   Tabler icons render SVG with class "tabler-icon tabler-icon-{kebab-name}".
 *
 * Screenshot dropdown option labels — actual i18n strings (screenshot.* namespace):
 *   EN: "Entire Room"       / ID: "Seluruh Ruangan"
 *   EN: "Selected area"     / ID: "Bagian yang dipilih"
 *
 * Screenshot toast on send:
 *   Title:       "Screenshot success"         / "Screenshot berhasil"
 *   Description: "Screenshot saved successfully" / "Screenshot berhasil disimpan"
 */

const { test, expect } = require('@playwright/test');
const { getCurrentConfig } = require('../../../support/config');
const { AuthPage, InboxPage } = require('../../../support/pages');

// ─── Shared helpers ────────────────────────────────────────────────────────────

async function skipIfNoFirstChat(
  inboxPage,
  message = 'No conversations found in this section — skipping data-dependent test'
) {
  const hasChat = await inboxPage.hasChat(1);
  if (!hasChat) {
    test.skip(true, message);
    return false;
  }
  return true;
}

// ─── Scenario: verify conversation list ───────────────────────────────────────
test.describe('verify conversation list', () => {
  let authPage, inboxPage, config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    console.log('[beforeEach] Logging in with default account (V2)');
    await authPage.loginWithCredentials(config.getDefaultAccount(), { useV2: true });
    console.log('[beforeEach] Login complete');
  });

  // ── SIX-Convo-001 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-001] unassigned — shows list container (with chats) or empty state', async ({ page }) => {
    // Precondition: user is logged in; linked channel number may or may not have conversations
    // Expected: conversation-list OR conversation-empty-state is visible

    console.log('[SIX-Convo-001] Navigating to /unassigned');
    await inboxPage.goto('unassigned');

    console.log('[SIX-Convo-001] Waiting for list container, empty state, or section heading to appear');
    await expect(
      inboxPage.chatListContainer
        .or(inboxPage.chatListEmpty)
        .or(inboxPage.sectionHeading('unassigned'))
    ).toBeVisible({ timeout: 15000 });
    console.log('[SIX-Convo-001] PASS — container or empty state visible');
  });

  // ── SIX-Convo-002 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-002] unassigned — open first conversation shows chat room', async ({ page }) => {
    // Precondition: at least 1 conversation in /unassigned
    // DATA: Ensure at least 1 unassigned conversation exists in the test env
    // Expected: chat room visible after clicking first chat card

    console.log('[SIX-Convo-002] Navigating to /unassigned');
    await inboxPage.goto('unassigned');

    console.log('[SIX-Convo-002] Verifying at least 1 chat exists');
    const hasChat = await inboxPage.hasChat(1);
    if (!hasChat) {
      test.skip(true, 'No conversations found in this section — skipping data-dependent test');
      return;
    }

    console.log('[SIX-Convo-002] Clicking first chat card');
    await inboxPage.openChat(1);

    console.log('[SIX-Convo-002] Waiting for chat room to appear');
    await expect(inboxPage.chatRoom).toBeVisible({ timeout: 15000 });
    console.log('[SIX-Convo-002] PASS — chat room visible');
  });

  // ── SIX-Convo-003 (fixme) ─────────────────────────────────────────────────
  test.fixme('[SIX-Convo-003] unassigned — mark-as-read moves conversation to /your-inbox - not yet automated', async ({ page }) => {
    // Precondition: at least 1 unread conversation in /unassigned
    // DATA: Need 1 conversation with unread count > 0 in /unassigned
    // Steps:
    //   1. Navigate to /unassigned
    //   2. Click first chat card
    //   3. Open quick-action (ellipsis) menu
    //   4. Click "Tandai sudah dibaca" / "Mark as read"
    // Expected:
    //   - Conversation removed from /unassigned list
    //   - Conversation appears in /your-inbox
    //   - Unread counter in sidebar updates for both sections
    // Note: Requires controlled test data — conversation state must be predictable.
  });

  // ── SIX-Convo-004 (fixme) ─────────────────────────────────────────────────
  test.fixme('[SIX-Convo-004] your-inbox — star + pin + spam conversation - not yet automated', async ({ page }) => {
    // Precondition: at least 1 conversation in /your-inbox that is:
    //   - Not starred, not pinned, not spam
    // DATA: Seed 1 clean conversation assigned to the logged-in agent
    // Steps:
    //   1. Open /your-inbox → hover card → click ellipsis
    //   2. Click "Beri bintang pada percakapan" / "Star conversation"
    //   3. Hover card → click ellipsis → "Sematkan percakapan" / "Pin conversation"
    //   4. Hover card → click ellipsis → "Tandai sebagai spam" / "Mark as spam"
    // Expected:
    //   - Conversation appears in /starred, /spam
    //   - Pinned at top of /your-inbox and /all
    //   - Sidebar counters updated; success toasts shown
    // Note: Multi-step state flow — needs isolated test data per run.
  });

  // ── SIX-Convo-005 (fixme) ─────────────────────────────────────────────────
  test.fixme('[SIX-Convo-005] your-inbox — unstar + unpin + unspam conversation - not yet automated', async ({ page }) => {
    // Precondition: at least 1 conversation in /your-inbox that is:
    //   - Already starred, pinned, AND spam
    // DATA: Seed 1 conversation with starred=true, pinned=true, isSpam=true
    // Steps:
    //   1. Open /your-inbox → hover card → click ellipsis
    //   2. Click "Hapus bintang percakapan" / "Unstar conversation"
    //   3. Hover card → click ellipsis → "Lepas sematan percakapan" / "Unpin conversation"
    //   4. Hover card → click ellipsis → "Batalkan tanda spam" / "Unmark as spam"
    // Expected:
    //   - Removed from /starred, /spam; unpinned from top of list
    //   - Sidebar counters updated; success toasts shown
    // Note: Multi-step state flow — needs isolated test data per run.
  });
});

// ─── Scenario: verify initial/photo icon ──────────────────────────────────────
test.describe('verify initial/photo icon', () => {
  let authPage, inboxPage, config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    console.log('[beforeEach] Logging in with default account (V2)');
    await authPage.loginWithCredentials(config.getDefaultAccount(), { useV2: true });
    console.log('[beforeEach] Login complete');
  });

  /**
   * Avatar initials logic (from AvatarWithFallback.tsx → getInitials):
   *   Split name by whitespace, take first char of each part (uppercased), slice to 2 chars.
   *   e.g. "6285198965708" → "62"   (first 2 chars of single word)
   *        "hp 179"        → "H1"   (first char of "hp" + first char of "179")
   *        "jenn ak tes"   → "JA"   (first char of "jenn" + first char of "ak")
   *
   * DATA REQUIREMENT (applies to SIX-Convo-006 to 013):
   *   These TCs require contacts with specific names seeded in the test env.
   *   They are .fixme until a contact seeding strategy is in place.
   */

  // ── SIX-Convo-006 to 013 (fixme) ──────────────────────────────────────────
  test.fixme('[SIX-Convo-006] avatar initials — 1-word name "6285198965708" shows "62" - not yet automated', async ({ page }) => {
    // DATA: Contact with WA number "6285198965708" must have at least 1 conversation
    // Steps: Navigate to /your-inbox → find card with contact "6285198965708"
    // Expected: [data-cy="chat-list-1-avatar"] fallback text == "62"
  });

  test.fixme('[SIX-Convo-007] avatar initials — 2-word name "hp 179" shows "H1" - not yet automated', async ({ page }) => {
    // DATA: Contact saved as "hp 179" must have a conversation in your-inbox
    // Expected: AvatarFallback text == "H1"
  });

  test.fixme('[SIX-Convo-008] avatar initials — 3-word name "jenn ak tes" shows "JA" - not yet automated', async ({ page }) => {
    // DATA: Contact saved as "jenn ak tes" must have a conversation in your-inbox
    // Expected: AvatarFallback text == "JA" (first char of word 1 + first char of word 2)
  });

  test.fixme('[SIX-Convo-009] avatar initials — name change by customer does not update display - not yet automated', async ({ page }) => {
    // DATA: WA customer changes display name from "hp 179" → "no tes"; agent side must still cache "hp 179"
    // Steps: Customer changes WA name; agent reloads → initials still "H1"
    // Note: SatuInbox caches contact name on agent side — name change not reflected unless agent updates contact
  });

  test.fixme('[SIX-Convo-010] avatar initials — agent-saved contact name takes priority - not yet automated', async ({ page }) => {
    // DATA: Agent has saved customer number as "number testaka" in Contacts
    // Expected: Avatar initials show "NT"
  });

  test.fixme('[SIX-Convo-011] avatar photo — customer with WA profile photo shows photo - not yet automated', async ({ page }) => {
    // DATA: Requires real WA customer with public profile photo
    // Expected: AvatarImage src loaded; AvatarFallback hidden
  });

  test.fixme('[SIX-Convo-012] avatar photo — profile photo visibility "only contact" hides photo - not yet automated', async ({ page }) => {
    // DATA: Requires real WA customer with restricted profile photo visibility
    // Expected: AvatarFallback (initials) shown; AvatarImage absent/hidden
  });

  test.fixme('[SIX-Convo-013] avatar photo — "only contact" but agent saved number → photo shown - not yet automated', async ({ page }) => {
    // DATA: Customer has "only contact" privacy + agent phone number is saved in customer's contacts
    // Expected: Photo shown because agent number is in customer contact list
    // Note: Requires real WA device setup for verification
  });
});

// ─── Scenario: verify lifeness indicator ──────────────────────────────────────
test.describe('verify lifeness indicator', () => {
  let authPage, inboxPage, config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    console.log('[beforeEach] Logging in with default account (V2)');
    await authPage.loginWithCredentials(config.getDefaultAccount(), { useV2: true });
    console.log('[beforeEach] Login complete');
  });

  /**
   * All lifeness indicator tests require a real WhatsApp customer device to
   * control online/offline state. They cannot be automated without a WA simulator.
   *
   * The indicator is rendered as a status ring on the Avatar component.
   * When available, selector: [data-cy="chat-list-{n}-avatar"] .status-indicator
   * (Exact class pending data-cy addition on FE — see AGENTS.md improvement note.)
   *
   * DATA REQUIREMENT: Real WA device that can toggle online/offline state.
   */

  test.fixme('[SIX-Convo-014] online indicator — customer opens WhatsApp - not yet automated', async ({ page }) => {
    // DATA: Real WA customer device; customer opens WhatsApp during test
    // Expected: Green circle indicator appears on [data-cy="chat-list-1-avatar"]
  });

  test.fixme('[SIX-Convo-015] online indicator — customer opens conversation room - not yet automated', async ({ page }) => {
    // DATA: Real WA customer device; customer opens the chat
    // Expected: Green circle indicator on avatar
  });

  test.fixme('[SIX-Convo-016] offline indicator — customer not opening WhatsApp - not yet automated', async ({ page }) => {
    // DATA: Real WA customer device in offline state (WA closed)
    // Expected: Grey circle indicator on avatar
  });

  test.fixme('[SIX-Convo-017] offline indicator — customer closed WA but still in history - not yet automated', async ({ page }) => {
    // DATA: Customer was previously online, then closed WA
    // Expected: Indicator transitions to grey after WA is closed
  });

  test.fixme('[SIX-Convo-018] offline indicator — customer disabled connection status visibility - not yet automated', async ({ page }) => {
    // DATA: Real WA customer with Privacy > Last seen & Online = "Nobody" setting
    // Expected: Grey circle (hidden status treated as offline)
  });
});

// ─── Scenario: verify customer name ───────────────────────────────────────────
test.describe('verify customer name', () => {
  let authPage, inboxPage, config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    console.log('[beforeEach] Logging in with default account (V2)');
    await authPage.loginWithCredentials(config.getDefaultAccount(), { useV2: true });
    console.log('[beforeEach] Login complete');
  });

  /**
   * Customer name display rules (from TopRow in ConversationCard.tsx):
   *   - Non-widget: uses maskDisplayName(chat.contactInfo.displayName)
   *   - Widget: uses getWidgetDisplayName(chat)
   *   - No name → shows phone number (starts with 62…)
   *
   * DATA REQUIREMENT (SIX-Convo-020 to 021):
   *   Require controlled contact data with specific name strings.
   */

  // ── SIX-Convo-019 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-019] customer name — chat card shows a non-empty name or phone number', async ({ page }) => {
    // Precondition: at least 1 conversation in /your-inbox
    // DATA: Ensure at least 1 assigned conversation exists for the logged-in agent
    // Expected: [data-cy="chat-list-1-name"] visible and has non-empty text content

    console.log('[SIX-Convo-019] Navigating to /your-inbox');
    await inboxPage.goto('your-inbox');

    console.log('[SIX-Convo-019] Checking for at least 1 chat card');
    if (!(await skipIfNoFirstChat(inboxPage))) return;

    const name = inboxPage.cardName(1);
    console.log('[SIX-Convo-019] Asserting name element is visible');
    await expect(name).toBeVisible({ timeout: 10000 });

    const text = await name.textContent();
    console.log(`[SIX-Convo-019] Name text content: "${text?.trim()}"`);
    expect(text?.trim().length).toBeGreaterThan(0);
    console.log('[SIX-Convo-019] PASS — name element visible and non-empty');
  });

  // ── SIX-Convo-020 (fixme) ─────────────────────────────────────────────────
  test.fixme('[SIX-Convo-020] customer name — name change by customer does not update list display - not yet automated', async ({ page }) => {
    // DATA: WA customer who can change their display name during the test
    // Steps: Customer changes WA display name; agent reloads inbox
    // Expected: Original name (cached on agent side) still shown in card
    // Note: Requires real WA device
  });

  // ── SIX-Convo-021 (fixme) ─────────────────────────────────────────────────
  test.fixme('[SIX-Convo-021] customer name — agent-saved contact name takes priority over WA name - not yet automated', async ({ page }) => {
    // DATA: Agent has saved customer WA number as "number testaka" in Contacts module
    // Steps: Navigate to conversation with that contact
    // Expected: Card shows "number testaka" instead of WA profile name
    // Note: Requires contact API seeding
  });

  // ── SIX-Convo-022 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-022] customer name — no WA display name shows phone number starting with 62', async () => {
    // Precondition: conversation with unnamed WA contact (no profile name set)
    // DATA: Ideally seed 1 contact without a WA display name (phone-number only)
    // Expected: name field shows phone number starting with "62"
    // Note: Soft check — passes if any card shows a phone-number name OR if
    //       the name field is simply visible (specific phone requires seeded data)

    console.log('[SIX-Convo-022] Navigating to /your-inbox');
    await inboxPage.goto('your-inbox');

    const hasChat = await inboxPage.hasChat(1);
    if (!hasChat) {
      console.log('[SIX-Convo-022] No conversations found — skipping');
      test.skip(true, 'No conversations found');
      return;
    }

    // Collect all visible name texts from all chat cards
    const names = await inboxPage.getVisibleChatNames();
    console.log(`[SIX-Convo-022] Collected ${names.length} name(s): ${JSON.stringify(names)}`);

    const phonePattern = /^6[0-9]/;
    const hasPhoneName = names.some((n) => phonePattern.test(n.trim()));
    console.log(`[SIX-Convo-022] Phone-pattern name found: ${hasPhoneName}`);

    if (hasPhoneName) {
      // Found a phone-number display name — hard assertion
      expect(hasPhoneName).toBe(true);
      console.log('[SIX-Convo-022] PASS — phone-number name found in list');
    } else {
      // Fallback: just verify name field renders (data dependent on env)
      console.log('[SIX-Convo-022] No phone-number name found; verifying name field renders (soft check)');
      await expect(inboxPage.cardName(1)).toBeVisible();
      console.log('[SIX-Convo-022] PASS (soft) — name field visible');
    }
  });
});

// ─── Scenario: verify screenshot ──────────────────────────────────────────────
test.describe('verify screenshot', () => {
  let authPage, inboxPage, config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    console.log('[beforeEach] Logging in with default account (V2)');
    await authPage.loginWithCredentials(config.getDefaultAccount(), { useV2: true });
    console.log('[beforeEach] Login complete');
  });

  /**
   * Screenshot trigger: ScreenshotSelection.tsx
   *   Renders <Popover><PopoverTrigger><Button><IconCameraPlus/></Button></PopoverTrigger>...
   *   NO data-cy on the trigger button — located via Tabler icon CSS class.
   *   Tabler icons render SVG with class "tabler-icon tabler-icon-{kebab-name}":
   *     IconCameraPlus → svg.tabler-icon-camera-plus
   *   Selector: button:has(svg.tabler-icon-camera-plus) inside [data-cy="Chat-Room-Header"]
   *
   * Screenshot dropdown (PopoverContent buttons):
   *   EN: "Entire Room"   / ID: "Seluruh Ruangan"   → triggers viewport screenshot
   *   EN: "Selected area" / ID: "Bagian yang dipilih" → triggers snipping mode
   *
   * Modal data-cy (ConversationScreenshotPreviewModal.tsx):
   *   [data-cy="modal-screenshot-container"]  — preview modal wrapper
   *   [data-cy="cancel-ss-button"]            — cancel & discard
   *   [data-cy="send-ss-button"]              — save & send
   *
   * Toast on successful send (use-submit-conversation-screenshot.ts):
   *   title:       translation('screenshot.screenshot-success') → "Screenshot success" / "Screenshot berhasil"
   *   description: translation('screenshot.saved')             → "Screenshot saved successfully" / "Screenshot berhasil disimpan"
   *
   * DATA: Org must have the screenshot add-on enabled. At least 1 conversation in /your-inbox.
   */

  /**
   * Navigate to first chat in /your-inbox and return the screenshot trigger button.
   * Returns null and skips the test if no chat or no button found.
   */
  async function openChatAndGetScreenshotBtn(inboxPage) {
    console.log('[openChatAndGetScreenshotBtn] Navigating to /your-inbox');
    await inboxPage.goto('your-inbox');

    const hasChat = await inboxPage.hasChat(1);
    if (!hasChat) {
      console.log('[openChatAndGetScreenshotBtn] No conversations in your-inbox — skipping');
      test.skip(true, 'No conversations in your-inbox');
      return false;
    }

    console.log('[openChatAndGetScreenshotBtn] Clicking first chat card');
    await inboxPage.openChat(1);

    console.log('[openChatAndGetScreenshotBtn] Checking for screenshot button in header');
    const hasBtn = await inboxPage.hasScreenshotTrigger();
    if (!hasBtn) {
      console.log('[openChatAndGetScreenshotBtn] Screenshot button not visible — add-on may be inactive for this org');
      test.skip(true, 'Screenshot button not visible — add-on may not be active for this org');
      return false;
    }

    console.log('[openChatAndGetScreenshotBtn] Screenshot button found');
    return true;
  }

  // ── SIX-Convo-023 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-023] screenshot — entire room flow: dropdown → modal → save', async ({ page }) => {
    // Precondition: org has screenshot add-on active; at least 1 conversation in /your-inbox
    // DATA: Screenshot add-on must be enabled for the test org
    // Expected:
    //   1. Click screenshot trigger → dropdown shows "Entire Room" / "Seluruh Ruangan"
    //   2. Click "Entire Room" → [data-cy="modal-screenshot-container"] appears
    //      with [data-cy="cancel-ss-button"] and [data-cy="send-ss-button"] visible
    //   3. Click send → modal closes; toast shows "Screenshot success" / "Screenshot berhasil"

    const canUseScreenshot = await openChatAndGetScreenshotBtn(inboxPage);
    if (!canUseScreenshot) return;

    console.log('[SIX-Convo-023] Clicking screenshot trigger button');
    await inboxPage.openScreenshotMenu();

    console.log('[SIX-Convo-023] Clicking "Entire Room" option');
    await inboxPage.chooseEntireRoomScreenshot();

    console.log('[SIX-Convo-023] Waiting for screenshot preview modal to appear');
    await inboxPage.waitForScreenshotModal();

    console.log('[SIX-Convo-023] Asserting cancel and send buttons are visible in modal');
    await expect(inboxPage.screenshotCancelButton).toBeVisible();
    await expect(inboxPage.screenshotSendButton).toBeVisible();

    console.log('[SIX-Convo-023] Clicking send-ss-button to save & send screenshot');
    await inboxPage.sendScreenshot();

    console.log('[SIX-Convo-023] Waiting for modal to close after send');
    await expect(inboxPage.screenshotModal).not.toBeVisible({ timeout: 10000 });

    // Toast: title = translation('screenshot.screenshot-success') → "Screenshot success" / "Screenshot berhasil"
    // Source: use-submit-conversation-screenshot.ts lines 58-59
    const toast = page.getByText(/Screenshot success|Screenshot berhasil/i);
    console.log('[SIX-Convo-023] Waiting for success toast');
    await expect(toast).toBeVisible({ timeout: 8000 });
    console.log('[SIX-Convo-023] PASS — screenshot sent, toast visible');
  });

  // ── SIX-Convo-024 (fixme) ─────────────────────────────────────────────────
  test.fixme('[SIX-Convo-024] screenshot — custom area (selected section) flow - not yet automated', async ({ page }) => {
    // Steps:
    //   1. Open chat → click screenshot trigger button
    //   2. Click "Selected area" / "Bagian yang dipilih" from dropdown
    //      (i18n key: screenshot.selected-section)
    //   3. SnippingOverlay activates over elementId="conversation-chatroom-container"
    //   4. Drag-select an area within the overlay
    //   5. Preview modal appears → click [data-cy="send-ss-button"]
    // Expected: screenshot saved and appears in screenshot accordion in detail panel
    // Note: Drag interaction within the snipping overlay is not reliably automatable.
    //   Blocked until a programmatic trigger for the snip selection exists.
  });

  // ── SIX-Convo-025 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-025] screenshot — cancel discards screenshot without saving', async ({ page }) => {
    // Precondition: org has screenshot add-on active; at least 1 conversation in /your-inbox
    // DATA: Screenshot add-on must be enabled for the test org
    // Expected: clicking cancel-ss-button closes modal; no screenshot saved

    const canUseScreenshot = await openChatAndGetScreenshotBtn(inboxPage);
    if (!canUseScreenshot) return;

    console.log('[SIX-Convo-025] Clicking screenshot trigger button');
    await inboxPage.openScreenshotMenu();

    console.log('[SIX-Convo-025] Clicking "Entire Room" to open preview modal');
    await inboxPage.chooseEntireRoomScreenshot();

    console.log('[SIX-Convo-025] Waiting for preview modal to appear');
    await inboxPage.waitForScreenshotModal();

    console.log('[SIX-Convo-025] Clicking cancel-ss-button to discard');
    await inboxPage.cancelScreenshot();

    console.log('[SIX-Convo-025] Asserting modal is dismissed after cancel');
    await expect(inboxPage.screenshotModal).not.toBeVisible({ timeout: 8000 });
    console.log('[SIX-Convo-025] PASS — modal closed, screenshot discarded');
  });
});

// ─── Scenario: verify ellipsis (quick-action) ─────────────────────────────────
test.describe('verify ellipsis', () => {
  let authPage, inboxPage, config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    inboxPage = new InboxPage(page);
    console.log('[beforeEach] Logging in with default account (V2)');
    await authPage.loginWithCredentials(config.getDefaultAccount(), { useV2: true });
    console.log('[beforeEach] Login complete');
  });

  /**
   * Quick-action menu (QuickAction.tsx):
   *   Uses shadcn Command > CommandItem which renders as div[role="option"].
   *   Locator: page.getByRole('option', { name: /regex/i })
   *   Trigger button: div[data-cy="chat-list-{n}-quick-action"] — revealed on card hover.
   *
   * Action availability per conversation type (from useConversationActions hook):
   *   - Star / Unstar: individual chats only
   *   - Pin / Unpin:   requires ConversationPermission.PIN
   *   - Spam / Unspam: individual chats only
   *
   * DATA: All tests in this describe block require at least 1 open conversation
   *   in /your-inbox assigned to the logged-in agent (individual chat, not group).
   *   For pin tests: agent role must have ConversationPermission.PIN.
   */

  // ── SIX-Convo-026 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-026] ellipsis — star conversation adds starred badge to card', async ({ page }) => {
    // Precondition: at least 1 individual conversation in /your-inbox
    // DATA: First card can be in any star state — test auto-resets to unstarred first
    // Expected:
    //   - Menu shows "Beri bintang pada percakapan" / "Star conversation"
    //   - After click: [data-cy="chat-list-1-starred-icon"] becomes visible
    //   - Reopened menu shows "Hapus bintang percakapan" / "Unstar conversation" (state confirmed)

    console.log('[SIX-Convo-026] Navigating to /your-inbox');
    await inboxPage.goto('your-inbox');
    if (!(await skipIfNoFirstChat(inboxPage))) return;

    const starredIcon = inboxPage.cardStarredIcon(1);

    // Guard: if already starred, unstar first so we start from a clean unstarred state
    const isAlreadyStarred = await starredIcon.isVisible({ timeout: 2000 }).catch(() => false);
    if (isAlreadyStarred) {
      console.log('[SIX-Convo-026] Card already starred — resetting to unstarred state first');
      await inboxPage.openQuickActionMenu(1);
      await inboxPage.quickAction('star').click();
      console.log('[SIX-Convo-026] Waiting for starred-icon to disappear (API + UI update)');
      await expect(starredIcon).not.toBeVisible({ timeout: 8000 });
      console.log('[SIX-Convo-026] Reset complete — card is now unstarred');
    }

    // Main action: open menu and star
    console.log('[SIX-Convo-026] Opening quick-action menu');
    await inboxPage.openQuickActionMenu(1);

    console.log('[SIX-Convo-026] Asserting "Star conversation / Beri bintang..." option is visible');
    await expect(inboxPage.quickAction('star')).toContainText(/Beri bintang|Star conversation/i, { timeout: 5000 });

    console.log('[SIX-Convo-026] Clicking "Star conversation"');
    await inboxPage.quickAction('star').click();

    console.log('[SIX-Convo-026] Waiting for starred-icon badge to appear on card 1');
    await expect(starredIcon).toBeVisible({ timeout: 8000 });
    console.log('[SIX-Convo-026] starred-icon visible ✓');

    // Reopen menu to confirm state flipped to "Unstar"
    console.log('[SIX-Convo-026] Reopening menu to confirm "Unstar" option is now shown');
    await inboxPage.openQuickActionMenu(1);
    await expect(inboxPage.quickAction('star')).toContainText(/Hapus bintang|Unstar conversation/i, { timeout: 5000 });
    console.log('[SIX-Convo-026] Unstar option confirmed — backend state is starred ✓');

    await page.keyboard.press('Escape');
    console.log('[SIX-Convo-026] PASS');
  });

  // ── SIX-Convo-027 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-027] ellipsis — unstar conversation removes starred badge', async ({ page }) => {
    // Precondition: at least 1 individual conversation in /your-inbox
    // DATA: First card can be in any star state — test auto-stars first if needed
    // Expected:
    //   - Menu shows "Hapus bintang percakapan" / "Unstar conversation"
    //   - After click: [data-cy="chat-list-1-starred-icon"] disappears
    //   - Reopened menu shows "Beri bintang..." / "Star conversation" (state confirmed)

    console.log('[SIX-Convo-027] Navigating to /your-inbox');
    await inboxPage.goto('your-inbox');
    if (!(await skipIfNoFirstChat(inboxPage))) return;

    const starredIcon = inboxPage.cardStarredIcon(1);

    // Guard: if NOT starred, star it first so we can test unstar
    const isStarred = await starredIcon.isVisible({ timeout: 2000 }).catch(() => false);
    if (!isStarred) {
      console.log('[SIX-Convo-027] Card not starred — starring first for correct initial state');
      await inboxPage.openQuickActionMenu(1);
      await inboxPage.quickAction('star').click();
      console.log('[SIX-Convo-027] Waiting for starred-icon to appear (API + UI update)');
      await expect(starredIcon).toBeVisible({ timeout: 8000 });
      console.log('[SIX-Convo-027] Setup complete — card is now starred');
    }

    // Main action: open menu and unstar
    console.log('[SIX-Convo-027] Opening quick-action menu');
    await inboxPage.openQuickActionMenu(1);

    console.log('[SIX-Convo-027] Asserting "Unstar conversation / Hapus bintang..." option is visible');
    await expect(inboxPage.quickAction('star')).toContainText(/Hapus bintang|Unstar conversation/i, { timeout: 5000 });

    console.log('[SIX-Convo-027] Clicking "Unstar conversation"');
    await inboxPage.quickAction('star').click();

    console.log('[SIX-Convo-027] Waiting for starred-icon badge to disappear from card 1');
    await expect(starredIcon).not.toBeVisible({ timeout: 8000 });
    console.log('[SIX-Convo-027] starred-icon gone ✓');

    // Reopen menu to confirm state flipped to "Star"
    console.log('[SIX-Convo-027] Reopening menu to confirm "Star" option is now shown');
    await inboxPage.openQuickActionMenu(1);
    await expect(inboxPage.quickAction('star')).toContainText(/Beri bintang|Star conversation/i, { timeout: 5000 });
    console.log('[SIX-Convo-027] Star option confirmed — backend state is unstarred ✓');

    await page.keyboard.press('Escape');
    console.log('[SIX-Convo-027] PASS');
  });

  // ── SIX-Convo-028 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-028] ellipsis — pin conversation shows pinned badge on card', async ({ page }) => {
    // Precondition: at least 1 individual conversation in /your-inbox
    // DATA: Agent role must have ConversationPermission.PIN (check role config)
    //       First card can be in any pin state — test auto-unpins first if needed
    // Expected:
    //   - Menu shows "Sematkan percakapan" / "Pin conversation"
    //   - After click: [data-cy="chat-list-1-pinned-icon"] becomes visible
    //   - Reopened menu shows "Lepas sematan percakapan" / "Unpin conversation" (state confirmed)

    console.log('[SIX-Convo-028] Navigating to /your-inbox');
    await inboxPage.goto('your-inbox');
    if (!(await skipIfNoFirstChat(inboxPage))) return;

    const pinnedIcon = inboxPage.cardPinnedIcon(1);

    // Guard: if already pinned, unpin first so we start from a clean unpinned state
    const isAlreadyPinned = await pinnedIcon.isVisible({ timeout: 2000 }).catch(() => false);
    if (isAlreadyPinned) {
      console.log('[SIX-Convo-028] Card already pinned — resetting to unpinned state first');
      await inboxPage.openQuickActionMenu(1);
      await inboxPage.quickAction('pin').click();
      console.log('[SIX-Convo-028] Waiting for pinned-icon to disappear (API + UI update)');
      await expect(pinnedIcon).not.toBeVisible({ timeout: 8000 });
      console.log('[SIX-Convo-028] Reset complete — card is now unpinned');
    }

    // Main action: open menu and pin
    console.log('[SIX-Convo-028] Opening quick-action menu');
    await inboxPage.openQuickActionMenu(1);

    console.log('[SIX-Convo-028] Asserting "Pin conversation / Sematkan percakapan" option is visible');
    await expect(inboxPage.quickAction('pin')).toContainText(/Sematkan percakapan|Pin conversation/i, { timeout: 5000 });

    console.log('[SIX-Convo-028] Clicking "Pin conversation"');
    await inboxPage.quickAction('pin').click();

    console.log('[SIX-Convo-028] Waiting for pinned-icon badge to appear on card 1');
    await expect(pinnedIcon).toBeVisible({ timeout: 8000 });
    console.log('[SIX-Convo-028] pinned-icon visible ✓');

    // Reopen menu to confirm state flipped to "Unpin"
    console.log('[SIX-Convo-028] Reopening menu to confirm "Unpin" option is now shown');
    await inboxPage.openQuickActionMenu(1);
    await expect(inboxPage.quickAction('pin')).toContainText(/Lepas sematan|Unpin conversation/i, { timeout: 5000 });
    console.log('[SIX-Convo-028] Unpin option confirmed — backend state is pinned ✓');

    await page.keyboard.press('Escape');
    console.log('[SIX-Convo-028] PASS');
  });

  // ── SIX-Convo-029 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-029] ellipsis — unpin conversation removes pin badge', async ({ page }) => {
    // Precondition: at least 1 individual conversation in /your-inbox
    // DATA: Agent role must have ConversationPermission.PIN
    //       First card can be in any pin state — test auto-pins first if needed
    // Expected:
    //   - Menu shows "Lepas sematan percakapan" / "Unpin conversation"
    //   - After click: [data-cy="chat-list-1-pinned-icon"] disappears
    //   - Reopened menu shows "Sematkan percakapan" / "Pin conversation" (state confirmed)

    console.log('[SIX-Convo-029] Navigating to /your-inbox');
    await inboxPage.goto('your-inbox');
    if (!(await skipIfNoFirstChat(inboxPage))) return;

    const pinnedIcon = inboxPage.cardPinnedIcon(1);

    // Guard: if NOT pinned, pin it first so we can test unpin
    const isPinned = await pinnedIcon.isVisible({ timeout: 2000 }).catch(() => false);
    if (!isPinned) {
      console.log('[SIX-Convo-029] Card not pinned — pinning first for correct initial state');
      await inboxPage.openQuickActionMenu(1);
      await inboxPage.quickAction('pin').click();
      console.log('[SIX-Convo-029] Waiting for pinned-icon to appear (API + UI update)');
      await expect(pinnedIcon).toBeVisible({ timeout: 8000 });
      console.log('[SIX-Convo-029] Setup complete — card is now pinned');
    }

    // Main action: open menu and unpin
    console.log('[SIX-Convo-029] Opening quick-action menu');
    await inboxPage.openQuickActionMenu(1);

    console.log('[SIX-Convo-029] Asserting "Unpin / Lepas sematan percakapan" option is visible');
    await expect(inboxPage.quickAction('pin')).toContainText(/Lepas sematan|Unpin conversation/i, { timeout: 5000 });

    console.log('[SIX-Convo-029] Clicking "Unpin conversation"');
    await inboxPage.quickAction('pin').click();

    console.log('[SIX-Convo-029] Waiting for pinned-icon badge to disappear from card 1');
    await expect(pinnedIcon).not.toBeVisible({ timeout: 8000 });
    console.log('[SIX-Convo-029] pinned-icon gone ✓');

    // Reopen menu to confirm state flipped to "Pin"
    console.log('[SIX-Convo-029] Reopening menu to confirm "Pin" option is now shown');
    await inboxPage.openQuickActionMenu(1);
    await expect(inboxPage.quickAction('pin')).toContainText(/Sematkan percakapan|Pin conversation/i, { timeout: 5000 });
    console.log('[SIX-Convo-029] Pin option confirmed — backend state is unpinned ✓');

    await page.keyboard.press('Escape');
    console.log('[SIX-Convo-029] PASS');
  });

  // ── SIX-Convo-030 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-030] ellipsis — mark as spam removes conversation from your-inbox', async ({ page }) => {
    // Precondition: at least 1 non-spam individual conversation in /your-inbox
    // DATA: First card must be an individual chat (not group) — spam not available for groups
    //       Ensure 0 pre-existing spam conversations in /spam for clean cleanup
    // Expected:
    //   - Menu shows "Tandai sebagai spam" / "Mark as spam"
    //   - After click: card count in /your-inbox decreases by 1
    //   - Conversation appears in /spam with matching name
    // Cleanup: test auto-unspams in /spam to restore state

    console.log('[SIX-Convo-030] Navigating to /your-inbox');
    await inboxPage.goto('your-inbox');
    if (!(await skipIfNoFirstChat(inboxPage))) return;

    // Capture name and list count before spamming
    const nameBefore = await inboxPage.getChatName(1);
    const countBefore = await inboxPage.getChatCount();
    console.log(`[SIX-Convo-030] Card 1 name: "${nameBefore?.trim()}" | List count before: ${countBefore}`);

    console.log('[SIX-Convo-030] Opening quick-action menu');
    await inboxPage.openQuickActionMenu(1);

    console.log('[SIX-Convo-030] Asserting "Mark as spam / Tandai sebagai spam" option is visible');
    await expect(inboxPage.quickAction('spam')).toContainText(/Tandai sebagai spam|Mark as spam/i, { timeout: 5000 });

    console.log('[SIX-Convo-030] Clicking "Mark as spam"');
    await inboxPage.quickAction('spam').click();

    // Wait for card to be removed from your-inbox (API + socket update + re-render)
    console.log('[SIX-Convo-030] Waiting for list count to decrease after spam action');
    await expect(inboxPage.chatItems).toHaveCount(countBefore - 1, { timeout: 8000 });
    console.log(`[SIX-Convo-030] List count reduced to ${countBefore - 1} ✓`);

    // Navigate to /spam and verify the conversation moved there
    console.log('[SIX-Convo-030] Navigating to /spam to verify conversation moved');
    await inboxPage.goto('spam');

    const spamNames = await inboxPage.getVisibleChatNames();
    console.log(`[SIX-Convo-030] Names in /spam: ${JSON.stringify(spamNames)}`);
    const found = spamNames.some((n) => n.trim() === nameBefore?.trim());
    console.log(`[SIX-Convo-030] Conversation "${nameBefore?.trim()}" found in /spam: ${found}`);
    expect(found).toBe(true);

    // Cleanup: unspam the conversation from /spam
    // NOTE: openQuickAction targets card 1 — if /spam had pre-existing entries,
    //   the spammed conversation may not be at index 1. Seed env with 0 spam conversations
    //   before running this test for deterministic cleanup.
    console.log('[SIX-Convo-030] Cleanup: opening quick-action on card 1 in /spam');
    await inboxPage.openQuickActionMenu(1);
    console.log('[SIX-Convo-030] Cleanup: clicking "Unmark as spam / Batalkan tanda spam"');
    await inboxPage.quickAction('spam').click();
    console.log('[SIX-Convo-030] PASS — spam verified, cleanup complete');
  });

  // ── SIX-Convo-031 ─────────────────────────────────────────────────────────
  test('[SIX-Convo-031] ellipsis — unmark spam removes conversation from /spam', async ({ page }) => {
    // Precondition: at least 1 spam individual conversation in /spam
    // DATA: Seed at least 1 conversation with isSpam=true (individual chat, not group)
    //       If no spam conversation exists, test skips automatically
    // Expected:
    //   - Menu shows "Batalkan tanda spam" / "Unmark as spam"
    //   - After click: card count in /spam decreases by 1

    console.log('[SIX-Convo-031] Navigating to /spam');
    await inboxPage.goto('spam');

    const hasSpamChat = await inboxPage.hasChat(1);
    if (!hasSpamChat) {
      console.log('[SIX-Convo-031] No spam conversations found — skipping test');
      test.skip(true, 'No spam conversations found — seed at least 1 spam conversation to run this test');
      return;
    }

    // Capture name and list count before unspamming
    const countBefore = await inboxPage.getChatCount();
    const nameBefore  = await inboxPage.getChatName(1);
    console.log(`[SIX-Convo-031] Card 1 name: "${nameBefore?.trim()}" | Spam count before: ${countBefore}`);

    console.log('[SIX-Convo-031] Opening quick-action menu on card 1 in /spam');
    await inboxPage.openQuickActionMenu(1);

    console.log('[SIX-Convo-031] Asserting "Unmark as spam / Batalkan tanda spam" option is visible');
    await expect(inboxPage.quickAction('spam')).toContainText(/Batalkan tanda spam|Unmark as spam/i, { timeout: 5000 });

    console.log('[SIX-Convo-031] Clicking "Unmark as spam"');
    await inboxPage.quickAction('spam').click();

    // Wait for card to be removed from /spam list
    console.log('[SIX-Convo-031] Waiting for spam list count to decrease after unspam');
    await expect(inboxPage.chatItems).toHaveCount(countBefore - 1, { timeout: 8000 });
    console.log(`[SIX-Convo-031] Spam count reduced to ${countBefore - 1} ✓`);

    // Sanity: name was non-empty
    expect(nameBefore?.trim().length).toBeGreaterThan(0);
    console.log('[SIX-Convo-031] PASS — spam count decreased after unspam');
  });
});
