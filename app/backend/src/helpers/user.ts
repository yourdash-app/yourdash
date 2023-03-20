import FileSystem from "../fileSystem/fileSystem";
import { FILESYSTEM_ROOT } from "../index";

export default class User {
  create(username: string, options: { permissions: YourDashCorePermissions[], name: string }) {
    let fs = new FileSystem()

    fs.createFolder(FILESYSTEM_ROOT, `/users/`, username)
        .write()
  }
  remove(username: string) {
    let fs = new FileSystem()

    fs.openFolder(FILESYSTEM_ROOT, `/users/`, username)
        .delete()
  }
}

export enum YourDashCorePermissions {
  CreateFiles,
  DeleteFiles,
  Administrator,
  ManageUsers,
  UnlimitedQuota,
  UploadFiles
}
