/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import minimist from "minimist";
import CoreApiCommands from "./coreApiCommands.js";
import CoreApiFileSystem from "./fileSystem/coreApiFileSystem.js";
import CoreApiGlobalDb from "./coreApiGlobalDb.js";
import CoreApiLog from "./coreApiLog.js";
import CoreApiModuleManager from "./coreApiModuleManager.js";
import CoreApiScheduler from "./coreApiScheduler.js";
import CoreApiUsers from "./coreApiUsers.js";
import path from "path";
import express, { Application as ExpressApplication } from "express"
import http from "http"
import socketIo from "socket.io"
import CoreApiVerifyFileSystem from "./fileSystem/coreApiVerifyFileSystem.js";

class CoreApi {
  // core apis
  readonly users: CoreApiUsers;
  readonly log: CoreApiLog;
  readonly moduleManager: CoreApiModuleManager;
  readonly globalDb: CoreApiGlobalDb;
  readonly commands: CoreApiCommands;
  readonly fs: CoreApiFileSystem;
  readonly scheduler: CoreApiScheduler;
  readonly verifyFileSystem: CoreApiVerifyFileSystem;
  // general vars
  readonly processArguments: minimist.ParsedArgs;
  readonly expressServer: ExpressApplication;
  readonly httpServer: http.Server;
  readonly socketIoServer: socketIo.Server;
  
  constructor() {
    // Fetch process arguments
    this.processArguments = minimist( process.argv.slice( 2 ) );
    
    // Create the requests server
    this.expressServer = express()
    this.httpServer = http.createServer( this.expressServer );
    this.socketIoServer = new socketIo.Server( this.httpServer );
    
    // define core apis
    this.users = new CoreApiUsers()
    this.log = new CoreApiLog()
    this.moduleManager = new CoreApiModuleManager()
    this.globalDb = new CoreApiGlobalDb()
    this.commands = new CoreApiCommands()
    this.fs = new CoreApiFileSystem()
    this.scheduler = new CoreApiScheduler()
    this.verifyFileSystem = new CoreApiVerifyFileSystem()
    
    this.commands.registerCommand( "hello", [], () => {
      this.log.info( "core:command", "Hello Called!" )
    } )
    
    this.startupInstance()
      .then( () => {
        /* don't log the success as startupInstance already logs upon its success */
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
    
    await this.globalDb.loadFromDisk( path.join( this.fs.ROOT_PATH, "./global_database.json" ) )

    
    
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

const coreApi = new CoreApi()

export default coreApi
