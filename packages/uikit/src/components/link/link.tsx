/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import Icon from "../icon/icon.tsx";
import { UKIcon } from "../icon/iconDictionary.ts";
import styles from "./link.module.scss";
import { FC } from "react";

const Link: FC<{ text: string; to: string; className?: string; hideLinkIcon?: boolean }> = (props) => {
  return (
    <a
      href={props.to}
      className={clippy(styles.component, props.className)}
    >
      {props.text}
      {!props.hideLinkIcon && (
        <Icon
          icon={UKIcon.Link}
          className={styles.icon}
        />
      )}
    </a>
  );
};

export default Link;
