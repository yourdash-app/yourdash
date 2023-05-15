import React from "react"
import { Routes, Route } from "react-router"
import SettingsApplication from "./settingsApplication"

const SettingsRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={ <SettingsApplication/> }/>
    </Routes>
  )
}

export default SettingsRouter
