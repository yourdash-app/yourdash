/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import GlobalDbApplication from "./globalDbApplication";

const WeatherRouter: React.FC = () => (
  <Routes>
    <Route
      index
      element={<GlobalDbApplication />}
    />
  </Routes>
);

export default WeatherRouter;
