/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { CoreApi } from "./coreApi.js";

export default class CoreApiCommands {
  availableCommands: {
    [command: string]: {
      callback( args: string[] ): void
    }
  };
  private readonly coreApi: CoreApi;
  
  constructor( coreApi: CoreApi ) {
    this.availableCommands = {}
    this.coreApi = coreApi
    
    process.stdin.on( "data", ( data ) => {
      const commandAndArgs = data.toString().replaceAll( "\n", "" ).replaceAll( "\r", "" ).split( " " );
      const command = commandAndArgs[ 0 ];
      
      if ( !this.availableCommands[command] ) {
        this.coreApi.log.error( "core:command", `Command '${command}' does not exist!` )
        return
      }
      
      this.runCommand( command, commandAndArgs.slice( 1 ) )
    } );
    
    return this;
  }
  
  registerCommand( commandName: string, callback: ( args: string[] ) => void ) {
    // Placeholder function
    this.availableCommands[commandName] = {
      callback: callback
    }
    
    this.coreApi.log.info( "core:command", `Registered command: '${commandName}'` )
    
    return this
  }
  
  removeCommand( commandName: string ) {
    delete this.availableCommands[commandName]
    
    return this
  }
  
  getAllCommands(): string[] {
    return Object.keys( this.availableCommands )
  }
  
  updateCommand( commandName: string, callback: ( args: string[] ) => void ) {
    this.removeCommand( commandName )
    this.registerCommand( commandName, callback )
  }
  
  runCommand( commandName: string, args: string[] ): Promise<boolean> {
    return new Promise<boolean>( ( resolve, reject ) => {
      if ( !this.availableCommands[commandName] ) {
        this.coreApi.log.error( "core:command", `Command '${commandName}' does not exist!` )
        return reject( `Command '${commandName}' does not exist!` )
      }
    
      this.availableCommands[commandName].callback( args )
      return resolve( true )
    } )
  }
  
  registerCommandAlias( aliasName: string, commandName: string ) {
    this.availableCommands[aliasName] = {
      callback: this.availableCommands[commandName].callback
    }
    
    return this
  }
}
