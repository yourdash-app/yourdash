/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Server as SocketIOServer } from "socket.io";
import { Core } from "../core.js";
import WebsocketManagerConnection from "./websocketManagerConnection.js";

export default class WebsocketManagerServer {
  core: Core;
  server: SocketIOServer;
  connections: WebsocketManagerConnection[];
  private onConnectionListeners: ((connection: WebsocketManagerConnection) => void)[];

  constructor(core: Core, path: string) {
    this.core = core;
    this.onConnectionListeners = [];

    this.server = new SocketIOServer(this.core.httpServer, {
      path: `${path}/websocket-manager/websocket`,
      cors: { origin: "*" },
    });

    this.server.on("connection", (socketConnection) => {
      // TODO: check for auth (token, username)

      this.onConnectionListeners.forEach((listener) => listener(new WebsocketManagerConnection(this.server, socketConnection)));
    });
  }

  onConnection(cb: (connection: WebsocketManagerConnection) => void) {
    this.onConnectionListeners.push(cb);
  }

  emit(channel: string, ...args: unknown[]) {
    this.server.emit(channel, args);
  }
}
