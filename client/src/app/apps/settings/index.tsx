import React from "react";
import {Routes, Route} from "react-router";
import SettingsApplication from "./settingsApplication";
import SettingsPageSession from "./pages/session";
import SettingsLayout from "./settingsLayout";
import SettingsPageDeveloper from "./pages/developer";

const SettingsRouter: React.FC = () => (
  <Routes>
    <Route element={<SettingsLayout/>}>
      <Route index element={<SettingsApplication/>}/>
      <Route path={"session"}>
        <Route index element={<SettingsPageSession/>}/>
      </Route>
      <Route path={"developer"}>
        <Route index element={<SettingsPageDeveloper/>}/>
      </Route>
    </Route>
  </Routes>
);

export default SettingsRouter;
