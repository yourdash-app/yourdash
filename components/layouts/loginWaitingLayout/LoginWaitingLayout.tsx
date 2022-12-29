import styles from "./LoginWaitingLayout.module.css"

export interface ILoginWaitingLayout extends React.ComponentPropsWithoutRef<'div'> { }

const LoginWaitingLayout: React.FC<ILoginWaitingLayout> = ({
  children,
  ..._divProps
}) => {
  return <div className={styles.root}>
    {children}
  </div>
};

export default LoginWaitingLayout;