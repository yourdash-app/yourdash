/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import useResource from "@yourdash/csi/useResource.ts";
import { acsi } from "../../../meta.yourdash.ts";
import styles from "./manageWallpaper.module.scss";
import React from "react";
import UK, { UKC } from "@yourdash/uikit";

const ManageWallpaper: React.FC = () => {
  const currentWallpaper = useResource(() => acsi.getJson("/current/wallpaper"), []);

  return (
    <UKC.Card>
      <UKC.Heading
        level={2}
        className={styles.heading}
        text={"Manage Wallpaper"}
      />
      <UKC.Separator direction={"column"} />
      {currentWallpaper ? (
        <UKC.Image
          width={480}
          src={toAuthImgUrl(currentWallpaper.thumbnail)}
          accessibleLabel={"current wallpaper"}
          className={styles.currentWallpaper}
        />
      ) : (
        <div>no current wallpaper</div>
      )}
      <UKC.Separator direction={"column"} />
      <div className={styles.previousWallpapers}>
        <UKC.Card className={styles.newWallpaperButton}>
          <UKC.Icon
            className={styles.icon}
            icon={UK.Core.Icons.Plus}
          />
          <UKC.Text text={"Add new wallpaper"} />
        </UKC.Card>
      </div>
    </UKC.Card>
  );
};

export default ManageWallpaper;
