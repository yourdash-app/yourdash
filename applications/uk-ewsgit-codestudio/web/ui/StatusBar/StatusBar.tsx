/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";

const StatusBar: React.FC = () => {
  const [items, setItems] = React.useState<
    {
      title: string;
    }[]
  >([]);
  return (
    <div
      className={
        "flex items-center justify-start h-6 bg-container-bg text-container-fg border-t border-container-border overflow-hidden text-sm pl-1 pr-1"
      }
    >
      {"StatusBar component"}
    </div>
  );
};

export default StatusBar;
