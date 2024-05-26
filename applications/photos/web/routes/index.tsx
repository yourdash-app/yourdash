/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Image from "@yourdash/uikit/components/image/image.js";
import { FC } from "react";
import PHOTOS_LOGO from "../assets/photosLogo.png";
import styles from "./index.module.scss";
import Albums from "./search/components/albums";

const IndexPage: FC = () => {
  return (
    <>
      <Box className={styles.header}>
        <Image
          accessibleLabel={"Photos logo"}
          src={PHOTOS_LOGO}
          className={styles.brandLogo}
        />
        <Heading
          className={styles.brandName}
          text={"Photos"}
          level={3}
        />
      </Box>
      <Albums />
    </>
  );
};

export default IndexPage;
