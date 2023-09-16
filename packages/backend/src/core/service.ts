/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export enum YOURDASH_SERVICE_STARTUP_TYPE {
  STARTUP,
  MANUAL,
  SHUT_DOWN,
  POST_STARTUP,
  DATE_TIME
}

export default class YourDashService {
  name: string;
  displayName: string;
  description: string;
  startupType: YOURDASH_SERVICE_STARTUP_TYPE;
  
  constructor( configuration: {name: string, displayName: string, description: string} ) {
    this.name = configuration.name;
    this.displayName = configuration.displayName;
    this.description = configuration.description;
  }
  
  
}