/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import ReactDOM from "react-dom/client";

import { SoloComponent } from "./component/soloComponent.js";

export default class UIKitReactView extends SoloComponent {
  reactComponent: React.ReactNode;

  constructor(props: { reactComponent: React.ReactNode }) {
    super();

    this.reactComponent = props.reactComponent;

    return this;
  }

  render() {
    super.render();
    ReactDOM.createRoot(this.htmlElement).render(this.reactComponent);

    return this;
  }
}
