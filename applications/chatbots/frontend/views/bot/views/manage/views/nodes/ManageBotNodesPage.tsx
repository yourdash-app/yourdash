/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UIKitFrameworkType } from "@yourdash/uikit/framework/index";
import UIKitFrameworkReactInterconnect from "@yourdash/uikit/framework/ReactInterconnect";
import NodesView from "@yourdash/uikit/views/nodes/NodesView";

const ManageBotNodesPage: React.FC = () => {
  return (
    <UIKitFrameworkReactInterconnect
      frameworkType={UIKitFrameworkType.HTML}
      onLoad={(fw) => {
        fw.containingElement.innerHTML = "";
        fw.add(new NodesView({ containerElement: fw.containingElement }));
      }}
    />
  );
};

export default ManageBotNodesPage;
