/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
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

import chalk from "chalk";
import { promises as fs } from "fs";
import path from "path";
import { type IYourDashSession } from "shared/core/session.js";
import sharp from "sharp";
import { hash } from "../../helpers/encryption.js";
import GLOBAL_DB from "../../helpers/globalDatabase.js";
import log, { LOG_TYPES } from "../../helpers/log.js";
import YourDashSession, { getSessionsForUser } from "../../helpers/session.js";
import getUserDatabase from "../../helpers/userDatabase.js";
import { FS_DIRECTORY_PATH } from "../../main.js";
import { YourDashCoreUserPermissions, YourDashUserPermission } from "./permissions.js";

export interface IYourDashUser {
  username: string;
  fullName: {
    first: string;
    last: string
  };
  permissions: YourDashUserPermission[];
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
  
  async setPassword( password: string ): Promise<this> {
    try {
      const hashedPassword = await hash( password )
      await fs.writeFile( path.resolve( this.getPath(), "./password.txt" ), hashedPassword );
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
    sharp( ( await fs.readFile( path.resolve( this.getPath(), "avatar.avif" ) ) ) )
      .resize( 32, 32 )
      .toFile( path.resolve( this.getPath(), "small_avatar.avif" ) )
      .catch( err => console.error( err ) );
    sharp( ( await fs.readFile( path.resolve( this.getPath(), "avatar.avif" ) ) ) )
      .resize( 64, 64 )
      .toFile( path.resolve( this.getPath(), "medium_avatar.avif" ) )
      .catch( err => console.error( err ) );
    sharp( ( await fs.readFile( path.resolve( this.getPath(), "avatar.avif" ) ) ) )
      .resize( 128, 128 )
      .toFile( path.resolve( this.getPath(), "large_avatar.avif" ) )
      .catch( err => console.error( err ) );
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
  
  async write(): Promise<void> {
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
      await fs.writeFile( path.resolve( this.getPath(), "./user_db.json" ), JSON.stringify( {
        "core:user:userFullName": this.user.fullName,
        "core:user:username": this.user.username
      } ) );
    }
    
    try {
      await fs.writeFile( path.join( this.getPath(), "user.json" ), JSON.stringify( this.user ) );
      const db = await this.getPersonalDatabase()
      await db.writeToDisk( path.resolve( this.getPath(), "./user_db.json" ) );
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
  
  getPermissions(): YourDashUserPermission[] {
    return this.user.permissions;
  }
  
  hasPermission( perm: YourDashCoreUserPermissions ): boolean {
    return this.user.permissions.indexOf( perm ) !== -1;
  }
  
  addPermission( perm: YourDashCoreUserPermissions ): this {
    this.user.permissions.push( perm );
    
    return this;
  }
  
  setPermissions( permissions: YourDashCoreUserPermissions[] ): this {
    this.user.permissions = permissions;
    
    return this;
  }
  
  async setName( name: {
    first: string;
    last: string
  } ): Promise<this> {
    this.user.fullName = name;
    const db = await this.getPersonalDatabase()
    db.set( "core:user:userFullName", name );
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
      log( LOG_TYPES.WARNING, `${ chalk.yellow.bold( "CORE" ) }: unable to find session: ${ sessionId }` );
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
    return path.join( FS_DIRECTORY_PATH, `./users/${ this.username }/` );
  }
  
  getAppDataPath(): string {
    return path.join( this.getPath(), "./app_data/" );
  }
  
  async exists(): Promise<boolean> {
    try {
      await fs.access( this.getPath() )
      return true
    } catch ( _err ) {
      return false
    }
  }
  
  async create(
    password: string,
    name: {
      first: string,
      last: string
    },
    permissions: YourDashCoreUserPermissions[]
  ) {
    const user = new YourDashUser( this.username )
    
    await fs.mkdir( this.getPath(), { recursive: true } );
    
    await fs.cp(
      path.resolve( path.join( process.cwd(), "./src/assets/default_avatar.avif" ) ),
      path.resolve( path.join( user.getPath(), "./avatar.avif" ) )
    )
    
    user.verifyUserConfig()
    await user.setName( name )
    await user.setPassword( password )
    user.setPermissions( permissions )
    await user.write();
    await user.generateAvatars()
    
    return user
  }
  
  async read(): Promise<YourDashUser> {
    return await new YourDashUser( this.username ).read();
  }
}
