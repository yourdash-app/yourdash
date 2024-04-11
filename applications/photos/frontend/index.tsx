/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Redirect from "@yourdash/chiplet/components/redirect/Redirect.js";
import React from "react";
import { Routes, Route } from "react-router";
import Layout from "./Layout.js";
import IndexRoute from "./routes/index.js";

const PhotosRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={<IndexRoute />}
        />
      </Route>
    </Routes>
  );
};

export default PhotosRouter;
