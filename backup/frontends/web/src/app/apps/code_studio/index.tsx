import React from "react"
import { Routes, Route } from "react-router"
import CodeStudioApplication from "./codeStudioApplication"

const DashRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={ <CodeStudioApplication/> }/>
    </Routes>
  )
}

export default DashRouter
