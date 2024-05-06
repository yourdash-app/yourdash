/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import { Core } from "../core.js";
import generateInstanceLogos from "../helpers/generateInstanceLogos.js";
import { YOURDASH_USER_PERMISSIONS } from "../user/userPermissions.js";
import FileSystemDirectory from "./fileSystemDirectory.js";

export default class coreVerifyFileSystem {
  private readonly core: Core;

  constructor(core: Core) {
    this.core = core;

    return this;
  }

  async verify() {
    await this.checkRootDirectory();

    (
      await (
        (await this.core.fs.get(path.join(this.core.fs.ROOT_PATH, "./users"))) as FileSystemDirectory
      )?.getChildrenAsBaseName()
    ).map((user: string) => {
      this.checkUserDirectory(user);
    });
  }

  async checkRootDirectory() {
    // "/"
    if (!(await this.core.fs.doesExist(this.core.fs.ROOT_PATH))) {
      await this.core.fs.createDirectory(this.core.fs.ROOT_PATH);
    }
    // "/users/"
    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./users")))) {
      await this.core.fs.createDirectory(path.join(this.core.fs.ROOT_PATH, "./users"));
    }
    // "/defaults/"
    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./defaults")))) {
      await this.core.fs.createDirectory(path.join(this.core.fs.ROOT_PATH, "./defaults"));
    }
    // "/cache/"
    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./cache")))) {
      await this.core.fs.createDirectory(path.join(this.core.fs.ROOT_PATH, "./cache"));
    }
    // "delete /temp/"
    if (await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./temp"))) {
      await this.core.fs.removePath(path.join(this.core.fs.ROOT_PATH, "./temp"));
    }
    // "/temp/"
    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./temp")))) {
      await this.core.fs.createDirectory(path.join(this.core.fs.ROOT_PATH, "./temp"));
    }
    // "/cache/applications/"
    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./cache/applications")))) {
      await this.core.fs.createDirectory(path.join(this.core.fs.ROOT_PATH, "./cache/applications"));
    }
    // "/cache/applications/icons"
    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./cache/applications/icons")))) {
      await this.core.fs.createDirectory(path.join(this.core.fs.ROOT_PATH, "./cache/applications/icons"));
    }
    // "/config/"
    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./config")))) {
      await this.core.fs.createDirectory(path.join(this.core.fs.ROOT_PATH, "./config"));
    }

    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./default_avatar.avif")))) {
      // set the instance's default user avatar
      try {
        await this.core.fs.copy(
          path.join(process.cwd(), "./src/defaults/default_avatar.avif"),
          path.join(this.core.fs.ROOT_PATH, "./default_avatar.avif"),
        );
      } catch (e) {
        this.core.log.error("Unable to copy the default user avatar");
        console.trace(e);
      }
    }

    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./instance_logo.avif")))) {
      // set the instance's default logo
      try {
        await this.core.fs.copy(
          path.join(process.cwd(), "./src/defaults/default_instance_logo.avif"),
          path.join(this.core.fs.ROOT_PATH, "./instance_logo.avif"),
        );
      } catch (e) {
        this.core.log.error("Unable to copy the default instance logo");
        console.trace(e);
      }
    }

    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./login_background.avif")))) {
      // set the default login background
      try {
        await this.core.fs.copy(
          path.join(process.cwd(), "./src/defaults/default_login_background.avif"),
          path.join(this.core.fs.ROOT_PATH, "./login_background.avif"),
        );
      } catch (e) {
        this.core.log.error("Unable to create the default login background");
      }
    }

    if (!(await this.core.fs.doesExist(path.join(this.core.fs.ROOT_PATH, "./global_database.json")))) {
      // create the global database
      try {
        this.core.log.info("verify_fs", "The global database file does not exist, creating a new one");

        // write the default global database file
        await this.core.fs.copy(
          path.join(process.cwd(), "./src/defaults/default_global_database.json"),
          path.join(this.core.fs.ROOT_PATH, "./global_database.json"),
        );

        // load the newly copied global database file
        await this.core.globalDb.loadFromDisk(path.join(this.core.fs.ROOT_PATH, "./global_database.json"));
      } catch (e) {
        this.core.log.error("verify_fs", e);
        this.core.log.error("verify_fs", 'Unable to create the "./fs/global_database.json" file');
      }
    }

    // create the default instance logos
    try {
      generateInstanceLogos();
    } catch (e) {
      this.core.log.error("Unable to generate logo defaults");
    }

    // if the administrator user doesn't exist,
    // create a new user "admin" with the administrator permission
    const ADMIN_USER = this.core.users.get("admin");

    if (!(await ADMIN_USER.doesExist())) {
      this.core.log.info("verify_fs", "Creating admin user...");

      await ADMIN_USER.verify();
      await ADMIN_USER.setName({
        first: "Admin",
        last: "istrator",
      });
      await ADMIN_USER.setPermissions([YOURDASH_USER_PERMISSIONS.Administrator]);
    } else {
      this.core.log.info("verify_fs", "Admin user already exists");
    }

    return 1;
  }

  async checkUserDirectory(username: string) {
    await this.core.users.get(username).verify();

    return this;
  }
}
