/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CommentElement from "../../html/commentElement.js";
import { ComponentType } from "./componentType.js";
import { ContainerComponent } from "./containerComponent.js";

export class ComponentSlot extends ContainerComponent {
  constructor(props?: { debugId?: string }) {
    super([], props);

    this.__internals.componentType = ComponentType.Slot;

    this.htmlElement = new CommentElement();
  }

  render() {
    super.render();

    return this;
  }
}