import React, { useState } from "react";
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
        className={`${styles.component} ${value && "bg-green-400"}`}
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
