/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import React, { useState, FocusEventHandler, KeyboardEventHandler } from "react";
import Icon from "../icon/Icon";
import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary";

// @ts-ignore
export interface ITextInput extends React.HTMLProps<HTMLInputElement> {
  onChange: (text: string, e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  mustMatchRegex?: RegExp;
  placeholder?: string;
  className?: string;
  // @ts-ignore
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  onValid?: (value: string) => void;
  autoComplete?: string;
  inputClassName?: string;
  icon?: typeof UKIcon;
  accessibleName: string;
  preceedingInlay?: React.ReactNode;
  followingInlay?: React.ReactNode;
}

const TextInput: React.FC<ITextInput> = ({
  onChange,
  onBlur,
  mustMatchRegex,
  placeholder,
  className,
  onKeyDown,
  defaultValue,
  onValid,
  autoComplete,
  inputClassName,
  icon,
  accessibleName,
  preceedingInlay,
  followingInlay,
  ...extraProps
}) => {
  const [valid, setValid] = useState(!mustMatchRegex);

  return (
    <div className={clippy("relative transition-all flex min-h-[2.25rem] box-content min-w-48", className)}>
      <div
        className={clippy(
          "rounded-button-rounding bg-base-800 pl-2 pt-1 pb-1 pr-2 flex gap-1 items-center justify-center w-full",
          mustMatchRegex
            ? valid
              ? "hover:border-green-400 focus-within:border-green-400 border-2 border-base-600"
              : "border-2 border-red-400"
            : "border-2 border-base-600",
        )}
      >
        {preceedingInlay}
        {icon && (
          <Icon
            icon={icon}
            className={"h-4"}
          />
        )}
        <input
          {...extraProps}
          autoComplete={autoComplete}
          placeholder={placeholder}
          name={accessibleName}
          className={clippy("w-full h-full outline-none relative z-0 transition-all bg-transparent", inputClassName)}
          type={extraProps.type || "text"}
          onBlur={onBlur}
          defaultValue={defaultValue}
          onKeyDown={(e) => {
            onKeyDown?.(e as unknown as KeyboardEventHandler<HTMLInputElement>);
          }}
          onChange={(e) => {
            const value = e.currentTarget.value;
            onChange(value, e);
            if (
              !mustMatchRegex ||
              (value.match(mustMatchRegex) !== null && value.match(mustMatchRegex)?.length === 1)
            ) {
              setValid(true);
              onValid?.(value);
            } else {
              setValid(false);
            }
          }}
        />
        {followingInlay}
      </div>
    </div>
  );
};

export default TextInput;
