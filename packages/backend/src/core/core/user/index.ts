/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";
import { promises as fs } from "fs";
import path from "path";
import KeyValueDatabase from "shared/core/database.js";
import sharp from "sharp";
import { hash } from "../../../helpers/encryption.js";
import GlobalDatabase from "../../../helpers/globalDatabase.js";
import YourDashSession, { getSessionsForUser } from "../../../helpers/session.js";
import coreApi from "../coreApi.js";
import { userAvatarSize } from "./avatarSize.js";
import { yourDashUserPermission } from "./permissions.js";
import IYourDashUserJson from "./userJson.js";

export default class YourDashUser {
  username: string;
  path: string;
  
  constructor( username: string ) {
    this.username = username;
    this.path = path.resolve( path.join( coreApi.fs.ROOT_PATH, `users/${ this.username }` ) );
  }
  
  // ==========================================================
  
  async saveUserDatabaseInstantly() {
    await coreApi.users.__internal__saveUserDatabaseInstantly( this.username )
    
    return this
  }
  
  async getUserDatabase( username: string ): Promise<KeyValueDatabase> {
    return coreApi.users.__internal__getUserDatabase( username )
  }

  addUserDatabaseToSaveQueue( username: string ) {
    coreApi.users.__internal__addUserDatabaseToSaveQueue( username )
    return this
  }
  
  // ==========================================================
  
  getAvatar( size: userAvatarSize ): string {
    switch ( size ) {
    case userAvatarSize.LARGE:
      return path.join( this.path, "avatars/large.avif" );
    case userAvatarSize.MEDIUM:
      return path.join( this.path, "avatars/medium.avif" );
    case userAvatarSize.SMALL:
      return path.join( this.path, "avatars/small.avif" );
    case userAvatarSize.ORIGINAL:
      return path.join( this.path, "avatars/original.avif" );
    }
  }
  
  async setAvatar( filePath: string ) {
    await fs.cp( path.resolve( filePath ), path.join( this.path, "avatars/original.avif" ) );
    const newAvatarFile = await fs.readFile( path.resolve( filePath ) );
    
    sharp( newAvatarFile )
      .resize( 32, 32 )
      .toFile( path.join( this.path, "avatars/small.avif" ) )
      .catch( err => console.error( err ) );
    sharp( newAvatarFile )
      .resize( 64, 64 )
      .toFile( path.join( this.path, "avatars/medium.avif" ) )
      .catch( err => console.error( err ) );
    sharp( newAvatarFile )
      .resize( 128, 128 )
      .toFile( path.join( this.path, "avatars/large.avif" ) )
      .catch( err => console.error( err ) );
  }
  
  async create() {
    await fs.mkdir( this.path );
    await fs.mkdir( path.join( this.path, "avatars" ) );
    await fs.mkdir( path.join( this.path, "core" ) );
    await fs.mkdir( path.join( this.path, "fs" ) );
    await fs.mkdir( path.join( this.path, "apps" ) );
    await fs.mkdir( path.join( this.path, "temp" ) );
    await fs.writeFile(
      path.join( this.path, "core/user_db.json" ),
      JSON.stringify( {
        "core:user:name": {
          first: "New",
          last: "User"
        },
        "core:user:username": this.username,
        "core:panel:quickShortcuts": GlobalDatabase.get( "defaults" ).user.quickShortcuts
      } )
    )
    await this.setPassword( "password" );
    await this.setAvatar( path.join( process.cwd(), "./src/defaults/default_avatar.avif" ) );
    await fs.writeFile( path.join( this.path, "core/user.json" ), JSON.stringify( {
      username: this.username,
      name: {
        first: "New",
        last: "User"
      },
      bio: "👋 I'm new to YourDash, say hi!",
      permissions: [],
      version: 1
    } as IYourDashUserJson ) )
    coreApi.log.info( `CORE: Created user ${this.username}` )
  }
  
  async setName( { first, last }: { first: string, last: string } ) {
    try {
      const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
      currentUserJson.name = { first, last }
      const db = await this.getDatabase()
      db.set( "core:user:name", { first, last } )
      await coreApi.users.__internal__saveUserDatabaseInstantly( this.username ) // force the database to update instantly as it does not normally instantly update, so it can save the instance's performance
      await fs.writeFile( path.join( this.path, "core/user.json" ), JSON.stringify( currentUserJson ) )
    } catch( err ) {
      coreApi.log.error( `Unable to write / read ${this.username}'s core/user.json` )
    }
  }
  
