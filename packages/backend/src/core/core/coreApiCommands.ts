/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "./coreApi.js";

export default class CoreApiCommands {
  availableCommands: {
    [command: string]: {
      args: string[],
      callback( args: {[arg: string]: string | boolean} ): void
    }
  };
  
  constructor() {
    this.availableCommands = {}
    
    return this;
  }
  
  registerCommand( commandName: string, args: string[], callback: ( args: {[arg: string]: string | boolean} ) => void ) {
    // Placeholder function
    this.availableCommands[commandName] = {
      args: args,
      callback: callback
    }
    
    coreApi.log.info( "core:command", `Registered command: '${commandName}'` )
    
    return this
  }
  
  removeCommand( commandName: string ) {
    delete this.availableCommands[commandName]
    
    return this
  }
  
  getAllCommands(): string[] {
    return Object.keys( this.availableCommands )
  }
  
  updateCommand( commandName: string, args: string[], callback: ( args: {[arg: string]: string | boolean} ) => void ) {
    this.removeCommand( commandName )
    this.registerCommand( commandName, args, callback )
  }
  
  runCommand( commandName: string, args: {[arg: string]: string | boolean} ): Promise<boolean> {
    return new Promise<boolean>( ( resolve, reject ) => {
      if ( !this.availableCommands[commandName] ) {
        coreApi.log.error( "core:command", `Command '${commandName}' does not exist!` )
        return reject( `Command '${commandName}' does not exist!` )
      }
    
      this.availableCommands[commandName].callback( args )
      return resolve( true )
    } )
  }
  
  registerCommandAlias( aliasName: string, commandName: string ) {
    this.availableCommands[aliasName] = {
      args: this.availableCommands[commandName].args,
      callback: this.availableCommands[commandName].callback
    }
    
    return this
  }
}
