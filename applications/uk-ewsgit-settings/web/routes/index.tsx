/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import ManageWallpaper from "./components/manageWallpaper/manageWallpaper.tsx";
import styles from "./index.module.scss";
import UK, { UKC, UKV } from "@yourdash/uikit";

const IndexPage: FC = () => {
  return (
    <>
      <div className={styles.page}>
        <UKC.Flex
          direction={"row"}
          className={styles.titleContainer}
        >
          <UKV.SidebarToggleButton />
          <UKC.Heading
            className={styles.title}
            level={1}
            text={"Home"}
          />
        </UKC.Flex>
        <div className={styles.column}>
          <UKC.Card>
            <UKC.Heading
              level={3}
              className={styles.cardHeader}
              text={"Personalise YourDash"}
            />
            <UKC.Flex
              direction={"row"}
              className={styles.themePreviewContainer}
            >
              <UKC.Card className={styles.themePreview}>Theme Preview 1</UKC.Card>
              <UKC.Card className={styles.themePreview}>Theme Preview 2</UKC.Card>
              <UKC.Card className={styles.themePreview}>Theme Preview 3</UKC.Card>
              <UKC.Card className={styles.themePreview}>Theme Preview 4</UKC.Card>
              <UKC.Card className={styles.themePreview}>Theme Preview 5</UKC.Card>
            </UKC.Flex>
          </UKC.Card>
          <UKC.Card>
            <UKC.Heading
              level={3}
              className={styles.cardHeader}
              text={"Instance Software Updates"}
            />
            <UKC.Flex direction={"row"}>
              <UKC.Icon
                icon={UK.Core.Icons.CheckCircle}
                size={"1.5rem"}
              />
              <UKC.Text text={"You're all up to date!"} />
            </UKC.Flex>
            <UKC.Flex direction={"row"}>
              <UKC.Text text={"Last checked 2 days ago"} />
              <UKC.Button
                text={"Check for updates"}
                onClick={() => {
                  return 0;
                }}
              />
            </UKC.Flex>
            <UKC.Text text={"currently version: 1.0.0"} />
          </UKC.Card>
        </div>
        <div className={styles.column}>
          <ManageWallpaper />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
