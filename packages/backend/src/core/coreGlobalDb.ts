/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KeyValueDatabase from "../lib/keyValueDatabase.js";
import { Core } from "./core.js";

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
        await this.core.fs.removePath("./global_database.json");
        await this.core.fs.verifyFileSystem.checkRootDirectory();
      }
    } else {
      this.core.log.warning("global_db", "Unable to load the global database!");
    }

    return this;
  }

  __internal__startGlobalDatabaseService() {
    this.core.scheduler.scheduleTask("core:globaldb_write_to_disk", "*/1 * * * *", async () => {
      await this.writeToDisk("./global_database.json");
    });
  }
}
