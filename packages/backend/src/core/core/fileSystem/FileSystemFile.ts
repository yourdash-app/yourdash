/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CoreApi from "../coreApi.js";

export default class FileSystemFile {
  private coreApi: CoreApi
  path: string
  
  constructor( coreApi: CoreApi, path: string ) {
    this.coreApi = coreApi
    this.path = path
  }
  
  read() {
  
  
  }
}
