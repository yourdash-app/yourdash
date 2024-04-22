/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import { Component } from "solid-js";
import Icon from "../icon/icon.js";
import { UKIcon } from "../icon/iconDictionary.js";
import styles from "./textInput.module.scss";

const TextInput: Component<{
  onChange: (value: string) => void;
  placeholder: string;
  icon?: UKIcon;
  onEnter?: (value: string) => void;
}> = (props) => {
  return (
    <div class={styles.component}>
      {props.icon && (
        <Icon
          extraClass={styles.icon}
          icon={props.icon}
        />
      )}
      <input
        class={clippy(styles.input, !props.icon && styles.noIcon)}
        placeholder={props.placeholder}
        type="text"
        onChange={(e) => props.onChange(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            props.onEnter?.(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
};

export default TextInput;
