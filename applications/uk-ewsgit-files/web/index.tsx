/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router-dom";
import applicationMeta from "./meta.yourdash";
import OnBoarding from "@yourdash/uikit/views/onBoarding/onBoarding";
import ApplicationLayout from "./layout";

const FilesRouter: React.FC = () => (
  <Routes>
    <Route
      element={
        <OnBoarding
          meta={applicationMeta}
          pages={[
            {
              headerImage: "/assets/productLogos/yourdash.svg",
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
                  onClick: () => {
                    // set default options
                  },
                },
              ],
            },
            {
              headerImage: "/assets/productLogos/yourdash.svg",
              header: "This is Coming soon...",
              body: "This onBoarding Menu is coming soon...",
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

export default FilesRouter;
