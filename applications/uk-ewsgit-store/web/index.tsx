/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import { Routes, Route } from "react-router";
import OnBoarding from "@yourdash/uikit/views/onBoarding/onBoarding";
import applicationMeta from "./meta.yourdash";
import STORE_ICON from "./../icon.avif";
import ApplicationIndexPage from "./routes/index";
import ApplicationLayout from "./routes/layout";

const StoreRouter: React.FC = () => (
  <Routes>
    <Route
      element={
        <OnBoarding
          meta={applicationMeta}
          pages={[
            {
              headerImage: STORE_ICON,
              header: "YourDash Store",
              body: "Manage and install YourDash Applications & modules.",
              actions: [
                {
                  label: "Continue",
                  changeTo: "next",
                  onClick() {},
                },
              ],
            },
          ]}
        />
      }
    >
      <Route element={<ApplicationLayout />}>
        <Route
          index
          element={<ApplicationIndexPage />}
        />
        <Route
          path={"search"}
          element={"Search ui"}
        >
          <Route
            path={":query"}
            element={"Search query response"}
          />
        </Route>
        <Route
          path={"categories"}
          element={"Category selector"}
        >
          <Route
            path={":category"}
            element={"Category applications and modules"}
          />
        </Route>
        <Route
          path={"modules"}
          element={"Modules selector"}
        >
          <Route
            path={":module"}
            element={"Store page for module"}
          />
        </Route>
        <Route
          path={"applications"}
          element={"Applications selector"}
        >
          <Route
            path={":application"}
            element={"Store page for application"}
          />
        </Route>
        <Route
          path={"/manage"}
          element={"Manage installed applications & modules"}
        />
      </Route>
    </Route>
  </Routes>
);

export default StoreRouter;
