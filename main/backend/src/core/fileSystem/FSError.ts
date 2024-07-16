/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export enum FS_ERROR_TYPE {
  LOCKED,
  DOES_NOT_EXIST,
  NOT_A_FILE,
  NOT_A_DIRECTORY,
  ALREADY_EXISTS,
  NO_REASON_PROVIDED,
}

export default class FSError {
  reason: FS_ERROR_TYPE;

  constructor(reason: FS_ERROR_TYPE) {
    this.reason = reason;

    return this;
  }

  getReasonString() {
    switch (this.reason) {
      case FS_ERROR_TYPE.NOT_A_FILE:
        return "The requested file was not a file";
      case FS_ERROR_TYPE.ALREADY_EXISTS:
        return "The requested path already exists";
      case FS_ERROR_TYPE.DOES_NOT_EXIST:
        return "The requested path does not exist";
      case FS_ERROR_TYPE.NOT_A_DIRECTORY:
        return "The requested path is not a directory";
      case FS_ERROR_TYPE.LOCKED:
        return "The requested path is locked";
      default:
        return "Unknown FileSystem Error";
    }
  }
}