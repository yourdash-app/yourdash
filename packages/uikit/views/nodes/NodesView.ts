/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import dataStore from "@yourdash/shared/web/store.js";
import { SoloComponent } from "../../core/component.js";
import DivElement from "../../html/divElement.js";
import styles from "./NodesView.module.scss";

export interface NodesViewMouse {
  x: number;
  y: number;
  up: boolean;
  down: boolean;
}

export default class NodesView extends SoloComponent {
  mouse = new dataStore<NodesViewMouse>({
    x: 0,
    y: 0,
    up: false,
    down: false,
  });
  htmlElement: DivElement;

  constructor() {
    super();

    this.htmlElement = new DivElement();
    this.htmlElement.addClass(styles.container);

    return this;
  }

  render() {
    // run to update changes

    return this;
  }
}
