/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */
import { Server as SocketIOServer, Socket as SocketIOSocket } from "socket.io";

export default class WebsocketManagerConnection {
  server: SocketIOServer;
  connectionOptions: object;
  underlyingSocket: SocketIOSocket<
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [event: string]: (...args: any[]) => void;
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [event: string]: (...args: any[]) => void;
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [event: string]: (...args: any[]) => void;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;

  constructor(server: SocketIOServer, socketConnection: WebsocketManagerConnection["underlyingSocket"]) {
    this.server = server;
    this.underlyingSocket = socketConnection;
  }

  isConnected(): boolean {
    return this.underlyingSocket.connected;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(channel: string, ...args: any[]) {
    this.underlyingSocket.emit(channel, args);

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChannel(channel: string, cb: (...args: any[]) => void) {
    this.underlyingSocket.on(channel, cb);
  }
}
