/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import styles from "./image.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";

const Image: FC<{
  src: string;
  accessibleLabel: string;
  containerClassName?: string;
  className?: string;
  authenticatedImage?: boolean;
  disableLazyLoading?: boolean;
  noRounding?: boolean;
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [backgroundSize, setBackgroundSize] = useState<number>(0);

  useEffect(() => {
    const rc = ref.current;

    if (!rc) {
      return;
    }

    setTimeout(() => {
      const bounds = rc.getBoundingClientRect();

      setBackgroundSize(bounds.height > bounds.width ? bounds.height : bounds.width);
    }, 0);
  }, []);

  return (
    <div
      ref={ref}
      className={clippy(styles.componentContainer, props.containerClassName, !loaded && styles.loading)}
      style={{
        // @ts-ignore
        "--background-size": backgroundSize + "px",
      }}
    >
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
