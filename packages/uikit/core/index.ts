/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import isMobileDevice from "@yourdash/shared/web/helpers/isPhone.js";
import { ComponentType } from "./component/componentType.js";
import { AnyComponent, AnyComponentOrHTMLElement } from "./component/type.js";
import ContentRoot, { ContentRootProps } from "./contentRoot";
import UKHTMLElement from "./htmlElement.js";

// override the global window object to add the __uikit__ object
declare global {
  interface Window {
    __uikit__: {
      uikit: UIKit;
      isMobile: boolean;
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
    const childComponent = component as UKHTMLElement;
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
    window.__uikit__ = { uikit: this, isMobile: false };

    if (isMobileDevice()) {
      window.__uikit__.isMobile = true;
    }

    return this;
  }

  createLooseContentRoot(props: ContentRootProps) {
    const contentRoot = new ContentRoot(props);
    this.looseRoots.push(contentRoot);
    return contentRoot;
  }
}
