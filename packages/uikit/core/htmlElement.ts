/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class UIKitHTMLElement {
  __internals: {
    underlyingHTMLElement: HTMLElement;
  };

  constructor(htmlElement: HTMLElement) {
    this.__internals = {
      underlyingHTMLElement: htmlElement || document.createElement("div"),
    };

    return this;
  }

  setAttribute(name: string, value: string) {
    this.__internals.underlyingHTMLElement.setAttribute(name, value);
    return this;
  }

  getAttribute(name: string): string | null {
    return this.__internals.underlyingHTMLElement.getAttribute(name);
  }

  removeAttribute(name: string) {
    this.__internals.underlyingHTMLElement.removeAttribute(name);
    return this;
  }

  addClass(name: string) {
    if (!this.__internals.underlyingHTMLElement.classList.contains(name)) {
      this.__internals.underlyingHTMLElement.classList.add(name);
    }

    return this;
  }

  removeClass(name: string) {
    if (this.__internals.underlyingHTMLElement.classList.contains(name)) {
      this.__internals.underlyingHTMLElement.classList.remove(name);
    }

    return this;
  }

  setStyle<StyleName extends keyof CSSStyleDeclaration>(name: StyleName, value: CSSStyleDeclaration[StyleName]) {
    this.__internals.underlyingHTMLElement.style[name] = value;
    return this;
  }

  getStyle<StyleName extends keyof CSSStyleDeclaration>(name: StyleName): CSSStyleDeclaration[StyleName] {
    return this.__internals.underlyingHTMLElement.style[name];
  }

  setStyles(styles: Partial<CSSStyleDeclaration>) {
    Object.keys(styles).forEach((key, _, arr) => {
      // @ts-ignore
      this.__internals.underlyingHTMLElement.style[key] = arr[key];
    });

    return this;
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.__internals.underlyingHTMLElement.addEventListener(type, listener);
    return this;
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.__internals.underlyingHTMLElement.removeEventListener(type, listener);
    return this;
  }
}
