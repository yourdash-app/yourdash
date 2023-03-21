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
