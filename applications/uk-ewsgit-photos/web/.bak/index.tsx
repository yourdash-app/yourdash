/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Redirect from "@yourdash/chiplet/components/redirect/Redirect.js";
import UseCurrentModuleId from "@yourdash/shared/core/useCurrentModuleId";
import * as React from "react";
import { Routes, Route } from "react-router";
import applicationMeta from "../meta.yourdash";
import AlbumPage from "./pages/AlbumPage.js";
import HomePage from "./pages/HomePage.js";
import PhotoPage from "./pages/PhotoPage.js";
import SearchPage from "./pages/SearchPage.js";
import PhotosLayout from "./PhotosLayout.js";

const PhotosRouter: React.FC = () => {
  const moduleId = UseCurrentModuleId(applicationMeta);

  return (
    <Routes>
      <Route element={<PhotosLayout />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path={"search"}
          element={<SearchPage />}
        />
        <Route path={"album"}>
          <Route
            index
            element={<Redirect to={`/app/a/${moduleId}`} />}
          />
          <Route
            path={"*"}
            element={<AlbumPage />}
          />
        </Route>
        <Route path={"photo"}>
          <Route
            index
            element={<Redirect to={`/app/a/${moduleId}`} />}
          />
          <Route
            path={"*"}
            element={<PhotoPage isPhoto={true} />}
          />
        </Route>
        <Route path={"video"}>
          <Route
            index
            element={<Redirect to={`/app/a/${moduleId}`} />}
          />
          <Route
            path={"*"}
            element={<PhotoPage isPhoto={false} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default PhotosRouter;
