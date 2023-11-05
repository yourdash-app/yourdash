/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { __internalGetSessionsDoNotUseOutsideOfCore } from "../../session.js";
import { CoreApi } from "../coreApi.js";
import WebsocketConnection from "./websocketConnection.js";
import * as socketIo from "socket.io"

export default class CoreApiWebsocketManager {
  private readonly coreApi: CoreApi
  private openSocketConnections: Map<`${string}-${number | string}` /* `[username]-[sessionId]` */, WebsocketConnection> = new Map();
  readonly socketIoServer: socketIo.Server;
  
  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi;
    
    this.socketIoServer = new socketIo.Server( this.coreApi.httpServer );
    
    this.socketIoServer.on( "connection", ( socket: socketIo.Socket<any, any, any, any> ) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  
      const handshakeUsername = socket.handshake.query.username as string;
  
      // Check that all required parameters are present
      if ( !handshakeUsername || !socket.handshake.query.sessionToken || !socket.handshake.query.sessionId ) {
        this.coreApi.log.error( "core:psa-backend", "Closing connection! Missing required parameters!" );
    
        socket.disconnect( true );
        return;
      }
      
      // Add a new socket to the activeSockets
      this.openSocketConnections.set(
        `${handshakeUsername}-${socket.handshake.query.sessionId }`,
        new WebsocketConnection(
          handshakeUsername,
          this.coreApi.users.get( handshakeUsername ).getLoginSessionByToken( socket.handshake.query.sessionToken as string ),
          socket,
          this
        )
      )
  
      socket.on( "execute-command-response", ( output: never ) => {
        this.coreApi.log.info( output );
      } );
  
      socket.on( "disconnect", () => {
        this.__internal__removeSocketConnection( this.openSocketConnections.get( `${handshakeUsername}-${socket.handshake.query.sessionId }` ) );
    
        this.coreApi.log.info( "[PSA-BACKEND]: Closing PSA connection" );
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
  
      if ( !__internalGetSessionsDoNotUseOutsideOfCore()[ username ] ) {
        try {
          const user = this.coreApi.users.get( username );
          __internalGetSessionsDoNotUseOutsideOfCore()[ username ] = ( await user.getAllLoginSessions() ) || [];
        } catch ( _err ) {
          return socket.disconnect();
        }
      }
  
      if ( __internalGetSessionsDoNotUseOutsideOfCore()[ username ].find( ( session ) => session.sessionToken === sessionToken ) ) {
        return next();
      }
  
      return socket.disconnect();
    } );
  
    return this
  }
  
  __internal__removeSocketConnection( connection: WebsocketConnection ) {
    this.openSocketConnections.delete( `${connection.username}-${connection.session.id}` );
  }
}
