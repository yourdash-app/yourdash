import React from "react"
import { Routes, Route } from "react-router"
import DiffusionLabApplication from "./diffusionLabApplication"

const DiffusionLabRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={ <DiffusionLabApplication/> }/>
    </Routes>
  )
}

export default DiffusionLabRouter
