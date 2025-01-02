/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import styles from "./icon.module.scss";
import { FC, useEffect, useState } from "react";
import ServerErrorIcon from "../../core/icons/server-error.svg";
import { UKIconType } from "../../core/iconDictionary";

const UKIcon: FC<{
  // noinspection TypeScriptDuplicateUnionOrIntersectionType
  icon: UKIconType;
  size?: string;
  color?: string;
  preserveColor?: boolean;
  className?: string;
}> = (props) => {
  const [icon, setIcon] = useState(ServerErrorIcon);

  useEffect(() => {
    if (typeof props.icon === "function") {
      props.icon().then((val) => {
        setIcon(val.default);
      });
    }
  }, [props.icon]);

  return (
    <div
      className={`${styles.component} ${props.className} ${props.preserveColor ? styles.preserveColor : ""}`}
      style={{
        "--icon": `url("${icon}")`,
        ...(!props.preserveColor ? { "--color": props.color } : {}),
        // @ts-ignore
        "--size": props.size,
      }}
    />
  );
};

export default UKIcon;
