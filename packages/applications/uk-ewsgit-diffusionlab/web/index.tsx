/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import DiffusionLabApplication from "./diffusionLabApplication";

const DiffusionLabRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        element={<DiffusionLabApplication />}
      />
    </Routes>
  );
};

export default DiffusionLabRouter;
