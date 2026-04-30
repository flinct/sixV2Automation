class elementCollector {
  constructor() {
    this.defaultOutputFile = "cypress/fixtures/interactive-elements.json";
    this.interactiveSelectors = [
      "a",
      "button",
      "summary",
      "label",
      'input:not([type="hidden"])',
      "select",
      "textarea",
      "option",
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
      "[tabindex]",
      '[contenteditable="true"]',
    ];
    this.interactiveSelector = this.interactiveSelectors.join(",");
  }

  isInteractiveElement(element) {
    if (element.getAttribute("tabindex") === "-1") {
      return false;
    }

    if (element.matches(this.interactiveSelector)) {
      return true;
    }

    const computedStyle = window.getComputedStyle(element);
    const hasPointerCursor = computedStyle.cursor === "pointer";
    const hasClickHandler = typeof element.onclick === "function";
    const isContentEditable = element.isContentEditable;
    const hasAriaAction =
      element.hasAttribute("aria-expanded") ||
      element.hasAttribute("aria-controls") ||
      element.hasAttribute("aria-haspopup");

    return hasPointerCursor || hasClickHandler || isContentEditable || hasAriaAction;
  }

  normalizeText(value) {
    return value?.replace(/\s+/g, " ").trim() || null;
  }

  buildUniqueCaller(element, index) {
    const dataCy = element.getAttribute("data-cy");
    const id = element.getAttribute("id");
    const name = element.getAttribute("name");
    const ariaLabel = element.getAttribute("aria-label");
    const href = element.getAttribute("href");
    const role = element.getAttribute("role");
    const text = this.normalizeText(element.innerText);
    const tag = element.tagName.toLowerCase();

    if (dataCy) return `data-cy=${dataCy}`;
    if (id) return `id=${id}`;
    if (name) return `name=${name}`;
    if (ariaLabel) return `aria-label=${ariaLabel}`;
    if (href) return `href=${href}`;
    if (role && text) return `${tag}[role=${role}]::${text}`;
    if (text) return `${tag}::${text}`;

    return `${tag}::index=${index}`;
  }

  getSelectorSummary(element) {
    const attributes = [
      "data-cy",
      "id",
      "name",
      "role",
      "type",
      "data-slot",
      "aria-label",
    ];
    const tag = element.tagName.toLowerCase();

    const selector = attributes.reduce((result, attribute) => {
      const value = element.getAttribute(attribute);

      if (!value) {
        return result;
      }

      return `${result}[${attribute}="${value}"]`;
    }, tag);

    return selector;
  }

  getCandidateElements(root) {
    const selectorElements = [...root.querySelectorAll(this.interactiveSelector)];
    const allElements = [...root.querySelectorAll("*")];

    return [...new Set([...selectorElements, ...allElements])];
  }

  mapElement(element, index) {
    return {
      uniqueCaller: this.buildUniqueCaller(element, index),
      dataCy: element.getAttribute("data-cy"),
      id: element.getAttribute("id"),
      name: element.getAttribute("name"),
      tag: element.tagName.toLowerCase(),
      type: element.getAttribute("type"),
      role: element.getAttribute("role"),
      text: this.normalizeText(element.innerText),
      href: element.getAttribute("href"),
      ariaLabel: element.getAttribute("aria-label"),
      selector: this.getSelectorSummary(element),
      index,
    };
  }

  collect(opts = {}) {
    const {
      outputFile = this.defaultOutputFile,
      rootSelector = "body",
      onlyVisible = false,
    } = opts;

    return cy.location("href").then((url) => {
      return cy.get(rootSelector).then(($root) => {
        const elements = this.getCandidateElements($root[0]);
        const uniqueElements = new Map();

        [...elements]
          .filter((element) => this.isInteractiveElement(element))
          .filter((element) => !onlyVisible || Cypress.$(element).is(":visible"))
          .forEach((element, index) => {
            const mappedElement = this.mapElement(element, index);
            const key = mappedElement.uniqueCaller;

            if (uniqueElements.has(key)) {
              return;
            }

            uniqueElements.set(key, mappedElement);
          });

        const payload = {
          collectedAt: new Date().toISOString(),
          url,
          total: uniqueElements.size,
          elements: [...uniqueElements.values()],
        };

        return cy.writeFile(outputFile, payload, { log: false }).then(() => {
          cy.task(
            "log",
            `Collected ${payload.total} interactive elements to ${outputFile}`,
          );
        }).then(() => cy.wrap(payload, { log: false }));
      });
    });
  }
}

export default elementCollector;
