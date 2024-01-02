/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// TODO: fix generics
import FileSystemLock from "./FileSystemLock.js";

interface FileSystemEntityIsLocked<T extends boolean = boolean> {
  locked: T;
  lockedBy: T extends true ? FileSystemLock[] : undefined;
}

export default class FileSystemEntity {
  isLocked: FileSystemEntityIsLocked;

  constructor() {
    return this;
  }

  createLock(): FileSystemLock {
    return new FileSystemLock(this);
  }

  // TODO: implement locking functionality
}
