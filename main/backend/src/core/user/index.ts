/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import chalk from "chalk";
import path from "path";
import { YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import sharp from "sharp";
import { hashString } from "../../lib/encryption.js";
import YourDashSession, { getSessionsForUser } from "../../lib/session.js";
import core from "../core.js";
import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize.js";
import { YOURDASH_TEAM_PERMISSIONS, YourDashTeamPermission } from "../team/teamPermissions.js";
import UserDatabase from "./userDatabase.js";
import { YourDashUserPermission } from "./userPermissions.js";
import IYourDashUserDatabase from "./userJson.js";

const USER_PATHS = {
  FS: "./fs/",
  ROOT: ".",
  AVATARS: "./avatars/",
  CORE: "./core/",
  PASSWORD: "./core/password.enc",
  CACHE: "./cache/",
  APPLICATIONS: "./applications/",
};

export { USER_PATHS };

export default class YourDashUser {
  username: string;
  path: string;

  constructor(username: string) {
    this.username = username;
    this.path = `users/${this.username}`;
  }

  getPath() {
    return this.path;
  }

  getFsPath() {
    return path.join(this.path, "fs");
  }

  async getDatabase(): Promise<UserDatabase> {
    return await core.users.__internal__getUserDatabase(this.username);
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

  getTheme(): string {
    return path.resolve(path.join(this.getFsPath(), "core/theme.css"));
  }

  async doesHaveAvatar(): Promise<boolean> {
    return await core.fs.doesExist(this.getAvatar(USER_AVATAR_SIZE.ORIGINAL));
  }

  async setAvatar(filePath: string) {
    await core.fs.copy(filePath, path.join(this.path, "avatars/original.avif"));
    const newAvatarFile = await (await core.fs.getFile(filePath)).read("buffer");

    sharp(newAvatarFile)
      .resize(32, 32)
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/small.avif"))
      .catch((err: string) => console.error(err));
    sharp(newAvatarFile)
      .resize(64, 64)
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/medium.avif"))
      .catch((err: string) => console.error(err));
    sharp(newAvatarFile)
      .resize(128, 128)
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/large.avif"))
      .catch((err: string) => console.error(err));
    sharp(newAvatarFile)
      .resize(256, 256)
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/extraLarge.avif"))
      .catch((err: string) => console.error(err));
  }

  async verify() {
    if (!core.globalDb.get("core:defaults")) {
      return core.log.error("user", `the GlobalDatabase is not yet loaded! not creating user ${this.username}`);
    }

    try {
      if (!(await (await core.teams.get(`${this.username}-personal`)).doesExist())) {
        await core.teams.create(`${this.username}-personal`);
        await this.joinTeam(`${this.username}-personal`, [YOURDASH_TEAM_PERMISSIONS.ADMINISTRATOR]);
      }
    } catch (err) {
      core.log.error("user", `Unable to create team for user ${this.username}`);
      return;
    }

    try {
      // "/"
      if (!(await core.fs.doesExist(this.path))) {
        await core.fs.createDirectory(this.path);
      }
    } catch (err) {
      core.log.error("core", `Unable to create user root for ${this.username}`);
      return;
    }

    try {
      // "/apps/"
      if (!(await core.fs.doesExist(path.join(this.path, "/apps")))) {
        await core.fs.createDirectory(path.join(this.path, "/apps"));
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create apps directory!`);
      return;
    }

    try {
      // "/avatars/"
      if (!(await core.fs.doesExist(path.join(this.path, "/avatars")))) {
        await core.fs.createDirectory(path.join(this.path, "/avatars"));
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create avatars directory!`);
      return;
    }

    try {
      // "/core/"
      if (!(await core.fs.doesExist(path.join(this.path, "/core")))) {
        await core.fs.createDirectory(path.join(this.path, "/core"));
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create core directory!`);
      return;
    }

    try {
      // "/core/theme.css"
      if (!(await core.fs.doesExist(path.join(this.path, "/core/theme.css")))) {
        await core.fs.copy("./defaults/theme.css", path.join(this.path, "/core/theme.css"));
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to copy default user theme!`, err);
      return;
    }

    try {
      // "/core/sessions.json"

      // if the user does not have a sessions.json, create one
      if (!(await (await core.fs.getFile(path.join(this.path, "core/sessions.json"))).doesExist())) {
        await (await core.fs.getFile(path.join(this.path, "core/sessions.json"))).write("[]");
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create sessions.json!`, err);
      return;
    }

    try {
      // "/core/user_db.json"

      // if the user does not have a database, create one
      if (!(await core.fs.doesExist(path.join(this.path, "core/user_db.json")))) {
        await core.fs.createFile(path.join(this.path, "./core/user_db.json")).write(
          JSON.stringify({
            "user:name": {
              first: "New",
              last: "User",
            },
            "user:username": this.username,
            "core:panel:pinned": core.globalDb.get<{ user: { quickShortcuts: string[] } }>("core:defaults")?.user?.quickShortcuts || [],
          }),
        );
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create user_db.json!`, err);
      return;
    }

    try {
      if (!(await core.fs.doesExist(path.join(this.path, "core/password.enc")))) {
        await this.setPassword("password");
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to set password!`, err);
      return;
    }

    try {
      // if the user has no avatar, set the default
      if (!(await this.doesHaveAvatar())) {
        await this.setAvatar("./defaults/default_avatar.avif");
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to set default avatar!`, err);
      return;
    }

    try {
      if (!(await core.fs.doesExist(path.join(this.path, "core/user.json")))) {
        await core.fs.createFile(path.join(this.path, "core/user.json")).write(
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
          } as IYourDashUserDatabase),
        );
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create user.json!`, err);
      return;
    }

    try {
      // "/fs/"
      if (!(await core.fs.doesExist(path.join(this.path, "/fs")))) {
        await core.fs.createDirectory(path.join(this.path, "/fs"));
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create fs directory!`, err);
      console.error(err);
      return;
    }

    try {
      // "/temp/"
      if (!(await core.fs.doesExist(path.join(this.path, "/temp")))) {
        await core.fs.createDirectory(path.join(this.path, "/temp"));
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create temp directory!`, err);
      console.error(err);
      return;
    }

    core.log.info("user", `Verified user ${this.username}`);
  }

  async setName({ first, last }: { first: string; last: string }) {
    core.log.info("user", `set name to "${first} ${last}" for ${this.username}`);
    try {
      const currentUserJson = JSON.parse(
        await (await core.fs.getFile(path.join(this.path, "core/user.json"))).read("string"),
      ) as IYourDashUserDatabase;
      currentUserJson["user:name"] = { first, last };
      const db = await this.getDatabase();
      db.set("user:name", { first, last });

      await this.saveDatabaseInstantly();

      // save the user.json
      await (await core.fs.getFile(path.join(this.path, "core/user.json"))).write(JSON.stringify(currentUserJson));
    } catch (err) {
      core.log.error("user", `Unable to write / read ${this.username}'s core/user.json`);
    }
  }

  async joinTeam(teamName: string, permissions: YourDashTeamPermission[]) {
    const team = await core.teams.get(teamName);

    if (!(await team.doesExist())) {
      return false;
    }

    team.addMember(this.username, permissions);
    const db = await this.getDatabase();
    db.set("teams", [...(db.get<string[]>("teams") || []), { teamName: teamName, permissions: permissions }]);

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
        await (await core.fs.getFile(path.join(this.path, "core/user.json"))).read("string"),
      ) as IYourDashUserDatabase;
      currentUserJson.bio = bio;
      await (await core.fs.getFile(path.join(this.path, "core/user.json"))).write(JSON.stringify(currentUserJson));
    } catch (err) {
      core.log.error(`Unable to write / read ${this.username}'s core/user.json`);
    }
  }

  async getBio() {
    try {
      const currentUserJson = JSON.parse(
        await (await core.fs.getFile(path.join(this.path, "core/user.json"))).read("string"),
      ) as IYourDashUserDatabase;
      return currentUserJson.bio;
    } catch (err) {
      core.log.error("user", `Unable to read ${this.username}'s core/user.json`);
    }
  }

  async setUrl(url: string) {
    try {
      const currentUserJson = JSON.parse(
        await (await core.fs.getFile(path.join(this.path, "core/user.json"))).read("string"),
      ) as IYourDashUserDatabase;
      currentUserJson.url = url;
      await (await core.fs.getFile(path.join(this.path, "core/user.json"))).write(JSON.stringify(currentUserJson));
    } catch (err) {
      core.log.error(`Unable to write / read ${this.username}'s core/user.json`);
    }
  }

  async getUrl() {
    try {
      const currentUserJson = JSON.parse(
        await (await core.fs.getFile(path.join(this.path, "core/user.json"))).read("string"),
      ) as IYourDashUserDatabase;
      return currentUserJson.url;
    } catch (err) {
      core.log.error("user", `Unable to read ${this.username}'s core/user.json`);
    }
  }

  async setPermissions(permissions: YourDashUserPermission[]) {
    try {
      const currentUserJson = JSON.parse(
        await (await core.fs.getFile(path.join(this.path, "core/user.json"))).read("string"),
      ) as IYourDashUserDatabase;
      currentUserJson.permissions = permissions;
      await (await core.fs.getFile(path.join(this.path, "core/user.json"))).write(JSON.stringify(currentUserJson));
    } catch (err) {
      core.log.error("user:setPermissions", `Unable to write / read ${this.username}'s core/user.json`);
      console.error(err);
    }
  }

  async getPermissions() {
    try {
      const currentUserJson = JSON.parse(
        await (await core.fs.getFile(path.join(this.path, "core/user.json"))).read("string"),
      ) as IYourDashUserDatabase;
      return currentUserJson.permissions;
    } catch (err) {
      core.log.error("user", `Unable to read ${this.username}'s core/user.json`);
    }
  }

  async hasPermission(permission: YourDashUserPermission): Promise<boolean> {
    try {
      const currentUserJson = JSON.parse(
        await (await core.fs.getFile(path.join(this.path, "core/user.json"))).read("string"),
      ) as IYourDashUserDatabase;
      return currentUserJson.permissions.indexOf(permission) !== -1;
    } catch (err) {
      core.log.error("user", `Unable to read ${this.username}'s core/user.json`);
      return false;
    }
  }

  getThemePath(): string {
    return path.join(this.path, "core/theme.css");
  }

  async doesExist(): Promise<boolean> {
    return await core.fs.doesExist(this.path);
  }

  async setPassword(password: string) {
    const hashedPassword = await hashString(password);

    try {
      await (await core.fs.getFile(path.join(this.path, "./core/password.enc"))).write(hashedPassword);
    } catch (err) {
      core.log.error("user", `unable to create a new password for user ${this.username};${err}`);
    }
  }

  getLoginSessionById(sessionId: number): YourDashSession<YOURDASH_SESSION_TYPE> | undefined {
    try {
      // return a YourDashSession which has the sessionId as its id, find the correct session and use it as an input
      return new YourDashSession(
        this.username,
        getSessionsForUser(this.username)[getSessionsForUser(this.username).findIndex((val) => val.sessionId === sessionId)],
      );
    } catch (_err) {
      core.log.error("user", ` unable to find session: ${sessionId}`);
      return undefined;
    }
  }

  getLoginSessionByToken(token: string): YourDashSession<YOURDASH_SESSION_TYPE> | undefined {
    try {
      // return a YourDashSession which has the sessionId as its id, find the correct session and use it as an input
      return new YourDashSession(
        this.username,
        getSessionsForUser(this.username)[getSessionsForUser(this.username).findIndex((val) => val.sessionToken === token)],
      );
    } catch (_err) {
      core.log.error(`${chalk.yellow.bold("CORE")}: unable to find session: ${token}`);
      return undefined;
    }
  }

  async getAllLoginSessions() {
    return await (await core.fs.getFile(path.join(this.path, "core/sessions.json"))).read("json");
  }

  saveDatabase() {
    core.users.__internal__addUserDatabaseToSaveQueue(this.username);
  }

  async saveDatabaseInstantly() {
    await core.users.__internal__saveUserDatabaseInstantly(this.username);
  }

  getAppDirectory(applicationName: string): string {
    return path.join(this.path, `apps/${applicationName}/`);
  }

  async update() {
    const currentUserJson = (await (await core.fs.getFile(path.join(this.path, "core/user.json"))).read("json")) as IYourDashUserDatabase;

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
