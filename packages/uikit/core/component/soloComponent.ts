/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import DivElement from "../../html/divElement.js";
import UIKitHTMLElement from "../htmlElement.js";
import { getUIKit, initializeComponent } from "../index.js";
import { ComponentType } from "./componentType.js";
import { BaseComponentInternals } from "./internals.js";

export interface SoloComponentInternals extends BaseComponentInternals {}

export class SoloComponent {
  __internals: SoloComponentInternals;
  htmlElement: UIKitHTMLElement;

  constructor(props?: { debugId?: string }) {
    this.__internals = {
      debugId: generateUUID(),
      // When a component is created, it's creator should define its parent
      parentComponent: undefined,
      componentType: ComponentType.Solo,
      renderCount: 0,
      isInitialized: false,
      treeContext: { level: 0 },
    };

    if (props) {
      if (props.debugId) {
        this.__internals.debugId = props.debugId;
      }
    }

    // by default, we use a div element as the component's html element
    this.htmlElement = new DivElement();

    return this;
  }

  render() {
    if (!this.__internals.isInitialized) {
      initializeComponent(this);
    }

    this.__internals.renderCount++;
    console.debug("UIKIT:RENDER", this);

    return this;
  }
}
