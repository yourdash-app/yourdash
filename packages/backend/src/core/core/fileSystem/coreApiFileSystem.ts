/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import pth from "path";
import { CoreApi } from "../coreApi.js";
import CoreApiVerifyFileSystem from "./coreApiVerifyFileSystem.js";
import FileSystemDirectory from "./FileSystemDirectory.js";
import FileSystemFile from "./FileSystemFile.js";

export default class CoreApiFileSystem {
  ROOT_PATH: string;
  coreApi: CoreApi;
  readonly verifyFileSystem: CoreApiVerifyFileSystem;
  
  constructor( coreApi: CoreApi ) {
    this.ROOT_PATH = pth.resolve( pth.join( process.cwd(), "./fs/" ) );
    this.coreApi = coreApi;
    this.verifyFileSystem = new CoreApiVerifyFileSystem( this.coreApi )
    
    return this;
  }
  
  async get( path: string ) {
    if ( await this.getType( path ) === "directory" ) {
      return new FileSystemDirectory( this.coreApi, path )
    } else {
      return new FileSystemFile( this.coreApi, path )
    }
  }
  
  async getFile( path: string ) {
    if ( await this.getType( path ) === "file" ) {
      return new FileSystemFile( this.coreApi, path )
    }
    
    return null
  }
  
  async getDirectory( path: string ) {
    if ( await this.getType( path ) === "directory" ) {
      return new FileSystemDirectory( this.coreApi, path )
    }

    return null
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
    return new FileSystemFile( this.coreApi, path )
  }
  
  async createDirectory( path: string ) {
    await fs.mkdir( path, { recursive: true } )
    return new FileSystemDirectory( this.coreApi, path )
  }
  
  async removePath( path: string ) {
    return await fs.rm( path, { recursive: true, maxRetries: 2, retryDelay: 500 } )
  }
  
  async copy( source: string, destination: string ) {
    return await fs.cp( source, destination, { recursive: true, force: true } )
  }
}
