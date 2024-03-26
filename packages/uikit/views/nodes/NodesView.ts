/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import dataStore from "@yourdash/shared/web/store.js";
import Component, { ComponentType } from "../../core/component.js";
import styles from "./NodesView.module.scss";

export interface NodesViewMouse {
  x: number;
  y: number;
  up: boolean;
  down: boolean;
}

export default class NodesView extends Component<ComponentType.Solo> {
  mouse = new dataStore<NodesViewMouse>({
    x: 0,
    y: 0,
    up: false,
    down: false,
  });

  constructor() {
    super(ComponentType.Solo);

    this.htmlElement = document.createElement("div");
    this.htmlElement.classList.add(styles.container);

    return this;
  }

  render() {
    // run to update changes

    return this;
  }
}
