// Sidebar Navigation Selectors - Satuinbox
// Generated from: data-cy="Sidebar-Navigation"

export const sidebar = {
  // Main sidebar container
  container: '[data-cy="Sidebar-Navigation"]',
  navigationList: '[data-cy="Sidebar-Navigation-List"]',

  // Main navigation buttons (6 items)
  navButtons: {
    // 1. Inbox/Conversation - Currently active (blue)
    inbox: {
      selector: '[data-cy="Sidebar-Navigation-List"] a[href="/conversation"] button',
      icon: '.tabler-icon-inbox',
      href: '/conversation',
    },
    
    // 2. Ticketing
    ticketing: {
      selector: '[data-cy="Sidebar-Navigation-List"] a[href="/ticketing"] button',
      icon: '.tabler-icon-ticket',
      href: '/ticketing',
    },
    
    // 3. Broadcast
    broadcast: {
      selector: '[data-cy="Sidebar-Navigation-List"] a[href="/broadcast/messages"] button',
      icon: '.tabler-icon-speakerphone',
      href: '/broadcast/messages',
    },
    
    // 4. Statistic/Analytics
    statistic: {
      selector: '[data-cy="Sidebar-Navigation-List"] a[href="/statistic"] button',
      icon: '.tabler-icon-chart-bar',
      href: '/statistic',
    },
    
    // 5. Contacts
    contacts: {
      selector: '[data-cy="Sidebar-Navigation-List"] a[href="/contacts"] button',
      icon: '.tabler-icon-address-book',
      href: '/contacts',
    },
    
    // 6. Leads
    leads: {
      selector: '[data-cy="Sidebar-Navigation-List"] a[href="/leads"] button',
      icon: '.tabler-icon-devices-dollar',
      href: '/leads',
    },
  },

  // Bottom action buttons (2 items)
  actionButtons: {
    // 7. Notifications
    notifications: {
      selector: '[data-cy="Sidebar-Navigation"] a[href="/notification"] button',
      icon: '.tabler-icon-bell',
      href: '/notification',
      badge: '[data-cy="Sidebar-Navigation"] a[href="/notification"] button .relative', // for badge indicator
    },
    
    // 8. Settings
    settings: {
      selector: '[data-cy="Sidebar-Navigation"] a[href="/settings/organization/general"] button',
      icon: '.tabler-icon-settings',
      href: '/settings/organization/general',
    },
  },

  // 9. User Profile (Avatar) - More specific selector
  userProfile: {
    // Unique: only user profile has 'tabler-icon-user-filled' inside
    selector: '[data-cy="Sidebar-Navigation"] [aria-haspopup="dialog"]:has(.tabler-icon-user-filled)',
    // Alternative: combine sidebar + cursor-pointer class
    selectorAlt: '[data-cy="Sidebar-Navigation"] .relative.cursor-pointer[aria-haspopup="dialog"]',
    // Most specific: sidebar > div wrapper that contains the avatar
    selectorStrict: '[data-cy="Sidebar-Navigation"] > div > [aria-haspopup="dialog"]',
    avatar: '[data-cy="Sidebar-Navigation"] .rounded-full.bg-slate-500',
    statusIndicator: '[data-cy="Sidebar-Navigation"] .bg-green-500', // Online status dot
    userIcon: '[data-cy="Sidebar-Navigation"] .tabler-icon-user-filled',
  },

  // Logo
  logo: '[data-cy="Satuinbox-Logo"]',
};

// Alternative: Simple flat selectors for quick use
export const sidebarButtons = {
  inbox: '[data-cy="Sidebar-Navigation-List"] a[href="/conversation"] button',
  ticketing: '[data-cy="Sidebar-Navigation-List"] a[href="/ticketing"] button',
  broadcast: '[data-cy="Sidebar-Navigation-List"] a[href="/broadcast/messages"] button',
  statistic: '[data-cy="Sidebar-Navigation-List"] a[href="/statistic"] button',
  contacts: '[data-cy="Sidebar-Navigation-List"] a[href="/contacts"] button',
  leads: '[data-cy="Sidebar-Navigation-List"] a[href="/leads"] button',
  notifications: '[data-cy="Sidebar-Navigation"] a[href="/notification"] button',
  settings: '[data-cy="Sidebar-Navigation"] a[href="/settings/organization/general"] button',
  // User Profile - updated with unique selector
  userProfile: '[data-cy="Sidebar-Navigation"] [aria-haspopup="dialog"]:has(.tabler-icon-user-filled)',
};

// ==========================================
// TOTAL SIDEBAR ELEMENTS IN CONVERSATION VIEW
// ==========================================
// Main Sidebar (Navigation): 9 elements (this file)
// Conversation Sidebar: 58+ elements (see conversation-sidebar.js)
//   - Filters: 6 buttons
//   - Channel buttons: 10 buttons
//   - Team Inbox buttons: 34 buttons (dynamic)
//   - Toolbar: 6 buttons
//   - Collapsible headers: 2 sections
//
// Import conversation sidebar separately:
// import { conversationSidebar } from './conversation-sidebar';

// Usage examples:
// cy.get(sidebarButtons.inbox).click();
// cy.get(sidebarButtons.ticketing).should('be.visible');
// cy.get(sidebar.userProfile.avatar).should('have.class', 'bg-slate-500');
