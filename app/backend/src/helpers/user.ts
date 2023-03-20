import { FILESYSTEM_ROOT } from "../index.js";
import path from "path";
import Fs from "../fileSystem/fileSystem.js";
import { hash } from "./encryption.js";

const User = {
  create(username: string, password: string, options: { permissions: YourDashCorePermissions[], name: string }) {
    const userFolder = Fs.createFolder( this.getPath( username ) ).write()

    userFolder.createFile( `user.json` ).setContent( JSON.stringify( {
                                                                       name: options.name,
                                                                       username: username,
                                                                       permissions: options.permissions
                                                                     } as YourDashUser ) ).write()

    hash( password ).then( pass => {
      userFolder.createFile( `password.enc` ).setContent( pass ).write()
    } )
  },

  remove(username: string) {
    Fs.openFolder( this.getPath( username ) ).delete()
  },

  getPath(username: string): string {
    return path.join( FILESYSTEM_ROOT, `/users/`, username )
  }
}

export default User

export enum YourDashCorePermissions {
  CreateFiles,
  DeleteFiles,
  Administrator,
  ManageUsers,
  UnlimitedQuota,
  UploadFiles
}

export interface YourDashUser {
  name: string,
  username: string,
  permissions: YourDashCorePermissions[]
}
