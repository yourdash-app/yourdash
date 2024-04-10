/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import ReactDOM from "react-dom/client";

import { SoloComponent } from "./component/soloComponent.js";

export default class UIKitReactView extends SoloComponent {
  reactComponent: React.ReactNode;
  declare props: { reactComponent: React.ReactNode };

  constructor(props: UIKitReactView["props"]) {
    super(props);

    this.reactComponent = props.reactComponent;

    return this;
  }

  init() {
    super.init();
    ReactDOM.createRoot(this.htmlElement.rawHtmlElement).render(this.reactComponent);

    return this;
  }
}
