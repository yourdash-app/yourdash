import { IYourDashSession, YourDashSessionType } from "../../../shared/core/session.js"
import { activeSockets, io } from "../main.js"
import { Socket as SocketIoSocket } from "socket.io"

export function executeCommand( username: string, session: IYourDashSession<YourDashSessionType.desktop>, command: string ): Promise<any> {
  return new Promise( resolve => {
    const socket = getSocketFromSession( username, session )
    socket.emit( "execute-command", command, data => {
      resolve( data )
    } )
  } )
}

export function getSocketFromSession( username: string, session: IYourDashSession<YourDashSessionType.desktop> ): SocketIoSocket | undefined {
  return activeSockets[username].find( sock => sock.id === session.id.toString() ).socket

  return undefined
}

export class PersonalServerAcceleratorCommunication {
  socketConnection: SocketIoSocket

  constructor( username: string, session: IYourDashSession<YourDashSessionType.desktop> ) {
    this.socketConnection = getSocketFromSession( username, session )

    return this
  }

  listenFor( path: string, callBack: ( data: any ) => void ) {
    this.socketConnection.on( path, callBack )
  }

  emit( path: string, data: any ) {
    this.socketConnection.emit( path, data )
  }
}
