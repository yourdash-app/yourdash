/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import csi from "@yourdash/csi/csi";
import styles from "./Widget.module.scss";
import React from "react";

const QuickShortcuts: React.FC<{ side: "top" | "right" | "bottom" | "left" }> = ({ side }) => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<
    {
      name: string;
      icon: string;
    }[]
  >([]);
  const [num, setNum] = React.useState<number>(0);

  useEffect(() => {
    csi.getJson("/core/panel/quick-shortcuts", (data) => {
      setApplications(data);
    });
  }, [num]);

  // @ts-ignore
  window.__yourdashCorePanelQuickShortcutsReload = () => {
    setNum(num + 1);
  };

  return (
    <>
      {applications.map((application) => {
        return (
          <div
            key={application.name}
            onClick={() => {
              navigate(`/app/a/${application.name}`);
            }}
            className={clippy(
              styles.application,
              side === "top" && styles.top,
              side === "right" && styles.right,
              side === "bottom" && styles.bottom,
              side === "left" && styles.left,
            )}
          >
            <img className={styles.applicationIcon} src={`${csi.getInstanceUrl()}${application.icon}`} alt={""} />
            <span className={styles.applicationLabel}>{application.name}</span>
          </div>
        );
      })}
    </>
  );
};

export default QuickShortcuts;
