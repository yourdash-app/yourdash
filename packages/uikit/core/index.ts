/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { ComponentType } from "./component/componentType.js";
import { AnyComponent, AnyComponentOrHTMLElement } from "./component/type.js";
import ContentRoot, { ContentRootProps } from "./contentRoot";
import UIKitHTMLElement from "./htmlElement.js";

// override the global window object to add the __uikit__ object
declare global {
  interface Window {
    __uikit__: {
      uikit: UIKit;
    };
  }
}

export function getUIKit() {
  return window.__uikit__.uikit;
}

export function initializeComponent(component: AnyComponentOrHTMLElement) {
  if (component.__internals.isInitialized) {
    console.warn("UIKIT:COMPONENT_ALREADY_INITIALIZED", `component ${component.__internals.debugId} already initialized`);

    return component;
  }

  component.__internals.isInitialized = true;

  return component;
}

export function appendComponentToElement(element: HTMLElement, component: AnyComponentOrHTMLElement) {
  if (component.__internals.componentType === ComponentType.HTMLElement) {
    const childComponent = component as UIKitHTMLElement;
    element.appendChild(childComponent.rawHtmlElement);
    return;
  }

  const childComponent = component as AnyComponent;
  element.appendChild(childComponent.htmlElement.rawHtmlElement);
}

export default class UIKit {
  looseRoots: ContentRoot[] = [];
  renderQueue: { type: ComponentType; cb: () => void }[] = [];

  constructor() {
    this.looseRoots = [];
    window.__uikit__ = { uikit: this };

    return this;
  }

  createLooseContentRoot(props: ContentRootProps) {
    const contentRoot = new ContentRoot(props);
    this.looseRoots.push(contentRoot);
    return contentRoot;
  }
}
