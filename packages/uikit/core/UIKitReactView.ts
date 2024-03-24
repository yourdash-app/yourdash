/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import Component, { ComponentType } from "./component.js";
import ReactDOM from "react-dom/client";

export default class UIKitReactView extends Component<ComponentType.Solo> {
  reactComponent: React.ReactNode;

  constructor(props: { reactComponent: React.ReactNode }) {
    super(ComponentType.Solo);

    this.reactComponent = props.reactComponent;

    return this;
  }

  render() {
    super.render();
    ReactDOM.createRoot(this.htmlElement).render(this.reactComponent);

    return this;
  }
}
