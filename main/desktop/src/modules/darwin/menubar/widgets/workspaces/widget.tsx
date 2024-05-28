/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useState } from "react";

const WorkspacesWidget = () => {
  const [currentWorkspace, setCurrentWorkspace] = useState(0);
  const [workspaces, setWorkspaces] = useState(10);

  return <>{workspaces}</>;
};

export default WorkspacesWidget;
