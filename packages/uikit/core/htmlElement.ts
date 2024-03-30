/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import { Merge } from "type-fest";
import { AnyComponent, AnyComponentOrHTMLElement, ComponentType, ContainerComponentInternals } from "./component.js";
import { appendComponentToElement, initializeComponent } from "./index.js";

type OverrideProperties<
  TOriginal,
  // This first bit where we use `Partial` is to enable autocomplete
  // and the second bit with the mapped type is what enforces that we don't try
  // to override properties that doesn't exist in the original type.
  TOverride extends Partial<Record<keyof TOriginal, unknown>> & {
    [Key in keyof TOverride]: Key extends keyof TOriginal ? TOverride[Key] : never;
  },
> = Merge<TOriginal, TOverride>;

export default class UIKitHTMLElement {
  __internals: OverrideProperties<ContainerComponentInternals, { children: (AnyComponent | UIKitHTMLElement)[] }>;
  rawHtmlElement: HTMLElement;

  constructor(htmlElement: HTMLElement, props?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      children: [],
      componentType: ComponentType.HTMLElement,
      renderCount: 0,
      isInitialized: false,
      treeContext: { level: 0 },
      slots: [],
    };

    if (props) {
      if (props.debugId) this.__internals.debugId = props.debugId;
    }

    this.rawHtmlElement = htmlElement;

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

  removeClass(name: string) {
    if (this.rawHtmlElement.classList.contains(name)) {
      this.rawHtmlElement.classList.remove(name);
    }

    return this;
  }

  setStyle<StyleName extends keyof CSSStyleDeclaration>(name: StyleName, value: CSSStyleDeclaration[StyleName]) {
    this.rawHtmlElement.style[name] = value;
    return this;
  }

  getStyle<StyleName extends keyof CSSStyleDeclaration>(name: StyleName): CSSStyleDeclaration[StyleName] {
    return this.rawHtmlElement.style[name];
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

  addChild(child: AnyComponent | UIKitHTMLElement) {
    this.__internals.children?.push(child);
    child.__internals.parentComponent = this;

    if (child.__internals.componentType === ComponentType.HTMLElement) {
      const childComponent = child as UIKitHTMLElement;
      this.rawHtmlElement.appendChild(childComponent.rawHtmlElement);

      return;
    }

    const childComponent = child as AnyComponent;
    this.rawHtmlElement.appendChild(childComponent.htmlElement.rawHtmlElement);

    child.render();
  }

  setInnerText(text: string) {
    this.rawHtmlElement.innerText = text;
    return this;
  }

  dangerouslySetInnerHTML(html: string) {
    this.rawHtmlElement.innerHTML = html;
    return this;
  }

  render() {
    if (!this.__internals.isInitialized) {
      initializeComponent(this);
    }

    this.__internals.renderCount++;
    console.debug("UIKIT:RENDER", `rendering component: <${this.__internals.debugId}>`, this);

    this.__internals.children.map((child: AnyComponentOrHTMLElement) => {
      appendComponentToElement(this.rawHtmlElement, child);

      child.render();
    });

    return this;
  }
}
