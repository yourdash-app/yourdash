/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import KeyValueDatabase from "../helpers/keyValueDatabase.js";
import { CoreApi } from "./coreApi.js";

// TODO: rewrite this to use a KVD ( Key Value Database )

export default class CoreApiGlobalDb extends KeyValueDatabase {
  private readonly coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    super();

    this.coreApi = coreApi;

    return this;
  }

  async loadFromDisk(dbFilePath: string) {
    this.coreApi.log.info("global_db", "Loading global database from disk...");

    if (await this.coreApi.fs.exists(dbFilePath)) {
      await this.readFromDisk(dbFilePath);

      if (JSON.stringify(this.keys) === JSON.stringify({})) {
        await this.coreApi.fs.removePath(
          path.join(this.coreApi.fs.ROOT_PATH, "./global_database.json"),
        );
        await this.coreApi.restartInstance();
      }
    } else {
      this.coreApi.log.warning(
        "global_db",
        "Unable to load the global database!",
      );
    }

    return this;
  }

  __internal__startGlobalDatabaseService() {
    this.coreApi.scheduler.scheduleTask(
      "core:globaldb_write_to_disk",
      "*/1 * * * *",
      async () => {
        await this.writeToDisk(
          path.join(this.coreApi.fs.ROOT_PATH, "./global_database.json"),
        );
      },
    );
  }
}
