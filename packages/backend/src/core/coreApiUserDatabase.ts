/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import { CoreApi } from "./coreApi.js";
import YourDashUser from "./user/index.js";

type JSONValue = boolean | number | string | null | JSONFile

type JSONFile = {
  [ key: string ]: JSONValue
}

// This class only manages the user databases, the databases should be accessed through coreApiUser not directly from USER_DATABASES
export default class CoreApiUserDatabase {
  private coreApi: CoreApi
  USER_DATABASES: Map<string, JSONFile>

  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi
    this.USER_DATABASES = new Map<string, JSONFile>()

    return this
  }

  async saveDatabases() {
    const databases = Array.from( this.USER_DATABASES )

    databases.map( async ( [ key, database ] ) => {
      const user = new YourDashUser( key )

      this.coreApi.log.info( "core:user_db", `Saving database for '${ key }'` )

      await fs.writeFile( path.join( user.path, "core/user_db.json" ), JSON.stringify( database ) )
    } )
  }

  async loadUserDatabase( username: string ): Promise<JSONFile> {
    const user = new YourDashUser( username )

    try {
      // attempt to parse json data from "user_db.json"
      return JSON.parse( ( await fs.readFile( path.join( user.path, "core/user_db.json" ) ) ).toString() )
    } catch ( _err ) {
      this.coreApi.log.warning( "core:userdb", `Unable to parse "${username}"'s user database.` )

      // throw an error because we can't parse user_db.json
      throw new Error( `Unable to parse "${username}"'s user database.` )
    }
  }

  __internal__loadEndpoints() {
    this.coreApi.expressServer.get( "/core/user_db", async ( req, res ) => {
      const { username } = req.headers as { username: string }

      if ( !this.USER_DATABASES.get( username ) ) {
        this.USER_DATABASES.set( username, await this.loadUserDatabase( username ) )
      }

      return res.json( this.USER_DATABASES.get( username ) || {} )
    } )

    this.coreApi.expressServer.post( "/core/user_db", async ( req, res ) => {
      const { username } = req.headers as { username: string }

      this.USER_DATABASES.set( username, req.body )

      return res.json( { success: true } )
    } )
  }
}
