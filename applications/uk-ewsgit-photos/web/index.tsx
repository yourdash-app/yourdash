/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UK from "@yourdash/uikit";
import { IconButton } from "@yourdash/uikit/components/index";
import ApplicationPanelContext from "@yourdash/web/src/app/panel/ApplicationPanelContext.tsx";
import { Routes, Route } from "react-router";
import Layout from "./layout.js";
import { FC, useEffect } from "react";
import { useNavigateTo } from "./meta.yourdash.ts";
import AlbumPathPage from "./routes/album/index.js";
import IndexPage from "./routes/index.js";
import SearchIndexPage from "./routes/search/index.js";
import ViewPathPage from "./routes/view/index";
import React from "react";
import PHOTOS_ICON from "./../icon.avif";

const ApplicationRoutes: FC = () => {
  const navigateTo = useNavigateTo();
  const applicationPanelContext = React.useContext(ApplicationPanelContext);

  useEffect(() => {
    applicationPanelContext.setApplicationDisplayName("YourDash Photos");
    applicationPanelContext.setApplicationIcon(PHOTOS_ICON);
    applicationPanelContext.setOnBackButton(() => {});
    applicationPanelContext.setShowBackButton(false);
    applicationPanelContext.setControls([
      <IconButton
        key={"home"}
        accessibleLabel={"Home"}
        icon={UKIcons.Home}
        onClick={() => {
          navigateTo(`/`);
        }}
      />,
      <IconButton
        key={"search"}
        accessibleLabel={"Search"}
        icon={UKIcons.Search}
        onClick={() => {
          navigateTo(`/search/`);
        }}
      />,
      <IconButton
        key={"profile"}
        accessibleLabel={"Profile"}
        icon={UKIcons.Person}
        onClick={() => {
          navigateTo(`/profile/`);
        }}
      />,
    ]);
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<IndexPage />}
        />
        <Route
          path={"search"}
          element={<SearchIndexPage />}
        />
        <Route path={"album"}>
          <Route
            path={"@/*"}
            element={<AlbumPathPage />}
          />
        </Route>
        <Route
          path={"view/@/*"}
          element={<ViewPathPage />}
        />
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;
