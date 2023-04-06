import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import DashApplication from "./apps/dash/index";
import FilesApplication from "./apps/files/index";
import DashApplicationWelcome from "./apps/dash/welcome";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={`dash`}>
        <Route index element={<DashApplication />} />
        <Route path={`welcome`} element={<DashApplicationWelcome />} />
      </Route>
      <Route path={`files`} element={<FilesApplication />} />
    </Routes>
  );
};

export default AppRouter;
