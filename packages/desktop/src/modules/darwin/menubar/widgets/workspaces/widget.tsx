/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Icon from "@yourdash/uikit/components/icon/icon";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary";
import { useEffect, useState } from "react";
import styles from "./widget.module.scss";

const WorkspacesWidget = () => {
  const [currentWorkspace, setCurrentWorkspace] = useState(0);
  const [workspaces, setWorkspaces] = useState(0);

  useEffect(() => {
    window.electron.ipcRenderer.on("get-current-workspace", (_, workspace) => {
      setCurrentWorkspace(workspace);
      console.log("current workspace set to", workspace);
    });

    window.electron.ipcRenderer.on("get-workspaces", (_, workspaces) => {
      setWorkspaces(workspaces);
    });

    window.electron.ipcRenderer.on("create-workspace", () => {
      console.log("created workspace");
      window.electron.ipcRenderer.send("get-workspaces");
    });

    window.electron.ipcRenderer.on("remove-workspace", () => {
      window.electron.ipcRenderer.send("get-workspaces");
    });

    window.electron.ipcRenderer.send("get-current-workspace");
    window.electron.ipcRenderer.send("get-workspaces");
  }, []);

  return (
    <div className={styles.workspaces}>
      {[...Array(workspaces).keys()].map((workspace, index) => {
        return (
          <div
            className={clippy(styles.workspace, currentWorkspace === index && styles.currentWorkspace)}
            key={Math.random()}
            onClick={() => {
              window.electron.ipcRenderer.send("set-current-workspace", index);
              window.electron.ipcRenderer.send("get-current-workspace");
            }}
            onContextMenu={() => {
              window.electron.ipcRenderer.send("remove-workspace", index);
            }}
          >
            {workspace}
          </div>
        );
      })}
      <div
        className={styles.workspace}
        onClick={() => {
          window.electron.ipcRenderer.send("create-workspace");
        }}
      >
        <Icon
          icon={UKIcon.Plus}
          size={"1rem"}
        />
      </div>
    </div>
  );
};

export default WorkspacesWidget;
