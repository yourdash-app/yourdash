/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Icon from "@yourdash/uikit/depChiplet/components/icon/Icon";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import React from "react";

const LocalhostIndicator: React.FC<{
  side: "top" | "right" | "bottom" | "left";
}> = ({ side }) => {
  if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return null;
  }

  return (
    <div
      className={clippy(
        "bg-red-400 w-10 h-10 rounded-button-rounding flex items-center justify-center",
        side === "top" && "ml-auto",
        side === "bottom" && "ml-auto",
        side === "left" && "mt-auto",
        side === "right" && "mt-auto",
      )}
    >
      <Icon icon={YourDashIcon.Location} color={"currentColor"} className={"h-6"} />
    </div>
  );
};

export default LocalhostIndicator;
