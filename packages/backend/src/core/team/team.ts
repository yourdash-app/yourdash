/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "../core.js";
import TeamDatabase from "./teamDatabase.js";
import path from "path";
import { YourDashTeamPermission } from "./teamPermissions.js";

export default class YourDashTeam {
  teamName: string;
  db: TeamDatabase;

  constructor(teamname: string) {
    this.teamName = teamname;
    this.db = new TeamDatabase(teamname);

    return this;
  }

  // Get the team's FileSystem path
  getPath() {
    return path.join("teams", this.teamName);
  }

  // Does the team exist
  // Returns true if the team exists
  async doesExist() {
    try {
      return await core.fs.doesExist(this.getPath());
    } catch (err) {
      return false;
    }
  }

  // Check the team's filesystem integrity
  // if it doesn't exist, create it
  // if it exists, fix any problems found
  async verify() {
    try {
      if (!(await core.fs.doesExist(this.getPath()))) await core.fs.createDirectory(this.getPath());
    } catch (err) {
      core.log.error("teams", `Unable to create team directory for ${this.teamName}`);
      return this;
    }

    try {
      if (!(await core.fs.doesExist(path.join(this.getPath(), "core")))) await core.fs.createDirectory(path.join(this.getPath(), "core"));
    } catch (err) {
      core.log.error("teams", `Unable to create /core directory for ${this.teamName}`);
      return this;
    }

    try {
      if (!(await core.fs.doesExist(path.join(this.getPath(), "cache")))) await core.fs.createDirectory(path.join(this.getPath(), "cache"));
    } catch (err) {
      core.log.error("teams", `Unable to create /cache directory for ${this.teamName}`);
      return this;
    }

    try {
      if (!(await core.fs.doesExist(path.join(this.getPath(), "apps")))) await core.fs.createDirectory(path.join(this.getPath(), "apps"));
    } catch (err) {
      core.log.error("teams", `Unable to create /apps directory for ${this.teamName}`);
      return this;
    }

    return this;
  }

  setTeamName() {
    core.log.error("IMPLEMENT ME!!! setTeamName()");

    return this;
  }

  setTeamDisplayName(displayName: string) {
    this.db.set("displayName", displayName);

    return this;
  }

  addMember(userName: string, permissions: YourDashTeamPermission[]) {
    this.db.set("members", [...(this.db.get<string[]>("members") || []), { userName: userName, permissions: permissions }]);

    return this;
  }

  removeMember(userName: string) {
    this.db.set(
      "members",
      this.db.get<string[]>("members")?.filter((member) => member !== userName),
    );

    return this;
  }

  containsMember(userName: string): boolean {
    return this.db.get<string[]>("members")?.some((member) => member === userName) || false;
  }
}
