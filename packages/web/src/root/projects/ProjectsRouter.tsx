/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import ProjectUiKitIndexPage from "./uikit/Index.tsx";

const DocsRouter: React.FC = () => (
  <Routes>
    {/* Other Projects' routes */}
    <Route path={"uikit"}>
      <Route index element={<ProjectUiKitIndexPage/>}/>
    </Route>
  </Routes>
);

export default DocsRouter;