  async getName() {
    try {
      const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
      return currentUserJson.name
    } catch( err ) {
      coreApi.log.error( `Unable to read ${this.username}'s core/user.json` )
    }
  }
  
  async setBio( bio: string ) {
    try {
      const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
      currentUserJson.bio = bio
      await fs.writeFile( path.join( this.path, "core/user.json" ), JSON.stringify( currentUserJson ) )
    } catch( err ) {
      coreApi.log.error( `Unable to write / read ${this.username}'s core/user.json` )
    }
  }
  
  async getBio() {
    try {
      const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
      return currentUserJson.bio
    } catch( err ) {
      coreApi.log.error( `Unable to read ${this.username}'s core/user.json` )
    }
  }
  
  async setUrl( url: string ) {
    try {
      const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
      currentUserJson.url = url
      await fs.writeFile( path.join( this.path, "core/user.json" ), JSON.stringify( currentUserJson ) )
    } catch( err ) {
      coreApi.log.error( `Unable to write / read ${this.username}'s core/user.json` )
    }
  }
  
  async getUrl() {
    try {
      const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
      return currentUserJson.url
    } catch( err ) {
      coreApi.log.error( `Unable to read ${this.username}'s core/user.json` )
    }
  }
  
  async setPermissions( permissions: yourDashUserPermission[] ) {
    try {
      const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
      currentUserJson.permissions = permissions
      await fs.writeFile( path.join( this.path, "core/user.json" ), JSON.stringify( currentUserJson ) )
    } catch( err ) {
      coreApi.log.error( `Unable to write / read ${this.username}'s core/user.json` )
    }
  }
  
  async getPermissions() {
    try {
      const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
      return currentUserJson.permissions
    } catch( err ) {
      coreApi.log.error( `Unable to read ${this.username}'s core/user.json` )
    }
  }
  
  async hasPermission( permission: yourDashUserPermission ): Promise<boolean> {
    try {
      const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
      return currentUserJson.permissions.indexOf( permission ) !== -1
    } catch( err ) {
      coreApi.log.error( `Unable to read ${this.username}'s core/user.json` )
      return false
    }
  }
  
  async doesExist(): Promise<boolean> {
    try {
      await fs.access( this.path );
      return true;
    } catch ( _err ) {
      return false;
    }
  }
  
  async setPassword( password: string ) {
    const hashedPassword = await hash( password );
    
    try {
      await fs.writeFile( path.join( this.path, "./core/password.enc" ), hashedPassword );
    } catch ( e ) {
      coreApi.log.error( `unable to create a new password for user ${ this.username }` );
    }
  }
  
  getLoginSession( sessionId: number ): YourDashSession<any> | undefined {
    try {
      // return a YourDashSession which has the sessionId as its id, find the correct session and use it as an input
      return new YourDashSession(
        this.username,
        getSessionsForUser( this.username )[ getSessionsForUser( this.username ).findIndex( val => val.id === sessionId ) ]
      );
    } catch ( _err ) {
      coreApi.log.error( `${ chalk.yellow.bold( "CORE" ) }: unable to find session: ${ sessionId }` );
      return undefined;
    }
  }
  
  async getAllLoginSessions() {
    return JSON.parse( ( await fs.readFile( path.resolve( this.path, "core/sessions.json" ) ) ).toString() );
  }
  
  async getDatabase() {
    return await coreApi.users.__internal__getUserDatabase( this.username );
  }
  
  saveDatabase() {
    coreApi.users.__internal__addUserDatabaseToSaveQueue( this.username );
  }
  
  getAppDirectory( applicationName: string ): string {
    return path.join( this.path, `apps/${ applicationName }/` );
  }
  
  async update() {
    const currentUserJson = JSON.parse( ( await fs.readFile( path.join( this.path, "core/user.json" ) ) ).toString() ) as IYourDashUserJson
    
    // noinspection FallThroughInSwitchStatementJS
    switch ( currentUserJson.version ) {
    case undefined:
      currentUserJson.version = 1
    case 1:
      // add code to update from version 1 to 2 when version 2 is implemented
    default:
      return
    }
  }
}
