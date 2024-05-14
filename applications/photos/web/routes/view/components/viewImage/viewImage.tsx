/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Image from "@yourdash/uikit/components/image/image.js";
import { FC } from "react";
import styles from "./viewImage.module.scss";
import PanAndZoom from "@yourdash/uikit/views/panAndZoom/panAndZoom";

const ViewImage: FC<{ mediaUrl: string }> = ({ mediaUrl }) => {
  return (
    <PanAndZoom>
      <Image
        className={styles.viewImage}
        src={mediaUrl}
        authenticatedImage
        accessibleLabel={""}
      />
    </PanAndZoom>
  );
};

export default ViewImage;
