import Chiplet from "ui";
import styles from "./DocsLayout.module.scss"

export type IDocsLayout = React.ComponentPropsWithoutRef<'div'>

const DocsLayout: React.FC<IDocsLayout> = ({ children }) => {return (
  <div className={ styles.root }>
    <section>
      <Chiplet.SideBar
        title="Docs"
        items={ [
              {
                icon: "server-16",
                label: "Hello",
                onClick: () => {
                  console.log("Implement Me!!!")
                }
              },
              {
                icon: "server-16",
                label: "World",
                onClick: () => {
                  console.log("Implement Me!!!")
                }
              }
            ] }
      />
      <div className={ styles.content }>
        {children}
      </div>
      <div className={ styles.listOfContents }/>
    </section>
  </div>
)};

export default DocsLayout;