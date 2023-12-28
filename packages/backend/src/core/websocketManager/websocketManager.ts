/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as socketIo from "socket.io";
import YourDashSession from "../../helpers/session.js";
import { YOURDASH_SESSION_TYPE } from "shared/core/session.js";
import WebsocketManagerServerConnection from "./websocketManagerServerConnection.js";
import coreApi, { CoreApi } from "../coreApi.js";

export default class WebsocketManager {
  private openSocketConnections: Map<`${string}-${number | string}` /* `[username]-[sessionId]` */, WebsocketManagerServerConnection> = new Map();
  readonly socketIoServer: socketIo.Server;

  constructor( rootPath: string ) {
    this.socketIoServer = new socketIo.Server( coreApi.httpServer, {
      cors: {
        origin: "*" // TODO: update this to limit CORS to localhost:5173 and prod domains
      },
      path: `${rootPath}/websocket-manager/websocket`
    } );

    this.socketIoServer.on( "connection", ( socket: socketIo.Socket<any, any, any> ) => { // eslint-disable-line @typescript-eslint/no-explicit-any

      const handshakeUsername = socket.handshake.query.username as string;

      // Check that all required parameters are present
      if ( !handshakeUsername || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId ) {
        coreApi.log.error( "websocket_manager", "Closing connection! Missing required parameters!" );

        socket.disconnect( true );
        return;
      }

      const session = coreApi.users.get( handshakeUsername ).getLoginSessionByToken( socket.handshake.query.sessionToken as string );

      if ( session.type !== YOURDASH_SESSION_TYPE.desktop )
        return socket.disconnect( true )

      // Add a new socket to the activeSockets
      this.openSocketConnections.set(
        `${handshakeUsername}-${socket.handshake.query.sessionId }`,
        new WebsocketManagerServerConnection(
          handshakeUsername,
          session as YourDashSession<YOURDASH_SESSION_TYPE.desktop>,
          socket,
          this
        )
      )

      socket.on( "execute-command-response", ( output: never ) => {
        coreApi.log.info( "websocket_manager",output );
      } );

      socket.on( "disconnect", () => {
        this.__internal__removeSocketConnection( this.openSocketConnections.get( `${handshakeUsername}-${socket.handshake.query.sessionId }` ) );

        coreApi.log.info( "websocket_manager","Closing Websocket connection" );
      } );

      return;
    } );

    // handle socket.io session authentication
    this.socketIoServer.use( async ( socket: socketIo.Socket, next ) => {
      const {
        username,
        sessionToken
      } = socket.handshake.query as { username?: string, sessionToken?: string };

      if ( !username || !sessionToken ) {
        return socket.disconnect();
      }

      if ( !coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[ username ] ) {
        try {
          const user = coreApi.users.get( username );
          coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[ username ] = ( await user.getAllLoginSessions() ) || [];
        } catch ( _err ) {
          return socket.disconnect();
        }
      }

      if ( coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[ username ].find( ( session ) => session.sessionToken === sessionToken ) ) {
        return next();
      }

      return socket.disconnect();
    } );

    return this
  }

  __internal__removeSocketConnection( connection: WebsocketManagerServerConnection ) {
    this.openSocketConnections.delete( `${connection.username}-${connection.session.id}` );
  }

  getSocketConnection( username: string, sessionId: string ): WebsocketManagerServerConnection | undefined {
    return this.openSocketConnections.get( `${username}-${sessionId}` );
  }

  getAllSocketConnectionsForUser( username: string ) {
    return Array.from( this.openSocketConnections.values() ).filter( connection => connection.username === username );
  }
}
