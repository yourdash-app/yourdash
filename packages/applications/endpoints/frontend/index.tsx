/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

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
