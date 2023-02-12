import React, { useEffect, useState } from "react"
import styles from "./FilesSideBar.module.scss"
import SERVER, { verifyAndReturnJson } from "../../../../server"
import { type SideBarCategory } from "types/files/SideBar"
import { useRouter } from "next/navigation"
import Chiplet from "ui"

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
    return <div className={ styles.component }/>

  return (
    <div className={ styles.component }>
      <h1 className={ styles.title }>Files</h1>
      <div className={ styles.dirShortcuts }>
        {
            categories.length !== 0 ?
                categories.map((category: SideBarCategory, ind) => {
                  return (
                    <React.Fragment key={ category.title }>
                      <h3>{category.title}</h3>
                      <ul>
                        {
                            category.children.map((child, ind) => {
                              return (
                                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                                <div
                                  key={ child.path }
                                  onClick={ () => {
                                        router.push(`/app/files/p${child.path}`)
                                      } }
                                >
                                  <span>{child.title}</span>
                                  <Chiplet.DropdownContainer
                                    items={ [ {
                                          name: "Remove from 'Quick actions'",
                                          onClick: () => {
                                            verifyAndReturnJson(
                                                SERVER.delete(`/files/sidebar/category/${ind}`),
                                                res => {
                                                  setCategories(res)
                                                },
                                                () => {
                                                  return console.error(`unable to delete sidebar category ${ind}`)
                                                }
                                            )
                                          }
                                        } ] }
                                  >
                                    <Chiplet.IconButton
                                      icon="three-bars-16"
                                      onClick={ () => {
                                            console.log(`Implement Me!!!`)
                                          } }
                                    />
                                  </Chiplet.DropdownContainer>
                                </div>
                              )
                            })
                          }
                      </ul>
                    </React.Fragment>
                  )
                })
                : (
                  <Chiplet.Card className={ styles.dirShortcutsMessage }>
                    <h1>Oh no!</h1>
                    <p>You have no categories added to the Sidebar</p>
                    <Chiplet.Button
                      onClick={ () => {
                            verifyAndReturnJson(
                                SERVER.get(`/files/sidebar/set/default`),
                                res => {
                                  setCategories(res.categories)
                                },
                                () => {
                                  return console.error("unable to reset sidebar categories")
                                }
                            )
                          } }
                      vibrant
                    >Add default categories</Chiplet.Button>
                  </Chiplet.Card>
                )
          }
      </div>
      <section className={ styles.footer }>
        {/*
          <div className={styles.usageIcons}>
            <Icon name="codespaces-16" color="#ffffff" />
            <Icon name="codespaces-16" color="#ffffff" />
            <Icon name="codespaces-16" color="#ffffff" />
          </div>
        */}
        <div className={ styles.quota }>
          <div className={ styles.header }>
            Quota percentage full
          </div>
          <Chiplet.ProgressBar value={ 10 } displayPercentage/>
        </div>
      </section>
    </div>
  )
}

export default FilesSideBar
