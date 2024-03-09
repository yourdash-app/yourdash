/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Server as SocketIOServer } from "socket.io";
import { CoreApi } from "../coreApi.js";
import WebsocketManagerConnection from "./websocketManagerConnection.js";

export default class WebsocketManagerServer {
  coreApi: CoreApi;
  server: SocketIOServer;
  connections: WebsocketManagerConnection[];
  private onConnectionListeners: ((connection: WebsocketManagerConnection) => void)[];

  constructor(coreApi: CoreApi, path: string) {
    this.coreApi = coreApi;
    this.onConnectionListeners = [];

    this.server = new SocketIOServer(this.coreApi.httpServer, {
      path: `${path}/websocket-manager/websocket`,
      cors: { origin: "*" },
    });

    this.server.on("connection", (socketConnection) => {
      // TODO: check for auth (token, username)

      this.onConnectionListeners.forEach((listener) =>
        listener(new WebsocketManagerConnection(this.server, socketConnection)),
      );
    });
  }

  onConnection(cb: (connection: WebsocketManagerConnection) => void) {
    this.onConnectionListeners.push(cb);
  }
}
