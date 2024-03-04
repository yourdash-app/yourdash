/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "../coreApi.js";
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
    return path.resolve(path.join(coreApi.fs.ROOT_PATH, "teams", this.teamName));
  }

  // Does the team exist
  // Returns true if the team exists
  async doesExist() {
    try {
      return await coreApi.fs.exists(this.getPath());
    } catch (err) {
      return false;
    }
  }

  // Check the team's filesystem integrity
  // if it doesn't exist, create it
  // if it exists, fix any problems found
  async verify() {
    try {
      if (!(await coreApi.fs.exists(this.getPath()))) await coreApi.fs.createDirectory(this.getPath());
    } catch (err) {
      coreApi.log.error("teams", `Unable to create team directory for ${this.teamName}`);
      return this;
    }

    try {
      if (!(await coreApi.fs.exists(path.join(this.getPath(), "core"))))
        await coreApi.fs.createDirectory(path.join(this.getPath(), "core"));
    } catch (err) {
      coreApi.log.error("teams", `Unable to create /core directory for ${this.teamName}`);
      return this;
    }

    try {
      if (!(await coreApi.fs.exists(path.join(this.getPath(), "cache"))))
        await coreApi.fs.createDirectory(path.join(this.getPath(), "cache"));
    } catch (err) {
      coreApi.log.error("teams", `Unable to create /cache directory for ${this.teamName}`);
      return this;
    }

    try {
      if (!(await coreApi.fs.exists(path.join(this.getPath(), "apps"))))
        await coreApi.fs.createDirectory(path.join(this.getPath(), "apps"));
    } catch (err) {
      coreApi.log.error("teams", `Unable to create /apps directory for ${this.teamName}`);
      return this;
    }

    return this;
  }

  setTeamName() {
    coreApi.log.error("IMPLEMENT ME!!! setTeamName()");

    return this;
  }

  setTeamDisplayName(displayName: string) {
    this.db.set("displayName", displayName);

    return this;
  }

  addMember(userName: string, permissions: YourDashTeamPermission[]) {
    this.db.set("members", [...(this.db.get("members") || []), { userName: userName, permissions: permissions }]);

    return this;
  }

  removeMember(userName: string) {
    this.db.set(
      "members",
      this.db.get("members").filter((member: { userName: string }) => member.userName !== userName),
    );

    return this;
  }

  containsMember(userName: string): boolean {
    return this.db.get("members")?.some((member: { userName: string }) => member.userName === userName);
  }
}
