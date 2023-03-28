export enum YourDashCorePermissions {
  CreateFiles,
  DeleteFiles,
  Administrator,
  ManageUsers,
  UnlimitedQuota,
  UploadFiles
}

export interface YourDashUser {
  name: { first: string, last: string },
  username: string,
  permissions: YourDashCorePermissions[]
}
