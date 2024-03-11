/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitHTMLComponent from "../../../../../../framework/html/component";
import NodeWire from "../../../wire/wire";
import styles from "./connectionPoint.module.scss";

export enum ConnectionPointType {
  Input,
  Output,
}

export interface ConnectionPointProps<T = ConnectionPointType> {
  type: T;
  connections: T extends ConnectionPointType.Input ? NodeWire : NodeWire[];
}

export default class ConnectionPoint extends UIKitHTMLComponent<ConnectionPointProps> {
  constructor(props: ConnectionPointProps) {
    super(props);

    return this;
  }

  connect(wire: NodeWire) {
    if (this.props.get("type") === ConnectionPointType.Input) {
      this.props.set("connections", wire);
    } else {
      this.props.set("connections", [...(this.props.get("connections") as NodeWire[]), wire]);
    }

    return this;
  }

  render() {
    // FIXME: fixme
    // this.containerElement.classList.add(styles.connectionPoint);

    return this;
  }
}
