/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";

const TabContainer: React.FC = () => {
  const [tabs, setTabs] = React.useState<
    {
      title: string;
      file: string;
    }[]
  >([]);
  return (
    <div className={"flex items-center justify-center h-8 bg-container-bg text-container-fg border-b border-container-border"}>
      {"TabContainer component"}
    </div>
  );
};

export default TabContainer;
