/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import Icon from "../icon/icon.tsx";
import { UKIcon } from "../../core/iconDictionary.ts";
import styles from "./iconButton.module.scss";
import { FC } from "react";

const IconButton: FC<{
  icon: (typeof UKIcon)[keyof typeof UKIcon];
  accessibleLabel: string;
  onClick: () => void;
  className?: string;
  preserveColor?: boolean;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      aria-label={props.accessibleLabel}
      className={clippy(styles.component, props.className)}
    >
      <Icon
        size={"1.25rem"}
        preserveColor={props.preserveColor}
        icon={props.icon}
      />
    </button>
  );
};

export default IconButton;
