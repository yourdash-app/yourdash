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

        const ROOT_FRAME_ID = generateUUID();

        const nodesData: { [id: UUID]: INodeData<INode> } = {};
        const wiresData: NodeWire[] = [];
        const nodeWireElementContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        fw.containingElement.appendChild(nodeWireElementContainer);

        nodeWireElementContainer.setAttributeNS(
          "http://www.w3.org/2000/svg",
          "viewBox",
          `0 0 ${fw.containingElement.getBoundingClientRect().width} ${fw.containingElement.getBoundingClientRect().height}`,
        );

        nodeWireElementContainer.style.width = `${fw.containingElement.getBoundingClientRect().width}px`;
        nodeWireElementContainer.style.height = `${fw.containingElement.getBoundingClientRect().height}px`;
        nodeWireElementContainer.style.pointerEvents = "none";
        nodeWireElementContainer.style.position = "absolute";
        nodeWireElementContainer.style.top = "0";
        nodeWireElementContainer.style.left = "0";

        const addLogNodeElement = document.createElement("button");
        addLogNodeElement.innerText = "Add Log Node";
        addLogNodeElement.onclick = () => {
          const id = generateUUID();
          nodesData[id] = {
            id,
            type: "log-to-console",
            inputs: {},
            outputs: {},
            position: {
              x: 0,
              y: 0,
              containingFrame: ROOT_FRAME_ID,
            },
          };

          const n = new Node(nodesData[id], nodes[nodesData[id].type], wiresData, nodeWireElementContainer);

          fw.containingElement.appendChild(n.htmlElement);
        };

        fw.containingElement.appendChild(addLogNodeElement);

        const addNumberNodeElement = document.createElement("button");
        addNumberNodeElement.innerText = "Add Number Node";
        addNumberNodeElement.onclick = () => {
          const id = generateUUID();
          nodesData[id] = {
            id,
            type: "number-variable",
            inputs: {},
            outputs: {},
            position: {
              x: 0,
              y: 0,
              containingFrame: ROOT_FRAME_ID,
            },
          };

          console.log(nodesData[id]);

          const n = new Node(nodesData[id], nodes[nodesData[id].type], wiresData, nodeWireElementContainer);

          fw.containingElement.appendChild(n.htmlElement);
        };

        fw.containingElement.appendChild(addNumberNodeElement);

        Object.keys(nodesData).map((node) => {
          const n = new Node(
            nodesData[node as UUID],
            nodes[nodesData[node as UUID].type],
            wiresData,
            nodeWireElementContainer,
          );

          fw.containingElement.appendChild(n.htmlElement);
        });
      }}
    />
  );
};

export default NodesView;
