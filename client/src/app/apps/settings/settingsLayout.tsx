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
            icon: "yourdash-logo", label: "Panel", onClick() {
              navigate( "/app/a/settings/" )
            }
          },
          {
            icon: "yourdash-logo", label: "Sessions", onClick() {
              navigate( "/app/a/settings/session" )
            }
          }
        ] }
      />
      <Outlet/>
    </main>
  )
}

export default SettingsLayout
