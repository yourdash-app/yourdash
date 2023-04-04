import React from "react"
import { Route, Routes } from "react-router-dom";

const SkyblockExtras: React.FC = () => {
  return <Routes>
    <Route index element={ <h1>Hmm application</h1> }/>
    <Route path={ `test` } element={ <h1>Hmm test</h1> }/>
  </Routes>
}

export default SkyblockExtras
