/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import CreateFlowView from "./views/create/CreateFlowView";
import FlowView from "./views/flow/FlowView";

import StartupView from "./views/startup/StartupView";

const FloweyRouter: React.FC = () => ( <Routes>
  <Route index element={ <StartupView /> } />
  <Route path={ "create-flow" } element={ <CreateFlowView /> } />
  <Route path={ "flow" } element={ <FlowView /> }>
    <Route path={ ":flowId" } element={ <FlowView /> } />
  </Route>
</Routes> );

export default FloweyRouter;
