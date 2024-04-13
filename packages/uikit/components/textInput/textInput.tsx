/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import Icon from "../icon/icon.js";
import { UKIcon } from "../icon/iconDictionary.js";
import styles from "./textInput.module.scss";

const TextInput: Component<{ onChange: (value: string) => void; placeholder: string; icon?: UKIcon }> = ({
  onChange,
  placeholder,
  icon,
}) => {
  return (
    <div class={styles.component}>
      {icon && (
        <Icon
          extraClass={styles.icon}
          icon={icon}
        />
      )}
      <input
        class={styles.input}
        placeholder={placeholder}
        type="text"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
