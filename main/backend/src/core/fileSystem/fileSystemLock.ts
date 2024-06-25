/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "../core.js";
import FileSystemEntity from "./fileSystemEntity.js";

export default class FileSystemLock {
  private lockedEntity: FileSystemEntity;

  constructor(entity: FileSystemEntity) {
    this.lockedEntity = entity;
    return this;
  }

  removeLock() {
    core.fs.__internal__fileSystemLocks.set(
      this.lockedEntity.path,
      this.lockedEntity.getAllLocks().filter((i) => i !== this),
    );

    return true;
  }
}
