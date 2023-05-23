import React from "react"
import { Routes, Route } from "react-router"
import GetStartedPage from "./pages/get-started/page"

const DocsRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={ "get-started" } element={ <GetStartedPage/> }/>
    </Routes>
  )
}

export default DocsRouter
