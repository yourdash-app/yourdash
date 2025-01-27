/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Core } from "../core.js";
import WebsocketManagerServer from "./websocketManagerServer.js";

export default class coreWebsocketManager {
  core: Core;
  servers: {
    [path: string]: WebsocketManagerServer;
  };

  constructor(core: Core) {
    this.servers = {};
    this.core = core;
  }

  _selfDestruct() {
    Object.keys(this.servers).map(async (path) => {
      if ((await this.servers[path].server.fetchSockets()).length === 0) {
        await this.servers[path].server.close();
        delete this.servers[path];
        this.core.log.info("websocket_manager", `${path} was closed as it has no clients connected.`);
      } else {
        this.core.log.info(
          "websocket_manager",
          `${path} is connected with ${Object.keys(this.servers[path].server.fetchSockets()).length} clients.`,
        );
      }
    });
  }

  createServer(path: string) {
    this.servers[path] = new WebsocketManagerServer(this.core, path);

    this.core.log.info("websocket_manager", `${path} was created.`);

    return this.servers[path];
  }

  getServer(appName: string) {
    return this.servers[appName];
  }

  closeServer(appName: string) {
    this.servers[appName].server.close();
  }

  __internal__loadEndpoints() {
    this.core.request.usePath("/websocket-manager/*", async (req, res) => {
      res.status(404).send("Not Found");
    });
  }
}
