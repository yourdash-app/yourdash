/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKIcon from "../icon/UKIcon.tsx";
import { UKIconType } from "../../core/iconDictionary.ts";
import styles from "./textInput.module.scss";
import React, { useEffect, useRef } from "react";

const UKTextInput: React.FC<{
  getValue?: React.Dispatch<React.SetStateAction<string>>;
  getLiveValue?: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: (value: string) => void;
  placeholder: string;
  icon?: UKIconType;
  defaultValue?: string;
  value?: string;
  accessibleName: string;
  className?: string;
  type?: string;
  autoComplete?: string;
}> = (props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (props.value) ref.current.value = props.value;
  }, [props.value]);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.onchange = () => {
      if (!ref.current) return;
      if (!props.getValue) return;

      props.getValue(ref.current.value);
    };

    ref.current.onkeyup = (event) => {
      if (!ref.current) return;
      if (!props.onSubmit) return;

      if (props.getLiveValue) {
        props.getLiveValue(ref.current.value);
      }

      if (event.key === "Enter") {
        props.onSubmit(ref.current.value);
      }
    };
  }, []);

  return (
    <div className={clippy(styles.component, props.className)}>
      {props.icon && (
        <UKIcon
          className={styles.icon}
          icon={props.icon}
        />
      )}
      <input
        autoComplete={props.autoComplete}
        ref={ref}
        type={props.type || "text"}
        aria-label={props.accessibleName}
        defaultValue={props.defaultValue}
        className={clippy(styles.input, !props.icon && styles.noIcon)}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default UKTextInput;
