import React from "react";
import {Routes, Route} from "react-router";

import DashApplication from "./dashApplication";
import DashApplicationWelcome from "./welcome";

const DashRouter: React.FC = () => (
  <Routes>
    <Route index element={<DashApplication/>}/>
    <Route path={"welcome"} element={<DashApplicationWelcome/>}/>
  </Routes>
);

export default DashRouter;
