import React, { CSSProperties } from "react";
import styles from "./Icon.module.scss";
// @ts-ignore
import { YourDashIcon } from "./iconDictionary.ts";

type COLOR = `#${ string }` | `rgb(${ string })` | `rgba(${ string })` | `var(--${ string })` | "currentColor"

export interface IIcon extends React.ComponentPropsWithoutRef<"div"> {
  icon: YourDashIcon;
  style?: CSSProperties;
  className?: string;
  color?: COLOR;
  useDefaultColor?: boolean;
}

const Icon: React.FC<IIcon> = ( {
  icon,
  style,
  className,
  color,
  useDefaultColor,
  ...genericProps
} ) => (
  <div
    {...genericProps}
    data-component-type-icon="true"
    style={{
      ...( useDefaultColor
        ? {
          backgroundImage: `url(${ icon })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }
        : {
          WebkitMaskImage: `url(${ icon })`,
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
          backgroundColor: color || "currentColor",
          maskImage: `url(${ icon })`,
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "cover"
        } ), ...style
    }}
    className={`${ styles.component } ${ className }`}
  />
);

export default Icon;
