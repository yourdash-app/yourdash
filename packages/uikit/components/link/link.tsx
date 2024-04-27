/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import styles from "./link.module.scss";
import { FC } from "react";

const Link: FC<{ text: string; to: string; extraClass?: string }> = (props) => {
  return (
    <a
      href={props.to}
      className={clippy(styles.component, props.extraClass)}
    >
      {props.text}
    </a>
  );
};

export default Link;
