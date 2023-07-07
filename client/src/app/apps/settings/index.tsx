import React from "react";
import {Routes, Route} from "react-router";
import SettingsApplication from "./settingsApplication";
import SettingsPageSession from "./pages/session";
import SettingsLayout from "./settingsLayout";
import SettingsPageDeveloper from "./pages/developer";
import PersonalizationIndex from "./pages/personalization/Index";
import AdminToolsIndex from "./pages/admin/Index";

const SettingsRouter: React.FC = () => (
  <Routes>
    <Route element={<SettingsLayout/>}>
      <Route
        index
        element={<SettingsApplication/>}
      />
      <Route path={"personalization"}>
        <Route index element={<PersonalizationIndex/>}/>
      </Route>
      <Route path={"session"}>
        <Route index element={<SettingsPageSession/>}/>
      </Route>
      <Route path={"accessibility"}>
        {/**/}
      </Route>
      <Route path={"admin"}>
        <Route index element={<AdminToolsIndex/>}/>
        {/**/}
      </Route>
      <Route path={"developer"}>
        <Route index element={<SettingsPageDeveloper/>}/>
      </Route>
    </Route>
  </Routes>
);

export default SettingsRouter;
