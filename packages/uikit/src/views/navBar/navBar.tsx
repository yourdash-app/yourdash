import React from "react";
import Box from "../../components/box/box.tsx";
import styles from "./navBar.module.scss";
import Flex from "../../components/flex/flex.tsx";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";

const NavBar: React.FC<{
  leftSection?: React.ReactElement | React.ReactElement[];
  centerSection?: React.ReactElement | React.ReactElement[];
  rightSection?: React.ReactElement | React.ReactElement[];
  className?: string;
}> = ({ leftSection, centerSection, rightSection, className }) => {
  return (
    <Box className={clippy(styles.component, className)}>
      <Flex
        className={styles.segment}
        direction="row"
      >
        {leftSection}
      </Flex>
      <Flex
        className={styles.segment}
        direction="row"
      >
        {centerSection}
      </Flex>
      <Flex
        className={styles.segment}
        direction="row"
      >
        {rightSection}
      </Flex>
    </Box>
  );
};

export default NavBar;
