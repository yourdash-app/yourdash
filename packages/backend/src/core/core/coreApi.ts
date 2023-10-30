/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CoreApiCommands from "./coreApiCommands.js";
import CoreApiFileSystem from "./coreApiFileSystem.js";
import CoreApiGlobalDb from "./coreApiGlobalDb.js";
import CoreApiLog from "./coreApiLog.js";
import CoreApiModuleManager from "./coreApiModuleManager.js";
import CoreApiScheduler from "./coreApiScheduler.js";
import CoreApiUsers from "./coreApiUsers.js";

export default class CoreApi {
  readonly users: CoreApiUsers;
  readonly log: CoreApiLog;
  readonly moduleManager: CoreApiModuleManager;
  readonly globalDb: CoreApiGlobalDb;
  readonly commands: CoreApiCommands;
  readonly fileSystem: CoreApiFileSystem;
  readonly scheduler: CoreApiScheduler;
  
  constructor() {
    this.users = new CoreApiUsers( this )
    this.log = new CoreApiLog( this )
    this.moduleManager = new CoreApiModuleManager( this )
    this.globalDb = new CoreApiGlobalDb( this )
    this.commands = new CoreApiCommands( this )
    this.fileSystem = new CoreApiFileSystem( this )
    this.scheduler = new CoreApiScheduler( this )
    
    this.startupInstance()
      .then( () => {
        return
      } )
      .catch( ( err ) => {
        this.log.error( "core", `An error occurred with YourDash startup: ${ err }` )
      } )
    
    return this;
  }
  
  // start the YourDash Instance
  private async startupInstance() {
    this.log.info( "core", "Welcome to the YourDash Instance backend" )
    
    this.commands.registerCommand(
      "restart",
      [],
      () => {
        this.restartInstance()
      }
    )
    
    this.commands.registerCommand(
      "gdb",
      [],
      () => {
        this.log.warning( "core:gdb", "IMPLEMENT ME!" )
      }
    )
    
    await this.commands.runCommand( "restart", {} )
    
    this.log.info( "core", "Welcome to the YourDash Instance backend" )
    
    return this
  }
  
  // try not to use this method for production stability, instead prefer to reload a specific module if it works for your use-case.
  shutdownInstance() {
    this.commands.getAllCommands().forEach( command => {
      this.commands.removeCommand( command )
    } )
    
    return this
  }
  
  // shutdown and startup the YourDash Instance
  async restartInstance() {
    this.shutdownInstance()
    await this.startupInstance()
    
    return this
  }
}
