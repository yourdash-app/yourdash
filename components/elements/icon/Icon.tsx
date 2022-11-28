import { CSSProperties } from "react";
import COLOR from "../../../lib/color";
import CSSVariable from "../../../lib/cssVariable";
import YourDashIcon, { YourDashIconRawDictionary } from "./iconDictionary";

export default function Icon(props: {
  name: YourDashIcon;
  // eslint-disable-next-line no-undef
  style?: CSSProperties;
  className?: string;
  color?: COLOR | CSSVariable;
  useDefaultColor?: boolean;
}) {
  return (
    <div
      data-component-type-icon
      style={{
        ...props.style,
        ...(props.useDefaultColor
          ? {
            backgroundImage: `url(${YourDashIconRawDictionary[ props.name ]})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }
          : {
            maskImage: `url(${YourDashIconRawDictionary[ props.name ]})`,
            WebkitMaskImage: `url(${YourDashIconRawDictionary[ props.name ]})`,
            backgroundColor: props.color || "#ff0000",
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
      className={props.className}
    />
  );
}