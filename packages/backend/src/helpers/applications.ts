/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import { Application as ExpressApplication } from "express";
import { Server as SocketServer } from "socket.io";
import { type IYourDashApplication } from "shared/core/application.js";
import log, { LOG_TYPES } from "./log.js";
import globalDatabase from "./globalDatabase.js";

class YDApplication {
  private readonly name: string;
  private readonly application: IYourDashApplication;
  
  constructor( application: IYourDashApplication ) {
    this.name = application.name;
    this.application = application;
    return this;
  }
  
  // Returns a string containing the application's name ( this could be described as the application's ID )
  getName(): string {
    return this.application.name;
  }
  
  // Returns a string containing the application's display name
  getDisplayName(): string {
    return this.application.displayName;
  }
  
  // Returns a string containing the application's store description
  getDescription(): string {
    return this.application.description;
  }
  
  // Returns a string array containing the application's dependency applications
  getDependencies(): string[] {
    return this.application.dependencies || [];
  }
  
  // Returns a Buffer containing the data for the application's icon
  getIcon(): Promise<Buffer> {
    try {
      return fs.readFile( path.resolve( process.cwd(), `../applications/${ this.name }/icon.avif` ) );
    } catch ( _e ) {
      return fs.readFile( path.resolve( process.cwd(), "./src/assets/placeholder_application_icon.png" ) );
    }
  }
  
  // Returns a string with the path to the application's icon
  getIconPath(): string {
    return path.resolve( process.cwd(), `../applications/${ this.name }/icon.avif` );
  }
  
  // Returns a Buffer containing the data for the application's store page banner
  getStoreBackground(): Promise<Buffer> {
    try {
      // TODO: add support for custom application backgrounds
      return fs.readFile( path.resolve( process.cwd(), "./src/assets/promoted_application_default_background.png" ) );
    } catch ( _e ) {
      return fs.readFile( path.resolve( process.cwd(), "./src/assets/promoted_application_default_background.png" ) );
    }
  }
  
  // Returns true if the application is installed, otherwise returns false
  isInstalled(): boolean {
    return !!globalDatabase.get( "installedApplications" ).includes( this.name );
  }
  
  getCategory(): string {
    return this.application.category;
  }
  
  // Returns the path to the application
  getPath(): string {
    return path.resolve( process.cwd(), `../applications/${ this.name }/` );
  }
  
  getRawApplicationData(): IYourDashApplication {
    return this.application;
  }
}

// Returns an array of strings with the name of each application that exists ( installed or not )
export async function getAllApplications(): Promise<string[]> {
  try {
    return ( await fs.readdir( path.resolve( process.cwd(), "../applications/" ) ) ).filter( app => {
      return ( app !== "package.json" ) && ( app !== "node_modules" );
    } );
  } catch ( _err ) {
    log( LOG_TYPES.ERROR, "A problem occurred reading the ../applications/ directory" );
    return [];
  }
}

export default class YourDashApplication {
  private readonly name: string;
  
  constructor( name: string ) {
    this.name = name;
    return this;
  }
  
  // Returns a YourDashApplication class which is initialized with the application's data
  async read(): Promise<YDApplication | null> {
    try {
      return new YDApplication(
        JSON.parse(
          ( await fs.readFile( path.resolve( process.cwd(), `../applications/${ this.name }/application.json` ) ) ).toString() ||
          "{}" )
      );
    } catch ( _err ) {
      return null;
    }
  }
  
  // Returns true if the application exists in the ./src/apps/ directory
  async exists(): Promise<boolean> {
    try {
      await fs.readFile( path.resolve( process.cwd(), `../applications/${ this.name }/application.json` ) );
      return true;
    } catch ( _err ) {
      return false;
    }
  }
  
  // Return the path to the application
  getPath(): string {
    return path.resolve( process.cwd(), `../applications/${ this.name }/` );
  }
}

type YourDashApplicationServerPlugin = ( {
  exp,
  io,
  pluginFilesystemPath
}: {
  exp: ExpressApplication,
  io: SocketServer,
  pluginFilesystemPath: string
} ) => any;

export { type YourDashApplicationServerPlugin };
