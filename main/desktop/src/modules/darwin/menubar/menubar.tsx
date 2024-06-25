/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { FC, useEffect, useState } from "react";
import ClockWidget from "./widgets/clock/widget";
import styles from "./menubar.module.scss";
import WorkspacesWidget from "./widgets/workspaces/widget";

const MenuBar: FC = () => {
  const [widgets, setWidgets] = useState<React.ReactNode[]>([<ClockWidget />, <WorkspacesWidget />]);
  const [wallpaperPath, setWallpaperPath] = useState<string>("");

  useEffect(() => {
    window.electron.ipcRenderer.on("get-wallpaper", (_, path) => {
      setWallpaperPath(path);
      console.log(path);
    });

    window.electron.ipcRenderer.send("get-wallpaper");
  }, []);

  return (
    <div
      className={styles.menubarContainer}
      style={{ backgroundImage: `url(local:///${wallpaperPath})` }}
    >
      <div className={styles.menubar}>
        {widgets.map((widget) => {
          return <React.Fragment key={Math.random()}>{widget}</React.Fragment>;
        })}
      </div>
    </div>
  );
};

export default MenuBar;
