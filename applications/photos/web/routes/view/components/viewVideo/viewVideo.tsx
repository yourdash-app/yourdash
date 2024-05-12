/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import { FC } from "react";
import styles from "./viewVideo.module.scss";

const ViewVideo: FC<{ mediaUrl: string }> = ({ mediaUrl }) => {
  return (
    <video
      className={styles.viewVideo}
      src={csi.getInstanceUrl() + mediaUrl}
    />
  );
};

export default ViewVideo;
