/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import KeyValueDatabase from "../lib/keyValueDatabase.js";
import { Core } from "./core.js";

// TODO: rewrite this to use a KVD ( Key Value Database )

export default class CoreGlobalDb extends KeyValueDatabase {
  private readonly core: Core;

  constructor(core: Core) {
    super();

    this.core = core;

    return this;
  }

  async loadFromDisk(dbFilePath: string) {
    this.core.log.info("global_db", "Loading global database from disk...");

    if (await this.core.fs.doesExist(dbFilePath)) {
      await this.readFromDisk(dbFilePath);

      if (JSON.stringify(this.keys) === JSON.stringify({})) {
        await this.core.fs.removePath(path.join(this.core.fs.ROOT_PATH, "./global_database.json"));
        await this.core.restartInstance();
      }
    } else {
      this.core.log.warning("global_db", "Unable to load the global database!");
    }

    return this;
  }

  __internal__startGlobalDatabaseService() {
    this.core.scheduler.scheduleTask("core:globaldb_write_to_disk", "*/1 * * * *", async () => {
      await this.writeToDisk(path.join(this.core.fs.ROOT_PATH, "./global_database.json"));
    });
  }
}
