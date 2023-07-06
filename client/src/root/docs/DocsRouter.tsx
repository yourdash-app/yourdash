import React from "react";
import {Routes, Route} from "react-router";
import GetStartedPage from "./pages/get-started/page";
import TranslationPage from "./pages/translation/page";

const DocsRouter: React.FC = () => (
  <Routes>
    <Route path={"get-started"} element={<GetStartedPage/>}/>
    <Route path={"translation"} element={<TranslationPage/>}/>
  </Routes>
);

export default DocsRouter;
