import { useRouter } from "next/router"
import React from "react"
import Button from "../../../../components/elements/button/Button"
import SideBar from "../../../../components/elements/sideBar/SideBar"
import styles from "./SettingsLayout.module.scss"

export interface ISettingsLayout {
}

const SettingsLayout: React.FC<ISettingsLayout> = ({ children }) => {
  const router = useRouter()

  return <div className={styles.root}>
    <div className={styles.sidebar}>
      <h2>Settings</h2>
      <Button onClick={() => {
        router.push(`/app/settings`)
      }}>
        Overview
      </Button>
      <SideBar style={{
        height: "100%"
      }} title="" sections={[
        {
          title: "User",
          buttons: [
            {
              title: "Panel",
              onClick: () => {

              }
            }
          ]
        },
        {
          title: "Administrator",
          buttons: [
            {
              title: "Panel",
              onClick: () => {

              }
            },
            {
              title: "Hello",
              onClick: () => {

              }
            },
            {
              title: "World",
              onClick: () => {

              }
            },
            {
              title: ":D",
              onClick: () => {

              }
            }
          ]
        },
        {
          title: "Adminisdfstrator",
          buttons: [
            {
              title: "Panel",
              onClick: () => {

              }
            },
            {
              title: "Hello",
              onClick: () => {

              }
            },
            {
              title: "World",
              onClick: () => {

              }
            },
            {
              title: ":D",
              onClick: () => {

              }
            }
          ]
        },
        {
          title: "Adminsdfgfistrator",
          buttons: [
            {
              title: "Panel",
              onClick: () => {

              }
            },
            {
              title: "Hello",
              onClick: () => {

              }
            },
            {
              title: "World",
              onClick: () => {

              }
            },
            {
              title: ":D",
              onClick: () => {

              }
            }
          ]
        },
        {
          title: "Adminishgjtraator",
          buttons: [
            {
              title: "Panel",
              onClick: () => {

              }
            },
            {
              title: "Hello",
              onClick: () => {

              }
            },
            {
              title: "World",
              onClick: () => {

              }
            },
            {
              title: ":D",
              onClick: () => {

              }
            }
          ]
        }
      ]} />
    </div>
    <div className={styles.page}>
      {children}
    </div>
  </div>
}

export default SettingsLayout