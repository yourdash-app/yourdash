/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid";
import { Component } from "react";

export default class ContentRoot {
  __internals: {
    debugId: string;
    children: Component[];
  };

  constructor(props?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      children: [],
    };

    if (props) {
      if (props.debugId) this.__internals.debugId = props.debugId;
    }

    return this;
  }

  getChildren() {
    return this.__internals.children;
  }

  addChild(child: Component) {
    this.__internals.children.push(child);
  }

  removeChild(child: Component) {
    const index = this.__internals.children.indexOf(child);
    if (index > -1) {
      this.__internals.children.splice(index, 1);
    }
  }

  fullRender() {}
}
