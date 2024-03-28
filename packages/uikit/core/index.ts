/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { AnyComponent, ComponentTreeContext } from "./component.js";
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

export function initializeComponent(component: AnyComponent, treeContext: ComponentTreeContext) {
  if (component.__internals.isInitialized) {
    console.warn("UIKIT:COMPONENT_ALREADY_INITIALIZED", `component ${component.__internals.debugId} already initialized`);

    return component;
  }

  console.debug("UIKIT:COMPONENT_INITIALIZED", `component ${component.__internals.debugId} initialized, with context`, treeContext);

  component.__internals.treeContext = treeContext;
  component.__internals.isInitialized = true;

  return component;
}

export default class UIKit {
  looseRoots: ContentRoot[] = [];

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
