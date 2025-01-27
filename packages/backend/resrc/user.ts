/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { promises as fs } from "fs";
import path from "path";
import { resizeImage } from "./image.js";
import instance from "./main.js";

class User {
  readonly username: string;

  constructor(username: string) {
    this.username = username;
    return this;
  }

  async doesExist() {
    const usersWithUsername = await instance.database.query("SELECT username FROM users WHERE username = $1;", [this.username]);

    return (usersWithUsername.rows[0] as unknown as { username: string })?.username === this.username;
  }

  async getForename() {
    const forename = await instance.database.query("SELECT forename FROM users WHERE username = $1;", [this.username]);

    return forename.rows[0].forename || "MISSING FORENAME";
  }

  async getSurname() {
    const surname = await instance.database.query("SELECT surname FROM users WHERE username = $1;", [this.username]);

    return surname.rows[0].surname || "MISSING SURNAME";
  }

  async setForename(forename: string) {
    instance.log.info("user", `Set user ${this.username}'s forename to "${forename}"`);

    await instance.database.query("UPDATE users SET forename = $2 WHERE username = $1;", [this.username, forename]);

    return this;
  }

  async setSurname(surname: string) {
    instance.log.info("user", `Set user ${this.username}'s surname to "${surname}"`);

    await instance.database.query("UPDATE users SET surname = $2 WHERE username = $1;", [this.username, surname]);

    return this;
  }

  async getFullname() {
    const surname = await this.getSurname();
    const forename = await this.getForename();

    return `${forename} ${surname}`;
  }

  async __internal_generateAvatars() {
    const userSystemPath = instance.filesystem.commonPaths.userSystemDirectory(this.username);

    await resizeImage(path.join(userSystemPath, `avatar.png`), 1024, 1024, path.join(path.join(userSystemPath, "avatar1024.webp")), "webp");
    instance.log.info("user", `Genertated user avatar @ 1024 for user ${this.username}.`);

    await resizeImage(path.join(userSystemPath, `avatar.png`), 768, 768, path.join(path.join(userSystemPath, "avatar768.webp")), "webp");
    instance.log.info("user", `Genertated user avatar @ 768 for user ${this.username}.`);

    await resizeImage(path.join(userSystemPath, `avatar.png`), 512, 512, path.join(path.join(userSystemPath, "avatar512.webp")), "webp");
    instance.log.info("user", `Genertated user avatar @ 512 for user ${this.username}.`);

    await resizeImage(path.join(userSystemPath, `avatar.png`), 256, 256, path.join(path.join(userSystemPath, "avatar256.webp")), "webp");
    instance.log.info("user", `Genertated user avatar @ 256 for user ${this.username}.`);

    await resizeImage(path.join(userSystemPath, `avatar.png`), 128, 128, path.join(path.join(userSystemPath, "avatar128.webp")), "webp");
    instance.log.info("user", `Genertated user avatar @ 128 for user ${this.username}.`);

    await resizeImage(path.join(userSystemPath, `avatar.png`), 64, 64, path.join(path.join(userSystemPath, "avatar64.webp")), "webp");
    instance.log.info("user", `Genertated user avatar @ 64 for user ${this.username}.`);

    return this;
  }
}

async function repairUser(username: string) {
  instance.log.info("user", `Repairing user ${username}`);

  const userPath = instance.filesystem.commonPaths.homeDirectory(username);

  if (!(await instance.filesystem.doesPathExist(userPath))) {
    try {
      await fs.mkdir(userPath, { recursive: true });
    } catch (e) {
      instance.log.error(`user`, `Unable to create directory ${userPath}`);
    }
  }

  const userDocumentsPath = instance.filesystem.commonPaths.userDocumentsDirectory(username);

  if (!(await instance.filesystem.doesPathExist(userDocumentsPath))) {
    try {
      await fs.mkdir(userDocumentsPath, { recursive: true });
    } catch (e) {
      instance.log.error(`user`, `Unable to create directory ${userDocumentsPath}`);
    }
  }

  const userDownloadsPath = instance.filesystem.commonPaths.userDownloadsDirectory(username);

  if (!(await instance.filesystem.doesPathExist(userDownloadsPath))) {
    try {
      await fs.mkdir(userDownloadsPath, { recursive: true });
    } catch (e) {
      instance.log.error(`user`, `Unable to create directory ${userDownloadsPath}`);
    }
  }

  const userPicturesPath = instance.filesystem.commonPaths.userPicturesDirectory(username);

  if (!(await instance.filesystem.doesPathExist(userPicturesPath))) {
    try {
      await fs.mkdir(userPicturesPath, { recursive: true });
    } catch (e) {
      instance.log.error(`user`, `Unable to create directory ${userPicturesPath}`);
    }
  }

  const userVideosPath = instance.filesystem.commonPaths.userVideosDirectory(username);

  if (!(await instance.filesystem.doesPathExist(userVideosPath))) {
    try {
      await fs.mkdir(userVideosPath, { recursive: true });
    } catch (e) {
      instance.log.error(`user`, `Unable to create directory ${userVideosPath}`);
    }
  }

  const userSystemPath = instance.filesystem.commonPaths.userSystemDirectory(username);

  if (!(await instance.filesystem.doesPathExist(userSystemPath))) {
    try {
      await fs.mkdir(userSystemPath, { recursive: true });
    } catch (e) {
      instance.log.error(`user`, `Unable to create directory ${userSystemPath}`);
    }
  }

  const userAvatarPath = path.join(userSystemPath, `avatar.png`);

  if (!(await instance.filesystem.doesPathExist(userAvatarPath))) {
    try {
      await fs.cp(path.join(instance.filesystem.commonPaths.defaultsDirectory(), "userAvatar.png"), userAvatarPath);
      const user = new User(username);
      try {
        await user.__internal_generateAvatars();
      } catch (e) {
        instance.log.error(`user`, `Failed to generate user avatars for ${username}`);
      }
    } catch (e) {
      instance.log.error(
        `user`,
        `Unable to copy default user avatar ${path.join(instance.filesystem.commonPaths.defaultsDirectory(), "userAvatar.png")} to ${userAvatarPath}`,
      );
    }
  }

  instance.events.triggerEvent("yourdash_user_repair", username);
}

async function createUser(username: string) {
  instance.log.info("user", `Creating user ${username}`);
  const user = new User(username);

  const userPath = instance.filesystem.commonPaths.homeDirectory(username);

  try {
    await fs.mkdir(userPath, { recursive: true });
  } catch (e) {
    instance.log.error("user", `Unable to create user directory for ${username}!`);
  }

  await instance.database.query("INSERT INTO users (username, forename, surname, bio) VALUES ($1, $2, $3, $4)", [
    username,
    "New",
    "User",
    "Hello, I am using YourDash! 👋",
  ]);

  await instance.database.query("INSERT INTO panel_configuration (username) VALUES ($1)", [username]);

  try {
    await repairUser(username);
  } catch (e) {
    instance.log.error("user", `Failed to repair user ${username}!`);
  }

  return user;
}

export default User;
export { repairUser, createUser };
