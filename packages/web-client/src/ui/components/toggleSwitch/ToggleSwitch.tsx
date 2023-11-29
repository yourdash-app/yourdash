/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import styles from "./ToggleSwitch.module.scss";

export interface IToggleSwitch {
  setValue: ( _value: boolean ) => void,
  value: boolean
}

const ToggleSwitch: React.FC<IToggleSwitch> = ( {
  setValue, value
} ) => {
  return (
    <>
      <div
        className={`${styles.component} ${value ? "bg-green-400" : "bg-red-400"}`}
        onClick={() => {
          setValue( !value );
        }}
      >
        <div
          className={styles.thumb}
          style={{
            ...value
              ? {
                left: "calc(100% + 0.25rem)", translate: "-100%"
              }
              : {
                left: "-0.25rem", translate: "0%"
              }
          }}
        />
      </div>
    </>
  );
};

export default ToggleSwitch;
