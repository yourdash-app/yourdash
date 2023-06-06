import { IYourDashSession, YourDashSessionType } from "../../../shared/core/session.js"
import { activeSockets, io } from "../main.js"
import { Socket as SocketIoSocket } from "socket.io"

export function executeCommand( session: IYourDashSession<YourDashSessionType.desktop>, command: string ): Promise<any> {
  return new Promise( resolve => {
    const socket = getSocketFromSession( session )
    socket.emit( "execute-command", command, data => {
      resolve( data )
    } )
  } )
}

// FIXME: THIS DOES NOT WORK!
export function getSocketFromSession( session: IYourDashSession<YourDashSessionType.desktop> ): SocketIoSocket | undefined {
  const sockets = io.sockets.sockets

  // eslint-disable-next-line guard-for-in
  for ( const socketId in sockets ) {
    const socket = sockets[socketId]

    const sessionData = socket.handshake.query
    if (
      sessionData.sessionToken === session.sessionToken &&
      sessionData.sessionId === session.id
    ) {
      return socket
    }
  }

  return undefined
}

export class PersonalServerAcceleratorCommunication {
  socketConnection: SocketIoSocket

  constructor( session: IYourDashSession<YourDashSessionType.desktop> ) {
    this.socketConnection = getSocketFromSession( session )

    return this
  }

  listenFor( path: string, callBack: ( data: any ) => void ) {
    this.socketConnection.on( path, callBack )
  }

  emit( path: string, data: any ) {
    this.socketConnection.emit( path, data )
  }
}
