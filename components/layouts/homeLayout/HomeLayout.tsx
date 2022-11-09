import NavigationBar from "./navigationBar/NavigationBar"
import styles from "./HomeLayout.module.css"

export interface IHomeLayout extends React.ComponentPropsWithoutRef<'div'> { }

const HomeLayout: React.FC<IHomeLayout> = ({ children, ..._divProps }) => {
  return <>
    <NavigationBar />
    <div className={styles.root}>
    {children}
    </div>
  </>;
};

export default HomeLayout;