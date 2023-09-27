/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import SelectLocationView from "./views/selectLocation/SelectLocationView";
import WeatherApplicationDataLoader from "./views/weatherForLocation/LocationDataLoader";

const WeatherRouter: React.FC = () => (
  <Routes>
    <Route index element={<SelectLocationView/>}/>
    <Route path={":id"} element={<WeatherApplicationDataLoader/>}/>
  </Routes>
);

export default WeatherRouter;
