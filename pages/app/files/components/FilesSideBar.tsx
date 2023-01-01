import React, { useEffect, useState } from "react"
import ProgressBar from "../../../../components/elements/progressBar/ProgressBar"
import styles from "./FilesSideBar.module.scss"
import IconButton from "../../../../components/elements/iconButton/IconButton"
import DropdownMenu from "../../../../components/elements/dropdownMenu/DropdownMenu"
import SERVER, { verifyAndReturnJson } from "../../../../lib/server"
import { SideBarCategory } from "../../../../types/files/SideBar"
import { useRouter } from "next/navigation"
import Button from "../../../../components/elements/button/Button"
import Card from "../../../../components/containers/card/Card"

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
      () => {
        return console.error("unable to fetch sidebar categories")
      }
    )
  }, [])

  if (categories === undefined)
    return <div className={styles.component}></div>

  return <div className={styles.component}>
    <h1 className={styles.title}>Files</h1>
    <div className={styles.dirShortcuts}>
      {
        categories.length !== 0 ?
          categories.map((category: SideBarCategory, ind) => {
            return <React.Fragment key={ind}>
              <h3>{category.title}</h3>
              <ul>
                {
                  category.children.map((child, ind) => {
                    return <li
                      key={ind}
                      onClick={() => {
                        router.push(`/app/files/p${child.path}`)
                      }}>
                      <span>{child.title}</span>
                      <DropdownMenu
                        items={[ {
                          name: "Remove from 'Quick actions'",
                          onClick: () => {
                            verifyAndReturnJson(
                              SERVER.delete(`/files/sidebar/category/${ind}`),
                              (res) => {
                                setCategories(res)
                              },
                              () => {
                                return console.error(`unable to delete sidebar category ${ind}`)
                              }
                            )
                          }
                        } ]}>
                        <IconButton icon="three-bars-16" onClick={() => { }} />
                      </DropdownMenu>
                    </li>
                  })
                }
              </ul>
            </React.Fragment>
          })
          : <Card className={styles.dirShortcutsMessage}>
            <h1>Oh no!</h1>
            <p>You have no categories added to the Sidebar</p>
            <Button onClick={() => {
              verifyAndReturnJson(
                SERVER.get(`/files/sidebar/set/default`),
                (res) => {
                  setCategories(res.categories)
                },
                () => {
                  return console.error("unable to reset sidebar categories")
                }
              )
            }} vibrant>Add default categories</Button>
          </Card>
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
        <ProgressBar value={10} displayPercentage></ProgressBar>
      </div>
    </section>
  </div >
}

export default FilesSideBar