import styles from "./DocsLayout.module.scss"
import { useRouter } from "next/router";
import ActionBar from "ui/navigation/ActionBar";

export type IDocsLayout = React.ComponentPropsWithoutRef<'div'>

const DocsLayout: React.FC<IDocsLayout> = ({ children }) => {
  const router = useRouter()

  return (
    <div className={styles.root}>
      <ActionBar
        actions={[
            {
              icon: "server-16",
              label: "Home",
              onClick: () => {
                router.push("/docs/")
              },
            },
            {
              icon: "server-16",
              label: "Components",
              onClick: () => {
                router.push("/docs/components")
              },
            }
          ]}
      />
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.listOfContents}/>
    </div>
)
};

export default DocsLayout;