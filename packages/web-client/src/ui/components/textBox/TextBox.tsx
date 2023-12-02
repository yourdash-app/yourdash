/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import styles from "./TextBox.module.scss";
import React from "react";

export interface ITextBox extends React.ComponentPropsWithoutRef<"textarea"> {
  defaultValue?: string;
  className?: string;
}

const TextBox: React.FC<ITextBox> = ( {
  children,
  defaultValue,
  className,
  ...inputProps
} ) => (
  <textarea
    {...inputProps}
    onKeyDown={( e ) => {
      if ( e.key === "Tab" ) {
        e.preventDefault();
        e.stopPropagation();

        // insert tab into textarea
        const tab = "  ";
        const index = e.currentTarget.selectionStart;
        e.currentTarget.value = e.currentTarget.value.substring( 0, index ) + tab + e.currentTarget.value.substring( index );
        e.currentTarget.selectionEnd = index + tab.length;
      }
    }}
    defaultValue={defaultValue ? defaultValue : ""}
    className={`${ styles.textarea } ${ className }`}
  >{children}</textarea>
);

export default TextBox;
