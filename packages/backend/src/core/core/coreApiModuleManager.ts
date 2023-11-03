/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Module from "../module.js";

export default class CoreApiModuleManager {
  private loadedModules: Module[]
  
  constructor() {
    return this;
  }
  
  checkModule( module: Module ) {
    // TODO: check the module before loading
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
