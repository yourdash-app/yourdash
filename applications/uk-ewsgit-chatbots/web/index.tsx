/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import ChatbotsApplication from "./chatbotsApplication";
import CreateBotPage from "./views/bot/views/create/CreateBotPage";
import IndexBotPage from "./views/bot/views/index/IndexBotPage";
import ListBotsPage from "./views/list-bots/ListBotsPage";

const DiffusionLabRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        index
        element={<ChatbotsApplication />}
      />
      <Route
        path={"create-bot"}
        element={<CreateBotPage />}
      />
      <Route
        path={"list-bots"}
        element={<ListBotsPage />}
      />
      <Route path={"bot"}>
        <Route path={":botId"}>
          <Route
            index
            element={<IndexBotPage />}
          />
          <Route path={"manage"}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default DiffusionLabRouter;
