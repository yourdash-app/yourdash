/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import Icon from "../icon/icon.js";
import { UKIcon } from "../icon/iconDictionary.js";
import styles from "./textInput.module.scss";
import { FC, useState } from "react";

// TODO: maybe remove onEnter for onSubmit

const TextInput: FC<{
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder: string;
  icon?: UKIcon;
  onEnter?: (value: string) => void;
  defaultValue?: string;
  accessibleName: string;
  className?: string;
  type?: string;
}> = (props) => {
  const [value, setValue] = useState(props.defaultValue);

  return (
    <div className={clippy(styles.component, props.className)}>
      {props.icon && (
        <Icon
          className={styles.icon}
          icon={props.icon}
        />
      )}
      <input
        type={props.type || "text"}
        aria-label={props.accessibleName}
        value={value}
        className={clippy(styles.input, !props.icon && styles.noIcon)}
        placeholder={props.placeholder}
        onKeyUp={(e) => {
          props.onChange?.(e.currentTarget.value);
        }}
        onChange={(e) => props.onSubmit?.(e.currentTarget.value)}
        onKeyDown={(e) => {
          setValue(e.currentTarget.value);

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
