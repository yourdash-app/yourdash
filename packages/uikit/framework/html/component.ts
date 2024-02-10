/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { UIKitRawComponent } from "../component";
import { UIKitFrameworkType } from "../index";

export default class UIKitHTMLComponent extends UIKitRawComponent {
  containerElement: HTMLElement;

  constructor(props: { test: 1 }) {
    super(props, UIKitFrameworkType.HTML);

    this.props.test;

    return this;
  }
}

class RComp extends React.Component {
  constructor(props: { helloWorld: string }) {
    super(props);

    return this;
  }
}
