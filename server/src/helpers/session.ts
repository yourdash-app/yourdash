import { __internalGetSessions, SESSION_TOKEN_LENGTH } from "../main.js"
import { YourDashSessionType, IYourDashSession } from "../../../shared/core/session.js"
import { generateRandomStringOfLength } from "./encryption.js"
import { promises as fs } from "fs"
import YourDashUnreadUser from "./user.js"
import path from "path"

export function getSessionsForUser( username: string ): IYourDashSession<any>[] {
  return __internalGetSessions()[username]
}

export function getSessionId( username: string, sessionToken: string ): number | null {
  return __internalGetSessions()[username].find( session => session.sessionToken === sessionToken )?.id || null
}

export async function createSession<T extends YourDashSessionType>( username: string, type: T ): Promise<IYourDashSession<T>> {
  const sessionToken = generateRandomStringOfLength( SESSION_TOKEN_LENGTH )

  const user = new YourDashUnreadUser( username )

  try {
    __internalGetSessions()[username] = JSON.parse( ( await fs.readFile( path.resolve( user.getPath(), "./sessions.json" ) ) ).toString() )
  } catch ( _err ) { /* empty */ }

  const newSessionId = getSessionsForUser( username ) ? getSessionsForUser( username ).length + 1 : 1

  const session: IYourDashSession<T> = {
    type,
    id: newSessionId,
    sessionToken
  }

  if ( __internalGetSessions()[username] ) {
    __internalGetSessions()[username].push( session )
  } else {
    __internalGetSessions()[username] = [session]
  }

  try {
    await fs.writeFile( path.resolve( user.getPath(), "./sessions.json" ), JSON.stringify( __internalGetSessions()[username] ) )
  } catch ( __e ) {
    console.log( `Unable to write ${ username }/sessions.json` )
    return session
  }

  return session
}

export default class YourDashSession<T extends YourDashSessionType> {
  id: number
  type: T
  sessionToken: string
  username: string

  constructor( username: string, session: IYourDashSession<T> ) {
    if ( !session ) {
      throw new Error( "An invalid session was provided to YourDashSession" )
    }

    this.id = session.id
    this.type = session.type
    this.sessionToken = session.sessionToken
    this.username = username
  }

  isOnline(): boolean {
    return false
  }

  invalidate() {
    __internalGetSessions()[this.username].splice(
      __internalGetSessions()[this.username].findIndex( val => val.id === this.id ),
      1
    )

    const user = new YourDashUnreadUser( this.username )
    try {
      fs.writeFile( path.resolve( user.getPath(), "./sessions.json" ), JSON.stringify( __internalGetSessions()[this.username] ) )
    } catch ( _err ) {
      return
    }
  }
}
