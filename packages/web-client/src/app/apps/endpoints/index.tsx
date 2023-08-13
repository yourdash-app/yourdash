import React from "react"
import { Routes, Route } from "react-router"
import EndpointsApplication from "./endpointsApplication"

const EndpointsRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={ <EndpointsApplication/> }/>
    </Routes>
  )
}

export default EndpointsRouter
