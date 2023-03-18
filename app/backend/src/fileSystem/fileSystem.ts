import * as fs from "fs";
import * as nodePath from "path";

export default class FileSystem {
  constructor() {
    return this
  }

  createFile(...path: string[]): FileSystemFile {
    return new FileSystemFile( path )
  }

  createFolder(...path: string[]): FileSystemFolder {
    return new FileSystemFolder( path )
  }

  openFile(...path: string[]): FileSystemFile {
    let contents = fs.readFileSync( nodePath.resolve( nodePath.join( ...path ) ) )

    return new FileSystemFile( path, contents )
  }

  openFolder(...path: string[]): FileSystemFolder {
    return new FileSystemFolder( path )
  }
}

class FileSystemFile {
  private path: string;
  private content: string | NodeJS.ArrayBufferView;

  constructor(path: string[], content?: string | NodeJS.ArrayBufferView) {
    this.path = nodePath.join( ...path )
    this.content = content || ""
  }

  write() {
    try {
      fs.writeFileSync( nodePath.resolve( this.path ), this.content )
    } catch (err) {
      console.error( err )
    }

    return this
  }

  read() {
    return this.content
  }

  setContent(content: string | NodeJS.ArrayBufferView): this {
    this.content = content
    return this
  }

  move(path: string[]): this {
    try {
      try {
        fs.rmSync( this.path )
      } catch (err) {
        return this
      }
      this.path = nodePath.join( ...path )
      fs.writeFileSync( nodePath.resolve( this.path ), this.content )
    } catch (err) {
      console.error( err )
    }

    return this
  }
}

class FileSystemFolder {
  private path: string;

  constructor(path: string[]) {
    this.path = nodePath.join( ...path )
  }

  write() {
    try {
      fs.mkdirSync( nodePath.resolve( this.path ), { recursive: true } )
    } catch (err) {
      console.error( err )
    }

    return this
  }

  read() {
    try {
      return fs.readdirSync( nodePath.resolve( this.path ) )
    } catch (err) {
      console.error( err )
    }

    return null
  }

  move(path: string[]): this {
    try {
      fs.cpSync( nodePath.resolve( this.path ), path.join( ...path ), { recursive: true } )
      fs.rmSync( this.path )
    } catch (err) {
      console.error( err )
    }

    return this
  }
}
