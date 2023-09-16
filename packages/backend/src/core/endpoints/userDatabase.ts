/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Application as ExpressApplication } from "express"
import { promises as fs, writeFileSync } from "fs";
import YourDashUnreadUser from "../user/user.js";
import path from "path";

type JSONValue = boolean | number | string | null | JSONFile

type JSONFile = {
  [ key: string ]: JSONValue
}

export const USER_DATABASES = new Map<string, JSONFile>()

export function saveUserDatabases() {
  const databases = Array.from( USER_DATABASES )
  databases.map( ( [ key, database ] ) => {
    const user = new YourDashUnreadUser( key )
    
    console.log( "Saving database", database )
    
    writeFileSync( path.join( user.getPath(), "user_db.json" ), JSON.stringify( database ) )
  } )
}

export async function loadUserDatabase( username: string ): Promise<JSONFile> {
  const user = new YourDashUnreadUser( username )
  
  return JSON.parse( ( await fs.readFile( path.join( user.getPath(), "user_db.json" ) ) ).toString() )
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