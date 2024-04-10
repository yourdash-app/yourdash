/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import { ContainerComponent } from "./component/containerComponent.js";
import theme from "./defaultTheme.module.scss";
import { getThemeMeta, loadThemeLevel } from "./theme.js";
import { ComponentType } from "./component/componentType.js";
import { DefaultComponentTreeContext } from "./component/treeContext.js";
import { AnyComponent, AnyComponentOrHTMLElement } from "./component/type.js";
import UKHTMLElement from "./htmlElement.js";
import styles from "./contentRoot.module.scss";
import { Constructor } from "type-fest";

export interface ContentRootProps {
  htmlElement: HTMLElement;
  debugId?: string;
  dontFillSpace?: boolean;
}

export default class ContentRoot {
  __internals: {
    debugId: string;
    children: AnyComponentOrHTMLElement[];
    element: HTMLElement;
    treeContext: object & DefaultComponentTreeContext;
  };

  constructor(props: ContentRootProps) {
    this.__internals = {
      debugId: generateUUID(),
      children: [],
      treeContext: {
        level: 0,
      },
      // @ts-ignore
      element: null,
    };

    if (props.debugId) this.__internals.debugId = props.debugId;
    this.setHTMLElement(props.htmlElement);
    getThemeMeta(this.__internals.element as HTMLElement);
    this.__internals.element?.classList.add(styles.contentRoot);
    loadThemeLevel(this.__internals.element as HTMLElement, 0);
    this.__internals.element?.setAttribute("uikit-content-root", "true");

    if (!props.dontFillSpace) {
      if (!this.__internals.element) return this;

      this.__internals.element.style.width = "100%";
      this.__internals.element.style.height = "100%";
    }

    if (window.__uikit__.isMobile) {
      this.setDeviceType("mobile");
    }

    return this;
  }

  setHTMLElement(element: HTMLElement) {
    this.__internals.element = element;

    return this;
  }

  getChildren() {
    return this.__internals.children;
  }

  // add a child component to the content root
  addChild<Comp extends AnyComponentOrHTMLElement>(
    component: Constructor<Comp>,
    props: Comp extends AnyComponent ? Comp["props"] : undefined,
  ): Comp {
    const child = new component(props);
    this.__internals.children?.push(child);
    child.__internals.parentComponent = this as unknown as ContainerComponent;

    if (child.__internals.componentType === ComponentType.HTMLElement) {
      const childComponent = child as UKHTMLElement;
      this.__internals.element?.appendChild(childComponent.rawHtmlElement);
      childComponent.init();

      return childComponent as Comp;
    }

    const childComponent = child as AnyComponent;
    this.__internals.element?.appendChild(childComponent.htmlElement.rawHtmlElement);
    childComponent.init();

    return childComponent as Comp;
  }

  removeChild(child: AnyComponent) {
    const index = this.__internals.children.indexOf(child);
    if (index > -1) {
      this.__internals.children.splice(index, 1);
    }

    return this;
  }

  setDeviceType(deviceType: "mobile" | "desktop") {
    this.__internals.element?.classList.remove(theme.mobile);
    this.__internals.element?.removeAttribute("uikit-device");

    if (deviceType === "mobile") {
      this.__internals.element?.classList.add(theme.mobile);
      this.__internals.element?.setAttribute("uikit-device", "mobile");
    } else {
      this.__internals.element?.setAttribute("uikit-device", "desktop");
    }
  }

  init() {
    this.__internals.element.innerHTML = "";
    this.__internals.children = [];
  }
}
