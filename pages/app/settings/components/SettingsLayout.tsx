import React from "react"
import SideBar from "../../../../components/elements/sideBar/SideBar"
import styles from "./SettingsLayout.module.scss"
import { useRouter } from "next/router"

const SettingsLayout: React.FC = ({ children }) => {
  const router = useRouter()

  return <div className={styles.root}>
    <SideBar
      style={{ height: "100%" }}
      title="Settings"
      items={
        [
          {
            icon: "apps-16",
            name: "Overview",
            onClick: () => {
              router.push(`/app/settings/`)
            },
            type: "button",
          },
          { type: "separator", },
          {
            icon: "apps-16",
            name: "Overview",
            onClick: () => {
              console.log("Implement Me!!!")
            },
            type: "button",
          },
          {
            icon: "apps-16",
            items: [
              {
                icon: "apps-16",
                name: "Overview",
                onClick: () => {
                  console.log("Implement Me!!!")
                },
                type: "button",
              },
              { type: "separator", },
              {
                icon: "apps-16",
                name: "Overview",
                onClick: () => {
                  console.log("Implement Me!!!")
                },
                type: "button",
              },
            ],
            name: "Items",
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

export default SettingsLayout