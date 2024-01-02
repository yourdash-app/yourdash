/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// TODO: fix generics
interface FileSystemEntityIsLocked<T extends boolean = boolean> {
  locked: T;
  reason: T extends true ? string : undefined;
  lockedBy: T extends true ? string : undefined;
}

export default class FileSystemEntity {
  isLocked: FileSystemEntityIsLocked;

  constructor() {
    return this;
  }

  // TODO: implement locking functionality
}
