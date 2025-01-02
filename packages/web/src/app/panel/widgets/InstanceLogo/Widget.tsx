/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useNavigate } from "react-router";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import styles from "./Widget.module.scss";
import { memo, useEffect, useState } from "react";

const InstanceLogoWidget: React.FC<{ panelSize: "small" | "medium" | "large" }> = ({ panelSize }) => {
  const navigate = useNavigate();

  const INSTANCE_PANEL_LOGOS = {
    small: "/panel/logo/small",
    medium: "/panel/logo/medium",
    large: "/panel/logo/large",
  };

  return (
    <img
      src={`${coreCSI.getInstanceUrl()}${INSTANCE_PANEL_LOGOS[panelSize]}`}
      alt={"Instance logo"}
      draggable={false}
      className={styles.icon}
      onClick={() => {
        navigate("/app/a/uk-ewsgit-dash-frontend");
      }}
    />
  );
};

export default memo(InstanceLogoWidget);
