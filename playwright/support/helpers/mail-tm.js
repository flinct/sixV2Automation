// Mail.tm helper for Playwright tests
// Provides functions to create temporary email accounts and fetch verification links

class MailTmHelper {
  constructor() {
    this.apiBase = 'https://api.mail.tm';
  }

  async getDomains() {
    const response = await fetch(`${this.apiBase}/domains`);
    if (!response.ok) {
      throw new Error(`Failed to fetch domains: ${response.status}`);
    }
    const json = await response.json();
    return json['hydra:member'].map(d => d.domain);
  }

  async createAccount(address, password) {
    let lastError = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      const response = await fetch(`${this.apiBase}/accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, password })
      });
      if (response.ok) {
        return await response.json();
      }
      if (response.status === 429) {
        lastError = new Error(`Failed to create account (rate limited): ${response.status}`);
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 5000 * attempt));
        continue;
      }
      throw new Error(`Failed to create account: ${response.status} ${await response.text()}`);
    }
    throw lastError;
  }

  async getToken(address, password) {
    const response = await fetch(`${this.apiBase}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address, password })
    });
    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.status} ${await response.text()}`);
    }
    const json = await response.json();
    return json.token;
  }

  async getMessages(token) {
    const response = await fetch(`${this.apiBase}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status} ${await response.text()}`);
    }
    const json = await response.json();
    return json['hydra:member'];
  }

  async getMessageById(token, messageId) {
    const response = await fetch(`${this.apiBase}/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch message: ${response.status} ${await response.text()}`);
    }
    return await response.json();
  }

  /**
   * Extract verification link from email message
   * Looks for a verification link in the configured target application.
   * @param {Object} message The email message object from mail.tm API
   * @returns {string|null} verification URL or null if not found
   */
  extractVerificationLink(message) {
    if (!message) return null;
    // Get HTML content - mail.tm returns html as an array: html[0] has the content
    const htmlContent = message.html?.[0];
    if (!htmlContent) return null;
    
    // Find all URLs in the HTML
    const links = htmlContent.match(/https:[^\s"']+/g);
    if (!links || links.length === 0) return null;
    
    // Decode HTML entities and find the verification link
    const decodedLinks = links.map((link) =>
      decodeURIComponent(
        link.replace(/&#x3D;/g, '=').replace(/&amp;/g, '&'),
      ),
    );
    
    const verificationMarker = process.env.VERIFICATION_URL_CONTAINS || '/verification?token=';
    const verificationUrl = decodedLinks.find((link) => link.includes(verificationMarker));
    
    return verificationUrl || null;
  }

   /**
    * Wait for a new email to arrive in the inbox
    * @param {string} token JWT token for authentication
    * @param {number} maxRetries maximum number of attempts
    * @param {number} delayMs delay between attempts in milliseconds
    * @returns {Promise<Object>} the first message object
    */
   async waitForNewMessage(token, maxRetries = 20, delayMs = 3000) {
     for (let i = 0; i < maxRetries; i++) {
       const messages = await this.getMessages(token);
       if (messages.length > 0) {
         return messages[0];
       }
       await new Promise(resolve => setTimeout(resolve, delayMs));
     }
     throw new Error('No email received after waiting');
   }
}

module.exports = { MailTmHelper };
