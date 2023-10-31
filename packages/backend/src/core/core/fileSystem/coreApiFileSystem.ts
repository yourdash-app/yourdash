/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CoreApi from "../coreApi.js";

export default class CoreApiFileSystem {
  private coreApi: CoreApi;
  
  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi
    return this;
  }
  
  getFile( path: string ) {
    
    // TODO: return an FSFile
    
    return this
  }
}
