/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import RootLayout from "../RootLayout";
import ProjectsIndexPage from "./Index";

const DocsRouter: React.FC = () => (
  <Routes>
    <Route element={<RootLayout/>}>
      <Route path={"/"} element={<ProjectsIndexPage/>}/>
    </Route>
    
    {/* Other Projects' routes */}
  </Routes>
);

export default DocsRouter;
