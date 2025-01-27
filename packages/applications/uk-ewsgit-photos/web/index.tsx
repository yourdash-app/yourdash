/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

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
import UKIconButton from "@yourdash/uikit/src/components/iconButton/UKIconButton.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";

const ApplicationRoutes: FC = () => {
  const navigateTo = useNavigateTo();
  const applicationPanelContext = React.useContext(ApplicationPanelContext);

  useEffect(() => {
    applicationPanelContext.setApplicationDisplayName("YourDash Photos");
    applicationPanelContext.setApplicationIcon(PHOTOS_ICON);
    applicationPanelContext.setOnBackButton(() => {});
    applicationPanelContext.setShowBackButton(false);
    applicationPanelContext.setControls([
      <UKIconButton
        key={"home"}
        accessibleLabel={"Home"}
        icon={UKIcons.Home}
        onClick={() => {
          navigateTo(`/`);
        }}
      />,
      <UKIconButton
        key={"search"}
        accessibleLabel={"Search"}
        icon={UKIcons.Search}
        onClick={() => {
          navigateTo(`/search/`);
        }}
      />,
      <UKIconButton
        key={"profile"}
        accessibleLabel={"Profile"}
        icon={UKIcons.Person}
        onClick={() => {
          navigateTo(`/profile/`);
        }}
      />,
    ]);
  }, []);

  return <></>;

  // return (
  //   <Routes>
  //     <Route element={<Layout />}>
  //       <Route
  //         index
  //         element={<IndexPage />}
  //       />
  //       <Route
  //         path={"search"}
  //         element={<SearchIndexPage />}
  //       />
  //       <Route path={"album"}>
  //         <Route
  //           path={"@/*"}
  //           element={<AlbumPathPage />}
  //         />
  //       </Route>
  //       <Route
  //         path={"view/@/*"}
  //         element={<ViewPathPage />}
  //       />
  //     </Route>
  //   </Routes>
  // );
};

export default ApplicationRoutes;
