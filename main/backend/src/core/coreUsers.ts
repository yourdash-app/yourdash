/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { IYourDashSession } from "@yourdash/shared/core/session.js";
import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize.js";
import path from "path";
import { Core } from "./core.js";
import { AUTHENTICATED_IMAGE_TYPE } from "./coreImage.js";
import YourDashUser from "./user/index.js";
import UserDatabase from "./user/userDatabase.js";

const YOURDASH_USER_SESSION_TOKEN_LENGTH = 128;
export { YOURDASH_USER_SESSION_TOKEN_LENGTH };

export default class CoreUsers {
  private usersMarkedForDeletion: string[] = [];
  private readonly userDatabases: { [username: string]: { db: UserDatabase; changed: boolean } } = {};
  private readonly core: Core;
  private sessions: {
    [key: string]: IYourDashSession<any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  } = {};

  constructor(core: Core) {
    this.core = core;

    return this;
  }

  __internal__getSessionsDoNotUseOutsideOfCore() {
    return this.sessions;
  }

  __internal__startUserDatabaseService() {
    this.core.scheduler.scheduleTask("core:userdb_write_to_disk", "*/1 * * * *", async () => {
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
    this.core.scheduler.scheduleTask(
      "core:users:delete_all_marked_users",
      "*/5 * * * *" /* every 5 minutes */,
      async () => {
        for (const username of this.usersMarkedForDeletion) {
          await this.core.users.forceDelete(username);
        }
      },
    );
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
    this.userDatabases[username].changed = false;

    const user = new YourDashUser(username);

    await this.userDatabases[username].db.writeToDisk(path.join(user.path, "core/user_db.json"));

    return this;
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

    await this.core.fs.removePath(path.join(this.core.fs.ROOT_PATH, `./users/${username}`));
    delete this.userDatabases[username];

    return this;
  }

  update() {
    return this;
  }

  read() {
    return this;
  }

  async getAllUsers(): Promise<string[]> {
    return (await this.core.fs.getDirectory(path.join(this.core.fs.ROOT_PATH, "./users"))).getChildrenAsBaseName();
  }

  __internal__loadEndpoints() {
    this.core.request.get("/core/user/current/avatar/large", (req, res) => {
      const { username } = req.headers as { username: string };

      const unreadUser = new YourDashUser(username);
      const avatarPath = path.join(unreadUser.path, "avatars/large_avatar.avif");

      return res
        .status(200)
        .type("text/plain")
        .send(this.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, avatarPath));
    });

    this.core.request.get("/core/user/current/avatar/medium", (req, res) => {
      const { username } = req.headers as { username: string };

      const unreadUser = new YourDashUser(username);
      const avatarPath = path.join(unreadUser.path, "avatars/medium_avatar.avif");

      return res
        .status(200)
        .type("text/plain")
        .send(this.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, avatarPath));
    });

    this.core.request.get("/core/user/current/avatar/small", (req, res) => {
      const { username } = req.headers as { username: string };

      const unreadUser = new YourDashUser(username);
      const avatarPath = path.join(unreadUser.path, "avatars/small_avatar.avif");

      return res
        .status(200)
        .type("text/plain")
        .send(this.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, avatarPath));
    });

    this.core.request.get("/core/user/current/avatar/original", (req, res) => {
      const { username } = req.headers as { username: string };

      const unreadUser = new YourDashUser(username);
      const avatarPath = path.join(unreadUser.path, "avatars/original.avif");

      return res
        .status(200)
        .type("text/plain")
        .send(this.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, avatarPath));
    });

    // NEW CSI ENDPOINTS

    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.SMALL}`, (req, res) => {
      const { username } = req.headers as { username: string };

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.LARGE);

      return res
        .status(200)
        .type("text/plain")
        .send(
          this.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)),
        );
    });

    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.MEDIUM}`, (req, res) => {
      const { username } = req.headers as { username: string };

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.MEDIUM);

      return res
        .status(200)
        .type("text/plain")
        .send(
          this.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)),
        );
    });

    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.LARGE}`, (req, res) => {
      const { username } = req.headers as { username: string };

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.LARGE);

      return res
        .status(200)
        .type("text/plain")
        .send(
          this.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)),
        );
    });

    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.EXTRA_LARGE}`, (req, res) => {
      const { username } = req.headers as { username: string };

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.EXTRA_LARGE);

      return res
        .status(200)
        .type("text/plain")
        .send(
          this.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)),
        );
    });

    this.core.request.get(`/core/user/current/avatar/${USER_AVATAR_SIZE.ORIGINAL}`, (req, res) => {
      const { username } = req.headers as { username: string };

      const avatarPath = new YourDashUser(username).getAvatar(USER_AVATAR_SIZE.ORIGINAL);

      return res
        .status(200)
        .type("text/plain")
        .send(
          this.core.image.createAuthenticatedImage(username, AUTHENTICATED_IMAGE_TYPE.FILE, path.resolve(avatarPath)),
        );
    });

    this.core.request.get(`/core/user/current/fullname`, async (req, res) => {
      const { username } = req.headers as { username: string };

      const user = new YourDashUser(username);

      return res.status(200).json(await user.getName());
    });

    this.core.request.get("/core/user/current/teams", async (req, res) => {
      const { username } = req.headers as { username: string };

      const user = new YourDashUser(username);

      return res.json(await user.getTeams());
    });
  }
}