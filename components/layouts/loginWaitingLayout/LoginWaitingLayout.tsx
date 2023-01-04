import styles from "./LoginWaitingLayout.module.css"

const LoginWaitingLayout: React.FC = ({ children }) => {
  return <div className={styles.root}>
    {children}
  </div>
};

export default LoginWaitingLayout;