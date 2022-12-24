import React from "react"
import SideBar from "../../../../components/elements/sideBar/SideBar"
import styles from "./settingsLayout.module.scss"

export interface ISettingsLayout {
}

const SettingsLayout: React.FC<ISettingsLayout> = ({ children }) => {
  return <div className={styles.root}>
    <SideBar title="Settings" sections={[
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
    <div>
      {children}
    </div>
  </div>
}

export default SettingsLayout