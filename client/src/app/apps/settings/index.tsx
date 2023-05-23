import React from "react"
import { Routes, Route } from "react-router"
import SettingsApplication from "./settingsApplication"
import SetttingsPageSession from "./pages/session"
import SettingsLayout from "./settingsLayout"

const SettingsRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={ <SettingsLayout/> }>
        <Route index element={ <SettingsApplication/> }/>
        <Route path={ "session" }>
          <Route index element={ <SetttingsPageSession/> }/>
        </Route>
      </Route>
    </Routes>
  )
}

export default SettingsRouter
