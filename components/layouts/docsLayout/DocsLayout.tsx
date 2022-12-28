import SideBar from "../../elements/sideBar/SideBar";
import styles from "./DocsLayout.module.scss"

export interface IDocsLayout extends React.ComponentPropsWithoutRef<'div'> { }

const DocsLayout: React.FC<IDocsLayout> = ({ children, ..._divProps }) => {
  return <>
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
    </div>
  </>;
};

export default DocsLayout;