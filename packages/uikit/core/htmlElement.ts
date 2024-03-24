/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Component, { ComponentType } from "./component.js";

export default class UIKitHTMLElement extends Component<ComponentType.Container> {
  constructor(htmlElement: HTMLElement) {
    super(ComponentType.Container);

    this.htmlElement = htmlElement;

    return this;
  }

  setAttribute(name: string, value: string) {
    this.htmlElement.setAttribute(name, value);
    return this;
  }

  getAttribute(name: string): string | null {
    return this.htmlElement.getAttribute(name);
  }

  removeAttribute(name: string) {
    this.htmlElement.removeAttribute(name);
    return this;
  }

  addClass(name: string) {
    if (!this.htmlElement.classList.contains(name)) {
      this.htmlElement.classList.add(name);
    }

    return this;
  }

  removeClass(name: string) {
    if (this.htmlElement.classList.contains(name)) {
      this.htmlElement.classList.remove(name);
    }

    return this;
  }

  setStyle<StyleName extends keyof CSSStyleDeclaration>(name: StyleName, value: CSSStyleDeclaration[StyleName]) {
    this.htmlElement.style[name] = value;
    return this;
  }

  getStyle<StyleName extends keyof CSSStyleDeclaration>(name: StyleName): CSSStyleDeclaration[StyleName] {
    return this.htmlElement.style[name];
  }

  setStyles(styles: Partial<CSSStyleDeclaration>) {
    Object.keys(styles).forEach((key, _, arr) => {
      // @ts-ignore
      this.htmlElement.style[key] = arr[key];
    });

    return this;
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.htmlElement.addEventListener(type, listener);
    return this;
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.htmlElement.removeEventListener(type, listener);
    return this;
  }

  render() {
    super.render();

    return this;
  }
}
