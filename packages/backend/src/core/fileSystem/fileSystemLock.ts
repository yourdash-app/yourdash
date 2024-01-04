/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "../coreApi.js";
import FileSystemEntity from "./fileSystemEntity.js";

export default class FileSystemLock {
  private lockedEntity: FileSystemEntity;

  constructor(entity: FileSystemEntity) {
    this.lockedEntity = entity;
    return this;
  }

  removeLock() {
    coreApi.fs.__internal__fileSystemLocks.set(
      this.lockedEntity.path,
      this.lockedEntity.getAllLocks().filter((i) => i !== this),
    );

    return true;
  }
}
