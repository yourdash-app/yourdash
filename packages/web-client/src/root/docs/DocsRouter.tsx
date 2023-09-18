/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import GetStartedPage from "./pages/get-started/page";
import TranslationPage from "./pages/translation/page";
import HowToHelp from "./pages/how-to-help/HowToHelp";
import OverviewPage from "./pages/overview/OverviewPage";

const DocsRouter: React.FC = () => (
  <Routes>
    <Route path={"/"} element={<OverviewPage/>}/>
    <Route path={"get-started"} element={<GetStartedPage/>}/>
    <Route path={"translation"} element={<TranslationPage/>}/>
    <Route path={"how-to-help"} element={<HowToHelp/>}/>
  </Routes>
);

export default DocsRouter;
