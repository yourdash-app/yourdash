/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import FilesApplication from "./filesApplication";

const FilesRouter: React.FC = () => (
  <Routes>
    <Route index element={<FilesApplication/>}/>
  </Routes>
);

export default FilesRouter;
