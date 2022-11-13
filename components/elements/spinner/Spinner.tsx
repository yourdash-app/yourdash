import styles from './Spinner.module.css';

export interface ISpinner {}

const Spinner: React.FC<ISpinner> = ({ children }) => {
  return <div className={styles.component}>{children}</div>;
};

export default Spinner;
