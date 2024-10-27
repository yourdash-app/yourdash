/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import Icon from "../icon/icon.tsx";
import { UKIconType } from "../icon/iconDictionary.ts";
import styles from "./textInput.module.scss";
import React, { useEffect, useRef, useState } from "react";

// TODO: maybe remove onEnter for onSubmit

const TextInputComponent: React.FC<{
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder: string;
  icon?: UKIconType;
  onEnter?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  accessibleName: string;
  className?: string;
  type?: string;
}> = (props) => {
  const ref = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(props.defaultValue || "");

  useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.value = value;
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current?.value !== props.defaultValue) {
        ref.current?.onkeyup?.({ currentTarget: ref.current } as unknown as KeyboardEvent);
        ref.current?.onchange?.({ currentTarget: ref.current } as unknown as Event);
      }
    }, 200);
  }, []);

  return (
    <div className={clippy(styles.component, props.className)}>
      {props.icon && (
        <Icon
          className={styles.icon}
          icon={props.icon}
        />
      )}
      <input
        ref={ref}
        type={props.type || "text"}
        aria-label={props.accessibleName}
        className={clippy(styles.input, !props.icon && styles.noIcon)}
        placeholder={props.placeholder}
        onKeyUp={(e) => {
          setValue(e.currentTarget.value);
          props.onChange?.(e.currentTarget.value);
        }}
        onChange={(e) => props.onSubmit?.(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            props.onEnter?.(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
};

const TextInput = TextInputComponent;

export default TextInput;
