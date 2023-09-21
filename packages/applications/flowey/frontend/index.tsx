/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";

import FloweyApplication from "./floweyApplication";

const FloweyRouter: React.FC = () => (
  <Routes>
    <Route index element={<FloweyApplication />} />
  </Routes>
);

export default FloweyRouter;
