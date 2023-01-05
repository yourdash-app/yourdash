import React, { useState } from "react"
import SideBar from "../../../../components/elements/sideBar/SideBar"
import styles from "./TasksLayout.module.scss"
import { useRouter } from "next/router"
import YourDashOrganization from "../../../../types/core/organization"

const TasksLayout: React.FC = ({ children }) => {
  const router = useRouter()

  const [ personalLists, setPersonalLists ] = useState([])
  const [ organizations, setOrganizations ] = useState([] as YourDashOrganization[])

  return <div className={styles.root}>
    <SideBar
      style={{ height: "100%" }}
      title="Settings"
      items={
        [
          {
            icon: "apps-16",
            name: "Home",
            onClick: () => {
              router.push(`/app/tasks/`)
            },
            type: "button",
          },
          { type: "separator", },
          {
            icon: "person-16",
            items: [
              {
                icon: "person-16",
                name: "Untitled",
                onClick: () => {
                  router.push(`/app/tasks/personal/list/Untitled`)
                },
                type: "button",
              }
            ],
            name: "Personal",
            type: "category",
          },
          {
            icon: "app-launcher-16",
            items: organizations.map((org) => {
              return {
                icon: org.icon,
                name: org.name,
                onClick: () => {
                  router.push(`/app/tasks/organization/`)
                },
                type: "button"
              }
            }),
            name: "Organizations",
            type: "category",
          }
        ]
      }
    />
    <div className={styles.page}>
      {children}
    </div>
  </div>
}

export default TasksLayout