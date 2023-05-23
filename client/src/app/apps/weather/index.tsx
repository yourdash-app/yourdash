import React from "react"
import { Routes, Route } from "react-router"
import WeatherApplication from "./weatherApplication"
import WeatherApplicationLocationPage from "./location"

const WeatherRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={ <WeatherApplication/> }/>
      <Route path={ "location/:id" } element={ <WeatherApplicationLocationPage/> }/>
    </Routes>
  )
}

export default WeatherRouter
