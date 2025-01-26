/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKOnBoarding from "@yourdash/uikit/src/views/onBoarding/UKOnBoarding.js";
import ApplicationPanelContext from "@yourdash/web/src/app/panel/ApplicationPanelContext.tsx";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import applicationMeta from "./meta.yourdash";
import ApplicationLayout from "./layout";
import FILES_ICON from "../icon.avif";

const FilesRouter: React.FC = () => {
  const applicationPanelContext = React.useContext(ApplicationPanelContext);

  useEffect(() => {
    applicationPanelContext.setApplicationDisplayName("Files");
    applicationPanelContext.setApplicationIcon(FILES_ICON);
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
                headerImage: FILES_ICON,
                header: "YourDash Files",
                body: "Create and manage your files with ease.",
                actions: [
                  {
                    label: "Continue",
                    changeTo: "next",
                    onClick: () => {},
                  },
                  {
                    label: "Skip and use defaults",
                    changeTo: "completed",
                  },
                ],
              },
              {
                headerImage: "/assets/productLogos/yourdash.svg",
                header: "This is Coming soon...",
                body: "This onBoarding Menu is coming soon...",
                allowGoBack: true,
                actions: [
                  {
                    label: "Continue to application",
                    changeTo: "completed",
                    onClick: () => {
                      // no functionality
                    },
                  },
                ],
              },
            ]}
          />
        }
      >
        <Route
          index
          element={<ApplicationLayout />}
        />
      </Route>
    </Routes>
  );
};

export default FilesRouter;
