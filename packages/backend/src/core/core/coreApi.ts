/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import express, { Application as ExpressApplication } from "express";
import http from "http";
import minimist from "minimist";
import path from "path";
import * as socketIo from "socket.io";
import CoreApiCommands from "./coreApiCommands.js";
import CoreApiGlobalDb from "./coreApiGlobalDb.js";
import CoreApiLog from "./coreApiLog.js";
import CoreApiModuleManager from "./coreApiModuleManager.js";
import CoreApiScheduler from "./coreApiScheduler.js";
import CoreApiUsers from "./coreApiUsers.js";
import CoreApiFileSystem from "./fileSystem/coreApiFileSystem.js";
import fs from "fs"
import CoreApiWebsocketManager from "./websocket/coreApiWebsocketManager.js";

export class CoreApi {
  // core apis
  readonly users: CoreApiUsers;
  readonly log: CoreApiLog;
  readonly moduleManager: CoreApiModuleManager;
  readonly globalDb: CoreApiGlobalDb;
  readonly commands: CoreApiCommands;
  readonly fs: CoreApiFileSystem;
  readonly scheduler: CoreApiScheduler;
  readonly websocketManager: CoreApiWebsocketManager;
  // general vars
  readonly processArguments: minimist.ParsedArgs;
  readonly expressServer: ExpressApplication;
  readonly httpServer: http.Server;
  
  constructor() {
    // Fetch process arguments
    this.processArguments = minimist( process.argv.slice( 2 ) );
    
    // Create the requests server
    this.expressServer = express()
    this.httpServer = http.createServer( this.expressServer );
    
    // define core apis
    this.scheduler = new CoreApiScheduler( this )
    this.users = new CoreApiUsers( this )
    this.log = new CoreApiLog()
    this.moduleManager = new CoreApiModuleManager( this )
    this.globalDb = new CoreApiGlobalDb( this )
    this.commands = new CoreApiCommands( this )
    this.fs = new CoreApiFileSystem( this )
    this.websocketManager = new CoreApiWebsocketManager( this )
    
    this.commands.registerCommand(
      "hello",
      () => {
        this.log.info( "core:command", "Hello from YourDash!" )
      }
    )
    
    this.commands.registerCommand(
      "restart",
      async () => {
        await this.restartInstance()
      }
    )
    
    this.commands.registerCommand(
      "gdb",
      ( args ) => {
        const subCommand = args[ 0 ];
        const key = args[ 1 ];
        const value = args[ 2 ];
    
        switch ( subCommand ) {
        case "set":
          this.globalDb.set( key, value );
          this.log.info( "core:command", `set "${ key }" to "${ value }"` );
          break;
        case "get":
          this.log.info( "core:command", this.globalDb.get( key ) );
          break;
        case "delete":
          this.globalDb.removeValue( key );
          this.log.info( "core:command", `deleted "${ key }"` );
          break;
        default:
          this.log.info( "core:command", "gdb ( Global Database )\n- get: \"gdb get {key}\"\n- set: \"gdb set {key} {value}\"\n- delete: \"gdb delete {key}\"" );
        }
      }
    )
    
    this.__internal__startInstance()
      .then( () => {
        /* INFO: don't log the success as __internal__startInstance already logs upon its success */
      } )
      .catch( ( err ) => {
        this.log.error( "core", `An error occurred with YourDash startup: ${ err }` )
      } )
    
    return this;
  }
  
  // start the YourDash Instance
  async __internal__startInstance() {
    this.log.info( "core:startup", "Welcome to the YourDash Instance backend" )
    
    await this.fs.verifyFileSystem.verify()
    
    await this.globalDb.loadFromDisk( path.join( this.fs.ROOT_PATH, "./global_database.json" ) )

    this.users.__internal__startUserDatabaseService()
    this.users.__internal__startUserDeletionService()
    
    await this.moduleManager.loadInstalledModules()
    
    return this
  }

  // try not to use this method for production stability, instead prefer to reload a specific module if it works for your use-case.
  shutdownInstance() {
    this.commands.getAllCommands().forEach( command => {
      this.commands.removeCommand( command )
    } )
    
    this.log.info( "core", "Shutting down... ( restart should occur automatically )" );
  
    const LOG_OUTPUT = this.log.logHistory.map( ( hist ) => {
      return `${ hist.type }: ${ hist.message }`;
    } ).join( "\n" );
  
    this.httpServer.close();
  
    fs.readdirSync( path.resolve( this.fs.ROOT_PATH, "./users" ) )
      .forEach( async username => {
        await this.users.__internal__saveUserDatabaseInstantly( username )
      } )
  
    fs.writeFile( path.resolve( process.cwd(), "./fs/log.log" ), LOG_OUTPUT, () => {
      try {
        this.globalDb.__internal__doNotUseOnlyIntendedForShutdownSequenceWriteToDisk( path.resolve( process.cwd(), "./fs/global_database.json" ) );
      } catch ( e ) {
        this.log.error( "core", "[EXTREME SEVERITY] Shutdown Error! failed to save global database. User data will have been lost! (past 5 minutes)" );
      }
    } );
    
    return this
  }

  // shutdown and startup the YourDash Instance
  async restartInstance() {
    this.shutdownInstance()
    await this.__internal__startInstance()
    
    return this
  }
}

const coreApi = new CoreApi()

export default coreApi
