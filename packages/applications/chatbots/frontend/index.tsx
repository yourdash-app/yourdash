/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Routes, Route } from "react-router";
import ChatbotsApplication from "./chatbotsApplication";
import AuthorizeDiscordPage from "./views/authorize/discord/AuthorizeDiscordPage";
import CreateBotPage from "./views/bot/views/create/CreateBotPage";
import IndexBotPage from "./views/bot/views/index/IndexBotPage";
import ManageBotNodesPage from "./views/bot/views/manage/views/nodes/ManageBotNodesPage";
import ListBotsPage from "./views/list-bots/ListBotsPage";

const DiffusionLabRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ChatbotsApplication />} />
      <Route path={"create-bot"} element={<CreateBotPage />} />
      <Route path={"authorize"}>
        <Route path={"discord"} element={<AuthorizeDiscordPage />} />
      </Route>
      <Route path={"list-bots"} element={<ListBotsPage />} />
      <Route path={"bot"}>
        <Route path={":bot-id"}>
          <Route index element={<IndexBotPage />} />
          <Route path={"manage"}>
            <Route path={"nodes"}>
              <Route index element={<ManageBotNodesPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default DiffusionLabRouter;
