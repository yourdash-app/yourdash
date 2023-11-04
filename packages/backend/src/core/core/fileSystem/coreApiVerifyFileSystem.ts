/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import { CoreApi } from "../coreApi.js";
import generateInstanceLogos from "../helpers/generateInstanceLogos.js";
import { YOURDASH_USER_PERMISSIONS } from "../user/permissions.js";
import FileSystemDirectory from "./FileSystemDirectory.js";

export default class CoreApiVerifyFileSystem {
  private readonly coreApi: CoreApi;
  
  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi;
    
    return this;
  }
  
  async verify() {
    await this.checkRootDirectory();
    
    ( await ( await this.coreApi.fs.get(
      path.join( this.coreApi.fs.ROOT_PATH, "./users" )
    ) as FileSystemDirectory )?.getChildren() ).map( ( user: string ) => {
      this.checkUserDirectory( user )
    } )
  }
  
  async checkRootDirectory() {
    // "/"
    if ( !( await this.coreApi.fs.exists( this.coreApi.fs.ROOT_PATH ) ) ) {
      await this.coreApi.fs.createDirectory( this.coreApi.fs.ROOT_PATH )
    }
    // "/users/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, "./users" ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, "./users" ) )
    }
    // "/defaults/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, "./defaults" ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, "./defaults" ) )
    }
    // "/cache/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, "./cache" ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, "./cache" ) )
    }
    // "/config/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, "./config" ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, "./config" ) )
    }
    // "/global_database.json"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, "./global_database.json" ) ) ) ) {
      await this.coreApi.fs.copyFile(
        path.join( process.cwd(), "./defaults/global_database.json" ),
        path.join( this.coreApi.fs.ROOT_PATH, "./global_database.json" )
      )
    }
    
    // set the instance's default user avatar
    try {
      await this.coreApi.fs.copyFile(
        path.join( process.cwd(), "./src/defaults/default_avatar.avif" ),
        path.join( this.coreApi.fs.ROOT_PATH, "./default_avatar.avif" )
      );
    } catch ( e ) {
      this.coreApi.log.error( "Unable to copy the default user avatar" );
      console.trace( e );
    }
    
    // set the instance's default logo
    try {
      await this.coreApi.fs.copyFile(
        path.join( process.cwd(), "./src/defaults/default_instance_logo.avif" ),
        path.join( this.coreApi.fs.ROOT_PATH, "./instance_logo.avif" )
      );
    } catch ( e ) {
      this.coreApi.log.error( "Unable to copy the default instance logo" );
      console.trace( e );
    }
    
    // set the default login background
    try {
      await this.coreApi.fs.copyFile(
        path.join( process.cwd(), "./src/defaults/default_login_background.avif" ),
        path.join( this.coreApi.fs.ROOT_PATH, "./login_background.avif" )
      );
    } catch ( e ) {
      this.coreApi.log.error( "Unable to create the default login background" );
    }
    
    // create the global database
    try {
      this.coreApi.log.info( "The global database file does not exist, creating a new one" );
      
      // write the default global database file
      await this.coreApi.fs.copyFile( path.join( process.cwd(), "./defaults/default_global_database.json" ), path.join( this.coreApi.fs.ROOT_PATH, "./global_database.json" ) );
      
      // load the new global database
      await this.coreApi.globalDb.loadFromDisk( path.join( this.coreApi.fs.ROOT_PATH, "./global_database.json" ) );
    } catch ( e ) {
      this.coreApi.log.error( "Unable to create the \"./fs/global_database.json\" file" );
    }
    
    // create the default instance logos
    try {
      generateInstanceLogos();
    } catch ( e ) {
      this.coreApi.log.error( "Unable to generate logo defaults" );
    }

    // TODO: create the default admin user ( this needs to wait for the new users api )
    
    // if the administrator user doesn't exist,
    // create a new user "admin" with the administrator permission
    const ADMIN_USER = this.coreApi.users.create( "admin" );
    
    if ( !await ADMIN_USER.doesExist() ) {
      await ADMIN_USER.create();
      await ADMIN_USER.setName( {
        first: "Admin",
        last: "istrator"
      } );
      await ADMIN_USER.setPermissions( [ YOURDASH_USER_PERMISSIONS.Administrator ] );
    }
    
    return this
  }
  
  async checkUserDirectory( username: string ) {
    // "/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}` ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}` ) )
    }
    // "/apps/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/apps` ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/apps` ) )
    }
    // "/avatars/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/avatars` ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/avatars` ) )
    }
    // "/core/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/core` ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/core` ) )
    }
    // "/fs/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/fs` ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/fs` ) )
    }
    // "/temp/"
    if ( !( await this.coreApi.fs.exists( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/temp` ) ) ) ) {
      await this.coreApi.fs.createDirectory( path.join( this.coreApi.fs.ROOT_PATH, `./users/${username}/temp` ) )
    }
    
    return this
  }
}
