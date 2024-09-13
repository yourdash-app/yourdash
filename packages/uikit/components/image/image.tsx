/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import styles from "./image.module.scss";
import { FC, useState } from "react";
import clippy from "@yourdash/shared/web/helpers/clippy";

const Image: FC<{
  src: string;
  accessibleLabel: string;
  containerClassName?: string;
  className?: string;
  authenticatedImage?: boolean;
  disableLazyLoading?: boolean;
  noRounding?: boolean;
}> = (props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={clippy(styles.componentContainer, props.containerClassName, !loaded && styles.loading)}>
      <img
        className={clippy(styles.component, props.className, loaded && styles.loaded, props.noRounding && styles.noRounding)}
        draggable={false}
        loading={props.disableLazyLoading ? "eager" : "lazy"}
        alt={props.accessibleLabel}
        onLoad={(e) => {
          setLoaded(e.currentTarget.complete);
        }}
        src={(props.authenticatedImage ? coreCSI.getInstanceUrl() : "") + props.src}
      />
    </div>
  );
};

export default Image;
