/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "../core.js";
import FSEntity from "./FSEntity.js";

export default class FSLock {
  private lockedEntity: FSEntity;

  constructor(entity: FSEntity) {
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
