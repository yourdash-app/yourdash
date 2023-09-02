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
import sharp from "sharp";
import chalk from "chalk";
import { type IYourDashSession } from "shared/core/session.js";
import log, { logTypes } from "./log.js";
import { hash } from "./encryption.js";
import YourDashSession, { getSessionsForUser } from "./session.js";
import getUserDatabase from "./userDatabase.js";
import GLOBAL_DB from "./globalDatabase.js";

export enum YourDashUserPermissions {
  Administrator, CreateFiles, DeleteFiles,
}

export interface IYourDashUser {
  username: string;
  fullName: {
    first: string;
    last: string
  };
  permissions: YourDashUserPermissions[];
  contacts: string[]; // an array of user's usernames
}

class YourDashUser {
  username: string;
  user: IYourDashUser;
  
  constructor( username: string ) {
    this.username = username;
    
    if ( !this.exists() ) {
      return;
    }
  }
  
  setPassword( password: string ): this {
    try {
      hash( password ).then( async result => {
        await fs.writeFile( path.resolve( this.getPath(), "./password.txt" ), result );
      } );
    } catch ( _err ) {
      console.error( `unable to set password for user: ${ this.username }` );
    }
    
    return this;
  }
  
  verifyUserConfig(): this {
    // checks all properties of this.user to make sure that they match IYourDashUser
    if ( !this.user ) {
      // @ts-ignore
      this.user = {};
    }
    if ( !this.user.fullName ) {
      this.user.fullName = {
        first: "New",
        last: "User"
      };
    }
    if ( !this.user.permissions ) {
      this.user.permissions = [];
    }
    if ( !this.user.contacts ) {
      this.user.contacts = [];
    }
    
    return this;
  }
  
  async generateAvatars(): Promise<this> {
    sharp( ( await fs.readFile( path.resolve( this.getPath(), "default_avatar.avif" ) ) ) ).resize( 32, 32 ).toFile( path.resolve(
      this.getPath(),
      "micro_avatar.avif"
    ) ).catch( err => console.error( err ) );
    return this;
  }
  
  getPath(): string {
    return path.resolve( process.cwd(), `./fs/users/${ this.username }/` );
  }
  
  getAppDataPath(): string {
    return path.resolve( this.getPath(), "./app_data/" );
  }
  
  getName(): {
    first: string;
    last: string
    } {
    return this.user.fullName;
  }
  
  async exists(): Promise<boolean> {
    return new Promise<boolean>( resolve => {
      fs.access( this.getPath() ).then( () => {
        resolve( true );
      } ).catch( () => {
        resolve( false );
      } );
    } );
  }
  
  async write() {
    if ( !( await this.exists() ) ) {
      await fs.mkdir( this.getPath(), { recursive: true } );
      await fs.cp(
        path.resolve( process.cwd(), "./src/assets/default_avatar.avif" ),
        path.resolve( this.getPath(), "avatar.avif" )
      );
      hash( "password" ).then( async response => {
        await fs.writeFile( path.resolve( this.getPath(), "./password.txt" ), response );
      } );
      await fs.writeFile( path.resolve( this.getPath(), "./quick-shortcuts.json" ), JSON.stringify( GLOBAL_DB.get( "defaults:user:quickShortcuts" ) ) );
      await fs.mkdir( this.getAppDataPath() );
      await fs.mkdir( path.resolve( this.getPath(), "./fs/" ) );
      await fs.writeFile( path.resolve( this.getPath(), "./user_db.json" ), "{}" );
    }
    
    try {
      await fs.writeFile( path.join( this.getPath(), "user.json" ), JSON.stringify( this.user ) );
    } catch ( err ) {
      console.error( "Error writing user to disk!", err );
    }
  }
  
  async read(): Promise<this> {
    try {
      this.user = await JSON.parse( (
        await fs.readFile( path.join( this.getPath(), "user.json" ) )
      ).toString() || "{}" );
    } catch ( _err ) {
      console.error( `Error reading user "${ this.username }" from disk!` );
    }
    return this;
  }
  
  getPermissions(): YourDashUserPermissions[] {
    return this.user.permissions;
  }
  
  hasPermission( perm: YourDashUserPermissions ): boolean {
    return this.user.permissions.indexOf( perm ) !== -1;
  }
  
  addPermission( perm: YourDashUserPermissions ): this {
    this.user.permissions.push( perm );
    
    return this;
  }
  
  setPermissions( permissions: YourDashUserPermissions[] ): this {
    this.user.permissions = permissions;
    
    return this;
  }
  
  setName( name: {
    first: string;
    last: string
  } ): this {
    this.user.fullName = name;
    return this;
  }
  
  async getSessions(): Promise<IYourDashSession<any>[]> {
    return JSON.parse( ( await fs.readFile( path.resolve( this.getPath(), "sessions.json" ) ) ).toString() );
  }
  
  getSession( sessionId: number ): YourDashSession<any> | undefined {
    try {
      // return a YourDashSession which has the sessionId as its id, find the correct session and use it as an input
      return new YourDashSession(
        this.username,
        getSessionsForUser( this.username )[getSessionsForUser( this.username ).findIndex( val => val.id === sessionId )]
      );
    } catch ( _err ) {
      log( logTypes.warn, `${ chalk.yellow.bold( "CORE" ) }: unable to find session: ${ sessionId }` );
      return undefined;
    }
  }
  
  async getPersonalDatabase() {
    return await getUserDatabase( this.username );
  }
}

export default class YourDashUnreadUser {
  username: string;
  
  constructor( username: string ) {
    this.username = username;
  }
  
  getPath(): string {
    return path.resolve( process.cwd(), `./fs/users/${ this.username }/` );
  }
  
  getAppDataPath(): string {
    return path.resolve( this.getPath(), "./app_data/" );
  }
  
  async exists(): Promise<boolean> {
    return new Promise<boolean>( resolve => {
      fs.access( this.getPath() ).then( () => {
        resolve( true );
      } ).catch( () => {
        resolve( false );
      } );
    } );
  }
  
  async create(
    password: string,
    name: {
      first: string,
      last: string
    },
    permissions: YourDashUserPermissions[]
  ) {
    return new YourDashUser( this.username ).verifyUserConfig().setPassword( password ).setName( name ).setPermissions( permissions ).write();
  }
  
  async read() {
    return await new YourDashUser( this.username ).read();
  }
}
