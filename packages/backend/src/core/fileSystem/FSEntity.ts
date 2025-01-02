/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "../core.js";
import FSLock from "./FSLock.js";

// TODO: fix typescript generics errors
interface FileSystemEntityIsLocked<T extends boolean = boolean> {
  locked: T;
  lockedBy: T extends true ? FSLock[] : undefined;
}

export enum FILESYSTEM_ENTITY_TYPE {
  FILE,
  DIRECTORY,
}

export default class FSEntity {
  path: string;
  entityType: FILESYSTEM_ENTITY_TYPE;

  constructor(path: string) {
    this.path = path;
    this.entityType = FILESYSTEM_ENTITY_TYPE.FILE;

    return this;
  }

  isLocked(): FileSystemEntityIsLocked {
    const lockData = core.fs.__internal__fileSystemLocks.get(this.path);

    return {
      locked: !!lockData,
      lockedBy: lockData,
    };
  }

  isFile(): boolean {
    return this.entityType === FILESYSTEM_ENTITY_TYPE.FILE;
  }

  isDirectory(): boolean {
    return this.entityType === FILESYSTEM_ENTITY_TYPE.DIRECTORY;
  }

  createLock(): FSLock {
    return new FSLock(this);
  }

  // get all locks for this FSEntity
  getAllLocks(): FSLock[] {
    return core.fs.__internal__fileSystemLocks.get(this.path) || [];
  }

  doesExist(): Promise<boolean> {
    return core.fs.doesExist(this.path);
  }
}
