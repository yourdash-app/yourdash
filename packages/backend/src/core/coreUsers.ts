/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { IYourDashSession, type YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize.js";
import path from "path";
import { Core } from "./core.js";
import { AUTHENTICATED_IMAGE_TYPE } from "./coreImage.js";
import YourDashUser from "./user/index.js";
import UserDatabase from "./user/userDatabase.js";
import z from "zod";

// increase for drastically better security but slightly slower performance for high quantities of user sessions
const YOURDASH_USER_SESSION_TOKEN_LENGTH = 128;
export { YOURDASH_USER_SESSION_TOKEN_LENGTH };

export default class CoreUsers {
  private usersMarkedForDeletion: string[] = [];
  private readonly userDatabases: { [username: string]: { db: UserDatabase; changed: boolean } } = {};
  private readonly core: Core;
  private sessions: {
    [key: string]: IYourDashSession<YOURDASH_SESSION_TYPE>[];
  } = {};

  constructor(core: Core) {
    this.core = core;

    return this;
  }

  __internal__getSessionsDoNotUseOutsideOfCore() {
    return this.sessions;
  }

  __internal__startUserDatabaseService() {
    this.core.scheduler.scheduleTask("core_userdb_write_to_disk", "*/1 * * * *", async () => {
      Object.keys(this.userDatabases).map(async (username) => {
        if (!this.userDatabases[username].changed) {
          return;
        }

        this.userDatabases[username].changed = false;

        const user = new YourDashUser(username);

        await this.userDatabases[username].db.writeToDisk(path.join(user.path, "core/user_db.json"));
      });
    });
  }

  __internal__startUserDeletionService() {
    this.core.scheduler.scheduleTask("core_users_delete_all_marked_users", "*/5 * * * *" /* every 5 minutes */, async () => {
      for (const username of this.usersMarkedForDeletion) {
        await this.core.users.forceDelete(username);
      }
    });
  }

  async __internal__getUserDatabase(username: string) {
    if (this.userDatabases[username]) {
      return this.userDatabases[username].db;
    }

    this.userDatabases[username] = {
      db: new UserDatabase(username),
      changed: false,
    };

    const user = new YourDashUser(username);
    await this.userDatabases[username].db.readFromDisk(path.join(user.path, "core/user_db.json"));

    return this.userDatabases[username].db;
  }

  __internal__addUserDatabaseToSaveQueue(username: string) {
    this.userDatabases[username].changed = true;
  }

  async __internal__saveUserDatabaseInstantly(username: string) {
    if (!this.userDatabases[username]) {
      this.userDatabases[username] = {
        db: new UserDatabase(username),
        changed: false,
      };
    }

    this.userDatabases[username].changed = false;

    const user = new YourDashUser(username);

    await this.userDatabases[username].db.writeToDisk(path.join(user.path, "core/user_db.json"));

    return this;
  }

  doesExist(username: string) {
    return !!this.userDatabases[username];
  }

  get(username: string) {
    return new YourDashUser(username);
  }

  async create(username: string) {
    const user = new YourDashUser(username);

    await user.verify();

    return user;
  }

  delete(username: string) {
    this.usersMarkedForDeletion.push(username);
    return this;
  }

  async forceDelete(username: string) {
    if (this.usersMarkedForDeletion.includes(username)) {
      this.usersMarkedForDeletion.splice(this.usersMarkedForDeletion.indexOf(username), 1);
    }

    // TODO: DELETE THE USER FROM THE FS

    await this.core.fs.removePath(path.join(`./users/${username}`));
    delete this.userDatabases[username];

    return this;
  }

  update() {
    this.core.log.error("users", "Not implemented!");

    return this;
  }

  read() {
    this.core.log.error("users", "Not implemented!");

    return this;
  }

  async getAllUsers(): Promise<string[]> {
    return await (await this.core.fs.getOrCreateDirectory("./users")).getChildrenAsBaseName();
  }

  __internal__loadEndpoints() {
    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.SMALL}`, z.unknown(), async (req, res) => {
      const { username, sessionid } = req.headers;

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.LARGE);

      return res
        .status(200)
        .type("text/plain")
        .send(this.core.image.createAuthenticatedImage(username, sessionid, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)));
    });

    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.MEDIUM}`, z.unknown(), async (req, res) => {
      const { username, sessionid } = req.headers;

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.MEDIUM);

      return res
        .status(200)
        .type("text/plain")
        .send(this.core.image.createAuthenticatedImage(username, sessionid, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)));
    });

    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.LARGE}`, z.unknown(), async (req, res) => {
      const { username, sessionid } = req.headers;

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.LARGE);

      return res
        .status(200)
        .type("text/plain")
        .send(this.core.image.createAuthenticatedImage(username, sessionid, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)));
    });

    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.EXTRA_LARGE}`, z.unknown(), async (req, res) => {
      const { username, sessionid } = req.headers;

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.EXTRA_LARGE);

      return res
        .status(200)
        .type("text/plain")
        .send(this.core.image.createAuthenticatedImage(username, sessionid, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)));
    });

    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.ORIGINAL}`, z.unknown(), async (req, res) => {
      const { username, sessionid } = req.headers;

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.ORIGINAL);

      return res
        .status(200)
        .type("text/plain")
        .send(this.core.image.createAuthenticatedImage(username, sessionid, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)));
    });

    this.core.request.get(`/core/user/current/fullname`, z.object({ first: z.string(), last: z.string() }), async (req, res) => {
      const { username } = req.headers;

      const user = new YourDashUser(username);

      console.log(await user.getName());
      console.log((await user.getDatabase()).getKeys());

      return res.status(200).json(await user.getName());
    });

    this.core.request.get("/core/user/current/teams", z.object({}), async (req, res) => {
      const { username } = req.headers;

      const user = new YourDashUser(username);

      return res.json(await user.getTeams());
    });
  }
}
