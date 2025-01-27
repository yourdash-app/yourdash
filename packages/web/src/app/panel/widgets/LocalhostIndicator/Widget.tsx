/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
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
        "flex items-center justify-center h-[var(--app-panel-size)] w-[var(--app-panel-size)] -m-[var(--app-panel-padding)]",
        side === "top" && "ml-auto",
        side === "bottom" && "ml-auto",
        side === "left" && "mt-auto",
        side === "right" && "mt-auto",
      )}
    >
      <UKText
        text={"</>"}
        className={"text-pink-300"}
      />
    </div>
  );
};

export default LocalhostIndicator;
