/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import PhotosApplication from "./photosApplication";
import PhotosLayout from "./PhotosLayout";

const PhotosRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<PhotosLayout />}>
        <Route index element={<PhotosApplication />} />
      </Route>
    </Routes>
  );
};

export default PhotosRouter;
