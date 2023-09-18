import React from "react";
import {Routes, Route} from "react-router";
import TemplateApplication from "./templateApplication"

const DashRouter: React.FC = () => (
  <Routes>
    <Route index element={<TemplateApplication/>}/>
  </Routes>
);

export default DashRouter;
