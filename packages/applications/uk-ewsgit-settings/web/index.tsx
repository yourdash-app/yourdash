/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import ApplicationPanelContext from "@yourdash/web/src/app/panel/ApplicationPanelContext.tsx";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import applicationMeta from "./meta.yourdash";
import IndexPage from "./routes/index";
import SettingsLayout from "./settingsLayout";
import SETTINGS_ICON from "./../icon.avif";
import UKOnBoarding from "@yourdash/uikit/src/views/onBoarding/UKOnBoarding.js";

const SettingsRouter: React.FC = () => {
  const applicationPanelContext = React.useContext(ApplicationPanelContext);

  useEffect(() => {
    applicationPanelContext.setApplicationDisplayName("Settings");
    applicationPanelContext.setApplicationIcon(SETTINGS_ICON);
    applicationPanelContext.setOnBackButton(() => {});
    applicationPanelContext.setShowBackButton(false);
    applicationPanelContext.setControls([]);
  }, []);

  return (
    <Routes>
      <Route
        element={
          <UKOnBoarding
            meta={applicationMeta}
            pages={[
              {
                headerImage: SETTINGS_ICON,
                header: "YourDash Settings",
                body: "Configure YourDash and it's applications",
                actions: [
                  {
                    label: "Continue",
                    onClick: () => {},
                    changeTo: "next",
                  },
                ],
              },
            ]}
          />
        }
      >
        <Route element={<SettingsLayout />}>
          <Route
            index
            element={<IndexPage />}
          />
          {/* <Route path={"cat"}>
          <Route
            index
            element={<Redirect to={`${modulePath}/`} />}
          />
          Category Name
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
        </Route> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default SettingsRouter;
