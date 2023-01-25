import React, { useEffect, useState } from "react"
import ProgressBar from "ui/elements/progressBar/ProgressBar"
import styles from "./FilesSideBar.module.scss"
import IconButton from "ui/elements/iconButton/IconButton"
import DropdownMenu from "ui/elements/dropdownMenu/DropdownMenu"
import SERVER, { verifyAndReturnJson } from "../../../../server"
import { SideBarCategory } from "types/files/SideBar"
import { useRouter } from "next/navigation"
import Button from "ui/elements/button/Button"
import Card from "ui/containers/card/Card"

export interface IFilesSideBar {
  currentDir: string
}

const FilesSideBar: React.FC<IFilesSideBar> = () => {
  const router = useRouter()
  const [ categories, setCategories ] = useState(undefined as SideBarCategory[] | undefined)

  useEffect(() => {
    verifyAndReturnJson(
        SERVER.get(`/files/sidebar/categories`),
        (data: { categories: SideBarCategory[] }) => {
          setCategories(data.categories)
        },
        () => console.error("unable to fetch sidebar categories")
    )
  }, [])

  if (categories === undefined)
    return <div className={styles.component}/>

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>Files</h1>
      <div className={styles.dirShortcuts}>
        {
        categories.length !== 0 ?
            categories.map((category: SideBarCategory, ind) => (
              <React.Fragment key={ind}>
                <h3>{category.title}</h3>
                <ul>
                  {
                    category.children.map((child, ind) => (
                      <li
                        key={ind}
                        onClick={() => {
                            router.push(`/app/files/p${child.path}`)
                          }}
                      >
                        <span>{child.title}</span>
                        <DropdownMenu
                          items={[ {
                              name: "Remove from 'Quick actions'",
                              onClick: () => {
                                verifyAndReturnJson(
                                    SERVER.delete(`/files/sidebar/category/${ind}`),
                                    res => {
                                      setCategories(res)
                                    },
                                    () => console.error(`unable to delete sidebar category ${ind}`)
                                )
                              }
                            } ]}
                        >
                          <IconButton
                            icon="three-bars-16"
onClick={() => {
                            console.log(`Implement Me!!!`)
                          }}
                          />
                        </DropdownMenu>
                      </li>
))
                  }
                </ul>
              </React.Fragment>
))
            : (
              <Card className={styles.dirShortcutsMessage}>
                <h1>Oh no!</h1>
                <p>You have no categories added to the Sidebar</p>
                <Button
                  onClick={() => {
                verifyAndReturnJson(
                    SERVER.get(`/files/sidebar/set/default`),
                    res => {
                      setCategories(res.categories)
                    },
                    () => console.error("unable to reset sidebar categories")
                )
              }}
                  vibrant
                >Add default categories</Button>
              </Card>
)
      }
      </div>
      <section className={styles.footer}>
        {/*
          <div className={styles.usageIcons}>
            <Icon name="codespaces-16" color="#ffffff" />
            <Icon name="codespaces-16" color="#ffffff" />
            <Icon name="codespaces-16" color="#ffffff" />
          </div>
        */}
        <div className={styles.quota}>
          <div className={styles.header}>
            Quota percentage full
          </div>
          <ProgressBar value={10} displayPercentage/>
        </div>
      </section>
    </div>
)
}

export default FilesSideBar