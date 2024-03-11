/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import { CoreApi } from "../coreApi.js";
import generateInstanceLogos from "../helpers/generateInstanceLogos.js";
import { YOURDASH_USER_PERMISSIONS } from "../user/userPermissions.js";
import FileSystemDirectory from "./fileSystemDirectory.js";

export default class CoreApiVerifyFileSystem {
  private readonly coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;

    return this;
  }

  async verify() {
    await this.checkRootDirectory();

    (
      await (
        (await this.coreApi.fs.get(path.join(this.coreApi.fs.ROOT_PATH, "./users"))) as FileSystemDirectory
      )?.getChildrenAsBaseName()
    ).map((user: string) => {
      this.checkUserDirectory(user);
    });
  }

  async checkRootDirectory() {
    // "/"
    if (!(await this.coreApi.fs.doesExist(this.coreApi.fs.ROOT_PATH))) {
      await this.coreApi.fs.createDirectory(this.coreApi.fs.ROOT_PATH);
    }
    // "/users/"
    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./users")))) {
      await this.coreApi.fs.createDirectory(path.join(this.coreApi.fs.ROOT_PATH, "./users"));
    }
    // "/defaults/"
    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./defaults")))) {
      await this.coreApi.fs.createDirectory(path.join(this.coreApi.fs.ROOT_PATH, "./defaults"));
    }
    // "/cache/"
    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./cache")))) {
      await this.coreApi.fs.createDirectory(path.join(this.coreApi.fs.ROOT_PATH, "./cache"));
    }
    // "delete /temp/"
    if (await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./temp"))) {
      await this.coreApi.fs.removePath(path.join(this.coreApi.fs.ROOT_PATH, "./temp"));
    }
    // "/temp/"
    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./temp")))) {
      await this.coreApi.fs.createDirectory(path.join(this.coreApi.fs.ROOT_PATH, "./temp"));
    }
    // "/cache/applications/"
    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./cache/applications")))) {
      await this.coreApi.fs.createDirectory(path.join(this.coreApi.fs.ROOT_PATH, "./cache/applications"));
    }
    // "/cache/applications/icons"
    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./cache/applications/icons")))) {
      await this.coreApi.fs.createDirectory(path.join(this.coreApi.fs.ROOT_PATH, "./cache/applications/icons"));
    }
    // "/config/"
    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./config")))) {
      await this.coreApi.fs.createDirectory(path.join(this.coreApi.fs.ROOT_PATH, "./config"));
    }

    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./default_avatar.avif")))) {
      // set the instance's default user avatar
      try {
        await this.coreApi.fs.copy(
          path.join(process.cwd(), "./src/defaults/default_avatar.avif"),
          path.join(this.coreApi.fs.ROOT_PATH, "./default_avatar.avif"),
        );
      } catch (e) {
        this.coreApi.log.error("Unable to copy the default user avatar");
        console.trace(e);
      }
    }

    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./instance_logo.avif")))) {
      // set the instance's default logo
      try {
        await this.coreApi.fs.copy(
          path.join(process.cwd(), "./src/defaults/default_instance_logo.avif"),
          path.join(this.coreApi.fs.ROOT_PATH, "./instance_logo.avif"),
        );
      } catch (e) {
        this.coreApi.log.error("Unable to copy the default instance logo");
        console.trace(e);
      }
    }

    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./login_background.avif")))) {
      // set the default login background
      try {
        await this.coreApi.fs.copy(
          path.join(process.cwd(), "./src/defaults/default_login_background.avif"),
          path.join(this.coreApi.fs.ROOT_PATH, "./login_background.avif"),
        );
      } catch (e) {
        this.coreApi.log.error("Unable to create the default login background");
      }
    }

    if (!(await this.coreApi.fs.doesExist(path.join(this.coreApi.fs.ROOT_PATH, "./global_database.json")))) {
      // create the global database
      try {
        this.coreApi.log.info("verify_fs", "The global database file does not exist, creating a new one");

        // write the default global database file
        await this.coreApi.fs.copy(
          path.join(process.cwd(), "./src/defaults/default_global_database.json"),
          path.join(this.coreApi.fs.ROOT_PATH, "./global_database.json"),
        );

        // load the newly copied global database file
        await this.coreApi.globalDb.loadFromDisk(path.join(this.coreApi.fs.ROOT_PATH, "./global_database.json"));
      } catch (e) {
        this.coreApi.log.error("verify_fs", e);
        this.coreApi.log.error("verify_fs", 'Unable to create the "./fs/global_database.json" file');
      }
    }

    // create the default instance logos
    try {
      generateInstanceLogos();
    } catch (e) {
      this.coreApi.log.error("Unable to generate logo defaults");
    }

    // if the administrator user doesn't exist,
    // create a new user "admin" with the administrator permission
    const ADMIN_USER = this.coreApi.users.get("admin");

    if (!(await ADMIN_USER.doesExist())) {
      this.coreApi.log.info("verify_fs", "Creating admin user...");

      await ADMIN_USER.verify();
      await ADMIN_USER.setName({
        first: "Admin",
        last: "istrator",
      });
      await ADMIN_USER.setPermissions([YOURDASH_USER_PERMISSIONS.Administrator]);
    } else {
      this.coreApi.log.info("verify_fs", "Admin user already exists");
    }

    return 1;
  }

  async checkUserDirectory(username: string) {
    await this.coreApi.users.get(username).verify();

    return this;
  }
}
