import * as fs from "fs";
import * as nodePath from "path";

const Fs = {
  createFile(...path: string[]): FileSystemFile {
    return new FileSystemFile( path )
  },

  createFolder(...path: string[]): FileSystemFolder {
    return new FileSystemFolder( path )
  },

  openFile(...path: string[]): FileSystemFile {
    let contents = fs.readFileSync( nodePath.resolve( nodePath.join( ...path ) ) )

    return new FileSystemFile( path, contents )
  },

  openFolder(...path: string[]): FileSystemFolder {
    return new FileSystemFolder( path )
  },
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

  read(): string {
    return this.content.toString()
  }

  readRaw() {
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

  delete(): null {
    try {
      fs.rmSync( this.path )
    } catch (err) {
      console.error( err )
    }

    return null
  }

  getPath(): string {
    return this.path
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
      fs.cpSync( nodePath.resolve( this.path ), nodePath.join( ...path ), { recursive: true } )
      fs.rmSync( this.path )
      this.path = nodePath.join( ...path )
    } catch (err) {
      console.error( err )
    }

    return this
  }

  delete(): null {
    try {
      fs.rmdirSync( this.path )
    } catch (err) {
      console.error( err )
    }

    return null
  }

  createFile(...path: string[]): FileSystemFile {
    return new FileSystemFile( [ this.path, ...path ] )
  }

  openFile(...path: string[]): FileSystemFile {
    let contents = fs.readFileSync( nodePath.resolve( nodePath.join( this.path, ...path ) ) )

    return new FileSystemFile( [ this.path, ...path ], contents )
  }

  getPath(): string {
    return this.path
  }
}

export default Fs
