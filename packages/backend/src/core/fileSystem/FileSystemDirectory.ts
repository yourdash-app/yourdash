/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import pth from "path";
import { promises as fs } from "fs"
import { CoreApi } from "../coreApi.js";

export default class FileSystemDirectory {
  private readonly coreApi: CoreApi
  path: string
  
  constructor( coreApi: CoreApi, path: string ) {
    this.coreApi = coreApi
    this.path = path
  }
  
  getName(): string {
    return pth.basename( this.path )
  }
  
  getMetadata() {
    return fs.stat( this.path )
  }
  
  async getChildren(): Promise<string[]> {
    try {
      return await fs.readdir( this.path )
    } catch ( _err ) {
      this.coreApi.log.error( `Unable to read directory: ${ this.path }` )
      
      return []
    }
  }
}
