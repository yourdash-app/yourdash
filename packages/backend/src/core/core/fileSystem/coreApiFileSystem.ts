/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import pth from "path";
import coreApi from "../coreApi.js";
import CoreApi from "../coreApi.js";
import CoreApiVerifyFileSystem from "./coreApiVerifyFileSystem.js";
import FileSystemDirectory from "./FileSystemDirectory.js";
import FileSystemFile from "./FileSystemFile.js";

export default class CoreApiFileSystem {
  ROOT_PATH: string;
  
  constructor() {
    this.ROOT_PATH = pth.resolve( pth.join( process.cwd(), "./fs/" ) );
    
    return this;
  }
  
  async verifyFileSystem() {
    const vfs = new CoreApiVerifyFileSystem()
    await vfs.verify()
  }
  
  async get( path: string ) {
    if ( await this.getType( path ) === "directory" ) {
      return new FileSystemDirectory( coreApi, path )
    } else {
      return new FileSystemFile( coreApi, path )
    }
  }
  
  async getType( path: string ): Promise<"file" | "directory"> {
    return ( await fs.lstat( path ) ).isDirectory()
      ? "directory"
      : "file"
  }
  
  async exists( path: string ): Promise<boolean> {
    try {
      await fs.access( path )
      return true
    } catch ( _err ) {
      return false
    }
  }
  
  createFile( path: string ) {
    return new FileSystemFile( coreApi, path )
  }
  
  async createDirectory( path: string ) {
    await fs.mkdir( path, { recursive: true } )
    return new FileSystemDirectory( coreApi, path )
  }
  
  async removePath( path: string ) {
    return await fs.rm( path, { recursive: true, maxRetries: 2, retryDelay: 500 } )
  }
  
  async copyFile( source: string, destination: string ) {
    return await fs.copyFile( source, destination )
  }
  
  async copyDirectory( source: string, destination: string ) {
    return await fs.cp( source, destination, { recursive: true } )
  }
}
