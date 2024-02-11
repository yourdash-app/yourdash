/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitHTMLComponent from "../../framework/html/component";
import { UIKitFrameworkType } from "../../framework/index";
import UIKitDataStore from "../../framework/store";

export interface NodesViewProps {
  containerElement: HTMLDivElement;
}

export interface NodesViewMouse {
  x: number;
  y: number;
  up: boolean;
  down: boolean;
}

export default class NodesView extends UIKitHTMLComponent<NodesViewProps> {
  mouse: UIKitDataStore<NodesViewMouse> = new UIKitDataStore<NodesViewMouse>({
    x: 0,
    y: 0,
    up: false,
    down: false,
  });

  constructor(props: NodesViewProps) {
    super(props);
    return this;
  }

  init() {
    super.init();

    this.containerElement = document.createElement("div");
    this.props.get("containerElement").appendChild(this.containerElement);

    return this;
  }

  render() {
    // run to update changes

    return this;
  }
}
