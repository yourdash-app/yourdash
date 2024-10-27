/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "./iconDictionary.ts";
import styles from "./icon.module.scss";
import { FC } from "react";

const Icon: FC<{
  icon: UKIcon;
  size?: string;
  color?: string;
  preserveColor?: boolean;
  className?: string;
}> = (props) => {
  return (
    <div
      className={`${styles.component} ${props.className} ${props.preserveColor ? styles.preserveColor : ""}`}
      style={{
        "--icon": `url("${props.icon}")`,
        ...(!props.preserveColor ? { "--color": props.color } : {}),
        // @ts-ignore
        "--size": props.size,
      }}
    />
  );
};

export default Icon;
