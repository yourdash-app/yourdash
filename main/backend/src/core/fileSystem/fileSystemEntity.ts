/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "../core.js";
import FileSystemLock from "./fileSystemLock.js";

// TODO: fix generics
interface FileSystemEntityIsLocked<T extends boolean = boolean> {
  locked: T;
  lockedBy: T extends true ? FileSystemLock[] : undefined;
}

export default class FileSystemEntity {
  path: string;
  entityType: "file" | "directory";

  constructor(path: string) {
    this.path = path;
    return this;
  }

  isLocked(): FileSystemEntityIsLocked {
    const lockData = core.fs.__internal__fileSystemLocks.get(this.path);

    return {
      locked: !!lockData,
      lockedBy: lockData,
    };
  }

  createLock(): FileSystemLock {
    return new FileSystemLock(this);
  }

  getAllLocks(): FileSystemLock[] {
    return core.fs.__internal__fileSystemLocks.get(this.path);
  }

  doesExist(): Promise<boolean> {
    return core.fs.doesExist(this.path);
  }
}
