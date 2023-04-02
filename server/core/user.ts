import * as fs from "fs";
import path from "path";

export interface IYourDashUser {
  username: string,
  fullName: { first: string, middle: string, last: string },
  permissions: YourDashUserPermissions[]
}

export enum YourDashUserPermissions {
  Administrator,
  CreateFiles,
  DeleteFiles
}

export default class YourDashUser {
  username: string;
  user: IYourDashUser
  
  constructor(username: string) {
    this.username = username
    
    if (!this.exists()) return
    
    this.read()
    return this
  }
  
  getPath(): string {
    return path.resolve( process.cwd(), `./fs/users/${ this.username }/` )
  }
  
  getName(): { first: string, middle: string, last: string } {
    return this.user.fullName
  }
  
  exists(): boolean {
    return fs.existsSync( this.getPath() )
  }
  
  write() {
    if (!fs.existsSync( this.getPath() )) fs.mkdirSync( this.getPath(), { recursive: true } )
    
    try {
      fs.writeFileSync( path.join( this.getPath(), `user.json` ), JSON.stringify( this.user ) )
    } catch (err) {
      console.error( `Error writing user to disk!`, err )
    }
  }
  
  read(): this {
    try {
      this.user = JSON.parse( fs.readFileSync( path.join( this.getPath(), `user.json` ) ).toString() )
    } catch (err) {
      console.error( `Error reading user from disk!`, err )
    }
    return this
  }
  
  hasPermission(perm: YourDashUserPermissions): boolean {
    return this.user.permissions.indexOf( perm ) !== -1;
  }
  
  addPermission(perm: YourDashUserPermissions): this {
    this.user.permissions.push( perm )
    
    return this
  }
}
