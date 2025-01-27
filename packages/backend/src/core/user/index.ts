/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize.js";
import chalk from "chalk";
import path from "path";
import sharp from "sharp";
import YourDashSession, { getSessionsForUser } from "../../lib/session.js";
import core from "../core.js";
import FSError, { FS_ERROR_TYPE } from "../fileSystem/FSError.js";
import FSFile from "../fileSystem/FSFile.js";
import { YOURDASH_TEAM_PERMISSIONS, YourDashTeamPermission } from "../team/teamPermissions.js";
import UserDatabase from "./userDatabase.js";
import IYourDashUserDatabase from "./userJson.js";
import { YourDashUserPermission } from "./userPermissions.js";

const USER_PATHS = {
  FS: "./fs/",
  ROOT: ".",
  AVATARS: "./avatars/",
  CORE: "./core/",
  PASSWORD: "./core/password.enc",
  CACHE: "./cache/",
  APPLICATIONS: "./applications/",
  TEMP: "./temp/",
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

  getAvatar(size: USER_AVATAR_SIZE, fileType: "avif" | "png" = "avif"): string {
    switch (size) {
      case USER_AVATAR_SIZE.LARGE:
        return path.join(this.path, `avatars/large${fileType === "avif" ? ".avif" : ".png"}`);
      case USER_AVATAR_SIZE.MEDIUM:
        return path.join(this.path, `avatars/medium${fileType === "avif" ? ".avif" : ".png"}`);
      case USER_AVATAR_SIZE.SMALL:
        return path.join(this.path, `avatars/small${fileType === "avif" ? ".avif" : ".png"}`);
      case USER_AVATAR_SIZE.ORIGINAL:
        return path.join(this.path, `avatars/original${fileType === "avif" ? ".avif" : ".png"}`);
      case USER_AVATAR_SIZE.EXTRA_LARGE:
        return path.join(this.path, `avatars/extraLarge${fileType === "avif" ? ".avif" : ".png"}`);
      default:
        return path.join(this.path, `avatars/medium${fileType === "avif" ? ".avif" : ".png"}`);
    }
  }

  // returns the path to the user's thene.css
  getTheme(): string {
    return path.resolve(path.join(this.getFsPath(), "core/theme.css"));
  }

  async doesHaveAvatar(): Promise<boolean> {
    return await core.fs.doesExist(this.getAvatar(USER_AVATAR_SIZE.ORIGINAL));
  }

  async setAvatar(filePath: string) {
    await core.fs.copy(filePath, path.join(this.path, "avatars/original.unknown"));
    const newAvatarFile = await core.fs.getFile(filePath);

    if (!newAvatarFile) {
      core.log.error("user", `unable to set avatar: ${filePath}`);
      return;
    }

    if (newAvatarFile instanceof FSError) {
      core.log.error("user", `unable to set avatar: ${newAvatarFile.getReasonString()}`);
      return;
    }

    const newAvatarBuffer = await newAvatarFile.read("buffer");

    sharp(newAvatarBuffer)
      .toFormat("avif")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/original.avif"))
      .catch((err: string) => core.log.error("user.set_avatar", err));

    sharp(newAvatarBuffer)
      .toFormat("png")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/original.png"))
      .catch((err: string) => core.log.error("user.set_avatar", err));

    sharp(newAvatarBuffer)
      .resize(32, 32)
      .toFormat("avif")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/small.avif"))
      .catch((err: string) => core.log.error("user.set_avatar", err));

    sharp(newAvatarBuffer)
      .resize(32, 32)
      .toFormat("png")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/small.png"))
      .catch((err: string) => core.log.error("user.set_avatar", err));

    sharp(newAvatarBuffer)
      .resize(64, 64)
      .toFormat("avif")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/medium.avif"))
      .catch((err: string) => core.log.error("user.set_avatar", err));

    sharp(newAvatarBuffer)
      .resize(64, 64)
      .toFormat("png")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/medium.png"))
      .catch((err: string) => core.log.error("user.set_avatar", err));

    sharp(newAvatarBuffer)
      .resize(128, 128)
      .toFormat("avif")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/large.avif"))
      .catch((err: string) => core.log.error("user.set_avatar", err));

    sharp(newAvatarBuffer)
      .resize(128, 128)
      .toFormat("png")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/large.png"))
      .catch((err: string) => core.log.error("user.set_avatar", err));

    sharp(newAvatarBuffer)
      .resize(256, 256)
      .toFormat("avif")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/extraLarge.avif"))
      .catch((err: string) => core.log.error("user.set_avatar", err));

    sharp(newAvatarBuffer)
      .resize(256, 256)
      .toFormat("png")
      .toFile(path.join(path.join(core.fs.ROOT_PATH, this.path), "avatars/extraLarge.png"))
      .catch((err: string) => core.log.error("user.set_avatar", err));
  }

  // verify the user's filesystem structure and create any missing files (does not currently check the file's content)
  async verify() {
    if (!core.globalDb.get("core:defaults")) {
      return core.log.error("user", `the GlobalDatabase is not yet loaded! not creating user ${this.username}!`);
    }

    // does the user have a personal team, if not create it
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
      // "/core/wallpaper.avif"
      if (!(await core.fs.doesExist(path.join(this.path, "/core/wallpaper.avif")))) {
        // copy the file
        await core.fs.copy("/defaults/wallpaper.avif", path.join(this.path, "/core/wallpaper.avif"));
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to copy default wallpaper!`);
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
      if (!(await core.fs.doesExist(path.join(this.path, "core/sessions.json")))) {
        const sessionsFile = await core.fs.createFile(path.join(this.path, "core/sessions.json"));

        if (sessionsFile instanceof FSError) {
          core.log.error("user", `username: ${this.username}, failed to create sessions.json!`, sessionsFile);
          return;
        }

        await sessionsFile.write("[]");
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create sessions.json!`, err);
      return;
    }

    try {
      // "/core/user_db.json"

      // if the user does not have a database, create one
      if (!(await core.fs.doesExist(path.join(this.path, "core/user_db.json")))) {
        const userDbFile = await core.fs.createFile(path.join(this.path, "core/user_db.json"));

        if (userDbFile instanceof FSError) {
          core.log.error("user", `username: ${this.username}, failed to create user_db.json!`, userDbFile);

          return;
        }

        await userDbFile.write(
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
      if (!(await core.fs.doesExist(path.join(this.path, USER_PATHS.PASSWORD)))) {
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
      const userJsonFile = await core.fs.getOrCreateFile(path.join(this.path, "core/user.json"));

      if (!(userJsonFile instanceof FSError)) {
        await userJsonFile!.write(
          JSON.stringify({
            username: this.username,
            name: {
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
      return;
    }

    try {
      // "/temp/"
      if (!(await core.fs.doesExist(path.join(this.path, "/temp")))) {
        await core.fs.createDirectory(path.join(this.path, "/temp"));
      }
    } catch (err) {
      core.log.error("user", `username: ${this.username}, failed to create temp directory!`, err);
      return;
    }

    core.log.info("user", `Verified user ${this.username}`);
  }

  async setName({ first, last }: { first: string; last: string }) {
    core.log.info("user", `set name to "${first} ${last}" for ${this.username}`);
    try {
      // TODO: remove all usages of user.json in favour of userDB
      const userJsonFile = await core.fs.getFile(path.join(this.path, "core/user.json"));

      if (userJsonFile instanceof FSError) {
        core.log.warning("user", `Unable to read ${this.username}'s core/user.json`, userJsonFile.getReasonString());
        return;
      }

      const userJson = JSON.parse(await userJsonFile.read("string")) as IYourDashUserDatabase;
      userJson.name = { first, last };
      const db = await this.getDatabase();
      db.set("user:name", { first, last });

      await this.saveDatabaseInstantly();

      // save the user.json
      await userJsonFile.write(JSON.stringify(userJson));
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
    return (await this.getDatabase()).get("user:name") || { first: "Unknown", last: "User" };
  }

  async setBio(bio: string) {
    try {
      const userJsonFile = await core.fs.getFile(path.join(this.path, "core/user.json"));

      if (userJsonFile instanceof FSError) return;

      const userJson = JSON.parse(await userJsonFile.read("string")) as IYourDashUserDatabase;
      userJson.bio = bio;
      await userJsonFile.write(JSON.stringify(userJson));
    } catch (err) {
      core.log.error(`Unable to write / read ${this.username}'s core/user.json`);
    }
  }

  async getBio() {
    try {
      const userJsonFile = await core.fs.getFile(path.join(this.path, "core/user.json"));

      if (userJsonFile instanceof FSError) return "Unknown";

      const userJson = JSON.parse(await userJsonFile.read("string")) as IYourDashUserDatabase;
      return userJson.bio;
    } catch (err) {
      core.log.error("user", `Unable to read ${this.username}'s core/user.json`);
    }
  }

  async setUrl(url: string) {
    try {
      const userJsonFile = await core.fs.getFile(path.join(this.path, "core/user.json"));

      if (userJsonFile instanceof FSError) return;

      const userJson = JSON.parse(await userJsonFile.read("string")) as IYourDashUserDatabase;
      userJson.url = url;
      await userJsonFile.write(JSON.stringify(userJson));
    } catch (err) {
      core.log.error(`Unable to write / read ${this.username}'s core/user.json`);
    }
  }

  async getUrl() {
    try {
      const userJsonFile = await core.fs.getFile(path.join(this.path, "core/user.json"));

      if (userJsonFile instanceof FSError) return;

      const userJson = JSON.parse(await userJsonFile.read("string")) as IYourDashUserDatabase;
      return userJson.url;
    } catch (err) {
      core.log.error("user", `Unable to read ${this.username}'s core/user.json`);
    }
  }

  async setPermissions(permissions: YourDashUserPermission[]) {
    try {
      const userJsonFile = await core.fs.getFile(path.join(this.path, "core/user.json"));

      if (userJsonFile instanceof FSError) return;

      const currentUserJson = JSON.parse(await userJsonFile.read("string")) as IYourDashUserDatabase;
      currentUserJson.permissions = permissions;
      await userJsonFile.write(JSON.stringify(currentUserJson));
    } catch (err) {
      core.log.error("user:setPermissions", `Unable to write / read ${this.username}'s core/user.json`);
      console.error(err);
    }
  }

  async getPermissions() {
    try {
      const userJsonFile = await core.fs.getFile(path.join(this.path, "core/user.json"));

      if (userJsonFile instanceof FSError) return;

      const currentUserJson = JSON.parse(await userJsonFile.read("string")) as IYourDashUserDatabase;
      return currentUserJson.permissions;
    } catch (err) {
      core.log.error("user", `Unable to read ${this.username}'s core/user.json`);
    }
  }

  async hasPermission(permission: YourDashUserPermission): Promise<boolean> {
    try {
      const userJsonFile = await core.fs.getFile(path.join(this.path, "core/user.json"));

      if (userJsonFile instanceof FSError) return false;

      const currentUserJson = JSON.parse(await userJsonFile.read("string")) as IYourDashUserDatabase;
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
    const hashedPassword = await Bun.password.hash(password);

    try {
      const userPasswordFile = await core.fs.getFile(path.join(this.path, "./core/password.enc"));

      if (userPasswordFile instanceof FSError) {
        if (userPasswordFile.reason === FS_ERROR_TYPE.DOES_NOT_EXIST) {
          const newUserPasswordFile = await core.fs.createFile(path.join(this.path, "./core/password.enc"));

          if (newUserPasswordFile instanceof FSError) return;

          await newUserPasswordFile.write(hashedPassword);
          return;
        }
      }

      await (userPasswordFile as FSFile).write(hashedPassword);
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
    const sessionFile = await core.fs.getFile(path.join(this.path, "core/sessions.json"));

    if (sessionFile instanceof FSError) {
      return [];
    }

    return await sessionFile.read("json");
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
    const userJsonFile = await core.fs.getFile(path.join(this.path, "core/user.json"));

    if (userJsonFile instanceof FSError) return;

    const userJson = (await userJsonFile.read("json")) as IYourDashUserDatabase;

    if (userJson.version === undefined) {
      userJson.version = 1;
    }

    switch (userJson.version) {
      case 1:
        // add code to update from version 1 to 2 when version 2 is implemented
        return;
      default:
        return;
    }
  }
}
