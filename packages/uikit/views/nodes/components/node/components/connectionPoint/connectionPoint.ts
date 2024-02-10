/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitHTMLComponent from "../../../../../../framework/html/component";
import NodeWire from "../../../wire/wire";
import styles from "./connectionPoint.module.scss";

export default class ConnectionPoint extends UIKitHTMLComponent {
  constructor() {
    super({});

    return this;
  }

  connect(wire: NodeWire) {
    return this;
  }

  render() {
    this.containerElement.classList.add(styles.connectionPoint);

    return this;
  }
}
