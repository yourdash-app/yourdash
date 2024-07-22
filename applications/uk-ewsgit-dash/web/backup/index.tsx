/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import { Routes, Route } from "react-router";
import DashApplication from "./dashApplication";
import DashApplicationWelcome from "./welcome";

const DashRouter: React.FC = () => (
  <Routes>
    <Route
      index
      element={<DashApplication />}
    />
    <Route
      path={"welcome"}
      element={<DashApplicationWelcome />}
    />
  </Routes>
);

export default DashRouter;
