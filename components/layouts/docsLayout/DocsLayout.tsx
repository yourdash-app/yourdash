import SideBar from "../../elements/sideBar/SideBar";
import styles from "./DocsLayout.module.scss"

export type IDocsLayout = React.ComponentPropsWithoutRef<'div'>

const DocsLayout: React.FC<IDocsLayout> = ({ children }) => {
  return <>
    <div className={styles.root}>
      <section>
        <SideBar title="Docs" sections={[ {
          buttons: [
            {
              onClick: () => {
                console.log("Hello")
              },
              title: "Hello",
            },
            {
              onClick: () => {
                console.log("Hello")
              },
              title: "World",
            }
          ],
          title: "test",
        } ]} />
        <div>
          {children}
        </div>
      </section>
    </div>
  </>;
};

export default DocsLayout;