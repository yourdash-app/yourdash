/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitHTMLComponent from "../../framework/html/component";
import UIKitDataStore from "../../framework/store";
import styles from "./NodesView.module.scss";

export interface NodesViewProps {}

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

    this.__internal__.htmlElement = document.createElement("div");
    this.__internal__.htmlElement.classList.add(styles.container);

    return this;
  }

  render() {
    // run to update changes

    return this;
  }
}
