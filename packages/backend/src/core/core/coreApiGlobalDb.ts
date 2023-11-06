/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import KeyValueDatabase from "../../helpers/keyValueDatabase.js";
import { CoreApi } from "./coreApi.js";
import { promises as fs } from "fs"

// TODO: rewrite this to use a KVD ( Key Value Database )

export default class CoreApiGlobalDb extends KeyValueDatabase {
  private readonly coreApi: CoreApi;
  
  constructor( coreApi: CoreApi ) {
    super()
    
    this.coreApi = coreApi
    
    return this;
  }
  
  async loadFromDisk( dbFilePath: string ) {
    if ( await this.coreApi.fs.exists( dbFilePath ) ) {
      
      if ( JSON.stringify( this.keys ) === JSON.stringify( {} ) ) {
        await this.coreApi.fs.removePath( path.join( this.coreApi.fs.ROOT_PATH, "./global_database.json" ) );
      }
    } else {
      this.coreApi.log.warning( "core:globaldb", "Unable to load the global database!" );
    }
    
    return this
  }
}
