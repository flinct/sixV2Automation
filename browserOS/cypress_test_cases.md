# 📋 Cypress Automation Testing - Halaman Conversation (Satuinbox)

## 🎯 Total Test Cases: 45+

Berikut adalah daftar lengkap Cypress automation testing yang bisa dibuat untuk halaman conversation Satuinbox:

---

## **SECTION 1: SIDEBAR NAVIGATION (5 Test Cases)**

### 1. Test Sidebar Navigation Links
- Verify semua navigation links di sidebar dapat diklik
- Check transisi antar halaman utama (Dashboard, Settings, dll)

### 2. Test Notification Badge Alt+T
- Verify notification region dapat diakses via keyboard shortcut Alt+T
- Check notification count/status

### 3. Test User Profile Button
- Click user profile button di sidebar
- Verify profile menu/dropdown muncul

### 4. Test Sidebar Collapse/Expand
- Verify sidebar dapat di-collapse dan expand
- Check responsive behavior pada mobile

### 5. Test Logo Navigation
- Click Satuinbox logo
- Verify redirect ke home/dashboard

---

## **SECTION 2: LEFT SIDEBAR - INBOX FILTERS (12 Test Cases)**

### 6. Test "Kotak Pesan Anda" Filter
- Click "Kotak Pesan Anda" button (11 messages)
- Verify conversation list berisi pesan dari kotak pribadi
- Verify count badge menampilkan "11"

### 7. Test "Belum Ditugaskan" Filter
- Click "Belum Ditugaskan" button (1117 messages)
- Verify hanya unassigned conversations yang ditampilkan
- Verify count badge menampilkan "1117"

### 8. Test "Semua" Filter
- Click "Semua" button (1324 messages)
- Verify semua conversations ditampilkan
- Verify count badge menampilkan "1324"

### 9. Test "Spam" Filter
- Click "Spam" button (0 messages)
- Verify empty state ketika tidak ada spam
- Verify count badge menampilkan "0"

### 10. Test "Berbintang" Filter
- Click "Berbintang" button (0 messages)
- Verify empty state ketika tidak ada starred messages
- Verify count badge menampilkan "0"

### 11. Test "Folder Sampah" Filter
- Click "Folder Sampah" button (6 messages)
- Verify hanya deleted conversations yang ditampilkan
- Verify count badge menampilkan "6"

### 12. Test Filter Button States
- Verify active filter button memiliki visual distinction
- Verify filter tidak saling conflict
- Verify dapat beralih antar filter dengan smooth

### 13. Test Filter Persistence
- Ganti filter
- Refresh halaman
- Verify filter tetap aktif

### 14. Test Filter with Search
- Apply filter tertentu
- Gunakan search functionality
- Verify search results filtered sesuai kondisi

### 15. Test Multiple Conversations in Filter
- Click "Kotak Pesan Anda" filter
- Scroll melalui conversation list
- Verify dapat load lebih banyak conversations (infinite scroll/pagination)

### 16. Test Filter Counter Updates
- Buka conversation
- Perform action (reply, assign, dll)
- Verify counter di filter button update secara real-time

### 17. Test Filter Accessibility
- Tab melalui semua filter buttons
- Verify focus indicators
- Test dengan screen reader

---

## **SECTION 3: SALURAN (CHANNELS) SECTION (9 Test Cases)**

### 18. Test Saluran Section Collapse/Expand
- Click "Saluran" button untuk collapse/expand section
- Verify icon mengubah direction
- Verify channels list tersembunyi/ditampilkan

### 19. Test "Email" Channel Filter
- Click "Email" channel (1 message)
- Verify conversations dari email source ditampilkan
- Verify count badge menampilkan "1"

### 20. Test "Facebook" Channel Filter
- Click "Facebook" channel (0 messages)
- Verify hanya Facebook conversations
- Verify count badge menampilkan "0"

### 21. Test "Whatsapp Web" Channel Filter
- Click "Whatsapp Web" channel (73 messages)
- Verify conversations dari WhatsApp source
- Verify count badge menampilkan "73"

### 22. Test "Widget" Channel Filter
- Click "Widget" channel (1250 messages)
- Verify Widget conversations
- Verify count badge menampilkan "1250"

### 23. Test All Channels Display
- Verify semua channel terendus (Email, Facebook, FB Messenger, Instagram, Telegram, WhatsApp, Widget, dll)
- Verify setiap channel memiliki icon dan count badge
- Verify dapat scroll melalui channels jika banyak

### 24. Test Channel Icons Display
- Verify setiap channel memiliki icon yang sesuai
- Check icon quality/resolution

