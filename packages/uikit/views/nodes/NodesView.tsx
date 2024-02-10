/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UUID } from "@yourdash/shared/core/uuid";
import generateUUID from "@yourdash/web-client/src/helpers/uuid";
import React from "react";
import { UIKitFrameworkType } from "../../framework/index";
import ReactInterconnect from "../../framework/ReactInterconnect";
import Node, { INode, INodeData } from "./components/node/node";
import styles from "./NodesView.module.scss";
import NodeWire from "./components/wire/wire";

export interface INodeView {
  nodes: {
    [typeId: string]: INode;
  };
}

const NodesView: React.FC<INodeView> = ({ nodes }) => {
  return (
    <ReactInterconnect
      frameworkType={UIKitFrameworkType.HTML}
      onLoad={(fw) => {
        fw.containingElement.innerHTML = "";
        fw.containingElement.classList.add(styles.container);

        fw.add(
          new Node({
            id: generateUUID(),
            data: {
              type: "root",
              name: "root",
              x: 0,
              y: 0,
            },
          }),
        );
      }}
    />
  );
};

export default NodesView;
