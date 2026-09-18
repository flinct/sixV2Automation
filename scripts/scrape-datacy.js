const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  // Login + workspace flow
  await page.goto('https://dev-v2.satuinbox.com/id/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.locator('[data-cy="Keyword-Input"]').fill('cekerayam01');
  await page.locator('[data-cy="Password-Input"]').fill('Asdqwe12@');
  await page.locator('[data-cy="Login-Submit-Button"]').click();
  await page.waitForTimeout(3000);
  if (page.url().includes('/sync')) {
    for (let t = 0; t < 60; t += 2) {
      const btn = page.getByRole('button', { name: /buka workspace/i });
      if (await btn.isVisible().catch(() => false)) { await btn.click(); break; }
      await page.waitForTimeout(2000);
    }
    try { await page.waitForURL(/conversation/, { timeout: 30000 }); } catch {}
  }
  await page.waitForTimeout(5000);

  // Click chat
  const coords = await page.evaluate(() => {
    const el = document.querySelector('[data-cy="chat-list-1"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });
  if (coords) await page.mouse.click(coords.x, coords.y);
  await page.waitForTimeout(10000);

  // Find autogrowing-textarea location
  const textareaInfo = await page.evaluate(() => {
    const el = document.querySelector('[data-cy="autogrowing-textarea"]');
    if (!el) return 'NOT FOUND';
    const rect = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      type: el.type,
      placeholder: el.placeholder,
      className: el.className?.substring?.(0, 100),
      rect: { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) },
      // Walk up to find which section it's in
      ancestors: (() => {
        const chain = [];
        let node = el;
        while (node && node !== document.body) {
          if (node.getAttribute('data-cy')) chain.push(node.getAttribute('data-cy'));
          if (node.id) chain.push(`#${node.id}`);
          node = node.parentElement;
        }
        return chain;
      })(),
    };
  });
  console.log('autogrowing-textarea:', JSON.stringify(textareaInfo, null, 2));

  // Check if there's a textarea inside the room (message input)
  const textareas = await page.evaluate(() => {
    const rc = document.querySelector('#conversation-chatroom-container');
    if (!rc) return [];
    return [...rc.querySelectorAll('textarea, [contenteditable], [role="textbox"]')].map(el => ({
      tag: el.tagName,
      dataCy: el.getAttribute('data-cy'),
      placeholder: el.placeholder,
      role: el.getAttribute('role'),
      contentEditable: el.contentEditable,
    }));
  });
  console.log('\nTextareas/inputs in room:', JSON.stringify(textareas, null, 2));

  // Check if there are ANY buttons in the room
  const roomButtons = await page.evaluate(() => {
    const rc = document.querySelector('#conversation-chatroom-container');
    if (!rc) return [];
    return [...rc.querySelectorAll('button')].map((b, i) => ({
      i,
      text: b.textContent.trim().substring(0, 40),
      dataCy: b.getAttribute('data-cy'),
      ariaLabel: b.getAttribute('aria-label'),
      title: b.title,
    }));
  });
  console.log('\nButtons in room:', JSON.stringify(roomButtons, null, 2));

  // Check if there are any elements with data-cy anywhere on the page
  // (maybe outside the main sections)
  const allDataCy = await page.evaluate(() => {
    return [...document.querySelectorAll('[data-cy]')].map(el => ({
      dataCy: el.getAttribute('data-cy'),
      tag: el.tagName,
      parent: el.parentElement?.getAttribute('data-cy') || el.parentElement?.id || el.parentElement?.tagName,
    }));
  });
  console.log(`\n=== ALL data-cy ON PAGE (${allDataCy.length}) ===`);
  allDataCy.forEach(d => console.log(`${d.dataCy} (${d.tag}) parent=${d.parent}`));

  await browser.close();
})();
