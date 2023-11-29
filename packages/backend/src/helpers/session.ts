/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import coreApi from "../core/coreApi.js";
import { SESSION_TOKEN_LENGTH } from "../core/coreApiUsers.js";
import YourDashUser from "../core/user/index.js";
import { IYourDashSession, YOURDASH_SESSION_TYPE } from "../../../shared/core/session.js";
import { generateRandomStringOfLength } from "./encryption.js";

export function getSessionsForUser( username: string ): IYourDashSession<any>[] { // eslint-disable-line @typescript-eslint/no-explicit-any
  return coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[username];
}

export function getSessionId( username: string, sessionToken: string ): number | null {
  return coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[username].find( session => session.sessionToken === sessionToken )?.id || null;
}

export async function createSession<T extends YOURDASH_SESSION_TYPE>(
  username: string,
  type: T
): Promise<IYourDashSession<T>> {
  const sessionToken = generateRandomStringOfLength( SESSION_TOKEN_LENGTH );

  const user = new YourDashUser( username );

  try {
    coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] =
      JSON.parse( ( await fs.readFile( path.join( user.path, "core/sessions.json" ) ) ).toString() );
  } catch ( _err ) { /* empty */ }

  const newSessionId = getSessionsForUser( username ) ? getSessionsForUser( username ).length + 1 : 1;

  const session: IYourDashSession<T> = {
    type,
    id: newSessionId,
    sessionToken
  };

  if ( coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] ) {
    coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[username].push( session );
  } else {
    coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] = [session];
  }

  try {
    await fs.writeFile(
      path.join( user.path, "core/sessions.json" ),
      JSON.stringify( coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[username] )
    );
  } catch ( __e ) {
    coreApi.log.error( `Unable to write ${ username }/core/sessions.json` );

    return session;
  }

  return session;
}

export default class YourDashSession<T extends YOURDASH_SESSION_TYPE> {
  id: number;
  type: T;
  sessionToken: string;
  username: string;

  constructor( username: string, session: IYourDashSession<T> ) {
    if ( !session ) {
      throw new Error( "An invalid session was provided to YourDashSession" );
    }

    this.id = session.id;
    this.type = session.type;
    this.sessionToken = session.sessionToken;
    this.username = username;
  }

  isOnline(): boolean {
    return false;
  }

  async invalidate() {
    coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[this.username].splice(
      coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[this.username].findIndex( val => val.id === this.id ),
      1
    );

    const user = new YourDashUser( this.username );
    try {
      await fs.writeFile(
        path.join( user.path, "core/sessions.json" ),
        JSON.stringify( coreApi.users.__internal__getSessionsDoNotUseOutsideOfCore()[this.username] )
      );
    } catch ( _err ) {
      return;
    }
  }
}
