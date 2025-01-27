/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import ManageWallpaper from "./components/manageWallpaper/manageWallpaper.tsx";
import styles from "./index.module.scss";
import UKFlex from "@yourdash/uikit/src/components/flex/UKFlex.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKSidebarToggleButton from "@yourdash/uikit/src/views/sidebar/UKSidebarToggleButton.js";
import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";
import UKIcon from "@yourdash/uikit/src/components/icon/UKIcon.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";

const IndexPage: FC = () => {
  return (
    <>
      <div className={styles.page}>
        <UKFlex
          direction={"row"}
          className={styles.titleContainer}
        >
          <UKSidebarToggleButton />
          <UKHeading
            className={styles.title}
            level={1}
            text={"Home"}
          />
        </UKFlex>
        <div className={styles.column}>
          <UKCard>
            <UKHeading
              level={3}
              className={styles.cardHeader}
              text={"Personalise YourDash"}
            />
            <UKFlex
              direction={"row"}
              className={styles.themePreviewContainer}
            >
              <UKCard className={styles.themePreview}>Theme Preview 1</UKCard>
              <UKCard className={styles.themePreview}>Theme Preview 2</UKCard>
              <UKCard className={styles.themePreview}>Theme Preview 3</UKCard>
              <UKCard className={styles.themePreview}>Theme Preview 4</UKCard>
              <UKCard className={styles.themePreview}>Theme Preview 5</UKCard>
            </UKFlex>
          </UKCard>
          <UKCard>
            <UKHeading
              level={3}
              className={styles.cardHeader}
              text={"Instance Software Updates"}
            />
            <UKFlex direction={"row"}>
              <UKIcon
                icon={UKIcons.CheckCircle}
                size={"1.5rem"}
              />
              <UKText text={"You're all up to date!"} />
            </UKFlex>
            <UKFlex direction={"row"}>
              <UKText text={"Last checked 2 days ago"} />
              <UKButton
                text={"Check for updates"}
                onClick={() => {
                  return 0;
                }}
              />
            </UKFlex>
            <UKText text={"currently version: 1.0.0"} />
          </UKCard>
        </div>
        <div className={styles.column}>
          <ManageWallpaper />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
