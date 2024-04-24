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
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder: string;
  icon?: UKIcon;
  onEnter?: (value: string) => void;
  defaultValue?: string;
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
        value={props.defaultValue || ""}
        class={clippy(styles.input, !props.icon && styles.noIcon)}
        placeholder={props.placeholder}
        type="text"
        onKeyUp={(e) => {
          props.onChange?.(e.currentTarget.value);
        }}
        onChange={(e) => props.onSubmit?.(e.currentTarget.value)}
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
