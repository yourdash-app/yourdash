/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import fileUrl from "file-url";
import path from "path";
import Module from "./module.js";
import { CoreApi } from "../coreApi.js";

export default class CoreApiModuleManager {
  private readonly loadedModules: Module[];
  private coreApi: CoreApi;

  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi;
    this.loadedModules = []

    return this;
  }

  checkModule( modulePath: string ) {
    if ( !this.coreApi.fs.exists( path.resolve( `${ modulePath }/application.json` ) ) ) {
      this.coreApi.log.error( "core", `application ${ modulePath } does not contain an application.json file!` );
      return false;
    }

    // Not Required (use 'placeholder.avif' instead)
    if ( !this.coreApi.fs.exists( path.resolve( `${ modulePath }/icon.avif` ) ) ) {
      this.coreApi.log.warning( "core", `application ${ modulePath } does not contain an icon.avif file!` );
    }

    // Only required if the application needs a backend
    if ( !this.coreApi.fs.exists( path.resolve( `${ modulePath }/backend` ) ) ) {
      return false;
    }

    // Only required if the application needs a backend
    return this.coreApi.fs.exists( path.resolve( `${ modulePath }/backend/index.js` ) );
  }

  async loadModule( moduleName: string, modulePath: string ) {
    // if the module is not valid or does not require a backend module, return
    if ( !this.checkModule( modulePath ) ) {
      return;
    }

    this.coreApi.log.info( "core:module_manager", `Loading module: "${ moduleName }"` )

    try {
      const module = await import( `${modulePath}/index.js` );
      if ( !module.default ) {
        this.coreApi.log.error( "core", `Unable to load ${ moduleName }! This application does not contain a default export!` );
        return;
      }
      new module.default( { moduleName: moduleName, modulePath: modulePath } );
      this.loadedModules.push( module );
      this.coreApi.log.success( "core:module_manager", `Loaded module: "${ moduleName }"` )
    } catch ( e ) {
      this.coreApi.log.error( "core:module_manager", `Invalid module: "${ moduleName }"` );
    }

    return this;
  }

  unloadModule( module: Module ) {
    const index = this.loadedModules.indexOf( module );
    if ( index > -1 ) {
      this.loadedModules.splice( index, 1 );
    }

    // Each module should be able to have an unload method, but this is not required
    // we should check if it supports this and unload if it does. Otherwise, we should prompt the admin to restart the server

    return this;
  }

  getLoadedModules(): Module[] {
    return this.loadedModules
  }

  async loadInstalledModules() {
    const installedApplications = this.coreApi.globalDb.get( "core:installedApplications" )

    for( const moduleName of installedApplications ) {
      const modulePath = fileUrl( path.resolve( path.join( process.cwd(), "../applications", moduleName, "./backend" ) ) )

      await this.loadModule( moduleName, modulePath );
    }

    if ( this.getLoadedModules().length === 0 ) {
      this.coreApi.log.warning( "core:module_manager", "No modules loaded!" )
      return
    }

    this.coreApi.log.info( "core:module_manager", `Loaded ${ this.getLoadedModules().length } modules` );
  }
}
