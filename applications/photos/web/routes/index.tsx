/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Image from "@yourdash/uikit/components/image/image.js";
import { FC } from "react";
import PHOTOS_LOGO from "../assets/photosLogo.png";
import SubAlbums from "../components/SubAlbums/SubAlbums";
import styles from "./index.module.scss";

const IndexPage: FC = () => {
  return (
    <>
      <Box className={styles.header}>
        <Image
          disableSpinner={true}
          disableLazyLoading={true}
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
      <div className={styles.page}>
        <SubAlbums path={"/"} />
      </div>
    </>
  );
};

export default IndexPage;
