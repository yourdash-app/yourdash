/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import { CoreApi } from "./coreApi.js";

export default class CoreApiGlobalDb {
  private keys: { [ key: string ]: any } // eslint-disable-line @typescript-eslint/no-explicit-any
  private readonly coreApi: CoreApi;
  
  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi
    
    return this;
  }
  
  async loadFromDisk( dbFilePath: string ) {
    if ( await this.coreApi.fs.exists( dbFilePath ) ) {
      
      if ( JSON.stringify( this.keys ) === JSON.stringify( {} ) ) {
        await this.coreApi.fs.removePath( path.join( this.coreApi.fs.ROOT_PATH, "./global_database.json" ) );
      }
    } else {
      this.coreApi.log.warning( "Unable to load the global database!" );
    }
    
    return this
  }
}
