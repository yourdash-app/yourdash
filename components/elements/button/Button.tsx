import { CSSProperties } from 'react';
import styles from './Button.module.scss';

export interface IButton {
  children: React.ReactChild | React.ReactChild[];
  vibrant?: boolean;
  onClick: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

const Button: React.FC<IButton> = ({ children, vibrant, onClick, disabled, style }) => {
  return <button
    style={style}
    onClick={() => {
      if (!disabled) onClick()
    }}
    className={`${styles.component} ${vibrant ? styles.vibrant : ""}`}>{children}</button>;
};

export default Button;
