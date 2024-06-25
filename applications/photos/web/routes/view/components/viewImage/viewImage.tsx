/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Image from "@yourdash/uikit/components/image/image.js";
import { FC } from "react";
import styles from "./viewImage.module.scss";
import PanAndZoom from "@yourdash/uikit/views/panAndZoom/panAndZoom";

const ViewImage: FC<{ mediaUrl: string }> = ({ mediaUrl }) => {
  return (
    <>
      <PanAndZoom>
        <Image
          className={styles.viewImage}
          src={mediaUrl}
          authenticatedImage
          disableSpinner={false}
          accessibleLabel={""}
        />
      </PanAndZoom>
    </>
  );
};

export default ViewImage;
