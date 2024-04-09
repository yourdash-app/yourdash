/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import { Merge } from "type-fest";
import { ComponentType } from "./component/componentType.js";
import { ContainerComponentInternals } from "./component/containerComponent.js";
import { AnyComponent, AnyComponentOrHTMLElement } from "./component/type.js";
import { propagateTreeContext } from "./treeContext.js";

type OverrideProperties<
  TOriginal,
  // This first bit where we use `Partial` is to enable autocomplete
  // and the second bit with the mapped type is what enforces that we don't try
  // to override properties that doesn't exist in the original type.
  TOverride extends Partial<Record<keyof TOriginal, unknown>> & {
    [Key in keyof TOverride]: Key extends keyof TOriginal ? TOverride[Key] : never;
  },
> = Merge<TOriginal, TOverride>;

export default class UKHTMLElement<HTMLRawElement extends HTMLElement = HTMLElement> {
  __internals: OverrideProperties<ContainerComponentInternals, { children: (AnyComponent | UKHTMLElement)[] }>;
  rawHtmlElement: HTMLRawElement;

  constructor(htmlElement: HTMLRawElement, props?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      children: [],
      componentType: ComponentType.HTMLElement,
      isInitialized: false,
      slots: [],
    };

    if (props) {
      if (props.debugId) this.__internals.debugId = props.debugId;
    }

    this.rawHtmlElement = htmlElement;

    return this;
  }

  $(cb: (component: this) => void) {
    cb(this);
    return this;
  }

  setAttribute(name: string, value: string) {
    this.rawHtmlElement.setAttribute(name, value);
    return this;
  }

  getAttribute(name: string): string | null {
    return this.rawHtmlElement.getAttribute(name);
  }

  removeAttribute(name: string) {
    this.rawHtmlElement.removeAttribute(name);
    return this;
  }

  addClass(name: string) {
    if (!this.rawHtmlElement.classList.contains(name)) {
      this.rawHtmlElement.classList.add(name);
    }

    return this;
  }

  addClasses(name: string[]) {
    name.forEach((n: string) => {
      if (!this.rawHtmlElement.classList.contains(n)) this.addClass(n);
    });

    return this;
  }

  removeClass(name: string) {
    if (this.rawHtmlElement.classList.contains(name)) {
      this.rawHtmlElement.classList.remove(name);
    }

    return this;
  }

  removeClasses(name: string[]) {
    name.forEach((n: string) => {
      if (this.rawHtmlElement.classList.contains(n)) this.removeClass(n);
    });

    return this;
  }

  setStyle<StyleName extends keyof CSSStyleDeclaration>(name: StyleName, value: CSSStyleDeclaration[StyleName]) {
    this.rawHtmlElement.style[name] = value;
    return this;
  }

  setStyleVariable(name: string, value: string) {
    this.rawHtmlElement.style.setProperty(name, value);
    return this;
  }

  clearStyleVariable(name: string) {
    this.rawHtmlElement.style.removeProperty(name);
    return this;
  }

  getStyle<StyleName extends keyof CSSStyleDeclaration>(name: StyleName): CSSStyleDeclaration[StyleName] {
    return this.rawHtmlElement.style[name];
  }

  getStyleVariable(name: string): string {
    return getComputedStyle(this.rawHtmlElement).getPropertyValue(name);
  }

  setStyles(styles: Partial<CSSStyleDeclaration>) {
    Object.keys(styles).forEach((key, _, arr) => {
      // @ts-ignore
      this.rawHtmlElement.style[key] = arr[key];
    });

    return this;
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.rawHtmlElement.addEventListener(type, listener);
    return this;
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    this.rawHtmlElement.removeEventListener(type, listener);
    return this;
  }

  addChild(child: AnyComponent | UKHTMLElement, calledFromParent?: boolean) {
    this.__internals.children?.push(child);

    if (!calledFromParent) child.__internals.parentComponent = this;

    if (child.__internals.componentType === ComponentType.HTMLElement) {
      const childComponent = child as UKHTMLElement;
      this.rawHtmlElement.appendChild(childComponent.rawHtmlElement);

      return this;
    }

    const childComponent = child as AnyComponent;
    this.rawHtmlElement.appendChild(childComponent.htmlElement.rawHtmlElement);
    childComponent.init();

    return this;
  }

  clearChildren() {
    this.rawHtmlElement.innerHTML = "";
    return this;
  }

  setInnerText(text: string) {
    this.rawHtmlElement.innerText = text;
    return this;
  }

  dangerouslySetInnerHTML(html: string) {
    this.rawHtmlElement.innerHTML = html;
    return this;
  }

  init() {
    this.__internals.children = [];
    this.clearChildren();
    // @ts-ignore
    this.__internals.treeContext = propagateTreeContext(this.__internals.parentComponent);
  }
}
