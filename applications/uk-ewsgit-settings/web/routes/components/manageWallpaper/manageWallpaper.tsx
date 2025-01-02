/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import useResource from "@yourdash/csi/useResource.ts";
import { acsi } from "../../../meta.yourdash.ts";
import styles from "./manageWallpaper.module.scss";
import React from "react";

const ManageWallpaper: React.FC = () => {
  const currentWallpaper = useResource(() => acsi.getJson("/current/wallpaper", "/current/wallpaper"), []);

  return (
    <UKCard>
      <UKHeading
        level={2}
        className={styles.heading}
        text={"Manage Wallpaper"}
      />
      <UKSeparator direction={"column"} />
      {currentWallpaper ? (
        <UKImage
          width={480}
          src={toAuthImgUrl(currentWallpaper.thumbnail)}
          accessibleLabel={"current wallpaper"}
          className={styles.currentWallpaper}
        />
      ) : (
        <div>no current wallpaper</div>
      )}
      <UKSeparator direction={"column"} />
      <div className={styles.previousWallpapers}>
        <UKCard className={styles.newWallpaperButton}>
          <UKIcon
            className={styles.icon}
            icon={UKIcons.Plus}
          />
          <UKText text={"Add new wallpaper"} />
        </UKCard>
      </div>
    </UKCard>
  );
};

export default ManageWallpaper;
