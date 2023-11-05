/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication } from "express";
import { promises as fs, writeFileSync } from "fs";
import path from "path";
import log, { LOG_TYPE } from "../../helpers/log.js";
import YourDashUser from "../core/user/index.js";

type JSONValue = boolean | number | string | null | JSONFile

type JSONFile = {
  [ key: string ]: JSONValue
}

export const USER_DATABASES = new Map<string, JSONFile>()

export function saveUserDatabases() {
  const databases = Array.from( USER_DATABASES )
  databases.map( ( [ key, database ] ) => {
    const user = new YourDashUser( key )
    
    console.log( "Saving database", database )
    
    writeFileSync( path.join( user.path, "core/user_db.json" ), JSON.stringify( database ) )
  } )
}

export async function loadUserDatabase( username: string ): Promise<JSONFile> {
  const user = new YourDashUser( username )
  
  try {
    // attempt to parse json data from "user_db.json"
    return JSON.parse( ( await fs.readFile( path.join( user.path, "core/user_db.json" ) ) ).toString() )
  } catch ( _err ) {
    log( logType.WARNING, "core:userdb", `Unable to parse "${username}"'s user database.` )

    // throw an error because we can't parse user_db.json
    throw new Error( `Unable to parse "${username}"'s user database.` )
  }
}

export default function defineUserDatabaseRoutes( exp: ExpressApplication ) {
  exp.get( "/core/user_db", async ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    if ( !USER_DATABASES.get( username ) ) {
      USER_DATABASES.set( username, await loadUserDatabase( username ) )
    }
    
    return res.json( USER_DATABASES.get( username ) || {} )
  } )
  
  exp.post( "/core/user_db", async ( req, res ) => {
    const { username } = req.headers as { username: string }
    
    USER_DATABASES.set( username, req.body )
    
    console.log( USER_DATABASES.get( username ) )
    
    return res.json( { success: true } )
  } )
}
