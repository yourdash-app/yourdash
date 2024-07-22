/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Redirect from "@yourdash/uikit/components/redirect/redirect";
import React from "react";
import { Routes, Route } from "react-router";
import CategoryNamePage from "./routes/cat/categoryName";
import SingleSettingPage from "./routes/cat/singleSettingPage";
import IndexPage from "./routes/index";
import SessionIndexPage from "./pages/session/Index";
import SettingsLayout from "./settingsLayout";
import PersonalizationIndexPage from "./routes/personalization/index";
import AdminToolsIndexPage from "./pages/admin/Index";
import DashboardPersonalizationIndexPage from "./routes/personalization/dashboard/index";
import PanelPersonalizationIndexPage from "./routes/personalization/panel/index";
import ProfileIndexPage from "./pages/profile/Index";
import DeveloperToolsIndexPage from "./pages/developer/Index";
import AccessibilityIndexPage from "./pages/accessibility/Index";

const SettingsRouter: React.FC = () => (
  <Routes>
    <Route element={<SettingsLayout />}>
      <Route
        index
        element={<IndexPage />}
      />
      <Route path={"cat"}>
        <Route
          index
          element={<Redirect to={"/app/a/uk-ewsgit-settings/"} />}
        />
        {/* Category Name */}
        <Route path={":categoryName"}>
          <Route
            index
            element={<CategoryNamePage />}
          />
          <Route
            path={":settingName"}
            // TODO: implement this for showing just one setting
            element={<SingleSettingPage />}
          />
        </Route>
      </Route>
      <Route path={"profile"}>
        <Route
          index
          element={<ProfileIndexPage />}
        />
      </Route>
      <Route path={"personalization"}>
        <Route
          index
          element={<PersonalizationIndexPage />}
        />
        <Route
          path={"dashboard"}
          element={<DashboardPersonalizationIndexPage />}
        />
        <Route
          path={"panel"}
          element={<PanelPersonalizationIndexPage />}
        />
      </Route>
      <Route path={"session"}>
        <Route
          index
          element={<SessionIndexPage />}
        />
      </Route>
      <Route path={"accessibility"}>
        <Route
          index
          element={<AccessibilityIndexPage />}
        />
      </Route>
      <Route path={"admin"}>
        <Route
          index
          element={<AdminToolsIndexPage />}
        />
      </Route>
      <Route path={"developer"}>
        <Route
          index
          element={<DeveloperToolsIndexPage />}
        />
      </Route>
    </Route>
  </Routes>
);

export default SettingsRouter;
