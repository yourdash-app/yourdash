/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Text from "@yourdash/uikit/components/text/text.js";
import { ContainerComponent } from "@yourdash/uikit/core/component/containerComponent.js";

export default class DesktopHomePage extends ContainerComponent {
  constructor() {
    super();

    this.addChild(new Text().setText("Coming Soon to desktop..."));

    return this;
  }
}
