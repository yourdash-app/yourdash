/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import SettingsApplication from "./settingsApplication";
import SessionIndexPage from "./pages/session";
import SettingsLayout from "./settingsLayout";
import PersonalizationIndexPage from "./pages/personalization/Index";
import AdminToolsIndexPage from "./pages/admin/Index";
import DashboardPersonalizationIndexPage from "./pages/personalization/dashboard/Index";
import PanelPersonalizationIndexPage from "./pages/personalization/panel/Index";
import ProfileIndexPage from "./pages/profile/Index";

const SettingsRouter: React.FC = () => (
  <Routes>
    <Route element={<SettingsLayout/>}>
      <Route index element={<SettingsApplication/>} />
      <Route path={"profile"}>
        <Route index element={<ProfileIndexPage/>}/>
      </Route>
      <Route path={"personalization"}>
        <Route index element={<PersonalizationIndexPage/>}/>
        <Route path={"dashboard"} element={<DashboardPersonalizationIndexPage/>}/>
        <Route path={"panel"} element={<PanelPersonalizationIndexPage/>}/>
      </Route>
      <Route path={"session"}>
        <Route index element={<SessionIndexPage/>}/>
      </Route>
      <Route path={"accessibility"}>
        {/**/}
      </Route>
      <Route path={"admin"}>
        <Route index element={<AdminToolsIndexPage/>}/>
      </Route>
    </Route>
  </Routes>
);

export default SettingsRouter;
