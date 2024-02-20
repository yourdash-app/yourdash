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

    return this;
  }

  getPath() {
    return path.resolve(path.join(coreApi.fs.ROOT_PATH, "teams", this.teamName));
  }

  async doesExist() {
    try {
      return await coreApi.fs.exists(this.getPath());
    } catch (err) {
      return false;
    }
  }

  async verify() {
    try {
      if (!(await coreApi.fs.exists(this.getPath()))) await coreApi.fs.createDirectory(this.getPath());
    } catch (err) {
      return coreApi.log.error("teams", `Unable to create team directory for ${this.teamName}`);
    }

    try {
      if (!(await coreApi.fs.exists(path.join(this.getPath(), "core"))))
        await coreApi.fs.createDirectory(path.join(this.getPath(), "core"));
    } catch (err) {
      return coreApi.log.error("teams", `Unable to create /core directory for ${this.teamName}`);
    }

    try {
      if (!(await coreApi.fs.exists(path.join(this.getPath(), "cache"))))
        await coreApi.fs.createDirectory(path.join(this.getPath(), "cache"));
    } catch (err) {
      return coreApi.log.error("teams", `Unable to create /cache directory for ${this.teamName}`);
    }

    try {
      if (!(await coreApi.fs.exists(path.join(this.getPath(), "apps"))))
        await coreApi.fs.createDirectory(path.join(this.getPath(), "apps"));
    } catch (err) {
      return coreApi.log.error("teams", `Unable to create /apps directory for ${this.teamName}`);
    }

    return this;
  }

  setTeamName() {
    coreApi.log.error("IMPLEMENT ME!!! setTeamName()");

    return this;
  }

  setTeamDisplayName() {
    return this;
  }

  addMember(userName: string, permissions: YourDashTeamPermission[]) {
    // TODO: implement this next for full teams support

    this.db.set("members", [...(this.db.get("members") || []), { userName: userName, permissions: permissions }]);

    return this;
  }
}
