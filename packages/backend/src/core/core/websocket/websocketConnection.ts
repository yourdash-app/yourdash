/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Socket as SocketIoSocket } from "socket.io"
import { IYourDashSession, YOURDASH_SESSION_TYPE } from "../user/session.js";
import CoreApiWebsocketManager from "./coreApiWebsocketManager.js";

export default class WebsocketConnection {
  username: string;
  session: IYourDashSession<YOURDASH_SESSION_TYPE.desktop>;
  private socket: SocketIoSocket | undefined;
  private websocketManager: CoreApiWebsocketManager;
  id: `${string}-${number}` /* `[username]-[sessionId]` */;
  
  constructor(
    username: string,
    session: IYourDashSession<YOURDASH_SESSION_TYPE.desktop>,
    socket: SocketIoSocket,
    websocketManager: CoreApiWebsocketManager
  ) {
    this.username = username;
    this.session = session;
    this.socket = socket;
    this.websocketManager = websocketManager;
    
    return this
  }
  
  close() {
    this.socket.disconnect()
    
    this.websocketManager.__internal__removeSocketConnection( this )
  }
  
  listenFor( path: string, callBack: ( data: any ) => void ) {
    this.socket.on( path, callBack );
    
    return this
  }
  
  emit( path: string, data: any ) { // eslint-disable-line @typescript-eslint/no-explicit-any
    this.socket.emit( path, data );

    return this
  }
}
