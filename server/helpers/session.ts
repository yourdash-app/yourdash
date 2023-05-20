import { __internalGetSessions, SESSION_TOKEN_LENGTH } from "../index.js"
import { YourDashSessionType, IYourDashSession } from "../../shared/core/session.js"
import { generateRandomStringOfLength } from "./encryption.js"
import { fetch } from "undici"
import { promises as fs } from "fs"
import YourDashUnreadUser from "./user.js"
import path from "path"

export function getSessionsForUser( username: string ): IYourDashSession<any>[] {
  return __internalGetSessions()[username]
}

export function getSessionId( username: string, sessionToken: string ): number | null {
  return __internalGetSessions()[username].find( session => session.sessionToken === sessionToken )?.id || null
}

export async function createSession<T extends YourDashSessionType>( username: string, ip: string, type: T ): Promise<IYourDashSession<T>> {
  const sessionToken = generateRandomStringOfLength( SESSION_TOKEN_LENGTH )

  const newSessionId = __internalGetSessions()[username] ? __internalGetSessions()[username].length + 1 : 0

  const session: IYourDashSession<T> = {
    type,
    id: newSessionId,
    sessionToken,
    ip
  }

  const user = new YourDashUnreadUser( username )

  try {
    __internalGetSessions()[username] = JSON.parse( ( await fs.readFile( path.resolve( user.getPath(), "./sessions.json" ) ) ).toString() )
  } catch ( _err ) { /* empty */ }

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
  ip: string
  username: string

  constructor( username: string, session: IYourDashSession<T> ) {
    this.id = session.id
    this.type = session.type
    this.sessionToken = session.sessionToken
    this.ip = session.ip
    this.username = username
  }

  async isOnline(): Promise<boolean> {
    return new Promise<boolean>( ( resolve, reject ) => {
      fetch( `${ this.ip }/` )
        .then( res => res.json() )
        .then( res => {
          if ( !res ) {
            reject()
          }
          // @ts-ignore
          if ( res?.status === "ok" ) {
            return resolve( true )
          }

          reject()
        } )
    } )
  }

  invalidate() {
    __internalGetSessions()[this.username].splice(
      __internalGetSessions()[this.username].findIndex( val => val.id === this.id ),
      1
    )
  }
}
