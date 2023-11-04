/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import pth from "path";
import { CoreApi } from "../coreApi.js";

export default class FileSystemFile {
  path: string
  private readonly coreApi: CoreApi
  
  constructor( coreApi: CoreApi, path: string ) {
    this.path = path
    this.coreApi = coreApi
    
    return this
  }
  
  getName(): string {
    return pth.basename( this.path )
  }
  
  getExtension(): string {
    return pth.extname( this.path )
  }
  
  getThumbnail( dimensions: { x: number, y: number } ): string {
    switch ( this.getExtension() ) {
    // TODO: create a wrapper around "new Sharp()"
    //       This can then be part of the new CoreApi and can be used for thumbnail generation
    default:
      return "not implemented"
    }
  }
  
  getMetadata() {
    return fs.stat( this.path )
  }
  
  async read( as: "string" | "buffer" | "json" ) {
    switch ( as ) {
    case "string":
      return ( await fs.readFile( this.path ) ).toString()
    case "buffer":
      return await fs.readFile( this.path )
    case "json":
      return JSON.parse( ( await fs.readFile( this.path ) ).toString() )
    default:
      throw new Error( `Unsupported read type: ${ as }` )
    }
  }
  
  async write( data: string | Buffer ) {
    await fs.writeFile( this.path, data )
  
    return
  }
}
