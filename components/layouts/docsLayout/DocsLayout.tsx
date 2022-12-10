import Footer from "../homeLayout/footer/Footer";
import NavigationBar from "../homeLayout/navigationBar/NavigationBar"
import styles from "./DocsLayout.module.scss"
import DocsSideBar from "./sideBar/SideBar";

export interface IDocsLayout extends React.ComponentPropsWithoutRef<'div'> { }

const DocsLayout: React.FC<IDocsLayout> = ({ children, ..._divProps }) => {
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

export default DocsLayout;