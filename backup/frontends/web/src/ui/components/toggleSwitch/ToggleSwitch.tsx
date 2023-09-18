import React, { useState } from "react";
import styles from "./ToggleSwitch.module.scss";

export interface IToggleSwitch extends React.ComponentPropsWithoutRef<"input"> {
  onValueChange: ( _value: boolean ) => void,
  defaultValue?: string
}

const ToggleSwitch: React.FC<IToggleSwitch> = ( {
  onValueChange, defaultValue = "false", ...inputProps
} ) => {
  const [value, setValue] = useState( defaultValue === "true" );

  return (
    <div
      className={`${styles.component} ${value && "bg-green-400"}`}
    >
      <input
        {...inputProps}
        onChange={val => {
          setValue( val.currentTarget.checked );
          onValueChange( val.currentTarget.checked );
        }}
        type="checkbox"
        defaultValue={value ? "true" : "false"}
      />
      <div style={{
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
  );
};

export default ToggleSwitch;
