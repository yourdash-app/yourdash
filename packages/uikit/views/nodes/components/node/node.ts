/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UUID } from "@yourdash/shared/core/uuid";
import UIKitHTMLComponent from "../../../../framework/html/component";

export interface INodeConnection {
  id: string;
  to: INode;
  from: INode;
}

export interface INode {
  id: UUID;
  type: string;
  position: { x: number; y: number };
  connections: {
    input: { [key: string]: INodeConnection };
    output: { [key: string]: INodeConnection };
  };
}

export default class Node extends UIKitHTMLComponent<Omit<INode, "id">> {
  constructor(data: INode) {
    super(data);

    return this;
  }

  render() {
    return this;
  }
}
