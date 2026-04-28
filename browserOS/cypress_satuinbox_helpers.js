/**
 * Satuinbox Chat Channel Detection & Navigation
 * Cypress Helper Functions & Commands
 * 
 * Gunakan di cypress/support/commands.js
 */

// ============================================
// CYPRESS CUSTOM COMMANDS
// ============================================

/**
 * Click chat berdasarkan contact name dan channel
 * @param {string} contactName - Nama contact yang akan di-click
 * @param {string} channel - Channel: 'whatsapp-web', 'email', 'widget', 'facebook-messenger', 'instagram'
 * 
 * Example:
 * cy.clickChatByChannel('yosep danny', 'whatsapp-web');
 * cy.clickChatByChannel('Dany Christian', 'email');
 * cy.clickChatByChannel('guest-0QXE1F', 'widget');
 */
Cypress.Commands.add('clickChatByChannel', (contactName, channel) => {
  const iconMap = {
    'whatsapp-web': 'tabler-icon-brand-whatsapp',
    'email': 'tabler-icon-mail',
    'widget': 'tabler-icon-messages',
    'facebook-messenger': 'tabler-icon-brand-messenger',
    'instagram': 'tabler-icon-brand-instagram'
  };

  const iconClass = iconMap[channel];

  if (!iconClass) {
    throw new Error(`Unknown channel: ${channel}. Valid channels: ${Object.keys(iconMap).join(', ')}`);
  }

  // Cari conversation item dengan contact name
  cy.contains('div[aria-label*="Conversation"]', contactName)
    .then(($el) => {
      // Validasi bahwa icon channel ada
      cy.wrap($el)
        .parent()
        .find(`svg.${iconClass}`)
        .should('exist');
      
      // Click conversation item
      cy.wrap($el).click();
    });
});

/**
 * Verify bahwa chat yang terbuka adalah dari channel yang benar
 * @param {string} channel - Channel yang diharapkan
 */
Cypress.Commands.add('verifyChatChannel', (channel) => {
  const channelMap = {
    'whatsapp-web': 'Whatsapp Web',
    'whatsapp-api': 'Whatsapp API',
    'whatsapp-group': 'Wa Web Group',
    'email': 'Email',
    'widget': 'Widget',
    'facebook-messenger': 'Facebook Messenger',
    'instagram': 'Instagram',
    'facebook': 'Facebook',
    'telegram': 'Telegram'
  };

  const expectedChannel = channelMap[channel];

  if (!expectedChannel) {
    throw new Error(`Unknown channel: ${channel}`);
  }

  // Check "Sumber Saluran" value
  cy.contains('Sumber Saluran')
    .parent()
    .next()
    .should('contain', expectedChannel);
});

/**
 * Filter chats by channel menggunakan sidebar
 * @param {string} channelLabel - Label button di sidebar (e.g., 'Email', 'Whatsapp Web', 'Widget')
 */
Cypress.Commands.add('filterChatsByChannel', (channelLabel) => {
  cy.contains('button', channelLabel)
    .should('be.visible')
    .click();
  
  // Wait untuk chat list update
  cy.get('div[aria-label*="Conversation"]')
    .should('have.length.greaterThan', 0);
});

/**
 * Get all chats dan info channel-nya
 * Returns array of {contactName, channel, message}
 */
Cypress.Commands.add('getAllChatsWithChannel', () => {
  const channelIconMap = {
    'tabler-icon-brand-whatsapp': 'whatsapp-web',
    'tabler-icon-mail': 'email',
    'tabler-icon-messages': 'widget',
    'tabler-icon-brand-messenger': 'facebook-messenger',
    'tabler-icon-brand-instagram': 'instagram'
  };

  return cy.get('div[aria-label*="Conversation"]').then(($chats) => {
    const chats = [];
    
    $chats.each((_, el) => {
      const $el = Cypress.$(el);
      const contactName = $el.find('div.font-semibold.text-gray-900').text().trim();
      const message = $el.find('span.line-clamp-1.truncate').text().trim();
      
      let channel = 'unknown';
      
      // Find channel dari SVG icon
      for (const [iconClass, channelName] of Object.entries(channelIconMap)) {
        if ($el.find(`svg.${iconClass}`).length > 0) {
          channel = channelName;
          break;
        }
      }
      
      chats.push({
        contactName,
        message,
        channel
      });
    });
    
    return chats;
  });
});

// ============================================
// HELPER UTILITIES (Non-Cypress)
// ============================================

/**
 * Mapping channel identifier
 */
const CHANNEL_ICONS = {
  'tabler-icon-brand-whatsapp': {
    name: 'Whatsapp Web',
    label: 'whatsapp-web',
    color: 'blue'
  },
  'tabler-icon-mail': {
    name: 'Email',
    label: 'email',
    color: 'red'
  },
  'tabler-icon-messages': {
    name: 'Widget',
    label: 'widget',
    color: 'blue'
  },
  'tabler-icon-brand-messenger': {
    name: 'Facebook Messenger',
    label: 'facebook-messenger',
    color: 'blue'
  },
  'tabler-icon-brand-instagram': {
    name: 'Instagram',
    label: 'instagram',
    color: 'purple'
  }
};

