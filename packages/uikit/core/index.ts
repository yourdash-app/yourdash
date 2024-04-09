/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import isMobileDevice from "@yourdash/shared/web/helpers/isPhone.js";
import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import { ComponentType } from "./component/componentType.js";
import { AnyComponent, AnyComponentOrHTMLElement } from "./component/type.js";
import ContentRoot, { ContentRootProps } from "./contentRoot";
import UKHTMLElement from "./htmlElement.js";
import styles from "./index.module.scss";

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
    console.warn(
      "UIKIT:COMPONENT_ALREADY_INITIALIZED",
      `component ${component.__internals.debugId} already initialized`,
    );

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
    // @ts-ignore
    contentRoot.__internals.treeContext.debugId = generateUUID();
    this.looseRoots.push(contentRoot);
    return contentRoot;
  }

  _debug_getBreakInTreeContextPropagation() {
    this.looseRoots.forEach((root) => {
      // @ts-ignore
      const rootId = root.__internals.treeContext.debugId;
      console.log(rootId);

      // loop through all decendants
      function loop(children: AnyComponentOrHTMLElement[]) {
        children.forEach((child) => {
          // @ts-ignore
          const childId = child.__internals.treeContext?.debugId || "";

          if (rootId !== childId) {
            console.log("%cBREAK IN TREE CONTEXT PROPAGATION", "color: red; font-weight: 900; font-size: 2rem;");

            if (child.__internals.componentType === ComponentType.HTMLElement) {
              const c = child as UKHTMLElement;
              c.rawHtmlElement.setAttribute("ukid", c.__internals.debugId);
              c.rawHtmlElement.classList.remove(styles.flash);
              c.rawHtmlElement.classList.add(styles.flash);
            } else {
              const c = child as AnyComponent;
              c.htmlElement.setAttribute("ukid", c.__internals.debugId);
              c.htmlElement.removeClass(styles.flash);
              c.htmlElement.addClass(styles.flash);
            }

            console.log(child.__internals.componentType, child, childId, rootId);
            return;
          }

          // @ts-ignore
          if (child.__internals?.children) {
            // @ts-ignore
            loop(child.__internals?.children);
          }
        });
      }

      loop(root.__internals.children);
    });
  }
}
