import SideBar from "ui/backup/elements/sideBar/SideBar";
import styles from "./DocsLayout.module.scss"
import { useRouter } from "next/router";

export type IDocsLayout = React.ComponentPropsWithoutRef<'div'>

const DocsLayout: React.FC<IDocsLayout> = ({ children }) => {
  const router = useRouter()

  return (
    <div className={styles.root}>
      <section>
        <SideBar
          title="Docs"
          items={[
            {
              icon: "server-16",
              name: "Home",
              onClick: () => {
                router.push("/docs/")
              },
              type: "button"
            },
            {
              icon: "server-16",
              name: "Components",
              onClick: () => {
                router.push("/docs/components")
              },
              type: "button"
            }
          ]}
        />
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.listOfContents}/>
      </section>
    </div>
)
};

export default DocsLayout;