import { CSSProperties } from "react";
import COLOR from "../../../lib/color";
import CSSVariable from "../../../lib/cssVariable";
import YourDashIcon, { YourDashIconRawDictionary } from "./iconDictionary";

export interface IIcon extends React.ComponentPropsWithoutRef<'div'> {
  name: YourDashIcon;
  // eslint-disable-next-line no-undef
  style?: CSSProperties;
  className?: string;
  color?: COLOR | CSSVariable;
  useDefaultColor?: boolean;
}

const Icon: React.FC<IIcon> = ({ name, style, className, color, useDefaultColor, ...genericProps }) => {
  return (
    <div
      {...genericProps}
      data-component-type-icon
      style={{
        ...style,
        ...(useDefaultColor
          ? {
            backgroundImage: `url(${YourDashIconRawDictionary[ name ]})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }
          : {
            maskImage: `url(${YourDashIconRawDictionary[ name ]})`,
            WebkitMaskImage: `url(${YourDashIconRawDictionary[ name ]})`,
            backgroundColor: color || "#ff0000",
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
            maskSize: 'cover',
            WebkitMaskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
          }),
        ...{
          userSelect: "none"
        }
      }}
      className={className}
    />
  );
}

export default Icon