/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import NodesView from "@yourdash/uikit/views/nodes/NodesView";
import ComingSoon from "@yourdash/web-client/src/ComingSoon";
import generateUUID from "@yourdash/web-client/src/helpers/uuid";
import React from "react";
import { Routes, Route } from "react-router";
import ChatbotsApplication from "./chatbotsApplication";
import CreateBotPage from "./views/bot/views/create/CreateBotPage";

const DiffusionLabRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ChatbotsApplication />} />
      <Route path={"create-bot"} element={<CreateBotPage />} />
      <Route path={"manage"}>
        <Route path={":uuid"}>
          <Route index element={<ComingSoon />} />
          <Route path={"nodes"}>
            <Route
              index
              element={
                <NodesView
                  nodes={[
                    {
                      id: generateUUID(),
                    },
                  ]}
                  possibleNodes={{
                    "number-variable": {
                      outputs: {
                        value: "number",
                      },
                      displayName: "Number Variable",
                    },
                  }}
                />
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default DiffusionLabRouter;
