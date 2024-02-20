/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import { CoreApi } from "./coreApi.js";
import YourDashTeam from "./team/team.js";
import YourDashUser from "./user/index.js";
import { promises as fs } from "fs";

type JSONValue = boolean | number | string | null | JSONFile;

type JSONFile = {
  [key: string]: JSONValue;
};

export default class CoreApiTeams {
  coreApi: CoreApi;
  teamDatabases: Map<string, JSONFile>;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;
    this.teamDatabases = new Map();

    return this;
  }

  async create(teamName: string) {
    const newTeam = new YourDashTeam(teamName);

    if (await newTeam.doesExist()) throw new Error(`Team '${teamName}' already exists`);

    await newTeam.verify();

    return newTeam;
  }

  async get(teamName: string) {
    return new YourDashTeam(teamName);
  }

  __internal__startUserDatabaseService() {
    this.coreApi.scheduler.scheduleTask("core:teamdb_write_to_disk", "*/1 * * * *", async () => {
      Object.keys(this.teamDatabases).map(async (teamName) => {
        if (!this.teamDatabases[teamName].changed) {
          return;
        }

        this.teamDatabases[teamName].changed = false;

        const user = new YourDashUser(teamName);

        await this.teamDatabases[teamName].db.writeToDisk(path.join(user.path, "core/team_db.json"));
      });
    });
  }

  async saveDatabases() {
    const databases = Array.from(this.teamDatabases);

    databases.map(async ([key, database]) => {
      const team = await this.get(key);

      this.coreApi.log.info("core:team_db", `Saving database for '${key}'`);

      await fs.writeFile(path.join(team.getPath(), "core/team_db.json"), JSON.stringify(database));
    });
  }
}
