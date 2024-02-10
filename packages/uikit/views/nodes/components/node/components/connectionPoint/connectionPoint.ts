/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitHTMLComponent from "../../../../../../framework/html/component";
import NodeWire from "../../../wire/wire";

export default class ConnectionPoint extends UIKitHTMLComponent {
  connection: { start: string; end: string };

  constructor() {
    super({});

    return this;
  }

  connect(wire: NodeWire) {
    return this;
  }
}
