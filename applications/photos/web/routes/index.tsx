/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Image from "@yourdash/uikit/components/image/image.js";
import useResource from "@yourdash/web/src/lib/useResource.js";
import { FC } from "react";
import Text from "@yourdash/uikit/components/text/text.js";
import PHOTOS_LOGO from "../assets/photosLogo.png";
import styles from "./index.module.scss";

const IndexPage: FC = () => {
  const albums = useResource<string[]>(() => csi.getJson("/app::photos/album/@/photos/")) || [];

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
      {albums.map((album) => {
        return (
          <Text
            text={album}
            key={album}
          />
        );
      })}
    </>
  );
};

export default IndexPage;
