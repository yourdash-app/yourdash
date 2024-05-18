/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KVD from "@yourdash/shared/core/database.js";
import core from "../core/core.js";

export default class KeyValueDatabase extends KVD {
  constructor() {
    super();
  }

  async __internal__doNotUseOnlyIntendedForShutdownSequenceWriteToDisk(path: string, cb?: () => void) {
    try {
      await (await core.fs.getFile(path)).write(JSON.stringify(this.keys));
      if (cb) cb();
    } catch (_err) {
      /* empty */
    }
  }

  async writeToDisk(path: string): Promise<boolean> {
    try {
      await (await core.fs.getFile(path)).write(JSON.stringify(this.keys));
      return true;
    } catch (_err) {
      return false;
    }
  }

  async readFromDisk(path: string) {
    try {
      const data = await (await core.fs.getFile(path)).read("string");
      console.log("DB", data);
      this.keys = JSON.parse(data);
      return true;
    } catch (_err) {
      return false;
    }
  }
}
