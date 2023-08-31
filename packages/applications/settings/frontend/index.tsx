import React from "react";
import { Routes, Route } from "react-router";
import SettingsApplication from "./settingsApplication";
import SessionIndexPage from "./pages/session";
import SettingsLayout from "./settingsLayout";
import DeveloperSettingsIndexPage from "./pages/developer";
import PersonalizationIndexPage from "./pages/personalization/Index";
import AdminToolsIndexPage from "./pages/admin/Index";
import DashboardPersonalizationIndexPage from "./pages/personalization/dashboard/Index";
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
      <Route path={"developer"}>
        <Route index element={<DeveloperSettingsIndexPage/>}/>
      </Route>
    </Route>
  </Routes>
);

export default SettingsRouter;
