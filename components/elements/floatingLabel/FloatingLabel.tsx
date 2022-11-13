import styles from './FloatingLabel.module.css';

export interface IFloatingLabel {
  children: string;
  type?: "info" | "error" | "warn" | "regular";
  className?: string;
}

const FloatingLabel: React.FC<IFloatingLabel> = ({ children, type, className }) => {
  return <div className={`${styles.component} ${children === "" ? styles.noContent : ""} ${type === "info" ? styles.info : ""} ${type === "error" ? styles.error : ""} ${type === "warn" ? styles.warn : ""} ${className}`}>{children}</div>;
};

export default FloatingLabel;
