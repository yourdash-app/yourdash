/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CommentElement from "../../html/commentElement.js";
import { ComponentType } from "./componentType.js";
import { ContainerComponent } from "./containerComponent.js";

export class ComponentSlot extends ContainerComponent {
  constructor() {
    super({}, []);

    this.__internals.componentType = ComponentType.Slot;

    this.htmlElement = new CommentElement();
  }
}
