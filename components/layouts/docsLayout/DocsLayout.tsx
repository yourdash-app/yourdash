import Footer from "../homeLayout/footer/Footer";
import NavigationBar from "./../homeLayout/navigationBar/NavigationBar"
import styles from "./DocsLayout.module.scss"
import DocsSideBar from "./sideBar/SideBar";

export interface IHomeLayout extends React.ComponentPropsWithoutRef<'div'> { }

const HomeLayout: React.FC<IHomeLayout> = ({ children, ..._divProps }) => {
  return <>
    <NavigationBar />
    <div className={styles.root}>
      <section>
        <DocsSideBar />
        <div>
          {children}
        </div>
      </section>
      <Footer />
    </div>
  </>;
};

export default HomeLayout;