import SideBar from "../../elements/sideBar/SideBar";
import styles from "./DocsLayout.module.scss"

export type IDocsLayout = React.ComponentPropsWithoutRef<'div'>

const DocsLayout: React.FC<IDocsLayout> = ({ children }) => {
  return <>
    <div className={styles.root}>
      <section>
        <SideBar title="Docs" items={[
          {
            icon: "server-16",
            name: "Hello",
            onClick: () => {
              console.log("Hello")
            },
            type: "button"
          },
          {
            icon: "server-16",
            name: "World",
            onClick: () => {
              console.log("Hello")
            },
            type: "button"
          }
        ]} />
        <div>
          {children}
        </div>
      </section>
    </div>
  </>;
};

export default DocsLayout;