### 25. Test Channel Selection State
- Click channel tertentu
- Verify visual state berubah (highlight/active state)
- Verify dapat beralih antar channel

### 26. Test Channel Count Updates
- Buka channel
- Perform action
- Verify count badge update real-time

---

## **SECTION 4: KOTAK MASUK TIM (TEAM INBOXES) SECTION (10 Test Cases)**

### 27. Test Team Inboxes Section Collapse/Expand
- Click "Kotak Masuk Tim" button
- Verify section collapse/expand
- Verify expand button states

### 28. Test Add Team Button
- Click "+" button di "Kotak Masuk Tim"
- Verify dialog/form untuk add team muncul
- Verify dapat input team name

### 29. Test Team List Display
- Verify semua teams ditampilkan:
  - nomor 47210618 (6)
  - test (0)
  - test team tanpa channel (0)
  - hp 111 (7)
  - Tim 0622 (12)
  - Complain (231)
  - Hayoh kumaha (250)
  - dll (total 30+ teams)

### 30. Test Team Selection
- Click team tertentu (e.g., "Complain" - 231 messages)
- Verify conversations dari team ditampilkan
- Verify count badge menampilkan "231"

### 31. Test Team Icons/Emojis
- Verify setiap team memiliki emoji/icon
- Check emoji rendering correctly
- Verify emoji dapat berubah

### 32. Test Team Count Badge
- Verify setiap team menampilkan correct message count
- Verify count update when new message dalam team
- Verify count include/exclude internal messages sesuai logic

### 33. Test Team Scroll
- Scroll dalam team list
- Verify dapat load lebih banyak teams
- Verify scroll smooth tanpa lag

### 34. Test Team with Zero Messages
- Click team dengan count "0" (e.g., "test")
- Verify empty state displayed
- Verify dapat send message ke team

### 35. Test Team with Large Count
- Click team dengan banyak messages (e.g., "Widget" - 1250)
- Verify dapat handle large list
- Verify pagination/infinite scroll works

### 36. Test Team Actions Menu
- Right-click team atau click context menu button
- Verify menu options muncul (Edit, Delete, Archive, dll)
- Verify dapat perform actions

---

## **SECTION 5: MAIN CONVERSATION LIST (8 Test Cases)**

### 37. Test Conversation List Display
- Verify conversations ditampilkan dalam list
- Check conversation item contains: avatar, name, date, preview, badges
- Verify correct number of conversations ditampilkan initially

### 38. Test Conversation Item Click
- Click conversation item (e.g., "yosep danny")
- Verify conversation detail panel opens
- Verify correct conversation content ditampilkan
- Verify left panel list items tetap visible

### 39. Test Conversation Avatar/Initials
- Verify conversation dengan user menampilkan avatar atau initials (YD, DC, G, dll)
- Verify avatar correct user
- Verify ticket icon menampilkan untuk ticket conversations

### 40. Test Conversation Date Display
- Verify conversation menampilkan date (Jumat, Rabu, 15/04/26, dll)
- Verify date format consistent
- Verify relative dates (Jumat) untuk recent, absolute dates untuk older

### 41. Test Conversation Preview Text
- Verify preview text ditampilkan (e.g., "halo", "ayamyamymayma", "Re: testing 2")
- Verify preview text truncated jika terlalu panjang
- Verify preview dapat multi-line

### 42. Test Conversation Status Badges
- Verify "Tiket Dibuat" badge untuk ticket conversations
- Verify read/unread indicators (checkmark icons)
- Verify priority/status badges

### 43. Test Conversation List Infinite Scroll
- Scroll ke bawah dalam conversation list
- Verify dapat load lebih banyak conversations
- Verify tidak ada duplicate items saat load more

### 44. Test Conversation Hover State
- Hover di conversation item
- Verify visual highlight
- Verify additional actions muncul (star, delete, dll)

---

## **SECTION 6: HEADER & FILTERS (8 Test Cases)**

### 45. Test Header Title
- Verify "Kotak Pesan Anda" title ditampilkan
- Verify title update sesuai selected section

### 46. Test Search Toggle Button
- Click "Alihkan pencarian" button
- Verify search input muncul
- Verify dapat type search query

### 47. Test Conversation Count Dropdown "14 Terbuka"
- Click "14 Terbuka" dropdown
- Verify dropdown menu muncul
- Verify dapat filter conversations berdasarkan status

### 48. Test "Semua" Filter Dropdown
- Click "Semua" dropdown
- Verify options ditampilkan
- Verify dapat select different filter option

