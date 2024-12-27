/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

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
