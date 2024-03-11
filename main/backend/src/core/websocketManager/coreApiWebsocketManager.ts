/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { CoreApi } from "../coreApi.js";
import WebsocketManagerServer from "./websocketManagerServer.js";

export default class CoreApiWebsocketManager {
  coreApi: CoreApi;
  servers: {
    [path: string]: WebsocketManagerServer;
  };

  constructor(coreApi: CoreApi) {
    this.servers = {};
    this.coreApi = coreApi;
  }

  _selfDestruct() {
    Object.keys(this.servers).map(async (path) => {
      if ((await this.servers[path].server.fetchSockets()).length === 0) {
        this.servers[path].server.close();
        delete this.servers[path];
        this.coreApi.log.info("websocket_manager", `${path} was closed as it has no clients connected.`);
      } else {
        this.coreApi.log.info(
          "websocket_manager",
          `${path} is connected with ${Object.keys(this.servers[path].server.fetchSockets()).length} clients.`,
        );
      }
    });
  }

  createServer(path: string) {
    this.servers[path] = new WebsocketManagerServer(this.coreApi, path);

    this.coreApi.log.info("websocket_manager", `${path} was created.`);

    return this.servers[path];
  }

  getServer(appName: string) {
    return this.servers[appName];
  }

  closeServer(appName: string) {
    this.servers[appName].server.close();
  }

  __internal__loadEndpoints() {
    this.coreApi.request.use("/websocket-manager/*", (req, res) => {
      res.status(404).send("Not Found");
    });
  }
}
