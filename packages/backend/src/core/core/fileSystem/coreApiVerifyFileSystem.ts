/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import { YOURDASH_USER_PERMISSIONS } from "../../user/permissions.js";
import coreApi from "../coreApi.js";
import generateInstanceLogos from "../helpers/generateInstanceLogos.js";
import FileSystemDirectory from "./FileSystemDirectory.js";

export default class CoreApiVerifyFileSystem {
  constructor() {
    return this;
  }
  
  async verify() {
    await checkRootDirectory();
    
    ( await ( await coreApi.fs.get(
      path.join( coreApi.fs.ROOT_PATH, "./users" )
    ) as FileSystemDirectory )?.getChildren() ).map( ( user: string ) => {
      checkUserDirectory( user )
    } )
  }
  
  async checkRootDirectory() {
    // "/"
    if ( !( await coreApi.fs.exists( coreApi.fs.ROOT_PATH ) ) ) {
      await coreApi.fs.createDirectory( coreApi.fs.ROOT_PATH )
    }
    // "/users/"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, "./users" ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, "./users" ) )
    }
    // "/defaults/"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, "./defaults" ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, "./defaults" ) )
    }
    // "/cache/"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, "./cache" ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, "./cache" ) )
    }
    // "/config/"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, "./config" ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, "./config" ) )
    }
    // "/global_database.json"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, "./global_database.json" ) ) ) ) {
      await coreApi.fs.copyFile(
        path.join( process.cwd(), "./defaults/global_database.json" ),
        path.join( coreApi.fs.ROOT_PATH, "./global_database.json" )
      )
    }
    
    // set the instance's default user avatar
    try {
      await coreApi.fs.copyFile(
        path.join( process.cwd(), "./src/defaults/default_avatar.avif" ),
        path.join( coreApi.fs.ROOT_PATH, "./default_avatar.avif" )
      );
    } catch ( e ) {
      coreApi.log.error( "Unable to copy the default user avatar" );
      console.trace( e );
    }
    
    // set the instance's default logo
    try {
      await coreApi.fs.copyFile(
        path.join( process.cwd(), "./src/defaults/default_instance_logo.avif" ),
        path.join( coreApi.fs.ROOT_PATH, "./instance_logo.avif" )
      );
    } catch ( e ) {
      coreApi.log.error( "Unable to copy the default instance logo" );
      console.trace( e );
    }
    
    // set the default login background
    try {
      await coreApi.fs.copyFile(
        path.join( process.cwd(), "./src/defaults/default_login_background.avif" ),
        path.join( coreApi.fs.ROOT_PATH, "./login_background.avif" )
      );
    } catch ( e ) {
      coreApi.log.error( "Unable to create the default login background" );
    }
    
    // create the global database
    try {
      coreApi.log.info( "The global database file does not exist, creating a new one" );
      
      // write the default global database file
      await coreApi.fs.copyFile( path.join( process.cwd(), "./defaults/default_global_database.json" ), path.join( coreApi.fs.ROOT_PATH, "./global_database.json" ) );
      
      // load the new global database
      await coreApi.globalDb.loadFromDisk( path.join( coreApi.fs.ROOT_PATH, "./global_database.json" ) );
    } catch ( e ) {
      coreApi.log.error( "Unable to create the \"./fs/global_database.json\" file" );
    }
    
    // create the default instance logos
    try {
      generateInstanceLogos();
    } catch ( e ) {
      coreApi.log.error( "Unable to generate logo defaults" );
    }

    // TODO: create the default admin user ( this needs to wait for the new users api )
    
    // if the administrator user doesn't exist,
    // create a new user "admin" with the administrator permission
    const ADMIN_USER = new YourDashUser( "admin" );
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
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, `./users/${username}` ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, `./users/${username}` ) )
    }
    // "/apps/"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/apps` ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/apps` ) )
    }
    // "/avatars/"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/avatars` ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/avatars` ) )
    }
    // "/core/"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/core` ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/core` ) )
    }
    // "/fs/"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/fs` ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/fs` ) )
    }
    // "/temp/"
    if ( !( await coreApi.fs.exists( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/temp` ) ) ) ) {
      await coreApi.fs.createDirectory( path.join( coreApi.fs.ROOT_PATH, `./users/${username}/temp` ) )
    }
    
    return this
  }
}
