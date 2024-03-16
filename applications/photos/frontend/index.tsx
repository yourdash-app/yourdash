/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Redirect from "@yourdash/uikit/depChiplet/components/redirect/Redirect";
import React from "react";
import { Routes, Route } from "react-router";
import AlbumPage from "./pages/AlbumPage";
import HomePage from "./pages/HomePage";
import PhotoPage from "./pages/PhotoPage";
import SearchPage from "./pages/SearchPage";
import PhotosLayout from "./PhotosLayout";

const PhotosRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<PhotosLayout />}>
        <Route index element={<HomePage />} />
        <Route path={"search"} element={<SearchPage />} />
        <Route path={"album"}>
          <Route index element={<Redirect to={"/app/a/photos"} />} />
          <Route path={"*"} element={<AlbumPage />} />
        </Route>
        <Route path={"photo"}>
          <Route index element={<Redirect to={"/app/a/photos"} />} />
          <Route path={"*"} element={<PhotoPage isPhoto={true} />} />
        </Route>
        <Route path={"video"}>
          <Route index element={<Redirect to={"/app/a/photos"} />} />
          <Route path={"*"} element={<PhotoPage isPhoto={false} />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default PhotosRouter;
