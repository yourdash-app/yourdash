/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import styles from "./image.module.scss";
import { FC } from "react";

const Image: FC<{ src: string; accessibleLabel: string; className?: string; authenticatedImage?: boolean }> = (
  props,
) => {
  return (
    <img
      className={`${styles.component} ${props.className}`}
      src={(props.authenticatedImage ? csi.getInstanceUrl() : "") + props.src}
      draggable={false}
      loading="lazy"
      alt={props.accessibleLabel}
    />
  );
};

export default Image;
