/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import Node, { INode, INodeData } from "./components/node/Node";

export interface INodeView {
  nodesData: INodeData<INode>[];
  nodes: {
    [typeId: string]: INode;
  };
}

const NodesView: React.FC<INodeView> = ({ nodesData, nodes }) => {
  return (
    <div>
      {nodesData.map((node) => (
        <Node key={node.id} data={node} node={nodes[node.type]} />
      ))}
    </div>
  );
};

export default NodesView;
