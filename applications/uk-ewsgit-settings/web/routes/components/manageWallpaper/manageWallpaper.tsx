/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import useResource from "@yourdash/csi/useResource.ts";
import Card from "@yourdash/uikit/components/card/card.tsx";
import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import Icon from "@yourdash/uikit/components/icon/icon.tsx";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.ts";
import Image from "@yourdash/uikit/components/image/image.tsx";
import Text from "@yourdash/uikit/components/text/text.tsx";
import { acsi } from "../../../meta.yourdash.ts";
import styles from "./manageWallpaper.module.scss";
import React from "react";

const ManageWallpaper: React.FC = () => {
  const currentWallpaper = useResource(() => acsi.getJson("/current/wallpaper"), []);

  return (
    <Card>
      <Heading
        level={3}
        className={styles.cardHeader}
        text={"Manage Wallpaper"}
      />
      {currentWallpaper ? (
        <Image
          authenticatedImage
          src={currentWallpaper.thumbnail}
          accessibleLabel={"current wallpaper"}
          className={styles.currentWallpaper}
        />
      ) : (
        <div>no current wallpaper</div>
      )}
      <div className={styles.previousWallpapers}>
        <Card>Previous Image 1</Card>
        <Card>Previous Image 2</Card>
        <Card>Previous Image 2</Card>
        <Card className={styles.newWallpaperButton}>
          <Icon
            className={styles.icon}
            icon={UKIcon.Plus}
          />
          <Text text={"Add new wallpaper"} />
        </Card>
      </div>
    </Card>
  );
};

export default ManageWallpaper;
