import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import chalk from "chalk";
import log, { logTypes } from "./log.js";
import { hash } from "./encryption.js";
import YourDashSession, { getSessionsForUser } from "./session.js";
import getUserDatabase from "./userDatabase.js";
import GLOBAL_DB from "./globalDatabase.js";
import { FS_DIRECTORY_PATH } from "../main.js";
export var YourDashUserPermissions;
(function (YourDashUserPermissions) {
    YourDashUserPermissions[YourDashUserPermissions["Administrator"] = 0] = "Administrator";
    YourDashUserPermissions[YourDashUserPermissions["CreateFiles"] = 1] = "CreateFiles";
    YourDashUserPermissions[YourDashUserPermissions["DeleteFiles"] = 2] = "DeleteFiles";
})(YourDashUserPermissions || (YourDashUserPermissions = {}));
class YourDashUser {
    username;
    user;
    constructor(username) {
        this.username = username;
        if (!this.exists()) {
            return;
        }
    }
    async setPassword(password) {
        try {
            const hashedPassword = await hash(password);
            await fs.writeFile(path.resolve(this.getPath(), "./password.txt"), hashedPassword);
        }
        catch (_err) {
            console.error(`unable to set password for user: ${this.username}`);
        }
        return this;
    }
    verifyUserConfig() {
        if (!this.user) {
            this.user = {};
        }
        if (!this.user.fullName) {
            this.user.fullName = {
                first: "New",
                last: "User"
            };
        }
        if (!this.user.permissions) {
            this.user.permissions = [];
        }
        if (!this.user.contacts) {
            this.user.contacts = [];
        }
        return this;
    }
    async generateAvatars() {
        sharp((await fs.readFile(path.resolve(this.getPath(), "avatar.avif"))))
            .resize(32, 32)
            .toFile(path.resolve(this.getPath(), "small_avatar.avif"))
            .catch(err => console.error(err));
        sharp((await fs.readFile(path.resolve(this.getPath(), "avatar.avif"))))
            .resize(64, 64)
            .toFile(path.resolve(this.getPath(), "medium_avatar.avif"))
            .catch(err => console.error(err));
        sharp((await fs.readFile(path.resolve(this.getPath(), "avatar.avif"))))
            .resize(128, 128)
            .toFile(path.resolve(this.getPath(), "large_avatar.avif"))
            .catch(err => console.error(err));
        return this;
    }
    getPath() {
        return path.resolve(process.cwd(), `./fs/users/${this.username}/`);
    }
    getAppDataPath() {
        return path.resolve(this.getPath(), "./app_data/");
    }
    getName() {
        return this.user.fullName;
    }
    async exists() {
        return new Promise(resolve => {
            fs.access(this.getPath()).then(() => {
                resolve(true);
            }).catch(() => {
                resolve(false);
            });
        });
    }
    async write() {
        if (!(await this.exists())) {
            await fs.mkdir(this.getPath(), { recursive: true });
            await fs.cp(path.resolve(process.cwd(), "./src/assets/default_avatar.avif"), path.resolve(this.getPath(), "avatar.avif"));
            hash("password").then(async (response) => {
                await fs.writeFile(path.resolve(this.getPath(), "./password.txt"), response);
            });
            await fs.writeFile(path.resolve(this.getPath(), "./quick-shortcuts.json"), JSON.stringify(GLOBAL_DB.get("defaults:user:quickShortcuts")));
            await fs.mkdir(this.getAppDataPath());
            await fs.mkdir(path.resolve(this.getPath(), "./fs/"));
            await fs.writeFile(path.resolve(this.getPath(), "./user_db.json"), "{}");
        }
        try {
            await fs.writeFile(path.join(this.getPath(), "user.json"), JSON.stringify(this.user));
            const db = await this.getPersonalDatabase();
            await db.writeToDisk(path.resolve(this.getPath(), "./user_db.json"));
        }
        catch (err) {
            console.error("Error writing user to disk!", err);
        }
    }
    async read() {
        try {
            this.user = await JSON.parse((await fs.readFile(path.join(this.getPath(), "user.json"))).toString() || "{}");
        }
        catch (_err) {
            console.error(`Error reading user "${this.username}" from disk!`);
        }
        return this;
    }
    getPermissions() {
        return this.user.permissions;
    }
    hasPermission(perm) {
        return this.user.permissions.indexOf(perm) !== -1;
    }
    addPermission(perm) {
        this.user.permissions.push(perm);
        return this;
    }
    setPermissions(permissions) {
        this.user.permissions = permissions;
        return this;
    }
    async setName(name) {
        this.user.fullName = name;
        const db = await this.getPersonalDatabase();
        db.set("core:user:userFullName", name);
        return this;
    }
    async getSessions() {
        return JSON.parse((await fs.readFile(path.resolve(this.getPath(), "sessions.json"))).toString());
    }
    getSession(sessionId) {
        try {
            return new YourDashSession(this.username, getSessionsForUser(this.username)[getSessionsForUser(this.username).findIndex(val => val.id === sessionId)]);
        }
        catch (_err) {
            log(logTypes.warn, `${chalk.yellow.bold("CORE")}: unable to find session: ${sessionId}`);
            return undefined;
        }
    }
    async getPersonalDatabase() {
        return await getUserDatabase(this.username);
    }
}
export default class YourDashUnreadUser {
    username;
    constructor(username) {
        this.username = username;
    }
    getPath() {
        return path.join(FS_DIRECTORY_PATH, `./users/${this.username}/`);
    }
    getAppDataPath() {
        return path.join(this.getPath(), "./app_data/");
    }
    async exists() {
        return new Promise(resolve => {
            fs.access(this.getPath()).then(() => {
                resolve(true);
            }).catch(() => {
                resolve(false);
            });
        });
    }
    async create(password, name, permissions) {
        const user = new YourDashUser(this.username);
        await fs.cp(path.resolve(process.cwd(), path.join("./src/assets/default_avatar.avif")), path.join(user.getPath(), "./avatar.avif"));
        await fs.writeFile(path.join(user.getPath(), "./user_db.json"), "{}");
        user.verifyUserConfig();
        await user.setName(name);
        await user.setPassword(password);
        user.setPermissions(permissions);
        await user.write();
        await user.generateAvatars();
        return user;
    }
    async read() {
        return await new YourDashUser(this.username).read();
    }
}
//# sourceMappingURL=user.js.map