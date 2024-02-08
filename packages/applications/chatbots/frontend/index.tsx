/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import NodesView from "@yourdash/uikit/views/nodes/NodesView";
import ComingSoon from "@yourdash/web-client/src/ComingSoon";
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
                  nodes={{
                    "number-variable": {
                      displayName: "Number",
                      outputs: {
                        value: "number",
                      },
                      inputs: {
                        test1: "number",
                      },
                      exec: (inputs) => {
                        return inputs;
                      },
                      onInit: (node) => {
                        node.setOutput("value", Math.random() * 100);
                      },
                    },
                    "log-to-console": {
                      displayName: "Console Log",
                      inputs: {
                        value: "string",
                      },
                      outputs: {},
                      exec: (inputs) => {
                        console.log(inputs?.value);
                        return inputs;
                      },
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
