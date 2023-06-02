import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { SideBar } from "../../../ui"

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate()

  return (
    <main className={ "grid grid-cols-[auto,1fr] h-full w-full" }>
      <SideBar
        title={ "YourDash Settings" }
        items={ [
          {
            icon: "app-launcher-16", label: "Panel", onClick() {
              navigate( "/app/a/settings/" )
            }
          },
          {
            icon: "device-mobile-16", label: "Sessions", onClick() {
              navigate( "/app/a/settings/session" )
            }
          },
          {
            icon: "tools-16", label: "Developer", onClick() {
              navigate( "/app/a/settings/developer" )
            }
          }
        ] }
      />
      <Outlet/>
    </main>
  )
}

export default SettingsLayout
