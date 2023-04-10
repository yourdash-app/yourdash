import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import DashApplication from "./apps/dash/index";
import FilesApplication from "./apps/files/index";
import DashApplicationWelcome from "./apps/dash/welcome";
import SettingsApplication from "./apps/settings/index";
import ComingSoon from "../ComingSoon";
import WeatherApplication from "./apps/weather/index";
import WeatherApplicationLocationPage from "./apps/weather/location";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={`dash`}>
        <Route index element={<DashApplication />} />
        <Route path={`welcome`} element={<DashApplicationWelcome />} />
      </Route>
      <Route path={`files`} element={<FilesApplication />} />
      <Route path={`settings`} element={<SettingsApplication />} />
      <Route path={`profile`} element={<ComingSoon />} />
      <Route path={`weather`}>
        <Route index element={<WeatherApplication />} />
        <Route path={`location`}>
          <Route path={`:id`} element={<WeatherApplicationLocationPage />} />
        </Route>
      </Route>
      <Route path={`todo`} element={<ComingSoon />} />
      <Route path={`services`} element={<ComingSoon />} />
      <Route path={`business`}>
        <Route path={`write`} element={<ComingSoon />} />
        <Route path={`present`} element={<ComingSoon />} />
        <Route path={`calculate`} element={<ComingSoon />} />
      </Route>
      <Route path={`*`} element={<span>Unknown application</span>} />
    </Routes>
  );
};

export default AppRouter;
