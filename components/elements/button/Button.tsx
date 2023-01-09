import { CSSProperties } from 'react';
import styles from './Button.module.scss';

export interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  vibrant?: boolean;
  style?: CSSProperties;
}

const Button: React.FC<IButton> = ({
  children, vibrant, style, ...extraProps
}) => {
  return <button
    {...extraProps}
    style={style}
    className={`${styles.component} ${vibrant ? styles.vibrant : ""}`}>{children}</button>;
};

export default Button;
