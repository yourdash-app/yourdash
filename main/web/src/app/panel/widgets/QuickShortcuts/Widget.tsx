/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Image from "@yourdash/uikit/components/image/image";
import IncrementLevel from "@yourdash/uikit/core/incrementLevel";
import { useLevel, useLevelClass } from "@yourdash/uikit/core/level";
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
    csi.syncGetJson("/core/panel/quick-shortcuts", (data) => {
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
          <IncrementLevel key={application.name}>
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
                useLevelClass(1),
              )}
            >
              <Image
                authenticatedImage
                className={styles.applicationIcon}
                src={application.icon}
                accessibleLabel={application.name}
              />
              <span className={styles.applicationLabel}>{application.name}</span>
            </div>
          </IncrementLevel>
        );
      })}
    </>
  );
};

export default QuickShortcuts;
