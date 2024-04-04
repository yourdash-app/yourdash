/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import theme from "./defaultTheme.module.scss";
import { getThemeMeta } from "./theme.js";
import { ComponentType } from "./component/componentType.js";
import { ContainerComponent } from "./component/containerComponent.js";
import { DefaultComponentTreeContext } from "./component/treeContext.js";
import { AnyComponent, AnyComponentOrHTMLElement } from "./component/type.js";
import UKHTMLElement from "./htmlElement.js";
import { appendComponentToElement } from "./index.js";

export interface ContentRootProps {
  htmlElement: HTMLElement;
  debugId?: string;
  fillSpace?: boolean;
}

export default class ContentRoot {
  __internals__: {
    debugId: string;
    children: AnyComponentOrHTMLElement[];
    element?: HTMLElement;
    treeContext: object & DefaultComponentTreeContext;
  };

  constructor(props: ContentRootProps) {
    this.__internals__ = {
      debugId: generateUUID(),
      children: [],
      treeContext: {
        level: 0,
      },
    };

    if (props.debugId) this.__internals__.debugId = props.debugId;
    this.setHTMLElement(props.htmlElement);
    getThemeMeta(this.__internals__.element as HTMLElement);
    this.__internals__.element?.setAttribute("uikit-content-root", "true");

    if (props.fillSpace) {
      if (!this.__internals__.element) return this;

      this.__internals__.element.style.width = "100%";
      this.__internals__.element.style.height = "100%";
    }

    if (window.__uikit__.isMobile) {
      this.setDeviceType("mobile");
    }

    return this;
  }

  setHTMLElement(element: HTMLElement) {
    this.__internals__.element = element;

    return this;
  }

  getChildren() {
    return this.__internals__.children;
  }

  // add a child component to the content root
  addChild(child: AnyComponentOrHTMLElement) {
    if (child.__internals.componentType === ComponentType.HTMLElement) {
      const childComponent = child as UKHTMLElement;
      child.__internals.parentComponent = this as unknown as ContainerComponent;
      child.__internals.treeContext = { ...this.__internals__.treeContext };
      this.__internals__.element?.appendChild(childComponent.rawHtmlElement);

      return this;
    }

    const childComponent = child as AnyComponent;

    child.__internals.parentComponent = this as unknown as ContainerComponent;
    child.__internals.treeContext = { ...this.__internals__.treeContext };
    this.__internals__.children?.push(childComponent);

    this.__internals__.element?.appendChild(childComponent.htmlElement.rawHtmlElement);
    child.render();

    return this;
  }

  removeChild(child: AnyComponent) {
    const index = this.__internals__.children.indexOf(child);
    if (index > -1) {
      this.__internals__.children.splice(index, 1);
    }

    return this;
  }

  setDeviceType(deviceType: "mobile" | "desktop") {
    this.__internals__.element?.classList.remove(theme.mobile);
    this.__internals__.element?.removeAttribute("uikit-device");

    if (deviceType === "mobile") {
      this.__internals__.element?.classList.add(theme.mobile);
      this.__internals__.element?.setAttribute("uikit-device", "mobile");
    } else {
      this.__internals__.element?.setAttribute("uikit-device", "desktop");
    }
  }

  render() {
    if (!this.__internals__.element) {
      return this;
    }

    this.__internals__.element.innerHTML = "";

    this.getChildren().map((child) => {
      appendComponentToElement(this.__internals__.element as HTMLElement, child);

      child.render();
    });

    return this;
  }
}
