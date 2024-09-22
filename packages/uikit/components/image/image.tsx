/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import Icon from "../icon/icon.tsx";
import { UKIcon } from "../icon/iconDictionary.ts";
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
  const [src, setSrc] = useState<string>(props.src);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
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
  }, [src]);

  useEffect(() => {
    setHasFailed(false);
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (props.src !== src) {
      setSrc(props.src);
    }
  }, [props.src]);

  return (
    <div
      ref={ref}
      className={clippy(styles.componentContainer, props.containerClassName, !loaded && styles.loading, hasFailed && styles.serverError)}
      style={{
        // @ts-ignore
        "--background-size": backgroundSize + "px",
      }}
    >
      {!hasFailed ? (
        <img
          className={clippy(styles.component, props.className, loaded && styles.loaded, props.noRounding && styles.noRounding)}
          draggable={false}
          onError={() => setHasFailed(true)}
          loading={props.disableLazyLoading ? "eager" : "lazy"}
          alt={props.accessibleLabel}
          onLoad={(e) => {
            setLoaded(e.currentTarget.complete);
          }}
          src={(props.authenticatedImage ? coreCSI.getInstanceUrl() : "") + src}
        />
      ) : (
        <Icon icon={UKIcon.ServerError} />
      )}
    </div>
  );
};

export default Image;
