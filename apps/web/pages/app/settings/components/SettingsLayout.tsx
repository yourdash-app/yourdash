import React from "react"
import SideBar from "ui/backup/elements/sideBar/SideBar"
import styles from "./SettingsLayout.module.scss"
import { useRouter } from "next/router"

const SettingsLayout: React.FC = ({ children }) => {
  const router = useRouter()

  return (
    <div className={styles.root}>
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
                  icon: "person-16",
                  name: "Profile",
                  onClick: () => {
                    router.push(`/app/settings/user/profile`)
                  },
                  type: "button",
                },
                {
                  icon: "app-launcher-16",
                  name: "Panel",
                  onClick: () => {
                    router.push(`/app/settings/user/panel`)
                  },
                  type: "button",
                },
                {
                  icon: "mail-16",
                  name: "Notifications",
                  onClick: () => {
                    router.push(`/app/settings/user/notifications`)
                  },
                  type: "button",
                },
                {
                  icon: "paintbrush-16",
                  name: "Theme",
                  onClick: () => {
                    router.push(`/app/settings/user/theme`)
                  },
                  type: "button",
                }
              ]
            }
      />
      <div className={styles.page}>
        {children}
      </div>
    </div>
  )
}

export default SettingsLayout