/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CoreApi from "../core/coreApi.js";
import YourDashUser from "./index.js";
import KeyValueDatabase from "../../helpers/keyValueDatabase.js";
import path from "path";

const userDatabases: { [ username: string ]: { db: KeyValueDatabase, changed: boolean } } = {};

export function startUserDatabaseService( coreApi: CoreApi ) {
  coreApi.scheduler.scheduleTask( "core:userdb_write_to_disk", "*/5 * * * *", async () => {
    Object.keys( userDatabases ).map( async username => {
      if ( !userDatabases[username].changed ) return
      
      const user = new YourDashUser( username );
      
      await userDatabases[username].db.writeToDisk( path.join( user.path, "core/user_db.json" ) )
    } )
  } )
}

export default async function getUserDatabase( username: string ): Promise<KeyValueDatabase> {
  if ( userDatabases[username] ) {
    return userDatabases[username].db;
  }
  
  userDatabases[username] = { db: new KeyValueDatabase(), changed: false };
  const user = new YourDashUser( username );
  await userDatabases[username].db.readFromDisk( path.join( user.path, "core/user_db.json" ) );
  
  return userDatabases[username].db;
}

export function addUserDatabaseToSaveQueue( username: string ) {
  userDatabases[username].changed = true
}

export async function saveUserDatabaseInstantly( username: string ) {
  userDatabases[username].changed = false
  const user = new YourDashUser( username );
  await userDatabases[username].db.writeToDisk( path.join( user.path, "core/user_db.json" ) )
}
