/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KVD from "@yourdash/shared/core/database.js";
import core from "../core/core.js";
import FSError from "../core/fileSystem/FSError.js";

export default class KeyValueDatabase extends KVD {
  constructor() {
    super();
  }

  async __internal__doNotUseOnlyIntendedForShutdownSequenceWriteToDisk(path: string, cb?: () => void) {
    try {
      const dbFile = await core.fs.getFile(path);

      if (dbFile instanceof FSError) {
        core.log.error("key_value_database", "could not be found!");
        return false;
      }

      await dbFile.write(JSON.stringify(this.keys));
      if (cb) cb();
    } catch (_err) {
      /* empty */
    }
  }

  async writeToDisk(path: string): Promise<boolean> {
    try {
      if (core.isDevMode) {
        const dbFile = await core.fs.getFile(path);

        if (dbFile instanceof FSError) {
          core.log.error("key_value_database", "could not be found!");
          return false;
        }

        await dbFile.write(JSON.stringify(this.keys, null, 2));
      } else {
        const dbFile = await core.fs.getFile(path);

        if (dbFile instanceof FSError) {
          core.log.error("key_value_database", "could not be found!");
          return false;
        }

        await dbFile.write(JSON.stringify(this.keys));
      }

      return true;
    } catch (_err) {
      return false;
    }
  }

  async readFromDisk(path: string) {
    try {
      const dbFile = await core.fs.getFile(path);

      if (dbFile instanceof FSError) {
        core.log.error("key_value_database", "could not be found!");
        return false;
      }

      const data = await dbFile.read("string");
      this.keys = JSON.parse(data);
      return true;
    } catch (_err) {
      return false;
    }
  }
}
