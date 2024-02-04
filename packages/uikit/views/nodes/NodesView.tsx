/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import Node, { INode } from "./components/node/Node";

export interface INodeView {
  nodes: INode[];
  possibleNodes: {
    [typeId: string]: {
      inputs?: {
        [inputId: string]: string;
      };
      outputs?: {
        [outputId: string]: string;
      };
      displayName: string;
      content?: React.ReactNode;
    };
  };
}

const NodesView: React.FC<INodeView> = ({ nodes }) => {
  return (
    <div>
      {nodes.map((node) => (
        <Node key={node.id} {...node} />
      ))}
    </div>
  );
};

export default NodesView;
