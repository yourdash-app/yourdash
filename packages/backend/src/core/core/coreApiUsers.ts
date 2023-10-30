/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashUser from "../user/index.js";
import CoreApi from "./coreApi.js";

export default class CoreApiUsers {
  private coreApi: CoreApi;
  private usersMarkedForDeletion: string[] = [];

  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi
    
    this.coreApi.scheduler.scheduleTask( "core:users:delete_all_marked_users", /* every 5 minutes */ "*/5 * * * *", () => {
    
    } )
    
    return this;
  }

  create( username: string ) {
    return this
  }

  delete( username: string ) {
    this.usersMarkedForDeletion.push( username )
    return this
  }
  
  forceDelete( username: string ) {
    if ( this.usersMarkedForDeletion.includes( username ) ) {
      this.usersMarkedForDeletion.splice( this.usersMarkedForDeletion.indexOf( username ), 1 )
    }
    
    // TODO: DELETE THE USER FROM THE FS
    
    return this
  }

  update() {
    return this
  }

  read() {
    return this
  }
  
  getByUsername( username: string ): YourDashUser {
    return new YourDashUser( username )
  }
}
