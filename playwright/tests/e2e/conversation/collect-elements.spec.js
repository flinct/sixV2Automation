const fs = require('fs/promises');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { AuthPage } = require('../../../support/pages');
const { getCurrentConfig } = require('../../../support/config');

test.describe('Conversation Interactive Element Collection', () => {
  let authPage;
  let config;

  test.beforeAll(async () => {
    config = getCurrentConfig();
  });

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    const credentials = config.getDefaultAccount();
    await authPage.login(credentials.identifier, credentials.password, { useV2: true });
  });

  test('collect interactive elements', async ({ page }) => {
    await page.goto('/');

    const payload = await page.evaluate(() => {
      const selectors = [
        'a',
        'button',
        'summary',
        'label',
        'input:not([type="hidden"])',
        'select',
        'textarea',
        'option',
        '[role="link"]',
        '[role="button"]',
        '[role="textbox"]',
        '[role="combobox"]',
        '[role="option"]',
        '[role="dialog"]',
        '[role="listbox"]',
        '[role="menuitem"]',
        '[role="tab"]',
        '[role="checkbox"]',
        '[role="radio"]',
        '[role="switch"]',
        '[onclick]',
        '[onmousedown]',
        '[onmouseup]',
        '[aria-expanded]',
        '[aria-controls]',
        '[data-state]',
        '[data-slot]',
        '[tabindex]',
        '[contenteditable="true"]',
      ];

      const normalizeText = (value) => value?.replace(/\s+/g, ' ').trim() || null;
      const buildUniqueCaller = (element, index) => {
        const tag = element.tagName.toLowerCase();
        const dataCy = element.getAttribute('data-cy');
        const id = element.getAttribute('id');
        const name = element.getAttribute('name');
        const ariaLabel = element.getAttribute('aria-label');
        const href = element.getAttribute('href');
        const role = element.getAttribute('role');
        const text = normalizeText(element.innerText);

        if (dataCy) return `data-cy=${dataCy}`;
        if (id) return `id=${id}`;
        if (name) return `name=${name}`;
        if (ariaLabel) return `aria-label=${ariaLabel}`;
        if (href) return `href=${href}`;
        if (role && text) return `${tag}[role=${role}]::${text}`;
        if (text) return `${tag}::${text}`;
        return `${tag}::index=${index}`;
      };

      const getSelectorSummary = (element) => {
        const attributes = ['data-cy', 'id', 'name', 'role', 'type', 'data-slot', 'aria-label'];
        return attributes.reduce((selector, attribute) => {
          const value = element.getAttribute(attribute);
          return value ? `${selector}[${attribute}="${value}"]` : selector;
        }, element.tagName.toLowerCase());
      };

      const isInteractive = (element) => {
        if (element.getAttribute('tabindex') === '-1') return false;
        if (element.matches(selectors.join(','))) return true;
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.cursor === 'pointer' || typeof element.onclick === 'function' || element.isContentEditable;
      };

      const candidates = [...new Set([...document.querySelectorAll(selectors.join(',')), ...document.querySelectorAll('*')])];
      const elements = [];
      const seen = new Set();

      candidates.filter(isInteractive).forEach((element, index) => {
        const uniqueCaller = buildUniqueCaller(element, index);
        if (seen.has(uniqueCaller)) return;
        seen.add(uniqueCaller);
        elements.push({
          uniqueCaller,
          tag: element.tagName.toLowerCase(),
          id: element.getAttribute('id'),
          name: element.getAttribute('name'),
          role: element.getAttribute('role'),
          text: normalizeText(element.innerText),
          selector: getSelectorSummary(element),
          index,
        });
      });

      return {
        collectedAt: new Date().toISOString(),
        url: window.location.href,
        total: elements.length,
        elements,
      };
    });

    const outputPath = path.resolve('playwright/fixtures/interactive-elements.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(payload, null, 2));

    expect(payload.total).toBeGreaterThan(0);
  });
});
