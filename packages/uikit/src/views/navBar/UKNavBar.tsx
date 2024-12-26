import React from "react";
import UKBox from "../../components/box/UKBox.tsx";
import styles from "./navBar.module.scss";
import UKFlex from "../../components/flex/UKFlex.tsx";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";

const UKNavBar: React.FC<{
  leftSection?: React.ReactElement | React.ReactElement[];
  centerSection?: React.ReactElement | React.ReactElement[];
  rightSection?: React.ReactElement | React.ReactElement[];
  className?: string;
}> = ({ leftSection, centerSection, rightSection, className }) => {
  return (
    <UKBox className={clippy(styles.component, className)}>
      <UKFlex
        className={styles.segment}
        direction="row"
      >
        {leftSection}
      </UKFlex>
      <UKFlex
        className={styles.segment}
        direction="row"
      >
        {centerSection}
      </UKFlex>
      <UKFlex
        className={styles.segment}
        direction="row"
      >
        {rightSection}
      </UKFlex>
    </UKBox>
  );
};

export default UKNavBar;
