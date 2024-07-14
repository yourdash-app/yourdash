/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export enum FILESYSTEM_ERROR {
  LOCKED,
  DOES_NOT_EXIST,
  NOT_A_FILE,
  NOT_A_DIRECTORY,
  ALREADY_EXISTS,
}

export default class FileSystemError {
  reason: FILESYSTEM_ERROR;

  constructor(reason: FILESYSTEM_ERROR) {
    this.reason = reason;

    return this;
  }

  toString() {
    switch (this.reason) {
      default:
        return "Unknown FileSystem Error";
    }
  }
}
