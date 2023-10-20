/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import scheduleTask from "../taskScheduler.js";
import YourDashUser from "./index.js";
import KeyValueDatabase from "../../helpers/keyValueDatabase.js";
import path from "path";

const USER_DATABASES: {
  [ username: string ]: { db: KeyValueDatabase, changed: boolean }
} = {};

export function startUserDatabaseService() {
  scheduleTask( "core:userdb_write_to_disk", "*/5 * * * *", async () => {
    Object.keys( USER_DATABASES )
      .map( async username => {
        if ( USER_DATABASES[username].changed ) {
          const user = new YourDashUser( username );
      
          await USER_DATABASES[username].db.writeToDisk( path.join( user.path, "core/user_db.json" ) )
        }
      } )
  } )
}

export default async function getUserDatabase( username: string ): Promise<KeyValueDatabase> {
  if ( USER_DATABASES[username] ) {
    return USER_DATABASES[username].db;
  }
  
  USER_DATABASES[username] = { db: new KeyValueDatabase(), changed: false };
  
  const user = new YourDashUser( username );
  
  await USER_DATABASES[username].db.readFromDisk( path.join( user.path, "core/user_db.json" ) );
  
  return USER_DATABASES[username].db;
}

export function addUserDatabaseToSaveQueue( username: string ) {
  USER_DATABASES[username].changed = true
}

export async function saveUserDatabaseInstantly( username: string ) {
  USER_DATABASES[username].changed = false
  const user = new YourDashUser( username );
  await USER_DATABASES[username].db.writeToDisk( path.join( user.path, "core/user_db.json" ) )
}
