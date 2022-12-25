import { useState } from 'react';
import styles from './ToggleSwitch.module.scss';

export interface IToggleSwitch extends React.ComponentPropsWithoutRef<"input"> {
  onValueChange: (_value: boolean) => void
}

const ToggleSwitch: React.FC<IToggleSwitch> = ({ onValueChange, ...inputProps }) => {
  const [ value, setValue ] = useState(false)

  return <div className={styles.component}>
    <input {...inputProps} onChange={(val) => {
      setValue(val.currentTarget.checked)
      onValueChange(val.currentTarget.checked)
    }} type="checkbox" />
    <div style={{
      ...value ? {
        left: "100%",
        translate: "-100%"
      } : {
        left: 0,
        translate: "0%"
      }
    }}></div>
  </div>
};

export default ToggleSwitch;
