import { useRouter } from "next/router"
import React from "react"
import Button from "../../../../components/elements/button/Button"
import SideBar from "../../../../components/elements/sideBar/SideBar"
import styles from "./SettingsLayout.module.scss"

const SettingsLayout: React.FC = ({ children }) => {
  const router = useRouter()

  return <div className={styles.root}>
    <div className={styles.sidebar}>
      <h2>Settings</h2>
      <Button onClick={() => {
        router.push(`/app/settings`)
      }}>
        Overview
      </Button>
      <SideBar style={{ height: "100%" }} title="" sections={[
        {
          buttons: [
            {
              onClick: () => {
                console.log(`Implement Me!!!`)
              },
              title: "Panel",
            }
          ],
          title: "User",
        },
        {
          buttons: [
            {
              onClick: () => {
                console.log(`Implement Me!!!`)
              },
              title: "Panel",
            },
            {
              onClick: () => {
                console.log(`Implement Me!!!`)
              },
              title: "Hello",
            },
            {
              onClick: () => {
                console.log(`Implement Me!!!`)
              },
              title: "World",
            },
            {
              onClick: () => {
                console.log(`Implement Me!!!`)
              },
              title: ":D",
            }
          ],
          title: "Administrator",
        },
      ]} />
    </div>
    <div className={styles.page}>
      {children}
    </div>
  </div>
}

export default SettingsLayout