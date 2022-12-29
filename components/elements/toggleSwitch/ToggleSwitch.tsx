import { useState } from 'react';
import styles from './ToggleSwitch.module.scss';

export interface IToggleSwitch extends React.ComponentPropsWithoutRef<"input"> {
  onValueChange: (_value: boolean) => void
}

const ToggleSwitch: React.FC<IToggleSwitch> = ({
  onValueChange, ...inputProps 
}) => {
  const [ value, setValue ] = useState(false)

  return <div className={styles.component} style={{ ...value ? { backgroundColor: "var(--toggle-switch-bg-enabled)" } : {} }}>
    <input {...inputProps} onChange={(val) => {
      setValue(val.currentTarget.checked)
      onValueChange(val.currentTarget.checked)
    }} type="checkbox" />
    <div style={{ ...value ? {
      left: "calc(100% + 0.25rem)",
      translate: "-100%"
    } : {
      left: "-0.25rem",
      translate: "0%"
    } }}></div>
  </div>
};

export default ToggleSwitch;
