import SideBar from "../../elements/sideBar/SideBar";
import Footer from "../homeLayout/footer/Footer";
import NavigationBar from "../homeLayout/navigationBar/NavigationBar"
import styles from "./DocsLayout.module.scss"

export interface IDocsLayout extends React.ComponentPropsWithoutRef<'div'> { }

const DocsLayout: React.FC<IDocsLayout> = ({ children, ..._divProps }) => {
  return <>
    <NavigationBar />
    <div className={styles.root}>
      <section>
        <SideBar title="Docs" sections={[ {
          title: "test",
          buttons: [
            {
              title: "Hello",
              onClick: () => { },
            },
            {
              title: "World",
              onClick: () => { },
            }
          ]
        } ]} />
        <div>
          {children}
        </div>
      </section>
      <Footer />
    </div>
  </>;
};

export default DocsLayout;