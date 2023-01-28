import React, { CSSProperties } from "react";
import { type COLOR } from "types/global/color";
import { type ChipletIcon, ChipletRawIconDictionary } from "./iconDictionary.ts";
import styles from "./Icon.module.scss"

export interface IIcon extends React.ComponentPropsWithoutRef<'div'> {
  name: ChipletIcon;
  style?: CSSProperties;
  className?: string;
  color?: COLOR;
  useDefaultColor?: boolean;
}

const Icon: React.FC<IIcon> = ({ name, style, className, color, useDefaultColor, ...genericProps }) => {
  return (
    <div
      {...genericProps}
      data-component-type-icon
      style={{
            ...(useDefaultColor ? {
              backgroundImage: `url(${ChipletRawIconDictionary[name]})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            } : {
              WebkitMaskImage: `url(${ChipletRawIconDictionary[name]})`,
              WebkitMaskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: 'cover',
              backgroundColor: color || "#ff0000",
              maskImage: `url(${ChipletRawIconDictionary[name]})`,
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
              maskSize: 'cover',
            }), ...style
          }}
      className={`${styles.component} ${className}`}
    />
  )
}

export default Icon
