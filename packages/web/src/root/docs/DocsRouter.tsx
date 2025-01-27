/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ComingSoon from "@yourdash/chiplet/views/ComingSoon.tsx";
import React from "react";
import { Routes, Route } from "react-router";
import NotFoundPage from "../notFound/notFound.tsx";
import FaqDocsIndex from "./pages/faq/Index.tsx";
import GetStartedDocsIndex from "./pages/get-started/Index.tsx";
import PreAlphaDocsPage from "./pages/preAlpha/Index.tsx";
import TranslationDocsIndex from "./pages/translation/Index.tsx";
import ContributionDocsIndex from "./pages/contribution/Index.tsx";
import OverviewDocsIndex from "./pages/overview/Index.tsx";
import DevelopmentDocsIndex from "./pages/development/Index.tsx";

const DocsRouter: React.FC = () => (
  <Routes>
    <Route
      path={"/"}
      element={<OverviewDocsIndex />}
    />
    <Route
      path={"faq"}
      element={<FaqDocsIndex />}
    />
    <Route
      path={"get-started"}
      element={<GetStartedDocsIndex />}
    />
    <Route
      path={"pre-alpha"}
      element={<PreAlphaDocsPage />}
    />
    <Route
      path={"translation"}
      element={<TranslationDocsIndex />}
    />
    <Route
      path={"contribution"}
      element={<ContributionDocsIndex />}
    />
    <Route
      path={"development"}
      element={<DevelopmentDocsIndex />}
    />
    <Route
      path={"*"}
      element={<NotFoundPage />}
    />
  </Routes>
);

export default DocsRouter;
