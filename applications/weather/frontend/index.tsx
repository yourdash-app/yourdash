/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import MenuView from "./views/menu/MenuView";
import WeatherApplicationDataLoader from "./views/weatherForLocation/LocationDataLoader";

const WeatherRouter: React.FC = () => (
  <Routes>
    <Route index element={<MenuView/>}/>
    <Route path={":id"} element={<WeatherApplicationDataLoader/>}/>
  </Routes>
);

export default WeatherRouter;
