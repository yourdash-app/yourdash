/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { promises as fs, constants } from "fs";
import path from "path";
import { Instance } from "./main.js";

class Filesystem {
  instance: Instance;
  FS_ROOT: string;
  commonPaths = {
    rootDirectory: () => `${this.FS_ROOT}/`,
    defaultsDirectory: () => `${this.FS_ROOT}/Defaults`,
    systemDirectory: () => `${this.FS_ROOT}/System`,
    usersDirectory: () => `${this.FS_ROOT}/Users/`,
    globalCacheDirectory: () => `${this.FS_ROOT}/Cache/`,
    teamsDirectory: () => `${this.FS_ROOT}/Teams/`,
    homeDirectory: (username: string) => `${this.FS_ROOT}/Users/${username}/`,
    userDocumentsDirectory: (username: string) => `${this.FS_ROOT}/Users/${username}/Documents`,
    userDownloadsDirectory: (username: string) => `${this.FS_ROOT}/Users/${username}/Downloads`,
    userPicturesDirectory: (username: string) => `${this.FS_ROOT}/Users/${username}/Pictures`,
    userVideosDirectory: (username: string) => `${this.FS_ROOT}/Users/${username}/Videos`,
    userSystemDirectory: (username: string) => `${this.FS_ROOT}/Users/${username}/System`,
  };

  constructor(instance: Instance) {
    this.instance = instance;

    this.FS_ROOT = path.resolve(path.join(process.cwd(), "../../fs/"));
    this.instance.log.info("filesystem", `filesystem root is set to ${this.FS_ROOT}`);

    return this;
  }

