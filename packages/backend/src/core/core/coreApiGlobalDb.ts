/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import coreApi from "./coreApi.js";

export default class CoreApiGlobalDb {
  private keys: { [ key: string ]: any } // eslint-disable-line @typescript-eslint/no-explicit-any
  
  constructor() {
    return this;
  }
  
  async loadFromDisk( dbFilePath: string ) {
    if ( await coreApi.fs.exists( dbFilePath ) ) {
      
      if ( JSON.stringify( this.keys ) === JSON.stringify( {} ) ) {
        await coreApi.fs.removePath( path.join( coreApi.fs.ROOT_PATH, "./global_database.json" ) );
      }
    } else {
      coreApi.log.warning( "Unable to load the global database!" );
    }
    
    return this
  }
}
