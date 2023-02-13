import React, { CSSProperties } from "react";
import { type COLOR } from "types/global/color";
// @ts-ignore
import { type ChipletIcon, ChipletIconDictionary } from "./iconDictionary.ts";
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
      { ...genericProps }
      data-component-type-icon="true"
      style={ {
            ...(useDefaultColor ? {
              backgroundImage: `url(${ChipletIconDictionary[name]})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            } : {
              WebkitMaskImage: `url(${ChipletIconDictionary[name]})`,
              WebkitMaskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: 'cover',
              backgroundColor: color || "#ff0000",
              maskImage: `url(${ChipletIconDictionary[name]})`,
              maskPosition: 'center',
              maskRepeat: 'no-repeat',
              maskSize: 'cover',
            }), ...style
          } }
      className={ `${styles.component} ${className}` }
    />
  )
}

export default Icon
