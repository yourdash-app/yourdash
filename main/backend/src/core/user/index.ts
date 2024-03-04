/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";
import { promises as fs } from "fs";
import path from "path";
import KeyValueDatabase from "@yourdash/shared/core/database.js";
import { YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import sharp from "sharp";
import { hashString } from "../../helpers/encryption.js";
import YourDashSession, { getSessionsForUser } from "../../helpers/session.js";
import coreApi from "../coreApi.js";
import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize.js";
import { YOURDASH_TEAM_PERMISSIONS, YourDashTeamPermission } from "../team/teamPermissions.js";
import { YourDashUserPermission } from "./userPermissions.js";
import IYourDashUserJson from "./userJson.js";

export default class YourDashUser {
  username: string;
  path: string;

  constructor(username: string) {
    this.username = username;
    this.path = path.resolve(path.join(coreApi.fs.ROOT_PATH, `users/${this.username}`));
  }

  getPath() {
    return this.path;
  }

  getFsPath() {
    return path.join(this.path, "fs");
  }

  async getDatabase(): Promise<KeyValueDatabase> {
    return coreApi.users.__internal__getUserDatabase(this.username);
  }

  getAvatar(size: USER_AVATAR_SIZE): string {
    switch (size) {
      case USER_AVATAR_SIZE.LARGE:
        return path.join(this.path, "avatars/large.avif");
      case USER_AVATAR_SIZE.MEDIUM:
        return path.join(this.path, "avatars/medium.avif");
      case USER_AVATAR_SIZE.SMALL:
        return path.join(this.path, "avatars/small.avif");
      case USER_AVATAR_SIZE.ORIGINAL:
        return path.join(this.path, "avatars/original.avif");
      case USER_AVATAR_SIZE.EXTRA_LARGE:
        return path.join(this.path, "avatars/extraLarge.avif");
      default:
        return path.join(this.path, "avatars/medium.avif");
    }
  }

  async setAvatar(filePath: string) {
    await fs.cp(path.resolve(filePath), path.join(this.path, "avatars/original.avif"));
    const newAvatarFile = await fs.readFile(path.resolve(filePath));

    sharp(newAvatarFile)
      .resize(32, 32)
      .toFile(path.join(this.path, "avatars/small.avif"))
      .catch((err) => console.error(err));
    sharp(newAvatarFile)
      .resize(64, 64)
      .toFile(path.join(this.path, "avatars/medium.avif"))
      .catch((err) => console.error(err));
    sharp(newAvatarFile)
      .resize(128, 128)
      .toFile(path.join(this.path, "avatars/large.avif"))
      .catch((err) => console.error(err));
    sharp(newAvatarFile)
      .resize(256, 256)
      .toFile(path.join(this.path, "avatars/extraLarge.avif"))
      .catch((err) => console.error(err));
  }

  async verify() {
    if (!coreApi.globalDb.get("defaults")) {
      return coreApi.log.error("user", `the GlobalDatabase is not yet loaded! not creating user ${this.username}`);
    }

    try {
      if (!(await (await coreApi.teams.get(`${this.username}-personal`)).doesExist())) {
        await coreApi.teams.create(`${this.username}-personal`);
      }
      await this.joinTeam(`${this.username}-personal`, [YOURDASH_TEAM_PERMISSIONS.ADMINISTRATOR]);
    } catch (err) {
      coreApi.log.error("user", `Unable to create team for user ${this.username}`);
      console.error(err);
      return;
    }

    try {
      // "/"
      if (!(await coreApi.fs.exists(this.path))) {
        await coreApi.fs.createDirectory(this.path);
      }
    } catch (err) {
      coreApi.log.error("core", `Unable to create user root for ${this.username}`);
      console.error(err);
      return;
    }

    try {
      // "/apps/"
      if (!(await coreApi.fs.exists(path.join(this.path, "/apps")))) {
        await coreApi.fs.createDirectory(path.join(this.path, "/apps"));
      }
    } catch (err) {
      coreApi.log.error("user", `username: ${this.username}, failed to create apps directory!`);
      console.error(err);
      return;
    }

    try {
      // "/avatars/"
      if (!(await coreApi.fs.exists(path.join(this.path, "/avatars")))) {
        await coreApi.fs.createDirectory(path.join(this.path, "/avatars"));
      }
    } catch (err) {
      coreApi.log.error("user", `username: ${this.username}, failed to create avatars directory!`);
      console.error(err);
      return;
    }

    try {
      // "/core/"
      if (!(await coreApi.fs.exists(path.join(this.path, "/core")))) {
        await coreApi.fs.createDirectory(path.join(this.path, "/core"));
      }
    } catch (err) {
      coreApi.log.error("user", `username: ${this.username}, failed to create core directory!`);
      console.error(err);
      return;
    }

    try {
      // "/core/user_db.json"
      await coreApi.fs.createFile(path.join(this.path, "./core/user_db.json")).write(
        JSON.stringify({
          "user:name": {
            first: "New",
            last: "User",
          },
          "user:username": this.username,
          "core:panel:quickShortcuts": coreApi.globalDb.get("defaults")?.user?.quickShortcuts || [],
        }),
      );
    } catch (err) {
      coreApi.log.error("user", `username: ${this.username}, failed to create user_db.json!`, err);
      console.error(err);
      return;
    }

    try {
      await this.setPassword("password");
    } catch (err) {
      coreApi.log.error("user", `username: ${this.username}, failed to set password!`, err);
      console.error(err);
      return;
    }

    try {
      // set default avatar
      await this.setAvatar(path.join(process.cwd(), "./src/defaults/default_avatar.avif"));
    } catch (err) {
      coreApi.log.error("user", `username: ${this.username}, failed to set default avatar!`, err);
      console.error(err);
      return;
    }

    try {
      await coreApi.fs.createFile(path.join(this.path, "core/user.json")).write(
        JSON.stringify({
          username: this.username,
          "core:user:name": {
            first: "New",
            last: "User",
          },
          bio: "👋 I'm new to YourDash, say hi!",
          url: "",
          permissions: [],
          version: 1,
        } as IYourDashUserJson),
      );
    } catch (err) {
      coreApi.log.error("user", `username: ${this.username}, failed to create user.json!`, err);
      console.error(err);
      return;
    }

    try {
      // "/fs/"
      if (!(await coreApi.fs.exists(path.join(this.path, "/fs")))) {
        await coreApi.fs.createDirectory(path.join(this.path, "/fs"));
      }
    } catch (err) {
      coreApi.log.error("user", `username: ${this.username}, failed to create fs directory!`, err);
      console.error(err);
      return;
    }

    try {
      // "/temp/"
      if (!(await coreApi.fs.exists(path.join(this.path, "/temp")))) {
        await coreApi.fs.createDirectory(path.join(this.path, "/temp"));
      }
    } catch (err) {
      coreApi.log.error("user", `username: ${this.username}, failed to create temp directory!`, err);
      console.error(err);
      return;
    }

    coreApi.log.info("core", `Verified user ${this.username}`);
  }

  async setName({ first, last }: { first: string; last: string }) {
    coreApi.log.info("core", `set name to ${first} ${last} for ${this.username}`);
    try {
      const currentUserJson = JSON.parse(
        (await fs.readFile(path.join(this.path, "core/user.json"))).toString(),
      ) as IYourDashUserJson;
      currentUserJson["user:name"] = { first, last };
      const db = await this.getDatabase();
      db.set("user:name", { first, last });

      await this.saveDatabaseInstantly();

      // save the user.json
      await fs.writeFile(path.join(this.path, "core/user.json"), JSON.stringify(currentUserJson));
    } catch (err) {
      coreApi.log.error("user", `Unable to write / read ${this.username}'s core/user.json`);
    }
  }

  async joinTeam(teamName: string, permissions: YourDashTeamPermission[]) {
    const team = await coreApi.teams.get(teamName);

    if (!(await team.doesExist())) {
      return false;
    }

    team.addMember(this.username, permissions);
    const db = await this.getDatabase();
    db.set("teams", [...(db.get("teams") || []), { teamName: teamName, permissions: permissions }]);

    return true;
  }

  async getTeams() {
    const db = await this.getDatabase();
    return db.get("teams") || [];
  }

  async getName(): Promise<{ first: string; last: string }> {
    return (await this.getDatabase()).get("user:name");
  }

  async setBio(bio: string) {
    try {
      const currentUserJson = JSON.parse(
        (await fs.readFile(path.join(this.path, "core/user.json"))).toString(),
      ) as IYourDashUserJson;
      currentUserJson.bio = bio;
      await fs.writeFile(path.join(this.path, "core/user.json"), JSON.stringify(currentUserJson));
    } catch (err) {
      coreApi.log.error(`Unable to write / read ${this.username}'s core/user.json`);
    }
  }

  async getBio() {
    try {
      const currentUserJson = JSON.parse(
        (await fs.readFile(path.join(this.path, "core/user.json"))).toString(),
      ) as IYourDashUserJson;
      return currentUserJson.bio;
    } catch (err) {
      coreApi.log.error("user", `Unable to read ${this.username}'s core/user.json`);
    }
  }

  async setUrl(url: string) {
    try {
      const currentUserJson = JSON.parse(
        (await fs.readFile(path.join(this.path, "core/user.json"))).toString(),
      ) as IYourDashUserJson;
      currentUserJson.url = url;
      await fs.writeFile(path.join(this.path, "core/user.json"), JSON.stringify(currentUserJson));
    } catch (err) {
      coreApi.log.error(`Unable to write / read ${this.username}'s core/user.json`);
    }
  }

  async getUrl() {
    try {
      const currentUserJson = JSON.parse(
        (await fs.readFile(path.join(this.path, "core/user.json"))).toString(),
      ) as IYourDashUserJson;
      return currentUserJson.url;
    } catch (err) {
      coreApi.log.error("user", `Unable to read ${this.username}'s core/user.json`);
    }
  }

  async setPermissions(permissions: YourDashUserPermission[]) {
    try {
      const currentUserJson = JSON.parse(
        (await fs.readFile(path.join(this.path, "core/user.json"))).toString(),
      ) as IYourDashUserJson;
      currentUserJson.permissions = permissions;
      await fs.writeFile(path.join(this.path, "core/user.json"), JSON.stringify(currentUserJson));
    } catch (err) {
      coreApi.log.error("user:setPermissions", `Unable to write / read ${this.username}'s core/user.json`);
      console.error(err);
    }
  }

  async getPermissions() {
    try {
      const currentUserJson = JSON.parse(
        (await fs.readFile(path.join(this.path, "core/user.json"))).toString(),
      ) as IYourDashUserJson;
      return currentUserJson.permissions;
    } catch (err) {
      coreApi.log.error("user", `Unable to read ${this.username}'s core/user.json`);
    }
  }

  async hasPermission(permission: YourDashUserPermission): Promise<boolean> {
    try {
      const currentUserJson = JSON.parse(
        (await fs.readFile(path.join(this.path, "core/user.json"))).toString(),
      ) as IYourDashUserJson;
      return currentUserJson.permissions.indexOf(permission) !== -1;
    } catch (err) {
      coreApi.log.error("user", `Unable to read ${this.username}'s core/user.json`);
      return false;
    }
  }

  async doesExist(): Promise<boolean> {
    try {
      await fs.access(this.path);
      return true;
    } catch (_err) {
      return false;
    }
  }

  async setPassword(password: string) {
    const hashedPassword = await hashString(password);

    try {
      await fs.writeFile(path.join(this.path, "./core/password.enc"), hashedPassword);
    } catch (e) {
      coreApi.log.error(`unable to create a new password for user ${this.username}`);
    }
  }

  getLoginSessionById(sessionId: number): YourDashSession<YOURDASH_SESSION_TYPE> | undefined {
    try {
      // return a YourDashSession which has the sessionId as its id, find the correct session and use it as an input
      return new YourDashSession(
        this.username,
        getSessionsForUser(this.username)[
          getSessionsForUser(this.username).findIndex((val) => val.sessionId === sessionId)
        ],
      );
    } catch (_err) {
      coreApi.log.error(`${chalk.yellow.bold("CORE")}: unable to find session: ${sessionId}`);
      return undefined;
    }
  }

  getLoginSessionByToken(token: string): YourDashSession<YOURDASH_SESSION_TYPE> | undefined {
    try {
      // return a YourDashSession which has the sessionId as its id, find the correct session and use it as an input
      return new YourDashSession(
        this.username,
        getSessionsForUser(this.username)[
          getSessionsForUser(this.username).findIndex((val) => val.sessionToken === token)
        ],
      );
    } catch (_err) {
      coreApi.log.error(`${chalk.yellow.bold("CORE")}: unable to find session: ${token}`);
      return undefined;
    }
  }

  async getAllLoginSessions() {
    return JSON.parse((await fs.readFile(path.resolve(this.path, "core/sessions.json"))).toString());
  }

  saveDatabase() {
    coreApi.users.__internal__addUserDatabaseToSaveQueue(this.username);
  }

  async saveDatabaseInstantly() {
    await coreApi.users.__internal__saveUserDatabaseInstantly(this.username);
  }

  getAppDirectory(applicationName: string): string {
    return path.join(this.path, `apps/${applicationName}/`);
  }

  async update() {
    const currentUserJson = JSON.parse(
      (await fs.readFile(path.join(this.path, "core/user.json"))).toString(),
    ) as IYourDashUserJson;

    // noinspection FallThroughInSwitchStatementJS
    switch (currentUserJson.version) {
      case undefined:
        currentUserJson.version = 1;
      case 1:
      // add code to update from version 1 to 2 when version 2 is implemented
      default:
        return;
    }
  }
}
