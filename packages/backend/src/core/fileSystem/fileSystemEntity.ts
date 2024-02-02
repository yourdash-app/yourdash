/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "../coreApi.js";
import FileSystemLock from "./fileSystemLock.js";

// TODO: fix generics
interface FileSystemEntityIsLocked<T extends boolean = boolean> {
  locked: T;
  lockedBy: T extends true ? FileSystemLock[] : undefined;
}

export default class FileSystemEntity {
  path: string;

  constructor(path: string) {
    this.path = path;
    return this;
  }

  isLocked(): FileSystemEntityIsLocked {
    const lockData = coreApi.fs.__internal__fileSystemLocks.get(this.path);

    return {
      locked: !!lockData,
      lockedBy: lockData,
    };
  }

  createLock(): FileSystemLock {
    return new FileSystemLock(this);
  }

  getAllLocks(): FileSystemLock[] {
    return coreApi.fs.__internal__fileSystemLocks.get(this.path);
  }

  exists(): Promise<boolean> {
    return coreApi.fs.exists(this.path);
  }
}
