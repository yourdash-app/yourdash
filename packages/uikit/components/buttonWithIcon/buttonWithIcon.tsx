/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import Icon from "../icon/icon";
import { UKIcon } from "../icon/iconDictionary";
import styles from "./buttonWithIcon.module.scss";
import { FC } from "react";

const ButtonWithIcon: FC<{
  icon: UKIcon;
  onClick: () => void;
  text: string;
  className?: string;
  disabled?: boolean;
}> = (props) => {
  return (
    <button
      className={clippy(styles.component, props.className)}
      onClick={props.onClick}
      aria-label={props.text}
      disabled={props.disabled}
    >
      <Icon
        size={"1.25rem"}
        className={styles.icon}
        icon={props.icon}
      />
      {props.text}
    </button>
  );
};

export default ButtonWithIcon;
