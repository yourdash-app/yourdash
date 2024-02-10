/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UIKitRawComponent } from "../component";
import { UIKitFrameworkType } from "../index";

export default class UIKitHTMLComponent extends UIKitRawComponent {
  containerElement: HTMLElement;

  constructor(props: UIKitHTMLComponent["props"]) {
    super(props, UIKitFrameworkType.HTML);

    this.containerElement = document.createElement("div");

    return this;
  }
}
