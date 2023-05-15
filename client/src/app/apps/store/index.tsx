import React from "react"
import { Routes, Route } from "react-router"
import StoreApplication from "./storeApplication"

const StoreRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={ <StoreApplication/> }/>
    </Routes>
  )
}

export default StoreRouter
