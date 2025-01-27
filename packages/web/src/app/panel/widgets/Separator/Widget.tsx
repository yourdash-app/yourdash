/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKSeparator from "@yourdash/uikit/src/components/separator/UKSeparator.js";
import React from "react";

const SeparatorWidget: React.FC<{ side: "top" | "right" | "bottom" | "left" }> = ({ side }) => {
  return (
    // <div
    //   className={clippy(styles.separator, side === "top" || side === "bottom" ? styles.horizontal : styles.vertical)}
    // ></div>
    <UKSeparator direction={side === "top" || side === "bottom" ? "row" : "column"} />
  );
};

export default SeparatorWidget;
