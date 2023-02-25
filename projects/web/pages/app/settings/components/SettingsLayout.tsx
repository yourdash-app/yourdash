import React from "react"
import styles from "./SettingsLayout.module.scss"
import { useRouter } from "next/router"
import Chiplet from "ui";

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()

  return (
    <div className={ styles.root }>
      <Chiplet.SideBar
        style={ { height: "100%" } }
        title="Settings"
        items={
              [
                {
                  icon: "apps-16",
                  label: "Overview",
                  onClick: () => {
                    router.push(`/app/settings/`)
                  },
                },
                {
                  icon: "person-16",
                  label: "Profile",
                  onClick: () => {
                    router.push(`/app/settings/user/profile`)
                  },
                },
                {
                  icon: "app-launcher-16",
                  label: "Panel",
                  onClick: () => {
                    router.push(`/app/settings/user/panel`)
                  },
                },
                {
                  icon: "mail-16",
                  label: "Notifications",
                  onClick: () => {
                    router.push(`/app/settings/user/notifications`)
                  },
                },
                {
                  icon: "paintbrush-16",
                  label: "Theme",
                  onClick: () => {
                    router.push(`/app/settings/user/theme`)
                  },
                }
              ]
            }
      />
      <div className={ styles.page }>
        {children}
      </div>
    </div>
  )
}

export default SettingsLayout