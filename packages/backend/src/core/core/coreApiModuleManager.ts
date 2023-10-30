/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Module from "../module.js";
import CoreApi from "./coreApi.js";

export default class CoreApiModuleManager {
  private coreApi: CoreApi;
  private loadedModules: Module[]
  
  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi
    return this;
  }
  
  checkModule( module: Module ) {
  
  }
  
  loadModule( module: Module ) {
    this.loadedModules.push( module )
    
    return this
  }
  
  unloadModule( module: Module ) {
    const index = this.loadedModules.indexOf( module )
    if ( index > -1 ) {
      this.loadedModules.splice( index, 1 )
    }
    
    return this
  }
  
  getLoadedModules(): Module[] {
    return this.loadedModules
  }
}