### 49. Test "Terbaru" Sort Dropdown
- Click "Terbaru" dropdown
- Verify sort options (Terbaru, Terlama, etc.)
- Verify conversation list re-sort sesuai pilihan

### 50. Test Layout & Visibility Button
- Click "Tata Letak dan Visibilitas" button
- Verify layout options menu muncul
- Verify dapat customize column visibility

### 51. Test Advanced Filter Button
- Click "Filter Lanjutan" button
- Verify advanced filter panel opens
- Verify dapat set multiple filter criteria

### 52. Test Filter Interaction
- Set multiple filters
- Verify conversation list update accordingly
- Verify filters dapat di-clear

---

## **ADDITIONAL TEST CASES (5+ Test Cases)**

### 53. Test Responsive Design
- Test pada berbagai screen sizes (mobile, tablet, desktop)
- Verify layout adapt correctly
- Verify touch interactions work pada mobile

### 54. Test Performance
- Load conversation list dengan banyak items
- Verify tidak ada lag/jank
- Check browser memory usage

### 55. Test Accessibility
- Tab navigation melalui semua interactive elements
- Test dengan keyboard shortcuts
- Test dengan screen reader

### 56. Test Real-time Updates
- Open conversation list di 2 browser tabs
- Send message di tab lain
- Verify conversation list update di tab pertama
- Verify count badges update

### 57. Test Error Handling
- Simulate network error
- Verify error message ditampilkan
- Verify retry button available
- Verify dapat recover gracefully

---

## 📊 SUMMARY

| Category | Count |
|----------|-------|
| Sidebar Navigation | 5 |
| Inbox Filters | 12 |
| Channels (Saluran) | 9 |
| Team Inboxes | 10 |
| Conversation List | 8 |
| Headers & Filters | 8 |
| Additional Tests | 5+ |
| **TOTAL** | **57+** |

---

## 🛠️ Test Implementation Tips

### Framework & Tools
- **Framework**: Cypress
- **Language**: JavaScript/TypeScript
- **Dependencies**: cypress, cypress-plugin-api, etc.

### Page Objects Pattern
```javascript
// conversationPage.js
export class ConversationPage {
  // Sidebar
  getLogoLink() { return cy.get('[class*="Logo"]') }
  getNotificationBtn() { return cy.get('[aria-label*="Notifications"]') }
  
  // Filters
  getInboxFilter() { return cy.contains('button', 'Kotak Pesan Anda') }
  getUnassignedFilter() { return cy.contains('button', 'Belum Ditugaskan') }
  
  // Channels
  getEmailChannel() { return cy.contains('button', 'Email') }
  getWhatsappChannel() { return cy.contains('button', 'Whatsapp Web') }
  
  // Teams
  getTeamItem(teamName) { return cy.contains('button', teamName) }
  
  // Conversations
  getConversationItem(name) { return cy.contains(name) }
  getConversationList() { return cy.get('[role="generic"]').contains('Conversation') }
}
```

### Test Structure Example
```javascript
describe('Conversation Page - Sidebar Navigation', () => {
  beforeEach(() => {
    cy.visit('https://v2.example.test/id/conversation/your-inbox')
    cy.wait(2000)
  })

  it('should display sidebar navigation', () => {
    cy.get('[class*="Sidebar"]').should('be.visible')
  })

  it('should click inbox filter', () => {
    cy.contains('button', 'Kotak Pesan Anda').click()
    cy.contains('Kotak Pesan Anda').should('exist')
  })
})
```

### Selectors to Use
- Class-based selectors: `[class*="ConversationSidebar"]`
- ARIA selectors: `[role="button"][aria-label*="Notifications"]`
- Text-based: `cy.contains('button', 'Kotak Pesan Anda')`
- Data-attributes: `[data-testid="inbox-filter"]` (jika available)

---

## 🚀 Next Steps

1. **Setup Cypress Project**
   ```bash
   npm install cypress --save-dev
   npx cypress open
   ```

2. **Create Test Files**
   - `cypress/e2e/sidebar.cy.js`
   - `cypress/e2e/filters.cy.js`
   - `cypress/e2e/channels.cy.js`
   - `cypress/e2e/conversations.cy.js`

3. **Run Tests**
   ```bash
   npx cypress run
   # or
   npx cypress open # for interactive mode
   ```

4. **Generate Reports**
   - Enable mochawesome for HTML reports
   - Setup CI/CD pipeline

---

**Last Updated**: 2025
**Halaman**: Satuinbox Conversation (Your Inbox)
**URL**: https://v2.example.test/id/conversation/your-inbox
