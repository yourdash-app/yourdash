/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import FileSystemEntity from "./FileSystemEntity.js";

export default class FileSystemLock {
  private lockedEntity: FileSystemEntity;

  constructor(entity: FileSystemEntity) {
    this.lockedEntity = entity;
    return this;
  }

  removeLock() {
    this.lockedEntity.isLocked.lockedBy =
      this.lockedEntity.isLocked.lockedBy.filter((i) => i !== this);

    return true;
  }
}
