/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React, { useEffect } from "react";
import ApplicationPanelContext from "@yourdash/web/src/app/panel/ApplicationPanelContext.tsx";
import { Route, Routes } from "react-router";
import LoginNextcloudFlowV2Page from "./login/flow/v2";

const DashRouter: React.FC = () => {
  const applicationPanelContext = React.useContext(ApplicationPanelContext);

  useEffect(() => {
    applicationPanelContext.setApplicationDisplayName("Nextcloud");
    applicationPanelContext.setApplicationIcon("");
    applicationPanelContext.setOnBackButton(() => { });
    applicationPanelContext.setShowBackButton(false);
  }, []);

  return (
    <Routes>
      <Route index element={<>The YourDash Nextcloud compatability layer - created by Ewsgit</>} />
      <Route path={"flow"}>
        <Route path={"v2"}>
          <Route
            path={":token"}
            element={<LoginNextcloudFlowV2Page />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default DashRouter;
