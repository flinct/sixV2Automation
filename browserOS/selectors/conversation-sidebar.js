// Conversation Sidebar Selectors - Satuinbox
// aria-label="Conversation Sidebar Navigation"
// data-cy="Conversation-Sidebar-Navigation"

export const conversationSidebar = {
  // Sidebar container
  container: '[data-cy="Conversation-Sidebar-Navigation"]',
  ariaLabel: '[aria-label="Conversation Sidebar Navigation"]',

  // Main heading
  heading: {
    inbox: '[data-cy="Conversation-Sidebar-Navigation"] h1:contains("Inbox")',
    currentView: '[data-cy="Conversation-Sidebar-Navigation"] > div:last-child > h1',
  },

  // ==========================================
  // 1. FILTER BUTTONS (6 items)
  // ==========================================
  filters: {
    container: '[data-cy="Conversation-Sidebar-Navigation"] > div:first-child > div',
    
    // 1.1 Kotak Pesan Anda (13)
    myInbox: {
      selector: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Kotak Pesan Anda"))',
      text: 'Kotak Pesan Anda',
      count: '13',
    },
    
    // 1.2 Belum Ditugaskan (1117)
    unassigned: {
      selector: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Belum Ditugaskan"))',
      text: 'Belum Ditugaskan',
      count: '1117',
    },
    
    // 1.3 Semua (1324)
    all: {
      selector: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Semua")):first',
      text: 'Semua',
      count: '1324',
    },
    
    // 1.4 Spam (0)
    spam: {
      selector: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Spam"))',
      text: 'Spam',
      count: '0',
    },
    
    // 1.5 Berbintang (0)
    starred: {
      selector: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Berbintang"))',
      text: 'Berbintang',
      count: '0',
    },
    
    // 1.6 Folder Sampah (6)
    trash: {
      selector: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Folder Sampah"))',
      text: 'Folder Sampah',
      count: '6',
    },
  },

  // ==========================================
  // 2. COLLAPSIBLE SECTIONS (2 headers)
  // ==========================================
  sections: {
    // 2.1 Saluran (Channels) - Expanded
    channels: {
      header: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Saluran"))',
      region: '[data-cy="Conversation-Sidebar-Navigation"] h3:contains("Saluran") + div region',
      content: '[data-cy="Conversation-Sidebar-Navigation"] [id^="radix-"][id$="-h"]',
      // Channel buttons (10 items)
      items: {
        email: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Email")',
        facebook: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Facebook 0")',
        facebookMessenger: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Facebook Messenger")',
        instagram: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Instagram 0")',
        igComment: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Ig Comment")',
        telegram: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Telegram 0")',
        whatsappApi: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Whatsapp Api")',
        whatsappWeb: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Whatsapp Web")',
        waWebGroup: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Wa Web Group")',
        widget: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Widget")',
      }
    },
    
    // 2.2 Kotak Masuk Tim (Team Inbox) - Expanded
    teamInbox: {
      header: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Kotak Masuk Tim"))',
      region: '[data-cy="Conversation-Sidebar-Navigation"] h3:contains("Kotak Masuk Tim") + div region',
      // Team items are dynamic - use index or contains
      itemByIndex: (index) => `[data-cy="Conversation-Sidebar-Navigation"] h3:contains("Kotak Masuk Tim") ~ div button:nth-child(${index})`,
    }
  },

  // ==========================================
  // 3. TOOLBAR / FILTER DROPDOWNS (6 items)
  // ==========================================
  toolbar: {
    // Button: Alihkan pencarian (Toggle search)
    toggleSearch: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Alihkan pencarian")',
    
    // Dropdown: Status (15 Terbuka)
    statusFilter: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Terbuka")', // "15 Terbuka"
    
    // Dropdown: Assignment (Semua)
    assignmentFilter: '[data-cy="Conversation-Sidebar-Navigation"] > div:last-child > button:contains("Semua")',
    
    // Dropdown: Sort (Terbaru)
    sortFilter: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Terbaru")',
    
    // Dropdown: Layout (Tata Letak dan Visibilitas)
    layoutToggle: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Tata Letak")',
    
    // Dropdown: Advanced Filter (Filter Lanjutan)
    advancedFilter: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Filter Lanjutan")',
  },

  // ==========================================
  // 4. CONVERSATION LIST (clickable items)
  // ==========================================
  conversationList: {
    container: '[data-cy="Conversation-Sidebar-Navigation"] [class*="conversation"]:parent',
    // First conversation
    firstItem: '[data-cy="Conversation-Sidebar-Navigation"] [onclick]',
    // By sender name (dynamic)
    bySender: (name) => `[data-cy="Conversation-Sidebar-Navigation"] [onclick]:contains("${name}")`,
    // Checkbox selector
    checkbox: '[data-cy="Conversation-Sidebar-Navigation"] input[type="checkbox"]',
  }
};

// ==========================================
// FLAT OBJECT - Quick Access
// ==========================================
export const conversationSidebarButtons = {
  // Filters
  myInbox: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Kotak Pesan Anda"))',
  unassigned: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Belum Ditugaskan"))',
  all: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Semua")):first',
  spam: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Spam"))',
  starred: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Berbintang"))',
  trash: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Folder Sampah"))',
  
  // Sections
  channelsHeader: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Saluran"))',
  teamInboxHeader: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Kotak Masuk Tim"))',
  
  // Channels
  email: '[data-cy="Conversation-Sidebar-Navigation"] button:has(p:contains("Email")):first',
  facebook: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Facebook"):not(:contains("Messenger"))',
  facebookMessenger: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Facebook Messenger")',
  instagram: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Instagram")',
  igComment: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Ig Comment")',
  telegram: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Telegram")',
  whatsappApi: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Whatsapp Api")',
  whatsappWeb: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Whatsapp Web")',
  waWebGroup: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Wa Web Group")',
  widget: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Widget")',
  
  // Toolbar
  toggleSearch: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Alihkan pencarian")',
  statusFilter: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Terbuka")',
  assignmentFilter: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Semua")',
  sortFilter: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Terbaru")',
  layoutToggle: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Tata Letak")',
  advancedFilter: '[data-cy="Conversation-Sidebar-Navigation"] button:contains("Filter Lanjutan")',
};

// ==========================================
// USAGE EXAMPLES
// ==========================================
// cy.get(conversationSidebar.filters.myInbox.selector).click();
// cy.get(conversationSidebar.sections.channels.items.email).click();
// cy.get(conversationSidebar.toolbar.advancedFilter).click();
