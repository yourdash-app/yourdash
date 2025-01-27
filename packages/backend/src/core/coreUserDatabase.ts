/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import path from "path";
import { Core } from "./core.js";
import FSError from "./fileSystem/FSError.js";
import YourDashUser from "./user/index.js";
import z from "zod";

type JSONValue = boolean | number | string | null | JSONFile;

type JSONFile = {
  [key: string]: JSONValue;
};

// This class only manages the user databases, the databases should be accessed through coreUser not directly from USER_DATABASES
export default class CoreUserDatabase {
  private core: Core;
  userDatabases: Map<string, JSONFile>;

  constructor(core: Core) {
    this.core = core;
    this.userDatabases = new Map<string, JSONFile>();

    return this;
  }

  async saveDatabases() {
    const databases = Array.from(this.userDatabases);

    databases.map(async ([key, database]) => {
      const user = new YourDashUser(key);

      this.core.log.info("core_userdb", `Saving database for '${key}'`);

      const userDbFile = await this.core.fs.getFile(path.join(user.path, "core/user_db.json"));

      if (userDbFile instanceof FSError) {
        this.core.log.info("core_userdb", `Unable to save user_db.json which doesn't exist`);
        return false;
      }

      await userDbFile.write(JSON.stringify(database));
    });
  }

  async loadUserDatabase(username: string): Promise<JSONFile> {
    const user = new YourDashUser(username);

    try {
      const userDbFile = await this.core.fs.getFile(path.join(user.path, "core/user_db.json"));

      if (userDbFile instanceof FSError) {
        this.core.log.info("core_userdb", `Unable to read a user_db.json which doesn't exist`);
        return {};
      }

      // attempt to parse json data from "user_db.json"
      return (await userDbFile.read("json")) as JSONFile;
    } catch (_err) {
      this.core.log.warning("core_userdb", `Unable to parse "${username}"'s user database.`);

      // throw an error because we can't parse user_db.json
      throw new Error(`Unable to parse "${username}"'s user database.`);
    }
  }

  __internal__loadEndpoints() {
    this.core.request.get("/core/user_db", z.unknown(), async (req, res) => {
      const { username } = req.headers;

      if (!this.userDatabases.get(username)) {
        this.userDatabases.set(username, await this.loadUserDatabase(username));
      }

      return res.json(this.userDatabases.get(username) || {});
    });

    this.core.request.post("/core/user_db", z.unknown(), z.unknown(), async (req, res) => {
      const { username } = req.headers;

      this.userDatabases.set(username, req.body);

      return res.json({ success: true });
    });
  }
}
