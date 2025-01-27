/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ApplicationPanelContext from "@yourdash/web/src/app/panel/ApplicationPanelContext.tsx";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import RootPage from "./root/RootPage.tsx";
import WEATHER_ICON from "./../icon.avif";

const WeatherRouter: React.FC = () => {
  const applicationPanelContext = React.useContext(ApplicationPanelContext);

  useEffect(() => {
    applicationPanelContext.setApplicationDisplayName("YourDash Weather");
    applicationPanelContext.setApplicationIcon(WEATHER_ICON);
    applicationPanelContext.setOnBackButton(() => {});
    applicationPanelContext.setShowBackButton(false);
    applicationPanelContext.setControls([]);
  }, []);

  return (
    <Routes>
      {/*<Route*/}
      {/*element={<RootPage />}*/}
      {/*/>*/}
      {/* <Route */}
      {/*   path={":id"} */}
      {/*   element={<WeatherApplicationDataLoader />} */}
      {/* /> */}
    </Routes>
  );
};

export default WeatherRouter;
