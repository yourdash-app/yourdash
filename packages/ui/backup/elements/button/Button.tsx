import styles from './Button.module.scss';

export interface IButton extends React.ComponentPropsWithoutRef<"button"> {
  vibrant?: boolean;
  className?: string;
}

const Button: React.FC<IButton> = ({
  children, vibrant, className, ...extraProps
}) => {
  return <button {...extraProps} className={`${styles.component} ${vibrant ? styles.vibrant : ""} ${className}`}>{children}</button>;
};

export default Button;