const STATUS_ICONS = [
  'tabler-icon-ticket',     // Tiket Dibuat
  'tabler-icon-device-laptop', // Whatsapp indicator
  'tabler-icon-checks',     // Message read
  'tabler-icon-alert-triangle', // Warning
  'tabler-icon-photo'       // Image attachment
];

/**
 * Get channel info dari SVG class name
 */
function getChannelFromIcon(svgClassName) {
  for (const [iconClass, channelInfo] of Object.entries(CHANNEL_ICONS)) {
    if (svgClassName.includes(iconClass)) {
      return channelInfo;
    }
  }
  return { name: 'Unknown', label: 'unknown', color: 'gray' };
}

/**
 * Check apakah icon adalah status icon (bukan channel identifier)
 */
function isStatusIcon(svgClassName) {
  return STATUS_ICONS.some(statusIcon => svgClassName.includes(statusIcon));
}

/**
 * Parse conversation info dari HTML element
 */
function parseConversationElement(htmlElement) {
  const contactName = htmlElement.querySelector('div.font-semibold.text-gray-900')?.textContent?.trim() || 'Unknown';
  const message = htmlElement.querySelector('span.line-clamp-1.truncate')?.textContent?.trim() || '';
  const time = htmlElement.querySelector('span.text-xs.text-gray-500')?.textContent?.trim() || '';
  
  // Get channel dari SVG
  let channel = { name: 'Unknown', label: 'unknown' };
  const svgs = htmlElement.querySelectorAll('svg');
  
  for (const svg of svgs) {
    const svgClass = svg.getAttribute('class') || '';
    if (!isStatusIcon(svgClass)) {
      channel = getChannelFromIcon(svgClass);
      break;
    }
  }
  
  return {
    contactName,
    message,
    time,
    channel
  };
}

// ============================================
// TEST EXAMPLES
// ============================================

/**
 * Example test cases
 */
const testExamples = `
describe('Satuinbox Chat Channel Navigation', () => {
  
  beforeEach(() => {
    cy.visit('https://v2.satuinbox.com/id/conversation/your-inbox');
    cy.wait(1000); // Wait untuk load
  });

  describe('Direct Channel Click', () => {
    
    it('Should click Whatsapp Web chat and verify channel', () => {
      cy.clickChatByChannel('yosep danny', 'whatsapp-web');
      cy.verifyChatChannel('whatsapp-web');
      cy.contains('CV-1787').should('exist'); // Chat ID
    });

    it('Should click Email chat and verify channel', () => {
      cy.clickChatByChannel('Dany Christian', 'email');
      cy.verifyChatChannel('email');
      cy.contains('CV-1797').should('exist');
    });

    it('Should click Widget chat and verify channel', () => {
      cy.clickChatByChannel('guest-0QXE1F', 'widget');
      cy.verifyChatChannel('widget');
      cy.contains('CV-538').should('exist');
    });
  });

  describe('Sidebar Filter', () => {
    
    it('Should filter by Whatsapp Web channel', () => {
      cy.filterChatsByChannel('Whatsapp Web');
      cy.get('div[aria-label*="Conversation"]').should('have.length', 73);
    });

    it('Should filter by Email channel', () => {
      cy.filterChatsByChannel('Email');
      cy.get('div[aria-label*="Conversation"]').should('have.length', 1);
    });

    it('Should filter by Widget channel', () => {
      cy.filterChatsByChannel('Widget');
      cy.get('div[aria-label*="Conversation"]').should('have.length', 1250);
    });
  });

  describe('Get All Chats', () => {
    
    it('Should retrieve all chats dengan channel info', () => {
      cy.getAllChatsWithChannel().then(chats => {
        // Verify structure
        expect(chats).to.be.an('array');
        expect(chats.length).to.equal(14);
        
        // Verify setiap chat punya channel
        chats.forEach(chat => {
          expect(chat).to.have.all.keys('contactName', 'message', 'channel');
          expect(['whatsapp-web', 'email', 'widget', 'unknown']).to.include(chat.channel);
        });
        
        // Count by channel
        const byChannel = chats.reduce((acc, chat) => {
          acc[chat.channel] = (acc[chat.channel] || 0) + 1;
          return acc;
        }, {});
        
        expect(byChannel['whatsapp-web']).to.equal(10);
        expect(byChannel['email']).to.equal(3);
        expect(byChannel['widget']).to.equal(1);
      });
    });
  });

  describe('Error Handling', () => {
    
    it('Should throw error untuk invalid channel', () => {
      expect(() => {
        cy.clickChatByChannel('yosep danny', 'invalid-channel');
      }).to.throw();
    });

    it('Should throw error untuk non-existent contact', () => {
      cy.clickChatByChannel('Non Existent Name', 'whatsapp-web')
        .should('not.exist'); // Will fail sebagai expected
    });
  });
});
`;

// Export untuk usage di file lain jika diperlukan
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CHANNEL_ICONS,
    STATUS_ICONS,
    getChannelFromIcon,
    isStatusIcon,
    parseConversationElement,
    testExamples
  };
}