  async __internal_startup() {
    if (!(await this.doesPathExist(this.commonPaths.rootDirectory()))) {
      try {
        await fs.mkdir(this.commonPaths.rootDirectory());
        this.instance.log.info(
          "filesystem",
          `Created ${this.instance.log.addEmphasisToString(this.commonPaths.rootDirectory())} directory.`,
        );
      } catch (e) {
        console.error(e);
        this.instance.log.error(
          "filesystem",
          `Failed to create ${this.instance.log.addEmphasisToString(this.commonPaths.rootDirectory())} directory.`,
        );
      }
    } else {
      this.instance.log.info(
        "filesystem",
        `Verified ${this.instance.log.addEmphasisToString(this.commonPaths.rootDirectory())} directory.`,
      );
    }

    if (!(await this.doesPathExist(this.commonPaths.globalCacheDirectory()))) {
      try {
        await fs.mkdir(this.commonPaths.globalCacheDirectory());
        this.instance.log.info(
          "filesystem",
          `Created ${this.instance.log.addEmphasisToString(this.commonPaths.globalCacheDirectory())} directory.`,
        );
      } catch (e) {
        console.error(e);
        this.instance.log.error(
          "filesystem",
          `Failed to create ${this.instance.log.addEmphasisToString(this.commonPaths.globalCacheDirectory())} directory.`,
        );
      }
    } else {
      this.instance.log.info(
        "filesystem",
        `Verified ${this.instance.log.addEmphasisToString(this.commonPaths.globalCacheDirectory())} directory.`,
      );
    }

    if (!(await this.doesPathExist(this.commonPaths.teamsDirectory()))) {
      try {
        await fs.mkdir(this.commonPaths.teamsDirectory());
        this.instance.log.info(
          "filesystem",
          `Created ${this.instance.log.addEmphasisToString(this.commonPaths.teamsDirectory())} directory.`,
        );
      } catch (e) {
        console.error(e);
        this.instance.log.error(
          "filesystem",
          `Failed to create ${this.instance.log.addEmphasisToString(this.commonPaths.teamsDirectory())} directory.`,
        );
      }
    } else {
      this.instance.log.info(
        "filesystem",
        `Verified ${this.instance.log.addEmphasisToString(this.commonPaths.teamsDirectory())} directory.`,
      );
    }

    if (!(await this.doesPathExist(this.commonPaths.usersDirectory()))) {
      try {
        await fs.mkdir(this.commonPaths.usersDirectory());
        this.instance.log.info(
          "filesystem",
          `Created ${this.instance.log.addEmphasisToString(this.commonPaths.usersDirectory())} directory.`,
        );
      } catch (e) {
        console.error(e);
        this.instance.log.error(
          "filesystem",
          `Failed to create ${this.instance.log.addEmphasisToString(this.commonPaths.usersDirectory())} directory.`,
        );
      }
    } else {
      this.instance.log.info(
        "filesystem",
        `Verified ${this.instance.log.addEmphasisToString(this.commonPaths.usersDirectory())} directory.`,
      );
    }

    if (!(await this.doesPathExist(this.commonPaths.defaultsDirectory()))) {
      try {
        await fs.mkdir(this.commonPaths.defaultsDirectory());
        this.instance.log.info(
          "filesystem",
          `Created ${this.instance.log.addEmphasisToString(this.commonPaths.defaultsDirectory())} directory.`,
        );
      } catch (e) {
        console.error(e);
        this.instance.log.error(
          "filesystem",
          `Failed to create ${this.instance.log.addEmphasisToString(this.commonPaths.defaultsDirectory())} directory.`,
        );
      }
    } else {
      this.instance.log.info(
        "filesystem",
        `Verified ${this.instance.log.addEmphasisToString(this.commonPaths.defaultsDirectory())} directory.`,
      );
    }

    if (!(await this.doesPathExist(this.commonPaths.systemDirectory()))) {
      try {
        await fs.mkdir(this.commonPaths.systemDirectory());
        this.instance.log.info(
          "filesystem",
          `Created ${this.instance.log.addEmphasisToString(this.commonPaths.systemDirectory())} directory.`,
        );
      } catch (e) {
        console.error(e);
        this.instance.log.error(
          "filesystem",
          `Failed to create ${this.instance.log.addEmphasisToString(this.commonPaths.systemDirectory())} directory.`,
        );
      }
    } else {
      this.instance.log.info(
        "filesystem",
        `Verified ${this.instance.log.addEmphasisToString(this.commonPaths.systemDirectory())} directory.`,
      );
    }

    if (!(await this.doesPathExist(path.join(this.commonPaths.defaultsDirectory(), "userAvatar.png")))) {
      try {
        await fs.cp(path.join(process.cwd(), "defaults/userAvatar.png"), path.join(this.commonPaths.defaultsDirectory(), "userAvatar.png"));
        this.instance.log.info("filesystem", `Coppied default asset ${this.instance.log.addEmphasisToString("userAvatar.png")}.`);
      } catch (e) {
        console.error(e);
        this.instance.log.error("filesystem", `Failed to copy default asset ${this.instance.log.addEmphasisToString("userAvatar.png")}.`);
      }
    } else {
      this.instance.log.info("filesystem", `Verified ${path.join(this.commonPaths.defaultsDirectory(), "userAvatar.png")} exists.`);
    }

    if (!(await this.doesPathExist(path.join(this.commonPaths.systemDirectory(), "login_background.avif")))) {
      try {
        await fs.cp(
          path.join(process.cwd(), "defaults/default_login_background.avif"),
          path.join(this.commonPaths.systemDirectory(), "login_background.avif"),
        );
        this.instance.log.info("filesystem", `Coppied system asset ${this.instance.log.addEmphasisToString("login_background.avif")}.`);
      } catch (e) {
        console.error(e);
        this.instance.log.error(
          "filesystem",
          `Failed to copy system asset ${this.instance.log.addEmphasisToString("login_background.avif")}.`,
        );
      }
    } else {
      this.instance.log.info("filesystem", `Verified ${path.join(this.commonPaths.systemDirectory(), "login_background.avif")} exists.`);
    }

    this.instance.log.info("filesystem", "Verified filesystem structure!");

    return this;
  }

  async doesPathExist(path: string): Promise<boolean> {
    try {
      await fs.access(path, constants.F_OK);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default Filesystem;
