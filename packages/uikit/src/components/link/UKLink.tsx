/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKIcon from "../icon/UKIcon.tsx";
import { UKIcons } from "../../core/iconDictionary.ts";
import styles from "./link.module.scss";
import { FC } from "react";

const UKLink: FC<{ text: string; to: string; className?: string; hideLinkIcon?: boolean }> = (props) => {
  return (
    <a
      href={props.to}
      className={clippy(styles.component, props.className)}
    >
      {props.text}
      {!props.hideLinkIcon && (
        <UKIcon
          icon={UKIcons.Link}
          className={styles.icon}
        />
      )}
    </a>
  );
};

export default UKLink;
