import React from "react"
import { Routes, Route } from "react-router"
import StoreApplication from "./storeApplication"
import ComingSoon from "../../../ComingSoon"

const StoreRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={ <StoreApplication/> }/>
      <Route path={ "cat" }>
        <Route index element={ <StoreApplication/> }/>
      </Route>
      <Route path={ "app" }>
        <Route index element={ <ComingSoon/> }/>
        <Route path={ ":id" } element={ <StoreApplication/> }/>
      </Route>
    </Routes>
  )
}

export default StoreRouter
