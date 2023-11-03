/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import KeyValueDatabase from "../../helpers/keyValueDatabase.js";
import coreApi from "./coreApi.js";
import YourDashUser from "./user/index.js";

export default class CoreApiUsers {
  private usersMarkedForDeletion: string[] = [];
  private userDatabases: { [ username: string ]: { db: KeyValueDatabase, changed: boolean } }

  constructor() {
    coreApi.scheduler.scheduleTask(
      "core:users:delete_all_marked_users",
      "*/5 * * * *", /* every 5 minutes */
      async () => {
        for ( const username of this.usersMarkedForDeletion ) {
          await coreApi.users.forceDelete( username )
        }
      } )
    
    this.userDatabases = {}
    
    return this;
  }

  __internal__startUserDatabaseService() {
    coreApi.scheduler.scheduleTask( "core:userdb_write_to_disk", "*/5 * * * *", async () => {
      Object.keys( this.userDatabases ).map( async username => {
        if ( !this.userDatabases[username].changed ) return
      
        const user = new YourDashUser( username );
      
        await this.userDatabases[username].db.writeToDisk( path.join( user.path, "core/user_db.json" ) )
      } )
    } )
  }

  async create( username: string ) {
    await coreApi.fs.verifyFileSystem()
    
    return this
  }

  delete( username: string ) {
    this.usersMarkedForDeletion.push( username )
    return this
  }
  
  async forceDelete( username: string ) {
    if ( this.usersMarkedForDeletion.includes( username ) ) {
      this.usersMarkedForDeletion.splice( this.usersMarkedForDeletion.indexOf( username ), 1 )
    }
    
    // TODO: DELETE THE USER FROM THE FS
    
    await coreApi.fs.removePath( path.join( coreApi.fs.ROOT_PATH, `./users/${username}` ) )
    delete this.userDatabases[username]
    
    return this
  }

  update() {
    return this
  }

  read() {
    return this
  }
  
  getByUsername( username: string ): YourDashUser {
    return new YourDashUser( username )
  }
}
