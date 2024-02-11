/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { UIKitFrameworkType } from "../../framework/index";
import ReactInterconnect from "../../framework/ReactInterconnect";
import { NodeProps } from "./components/node/node";
import NodesView from "./NodesView";
import styles from "./NodesView.module.scss";

export interface INodeView {
  nodes: {
    [typeId: string]: NodeProps;
  };
}

const RINodesView: React.FC<INodeView> = ({}) => {
  return (
    <ReactInterconnect
      frameworkType={UIKitFrameworkType.HTML}
      onLoad={(fw) => {
        fw.containingElement.innerHTML = "";
        fw.containingElement.classList.add(styles.container);

        fw.add(new NodesView({ containerElement: fw.containingElement }));
      }}
    />
  );
};

export default RINodesView;
