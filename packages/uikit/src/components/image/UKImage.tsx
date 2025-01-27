/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKIcon from "../icon/UKIcon.tsx";
import { UKIcons } from "../../core/iconDictionary.ts";
import styles from "./image.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";

const UKImage: FC<{
  src: string;
  accessibleLabel: string;
  containerClassName?: string;
  className?: string;
  disableLazyLoading?: boolean;
  noRounding?: boolean;
  width?: number;
  height?: number;
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string>(props.src);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [backgroundSize, setBackgroundSize] = useState<number>(0);
  const attempts = useRef<number>(0);

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
          width={props.width}
          height={props.height}
          onError={() => {
            setHasFailed(true);
            attempts.current++;

            setTimeout(() => {
              if (attempts.current && attempts.current <= 3) {
                setSrc((old) => `${old}?refresh=${Date.now()}`);
              }
            }, 500);
          }}
          loading={props.disableLazyLoading ? "eager" : "lazy"}
          alt={props.accessibleLabel}
          onLoad={(e) => {
            setLoaded(e.currentTarget.complete);
            attempts.current = 0;
          }}
          src={src}
        />
      ) : (
        <UKIcon icon={UKIcons.ServerError} />
      )}
    </div>
  );
};

export default UKImage;
