/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { promises as fs } from "fs";
import path from "path";
import { Application as ExpressApplication } from "express";
import { Server as SocketServer } from "socket.io";
import { type IYourDashApplication } from "shared/core/application.js";
import log, { logTypes } from "./log.js";
import globalDatabase from "./globalDatabase.js";

class YourDashApplication {
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
    return ( await fs.readdir( path.resolve( process.cwd(), "../applications/" ) ) ).filter( app => app !== "package.json" );
  } catch ( _err ) {
    log( logTypes.error, "A problem occurred reading the ../applications/ directory" );
    return [];
  }
}

export default class YourDashUnreadApplication {
  private readonly name: string;
  
  constructor( name: string ) {
    this.name = name;
    return this;
  }
  
  // Returns a YourDashApplication class which is initialized with the application's data
  async read(): Promise<YourDashApplication | null> {
    try {
      return new YourDashApplication(
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
