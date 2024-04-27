/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ComingSoon from "@yourdash/chiplet/views/ComingSoon";
import React from "react";
import { Routes, Route } from "react-router";
import FaqDocsIndex from "./pages/faq/Index";
import GetStartedDocsIndex from "./pages/get-started/Index";
import TranslationDocsIndex from "./pages/translation/Index";
import ContributionDocsIndex from "./pages/contribution/Index";
import OverviewDocsIndex from "./pages/overview/Index";
import DevelopmentDocsIndex from "./pages/development/Index";

const DocsRouter: React.FC = () => (
  <Routes>
    <Route path={"/"} element={<OverviewDocsIndex />} />
    <Route path={"faq"} element={<FaqDocsIndex />} />
    <Route path={"get-started"} element={<GetStartedDocsIndex />} />
    <Route path={"translation"} element={<TranslationDocsIndex />} />
    <Route path={"contribution"} element={<ContributionDocsIndex />} />
    <Route path={"development"} element={<DevelopmentDocsIndex />} />
    <Route path={"*"} element={<ComingSoon />} />
  </Routes>
);

export default DocsRouter;
