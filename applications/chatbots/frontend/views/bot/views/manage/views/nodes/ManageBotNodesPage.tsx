/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ReactUIKitView from "@yourdash/uikit/core/ReactUIKitView.js";
import NodesView from "@yourdash/uikit/views/nodes/NodesView";

const ManageBotNodesPage: React.FC = () => {
  return (
    <ReactUIKitView
      onLoad={(fw) => {
        fw.addChild(new NodesView());
      }}
    />
  );
};

export default ManageBotNodesPage;
