/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { AnyComponent } from "./component";
import ContentRoot, { ContentRootProps } from "./contentRoot";

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

export default class UIKit {
  contentRoot: ContentRoot;
  looseRoots: ContentRoot[] = [];

  constructor(containerElement: HTMLDivElement) {
    this.looseRoots = [];
    window.__uikit__ = { uikit: this };
    this.contentRoot = new ContentRoot({ htmlElement: containerElement });
    this.contentRoot.__internals.element?.setAttribute("uikit-root", "true");

    return this;
  }

  createLooseContentRoot(props: ContentRootProps) {
    const contentRoot = new ContentRoot(props);
    this.looseRoots.push(contentRoot);
    return contentRoot;
  }

  addChild(component: AnyComponent) {
    this.contentRoot.addChild(component);
    return this;
  }
}
