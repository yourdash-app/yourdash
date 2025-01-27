/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Core } from "./core.js";
import YourDashTeam from "./team/team.js";
import YourDashUser from "./user/index.js";
import z from "zod";

type JSONValue = boolean | number | string | null | JSONFile;

type JSONFile = {
  [key: string]: JSONValue;
};

export default class CoreTeams {
  core: Core;
  teamDatabases: Map<string, { data: JSONFile; changed: boolean }>;

  constructor(core: Core) {
    this.core = core;
    this.teamDatabases = new Map();

    return this;
  }

  // Create a new YourDash Team and write it to disk
  async create(teamName: string) {
    const newTeam = new YourDashTeam(teamName);

    this.core.log.info("teams", `attempting to create team ${teamName}`);

    if (await newTeam.doesExist()) {
      this.core.log.info("teams", `team ${teamName} already exists`);
      throw new Error(`Team '${teamName}' already exists`);
    }

    this.core.log.info("teams", `creating team ${teamName}`);
    await newTeam.verify();

    return newTeam;
  }

  // Get a team from its name
  // Returns a YourDashTeam
  async get(teamName: string) {
    return new YourDashTeam(teamName);
  }

  // Start the Team Database Service
  __internal__startTeamDatabaseService() {
    this.core.scheduler.scheduleTask("core_teamdb_write_to_disk", "*/1 * * * *", async () => {
      await this.saveDatabases();
    });
  }

  // Load all team related endpoints
  __internal__loadEndpoints() {
    this.core.request.get("/core/teams/get/current-user", z.object({}), async (req, res) => {
      const { username } = req.headers;

      const user = new YourDashUser(username);

      return res.json(await user.getTeams());
    });
  }

  // Flag the team's database to be saved when the server usage is low
  // Returns true if the database was successfully flagged
  async saveDatabase(teamName: string) {
    if (!this.teamDatabases.has(teamName)) return false;

    this.teamDatabases.get(teamName)!.changed = true;
    return true;
  }

  // Save all team databases to disk instantly
  async saveDatabases() {
    Object.keys(this.teamDatabases).map(async (teamName) => {
      if (!this.teamDatabases.get(teamName)?.changed) {
        return;
      }

      this.teamDatabases.get(teamName)!.changed = false;

      const user = new YourDashUser(teamName);
      // FIXME: no database to write???
    });
  }
}
