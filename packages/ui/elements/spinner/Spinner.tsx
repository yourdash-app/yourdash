import styles from './Spinner.module.css';

const Spinner: React.FC = ({ children }) => {
  return <div className={styles.component}>{children}</div>;
};

export default Spinner;
