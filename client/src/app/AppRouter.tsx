import React from "react"
import { Route } from "react-router"
import { Routes } from "react-router-dom"
import ComingSoon from "../ComingSoon"
import DashApplication from "./apps/dash"
import DashApplicationWelcome from "./apps/dash/welcome"
import FilesApplication from "./apps/files"
import PhotosApplication from "./apps/photos"
import SettingsApplication from "./apps/settings"
import WeatherApplication from "./apps/weather"
import WeatherApplicationLocationPage from "./apps/weather/location"

const AppRouter: React.FC = () => (
  <Routes>
    <Route path={ "dash" }>
      <Route index element={ <DashApplication/> }/>
      <Route path={ "welcome" } element={ <DashApplicationWelcome/> }/>
    </Route>
    <Route path={ "files" } element={ <FilesApplication/> }/>
    <Route path={ "settings" } element={ <SettingsApplication/> }/>
    <Route path={ "profile" } element={ <ComingSoon/> }/>
    <Route path={ "weather" }>
      <Route index element={ <WeatherApplication/> }/>
      <Route path={ "location" }>
        <Route path={ ":id" } element={ <WeatherApplicationLocationPage/> }/>
      </Route>
    </Route>
    <Route path={ "photos" }>
      <Route index element={ <PhotosApplication/> }/>
    </Route>
    <Route path={ "todo" } element={ <ComingSoon/> }/>
    <Route path={ "services" } element={ <ComingSoon/> }/>
    <Route path={ "business" }>
      <Route path={ "write" } element={ <ComingSoon/> }/>
      <Route path={ "present" } element={ <ComingSoon/> }/>
      <Route path={ "calculate" } element={ <ComingSoon/> }/>
    </Route>
    <Route path={ "*" } element={ <span>Unknown application</span> }/>
  </Routes>
)

export default AppRouter
