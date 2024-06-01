/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/components/card/card";
import Flex from "@yourdash/uikit/components/flex/flex";
import Heading from "@yourdash/uikit/components/heading/heading";
import Icon from "@yourdash/uikit/components/icon/icon";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary";
import { FC } from "react";
import styles from "./index.module.scss";
import Text from "@yourdash/uikit/components/text/text";

const IndexPage: FC = () => {
  return (
    <div className={styles.page}>
      <Heading
        className={styles.title}
        level={1}
        text={"Home"}
      />
      <div className={styles.column}>
        <Card>
          <Heading
            level={3}
            className={styles.cardHeader}
            text={"Personalise YourDash"}
          />
          <Flex
            direction={"row"}
            className={styles.themePreviewContainer}
          >
            <Card className={styles.themePreview}>Theme Preview 1</Card>
            <Card className={styles.themePreview}>Theme Preview 2</Card>
            <Card className={styles.themePreview}>Theme Preview 3</Card>
            <Card className={styles.themePreview}>Theme Preview 4</Card>
            <Card className={styles.themePreview}>Theme Preview 5</Card>
          </Flex>
        </Card>
        <Card>
          <Heading
            level={3}
            className={styles.cardHeader}
            text={"Instance Software Updates"}
          />
          <Flex direction={"row"}>
            <Icon
              icon={UKIcon.CheckCircle}
              size={"1.5rem"}
            />
            <Text text={"You're all up to date!"} />
          </Flex>
        </Card>
      </div>
      <div className={styles.column}>
        <Card>
          <Heading
            level={3}
            className={styles.cardHeader}
            text={"Manage Wallpaper"}
          />
          <Flex direction={"row"}>
            <Card>Previous Image 1</Card>
            <Card>Previous Image 2</Card>
            <Card>+</Card>
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default IndexPage;
