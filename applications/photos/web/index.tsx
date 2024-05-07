/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Routes, Route } from "react-router";
import Layout from "./layout.js";
import { FC } from "react";
import AlbumPathPage from "./routes/album/[path].js";
import IndexPage from "./routes/index.js";
import SearchIndexPage from "./routes/search/index.js";

const ApplicationRoutes: FC = () => {
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
      </Route>
    </Routes>
  );
};

export default ApplicationRoutes;
